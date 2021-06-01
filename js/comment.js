// 顯示評論列表
function getCmtList() {
  $.get('http://www.liulongbin.top:3006/api/cmtlist', function (res) {
    if (res.status !== 200) {
      return alert('獲取評論列表失敗TT')
    }
    var rows = []
    $.each(res.data, function (i, item) {
      // 循環拼接字符
      rows.push('<li class="list-group-item"><span class="badge" style="background-color: #f0ad4e">評論時間：' + item.time + '</span><span class="badge" style="background-color: #5bc0de">評論人：' + item.username + '</span>' + item.content + '</li>')
    })
    $('#cmt-list').empty().append(rows.join('')) //渲染列表的UI結構
  })
}
getCmtList();

// 發表評論
$('#formAddCmt').submit(function (e) {
  e.preventDefault() //阻值表單的默認提交行為
  // 快速得到表單中的數據
  var data = $(this).serialize()
  // console.log(data);
  $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
    if (res.status !== 201) {
      return alert('發表評論失敗')
    }
    // 刷新評論列表
    getCmtList()
    // 快速清空表單內容
    // $('#formAddCmt')獲取到的是jQuery對象，得把它轉換成一個原生的DOM對象才能使用原生form表單的函數reset()，轉換方法：在這個jQuery對象後面加個[0]
    $('#formAddCmt')[0].reset()
  })
})