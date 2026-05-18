# Graph Report - MAHE internship - 2  (2026-05-17)

## Corpus Check
- 73 files · ~16,836 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 281 nodes · 417 edges · 20 communities (18 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `998d6098`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 18 edges
2. `useAuth()` - 11 edges
3. `useToast()` - 9 edges
4. `ApiError` - 7 edges
5. `protect` - 6 edges
6. `scripts` - 5 edges
7. `ApiResponse` - 5 edges
8. `useTheme()` - 4 edges
9. `scripts` - 4 edges
10. `ThemeProvider()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `cn()` --calls--> `clsx`  [INFERRED]
  client/src/utils/helpers.js → client/package.json
- `ThemeToggle()` --calls--> `useTheme()`  [EXTRACTED]
  client/src/components/common/ThemeToggle.jsx → ThemeContext.jsx
- `ProtectedRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/components/auth/ProtectedRoute.jsx → client/src/context/AuthContext.jsx
- `Badge()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/common/Badge.jsx → client/src/utils/helpers.js
- `Button()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/common/Button.jsx → client/src/utils/helpers.js

## Communities (20 total, 2 thin omitted)

### Community 0 - "React UI & Routing Core"
Cohesion: 0.09
Nodes (18): ProtectedRoute(), icons, ToastContainer(), AuthContext, AuthProvider(), useAuth(), ToastContext, ToastProvider() (+10 more)

### Community 1 - "Server Core API & Models"
Cohesion: 0.08
Nodes (26): createScan, deleteScan, getMyScans, getScanById, changePassword, getProfile, getUsers, updateAvatar (+18 more)

### Community 2 - "Server Package Config"
Cohesion: 0.07
Nodes (27): author, dependencies, bcryptjs, cloudinary, cookie-parser, cors, dotenv, express (+19 more)

### Community 3 - "UI Components & Helpers"
Cohesion: 0.1
Nodes (19): Avatar(), Badge(), colors, Button(), sizes, variants, Card(), EmptyState() (+11 more)

### Community 4 - "Auth Services & Validation"
Cohesion: 0.17
Nodes (16): forgotPassword, getMe, login, logout, register, resetPassword, loginValidation, postValidation (+8 more)

### Community 5 - "Client Package Config"
Cohesion: 0.1
Nodes (19): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+11 more)

### Community 6 - "Community Forum API"
Cohesion: 0.18
Nodes (12): addComment, createPost, deletePost, getComments, getPostById, getPosts, toggleLike, Comment (+4 more)

### Community 7 - "Client External Dependencies"
Cohesion: 0.15
Nodes (13): dependencies, axios, clsx, lucide-react, motion, react, react-dom, react-hot-toast (+5 more)

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
Cohesion: 0.4
Nodes (3): fadeUp, timeline, values

### Community 15 - "Home Page Components"
Cohesion: 0.4
Nodes (3): fadeUp, features, stats

### Community 16 - "Public Layout & Footer"
Cohesion: 0.48
Nodes (4): ThemeToggle(), ThemeContext, ThemeProvider(), useTheme()

## Knowledge Gaps
- **104 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Components & Helpers` to `Client External Dependencies`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Client External Dependencies` to `Client Package Config`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `clsx` connect `Client External Dependencies` to `UI Components & Helpers`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _104 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `React UI & Routing Core` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Server Core API & Models` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Server Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._