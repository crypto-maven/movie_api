const express = require('express');
const app = express();
const morgan = require('morgan');
const Movie = require('./movies');
app.use(morgan('common'));

let topMovies = [
	{
		title: 'The Imaginarium of Doctor Parnassus',
		director: 'Terry Gilliam'
	},
	{
		title: 'The Pianist',
		director: 'Roman Polanski'
	},
	{
		title: 'Tekkonkinkreet',
		director: 'Michael Arias'
	}
];

// GET requests

app.use(express.static('public'));

// Welcome message
app.get('/movies', (req, res) => {
	res.json(topMovies);
});

// Morgan Middleware

app.get('/', function(req, res) {
	res.send('Welcome to my app!');
});
app.get('/secreturl', function(req, res) {
	res.send('This is a secret url with super top-secret content.');
});

// error handling function morgan

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Unexpected Error!');
	next();
});
// listen for requests
app.listen(8080, () => console.log('Your app is listening on port 8080.'));
