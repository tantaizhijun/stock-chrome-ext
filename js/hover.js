
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



    //鼠标悬浮刷新函数
    var i = 0;              //用于取分组stock
    var nodeArr = null;     //存储分组stock
    var currentGroup = null;
    var currentGroupKey = 0     //TODO 换页与刷新有bug
	var titleg = "";
    let hover_refresh = function() {
       

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
		
		
		if(!utils.inTradeTime()){
            console.log("非交易时间");
			chrome.browserAction.setTitle({title: titleg});
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
			//arr.sort((a, b) => Number(a.rate) - Number(b.rate)).reverse();
			let title = "";
			arr.forEach((a) => {
				title += a['name'] + a['price'] +"("+a['rate'] + "\n";
			})
			titleg = title;
            chrome.browserAction.setTitle({title: title});
        })
    }

    function init(){
        setInterval(hover_refresh,hoverSettings["request_interval"]);
    }
    init();

})(null)

