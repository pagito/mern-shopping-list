const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const path = require("path");
const config = require("config");

//const items = require('./routes/api/items');
//const users = require('./routes/api/users');

const app = express();

// Bodyparser Middleware
//app.use(bodyParser.json());
// bodyParser is included by default
app.use(express.json());

// DB Config
//const db= require('./config/keys').mongoURI;
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
	.connect(db, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// User Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));