# 📝 Task Manager API

A backend-only Task Manager API built with **Node.js**, **Express**, and **MongoDB**. It supports creating tasks, filtering by status and priority, searching by title, pagination, and sorting.

---

## 📁 Folder Structure

```
task-manager-api/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Kunika0418/task-manager-api.git
cd task-manager-api/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

> 🔐 Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

### 4. Run the server

```bash
npm run dev
```

Server will be live at: `http://localhost:5000`

---

## 📮 API Endpoints

### ➕ Create Task  
`POST /api/tasks`  
**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2025-06-01"
}
```

---

### 📄 Get Tasks with Filters, Pagination, Sorting  
`GET /api/tasks`

#### 🔹 Query Parameters (all optional):
- `search`: search tasks by title  
  e.g., `search=react`
- `status`: `pending`, `in-progress`, `completed`  
  e.g., `status=completed`
- `priority`: `low`, `medium`, `high`  
  e.g., `priority=high`
- `sortBy`: `dueDate`, `priority`  
  e.g., `sortBy=dueDate`
- `page`: current page number (default = 1)  
- `limit`: number of tasks per page (default = 10)

#### 🧪 Example Queries:
```http
GET /api/tasks
GET /api/tasks?search=react
GET /api/tasks?status=pending
GET /api/tasks?priority=high
GET /api/tasks?page=1&limit=2
GET /api/tasks?search=API&status=completed&priority=high&sortBy=dueDate&page=1&limit=5
```

---

## 🧰 Built With

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- nodemon

---

## 🙋‍♀️ Author

**Kunika Agarwal**  
[GitHub Profile](https://github.com/Kunika0418)

---
