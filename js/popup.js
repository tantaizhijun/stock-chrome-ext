//分时图 k线图 股票list

var fenshi_img_url = "http://image.sinajs.cn/newchart/min/n/sz002007.gif"
var k_line_img_url = "http://image.sinajs.cn/newchart/daily/n/sz000858.gif?0.8050786066113333"
var stock_list_url = "https://hq.sinajs.cn/list=sh000001,sz399001,sz399006"


document.getElementById("setting").addEventListener("click", function (e) {
    chrome.tabs.create({
        url: "/options.html"
    })
})

function initTable(){
    window.refreshStockMap();//刷新本地数据
    let stockMap = appData.stockMap;

    let html = "<table><tr>"
    //显示字段
    let fields = Object.keys(stField);

    //table头
    fields.forEach(field => {
        html += "<th>" + stField[field] + "</th>"
    })
    html += "</tr>"

    //table
    let stKeyList = Object.keys(stockMap);
    stKeyList.forEach(key => {
        html += "<tr>"
        fields.forEach(field =>{
            html += "<td>" + stockMap[key][field] + "</td>>"
        })
        html += "</tr>"
    })
    document.getElementById("stock-list").innerHTML= html;
}

// setInterval(initTable,1000);

//设置图标
// setInterval(function () {
//     chrome.browserAction.setIcon({path: 'img/icons/bbt.png'});
// },1000);

//设置图标提示
// chrome.browserAction.setBadgeText({
//     "text":"123.43"
// });

// var BGPage = chrome.extension.getBackgroundPage();
// function show() {
//     var e = BGPage.popupView;
//     switch (e.status) {
//         case "off":
//             document.getElementById("offStatus").style.display = "block",
//                 document.getElementById("onStatus").style.display = "none",
//                 document.getElementById("tips").innerHTML = e.warming;
//             break;
//         case "on":
//             document.getElementById("onStatus").style.display = "block",
//                 document.getElementById("offStatus").style.display = "none";
//             break;
//         default:
//             console.error("这错误不可能")
//     }
//     document.getElementById("versionNumber").innerText = chrome.runtime.getManifest().version,
//         document.getElementById("openMainWebsite").innerHTML = localStorage["popup-message"],
//         localStorage["stop-proxy"] && "true" == localStorage["stop-proxy"] ? (document.getElementById("startP").style.display = null, document.getElementById("stopP").style.display = "none") : (document.getElementById("startP").style.display = "none", document.getElementById("stopP").style.display = null)
// }
// show();
// var iii = setInterval(show, 1e3);
// document.getElementById("settings").addEventListener("click", function (e) {
//     chrome.tabs.create({
//         url: "/options.html"
//     })
// })
