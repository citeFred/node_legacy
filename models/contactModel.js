const mysql = require('mysql2');
require('dotenv').config();

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

// 데이터 조회
const getContacts = (callback) => {
    const selectQuery = `SELECT * FROM contact ORDER BY id DESC`;
    connectionPool.query(selectQuery, (err, results) => {
        callback(err, results);
    });
};

// 데이터 삽입
const addContact = (contact, callback) => {
    const insertQuery = `INSERT INTO contact(name, phone, email, memo, create_at, modify_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
    connectionPool.query(insertQuery, [contact.name, contact.phone, contact.email, contact.memo], (err, result) => {
        callback(err, result);
    });
};

// 데이터 삭제
const deleteContact = (id, callback) => {
    const deleteQuery = `DELETE FROM contact WHERE id = ?`;
    connectionPool.query(deleteQuery, [id], (err, result) => {
        callback(err, result);
    });
};

// 데이터 업데이트
const updateContactStatus = (id, callback) => {
    const updateQuery = `UPDATE contact SET status = 'done' WHERE id = ?`;
    connectionPool.query(updateQuery, [id], (err, result) => {
        callback(err, result);
    });
};

module.exports = {
    getContacts,
    addContact,
    deleteContact,
    updateContactStatus,
};