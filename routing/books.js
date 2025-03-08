const express = require("express");
const router = express.Router();

// Middleware authorization syntax
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; 
    if (authHeader === "Bearer ZEWAIL") { // Check if the header matches
        next(); // go ahead welcooomeee
    } else {
        res.status(401).json({ message: "Unauthorized" }); // Rejectedd
    }
};

let books = [
    { id: 1, bookname: "sherlock holmes", author: "Conan Doyle", available: true },
    { id: 2, bookname: "No longer human", author: "Osamu Dazai", available: false },
    { id: 3, bookname: "good girl bad blood", author: "Holly Jackson", available: true },
];

router.get("/", (req, res) => {
    res.send("welcome to the bookstore");
});

// Apply authMiddleware to all routes under /books
router.use(authMiddleware);

router.get("/books", (req, res) => {
    res.json(books);
});

router.get("/books/:id", (req, res) => {
    const book = books.find(u => u.id == parseInt(req.params.id));
    res.json(book);
});

router.post("/books", (req, res) => {
    const newbook = {
        id: books.length + 1, 
        bookname: req.body.bookname, 
        author: req.body.author,
        available: true //magic :)))
    };

    books.push(newbook);
    res.json(newbook);
});

router.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id)); 
    book.bookname = req.body.bookname; 
    book.author = req.body.author;
    res.json(book); 
});

router.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id)); 
    const deleteBook = books.splice(bookIndex, 1); 
    res.json(deleteBook[0]); 
});

router.post("/:id/borrow", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (!book.available) {
        return res.status(400).json({ message: "Book is already borrowed" });
    }

    book.available = false;
    res.json({ message: "Book borrowed successfully", book });
});

router.post("/:id/return", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.available) {
        return res.status(400).json({ message: "Book is already available" });
    }

    book.available = true;
    res.json({ message: "Book returned successfully", book });
});

module.exports = router;