const myChart = echarts.init(document.getElementById('china-map'));
const oBack = document.getElementById("back");

const provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

const provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

const seriesData = [{
    name: '北京',
    value: 100
}, {
    name: '天津',
    value: 0
}, {
    name: '上海',
    value: 60
}, {
    name: '重庆',
    value: 0
}, {
    name: '河北',
    value: 60
}, {
    name: '河南',
    value: 60
}, {
    name: '云南',
    value: 0
}, {
    name: '辽宁',
    value: 0
}, {
    name: '黑龙江',
    value: 0
}, {
    name: '湖南',
    value: 60
}, {
    name: '安徽',
    value: 0
}, {
    name: '山东',
    value: 60
}, {
    name: '新疆',
    value: 0
}, {
    name: '江苏',
    value: 0
}, {
    name: '浙江',
    value: 0
}, {
    name: '江西',
    value: 0
}, {
    name: '湖北',
    value: 60
}, {
    name: '广西',
    value: 60
}, {
    name: '甘肃',
    value: 0
}, {
    name: '山西',
    value: 60
}, {
    name: '内蒙古',
    value: 0
}, {
    name: '陕西',
    value: 0
}, {
    name: '吉林',
    value: 0
}, {
    name: '福建',
    value: 0
}, {
    name: '贵州',
    value: 0
}, {
    name: '广东',
    value: 597
}, {
    name: '青海',
    value: 0
}, {
    name: '西藏',
    value: 0
}, {
    name: '四川',
    value: 60
}, {
    name: '宁夏',
    value: 0
}, {
    name: '海南',
    value: 60
}, {
    name: '台湾',
    value: 0
}, {
    name: '香港',
    value: 0
}, {
    name: '澳门',
    value: 0
}];

oBack.onclick = function () {
    //initEcharts("china", "中国");
    showProvince("hubei","湖北");
};

//initEcharts("china", "中国");
showProvince("hubei","湖北");
// 初始化echarts
function initEcharts(pName, Chinese_) {
    const tmpSeriesData = pName === "china" ? seriesData : [];

    const option = {
        title: {
            text: Chinese_ || pName,
            left: 'center'
        },
        series: [
            {
                name: Chinese_ || pName,
                type: 'map',
                mapType: pName,
                roam: false,//是否开启鼠标缩放和平移漫游
                itemStyle: {//地图区域的多边形 图形样式
                    normal: {//是图形在默认状态下的样式
                        label: {
                            show: true,//是否显示标签
                            textStyle: {
                                color: "rgba(255,255,255,0)"
                            }
                        }
                    },
                    emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                        label: {show: true}
                    }
                },
                data: tmpSeriesData,
                top: "3%"//组件距离容器的距离
            }
        ]
    };

    myChart.setOption(option);

    myChart.off("click");

    if (pName === "china") { // 全国时，添加click 进入省级
        myChart.on('click', function (param) {
            console.log(param.name);
            //遍历取到provincesText 中的下标  去拿到对应的省js
            for (let i = 0; i < provincesText.length; i++) {
                if (param.name === provincesText[i]) {
                    //显示对应省份的方法
                    showProvince(provinces[i], provincesText[i]);
                    break;
                }
            }
        });
    } else { // 省份，添加双击 回退到全国
        myChart.on("dblclick", function () {
            initEcharts("china", "中国");
        });
    }
}

// 展示对应的省
function showProvince(pName, Chinese_) {
    //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
    loadBdScript('$' + pName + 'JS', './static/js/map/province/' + pName + '.js', function () {
        initEcharts(Chinese_);
    });
}

// 加载对应的JS
function loadBdScript(scriptId, url, callback) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Others
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    script.id = scriptId;
    document.getElementsByTagName("head")[0].appendChild(script);
};