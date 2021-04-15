var jQuery = require("");
(function($,undefined){

    //设置图标
    setInterval(function () {
        chrome.browserAction.setIcon({path: 'images/icons/tiger.png'});
    },1000);

    //设置图标提示
    chrome.browserAction.setBadgeText({
        "text":"123.43"
    });

    var my_stock = [
        "sz002304"
    ]

    var fenshi_img_url = "http://image.sinajs.cn/newchart/min/n/sz002007.gif"
    var k_line_img_url = "http://image.sinajs.cn/newchart/daily/n/sz000858.gif?0.8050786066113333"
    var stock_list_url = "https://hq.sinajs.cn/list=sh000001,sz399001,sz399006"

    var i = 100.01

    setInterval(function () {
        i = i+1
        // var stock_url = "https://hq.sinajs.cn/list=" + "sz002304"
        // $.ajax(stock_url,function (res) {
        //     console.log("res" + res);
        //     let info = es.split("=")[1];
        //     let split = info.split(",");
        //     let name = split[0];
        //     let price = split[1];
        //     let title = name + " " + price
            //设置title,鼠标悬浮可显示
            chrome.browserAction.setTitle({title: "古井贡酒 " + i + "\n" + "五粮液 " + i,});
        // })

    },2000)
})(jQuery)

