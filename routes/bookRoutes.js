// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// GET all books
router.get('/', getBooks);

// GET single book
router.get('/:id', getBook);

// POST create book
router.post('/', createBook);

// PUT update book
router.put('/:id', updateBook);

// DELETE book
router.delete('/:id', deleteBook);

module.exports = router;