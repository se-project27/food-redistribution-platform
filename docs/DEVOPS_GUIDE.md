# Developer Guide — GiveBite Food Redistribution Platform

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| **Frontend**   | React 18, Vite, Tailwind CSS      |
| **Backend**    | Node.js, Express.js               |
| **Database**   | MongoDB (Mongoose ODM)            |
| **Auth**       | JWT (jsonwebtoken), bcryptjs      |
| **Testing**    | Jest (backend), Vitest (frontend) |
| **CI/CD**      | GitHub Actions → Vercel           |
| **Animations** | Framer Motion                     |
| **Maps**       | Leaflet / React-Leaflet           |
| **Icons**      | Lucide React                      |
| **i18n**       | Google Translate Widget           |

---

## Project Structure

```
food-organisation-platform/
├── .github/workflows/
│   └── ci.yml                  # CI/CD pipeline (Lint → Tests → Build → Deploy)
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── middlewares/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User schema (Donor/NGO/Volunteer/Admin)
│   │   ├── FoodListing.js      # Food donation schema
│   │   ├── FoodNeed.js         # NGO food request schema
│   │   ├── Notification.js     # In-app notification schema
│   │   └── BugReport.js        # Bug report schema
│   ├── routes/
│   │   ├── auth.js             # Registration, login, profile, admin
│   │   ├── listings.js         # CRUD, status workflow, rating, reports
│   │   ├── foodNeeds.js        # NGO food need requests
│   │   ├── stats.js            # Platform stats & leaderboards
│   │   ├── notifications.js    # User notifications
│   │   ├── bugs.js             # Bug reporting
│   │   └── upload.js           # File upload
│   ├── utils/
│   │   └── matchingEngine.js   # Auto-matching donations ↔ needs
│   ├── tests/                  # Jest test files
│   ├── index.js                # Express app entry point
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/         # Reusable UI components (13 files)
│   │   │   ├── Navbar.jsx      # Navigation with Solutions dropdown
│   │   │   ├── Chatbot.jsx     # FAQ-based support chatbot
│   │   │   ├── Hero.jsx        # Landing page hero section
│   │   │   ├── Footer.jsx      # Site footer
│   │   │   └── ...             # Benefits, CTA, Stats, Team, etc.
│   │   ├── pages/              # Route pages
│   │   │   ├── Dashboard.jsx   # Main app (190KB, role-based views)
│   │   │   ├── Landing.jsx     # Public landing page
│   │   │   ├── Login.jsx       # Auth page
│   │   │   ├── Register.jsx    # Registration page
│   │   │   └── ...             # About, Blog, Contact, Impact, etc.
│   │   ├── App.jsx             # Router with Protected/Public routes
│   │   └── setupTests.js       # Test polyfills (IntersectionObserver)
│   ├── eslint.config.js        # ESLint configuration
│   ├── vite.config.js          # Vite build configuration
│   ├── vercel.json             # Vercel SPA rewrites
│   └── package.json
└── docs/                       # Documentation directory
```

---

## Local Development Setup

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
cd backend
cp .env.example .env    # Configure MONGO_URI, JWT_SECRET, CLIENT_URL
npm install
npm start               # Starts on http://localhost:5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev             # Starts on http://localhost:5173
```

### Environment Variables

**Backend (`.env`):**

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
PORT=5000
```

---

## Testing

### 1. Backend Tests (Jest + MongoDB Memory Server)

```bash
cd backend
npm test
```

| Test File             | Type        | Coverage Description                                  |
|-----------------------|-------------|-------------------------------------------------------|
| `auth.test.js`        | Integration | Registration, login, profile endpoints                |
| `listings.test.js`    | Integration | CRUD operations, search, deletion with auth           |
| `stats.test.js`       | Integration | Platform statistics and leaderboard endpoints         |
| `ban_unban.test.js`   | Integration | Admin user moderation workflows                       |
| `integration.test.js` | Integration | Workflows: auth lifecycle, donate→claim               |
| `regression.test.js`  | Regression  | Edge cases: duplicate emails, tokens, expiry filters  |

### 2. Frontend Tests (Vitest)

```bash
cd client
npm test -- --run       # Single run
npm test                # Watch mode
```

| Test File              | Type        | Coverage Description                                   |
|------------------------|-------------|--------------------------------------------------------|
| `App.test.jsx`         | Unit        | App rendering & GiveBite branding                      |
| `integration.test.jsx` | Integration | Navbar, Chatbot, CTA buttons, protected route guards   |
| `regression.test.jsx`  | Regression  | Polyfills, unused imports, chatbot scroll bug fixes    |

### 3. E2E Tests (Cypress)

```bash
cd client
npm run e2e             # Opens Cypress UI (interactive)
npm run e2e:headless    # Runs in terminal (headless)
```

> **Note:** The Vite dev server must be running (`npm run dev`) for e2e tests.

| Test Suite         | Tests | Coverage Description                                  |
|--------------------|-------|-------------------------------------------------------|
| `landing.cy.js`    | 6     | Branding, navbar, hero, chatbot widget, CTA           |
| `navigation.cy.js` | 7     | Flow between all public pages + 404 redirects         |
| `auth.cy.js`       | 10    | Login/Register forms, token routing, route guards     |

### Linting

```bash
cd client
npm run lint            # ESLint with React hooks rules
```

---

## CI/CD Pipeline

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push to `main`:

```
Push → Lint → Backend Tests → Frontend Tests → Build → E2E Tests → Deploy to Vercel
```

| Stage         | Tool       | Requirement           |
|---------------|------------|-----------------------|
| Lint          | ESLint     | ⚠️ Non-blocking       |
| Test Backend  | Jest       | ✅ Blocking           |
| Test Frontend | Vitest     | ✅ Blocking           |
| Build         | Vite       | ✅ Blocking           |
| E2E Tests     | Cypress    | ✅ Blocking           |
| Deploy        | Vercel CLI | ✅ Prod (main only)   |

### Secrets Required

- `VERCEL_TOKEN` — Vercel API token for deployment

---

## Data Models

### User

- Roles: `Donor`, `NGO`, `Volunteer`, `Admin`
- Features: location, service radius, credits, streaks, badges, ban status
- Volunteer-specific: `isAvailable`, `isTrained`, `totalDeliveries`
- NGO-specific: `ngoRegNumber`, `ngoCapacity`, `isVerified`

### FoodListing

- Status flow: `Available` → `Claimed` → `In Transit` → `Delivered` (or `Cancelled`)
- Smart expiry: auto-filtered based on `expiry_hours` from `createdAt`
- Safety: `reports[]` array, `allergens[]`, `handlingInstructions`
- QR workflow: `isReadyForPickup`, `pickupProof`

### FoodNeed

- Posted by NGOs with category, quantity, urgency, location
- Matched against available listings via matching engine

### Notification

- Types: `Info`, `Success`, `Warning`
- Auto-generated for: nearby donations, status changes, deliveries

---

## Key Architecture Decisions

| Decision                     | Rationale                                                    |
| ---------------------------- | ------------------------------------------------------------ |
| JWT auth over sessions       | Stateless, scales horizontally, works with SPA               |
| Monolithic Dashboard (190KB) | Single-page role-based experience, avoids route complexity   |
| Geofencing via Haversine     | No external service needed, calculates distance from lat/lng |
| Credits system               | Gamification to incentivize participation                    |
| Non-blocking lint            | Legacy code has warnings; tests are the quality gate         |
