// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Library Management API',
    version: '1.0.0',
    endpoints: {
      books: {
        getAll: 'GET /api/books',
        getOne: 'GET /api/books/:id',
        create: 'POST /api/books',
        update: 'PUT /api/books/:id',
        delete: 'DELETE /api/books/:id'
      },
      members: {
        getAll: 'GET /api/members',
        getOne: 'GET /api/members/:id',
        create: 'POST /api/members',
        update: 'PUT /api/members/:id',
        delete: 'DELETE /api/members/:id'
      },
      loans: {
        getAll: 'GET /api/loans',
        getOne: 'GET /api/loans/:id',
        create: 'POST /api/loans',
        update: 'PUT /api/loans/:id',
        delete: 'DELETE /api/loans/:id'
      }
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Library Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));

// 404 handler - FIXED: Don't use '*', use app.use without path
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Base URL: http://localhost:${PORT}`);

});