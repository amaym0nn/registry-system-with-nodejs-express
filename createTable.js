const mysql = require("mysql");

const connectDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users",
});

connectDB.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
    connectDB.query(`
        CREATE TABLE userrData (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Created Table!");
        }
    })
})