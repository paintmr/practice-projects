$(function () {
  // 為輸入綁定keyup事件
  $('#ipt').on('keyup', function () {
    clearTimeout(timer);
    var keywords = $(this).val().trim();
    if (keywords.length <= 0) {
      // return;
      // 如果關鍵詞為空，清空後隱藏搜索建議列表
      return $('#suggest-list').empty().hide();
    }

    // 獲取搜索建議列表 

    // 先判斷緩存中是否有數據
    if (cacheObj[keywords]) {
      return renderSuggestList(cacheObj[keywords])
    }

    // getSuggestList(keywords);
    debounceSearch(keywords)
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

    // 緩存
    // 獲取用戶輸入的內容，作為鍵
    var k = $('#ipt').val().trim();
    // 需要將數據作為值，進行緩存
    cacheObj[k] = res;
  }

  // 定義延時器的id 
  var timer = null
  // 定義防抖的函數 
  function debounceSearch(kw) {
    timer = setTimeout(function () {
      getSuggestList(kw)
    }, 500)
  }

  // 定義全局緩存對象
  var cacheObj = {}

})



