const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//user post as a subscriber
app.post("/subscriptions", async (req, res) => {
    try {
        const { first_name, surname, birthdate, email, } = req.body;
        const newSubscriber = await pool.query(
            "INSERT INTO subscriptions (first_name, surname, birthdate, email) VALUES ($1, $2, $3, $4) RETURNING *",
            [first_name, surname, birthdate, email]
        );

        res.json(newSubscriber.rows[0]);
    } catch (e) {
        console.log(e);
    }
});

// user submits employment application
app.post("/applicants", async (req, res) => {
    try {
        const { first_name, surname, birthdate, email, contact_number,
            live_in_major_city, city, subdivision, country } = req.body;
        const newApplicant = await pool.query(
            "INSERT INTO applicants (first_name, surname, birthdate, email, contact_number, live_in_major_city, city, subdivision, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [first_name, surname, birthdate, email, contact_number, live_in_major_city, city, subdivision, country]
        );

        res.json(newApplicant.rows[0]);
    } catch (e) {
        console.log(e);
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});