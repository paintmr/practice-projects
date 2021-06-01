$(function () {
  // 3 給時間日期和時間補零的函數
  function addZero(n) {
    if (n < 10) {
      return '0' + n
    } else {
      return n
    }
  }
  // 2 格式化時間的過濾器函數
  template.defaults.imports.dateFormat = function (dtStr) {
    var dt = new Date(dtStr)

    var y = dt.getFullYear();
    var m = addZero(dt.getMonth() + 1);
    var d = addZero(dt.getDate());

    var h = addZero(dt.getHours())
    var mm = addZero(dt.getMinutes())
    var s = addZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
  }

  // 1 獲取新聞列表的函數
  function getNewsList() {
    $.get('http://www.liulongbin.top:3006/api/news', function (res) {
      if (res.status !== 200) {
        return alert('獲取新聞列表數據失敗TT')
      }
      for (var i = 0; i < res.data.length; i++) {
        // 把每一項的tags屬性，從字符串改造成字符串的數組
        res.data[i].tags = res.data[i].tags.split(',')
      }
      // console.log(res);
      // 把在HTML文檔的script中定義好的模板tpl-news和數據res放到template()函數中去編譯模板，得到返回值htmlStr
      var htmlStr = template('tpl-news', res)
      $('#news-list').html(htmlStr)
    })
  }
  getNewsList()
})