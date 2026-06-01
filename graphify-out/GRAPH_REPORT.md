# Graph Report - MAHE internship - 2  (2026-05-31)

## Corpus Check
- 135 files · ~48,361 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 553 nodes · 839 edges · 35 communities (29 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1573f4be`
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
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 33|Community 33]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 28 edges
2. `cn()` - 21 edges
3. `useToast()` - 12 edges
4. `AgroCare AI — Development Setup Guide` - 8 edges
5. `AgroCare AI - Project Status & Analysis` - 7 edges
6. `useTheme()` - 7 edges
7. `protect` - 7 edges
8. `ApiError` - 7 edges
9. `AgroCare AI Roadmap & TODO` - 6 edges
10. `Implementation Notes` - 5 edges

## Surprising Connections (you probably didn't know these)
- `cn()` --calls--> `clsx`  [INFERRED]
  client/src/utils/helpers.js → client/package.json
- `CommunityHubContent()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/components/dashboard/CommunityHubContent.jsx → client/src/context/AuthContext.jsx
- `DashboardShell()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/components/dashboard/DashboardShell.jsx → client/src/context/AuthContext.jsx
- `ProfileContent()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/components/profile/ProfileContent.jsx → client/src/context/AuthContext.jsx
- `PublicProfile()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/pages/PublicProfile.jsx → client/src/context/AuthContext.jsx

## Communities (35 total, 6 thin omitted)

### Community 0 - "React UI & Routing Core"
Cohesion: 0.06
Nodes (32): ProtectedRoute(), Button(), sizes, variants, Input(), Logo(), icons, ToastContainer() (+24 more)

### Community 1 - "Server Core API & Models"
Cohesion: 0.06
Nodes (33): deleteNotification, getNotifications, markAllRead, markAsRead, createScan, deleteScan, getMyScans, getScanById (+25 more)

### Community 2 - "Server Package Config"
Cohesion: 0.07
Nodes (27): author, dependencies, bcryptjs, cloudinary, cookie-parser, cors, dotenv, express (+19 more)

### Community 3 - "UI Components & Helpers"
Cohesion: 0.13
Nodes (16): Avatar(), Badge(), colors, Card(), EmptyState(), SkeletonAvatar(), SkeletonCard(), SkeletonLine() (+8 more)

### Community 4 - "Auth Services & Validation"
Cohesion: 0.16
Nodes (17): forgotPassword, getMe, googleLogin, login, logout, register, resetPassword, loginValidation (+9 more)

### Community 5 - "Client Package Config"
Cohesion: 0.06
Nodes (33): dependencies, axios, clsx, firebase, lucide-react, motion, react, react-dom (+25 more)

### Community 6 - "Community Forum API"
Cohesion: 0.18
Nodes (5): Community(), fadeUp, features, Home(), stats

### Community 7 - "Client External Dependencies"
Cohesion: 0.1
Nodes (19): 1. Backend Configuration (`server/.env`), 1. Start the Backend (Express), 2. Frontend Configuration (`client/.env`), 2. Start the Frontend (Vite/React), AgroCare AI — Development Setup Guide, Available Scripts, Backend (`server/`), code:ini (NODE_ENV=development) (+11 more)

### Community 8 - "Server Database & Config"
Cohesion: 0.22
Nodes (4): connectDB(), optionalEnvVars, requiredEnvVars, startServer()

### Community 9 - "Notification API"
Cohesion: 0.11
Nodes (6): ChartsWidgets(), COLORS, diseaseDistributionData, healthTrendData, sectorPerformanceData, useContainerSize()

### Community 10 - "Client API Services"
Cohesion: 0.06
Nodes (25): NotificationSkeleton(), CommentItem(), CATEGORY_CONFIG, rankColors, alerts, contributors, trendingDiseases, NotificationContext (+17 more)

### Community 11 - "API Error Handling"
Cohesion: 0.12
Nodes (17): CropCardSkeleton(), DashboardSkeleton(), PageSuspenseLoader(), PostSkeleton(), POPULAR_CROPS, CropCard(), CropDrawer(), CropDrawer (+9 more)

### Community 12 - "Server Constants"
Cohesion: 0.33
Nodes (5): NOTIFICATION_TYPES, PAGINATION, POST_CATEGORIES, SCAN_STATUS, USER_ROLES

### Community 14 - "About Page Components"
Cohesion: 0.11
Nodes (17): AgroCare AI - Project Status & Analysis, Architecture Overview, Authentication & Security, Backend (http://localhost:5000/api), Community Hub, 🟢 Completed Features, Core Infrastructure, Current Working Routes/Pages (+9 more)

### Community 15 - "Home Page Components"
Cohesion: 0.12
Nodes (18): addComment, createPost, deleteComment, deletePost, getComments, getPostById, getPosts, getReplies (+10 more)

### Community 16 - "Public Layout & Footer"
Cohesion: 0.11
Nodes (16): About, AIChatHub, App(), Community, CommunityHub, Contact, CropTracking, Dashboard (+8 more)

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (8): AgroCare AI, 🏗️ Architecture Overview, code:bash (# Terminal 1: Start Backend), Current (Completed), ✨ Features, 🚀 Quick Links, 💻 Running the Project Locally, Upcoming (Roadmap)

### Community 21 - "Community 21"
Cohesion: 0.29
Nodes (6): AgroCare AI Roadmap & TODO, Phase 1: Core Foundation (✅ COMPLETED), Phase 2: Dashboard & Core UX (🚧 IN PROGRESS), Phase 3: AI Integration & Scanning (🔴 PENDING), Phase 4: Data & Tracking (🔴 PENDING), Phase 5: Community Platform (🔴 PENDING)

### Community 22 - "Community 22"
Cohesion: 0.22
Nodes (3): AI_RESPONSES, QUICK_PROMPTS, SUGGESTED_QUESTIONS

### Community 23 - "Community 23"
Cohesion: 0.17
Nodes (13): archiveCrop, createCrop, deleteCrop, getCropById, getCrops, getCropStats, logWater, restoreCrop (+5 more)

### Community 24 - "Community 24"
Cohesion: 0.5
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

### Community 29 - "Community 29"
Cohesion: 0.36
Nodes (5): ThemeToggle(), ThemeContext, ThemeProvider(), useTheme(), TabSettings()

### Community 31 - "Community 31"
Cohesion: 0.48
Nodes (5): About(), fadeUp, team, timeline, values

## Knowledge Gaps
- **166 isolated node(s):** `Architecture Overview`, `Core Infrastructure`, `Authentication & Security`, `Community Hub`, `Dashboard UI` (+161 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Components & Helpers` to `React UI & Routing Core`, `Client Package Config`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `clsx` connect `Client Package Config` to `UI Components & Helpers`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `Architecture Overview`, `Core Infrastructure`, `Authentication & Security` to the rest of the system?**
  _166 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `React UI & Routing Core` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Server Core API & Models` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Server Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `UI Components & Helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._