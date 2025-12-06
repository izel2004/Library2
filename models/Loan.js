// models/Loan.js
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: [true, 'Member ID is required']
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book ID is required']
  },
  loanedAt: {
    type: Date,
    default: Date.now
  },
  dueAt: {
    type: Date,
    required: [true, 'Due date is required']
  },
  returnedAt: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Active', 'Returned', 'Overdue'],
    default: 'Active'
  },
  fineAmount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Pre-save middleware to update status
loanSchema.pre('save', function(next) {
  const today = new Date();
  
  if (this.returnedAt) {
    this.status = 'Returned';
  } else if (this.dueAt < today) {
    this.status = 'Overdue';
    
    // Calculate fine: $1 per day overdue (max $30)
    const overdueDays = Math.floor((today - this.dueAt) / (1000 * 60 * 60 * 24));
    this.fineAmount = Math.min(overdueDays * 1, 30);
  } else {
    this.status = 'Active';
  }
  
  next();
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;