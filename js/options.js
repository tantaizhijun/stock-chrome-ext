$(document).ready(function(){

    //从本地存储获取信息
    let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));

    //请求间隔
    document.getElementById("request_interval").value = hoverSettingsLocal["request_interval"];
    document.getElementById("request_interval").addEventListener("change", function (e) {
        let value = document.getElementById("request_interval").value;
        //从localstorage获取,设置并存储
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["request_interval"] = Number(value);
        localStorage.setItem("hoverSettings",JSON.stringify(hoverSettingsLocal));

    })
    //名称长度
    document.getElementById("show_name_len").value = hoverSettingsLocal["show_name_len"];
    document.getElementById("show_name_len").addEventListener("change", function (e) {
        let value = document.getElementById("show_name_len").value;
        if(value != "1" && value != "2" && value != "3" && value != "4") {
            alert("提示：请输入1-4之间的数字")
            document.getElementById("show_name_len").value = 4 ;
        }
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["show_name_len"] = Number(value);
        localStorage.setItem("hoverSettings",JSON.stringify(hoverSettingsLocal));
    })

    //每页数量
    document.getElementById("page_size").value = hoverSettingsLocal["page_size"];
    document.getElementById("page_size").addEventListener("change", function (e) {
        let value = document.getElementById("page_size").value;
        if(isNaN(value)){
            alert("请输入数字数字")
            document.getElementById("page_size").value = 6;
        }
        let number = Number(value);
        if(number < 0 || number > 20) {
            alert("请输入1-20之间的数字");
            document.getElementById("page_size").value = 6;
            return;
        }
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["page_size"] = number;
        localStorage.setItem("hoverSettings",JSON.stringify(hoverSettingsLocal));
    })

    //换页间隔
    document.getElementById("scroll_interval").value = hoverSettingsLocal["scroll_interval"];
    document.getElementById("scroll_interval").addEventListener("change", function (e) {
        let value = document.getElementById("scroll_interval").value;
        if(isNaN(value)){
            alert("请输入数字数字");
            document.getElementById("page_size").value = 5;
            return
        }
        let number = Number(value);
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["scroll_interval"] = number;
        localStorage.setItem("hoverSettings",JSON.stringify(hoverSettingsLocal));
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

    //添加
    document.getElementById("addStock").addEventListener("click", function (e) {
        alert("待实现")
    })


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
        });

        html += "</table>"
        document.getElementById("stock-table").innerHTML= html;
    }

    // setInterval(initTable,1000);
})

