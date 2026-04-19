# SpendSight – Personal Finance Tracker

SpendSight is a backend REST API for tracking personal finances. It lets users log income and expenses, view spending breakdowns by category, and generate monthly P&L reports — all secured with JWT authentication.

## Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/SambhaviGupta/SpendSight.git
cd SpendSight
npm install
```

Create a `.env` file in the root folder:
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_key
