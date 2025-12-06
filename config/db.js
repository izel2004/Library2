// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
// console.log(`📁 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Check if MongoDB is running
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Is MongoDB installed?');
    console.log('2. Is MongoDB running?');
    console.log('3. Check your .env file for MONGODB_URI');
    
    process.exit(1);
  }
};

module.exports = connectDB;