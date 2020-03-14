function randomData() {
    return Math.round(Math.random() * 500);
}

///yjc
var hubei_0303_confirmed,guangdong_0303_confirmed,henan_0303_confirmed,zhejiang_0303_confirmed,hunan_0303_confirmed,anhui_0303_confirmed,jiangxi_0303_confirmed,
    shandong_0303_confirmed,jiangsu_0303_confirmed,chongqing_0303_confirmed,sichuan_0303_confirmed,heilongjiang_0303_confirmed,beijing_0303_confirmed,
    shanghai_0303_confirmed,hebei_0303_confirmed,fujian_0303_confirmed,guangxi_0303_confirmed,shanxi_0303_confirmed,yunan_0303_confirmed,hainan_0303_confirmed,
    guizhou_0303_confirmed,tianjin_0303_confirmed,shanxi2_0303_confirmed,gansu_0303_confirmed,liaoning_0303_confirmed,jilin_0303_confirmed,xinjiang_0303_confirmed,
    ningxia_0303_confirmed,neimenggu_0303_confirmed,qinghai_0303_confirmed,aomeng_0303_confirmed,xizang_0303_confirmed;
window.onload = function () {
    var url = "./static/js/by_date.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            var json = JSON.parse(request.responseText);
            //0303
            var yesterday_data = json.filter(function(item) {
                return (item.day) === "3/3";
            });
            //alert("yesterday_data.length"+yesterday_data.length);
            for(var i =0;i<json.length;i ++){
                hubei_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                guangdong_0303_confirmed = ~~yesterday_data[0].records[1]['confirmedCount'];
                henan_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                zhejiang_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                hunan_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                anhui_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                jiangxi_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                shandong_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                jiangsu_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                chongqing_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                sichuan_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                heilongjiang_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                beijing_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                shanghai_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                hebei_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                fujian_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                guangxi_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                shanxi_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                yunan_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                hainan_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                guizhou_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                tianjin_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                shanxi2_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                gansu_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                liaoning_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                jilin_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                xinjiang_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                ningxia_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                neimenggu_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                qinghai_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                aomeng_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
                xizang_0303_confirmed = ~~yesterday_data[0].records[0]['confirmedCount'];
            }

            //alert("yesterday_data.confirmedCount"+yesterday_confirmed);
            //alert("json length"+json.length);
            /*
            for(var i=0;i<json.length;i++){
                alert(json[i].day);
            }
            */
            console.log(json);
        }
    }
}




/*
var dataSource_2 = []
$.ajaxSettings.async = false;
$.getJSON("./static/js/by_date.json?" + Date.parse(new Date()), function (data) {
    dataSource = data;
    option.dataset.source = dataSource;

    var yesterday_data = data.filter(item =>
        (item.records.updateTime) == "3/3" && (item.records.name) == "湖北省"
    );
    //alert(yesterday_data.length);
    if (yesterday_data.length > 0) {
        alert(111);
        yesterday_confirmed = ~~yesterday_data[0].records['confirmedCount'];
        alert("yesterday_data.confirmedCount"+yesterday_confirmed);
        yesterday_died = ~~yesterday_data[0]["累计死亡"];
        yesterday_cured = ~~yesterday_data[0]["累计治愈"];

        yesterday_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        yesterday_current_serious = ~~yesterday_data[0]["现有重症"];
        yesterday_current_unconfirmed = ~~yesterday_data[0]["现有疑似"];

    }
})

 */
///yjc

var mydata = [
    {name: '北京', value: '2589'}, {name: '天津', value: randomData()},
    {name: '上海', value: randomData()}, {name: '重庆', value: randomData()},
    {name: '河北', value: randomData()}, {name: '河南', value: randomData()},
    {name: '云南', value: randomData()}, {name: '辽宁', value: randomData()},
    {name: '黑龙江', value: randomData()}, {name: '湖南', value: randomData()},
    {name: '安徽', value: randomData()}, {name: '山东', value: randomData()},
    {name: '新疆', value: 0}, {name: '江苏', value: randomData()},
    {name: '浙江', value: '5487'}, {name: '江西', value: randomData()},
    {name: '湖北', value: '12568'}, {name: '广西', value: randomData()},
    {name: '甘肃', value: randomData()}, {name: '山西', value: randomData()},
    {name: '内蒙古', value: randomData()}, {name: '陕西', value: randomData()},
    {name: '吉林', value: randomData()}, {name: '福建', value: randomData()},
    {name: '贵州', value: randomData()}, {name: '广东', value: '7584'},
    {name: '青海', value: randomData()}, {name: '西藏', value: randomData()},
    {name: '四川', value: randomData()}, {name: '宁夏', value: randomData()},
    {name: '海南', value: randomData()}, {name: '台湾', value: randomData()},
    {name: '香港', value: randomData()}, {name: '澳门', value: randomData()}
];
var optionMap = {
    backgroundColor: '#FFFFFF',
    title: {
        text: '全国地图大数据',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item'
    },

    //左侧小导航图标
    visualMap: {
        show : true,
        x: 'left',
        y: 'center',
        splitList: [
            {start: 10000, end:99999},{start: 1000, end: 9999},
            {start: 500, end: 999},{start: 100, end: 499},
            {start: 10, end: 99},{start: 0, end: 9},
        ],
        color: ['#660208', '#8C0D0D', '#CC2929','#FF7B69', '#FFAA85', '#F2F2F2']
    },

    //配置属性
    series: [{
        name: '数据',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
            normal: {
                show: true  //省份名称
            },
            emphasis: {
                show: false
            }
        },
        data:mydata  //数据
    }]
};
//初始化echarts实例
var myChart = echarts.init(document.getElementById('map_china'));
//使用制定的配置项和数据显示图表
myChart.setOption(optionMap);