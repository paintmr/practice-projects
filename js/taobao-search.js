$(function () {
  // 為輸入綁定keyup事件
  $('#ipt').on('keyup', function () {
    var keywords = $(this).val().trim();
    if (keywords.length <= 0) {
      // return;
      // 如果關鍵詞為空，清空後隱藏搜索建議列表
      return $('#suggest-list').empty().hide();
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
      success: function (res) {
        // 調用渲染建議列表函數
        // console.log(res);
        renderSuggestList(res);
      }
    })
  }

  // 封裝渲染建議列表函數
  function renderSuggestList(res) {
    // 如果沒有需要渲染的數據，直接return
    if (res.result.length <= 0) {
      return $('#suggest-list').empty().hide();
    }
    // 渲染模板結構
    var htmlStr = template('tpl-suggestList', res)
    $('#suggest-list').html(htmlStr).show()
  }


})



