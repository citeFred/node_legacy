const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views')

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/blog', (req, res) => {
    res.render('blog');
})

app.get('/users', (req, res) => {
    res.render('users');
})

app.get('/visit', (req, res) => {
    res.render('visit');
})
  
app.get('/contact', (req, res) => {
    res.render('contact');
})

// Server listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})