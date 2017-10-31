const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('unable to append to server.log');
		}
	});
	console.log(log);
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',  (text) => {
	return text.toUpperCase();
});
app.get('/', (req, res) => {
	// res.send('<h1>name</h1><h2>likes</h2><ul><li>biking</li><li>cities</li></ul>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomMessage: 'Welcom to my website'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage : 'unable to handle request'
	});
});

app.listen(3333);