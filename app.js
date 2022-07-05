const express = require('express');
const cors = require('cors');
const db = require('./db/book');

const app = express();
app.use(cors());
const port = 3000;



app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/book', async (req, res) => {
    const results = await db.createDay(req.body);
    res.status(201).json({id: results[0]});
});

app.listen(port, () => {
    console.log("Server is running on Port 3000")
});
