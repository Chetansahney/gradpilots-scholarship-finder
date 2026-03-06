# GradPilots Scholarship Finder

A complete Angular 17+ application for finding and filtering scholarships. Built with standalone components, SCSS styling, and Local Storage for data persistence.

## Features

- 🎓 **22 Scholarship listings** seeded in Local Storage on first load
- 🔍 **Advanced filtering** by Country, Stream, Level, and Deadline
- 📊 **Three view modes**: Cards, Table, and Map
- 🔃 **Sorting** by Relevance, Amount, or Deadline
- 📈 **Live stats bar** showing total, full-funding, and quarterly deadline counts
- 📄 **Load More** pagination (6 items per page)
- 📱 **Responsive design** with mobile-friendly layout

## Tech Stack

- **Angular 17+** with standalone components
- **TypeScript** with strict interfaces
- **SCSS** for component-level styling
- **Local Storage** for data persistence (no external API)

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── scholarship.model.ts       # TypeScript interfaces
│   ├── services/
│   │   └── scholarship.service.ts     # Data service with Local Storage
│   ├── components/
│   │   ├── filter-sidebar/            # Filter sidebar component
│   │   ├── scholarship-card/          # Individual scholarship card
│   │   └── scholarship-list/          # List with view toggle & sort
│   ├── app.component.ts               # Root component
│   ├── app.component.html             # Root template
│   ├── app.component.scss             # Root styles
│   └── app.config.ts                  # App configuration
├── index.html
├── main.ts
└── styles.scss                        # Global styles
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gradpilots-scholarship-finder

# Install dependencies
npm install

# Start development server
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload on file changes.

### Build

```bash
# Production build
npm run build
# or
ng build
```

Output files will be in `dist/gradpilots-scholarship-finder/`.

### Running Tests

```bash
npm test
# or
ng test
```

## Data Model

Each scholarship has the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `name` | string | Scholarship name |
| `country` | string | Country (USA, UK, Canada, Germany, France) |
| `countryFlag` | string | Flag emoji |
| `amount` | number \| null | Amount in USD, null for Full Funding |
| `isFullFunding` | boolean | Whether fully funded |
| `deadline` | string | Month name (e.g., "July") |
| `stream` | string | Academic stream (Business, Law, IR, STEM) |
| `level` | string | Study level (UG, PG, PhD) |
| `description` | string | Brief description |
| `relevanceScore` | number | Score for relevance sorting |

## Architecture

- **ScholarshipService**: Handles Local Storage CRUD, data seeding, filtering, and sorting
- **AppComponent**: Root layout with header, stats bar, and main content
- **FilterSidebarComponent**: Left sidebar with filter controls and apply/reset buttons
- **ScholarshipListComponent**: View toggle (Cards/Table/Map), sort control, and scholarship display
- **ScholarshipCardComponent**: Individual scholarship card display
