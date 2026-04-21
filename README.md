# SpendSight – Personal Finance Tracker

SpendSight is a backend REST API for tracking personal finances. It lets users log income and expenses, view spending breakdowns by category, and generate monthly P&L reports — all secured with JWT authentication.

# Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication

# Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/SambhaviGupta/SpendSight.git
cd SpendSight
npm install
```

Create a `.env` file in the root folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server:

```bash
node index.js
```

# How It Works

- Users register and login to receive a JWT token
- All transaction and analytics routes are protected with JWT authentication
- Transactions are logged with category, type (income/expense), amount and date
- MongoDB aggregation pipelines generate category-wise analytics and monthly P&L reports
- APIs support date-range filtering and pagination for scalable data retrieval

# API Endpoints

All routes except register and login require an `Authorization: Bearer <token>` header.

# Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT token |

# Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/transactions | Add a new transaction |
| GET | /api/transactions | Get all transactions |
| GET | /api/transactions?startDate=&endDate= | Filter transactions by date range |
| DELETE | /api/transactions/:id | Delete a transaction |

# Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/analytics/summary | Total income, expenses and balance |
| GET | /api/analytics/category | Spending breakdown by category |
| GET | /api/analytics/monthly | Month-wise income and expense trends |
| GET | /api/reports/pl | Monthly P&L report |
