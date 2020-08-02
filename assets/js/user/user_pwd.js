$(function() {

    var form = layui.form

    form.verify({
        // 设置三个方法 :  pwd 格式规则 , samePwd  旧密码与新密码 如果相同则报错  ,旧密码与确认密码 如果不同则报错  

        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 新密码不能与旧密码相同
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与原密码相同'
            }
        },


        //密码二次验证  :新密码如果和确认密码框 不一致则报错
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致'
            }

        }

    })


    //3.修改密码
    $('.layui-form').on('submit', function(e) {
        //阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(layyui);
                // console.log(layer);
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                } else {
                    layui.layer.msg('恭喜您,密码修改成功')
                        // jq元素 转换成DOM元素  调用reset()方法  清除表单数据
                    $('.layui-form')[0].reset();
                }

            }
        })
    })





})