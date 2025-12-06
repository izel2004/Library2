// server.js - FIXED VERSION
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

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Library Management API is running',
        timestamp: new Date().toISOString()
    });
});

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Library Management API',
        version: '1.0.0',
        endpoints: {
            books: '/api/books',
            members: '/api/members',
            loans: '/api/loans',
            health: '/api/health'
        }
    });
});

// 404 handler - CORRECTED: Added 'next' parameter
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Import error handler
const errorHandler = require('./middleware/errorHandler');

// Error handler - Make sure it's the last middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API Base URL: http://localhost:${PORT}`);
});
