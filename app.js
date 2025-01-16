const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
require('dotenv').config();
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'))

// MySQL connection Pool :
const connectionPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectionLimit: 10,
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

// Router
app.get('/', (req, res) => {
    const selectQuery = `select * from contact order by id desc`;
    connectionPool.query(selectQuery, (err, result) => {
        if (err) {
            console.error('데이터 조회 중 에러 발생:', err);
            res.status(500).send('내부 서버 오류');
        } else {
            console.log('데이터가 조회되었습니다.');
            console.log(result);
            res.render('index', {lists:result});
        }
    });
});

app.post('/api/contact', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const memo = req.body.memo;
  
    const insertQuery = `INSERT INTO contact(name, phone, email, memo, create_at, modify_at) VALUES ('${name}', '${phone}', '${email}', '${memo}', NOW(), NOW())`;
  
    connectionPool.query(insertQuery, (err, result) => {
        if (err) {
            console.error('데이터 삽입 중 에러 발생:', err);
            return res.status(500).json({ message: '내부 서버 오류' });
        }
        console.log('데이터가 삽입되었습니다.');
        res.status(201).json({ message: '문의사항이 등록되었습니다.', contactId: result.insertId });
    });
});

app.delete('/api/contactDelete/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `delete from contact where id='${id}'`;
    connectionPool.query(deleteQuery, (err, result) => {
        if (err) {
            console.error('데이터 삭제 중 에러 발생:', err);
            res.status(500).send('내부 서버 오류');
        } else {
            console.log('데이터가 삭제되었습니다.');
            res.send("<script>alert('문의사항이 삭제되었습니다.'); location.href='/contactList'</script>");
        }
    });
});

app.put('/api/contactUpdate/:id', (req, res) => {
    const id = req.params.id;
    const status = "done";
    const updateQuery = `UPDATE contact SET status = '${status}' WHERE id = '${id}';`;
    connectionPool.query(updateQuery, (err, result) => {
        if (err) {
            console.error('데이터 업데이트 중 에러 발생:', err);
            res.status(500).send('내부 서버 오류');
        } else {
            console.log('데이터가 업데이트되었습니다.');
            res.send("<script>alert('문의사항이 업데이트되었습니다.'); location.href='/contactList'</script>");
        }
    });
});

// Server listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})