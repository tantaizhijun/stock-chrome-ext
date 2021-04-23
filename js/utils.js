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