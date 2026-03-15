---
name: Feature-First Architecture
description: This skill should be used when the user asks to "create component", "structure project", "add feature", "organize files", or when deciding where to place new code.
version: 0.1.0
---

# Feature-First Architecture Guidelines

This skill provides guidelines for structuring the project using a Feature-First Architecture.

## Component Placement Logic

Always follow this decision tree to determine the directory:

1.  **components/ui/**:
    - If the component is pure UI, 100% prop-driven, and has **NO hooks** (e.g., Button, Card, Input).

2.  **components/shared/**:
    - If the component contains hooks/logic (e.g., `useTheme`, `useTranslations`) **AND** is shared by **2 or more features** (e.g., Header, ThemeToggle).

3.  **features/[name]/components/**:
    - If the component is specific to a single business domain or feature (e.g., ProjectCard, SkillBadge).

## Quick Decision Table

| Characteristics     | Directory                     |
| :------------------ | :---------------------------- |
| Pure UI & No Hooks  | `components/ui/`              |
| Used by 2+ Features | `components/shared/`          |
| Business Specific   | `features/[name]/components/` |

## Export Rules

- **Named Exports**: Always use named exports (e.g., `export const MyComponent...`) to facilitate IDE auto-imports.
