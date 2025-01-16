const contactModel = require('../models/contactModel');

// 데이터 조회 (뷰용)
const getIndexWithContacts = (req, res) => {
    contactModel.getContacts((err, result) => {
        if (err) {
            console.error('데이터 조회 중 에러 발생:', err);
            return res.status(500).send('내부 서버 오류');
        }
        res.render('index', { lists: result });
    });
};

module.exports = {
    getIndexWithContacts,
};
