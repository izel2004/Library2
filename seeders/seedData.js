// seeders/seedData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('../models/Book');
const Member = require('../models/Member');
const Loan = require('../models/Loan');

// Load environment variables
dotenv.config();

// Sample data
const sampleBooks = [
  {
    isbn: '9780451524935',
    title: '1984',
    author: 'George Orwell',
    copies: 5
  },
  {
    isbn: '9780061120084',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    copies: 3
  },
  {
    isbn: '9780140283334',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    copies: 4
  },
  {
    isbn: '9780544003415',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    copies: 6
  },
  {
    isbn: '9780439023481',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    copies: 5
  }
];

const sampleMembers = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com'
  },
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com'
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@example.com'
  },
  {
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    await Member.deleteMany({});
    await Loan.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert books
    const books = await Book.insertMany(sampleBooks);
    console.log(`📚 Created ${books.length} books`);

    // Insert members
    const members = await Member.insertMany(sampleMembers);
    console.log(`👥 Created ${members.length} members`);

    // Create sample loans
    const loans = await Loan.create([
      {
        memberId: members[0]._id,
        bookId: books[0]._id,
        dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      },
      {
        memberId: members[1]._id,
        bookId: books[1]._id,
        dueAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
        status: 'Overdue'
      }
    ]);
    console.log(`📋 Created ${loans.length} loans`);

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Sample Data Created:');
    console.log(`   Books: ${books.length}`);
    console.log(`   Members: ${members.length}`);
    console.log(`   Loans: ${loans.length}`);
    console.log('\n🔗 API Endpoints:');
    console.log(`   Books: http://localhost:${process.env.PORT || 5000}/api/books`);
    console.log(`   Members: http://localhost:${process.env.PORT || 5000}/api/members`);
    console.log(`   Loans: http://localhost:${process.env.PORT || 5000}/api/loans`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();