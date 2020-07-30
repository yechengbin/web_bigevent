//设置路径(测试)
var baseURL ="http://ajax.frontend.itheima.net"
//设置路径(生产)

// ajaxPrefilter()  jQuery封装的方法
// 拦截/过滤每一次ajax请求,配置每次请求需要的参数
$.ajaxPrefilter(function(options){
    // console.log(options);
    options.url=baseURL+options.url
    // console.log(options);
})