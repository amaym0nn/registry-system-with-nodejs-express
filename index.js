const exp = require("express");
const mysql = require("mysql");
const bParser = require("body-parser");
const app = exp();
const bcrypt = require("bcrypt");
const port = process.env.port || 5000;
app.use(bParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(exp.static('views'));

const connectDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
});

app.post("/form", (req, res) => {
    if (req.method == 'GET') {
        res.redirect("/");
    } else {
        const username = req.body.username;
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                const sql = `INSERT INTO userrdata (username, password) VALUES ('${username}', '${hash}')`;
                connectDB.query(sql, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("total.ejs");
                    }
                });
            }
        });
    }
});

app.use("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on Port: ${port}`);
    }
});
