// ==UserScript==
// @name         EH Web Full Screen
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  EH Web Full Screen
// @author       VickScarlet
// @include      /^(http)s?:\/\/e(x|-)hentai.org\/s\/([0-9]|[a-f])*\/([0-9])*-([0-9])*.*
// @require      https://code.jquery.com/jquery-3.3.1.js
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
    let html = `
    <div id="scarletshow">
        <div id="scarletshowbg">
        </div>
        <div id="scarletshowcontent">
            <img id="imgcontent" index="0"/>
        </div>
    </div>`;
    $("body").append(html);
    $("#imgcontent").attr("src",$("#img").attr("src"));
}

function init_key(){
    $('body').keyup(function(event) {
        if (document.activeElement.localName != "input" && document.activeElement.localName != "select" ) {
            let value = event.keyCode;
            switch(value){
                case 81:{//q
                    $("body").children(".nodisplay").removeClass("nodisplay");
                    $("#scarletshow").attr("class","nodisplay");
                    break;
                }
                case 65:{//a
                    $("body").children().addClass("nodisplay");
                    $("#scarletshow").attr("class","");
                    break;
                }
                case 37://←
                case 39://→
                case 40://下
                case 90:{//z
                    $("#imgcontent").attr("src",$("#img").attr("src"));
                    break;
                }
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