$(function () {

    //柱状图
    var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

    // 指定图表的配置项和数据
    var option1 = {
        //大标题
        title: {
            //标题文本
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        //x轴的刻度
        xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        //y轴的刻度 
        yAxis: {},
        series: [{
            name: '人数',
            //line是折线图 pei饼状图 pie是饼状图
            type: 'bar',
            data: [5000, 2000, 3600, 1010, 3200, 4520]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_1.setOption(option1);



    //饼图
    var echarts_2 = echarts.init(document.querySelector('.echarts_2'));
    option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['nike', 'Adidas', 'Bape', 'SSur', 'Clot']
        },
        series: [
            {
                name: '品牌',
                type: 'pie',
                //配置直径
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: 'nike' },
                    { value: 310, name: 'Adidas' },
                    { value: 234, name: 'Bape' },
                    { value: 135, name: 'SSur' },
                    { value: 1548, name: 'Clot' }
                ],
                //添加阴影效果 
                itemStyle: {
                    //阴影
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    //使用刚设置好的配置项 
    echarts_2.setOption(option2);

    
})