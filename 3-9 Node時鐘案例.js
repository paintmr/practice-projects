// 1.1 導入fs模塊
const fs = require('fs')
// 1.2 導入path模塊
const path = require('path')

// 1.3 定義正則表達式，分別匹配<style></style>和<script></script>標籤
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 2.1 調用fs.readFile()方法讀取文件
fs.readFile(path.join(__dirname, '/3-9 index.html'), 'utf8', function (err, dataStr) {
  // 2.2 如果讀取HTML文件失敗
  if (err) return console.log('讀取HTML文件失敗TT' + err.message)
  // 2.3 如果讀取文件成功，調用對應的三個方法，分別拆解出CSS，js，html文件
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})

// 3.1 定義處理CSS樣式的方法
function resolveCSS(htmlStr) {
  // 3.2 使用正則提取style標籤中的CSS的內容
  const r1 = regStyle.exec(htmlStr)
  // console.log(r1);
  // 3.3 替換r1數組中的第1個元素中的字符串片段
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
  // console.log(newCSS)
  // 3.4 調用fs.writeFile()方法，將提取的樣式寫入到3-9 clock.css的文件裡面
  fs.writeFile(path.join(__dirname, '/3-9 clock.css'), newCSS, function (err) {
    if (err) return console.log('寫入CSS樣式失敗TT' + err.message)
    console.log('寫入樣式文件成功!')
  })
}

// 4.1 定義處理JS腳本的方法
function resolveJS(htmlStr) {
  // 4.2 通過正則，提取script標籤中的JavaScript內容
  const r2 = regScript.exec(htmlStr)
  // 4.3 替換r2數組中的第1個元素中的字符串片段
  const newJS = r2[0].replace('<script>', '').replace('</script>', '')
  // console.log(newJS)
  // 4.4 把newJS寫入到3-9 clock.js中
  fs.writeFile(path.join(__dirname, '/3-9 clock.js'), newJS, function (err) {
    if (err) return console.log('寫入JS代碼失敗TT' + err.message)
    console.log('寫入JS代碼成功！')
  })
}

// 5.1 定義處理HTML結構的方法
function resolveHTML(htmlStr) {
  // 5.2 調用replace方法，把內嵌的style和script標籤及其內容替換為外聯的link和script標籤
  const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./3-9 clock.css" />').replace(regScript, '<script src="./3-9 clock.js"></script>')
  // 5.3 寫入3-9 clock.html這個文件
  fs.writeFile(path.join(__dirname, '/3-9 clock.html'), newHTML, function (err) {
    if (err) return console.log('寫入HTML文件失敗TT' + err.message)
    console.log('寫入HTML頁面成功！')
  })
}