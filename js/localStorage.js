(function ($) {

    let appData = {
        stockDP:["sh000001","sz399001","sz399006"],
        stockMap:{},
        stockOrder:["603345","300124"]
    }
    let hoverSettings = {
        request_interval:1000,    //数据刷新间隔,毫秒
        show_name_len:4,          //名称显示字数,推荐1-4个;
        page_size:6,          //每页个数
        scroll_interval:5,        //滚动间隔秒数
    }
    let stField = {
        key:"GP编号",
        name:"GP编号名称",
        price:"当前价",
        zfu:"涨幅",
        zd:"涨跌",
        pe:"市盈率",
        hprice:"最高价",
        lprice:"最低价",
    }


    //刷新
    function refreshStockMap(){
     //   if(!utils.inTradeTime()){
       //     console.log("非交易时间")
         //   return;
        //}
        //init appData.stockMap
        if(appData.stockOrder != null && appData.stockOrder.length > 0){
            let parameter = utils.getFParameterByStock( appData.stockOrder);
            let stock_url = utils.urls_tx.st_info_url + parameter;
			
			let stockMap = {};
            utils.ajax(stock_url,function (res) {
                let stocksArray = res.split(";");
                stocksArray.forEach(stockInfo =>{
                    if(!stockInfo.trim()) {
                        return
                    }
                    let infoStr = stockInfo.split("=")[1];
                    let stockArr = infoStr.split("~");
                    let key = stockArr[2];
                    stockMap[key] = {
                        key:key,
                        name:stockArr[1].replaceAll(" ",""),
                        price:stockArr[3],
                        zfu:stockArr[32],
                        zd:stockArr[31],
                        pe:stockArr[39],
                        hprice:stockArr[41],
                        lprice:stockArr[42],
                    }
                })
				appData.stockMap = stockMap;
            })
        };
    }

    function initLocalStorage(){
        refreshStockMap();

        let appDataStoge = JSON.parse(localStorage.getItem("appData"));
        if(appDataStoge){
            appData = appDataStoge;
        }

        //把默认配置放进local
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        if(hoverSettingsLocal){
            hoverSettings = Object.assign(hoverSettings,hoverSettingsLocal);
        }
        localStorage.setItem("hoverSettings",JSON.stringify(hoverSettings));
        localStorage.setItem("appData",JSON.stringify(appData));
    }

    var appStorage = {
        addStock : function (stock){
            if(stock) {
                appData.stockOrder.push(stock.key)
                appData.stockMap[stock.key] = stock;
                localStorage.setItem("appData",JSON.stringify(appData));
            }
        },
        removeStock : function (key){
            if(key) {
                delete appData.stockMap[key];
                let number = appData.stockOrder.indexOf(key);
                if(number != -1) {
                    appData.stockOrder.splice(number,1);
                }
            }
        }
    }

    initLocalStorage();
    window.appData = appData;
    window.appStorage = appStorage;
    window.hoverSettings = hoverSettings;
    window.stField = stField;
    window.refreshStockMap=refreshStockMap;

})(null)