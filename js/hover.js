
(function($){

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

    const date1 = new Date();
    date1.setHours(11,30);
    const date2 = new Date();
    date2.setHours(13,30);

    //是否在交易时间
    function inTradeTime(){
        //交易时间在9:00--11:30或者13:30--15：00，并且在周一至周五（暂未判断节假日）
        const date = new Date();
        const day = date.getDay();
        if(!(day >= 1 && day <= 5)){
            return false;
        }
        if(!(date.getHours() > 9 && date.getTime() < date1.getTime()) && !(date.getTime() > date2.getTime() && date.getHours() < 15)){
            return false;
        }
        return true;
    }

    //鼠标悬浮刷新函数
    var i = 0;              //用于取分组stock
    var nodeArr = null;     //存储分组stock
    var currentGroup = null;
    var currentGroupKey = 0     //TODO 换页与刷新有bug
    let hover_refresh = function() {
        if(!inTradeTime()){
            console.log("非交易时间");
            return;
        }

        //获取本地存储数据
        let hoverSettings = JSON.parse(localStorage.getItem("hoverSettings"));
        let appData = JSON.parse(localStorage.getItem("appData"));

        if(appData.stockOrder==null||appData.stockOrder.length==0 ) {
            return
        }
        //按每页个数分组
        if(appData.stockOrder.length > hoverSettings["page_size"]){
            nodeArr = initNodeArr(appData.stockOrder,hoverSettings["page_size"]);
        } else {
            nodeArr = [appData.stockOrder];
        }

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
        //组装本组stock请求参数
        let parameter = utils.getSParameterByStock(currentGroup);
        let stock_url = utils.urls_tx.st_info_url + parameter
        utils.ajax(stock_url,function (res) {
            let stocksArray = res.split(";");
            let title = "";
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
                title += name + " " + price +"("+rate+"%)" +  "\n";
            });
            //设置title,鼠标悬浮可显示
            console.log(title)
            chrome.browserAction.setTitle({title: title});
        })
    }

    function init(){
        setInterval(hover_refresh,hoverSettings["request_interval"]);
    }
    init();

})(null)

