$(document).ready(function () {

    //从本地存储获取信息
    let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));

    //请求间隔
    document.getElementById("request_interval").value = hoverSettingsLocal["request_interval"];
    document.getElementById("request_interval").addEventListener("change", function (e) {
        let value = document.getElementById("request_interval").value;
        //从localstorage获取,设置并存储
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["request_interval"] = Number(value);
        localStorage.setItem("hoverSettings", JSON.stringify(hoverSettingsLocal));

    })
    //名称长度
    document.getElementById("show_name_len").value = hoverSettingsLocal["show_name_len"];
    document.getElementById("show_name_len").addEventListener("change", function (e) {
        let value = document.getElementById("show_name_len").value;
        if (value != "1" && value != "2" && value != "3" && value != "4") {
            value = 4;
            alert("提示：请输入1-4之间的数字")
            document.getElementById("show_name_len").value = value;
        }
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["show_name_len"] = Number(value);
        localStorage.setItem("hoverSettings", JSON.stringify(hoverSettingsLocal));
    })

    //每页数量
    document.getElementById("page_size").value = hoverSettingsLocal["page_size"];
    document.getElementById("page_size").addEventListener("change", function (e) {
        let value = document.getElementById("page_size").value;
        if (isNaN(value)) {
            alert("请输入数字数字")
            number = 6;
            document.getElementById("page_size").value = number;
        }
        let number = Number(value);
        if (number < 0 || number > 20) {
            alert("请输入1-20之间的数字");
            number = 6;
            document.getElementById("page_size").value = number;
        }
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["page_size"] = number;
        localStorage.setItem("hoverSettings", JSON.stringify(hoverSettingsLocal));
    })

    //换页间隔
    document.getElementById("scroll_interval").value = hoverSettingsLocal["scroll_interval"];
    document.getElementById("scroll_interval").addEventListener("change", function (e) {
        let value = document.getElementById("scroll_interval").value;
        if (isNaN(value)) {
            alert("请输入数字数字");
            value = 5;
            document.getElementById("page_size").value = value;
            return
        }
        let number = Number(value);
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["scroll_interval"] = number;
        localStorage.setItem("hoverSettings", JSON.stringify(hoverSettingsLocal));
    })

    document.getElementById("is_hover").value = hoverSettingsLocal["isHover"];

    document.getElementById("is_hover").addEventListener("change", function () {
        var ishover = $(this).val();
        let hoverSettingsLocal = JSON.parse(localStorage.getItem("hoverSettings"));
        hoverSettingsLocal["isHover"] = ishover;
        localStorage.setItem("hoverSettings", JSON.stringify(hoverSettingsLocal));
    });


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

        let st = document.getElementById("addStockValue").value;
        appData.stockOrder.push(st);
        localStorage.setItem("appData", JSON.stringify(appData));
        initManageList();
    })

    document.getElementById("addSt").addEventListener("click", function (e) {

        let st = document.getElementById("addStockInput").value;
        if (appData.stockOrder.indexOf(st) == -1) {
            appData.stockOrder.push(st);
        }
        localStorage.setItem("appData", JSON.stringify(appData));
        initManageList();
        document.getElementById("addStockInput").value = "";
    })


//删除stock
    function initManageList() {
        //列表
        let stockOrder = appData.stockOrder;
        let stockMap = appData.stockMap;
        if (stockOrder) {
            let htmlList = "";
            for(let e in stockOrder){
                if(!stockOrder[e] || stockOrder[e]==""){
                    continue;
                }
                let em = stockMap[stockOrder[e]];
                if(em){
                    htmlList += "<span id='st" + e + "' class='stItem'>" + stockOrder[e] +  "</span>" + "<span>" + em.name + "</span>" ;
                }else {
                    htmlList += "<span id='st" + e + "' class='stItem'>" + stockOrder[e] +  "</span>";
                }

            }
            document.getElementById("stockManage").innerHTML = htmlList
        }


        let lis = document.getElementsByClassName("stItem");
        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener("click", function (e) {

                if (confirm("确认 & 取消")) {
                    stockOrder = stockOrder.filter(function (item) {
                        return item != e.currentTarget.innerText;
                    });
                    appData.stockOrder = stockOrder;
                    localStorage.setItem("appData", JSON.stringify(appData));
                    initManageList();
                }
            })
        }
    }

    initManageList();


    function initTable() {
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
            fields.forEach(field => {
                html += "<td>" + stockMap[key][field] + "</td>>"
            })
            html += "</tr>"
        });

        html += "</table>"
        document.getElementById("stock-table").innerHTML = html;
    }

    setInterval(initTable, 1000);
})

