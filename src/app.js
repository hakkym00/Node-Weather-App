// core and npm library
const path = require('path')
const express = require('express');
const hbs = require('hbs');
const openweathermap = require('./openweather');

const app = express();

const port = process.env.PORT || 3000;
// pathe to public and views directory (express config)
const publicDirectoryPaths = path.join(__dirname , '../public')
const viewDirectoryPath = path.join(__dirname, '../template/views')
const partialDirectoryPath = path.join(__dirname, '../template/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

//setup static directory
app.use(express.static(publicDirectoryPaths))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Ade-Ajayi Akeem'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ade-Ajayi Akeem'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ade-Ajayi Akeem',
        email: 'akboiy75@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error: 'you must provide an address!!!!'
        })
    }

    openweathermap(req.query.address, (error, info) => {
        if(error) {
         return res.send({
            error: error
         })
        }
     
         res.send({
            forecast: info,
            address: req.query.address   
         })
     
     })
     
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        error: 'Article Not Found',
        name: 'Hakkym'
    })
})

app.get('*', (req, res) => {
     res.render('error', {
        title: '404 Page',
        error: 'Page Not Found',
        name: 'Hakkym'
     })
})

app.listen(port, () => {
    console.log('Your server is up and running on port ' + port)
})