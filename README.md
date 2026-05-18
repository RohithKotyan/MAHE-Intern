# AgroCare AI

AgroCare AI is a full-stack, AI-powered agricultural platform designed to help farmers detect plant diseases, connect with experts, and manage their crop health. 

## 🏗️ Architecture Overview

The platform uses a modern, scalable MERN-stack architecture infused with Firebase for robust authentication.

**Frontend**: React 19 + Vite, Tailwind CSS v4, Context API  
**Backend**: Node.js, Express.js  
**Database**: MongoDB Atlas  
**Authentication**: Firebase (Google OAuth) + Custom JWT Sessions  

**Flow Overview:**
`Frontend` → `Firebase Auth` → `Express Backend` → `MongoDB Atlas` → `JWT Session`

---

## ✨ Features

### Current (Completed)
- **Local Authentication:** Secure Email/Password registration and login with bcrypt hashing.
- **Google OAuth:** Seamless "Continue with Google" integration using Firebase, merging intelligently into the local database.
- **JWT Sessions:** Rock-solid HTTP-only cookies and Bearer tokens for secure, persistent user sessions.
- **Premium UI:** Dark-themed, highly responsive interface with micro-animations.
- **Role-Based Access:** Protected routes based on user types (Farmer, Expert, Admin).

### Upcoming (Roadmap)
- **Disease Scan Upload:** Machine learning analysis of plant images.
- **Community Forum:** A space for farmers and experts to discuss and share knowledge.
- **Weather Integration:** Localized, real-time farm weather data.

---

## 🚀 Quick Links

- [Setup & Installation Guide](./SETUP.md)
- [Project Status & Implementation Notes](./PROJECT_STATUS.md)
- [Development Roadmap](./TODO.md)

---

## 💻 Running the Project Locally

Please refer to the [SETUP.md](./SETUP.md) file for comprehensive environment variable configurations and setup steps for Firebase and MongoDB.

```bash
# Terminal 1: Start Backend
cd server
npm install
npm run dev

# Terminal 2: Start Frontend
cd client
npm install
npm run dev
```
