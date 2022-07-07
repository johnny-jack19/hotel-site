const express = require('express');
const cors = require('cors');
const db = require('./db/book');

const app = express();
app.use(cors());
const port = 3000;



app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/make', async (req, res) => {
    const results = await db.createDay(req.body);
    res.status(201).json({id: results[0]});
});

app.post('/billing', async (req, res) => {
    const results = await db.makeCustomer(req.body);
    res.status(201).json({id: results[0]});
});

app.patch('/billing/:id', async (req, res) => {
    const id = await db.updateBilling(req.params.id, req.body);
    res.status(201).json({id})
});

app.patch('/rooms/:id', async (req, res) => {
    const id = await db.updateRoom(req.params.id, req.body);
    res.status(201).json({id})
});

app.post('/booking', async (req, res) => {
    const results = await db.makeBooking(req.body);
    res.status(201).json({id: results[0]});
});

app.delete('/booking/:id', async (req, res) => {
    await db.deleteBooking(req.params.id);
    res.status(200).json({success: true});
});

app.get('/billing/:id', async (req, res) => {
    const customer = await db.getCustomer(req.params.id);
    res.status(200).json({customer});
})

app.listen(port, () => {
    console.log("Server is running on Port 3000")
});
