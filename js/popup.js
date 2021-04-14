//分时图 k线图 股票list

var fenshi_img_url = "http://image.sinajs.cn/newchart/min/n/sz002007.gif"
var k_line_img_url = "http://image.sinajs.cn/newchart/daily/n/sz000858.gif?0.8050786066113333"
var stock_list_url = "https://hq.sinajs.cn/list=sh000001,sz399001,sz399006"


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
