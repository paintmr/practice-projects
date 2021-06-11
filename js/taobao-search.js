$(function () {
  // 為輸入綁定keyup事件
  $('#ipt').on('keyup', function () {
    var keywords = $(this).val().trim();
    if (keywords.length <= 0) {
      return;
    }
    // 獲取搜索建議列表 
    getSuggestList(keywords);
  })

  // 封裝getSuggestList函數
  function getSuggestList(kw) {
    $.ajax({
      // 指定請求的URL地址，其中，q是用戶輸入的關鍵字
      url: 'https://suggest.taobao.com/sug?q=' + kw,
      // 指定要發起的是JSONP請求
      dataType: 'jsonp',
      success: function (res) { console.log(res) }
    })
  }


})


