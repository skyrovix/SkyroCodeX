# SkyroCodeX 🚀

> **Code. Run. Share. Instantly.**  
> A production-ready online code compiler and IDE website by **Skyrovix**.

![SkyroCodeX](public/logo.svg)

---

## 🌟 Features

- **Multi-Language Support**:
  - Python 3.10
  - JavaScript (Node.js)
  - Java (OpenJDK)
  - C (GCC)
  - C++ (G++)
  - Go
  - PHP
  - SQL (SQLite3)
  - **Web Mode**: Interactive HTML5 / CSS3 / JavaScript with live sandboxed preview (`sandbox="allow-scripts"`)
- **Monaco Editor (VS Code Experience)**:
  - Custom dark theme with electric blue-to-violet accents
  - Dynamic font size adjustment (`A-` / `A+`)
  - Auto-complete, syntax highlighting, bracket matching, line numbers
  - Multi-tab file switching
  - Keyboard shortcuts (`Ctrl + Enter` to run, `Ctrl + S` to share)
- **Input / Output Panel**:
  - Dedicated `stdin` input box for user interaction
  - Real-time `stdout` and `stderr` terminal stream
  - Execution runtime stats (Wall time in ms, Memory in KB, Exit status code)
- **Enterprise Sandboxing & Security**:
  - Isolated execution containers via Piston / Judge0
  - 5-second CPU execution timeout
  - 256MB RAM memory limit
  - Rate limiting (Sliding window memory for dev; Upstash Redis for serverless production)
  - Strict input sanitization and payload size limits
- **Sharing & Workspaces**:
  - Instant unique share links (`/s/[shortId]`)
  - Local caching fallback (`localStorage`) for zero-barrier offline testing
  - Full Supabase PostgreSQL schema with Row-Level Security (RLS)

---

## 🏗️ Architecture

```
                                  +-----------------------------+
                                  |   Next.js 15 (App Router)   |
                                  |   Monaco Editor + Tailwind  |
                                  +--------------+--------------+
                                                 |
                                         POST /api/run
                                                 |
                       +-------------------------+-------------------------+
                       |                                                   |
              (Development Mode)                                 (Production Mode)
                       |                                                   |
         +-------------v-------------+                       +-------------v-------------+
         |     Public Piston API     |                       |    Self-Hosted Piston /   |
         |  (Configurable via URL)   |                       |    Judge0 CE in Docker    |
         +---------------------------+                       +---------------------------+
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment
Create your `.env.local`:
```bash
cp .env.example .env.local
```

Default `.env.local` contents:
```env
PISTON_API_URL=https://emkc.org/api/v2/piston
NEXT_PUBLIC_APP_URL=http://localhost:3000
RATE_LIMIT_TYPE=memory
RATE_LIMIT_MAX_REQUESTS=30
RATE_LIMIT_WINDOW_SECONDS=60
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- Landing Page: `http://localhost:3000/`
- Full IDE Compiler: `http://localhost:3000/editor`
- Shared Snippet: `http://localhost:3000/s/[shortId]`
- Workspace Dashboard: `http://localhost:3000/dashboard`

---

## 🐳 Self-Hosted Production Sandbox

### Self-Hosted Piston (Recommended)
```bash
docker compose -f docker/docker-compose.piston.yml up -d
```
Update `.env.local`:
```env
PISTON_API_URL=http://localhost:2000/api/v2
```

### Self-Hosted Judge0 CE
```bash
docker compose -f docker/docker-compose.judge0.yml up -d
```
Update `.env.local`:
```env
CODE_EXECUTION_ENGINE=judge0
JUDGE0_API_URL=http://localhost:2358
```

---

## 🗄️ Supabase Database Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and run the entire contents of `supabase/schema.sql`.
4. Copy your project URL and keys to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Enter` (or `⌘ + Enter`) | Run / Execute code in sandbox |
| `Ctrl + S` (or `⌘ + S`) | Generate share link / save snippet |
| `Ctrl + /` (or `⌘ + /`) | Toggle line comment in Monaco |
| `Alt + Shift + F` | Auto-format document |
| `Esc` | Close active dialogs |

---

## 📄 License
Built with ❤️ by **Skyrovix**.

