// ==UserScript==
// @name       BaiduPanFolderSize
// @version    1.2.0
// @description  统计百度云盘文件夹大小.
// @match	https://pan.baidu.com/disk/home*
// @include	https://pan.baidu.com/disk/home*
// @require http://libs.baidu.com/jquery/2.1.1/jquery.min.js
// @grant GM_xmlhttpRequest
// @grant GM_setClipboard
// @run-at document-end
// @author Vick Scarlet
// ==/UserScript==

var url = document.URL;
var BASE_URL_API = "http://pan.baidu.com/api/list?channel=chunlei&clienttype=0&web=1&dir=";

function showInfo() {
    url = document.URL;
    while (url.indexOf("%25") != -1) {
        url = url.replace("%25", "%");
    }
    var foldersize = new Array();
    var folder_access_times = 0;
    var listurl = BASE_URL_API; 
    if (url.indexOf("path=") == -1) {
        listurl += "%2F";
        getList(listurl,0,"-372GIDds1d1s3a35f311");
    } else if(url.indexOf("path=") != -1){
        var path = url.substring(url.indexOf("path=") + 5);
        if(path.indexOf("&") != -1){
            path = path.substring(0, path.indexOf("&"));
        }
        listurl += path;
        getList(listurl,0,"-372GIDds1d1s3a35f311");
    }
    function getList(url,dep,key) {
        GM_xmlhttpRequest({
            method : 'GET',
            synchronous : false,
            url : url,
            timeout : 9999,
            onabort : function() {alert(decodeURIComponent(url.replace(BASE_URL_API, "")) + "\n\n意外终止, 请刷新重试");},
            onerror : function() {alert(decodeURIComponent(url.replace(BASE_URL_API, "")) + "\n\n未知错误, 请刷新重试");},
            ontimeout : function() {alert(decodeURIComponent(url.replace(BASE_URL_API, "")) + "\n\n请求超时, 请刷新重试");},
            onload : function(reText) {
                var JSONobj = JSON.parse(reText.responseText);
                if (JSONobj.errno != 0) {
                    alert("读取目录: " + decodeURIComponent(url.replace(BASE_URL_API, "")) + "  失败, 错误码: " + JSONobj.errno);
                    return;
                }
                var curr_item = null;
                var size = 0;
                for(var i=0; i<JSONobj.list.length;i++){
                    curr_item = JSONobj.list[i];
                    if (curr_item.isdir == 1) {
                        folder_access_times++;
                        if(dep==0) {
                            foldersize[curr_item.server_filename] = 0;
                            getList(BASE_URL_API + encodeURIComponent(curr_item.path),dep+1,curr_item.server_filename);
                        }
                        else {
                            getList(BASE_URL_API + encodeURIComponent(curr_item.path),dep+1,key);
                        }
                    }
                    else {
                        foldersize[key] += curr_item.size;
                    }
                }
                folder_access_times--;
                if (folder_access_times + 1 == 0)
                    flush(key);
            }
        });
    }
    // 转换可读文件大小
    function getReadableFileSizeString(fileSizeInBytes) {
        var i = 0;
        var byteUnits = [ ' Bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB' ];
        while (fileSizeInBytes >= 1024) {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        }
        return fileSizeInBytes.toFixed(2) + byteUnits[i];
    }
    function flush() {
        var name = "";
        dd = document.getElementsByClassName("g-clearfix AuPKyz open-enable");
        // alert(dd.length);
        // alert(foldersize.length);
        for(var i=0;i<dd.length;i++){
            name = dd[i].getElementsByClassName("xlytjQoP")[0].innerHTML;
            if(name=="我的应用数据") name = "apps";
            if(foldersize.hasOwnProperty(name)) dd[i].getElementsByClassName("cwlz9JR")[0].innerHTML = getReadableFileSizeString(foldersize[name]);
        }
        // alert("done!");
    }
}
showInfo();