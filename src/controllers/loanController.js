const Loan = require("../models/Loan");
const Book = require("../models/Book");


// CREATE
exports.createLoan = async (req, res) => {
  try {
    const { memberId, bookId, dueAt } = req.body;

    // Check book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    // Check if copies available
    if (book.copies <= 0) {
      return res.status(400).json({ error: "No copies available" });
    }

    // Create loan
    const loan = await Loan.create({
      memberId,
      bookId,
      dueAt,
    });

    // Reduce available copies
    book.copies -= 1;
    await book.save();

    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// READ ALL
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate("memberId", "name email")
      .populate("bookId", "title isbn author");
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// READ ONE
exports.getLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate("memberId", "name email")
      .populate("bookId", "title isbn author");

    if (!loan) return res.status(404).json({ error: "Loan not found" });

    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE LOAN (e.g., mark returned)
exports.updateLoan = async (req, res) => {
  try {
    const updated = await Loan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Loan not found" });

    // If returnedAt is set → increase book copies
    if (req.body.returnedAt) {
      const book = await Book.findById(updated.bookId);
      book.copies += 1;
      await book.save();
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// DELETE LOAN
exports.deleteLoan = async (req, res) => {
  try {
    const deleted = await Loan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Loan not found" });

    // If the loan wasn't returned, restore the book copy
    if (!deleted.returnedAt) {
      const book = await Book.findById(deleted.bookId);
      book.copies += 1;
      await book.save();
    }

    res.json({ message: "Loan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
