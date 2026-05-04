# 💬 Bubble Chat

A real-time chat application built with Next.js and Socket.IO.

---
Link : https://bubble-chat-wy6m.onrender.com/
  (if you face server error visit its server first: https://backend-nouo.onrender.com)
  

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

---

## ⚙️ Environment Setup

### Frontend — create `.env.local` in the root of the frontend directory

```env
NEXT_PUBLIC_Socket_Server_URL=https://your-backend-url.com
NEXT_PUBLIC_Frontend_URL=https://your-frontend-url.com
NEXT_PUBLIC_POST_URL=https://your-backend-url.com/chk
```

> For local development:
> ```env
> NEXT_PUBLIC_Socket_Server_URL=http://localhost:4000
> NEXT_PUBLIC_Frontend_URL=http://localhost:3000
> NEXT_PUBLIC_POST_URL=http://localhost:4000/chk
> ```

---

### Backend — create `.env` in the root of the backend directory

```env
PORT=4000
CLIENT_URL=https://your-frontend-url.com
```

> For local development:
> ```env
> PORT=4000
> CLIENT_URL=http://localhost:3000
> ```

---

## 📦 Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

---

## 🌐 Deployment

When deploying, replace the environment variables with your actual hosted URLs:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_Socket_Server_URL` | Your deployed backend Socket.IO URL |
| `NEXT_PUBLIC_Frontend_URL` | Your deployed frontend URL |
| `NEXT_PUBLIC_POST_URL` | Your deployed backend API endpoint |
| `PORT` | Port for the backend server (default: 4000) |
| `CLIENT_URL` | Your deployed frontend URL (used by backend for CORS) |

---

