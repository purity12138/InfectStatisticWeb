var for20200215_confirmed = 0,for20200215_died = 0,for20200215_cured = 0,for20200215_current_confirmed = 0,
    for20200304_confirmed = 0,for20200304_died = 0,for20200304_cured = 0,for20200304_current_confirmed = 0,
    for20200305_confirmed = 0,for20200305_died = 0,for20200305_cured = 0,for20200305_current_confirmed = 0,
    for20200306_confirmed = 0,for20200306_died = 0,for20200306_cured = 0,for20200306_current_confirmed = 0,
    for20200307_confirmed = 0,for20200307_died = 0,for20200307_cured = 0,for20200307_current_confirmed = 0,
    for20200308_confirmed = 0,for20200308_died = 0,for20200308_cured = 0,for20200308_current_confirmed = 0,
    for20200309_confirmed = 0,for20200309_died = 0,for20200309_cured = 0,for20200309_current_confirmed = 0,
    for20200310_confirmed = 0,for20200310_died = 0,for20200310_cured = 0,for20200310_current_confirmed = 0,
    for20200311_confirmed = 0,for20200311_died = 0,for20200311_cured = 0,for20200311_current_confirmed = 0,
    for20200312_confirmed = 0,for20200312_died = 0,for20200312_cured = 0,for20200312_current_confirmed = 0,
    for20200313_confirmed = 0,for20200313_died = 0,for20200313_cured = 0,for20200313_current_confirmed = 0,
    for20200314_confirmed = 0,for20200314_died = 0,for20200314_cured = 0,for20200314_current_confirmed = 0
;
//原来是这样
$.ajaxSettings.async = false;
$.getJSON("./static/js/data.json?" + Date.parse(new Date()), function (data) {
    dataSource = data;
    option.legend.selected['累计确诊'] = false;
    option.legend.selected['累计确诊+现有疑似'] = false;
    option.legend.selected['观察中'] = false;
    option.legend.selected['死亡/确诊'] = false;
    option.dataset.source = dataSource;
    var yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,3)).Format("yyyy/M/d")
    );
    //alert("111");
    //alert((new Date().setFullYear(2020,2,7)).Format("yyyy/M/d"));
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200215_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200215_confirmed = ~~yesterday_data[0]["累计确诊"];
        //alert(for20200215_current_confirmed);
        for20200215_cured = ~~yesterday_data[0]["累计治愈"];
        for20200215_died = ~~yesterday_data[0]["累计死亡"];
        //yesterday_current_serious = ~~yesterday_data[0]["现有重症"];
        //yesterday_current_unconfirmed = ~~yesterday_data[0]["现有疑似"];

    }
    //0304
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,4)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200304_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200304_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200304_cured = ~~yesterday_data[0]["累计治愈"];
        for20200304_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0305
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,5)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200305_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200305_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200305_cured = ~~yesterday_data[0]["累计治愈"];
        for20200305_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0306
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,6)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200306_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200306_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200306_cured = ~~yesterday_data[0]["累计治愈"];
        for20200306_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0307
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,7)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200307_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200307_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200307_cured = ~~yesterday_data[0]["累计治愈"];
        for20200307_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0308
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,8)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200308_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200308_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200308_cured = ~~yesterday_data[0]["累计治愈"];
        for20200308_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0309
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,9)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200309_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200309_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200309_cured = ~~yesterday_data[0]["累计治愈"];
        for20200309_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0310
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,10)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200310_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200310_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200310_cured = ~~yesterday_data[0]["累计治愈"];
        for20200310_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0311
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,11)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200311_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200311_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200311_cured = ~~yesterday_data[0]["累计治愈"];
        for20200311_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0312
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,12)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200312_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200312_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200312_cured = ~~yesterday_data[0]["累计治愈"];
        for20200312_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0313
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,13)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200313_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200313_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200313_cured = ~~yesterday_data[0]["累计治愈"];
        for20200313_died = ~~yesterday_data[0]["累计死亡"];
    }
    //0314
    yesterday_data = data.filter(item =>
        //(new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d")
        (new Date(item.日期)).Format("yyyy/M/d") == (new Date(2020,2,14)).Format("yyyy/M/d")
    );
    console.log(yesterday_data);
    if (yesterday_data.length > 0) {
        for20200314_current_confirmed = ~~yesterday_data[0]["现有确诊（含重症）"];
        for20200314_confirmed = ~~yesterday_data[0]["累计确诊"];
        for20200314_cured = ~~yesterday_data[0]["累计治愈"];
        for20200314_died = ~~yesterday_data[0]["累计死亡"];
    }
})



{
Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: '全国疫情趋势折线图'
    },
    subtitle: {
        text: '来自:国家统计局 '
    },
    xAxis: {
        categories: ['03.03', '03.04', '03.05', '03.06', '03.07', '03.08', '03.09', '03.10', '03.11', '03.12', '03.13']
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
    series: [
        {
            name: '现有确诊',
            data: [for20200215_current_confirmed, for20200304_current_confirmed, for20200305_current_confirmed, for20200306_current_confirmed,
                for20200307_current_confirmed, for20200308_current_confirmed, for20200309_current_confirmed, for20200310_current_confirmed,
                for20200311_current_confirmed, for20200312_current_confirmed, for20200313_current_confirmed]
        },
        {
            name: '累计确诊',
            data: [for20200215_confirmed, for20200304_confirmed, for20200305_confirmed, for20200306_confirmed,
                for20200307_confirmed, for20200308_confirmed, for20200309_confirmed, for20200310_confirmed,
                for20200311_confirmed, for20200312_confirmed, for20200313_confirmed]
        },
        {
            name: '累计治愈',
            data: [for20200215_cured, for20200304_cured, for20200305_cured, for20200306_cured,
                for20200307_cured, for20200308_cured, for20200309_cured, for20200310_cured,
                for20200311_cured, for20200312_cured, for20200313_cured]
        },
        {
            name: '累计死亡',
            data: [for20200215_died, for20200304_died, for20200305_died, for20200306_died,
                for20200307_died, for20200308_died, for20200309_died, for20200310_died,
                for20200311_died, for20200312_died, for20200313_died]
        }
        /*
        , {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }
        */
    ]
});
}