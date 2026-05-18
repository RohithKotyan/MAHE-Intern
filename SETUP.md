# AgroCare AI — Development Setup Guide

## Prerequisites
- **Node.js** v18+ 
- **MongoDB Atlas** Account (or local MongoDB)
- **Firebase** Account (for Google OAuth)

---

## Environment Variables Configuration

You must create two `.env` files in your project.

### 1. Backend Configuration (`server/.env`)
```ini
NODE_ENV=development
PORT=5000

# MongoDB Atlas Configuration
# Ensure your current IP is whitelisted in your Atlas Network Access settings
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/agrocare?retryWrites=true&w=majority

# JWT Settings
JWT_SECRET=super_secret_jwt_key_for_development_only
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
```

### 2. Frontend Configuration (`client/.env`)
```ini
# Firebase Configuration
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

---

## Quick Start: Running the Application

### 1. Start the Backend (Express)
```bash
cd server
npm install
npm run dev
# Server starts at http://localhost:5000
```

### 2. Start the Frontend (Vite/React)
```bash
cd client
npm install
npm run dev
# Dev server starts at http://localhost:5173
```

---

## Firebase Configuration Setup

To enable Google Authentication:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (e.g., `agrocare-ai`).
3. Go to **Build > Authentication** and enable the **Google** sign-in method.
4. Go to **Project Settings > General**, scroll down, and register a new **Web App**.
5. Copy the generated `firebaseConfig` keys and paste them into your `client/.env` file with the `VITE_` prefix as shown in the Environment Variables section.

## MongoDB Atlas Configuration Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a cluster.
3. Go to **Database Access** and create a user with read/write permissions.
4. Go to **Network Access** and add your current IP address (or `0.0.0.0/0` for universal access during dev).
5. Go to **Database > Connect > Drivers** and copy your connection string.
6. Paste it into `server/.env` as `MONGO_URI`, replacing `<username>` and `<password>` with your database user credentials.

---

## Available Scripts

### Backend (`server/`)
- `npm run dev` - Start with nodemon (auto-restarts).
- `npm run start` - Production start.

### Frontend (`client/`)
- `npm run dev` - Start dev server with HMR.
- `npm run build` - Build for production into `dist/`.
- `npm run lint` - Run ESLint.

---

## Project Structure Overview

```text
agrocare-ai/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Buttons, Inputs)
│   │   ├── config/         # Firebase initialization
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── pages/          # Login, Signup, Dashboard
│   │   └── services/       # Axios API interceptors
│   └── .env                # Firebase Credentials
│
└── server/                 # Express Backend
    ├── controllers/        # Auth (Google/Local), Users
    ├── models/             # Mongoose (User schema)
    ├── routes/             # Express API Endpoints
    └── .env                # DB & JWT Credentials
```
