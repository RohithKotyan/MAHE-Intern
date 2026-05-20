# Graph Report - MAHE internship - 2  (2026-05-20)

## Corpus Check
- 78 files · ~19,639 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 364 nodes · 536 edges · 24 communities (21 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba68a863`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_React UI & Routing Core|React UI & Routing Core]]
- [[_COMMUNITY_Server Core API & Models|Server Core API & Models]]
- [[_COMMUNITY_Server Package Config|Server Package Config]]
- [[_COMMUNITY_UI Components & Helpers|UI Components & Helpers]]
- [[_COMMUNITY_Auth Services & Validation|Auth Services & Validation]]
- [[_COMMUNITY_Client Package Config|Client Package Config]]
- [[_COMMUNITY_Community Forum API|Community Forum API]]
- [[_COMMUNITY_Client External Dependencies|Client External Dependencies]]
- [[_COMMUNITY_Server Database & Config|Server Database & Config]]
- [[_COMMUNITY_Notification API|Notification API]]
- [[_COMMUNITY_Client API Services|Client API Services]]
- [[_COMMUNITY_API Error Handling|API Error Handling]]
- [[_COMMUNITY_Server Constants|Server Constants]]
- [[_COMMUNITY_API Response Formatting|API Response Formatting]]
- [[_COMMUNITY_About Page Components|About Page Components]]
- [[_COMMUNITY_Home Page Components|Home Page Components]]
- [[_COMMUNITY_Public Layout & Footer|Public Layout & Footer]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 21 edges
2. `useAuth()` - 14 edges
3. `useToast()` - 12 edges
4. `AgroCare AI — Development Setup Guide` - 8 edges
5. `AgroCare AI - Project Status & Analysis` - 7 edges
6. `ApiError` - 7 edges
7. `AgroCare AI Roadmap & TODO` - 6 edges
8. `protect` - 6 edges
9. `Implementation Notes` - 5 edges
10. `AgroCare AI` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Button()` --calls--> `cn()`  [EXTRACTED]
  components/common/Button.jsx → client/src/utils/helpers.js
- `Input()` --calls--> `cn()`  [EXTRACTED]
  components/common/Input.jsx → client/src/utils/helpers.js
- `cn()` --calls--> `clsx`  [INFERRED]
  client/src/utils/helpers.js → client/package.json
- `Card()` --calls--> `cn()`  [EXTRACTED]
  components/common/Card.jsx → client/src/utils/helpers.js
- `ThemeToggle()` --calls--> `useTheme()`  [EXTRACTED]
  components/common/ThemeToggle.jsx → ThemeContext.jsx

## Communities (24 total, 3 thin omitted)

### Community 0 - "React UI & Routing Core"
Cohesion: 0.07
Nodes (28): ProtectedRoute(), Button(), sizes, variants, Input(), Logo(), icons, ToastContainer() (+20 more)

### Community 1 - "Server Core API & Models"
Cohesion: 0.07
Nodes (35): addComment, createPost, deletePost, getComments, getPostById, getPosts, toggleLike, createScan (+27 more)

### Community 2 - "Server Package Config"
Cohesion: 0.07
Nodes (27): author, dependencies, bcryptjs, cloudinary, cookie-parser, cors, dotenv, express (+19 more)

### Community 3 - "UI Components & Helpers"
Cohesion: 0.17
Nodes (12): Avatar(), Badge(), colors, Card(), EmptyState(), SkeletonAvatar(), SkeletonCard(), SkeletonLine() (+4 more)

### Community 4 - "Auth Services & Validation"
Cohesion: 0.13
Nodes (20): forgotPassword, getMe, googleLogin, login, logout, register, resetPassword, loginValidation (+12 more)

### Community 5 - "Client Package Config"
Cohesion: 0.06
Nodes (33): dependencies, axios, clsx, firebase, lucide-react, motion, react, react-dom (+25 more)

### Community 6 - "Community Forum API"
Cohesion: 0.43
Nodes (5): About(), fadeUp, team, timeline, values

### Community 7 - "Client External Dependencies"
Cohesion: 0.1
Nodes (19): 1. Backend Configuration (`server/.env`), 1. Start the Backend (Express), 2. Frontend Configuration (`client/.env`), 2. Start the Frontend (Vite/React), AgroCare AI — Development Setup Guide, Available Scripts, Backend (`server/`), code:ini (NODE_ENV=development) (+11 more)

### Community 8 - "Server Database & Config"
Cohesion: 0.22
Nodes (4): connectDB(), optionalEnvVars, requiredEnvVars, startServer()

### Community 9 - "Notification API"
Cohesion: 0.29
Nodes (7): deleteNotification, getNotifications, markAllRead, markAsRead, Notification, notificationSchema, router

### Community 10 - "Client API Services"
Cohesion: 0.22
Nodes (7): api, token, authService, communityService, notificationService, scanService, userService

### Community 12 - "Server Constants"
Cohesion: 0.33
Nodes (5): NOTIFICATION_TYPES, PAGINATION, POST_CATEGORIES, SCAN_STATUS, USER_ROLES

### Community 14 - "About Page Components"
Cohesion: 0.11
Nodes (17): AgroCare AI - Project Status & Analysis, Architecture Overview, Authentication & Security, Backend Community Features, Backend (http://localhost:5000/api), 🟢 Completed Features, Core Infrastructure, Current Working Routes/Pages (+9 more)

### Community 15 - "Home Page Components"
Cohesion: 0.33
Nodes (4): fadeUp, features, Home(), stats

### Community 16 - "Public Layout & Footer"
Cohesion: 0.29
Nodes (6): ThemeToggle(), AuthProvider(), ThemeContext, ThemeProvider(), useTheme(), ToastProvider()

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (8): AgroCare AI, 🏗️ Architecture Overview, code:bash (# Terminal 1: Start Backend), Current (Completed), ✨ Features, 🚀 Quick Links, 💻 Running the Project Locally, Upcoming (Roadmap)

### Community 21 - "Community 21"
Cohesion: 0.29
Nodes (6): AgroCare AI Roadmap & TODO, Phase 1: Core Foundation (✅ COMPLETED), Phase 2: Dashboard & Core UX (🚧 IN PROGRESS), Phase 3: AI Integration & Scanning (🔴 PENDING), Phase 4: Data & Tracking (🔴 PENDING), Phase 5: Community Platform (🔴 PENDING)

### Community 22 - "Community 22"
Cohesion: 0.4
Nodes (4): fadeUp, features, plans, workflow

## Knowledge Gaps
- **132 isolated node(s):** `navLinks`, `team`, `workflow`, `Architecture Overview`, `Core Infrastructure` (+127 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Components & Helpers` to `React UI & Routing Core`, `Client Package Config`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `clsx` connect `Client Package Config` to `UI Components & Helpers`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `navLinks`, `team`, `workflow` to the rest of the system?**
  _132 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `React UI & Routing Core` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Server Core API & Models` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Server Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Auth Services & Validation` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._