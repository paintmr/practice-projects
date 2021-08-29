// 路由模塊
const express = require('express')
const router = express.Router();
const service = require('./service');

// 查詢圖書列表
router.get('/books', service.getAllBooks);
// 驗證圖書編號是否存在
router.get('/books/bookId/:id', service.checkId);
// 驗證圖書名稱是否存在
router.get('/books/book/:name', service.checkName);
// 添加圖書（提交表單）
router.post('/books', service.addBook);
// // 跳轉到編輯圖書信息頁面
// router.get('/books/:id', service.toEditBook);
// // 編輯圖書提交表單
// router.put('/books/:id', service.editBook);
// // 刪除圖書信息
// router.delete('/books/:id', service.deleteBook);


module.exports = router;