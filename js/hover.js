
(function($,window){

    //鼠标悬浮图标时的一些设置
    const hover_settings = {
        "refresh interval":900,     //鼠标悬浮时刷新间隔,毫秒
        "scroll_beyond":10,          //股票名称显示字数,推荐1-4个;
        "show_name_len":2          //股票数量超出多少时滚动显示
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

    let getParameter = function (my_stock){
        return my_stock.map(s =>{
            if(s.startsWith("00")) {
                return "s_sz" + s;
            } else if(s.startsWith("60")){
                return "s_sh" + s;
            }
        }).join(",");
    }

    //鼠标悬浮刷新函数
    let hover_refresh = function() {
        const all_stock = my_stock

        if(all_stock.length > hover_settings.scroll_beyond) {
            let s = all_stock.length % hover_settings.scroll_beyond == 0 ? all_stock.length / hover_settings.scroll_beyond : all_stock.length % hover_settings.scroll_beyond + 1;
        }

        let stock_url = urls_tx.st_info_url + getParameter();

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

    setInterval(hover_refresh,900)


})(null,window)

