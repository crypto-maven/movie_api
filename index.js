const express = require('express');
const app = express();

// GET requests
app.get('/', function(req, res) {
	res.send('Welcome to myFlix Movies!');
});
app.get('/documentation', function(req, res) {
	res.sendFile('public/documentation.html', { root: __dirname });
});
app.get('/movies', function(req, res) {
	res.json(topMovies);
});

// listen for requests
app.listen(8080, () => console.log('Your app is listening on port 8080.'));
