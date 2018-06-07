// ==UserScript==
// @name         DMZJ漫画全屏自适应
// @namespace    http://tampermonkey.net/
// @version      0.0.4
// @description  动漫之家漫画全屏自适应
// @author       VickScarlet
// @include      /^(http)s?:\/\/(manhua\.dmzj\.com)\/.*\/[0-9]+.shtml.*
// @include      /^(http)s?:\/\/(www\.dmzj\.com)\/view\/.*\/[0-9]+.html.*
// @grant        none
// ==/UserScript==
/*jshint esversion: 6 */

function initial(){
    init_view();
    init_key();
    init_style();
}

function init_view(){
    $("body").children().addClass("nodisplay");
    let mode = $("#qiehuan_txt").text();
    let html = `
    <div id="scarletshow">
        <div id="scarletshowbg">
        </div>
        <div id="scarletshowcontent">
            <a id="scarlet_prevc">上一章</a>
            <a id="scarlet_nextc">下一章</a>
            <img id="imgcontent" index="0"/>
        </div>
    </div>`;
    if(mode=="切换到上下滚动阅读"){
        $("#qiehuan_txt").click();
    }else{
        $("body").append(html);
        let count = arr_pages.length;
        $("#imgcontent").attr('src',img_prefix+arr_pages[0]);
        $("#scarlet_prevc").click(function (e) {
            let prevc = $("#prev_chapter");
            if(prevc.length > 0){ prevc[0].click(); }
            else alert("没有前一章了");
        });
        $("#scarlet_nextc").click(function (e) {
            let nextc = $("#next_chapter");
            if(nextc.length > 0){ nextc[0].click(); }
            else alert("没有后一章了");
        });
    }
}

function init_key(){
    let curr = parseInt($("#imgcontent").attr("index"));
    let prev = curr - 1;
    let next = curr + 1;
    let count = arr_pages.length;
    console.log("count"+count);
    $('body').keyup(function(event) {
        if (document.activeElement.localName != "input" && document.activeElement.localName != "select" ) {
            let value = event.keyCode;
            if (value == 88) {//x
                let curr = parseInt($("#imgcontent").attr("index"));
                let prev = curr - 1;
                if(prev<0){
                    let prevc = $("#prev_chapter");
                    if(prevc.length > 0){ prevc[0].click(); }
                    else alert("已经是最前了");
                }else{
                    $("#imgcontent").attr('index',prev);
                    $("#imgcontent").attr('src',img_prefix+arr_pages[prev]);
                }
            }else if(value == 67){//c
                let curr = parseInt($("#imgcontent").attr("index"));
                let next = curr + 1;
                console.log("next"+next);
                if(next+1>count){
                    let nextc = $("#next_chapter");
                    if(nextc.length > 0){ nextc[0].click(); }
                    else alert("已经是最后了");
                }else{
                    $("#imgcontent").attr('index',next);
                    $("#imgcontent").attr('src',img_prefix+arr_pages[next]);
                }
            }else if(value == 90){//z
                let prevc = $("#prev_chapter");
                if(prevc.length > 0){ prevc[0].click(); }
                else alert("没有前一章了");
            }else if(value == 86){//v
                let nextc = $("#next_chapter");
                if(nextc.length > 0){ nextc[0].click(); }
                else alert("没有后一章了");
            }else if(value == 81){//q
                $("body").children(".nodisplay").removeClass("nodisplay");
                $("#scarletshow").attr("class","nodisplay");
            }else if(value == 65){//a
                $("body").children().addClass("nodisplay");
                $("#scarletshow").attr("class","");
            }
        }
    });
}

function init_style(){
    let style = `<style id="scarletview">#scarletshow{position:fixed;width:100%;height:100%;top:0}#scarletshowbg{background:black;width:100%;height:100%;opacity:0.5;}#scarletshowcontent{position:absolute;width:100%;height:100%;top:0;}#scarletshowcontent>a{z-index:10000;}#imgcontent{position:absolute;max-width:100%;max-height:100%;top:50%;left:50%;transform:translateY(-50%)translateX(-50%);}.nodisplay{display:none;}</style>`;
    $("head").append(style);
}

$(document).ready(function() {
    initial();
});