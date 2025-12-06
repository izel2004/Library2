// controllers/loanController.js
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const Member = require('../models/Member');

// @desc    Get all loans
// @route   GET /api/loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('memberId', 'name email')
      .populate('bookId', 'title author');
    
    res.json({
      success: true,
      count: loans.length,
      data: loans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single loan
// @route   GET /api/loans/:id
exports.getLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate('memberId', 'name email')
      .populate('bookId', 'title author');
    
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }
    
    res.json({
      success: true,
      data: loan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new loan
// @route   POST /api/loans
exports.createLoan = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;
    
    // Auto set due date to 7 days later
    const dueAt = new Date();
    dueAt.setDate(dueAt.getDate() + 7);
    
    const loanData = {
      memberId,
      bookId,
      dueAt
    };
    
    const loan = await Loan.create(loanData);
    
    const populatedLoan = await Loan.findById(loan._id)
      .populate('memberId', 'name email')
      .populate('bookId', 'title author');
    
    res.status(201).json({
      success: true,
      message: 'Loan created successfully',
      data: populatedLoan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update loan
// @route   PUT /api/loans/:id
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('memberId', 'name email')
     .populate('bookId', 'title author');
    
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Loan updated successfully',
      data: loan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete loan
// @route   DELETE /api/loans/:id
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Loan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};