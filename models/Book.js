// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true,
    minlength: [10, 'ISBN must be at least 10 characters'],
    maxlength: [13, 'ISBN cannot exceed 13 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    minlength: [2, 'Author name must be at least 2 characters'],
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  copies: {
    type: Number,
    required: [true, 'Copies count is required'],
    min: [0, 'Copies cannot be negative'],
    default: 1
  },
  availableCopies: {
    type: Number,
    default: function() {
      return this.copies;
    }
  }
}, {
  timestamps: true
});

// Update available copies when copies field changes
bookSchema.pre('save', function(next) {
  if (this.isModified('copies')) {
    this.availableCopies = this.copies;
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;