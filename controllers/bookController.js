const Book = require("../models/Book");
const Review = require("../models/Review");

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.getAllBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(books);
};

exports.getBookById = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviews = await Review.find({ book: book._id })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate("user", "username");

  const totalReviews = await Review.countDocuments({ book: book._id });
  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2)
    : null;

  res.json({ book, averageRating, reviews, page: +page, totalPages: Math.ceil(totalReviews / limit) });
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, "i") },
      { author: new RegExp(q, "i") },
    ],
  });
  res.json(books);
};
