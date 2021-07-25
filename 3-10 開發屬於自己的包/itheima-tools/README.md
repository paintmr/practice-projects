## 安装

```
npm install iheima-tools-qazjul
```

## 导入

```js
const itheima = require("iheima-tools-qazjul");
```

## 格式化时间

```js
// 调用dateFormat格式化时间
const dtStr = itheima.dateFormat(new Date());
// 结果 2021-07-25 17:09:01
console.log(dtStr);
```

## 转义 HTML 中的特殊字符

```js
// 待转换的HTML字符串
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>';
// 调用htmlEscape方法转换
const str = itheima.htmlEscape(htmlStr);
// 转换结果 title=&quot;abc&quot;&gt;这是h1标签&lt;span&gt;123&amp;nbsp;&lt;\span&gt;&lt;\h1&gt;
console.log(str);
```

## 还原 HTML 中的特殊字符

```js
// 待还原的HTML字符串
const str2 = itheima.htmlUnEscape(str);
// 输出的结果 <h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>
console.log(str2);
```

## 开源协议

ISC
