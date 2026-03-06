# Architecture Documentation — GiveBite Food Redistribution Platform

## System Overview

GiveBite is a full-stack web application that connects food donors with NGOs and volunteers to minimize food waste. The system follows a **client-server architecture** with a React SPA frontend and Node.js REST API backend.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (React SPA)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  Landing  │ │  Auth    │ │Dashboard │ │  Chatbot │   │
│  │  Pages    │ │  Pages   │ │(Role UI) │ │  (FAQ)   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                    ↕ Axios HTTP                          │
└─────────────────────────────────────────────────────────┘
                         │
                    HTTPS / REST
                         │
┌─────────────────────────────────────────────────────────┐
│                   SERVER (Express.js)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │   Auth   │ │ Listings │ │  Stats   │ │Notifica- │   │
│  │  Routes  │ │  Routes  │ │  Routes  │ │  tions   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────────┐ │
│  │  Food    │ │   Bug    │ │   Matching Engine        │ │
│  │  Needs   │ │  Reports │ │   (Geofencing + Auto)    │ │
│  └──────────┘ └──────────┘ └──────────────────────────┘ │
│                    ↕ Mongoose ODM                        │
└─────────────────────────────────────────────────────────┘
                         │
                    MongoDB Atlas
                         │
┌─────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  Users   │ │ Listings │ │  Food    │ │ Notifs   │   │
│  │          │ │          │ │  Needs   │ │ + Bugs   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Components

```
App.jsx
├── PublicRoute / ProtectedRoute (Auth Guards)
├── Navbar.jsx (Navigation + Google Translate)
├── Chatbot.jsx (Floating FAQ Bot)
├── Pages/
│   ├── Landing.jsx → Hero + Benefits + HowItWorks + Stats + CTA + Footer
│   ├── Dashboard.jsx (190KB — Role-based SPA)
│   │   ├── Donor View (Post/Edit/Delete, History, QR, Streaks)
│   │   ├── NGO View (Browse, Claim, Rate, Food Needs, Capacity)
│   │   ├── Volunteer View (Training, Pickup, Deliver, Badges)
│   │   └── Admin View (Users, Reports, Bugs, Analytics)
│   ├── Login.jsx / Register.jsx
│   └── Info Pages (About, Blog, Contact, Impact, HowItWorks)
```

### Backend Route Architecture

```
index.js (Express Server)
├── /api/auth        → auth.js       (8 endpoints)
├── /api/listings    → listings.js   (8 endpoints)
├── /api/food-needs  → foodNeeds.js  (4 endpoints)
├── /api/stats       → stats.js      (3 endpoints)
├── /api/notifications → notifications.js (3 endpoints)
├── /api/bugs        → bugs.js       (2 endpoints)
└── /api/upload      → upload.js     (1 endpoint)
```

---

## Data Flow Diagrams

### Authentication Flow
```
User → POST /api/auth/register → Hash Password → Save to DB → Return JWT
User → POST /api/auth/login → Verify Password → Generate JWT → Return Token
Client → Stores JWT in localStorage → Sends via x-auth-token header
Server → auth middleware decodes JWT → Attaches req.user → Route handler
```

### Food Donation Lifecycle
```
Donor                    NGO                     Volunteer
  │                       │                         │
  ├─ POST /listings ──┐   │                         │
  │                   ├──→ Geofencing Check          │
  │                   ├──→ Matching Engine            │
  │                   └──→ Notification to nearby NGOs│
  │                       │                         │
  │                       ├─ PUT /status (Claimed)   │
  │                       │                         │
  ├─ PUT /status ─────┐   │                         │
  │  (ReadyToPickup)  │   │                         │
  │  QR Generated ←───┘   │                         │
  │                       │                         │
  │                       │    ├─ PUT /status ───────┤
  │                       │    │  (In Transit)       │
  │                       │    │  + Photo Proof      │
  │                       │                         │
  │                       ├─ PUT /status (Delivered)  │
  │  +10 Credits ←────────┤  +10 Credits ←──────────┤
  │                       │    +10 Credits           │
  │                       │    +Badge Check          │
  │                       │                         │
  │                       ├─ PUT /rate (1-5 stars)    │
  │  Auto-ban if 3x ←────┤                          │
  │  rating = 1           │                         │
```

---

## Security Architecture

| Layer | Mechanism |
|-------|-----------|
| **Authentication** | JWT tokens with 24h expiry |
| **Authorization** | Role-based middleware checks (`req.user.role`) |
| **Password** | bcryptjs hashing (salt rounds = 10) |
| **CORS** | Whitelisted `CLIENT_URL` only |
| **Input Validation** | Server-side checks on all routes |
| **Auto-Ban** | Users with 3+ one-star ratings auto-banned |
| **Report System** | Listings can be reported; Admin reviews |

---

## Deployment Architecture

```
Developer → git push → GitHub Actions CI/CD
                            │
                ┌───────────┼───────────┐
                ↓           ↓           ↓
           🔍 Lint    🧪 Backend   🧪 Frontend
          (warnings)   Tests(Jest)  Tests(Vitest)
                └───────────┼───────────┘
                            ↓
                      🏗️ Build (Vite)
                            ↓
                   🚀 Deploy to Vercel
                            ↓
                   Production (HTTPS)
```

---

## Database Schema (ERD)

```
┌──────────────────┐     ┌──────────────────────┐
│      User        │     │    FoodListing        │
├──────────────────┤     ├──────────────────────┤
│ _id              │←────│ donor (ref)           │
│ name             │←────│ claimedBy (ref)       │
│ email (unique)   │←────│ collectedBy (ref)     │
│ password (hash)  │     │ title                 │
│ role (enum)      │     │ quantity, unit        │
│ location {lat,lng}│    │ category, dietaryType │
│ serviceRadius    │     │ expiry_hours          │
│ credits          │     │ status (enum)         │
│ streakCount      │     │ location {lat, lng}   │
│ badges[]         │     │ rating, feedback      │
│ isBanned         │     │ reports[]             │
│ isVerified       │     │ isReadyForPickup      │
│ isTrained        │     │ pickupProof           │
└──────────────────┘     └──────────────────────┘
         │
         │ 1:N
         ↓
┌──────────────────┐     ┌──────────────────────┐
│    FoodNeed      │     │   Notification        │
├──────────────────┤     ├──────────────────────┤
│ ngo (ref: User)  │     │ recipient (ref: User)│
│ title            │     │ msg                   │
│ category         │     │ type (enum)           │
│ quantity, unit   │     │ isRead                │
│ urgency          │     │ createdAt             │
│ isPerishable     │     └──────────────────────┘
│ location {lat,lng}│
│ status           │     ┌──────────────────────┐
└──────────────────┘     │    BugReport          │
                         ├──────────────────────┤
                         │ reporter (ref: User)  │
                         │ description           │
                         │ createdAt             │
                         └──────────────────────┘
```

---

## Performance Considerations

| Area | Strategy |
|------|----------|
| **Smart Expiry** | Listings filtered client-side based on `createdAt + expiry_hours` — no cron jobs needed |
| **Geofencing** | Haversine formula for distance calculation — no external API calls |
| **DB Queries** | Mongoose population limited to needed fields (`.select('-password')`) |
| **Frontend Bundle** | Vite for fast HMR and optimized production builds |
| **CI Caching** | npm cache in GitHub Actions for faster installs |
