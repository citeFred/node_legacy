const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const viewController = require('../controllers/viewController');

// 메인페이지 및 데이터 조회
router.get('/', viewController.getIndexWithContacts);

// 데이터 삽입
router.post('/contact/', apiController.addContact);

// 데이터 삭제
router.delete('/contact/:id', apiController.deleteContact);

// 데이터 업데이트
router.put('/contact/:id', apiController.updateContact);

module.exports = router;