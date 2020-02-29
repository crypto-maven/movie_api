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

// start movies scripts

// Get the list of data about all Movies
app.get('/movies', (req, res) => {
	Movies.find()
	.then(function(movies){
	   res.status(201).json(movies)   /*Returns All Movies*/
   })
	.catch(function(error){
	   console.error(error);
	   res.status(500).send("Error" + err);
   }); 
});

// Get the data about a single Movie, by title
app.get('/movies/:title', (req, res) => {
	Movies.find({Title: req.params.Title})
	.then(function(movies){
		res.status(201).json(movies)
	})
	.catch(function(error){
		console.error(error);
		res.status(500).send("Error" + err);
	});
});

// Get the data about a single Genre, by name
app.get('/genres/:name', (req, res) => {
	Movies.findOne({Title: req.params.Title})
	.then(function(movie){
		res.status(201).send(movie.Genre.Name + ' : ' + movie.Genre.Description)
	})
	.catch(function(error){
		console.error(error);
		res.status(500).send("Error" + error);
	});
});

// Get the data about a single Director, by name
app.get('/directors/:name', (req, res) => {
	Movies.findOne({"Director.Name" : req.params.Name})
	.then(function(movies){
		res.status(201).json(movies.Director)
	})
	.catch(function(error){
		console.error(error);
		res.status(500).send("Error" + err);
	});
});

// start users scripts

// Get the list of data about all Users
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



// Delete a user by username
app.delete('/users/:Username', function(req, res) {
	Users.findOneAndRemove({ Username: req.params.Username })
	.then(function(user) {
	  if (!user) {
		res.status(400).send(req.params.Username + " was not found");
	  } else {
		res.status(200).send(req.params.Username + " was deleted.");
	  }
	})
	.catch(function(err) {
	  console.error(err);
	  res.status(500).send("Error: " + err);
	});
  });



// Get a user by username
app.get('/users/:Username', function(req, res) {
	Users.findOne({ Username : req.params.Username })
	.then(function(user) {
	  res.json(user)
	})
	.catch(function(err) {
	  console.error(err);
	  res.status(500).send("Error: " + err);
	});
  });

// // Update the info of a user by id
// app.put('/users/:id', (req, res) => {
// 	res.send('Successful update a user');
// });

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', function(req, res) {
	Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
	{
	  Username : req.body.Username,
	  Password : req.body.Password,
	  Email : req.body.Email,
	  Birthday : req.body.Birthday
	}},
	{ new : true }, // This line makes sure that the updated document is returned
	function(err, updatedUser) {
	  if(err) {
		console.error(err);
		res.status(500).send("Error: " +err);
	  } else {
		res.json(updatedUser)
	  }
	})
  });



// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
	Users.findOneAndUpdate({ Username : req.params.Username }, {
	  $push : { FavoriteMovies : req.params.MovieID }
	},
	{ new : true }, // This line makes sure that the updated document is returned
	function(err, updatedUser) {
	  if (err) {
		console.error(err);
		res.status(500).send("Error: " + err);
	  } else {
		res.json(updatedUser)
	  }
	})
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
