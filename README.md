# SoloSync Frontend

React + TypeScript + Vite application for SoloSync.

## MVP flow

1. Sign in or create a SoloSync account.
2. Connect the user's WhatsApp account through a WAHA session.
3. Scan the QR code from WhatsApp Linked Devices.
4. Wait for the session to reach WORKING.
5. Enter a WhatsApp chat or channel ID.
6. Publish a text message.
7. The backend queues the message and records ₹0.10 usage after a successful send.

Current test pricing is **₹399 activation + ₹0.10 per successful message**. Payments are disabled in the MVP; the backend records the ledger only.

## Local

    npm install
    VITE_API_URL=http://localhost:4000 npm run dev

## Docker

    docker build --build-arg VITE_API_URL=https://api.solosync.live -t solosync-frontend .
    docker run --rm -p 8080:80 solosync-frontend

The API URL is a build-time Vite variable. Rebuild the image when the production API origin changes.
