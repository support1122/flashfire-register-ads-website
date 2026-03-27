# Register landing ↔ website backend

This Next.js app does **not** duplicate the API. **MongoDB, Discord, Calendly webhooks, reminders, and conversion APIs** are handled by **`flashfire-website-backend-main`** (same service that powers [www.flashfirejobs.com](https://www.flashfirejobs.com)).

## What the register app sends

- `POST /api/campaigns/track/visit` — when `utm_source` is in the URL (campaign visits).
- `POST /api/track/page-visit` — each route view (stored in MongoDB like the main site).
- `POST /api/campaign-bookings/frontend-capture` — after a Calendly booking from the modal; includes `leadSource: "register_landing"` for reporting.

The backend’s `saveCalendlyBooking` persists the document and runs **reminder scheduling** (calls, WhatsApp, Discord BDA) and server-side conversions — same path as the main website’s Calendly modal.

## Run API locally

1. Copy your production `.env` into `flashfire-website-backend-main/.env` (includes `MONGODB_URI`, `DISCORD_*`, etc.).
2. From that folder: `npm install` then `npm run dev` (or `npm start`).
3. In `register-landing/.env.local` set:

   `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`

   (Use the port your backend prints; `PORT` in backend `.env` defaults to 5000.)

4. Run register: `npm run dev` in `register-landing`.

CORS in the backend is already permissive for browser calls from localhost or other origins.

## Production

Deploy **register-landing** with `NEXT_PUBLIC_API_BASE_URL=https://api.flashfirejobs.com` (or your deployed API URL). No MongoDB or Discord variables belong in the register app’s env.
