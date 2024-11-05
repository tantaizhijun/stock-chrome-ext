(function ($) {

    let appData = JSON.parse(localStorage.getItem("appData"));

    let i = 0;
    function initTable(index) {
        if(appData.stockOrder==null||appData.stockOrder.length==0 ) {
            return
        }
        if(i >= appData.stockOrder.length){
            i = 0;
        }
        let one = appData.stockOrder[i];
        i++;
        let parameter = utils.getSParameterByStock([one]);
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
                let name = stockArr[1].replaceAll(" ","").substr(0,3);
                let price = stockArr[3];
                let rate = stockArr[5];
                let fuhao = rate >=0 ? "↑" : "↓";
                title += name + "" + price +"("+rate+"%)";
            });
            //设置title,鼠标悬浮可显示
            chrome.bookmarks.update(index,{"title":title});
        })
    }

    //setInterval(initTable, 2000,"99");
   // setInterval(initTable, 2000,"104");

})(null)

// chrome.bookmarks.create({
//         'parentId': "1",
//         'title': 'haha',
//         'url': 'http://12306.com'
//     },
//     function (newFolder) {
//         alert("创建结果" + JSON.stringify(newFolder));
//     });


// chrome.bookmarks.get("99",function (e) {
//     alert("get结果" + JSON.stringify(e));
// })

// chrome.bookmarks.getTree(function (bookmarkArray) {
//     console.log("Q:", bookmarkArray);
// });

// chrome.bookmarks.create({
//         'parentId': "1",
//         'title': 'haha',
//         'url': 'http://12306.com'
//     },
//     function (newFolder) {
//        // alert("创建结果" + JSON.stringify(newFolder));
//     });