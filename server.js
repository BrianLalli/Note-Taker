const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const data = require("./db/db.json");
// applying middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


// creating static directory of current directory and relative file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

// 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// sending json data as response
app.get("/api/notes", (req, res) => {
    res.json(data);
})

// 
app.post("/notes", (req, res) => {
    console.log(req.body)
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// add new notes
app.post("/api/notes", (req, res) => {
    console.log(req.body);
    data.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(data), () => {
        console.log("new note added");
        res.json(req.body);
    })
})


app.listen(3003, () => {
    console.log("server is running")
})


