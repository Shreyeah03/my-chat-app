# My Chat App

>A simple real-time chat application (ongoing project) with a React + Vite client and a Node.js server.

## Overview

This repository contains a small chat application split into two parts:
- `client/` — React frontend built with Vite, Tailwind CSS and Firebase for auth and media (optional).
- `server/` — Minimal Node.js backend (WebSocket/socket.io or simple HTTP) for real-time messaging.

The project is in active development. This README explains how to get the code running locally, where to find key files, and how to configure environment variables.

## Features

- Real-time messaging between connected clients
- User authentication (Firebase)
- Avatar setup and simple chat UI

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js (plain or with socket.io)
- Auth / Storage: Firebase (client/src/firebase.js)

## Repository structure

```
./
  package.json        # monorepo-level scripts (if any)
  client/             # React + Vite frontend
  server/             # Node.js backend
```

Key client files
- `client/src/main.jsx` — app entry
- `client/src/firebase.js` — firebase initialization
- `client/src/pages/` — auth, chat, avatar pages

Key server files
- `server/server.js` — backend server

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- A Firebase project (if you want auth / storage features)

## Local setup

1. Clone the repo (if you haven't already):

```bash
git clone <your-repo-url>
cd my-chat-app
```

2. Install dependencies for client and server:

```bash
cd client
npm install

cd ../server
npm install
```

3. Configure environment / Firebase

- The client expects Firebase config in `client/src/firebase.js` (or via environment variables in your setup). Open that file and populate your Firebase configuration (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).
- If the server requires env variables, create a `.env` file in `server/` and add the required variables. Check `server/server.js` for expected variables.

4. Run the app

In two separate terminals run the client and server:

Client (development):

```bash
cd client
npm run dev
```

Server (development):

```bash
cd server
npm start
# or
node server.js
```

If `npm run dev` fails, open `client/package.json` to confirm the scripts and run the correct script name (for example `npm run start` or `npm run dev`).

## Building for production

Build the client and serve the static files from the server (if desired):

```bash
cd client
npm run build

# copy the build output to server/public or configure your server to serve client/dist
```

## Deployment

- Deploy the client to Vercel, Netlify, Firebase Hosting, or similar.
- Deploy the server to any Node hosting (Heroku, Render, digitalocean, etc.) or run as a serverless function depending on your architecture.

## Contributing

- Open an issue or submit a pull request.
- Keep changes focused and include descriptive commit messages.

## Troubleshooting

- If you see `Your branch is ahead of 'origin/main' by N commits`, push with `git push origin main` to publish commits.
- If `npm run dev` exits with an error, inspect the client terminal output for missing environment variables or port conflicts.

## Next steps / TODO

- Add automated tests
- Improve error handling on server
- Add end-to-end tests for chat flows

## License

Specify a license for the project (e.g. MIT) or add a `LICENSE` file.

---

If you want, I can also:
- update `client/README.md` to point to this root README,
- or create a short CONTRIBUTING.md and LICENSE file.
