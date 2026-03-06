# User Guide — GiveBite Food Redistribution Platform

## Overview

GiveBite connects food donors (restaurants, events, individuals) with NGOs and volunteers to redistribute surplus food. The platform supports 4 user roles, each with dedicated features.

---

## Getting Started

### Registration
1. Navigate to **https://givebite.vercel.app** (or `localhost:5173` for local)
2. Click **"Get Started"** → Fill in your details
3. Select your role: **Donor**, **NGO**, **Volunteer**, or **Admin**
4. After registration, you'll be redirected to your Dashboard

### Login
- Enter your email and password at the Login page
- JWT token is stored locally for session persistence

---

## Role-Based Features

### 🍽️ Donor
| Feature | Description |
|---------|-------------|
| **Post Donation** | List surplus food with title, quantity, category, dietary type, expiry, photo, and location |
| **Edit/Delete Listings** | Modify or remove your active donations |
| **Mark Ready for Pickup** | Signal that food is packaged and ready for collection |
| **View History** | See all past donations with status tracking |
| **Streak Counter** | Consecutive day donations tracked with streak count |
| **Credits** | Earn 10 credits for each successful delivery |
| **QR Code** | Auto-generated QR for volunteer verification at pickup |

### 🏢 NGO
| Feature | Description |
|---------|-------------|
| **Browse Listings** | Search and filter available food donations |
| **Claim Food** | Reserve a listing for your organization |
| **Post Food Needs** | Publish requests for specific food types/quantities |
| **Rate Donations** | Rate delivered food (1-5 stars) with feedback |
| **Geofencing Alerts** | Auto-notified when new donations appear in your service radius |
| **Capacity Management** | Configure fridge and dry storage capacity |

### 🚚 Volunteer
| Feature | Description |
|---------|-------------|
| **Safety Training** | Complete the training module to unlock pickups |
| **Pick Up Food** | Collect claimed donations with photo proof |
| **Deliver Food** | Confirm delivery to NGO destination |
| **Earn Badges** | Milestone badges: First Delivery, 10 Deliveries, Night Owl, Weekend Warrior |
| **Credits & Leaderboard** | Earn credits and compete on the volunteer leaderboard |
| **Availability Toggle** | Set yourself as available/unavailable for pickups |

### 👑 Admin
| Feature | Description |
|---------|-------------|
| **User Management** | View all users, filter by role, verify NGOs |
| **Ban/Unban Users** | Suspend accounts with reason, or reactivate them |
| **Review Reports** | Investigate reported listings for safety violations |
| **View Bug Reports** | Read and manage user-submitted bug reports |
| **Platform Analytics** | View global stats, leaderboards, and impact metrics |

---

## Key Workflows

### Food Donation Lifecycle

```
Donor Posts → NGO Claims → Donor Marks Ready → Volunteer Picks Up → Delivered ✅
     ↓                                              ↓
  Cancelled ❌                              Photo Proof Required 📷
```

### Matching Engine
- When a donor posts food, the system automatically checks if any NGO has a matching food need (by category, location)
- When an NGO posts a need, available listings are scanned for matches
- Geofencing notifications sent to nearby NGOs within their service radius

### QR Verification
1. Donor marks listing as "Ready for Pickup" → QR code is generated
2. Volunteer scans QR at pickup location
3. Volunteer uploads photo proof of pickup
4. Status updated to "In Transit"

---

## Other Features

| Feature | Description |
|---------|-------------|
| **Chatbot** | FAQ-based support bot with role-specific answers |
| **Google Translate** | Multi-language support (English, Hindi, Marathi, Bengali, Tamil, Telugu) |
| **Dark/Light Theme** | Toggle between themes |
| **Notifications** | Real-time bell icon with unread count, mark as read |
| **Bug Reporting** | Submit bugs from the dashboard |
| **Impact Dashboard** | Live stats: meals saved, CO₂ reduced, water saved |
| **Leaderboard** | Top 3 donors and volunteers ranked by deliveries |
| **Search & Filter** | Search by title, filter by category and dietary type |
