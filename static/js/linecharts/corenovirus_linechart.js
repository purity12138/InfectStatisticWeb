Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: '全国确诊趋势折线图'
    },
    subtitle: {
        text: '来自:国家统计局 '
    },
    xAxis: {
        categories: ['02.15', '02.16', '02.17', '02.18', '02.19', '02.20', '02.21', '02.22', '02.23', '02.24', '02.25', '02.26']
    },
    yAxis: {
        title: {
            text: '人数 (人)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: '全国',
        data: [10001, 11421, 13568, 14582, 16582, 18542, 20351, 21541,22457, 26854, 27854, 28651]
    }
        /*
        , {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }
        */
    ]
});