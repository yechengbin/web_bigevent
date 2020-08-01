$(function(){
        // 获取用户信息
        getUserInfo()

        // 3.退出
        var layer=layui.layer
        $("#btnLogout").on('click',function(){
            //3.1提示
            layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
                //do something
                //关闭提示框
                layer.close(index);
                // 3.2删除本地token
                localStorage.removeItem("token")
                //3.3页面跳转
                location.href='/login.html'
              });
    })


})

// 1.封装用户获取信息
function  getUserInfo(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            //  headers 请求头配置对象
            // headers:{
            //     Authorization: localStorage.getItem('token')||''
            // },
            success:function(res){
                console.log(res);
        
                if(res.status !==0){
                        return layui.layer.msg(res.message)
                }
                // 调用函数渲染用户头像
                renderUser(res.data)
            }

        })
}

// token 获得数据 24小时后失效 ，所以要重新通过登录页面登录账号


// 2.封装用户渲染函数
    function renderUser(user){
        // 获取用户名
       var uname=user.nicknname||user.username;
       //设置欢迎文本呢
        $("#welcome").html("欢迎&nbsp;&nbsp;"+uname)
        //按需求渲染用户头像
        if(user.user_pic !==null){
                ('.layui-nav-img').show().attr('src',user.user_pic),
                ('.text-avarar').hide()
            }else{
                // 渲染文本头像
            $('.layui-nav-img').hide(),
            $('.text-avatar').show().html(uname[0].toUpperCase());
         }
}

