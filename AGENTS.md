# Monorepo Agent Rules

Use these rules for all changes in this repository.

## Component And Story Sync
- Any edit to a UI component must include corresponding updates to Storybook stories for that component.
- Keep stories aligned with current props, variants, behavior, and examples.
- If a component is added, add at least one Storybook story in the appropriate stories location.

## Configuration And Documentation Sync
- Any configuration change must update documentation in all relevant places.
- Update the local README for the affected app or package.
- Update Storybook documentation pages that describe setup/configuration (for example, the setup guide MDX pages).
- Do not leave configuration behavior undocumented.

## Scope Expectation
- Treat documentation and stories as part of the definition of done.
- If a required story/doc update is intentionally skipped, explicitly state why in the change summary.
