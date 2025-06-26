# JobPortal-nodejs-Project
A full-featured Job Portal backend built using Node.js, Express, and MongoDB, with robust API documentation using Swagger.
🔧 Tech Stack
1)Backend Framework: Express.js
2)Database: MongoDB with Mongoose
3)Authentication: JWT (JSON Web Token)
4)Security & Utilities:
 =>bcryptjs for password hashing: cors, helmet, express-rate-limit, express-mongo-sanitize for security. morgan for logging
5)API Documentation: Swagger (swagger-jsdoc, swagger-ui-express)

📁 Project Structure
JOB-PORTAL/
├── config/
│   └── db.js             # MongoDB connection
├── controllers/
│   └── *.js              # Route logic
├── middlewares/
│   └── errorMiddleware.js
├── models/
│   └── *.js              # Mongoose schemas
├── routes/
│   └── authRoutes.js     # Auth APIs
│   └── jobsRoutes.js     # Job management APIs
│   └── userRoutes.js     # User APIs
│   └── testRoutes.js
├── utils/
│   └── *.js              # Utility functions
├── jobs-data.json        # Sample jobs data
├── server.js             # Entry point
├── .env                  # Environment variables
└── package.json




🚀 Getting Started
1. Clone the Repository
   git clone https://github.com/your-username/job-portal-backend.git
   cd job-portal-backend/JOB-PORTAL
2). Install Dependencies
   npm install
3).Set Up Environment Variables
   Create a .env file in the root directory:
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
4. Run the Server
   npm run server
Server will start at: http://localhost:8080

📘 API Documentation
Once the server is running, access the Swagger UI at:
👉 http://localhost:8080/api-doc

🔐 Features
✅ User Registration & Login (JWT based)
✅ Role-based access (Admin/User)
✅ Create, Update, Delete, and Filter Jobs
✅ Swagger UI for live API testing
✅ Validation and error handling
✅ Security middleware integrated


🧪 Sample Routes
POST /api/v1/auth/register – Register user
POST /api/v1/auth/login – Login user
POST /api/v1/job/create-job – Create job (auth required)
GET /api/v1/job/get-jobs – Fetch jobs
PUT /api/v1/job/update-job/:id – Update job
DELETE /api/v1/job/delete-job/:id – Delete job


✨ Author
Aastha
