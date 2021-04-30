(function () {
    var utils = {

        //腾讯Api
        urls_tx: {
            st_info_url: "http://qt.gtimg.cn/q="
        },

        //新浪Api
        url_xl: {
            st_info_url: "https://hq.sinajs.cn/list=",
            st_k_line: "http://image.sinajs.cn/newchart/daily/n/",
            st_fenshi: "http://image.sinajs.cn/newchart/min/n/",
            query_st: "http://suggest3.sinajs.cn/suggest/?type=11&key="     //股票查询接口key=关键字
        },

        //是否在交易时间
        inTradeTime: function () {
            let date1 = new Date();
            date1.setHours(11, 30);

            //交易时间在9:00--11:30或者13:30--15：00，并且在周一至周五（暂未判断节假日）
            const date = new Date();
            const day = date.getDay();
            if (!(day >= 1 && day <= 5)) {
                return false;
            }
            if (!(date.getHours() > 9 && date.getTime() < date1.getTime()) && !(date.getHours() >= 13 && date.getHours() <= 15)) {
                return false;
            }
            return true;
        },

        //简要信息接口
        getSParameterByStock: function (stockArr) {
            return stockArr.map(s => {
                if (s.startsWith("00")) {
                    return "s_sz" + s;
                } else if (s.startsWith("60")) {
                    return "s_sh" + s;
                }
            }).join(",");
        },
        //全量信息接口
        getFParameterByStock: function (stockArr) {
            return stockArr.map(s => {
                if (s.startsWith("00")) {
                    return "sz" + s;
                } else if (s.startsWith("60")) {
                    return "sh" + s;
                }
            }).join(",");
        },

        ajax: function (url, callback) {
            var XHR = (function () {
                try {
                    if (window.XMLHttpRequest) {
                        return new window.XMLHttpRequest();
                    } else {
                        return new window.ActiveXObject("Microsoft.XMLHTTP");
                    }
                } catch (e) {
                }
            })();

            var url = url;
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

    window.utils = utils;
})();