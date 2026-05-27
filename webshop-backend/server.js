const express = require("express");
const db = require("./db");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { authenticateToken, SECRET } = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());

/*
    LOGIN
*/
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, results) => {
            if (err) return res.status(500).json(err);

            if (results.length === 0) {
                return res.status(400).json({
                    message: "Nincs ilyen user"
                });
            }

            const user = results[0];

            if (password !== user.password) {
                return res.status(400).json({
                    message: "Hibás jelszó"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username
                },
                SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.json({ token });
        }
    );
});

/*
    ÖSSZES TERMÉK
*/
app.get("/products", (req, res) => {
    db.query(
        "SELECT * FROM products",
        (err, results) => {
            if (err) return res.status(500).json(err);

            res.json(results);
        }
    );
});

/*
    TERMÉK HOZZÁADÁSA
*/
app.post("/products", authenticateToken, (req, res) => {

    const {
        name,
        description,
        img_url,
        price,
        stock
    } = req.body;

    db.query(
        `
        INSERT INTO products
        (name, description, img_url, price, stock)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            name,
            description,
            img_url,
            price,
            stock
        ],
        (err, results) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Termék hozzáadva",
                id: results.insertId
            });
        }
    );
});

/*
    TERMÉK TÖRLÉSE
*/
app.delete("/products/:id", authenticateToken, (req, res) => {

    db.query(
        "DELETE FROM products WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Törölve"
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server fut a 3000-es porton");
});