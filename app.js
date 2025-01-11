const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
require('dotenv').config();
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse JSON
app.use(bodyParser.json())

// MySQL connection Pool :
// MySQL 커넥션을 사용할 때는 주로 커넥션 풀을 이용하여 관리하는 것이 권장
// 여러 요청이 동시에 처리될 때 효율적으로 커넥션을 관리
const connectionPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectionLimit: 10, // 최대 연결 수 설정
    insecureAuth: true,
});

// MySQL connection check
connectionPool.getConnection((err, connection) => {
    if (err) {
      console.error('MySQL에 연결 중 에러 발생:', err);
    } else {
      console.log('MySQL에 연결되었습니다.');
      connection.release();
    }
});

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

app.post('/api/contact', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const memo = req.body.memo;
  
    const SQL_Query = `INSERT INTO contact(name, phone, email, memo, create_at, modify_at) VALUES ('${name}','${phone}','${email}','${memo}',NOW(), NOW())`;
  
    connectionPool.query(SQL_Query, (err, result) => {
        if (err) {
            console.error('데이터 삽입 중 에러 발생:', err);
            res.status(500).send('내부 서버 오류');
        } else {
            console.log('데이터가 삽입되었습니다.');
            res.send("<script>alert('문의사항이 등록되었습니다.'); location.href='/'</script>");
        }
    });
});

app.get('/contactList', (req, res) => {
    const selectQuery = `select * from contact order by id desc`;

    // 얻어온 커넥션을 사용하여 쿼리를 실행합니다.
    connectionPool.query(selectQuery, (err, result) => {
        if (err) {
            console.error('데이터 조회 중 에러 발생:', err);
            res.status(500).send('내부 서버 오류');
        } else {
            console.log('데이터가 조회되었습니다.');
            console.log(result);
            res.render('contactList', {lists:result});
        }
    });
});

app.post('/api/contactDelete/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `delete from contact where id='${id}'`;
    connectionPool.query(deleteQuery, function (queryErr, result) {
        if (queryErr) {
            console.error('데이터 삭제 중 에러 발생:', queryErr);
            res.status(500).send('내부 서버 오류');
        } else {
            console.log('데이터가 삭제되었습니다.');
            res.send("<script>alert('문의사항이 삭제되었습니다.'); location.href='/contactList'</script>");
        }
    });
});


// Server listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})