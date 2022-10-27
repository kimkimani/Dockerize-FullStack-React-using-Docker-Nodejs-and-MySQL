const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "contacts",
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("Connected to Database");
        console.log("Creating database table")
        let tableName = 'contact_db';

        // Query to create table
        let query = `CREATE TABLE ${tableName} 
        (id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, contact VARCHAR(255) NOT NULL
        )`;

        db.query(query, (err, rows) => {
            if (err) {
                console.log("Table Exist");
            } else {
                console.log(`Successfully Created Table - ${tableName}`)
            }
        })
    }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json("Testing Node.js Server")
});

app.get("/api/get", (req, res) => {

    const sqlGet = "SELECT * from contact_db";
    db.query(sqlGet, (err, result) => {
        res.send(result)
    })
})

app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES(?,?,?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error)
            console.log(error);
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove, id, (error, result) => {
        if (error)
            console.log(error);
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * from contact_db WHERE id = ?";
    db.query(sqlGet, id, (err, result) => {
        if (err)
            console.log(err);
        res.send(result)
    })
})

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlUpdate = "UPDATE contact_db SET name= ?, email= ?, contact= ? WHERE id=?";
    db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
        if (err)
            console.log(err);
        res.send(result)
    })
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})