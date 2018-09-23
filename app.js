const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const winston = require('winston');
const port = process.env.PORT || 3000;


let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
let app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/assets'));

app.use(morgan('tiny', {stream: accessLogStream}));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// });

app.get('/', (req, res) => {
    let user = {
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]
    };
    res.render('home.hbs', {
        pageTitle: 'Home',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my website'
    });

});

app.get('/bad', (req, res) => {
    res.statusCode = 404;
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date()
    })
});
console.log('http://localhost:3000/');
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
