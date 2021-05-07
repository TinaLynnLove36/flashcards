const connectDB = require('./startup/db');
const express = require('express');
const app = express();
//const mongoose = require('mongoose');
const decks = require('./routes/decks');


connectDB();

app.use(express.json());
app.use('/decks', decks);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});








































