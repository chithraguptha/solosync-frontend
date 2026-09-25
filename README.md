# SoloSync Frontend

React + TypeScript + Vite user application. Authentication uses secure HTTP-only cookies issued by the backend.

## Local

    npm install
    VITE_API_URL=http://localhost:4000 npm run dev

## Docker

    docker build -t solosync-frontend .
    docker run --rm -p 8080:80 solosync-frontend

Set VITE_API_URL at build time for a production API origin.