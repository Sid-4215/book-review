"# book-review" 

// endpoints for testing with data:
// 1. POST /api/signup {"username":"user1","password":"pass123"}
// 2. POST /api/login {"username":"user1","password":"pass123"} → get token
// 3. POST /api/books (with token in Authorization header) {"title":"Book A","author":"Author X","genre":"Fiction"}
// 4. GET /api/books?page=1&limit=2&author=Author X&genre=Fiction
// 5. GET /api/books/:id?page=1&limit=2
// 6. POST /api/books/:id/reviews (with token) {"rating":4,"comment":"Great book!"}
// 7. PUT /api/reviews/:id (with token) {"rating":5,"comment":"Even better after second read."}
// 8. DELETE /api/reviews/:id (with token)
// 9. GET /api/search?q=book
