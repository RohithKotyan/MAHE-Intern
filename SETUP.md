# AgroCare AI — Development Setup Guide

## Prerequisites

- **Node.js** v18+ (check: `node --version`)
- **MongoDB** running locally or MongoDB Atlas connection string
- **.env files** configured (see below)

---

## Quick Start

### 1. Backend Setup

```bash
cd server
npm install
# Create .env file with:
# NODE_ENV=development
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/agrocare-ai
# JWT_SECRET=your_secret_key_here

npm run dev
# Server starts at http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
# Dev server starts at http://localhost:5173 (or 5174 if port busy)
```

Both servers will now communicate:
- Frontend proxy: `/api` → backend at `http://localhost:5000`
- Authentication: JWT tokens in cookies and localStorage

---

## Available Scripts

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart on changes)
npm run start    # Production start
npm run test     # Run tests (placeholder)
```

### Frontend
```bash
npm run dev      # Start dev server with HMR
npm run build    # Build for production (→ dist/)
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Testing the Application

### 1. Health Check
```bash
# Backend health
curl http://localhost:5000/api/health
# Expected: { "success": true, "message": "AgroCare AI API is running", ... }
```

### 2. User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Farmer",
    "email": "john@example.com",
    "password": "password123",
    "role": "farmer"
  }'
# Expected: { "success": true, "data": { "user": {...}, "token": "..." } }
```

### 3. User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
# Expected: Token in response + HTTP-only cookie set
```

### 4. Protected Route
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token_from_login>"
# Expected: Current user data
```

### 5. Frontend Routes
- Home: `http://localhost:5173/`
- Login: `http://localhost:5173/login`
- Sign Up: `http://localhost:5173/signup`
- Dashboard (protected): `http://localhost:5173/dashboard`
- Features: `http://localhost:5173/features`
- About: `http://localhost:5173/about`
- Contact: `http://localhost:5173/contact`
- 404: `http://localhost:5173/anything-invalid`

---

## Environment Variables

### Backend (.env)
```
# Server
NODE_ENV=development          # development or production
PORT=5000                     # Server port

# Database
MONGO_URI=mongodb://localhost:27017/agrocare-ai
# For MongoDB Atlas:
# mongodb+srv://user:pass@cluster.mongodb.net/agrocare-ai?retryWrites=true&w=majority

# JWT
JWT_SECRET=super_secret_key   # Change in production!
JWT_EXPIRE=7d                 # Token expiration
JWT_COOKIE_EXPIRE=7           # Cookie expiration in days

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
```

### Frontend (.env) — Not needed for MVP
Frontend reads backend URL from vite.config.js proxy (hardcoded to localhost:5000 in dev)

---

## Project Structure

### Backend
```
server/
├── config/       # DB, Cloudinary, environment setup
├── models/       # Mongoose schemas
├── controllers/  # Route handlers
├── routes/       # API endpoints
├── middleware/   # Auth, validation, error handling
├── services/     # Business logic (email, image uploads)
├── utils/        # Helper classes
├── app.js        # Express app
├── server.js     # Entry point
└── .env          # Secrets (not in git)
```

### Frontend
```
client/
├── src/
│   ├── pages/        # Route components
│   ├── components/   # UI components
│   ├── context/      # React contexts (Auth, Theme, Toast)
│   ├── services/     # API client (Axios)
│   ├── utils/        # Helpers (formatters, classname utility)
│   ├── App.jsx       # Router
│   ├── main.jsx      # Entry with providers
│   └── index.css     # Tailwind + theme variables
├── vite.config.js    # Vite + Tailwind v4 config
└── package.json
```

---

## Useful Links

- **Backend Health**: http://localhost:5000/api/health
- **Frontend Dev**: http://localhost:5173/
- **API Documentation**: See [server/routes/](server/routes/) for endpoints
- **Component Docs**: See [client/src/components/](client/src/components/) for UI components

---

## Troubleshooting

### Port already in use
```bash
# Find process on port
lsof -i :5000     # Linux/Mac
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess  # Windows

# Kill process (or use different port in .env)
kill -9 <PID>    # Linux/Mac
```

### MongoDB connection fails
- Make sure MongoDB is running locally: `mongod`
- Or use MongoDB Atlas and update `MONGO_URI` in .env
- App will start without DB in development mode (graceful fallback)

### Vite port in use
- Vite automatically tries next port (5174, 5175, etc.)
- Or set `PORT` in vite.config.js

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Dark mode not working
- Check localStorage for `agrocare-theme` key
- Check if `dark` class is on `<html>` element
- Components use CSS variables: `var(--bg-primary)`, `var(--text-primary)`, etc.

---

## Next Development Tasks

1. **Implement AI disease detection** on `/api/scans` endpoint
2. **Create community features** (posts, comments, likes)
3. **Build dashboard pages** (reports, community, settings)
4. **Add email integration** (Nodemailer/SendGrid)
5. **Connect to Cloudinary** for image storage
6. **Add comprehensive tests**
7. **Deploy to production**

---

**Happy coding! 🌱**
