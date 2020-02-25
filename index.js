// Integrating Mongoose with a REST API
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

// code from previous exercises
const movies = require('./movies.js');

const express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	uuid = require('uuid');

const app = express();

// use morgan logger middleware
app.use(morgan('common'));

// routes all requests for static files to 'public' folder
app.use(express.static('public'));

app.use(bodyParser.json());

// GET requests
app.get('/', (req, res) => {
	res.redirect('/index.html');
});

// Get the list of data about all Movies
app.get('/movies', (req, res) => {
	res.send('Successful GET request returning data on all the movies');
});

// Get the data about a single Movie, by title
app.get('/movies/:title', (req, res) => {
	res.send('Successful GET a movie by title');
});

// Get the data about a single Genre, by name
app.get('/genres/:name', (req, res) => {
	res.send('Successful GET a genre by name');
});

// Get the data about a single Director, by name
app.get('/directors/:name', (req, res) => {
	res.send('Successful GET director by name');
});

// Get the list of data about all Movies
app.get('/users', (req, res) => {
	res.send('Successful GET all users');
});

//Add a user
/* We’ll expect JSON in this format
{
 ID : Integer,
 Username : String,
 Password : String,
 Email : String,
 Birthday : Date
}*/
app.post('/users', function(req, res) {
	Users.findOne({ Username : req.body.Username })
	.then(function(user) {
	  if (user) {
		return res.status(400).send(req.body.Username + "already exists");
	  } else {
		Users
		.create({
		  Username: req.body.Username,
		  Password: req.body.Password,
		  Email: req.body.Email,
		  Birthday: req.body.Birthday
		})
		.then(function(user) {res.status(201).json(user) })
		.catch(function(error) {
		  console.error(error);
		  res.status(500).send("Error: " + error);
		})
	  }
	}).catch(function(error) {
	  console.error(error);
	  res.status(500).send("Error: " + error);
	});
  });

// Get all users
app.get('/users', function(req, res) {

	Users.find()
	.then(function(users) {
	  res.status(201).json(users)
	})
	.catch(function(err) {
	  console.error(err);
	  res.status(500).send("Error: " + err);
	});
  });

// Deletes a user from the list by ID
app.delete('/users/:id', (req, res) => {
	res.send('successfully delete a new user');
});

// Get a user from the list by ID
app.get('/users/:id', (req, res) => {
	res.send('Successful GET user by ID');
});

// Update the info of a user by id
app.put('/users/:id', (req, res) => {
	res.send('Successful update a user');
});

// add a favorite Movie to a User.
app.post('/users/:id/:movie_id', (req, res) => {
	res.send('Successfully add a favorite movie to a user');
});

// remove a favorite Movie from a User.
app.delete('/users/:id/:movie_id', (req, res) => {
	res.send('Successful delete a favorite movie from user');
});

app.use((err, req, res, next) => {
	var logEntryTimestamp = new Date()
		.toISOString()
		.replace(/T/, ' ')
		.replace(/\..+/, '');
	var logEntry = `${logEntryTimestamp} - Error: ${err.stack}`;
	console.error(logEntry);
	res.status(500).send('Something broke!');
});

app.listen(8080, () => {
	console.log('App is listening on port 8080');
});
