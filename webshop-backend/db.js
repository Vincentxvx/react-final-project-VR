const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webshop_db"
});

db.connect(err => {
    if (err) {
        console.error("DB hiba:", err);
    } else {
        console.log("MySQL csatlakozva");
    }
});

module.exports = db;
