const Review = require("../models/Review");
const Book = require("../models/Book");

exports.createReview = async (req, res) => {
  const exists = await Review.findOne({ book: req.params.id, user: req.user.userId });
  if (exists) return res.status(400).json({ message: "You already reviewed this book" });

  const review = new Review({ ...req.body, book: req.params.id, user: req.user.userId });
  await review.save();

  await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    console.log("Review found:", review);
  
    if (!review) return res.status(404).json({ message: "Review not found" });
  
    console.log("Review user:", review.user);
    console.log("Token userId:", req.user.userId);
  
    if (review.user.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });
  
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  };
  
  

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.userId)
    return res.status(403).json({ message: "Unauthorized" });

  await review.deleteOne();
  res.json({ message: "Review deleted" });
};