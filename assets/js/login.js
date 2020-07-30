$(function() {
    // 点击按钮,切换登录和注册
    $('#link_box').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.定义 layui 表单校验
    //自带  layui.form
    var form=layui.form
    
    //利用form这个对象,创建规则
    form.verify({
        pwd:[/^\S{6,12}$/,"密码为6-12位,不能包含空格"],
        
        //确认密码校验规则
        repwd:function(value){
            if($('#reg-pwd').val()!==value){
                return "两次密码输入不一致"
            }
        }
        })
        

     // 3.注册功能
     var layar=layui.layar

     $('#form_reg').on('submit',function(e){
            //阻止表单默认提交
            e.preventDefault()
            //console.log($('#form_reg).serialize())
            //ajax发送异步提交
            $.ajax({
                type:'POST',
                url:'/api/reguser',
                //data:$('#form_reg).serialize()  //快速获取表单信息(如果后端程序员设置不准多信息提交,那么不能登录)
                data:{
                    //   #reg-box [name=username] 空格写法 后代选择器  
                    username:$('#form_reg [name=username]').val(),
                    password:$('#form_reg [name=password]').val(),
                },
                success:function(res){
                    //注册失败 提示
                    if(res.status !=0){
                        return  layer.msg(res.message)
                    }
                    //注册成功 ,提示
                    layer.msg(res.message);

                    //模拟人手点击
                    $('#link_login').click()
                    //清空表单数据
                    $('#form_reg')[0].reset()

                    // location.reload()  直接刷新页面(投机取巧: 以后如果要加别的功能...)

             }
            })

        })


    // 3.登录功能
    //  var layar=layui.layar
     

     $('#form_login').on('submit',function(e){
            //阻止表单默认提交
            e.preventDefault()
            //console.log($('#form_login).serialize())
            //ajax发送异步提交
            $.ajax({
                type:'POST',
                url:'/api/login',
                 data:$(this).serialize(),  // 快速获取表单信息(如果后端程序员设置不准多信息提交,那么不能登录)
                success:function(res){
                    //登录失败 提示
                    if(res.status !=0){
                        return  layer.msg(res.message)
                    }
                    //登录成功 ,提示
                    layer.msg(res.message);

                    //保存token (必写)
                    localStorage.setItem('token',res.token)
                    
                    //页面跳转
                    location.href="/index.html"
             }
            })
        })


})