$(function () {

    //一进入页面发送ajax请求 使用模板引擎进行渲染
    // 当前页
    var currentPage = 1;
    // 每页多少条
    var pageSize = 5;

    // 1. 一进入页面就渲染页面
    render()

    function render() {
        $.ajax({

            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                var htmlStr = template("tmp", info);
                $('tbody').html(htmlStr);

                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    //使用的插件所提供的点击事件
                    // // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        //     // 将选中的页码更新到 currentPage
                        currentPage = page;
                        //     // 重新渲染
                        render()
                    }
                })
            }

        })
    }
    //点击添加分类按钮
    //2.点击添加分类的一级分类按钮 显示下拉菜单的ul
    $('#addBtn').click(function () {
        $('#addModal').modal('show');
        $.ajax({
            type: 'get',
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: 'json',
            success: function (info) {

                var htmlStr = template('tmp1', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    // 3. 通过注册委托事件, 给 a 添加点击事件
    $('.dropdown-menu').on('click', 'a', function () {
        //选中的文本
        var txt = $(this).text();
        //拿到categoryId
        var id = $(this).data('id');
        //修改文本内容 downTxt内容设置为txt
        $('#dropdownText').text(txt);
        //将选中的id设置到input表单元素里
        $('[name="categoryId"]').val(id);
        // 需要将校验状态置成 VALID
        // 参数1: 字段
        // 参数2: 校验状态
        // 参数3: 配置规则, 来配置我们的提示文本
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')

    })



    // 4. 配置图片上传
    $('#fileupload').fileupload({
        //指定dataType为json
        dataType: 'json',
        done: function (e, data) {
            //获取上传成功的图片的地址
            var picAddr = data.result.picAddr;
            //给img设置图片地址的属性
            $('#imgBox img').attr('src', picAddr);
            //将图片设置在隐藏域中
            $('[name="brandLogo"]').val(picAddr);
            //手动重置隐藏域的校验状态
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }

    })
    // 5. 配置表单校验
    //指定不校验的类型,默认为[':disabled',':hidden',':not(:visible)']] 可以不设置  我们需要催隐藏域进行校验,所以不需要将隐藏域排除到校验范围外面
    $('#form').bootstrapValidator({
        excluded: [],

        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //校验有效的
            invalid: 'glyphicon glyphicon-remove', //校验无效的
            validating: 'glyohicon glyphicon-refesh', //校验中
        },

        //配置字段
        fields: {
            // categoryId 分类id
            // brandName 二级分类名称
            // brandLogo 图片地址
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请选择图片"
                    }
                }
            }
        }
    });

    // 6. 注册校验成功事件, 通过 ajax 进行添加
    $('#form').on('success.form.bv', function (e) {
        //首先要先阻止默认提交
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {

                if (info.success) {
                    $('#addModal').modal('hide');
                    //重新渲染第一页面
                    currentPage = 1;
                    render();
                    //重置模态框的表单,不进校验状态要重置,文本内容也要重置
                    $('#form').data('bootstrapValidator').resetForm(true);
                    //手动重置文本内容 和图片路径
                    $('#dropdownText').text("请选择一级分类");
                    $('#imgBox img').attr('src', 'images/none,png');
                }
            }
        })
    })
});