const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { createBook, getAllBooks, getBookById, searchBooks } = require("../controllers/bookController");

router.post("/books", auth, createBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.get("/search", searchBooks);

module.exports = router;
