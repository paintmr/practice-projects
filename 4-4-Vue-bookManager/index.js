const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

// 啟動靜態資源服務
app.use(express.static('public'));

// 配置解析 application/json 格式數據的內置中間件
app.use(express.json())
// 配置解析 application/x-www.form-urlencoded格式數據的內置中間件
app.use(express.urlencoded({ extended: false }))

// 設置允許跨域訪問該服務
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

// 配置路由
app.use(router);

// 監聽端口
app.listen(3000, () => {
  console.log('server running at prot 3000')
})