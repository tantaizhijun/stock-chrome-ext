
(function($,window){

    //鼠标悬浮图标时的一些设置
    const hover_settings = {
        "request_interval":1000,     //鼠标悬浮时数据刷新间隔,毫秒
        "show_name_len":2,          //股票名称显示字数,推荐1-4个;
        "scroll_beyond":3,          //股票数量超出多少时滚动显示
        "scroll_interval":6,        //滚动间隔秒数(几秒换一组显示)
    }

    //我的股票
    const my_stock = ["002601","002304","601012","002594","000002","603799","600276"];

    //腾讯股票Api
    const urls_tx = {
        "st_info_url" :"http://qt.gtimg.cn/q="
    }

    //新浪股票Api
    const url_xl = {
        "st_info_url" :"https://hq.sinajs.cn/list=",
        "st_k_line" : "http://image.sinajs.cn/newchart/daily/n/",
        "st_fenshi" : "http://image.sinajs.cn/newchart/min/n/",
    }

    //设置图标
    // setInterval(function () {
    //     chrome.browserAction.setIcon({path: 'img/icons/bbt.png'});
    // },1000);

    //设置图标提示
    // chrome.browserAction.setBadgeText({
    //     "text":"123.43"
    // });

    let utils = {

        ajax: function (url, callback) {
            let XHR = (function () {
                try {
                    if (window.XMLHttpRequest) {
                        return new window.XMLHttpRequest();
                    } else {
                        return new window.ActiveXObject("Microsoft.XMLHTTP");
                    }
                } catch (e) {
                }
            })();

            XHR.open("get", url, true);
            XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    // var ret = eval("(" + XHR.responseText + ")");
                    // var ret = new Function("return " + XHR.responseText )();
                    // extension中不能使用eval，new Function等方法
                    callback(unescape(XHR.responseText.replace(/\\/ig, '%')));
                }
            }
            XHR.send(null);
        }
    };


    function getParameterByStock(stockArr){
        return  stockArr.map(s =>{
            if(s.startsWith("00")) {
                return "s_sz" + s;
            } else if(s.startsWith("60")){
                return "s_sh" + s;
            }
        }).join(",");
    }

    function initNodeArr(my_stock) {
        debugger
        let nodeArr = [];
        let node = [];
        for (let i = 0; i < my_stock.length; i++) {
            if(i == 0){
                node.push(my_stock[i]);
                continue;
            }
            if(i % hover_settings.scroll_beyond === 0) {
                nodeArr.push(node);
                node = [];
                node.push(my_stock[i]);
            } else {
                node.push(my_stock[i]);
            }
        }
        nodeArr.push(node);
        return nodeArr;
    }


    //鼠标悬浮刷新函数
    var i = 0;              //用于取分组stock
    var nodeArr = null;     //存储分组stock
    var currentGroup = null;
    var currentGroupKey = 0
    let hover_refresh = function() {
        if(my_stock==null||my_stock.length==0 ) {return}
        //按滚动个数分组
        if(nodeArr == null) {
            if(my_stock.length > hover_settings.scroll_beyond){
                nodeArr = initNodeArr(my_stock);
            } else {
                nodeArr = [my_stock];
            }
        }
        //获取一组stock的参数
        let paramStock
        if(currentGroupKey % hover_settings.scroll_interval == 0) {
            paramStock = nodeArr[i % nodeArr.length];
            i++;
            i = i > 10000 ? 0 : i;
        } else {
            paramStock = currentGroup
        }
        currentGroup = paramStock;
        currentGroupKey = currentGroupKey > 10000 ? 0 :  ++currentGroupKey;
        //组装本组stock请求参数
        let parameter = getParameterByStock(currentGroup);
        let stock_url = urls_tx.st_info_url + parameter
        utils.ajax(stock_url,function (res) {
            let stocksArray = res.split(";");
            let title = "";
            stocksArray.forEach(stockInfo =>{
                if(!stockInfo.trim()) {
                    return
                }
                let infoStr = stockInfo.split("=")[1];
                let stockArr = infoStr.split("~");
                let name = stockArr[1].replaceAll(" ","").substr(0,hover_settings.show_name_len);
                let price = stockArr[3];
                let rate = stockArr[5];
                let fuhao = rate >=0 ? "↑" : "↓";
                title += name + " " + price +"("+rate+"%)" +  "\n";
            });
            //设置title,鼠标悬浮可显示
            chrome.browserAction.setTitle({title: title});
        })
    }

    setInterval(hover_refresh,hover_settings["request_interval"])


})(null,window)

