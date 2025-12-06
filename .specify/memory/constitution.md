<!--
  SYNC IMPACT REPORT
  ==================
  Version Change: [none] → 1.0.0
  Bump Rationale: MINOR - Initial constitution creation with 6 core principles

  Modified Principles:
  - NEW: I. Feature-Sliced Design (FSD)
  - NEW: II. TypeScript Strict Mode
  - NEW: III. SCSS Modules Only
  - NEW: IV. Server State Management
  - NEW: V. Client State Minimalism
  - NEW: VI. Component Composition & Reusability

  Added Sections:
  - Core Principles (6 principles)
  - Technology Stack
  - AI-First Development Workflow
  - Governance

  Removed Sections:
  - None (initial creation)

  Templates Requiring Updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section validated
  ✅ .specify/templates/spec-template.md - Requirements section aligned
  ✅ .specify/templates/tasks-template.md - Task categorization validated

  Follow-up TODOs:
  - None
-->

# E-Store Constitution

## Core Principles

### I. Feature-Sliced Design (FSD)

**Architecture Structure**: The codebase MUST follow Feature-Sliced Design methodology.

- **features/** contains okremі, ізольовані фічі з бізнес-логікою
- **widgets/** contains композитні блоки, зібрані з features
- **shared/** contains тільки переиспользуємі UI компоненти та утиліти
- Each feature MUST be self-contained and isolated
- Cross-feature imports are only allowed through public APIs
- Feature dependencies MUST be explicitly documented

**Rationale**: FSD provides clear separation of concerns, enables parallel development, and ensures codebase scalability. AI tools can generate code within well-defined boundaries when feature structure is explicit.

### II. TypeScript Strict Mode

**Type Safety**: All code MUST be fully typed under TypeScript strict mode.

- TypeScript strict mode MUST be enabled in tsconfig.json
- No `any` types without explicit comment justification
- Interfaces MUST be defined for all Props and State objects
- Generic types MUST be preferred over `unknown` where applicable
- Type assertions (`as`) require justification comments

**Rationale**: Strict typing catches errors at compile time, improves IDE autocomplete, and provides clear contracts for AI code generation.

### III. SCSS Modules Only

**Styling Approach**: All styles MUST use SCSS Modules for automatic scoping.

- All component styles MUST use SCSS modules (`.module.scss`)
- Descriptive class names (`.card`, `.title`, `.price`) are required
- SCSS Modules provides automatic scoping (BEM notation is NOT required)
- Global styles are FORBIDDEN except for reset/normalize in a dedicated global file
- Inline styles are discouraged unless dynamic values are required

**Rationale**: SCSS Modules eliminate class name conflicts, improve maintainability, and provide clear style isolation. AI can generate modular styles without risk of global namespace pollution.

### IV. Server State Management

**API Data Handling**: All server state MUST be managed through TanStack Query.

- TanStack Query MUST be used for all API calls (GET, POST, PUT, DELETE)
- Axios MUST be used as the HTTP client
- Caching MUST be enabled by default with appropriate staleTime
- Optimistic updates MUST be implemented for mutations affecting UI state
- Loading and error states MUST be handled consistently across all queries

**Rationale**: TanStack Query eliminates boilerplate, provides automatic caching/refetching, and separates server state from client state. Clear patterns enable AI to generate consistent API integration code.

### V. Client State Minimalism

**UI State Only**: Client state management MUST be minimal and use Zustand.

- Zustand MUST be used ONLY for UI state (modals, filters, cart, UI preferences)
- Server state MUST NOT be duplicated in Zustand stores
- One store per feature located in `features/[feature]/model/`
- Store shape MUST be explicitly typed with TypeScript interfaces
- Stores MUST NOT contain business logic beyond UI state transformations

**Rationale**: Minimizing client state reduces complexity and bugs. Separating UI state from server state prevents synchronization issues and enables AI to generate predictable state management code.

### VI. Component Composition & Reusability

**UI Component Hierarchy**: Shared UI MUST follow atomic design principles.

- Shared UI structure: `shared/ui/atoms/` (Button, Input) → `shared/ui/molecules/` (SearchBar, PriceTag)
- Features MUST compose from shared UI and add business logic in `features/[feature]/ui/`
- Widgets MUST compose from features in `widgets/[widget]/`
- Props drilling MUST NOT exceed 2 levels (use Context API or Zustand for deeper state)
- Component responsibilities MUST be single-purpose and clearly documented

**Rationale**: Atomic design provides a clear vocabulary for component classification, enabling AI to understand component hierarchy and generate appropriately scoped components.

## Technology Stack

**Required Technologies**: The following stack is mandatory for all development.

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: SCSS Modules
- **Server State**: TanStack Query + Axios
- **Client State**: Zustand
- **Package Manager**: npm or pnpm
- **Linting**: ESLint + Prettier

**Rationale**: Standardizing the tech stack ensures consistency, reduces decision fatigue, and provides AI tools with explicit context for code generation.

## AI-First Development Workflow

**AI-Assisted Development**: Development MUST leverage AI tools for maximum efficiency.

- SpecKit MUST be used for specification-driven development (spec → plan → tasks → implement)
- GitHub Copilot or similar AI tools MUST be used for code generation
- Specifications MUST be written BEFORE implementation begins
- Context MUST be provided to AI tools (open relevant files, write prompt comments)
- Manual boilerplate code is FORBIDDEN if AI can generate it
- Generated code MUST be reviewed for compliance with this constitution

**Rationale**: AI-first development maximizes velocity and consistency. Specifications provide context for AI, and constitutional principles ensure generated code meets quality standards.

## Governance

**Constitutional Authority**: This constitution supersedes all other development practices.

- All code reviews MUST verify compliance with constitutional principles
- Any complexity or deviation MUST be justified in writing
- Amendments to this constitution require documentation, team approval, and migration plan
- SpecKit workflows (`/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`) enforce constitutional compliance
- Non-compliance blocks merge approval

**Amendment Process**:
1. Propose amendment with rationale
2. Document impact on existing code
3. Obtain team approval
4. Update constitution with version bump (semantic versioning)
5. Update dependent templates and documentation
6. Execute migration plan if breaking changes introduced

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
