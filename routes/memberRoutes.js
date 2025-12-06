// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

// GET all members
router.get('/', getMembers);

// GET single member
router.get('/:id', getMember);

// POST create member
router.post('/', createMember);

// PUT update member
router.put('/:id', updateMember);

// DELETE member
router.delete('/:id', deleteMember);

module.exports = router;