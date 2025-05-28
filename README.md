# Task Manager API (MERN Backend)

A simple backend API for managing tasks with features like search, filter, pagination, and sorting — built using Node.js, Express, and MongoDB.

## 📁 Project Structure

```
backend/
├── config/           # MongoDB connection
├── controllers/      # Route logic
├── models/           # Mongoose schema
├── routes/           # Express routes
├── .env.example      # Environment variables sample
├── .gitignore        # Git ignore config
├── package.json
├── server.js         # App entry point
└── README.md
```

---

## 🔧 Features

- Create a task
- Get all tasks
  - Search by title
  - Filter by status and priority
  - Pagination with `page` & `limit`
  - Sorting by `dueDate` or `priority`

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/Kunika0418/task-manager-api.git

cd task-manager-api

# Backend setup
cd backend
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your-mongodb-uri-here
```

Replace `your-mongodb-uri-here` with your MongoDB connection string.

---

## 🚀 Run the Server

```bash
# Inside backend/
npm run dev
```

The server runs at: `http://localhost:5000`

---

## 📬 API Endpoints

### ➕ POST `/api/tasks/create`

Create a new task.

#### ✅ Sample Request Body

```json
{
  "title": "Complete project report",
  "description": "Finish the report and email it",
  "status": "pending",
  "dueDate": "2025-06-01",
  "priority": "high"
}
```

---

### 📥 GET `/api/tasks/list`

Retrieve tasks with advanced query features.

#### 🔍 Query Parameters (all optional)

| Parameter  | Type     | Description                         |
|------------|----------|-------------------------------------|
| search     | `string` | Search by title (case-insensitive) |
| status     | `string` | Filter by: pending, in progress, completed |
| priority   | `string` | Filter by: low, medium, high        |
| page       | `number` | Page number (default: 1)            |
| limit      | `number` | Items per page (default: 10)        |
| sortBy     | `string` | dueDate or priority                 |
| order      | `string` | asc or desc                         |

#### ✅ Example

```http
GET /api/tasks/list?search=project&status=pending&priority=high&page=1&limit=5&sortBy=dueDate&order=asc
```

---

## ❗ Error Handling

- All endpoints are wrapped in `try-catch`.
- Global error handler is implemented in `server.js`.

---


