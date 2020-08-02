$(function() {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称应该输入1~6位之间"
            }
        }
    })

    //2.初始化用户信息
    initUserInfo();

    function initUserInfo() {
        //发送ajax
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                //获取用户信息校验
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //展示用户信息
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3. 重置(只接受click点击按钮)
    $("#btnReset").on('click', function(e) {
        //阻止表单的默认行为
        e.preventDefault()
        initUserInfo()
    })

    //4.提交用户修改 (监听表单的提交事件)
    $('.layui-form').on('submit', function(e) {
        // 取消form表单的默认行为,阻止表单默认行为
        e.preventDefault()
            // 发起ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // $(this).serialize()快速获取当前表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败!')
                } else {
                    layer.msg('用户信息修改成功')
                        //刷新父框架里面的用户信息
                    window.parent.getUserInfo()

                }
            }
        })
    })





})