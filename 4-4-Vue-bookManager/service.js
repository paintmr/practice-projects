const data = require('./data.json');
const path = require('path');
const fs = require('fs');

// 自動生成圖書編號（自增）
let maxBookCode = () => {
  let arr = [];
  data.forEach((item) => {
    arr.push(item.id);
  })
  return Math.max.apply(null, arr);
}

// 把內存數據寫入文件
let writeDataToFile = (res) => {
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
    if (err) {
      res.json({
        status: 500
      });
    }
    res.json({
      status: 200
    });
  });
}

// 獲取圖書列表數據
exports.getAllBooks = (req, res) => {
  res.json(data);
}

// 驗證圖書編號是否存在，如果存在，返回1，如果不存在，返回2
exports.checkId = (req, res) => {
  let id = req.params.id;
  let flag = false;
  data.some(item => {
    if (id == item.id) {
      flag = true;
      return true;
    }
  })
  let maxId = maxBookCode() + 1;
  if (flag) {
    res.json({
      status: 1,
      maxId
    })
  } else {
    res.json({
      status: 2,
      maxId
    })
  }
}

// 驗證圖書名稱是否存在，如果存在，返回1，如果不存在，返回2
exports.checkName = (req, res) => {
  let name = req.params.name;
  let flag = false;
  data.some(item => {
    if (name == item.name) {
      flag = true;
      return true;
    }
  })
  if (flag) {
    res.json({
      status: 1
    })
  } else {
    res.json({
      status: 2
    })
  }
}

// 添加新圖書
exports.addBook = (req, res) => {
  // 獲取表單數據
  let info = req.body;
  let book = {};
  for (let key in info) {
    book[key] = info[key];
  }
  // 如果用戶沒有填寫圖書id，才自動給圖書添加id
  if (!book.id) {
    book.id = maxBookCode() + 1;
  }
  // book.date = 2525609975000;
  book.date = new Date().getTime();
  data.push(book);
  // 把內存中的數據寫入文件
  writeDataToFile(res);
}

// 把修改後的圖書信息放入data中
exports.editBook = (req, res) => {
  let info = req.body;
  info.date = new Date().getTime();
  data.some((item) => {
    if (info.id == item.id) {
      for (let key in info) {
        item[key] = info[key];
      }
      return true;
    }
  })
  // 把内存中的数据写入文件
  writeDataToFile(res);
}

// 根據id刪除圖書
exports.deleteBook = (req, res) => {
  let id = req.params.id;
  data.some((item, index) => {
    if (id == item.id) {
      // 刪除數組的一項數據
      data.splice(index, 1);
      return true;
    }
  })
  // 把內存中的數據寫入文件夾
  writeDataToFile(res);
}