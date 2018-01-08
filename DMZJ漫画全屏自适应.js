// ==UserScript==
// @name         DMZJ漫画全屏自适应
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  动漫之家漫画全屏自适应
// @author       VickScarlet
// @include      /^(http)s?:\/\/(manhua\.dmzj\.com)\/.*\/[0-9]+.shtml.*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var div = document.getElementsByTagName("div");
    for (var i = 0; i < div.length; i++) {
        div[i].style.display = "none";
    }
    document.getElementById("center_box").style.position = "absolute";
    document.getElementById("center_box").style.display = "flex";
    var css = "";
    css += [
        "div {",
        "    display: none;",
        "    height: 0px;",
        "}",
        "#center_box {",
        "    position: absolute;",
        "    display: -webkit-flex;",
        "    display: flex;",
        "    -webkit-align-items: center;",
        "    align-items: center;",
        "    -webkit-justify-content: center;",
        "    justify-content: center;",
        "    margin: 0px;",
        "    padding: 0px;",
        "    top: 0%;",
        "    left: 0%;",
        "    width: 100%;",
        "    height: 100%;",
        "    background-color: black;",
        "    z-index: 1;",
        "}",
        "#center_box > img {",
        "    width: auto;",
        "    height: 100%;",
        "    left: 0;",
        "    top: 0;",
        "    border: 0px;",
        "    margin: auto;",
        "    padding: 0;",
        "}"
    ].join("\n");
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
})();