// 这是包的入口文件
const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')


// 向外暴露的成员
// 用到es6中的新特性：展开运算符——把这个对象上的所有内容展开了，全部交给另一个对象来保存
module.exports = {
  ...date,
  ...escape
}