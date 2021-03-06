const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3333;
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

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',  (text) => {
	return text.toUpperCase();
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	});
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

app.get('/apiForYC', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(
		{
    "products" : [
        {
            "category": "General Hospital",
            "item" : [
                {
                    "title" : "My Company Product",
                    "location" : "Stylet, Tracheal Tube",
                    "time" : "Since: 2017-01-18"
                },
                {
                    "title" : "My Company Another Product",
                    "location" : "Stylet, Tracheal Tube",
                    "time" : "Since: 2017-01-19"
                }
            ]
        },
        {
            "category": "Chemistry",
            "item" : [
                {
                    "title" : "My Company Another Product",
                    "location" : "Stylet, Tracheal Tube",
                    "time" : "Since: 2017-02-18"
                }
            ]
        },
        {
            "category": "Microbiology",
            "item" : [
                {
                    "title" : "My Company Another Product",
                    "location" : "Stylet, Tracheal Tube",
                    "time" : "Since: 2017-03-01"
                }
            ]
        }
    ]

});
});

app.listen(port);