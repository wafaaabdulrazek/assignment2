
const express=require("express")
const app=express();
const booksRouter = require("./routing/books");
app.use("/books",booksRouter);
app.use(express.json());

port=911;
app.listen(port,()=>console.log(" The server is running"))
