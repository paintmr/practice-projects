var that;
class Tab {
  constructor(id) {
    that = this;
    // 獲取元素
    this.main = document.querySelector(id);
    this.add = this.main.querySelector('.tabadd');
    // li的父元素
    this.ul = this.main.querySelector('.firstnav ul:first-child');
    // section的父元素
    this.fsection = this.main.querySelector('.tabscon')
    this.init();//把init()寫在這裡，可以讓頁面一加載的時候就調用init()
    this.sectionI = 1;
  }
  init() {
    this.updateNode();
    // 初始化讓相關的元素綁定事件
    this.add.onclick = this.addTab;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removeTab;
      this.spans[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
    }
  }
  // 獲取所有的li,section和關閉按鈕
  updateNode() {
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
  }
  // 1 切換
  toggleTab() {
    that.clearClass();
    this.className = 'liactive';
    that.sections[this.index].className = 'conactive';
  }
  // 清除所有li和section的類
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }
  // 2 添加
  addTab() {
    that.clearClass();
    // 2-1 創建li元素和section元素
    var li = '<li class="liactive"><span>新選項卡' + that.sectionI + '</span><span class="iconfont icon-guanbi"></span></li>'
    var section = '<section class="conactive">新section' + that.sectionI + '</section>'
    // 2-2 把這兩個元素追加到對應的父元素裡面
    that.ul.insertAdjacentHTML('beforeend', li);
    that.fsection.insertAdjacentHTML('beforeend', section);
    that.init() //每次添加了新的tab和section，刷新一下，以便獲取所有的tab和section，並且給它們全部綁定事件
    that.sectionI++;
  }
  // 3 刪除
  removeTab(e) {
    // 因為x的父元素li也有點擊事件，點擊x會觸發li的點擊事件進行tab切換。點擊x關閉時不需要切換tab，所以要阻止事件冒泡。
    e.stopPropagation();
    var index = this.parentNode.index;
    // 根據索引號刪除對應的li和section
    that.lis[index].remove();
    that.sections[index].remove();
    that.init() //每次刪除了tab和section，刷新一下，以便獲取所有的tab和section，並且給它們全部綁定事件

    // 如果刪除的是被選中的li
    if (this.parentNode.className === 'liactive') {
      console.log(this.parentNode);
      // 如果不是第1個，讓其前一個li處於選中狀態
      if (index !== 0) {
        index--;
        that.lis[index].click();
      } else if (index === 0 && that.lis.length > 1) {
        console.log(index);
        // 如果是第1個，且後面還有選項，則讓後一個選中
        index++;
        that.lis[index].click();
      }
    }
  }
  // 4 修改
  editTab() {
    var str = this.innerHTML;
    console.log(str);
    // 禁止雙擊選定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = '<input type = "text" />'
    var input = this.children[0];
    input.value = str;
    input.select(); //讓文本框裡的文字處於選定狀態
    // 離開文本框時，把文本框裡的值給span
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    }
    // 按下回車也可以把文本框裡面的值給span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        // 手動調用表單失去焦點時間，不需要鼠標離開操作
        this.blur();
      }
    }
  }
}
new Tab('#tab');