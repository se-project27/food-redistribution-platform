# API Documentation — GiveBite Food Redistribution Platform

**Base URL:** `http://localhost:5000/api`  
**Authentication:** JWT Bearer Token (passed via `x-auth-token` header)

---

## 1. Authentication (`/api/auth`)

### POST `/api/auth/register`
Register a new user account.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Full name |
| `email` | String | ✅ | Unique email address |
| `password` | String | ✅ | Min 6 characters |
| `role` | String | ✅ | `Donor`, `NGO`, `Volunteer`, or `Admin` |
| `phone` | String | ❌ | Contact number |
| `address` | String | ❌ | Street address |
| `ngoRegNumber` | String | ❌ | NGO registration number (for NGOs) |
| `location` | Object | ❌ | `{ lat: Number, lng: Number }` |
| `serviceRadius` | Number | ❌ | Radius in km (default: 5) |

**Response:** `{ token, user: { id, name, email, role, ... } }`

---

### POST `/api/auth/login`
Authenticate a user and receive a JWT token.

| Field | Type | Required |
|-------|------|----------|
| `email` | String | ✅ |
| `password` | String | ✅ |

**Response:** `{ token, user: { id, name, email, role, credits, streakCount, badges, ... } }`

---

### GET `/api/auth/me` 🔒
Get the currently authenticated user's profile.

**Headers:** `x-auth-token: <JWT>`  
**Response:** User object (without password)

---

### PUT `/api/auth/update` 🔒
Update the authenticated user's profile.

**Updatable fields:** `name`, `phone`, `address`, `ngoCapacity`, `notifications`, `verificationDocument`, `isAvailable`, `servedGroups`, `volunteerSchedule`, `location`, `serviceRadius`

---

### GET `/api/auth/all-users` 🔒 (Admin Only)
Get all registered users with role-based filtering.

**Query Params:** `?role=Donor|NGO|Volunteer`

---

### PUT `/api/auth/train` 🔒
Mark volunteer as safety-trained.

---

### PUT `/api/auth/admin/ban/:userId` 🔒 (Admin Only)
Ban a user with a reason.

| Field | Type | Required |
|-------|------|----------|
| `reason` | String | ✅ |

---

### PUT `/api/auth/admin/unban/:userId` 🔒 (Admin Only)
Unban a previously banned user.

---

## 2. Food Listings (`/api/listings`)

### GET `/api/listings`
Get all active food listings (with smart expiry filtering).

**Query Params:**

| Param | Type | Description |
|-------|------|-------------|
| `search` | String | Search by title or description |
| `category` | String | Filter by category |
| `filterVeg` | String | `Veg`, `Non-Veg`, or `Vegan` |

**Response:** Array of listings with donor, claimedBy, collectedBy populated.

---

### GET `/api/listings/user/:id`
Get listing history for a specific user (as donor, claimer, or collector).

---

### GET `/api/listings/reported` 🔒 (Admin Only)
Get all reported listings with report details.

---

### POST `/api/listings` 🔒
Create a new food listing. Triggers geofencing notifications and matching engine.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Food item name |
| `description` | String | ❌ | Details |
| `quantity` | Number | ✅ | Amount |
| `unit` | String | ❌ | Default: `kg` |
| `category` | String | ❌ | `Cooked`, `Raw`, `Bakery`, etc. |
| `expiry_hours` | Number | ✅ | Hours until expiry |
| `dietaryType` | String | ❌ | `Veg`, `Non-Veg`, `Vegan` |
| `image` | String | ❌ | Image URL |
| `lat` | Number | ✅ | Latitude |
| `lng` | Number | ✅ | Longitude |
| `allergens` | Array | ❌ | e.g., `["nuts", "dairy"]` |
| `handlingInstructions` | String | ❌ | Special instructions |
| `containerType` | String | ❌ | `Disposable` or `Returnable` |
| `pickupNote` | String | ❌ | Pickup instructions |

---

### PUT `/api/listings/:id` 🔒
Update an existing listing (Donor only).

---

### DELETE `/api/listings/:id` 🔒
Delete a listing. Donors can delete their own; Admins can delete any.

---

### PUT `/api/listings/:id/status` 🔒
Update listing status through the delivery workflow.

| Status | Who Can Set | Description |
|--------|------------|-------------|
| `ReadyToPickup` | Donor | Mark food as ready for volunteer pickup |
| `Claimed` | NGO | Claim the listing |
| `In Transit` | Volunteer | Picked up, requires photo proof |
| `Delivered` | NGO/Volunteer | Delivery confirmed, awards credits |
| `Cancelled` | Donor | Cancel with reason |

**Special Logic:**
- Volunteers must be safety-trained
- In Transit requires `pickupProof` (photo URL)
- Delivered awards 10 credits to Donor, Volunteer, and NGO
- Volunteer badges awarded based on milestones

---

### PUT `/api/listings/:id/rate`
Rate a delivered donation (1-5 stars). Auto-bans donors with 3+ ratings of 1 star.

| Field | Type | Required |
|-------|------|----------|
| `rating` | Number | ✅ |
| `feedback` | String | ❌ |

---

### POST `/api/listings/:id/report` 🔒
Report a listing for safety concerns.

| Field | Type | Required |
|-------|------|----------|
| `reason` | String | ✅ |

---

## 3. Food Needs (`/api/food-needs`)

### GET `/api/food-needs`
Get all open food needs posted by NGOs.

### GET `/api/food-needs/my` 🔒
Get the authenticated NGO's food needs.

### POST `/api/food-needs` 🔒 (NGO Only)
Create a food need request. Triggers matching engine.

| Field | Type | Required |
|-------|------|----------|
| `title` | String | ✅ |
| `description` | String | ❌ |
| `category` | String | ❌ |
| `quantity` | Number | ✅ |
| `unit` | String | ❌ |
| `urgency` | String | ❌ |
| `isPerishable` | Boolean | ❌ |
| `lat`, `lng` | Number | ❌ |

### DELETE `/api/food-needs/:id` 🔒
Delete a food need (owner or Admin).

---

## 4. Statistics (`/api/stats`)

### GET `/api/stats`
Global platform impact statistics.

**Response:**
```json
{
  "total_donations": 150,
  "meals_saved": 375,
  "co2_saved": 375,
  "water_saved": 300000
}
```

### GET `/api/stats/leaderboard`
Top 3 contributors.

**Query:** `?type=donors` or `?type=volunteers`

### GET `/api/stats/user/:id`
Stats for a specific user (deliveries count and average rating).

---

## 5. Notifications (`/api/notifications`)

### GET `/api/notifications` 🔒
Get latest 20 notifications for the authenticated user.

### PUT `/api/notifications/:id/read` 🔒
Mark a single notification as read.

### PUT `/api/notifications/read-all` 🔒
Mark all notifications as read.

---

## 6. Bug Reports (`/api/bugs`)

### POST `/api/bugs` 🔒
Submit a bug report.

| Field | Type | Required |
|-------|------|----------|
| `description` | String | ✅ |

### GET `/api/bugs` 🔒 (Admin Only)
Get all bug reports with reporter details.

---

## 7. File Upload (`/api/upload`)

### POST `/api/upload` 🔒
Upload an image file (used for food listing photos and pickup proofs).

---

## Error Responses

All endpoints return standard error responses:

```json
{ "msg": "Error description" }
```

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized / Not Authenticated |
| 403 | Forbidden / Insufficient Permissions |
| 404 | Resource Not Found |
| 500 | Internal Server Error |
