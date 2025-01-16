const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const router = require('./routes/router'); // 라우터 파일을 가져옴
require('dotenv').config();
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))
// 요청을 라우터로 전달 사용
app.use('/', router); 

// Server listener
app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
});
