const express = require('express');
const cors = require('cors');
const db = require('./db/book');

const app = express();
app.use(cors());
const port = 3000;



app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Make calendar
app.post('/make', async (req, res) => {
    const results = await db.createDay(req.body);
    res.status(201).json({id: results[0]});
});

//Billing table
app.post('/billing', async (req, res) => {
    const results = await db.makeCustomer(req.body);
    res.status(201).json({id: results[0]});
});

app.patch('/billing/:id', async (req, res) => {
    const id = await db.updateBilling(req.params.id, req.body);
    res.status(201).json({id});
});

//Rooms table
app.patch('/rooms/:room/:booking', async (req, res) => {
    const id = await db.deleteBookingFromRooms(req.params.room, req.params.booking);
    res.status(201).json({id});
});

app.patch('/rooms/:room/:booking/:day', async (req, res) => {
    const id = await db.addBookingToRooms(req.params.room, req.params.booking, req.params.day);
    res.status(201).json({id});
})

//Booking table
app.post('/booking', async (req, res) => {
    const results = await db.makeBooking(req.body);
    res.status(201).json({id: results[0]});
});

app.delete('/booking/:id', async (req, res) => {
    await db.deleteBooking(req.params.id);
    res.status(200).json({success: true});
});

//Gets
app.get('/billing/:field/:id', async (req, res) => {
    const customer = await db.getCustomer(req.params.field, req.params.id);
    res.status(200).json({customer});
})

app.listen(port, () => {
    console.log("Server is running on Port 3000")
});
