const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mainRoutes = require('./routes/mainRoutes')
require('dotenv').config();
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))
// 메인 컨트롤러 사용
app.use('/', mainRoutes);

// Server listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
