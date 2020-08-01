//设置路径(测试)
var baseURL ="http://ajax.frontend.itheima.net"
//设置路径(生产)

// ajaxPrefilter()  jQuery封装的方法
// 1.拦截/过滤每一次ajax请求,配置每次请求需要的参数
$.ajaxPrefilter(function(options){
    // console.log(options);
    options.url=baseURL+options.url;
    // console.log(options);



    // 统一为有权限的接口，设置 headers 请求头

    // 2.判断地址路径是否包含:indexOf  ( /my/)
    if(options.url.indexOf("/my/") !==-1){
        options.headers={
            Authorization: localStorage.getItem('token')||''
        }
       
    }

    // 3.所有的请求完成都要进行身份认证判断
        options.complete=function(res){
            var data=res.responseJSON;
            console.log(data);
            if(data.status ==1 &&data.message=="身份认证失败！"){
                // 1.删除token
                localStorage.removeItem('token');
                // 2.页面跳转
                location.href='login.html'
            }
        }












})
