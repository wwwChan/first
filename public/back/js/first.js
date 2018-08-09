$(function () {

    // 当前页
    var currentPage = 1;
    // 每页多少条
    var pageSize = 5;

    // 1. 一进入页面就渲染页面
    render();

    function render() {

        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // 结合模板进行渲染
                var htmlStr = template("tmp", info);
                $('.lt_content tbody').html(htmlStr);

                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    //使用的插件所提供的点击事件
                    // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        // 将选中的页码更新到 currentPage
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })
            }
        })

    }

    //2-点击添加分类的按钮增加页面
    $('#addBtn').click(function () {
        $('#addModal').modal('show');
    })
    //3-使用表单校验插件,实现表单校验
    $('#form').bootstrapValidator({
        //配置字体图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-heart', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 配置字段 (不要忘记给input加name属性)
        fields: {
            username: {
                // 校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        // 配置提示信息
                        message: "请输入一级分类名称"
                    }
                }
            }
        }

    });

    //4-阻止默认的提交.通过ajax来
    //关闭模态框然后再页面重新渲染

    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        //先阻止默认的提交信息 

        $.ajax({
            type: 'post',
            url: "/category/addTopCategory",
            data: $('#form').serialize(), //表单序列化 
            success: function (info) {
                if (info.success) {
                    $('#addModal').modal('hide');

                    //重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
                    currentPage = 1;
                    render()
                    // 重置表单校验状态和 表单内容
                    // 传 true 不仅可以重置 状态, 还可以重置内容
                    $('#form').data('bootstrapValidator').resetForm(true)
                }

            }


        })

    })
















})