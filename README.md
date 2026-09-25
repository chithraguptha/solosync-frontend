# SoloSync Frontend

React + TypeScript + Vite dashboard for SoloSync.

## Features

- Email/password and Google authentication.
- WhatsApp QR pairing and connection status.
- Text message publishing and history.
- Dashboard delivery statistics.
- Razorpay activation checkout.
- Razorpay prepaid wallet top-ups.
- Responsive operations-oriented UI.

## Local

The recommended whole-stack setup lives in the backend repository: clone backend and frontend side by side, then from backend run `docker compose -f docker-compose.local.yml up --build` and open `http://localhost:5173`.

For frontend-only development:

```bash
npm install
VITE_API_URL=http://localhost:4000 npm run dev
```

Razorpay Checkout is loaded from Razorpay's hosted Checkout script. Payment secrets are never placed in the frontend; only the public Razorpay key and order metadata are returned by the backend.