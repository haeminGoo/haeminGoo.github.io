# Copilot Instructions for haeminGoo.github.io

nvm install 14
nvm use 14
npm install

## Project Overview
This is a **Gatsby 2.x-based personal resume/portfolio website** that renders a single-page CV with multilingual support (Korean/English). The site is deployed to GitHub Pages and includes Netlify CMS for content management.

## Architecture & Data Flow

### Content-Driven Architecture
- **Data Source**: All resume content lives in `/data/profile.json` (English) and `/data/profile_kr.json` (Korean)
- **Data Pipeline**: Gatsby's `gatsby-source-filesystem` + `gatsby-transformer-json` query these files at build time
- **No GraphQL queries**: Data is directly imported as ES modules in [src/pages/index.js](src/pages/index.js#L13-L14)
- **CMS Integration**: Netlify CMS ([static/admin/config.yml](static/admin/config.yml)) provides a GUI editor for `profile.json`

### Component Structure
- **Single-page app**: [src/pages/index.js](src/pages/index.js) is the only page route
- **Section components**: Each CV section (Experience, Skills, Projects, etc.) is a pure presentational component in [src/components/](src/components/)
- **Layout pattern**: Two-column responsive layout (2/3 left for experience/projects, 1/3 right sidebar for skills/education)

### Multilingual Implementation
- Language detection: Browser `navigator.language` → fallback to English
- State management: `useState` for current language + `localStorage` for persistence (key: `haeminLang`)
- Toggle mechanism: Header component's translation button switches between `ko`/`en` and updates localStorage

## Styling System

### Tailwind CSS Configuration
- **Custom color palette** ([tailwind.config.js](tailwind.config.js)): Uses `primary` (purple), `secondary` (red), `neutral` (gray)
- **PurgeCSS**: Enabled in production to strip unused Tailwind classes
- **Custom CSS**: [src/main.css](src/main.css) contains project-specific styles imported globally
- **Utility-first approach**: All components use Tailwind utility classes (e.g., `text-primary-500`, `lg:w-2/3`)

## Key Workflows

### Development
```bash
npm run dev          # Start Gatsby dev server (port 8000)
npm run clean        # Clear Gatsby cache when things break
npm run format       # Prettier formatting for all files
```

### Deployment
```bash
npm run build        # Build to /public
npm run deploy       # Deploy to gh-pages branch (GitHub Pages)
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
- **gatsby-plugin-netlify-cms**: Mounts admin UI at `/admin` route
- **gatsby-plugin-react-svg**: Allows importing SVGs as React components (rule: `/assets/` directory only)
- **gatsby-plugin-offline**: Service worker for PWA functionality (update prompt in [gatsby-browser.js](gatsby-browser.js))
- **gatsby-plugin-manifest**: PWA manifest with site icon

### Plugin Order Matters
PurgeCSS must run after PostCSS in the Gatsby config to properly strip unused Tailwind classes.

## Conventions & Gotchas

### File Structure Logic
- **Components** export as default, imported centrally via [src/components/index.js](src/components/index.js) barrel export
- **Static files**: `/static` folder content copies to `/public` at build time (admin config, project images)
- **Built output**: Never edit `/public` directly; it's generated

### Date Formatting
- Experience/Project dates use `MM/YYYY` format in JSON (enforced by Netlify CMS config)
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
5. Update Netlify CMS config at [static/admin/config.yml](static/admin/config.yml) if CMS editing needed

### Styling Changes
- Modify [tailwind.config.js](tailwind.config.js) for theme-level changes (colors, fonts)
- Use [src/main.css](src/main.css) for custom global styles or Tailwind extensions
- Component-level: Add Tailwind utility classes directly in JSX

### Adding New Languages
1. Create `/data/profile_[langcode].json`
2. Import in [src/pages/index.js](src/pages/index.js)
3. Update language detection logic in `getLang()` function
4. Add toggle option in `changLang()` function
