
const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.static("public"));
// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "recouvrement",
    password: "",
    port: 5432,
});
// app.get("/clients", async (req, res) => {
//     const client_id = req.params.client_id;
//     const result = await pool.query("SELECT * FROM clients where client_id >20");
//     [client_id]
//     res.json(result.rows);
// });
// app.get("/clients", async (req, res) => {
//     try {
//         const result = await pool.query(
//             "SELECT * FROM clients WHERE client_id < $1",
//             [20]
//         );

//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Database error" });
//     }
// });
app.get("/search", async (req, res) => {
    try {
        const clientId = req.query.client_id;

        if (!clientId) {
            return res.status(400).json({
                error: "client_id is required"
            });
        }

        const result = await pool.query(
            "SELECT client_id, nom, telephone, ville FROM clients WHERE client_id = $1",
            [clientId]
        );

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});