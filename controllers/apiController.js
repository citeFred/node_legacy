const contactModel = require('../models/contactModel');

// 데이터 삽입
const addContact = (req, res) => {
    const contact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        memo: req.body.memo
    };
    contactModel.addContact(contact, (err, result) => {
        if (err) {
            console.error('데이터 삽입 중 에러 발생:', err);
            return res.status(500).json({ message: '내부 서버 오류' });
        }
        res.status(201).json({ message: '문의사항이 등록되었습니다.', contactId: result.insertId });
    });
};

// 데이터 조회
const getContacts = (req, res) => {
    contactModel.getContacts((err, result) => {
        if (err) {
            console.error('데이터 조회 중 에러 발생:', err);
            return res.status(500).send('내부 서버 오류');
        }
        res.json(result);
    });
};

// 데이터 삭제
const deleteContact = (req, res) => {
    const id = req.params.id;

    contactModel.deleteContact(id, (err, result) => {
        if (err) {
            console.error('데이터 삭제 중 에러 발생:', err);
            return res.status(500).send('내부 서버 오류');
        }
        res.status(200).json({ message: '문의사항이 삭제되었습니다.' });
    });
};

// 데이터 업데이트
const updateContact = (req, res) => {
    const id = req.params.id;

    contactModel.updateContactStatus(id, (err, result) => {
        if (err) {
            console.error('데이터 업데이트 중 에러 발생:', err);
            return res.status(500).send('내부 서버 오류');
        }
        res.status(200).json({ message: '문의사항이 업데이트되었습니다.' });
    });
};

module.exports = {
    addContact,
    getContacts,
    deleteContact,
    updateContact
};