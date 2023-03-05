const exp = require("express");
const mysql = require("mysql")
const bParser = require("body-parser");
const bcrypt = require("bcrypt");
const port = process.env.port || 4000;
const urlencoded = require("body-parser/lib/types/urlencoded");
const app = exp();
app.use(bParser.urlencoded({ extented: true }));
app.use(exp.static("views"));
app.set("view engine", "html");

const connectDB = mysql.createConnection( {
        host: "localhost",
        user: "root",
        password: "",
        database: "registerdb"
});

app.post("/form", (req, res, err) => {
    if (req.method == 'GET') {
        res.redirect("/");
    }
    else {
        const userData = req.body.username;
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                const sql = `INSERT INTO userdata (userName, userPass) VALUES ('${userData}', '${hash}')`;
                connectDB.query(sql, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.sendFile( __dirname + "/views/result.html");
                    }
                });
            }
        });
    }
});

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } 
    else {
        console.log(`Listening on Port: ${port}`);
    }
});