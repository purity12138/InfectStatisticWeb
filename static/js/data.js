var yesterday_confirmed = 0, yesterday_died = 0, yesterday_cured = 0,
    yesterday_current_unconfirmed = 0, yesterday_current_serious = 0, yesterday_current_confirmed = 0;

var progress = 0;
var processDocTipsbg = 'rgba(235, 75, 30, 0.9)';

//3218435e78f4d1873ab412313d6d77c5
var dataApi = '';
dataApi = 'https://yiqing.ahusmart.com/overall';
dataApi = 'https://api.tianapi.com/txapi/ncov/index?key=9d2ed450b9692452c645db9bb9febd8b';

var myChart = echarts.init(document.getElementById('main'));
var dataSource = [];
var dimensions = ['日期', '累计确诊', '现有确诊（含重症）', '现有疑似', '现有重症', '累计死亡', '累计治愈',
    '累计确诊+现有疑似', '新增确诊', '新增疑似', '新增(疑似+确诊)', '观察中', '死亡/确诊'];
option = {
    title: {
        text: '全国新型肺炎疫情趋势',
        x: 'center',
        y: 'top',
        top: '15px',
        subtext: '(支持缩放及左右滑动)',
        subtextStyle: {
            fontSize: 12
        }
    },
    legend: {
        type: 'scroll',
        x: 'center',
        y: 'bottom',
        padding: [0, 20],
        itemGap: 3,
        selected: {}
    },
    grid: {
        left: '15%',
        bottom: '40px'
    },
    tooltip: {},
    dataset: {
        dimensions: dimensions,
        source: dataSource,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    dataZoom: [
        {
            type: 'inside',
            throttle: '50',
            minValueSpan: 7,
            start: 100,
            end: 100
        }],
    series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' },
        {
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                },


            }
        },
        {
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                },


            }
        },
        {
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                },


            }
        },
        {
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            }
        },
        {
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            }
        },
        {
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function (params) {
                        str = params.data['死亡/确诊'] + '%'
                        return str;
                    }
                }
            },
            tooltip: {
                formatter: function (item) {
                    str = item.seriesName + "<br>"
                        + item.marker + ' ' + item.data['日期'] + ' : ' + item.data['死亡/确诊'] + '%';
                    return str;
                }

            }
        }
    ]
};

$.ajaxSettings.async = false;
$.getJSON("../Json/data.json?" + Date.parse(new Date()), function (data) {
    dataSource = data;

    option.legend.selected['累计确诊'] = false;
    option.legend.selected['累计确诊+现有疑似'] = false;
    option.legend.selected['观察中'] = false;
    option.legend.selected['死亡/确诊'] = false;
    option.dataset.source = dataSource;

    var yesterday_data = data.filter(item =>
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        yesterday_confirmed = ~~yesterday_data[0]["累计确诊"];
        yesterday_died = ~~yesterday_data[0]["累计死亡"];
        yesterday_cured = ~~yesterday_data[0]["累计治愈"];

        yesterday_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        yesterday_current_serious = ~~yesterday_data[0]["现有重症"];
        yesterday_current_unconfirmed = ~~yesterday_data[0]["现有疑似"];

    }
})


myChart.setOption(option);
window.onresize = () => this.myChart.resize();

update();

$('.tooltip').tooltipster({
    theme: 'tooltipster-shadow'
});

$(".statistics>li>strong").each(function () {
    $(this).bind("click", function () {
        $(this).attr('dataContent', '');
        $(this).removeClass('popshow');
    })


});



window.setInterval(() => update(), 1000 * 60 * 10);

function update() {// + "?" + Date.parse(new Date())
    $.getJSON(dataApi, function (newpneumoniadata) {

        var summaryDataIn = newpneumoniadata.newslist[0].desc;

        $(".datasubtitle").text("(截至 "
            + new Date(summaryDataIn.modifyTime).Format("yyyy-MM-dd hh:mm:ss") + ")");

        /*累计确诊*/
        let confirmedCount = summaryDataIn.confirmedCount;

        /*累计死亡*/
        let deadCount = summaryDataIn.deadCount;

        /*累计治愈*/
        let curedCount = summaryDataIn.curedCount;

        /*现有确诊*/
        let currentConfirmedCount = summaryDataIn.currentConfirmedCount;

        /*现有重症*/
        let seriousCount = summaryDataIn.seriousCount;

        /*现有疑似*/
        let suspectedCount = summaryDataIn.suspectedCount;



        freshDataNum($(".statistics>li>strong").eq(0), currentConfirmedCount || yesterday_current_confirmed);
        freshDataNum($(".statistics>li>strong").eq(1), seriousCount || yesterday_current_serious);
        freshDataNum($(".statistics>li>strong").eq(2), suspectedCount || yesterday_current_unconfirmed);

        freshDataNum($(".statistics>li>strong").eq(3), confirmedCount || yesterday_confirmed);
        freshDataNum($(".statistics>li>strong").eq(4), deadCount || yesterday_died);
        freshDataNum($(".statistics>li>strong").eq(5), curedCount || yesterday_cured);

        freshbackgroud(currentConfirmedCount || yesterday_current_confirmed, confirmedCount || yesterday_confirmed);

        updateIncrease($(".statistics>li>span").eq(0), currentConfirmedCount, yesterday_current_confirmed);
        updateIncrease($(".statistics>li>span").eq(1), seriousCount, yesterday_current_serious);
        updateIncrease($(".statistics>li>span").eq(2), suspectedCount, yesterday_current_unconfirmed);

        updateIncrease($(".statistics>li>span").eq(3), confirmedCount, yesterday_confirmed);
        updateIncrease($(".statistics>li>span").eq(4), deadCount, yesterday_died);
        updateIncrease($(".statistics>li>span").eq(5), curedCount, yesterday_cured);

        console.log(summaryDataIn);

    })
}


function freshDataNum(target, newNum) {

    var oldNum = ~~(target.text());
    var increaseNum = ~~(target.attr('dataContent'));
    /* 右上角 即时新增数据*/
    if (oldNum != 0 && (newNum - oldNum) != 0) {
        target.attr('dataContent',
            ((increaseNum + (newNum - oldNum)) >= 0 ? '+' : '')
            + (increaseNum + (newNum - oldNum))
        );
        target.addClass('popshow');
    }
    else {
        //target.attr('dataContent', '');
    }

    target
        .prop('number', oldNum)
        .animateNumber({ number: newNum }, 3000);
}

function updateIncrease(target, newNum, oldNum) {
    if (newNum > 0 && oldNum > 0) {
        target.attr('dataContent', (newNum >= oldNum ? '+' : '') + (newNum - oldNum)
        );
    }
}
/* 动态改变背景 及 进度 刷新按钮动画*/
function freshbackgroud(currentConfirmedCount, confirmedCount) {
    progress = 1 - currentConfirmedCount / confirmedCount;

    /*实时数据背景*/
    $('#realTimeData').css({ 'background-color': 'rgba(130, 210, 10, ' + 0 + ')' });
    $('#realTimeData').animate({ backgroundColor: 'rgba(130, 210, 10, ' + progress + ')' }, 3000);

    /*进度条进度*/
    $('.processValue').css({ 'width': 0 * 100 + '%' });
    $('.processValue').animate({ width: progress * 100 + '%' }, 3000);

    /*医生卡通位置*/
    $('.processDoc').css({ 'left': 0 * 100 + '%' });
    $('.processDoc').animate({ left: progress * 100 + '%' }, 3000);

    /*卡通提示背景*/
    let bgR = 255 * (1 - progress);
    let bgG = 255 * progress;
    processDocTipsbg = 'rgba(' + bgR + ', ' + bgG + ', 0, 0.9)'

    /*刷新按钮动画*/
    $(".freshBtn>svg").addClass("animation-rotate");
    window.setTimeout(() => $(".freshBtn>svg").removeClass("animation-rotate"), 3000);

}

var tipContent = ""
    + "1、数据每10分钟自动刷新一次，如有更新会在数字右上角提示。<br>"
    + "2、数字右下角为当前相对昨天24时官方数据的增（减）量。<br>"
    + "3、(实时数据采集自网络，仅供参考！实际数据以官方为准！！)<br>";
var tip_index = 0;
$(".datasubtitle").bind("mouseenter",
    function () {
        var that = this;
        tip_index = layer.tips(tipContent,
            that,
            {
                tips: [1, 'rgba(10,140,15,0.9)'],
                time: 0
            });
    }).bind("mouseleave", () => layer.close(tip_index))

var docTipContent = "任务进度："
    + (progress * 100).toFixed(2)
    + "%<br>革命尚未成功，同志仍需努力！";
$(".processDoc").bind("mouseenter",
    function () {
        var that = this;
        if (progress < 1) {
            tip_index = layer.tips(docTipContent,
                that,
                {
                    tips: [1, processDocTipsbg],
                    time: 0
                });
        }
    }).bind("mouseleave", () => layer.close(tip_index))
$(".freshBtn").click(function () {
    update();
});

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?cdcc4d7a702f0597c5bfc96ec9508cbf";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();