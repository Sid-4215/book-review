# book-review
## Project Setup Instructions

1. Clone the repository
   git clone https://github.com/Sid-4215/book-review.git
   cd book-review
   
2.Install dependencies
  npm install
  
3.Make sure MongoDB is running locally or use a cloud MongoDB URI.

4. npm start

The server will start on http://localhost:3000 (or the port you set).


endpoints for testing with data:

# Signup
curl -X POST http://localhost:3000/api/signup \
-H "Content-Type: application/json" \
-d '{"username":"user1","password":"pass123"}'

# Login
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"username":"user1","password":"pass123"}'

# Response will include a token you need for authorized requests.

# Create Book (Auth required)
curl -X POST http://localhost:3000/api/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"title":"Book A","author":"Author X","genre":"Fiction"}'

# Get Books with Pagination & Filters
curl "http://localhost:3000/api/books?page=1&limit=2&author=Author%20X&genre=Fiction"

# Get Single Book with Reviews Pagination
curl "http://localhost:3000/api/books/<bookId>?page=1&limit=2"

# Add Review (Auth required)
curl -X POST http://localhost:3000/api/books/<bookId>/reviews \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"rating":4,"comment":"Great book!"}'

# Update Review (Auth required)
curl -X PUT http://localhost:3000/api/reviews/<reviewId> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"rating":5,"comment":"Even better after second read."}'

# Delete Review (Auth required)
curl -X DELETE http://localhost:3000/api/reviews/<reviewId> \
-H "Authorization: Bearer <TOKEN>"

# Search Books
curl "http://localhost:3000/api/search?q=book"

