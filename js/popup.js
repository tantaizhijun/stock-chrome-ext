//分时图 k线图 股票list

var fenshi_img_url = "http://image.sinajs.cn/newchart/min/n/sz002007.gif"
var k_line_img_url = "http://image.sinajs.cn/newchart/daily/n/sz000858.gif?0.8050786066113333"
var stock_list_url = "https://hq.sinajs.cn/list=sh000001,sz399001,sz399006"


document.getElementById("setting").addEventListener("click", function (e) {
    chrome.tabs.create({
        url: "/options.html"
    })
})


//按每页个数分组
    function initNodeArr(stocks,pageSize) {
        let nodeArr = [];
        let node = [];
        for (let i = 0; i < stocks.length; i++) {
            if(i == 0){
                node.push(stocks[i]);
                continue;
            }
            if(i % pageSize === 0) {
                nodeArr.push(node);
                node = [];
                node.push(stocks[i]);
            } else {
                node.push(stocks[i]);
            }
        }
        nodeArr.push(node);
        return nodeArr;
    }

    //鼠标悬浮刷新函数
    var i = 0;              //用于取分组stock
    var nodeArr = null;     //存储分组stock
    var currentGroup = null;
    var currentGroupKey = 0     //TODO 换页与刷新有bug
    let hover_refresh = function() {

        if (!utils.inTradeTime()) {
            console.log("非交易时间");
            return;
        }
        //获取本地存储数据
        let hoverSettings = JSON.parse(localStorage.getItem("hoverSettings"));
        let appData = JSON.parse(localStorage.getItem("appData"));
        console.log(appData.stockOrder);
        if(appData.stockOrder==null||appData.stockOrder.length==0 ) {
            return
        }
        //按每页个数分组
       // if(appData.stockOrder.length > hoverSettings["page_size"]){
         //   nodeArr = initNodeArr(appData.stockOrder,hoverSettings["page_size"]);
        //} else {
            nodeArr = [appData.stockOrder];
        //}

        //获取一组stock的参数
        let paramStock
        if(currentGroupKey % hoverSettings.scroll_interval == 0) {
            paramStock = nodeArr[i % nodeArr.length];
            i++;
            i = i > 10000 ? 0 : i;
        } else {
            paramStock = currentGroup
        }
        currentGroup = paramStock;
        currentGroupKey = currentGroupKey > 10000 ? 0 :  ++currentGroupKey;
		
		if(!utils.inTradeTime()){
            console.log("非交易时间");
			chrome.browserAction.setTitle({title: "非交易时间"});
            return;
        }
		
        //组装本组stock请求参数
        let parameter = utils.getSParameterByStock(currentGroup);
        let stock_url = utils.urls_tx.st_info_url + parameter
        utils.ajax(stock_url,function (res) {
            let stocksArray = res.split(";");
			let arr = [];
            stocksArray.forEach(stockInfo =>{
                if(!stockInfo.trim()) {
                    return
                }
                let infoStr = stockInfo.split("=")[1];
                let stockArr = infoStr.split("~");
                let name = stockArr[1].replaceAll(" ","").substr(0,hoverSettings.show_name_len);
                let price = stockArr[3];
                let rate = stockArr[5];
                let fuhao = rate >=0 ? "↑" : "↓";
				
				let obj = {
					"name":name,
					"price":price,
					"rate":rate,
					};
				arr.push(obj);
            });
			
			arr.sort((a, b) => Number(a.rate) - Number(b.rate)).reverse();
		
			
			let title = "";
			arr.forEach((a) => {
				title += a['name'] + a['price'] +"("+a['rate']+")" + "\n</br>";
			})
			
			
			document.getElementById("stock-list").innerHTML= title;
            //chrome.browserAction.setTitle({title: title});
        })
    }

    function init(){
        setInterval(hover_refresh,hoverSettings["request_interval"]);
    }
    init();









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

 //setInterval(initTable,1000);

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
