# SoloSync Frontend

React + TypeScript + Vite user application. Authentication uses secure HTTP-only cookies issued by the backend.

## Local

    npm install
    VITE_API_URL=http://localhost:4000 npm run dev

## Docker

    docker build --build-arg VITE_API_URL=https://api.solosync.live -t solosync-frontend .
    docker run --rm -p 8080:80 solosync-frontend

The API URL is a build-time Vite variable. Rebuild the image when the production API origin changes.