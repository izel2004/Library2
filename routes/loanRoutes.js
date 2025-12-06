// routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const {
  getLoans,
  getLoan,
  createLoan,
  updateLoan,
  deleteLoan
} = require('../controllers/loanController');

// GET all loans
router.get('/', getLoans);

// GET single loan
router.get('/:id', getLoan);

// POST create loan
router.post('/', createLoan);

// PUT update loan
router.put('/:id', updateLoan);

// DELETE loan
router.delete('/:id', deleteLoan);

module.exports = router;