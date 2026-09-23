import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const registryPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/config/maintenance-dependencies.json",
);

const supportedRoles = {
  proposition: new Set(["principal", "supporting"]),
  "research-object": new Set(["material"]),
};

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateRegistry(registry) {
  const errors = [];

  if (!isRecord(registry)) {
    return ["Registry root must be an object."];
  }

  const targets = registry.targets;
  const artifacts = registry.artifacts;

  if (!isRecord(targets)) {
    errors.push("Registry targets must be an object.");
  }

  if (!isRecord(artifacts)) {
    errors.push("Registry artifacts must be an object.");
  }

  if (isRecord(targets)) {
    for (const [targetKey, target] of Object.entries(targets)) {
      if (!isRecord(target)) {
        errors.push(`Target ${targetKey} must be an object.`);
        continue;
      }

      if (!Object.hasOwn(supportedRoles, target.targetType)) {
        errors.push(
          `Target ${targetKey} has unsupported target type ${String(target.targetType)}.`,
        );
      }

      if (!isNonEmptyString(target.target)) {
        errors.push(`Target ${targetKey} is missing its target value.`);
      }
    }
  }

  if (isRecord(artifacts)) {
    for (const [artifactKey, artifact] of Object.entries(artifacts)) {
      if (!isRecord(artifact)) {
        errors.push(`Artifact ${artifactKey} must be an object.`);
        continue;
      }

      if (!isNonEmptyString(artifact.label)) {
        errors.push(`Artifact ${artifactKey} is missing its label.`);
      }

      if (!isNonEmptyString(artifact.canonicalPath)) {
        errors.push(`Artifact ${artifactKey} is missing its canonical path.`);
      }

      if (!Array.isArray(artifact.dependencies)) {
        errors.push(`Artifact ${artifactKey} dependencies must be an array.`);
        continue;
      }

      const dependencyTargets = new Set();

      artifact.dependencies.forEach((dependency, index) => {
        const location = `Artifact ${artifactKey} dependency ${index + 1}`;

        if (!isRecord(dependency)) {
          errors.push(`${location} must be an object.`);
          return;
        }

        if (!isNonEmptyString(dependency.target) || !targets?.[dependency.target]) {
          errors.push(`${location} references unknown target ${String(dependency.target)}.`);
        }

        if (dependencyTargets.has(dependency.target)) {
          errors.push(
            `Artifact ${artifactKey} has a duplicate dependency on ${String(dependency.target)}.`,
          );
        } else {
          dependencyTargets.add(dependency.target);
        }

        const targetType = targets?.[dependency.target]?.targetType;
        const allowedRoles = supportedRoles[targetType];

        if (!allowedRoles?.has(dependency.role)) {
          errors.push(
            `${location} has unsupported role ${String(dependency.role)} for target type ${String(targetType)}.`,
          );
        }

        if (typeof dependency.reviewOnMaterialChange !== "boolean") {
          errors.push(`${location} must define boolean reviewOnMaterialChange.`);
        }

        if (typeof dependency.syncOnRepresentationChange !== "boolean") {
          errors.push(`${location} must define boolean syncOnRepresentationChange.`);
        }
      });
    }
  }

  return errors;
}

async function loadRegistry() {
  const source = await readFile(registryPath, "utf8");
  return JSON.parse(source);
}

function affectedArtifacts(registry, targetKey, mode) {
  const flag =
    mode === "material"
      ? "reviewOnMaterialChange"
      : "syncOnRepresentationChange";

  return Object.entries(registry.artifacts)
    .filter(([, artifact]) =>
      artifact.dependencies.some(
        (dependency) => dependency.target === targetKey && dependency[flag],
      ),
    )
    .sort(([leftKey, left], [rightKey, right]) =>
      `${left.canonicalPath}\u0000${left.label}\u0000${leftKey}`.localeCompare(
        `${right.canonicalPath}\u0000${right.label}\u0000${rightKey}`,
      ),
    )
    .map(([, artifact]) => artifact);
}

async function main() {
  const registry = await loadRegistry();
  const errors = validateRegistry(registry);

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  const [targetKey, mode, ...extraArguments] = process.argv.slice(2);

  if (targetKey === "--validate" && mode === undefined) {
    console.log("Maintenance dependency registry is valid.");
    return;
  }

  if (extraArguments.length > 0 || !targetKey || !mode) {
    console.error(
      "Usage: node scripts/maintenance-impact.mjs --validate | <target> <material|representation>",
    );
    process.exitCode = 1;
    return;
  }

  if (!registry.targets[targetKey]) {
    console.error(`Unknown target: ${targetKey}`);
    process.exitCode = 1;
    return;
  }

  if (mode !== "material" && mode !== "representation") {
    console.error(`Unsupported change mode: ${mode}`);
    process.exitCode = 1;
    return;
  }

  for (const artifact of affectedArtifacts(registry, targetKey, mode)) {
    console.log(artifact.label);
    console.log(artifact.canonicalPath);
  }
}

main().catch((error) => {
  console.error(`Maintenance dependency validation failed: ${error.message}`);
  process.exitCode = 1;
});
