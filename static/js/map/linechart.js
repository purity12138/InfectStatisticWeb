var dataUrl  = "https://lab.ahusmart.com/nCoV/";
var dataUrlBackup  = "https://lab.ahusmart.com/nCoV/";

$(document).ready(function () {
    initCoreData();
    initTrendChart();
    initAddChart();
});

var initTrendChart = function () {
    $.ajax({
        url: dataUrl + 'api/overall?latest=0',
        type: 'get',
        success: function (res) {
            if (res.success === true) {
                var chartData = res.results;
                var date = [];
                var dataNCoV = [];
                var confirmedNCoV = [];
                var suspectedNCoV = [];
                var curedNCoV = [];
                var deadNCoV = [];

                // init pre data
                dataNCoV['2020/1/24'] = {"confirm":897,"suspect":1076,"cure":36,"dead":26};
                dataNCoV['2020/1/25'] = {"confirm":1408,"suspect":2032,"cure":39,"dead":42};
                dataNCoV['2020/1/26'] = {"confirm":2076,"suspect":2692,"cure":49,"dead":56};
                dataNCoV['2020/1/27'] = {"confirm":2857,"suspect":5794,"cure":56,"dead":82};
                dataNCoV['2020/1/28'] = {"confirm":4630,"suspect":6973,"cure":73,"dead":106};

                for (var i in chartData) {
                    var dataTime = new Date(chartData[i].updateTime);
                    var showTime = [dataTime.getFullYear(), dataTime.getMonth() + 1, ("0" + dataTime.getDate()).slice(-2)].join('/');
                    var confirmedCount = chartData[i].confirmedCount ? chartData[i].confirmedCount : chartData[i].confirmed;
                    var suspectedCount = chartData[i].suspectedCount ? chartData[i].suspectedCount : chartData[i].suspectedCount;
                    var curedCount = chartData[i].curedCount ? chartData[i].curedCount : chartData[i].curedCount;
                    var deadCount = chartData[i].deadCount ? chartData[i].deadCount : chartData[i].deadCount;

                    if (!dataNCoV[showTime] || dataNCoV[showTime]['confirm'] < confirmedCount) {
                        dataNCoV[showTime] = [];
                        dataNCoV[showTime]['confirm'] = confirmedCount;
                        dataNCoV[showTime]['suspect'] = suspectedCount;
                        dataNCoV[showTime]['cure'] = curedCount;
                        dataNCoV[showTime]['dead'] = deadCount;
                    }

                }

                // 时间排序
                const dataNCoVOrdered = {};
                Object.keys(dataNCoV).sort((function (a, b) {
                    a = a.split('/').join('');
                    b = b.split('/').join('');
                    return a > b ? 1 : a < b ? -1 : 0;
                })).forEach(function (key) {
                    dataNCoVOrdered[key] = dataNCoV[key];
                });


                // use data
                for (var i in dataNCoVOrdered) {
                    date.push(i);
                    confirmedNCoV.push(dataNCoVOrdered[i]['confirm']);
                    suspectedNCoV.push(dataNCoVOrdered[i]['suspect']);
                    curedNCoV.push(dataNCoVOrdered[i]['cure']);
                    deadNCoV.push(dataNCoVOrdered[i]['dead']);
                }

                initDetailChart(date, confirmedNCoV, suspectedNCoV,curedNCoV,deadNCoV);
                return;
            }
            alert("获取数据失败");
        }, error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl,dataUrlBackup);
                $.ajax(this);
            }
        }
    });

    var initDetailChart = function (date, confirmedNCoV, suspectedNCoV,curedNCoV,deadNCoV) {
        var orderTraceContainer = echarts.init(document.getElementById('trend-chart'));
        orderTraceContainer.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });


        echartsOption  = {
            backgroundColor: '#394056',
            title: {
                text: '全国NCoV总数量',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 12,
                    color: '#ebffa1'
                },
                left: '2%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 1,
                data: ['确诊', '治愈','死亡'],
                right: '2%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: date
            }
            ],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 4,
                    textStyle: {
                        fontSize: 8
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            }],
            series: [{
                name: '确诊',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showAllSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff'
                    }
                },

                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f1a325',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12

                    }
                },
                data: confirmedNCoV
            },{
                name: '治愈',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#38b03f',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: curedNCoV
            }, {name: '死亡',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ea644a',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: deadNCoV
            }
            ]
        };
        orderTraceContainer.hideLoading();
        orderTraceContainer.setOption(echartsOption);
    }
};
var initAddChart = function () {
    $.ajax({
        url: dataUrl + 'api/overall?latest=0',
        type: 'get',
        success: function (res) {
            if (res.success === true) {
                var chartData = res.results;
                var date = [];
                var dataNCoV = [];
                var confirmedNCoV = [];
                var suspectedNCoV = [];
                var curedNCoV = [];
                var deadNCoV = [];

                // init pre data
                dataNCoV['2020/1/24'] = {"confirm": 897, "suspect": 1076, "cure": 36, "dead": 26};
                dataNCoV['2020/1/25'] = {"confirm": 1408, "suspect": 2032, "cure": 39, "dead": 42};
                dataNCoV['2020/1/26'] = {"confirm": 2076, "suspect": 2692, "cure": 49, "dead": 56};
                dataNCoV['2020/1/27'] = {"confirm": 2857, "suspect": 5794, "cure": 56, "dead": 82};
                dataNCoV['2020/1/28'] = {"confirm": 4630, "suspect": 6973, "cure": 73, "dead": 106};



                for (var i in chartData) {
                    var dataTime = new Date(chartData[i].updateTime);
                    var showTime = [dataTime.getFullYear(), dataTime.getMonth() + 1, ("0" + dataTime.getDate()).slice(-2)].join('/');
                    var confirmedCount = chartData[i].confirmedCount ? chartData[i].confirmedCount : chartData[i].confirmed;
                    var suspectedCount = chartData[i].suspectedCount ? chartData[i].suspectedCount : chartData[i].suspectedCount;
                    var curedCount = chartData[i].curedCount ? chartData[i].curedCount : chartData[i].curedCount;
                    var deadCount = chartData[i].deadCount ? chartData[i].deadCount : chartData[i].deadCount;

                    if (!dataNCoV[showTime] || dataNCoV[showTime]['confirm'] < confirmedCount) {
                        dataNCoV[showTime] = [];
                        dataNCoV[showTime]['confirm'] = confirmedCount;
                        dataNCoV[showTime]['suspect'] = suspectedCount;
                        dataNCoV[showTime]['cure'] = curedCount;
                        dataNCoV[showTime]['dead'] = deadCount;
                    }

                }

                // 时间排序
                const dataNCoVOrdered = {};
                Object.keys(dataNCoV).sort(function (a, b) {
                    a = a.split('/').join('');
                    b = b.split('/').join('');
                    return a > b ? 1 : a < b ? -1 : 0;
                }).forEach(function (key) {
                    dataNCoVOrdered[key] = dataNCoV[key];
                });

                // use data
                for (var i in dataNCoVOrdered) {

                    var t = new Date(i);
                    t.setDate(t.getDate() - 1);
                    var yesterday = [t.getFullYear(), t.getMonth() + 1, ("0" + t.getDate()).slice(-2)].join('/');
                    if (!dataNCoVOrdered[yesterday]) {
                        continue;
                    }

                    date.push(i);
                    confirmedNCoV.push(dataNCoVOrdered[i]['confirm'] - dataNCoVOrdered[yesterday]['confirm']);
                    suspectedNCoV.push(dataNCoVOrdered[i]['suspect'] - dataNCoVOrdered[yesterday]['suspect']);
                    curedNCoV.push(dataNCoVOrdered[i]['cure'] - dataNCoVOrdered[yesterday]['cure']);
                    deadNCoV.push(dataNCoVOrdered[i]['dead'] - dataNCoVOrdered[yesterday]['dead']);
                }

                initDetailChart(date, confirmedNCoV, suspectedNCoV,curedNCoV,deadNCoV);
                return;
            }
            alert("获取数据失败");
        }, error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl,dataUrlBackup);
                $.ajax(this);
            }
        }
    });

    var initDetailChart = function (date, confirmedNCoV, suspectedNCoV,curedNCoV,deadNCoV) {
        var orderTraceContainer = echarts.init(document.getElementById('add-chart'));
        orderTraceContainer.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });


        echartsOption  = {
            backgroundColor: '#394056',
            title: {
                text: '全国NCoV新增量',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 12,
                    color: '#ebffa1'
                },
                left: '2%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 1,
                data: ['确诊','治愈', '死亡'],
                right: '2%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: date
            }
            ],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 4,
                    textStyle: {
                        fontSize: 8
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            }],
            series: [{
                name: '确诊',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showAllSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f1a325',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12

                    }
                },
                data: confirmedNCoV
            }, {
                name: '治愈',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#38b03f',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: curedNCoV
            }
                , {
                    name: '死亡',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ea644a',
                            borderColor: 'rgba(0,136,212,0.2)',
                            borderWidth: 12

                        }
                    },
                    data: deadNCoV
                }]
        };
        orderTraceContainer.hideLoading();
        orderTraceContainer.setOption(echartsOption);
    }
};

var initCoreData = function (province) {

    $.ajax({
        url: dataUrl + 'api/overall?latest=1',
        type: 'get',
        success: function (res) {
            if (res.success === true) {
                var data = res.results[0];


                var html = ' 疫情数据:\n' +
                    '        <div>' +
                    '<span class="label label-warning data-confirmed">确诊</span>:'+data.confirmedCount+'&nbsp;&nbsp;' +
                    '<span class="label label-success data-cured">治愈</span>:'+data.curedCount+' &nbsp;&nbsp; ' +
                    '<span class="label label-danger data-dead">死亡</span>:'+data.deadCount+'&nbsp;&nbsp;' +
                    '<span class="label label-info data-dead">疑似</span>:'+data.suspectedCount+'</div>\n' +
                    '  ';


                $(".core-data").html(html);

                return;
            }
            alert("获取数据失败");

        },
        error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl, dataUrlBackup);
                $.ajax(this);
            }
        }
    })

};