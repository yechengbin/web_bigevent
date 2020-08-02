$(function() {
    var layer = layui.layer

    // 1.1获取裁剪区域的DOM元素
    var $image = $('#image')
        // 1.2配置选项
    const options = {

        // 纵横比 1/1   16/9
        aspectRatio: 1,

        //指定预览区域
        preview: '.img-preview'
    }

    //1.3创建裁剪区域
    $image.cropper(options)

    //为上传按钮注册点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })


    $('#file').on('change', function(e) {
        console.log(e); //找到对象e里面的targer 属性里面有files 伪数组
        // [0 files,length 1]   :   1 选择的文件  0 索引文件
        console.log(111);
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择照片!')
            console.log(222);
        }

        //1.拿到用户选择的文件  target.files[0]: 指选中的图片
        var file = e.target.files[0]
            //2.将文件转化为路径
        var imgURL = URL.createObjectURL(file)
            // 3.重新初始化裁剪区
        $image
            .cropper('destroy') //销毁旧的裁剪区域
            .attr('src', imgURL) //重新设置图片路径  自定义属性
            .cropper(options) //重新初始化裁剪区域

    })


    //3.上传头像
    $('#btnUpload').on('click', function() {
        // 获取base64图片  比源文件大30%  但是减少了图片不必要的请求  加快小文件打开速度
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            //ajax
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                //返回校验
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('头像上传成功')
                    //刷新父框架中的头像   getUserInfo()放在全局中,可以调用
                window.parent.getUserInfo()
            }
        })




    })









})