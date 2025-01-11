const express = require('express')
const app = express()
const port = 3000

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

//화살표함수를 사용하는 동일한 Get 요청
app.get('/', (req, res) => {
    console.log('Got a GET request from Client')
    res.send('Got a response from Server');
})

//애플리케이션의 홈 페이지인 루트 라우트(/)에서 POST 요청에 응답:
app.post('/', function (req, res) {
    console.log('Got a POST request from Client')
    res.send('Got a response from Server');
})

//user 라우트에 대한 PUT 요청에 응답:
app.put('/user', function (req, res) {
    console.log('Got a PUT request from Client')
    res.send('Got a response from Server');
})

//user 라우트에 대한 DELETE 요청에 응답:
app.delete('/user', function (req, res) {
    console.log('Got a DELETE request from Client')
    res.send('Got a response from Server');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})