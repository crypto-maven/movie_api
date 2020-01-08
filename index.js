const express = require('express');
const app = express();

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
	},
	{
		title: 'Shaolin Soccer',
		director: 'Stephen Chow'
	},
	{
		title: 'Dr.Strangelove',
		director: 'Stanley Kubrick'
	},
	{
		title: '2 Days in the Valley',
		director: 'John Herzfeld'
	},
	{
		title: 'Very Bad Things',
		director: 'Peter Berg'
	},
	{
		title: 'Garden State',
		director: 'Zach Braff'
	},
	{
		title: 'Sweeney Todd',
		director: 'Tim Burton'
	},
	{
		title: 'Big Fish',
		director: 'Tim Burton'
	}
];

// GET requests

app.use(express.static('public'));

// Welcome message
app.get('/', (req, res) => {
	res.send('Welcome to a list of 10 Movies!');
});

// app.get('/movies', function(req, res) {
// 	res.json(topMovies);
// });

// listen for requests
app.listen(8080, () => console.log('Your app is listening on port 8080.'));
