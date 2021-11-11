import Vue from 'vue'
import dayjs from 'dayjs'

// dayjs默认语言是英文，要用中文版的，这里要加载中文语言包
import 'dayjs/locale/zh-cn'

// 配置使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 配置后，可以全局使用中文语言包
dayjs.locale('zh-cn')

// daysjs() 获取当前最新時間
// console.log(dayjs().format('YYYY-MM-DD'))

// 全局过滤器（可以在任何组件的模板template中使用）。过滤器相当于一个全局可用的方法（仅供模板使用）
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式：{{ 表达式 | 过滤器函数}}
// 管道符| 前面的表达式的结果会作为参数传递到过滤器函数中。过滤器函数的返回值会渲染到使用过滤器的模板位置。
Vue.filter('standardTimeFormat', value => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
})
