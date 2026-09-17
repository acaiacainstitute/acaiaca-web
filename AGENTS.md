# Acaiaca Web — Agent Instructions

## Governing Model

This repository implements the Acaiaca Institute website.

Architectural, institutional, editorial, and milestone authority lives outside the coding agent.

The coding agent is an implementation executor. It is not the authority for:

* institutional architecture;
* canonical terminology;
* canonical copy;
* research concepts or conclusions;
* visual-system redesign;
* milestone acceptance;
* changes to previously accepted milestones.

When a task supplies governing documents, canonical content, implementation requirements, or milestone-specific instructions, treat them as authoritative for that task.

Do not silently reinterpret or replace them with general best practices.

## Milestone Discipline

Homepage implementation proceeds through explicitly defined and accepted milestones.

Previously accepted milestones are frozen implementation baselines.

Do not redesign, refactor, restyle, rewrite, restructure, or otherwise alter an accepted milestone unless the current task genuinely requires it.

If the current milestone creates a conflict with an accepted milestone:

1. do not silently resolve the conflict;
2. identify the affected files or behavior;
3. explain why the conflict exists;
4. stop the conflicting portion of the implementation and surface the issue for architectural review.

Do not use a new milestone as an opportunity to improve unrelated prior work.

## Canonical Content

Do not materially rewrite supplied canonical copy.

Preserve:

* meaning;
* terminology;
* conceptual distinctions;
* ordering when explicitly governed;
* institutional naming;
* capitalization where it carries intentional meaning.

Minor markup or punctuation changes are permitted only when necessary for correct implementation and only when they do not alter meaning.

Do not invent:

* institutional terminology;
* research concepts;
* claims;
* navigation items;
* calls to action;
* sections;
* explanatory content;
* policy positions;
* conclusions.

If supplied content appears inconsistent, ambiguous, or technically difficult to implement faithfully, surface the issue rather than rewriting it autonomously.

## Visual System

Preserve the established visual system unless the current milestone explicitly requires extending it.

This includes the established:

* typography;
* palette;
* spacing grammar;
* layout proportions;
* editorial presentation;
* responsive behavior;
* component patterns;
* interaction patterns.

Prefer extending an existing pattern over introducing a new design convention.

Do not redesign accepted sections merely to make a new section easier to implement.

If a genuinely new visual treatment is needed, keep it consistent with the established system and confined to the current milestone.

## Scope Control

Implement only the requested milestone or task.

Do not pre-build later homepage sections.

Avoid unrelated:

* cleanup;
* refactoring;
* dependency changes;
* component extraction;
* abstraction;
* renaming;
* file restructuring;
* configuration changes;
* formatting churn.

Make the smallest coherent change that satisfies the task.

Do not modify files outside the task's reasonable implementation scope unless necessary.

If broader changes appear necessary, explain them before making them when possible.

## Repository Safety

Do not discard or overwrite pre-existing user changes.

Before substantial work, inspect the repository state when appropriate.

Treat a dirty working tree as potentially meaningful user work.

Do not use destructive Git operations to restore, reset, or clean the repository unless explicitly instructed.

## External Reference Material

The VS Code workspace may include the Acaiaca Institute knowledge base
outside this repository.

Files outside the `acaiaca-web` repository may contain canonical,
governing, or contextual material for implementation tasks.

Treat all external reference material as read-only unless the current task
explicitly authorizes modification.

Do not:

* edit external reference files;
* rename external reference files;
* move external reference files;
* delete external reference files;
* create new files in external reference folders;
* use external reference folders as implementation output locations.

Implementation changes must remain inside the `acaiaca-web` repository unless
the current task explicitly authorizes otherwise.

When a task identifies specific external documents as authoritative, use those
documents as governing context for that task.

Do not assume that every document available in the external knowledge base is
equally authoritative or current.

When multiple external documents appear relevant but conflict, differ in
version, or leave authority unclear:

1. do not reconcile them autonomously;
2. identify the conflicting documents or versions;
3. explain the implementation consequence;
4. escalate for clarification before relying on one over another.

Broad read access to the Acaiaca Institute knowledge base does not grant broad
implementation authority.

## Validation

Before presenting implementation work as complete:

* run `npm run build`;
* resolve build errors introduced by the change;
* inspect the resulting diff for unrelated changes;
* verify that accepted prior sections remain intact;
* report all files changed;
* report validation performed;
* report any unresolved implementation concerns;
* identify anything requiring architectural or editorial review.

A successful build is necessary but not sufficient evidence of milestone acceptance.

Milestone acceptance remains external to the coding agent.

## Git

Do not commit, push, merge, rebase, tag, or modify remote branches unless explicitly instructed.

Do not amend existing commits unless explicitly instructed.

Do not change branch history.

Leave implementation changes available for human review.

## Escalation

Stop and surface the decision rather than making it autonomously when implementation would require choosing between:

* altering canonical copy;
* altering an accepted milestone;
* changing governing architecture;
* introducing a materially new design convention;
* adding content not supplied by the task;
* changing institutional terminology;
* making an architectural decision not already governed;
* broadening the scope of the requested milestone.

When escalating, describe the concrete implementation conflict and the smallest set of options necessary to resolve it.

## Development

When starting the dev server, use background mode:

```bash
astro dev --background
```

Manage the background server with:

```bash
astro dev stop
astro dev status
astro dev logs
```

## Documentation

Full Astro documentation:

https://docs.astro.build

Consult these guides before working on related tasks:

* [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
* [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
* [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
* [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
* [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
* [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
