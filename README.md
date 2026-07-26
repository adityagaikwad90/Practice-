# React + Vite + Express + Node Starter Project

A modern, full-stack starter template with **React (Vite)** on the frontend and **Express (Node.js)** on the backend REST API.

## 📁 Project Structure

```
practice project/
├── server/                      # Express REST API (Node.js)
│   ├── index.js                 # Server entry point & REST endpoints
│   └── package.json             # Server dependencies (express, cors)
├── client/                      # React Frontend (Vite)
│   ├── vite.config.js           # Vite config with API proxy (/api -> localhost:5001)
│   ├── package.json             # Frontend dependencies (react, lucide-react)
│   └── src/                     # React source code & styles
├── package.json                 # Root script runner
└── README.md                    # Documentation
```

## 🚀 Quick Start Instructions

### 1. Install Dependencies

You can install dependencies for both `server` and `client` at once:

```bash
npm run install:all
```

Or manually:

```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

---

### 2. Running the Project

#### Option A: Run Both Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```
- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001](http://localhost:5001)

#### Option B: Run Individually in Separate Terminals

**Backend Express Server**:
```bash
npm run start:server
```
or
```bash
cd server
npm start
```

**Frontend React Client**:
```bash
npm run start:client
```
or
```bash
cd client
npm run dev
```

---

## 📡 API Endpoints

- `GET /api/health` - Server status & connection check
- `GET /api/tasks` - List all tasks (supports `search`, `category`, and `completed` query filters)
- `POST /api/tasks` - Add a new task (`{ title, category, priority }`)
- `PUT /api/tasks/:id` - Update / toggle completion status
- `DELETE /api/tasks/:id` - Delete a task by ID
- `GET /api/stats` - Summary statistics (total, completed, pending, completion rate)

---

## 🎨 Features & Highlights

- **Vite Proxy**: Pre-configured in `client/vite.config.js` to route all `/api/*` requests directly to `http://localhost:5001`.
- **Live Status Indicator**: Client continuously monitors backend server health.
- **Glassmorphism Dark Theme**: Modern UI styled with custom CSS variables, responsive grid metrics, and Google Fonts (`Outfit` & `Inter`).
