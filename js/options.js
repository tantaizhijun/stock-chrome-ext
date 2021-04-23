$(document).ready(function(){

    //请求间隔
    document.getElementById("request_interval").value = hoverSettings.request_interval;
    document.getElementById("request_interval").addEventListener("change", function (e) {
        let value = document.getElementById("request_interval").value;
        hoverSettings.request_interval = Number(value);
    })
    //名称长度
    document.getElementById("show_name_len").value = hoverSettings.show_name_len;
    document.getElementById("show_name_len").addEventListener("change", function (e) {
        let value = document.getElementById("show_name_len").value;
        if(value != "1" && value != "2" && value != "3" && value != "4") {
            alert("提示：请输入1-4之间的数字")
            document.getElementById("show_name_len").value = 4 ;
        }
        hoverSettings.show_name_len = Number(value);
    })
    //每页数量
    document.getElementById("page_size").value = hoverSettings.page_size;
    document.getElementById("page_size").addEventListener("change", function (e) {
        let value = document.getElementById("page_size").value;
        hoverSettings.page_size = Number(value);
    })

    //换页间隔
    document.getElementById("scroll_interval").value = hoverSettings.scroll_interval;
    document.getElementById("scroll_interval").addEventListener("change", function (e) {
        let value = document.getElementById("scroll_interval").value;
        hoverSettings.scroll_interval = Number(value);
    })



    //导出
    document.getElementById("exportData").addEventListener("click", function (e) {
        alert("待实现")
    })

    //导入
    document.getElementById("importFile").addEventListener("change", function (e) {
        let importFileEle = document.getElementById("importFile");
        let value1 = importFileEle.value;
        console.log(value1)
        alert("待实现")
    })


    function initTable(){
        window.initStockMap();//刷新本地数据
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
        document.getElementById("stock-table").innerHTML= html;
    }

    setInterval(initTable,1000);
})

