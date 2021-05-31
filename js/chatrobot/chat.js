// 將用戶輸入的內容渲染到聊天窗口
// 为发送按钮绑定点击事件处理函数
$('#btnSend').on('click', function () {
  var text = $('#ipt').val().trim() //获取用户输入的内容
  if (text.length <= 0) {//判断用户输入的内容是否为空
    return $('#ipt').val('');
  }
  // 将用户输入的内容显示到聊天窗口中
  $('#talk_list').append('<li class="right_word"><img src="images/chatrobot/person02.png" /><span>' + text + '</span></li>')
  resetui(); //重置滚动条的位置
  $('#ipt').val(''); //清空输入框的内容

  // 發起請求獲取聊天消息
  getMsg(text);
})

// 获取聊天机器人发回来的信息
function getMsg(text) {
  $.ajax({
    methos: 'GET',
    url: 'http://www.liulongbin.top:3006/api/robot',
    data: {
      spoken: text
    },
    success: function (res) {
      // console.log(res);
      if (res.message === 'success') {
        // 接收聊天消息
        var msg = res.data.info.text;
        $('#talk_list').append('<li class="left_word"><img src="images/chatrobot/person01.png" /> <span>' + msg + '</span></li>')
        // 重置滚动条的位置
        resetui()
        // 将机器人的聊天内容转为语音
        getVoice(msg);
      }
    }
  })
}

// 将机器人的聊天内容转为语音
function getVoice(text) {
  $.ajax({
    method: 'GET',
    url: 'http://www.liulongbin.top:3006/api/synthesize',
    data: {
      text: text
    },
    success: function (res) {
      // console.log(res);
      if (res.status === 200) {
        // 播放语音
        $('#voice').attr('src', res.voiceUrl)
      }
    }
  })
}

// 使用回车发送消息
$('#ipt').on('keyup', function (e) {
  // e.keyCode可以获取到当前按键的编码
  if (e.keyCode === 13) {
    // 调用按钮元素的click函数，可以通过编程的形式触发按钮的点击事件
    $('#btnSend').click()
  }
})