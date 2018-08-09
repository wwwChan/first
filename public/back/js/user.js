$(function () {

    // 当前页
    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;
    var currentId; // 当前选中的用户 id
    var isDelete;
    // 1. 一进入页面, 进行渲染
    render();

    function render() {
        // 发送请求, 获取表格渲染的数据
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // 参数2 必须是一个对象
                // 在模板中可以任意使用对象中的属性
                // isDelete 表示用户的启用状态, 1就是启用, 0就是禁用
                var htmlStr = template("tmp1", info);
                $('.lt_content tbody').html(htmlStr);


                // 配置分页
                $('#paginator').bootstrapPaginator({
                    // 指定bootstrap版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    // 当页面被点击时触发
                    onPageClicked: function (a,  b,  c, page) {
                        // page 当前点击的页码
                        currentPage = page;
                        // 调用 render 重新渲染页面
                        render();
                    }
                });
            }
        });
    }
    //点击启用禁用按钮 显示模态框 通过事件委托来绑定事件
    $('tbody').on('click', '.btn', function () {
        $('#userModal').modal('show');
        //获取用户的id
        //jq中提供了获取自定义属性的方法 data()
        currentId = $(this).parent().data('id');
        //如果是禁用按钮的话,说明需要将该用户状态改成禁用状态,传0
        //0表示禁用 1表示启用 传给后台几 后台就设置该用户状态为几 
        isDelete = $(this).hasClass('btn-danger')?0:1;

    })

    //点击确认的时候 发送ajax的请求 修改对应用户的状态 需要两个参数(用户id,和isDelete用户的状态)
    $('#submitBtn').click(function () {

        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            success: function (info) {
                if (info.success) {
                    $('#userModal').modal('hide');
                    render();
                }
            }
        })

    })


})