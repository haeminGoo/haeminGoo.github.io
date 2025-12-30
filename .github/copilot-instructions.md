# Copilot Instructions for haeminGoo.github.io

## Project Overview
This is a **Gatsby 5.x-based personal resume/portfolio website** that renders a single-page CV with multilingual support (Korean/English). The site is deployed to GitHub Pages and includes Decap CMS (formerly Netlify CMS) for content management.

## Architecture & Data Flow

### Content-Driven Architecture
- **Data Source**: All resume content lives in `/data/profile.json` (English) and `/data/profile_kr.json` (Korean)
- **Data Pipeline**: Gatsby's `gatsby-source-filesystem` + `gatsby-transformer-json` query these files at build time
- **No GraphQL queries**: Data is directly imported as ES modules in [src/pages/index.js](src/pages/index.js#L13-L14)
- **CMS Integration**: Decap CMS ([static/admin/config.yml](static/admin/config.yml)) provides a GUI editor for `profile.json`

### Component Structure
- **Single-page app**: [src/pages/index.js](src/pages/index.js) is the only page route
- **Section components**: Each CV section (Experience, Skills, Projects, etc.) is a pure presentational component in [src/components/](src/components/)
- **Layout pattern**: Two-column responsive layout (2/3 left for experience/projects, 1/3 right sidebar for skills/education)

### Multilingual Implementation
- Language detection: Browser `navigator.language` → fallback to English
- State management: `useState` for current language + `localStorage` for persistence (key: `haeminLang`)
- Toggle mechanism: Header component's translation button switches between `ko`/`en` and updates localStorage

## Styling System

### Tailwind CSS v3 Configuration
- **Custom color palette** ([tailwind.config.js](tailwind.config.js)): Uses `primary` (purple), `secondary` (red), `neutral` (gray)
- **Content configuration**: Must specify content paths for purging unused styles
- **Custom CSS**: [src/main.css](src/main.css) contains project-specific styles with `@apply` directives
- **Utility-first approach**: All components use Tailwind utility classes (e.g., `text-primary-500`, `lg:w-2/3`)
- **Breaking changes from v1**: `fill-current` class removed (SVG fill now inherits from `text-` classes automatically)

## Key Workflows

### Environment Setup
**Critical: Node Version Requirement**
- **Use Node 18+** for Gatsby 5.x compatibility
- Node 16 and below are not supported by Gatsby 5
- Recommended: Node 18 LTS or Node 20 LTS

### Development
```bash
yarn install          # Install dependencies
yarn dev             # Start Gatsby dev server (port 8000)
yarn clean           # Clear Gatsby cache when things break
yarn format          # Prettier formatting for all files
```

### Deployment
```bash
yarn build        # Build to /public
yarn deploy       # Deploy to gh-pages branch (GitHub Pages)
```

### Content Editing
1. **Direct JSON editing**: Modify `/data/profile.json` or `/data/profile_kr.json`
2. **CMS approach**: Run dev server, navigate to `/admin`, authenticate with GitHub

## Component Patterns

### Skills Component Type System
The Skills component ([src/components/skills.js](src/components/skills.js)) supports three render modes based on `skill.type`:
- `percent`: Renders progress bar with percentage (for proficiency levels)
- `tag`: Renders as inline badge/tag
- `list`: Renders as bullet point list item

Example JSON structure:
```json
{
  "title": "Languages",
  "type": "percent",
  "subskills": [{"name": "JavaScript", "percent": 89}]
}
```

### Contact Information Rendering
The Header component ([src/components/header.js](src/components/header.js)) dynamically renders contact fields by iterating over `contacts` object keys. Add new contact fields to JSON; no component changes needed.

## External Dependencies

### Critical Plugins
- **gatsby-plugin-decap-cms**: Mounts admin UI at `/admin` route (successor to gatsby-plugin-netlify-cms)
- **gatsby-plugin-react-svg**: Allows importing SVGs as React components (rule: `/assets/` directory only)
- **gatsby-plugin-manifest**: PWA manifest with site icon
- **gatsby-plugin-react-helmet**: Head tag management (note: Gatsby 5 has built-in Head API alternative)

### Plugin Order Matters
PostCSS must be configured with both Tailwind CSS and Autoprefixer in the correct order.

## Conventions & Gotchas

### File Structure Logic
- **Components** export as default, imported centrally via [src/components/index.js](src/components/index.js) barrel export
- **Static files**: `/static` folder content copies to `/public` at build time (admin config, project images)
- **Built output**: Never edit `/public` directly; it's generated

### Date Formatting
- Experience/Project dates use `MM/YYYY` format in JSON (enforced by Decap CMS config)
- Display logic: If `end` is null/undefined, show "PRESENT"

### Responsive Breakpoints
- Desktop sidebar: `lg:` prefix activates two-column layout with vertical border
- Mobile: Stacks vertically with no border separator

## Making Changes

### Adding New Resume Sections
1. Create component in `/src/components/[section].js`
2. Export from `/src/components/index.js`
3. Import and render in [src/pages/index.js](src/pages/index.js)
4. Add corresponding field to `/data/profile.json` and `/data/profile_kr.json`
5. Update Decap CMS config at [static/admin/config.yml](static/admin/config.yml) if CMS editing needed

### Styling Changes
- Modify [tailwind.config.js](tailwind.config.js) for theme-level changes (colors, fonts)
- Use [src/main.css](src/main.css) for custom global styles or Tailwind extensions with `@layer` directive
- Component-level: Add Tailwind utility classes directly in JSX
- **Tailwind v3 changes**: No `fill-current` class needed - SVG fill inherits from `text-` color classes

### Adding New Languages
1. Create `/data/profile_[langcode].json`
2. Import in [src/pages/index.js](src/pages/index.js)
3. Update language detection logic in `getLang()` function
4. Add toggle option in `changLang()` function

## Troubleshooting

### Build Errors
- **Tailwind CSS errors**: Ensure `content` array in [tailwind.config.js](tailwind.config.js) includes all component paths
- **Missing utility classes**: Tailwind v3 removed many classes like `fill-current` - check migration guide
- **Cache issues**: Run `yarn clean` to clear Gatsby cache before rebuilding
- **GraphQL schema conflicts**: Check data consistency between `profile.json` and `profile_kr.json`
