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
  }
  init() {
    this.updateNode();
    // 初始化讓相關的元素綁定事件
    this.add.onclick = this.addTab;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
    }
  }
  // 獲取所有的li和section
  updateNode() {
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
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
    var li = '<li class="liactive"><span>新選項卡</span><span class="iconfont icon-guanbi"></span></li>'
    var section = '<section class="conactive">新section</section>'
    // 2-2 把這兩個元素追加到對應的父元素裡面
    that.ul.insertAdjacentHTML('beforeend', li);
    that.fsection.insertAdjacentHTML('beforeend', section);
    that.init() //每次添加了新的tab和section，刷新一下，以便獲取所有的tab和section，並且給它們全部綁定事件
  }
  // 3 刪除
  removeTab() { }
  // 4 修改
  editTab() {

  }
}
new Tab('#tab');