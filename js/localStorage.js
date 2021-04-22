(function ($,window) {

    var appData = {
        stockDP:["sh000001","sz399001","sz399006"],
        stockMap:{},
        stockOrder:["601888","000538","000568","002304","601012","002601","002594","000002","603799","600276"]
    }
    var hoverSettings = {
        request_interval:1000,    //数据刷新间隔,毫秒
        show_name_len:3,          //名称显示字数,推荐1-4个;
        page_size:6,          //每页个数
        scroll_interval:6,        //滚动间隔秒数
    }

    var appStorage = {
        add : function (stock){
            if(stock) {
                appData.stockOrder.push(stock.key)
                appData.stockMap[stock.key] = stock;
                localStorage.setItem("appData",appData);
            }
        },
        remove : function (key){
            if(key) {
                delete appData.stockMap[key];
                let number = appData.stockOrder.indexOf(key);
                if(number != -1) {
                    appData.stockOrder.splice(number,1);
                }
            }
        }
    }

    window.appData = appData;
    window.appStorage = appStorage;
    window.hoverSettings = hoverSettings;

})(null,window)