// const movies = require('./movies,js');

const express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	uuid = require('uuid');

const app = express();

let Users = [
	{
		id: '0',
		name: 'nicole',
		username: 'villa',
		password: 'G3neR1cP@55',
		email: 'genericemail@gmail.com',
		birthday: '09-16-1992',
		favorites: ['3']
	}
];

let Directors = [
	{ name: 'Terry Gilliam', bio: '', birthyear: '', deathyear: '' },
	{ name: 'Roman Polanski', bio: '', birthyear: '', deathyear: '' },
	{ name: 'Michael Arias', bio: '', birthyear: '', deathyear: '' },
	{ name: 'Stephen Chow', bio: '', birthyear: '', deathyear: '' },
	{ name: 'John Herzfeld', bio: '', birthyear: '', deathyear: '' },
	{ name: 'Stanley Kubrick', bio: '', birthyear: '', deathyear: '' },
	{ name: 'Peter Berg', bio: '', birthyear: '', deathyear: '' },
	{ name: 'Zach Braff', bio: '', birthyear: '', deathyear: '' },
	{ name: 'Tim Burton', bio: '', birthyear: '', deathyear: '' }
];

let Genres = [
	{
		name: 'SciFi',
		description:
			'Science fiction (often abbreviated Sci-Fi or SF) is a genre of speculative fiction that has been called the "literature of ideas". It typically deals with imaginative and futuristic concepts such as advanced science and technology, time travel, parallel universes, fictional worlds, space exploration, and extraterrestrial life. Science fiction often explores the potential consequences of scientific innovations.'
	},
	{
		name: 'Fantasy',
		description:
			'Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary.'
	},
	{
		name: 'Drama',
		description:
			'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone'
	},
	{
		name: 'Animation',
		description:
			'Animated film is a collection of illustrations that are photographed frame-by-frame and then played in a quick succession. Since its inception, animation has had a creative and imaginative tendency.'
	},
	{
		name: 'Comedy',
		description:
			'Animated film is a collection of illustrations that are photographed frame-by-frame and then played in a quick succession. Since its inception, animation has had a creative and imaginative tendency.'
	},
	{
		name: 'Black Comedy',
		description:
			'Animated film is a collection of illustrations that are photographed frame-by-frame and then played in a quick succession. Since its inception, animation has had a creative and imaginative tendency.'
	}
];

let Movies = [
	{
		id: '0',
		title: 'The Imaginarium of Doctor Parnassus',
		year: '2007',
		description:
			'The film follows a travelling theatre troupe whose leader, having made a bet with the Devil, takes audience members through a magical mirror to explore their imaginations and present them with a choice between self-fulfilling enlightenment or gratifying ignorance.',
		genre: 'Fantasy',
		director: 'Terry Gilliam',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '1',
		title: 'The Pianist',
		year: '2002',
		description:
			'Based on the autobiographical book The Pianist, a Holocaust memoir by the Polish-Jewish pianist and composer Władysław Szpilman, a Holocaust survivor.',
		genre: 'Drama',
		director: 'Roman Polanski',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '2',
		title: 'Tekkonkinkreet',
		year: '2007',
		description:
			'The tale of a pair of orphans who attempt to prevent the Yakuza and their assorted violent and corrupt allies from taking over their city.',
		genre: 'Animation',
		director: 'Michael Arias',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '3',
		title: 'Shaolin Soccer',
		year: '2001',
		description:
			"A former Shaolin monk reunites his five brothers, years after their master's death, to apply their superhuman martial arts skills to play football and bring Shaolin kung fu to the masses.",
		genre: 'Comedy',
		director: 'Stephen Chow',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '4',
		title: 'Dr.Strangelove',
		year: '1964',
		description:
			'The story concerns an unhinged United States Air Force general who orders a first strike nuclear attack on the Soviet Union. It follows the President of the United States, his advisors, the Joint Chiefs of Staff, and a Royal Air Force (RAF) officer as they try to recall the bombers to prevent a nuclear apocalypse.',
		genre: 'Black Comedy',
		director: 'Stanley Kubrick',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '5',
		title: '2 Days in the Valley',
		year: '1996',
		description: '',
		genre: 'SciFi',
		director: 'John Herzfeld',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '6',
		title: 'Big Fish',
		year: '2002',
		description: '',
		genre: '',
		director: 'Tim Burton',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '7',
		title: 'Very Bad Things',
		year: '1998',
		description: '',
		genre: '',
		director: 'Peter Berg',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '8',
		title: 'Garden State',
		year: '1997',
		description: '',
		genre: 'SciFi',
		director: 'Zach Braff',
		imageURL: '',
		featured: 'false'
	},
	{
		id: '9',
		title: 'Sweeney Todd',
		year: '1982',
		description: '',
		genre: 'SciFi',
		director: 'Tim Burton',
		imageURL: '',
		featured: 'false'
	}
];

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
	res.json(Movies);
});

// Get the data about a single Movie, by title
app.get('/movies/:title', (req, res) => {
	res.json(
		Movies.find(movie => {
			return movie.title
				.toLowerCase()
				.includes(req.params.title.toLowerCase());
		})
	);
});

// Get the data about a single Genre, by name
app.get('/genres/:name', (req, res) => {
	res.json(
		Genres.find(genre => {
			return genre.name === req.params.name;
		})
	);
});

// Get the data about a single Director, by name
app.get('/directors/:name', (req, res) => {
	res.json(
		Directors.find(director => {
			return director.name === req.params.name;
		})
	);
});

// Get the list of data about all Movies
app.get('/users', (req, res) => {
	res.json(Users);
});

// Adds data for a new user to the list of Users.
app.post('/users', (req, res) => {
	let newUser = req.body;

	if (!newUser.name) {
		const message = 'Missing name in request body';
		res.status(400).send(message);
	} else {
		newUser.id = uuid.v4();
		Users.push(newUser);
		res.status(201).send(newUser);
	}
});

// Deletes a user from the list by ID
app.delete('/users/:id', (req, res) => {
	let user = Users.find(user => {
		return user.id === req.params.id;
	});

	if (user) {
		Users = Users.filter(function(obj) {
			return obj.id !== req.params.id;
		});
		res.status(201).send(
			'User ' + user.name + ' with id ' + req.params.id + ' was deleted.'
		);
	}
});

// Get a user from the list by ID
app.get('/users/:id', (req, res) => {
	res.json(
		Users.find(user => {
			return user.id === req.params.id;
		})
	);
});

// Update the info of a user by id
app.put('/users/:id', (req, res) => {
	let user = Users.find(user => {
		return user.id === req.params.id;
	});
	let newUserInfo = req.body;

	if (user && newUserInfo) {
		// preserve the user id
		newUserInfo.id = user.id;
		// preserve the user favorites
		newUserInfo.favorites = user.favorites;
		// merge old info and new info (TODO: validate new info)
		Object.assign(user, newUserInfo);
		// merge user with update info into the list of Users
		Users = Users.map(user =>
			user.id === newUserInfo.id ? newUserInfo : user
		);
		res.status(201).send(user);
	} else if (!newUserInfo.name) {
		const message = 'Missing name in request body';
		res.status(400).send(message);
	} else {
		res.status(404).send(
			'User with id ' + req.params.id + ' was not found.'
		);
	}
});

// add a favorite Movie to a User.
app.post('/users/:id/:movie_id', (req, res) => {
	let user = Users.find(user => {
		return user.id === req.params.id;
	});
	let movie = Movies.find(movie => {
		return movie.id === req.params.movie_id;
	});

	if (user && movie) {
		user.favorites = [...new Set([...user.favorites, req.params.movie_id])];
		res.status(201).send(user);
	} else if (!movie) {
		res.status(404).send(
			'Movie with id ' + req.params.movie_id + ' was not found.'
		);
	} else {
		res.status(404).send(
			'User with id ' + req.params.id + ' was not found.'
		);
	}
});

// remove a favorite Movie from a User.
app.delete('/users/:id/:movie_id', (req, res) => {
	let user = Users.find(user => {
		return user.id === req.params.id;
	});
	let movie = Movies.find(movie => {
		return movie.id === req.params.movie_id;
	});

	if (user && movie) {
		user.favorites = user.favorites.filter(movie_id => {
			return movie_id !== req.params.movie_id;
		});
		res.status(201).send(user);
	} else if (!movie) {
		res.status(404).send(
			'Movie with id ' + req.params.movie_id + ' was not found.'
		);
	} else {
		res.status(404).send(
			'User with id ' + req.params.id + ' was not found.'
		);
	}
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
