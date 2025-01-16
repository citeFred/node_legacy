const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const viewController = require('../controllers/viewController');

/* route to view controllers */ 
// 메인 뷰페이지 반환
router.get('/', viewController.getIndexViewPage);

// 기타 페이지 반환 추가..

/* route to api controllers */ 
// Contact 기능
// 데이터 삽입
router.post('/api/contact/', apiController.addContact);

// 데이터 조회
router.get('/api/contact/', apiController.getContacts);

// 데이터 삭제
router.delete('/api/contact/:id', apiController.deleteContact);

// 데이터 업데이트
router.put('/api/contact/:id', apiController.updateContact);

module.exports = router;