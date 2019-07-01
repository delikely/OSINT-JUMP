// ==UserScript==
// @name           OSINT-JUMP
// @author         delikley
// @description    开源情报收集的导航站，方便在各搜索引擎之间跳转。脚本基于https://github.com/qxinGitHub/searchEngineJump。
// @version        0.0.1
// @created        2019-05-04
// @lastUpdated    2019-05-04

// @namespace      https://greasyfork.org/zh-CN/scripts/
// @homepage       https://github.com/delikely/

// @icon           data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFTklEQVR4Xu2bXahUVRTH/2vf270hfRAF+RAipXQ7Z+2BmCJTC4NKIaMQEzJ76aHooaAHy7QPJSqVCOwhotcyH/qCPiAr+sC0JK/I7HVGCi0iH/KhupVwseDs2HUvXOecmdlnZs6cc8e7YZ7O2uv812+v/X2GcJYXOsvjxxyAuQw4ywl01AWq1eq8ycnJdUqpZQAW5cDwSxHZmoPfhMvMAIIguFop9SaAK3IWuK0fEDIBCMMwIKIo58Bnus8dgjeAIAhGhoaGDltrwz4CcK/KFYI3gLGxsYXDw8M/9jn46dflBsEbgNb6emvtgYIA5JYJ3gCYeQWAzwsEkAuE2Qag5xBmIwAHYauIbOtFNs5WAD2DMJsB9ATCbAfQNYRBANDVwDgoADqGMEgAOoIwaAAyQygCgFtOfwjgJIBfpuby+QAuBXAbgKU9mN9vEpEvfPz0C8ApAK8DeE1EWu4nmNkBuBfABgDn+QSRYlMqAG7F5gI/niUYZnYHLg7E01nqTdmWBkDX21hmdkdjWSEUD4CIbjHGfNpB6yWqaK1vttZ+ksFX4QA2i8jzrQRXq9VzTp8+/d+B6ujo6LHx8fF/Wtkz8+MAnvOEUBwAa+3BKIqWNBPKzFsArAHAAEam7P4GIADeEZFnm9UNw/AbIrrOA0KhANZHUbSnUaTW+nJr7QcArmoTwFEiWm2M+aHRLgzDu4nojTID2CsiqxoFTqW7a2XvMjo6OpLWLZj5IwAr2zgqLAO2iEiin2qtd1hrH/WOHgAR7TTGPNZYh5k3A2jaTQqdBt2ReRRF9ZmiwzBcSUSu1TIXa+2qKIr2NvjzuZsoJANOicj5KS3WyTw+7SZ1HcHMf7VZJRYC4LiIJO4JPftss+xIHVOY+Vibq7lCABwQEXdZekZh5j8AXJA5//+v8KeIXJjic3+bTVMhAIyIVFLEfgvgmg4BHBKRa1N8HgUw1sJnIQB+FZFLGkVprbdbaxOjuQ8QItphjNmUAmASwLllAwBr7cVRFP3WMGqvJSJ3nZ65WGvviqLorZkVpxZU7XaWhWSAm7s3GGN2p7TYIQDVjATGRSTRdcIwvJ2I3mvjqxgAAHaLiDvIOKMEQbBcKbUvC4A4jm+o1+tfpcB064JbywoASqkba7VaIlit9XprbSI70gIhonuMMYk1PzOvBvC+B8jCMsBpe1tE1qaJ1FpfFMfxdiK6P+25tfZVpdQmY8zvac+Z2YFdXnYATt9GEXmhmdBKpcLW2mXu52yIaL/71Wo1tyVuWsIwfIKInpkNAJzGBSLys4fYTCbMvBHAztKOAQ3CFmU9DPWhwcwPA9jVwrbQMaBR1xoRedcnsBQbBSBuMp48YK19pYnfUgFwfXwPEe2q1WoHfUCEYbieiJ4CcOXExMS8EydOuJVfojDzgwBeTnlULgDTAq21+4joMwAfu5uhOI5PEtGItXbx0NCQuwdYEMfxnY3nfsPDwxcdOXJkogmEhwC81PCsnAB8Wr+FzXwRcddpiaK1fsRa++KMBwMJoOXM0jA7DCwAt+FaHEWROxBJGxOm7w4GF4CLOo5jrtfrqd8sa62fdGNN2W6Hu+z+yepKqWqtVjvcJBNW9BxApVJZEsfx1z2PpAuHRLTUGNOVJu/vA4IgWKCU+qkLvXlV9e7vaQKyABghou+IaGFekXTqN+3+wNeXNwDnsCQfTKfGFsfxHfV6vd1JUaJuJgCu9tT/BtzBRi++5fFtKC87IlpnjMl0/pgZgFPi/j2ilLoPgNvPX+alLj+jCSL63q0Em60UW726IwD5xdJ/z3MA+s+8XG+cy4BytUf/1fwLTW6DX9pWjvMAAAAASUVORK5CYII=

// @match          *://*/*

// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_deleteValue
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @run-at      document-end

// ==/UserScript==

(function () {
    'use strict';

    function iqxinstart(){
        // 根据规则把搜索引擎列表插入到指定网站
        var rules = [
            // 网页搜索/////////////第一个可以当模板看
            {name: "google网页搜索",// 你要加载的网站的名字(方便自己查找)
                // 是否启用.
                enabled: true,
                // 在哪个网站上加载,正则.
                url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
                // 加载哪个类型的列表:
                // ['web'|'music'|'video'|'image'|'download'|'shopping'|'translate'|'knowledge'|'sociality']
                engineList: 'web',
                // 若固定到顶栏,是否给一个高度
                fixedTop: 52,
                // 给引擎列表的样式
                style: '\
                    margin-left: 142px;\
                    z-index: 100;\
                    margin-top:5px;\
                ',

                // 插入文档,相关
                // target 将引擎跳转工具栏插入到文档的某个元素
                    // (请使用xpath匹配,比如: '//*[@id="subform_ctrl"]'  或者 css匹配(请加上 'css;' 的前缀),比如: 'css;#subform_ctrl' );
                // keyword 使用 xpath 或者 css选中一个form input元素 或者 该项是一个函数,使用返回值
                // where 四种:
                    // 'beforeBegin'(插入到给定元素的前面) ;
                    // 'afterBegin'(作为给定元素的第一个子元素) ;
                    // 'beforeEnd' (作为给定元素的最后一个子元素) ;
                    // 'afterEnd'(插入到给定元素的后面);.
                insertIntoDoc: {
                    target: 'css;#appbar',
                    // keyword: function () {
                        // var input = document.getElementById('lst-ib');
                        // if (input) return input.value;
                    // },
                    keyword: '//input[@name="q"]',
                    where: 'beforeBegin',
                },
                // 修改源网页用来适应跳转栏
                stylish: 'body.vasq #hdtbMenus.hdtb-td-o{top:100px !important}'
            },
            {name: "google-hash-query",// 不刷新页面显示搜索结果的google
                enabled: true,
                url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/,
                engineList: 'web',
                style: '\
                    margin-left: 138px;\
                    z-index: 100;\
                    margin-top:5px;\
                ',
                insertIntoDoc: {
                    target: 'css;#appbar',
                    keyword: function () {
                        var input = document.getElementById('lst-ib');
                        if (input) return input.value;
                    },
                    where: 'beforeBegin',
                },
                stylish: 'body.vasq #hdtbMenus.hdtb-td-o{top:100px !important}'
            },
            {name: "百度网页搜索",
                url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
                enabled: true,
                engineList: "web",
                fixedTop:56,
                style: '\
                    margin-top:8px;\
                    margin-bottom: -5px;\
                    z-index: 99;\
                    margin-left: 113px;\
                ',
                insertIntoDoc: {
                    keyword: 'css;input#kw',
                    target: 'css;#s_tab',
                    where: 'afterEnd',
                },
                stylish:".headBlock,.se_common_hint{display:none !important}"
            },
            {name: "必应网页搜索",
                url: /^https?:\/\/[^.]*\.bing\.com\/search/,
                enabled: true,
                engineList: "web",
                style: '\
                    padding-left:15px;\
                    margin-top:10px;\
                    margin-left: 100px;\
                    margin-bottom:-20px;\
                ',
                insertIntoDoc: {
                    keyword: 'css;#sb_form_q',
                    target: 'css;#b_content',
                    where: 'beforeBegin',
                },
            },
            {name: "DDG",
                url: /^https?:\/\/duckduckgo\.com\/*/i,
                enabled: true,
                engineList: "web",
                style: '\
                    padding-left:95px;\
                    margin-top:5px;\
                ',
                insertIntoDoc: {
                    keyword: '//input[@name="q"]',
                    target: 'css;#header_wrapper',
                    where: 'afterEnd',
                },
            },
            {name:"雅虎网页搜索",
                url:/^https?:\/\/search\.yahoo\.com\/search/i,
                engineList:"web",
                enabled:true,
                fixedTop:72,
                style:"\
                    margin-left:122px;\
                    margin-bottom:-4px;\
                    padding-top:6px;\
                ",
                insertIntoDoc:{
                    keyword:'css;#yschsp',
                    target:'css;#horizontal-bar',
                    where:'afterBegin',
                },
            },
            {name:"台湾雅虎网页搜索",
                url:/^https?:\/\/tw\.search\.yahoo\.com\/search/i,
                engineList:"web",
                enabled:true,
                fixedTop:52,
                style:"\
                    margin-left:-10px;\
                    margin-bottom:10px;\
                ",
                insertIntoDoc:{
                    keyword:'css;#yschsp',
                    target:'css;#results',
                    where:'afterBegin',
                },
            },
            {name:"searx",
                url:/^https?:\/\/searx\.me\/\?q/i,
                engineList:"web",
                enabled:true,
                style:"\
                    margin-left:-10px;\
                    margin-bottom:10px;\
                ",
                insertIntoDoc:{
                    keyword:'css;#q',
                    target:'css;#categories',
                    where:'beforeBegin',
                },
            },
            {name: "搜狗",
                url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
                enabled: true,
                engineList: "web",
                fixedTop:60,
                style: "\
                        top:-46px;\
                        z-index:99;\
                        margin-left:-5px;\
                ",
                insertIntoDoc: {
                    keyword: "css;#upquery",
                    target: "css;#wrapper",
                    where: "afterBegin",
                },
                stylish:"#float_uphint{display:none;}",
            },
            {name:"yandex",
                url:/^https?:\/\/yandex\.com\/search/i,
                engineList:"web",
                enabled:true,
                fixedTop:56,
                style:"\
                    margin-top:10px;\
                    padding-left:130px;\
                ",
                insertIntoDoc:{
                    keyword:'css;.input__control',
                    target:'css;.navigation',
                    where:'beforeBegin',
                },
            },
            {name: "google网页分类搜索",
                enabled: true,
                url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?:tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
                engineList: 'web',
                style: '\
                    margin-left: 142px;\
                    z-index: 100;\
                    margin-top:5px;\
                ',
                insertIntoDoc: {
                    target: 'css;#appbar',
                    keyword: '//input[@name="q"]',
                    where: 'beforeBegin',
                },
                stylish: 'body.vasq #hdtbMenus.hdtb-td-o{top:100px !important}'
            },
            {name: "startpage",
                enabled: true,
                url:/^https?:\/\/www\.startpage\.com\/do\/asearch/i,
                engineList: 'web',
                fixedTop:69,
                style: '\
                    z-index: 100;\
                    margin-left: 260px;\
                ',
                insertIntoDoc: {
                    target: 'css;.column--main',
                    keyword: '//input[@name="query"]',
                    where: 'beforeBegin',
                },
            },
            {name:"mijisou",
                url:/^https?:\/\/mijisou.com\/\?q/i,
                engineList:"web",
                enabled:true,
                fixedTop:75,
                style:"\
                    margin-left:-10px;\
                    margin-bottom:10px;\
                ",
                insertIntoDoc:{
                    keyword:'css;#q',
                    target:'css;#cat',
                    where:'beforeBegin',
                },
                stylish:'.default-container{margin-top:50px;}',  // 此处应该仅在需要置顶的时候才会有影响，后期需要在加一个判断，2019-04-19 22:52:38
            },

            // 知识
            {name: "百度百科词条",
                url: /^https?:\/\/baike\.baidu\.com\/item/,
                engineList: "knowledge",
                fixedTop:65,
                enabled: true,
                style: "\
                    text-align: center;\
                    z-index: 999999;\
                    background: #fff;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#query',
                    target: 'css;.navbar-wrapper',
                    where: 'beforeBegin',
                },
            },
            {name: "百度百科搜索",
                url: /^https?:\/\/baike\.baidu\.com\/search/,
                engineList: "knowledge",
                enabled: true,
                fixedTop:56,
                style: "\
                    padding-left: 120px;\
                    margin: 5px 0 -10px 0px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#query',
                    target: 'css;.header-wrapper',
                    where: 'afterEnd',
                },
            },
            {name: "百度文库",
                url: /^https?:\/\/wenku\.baidu\.com\/search/i,
                engineList: "knowledge",
                enabled: true,
                style: "\
                    border-top: 1px solid #e5e5e5;\
                    padding-left:121px;\
                    border-bottom: 1px solid #e5e5e5;\
                    margin-bottom: 1px;\
                ",
                insertIntoDoc: {
                    keyword: function(){
                        var str = document.querySelector("#kw").value;
                        return str;
                        },
                    target: 'css;#hd',
                    where: 'afterEnd',
                },
            },
            {name: "百度知道",
                url: /^https?:\/\/zhidao\.baidu\.com\/search/i,
                engineList: "knowledge",
                enabled: true,
                style: "\
                    border-top: 1px solid #e5e5e5;\
                    border-bottom: 1px solid #e5e5e5;\
                    margin-bottom: 1px;\
                    margin-left:112px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#kw',
                    target: 'css;#header',
                    where: 'afterEnd',
                },
            },
            {name: "维基百科",
                url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/i,
                engineList: "knowledge",
                enabled: true,
                style: "\
                        position: absolute;\
                        padding-left: 14em;\
                ",
                insertIntoDoc: {
                    keyword: function(){
                        var url = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
                        return decodeURIComponent(url);
                        },
                    target: 'css;#mw-head',
                    where: 'afterBegin',
                },
            },
            {name: "知乎",
                url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
                engineList: "knowledge",
                enabled: true,
                fixedTop:50,
                style: "\
                    margin: 5px auto 0px;\
                    width:960px;\
                    z-index:19;\
                    background: #fff;\
                    box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);  \
                    padding: 5px 20px; \
                ",
                insertIntoDoc: {
                    keyword: 'css;.SearchBarExperiment input',
                    target:"css;.Search-container",
                    where: 'beforeBegin', //beforeBegin
                },
                stylish:".TopSearch.Card{margin:30px auto;}",
            },
            {name: "互动百科搜索页",
                url: /^https?:\/\/so\.baike\.com\/doc/i,
                engineList: "knowledge",
                enabled: true,
                style: "\
                    border-top: 1px solid #e5e5e5;\
                    text-align: center;\
                    border-bottom: 1px solid #e5e5e5;\
                    margin-bottom: 1px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;.ac_input',
                    target: 'css;.bk-head',
                    where: 'afterEnd',
                },
            },
            {name: "互动百科词条页",
                url: /^https?:\/\/www\.baike\.com\/wiki/i,
                engineList: "knowledge",
                enabled: true,
                style: "\
                    border-top: 1px solid #e5e5e5;\
                    text-align: center;\
                    border-bottom: 1px solid #e5e5e5;\
                    margin-bottom: 1px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;.ac_input',
                    target: 'css;.bk-head',
                    where: 'afterEnd',
                },
            },
            {name: "豆丁文档",
                url: /^https?:\/\/www\.docin\.com\/search\.do/,
                engineList: "knowledge",
                enabled: true,
                style: "\
                    text-align: center;\
                    margin:0 auto;\
                    padding-top:1px;\
                    border-top:1px solid #00000;\
                    border-bottom:1px solid #D9E1F7;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#topsearch',
                    target: 'css;.doc_hd_mini',
                    where: 'afterEnd',
                },
            },
            {name: "知乎(搜狗)",
                   url: /^https?:\/\/zhihu\.sogou\.com\/zhihu/,
                   enabled: true,
                   engineList: 'web',
                   fixedTop:55,
                   style: "\
                      margin: auto;\
                      width: 1000px;\
                      z-index:99;\
                   ",
                   insertIntoDoc: {
                      keyword: 'css;#upquery',
                      target: 'css;#header',
                      where: 'afterEnd',
                   },
                   stylish: '.header{ margin-bottom: 5px; }'
            },
            {name: "微信搜狗",
                url: /^https?:\/\/weixin\.sogou\.com\/weixin\?/,
                enabled: true,
                engineList: "web",
                fixedTop:55,
                style: "width: 1000px;margin: 8px auto -5px;z-index:99;",
                insertIntoDoc: {
                    keyword: "//input[@name='query']",
                    target: "css;.header-box",
                    where: "afterEnd",
                },
            },
            {name: "Quora",
                       // https://www.quora.com/search?q=china
                url:  /^https?:\/\/www\.quora\.com\/search\?/i,
                enabled: true,
                engineList: "knowledge",
                fixedTop:53,
                style: "width: 1000px;margin: 0px auto 0px; padding-left:180px;",
                insertIntoDoc: {
                    keyword: function(){
                        var url = window.location.href.substring(window.location.href.lastIndexOf("=")+1);
                        return decodeURIComponent(url);
                        },
                    target: "css;.SiteHeader",
                    where: "beforeEnd",
                },
            },
            {name: "stackoverflow",
                url: /^https?:\/\/stackoverflow\.com\/search\?/i,
                enabled: true,
                engineList: "knowledge",
                fixedTop:50,
                style: "width: 1000px;margin: 8px auto 0px;z-index:99;",
                insertIntoDoc: {
                    keyword: "//input[@name='q']",
                    target: "css;.top-bar",
                    where: "afterEnd",
                },
            },


            // 视频网站
            {name: "优酷",
                url: /^https?:\/\/www\.soku\.com\/search_video\//,
                engineList: "video",
                enabled: true,
                fixedTop:54,
                style: "\
                    width:1190px;\
                    margin:0 auto;\
                    z-index:99999;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#headq',
                    target: 'css;.sk_container',
                    where: 'beforeBegin',
                },
            },
            {name: "土豆",
                url: /^https?:\/\/www\.soku\.com\/t\/nisearch\//,
                enabled: true,
                engineList: "video",
                style: "\
                    padding-left: 10px;\
                    border-top: 1px solid #FC6500;\
                    border-bottom: 1px solid #FC6500;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#headq',
                    target: 'css;body > .sk_container',
                    where: 'beforeBegin',
                },
            },
            {name: "哔哩哔哩",
                url: /^https?:\/\/search\.bilibili\.com\/all/,
                enabled: true,
                engineList: "video",
                fixedTop:50,
                style: "\
                    width:980px;\
                    margin:10px auto -5px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#search-keyword',
                    target: 'css;.filter-wrap',
                    where: 'beforeBegin',
                },
            },
            {name: "AcFun",
                url: /^https?:\/\/www\.acfun\.cn\/search/,
                enabled: true,
                engineList: "video",
                fixedTop:46,
                style: "\
                    width:980px;\
                    margin: 0 auto;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#search-text',
                    target: 'css;.search-nav',
                    where: 'afterBegin',
                },
            },
            {name: "YouTube",
                url: /^https?:\/\/www\.youtube\.com\/results/,
                enabled: true,
                engineList: "video",
                fixedTop:56,
                style: "\
                    margin-top: 62px;\
                    margin-bottom: -80px;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;input#search',
                    target: 'css;#page-manager',
                    where: 'beforeBegin',
                },
            },
            {name: "niconico",
                url: /^https?:\/\/www\.nicovideo\.jp\/search\//,
                enabled: true,
                engineList: "video",
                style: "\
                    border-top: 1px solid #E8E8E8;\
                    border-bottom: 1px solid #E8E8E8;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#search_united',
                    target: 'css;.tagListBox',
                    where: 'beforeBegin',
                },
            },
            {name: "Iqiyi",
                 url: /^https?:\/\/so\.iqiyi\.com\/so\/q/,
                 enabled: true,
                 engineList: "video",
                 fixedTop:60,
                 style: '\
                        margin:0 auto;\
                        width:1180px;\
                        ',
                 insertIntoDoc: {
                    keyword: 'css;#data-widget-searchword',
                    target: 'css;.mod_search_header',
                    where: 'afterEnd'
                 },
            },
            {name: "腾讯视频",
                    url: /^https?:\/\/v\.qq\.com\/x\/search/i,
                    engineList: "video",
                    enabled: true,
                    fixedTop:60,
                    style: "width:1140px;margin:0 auto;",
                    insertIntoDoc: {
                       keyword: 'css;#keywords',
                       target: 'css;.site_head_simple',
                       where: 'afterEnd',
                    },
            },


            // 音乐
            {name: "百度音乐",
                url: /^https?:\/\/music\.baidu\.com\/search/,
                enabled: true,
                engineList: "music",
                style: "\
                    border-top: 0px solid #0064C4;\
                    margin-bottom: 5px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#ww',
                    target: 'css;.nav-wrapper',
                    where: 'beforeBegin',
                },
            },
            {name: "一听音乐",
                url: /^https?:\/\/so\.1ting\.com\/all\.do/,
                enabled: true,
                engineList: "music",
                style: "\
                    text-align: center;\
                    border-bottom: 1px solid #13B310;\
                    border-top: 1px solid #13B310;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#keyword',
                    target: 'css;.nav',
                    where: 'beforeBegin',
                },
            },
            {name: "xiami",
                url: /^https?:\/\/www\.xiami\.com\/search/,
                enabled: true,
                engineList: "music",
                style: "\
                    border-top: 1px solid #93D3FF;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#search_text',
                    target: 'css;.search_result',
                    where: 'beforeBegin',
                },
            },
            {name: 'QQ音乐',
                url: /^https?:\/\/s\.music\.qq\.com/i,
                enabled: true,
                engineList: 'music',
                style:"\
                    border-bottom: 1px solid #2B6DAE;\
                    border-top: 1px solid #2B6DAE;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#keyword',
                    target: 'css;.mod_soso',
                    where: 'afterEnd',
                },
            },
            {name: '网易云音乐',
                url: /^https?:\/\/music\.163\.com\/.*?#\/search/i,
                enabled: true,
                engineList: 'music',
                style:"\
                    text-align: center;\
                    padding-top:8px;\
                    ",
                insertIntoDoc: {
                    keyword: (function(){return decodeURI(document.URL.match(/s=(.+?)(&|$)/)[1]);}),
                    target: 'css;.shadow',
                    where: 'afterEnd',
                },
            },
            {name: '音悦台',
                url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/,
                enabled: true,
                engineList: 'music',
                style:"\
                    border-bottom: 1px solid #2B6DAE;\
                    border-top: 1px solid #2B6DAE;\
                    text-align: center;\
                    ",
                insertIntoDoc: {
                    keyword:function(){
                        var url = window.location.href.substring(window.location.href.lastIndexOf("=")+1);
                        return decodeURIComponent(url);
                    },
                    target: 'css;.content',
                    where: 'afterEnd'
                },
            },


            // 图片
            {name: "百度图片",
                url: /^https?:\/\/image\.baidu\.com\/search/i,
                enabled: true,
                engineList: "image",
                fixedTop:95,
                style: '\
                    margin-left:110px;\
                    ',
                insertIntoDoc: {
                    keyword: 'css;input#kw',
                    target: 'css;.s_tab',
                    where: 'afterEnd',
                },
            },
            {name: "谷歌图片",
                url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/i,
                enabled: true,
                engineList: "image",
                style: '\
                    margin-left:136px;\
                    ',
                insertIntoDoc: {
                    keyword: 'css;input[name=q]',
                    target: 'css;#ucs',
                    where: 'afterEnd',
                },
            },
            {name: "必应图片",
                url: /^https?:\/\/.*\.bing\.com\/images\/search/i,
                enabled: true,
                engineList: "image",
                fixedTop: 62,
                style: '\
                    padding-left:90px;\
                    margin-top:-6px;\
                    ',
                insertIntoDoc: {
                    keyword: 'css;#sb_form_q',
                    target: 'css;#rfPaneIn',
                    where: 'afterBegin',
                },
            },
            {name: "flickr",
                url: /^https?:\/\/www\.flickr\.com\/search\//,
                engineList: "image",
                enabled: true,
                style: '\
                    z-index:1999;\
                    width:100%;\
                    border-top:1px solid #EBF1FF;\
                    border-bottom:0px solid #EBF1FF;\
                    ',
                insertIntoDoc: {
                    keyword: function() {
                        var input = document.getElementById("autosuggest-input");
                        if (input) {
                            return input.value;
                        } else {
                            var m = location.search.match(/q=([^&]+)/i);
                            if (m) {
                                return decodeURIComponent(m[1]);
                            }
                        }
                    },
                    target: 'css;.using-slender-advanced-panel',
                    where: 'afterBegin'
                    },
            },
            {name: "pixiv",
                url: /^http:\/\/www\.pixiv\.net\/search\.php/i,
                engineList: "image",
                enabled: true,
                style: '\
                    margin: 0 auto;\
                    text-align: center;\
                    font-family: 微软雅黑;\
                   ',
                insertIntoDoc: {
                    keyword: 'css;input[name=word]',
                    target: 'css;body',
                    where: 'beforeBegin'
                },
            },
            {name: "花瓣",
                url: /^https?:\/\/huaban\.com\/search\/\?/,
                engineList: "image",
                enabled: true,
                style: '\
                    border-top:1px solid #EBF1FF;\
                    text-align: center;\
                    ',
                insertIntoDoc: {
                    keyword: 'css;#query',
                    target: 'css;#search_switch',
                    where: 'afterEnd'
                },
            },
            {name: "Pinterest",
                url: /^https?:\/\/www\.pinterest\.com\/search\//,
                engineList: "image",
                enabled: true,
                style: '\
                    text-align: center;\
                    margin-top:-11px;\
                    ',
                insertIntoDoc: {
                    keyword: '//input[@name="q"]',
                    target: 'css;.headerContainer',
                    where: 'afterEnd'
                },
            },


            // 资源下载
            {
                name: '海盗湾thepiratebay',
                url: /^https?:\/\/thepiratebay\.org\/search/i,
                engineList: 'bittorrent',
                enabled: true,
                style: '\
                    text-align: center;\
                    z-index: 9999;\
                    ',
                insertIntoDoc: {
                    keyword: 'css;.inputbox',
                    target: 'css;#SearchResults',
                    where: 'beforeBegin',
                },
            },
            {
                name: '动漫花园',
                url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword\=/i,
                engineList: 'download',
                enabled: true,
                style: '\
                    text-align: center;\
                    ',
                insertIntoDoc: {
                    keyword: 'css;#keyword',
                    target: 'css;.table.clear',
                    where: 'beforeBegin',
                },
            },
            {
                name: 'ED2K',
                url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/i,
                engineList: 'download',
                enabled: true,
                insertIntoDoc: {
                    keyword: 'css;.searchtxt',
                    target: 'css;.topsearch',
                    where: 'afterEnd',
                },
            },
            {name: "人人影视",
                url: /^https?:\/\/www\.zimuzu\.tv\/search\//,
                engineList: "download",
                enabled: true,
                style: '\
                    border-bottom: 1px solid #00AFFF;\
                    text-align: center;\
                    ',
                insertIntoDoc: {
                    keyword: '//input[@name="q"]',
                    target: 'css;.Header',
                    where: 'afterEnd',
                },
            },
            {name: '酷搜-百度网盘',
                url: /^https?:\/\/so\.cqp\.cc\/search/i,
                engineList: 'download',
                enabled: true,
                insertIntoDoc: {
                    keyword: 'css;.form-control',
                    target: 'css;.c_sbi > div:nth-child(1)',
                    where: 'afterEnd',
                },
            },
            {name: "subHD字幕",
                url: /^https?:\/\/subhd\.com\/search/i,
                engineList: "download",
                enabled: true,
                style: "\
                    border-bottom: 0px solid #CAD9EA;\
                    border-top: 0px solid #CAD9EA;\
                    text-align: center;\
                    top: -20px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#sn',
                    target: 'css;.navbar.navbar-inverse',
                    where: 'afterEnd',
                },
            },


            //翻译词典
            {name: "谷歌翻译",
                url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/i,
                enabled: true,
                engineList: "translate",
                style: '\
                    padding-left:1px;\
                    margin:-1px 0 0 20px;\
                ',
                insertIntoDoc: {
                    keyword: 'css;#source',
                    target: 'css;#gba',
                    where: 'afterEnd',
                },
            },
            {name: "百度翻译",
                url: /^https?:\/\/fanyi\.baidu\.com/i,
                enabled: true,
                engineList: "translate",
                style: '\
                    padding-left:1px;\
                    margin:0px auto;\
                    width:1220px;\
                ',
                insertIntoDoc: {
                    keyword: function(){
                        return document.querySelector("#baidu_translate_input").value;
                    },
                    target: 'css;.header',
                    where: 'afterEnd',
                },
            },
            {name: "必应翻译",
                url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q\=/i,
                enabled: true,
                engineList: "translate",
                style: '\
                    padding-left:110px;\
                    margin-top:-0px;\
                ',
                insertIntoDoc: {
                    keyword: 'css;#sb_form_q',
                    target: 'css;#b_header',
                    where: 'beforeEnd',
                },
            },
            {name: "有道翻译",
                url: /^https?:\/\/dict\.youdao\.com\/search/i,
                enabled: true,
                engineList: "translate",
                style: '\
                    padding-left:0px;\
                    margin-top:2px;\
                    text-align:center;\
                ',
                insertIntoDoc: {
                    keyword: 'css;#query',
                    target: 'css;.c-topbar-wrapper',
                    where: 'beforeEnd',
                },
            },
            {name: "有道翻译",
                url: /^https?:\/\/dict\.youdao\.com\/w/i,
                enabled: true,
                engineList: "translate",
                style: '\
                    padding-left:0px;\
                    border-top:1px solid #D9E1F7;\
                    border-bottom:1px solid #D9E1F7;\
                    margin-top:0px;\
                    text-align:center;\
                ',
                insertIntoDoc: {
                    keyword: 'css;#query',
                    target: 'css;#scontainer',
                    where: 'beforeBegin',
                },
            },
            {name: "海词",
               url: /^https?:\/\/dict\.cn\/./,
               enabled: true,
               engineList: "translate",
               style: "\
                    z-index : 99;\
                    margin : -30px auto 0;\
                    position : absolute;\
                    width : 100%;\
                    text-align : center;\
                   ",
               insertIntoDoc: {
                   keyword: 'css;#q',
                   target: 'css;.top',
                   where: 'afterEnd'
               }
           },

            // 购物
            {name: "淘宝搜索",
                url: /^https?:\/\/s\.taobao\.com\/search/,
                enabled: true,
                engineList: "shopping",
                fixedTop:51,
                style: "\
                    margin:10px auto -10px;\
                    text-align: center;\
                    z-index: 99;\
                ",
                insertIntoDoc: {
                    keyword: function() {
                      var input = document.querySelector('#q');
                         if (input) {
                           return input.value;
                         } else {
                           var m = location.search.match(/q=([^&]+)/);
                           if (m) {
                                return decodeURIComponent(m[1]);
                           }
                        }
                    },
                    target: 'css;#main',
                    where: 'beforeBegin',
                },
            },
            {name: "天猫超市搜索",
                url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/i,
                enabled: true,
                engineList: "shopping",
                fixedTop:37,
                style: "\
                    z-index:9999;\
                    margin: 2px auto -10px;\
                    left:0;\
                    right:0;\
                    text-align:center;\
                    position:absolute;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#mq',
                    target: 'css;.headerCon',
                    where: 'beforeBegin',
                },
            },
            {name: "天猫搜索",
                url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/i,
                enabled: true,
                engineList: "shopping",
                fixedTop:34,
                style: "\
                    margin: 10px auto -10px;\
                    text-align:center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#mq',
                    target: 'css;.headerCon',
                    where: 'beforeBegin',
                },
            },
            {name: "京东",
                url: /^https?:\/\/search\.jd\.com\/Search/,
                enabled: true,
                engineList: "shopping",
                style: "\
                    margin: 10px auto -10px;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#key',
                    target: 'css;#header-2013',
                    where: 'beforeBegin',
                },
            },
            {name: "苏宁",
                url: /^https?:\/\/search\.suning\.com/i,
                enabled: true,
                engineList: "shopping",
                style: "\
                    border-bottom: 1px solid #E5E5E5;\
                    border-top: 1px solid #E5E5E5;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#searchKeywordsHidden',
                    target: 'css;.ng-toolbar',
                    where: 'afterEnd',
                },
            },
            {name: "1号店",
                url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/i,
                enabled: true,
                engineList: "shopping",
                style: "\
                    border-bottom: 1px solid #E5E5E5;\
                    border-top: 1px solid #E5E5E5;\
                    text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#keyword',
                    target: 'css;#global_top_bar',
                    where: 'afterEnd',
                },
            },
            {name: "什么值得买",
               // http://search.smzdm.com/?c=home&s=%E8%A5%BF%E6%B8%B8%E8%AE%B0
                url: /^https?:\/\/search\.smzdm\.com\/\?/i,
                enabled: true,
                engineList: "shopping",
                fixedTop:34,
                style: "\
                    text-align: center;\
                    z-index: 999;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#J_search_input',
                    target: 'css;.search-inner',
                    where: 'afterEnd',
                },
            },


            //社交
            {name: "新浪微博",
                url: /^https?:\/\/s\.weibo\.com\/weibo\//i,
                enabled: true,
                engineList: "sociality",
                fixedTop:48,
                style: "\
                    // border-bottom: 1px solid #E5E5E5;\
                    // border-top: 1px solid #E5E5E5;\
                    // text-align: center;\
                ",
                insertIntoDoc: {
                    keyword: 'css;.searchInp_form',
                    target: 'css;#pl_common_searchTop',
                    where: 'afterEnd',
                },
            },
            {name: "百度贴吧",
                url: /^https?:\/\/tieba\.baidu\.com\/f\/search/i,
                enabled: true,
                engineList: "sociality",
                style: "\
                    border-top: 1px solid #e5e5e5;\
                    text-align: center;\
                    border-bottom: 1px solid #e5e5e5;\
                    margin-bottom: 1px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#wd1',
                    target: 'css;.s_container.clearfix',
                    where: 'beforeBegin',
                },
            },
            {name: "豆瓣1",
                url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/,
                enabled: true,
                engineList: "sociality",
                style: "\
                    border-top: 1px solid #e5e5e5;\
                    text-align: center;\
                    border-bottom: 1px solid #e5e5e5;\
                    margin-bottom: 1px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#inp-query',
                    target: 'css;.nav-secondary',
                    where: 'afterEnd'
                },
            },
            {name: "豆瓣2",
                url: /^https?:\/\/www\.douban\.com\/search/i,
                enabled: true,
                engineList: "sociality",
                style: "\
                    border-top: 1px solid #e5e5e5;\
                    text-align: center;\
                    border-bottom: 1px solid #e5e5e5;\
                    margin-bottom: 1px;\
                ",
                insertIntoDoc: {
                    keyword: 'css;#inp',
                    target: 'css;#db-global-nav',
                    where: 'afterEnd'
                },
            },


            //学术搜索列表
            {name: "百度学术",
                url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
                enabled: true,
                engineList: "scholar",
                style: '\
                    text-align: center;\
                    margin:0px;\
                    top:0px;\
                    z-index:99999;\
                    ',
                insertIntoDoc: {
                    keyword: 'css;input#kw',
                    target: 'css;#head_wr',
                    where: 'afterEnd',
                },
            },
            {name: "谷歌学术",
                enabled: true,
                url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
                engineList: "scholar",
                style: '\
                    z-index:999;\
                    position:relative;\
                ',
                insertIntoDoc: {
                    target: 'css;#gs_ab',
                    keyword: '//input[@name="q"]',
                    where: 'beforeBegin'
                }
            },
            {name: "cnki",
                url: /^http:\/\/search\.cnki\.net\/search\.aspx/i,
                enabled: true,
                engineList: "scholar",
                style: '\
                    padding-left:15px;\
                    border-top:1px solid #D9E1F7;\
                    border-bottom:1px solid #D9E1F7;\
                    margin-top:-1px;\
                    ',
                insertIntoDoc: {
                    keyword:'css;#txtSearchKey',
                    target:'css;.main',
                    where:'afterBegin',
                },
            },
            {name: "知网",
                enabled: true,
                url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/i,
                engineList: "scholar",
                style: '\
                    border-bottom:1px solid #E5E5E5;\
                    border-top:1px solid #E5E5E5;\
                    z-index:999;\
                    position:relative;\
                    ',
                insertIntoDoc: {
                    keyword:'css;#txt_1_value1',
                    target:'css;#TopSearchBar',
                    where:'afterEnd',
                }
            },
            {name: "万方",
                enabled: true,
                url: /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/i,
                engineList: "scholar",
                style: '\
                    border-bottom:1px solid #E5E5E5;\
                    border-top:1px solid #E5E5E5;\
                    z-index:999;\
                    position:relative;\
                    ',
                insertIntoDoc: {
                    keyword:'css;#queryBox',
                    target:'css;#content',
                    where:'beforeBegin',
                }
            },
            {name: "EBSCO",
                enabled: true,
                url: /^http:\/\/.*?ebscohost\.com\/.*?results/i,
                engineList: "scholar",
                style: '\
                    border-bottom:1px solid #E5E5E5;\
                    border-top:1px solid #E5E5E5;\
                    position:relative;\
                    ',
                insertIntoDoc: {
                    keyword:'css;#SearchTerm1',
                    target:'css;#findFieldOuter',
                    where:'afterend',
                }
            },
            {name: "Springer",
                enabled: true,
                url: /^http:\/\/link\.springer\.com\/search\?query=/i,
                engineList: "scholar",
                style: '\
                    border-bottom:1px solid #E5E5E5;\
                    border-top:1px solid #E5E5E5;\
                    position:relative;\
                    ',
                insertIntoDoc: {
                    keyword:'css;#query',
                    target:'css;#content',
                    where:'beforeBegin',
                }
            },
            {name: "JSTOR",
                enabled: true,
                url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/i,
                engineList: "scholar",
                style: '\
                    border-bottom:1px solid #E5E5E5;\
                    border-top:1px solid #E5E5E5;\
                    position:relative;\
                   ',
                insertIntoDoc: {
                    keyword:'css;#searchBox',
                    target:'css;.tabs-search-results',
                    where:'beforeBegin',
                }
            },

            //html 列表
            {name: "w3c",
                enabled:true,
                url:/^https?:.*?runoob\.com\//i,
                engineList:"mine",
                style: '\
                    border-bottom:1px solid #E5E5E5;\
                    border-top:1px solid #E5E5E5;\
                    position:relative;\
                    text-align:center;\
                   ',
                insertIntoDoc: {
                    keyword:function(){
                                var url = window.location.href.substring(window.location.href.lastIndexOf("=")+1);
                                return decodeURIComponent(url);
                            },
                    target:'css;.navigation',
                    where:'afterEnd',
                }
            },
            {
                name: "GitHub",
                enabled:true,
                url:/^https?:\/\/github\.com\/search/,
                engineList:"mine",
                style:'\
                    border-bottom:1px solid #E5E5E5;\
                    border-top:1px solid #E5E5E5;\
                    position:relative;\
                    text-align:center;\
                    position:fixed;\
                    z-index:99999;\
                    top:0;\
                   ',
               insertIntoDoc: {
                   keyword:'//input[@name="s"]',
                   target:'css;body',
                   where:'afterBegin',
               }
            },
            {
                name: "MDN",
                enabled:true,
                url:/^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/,
                engineList:"mine",
                style:'\
                    position:relative;\
                    text-align:center;\
                   ',
               insertIntoDoc: {
                   keyword:function(){
                                var url = window.location.href.substring(window.location.href.lastIndexOf("=")+1);
                                return decodeURIComponent(url);
                            },
                   target:'css;.results-search-form',
                   where:'afterEnd',
               }
            },

            // 其他补充， 这个脚本将会朝重型方向发展，如果嫌弃代码过多，可自行删减无用代码
            {
                name: "infinitynewtab",
                enabled:true,
                //https://google.infinitynewtab.com/?q=苹果
                url:/^https?:\/\/google\.infinitynewtab\.com\/\?q/,
                engineList:"web",
                style:'\
                    text-align:center;\
                    position:fixed;\
                    z-index:99999;\
                    top:0;\
                   ',
               insertIntoDoc: {
                   target: 'css;.searchbox-results',
                   // keyword: '//input[@name="search"]',
                   keyword: 'css;input.gsc-input',
                   where: 'beforeBegin',
               }
            },
             {
                name: "startpage",
                enabled:true,
                //https://www.startpage.com/do/search?q=
                url:/^https?:\/\/www\.startpage\.com\/do\/search/,
                engineList:"web",
                fixedTop:70,
                style:'\
                    text-align:center;\
                    position:fixed;\
                    z-index:99999;\
                    top:70px;\
                    margin-left:257px;\
                    background-color:#fff;\
                   ',
               insertIntoDoc: {
                   target: 'css;.header',
                   keyword: '//input[@name="query"]',
                   // keyword: 'css;input#gsc-i-id1',
                   where: 'beforeEnd',
               }
            },

            // 回家没网,用8090端口离线测试使用。
            {
                name:"test",
                enabled:true,
                url:/^https?:\/\/127\.0\.0\.1:8090\/./,
                style:"\
                    margin:150px;\
                ",
                insertIntoDoc: {
                    keyword:function(){return false},
                    target:'css;body',
                    where:'beforeEnd',
                }
            }
        ];

        // 搜索引擎列表
        var engineList = {};

        // 有些图标需要重复使用
        // icon = {};
        var icon ={};
        icon = {
            google:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD1klEQVR4nMWXbWhbVRjHf+cmTZq3hU67tcvmaql2L2q3FdTqkEodTESZ+GEKExX3YTrRyhCmMnDgCkP8EHwBnV+UMRyIiGLZLG7TMq22MsegOErrSmnarFub0CbN6z1+KLnNzb1JbmLF59M5T57z/H835zlvQkopqcCklBQbIoRACFFJOoQVgJyooiiWkqqqahmmJEClwtWAFAVQVbVq4UpymQIUG5CdmiR5/gfSl4bIjI+hRiMgJcoqP7aNzTjaduDs2o0tsMEyhAHALDA7HSL26Qck+89BuZIRAueDnXgOvIatYV1ZCB2AWUCir5eF4HFkYrG0cCGHy43v0Ns4O3eVhNBaZsUW//Jz5o+/U7E4gFyMkxr81eBXFEW3jO35APnVmujrJfbZR6bJ7c0tOO59AFtjAIQgG5okNfgLmdERLab2sSfxdR82h8vTEnLJdOLZqUnm9j+DTCZ0A22NAbzdh3G032eaODU0wPz7x3Du7MR78JBpTCGEkFLKwnmJBV8l/t2AbkDN5rvw9wQRPl/pxPEYwu0pGQPLtWBYBXJxjGz/FuLnGkkO1QOgrL6FuhOnUPx1ZRNXakrhNiDDp8Gm4t41iWfPNYRD4nnx4H8iLqXEXjj/cvaC1nZsjmAPeHF07V5xcQ3A4IwN6/q2O+4HuyFMs66emGXBI3ucdG7R5zLujekZXVe4WiwLlLNQxLiLrsxpY9FSGSsANfW6royPGEKqNY/TeCwbJld4tyJnw1p/OjLMGjVDjWJeBz++Zb7m/55R2X9Cv4Wv9RsBlMLLgqh7WGufSa7n6VAzvdd+MhUpZb+PZg2+Oxttei0hTADW7iWNnfcW7uHo/A4S2Pj4yiluJiKWxRcSkq9+S+t8t92q0FDwDwghlmpAVdVlp6uJTzxv8nWiSfPNJqJ0/9xDNDVfVjydhXe/STIb0xfco236KcxpKjmSfNt79wHc9lqd76+5MfadfYP+0B9FxUci47z0/WkGx1I6/2qP4PHtegDdaZgjyj+Qzoz3c2QgaCrUtCpAR8N2NngbEEJwffEml64Pc/nGVSQSW6IFd/gVRGZp+z76VC07W5fnP19LAyjckgFOXv2W4J9fFP3iUiayPlzhl3mhvY3nH3LofsvX0j5ZCKGrBYB9rU9wrON13HZXxQCKPc6zj0wZxHNXdU3XyqV0On6DDy+fpG/iIqqFh1T7mq10b3uOTXXNBvGSl9JSgQBTsRn6Ji4yGL7CaHSCuWQUKcHv9LHRt45t9ZvoWt9Ba93thrGWr+XlBlRjFT9Mcva/Ps3+DciKPU5LwZgmq+J5/g/N4OUGvdHwnQAAAABJRU5ErkJggg==",
            baidu:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABpElEQVR4nKWTvUtbURjGfzcf5prqEBFMBpWCHUIVISKRoIgQ3QQRRNBM1UHqX+AiLg4uQpeCiKigIkIkf4DgYAmVQBDEL2iHVIsfaGpi1Nxrck+HaGLMzSB5xuec9znP+5z3lYQQghJgKKW4qMDW9gPNbaf4AwkA5hbiTE1HSWuFd016AhubCZ6eBEurdzgcJr59vwXA45bp8VqLO4j+yzxhtWboKpuB8/NU9vyF13UQ3lPwjVzibpWZnLAhWySGByupqzWxG1JoaizjU4OZ4G4Sj1vOKYhnzMxGhdMVEU5XRPz6rQo9dHSfCacrIlbW41ku68lhz5iRLRLV1UYOjlT6hy4Y8F1w9jdFUhFc36QBODxSC1sYGqzEZjPwsd5MLKbxZeyKu0Qmk9HxK9YW7XjcMqGwgrcrF6T0dpCub9L4Ri75c5p6TdP0uYzl+Rpki1T8F2JxTbcYYP9AZfRrzpWugD+Q0C1+QXhPwR+4Ly5gNufb04Om5a9O3iT29X5gJ/jIj2CSuloTne3lGI3wM6RwfKLS2mJhoL8iT6AgxPei5G38Dx7mvwaRBxETAAAAAElFTkSuQmCC",
            bing:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4jZ2Tv0sbYRyHX5Uzl8bLVNrSToUOHbr0T2gHqf1Baf8AvcUruNcpd5e75BK9H0Q9gptCogZKh6J2kWtDhkpxkmCwOIidijpYECoI5unQNo0QauwHnuUD78PL9/2+on9w0ItrWiSraiSNjER9w8NRTFUjuQvimhaJuKZ9ThaLJHyfGzMz3AxDRC6H7LooQYDi+50JApJhiJBVNVJ8nx7TZKhU4svhIYX1dW4XCsRsm4FstjOOg+K6fwXCMHiysMCfvKhUELp+OcHjcrkleL60hEil/l/wslKhxzAQuk6vaRLPZC5/g9dra5jVKvdnZ5FtG5FKIVkWSjeCB3NzvFpeBuD7yQnvd3YYW13lztQUsm1fLHhUKnE1n6e+v0973mxtIaXTJDKZLoY4Ps71yUneNhqt/uPuLrJlceUiwcP5ea5NTJCt1fh2fNzq321vI6XT/xacNZuUNzdpHBy0Dp41m1Tqde4Vi/RbVucZPG1bpPbU9vZ4triIlE7TZ5qdXyFmWdzyfYobG/w4PQXg69ERYysrKI6D0PXzu9Am+KAEAYrjELNthGEwVC5jVqvcDUOErv/6E45znlwOxfMQ8ujop2QYorguiueRcF16HQeRzSLl8wz87hXXPY/nkZye5icfi28JEi0cegAAAABJRU5ErkJggg==',
            edit:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAACDklEQVR4nJXVzUtUURjH8Y/mSNKkki2iwiApxHQ1q/6C+gusoCB6oxbRRqFNL4sWtRKqhVSLIDe1CqpNiwjKIilKLKKFEr2Z2qI0xxHN0+LOm+PMOPOc1T2H7/f5ncO991BdNer30zmxKrl0xV2zKJjRoy6aqkkvbbdVLPuUq+8+5uGXnVILki7qsxgtNDtrTNLcijHvrdYsft0/wQ8DZgSzeqMUDW4IJceYHcvwCd1ies0KZvWI1TnhIH6574Olgg0E74zmhZ902j304by4Cxp5LPjtQNmjy3XPVK2rgmCBCcGgdVXhdBgUBCMEwVMNVeIvBMFLifKC8vgrndFBlRJUhJcWFMd3ZfGuzFRxwWrdu3KTxQQVhi8lqApfKVhf0d4bc2/OckG9Pkur7r3TEw+1FRO0GxdM2Vc2/HHBgr1If935UTfigbt5+C27MeSo9+m5GJYitlCwWR2G8oQZ/FgWX1aFgnZMG852v5nFR4rhMn+2dDVJYFpKqy0SDksUhF9FsE0bWgyIa9bIanihoEUcDTrSz4ueOVMOLxQkzVkrZcaoNz755rmpcnihYNghm3w26Ys/5cGcIKgRBJDyqCIquj8C1PqKZvHK+qVrJ5bMRwmGterU64pkkZupWO3RjXkzUZj9+jVZMGK6IsEaHTbgjpOSUYZL/pa5m4qPIbtyznpHvJaqGB53O33h4T/3VzLuzDhE6AAAAABJRU5ErkJggg==",
            del:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAADAFBMVEUAAADsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVH///9VVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///8dej9TAAAAU3RSTlMAAABm7P/sZgAAABPO////zhQAAB/i/////////+IfAAAe4fvk4AAAAAAd/+Q3GxwAFR85FQBjz+LPY+v////r6//////rZM/h4c9jABUdHRUAAP0EcPoAAAEuSURBVHic7ZRnc8IwDIbdEUZHGB0kDsMOMcOMttBBB93Qvcj//y9VjB0Czh13/dz3ixT5OVmSYyMktLK6tm74oYxEMpVGUW1sbm2bM8DMZHP5OWBnd2+/YNnYAWHbKhRL5cocQKjrWFWPuSDmVS3HpUQu1eoNQkiTM9xqd7oHoG6n3cKMNyHcqNfQ4VGPUsr7nh0FbK/PIdw7PkGnZwOZNrqF9AfnF+jyaigLixYp/eH1Dbq9u4eAHyOAHh5HaPz0DCnjANjm5fUNvX98QoGCxyo5Fjmh0K/vH2hzAi0KnqnymMgJrU6gzemQBM+DZpX1/XBYUyAYTTAuZTUg+Aw8Zf+BvwJLR730sPTjXgD0H2YB0BUClXKpGAeE1y+fy2ZMfX12gdOpZMLQAfkE/AL7e5vGZF+dOQAAAABJRU5ErkJggg==",
        };

        // 网页搜索列表
        engineList.web = [];

        // engineList.web[0] 中间的数字表示排序(数字不能重复,否则后面的会覆盖掉前面的),越小数字越靠前,小于0该引擎不会显示在页面上
        engineList.web[0] = {
            // 搜索引擎名称
            name: 'Google',
            // 搜索引擎地址,关键字变量用%s代替
            url: 'https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8',
            // 搜索引擎的站点图标
            // favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACyElEQVQ4jXWT72tTdxTGv4yN+cY/oMFGqQpD7ZjtsAF/oPEXGFhtbUEn4mSTatSJVua0UNNSEG/01UAH0m6dN1hdW5SbrE3sgkr1hb9lRTFW3Upqcy1NzE1yc/Prfvaia7dM+7w853keznM4R4h38aHdbt8gSZJbURSv3++/Jsuyp6GhwWm1Wsvew/8XNptteTAYvMEMiKjquMvlahVCzHpHXFdXV69pWhLAHHtNSm7nbdMhYo170U61kLkZnDZSFMUrhJg9La6qqrLpum4A6FcuM+5YReRTK5HyUiLlViJLSolULiB2eA+mFgdAlmWPEOIDIYT4aHBw8DaA3tODavuESMV8orvqSZ7/Af1XD/HW71HXVKKdbsPUU9OT1NTU1Aq73b4BgPhLJrYtY2zxQuKtxzATWlH+/MvnYJpFtUAgMCDcbvcZAHOkjXSHIH50LYW3iZn2WIRoNBoTiqJ4AfIPq8n1CwrDB4pIPw5kcP6k0+hJ0+hJ8+0vaU5eNdCzk30RCAQGAPL311PwCnjVXGSw+7zOvIMa5UcTVDQl+Ox4Aoc7yfg/QwpZlj0A5pNvML2Cp/d2FhmExgrceZHn0Z952q9nqGhKsONsCiMP2Ww2J5xO534A481V3N1lLL24md/Dd96b2dWdZfF3Gi29xqR5KDQsSkpK5kaj0ZhhFtgVbKOkfTUru7+kK+RjNKkSzyR4FgvRHOzn8+YJVrakefxXHgBJkk4LIYRwuVytAOHUG7b2H8basZr5netY2/sVm737WHZpC3M6VrDk3Aku3Jq8g9HR0TGLxWKdOsaPfT7fbwBaLsWZBx1svPI1i+RNlP28jsquLWz3H8E3cg0AwzAyDofji/+/w+zOzs4LU3mTZprHE8+4q/7BcGJkeg/hcPh1dXV1zYwfWVtbW9fX1+dXVXV8SpTL5fJDQ0NPJElyWyyW0v/y/wbuo60BpWkyAAAAAABJRU5ErkJggg==',
            favicon: icon.google,
            // 搜索引擎编码（默认utf-8）如果跳转后乱码可以填写 'gbk'
            encoding: 'utf-8',
            // 新标签页打开
            // blank:true,
            // 禁用
            // disable:true,
        };
        engineList.web[1] = {
            name: '百度',
            url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
            favicon: icon.baidu,
        };
        engineList.web[2] = {
            name: '必应',
            url: 'https://cn.bing.com/search?q=%s',
            favicon: icon.bing,
        };
        engineList.web[3] = {
            name: 'DDG',
            url: 'https://duckduckgo.com/?q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADiElEQVQ4jXWTfVDTBRjHn+uyi8KAbWz7/TbeNzeUeNkLCljGS3hrspDUsC7vqivz5cI/OtQ7vSxNrpvdkQx0k10M5FYgztECgfOoM7kurs6IFx1ja7xsgMiLAySDffvDtLrs8/fz+T7PH8+X6BFIQymxOGb1WyWy8COH13LL9svCSgtEoTt4RMyj5h/CIRKfSImsMKu4NrOKZ6vZwDafz2Tbajaw9ur1wibzemHj+7Lwo0S06j9yYtgqRX0m216lFDS0FCR3Obcl3/FvFmJCFwt/0Rr0aOPGrVlsuymduVShEljDiCL+3hxCUbWZTLtBwfuqXyeZCThqsTTUj0BrPUZ2psGTE4mxQilmt8twLT/WVaUSXvgsjW8hoseJiOhYUuTpSqWw8YYmPjC6JQ5TtXqsLAYAAMu3fLj9eSk8eQw8OimmXpGjMzfWaU5nv94RvfodkoQ+se6cmm2+tDGqe1Ijxm+HXsd4IIi5+WUAQBDA6MRdePdq4c4Xw12wBlNFifginW0tTxN8Sa9Gh+02qlh7v0ayOJTNh8d4Ev7AMq4P+BAM3g/4rm8KvdVn4H6exWCOHMMaOTqzY1wGJXORDkg5H1ermZYRnQyubCEG9R/Av7CCsnOd+P3eCgCg68YCbnZ0YGyXCLf0AowfjML1PMm8UcHaqVTOO1WjFnWMFMjgyhWjZ48OC3/cPx9YRnD6POArAoZSsfT9k7jTEIHR/THoyZXerVYzLfReQvjRs0qRw7NFBmd+HH4pTMXk6Mhf/jTg4WDGRBjex4f33Th43ojHoEaG7nzJXKWSsdHLwmd2VSmE9h9flMwNaqT4NSca3mudeMCs4xDGj4fgdiUfc1YOJssF8OpkcGTF9FUomIvEIRIb0li7RSX+dqxAjt6NAgxYDA8Dpq116E+JhHdzPJxaKfpyZBjWymFQsPZPkvgWIiLancA9Up7C2K5sivd6XxCh98MS+JYmMDzvxqJ7AN2FctSVKtC9dS18LyWiXh3dZVKK257jPaV98IxPn0oWNpYlCera1cxN/55itLpt2H45A3uvbMObjiy89pMWP7ydioZk0dXyFNZWIuGW/asLoUR8fZLQenod325MlzsuXLVMHnMeRIXrLC67G4OHP8roPZ4hajI9y7YdSOB9+n+FfKw4KmLfSUlEbdPOvJ9dJv3sUnMTZmqM9yypsd+ckHLNm7ghW/8p/Alp3+8i87OHIgAAAABJRU5ErkJggg==',
        };
        engineList.web[4] = {
            name: '360',
            url: 'https://www.so.com/s?ie=utf-8&q=%s',
            favicon: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVR4nIWTvWtTURTAf+e+GpPWRFptmigIDhWELo5+DKLCMxZEJfVjEhTqok4O/geik2MdOuhUm4ogpTS6iNQoRV3sIOqQgpiX2NKEprH58B2HvMQEUnO3ezi/3/m4XKHD2fvywrCr1oirbvWPuh9XYs8znfIApPUSmR97KHAbaY8rVIBxx0487iz4ML4tsrrmCAxsVckTpRw7cbQ1ZgCiq2vLDViVSatAb8ZOSMZOiEttCFj0qh2Jzo8l2jqIJOM3BJmowxJ3Tk8/61Q9koxPCnINwHXN/mzsaRrACDzwcl5vBQM49sx1VDcARNxHLSNIqG51b/5vfgAVuV/vm+NtOwAI6sb3rgKVhTqP75+gpvTlK2SswM5ughoa9a9XQdGmYKK0pF9CKZYqi7e6CT5XF+5+63vLlcKP5UZMirODUz1GLgFsL2pQLv4qdoLLc7sPKeYTQEnN1YFR5wmA6DS+8o5wuT6jbmLMwUAsm26Ff8+GT4nhFYBCPnAm19/sAKD0InzY9JBqEspPRd8g+FE5IULIg93NcnmXz+c7aYnMqOqUAeg9m3unRofVe2eEPSJyWZBzDRjVtN+SUP/5Qt4S2efVP9D2aQBKc4PHBO6IyohCVeA9uPf8oytfW/PWk0PhoJ3NdVt81/MXwby4bACYqGIAAAAASUVORK5CYII=',
        };
        engineList.web[5] = {
            name: 'yahoo',
            url: 'https://search.yahoo.com/search;?p=%s',
            favicon: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAG7klEQVR4nLWX36sdVxXHP9+9Z+bc8yNNcrG1RTEFkwhtLQVFCwWrVf+Biu9RAvYhrQUffBSkT4IaC62gxYq2DwX7JCoWRVpFaWlioS82TVNigtY2jTdNcu85M7P38mHtmXPwoQ+CA4fZs8+es75rfb/ru/fRPTxiXbz8IkovIH6XOz3/MidX/B+uT/LwpKrjvWb6gln+TJ22P617eMRa3qNmhmEI9StdvqjA3ye64UymP6uYXkt5dbbr+gunefzK+wd5aF+sOKQYD+dsRzA72tjBw5bDrRgfNnKVaMl0NOxH9/CIJVoiNRVzRKDjOpmWTE/FDAmWXEIYGZJkHbA35UYyPUYi0zWZbqux7QgZwwAwy0zYxsiISMu/6VkCUDGjAkrwBZGaGTeRSbTseEry25YOYiSMFI0Us/qthgWGlfmMWSJqjtGTSUSbgIyJbQOwx7tMuYmWHVquFhBAxZw5HyzxRMOCRnM6rhUA5h/JaSqgnDK8LoDJCFY7avObEKLCSGzZQVquULGPnr01gCHNiikNC0yeUaMDPH7mXhYHa6b7Ij9++FWe+9H5AoZSZoegEvS+Y4f42mN3snul49rlnq/f/ieiGrIlOl1HJva4TGRKpic4BQ0VM2pmVJpRs6DRPiYs+OlD51hs18Q68JXv3EET59SaUTGl1pRGUxrNqZnRhDnHv/9x6klg/00TnvrmOWrNiEypNaNmTqUtpnyAyBaAAxChfCKBQFDlY9W8+tw1zr50DYDJPHL8B7dRhS3qsEWtBbUcUB1mHPvubWztiwCce/kar/56l6gGFc6kiBCBiDz0UIHauVLACXYQQZGgyMkvvU5Orur7jt/MDdtTghqChMqaxYEJX3zgFtdChu/df5agUD4RZBiZrESrq7S8twbQsyKrJ9NhJFDClMiuenbeXvHCz97xF6I48fQRKMJDGQNOPH2EWHmmf3zqHa683Y5ahORVUCZQEalBtgYwCnF4wYdIQvKiPHniTdpdD3r75/Zz6K45lIJ95M4pt9+3H4B2L/PkiTcRhil7IJX+KlR02mWAFihtVMwElEi09GrJrMhqSbTknHjmW+dHuCd+fhTJQMaJp46OrfmLb5+n6zpMyRtVPYkVvZb07NFrSSCOrRuGMrqjZRJdaauNdhZken77+AUvLXDz4Sl3f3mbT92/zS1HpgBcvdTxm0cvopCdPjmlWdmTK+3u3sDaB4xcuOwxbdiowrhwSPGJB8/wjWfuAODYySNsXj956AxJ7YjaTBgia4VZ5w6pJclaKs3pbTVooNipjExXBNmXcUfPEitzp371Fm+9sQvAbH/FbL972b/O7fHSL/9Z3htE3JO1GueyeiC4rkpqowYyyblib+SqZ4/EkkznYy1JLHn0q6f57+ux468UB+0wdSRWrh0ciKkHrMx5MhsArGwgLetnKzvAoOL1zLm/7nD21M4Y/I3TO7x+6t3yo1ZEbQVQX2byBv8C4oYIcZGIqmS8IrHCWJFpSbbOKNGR6PnLsxdHAH9+9kJZ4/t8piOxJNmSniW5bL9D9j17RZRFhCKSsbEsEMGKGeBCDAQwwySwTMppBJCSlxkr+6YNafWDnEnWMuyqIpJYEmgcQE9LZItkLUGRZBAkMgEs+dgMSSRAprGkAKqMZGsAQiTzds7mM5lMtq5oPhCo1xVIXMNs7sq15CAQMncv2xj7HZrpWoCTWRgzNCtNbGsNySoGb0nmgqYA8xORTcnqCqpM7+EJFkrQcs+uGpmYLOIIoJoIM+8kMCwPIIp0rRsrNrRkzy4Vi6ECPaH0PZZ9L7Bi9BYIkiOWCNnnFWxNQW30rHxNCTpWwEqbG1jRiesubIrQOzSbe7gMpICZ797GuvxZAUxMF9UIYLaosZzX56MxeAaDPNKSSKQRxAgg060zBoIFIGPy8A6k7Gbm9MR6/SOKmcSyWO/6eDZ0Q6IvYEIp/3L8rgBIBDJmvT8plGNfKNJx65BFxyijmojVrqu6mUZ668bAyVKhoSC0iJmRWfkxwBhbfvxjEqgI1Jhy2QmDO4CcDrkwBigIkdWNz1i5F4aHljMDWQ0YvS2B4FTT0XBgOBUPZumlklzpSQGZ18EFKReSoyLbGoCRNkBknxtO81AAiWwrX7upgbX7d+6K1nvWljG5iGQe1KujsYyDTzqIzjMe1T9Q4DZvAzUwtuWoAW1I0+gx895gKGx5NOjBOhGWVt4sXzdmTISqMfSGNYselZOQg9gAQNkNCxUtSv+oQnU+K/1N0hsh6HXL+bWu6y6e5odXeZ/rEzw4j7UOhRCPWs6Hs9nHMD5qmVvN7EOQGl8ZNkQYL70o2R8Qv2+768+/whPd+wX5X6+7OF439fxejM9n47OTdOPd/wHi0RkhxZ/TiQAAAABJRU5ErkJggg==',
            // disable:true,
        };
        engineList.web[6] = {
            name: '搜狗',
            url: 'https://www.sogou.com/web?query=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGRUlEQVR4nK2XfYwV1RXAf+fO8HZ3UCwM2a5bWNS6+AcYBYSW4LQbqLR+FHb9woBRMcY2aUzaGhsbm9SQ/qFNP9K0f2iN+FEJ0I2gFLRFQWF0/Vjxg9g0fKmgYlkcimsdeMvOnP5x73s7+3iyG+tN3rszd84953fvPffcc4VRljQKm4HvAwuA84GzgbHu82fAe8CbwFZgYxAnfaPRK6MwPAO4C1gM+KPkzYB1wD1BnLz+hQDSKBwP/Aa4udD8MvAU0APsAY4CBjgDaAfmApcD3yj0eRj4SRAnR0cNkEbhRcDjQBugwF/caP51qtEU+k8D7gSWORsfAJ1BnOwYESCNwvnARqAJ2AvcGMRJz2gM19H1TeBR7OwcA64I4mTr5wKkUTgb2OaMbwauDeLkky9ivKDzDGAt8F0H0RHEyasnAaRRGAJvAy3AP4BFQZwMFJUdW9BcQqQRYYyIeK53BgyiDKhquemZQ3kdiBLwBHApcBC4MIiTw7UAa4AlwC5gThAn/QBpx8TxYsxPMXKDGGlDACOup6sV+6coue5BeU5z3USum5u29pWd/nFALzAVWB3EydIqQBqF84AXnKo5QZy85owvFGNW48kEMWING0HEGZbCCqpaBlXI7U9z7SfTDZrnPw6e/zhxzv0KdufMC+Kkx7jud7r64arxb08cJ8asqxr3BPEM4hnwBXyDeIK4Gt+2V2U8QYyMw5PrxZjTAZzuR5ytXwCYNAonYfcuwL1V5zAyFSNjq8aNU2pBHhDPtOMbr7TugOCb8eKZi8QzPxRPHsOTI1V5O2ufFVziXjfT30ujsM0HOt1S9ARxsqsqZuS0yrQPU+YZMLKm9Nf39lZES937jwI73O/+ga7JnkKHYJao5teIklZkgzjZlUbhi8DFQJcBvuW+baJYRD6pOpwZMi5GEE+6Tyw7564T13+9hTqltP79rOHJD7Y0bPzwVoy0IEMANbYiH7jQvbwyHIBdGPlYRCYWQfAEjJkgnvwKkbsHb2rfiLIK1U3+o3uP1cI0bjpYrsNYiQMXGGy4BdhXlGh65lCKsBihDxEQsU4v1g8wgvjii286xZdujBwevOHcNSeWnhPVm5Wa8o6r2wzQ4F6OnkT/1Ec9CNNFeBAhQ6QaA6x/GOcTBjEyFmEJRrafuO7s1waumTL/FAAVWyVTaBxTT7Jhw4eHS+vfvwU4D3s6HqkGoAqIey7EtVnAloGuyd3lRZMm1FFbtWWsQgCaT0FMqXv/vjFr3r0D1VbQK1FWk2u/ZrkNPNVoqLaDra5Gdfvxy1obatSd5eojBnuuA0wrShxf2HL68UvPLM6QRV/1Ttl/ZO96b+XupZppM4P51ZrpNs10CEQtiGOZhuolNWraXb3PAJWMpaMooaqzUF4vX966qLx4Ut28wX9od9lbuftx/6HdHeT58gqEFkHsc3tN14td3WuAp91LZxqFQymXaiOqF6jyJLnuLHdO/tHAVW2fu0w6qE+TK5Ul0cp5YEGyilwahR42+AH83ccevQlwJrAIm8tBToOKIqKoMF1E/6Twx4Gr2t5ApAcje0Tod4qmaJYvs6NVhs2ErYciLHQ5Wwmw2Q/iZCCNwj8DPwdWpFG4IYiTQXL9r/Vudc6dAyKKmSmiM1GxfiYy5HiVEec5ZNVT8S1yfa4w+l86kPuDOClXnOzX2L05DbgDoOn5w1vItV3z/B4y3a+5G1mWo5mig/Xr6vdcMzJ9QPO8o2lLXyWxuR2YDvwH+B0MT0iWAyuBQWBBECfbi2t8fGHLDIzMQ5iNkaki0gq0Ivhuy5VVtY9cd6JsI9e1jZv/faCgfxbwEjYG3BLEyYPDAJzQWuBaoB/4ThAnvXxJxeWGbwC9QZwsqbTX7vPlwIvAOGBrGoVdXxaAS27vBm4rtpsaoRSbnDwLnAasS6NwZRqFX/1/AdIovAS4j0LScxJAgfQy4LfYcLIc2JdG4R/cOo5kaEYahVMK7yaNwtux8aYJaHa7ARjhbphG4Vzg9wy/ah3CZj47gTLwKTAROBd7NfsaNrrOBWZjvX2O67sKuLmY7o94OXUg84EfYJdn7EjiwN+AfwIrXNunwM+COLmvVnhUAAWQRmAmMAN7on3F6TgCHMBez3uDOCmnUdiATfV3ACuCODlYT+f/AI/5j7xJD7XhAAAAAElFTkSuQmCC',
        };


        //购物
        engineList.shopping = [];
        engineList.shopping[0] = {
            name: '淘宝',
            url: 'http://s.taobao.com/search?q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jaWTsRGAIAxFs4Gj0DgGtTtQOIY7sAO1EzCOOxgLiCQRUfTf/TtE/zPBCAAAGAPiMvU5BgQRJjkj1zfe7JAguEw5tKfQPBYAX5NWn/YzpADmsQRWLyHcdP8C0IGa+H4TUGtFgy8AZ2Tp3RVwgH7b6wpaLfw6g8cWuGpnwStErHxG/aA2Vw4XQAxpLBtj2xxl+h82OwgQXd/5DGudpX0VOtMVPgBRELV9pv7F+wAAAABJRU5ErkJggg==',
        };
        engineList.shopping[1] = {
            name: '华强芯城',
            url: 'http://www.hqchip.com/search/%s.html',
            favicon: 'data:image/jpeg;base64,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',
        };
        engineList.shopping[2] = {
            name: '京东',
            url: 'http://search.jd.com/Search?keyword=%s&enc=utf-8',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoElEQVQ4jZWTW0iTYRjHdxcUfrPZtq+cm25LxaQSQ4tO2IkKO1yEQVEERWJFYUQJQQUZUWQG0QGKIgoCS4pVBlKapH6fztNsW+zQZnOW5GGyxFkQvy4+LbUguvjxvu//efjxXDyvqmCaUFymFitKBf1/U6YWK1TlgljVMzsNt96qoLPi1lqUc/w+zng21tsjpqEqFfQVbr0VWWv+CykKsxSkhGQkjUl5a824ddYJglkpyDoLrRm5dK7Kx25dSEdOHq5NBQqbt9OxZA3Nxnm/hJMEUkIyTeJcfPuPEKmuwb11B+ErN4j5Aww73jHc6eRrcyufb96hMy8fSWPCNUmgMdE0O5Wuk2f51tODd08R/bYqYv4AwZLT+IqK6Xv0hNFQNwPPXvJu7RacmpQ/BcGSM8QCQTy7C+mrtBF5VUd71jIapou0ZuYSLr/G974+ui+U41Qb/y0YelOPY+k6GuMSaZwh4li5gahsZ8D2Ak/aov8QqA1IGhOtmbn0V9oYfFWLPydvikCcS/DE6b8LBANSvJH27BUMVFUz+LIa34KlYwKdhUbBgKyzEDp/mdGPITw799FfaWOo9i0dS9bQMF1PY9wcvHsPEgt00Xv7Hu7EdFSlgrbifVIGbVnL8OwuJCrbGXY4cW7cRv/T50Rlu7IDi1fjP3SMaEsbI14/nl37ccablAm6Vm/iy8PHjHj9jPj8dJ06R0t6NpHqGn6MfiPyuo6hunpGvH6iTS0Ejp3Ebp6PS2tRBMHl6wmXXeXT9dv4DhylJS0bSZPMh8PH6b37gM+37tF75z6hsxdx5RfQbMxA1pgmbKLWjKQ2IAkGpPgk5IRkZK0ZKT4JKS5RyQWD0jPT+Kvu1llRXRLEqrCYiktr+c3Yr5uUTam5dVbC+lR+AkXUXUZHV2HdAAAAAElFTkSuQmCC',
        };
        engineList.shopping[3] = {
            name: '亚马逊',
            url: 'http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVQ4jY3QT0jTYRzH8a9d0m1M8rbMZklQbjRDOpSnHXSTjpFHvVgH0UODwShJWn8gGXXRi6Q1lIpfWYwCYZkQwWqHdhrYH/UwgxmzGU5sv7Hf3h3CJ3U5+sJzeL58ntfzfR4REbHZbPZgMHhL+8+ampp61Nvbe0lE9ondbj+SSqWW2VWRSIRAIED/wABjY2Osrq7ujhAOhyclFArd3d5cWFzE4XQiIjuWtbaWN3NzZYhMT08/39qUSiU6PB5EBLPFwp3hYYaGhqgxmRARvJ2d5YCmadrWxjAMfD4f7e3t3B8fVyG3242I4GppwTCMvYHtFYvFGBkd5bLPx2G7HRHhRHMzuq5XBpLJJGfb2tTbzRYLFqsVEaHZ4agM5PN5TrW2IiIcrK8nGo2ysbGB1+tFRHA4nZWBRCKhbvb7/Sp00uVSE1T8xA/xuAI6PB4ymQzjExOICFVVVVRXV/N6dnZvYD2X42hTk0JqzGZEhEMNDap3PXjzX0BJNeLxOG63mwN1dTQ2NnJ1cJB0Os2Fri4CgQCGnoO1edhcUcBT9Hn4dA8K6wrK/syhF4plb+b7W4hdhPc9CngGRfg8AjNnIHEF1j4Chb+HjCJsLsPSQ3h3HpK34cvoH6Cvr69fBX8kYO4cPDGBZoaXx+DVcXhRD5oVZk7DtwjoWeAX+XxeFxHZHw6HJ3fNCZnHsHQDFq7BygMwvu5IZLPZte7u7p7fLX31eStakCQAAAAASUVORK5CYII=',
        };
        engineList.shopping[4] = {
            name: '闲鱼',
            url: 'https://s.2.taobao.com/list/list.htm?q=%s&search_type=item&_input_charset=utf8',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jaWTsRGAIAxFs4Gj0DgGtTtQOIY7sAO1EzCOOxgLiCQRUfTf/TtE/zPBCAAAGAPiMvU5BgQRJjkj1zfe7JAguEw5tKfQPBYAX5NWn/YzpADmsQRWLyHcdP8C0IGa+H4TUGtFgy8AZ2Tp3RVwgH7b6wpaLfw6g8cWuGpnwStErHxG/aA2Vw4XQAxpLBtj2xxl+h82OwgQXd/5DGudpX0VOtMVPgBRELV9pv7F+wAAAABJRU5ErkJggg==',
            blank:true,
        };
        engineList.shopping[5] = {
            name: '值得买',
            url: 'http://search.smzdm.com/?c=home&s=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVR4nG2ST0iUURTFf+d9g2V/NKSgRYSriLCZ0jLie+Gi3LWqoKCFEYG0tHBTREgQSLWQCIRoWVCbKKKC/oD0fVGG5Iy2KDCiRQTBUBJh+vluC2dkHDurxzvvnnvuuU/U4H1X17ooy16Y2QAAUgfwEedWyawH6MknyefaGlc9FON4CFiH1C7nHkjaXEjTi5Juy+wm4Amhpej9rWUCRe+v5NO0L8qyu4uMdB3AYHZtFDVKinHunaBY8v7ZUgdmW8e7uppcLre/ShgMAwh2T2fZDzNLK9RQMBsoen8EwI3v3dsm6eDOkZGfYX7+PmZfgIvAyep0SI8Nphe7Sq8E3QDORdFEzUgHkFqBAUEGQAinsxD6CknSXDs7Zm8n4vhQNcQ/1CGfJKtL3hvSnpw0Vs8bDJnU7xbyUnfJ+zMG56sPJuN4s8FVpBOSNtYLSFpj0OkW3Nh34FqUZcOYXV45O9scYFAhTLlyeYXB14rtl0tEwDmgAEwBtL15U0Y6t2V0dBrp2Bw8DC0tf4EblZrbdUYm3fYkmay3V/T+iEGIzDKDe4LBUhzPVbJRPkkEFAL0C6DkvVVquw0OyyyYtB44YHB8R5I8Le7bd4oQLlXzMLOZQpo2OgBXLq+oJNvuzO4ibSokyVGg18GTkvcms5s1YfZGudyGSg4L+NTZ2TTT0PArnySqcbR0dWa/JZ2dC+FRx+vX35YIVFHyfgJoq7u+Y/ABswuFNG2s28T/UfL+gZm1CrYBz2dnZg7vGhtb9uH+Affd7MpRvsLpAAAAAElFTkSuQmCC',
            blank:true,
        };
        engineList.shopping[6] = {
            name: '当当网',
            url: 'http://search.dangdang.com/?key=%s',
            favicon: 'data:image/x-icon;base64,AAABAAEAEBAAAAAAIADzAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAbpJREFUeJylk0ssXGEUx39zZ+a2g1QX7DxjMwzKJF2IR0iEWIxlV6KZeGQaEhZWbHRTsVCPJq5IG48IiYiFErZNmngUCYmgqGBFMljWq2Nx6l7XXAvxT76c73z/c/7fOd/DBhDyuqcAH0/Dd9vqVrmiJ794CZ29Bp2TB/NrYgHiEqBLA5frLsIX8rqnFH3nji9QUATdfULn5oOqQkys+K2fIL/Q4P+LKPq0vgaWF6EhIL7TKVZVxVZXwMoS1L439WELed0h3XM64eoKJqYhOcWI2tyAto/we0v4e1BMXm0drGxK8p89aGmCo0NI9cDwuLTwAEYFJWXQ9hnOzyDgh51tI8qTCdo3iIyCdz7Y27UQcDjg+jpsBx2JSTA5C1oPfNUsBHLy5OQf4uYfHOzD5DjM/YCICCh4q9MOfdalSRVWmJsRgZNj8GSYKCOj8QNkZllUcAOnQVDsEBcPZ6ePCMz/lPEY0tIh+jV0tpuWjWssLoVfG7CwLmXePSCXC95kw8AYXF7CyKBJwDhEd5qM5law2+HiLwSD8pRVVZIDflhbDRMI/4mVVeCvgVfR0v9AP4wOWzU2ZIPnfedbccyGGmWXmM8AAAAASUVORK5CYII=',
            blank:true,
        };

        //社交列表
        engineList.sociality = [];
        engineList.sociality[0] = {
            name: '微信搜索',
            url: 'http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s',
            favicon: 'data:image/png;base64,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',
        };
        engineList.sociality[1] = {
            name: '豆瓣',
            url: 'http://www.douban.com/search?source=suggest&q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOElEQVQ4jZXST0jTYRjA8UfQNd2w3DqERIQQBmFQNPFgHVwI2SHokKTQpaB/RJvZ/JPLhWWkCcq2lCIhFILyEHaoYEr9LE1/bXMzqYOYTmeUOT2olWjfDjYV+qcvfC4vL194eR6R7Zqjkqf3SK5ubfL0HslJuCeSr1ekciNSmoAUa1bPvh6pMCJyRNcmJVqqntehjvhXLa02EynSIpKr80iJlmrFSceHLtoHlP/qGfGxs3ZvNKD3yGUDYtWw5XoaJqeZzPoD7Gs4+JsMdzYmZxYxxQakUIfYjdFAEnI+lpa+VgCmv88QmZ1k6uvUkonZSaIn3WVGLLGI3bAiYInjYfARAObbh0i+ksLmyh1Lkh1bud/bAoDJmYVY4v4e2HQ1FTkhyNkVjgt1L+v/FYil9d1TANydd6hsu0mN4qZGcVGjuHA8u4Z3tBeADHf2H75QoKX0iYPP0+MADEaGCX7sp//TewJjb/k2PwdAz4iP1KrdSIF2ZcCAFCUhZwTr40sAHG46hpyLQQr1iC0R/1gfEzMREsqSEeu6xffLASNSEI+cFrZV72F+YZ5GtRk5JchJIeXGLhZ+LNDse7B4Z4lFLiZGx7i4SLe67qKGvPSO9S2NSw15UYd7GIqEABif/oI6rKKO+jG5zIhNsxxoeN2ILxzgzaif9oEOXgx24gsH8IWDdIe8tA8ovBrqxhcO4gsHSHft/xXI1ytSbkQuxCNWzerZEhGHEZEcXZNUGBF7ElK2BuUGxLZh7icJ8DyZ0CDAawAAAABJRU5ErkJggg==',
        };
        engineList.sociality[2] = {
            name: '百度贴吧',
            url: 'http://tieba.baidu.com/f?kw=%s&ie=utf-8',
            favicon: icon.baidu,
            blank:true,
        };
        engineList.sociality[3] = {
            name: '知乎',
            url: 'http://www.zhihu.com/search?q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4jY2SS0hUcRTGzyLcRI9Nm8BlbaqFm9xFi+hhm9EgrVZBUETOI3VsUGeiN/RGAqFyGmcRFCFUFJRFWCs1k3LunZnGbOb+73W0ssfo3HEG+7W4E4iBtPjg4xz48Z2PI7J+Z4Psj/ZJ/Z0+qQ//v/ZH+2TX+YjIvmi/nJtBQhNIu4UETMcHraUVyiKnvyPSEHkhQQtpjlN5JkXrw0mkSUcaNcSjI81xxKc7fqFaEkjQRKQ+3CdBC3FrnHv2hUS2wPauDDXditqoSeXZMTZeGWd3WOHqMXH1mGy7abD6ZAppM8qADotlLXGG0nmGzQL54jyTv0oMpPPsDRv0j82ifpR4a9iMKBuAmrCJNKfLgFbFnogipmwqWuI8iuXwPMgiR2KIT2fEtKmNmMjRGOLVGVY2e6LWAkC7SfW1cdaeSiGHPvAiOcPBuxZyaBRx67xTNq4e0+nleJy3yqZuMWBV6CM7bitc3QptskDn62lqbxlUXR5nIJOnLmoibg1pijP8D+CEwhU2GMjYDBo2dvE3+tQcA2mbM8+/8ObTLLU9SwGCFuJPIG6NFW1JdNNmw6Vx5PAo4nVOWDpB0EJaE4hHZ8uNDKXiPPeGfrI8kETcGu+UTU1YOSUe1RjM5BeV+Bfg1rg//JMnsRxPYzl63/+iwqujT87R9HiKNYEErrBiKldyEjQtBDRq7L5lAFDdmWZlIMn7TJ7N1z9z8eU3coV5UtkCI2aBV6lZqq6nEX+mDAiYbOlM8yNXorN/2nldn866C2NUnk0hxzQuvvyKpzfr7LzlV+5QiByI9kvHBJuufmZrl+Es/AnkRBJpXuD9CcQXR/xJpLWsUBaRXecjcnoaCRhOpHbDIS/W4nkoi7TEi38AwHibcZoJerYAAAAASUVORK5CYII=',
        }
        engineList.sociality[4] = {
            name: '新浪微博',
            url: 'http://s.weibo.com/weibo/%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVQ4jb2SXUiTcRTGH9CZNmeyvXO+2163tSWaFWmsMmtpSpC1EBNDJaiky0AEL6S0D4pKHVFpXmTaB5FdtIuEqBslBCMqKyNDUFKpLQ2rOb9y/s/pIlYUeBFBz+U55wfnBw/wHxO7zowNa4zIAKD6a3pPOkpG6zA+WoeJ50fwJi8VOxc91gLKzpjYwjUq1cbwLA7QbluJHVuSkespxsWpywi5HNj+JxtToZWOv7As980kp3G/1T4pAXJ42VCCpp5q9KZbkHmhFC091ej7JQgk3JLND4LJK3nckcJ+Rwr3W+yTOUuW5rvV6pIqrXRib6L6QI0bp7uq8NRlx7aRs/gc5uO9RqU76EjlUZOF3+llGjGYaECSZ/t0CV8+KTaeSU7jLr190GWM3N68H9d2rEaB34PZH6/pE9umbCt42GBmX3YezRytJXH9JoVaWjlQWcUfMjfzmKzwsySrzwDYAGCtAmdDEZqRGR2d609azr6UVRy40kJibo7eDg/Tw+5uGvT5SAhB8z4/TVRW0ZCshO4ZlccZkdFbfro36PVtAesKnrrrZSEEnfF4CAABIJ1OR16vl4QQtDA/Tx93FfC02cbdim1IA0gAgDvx0qPpfDcLIehJby9pNBoqKioit9tNKpWKnE4nCSFICEHjhyvIn2DkfqtjMqyCGrXG8y07j5mYOzo7aavLRYFAgLKysggAHSwvJyEEhfx+8m1y8YzFwU16QzuAiHBpzA+khFd88hQvBINcW1/P63NyOE6WqXDfPhqbnubQ4BB/LS7loMnC90yWHgkw/tYeCZDr1eqW97sLJ7ntBr++1MgDV1uZO+4zHzvBX9Od/FJv8FfrpHMA4hetsAVILYuIOOSREi+3GpX2xrhlt2tUMed3R0WVGYGkRcF/yXdyajYEKzT4iQAAAABJRU5ErkJggg==',
        };
        engineList.sociality[5] = {
            name: 'Facebook',
            url: 'https://www.facebook.com/search/results.php?q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAbQtE48bOXX9J8UrGmdeBhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZYOJRdZhUA8w9a48QmVfxAwATIfnUl6gLIAAAAABJRU5ErkJggg==',
        };
        engineList.sociality[6] = {
            name: 'Google+',
            url: 'https://plus.google.com/s/%s',
            favicon: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR4nG2TT0iUURTFf/d93zeiFkJkFLXJkhYFbYIQIhdZ6EyG0DCWRLZLWrcvgoK2bdwFLUSKIKMCW4hkZgsRMaRFmiMVhSgurNCcee+0cPwz4uU9eFzOue/ce7jGtsjfvrVfszO/kEBCIYCEJQl1z/ttO74skc9lJAQl0kYBKOUCxbhi+diLt1XrHLf+mMmltb36ThEX/lVOX2zcwDqAmWyzkJACWtNQdtFmbZWU5bPpUYB4uuvaPubnQaKYVFDb/aTsx5+dWWIgQpv9Svi/S6cAnJubm0PCR6kN8sjNTj49uAvA7GqBZe8RYu2UFArybecf2de2JmHGnsfPABjoaIMgnBkEEeGpdsahOMIFqO3pY+ZKhiqMGBFT6hlg/P4dVPSknHG292VZKxPtrZx8+gqAw72v+dKeoQZwqGQbsLvuCGZGtMP0VxSYzKWRxGg2zbL3eAmHwvqsOXr1esl3MZJrZSibBuDzw3ugQApjMpchMVFdstCmMo0yM1aCONjTt6P3H7It1JhjlwkwTJ5E8CeERlf/5p2hQALkOy7h/61sEBcnxnl/uYUEqEA4g8REghE54/Tg6FAMsFIsLFdEcWU18O1Glu+rRQjgDFIG1QYpwAUwDEP88DoOW3ZhqvmMDAgIL1jwAScRAQkQmzAZzsRvXxxoGBxrgi27UN8/bIsFP+YkEsSByEghEtMaSGAm5nw4sU4uU7A1Pp5r6N7r6AJYCh4TLKwWmi4Mjw9sx/4HkrAQwN8GM6wAAAAASUVORK5CYII=',
        };
        engineList.sociality[7] = {
            name: 'Twitter',
            url: 'https://twitter.com/search/%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVQ4jWNgGEyAH5e4bXhCgX1ibqOVb2gCklpU9ealvRuRFMCBau3cCwxTzvxnmHbhP8PEk//1yyfvl6xb9sDGLywJRaFh/+ZTDBNP/rfOrZ8PM11VW9uAYcnj/wxr3iHwwvv/eZfc/mxkZeeEYoBvdnkdw5p3/xnm3PjP37TunXVu/XyH3LopKJqhODCrtIKBgYEHxQCDliVH4YpWvvrPMOfGf4aZVzA0M6x595+Xl1cEI6RcfIPDeFc8/oxNAzLWWHjuNq5Y4PFvmT6fkCH++dWNuAxgcPAJCteYc+Y2PttFRUUlcBrAwMDA7x4UEWUzbcchbJotbW3tcWq0zq2fz1+38h1D597/DPNvo2h2nrBmG1QzMy4DmNXU1DR8I2IT/FtnLYThkPKWTs+g0HA1NTUNfJqRAY+kpKQ8DEP9y06MxoEDAKUW4Kpi1NnUAAAAAElFTkSuQmCC',
        };



        //资产-域名/IP/Port
        engineList.property = [];
        engineList.property[0] = {
            name: 'Zoomeye',
            url: 'https://www.zoomeye.org/searchResult?q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAcxJREFUOI1jYBjygBGXhMOav/HfX9zy/f//Pz8jM+tDDjGVhoMhjE8wDHBY/z+G6f8/np/vngv+/f1Lj11c8ezfz2+Tf3989ZyVV2Tnr8+vHrHximj//PAyi11IetGReJECFAMsVv1n+PPwzH92MYUZ7DwimT8/vZ7FJig6dX8A40V028wmXnnAIabUfSiSayqqczf+jzCbcvMsAwMDg+P6/1EMDAwMMkHrk6U8Zn2S8pzzXj72qBcDAwOD7br/DGYTr3zE6mezSVcf2K/7bwXjS3nN/sTAwMCgWvifW9JjxkuYuOXMB5us57/Ih/GZYAw2PrG+X68fVsJN/M/wT6XyPwMrO4M4AwPDX7g6Ufn235/eFGEYcCRBdNLfH1/sbNf9Z2BgYGBgFpBN+3Z+5pv3F2Yd4xDTi4B6L/JgEONxRkam1w7r/0czMKBFo93KH1k/XtwpO5Wvo4DuRccN/3X/fHyX909IKPX/m9czfr15mM6uZsKIkQ5sFr3r//n2cTy7gPi0X5/fXGXjFZP7/fmtO6uAmBQLr9Ccn68eGjKxsF5g5hX+yMTM/gVrQrJf81/65+t7Df/+/FRgZGT8yCGmvOVgGNsCbGqHAQAA436z2xiCGIYAAAAASUVORK5CYII='
        };
        engineList.property[1] = {
            name: 'censys',
            url: 'https://censys.io/certificates?q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAATlBMVEVHcEzxgD3ygDzyfz3/givxfz3/hS7xfz3ygD3xgD3zgTzyfz3/gTzxgD3zgTzzgTryfz3xgDzxfz3ygD3ygTz1hTfygD3xfz32fzzxgD7HE20dAAAAGXRSTlMA0WG0BdkD5X6uO8kJmSghb43zvkoSVKAZHERevgAAAAFiS0dEAIgFHUgAAACZSURBVBiVXY9XDsQwCETdcYlrHDvc/6KLY622zAeCAT2AsaVDjBgze8t4FwQgF9eucwW0E0lnP6geGqnZgAcpoydDNERbbfbzDDERzzrkKZtFerjKTe7M3qVWVBLqNOwjJVGOP6MJ9msgFDrpSv5+jAiaB5u6K/rsC3vboDVAc5VG+/6M09mtaAzj2JzbArqqy/X1rywlPekLUc4IFNq3gFIAAAAASUVORK5CYII=',
        };
        engineList.property[2] = {
            name: 'Fofa',
            url: 'https://fofa.so/result?q=aaa',
            favicon: 'data:image/jpeg;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///9u////4f///+X////l////5f///+X////l////5f///+X////l////5f///+X////l////5f///+H///9u////4f///+X////l////5f///+X////l4NzX6cS9s+3EvbPt4NzX6f///+X////l+vr558S+tO36+vnn////4f///+X////l////5f///+XHwbftbF1C+3VmRv+Vh2f/lYdn/3VmRv9sXUL7x8G37cbAtu1RPyD/xL607f///+X////l////5f///+Won5DxcmJD/9rQrv/3783/9+/N//fvzf/3783/2tCu/3JiQ/+mnY3xxsC27fr6+ef////l////5f///+XHwbftcmJD//Hpx//MwqH/WEYn/9PJqP/3783/9/DO//jx0f/07c3/f3BR/8fBt+3////l////5f///+X////lbF1C+9rQrv/3783/t6uK/1E/IP/EuZr//ffd///64///+uP///rj//nz2v9YRyn/////5f///+X////l4NzX6XVmRv/3783/9+/N/6+hgf9RPyD/nI5z///64///+uP///rj///64///+uP/lIhq/8fBt+3////l////5cS9s+2Vh2f/9+/N//fvzf+1qIz/ZEwq/4BfOv+CYDr/hmVA/+fdw///+uP///rj/8G3m/+flIPz////5f///+XEvbPtlYdn//fvzf/689X/taiM/4JgOv+AYDz/m4Bf/6eNbP/17tb///rj///64//Atpr/npOC8////+X////l4NzX6XVmRv/3783//vng/7qpjf+CYDr/nIVo///64///+uP///rj///64///+uP/k4do/8fAt+3////l////5f///+VsXUL74tm5///64//48tr/impG/4JgOv+DYj3/gmA7/9THrf//+uP/+PPa/1dGJ//////l////5f///+X////lx8G37Y1/Yf//+eL///rj/+7lzP+jimr/mH1c/45xT//q4cj///ni/46AY/+imIjz////5f///+X////l////5f///+WJfGj3joBj//jy2f//+uP///rj///64///+uP/+PPa/46AY/9+cVr5////5f///+X////l////5f///+X////l////5aKYiPNWRSb/k4Zo/7+1mP/Atpr/k4do/1dGJ/+imIjz////5f///+X////l////5f///+H////l////5f///+X////l////5cfAt+2ek4LznpOC88fAt+3////l////5f///+X////l////5f///+H///9u////4f///+X////l////5f///+X////l////5f///+X////l////5f///+X////l////5f///+H///9ugAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA=='
        };
        engineList.property[3] = {
            name: 'Dnsdumpster',
            url: 'https://dnsdumpster.com/',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABp0lEQVQokX2RT2tTQRTF79w7E2depP5pLKQiCO4EP4fZiAim3RTBjUhBBDd+jnwEV0UQXCpuBLtQcaPSRWMSXLjQUErTvryk6byZ40J9yUuKZzXcO7+559xR3vtms9ntdq21AOg0ichgMGg0Gq1WSy+2mfnPAcDiEyWARRRhOMy0NjF4FuOcDSEAUErNA0pReniQTfBw89GVlSVj3euXW2+2P9VqlxI3dVsACJBbd9aWayu3Gze33746f/nq/Qeb165/6H3b+bzTKXzOWELMRpM6589fbJmK7b9/p1hXE5dlI2Y1n0Gx+HH6/Vd/bf0uHY+JY1RKG7fX233W7tili6MsKwNEeYj11XqnvXu8nxrnT4yZjHn1bPXCueowRFoMTUQxRNEiWrOGsGjNSlGMUDS1xLMAAAKIUKqUNQVAxMJ5CLnPg/d5yL3PCaQUzUK6uG2M2fvZv3FvwyFEjpGoUkl6Xz6moxOT2GLsPyBG65If7a9PnzyuGIkgAkQ4PTokfYYQC2vT0ACM0UeDg79NRQQSrUV4NklpSwC0MXMVgE75uP+sZU6/Afg6zCm+oZvZAAAAAElFTkSuQmCC',
        };
        engineList.property[4] = {
            name: 'threatcrowd',
            url: 'https://www.threatcrowd.org/domain.php?domain=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAUVBMVEUCqfRyz/owufeM1viR2PcMrfUitPYAqPRMwvj+mQDumg+wyblszvo4vPhcyPqB1PpAv/qd1+y6vZLQpkUasvar4vzKq1av1NW/tHaqzsvdnyjqIMTcAAAAAWJLR0QAiAUdSAAAAHdJREFUGJV9jkkWAyEIBRFRwKHH9JDc/6DRRRtWYffrFR8AGJjBDjqHNlcSITTOLMxS/oG+cky2Fl0RLwZwm0jSzgcYIkcvy+xLNOS47nNbB+HXuqumzQ1jyUlVdwoPqO8OTv8ACHQn/eTfQ4yU8+WG0Gtlqi1/AfyuBJROmzPtAAAAAElFTkSuQmCC'
        };
        engineList.property[5] = {
            name: '微步在线',
            url: 'https://x.threatbook.cn/',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACBElEQVQokY2SS0iUURSAv3P/xzjjjCZUChEhlmQPKTHaRLXIKKJaZUSLICQojBbSJmjbJlpEL4gIXEQvEIpeWBvDjSH2ILWmLCKIHovS+Z3xf9z/tphxRqFFZ3E4B8537uXeT7bempYYpY1oVGyUptiqGCnlcouKjQ0Ab33zIwBtNliy0KIcviY7ZSQyS2zqXQFs4LVvRjtTDRkF9I0Epwf9RgegELGuXj3qSQOfvkVdl7z6KhSwypFjj2eKK3evdw822VMR2pCHMwfSQK5g9l70FiUFUICjGPHiZ+Mh4Ah72tyVtfKhYG4fqrYtgBPXcsvTglACgCZXOp77fgSwrE51trvVjixeYAFXHua/ThqnNDgLCGx05MJAAchUSRxxriPR3esNvQ+vDoe1buUZVLnKWJwcj7LfNbC91R3MRjtWO4fv5hvTAv8C/jMqQE5ztsVubrCA/jfBpmb7yWh4fV/qs2fmAqWPMzAUmoEtSSA3Y5RNT7//4njGsTjS7vS9DOvs+SdMBObp5kTCBvjyO74zHEyH5ucfDRzdlVpaK2E8Bwhj2tJqW4tTrO+PBO8mzYqk7O+djjTA+a7MR89gZoGx0FzeWVVc8OBVcGMiqrGxhBScuukBmaTc607/KhhAiraO5eO58pVtDcN58lVsXZOQtTYqRmmYvS6QsGitEaVRMWiAv1g13mump/9wAAAAAElFTkSuQmCC'
        };
        engineList.property[6] = {
            name: 'Virustotal',
            url: 'https://www.virustotal.com/#/domain/%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAAA3NCSVQICAjb4U/gAAAAIVBMVEU0Sf9HcEw2S/8ySP84Tf8xR/81S/84Tf81Sv8uRf86UP+4/t3fAAAACnRSTlOpANCc4I3K7rB4Vz2Y+AAAAEVJREFUCJldz0kOACAIA0CqKMr/H+wS0dgeJ6GANP8jELcsEZ2A7BWRumBKCkgbUK4ceBKA7spgNKJUql8pr+XD+HR+bgB4lAMuigWbtgAAAABJRU5ErkJggg=='
        };

        // 证书透明
        engineList.certificate = [];
        engineList.certificate[0] = {
            name: 'crt.sh',
            url: 'https://crt.sh/?q=%%.%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl5JREFUOI1tU0tIVGEU/s5/752XOmmjk1AZmm4qJVtESNiqWkVgIVnWulYSbYI2EQTtMpCKKOgl0sKdRKVEuchNaA9FsxmDwhlHC2fG0Zn7mP+0uN7bPPpW53+c7//Od85PKEGIh1oRTw7kF+JtMqMHAHDJFSK/R+XOViVN3VALT8I8dEh/NzPB6aybxiX5pCkIdLbej1M3ABQTmN9iD3gtay/8Gnx7dsyppLkimKWSq9/+NU4nL7mETtDCw0iMfWRsGIBXReB4+4klOjNSWmIpXAVprG8hkP0WEUxYI3X8ENbP9X7OmlJtrEtVeyqfR+hUtJBAOIGO5oPI521ZqpBW8hwkmrvk/FKfjCYuG2PT15ffTkZqM4/u/ZdAw0Ij5+1aKVT1J1VDULC4C5JtCywJZHIwJyIXw/yso6wEtjjsmCUC3jUA2Irdt1eOwVQgKvXXn2+ybgo2LBjfV04D+FCkAOJfaEUTTWEe7Etg/mwQvoFl6rklDjd82TQIrOtKWQkeIYfJ57EXhoXcy0/9cnR2MG1mbgAA/cpW2z1jaPsaYmUEMTo/q3U036UKL6AIQDI4L0GalgAAmc0FsdkhBWLFyXPnwEENDx2oSOq9uWpPjQJSA1CuBjGz+GPUYGQNkN8DHG07kqKe8SITHaxSz+QqMFm4F+IXO4mnHAvgR348VdYFANs2nj4xpqJ7IVR7IFgCVV62xqfbOWfakmuDsSXqdcldghC/uWO9GrsASxZL+r0G8OZ8VPrg3990JVlwTABQx49hvI+wXDcsZ5oLQUKw1lI/52tquLZIXUX/4y9BOfzLv6DT9AAAAABJRU5ErkJggg=='
        };
        engineList.certificate[1] = {
            name: '证书透明监控',
            url: 'https://developers.facebook.com/tools/ct/%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAbQtE48bOXX9J8UrGmdeBhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZYOJRdZhUA8w9a48QmVfxAwATIfnUl6gLIAAAAABJRU5ErkJggg==',
        }
        engineList.certificate[2] = {
            name: 'certdb',
            url: 'https://https://certdb.com/domain/%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAJ1BMVEUAJ1YAlGgA2XMAVV4AtG0Av24ApGoAM1gAdWMAy3EAhGUAaGAAQVpFbL0RAAAAAWJLR0QAiAUdSAAAAGhJREFUGJWNj0sOxDAIQ2swBEjuf95JP1HbRaVhx5Nt2dv257XWnu/oXVXHYgNAVcSkJ0CRdJ/0AurOTDOEnibQ0kSI6heAp4iYL0VzMndFrFBYZgr9EWovyyxiR2jcbXUH+hoT9TXzB1W2An0kfbqSAAAAAElFTkSuQmCC'
        };

        // 指纹识别
        engineList.fingerprint = [];
        engineList.fingerprint[0]={
            name: 'BuiltWith',
            url: 'https://builtwith.com/%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqVJREFUOI2dk02IVXUYxn/v/3/OPefc+dDrnet1ZrxdZjTQhdRibGFBFuhAYRRDyWAEBYNYhAtdGBNBJAhG4CJGXJQKLrUM+5zBikiYakJRlKZgcgRHi/FrHOce7znn/7YYbs5GyJ7N+y4efjzvAy9tQ/7mwjveturd5tX8D1lV+S6d5KV0Ivst/sH9/KAAI0KMA4lMc3G/v6Vbmx4M0FiScff43DF35EpvrOWvc88uNFU0ouVN+16Xhq3tY7lVpRP+IxWNCgBewySWDIAMZvZlR9u1OboiswB4N7WaTdE3vTXtyK7qBo2pJKeTN4Ch+QQCfo98unQkEgRICG/11S4sftffm3/B/nFzKBvQO5QkIkOoAbP1MR2saoAnef7SmErtC7ej/kvcizZuItQbLNJZlrtpiiS0iYiCguKZJjnj42PCJ+xuLBCzJruk/Qj4K+WQWSST9d/dczhCU+Q6gGbqoYjkmcpu69qEBHNte/2zlte9DbZTRkyZU+E62TVzIH21td9sNYuZ8B+Wj1sHzaDtks9zj9pRv9sMl4+HPV5ZTpl7FcLyc+GT7V8GG1doU6U45L/crU3VZUdzz3Rdix5rfsV+0Plj8FTpQO7FhzRP4X1/oENbGvXNK7/JTmuNYrje7I6/d2/nN9m35k5keyTPhO2QnyRgLrmgr3UM+61TvcntZd+EYrmzIIMQA5kEEqMgIfPTYzad1KdtQc7jkL8H0sNkcHVjrLbkfWVYKMVm01oCSC9pJ4A6LI5InfoAUa/3CYBXkePZDe35F2ALTADUx9x2BO6Oup0Atk3GceT9FeZXBGrD6fMI2LJcRPFtA9B5JjhY+1Z7TIuMlz4M+uNRV7VL5Gzpo6CvdjItBmu9Y6bECIYZTfgzWm9Ouut6+f5f8h/1D5UcAogegK/kAAAAAElFTkSuQmCC'
        };
        engineList.fingerprint[1]={
            name: 'ipfinder',
            url: 'https://ipfinder.io/widget/?get=%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAATlBMVEUyQVdATmSHzulCUWYyQVcxQFhSvucyRFgyQVdCUWZOuuGHz+pDUWYyQVc2RVowQFZdveKHzekyQVkzQlhDUWeHzulPweo8SmBmx+ptyOotDYoaAAAAE3RSTlPAhPf2qJmcWfnDp4SysHc5WoBCyuvTuwAAAAFiS0dEAIgFHUgAAABoSURBVBiVVctJEoAgDETRqCjigFMwcv+Lajos5G9S/apC50paH3HIkx8vjRyONDUI1yBcw7cr0P0H7A82t2pNXJCnrUdxH9BeXiRMt5ZnA2GDnAqwQU4F2OBJBdhAN4ANsBU6FIYWHS/7Iw2szQ/4XwAAAABJRU5ErkJggg=='
        }


        //漏洞库
        engineList.exploit = [];
        engineList.exploit[0] = {
			name: 'Exploit-DB',
			url: 'https://www.exploit-db.com/search/?action=search&q=%s',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqBJREFUOI2Nk1toVFcYhb995pLYKB1Frbf2oTQgLdUXLyiWQAWpWKS1LdGpl1KLPlpfSkHwQX1Qi6Qg1KJE2r6oVVQCRaHQtNGoManCNNGajIJ4i1PMnJMZT3JmztnLhzp6bBH8YT/stfnX/vnXWkZgDOiv+cyqe5WPnYSZGHo6PfM0bbxAGYEBMKAa2P8hR+x5jDfIGeehfpnbYG48l0Gx3g3qASAHWT9/ZUjxstaTtO+5NAPZut/vrkbX16bLoWypYqUbQ77d1XrYHm2/GBarso+pOuOdDkA+29BWn6w2lW7Ca99cbxgcLIxdsn4zv7Z3mHQ6bVzXTfx27k9zZxQLLJS0pza9AyCF48KKpb6pmeTkGWzf20rjtMlc7O4m19vLP4UCCqt47rAzHCGkT2t7S4Iwpi7DKLw0732KpTL3Sz5TMuNIOA6SKBQKhKM+YSXg3sQJLJ7z9itdsHH8clJOflX6OInMd1FENZFMEUYRCWOeymQMfhDgln06zncRyghgDEwvtHHcoWo6Zd0dkce3fv+lkUmZlzEISU8XZQwPR0Zwyz7Jiu8IirNg6yK467xxrLInKtUvc6YnP3O/3H2CYKTy9efN3HrgYWMk1SjCytK0YC5+rqv4ZMK4JH1waFrHqQ8y77xXn+u7SstPRyn6AWFkWfTW62z6Yh2p8hC3PplKNIVc4yFmP+OGUasDkhRILaHVbUmqBIHCxw4I3QfX+peg22tQPuvkABhYkVr/r5T6UZK8nrP7+6DlisMfd/ZtOelZbRts3Rn0TmJt7aP8qjE/9MxkKgBt8K57of2aJA1f7vz+7zf5ub851RKLBt2wNJ/FG1g5Pvu/GFSkjyQpiqKv/mtvSSZ+z2fHHowT14KIpMYnoGTip4Y9Qx17ewTXfI0kXmCprgAAAABJRU5ErkJggg==',
        };
        engineList.exploit[1] = {
			name: 'CVE',
			url: 'http://cve.mitre.org/cgi-bin/cvename.cgi?name=%s',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACN0lEQVQokZVRTUwTYRCd+fYrSyoIRVoBaSlETVraBqMRsiQelIMmXpCbCPEiBy8evBoTvfkTPYIhXIyReMJEg1wrElAMkIgQSQX6S2ihpfZ3t7s7HrbaeJN3mEnezJvMzEMigsOAHaobALiRiHTSVU1HExcAjSmk6xoRITIgAgJCEARuCHQ18UkJvNDAvNd867jjHBMYAZTWny9tlbqOBYB0jWhFvdF7oY8DgJbdii48nVqg1mbtbPuzED10dpwGraQlP69+M9W17xFAdF9NNSbLK6mRd6/mzErVqUK6ulZvq4v+tDtPUmYjtvtLre/fb+nM5nKsHntcLkTkRHoosDzzMXjv/s1CsTA9NTbQ15Z2n6/Jb6zvcE+XV5J6EBHLhwEnUmOJzODQ8NjoKOd8eOCiRfAHQyEXX82qNRK+3vZ/OOq5Y7XZ/ryVgKFgsdSLoliUi0ca3U4b395cp/R3RdH17OaXpbV4PF55KzLeZDU/eDJ+fWhQKanjEy99txtY0r/DkgdVl+fyDtEJLSda/wqQiIprj2ZWxOAucJPpmmSKh5cbWHAtLFR33pUkCQgEzhljFadZ05Vu29feMw3uprgSm/4R4421kCyIXpgoLY7IiyPv376RZbnitMniUWq7HQeTOUGbnLdeutq/GX6czmMkGgPARFpPiHlVVUVRLK8EAHJJnp+dDYbCHp/P6/FEItFU6gCIMtkMAHZ0tNvtdkSsCACAiDRNEwTBKBi8ERHRIP8R/Cd+A23CD2FPe0a0AAAAAElFTkSuQmCC'
        };
        engineList.exploit[2] = {
			name: 'Seebug',
			url: 'https://www.seebug.org/search/?keywords=%s',
			favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABmJLR0QA/wD/AP+gvaeTAAAB5klEQVQokX2Rvc/xYBTG20eHhoFKF0/CoDERJhbpQGIksWoiFv+AxE7CwMAiFouPRcSGxdrBKAZhaJSg0iAM9ZWS8w6V+/U+T/Je233O9btzznVwAMA+tFqtptPp8XgEAIPBwDCMy+UiCAIZcATsdrtOp0OSpNvttlgsOp3ufD7PZrPFYsGyrN/vfxMAAACTySSbzYqiCL90v99rtVqr1dKeGABIkpTJZG632283UqPR6PV6b6BcLguC8B+3plwudzgcCEmScBxnGEab8Pl8AkC73dbr9cFgkKIotC7LsjzPE4IgOBwOVH29XolEot1ue73e8Xi83+9lWbbb7bFYzOPxtFotvN/vm0wmFIIsyxzHWa1WRVG63e7fNHE8nU5bLJYvvV6vKApqkCRpNpvr9brNZgsEAqgOAMVicb1eY8vlslKpoM1SqZTmiEajl8slGAx+njUUCr3R7XYLAJvNxmg0aj2apk+n0+PxCIfDCGAYBgMAQRDy+TwAjEajz/+04FVVjcfjWsXn831pHMuypVJJVVWSJBEwHA4xDCMIIhKJaKlwHIeh6efzeS6Xo2kaAU6nczgcFgqFwWCgqmqz2bxcLhj8K57nv7+/EVOtVq/X66fhJwAAoigmk0mGYSiK6na7P7p/AOp0kpo0vk81AAAAAElFTkSuQmCC'
        };
        engineList.exploit[3] = {
			name: 'Vulners',
			url: 'https://vulners.com/search?query=%s',
			favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAYNJREFUOI21kb9LW2EUhp/zfdcfqRmcokMrHexi3OzoJKQlyZXSf0CQWOLQ4iA4CR0cC6WgiGDbpbO0IAQd3Dq7KAp1ckq6lFJaheTmHAcxJLk3VATf8XznPO97zgf3qHHgR7FYPMvlcpO9mlyP+h5wBjzx3o+nUqmjQqGwfxvAB6AOPL8pmBmqShAEz8IwbOTz+fU4wODFQ6rAEtCX5KSqGBLUgsHXqy+nf3YCBL7NMnpQwK5xnRIRDEElsu3hQ10b+Z6Jr9CEmcdI+AjpBpgZdYOnfX9k6sG5a7fovIFC1OXvnENEEBEUF8vX6xcAfgMrjUZj2cx+ORcLBkDQXahecgF8ARYBKpUKwPuxXLiZTdscwlB7fwtrZQwDbXLiP5FNctMFjsWRxYFsXc+2VjCligMXMGFlTEt8bQ2W2LEyJp4sHoioxRIA6DzvCHgjngEAi/iHYOJJY2BN6igb7jPLiYC2qLviCdtfLaLiPlJM6k/UW6NfFzixV5z+XSTz/4k76gpcD31weUrHMAAAAABJRU5ErkJggg=='
        };
        engineList.exploit[4] = {
			name: '工控系统漏洞库',
            url: 'http://ivd.winicssec.com/index.php/Home/Search/search.html?keyword=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAB10lEQVQokZWSz2+LcRzH39+u9NDGEhIHmSFxabjvQmLigkQkDjU9kjKcCH8AjliEEAfJmD6d7ND1qaddt0yFVsw2Pzb643myeJ6nCbqOhjzPZtb17dChvSz6On0O79cn+eTzFiTRDI6m0g1CeexVbdDv9a5msI7i1Wtm6BFXZUWYBEYBkr9ULRuUJoHkn12Fx8p9YOzM2QahHOofB77Gh0g+BFLAFFAIBkmO7OmUgB+G8U/4Pv2+YttZQD0emHuWGgVeHj6iAdPwLJVKCpA65q+lf340YOl65sJFkp9PdH8A8l3+JPApkZgNdOcA7dTpJ4D15u03VX3X00MSScAcGCC5pBsGkAGmAJKLubwJqED23Pn4jp22rpuyTNJRBWZ7+wA4t7Q7ADewbTACYE1bm+3z513u+Upl18iwduv25v0HADg2BE6WFXlYiEKon9GoiMgzSiwuRNTjXnvo4O4XzynEgmlu3NsJZ8vKH3RJGt/qTQDp9u36gz4zHLYyuWJ4cMLXNeE7amva60uXq5Zdu1uQXP5SFE7nvBJraV1XvHHHfppYBjZF5ArEQsGckYL70um/jxb15bNiQ5wrVV2uxUy+ePOu5/qV9R0drV5vfTMahObK95/8Bu1UQLc0bMhWAAAAAElFTkSuQmCC'
        };
        engineList.exploit[4] = {
			name: '0day.today',
            url: 'https://www.0day.today/search?search_request=%s',
            favicon: 'data:image/jpeg;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAcHBwAAD/FQBSV1EAcIVvAGZmZgAdHx0AI88dAJGRkQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgICAgICAAAAAAICAgICAgIGBgYGAAMDAwMABgYGBgICBgYGAAQDAAADAwAGBgYCAgYGAAQEAwMDAwMDAAYGAgIGBgAEBAQDAwMDAwAGBgICBgYAAAQEBAAAAwMDAAYCAgYABwcABAAHBwADAwAGAgIGAAcHAAAABwcAAAAABgICBgYAAAQEBAAAAwMDAAYCAgYABAQEBAQEBAQAAAAGAgIGAAAEBAQEAAQABQUABgICAAgIAAQEBAAABQUFAAYCAgAICAEAAAAFBQEBBQAGAgIGAAAICAEBAQEBAQgABgICBgAGAAAICAgICAAABgYCAgICAgICAAAAAAACAgICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
        };

        // 在线工具
        engineList.tool = [];
        engineList.tool[0] = {
			name: 'CyberChef',
            url: 'https://gchq.github.io/CyberChef/',
            favicon: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEA8AAAEAIAAkBAAAFgAAACgAAAAQAAAAHgAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATExMAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHBwP5CQkE+Ojo5OiIiIS4aGhkt8fHxLe3t7S4GBgU6Hh4dWZWVlMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaWlrvS0tL/0dHR/9HR0f/Pz8/+qamp/6ysrP+srKz/rKys/3h4eJIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKioqix8fH/8bGxv/Gxsb/xcXF/pqamv+cnJz/nJyc/5ycnP9paWl/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLCwyOjo6P/m5ub/5ubm/+Xl5f7Ly8v/zc3N/83Nzf/Ozs7/lZWVowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALGxscfn5+f/5ubm/+bm5v/k5OT+ysrK/8zMzP/MzMz/zc3N/5KSkqIAAAAAYWFhDwAAAAAEBAQA////AAAAAACqqqrI5+fn/+bm5v/m5ub/5OTk/srKyv/MzMz/zMzM/83Nzf+wsLDcnp6eo6urq8pjY2MbAAAAAAAAAACVlZWm4uLi/+bm5v/m5ub/5ubm/+Tk5P7Kysr/zMzM/8zMzP/MzMz/zMzM/8zMzP+8vLz7bGxsLQAAAACioqJ+6Ojo/+bm5v7l5eX/5ubm/+bm5v/l5eX+ysrK/8zMzP/MzMz/zMzM/8zMzP/MzMz/t7e33Y2NjVxFRUULx8fHwubm5v/m5ub/5ubm/+bm5v/m5ub+5eXl/8rKyv7MzMz/zMzM/8zMzP/MzMz/zMzM/svLy//Hx8f/WlpaDcnJycnm5ub/5ubm/+bm5v/m5ub/5ubm/+Xl5f7Kysr/zMzM/8zMzP/MzMz/zMzM/8zMzP/Dw8P3oKCgxQAAAAG1tbWZ5+fn/+Xl5f7m5ub/5ubm/+bm5v/k5OT+ysrK/8zMzP/MzMz/y8vL/szMzP/Nzc3/tbW15UNDQxgAAAAAAAAAD76+vuLo6Oj/5ubm/+bm5v/m5ub/5OTk/srKyv/MzMz/zMzM/8zMzP/BwcH9tra2+L29vflpaWkuR0dHAAAAAAAAAAAAiYmJZKurq4uXl5d909PT7eXl5f/MzMz/x8fH/6qqqty9vb3/g4ODlQAAABFra2tAAAAAAAAAAAAbGxsAAAAAAAAAAAAAAAAAAAAAAG9vbyOTk5N5j4+PnHl5eVZCQkIVkpKSJmNjYxEAAAAAAAAAAAAAAAD//wAA//8AAOAHAADgDwAA4AcAAOAHAADgAQAAwAEAAMABAACAAAAAgAAAAIABAADAAQAA9AcAAP9/AAA='
        };
        engineList.tool[1] = {
			name: 'Regex101',
            url: 'https://regex101.com/',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABBElEQVR4AWNwrd5NEqJYg3PVLudKEHKp2kVYg0ftntSJx/NmnMqdfjKu9wiQ64JHg0vV7pC2AxfvvTt0+eWOs09P3ny9/MB934Z9Lng0hLUfPHfnbcrEY241u+N7j1y8/65s7lmnyl34NJy98zah76hDxU6gnsNXXtYvuYBPQ2j7wUv337Wvupw/89SUzTeAGiI7DwHFcWtoO3jzycf9l14cvPzizrNPQLc5A8OKoB+SJxzzb9oH1NOx6rJzJREakiYcc6zYWT7v7Pm7b6O6DgPF8QTrwaNXXwE9DXSJe+2e9ccezdl5m0DExfce9a7fC9Ef1HIAqNmthlDSQLYT09O0T60AJsuZztN6g5cAAAAASUVORK5CYII='
        };
        engineList.tool[2] = {
			name: 'Diffchecker',
            url: 'https://www.diffchecker.com/diff',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAhxJREFUOI2Fk01LlFEYhq/nnPdrXme0XAQWZIGR9AP6BYFtItIc+8A+qE206z9UK3dtskUZTkaIVgRBuJZ+ghImFWoYOVP5Mb5fT4txZNQpn9U5z3nOde77hiNsVXvp/Jn24MADIxxFCUQQhShTXUyzdHq+v3SHJiUACpx6d1trO9AoRVURxyBGUIUsSeO1qHp3YeDlk0aAATg0dPZFZe47lU9LlD8vvZ258FRme5/J+q/y4Wp1c0TjFCPiFsKW4c5Xl+/tAaQb0clotUq8sUnl28JE/fDr4OTS/MXRGytRpQcFTTIC1x/aA7DWBta1WNfByRdyu33+uPT6Q5yl42IEMYau8cGpHQA39MXJ+Tg5HxP6zbLiYd9IPwKaKdbY0zsBhcDxCgFea4DbFjQFFBGyJF0FxXhOQRsBfmtovEIOrxAS5MOmAABBYhBUlROT128BOABijBUjYA0Y809AY6kSbytQsPr/ebbmPFBEhLnekefbABEM+xCOl3o7jWtbQEijZKXerylQdfZ73Qb5x2SKWCHVZLrer2WgxNSt+2Zt9+WOsf4rjuP0qCqaaTzXN3puh4IM/ShGEBGi+fI1rfnl4KOeYudo8U1bkC+hta/yJ14baIRLfdE9eVON7/BzZgHNFDdwcVtzuKGH9T2yJC1X1n8Xl69OTDUCtr0vLs92dRzpHtY0OUZGqJlj0yhdxcaLUZa8/1Icu98sm7/v/NFq4GrO+gAAAABJRU5ErkJggg=='
        };
        engineList.tool[3] = {
			name: '',
            url: '',
            favicon: ''
        };

        // 企业信息
        engineList.companyInformation = [];
        engineList.companyInformation[0] = {
			name: '天眼查',
            url: 'https://www.tianyancha.com/',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAjdJREFUOI1l099r1nUUB/DX57tnm/p9iNwm2IoINwqnIkvQTGGU/QAhUryKhRQk4h8gIv4AJZQpGkhQXYhdeNFFV0E3QpMoECFB8mYhokJsiOKU5/s13Z7n+XTxebbHuQMHPgfOOe9z3p/zDjHGU2VZ7o8xmrPODjoyspDiRjN5vTmfIoQgz/PToSiKmOe55+23W1z+hyv3iIEP+/l4LW/3L0hTlqXK88h3phk4T3Maga1v8OUapgOXbpN381Zvu0GMUajVarFarZq4z+qzWEZWYccqiv+4dAfNlmPfBr75lO6MoiiEolaLebUqHEeWkNPiLa+ztI/3+vj3CX/fZNcwP4+mBpXOCuevpkTdreImZjn5PiNvsvnV9ti3HjI4htEUZ50ZY9fQ2UZeVeX3PXx9neGVC4kb6OHo9nachYybU63xG2zs5cIuRr7jwGqWdFhkx0a4+zh9cza/b0xTnNvJyA/p3dO3uBhmI5//QneFLEb0ouTKbt75EUsTmfXIX5M8a7SLr03RNca7LyfMSqPJ4SGKGcYnMNPmoy/nzDjrX+fgn4lYTxPJHw2l66zM1Nm7hcmSTd9iWQsq8krOT9dZ18/EXi5e5cY0Q8vZNkBRkDUjr71E7UkLYZ5ebk+yc5hD42m1weWMruHE9gVpybYNcPEzFK1GHXx1mSMfoM6jR3zxK4MrFhK6SEwPnvL9Hxy5gSnOfkLZoKeLfVvah0oSU3hRzlmgq5LkHAKz9VTUlN5z0puT8/+cHs0LGOaBYAAAAABJRU5ErkJggg=='
        };
        engineList.companyInformation[1] = {
			name: '启信宝',
            url: 'https://www.qixin.com/',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABmJLR0QA/wD/AP+gvaeTAAACNUlEQVQokXWSXUhTYRjH/8/7nnPc/MiiOWWoqNmmE4xA0JIiL60Lu6mLMqjwQrwM6jroziiIugmKkuzDi6IyiyKRQumDTK3EmODSctqcWnPCdnb2Pl1sJ0fQ//b5/Xg+3peYGX9jzSI+jPXniE1CWcirQn4LHC3Qa0B6GiFmhrWMXzcQf5ZYGl0Mrb15L+IJFBfx9AztaVIVlfoWTy3y9qGwA446YmZELmDh9LUe+faD+D5P9XWqbX+qyMWPnsqpgDBNbK/izuOpkppWlD/RAEDGP47RiyHReTJ1/Zbs6rAqfQwTZ/xWIobgrLh3X74bpbZaE4AGACTiJnm38d7dqZ67koBXg/JBvzR0JoKUME04cwEmWwAIUAwzCTAUw7WV/T6lafYtLJS4GYwNITtCIBym8c/CyBwGZhLlpVwv/iOwQkEBl3pY00AAgKSFzZuQ3SH7LQCACEKAaKOn4gyVXtqhSbYsuywx94PGPlF+XkaOraPMQ82a0xaM2uJiXlmltRgpBgGRZfLX8ImjVjIJIdB9SS8sZDj9tpDTVFZR5nYtvB4RvmoG4HRibEIsRXQpkDDxO4qGnQq5B9LjMzPz6sXgY3Gk0Ri8IvkLoiOYfkjBfnp5Wbb6cgbOS54/mAZtgVMcOjTeK9qbjKuntG8DtDhI/d3y2C6j76zGAS+bc2mONn4rxxHuCk3c7O3TpgKkFNwutB+2djQ3wHMbRrWN/ZPoHZ5pXBnO/znkUF+9vHKOVSy7/gcdVB9/3RJYvQAAAABJRU5ErkJggg=='
        };
        engineList.companyInformation[2] = {
			name: '公安部备案查询',
            url: 'http://www.beian.gov.cn/portal/recordQuery',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAnxQTFRFAAAA6LZC560z4Jke4Zkc3IsU46Yy46Uq7cdV3Zsf4aId6LI25KEl46ow4qIh5aYo67c65Ks+3Jsb7b5E6bo53KEh8Mte56JJ3qQp6bIk3aIp7sJB9d122pMb99xe1o0Y8tRj9+R13Ywz3JkX99lW3Jcf9tpU4Zsu3oQg9cBe/PuexCAM9TYU2wsH9TUU0BcQ2wsF8Dcr9kEpzxwV5CYU3RsQ6hEI7R8P6hkN8hcI7jYZ5TQo9VVI3JkV3pwa4qEf3JMb5qso560w3pgY2kkN3A4D0yQD5A0B3BME3WIW5aon4Jka3CMJ3gMB0xMCyGUR6H0r5hMH6AYB3TkN6LIr3qAY3T8QyxcC4lQT3AYC3FMU1TYH4wgC10wL6BQG2VYX7b0635EY1wcD1BQE2R0F2hYD5QoC4hMC4hEE3iYG6QcC1hED67043aMj4HcW2AAA3AEA3wMB2F4Q4xkG1zgH5DgM6gQA6gYB4gcB3pom2psT3V0O3AAA4QAB4gEB4wwE6AMB6AoC6QYB7AQA7QUB7gUB35Y089BJ36ko4n0W4gAB4wABzRsF4psb4pcZ5Zwd6ZYi8BME8AYB5wkC6sBW5K8p3zgG4TUE1WsP4Z0b5KUh5qkj6bAs8G4e8k0X4l4m89Ve5r493aAV3IgJ4YoT5JMk5Zcj6pwn7KQy7qUz7LQ98tFU89hn338S634n8BoF4Q0D4VYQ61AO9BUD6ScK6p0z8n8t4hME63k15qEq14gW46Ia5asj7Jwp6rI68F4Y8w8C4QkC3w0D7hoI7CwI6UAI7D8N8TIM8iMG7RcI7SUW3jQG2W4J11IL4Jgg5Y4i73kj87c74zga////s5nyPAAAAD10Uk5TAAhepMTEnk4CRuLSMF789EAw/OwQqIIO9tg++AZWGkz4DBD4tqhOKvzIAqZYrnyK/PRiTIB0qJCaolyKNGDaTGsAAAABYktHRNOX354mAAAACXBIWXMAAABIAAAASABGyWs+AAABA0lEQVQY02NgAAJGJmYWVjZ2DgYo4OSytbN3cHTi5oHwefmcXVzd3D08vfgFQHxBIW8fXz//gMCg4BBhEaCAaGhYeERkVHRMbFx8ghgDg7hEYlJySmpaekZmVnaOJAODVG5efkFhUXFJaVl5RaW0DINsVXVNbV19Q2NTc0trW7scg3xHZ1d3T29f/4SJkyZPUVBkUFKeOm36jJmzZs+ZO2/+AhWgLaoLFy1esnTZ8hUrV61eowYUUNdYu279ho2bNm/Zuk1TC+Qy7e07du7avWfvvv0HdMBO1z146PCRo8eOnzh5Sg8soG9w+szZc+cvXLxkaATxnbGJqZm5haWVtQ2QAwDY4FaMm8tm8gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wNy0yOVQwNjoxMDoyMSswODowMAt8NCYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDctMjlUMDY6MTA6MjErMDg6MDB6IYyaAAAAAElFTkSuQmCC'
        };

        // 源代码
        engineList.code = [];
        engineList.code[0] = {
            name: 'GitHub',
            url: 'https://github.com/search?utf8=✓&q=%s',
            favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVR4nM1Xz2sTQRT+dpNScqhJW7ZJ9mx706RJ0/SHbRHR/8Cz9ORBBBEUEfwjBJVePHhQFPUiIi09SNqkSbtJU70p6dH+IOChQmpNss9Ddqezu7NJmgT0LQPZN/O+75s3bzI7wD826QxjPURUawtUktrGbWfggK7rR3bnxWjc8v51p+AIlGVZBkAdC9B1nQXbCZuZXYwsy648bh1yvV6vA8D9Bw+xvLLSNrlFSPFUiMfjEXKJnJ5arVYDgMj4REfEdvtSzAMAvF6vg8/hqFWrBACRWKIn5EzEttYQ0ddn4bS8VE3yHs3cIaKYR6VSOfD7/WHTJ3P9YSJykCuKgp1tDTvGDNoxt/FEBJ/PF+J9LAMnJycEAFFb6s9CbDc7Fo/X398vAYDX8A+ACJH4pBOFmm7jpiaMtOHJAPD7+PiIiBqdthaJJUBEHbVmeKqqjjEBLMhQzbdifrNjAcX8phCTiLBbKn1jS0BEGJ9IOrJlkndlgngeUwbQ11AsylhnM+fbtpZzxTUF+BrpFzw9ECDCXrhyjQlgSyAq2a7TDyC1tu7AHvT7LQKO+ZT0WsCdu/ccvvdvX1uWoEq6LlyC8cQUSNe7a6LH6DMFgIhQyGUE+6W7QoxNzjTFtAhwK8RYcqYj8pu3botnbxR3YGjoPBMwODx8jhWi0fLZNPsdT84inpxti/jxk2eIJ2ehaQXh7PPZtDn7XYA7jH6WywQA8alLrFgKuTSm5y7jT7VqKaJCLi0sOD7WzczYIUWRWAYMh0oAVpc/WgA31j87QIR/ry2pgXwuDeLIgdPTEAD2iQgBbo8CjfrQsutWAS7bs9m2fffmJYgINxYXr/N+xydZ+fCQACAxPcd8dgFuxsfYzcRQgkH3TzLDPOWDgxoATMzMOzpfvXiOsdFRIYlo/OqnDxgMBBrkoZCDT7Y7ANSVUMhDRNAyKWiZlOUk+bG377oD7KeOlkmxJRWRuwkAAH0kHJbM4traWMPWxhoAYGF+rmURmuMJwNOlpUcj4fCZLya8DRzu7TmuZu1YUFVbXs3cMsDbr6CqSkFV9X4vlbJuszfbhWj0qjFeakX+X9hfKwNpwLLdyLQAAAAASUVORK5CYII=',
        };
        engineList.code[1]={
            name:'SearchCode',
            url: 'https://searchcode.com/?q=%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAjVJREFUOI1tk89LVFEUxz/nvqtvJmlaCEW6CNpICCUMKqWQVtJCiKI2IRhBq0YSF0H9A0Wt+uG4alFILsJo0yLQRiQVHrMQgpYtjGJqIYGTOc+5750WT81xPMtzvud77/1+v1fYr14r/OaiCI8Bo8pdynzgvtRB6zvjelyEKaob3UTVpOc1QEM6UGWIEfm6P8G4gvBKXGUYtwkiIF4y0whUwTaiNjWJMMxt2UWQ12sivKRSbkqAPur5b4FPKB5Cr0ThFVyYEPsH/yrcJCdvhLwiaESlbABIZUq6SYuOCXwvgETQOoA8UaSBX1TWDgOQzkTqYRMCt6m4SnIyvujAcwql9oXl5eUegGw2O9935EufzOaaRMM/uBBsCjWNYrYeCSKo9ad1VCiU2heKxWKPcw7nHEEQnF1YPVXgjqzj+e+RLekMGOJtOT2IWWJlhu2Td1cQBP36YxZVijvixmDw9thq64xNBiKQgKOdWxswiQ+SWGU4Q+sAHR0di3uX29ra5qS1HzGcRqNkx8B/DVQRF16Vp8r5ls+9nZ2di9ZarLV0dXXND3a3nOOZHsOFg6iCmBgHwoQicaSE62zZ+FMdR3VUYGUGLImNgOT1HWH5MqqQzoQak9oO0pDAC8JyaidI1p8mZgnwMJxkjWEOgSjfEJpVuUFOpmuiLMIUrnK9LsoAjQceaU7ukddmhNXaKO+uCT0hyiTVjWzNZ0qlP6rjAiO1K/UEAA8UMlwSeIhQVRjDZ45b9fB/+9HnNNWwWLQAAAAASUVORK5CYII='
        }

        //威胁情报
        engineList.threatExchange=[];
        engineList.threatExchange[0]={
            name:'AlienVault',
            url: 'https://otx.alienvault.com/browse/pulses',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACcElEQVQokVWRTUhUcRTFz73//0zMvHQmGa2ZDKad5BBpFFgSfRkRuUqkmoiKojCjbURlmwrSiD5WFZWikKVF3/RlC6eNm8qodpVBLQbGkPG9aV7v/W+LUaOzvNzf4XCOqpwbJ1J/PJ9ZgxUxQwgggEBMShNrZiVEllUWnVOhHdtZt25tU9N6x3YAACiPlGutAbiuO5mfLB3DVvj58xdDQ6+1Uyg0Nq5sP9jmeV7pb3T0w/CbjCK1ds3qmpoaEfF9X2tdKBQePX6iCRAjAIwx+Xx+7779dwYGIAIBKd6ze9flSxcBaK3FCAFaAGICEAwG2w8dvt1/Kz6/umQBwrWrV2Kx2JnTpwAQkwBc8gbw/v3o4ODdRPUCb1rGmHnx6p6e3i9fv2I6yD9gZGRkPJfN5XKe5xETMbmuO/5r/OeP72/fvgPgGx+AxrQEONFx0vP83r6+iYkJEamqrNpxOF0s/nZdFwARTQHEDCCRSKRStSsaGrZtbd2wcdNsy3r27OnCZPLly1eseAZgAAwCUF+35MaN7mw2m0qlmps3t7RsWZhMfvs21n/7Tn1dPQBmngJKLSUSidraRanFS44d7xgb+/7x0+cjR44uXbZ81arGaDQykxykgmc7u0TEdV0RaW3dCqAiVhWtiAE4cKBNRIrFooic7ewiFfw3nOd5Sqmr167YjvP40UMA6R07L1w473m+7/ulWv8bLhAIMHN5WdmD+/eu3+wOzZqVTm+fzhGYGU6HQ6FM5k0oFLJtm5nFCCuORCK243R2nRMjxGSMsSxreDgTDoWocm7csR3bsZlYphYRMT4AUgogAAQYMVbYClvhv3m2GnWjwwnhAAAAAElFTkSuQmCC'
        };
        engineList.threatExchange[1] = {
            name: '微步在线',
            url: 'https://x.threatbook.cn/',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACBElEQVQokY2SS0iUURSAv3P/xzjjjCZUChEhlmQPKTHaRLXIKKJaZUSLICQojBbSJmjbJlpEL4gIXEQvEIpeWBvDjSH2ILWmLCKIHovS+Z3xf9z/tphxRqFFZ3E4B8537uXeT7bempYYpY1oVGyUptiqGCnlcouKjQ0Ab33zIwBtNliy0KIcviY7ZSQyS2zqXQFs4LVvRjtTDRkF9I0Epwf9RgegELGuXj3qSQOfvkVdl7z6KhSwypFjj2eKK3evdw822VMR2pCHMwfSQK5g9l70FiUFUICjGPHiZ+Mh4Ah72tyVtfKhYG4fqrYtgBPXcsvTglACgCZXOp77fgSwrE51trvVjixeYAFXHua/ThqnNDgLCGx05MJAAchUSRxxriPR3esNvQ+vDoe1buUZVLnKWJwcj7LfNbC91R3MRjtWO4fv5hvTAv8C/jMqQE5ztsVubrCA/jfBpmb7yWh4fV/qs2fmAqWPMzAUmoEtSSA3Y5RNT7//4njGsTjS7vS9DOvs+SdMBObp5kTCBvjyO74zHEyH5ucfDRzdlVpaK2E8Bwhj2tJqW4tTrO+PBO8mzYqk7O+djjTA+a7MR89gZoGx0FzeWVVc8OBVcGMiqrGxhBScuukBmaTc607/KhhAiraO5eO58pVtDcN58lVsXZOQtTYqRmmYvS6QsGitEaVRMWiAv1g13mump/9wAAAAAElFTkSuQmCC'
        };

        // IOT
        engineList.IOT=[];
        engineList.IOT[0]={
            name:'半导小芯',
            url: 'http://semiee.com/search?searchModel=%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAA6NJREFUWEe9V2lLVFEYvtCP6DeU7WWlpdWHICrqgxAV9KEiiIgiCCr6YLa5TPtiYQttVEaLZdJCH7JQZ1FHbbRJM3Usx21sHHVGR3um9zll6HhRmrnjhYdhuOfc9znv8rzv0eSZMnV/YUHcCXtwSaYlmHzKGkw2xR4rzjuCSSZrgVZY21Vwx/xj8MDTOiw/bcOCk2Ykn7IJrDGG2BAiWkrOp9DuB85QzodmvKnuxN5cJxamm7HUpLfJQKjv20JaYqbVHy+nnnW0GGsvlWPjtSqsvliOxExL7EkINGHhH/6TmGVRRExvGpBb6sbc4yVjNhiNUQSIpVlCRE5f09KDnfdqEC/hGPneaIwhQMSlFSPX5sYDq1t5JPy9kdAhYEPckWI8LmvF84o2zBQyo98bizEEEsT9rII23wBSX3yNeR6MIGBThuOOFOFlVTsaO/1YnCGVIDkRvslIaPHpFj9POUNcvUbK8GNdFzp7BrDush0sTxLT22gUtE3XqwKHntXirYhQt38Q7794sPJcKeafKMGySVBEzRcYDDLerxwd2HG3GnOOlWCRuH4yjBNaytWKAI2x3FQfmAT1GwltUYbVvyRGicYEZmIzx3jAcMw+VqwvRNFAWqzyJA2QwJabn5CW/xU3ir4jz96mQp1f2Y675hZkvP5mJIE/rZyn3X7HISLWjiaPH23d/ahv74Pd1Y2S+p+wNnjhbO2F1x8EH0MI8NQz5cRSUbB886Kzd0Bpyb5HTqy6UPYvDHQ5k5wVxj2bZX3UBIaNZ0kHHRz6hTyRbxqlrswTQ2xsXKOS+y/4n3lHYlEToPErhS7lzoNPazFdlJQKypDorQ9HVATo1j0Pncr44bw6TEst0l03HiImwAxPkJNSts0Sd55cuVpn7XiImADVckNOJZq7Ath1v0bFW2/dRIgqBCoBJdmYTJFKd8QEmN3smGffNaphlnOE3rqJEDEBGuT0zCf7vUvlQCReiCoElFvOjYHgkDLOUMj3xqwbD1ERYBgITk92l08Uzqzk+H88ERUBGuLUtPJcGeo7+vDZ3Yv12XY11rFKJmzt8l4IlEZMgBgmwUvNk/JWeHqDuGdpgcwZSqiolPylZxgirmUvYF9Q7XjZmfKQeCE0IdtxYVOhoDG2X453Lk8ApU3dqu2mSjumVmy95cC22w51/2TveFvjCWlJJttzMS7X8sjqOBzD98w1UiFpL+uRL12xstmHBsmTFm+/Uk7Onr7AENze/oHfPq6SZbqPjhUAAAAASUVORK5CYII='
        };
        engineList.IOT[1]={
            name:'ALLDATASHEET',
            url: 'https://www.alldatasheet.com/view.jsp?Searchword=%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAVDSURBVFhHrVc9aBtZEHZ5pQoVKlzYcIUFLmJIkQU3FriIIEUEKSxwYZarVB3ChRFuzOIiLCnM4iIsKQ6UIrAuAkoRUBrDXhFQisCmCChFChVXbHHFFlfMfd+8fdKu9Wcf9+Dzat/Om/fNzLezzxuyZGSZSP+PkTSf9aXxNNLrQ9EgnhrwPng9kskEjv/JN8FYSoAjuIpl73Eg7d9i6V4m0rsGXiXSfTVaAWNj7TrnI2kdD2XvSSito0iC61iSb2m+gyUARtnfImkB45+ZeJdDcQ5CcU9H4t9MJLxNJfg4keDDGryHLez6f8L+w1jcM0OgvhNIA/6C61kmNvhn9AULkO7gTSL+60Q8oHeF9J8MpH6AFJ4Mxb1ENFeJuIjKfbkGl7GuDz+BxO1EOhcmk7WaL9tbwTQT3HeDkYdv8lpjs+Z+oGgQj31xHvm45vf3wZNAN2P9lcTHMcoRqw7qj/AMmXD2jSa47wbT7cFwDw9dLPR3uxLuuBIAPvFrW7ytlni19fCBXrUlzUoH/nxxz2MtQXAzhoZi6aAU7unQaIJ7vYxzAkg5mfu7HRlvOZJtbku6WZeJRW37XsiqNUmqdSXBzLXOQABliL6k0AM1YTRCYVJbJQJMe3+nLbJZE6lCm9VfRGqVBwD2XFOtiF9piLMLAqeGwOB7phhC2P3PKbIxQknuEPjfMlCri7eJMhzg9b0wQhzgtYu+pkqCouxivkygpIHOVAOqA2jAv48GkHav0sTmbekeelpv791Y084SKECChDpFArO3ICy9BU1kZPYWALxfBdoi7Yy8czZQ8WntkfL+Z5DAdSEBQT8YwYAkApSi1AeO0QfwyjhHAxVUG7VrQ9mLwOesOdPOyLm5pp4EmIWlBFZ2wlicwz46GV8nqBhOQtSQTu6CYiP4WxXPDbk5gltPYMlgt2IDoWrpkCqmkOhoDojWis2kPieS48EEMnwOfe1goaqWfX3wI9/cimoV8gxMgbnBtwVvQb7f3EhTEICBErhPBtZgaR/I95sblgA7FjtXCA0wEkZg6/4QcB3X00+pE+b7zQ1DwPTs1jH6OBaROev3X6HreT44MV/HlQTsiaj1nCeaCLCnG/SL/IRzF7PnFovtms9wwoJfHgGWEuAY/0D9bhIJcZSiIMmY4EmJc+wdU+Ce89ZmoV3+u/82Ub88GZUJ5P1AewJKwFPL5Gcq6V9ZPp+V5klw/D0HfnOeNivtrC39wmZGwJ6MwJBHJkYc8ECBNHFBcfA+ep9oJCY6/F5nx+iLgL2eiHJbjZDOWCNbu9bzSNrHkTrncx0g2n8LbbwwtWy9MFhpBz9qdwSfOI61AfckkuhdMiPAdPAQSnVy894FvmaoI+fYkumM3wym1edpGR+gtXbIIu24uWoCkRNWC6UMWAKNw1B650PUyNSdjjhP9lzEGrJE/Hr28MllmqkR1pR2zETJDm9D9/eBxCBV0gFQ0gCd0AGj4jegODjPzPCafIVOEAFfT0ZYHHzOYzfnuYH9x4akOLdSA5oBpMmm1Si6mAFEhoV0zMiUAOxZaztYAm2xKJESQI2ZUYfnDNhzjcJq5q4G+N5yAQ08nOW1tuiGWlsyLtSWDtdmAHpoQtD0x7LyOX3RL23i2/GMAKMlAWd/dm5X9ea1Z4kYrdGKIUqnqgHMrdIAtZLgnj6mwBp22zkRTt8CMiZTkGKt7CDRkt2yTOmBxvxr56GkxVIVx1wJGDEXMgLLtLiYBBghN2/gtLQsU7Qjec7zyu64aMxKgOesCbsWI1g64HzaMdEpTfTzmaKd9ccr/c8PkX8BHngBw+e5omAAAAAASUVORK5CYII='
        };
        engineList.IOT[2]={
            name:'FCC ID',
            url: 'https://fccid.io/%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABHNCSVQICAgIfAhkiAAAAohJREFUKJGFkjtMEwEcxr97lD7o3bVC22sr2kp7EGspoAOSQMSExCYuxuDk4OBijLK5KEFj3BzY1JhgNHEmTjZdjAlxYEBlsD0PKi2lUKilT/u6h5tSbfTb/sn3/Zb/j0CHaJqGRw8fPKnXmzOjZ06vMAybn56evtqpSxw+Xi4uXtz4lrjzo1qdyGb3cMxzHCaTCVNTU/L4+Ljuj/pvwPzc3fuKol4vlUpuiqLBWSzY2d0BRVHoO9oHfVdX7VQwaDQYjU8nJydvHAaQUjw+4z3RP1+tVt0UrUO1VkO9UYfX64VBbwBNUeg2dxuz2V1wHCtEo9FrbQDaoH81MjIKn18AwzKw2XpBkRSgavD7fNhMJpHJZEBSFBIbifMMY37RBtBUTTkoHKSDwSBcLhesFisajQYkSYLBaMDAgACGYWE2m0HraMiygkjk7btIJBIAALLZaOR9gv+Dg+fhdrvR03MEguCHy+1CMpWCx+MFy7JYXl4GTdMgSQK8gz9n5+33AIC6fWuWkmVZTxJEzswwfoIgoCgqnE4XCoUiisUChkIhtJotpFIp+H1+sCwLvV7fH74QvkwKg8JjRVFEuaXUOZZDuVwp6HQ0TCYThodDqFQqyOe/Y+zsGEJDIZjM3aC7dEhubhptvb1DbY8VRbFqs9ueF4vF2U+rH2F3OFAplxCLiwiHwyBJEun0FmJfYoCmwuF0rtJtBira63KpnCvkDyQNmi+X2ycCJwMQBgaxvZ3G/t4+VE0Fz/MxmiQXdCT5/i+11tfXr8jN5k3Oau1fW/vsZjkONEVDVRXILTlqsVrnAoHASietfyXxNTEhSZL4ZmlpQRTFWnIr+eyfg06Jx+JLmUzm0v96PwEDo/jJ2StKGAAAAABJRU5ErkJggg=='
        };
        engineList.IOT[3]={
            name:'CMIIT ID',
            url: 'http://www.srrc.org.cn/WP_Search.aspx',
            favicon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD95rm4S3jZ5GVVUZLE4AFfnj+1N/wcO+Afg/42u/D/AIE8PX3j6bTZmgutQ8/7Hp5ZeGETlWaXB/iC7T1BI5r6Y/4KS/ErSfhr+yJ4mk1vWW8P6frSJo0l6t7JZyRC4bY2yVIJyjFN2D5Z+o6j8vfhR/wTZ+Dvxf8ADsWqaHceNNU0ycsiXmn6tdXFuzKcMquNGCkggggHgjB5r67hvLcBODxOYqTgnZW2b9f0PCzLEYhSVLD2uz1T/iJruiP+SSw/hrp/+M1+j37IXx7b9qL9m3wl8QG01dHPiiy+1/YhN532f5mXbuwM/d9B1r85vCv/AAQy+FviSRfMvPiRbqccm5fg/wDAtOSv0j/Zc+Cum/s5fADwv4H0ee+udN8O2f2a3lvDmd13M2XO1efm/uj6VpxJ/YqoxjlsHGd9b32t5t9R5asbzN4nWNtDyv8A4KwfCDRfjF+xfr1r4iuJrXR9HuLfVbqZL02nlRxP8zFxBOdoDEn92enUda/P39nv41/BD4CeCbXQtP8AHHhH7HaySSBr25jvZzvYswMj6OGIyeATgflX7DeJPDlj4w0G80vUrWG80/UIHtrmCVdyTRupVkI9CDivyK/ae/4NxfFVn47u7v4S+IdCuvDl3MZIdO1u4lgudPU9IxKqOJFXoCcNgDOTknThnFYKpRlgsdVdON+Zfy7ddycyo1YzVehFSezPKv8Agpl+1fdeLvDPhS++FPj1W8NWLy2+sP4bvGs2jvH5h88QxW5IaNJNhKYysgySK/Vb/glXrt94m/4J8fC3UNSvrvUb660cPNc3UzTTTN5jjLOxJJ9ya/NbTP8AggL8cdD+E2vaf9t8DS6tr11bRtGNUl8m3t4Szly3k5Z2cqoAHCh+fmAr9Tf2CvgprX7Of7IHgPwR4hazbWvDumi1uzayGSEvvZvlYgEjBHUCvjM2wtKjnNV4Wo50mlZ9L6XS9D90zDiDBYvw1y7AyjCGKpVpqUY253D3rSk7X1btv0R//9k='
        };



        // 导入列表
        var engineList_plus = [];
        // engineList_plus[0] = {
        //     "status":3,
        //     "version":1,
        //     "message":"应用app下载,由奔跑中的奶酪整理",
        //     "name":"应用",
        //     "engineDetails":['应用',"app_xin",true],
        //     "engineList":[
        //         {
        //             name: 'AppStore',
        //             url: 'https://fnd.io/#/us/search?mediaType=all&term=%s',
        //             favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADtElEQVR4nL2XTYtcRRSGn1O3enp6mJk4TBDGIFHpjQtdGpigIApq/AGKCCKBrN2Jf0AwCC6EiOLKnYIKKhJcSBQMgiaKX6DmQwnGRNOrgUz6457joqpuV/d0T/fViRca7r1V1U+des97bpUc/+IBM8AUDADBCPdKuNK94TAbPqvlbWRtgimoxGcFQyglcFJ/kQY+DJKIchgaQADZ/SgA1PI22QG3MbjKcHwaA4QJkKJDY6NmHUfhThpgRt96lNrHRABBxI/AtYKHlVAL/6FpwjFEvxOe/1yQwQTHAte6Z9jfOsTda5vcttJmpbmfgoK/ty/xyaW3KEvFxEbgpcTVGYMrIAbeMs0nwQuaXO2d5JHbT/DwXW/T8quk6+fOWd4/9yoXtr5nqdgHInPAg0xqhhPwk5c8Rq6O5dYGz29epyFNSisB+ObK57z+4xMsSJtFv8KyX0OZN3JBLeYKkiaQSxDgg3LA5oGnOdI+hpqCCDcGW7x4+km6vZLVxj30taRf9iZovlvkmQsApxMiN3UcPvAMR9rHMAwnwk9/fclzpw6iWkBhDGK2jcNLkYkJl2ybeOnew07Nb1k6yGPtoxiGIHz62zt8cOEV1hYOMbBeWLEJ2b675qPwFLTPtceEq92TvHD4BmqKiHDq93f5+OIJvGtVGs4Pt6nw4AIJEqTlAc/jd7yJo4Eg/NI5w3vnXwJxMcOn+bxe5AqYOUrA5eW10/2ah+58CjOlW17n+Nn7WCxWd4XX0TyHp/cur3AbSw+yULQonOflr45y6+Kj0V51ln125Pm3w+e1/d71+zGMXzvfcm37Mr7waK2E213zHK6W2VBN6Zc9NpbbCMJrPzxLs7E4FT6P5uNfS83hMXoT8KGTo2/b7Guuc3nrIr3BAvgSdLLP54ncxiK3fEUMTAQ1wQ1tKDjxfHj+DZYa6zXg82tevY+Jq1ZJIDhp0Nn+k+86n6GqNSKfnu06CR73Dum5coHgOX3lI4SCkvI/+1zzZSeNHYWTV0IV4Y+tc/iiuSfZPq55CiIvw7EQUfm83ve8nubj8NBXcPVr+3wVbprmVd98T/hvfT66SZ2g+bTIq12Y4KsZ77HPZ8PDs5sN30PNMzgxCDc8NNwcn0+DD+tAfmioEfk8Pp8FB/DlRPje+DyHMwavkjCdCf8PzcfbFYZbspvh82nwcAlgqRTn8LgDmgWvYTXG2kmHWRG8SGM4JwMnwyrl4glXLBytXUw2iXkjhNItkv449CVOIvk8vorvLExADMHxD+83EPzS100KAAAAAElFTkSuQmCC',
        //             blank:true
        //         }
        //     ]
        // }





        var settingData = {
            "status":1,
            "message":"$相关说明$(status: 这个在将来或许很重要)..."+
                    "(version: 若有新功能加入,靠这个版本号识别)..." +
                    "(addSearchItems: 允许更新时,添加新的搜索到你的搜索列表)..." +
                    "(modifySearchItems: 允许更新时,修改你的搜索列表中的项目)..." +
                    "(connectToTheServer: 允许连接到我的服务器(更新列表,将图标转换为base64等),将来更新使用或永不使用)..." +
                    "(closeBtn: 设置页面右上角的“关闭”圆圈是否显示。true显示,false隐藏)..." +
                    "(newtab: 新标签页打开。0为默认设置,1为新标签页打开)..." +
                    "(foldlist: 折叠当前搜索分类列表。true为折叠,false为展开。)..." +
                    "(settingOpacity: 设置按钮的透明度,值为0-1之间的数,0为透明,1为完全显示,中间值半透明。注：-1为直接关闭按钮,关闭之前请确定自己知道如何再次打开它)..." +
                    "(debug: debug模式,开启后,控制台会输出一些信息,“关闭并保存”按钮将不会在刷新页面)..." +
                    "(fixedTop: 将搜索栏固定到顶端。 true开启,false关闭)..." +
                    "(fixedTopUpward: 固定顶端后，搜索栏下拉不会出现，只有上拉时才出现。 true开启,false关闭)..." +
                    "(baiduOffset: 在百度页面鼠标划过的菜单会出现位移,若有使用其他的style样式,可以修改这个来修复二级菜单的偏移)..." +
                    "(getIcon: 自己添加搜索后获取图标的方式。0为自动，能连接谷歌的情况下用谷歌获取，无法连接的情况下，域名加favicon.ico获取；1为域名加favicon获取，2为使用谷歌获取，3为使用dnspot的服务获取(不建议使用)。或者添加网址，关键字使用%s代替，未测试)..." +
                    "(engineDetails: 第一个值为分类列表标题名称,第二个值与enginelist相关联,必须匹配,第三个值true为显示列表,false为禁用列表。排列顺序与跳转栏上的显示顺序相同，可以用它将分类列表按自己喜欢排序)..." +
                    "(engineList: 各个搜索的相关信息)" +
                    "(rules: 将搜索样式插入到目标网页,同脚本中的rules设置相同,优先级高于脚本中自带的规则。自带了360搜索,可仿写)...",
            "version":4.02,
            "addSearchItems":true,
            "modifySearchItems":true,
            "connectToTheServer":true,
            "closeBtn":true,
            "newtab":0,
            "foldlist":true,
            "setBtnOpacity":0.8,
            "debug":false,
            "fixedTop":true,
            "fixedTopUpward":false,
            "baiduOffset":-120,
            "getIcon":0,
            "engineDetails":[['网页', 'web',true],['购物','shopping',true],['社交', 'sociality',true],['资产', 'property',true],['证书透明','certificate',true],['企业信息','companyInformation',true],['漏洞库', 'exploit',true],['威胁情报','threatExchange',true],['指纹识别','fingerprint',true],['代码','code',true],['工具', 'tool',true],['IOT','IOT',true]],
            "engineList":{},
            "rules":[{"name": "360", "url": "/^https?:\\/\\/www\\.so\\.com\\/s\\?/", "enabled": true, "engineList": "web","fixedTop":50, "style": "padding: 10px 0 0 120px;margin-bottom:-10px;z-index:3001;", "insertIntoDoc": {"keyword": "//input[@name='q']", "target": "css;#tabs-wrap", "where": "afterEnd"}}]
        }
        // GM_deleteValue("searchEngineJumpData");
        var getSettingData = GM_getValue("searchEngineJumpData");
        if(getSettingData){
            // console.log("本地存在列表：",getSettingData);
            if(!getSettingData.status && confirm("设置发生错误,脚本将会复原出厂设置")){
                GM_deleteValue("searchEngineJumpData");
                window.location.reload();
            }

            // 查看本地配置信息是否完整
            for(let value in settingData){
                if(!getSettingData.hasOwnProperty(value)){
                    console.log("属性不存在： ",value);
                    getSettingData[value] = settingData[value];
                    GM_setValue("searchEngineJumpData",getSettingData);
                }
            }

            // 获取版本,用于搜索列表更新
                // console.log("当前版本号和目标版本号: ",getSettingData.version,settingData.version);
            if(parseFloat(getSettingData.version) < settingData.version){
                console.log("版本过低,开始更新,当前版本号和目标版本号: ",getSettingData.version,settingData.version);
                // 1.96 更新 修改a站搜索链接
                // if(getSettingData.modifySearchItems){
                //     getSettingData.engineList = modifySearchItemsFun(getSettingData.engineList,"http://www.acfun.tv/search.aspx#query=%s","http://www.acfun.cn/search/?#query=%s")
                // }
                // 版本3.02 添加 自用网站-搜狗表情
                // if(getSettingData.addSearchItems && getSettingData.engineList.hasOwnProperty("mine")){
                //     // engineList.mine[8].disable = true; // 对于老用户,默认禁用的状态添加
                //     getSettingData.engineList["mine"].push(engineList.mine[8])
                // }
                // 4.01
                // if(getSettingData.addSearchItems){
                //     // engineList.mine[8].disable = true; // 对于老用户,默认禁用的状态添加
                //     if(getSettingData.engineList.hasOwnProperty("web")){
                //         getSettingData.engineList["web"].push(engineList.web[7])
                //     }
                //     if(getSettingData.engineList.hasOwnProperty("shopping")){
                //         getSettingData.engineList["shopping"].push(engineList.shopping[8])
                //     }
                //     if(getSettingData.engineList.hasOwnProperty("music")){
                //         getSettingData.engineList["music"].push(engineList.music[6])
                //         getSettingData.engineList["music"].push(engineList.music[7])
                //     }
                // }
                // 4.02
                if(getSettingData.addSearchItems){
                    // engineList.mine[8].disable = true; // 对于老用户,默认禁用的状态添加
                    if(getSettingData.engineList.hasOwnProperty("web")){
                        getSettingData.engineList["web"].push(engineList.web[8])
                    }
                }

                // 更新本地版本 其他相关信息
                getSettingData.version = settingData.version;
                getSettingData.message = settingData.message;
                GM_setValue("searchEngineJumpData",getSettingData);
            }

            engineList = getSettingData.engineList;

        } else {
            console.log("未发现本地列表");
            settingData.engineList = engineList;
            console.log("初始化：",settingData);

            GM_setValue("searchEngineJumpData",settingData);
            getSettingData = GM_getValue("searchEngineJumpData");
        }

        // 处理enginlist.detail的相关信息
        var engineDetails = getSettingData.engineDetails;
        //列表分类显示情况
        var getDetails = engineDetails.map(function(value,index){
            return value[2]?index:-index;
        })

        // 列表分类的key value
        var getDetailsL = getDetails.length;
        var details = [];
        for(let i=0;i<getDetailsL;i++){
            details[getDetails[i]] =  engineDetails[i];
        };
        engineList.details = details;

        reloadDebug(getSettingData.debug);

        ///test -------------- 测试 start
        debug("searchEngineJump test location.href: ",window.location.href)
        ///test -------------- 测试 end

        // 更新已过期的搜索链接
        function modifySearchItemsFun(engineList,oldURL,newURL){
            for(let value in engineList){
                var item = engineList[value]
                for(let i=0;i<item.length;i++){
                    if(item[i].url === oldURL){
                        item[i].url = newURL;
                        return engineList;
                    }
                }
            }
            return engineList;
        }
        // 更新本地 rule
        function modifySearchItemsRuleFun(name,value){
            var oldRule = getSettingData.rules;
            for(let item in oldRule){
                if(oldRule[item].name == name){
                    console.log("匹配成功, 更新 rule : ", name);
                    oldRule[item] = value;
                    GM_setValue("searchEngineJumpData",getSettingData);
                }
            }
        }

        // parseUri 1.2.2
        // (c) Steven Levithan <stevenlevithan.com>
        // MIT License
        var parseUri = function(str) {
            var o = parseUri.options,
                m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i = 14;

            while (i--) uri[o.key[i]] = m[i] || "";

            uri[o.ds.name] = {};
            uri[o.ds.name][0] = {};
            uri[o.ds.name][0]["key"] = (uri.protocol ? uri.protocol : "http") + "://" + uri.host + (uri.port ? ":" + uri.port : "") + "/";
            uri[o.ds.name][0]["val"] = "/";
            i = 0;
            var tempsub = "/",
                subs = uri[o.key[10]].substr(1).split("/");
            for (var j = 1; j < (subs.length + 1); j++, i++) {
                tempsub += tempsub === "/" ? subs[i] : "/" + subs[i];
                if (subs[i]) {
                    uri[o.ds.name][j] = {};
                    uri[o.ds.name][j]["key"] = subs[i];
                    uri[o.ds.name][j]["val"] = tempsub;
                }
            }

            uri[o.q.name] = {};
            uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
                if ($1) uri[o.q.name][$1] = $2;
            });
            uri[o.aq.name] = {};
            uri[o.key[13]].replace(o.aq.parser, function($0, $1, $2) {
                if ($1) uri[o.aq.name][$1] = $2;
            });

            return uri;
        };
        parseUri.options = {
            strictMode: false,
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {
                name: "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            aq: {
                name: "anchorqueryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            ds: {
                name: "directorySub"
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        };

        function getElementLeft(element){
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null){
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        };
        // --------------------可设置项结束------------------------
        // console.log("engineList: ",engineList);
        //xpath 获取单个元素
        function getElementByXPath(xPath, contextNode, doc) {
            doc = doc || document;
            contextNode = contextNode || doc;
            return doc.evaluate(xPath, contextNode, null, 9, null).singleNodeValue;
        };

        // 从函数中获取多行注释的字符串
        function getMStr(fn) {
            var fnSource = fn.toString();
            var ret = {};
            fnSource = fnSource.replace(/^[^{]+/, '');
            // console.log(fnSource);
            var matched;
            var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
            while (matched = reg.exec(fnSource)) {
                // console.log(matched);
                ret[matched[1]] = matched[2];
            };

            return ret;
        };

        // 事件支持检测.
        // 比如 eventSupported('fullscreenchange', document);
        function eventSupported(eventName, elem) {
            elem = elem || document.createElement('div');
            var prefix = ['o', 'ms', 'moz', 'webkit', ''];

            var l = prefix.length;
            var pEventName;
            var isFunction;
            var setAttr;

            while(l --) {
                pEventName = 'on' + prefix[l] + eventName;

                if (pEventName in elem) {
                    return pEventName.slice(2);
                } else if (typeof elem.setAttribute == 'function') { // setAttribute 是元素节点的方法
                    setAttr = false;
                    if (!elem.hasAttribute(pEventName)) {
                        setAttr = true;
                        elem.setAttribute(pEventName, 'return;');
                    };

                    isFunction = typeof elem[pEventName] == 'function';

                    if (setAttr) elem.removeAttribute(pEventName);

                    if (isFunction) {
                        return pEventName.slice(2);
                    };
                };
            };

            return false;
        };

        // 保存指定对象相关数据
        var data = (function () {
            'use strict';

            var cache = {
                objs: [],
                data: {},
            };

            function data(obj, key, value) {
                var id = cache.objs.indexOf(obj);
                if (id == -1) {
                    id = cache.objs.push(obj) - 1;
                };
                if (!cache.data[id]) {//初始化
                    cache.data[id] = {};
                };
                if (typeof value == 'undefined') {// 取值
                    return typeof key == 'undefined' ? cache.data[id] : cache.data[id][key];
                } else {
                    return cache.data[id][key] = value;
                };
            };

            return data;
        })();

        // 为mouseleave mouseenter事件做个兼容
        // 需要 eventSupported, data函数支持
        var mouseEventListener = (function () {

            var support = {
                mouseleave : eventSupported('mouseleave'),
                mouseenter : eventSupported('mouseenter'),
            };

            var map = {
                mouseleave : 'mouseout',
                mouseenter : 'mouseover',
            };

            return {
                add : function (type, ele, callback) { //事件类型,元素,监听函数
                    if (support[type]) {
                        ele.addEventListener(type, callback, false); //mouseleave,enter不冒泡,所以在冒泡阶段监听事件,不要担心子孙元素进出发生的事件冒泡上来。
                    } else {
                        var listener = data(callback, 'mouseELListener');
                        if (!listener) {
                            listener = function (e) {
                                var relatedTarget = e.relatedTarget; //mouseout,去往的元素;mouseover,来自的元素
                                // 当mouseout（离开ele）去往的元素不是自己的子孙元素
                                // 当mouseover（进入ele）来自的元素不是自己的子孙元素
                                if (!ele.contains(relatedTarget)) { // contains函数,自己.contains(自己) 返回true
                                    callback.call(ele, e);
                                };
                            };
                            data(callback, 'mouseELListener', listener);
                        };

                        ele.addEventListener(map[type], listener, true);
                    };
                },
                remove : function (type, ele, callback) {
                    if (support[type]) {
                        ele.removeEventListener(type, callback, false);
                    } else {
                        ele.removeEventListener(map[type], data(callback, 'mouseELListener'), true);
                    };
                },
            };
        })();

        //获取已滚动的距离
        function getScrolled(container) {
            if (container) {
                return {
                    x:container.scrollLeft,
                    y:container.scrollTop,
                };
            };
            return {
                x: 'scrollX' in window ? window.scrollX : ('pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft || document.body.scrollLeft),
                y: 'scrollY' in window ? window.scrollY : ('pageYOffset' in window ? window.pageYOffset :  document.documentElement.scrollTop || document.body.scrollTop),
            };
        };

        function getElement(selector) {
            if (selector.indexOf('css;') == 0) {
                return document.querySelector(selector.slice(4));
            } else {
                return getElementByXPath(selector);
            };
        };

        function mousedownhandler(e) {
            var target = e.target;

            target = getElementByXPath('ancestor-or-self::a[contains(@class, "sej-engine")]', target);

            // if (!target || target.className.indexOf('sej-engine') == -1) return;
            if (!target || !this.contains(target)) return;

            var value;
            if (typeof iInput == 'function') {
                value = iInput();
            } else {
                if (iInput.nodeName == 'INPUT') {
                    value = iInput.value;
                } else {
                    value = iInput.textContent;
                };
            };

            // // @name     searchEngineJump-NextStage
            if (document.characterSet != "UTF-8") value = encodeURIComponent(value);

            var targetURL = target.getAttribute('url');
            // console.log(targetURL);
            // 如果有post请求
            var postSign = targetURL.indexOf('$post$');
            if(~postSign){
                // var targetBlank =
                var f=getPostFormHTML(targetURL.substring(0,postSign),[targetURL.substring(postSign+6),value],target.getAttribute('target'))
                // a = a.replace("$form$", f);
                target.appendChild(f)
                // a = a.replace("$onclick$", "this.getElementsByTagName('form')[0].submit();return false;");
                // target.removeAttribute('onclick');
                target.setAttribute("onclick","this.getElementsByTagName('form')[0].submit();return false;");
                // alert(f);
            } else{
                //console.log(value);
                target.href = target.getAttribute('url').replace('%s', value);
            }
        };
         //获取  POST 的表单的 HTML
        function getPostFormHTML(url, value, newTab) {
            //console.log(url,value,newTab)
            var ospan = document.createElement('span');
            ospan.style.cssText = 'width:0px;height:0px;';
            var form = "" +
                "<form method='post'" +
                " action='" + url + "'" +
                (newTab ? " target='_blank'" : "") +
                ">" +
                "<input type='hidden'" +
                    " name='" + value[0] + "'" +
                    " value='" + value[1] + "'" +
                    " />" +
                "</form>";
            ospan.innerHTML = form;
            return ospan;
        };

        // iframe 禁止加载
        if (window.self != window.top) return;

        var url = location.href;
        var matchedRule;
        var marchedSign;

        //先判断用户规则
        marchedSign = getSettingData.rules.some(function (rule) {
            rule.url = new RegExp(rule.url.substring(1,rule.url.length-1));
            if (rule.url.test(url)) {
                matchedRule = rule;
                return true;
            };
        });

        // console.log(marchedSign,matchedRule);
        if(!marchedSign){
            rules.some(function (rule) {
                if (rule.url.test(url)) {
                    matchedRule = rule;
                    return true;
                };
            });
        }

        // console.log(matchedRule);
        if (!matchedRule || !matchedRule.enabled) return;

        var iTarget = getElement(matchedRule.insertIntoDoc.target);
        var iInput = typeof matchedRule.insertIntoDoc.keyword == 'function' ? matchedRule.insertIntoDoc.keyword : getElement(matchedRule.insertIntoDoc.keyword);

        ///test -------------- 测试 start
        debug("searchEngineJump test iTarget, iInput: ",iTarget, iInput);
        ///test -------------- 测试 end

        if (!iTarget || !iInput) {
            console.log("脚本 searchEngineJump 搜索引擎快捷跳转 遇到了错误： ");
            console.log("目标有误： iTarget：" + iTarget + "\niInput: " + iInput);
            return;
        }

        // 添加全局样式
        var globalStyle = document.createElement('style');
        globalStyle.type = 'text/css';
        globalStyle.textContent = getMStr(function(){
            var cssText;
            /*
                #sej-container {
                    display: block;
                    position: relative;
                    z-index: 2;
                    padding: 1px 5px 1px 5px;
                    line-height: 1.5;
                    font-size: 13px;
                    font-family: arial,sans-serif;
                    transform-origin: top center;
                    animation: sejopen 0.3s !important;
                    border-bottom-right-radius: 4px;
                    //transition:0.3s;
                }

                #sej-expanded-category {
                    font-weight: bold;
                }

                .sej-engine {
                    line-height: 2;
                    display: inline-block;
                    margin: 0 0px 0 0;
                    border: none;
                    padding: 0 6px;
                    text-decoration: none;
                    font-weight:500;
                    color: #333 !important;
                    transition: background-color 0.15s ease-in-out;
                }
                .sej-drop-list-trigger {

                }
                .sej-drop-list-trigger-shown {
                    background-color: #DEEDFF !important;
                }
                .sej-drop-list-trigger::after {
                    content: '';
                    display: inline-block;
                    margin: 0 0 0 3px;
                    padding: 0;
                    width: 0;
                    height: 0;
                    border-top: 6px solid #BCBCBC;
                    border-right: 5px solid transparent;
                    border-left: 5px solid transparent;
                    border-bottom: 0px solid transparent;
                    vertical-align: middle;
                    transition: -webkit-transform 0.3s ease-in-out;
                    transition: transform 0.3s ease-in-out;
                }
                .sej-drop-list-trigger-shown::after {
                    -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
                }
                .sej-engine:hover {
                    background-color: #EAEAEA;
                }
                .sej-drop-list > .sej-engine {
                    display: block;
                    padding-top: 4px;
                    padding-bottom: 4px;
                }
                .sej-drop-list > .sej-engine:hover {
                    background-color: #DEEDFF;
                }

                .sej-engine-icon {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: none;
                    padding: 0;
                    margin: 0 3px 0 0;
                    vertical-align: text-bottom;
                }

                .sej-drop-list {
                    position: absolute;
                    display: none;
                    opacity: 0.3;
                    top: -10000px;
                    left: 0;
                    min-width: 90px;
                    border: 1px solid #FAFAFA;
                    padding: 5px 0;
                    text-align: left;
                    font-size: 13px;
                    -moz-box-shadow: 2px 2px 5px #ccc;
                    -webkit-box-shadow: 2px 2px 5px #ccc;
                    box-shadow: 2px 2px 5px #ccc;
                    background-color: white;
                    transition: opacity 0.2s ease-in-out,
                        top 0.2s ease-in-out;
                }
                @keyframes sejopen {
                    0% {
                        transform: scale(1, 0.1);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1, 1);
                        opacity: 1;
                    }
                }
                @keyframes iqxinsejopen {
                    0% {
                        transform: scale(0.01, 0.01);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1, 1);
                        opacity: 1;
                    }
                }
            */
        }).cssText;
        document.head.appendChild(globalStyle);

        // 列表对象
        function DropDownList(a, list) {
            this.a = a;
            this.list = list;
            this.init();
        };
        DropDownList.zIndex = 100000000;

        DropDownList.prototype = {
            hidden: true,
            showDelay: 233,
            hideDelay: 233,
            aShownClass: 'sej-drop-list-trigger-shown',

            init: function () {
                var a = this.a;
                var list = this.list;

                var self = this;

                // 进入显示
                mouseEventListener.add('mouseenter', a, function () {
                    clearTimeout(self.hideTimerId);

                    if (self.hidden) {
                        self.showTimerId = setTimeout(function () {
                            self.show();
                        }, self.showDelay);
                    } else {
                        var style = list.style;
                        style.zIndex = DropDownList.zIndex ++;
                        style.opacity = 0.96;
                    };
                });

                // 离开隐藏
                mouseEventListener.add('mouseleave', a, function () {
                    clearTimeout(self.showTimerId);

                    if (!self.hidden) {
                        //list.style.top = parseInt(list.style.top)+6 +"px";
                        list.style.opacity = 0.04;
                        self.hideTimerId = setTimeout(function () {
                            self.hide();
                        }, self.hideDelay);
                    };
                });

                mouseEventListener.add('mouseenter', list, function () {
                    clearTimeout(self.hideTimerId);

                    var style = list.style;
                    style.zIndex = DropDownList.zIndex ++;
                    style.opacity = 0.96;
                });

                mouseEventListener.add('mouseleave', list, function () {

                    list.style.opacity = 0.04;
                    list.style.top = parseInt(list.style.top)+6 +"px";
                    self.hideTimerId = setTimeout(function () {
                        self.hide();
                    }, self.hideDelay);
                });
            },
            show: function () {
                if (!this.hidden) return;
                this.hidden = false;

                var scrolled = getScrolled();
                var aBCRect = this.a.getBoundingClientRect();

                var style = this.list.style;

                var top = scrolled.y + aBCRect.bottom;
                var left = scrolled.x + aBCRect.left;

                if(/^https?:\/\/www\.baidu\.com\/(?:s|baidu)/.test(url)){
                    // top -= 90;
                    top = 26;
                    // left -= 120;
                    left += getSettingData.baiduOffset;
                }

                style.top = top + 6 + 'px';
                style.left = left + 'px';
                style.zIndex = DropDownList.zIndex ++;
                style.display = 'block';

                setTimeout(function () {
                    style.opacity = 0.96;
                    style.top = top + 'px';
                }, 30);

                this.a.classList.add(this.aShownClass);

            },
            hide: function () {
                if (this.hidden) return;
                this.hidden = true;

                var style = this.list.style;
                style.display = 'none';
                style.opacity = 0.1;

                this.a.classList.remove(this.aShownClass);

            }
        };

        var pageEncoding = (document.characterSet || document.charset).toLowerCase();

        // 创建dom
        var aPattern = '<a href="" class="sej-engine" target="$blank$" encoding="$encoding$" url="$url$"><img src="$favicon$" class="sej-engine-icon" />$name$</a>';
        var container = document.createElement('sejspan');
        container.id = 'sej-container';
        container.className = "rwl-exempt";

        container.addEventListener('mousedown', mousedownhandler, true);

        if (matchedRule.style) {
            container.style.cssText = matchedRule.style;
        };

        var dropLists = [];
        engineList.details.forEach(function (item) {
            var category = item[1];
            var cName = item[0];
            var engines = [];

            engineList[category].forEach(function (engine) {
                // 检测是否用搜索搜某一网站 site:xxx.xx
                var engineUrl = engine.url;
                var siteIndex = engineUrl.lastIndexOf("site");
                var siteMark = null;
                if(~siteIndex){
                    var siteURL = engineUrl.slice(siteIndex);
                    siteMark = /([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/.test(siteURL);
                    // console.log(/([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/.test(siteURL),siteURL);
                }

                if (!siteMark && matchedRule.url.test(engineUrl)) return;// 去掉跳转到当前引擎的引擎
                if(engine.disable) return;
                var a = aPattern.replace('$encoding$', (engine.encoding || 'utf-8').toLowerCase())
                    .replace('$url$', engineUrl)
                    .replace('$name$', engine.name);

                if (engine.favicon) {
                    a = a.replace('$favicon$', engine.favicon);
                } else {
                    a = a.replace('src="$favicon$"', '');
                };
                if (getSettingData.newtab || engine.blank) {
                    a = a.replace('$blank$', "_blank");
                } else {
                    a = a.replace('target="$blank$"', '');
                };

                engines.push(a);
            });
            // 非空列表
            if (!engines.length) return;

            engines = engines.join('');

            // 展开当前搜索分类列表
            if (!getSettingData.foldlist && category == matchedRule.engineList) {
                container.innerHTML = engines;
            } else {
                var dropList = document.createElement('sejspan');
                dropList.className = 'sej-drop-list rwl-exempt';
                dropList.innerHTML = engines;

                // 非空列表
                var a = dropList.firstElementChild.cloneNode(true);
                a.className = a.className + ' sej-drop-list-trigger';
                a.lastChild.nodeValue = cName;
                dropLists.push([a, dropList]);
            };
        });

        //将各个搜索列表插入文档中
        dropLists.forEach(function (item) {
            container.appendChild(item[0]);
            document.body.appendChild(item[1]);
            item[1].addEventListener('mousedown', mousedownhandler, true);

            new DropDownList(item[0], item[1]);
        });

        // 插入到文档中
        switch (matchedRule.insertIntoDoc.where.toLowerCase()) {
            case 'beforebegin' :
                iTarget.parentNode.insertBefore(container, iTarget);
            break;
            case 'afterbegin' :
                if (iTarget.firstChild) {
                    iTarget.insertBefore(container, iTarget.firstChild);
                } else {
                    iTarget.appendChild(container);
                };
            break;
            case 'beforeend' :
                iTarget.appendChild(container);
            break;
            case 'afterend' :
                if (iTarget.nextSibling) {
                    iTarget.parentNode.insertBefore(container, iTarget.nextSibling);
                } else {
                    iTarget.parentNode.appendChild(container);
                };
            break;
        };

        // todo: 此处与上面重复,在百度页面会插入两次
        if(/^https?:\/\/www\.baidu\.com\/(?:s|baidu)/.test(url)){
            var sej = document.getElementsByTagName("sejspan")[0];
            sej.appendChild(globalStyle);

            dropLists.forEach(function (item) {
                container.appendChild(item[0]);
                // document.body.appendChild(item[1]);
                var sej = document.getElementsByTagName("sejspan")[0];
                sej.appendChild(item[1]);
                item[1].addEventListener('mousedown', mousedownhandler, true);

                new DropDownList(item[0], item[1]);
            });
        };

        // 由于与要插入网页的样式无法很好的兼容,更改源网页的样式
        if(matchedRule.stylish){GM_addStyle(matchedRule.stylish);};
        //固定搜索栏
        if(getSettingData.fixedTop){
            // 判断是否需要只在向上滚动时显示
            if(getSettingData.fixedTopUpward){
                window.onmousewheel = document.onmousewheel = function(eee){
                    if(eee.wheelDelta>0){
                        fixedTopFun(matchedRule.fixedTop);
                    }else{
                        var obj = document.getElementById("sej-container");
                        obj.style.cssText = matchedRule.style;
                    }
                }
            } else {
                window.onscroll = function(){
                    fixedTopFun(matchedRule.fixedTop);
                };
            }
            // 固定搜索栏
            function fixedTopFun(height){
                var obj = document.getElementById("sej-container");
                var objTop = obj.offsetTop ;
                var objLeft = obj.offsetLeft ;

                var current = obj.offsetParent;
                while (current !== null){
                    objLeft += current.offsetLeft;
                    current = current.offsetParent;
                }

                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                if(height){
                    objTop = height;
                }else{
                    height = 0;
                }

                if(scrollTop <= objTop){
                    obj.style.cssText = matchedRule.style;
                }else if(obj.style.position!="fixed"){
                    // console.log(scrollTop,objTop,scrollTop - objTop);
                    var objstyle = window.getComputedStyle(obj , null);
                    var marginTop = parseInt(objstyle.marginTop);
                    var marginLeft = parseInt(objstyle.marginLeft);
                    var marginRight = parseInt(objstyle.marginRight);
                    //console.log(objLeft,marginLeft);

                    obj.style.top = height - marginTop + 'px';

                    // 如果之前未设置颜色,则默认设置为白色
                    if(objstyle.backgroundColor === "rgba(0, 0, 0, 0)" || objstyle.backgroundColor === "transparent"){
                        obj.style.background = '#fff';
                    }
                    obj.style.left = getElementLeft(obj) - marginLeft + "px";
                    // obj.style.left = getElementLeft(obj) + "px";
                    debug("objLeft: ",objLeft,"marginLeft: ",marginLeft,"marginRight: ",marginRight,"getElementLeft: ",getElementLeft(obj));
                    // 知乎等网站的情况 利用 margin 居中
                    if(marginRight === marginLeft && marginRight != 0){
                        obj.style.left = marginLeft + "px";
                    }
                    // 淘宝等网站的情况 利用 text-align 居中
                    if(obj.style.textAlign === "center"){
                        obj.style.width = objstyle.width;
                    }

                    obj.style.position = 'fixed';
                }
            }
        } else {
            window.onscroll = function(){
                return true;
            };
        };

        // -------------------设置相关--------------------------------
        // 设置按钮相关
        var dragEl = null;
        var dragData = null;

        function SEJsetting(){
            this.ele = document.createElement("div");
            this.mask = document.createElement("div");

            this.parentTemp = null;
            this.editTemp = null;
            this.online = null;
            this.init();
        };

        SEJsetting.prototype = {
            testabc : "hahah",
            aPatternParent : "<div></div>",

            init: function () {
                // console.log("init...");
                var that = this;

                this.ele.id = "settingLayer";
                this.mask.id = "settingLayerMask";

                this.addGlobalStyle();

                this.addContent();

                this.mask.addEventListener("click",function(){
                    that.hide();
                });
                this.ele.addEventListener("click",function(e){
                    e.stopPropagation();
                });

                this.mask.appendChild(this.ele);
                document.body.appendChild(this.mask);

                // 绑定事件
                this.ele.addEventListener("click",that.domClick.bind(this),false);
                this.dragEvent();
                this.setDragNode(this.ele); //设置拖动
                // input[range]
                that.rangeChange(true);
                document.querySelector("#setBtnOpacityRange").addEventListener("input",that.rangeChange);
            },
            dragEvent: function(){
                var that = this;
                var odivsdrag = document.querySelectorAll(".drag");
                [].forEach.call(odivsdrag,function(odiv){
                    odiv.addEventListener("dragstart",that.domdragstart,false);
                    odiv.addEventListener('dragenter', that.domdragenter, false);
                    odiv.addEventListener('dragover', that.domdragover, false);
                    odiv.addEventListener('dragleave', that.domdragleave, false);
                    odiv.addEventListener('drop', that.domdrop, false);
                    odiv.addEventListener('dragend',that.domdropend, false);
                });
            },
            addContent: function(){
                var aPattern = '<span draggable="true" class="drag">' +
                                '<span class="sej-engine"' +
                                ' data-xin="$xin$" ' +
                                ' data-iqxinimg="$img$" ' +
                                ' data-iqxintitle="$title$" ' +
                                ' data-iqxinlink="$link$" ' +
                                ' data-iqxintarget="$blank$" ' +
                                ' data-iqxindisabled="$disabled$" ' +
                                '><img src="$favicon$" class="sej-engine-icon" style="padding-bottom:3px;"/><span>$name$</span></span>' +
                                ' <span class="iqxin-set-edit" title="编辑 Edit"><img class="sej-engine-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAACDklEQVR4nJXVzUtUURjH8Y/mSNKkki2iwiApxHQ1q/6C+gusoCB6oxbRRqFNL4sWtRKqhVSLIDe1CqpNiwjKIilKLKKFEr2Z2qI0xxHN0+LOm+PMOPOc1T2H7/f5ncO991BdNer30zmxKrl0xV2zKJjRoy6aqkkvbbdVLPuUq+8+5uGXnVILki7qsxgtNDtrTNLcijHvrdYsft0/wQ8DZgSzeqMUDW4IJceYHcvwCd1ies0KZvWI1TnhIH6574Olgg0E74zmhZ902j304by4Cxp5LPjtQNmjy3XPVK2rgmCBCcGgdVXhdBgUBCMEwVMNVeIvBMFLifKC8vgrndFBlRJUhJcWFMd3ZfGuzFRxwWrdu3KTxQQVhi8lqApfKVhf0d4bc2/OckG9Pkur7r3TEw+1FRO0GxdM2Vc2/HHBgr1If935UTfigbt5+C27MeSo9+m5GJYitlCwWR2G8oQZ/FgWX1aFgnZMG852v5nFR4rhMn+2dDVJYFpKqy0SDksUhF9FsE0bWgyIa9bIanihoEUcDTrSz4ueOVMOLxQkzVkrZcaoNz755rmpcnihYNghm3w26Ys/5cGcIKgRBJDyqCIquj8C1PqKZvHK+qVrJ5bMRwmGterU64pkkZupWO3RjXkzUZj9+jVZMGK6IsEaHTbgjpOSUYZL/pa5m4qPIbtyznpHvJaqGB53O33h4T/3VzLuzDhE6AAAAABJRU5ErkJggg=="/></span>' +
                                ' <span class="iqxin-set-del" title="删除 Delete"><img class="sej-engine-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAADAFBMVEUAAADsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVHsbVH///9VVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///8dej9TAAAAU3RSTlMAAABm7P/sZgAAABPO////zhQAAB/i/////////+IfAAAe4fvk4AAAAAAd/+Q3GxwAFR85FQBjz+LPY+v////r6//////rZM/h4c9jABUdHRUAAP0EcPoAAAEuSURBVHic7ZRnc8IwDIbdEUZHGB0kDsMOMcOMttBBB93Qvcj//y9VjB0Czh13/dz3ixT5OVmSYyMktLK6tm74oYxEMpVGUW1sbm2bM8DMZHP5OWBnd2+/YNnYAWHbKhRL5cocQKjrWFWPuSDmVS3HpUQu1eoNQkiTM9xqd7oHoG6n3cKMNyHcqNfQ4VGPUsr7nh0FbK/PIdw7PkGnZwOZNrqF9AfnF+jyaigLixYp/eH1Dbq9u4eAHyOAHh5HaPz0DCnjANjm5fUNvX98QoGCxyo5Fjmh0K/vH2hzAi0KnqnymMgJrU6gzemQBM+DZpX1/XBYUyAYTTAuZTUg+Aw8Zf+BvwJLR730sPTjXgD0H2YB0BUClXKpGAeE1y+fy2ZMfX12gdOpZMLQAfkE/AL7e5vGZF+dOQAAAABJRU5ErkJggg=="></span>' +
                                '</span>';
                var details = engineList.details;
                // 若根据数组长度获取,负数引导的为属性,不再length长度之内,所以来个大体的数字,当都为空时,结束循环
                // var detailsLength = details.length;
                var detailsLength = 99;
                for (let i=0;i<detailsLength;i++){
                    var j = i;
                    j = details[j] ? j : -j;
                    if (!details[j]){break};

                    var odiv = document.createElement("div");
                    odiv.id = details[j][1]; // "web"
                    odiv.classList.add("iqxin-items");

                    var oDivTitle = document.createElement("div");
                    oDivTitle.classList.add("sejtitle","drag");
                    oDivTitle.setAttribute("draggable","true");
                    oDivTitle.dataset.iqxintitle = details[j][1];
                    oDivTitle.dataset.xin = j;
                    oDivTitle.innerHTML ='<span class="iqxin-pointer-events">' + details[j][0] + '</span>' +
                                        '<span class="iqxin-title-edit" title="编辑 Edit"><img class="sej-engine-icon" src="' + icon.edit + '"/></span>'+
                                        ' <span class="iqxin-set-title-del" title="删除 Delete"><img class="sej-engine-icon" src="' + icon.del + '"></span>';
                    odiv.appendChild(oDivTitle);

                    var oDivCon = document.createElement("div");
                    oDivCon.classList.add("sejcon");
                    var oDivConStr = "";
                    var engineListItme = engineList[details[j][1]];
                    var itemLength = engineListItme.length;
                    for(let ii=0;ii<itemLength;ii++){
                        var jj = ii;
                        if (!engineListItme[jj]){break};
                        var a = aPattern.replace('$name$', engineListItme[jj].name)
                                .replace('$favicon$', engineListItme[jj].favicon)
                                .replace("$xin$",jj);
                        // 添加属性
                        a = a.replace("$img$", engineListItme[jj].favicon)
                            .replace("$title$", engineListItme[jj].name)
                            .replace("$link$", engineListItme[jj].url);
                        if (engineListItme[jj].blank) {
                            a = a.replace('$blank$', "_blank");
                        } else {
                            a = a.replace('data-iqxintarget="$blank$"', '');
                        };
                        if (engineListItme[jj].disable) {
                            a = a.replace('$disabled$', "true");
                        } else {
                            a = a.replace('data-iqxindisabled="$disabled$"', '');
                        };

                        oDivConStr += a;
                    };

                    oDivConStr += "<span class='iqxin-additem'>+</span>";

                    oDivCon.innerHTML = oDivConStr;
                    odiv.appendChild(oDivCon);

                    this.ele.appendChild(odiv);
                };

                // 更多设置 菜单
                var btnEle2 = document.createElement("div");
                btnEle2.id = "btnEle2"
                var fixedTop_checked = getSettingData.fixedTop?"checked":"";
                var debug_checked = getSettingData.debug?"checked":"";
                var foldlist_checked = getSettingData.foldlist?"checked":"";

                // var setBtnOpacity_value = getSettingData.setBtnOpacity;
                var btnStr2 = "<div>" +
                            "<span id='xin-reset' title='慎点,出厂重置'>清空设置</span>" +
                            "<span id='xin-modification' title='edit 分享自己的配置或清空配置'>配置文件</span>" +
                            "<span id='xin-importing' title='importing 导入更为专业的搜索引擎'>导入</span>" +
                            // "<span id='iqxin-debugS' title='对设置菜单有一定的影响'>" +
                            //     "<label>debug<input id='iqxin-debug' type='checkbox' name='' " +
                            //         debug_checked +
                            //     " style='vertical-align:middle;'></label>" +
                            // "</span>" +
                            "<span id='xin-foldlists'>" +
                                "<label>折叠当前搜索分类<input id='iqxin-foldlist' type='checkbox' name='' " +
                                    foldlist_checked +
                                " style='vertical-align:middle;'></label>" +
                            "</span>" +
                            "<span id='iqxin-fixedTopS' title='fixedTop 当滚动页面时,固定到页面顶端。某些页面的样式存在问题'>" +
                                "<label>固定到顶端<input id='iqxin-fixedTop' type='checkbox' name='' " +
                                    fixedTop_checked +
                                " style='vertical-align:middle;'></label>" +
                            "</span>" +
                            "<span id='xin-setBtnOpacity' title='设置按钮透明度'>设置按钮透明度 <input type='range' step='0.01'  min='0' max='1' value='"+ (getSettingData.setBtnOpacity<0?-getSettingData.setBtnOpacity:getSettingData.setBtnOpacity) +"' id='setBtnOpacityRange'><i style='display:inline-block;width:3em;text-align:center;' class='iqxin-setBtnOpacityRangeValue' title='按钮 显示/隐藏(非透明)),请确定知道自己如何再次打开; 火狐非高级玩家建议别禁用'></i></span>" +

                            "</div>";
                btnEle2.innerHTML = btnStr2;
                this.ele.appendChild(btnEle2);


                // 添加按钮
                var btnEle = document.createElement("div");
                btnEle.id = "btnEle"

                var btnStr = "<div class='btnEleLayer'>" +
                            "<span class='feedback'><a target='_blank' href='https://greasyfork.org/zh-CN/scripts/'>反馈 greasyfork</a></span>" +
                            "<span class='feedback'><a target='_blank' href='https://github.com/delikely/'>反馈 GitHub</a></span>" +
                            "<span id='moreSet' title='more set'>更多设置</span>" +
                            "<span id='xin-newtab' title='open newtab 是否采用新标签页打开的方式'>打开方式：" +
                                "<select id='iqxin-globalNewtab'>" +
                                    "<option value='globalDef'>默认页面 ▽</option>" +
                                    "<option value='globalNewtab'" + (getSettingData.newtab?"selected":"")  + ">新标签页 ▽</option>" +
                                "</select>" +
                            "</span> " +
                            "<span id='xin-addDel' title='add & del 增加新的或者删除现有的搜索'>增加 / 删除</span> " +
                            "<span id='xin-save' title='save & close'>保存并关闭</span>" +
                            "</div>";
                btnEle.innerHTML = btnStr;
                this.ele.appendChild(btnEle);

                // 可以拖动的顶栏
                var dragDom = document.createElement("div");
                dragDom.id = "dragDom";
                dragDom.style.cssText = "height:16px;width:97%;position:absolute;top:0;cursor:move;";
                this.ele.appendChild(dragDom);

                // 增加搜索列表
                var nSearchList = document.createElement("div");
                nSearchList.id = "nSearchList";
                nSearchList.style.cssText = "visibility:hidden;opacity:0;transition:0.3s;position:absolute;bottom:10%;right:5%;padding:5px 10px;border-radius:4px;border:1px solid #EC6D51;color:#ec6d51;cursor:pointer;background:#fff;";
                nSearchList.innerHTML = "增加新的搜索列表";
                this.ele.appendChild(nSearchList);

                // 关闭按钮
                if(getSettingData.closeBtn){
                    var closebtnELe = document.createElement("span");
                    closebtnELe.id = "xin-close";
                    closebtnELe.setAttribute("title","close 关闭");
                    this.ele.appendChild(closebtnELe);
                }
            },
            show: function(){
                var style = this.mask.style;
                var eleStyle = this.ele.style;
                style.display = "flex";
                eleStyle.transform = "translateY(-20%)";
                document.body.style.overflow = "hidden";

                this.windowResize();

                // if(document.querySelector("xin-newtab")){
                //     document.querySelector("#xin-newtab").querySelectorAll("option")[getSettingData.newtab].setAttribute("selected","selected");
                // }

                setTimeout(function () {
                    style.opacity = 1;
                    eleStyle.transform = "none";
                }, 30);
            },
            hide: function(){
                this.allBoxClose(); // 关闭所有次级窗口、菜单

                var style = this.mask.style;
                this.ele.style.transform = "translateY(20%)";
                style.opacity = 0;
                setTimeout(function () {
                    style.display = "none";
                    document.body.style.overflow = "auto";
                }, 500);
            },
            reset: function(){
                if(confirm("将会删除用户设置！")){
                    GM_deleteValue("searchEngineJumpData");
                    window.location.reload();
                }
            },
            // 增加 “添加删除框”
            addDel: function(e){
                if (e.target.classList.contains("iqxin-btn-active")){
                    this.addDelremove();
                } else {
                    // console.log("不存在,增加增加");
                    var obtn = document.querySelector("#xin-addDel");
                    obtn.classList.add("iqxin-btn-active");

                    var odom = document.querySelectorAll(".iqxin-set-del");
                    [].forEach.call(odom,function(div){
                        div.classList.add("iqxin-set-active");
                    });

                    // 标题添加删除框
                    var odom = document.querySelectorAll(".iqxin-set-title-del");
                    [].forEach.call(odom,function(div){
                        // console.log(div);
                        div.classList.add("iqxin-set-active");
                    });

                    // 增加单个搜索
                    var oitemAdd = document.querySelectorAll(".iqxin-additem");
                    [].forEach.call(oitemAdd,function(div){
                        // console.log(div);
                        div.classList.add("iqxin-set-active");
                    });

                    // 添加搜索列表
                    var olistAdd = document.querySelector("#nSearchList");
                    olistAdd.classList.add("iqxin-set-active");

                }
            },
            // 关闭 “添加删除框”
            addDelremove: function(bool){
                var obtn = document.querySelector(".iqxin-btn-active");
                if(obtn){
                    obtn.classList.remove("iqxin-btn-active");

                    var odom = document.querySelectorAll(".iqxin-set-active");
                    [].forEach.call(odom,function(div){
                        div.classList.remove("iqxin-set-active");
                    });

                    var oitemAdd = document.querySelectorAll(".iqxin-additem");
                    [].forEach.call(oitemAdd,function(div){
                        div.classList.remove("iqxin-set-active");
                    });
                }
                this.addItemBoxRemove();
            },

            // 界面,框：添加新的搜索
            addItemBox: function(bool){
                this.isOnline();
                this.addItemBoxRemove();

                var newDiv = document.createElement("div");
                newDiv.id= "newSearchBox";
                newDiv.innerHTML=""+
                    "<span>标&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp题 : </span><input id='iqxin-newTitle' placeholder='必填' onfocus='this.select()' /> <br/><br/>" +
                    "<span>链&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp接 : </span><input id='iqxin-newLink' placeholder='必填' onfocus='this.select()' /> <br/><br/>" +
                    "<span>图&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp标 : </span><input id='iqxin-newIcon' placeholder='选填,留空则自动获取' onfocus='this.select()' /> <br/><br/>" +
                    "<span>打开方式 : " +
                        '<select id="iqxin-newTarget" style="border-radius: 4px;border: none;padding: 2px 0 2px 2px"> ' +
                        '<option value="default">新标签页打开</option> ' +
                        '<option value="newtab">当前页打开</option> ' +
                        '<select> ' +
                    "</span>" +
                    "<br/><br/>" +
                    "<span style=''><a target='_blank' style='color:#999;' href='https://greasyfork.org/zh-CN/scripts/'>相关使用说明</a></span>" +
                    "&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp;" +
                    "<button id='addItemBoxEnter' class='addItemBoxEnter addItemBoxBtn iqxin-enterBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp" +
                    "<button id='addItemBoxCancel' class='addItemBoxCancel addItemBoxBtn iqxin-closeBtn'>取消</button>" +
                    "";

                this.ele.appendChild(newDiv);
                document.querySelector("#iqxin-newTitle").focus();
            },
            // 内部逻辑,：添加新的搜索
            addItemEnger: function(){
                var otitle,olink,oimg,oblank;
                otitle = document.querySelector("#iqxin-newTitle").value;
                olink = document.querySelector("#iqxin-newLink").value;
                oimg = document.querySelector("#iqxin-newIcon").value;
                oblank = document.querySelector("#iqxin-newTarget").selectedIndex;

                if (!oimg){
                    oimg = this.getICON(olink);
                }

                var a = '<span class="sej-engine"' +
                            ' data-iqxinimg="$img$" ' +
                            ' data-iqxintitle="$title$" ' +
                            ' data-iqxinlink="$link$" ' +
                            ' data-iqxintarget="$blank$" ' +
                            '><img src="$favicon$" class="sej-engine-icon" />$name$</span>' +
                            '<span class="iqxin-set-edit" title="编辑 Edit">' +
                                '<img class="sej-engine-icon" src="' + icon.edit + '">' +
                            '</span> ' +
                            '<span class="iqxin-set-del iqxin-set-active" title="删除 Delete">' +
                                '<img class="sej-engine-icon" src="' + icon.del + '">' +
                            '</span>' ;

                a = a.replace("$img$", oimg)
                    .replace("$title$", otitle)
                    .replace("$link$", olink);

                if (oblank){
                    a = a.replace('data-iqxintarget="$blank$"', '');
                } else {
                    a = a.replace('$blank$', "_blank");
                };

                a = a.replace('$name$', otitle)
                    .replace('$favicon$', oimg);

                var ospan = document.createElement("span");
                ospan.className = "drag";
                ospan.innerHTML = a;

                this.parentNode.insertBefore(ospan,this.parentNode.lastChild);

                // 添加完成,移除添加框
                this.addItemBoxRemove();
            },
            addItemBoxRemove: function(ele){
                ele = ele?ele:"#newSearchBox"
                var newBox = document.querySelector(ele);
                if(newBox){
                    newBox.style.transform = "scale(0.01, 0.01)";
                    newBox.style.opacity = "0";
                    setTimeout(function(){
                        newBox.parentNode.removeChild(newBox);
                    },550);
                }
            },
            // 获取图标
            getICON: function(olink){
                var ourl;
                var mark;
                var uri = parseUri(olink);
                var ohttp = uri.protocol?uri.protocol:"http";
                var siteURL = ohttp + "://" + uri.host;
                // console.log(siteURL);

                if(isNaN(getSettingData.getIcon)){
                    ourl = getSettingData.getIcon;
                } else {
                    mark = parseInt(getSettingData.getIcon);
                    console.log(mark);
                    switch (mark){
                        case 1: ourl = siteURL + "/favicon.ico";break;
                        case 2: ourl = 'https://www.google.com/s2/favicons?domain='+siteURL;break;
                        case 3: ourl = 'http://statics.dnspod.cn/proxy_favicon/_/favicon?domain='+uri.host;break;
                    }
                }

                if(ourl){
                    ourl = ourl.replace("%s", siteURL)
                    return ourl;
                }
                debug("能否连接至google：",this.online);
                if (this.online){
                    ourl = 'https://www.google.com/s2/favicons?domain=' + uri.host;
                    return ourl;
                } else {
                    ourl =  ohttp + "://" + uri.host + "/favicon.ico";
                    return ourl;
                }
            },

            // 界面, 框: 添加新的搜索列表
            addSearchListBox: function(){
                var odiv = document.querySelector("#newSearchListBox");
                if (odiv){
                    this.boxClose("#newSearchListBox");
                    return;
                }
                var newDiv = document.createElement("div");
                newDiv.id= "newSearchListBox";

                var myDate = new Date();
                // var hash = "user" + myDate.getFullYear() + myDate.getMonth() + myDate.getDate() + myDate.getHours() +myDate.getMinutes()+myDate.getSeconds();
                var hash = "user" + myDate.getTime();

                newDiv.innerHTML=""+
                    "<span>列表名称: </span><input id='iqxin-newSearchListName' onfocus='this.select()'>" +
                    "<br><br>" +
                    "<span>内部名称: </span><input id='iqxin-newSearchListInnerName' onfocus='this.select()' value='" + hash + "'>" +
                    "<br><br>" +
                    "<button id='addSearchListBoxEnter' class='addSearchListBoxEnter addItemBoxBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp" +
                    "<button id='addSearchListBoxCancel' class='addSearchListBoxCancel addItemBoxBtn'>取消</button>" +
                    "";
                this.ele.appendChild(newDiv);

                document.querySelector("#iqxin-newSearchListName").focus();
            },
            addSearchListEnger: function(){
                var name = document.querySelector("#iqxin-newSearchListName").value;
                var innerName = document.querySelector("#iqxin-newSearchListInnerName").value;

                if(innerName.length===0){
                    alert("内部名称不能为空");
                    return;
                }
                if(name.length===0){
                    name = innerName;
                }

                var odiv = document.createElement("div");
                odiv.id = innerName;
                odiv.className = "iqxin-items";
                odiv.innerHTML = "" +
                    '<div class="sejtitle" data-iqxintitle="' + innerName + '" data-xin="99">' +
                        '<span class="iqxin-pointer-events">'+ name +'</span>' +
                        '<span class="iqxin-title-edit" title="编辑 Edit">' +
                            '<img class="sej-engine-icon" src="' + icon.edit + '">' +
                        '</span> ' +
                        '<span class="iqxin-set-title-del iqxin-set-active" title="删除 Delete">' +
                            '<img class="sej-engine-icon" src="' + icon.del + '">' +
                        '</span>' +
                    '</div>' +
                    '<div class="sejcon">' +
                        '<span class="iqxin-additem iqxin-set-active">+</span>' +
                    '</div>' +
                "";

                // this.boxClose("#newSearchListBox");
                this.addItemBoxRemove("#newSearchListBox");

                var btnEle = document.querySelector("#btnEle");
                btnEle.parentNode.insertBefore(odiv,btnEle);
            },

            boxClose: function(ele){
                var odiv = document.querySelector(ele);
                if(odiv){
                    odiv.parentNode.removeChild(odiv);
                }
            },

            // 界面 框：修改框
            addEditBox: function(e){
                console.log(e);
                this.addItemBoxRemove();

                var target = e.target.parentNode.firstChild;

                var otitle = target.dataset.iqxintitle;
                var olink = target.dataset.iqxinlink;
                var oicon = target.dataset.iqxinimg;
                var otarget = target.dataset.iqxintarget;
                var odisabled = target.dataset.iqxindisabled;

                this.editTemp = target;

                var strblank;
                if(otarget){
                    strblank = '<option value="default">新标签页打开</option><option value="newtab">当前页打开</option> ';
                } else{
                    strblank = '<option value="default">新标签页打开</option><option value="newtab" selected="selected">当前页打开</option>';
                }

                var strdisable = "";
                if(odisabled){
                    strdisable = "checked='checked'";
                }

                var newDiv = document.createElement("div");
                newDiv.id= "newSearchBox";
                newDiv.style.cssText = "top:"+(e.screenY-120) +"px;left:"+(e.screenX-140) +"px;";
                var innerHTML=""+
                    "<span>标&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp题 : </span><input id='iqxin-newTitle' placeholder='必填' onfocus='this.select()' value='"+ otitle +"' /> <br/><br/>" +
                    "<span>链&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp接 : </span><input id='iqxin-newLink' placeholder='必填' onfocus='this.select()' value='"+ olink +"' /> <br/><br/>" +
                    "<span>图&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp标 : </span><input id='iqxin-newIcon' placeholder='选填,留空则自动获取' onfocus='this.select()' value='"+ oicon +"' /> <br/><br/>" +
                    "<span>打开方式 : " +
                        '<select id="iqxin-newTarget" style="border-radius: 4px;border: none;padding: 2px 0 2px 2px"> ' +
                            '$strblank$' +
                        '<select> ' +
                    "</span>" +
                    "<br/><br/>" +
                    "<span style=''><label>禁用：<input type='checkbox' name='' id='iqxin-newDisabled' $checked$ style='vertical-align:middle;'></label></span>" +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "<button id='editItemBoxEnter' class='editItemBoxEnter addItemBoxBtn iqxin-enterBtn'>确定</button>&nbsp;&nbsp;&nbsp&nbsp&nbsp;&nbsp" +
                    "<button id='addItemBoxCancel' class='addItemBoxCancel addItemBoxBtn iqxin-closeBtn'>取消</button>" +
                    "";

                newDiv.innerHTML = innerHTML.replace("$strblank$", strblank)
                                    .replace("$checked$",strdisable);

                this.ele.appendChild(newDiv);
                setTimeout(function(){newDiv.style.cssText="";},10);
                document.querySelector("#iqxin-newTitle").select();
            },
            addEditBoxEnger: function(){
                var otitle,olink,oimg,oblank,odisabled;
                otitle = document.querySelector("#iqxin-newTitle").value;
                olink = document.querySelector("#iqxin-newLink").value;
                oimg = document.querySelector("#iqxin-newIcon").value;
                oblank = document.querySelector("#iqxin-newTarget").selectedIndex;
                odisabled = document.querySelector("#iqxin-newDisabled").checked;

                this.editTemp.dataset.iqxintitle = otitle;
                this.editTemp.lastChild.innerText = otitle;  //文本节点

                this.editTemp.dataset.iqxinlink = olink;
                this.editTemp.dataset.iqxinimg = oimg;
                this.editTemp.firstChild.src = oimg;

                // 是否新标签页打开
                if (oblank){
                    this.editTemp.removeAttribute("data-iqxintarget");
                } else {
                    this.editTemp.dataset.iqxintarget = "_blank";
                }
                // 是否禁用
                if (odisabled){
                    this.editTemp.dataset.iqxindisabled = "true";
                } else{
                    this.editTemp.removeAttribute("data-iqxindisabled");
                }

                // 修改完成,移除添加框
                this.addItemBoxRemove();
            },

            // 标题编辑
            addTitleEditBox: function(e){
                this.addItemBoxRemove();

                var element = e.target.parentNode.firstChild;
                element.classList.remove("iqxin-pointer-events");

                var flag = document.querySelector("#titleEdit");
                // 存在编辑的标题 && 之前的编辑的节点与点击的节点是同一个节点
                if(flag && flag.parentNode == element){
                        element.innerHTML = element.firstChild.value?element.firstChild.value:"空";
                        element.classList.add("iqxin-pointer-events");
                } else {
                    //  存在编辑的标题,但与点击的不是同一个节点
                    if(flag){
                        flag.parentNode.innerHTML = flag.parentNode.firstChild.value;
                    }
                    var oldhtml = element.innerHTML;
                    var newobj = document.createElement("input");
                    newobj.id = "titleEdit";
                    newobj.type = "text";
                    newobj.value = oldhtml;
                    // newobj.onblur = function(){
                    //     element.innerHTML = this.value?this.value:oldhtml;
                    // }
                    newobj.onkeydown = function(e){
                        if((e.keyCode || e.which) == 13){
                            element.innerHTML = this.value?this.value:oldhtml;
                        } else if((e.keyCode || e.which) == 27){
                            element.innerHTML = oldhtml;
                        }

                        element.classList.add("iqxin-pointer-events");
                    }
                    element.innerHTML = "";
                    element.appendChild(newobj);
                    newobj.select();
                }
            },
            addTitleEditBoxRemove:function(){
                var odiv = document.querySelector("#titleEdit");
                if(odiv){
                    odiv.parentNode.innerHTML = odiv.value?odiv.value:"空";
                }
            },

            // 高级菜单,配置文件编辑界面
            editCodeBox: function(){
                console.log("原始数据： ",getSettingData);
                var userSetting = GM_getValue("searchEngineJumpData")
                var editbox = document.createElement("div");
                // var sData =
                editbox.id = "iqxin-editCodeBox";
                editbox.style.cssText = "position:fixed;" +
                    "top:50%;left:50%;" +
                    "transform:translate(-50%,-50%);" +
                    "background:#ccc;" +
                    "border-radius:4px;" +
                    "padding:10px 20px;" ;
                var innerH = " "+
                    "<p><span style='color:red;font-size:1.2em;'>! ! !</span></br>"+
                    "此处有更多的设置选项,自由度更高,</br>"+
                    "但设置错误会导致脚本无法运行"+
                    "</p>" +
                    "<textarea wrap='off' cols='45' rows='20' style='overflow:auto;border-radius:4px;'>" + JSON.stringify(userSetting,false,4) + "</textarea>" +
                    "<br>" +
                    "<button id='xin-reset'>清空设置</button> &nbsp;&nbsp;&nbsp;" +
                    "<button id='xin-copyCode'>复制</button> &nbsp;&nbsp;&nbsp;" +
                    "<button id='codeboxclose' class='iqxin-closeBtn'>关闭</button> &nbsp;&nbsp;&nbsp;" +
                    "<button id='xin-codeboxsave' class='iqxin-enterBtn'>保存</button>" +
                "";
                // console.log(JSON.stringify(getSettingData,4));
                // console.log(JSON.stringify(getSettingData,null,4));
                editbox.innerHTML = innerH;
                this.ele.appendChild(editbox);
            },
            editCodeBoxSave: function(){
                var codevalue = document.querySelector("#iqxin-editCodeBox textarea").value;
                if(codevalue){
                    // console.log(JSON.parse(codevalue));
                    GM_setValue("searchEngineJumpData",JSON.parse(codevalue));
                    // console.log(GM_getValue("searchEngineJumpData"));
                    // 刷新页面
                    setTimeout(function(){
                        window.location.reload();
                    },300);
                } else {
                    // alert("输入为空");
                    this.reset();
                }
            },
            editCodeBoxClose: function(){
                var box = document.querySelector("#iqxin-editCodeBox");
                if(box){
                    box.parentNode.removeChild(box);
                }
            },

            // 导入窗口
            addImportingBox: function(){
                var odiv = document.querySelector("#importingBox");
                if (odiv){
                    this.boxClose("#importingBox");
                    return;
                }
                var newDiv = document.createElement("div");
                newDiv.id= "importingBox";

                var a ="<p>更加细分的搜索列表, 列表之间会有所重合</p>" +
                       "<ul>";

                for(let i=0;i<engineList_plus.length;i++){
                    // if(engineList_plus.status!=3){continue};
                    console.log(engineList_plus[i]);

                    // 包含网站名称
                    var includeWeb = "";
                    for(let j=0; j<engineList_plus[i].engineList.length;j++){
                        if(j!=0){
                            includeWeb += " | " + engineList_plus[i].engineList[j].name;
                        } else{
                            includeWeb += engineList_plus[i].engineList[j].name;
                        }
                    }

                    a += "<li>"+
                        "<span class='xin-importing-item' xin-importing-id='" + i +"' title='"+ (engineList_plus[i].message?engineList_plus[i].message:engineList_plus[i].engineDetails[0]) +"'>"+ (engineList_plus[i].name?engineList_plus[i].name:engineList_plus[i].engineDetails[0]) + " : </span>" +
                        "<p title='"+ includeWeb +"'>"+ includeWeb +"</p>"
                        "</li>";
                }

                a += "</ul>";

                newDiv.innerHTML=a;

                this.ele.appendChild(newDiv);
            },
            addImportingEnger:function(e){
                // console.log(e);
                // console.log("第几个： ",e.target.getAttribute("xin-importing-id"));
                var engineListID = e.target.getAttribute("xin-importing-id");
                var engineList_temp = engineList_plus[engineListID];
                var elist = engineList_temp.engineList;

                var name = engineList_temp.engineDetails[0];
                var innerName = engineList_temp.engineDetails[1];

                var odiv = document.createElement("div");
                odiv.id = innerName;
                odiv.className = "iqxin-items";
                var innerHTML = "" +
                    '<div class="sejtitle" data-iqxintitle="' + innerName + '" data-xin="99">' +
                        '<span class="iqxin-pointer-events">'+ name +'</span>' +
                        '<span class="iqxin-title-edit" title="编辑 Edit">' +
                            '<img class="sej-engine-icon" src="' + icon.edit + '">' +
                        '</span> ' +
                        '<span class="iqxin-set-title-del iqxin-set-active" title="删除 Delete">' +
                            '<img class="sej-engine-icon" src="' + icon.del + '">' +
                        '</span>' +
                    '</div>' +
                    '<div class="sejcon">' +
                    "";

                // 具体列表
                for(let i=0;i<elist.length;i++){
                    var a = '<span draggable="true" class="drag">' +
                                '<span class="sej-engine"' +
                                ' data-iqxinimg="$img$" ' +
                                ' data-iqxintitle="$title$" ' +
                                ' data-iqxinlink="$link$" ' +
                                ' data-iqxintarget="$blank$" ' +
                                '><img src="$favicon$" class="sej-engine-icon" />$name$</span>' +
                                '<span class="iqxin-set-edit" title="编辑 Edit">' +
                                    '<img class="sej-engine-icon" src="' + icon.edit + '">' +
                                '</span> ' +
                                '<span class="iqxin-set-del iqxin-set-active" title="删除 Delete">' +
                                    '<img class="sej-engine-icon" src="' + icon.del + '">' +
                                '</span>' +
                            '</span>';

                    a = a.replace("$img$", elist[i].favicon)
                        .replace("$title$", elist[i].name)
                        .replace("$link$", elist[i].url);

                    if (elist[i].blank){
                        a = a.replace('$blank$', "_blank");
                    } else {
                        a = a.replace('data-iqxintarget="$blank$"', '');
                    };

                    a = a.replace('$name$', elist[i].name)
                        .replace('$favicon$', elist[i].favicon);

                    innerHTML += a;
                }

                 innerHTML += "" +
                    '<span class="iqxin-additem iqxin-set-active">+</span>' +
                    '</div>' +
                "";


                odiv.innerHTML = innerHTML;

                this.addItemBoxRemove("#importingBox");

                var btnEle = document.querySelector("#btnEle");
                btnEle.parentNode.insertBefore(odiv,btnEle);
            },

            // “设置按钮” 透明度
            setBtnOpacityFun: function(){
                if(~window.navigator.userAgent.indexOf("Chrome")){
                    var odom = document.querySelector("#setBtnOpacityRange");
                    var odomV = odom.value;
                    // odom.style.backgroundSize = odom.value*100 +"% 100%";
                    console.log(odomV,getSettingData.setBtnOpacity);
                    if(getSettingData.setBtnOpacity<0){
                        document.querySelector(".iqxin-setBtnOpacityRangeValue").innerHTML = odomV;
                        odom.style.background = "-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, #fff";
                    }else{
                        document.querySelector(".iqxin-setBtnOpacityRangeValue").innerHTML = "禁用";
                        odom.style.background = "-webkit-linear-gradient(left,#bdbdbd,#c6c7c7) no-repeat, #fff";
                    }
                    odom.style.backgroundSize = odom.value*100 +"% 100%";

                    getSettingData.setBtnOpacity = -getSettingData.setBtnOpacity;
                } else {
                    console.log("非chrome");
                    iqxinShowTip("抱歉,目前只支持chrome类浏览器",2500);
                }
            },

            // 标题点击 （开关搜索列表）（可以并入到下面的点击事件）
            titleClick: function(e){
                var target = e.target;
                target.dataset.xin = -parseInt(target.dataset.xin);
            },
            // 点击事件   此处的 if 需要根据实际情况替换成 elseif (switch)
            domClick: function(e){
                var targetClass = e.target.className;
                var targetid = e.target.id;
                debug("点击事件：%o, ID: %o, class: %o, e: %o",e.target,targetid,targetClass,e)

                // 删除搜索
                if(~e.target.className.indexOf("iqxin-set-del")){
                    // console.log(e.target);
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                };
                // 删除搜索列表
                if(~e.target.className.indexOf("iqxin-set-title-del")){
                    // console.log(e.target, e.target.parentNode.parentNode);
                    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
                };

                if(~e.target.className.indexOf("iqxin-additem")){
                    // console.log("此处会有个弹框添加新搜索");
                    this.parentNode = e.target.parentNode;
                    this.addItemBox();
                    // console.log(this);
                };
                if(e.target.className==="sej-engine"){
                    console.log("sej-engine 被点击");
                    e.target.dataset.iqxindisabled = e.target.dataset.iqxindisabled?"":"true";
                };
                if(~targetClass.indexOf("addItemBoxCancel")){
                    this.addItemBoxRemove();
                };
                // 添加新的搜索 确定
                if(~targetClass.indexOf("addItemBoxEnter")){
                    this.addItemEnger();
                };
                // 添加新的搜索列表 确定
                if(targetid === "nSearchList"){
                    debug("添加新的搜索列表");
                    this.addSearchListBox();
                };
                if(targetid === "addSearchListBoxEnter"){
                    debug("向网页添加元素");
                    this.addSearchListEnger();
                };
                if(targetid === "addSearchListBoxCancel"){
                    debug("移除盒子");
                    // this.boxClose("#newSearchListBox");
                    this.addItemBoxRemove("#newSearchListBox");

                };

                // 修改搜索 确定
                if(~targetClass.indexOf("editItemBoxEnter")){
                    // console.log(e);
                    this.addEditBoxEnger();
                };

                // 编辑框
                if(~e.target.className.indexOf("iqxin-set-edit")){
                    this.addEditBox(e);
                }
                // 标题编辑框
                if(~targetClass.indexOf("iqxin-title-edit")){
                    e.stopPropagation();
                    this.addTitleEditBox(e);
                }
                if(~targetClass.indexOf("sejtitle")){
                    this.titleClick(e);
                }
                // codebox  源代码编辑框
                if(targetid ==="codeboxclose"){
                    this.editCodeBoxClose();
                } else if(targetid==="xin-reset"){
                    this.reset();
                } else if( targetid === "xin-codeboxsave"){
                    this.editCodeBoxSave();
                } else if( targetid === "xin-copyCode"){
                    // this.copyCode();
                    GM_setClipboard(JSON.stringify(getSettingData,false,4));
                    iqxinShowTip("复制成功");
                }

                //  点击更多菜单
                if(targetid ==="moreSet"){
                    document.querySelector("#btnEle2").classList.toggle("btnEle2active");
                    // iqxin-btn-active
                    e.target.classList.toggle("iqxin-btn-active");
                }

                // 点击导入菜单
                if(targetid ==="xin-importing"){
                    this.addImportingBox();
                }
                if(targetClass ==="xin-importing-item"){
                    this.addImportingEnger(e);
                }

                // 关闭"设置菜单按钮"
                if(targetClass === "iqxin-setBtnOpacityRangeValue"){
                    this.setBtnOpacityFun();
                }

                // 关闭设置菜单
                if (targetid === "xin-close"){
                    this.hide();
                }

                // 空白地方点击
                if(~targetClass.indexOf("iqxin-items") || targetid === "settingLayer" || targetClass==="btnEleLayer"){
                    this.allBoxClose();
                }
            },

            // 关闭所有次级窗口、菜单
            allBoxClose: function(){
                this.addItemBoxRemove(); // 新的搜索添加框
                this.addDelremove();  //  增加/删除界面
                this.editCodeBoxClose(); // code编辑框
                this.addTitleEditBoxRemove(); //标题编辑框
                this.addItemBoxRemove("#newSearchListBox"); // 添加新的搜索列表
                this.boxClose("#iqxin-sortBox"); // 搜索列表排序
                this.addItemBoxRemove("#importingBox"); //导入框
                document.querySelector("#btnEle2").classList.remove("btnEle2active"); // 更多设置
            },

            // 窗口位置拖动
            setDragNode: function(ele) {
                var node = document.querySelector("#dragDom");

                node.addEventListener("mousedown",function(event){
                    ele.style.transition = "null";
                    // offsetLeft 距离 body 的位置, 得到的 dis 即鼠标到窗口左上角的位置
                    var disX = event.clientX - ele.offsetLeft;
                    var disY = event.clientY - ele.offsetTop;

                    var move = function(event) {
                        //鼠标的位置减去到左上角的位置 即窗口的位置
                        // console.log(event.clientX - disX,event.clientY - disY)
                        ele.style.left = event.clientX - disX + "px";
                        ele.style.top = event.clientY - disY  + "px";
                    };

                    document.addEventListener("mousemove",move);
                    document.addEventListener("mouseup",function(){
                        ele.style.transition = "0.5s";
                        document.removeEventListener("mousemove",move);
                    })
                });
            },

            // 拖动
            domdragstart:function (e) {
                if(~this.className.indexOf("sejtitle")){
                    dragEl = this.parentNode;
                } else{
                    dragEl = this;

                }
                dragData = dragEl.innerHTML;
                    console.info("start");
                    console.info(e.target);

                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/html",dragEl.innerHTML);
            },
            domdragenter:function (e) {
                var target = e.target;
                var targetClass = target.className;
                if(~targetClass.indexOf("sejtitle")){
                    target = target.parentNode;
                }
                target.classList.add('drop-over');
            },
            domdragover:function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.dataTransfer.dropEffect = 'move';
                return false;
            },
            domdragleave:function (e) {
                var target = e.target;
                var targetClass = target.className;
                if(~targetClass.indexOf("sejtitle")){
                    target = target.parentNode;
                }
                target.classList.remove('drop-over');
            },
            domdrop:function (e) {
                debug("拖拽结束")
                // e.target === this
                var _this = e.target;
                var that = _this.parentNode;
                var pparentNode = that.parentNode;

                // 防止跨区域移动
                SEJsetting.prototype.domdropend();
                if(dragEl.className != that.className){
                    console.log("移动对象 之前,现在: ", dragEl.className);
                    console.log(that.className);
                    return;
                }

                // Sortable.js https://github.com/RubaXa/Sortable
                var targetRect = _this.getBoundingClientRect(); //
                var width = targetRect.right - targetRect.left; //目标节点的宽
                var height = targetRect.bottom - targetRect.top; //目标节点的高
                var domPosition = null;
                if(~_this.className.indexOf("sejtitle")){
                    debug(e.clientX,targetRect.left,height,e.clientX - targetRect.left,(e.clientX - targetRect.left) / height)
                    if((e.clientX - targetRect.left) / width > 0.5){
                        debug("右");
                        domPosition = true;
                    }else{
                        debug("左");
                        domPosition = false;
                    }
                } else {
                    if((e.clientY - targetRect.top) / height > 0.5){
                        debug("下");
                        domPosition = true;
                    }else{
                        debug("上");
                        domPosition = false;
                    }
                }

                dragEl.style.transformOrigin = "top center";
                dragEl.style.animation = "sejopen 0.3s";

                if(domPosition){
                    if(pparentNode.lastChild == that){
                        pparentNode.insertBefore(dragEl,that);
                    }else{
                        pparentNode.insertBefore(dragEl,that.nextElementSibling)
                    }
                }else{
                    that.parentNode.insertBefore(dragEl,that);
                }

                // 重新绑定拖拽事件
                SEJsetting.prototype.dragEvent();
                return false;
            },
            domdropend:function(){
                var dom = document.querySelector(".drop-over");
                if(dom){
                    dom.classList.remove("drop-over")
                }
            },

            // 判断是否能连接至google
            isOnline: function(){
                console.log("this.online",this.online);
                if(this.online)return;

                var that = this;
                var myImage = new Image;
                myImage.src = 'https://www.google.com/s2/favicons?domain=www.baidu.com&' + Math.random() ;
                setTimeout(function(){
                    // console.log("取消加载");
                    console.log(myImage.width);
                    if(myImage.width){
                        that.online = true;
                    }else{
                        myImage.src = undefined;
                    };
                },2000);
            },

            // 重新加载工具
            reloadSet: function(){
                var elems = document.querySelectorAll('#sej-container, #settingLayerMask, sejspan.sej-drop-list');
                if (!elems) return;
                console.log("elems: " + elems);
                // return;

                [].forEach.call(elems, function(elem) {
                    elem.parentNode.removeChild(elem);
                });

                iqxinstart();
                iqxinShowTip("保存成功");
            },

            // 设置按钮透明度设置
            rangeChange: function(bool){
                var odom = document.querySelector("#setBtnOpacityRange");
                if(getSettingData.setBtnOpacity<0){
                    odom.style.background = "-webkit-linear-gradient(left,#bdbdbd,#c6c7c7) no-repeat, #fff";
                    odom.style.backgroundSize = odom.value*100 +"% 100%";
                    document.querySelector(".iqxin-setBtnOpacityRangeValue").innerHTML = "禁用";
                    getSettingData.setBtnOpacity = -odom.value;
                } else{
                    odom.style.background = "-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, #fff";
                    odom.style.backgroundSize = odom.value*100 +"% 100%";
                    document.querySelector(".iqxin-setBtnOpacityRangeValue").innerHTML = odom.value;
                    getSettingData.setBtnOpacity = odom.value;
                }
            },

            // 窗口大小改变
            windowResize: function(){
                var eleStyle = window.getComputedStyle(this.ele , null);
                var w = parseInt(eleStyle.width) ;
                var h = parseInt(eleStyle.height)  + 54;
                var ww = document.documentElement.clientWidth;
                var wh = document.documentElement.clientHeight;
                var maskStyle = this.mask.style;

                if(w>=ww){
                    maskStyle.justifyContent = "stretch";
                }else{
                    maskStyle.justifyContent = "center";
                }
                if(h>=wh){
                    maskStyle.alignItems = "stretch";
                }else{
                    maskStyle.alignItems = "center";
                }
            },
            saveData: function(){
                //
                this.addTitleEditBoxRemove(); //标题栏处于编辑状态

                var obj = {};
                var parentdiv = document.querySelectorAll("#settingLayer .iqxin-items");
                for (let i=0;i<parentdiv.length;i++){
                    var data = parentdiv[i].querySelectorAll(".sej-engine");
                    var id = parentdiv[i].id;
                    obj[id]=[];
                    for(let ii=0;ii<data.length;ii++){
                        if (data[ii].dataset.xin<0){
                            var ij = -ii;
                        } else {
                            ij = ii;
                        }
                        obj[id][ij]={};
                        obj[id][ij].favicon=data[ii].dataset.iqxinimg;
                        obj[id][ij].name=data[ii].dataset.iqxintitle;
                        obj[id][ij].url=data[ii].dataset.iqxinlink;
                        if(data[ii].dataset.iqxintarget){
                            obj[id][ij].blank=data[ii].dataset.iqxintarget;
                        };
                        if(data[ii].dataset.iqxindisabled){
                            obj[id][ij].disable=data[ii].dataset.iqxindisabled;
                        };
                    }
                }

                // 分类名称
                var engineDetails=[];

                // 分类排序
                var odetails = document.querySelectorAll(".sejtitle");
                var odetailsLength = odetails.length;
                for(let i=0;i<odetailsLength;i++){
                    debug(odetails[i]);
                    engineDetails[i] = [];
                    engineDetails[i][0] = odetails[i].firstChild.innerHTML;
                    engineDetails[i][1] = odetails[i].dataset.iqxintitle;
                    engineDetails[i][2] = odetails[i].dataset.xin>=0?true:false;
                }

                // 新标签页全局设置
                var onewtab = document.querySelector("#iqxin-globalNewtab").selectedIndex;
                var foldlist = document.querySelector("#iqxin-foldlist").checked;

                // 以防不测,重新获取本地配置文件
                var getData = GM_getValue("searchEngineJumpData");
                getData.newtab = onewtab;
                getData.foldlist = foldlist;
                getData.setBtnOpacity = getSettingData.setBtnOpacity;
                // getData.debug = document.querySelector("#iqxin-debug").checked;
                getData.fixedTop = document.querySelector("#iqxin-fixedTop").checked;
                getData.engineDetails = engineDetails;
                getData.engineList = obj;

                debug('将要保存的数据：',getData);
                GM_setValue("searchEngineJumpData",getData);
            },
            addGlobalStyle: function(){
                var head, style;
                var css =
                    "#settingLayerMask{" +
                        "display: none;" +
                        "justify-content: center;" +
                        "align-items: center;" +
                        "position: fixed;" +
                        "top:0; right:0; bottom:0; left:0;" +
                        "background-color: rgba(0,0,0,.5);" +
                        "z-index: 200000000;" +
                        "overflow: auto;" +
                        "font-family: arial,sans-serif;" +
                        "min-height: 100%;" +
                        "font-size:16px;" +
                        "transition:0.5s;" +
                        "opacity:0;" +
                        "user-select: none;" +
                        "-moz-user-select: none;" +
                        "padding-bottom: 80px;" +
                        "box-sizing: border-box;" +
                    "}" +
                    "#settingLayer{" +
                        "display: flex;" +
                        "flex-wrap: wrap;" +
                        "padding: 20px;" +
                        "margin: 0px 25px 50px 5px;" +
                        "background-color: #fff;" +
                        "border-radius: 4px;" +
                        "position: absolute;" +
                        "min-width: 700px;" +
                        "transition:0.5s;" +
                    "}" +
                    ".iqxin-items{" +
                        "min-width:5em;" +
                        "margin: 0 5px 0px;" +
                    "}" +
                    "#settingLayer .drag{" +
                        "display: block;" +
                        "position: relative;" +
                    "}" +
                    "#settingLayer .sej-engine{" +
                        "display: inline-block;" +
                        "width: 100%;" +
                        "box-sizing: border-box;" +
                    "}" +
                    ".iqxin-pointer-events," +
                    ".sej-engine-icon," +
                    "#settingLayer .sej-engine *{" +
                        "pointer-events:none;" +
                    "}" +
                    ".sejtitle{" +
                        "text-align: center;" +
                        "padding: 2px 0;" +
                        "cursor: pointer;" +
                        "position: relative;" +
                    "}" +
                    "#settingLayerMask [data-xin]{" +
                        "margin:4px 0;" +
                        "line-height:1.7;" +
                        "border-radius:4px;" +
                    "}" +
                    ".sejtitle:not([data-xin^='-']):hover{" +
                    "background:#cff9ff;" +
                    "}" +
                    ".sejcon [data-xin]{"+
                        "cursor: pointer;" +
                    "}" +
                    "#settingLayerMask .sej-engine:hover{" +
                        "background-color:#cff9ff" +
                    "}" +
                    "#settingLayerMask [data-iqxindisabled='true']," +
                    "[data-xin^='-']{" +
                        "background-color: #ccc;" +
                        "text-decoration: line-through;" +
                        "text-decoration-color:red;" +
                        "border-radius:2px;" +
                        "transition:.3s;" +
                    "}" +
                    "#settingLayerMask [data-iqxindisabled='true']:hover," +
                    "[data-xin^='-']:hover{" +
                        "background-color: #ffa2a2;" +
                    "}" +
                    "#settingLayerMask label{" +
                        "cursor:pointer;" +
                    "}" +
                    "#settingLayerMask .sej-engine-icon{" +
                        "vertical-align:middle;" +
                    "}" +
                    "#btnEle2," +
                    "#btnEle{" +
                        "position:absolute;" +
                        "width:100%;" +
                        "bottom: 4px;" +
                        "right: 0;" +
                        "background: #fff;" +
                        "border-radius: 4px;" +
                    "}" +
                    "#btnEle2 span," +
                    "#btnEle span{" +
                        "display: inline-block;" +
                        "background: #EFF4F8;" +
                        "border: 1px solid #3abdc1;" +
                        "margin: 12px auto 10px;" +
                        "color: #3abdc1;" +
                        "padding: 5px 10px;" +
                        "border-radius: 4px;" +
                        "cursor: pointer;" +
                        "outline: none;" +
                        "transition: 0.3s;" +
                    "}" +
                    "#btnEle a{" +
                        "color: #999;" +
                        "text-decoration: none;" +
                    "}" +
                    "#btnEle a:hover{" +
                        "text-decoration: underline;" +
                        "color: #ef8957;" +
                    "}" +
                    "#btnEle2 span.feedback:hover," +
                    "#btnEle span.feedback:hover{" +
                        "border-color:#ef8957;" +
                    "}" +
                    "#btnEle2 span:not(.feedback):hover," +
                    "#btnEle span:not(.feedback):hover{" +
                        "background:#3ACBDD;" +
                        "color:#fff;" +
                    "}" +
                    "#btnEle .feedback{" +
                        "border-color: #aaa;" +
                    "}" +
                    "#btnEle2>div," +
                    "#btnEle>div{" +
                        "width: 100%;" +
                        "margin-bottom:-100%;" +
                        "display:flex;" +
                        "justify-content: space-around;" +
                        "background: #EFF4F8;" +
                        "border-radius: 4px;" +
                    "}" +
                    "#btnEle2{" +
                        "visibility:hidden;" +
                        "opacity:0;" +
                        "transform:translate(0,0px);" +
                        "transition : 0.3s;" +
                    "}" +
                    "#btnEle2.btnEle2active{" +
                        "visibility:visible;" +
                        "opacity:1;" +
                        "transform:translate(0,53px);" +
                    "}" +
                    ".drop-over{" +
                        "opacity: 0.6;" +
                    "}" +
                    ".iqxin-title-edit," +
                    ".iqxin-set-edit," +
                    ".iqxin-set-title-del," +
                    ".iqxin-set-del {" +
                        "visibility: hidden;" +
                        "opacity:0;" +
                        "position: absolute;" +
                        "background: rgba(207, 249, 255, 0.86);" +
                        "color: red;" +
                        "top: 50%;" +
                        "transform: translate(0,-50%);" +
                        "right: 0;" +
                        "padding: 3px 3px 6px 6px;" +
                        "border-radius: 2px;" +
                        "cursor: pointer;" +
                        "transition: .3s;" +
                    "}" +
                    ".iqxin-set-title-del.iqxin-set-active {" +
                        "background: #fff;" +
                        "border-radius: 50% 0 0 50%;" +
                    "}" +
                    ".iqxin-title-edit{" +
                        "padding: 0px 3px 6px 6px;" +
                    "}" +
                    "span.iqxin-additem {" +
                        "display: inline-block;" +
                        "text-align: center;" +
                        "width: 100%;" +
                        "margin: 10px 0;" +
                        "border: 1px dotted red;" +
                        "color: red;" +
                        "cursor: pointer;" +
                        "visibility:hidden;" +
                        "opacity:0;" +
                        "transition:0.3s;" +
                        "transform:scale(0);" +
                    "}" +
                    "span.iqxin-additem.iqxin-set-active {" +
                        "visibility:visible;" +
                        "opacity:1;" +
                        "margin:10px 0;" +
                        "transform:scale(1);" +
                    "}" +
                    "#settingLayer .sejtitle:hover .iqxin-title-edit," +
                    "#settingLayer .sejcon>span:hover .iqxin-set-edit{" +
                        "visibility:visible;" +
                        "opacity:0.8;" +
                    "}" +
                    "#nSearchList.iqxin-set-active," +
                    ".iqxin-set-edit.iqxin-set-active," +
                    ".iqxin-set-title-del.iqxin-set-active," +
                    ".iqxin-set-del.iqxin-set-active {" +
                        "visibility:visible !important;" +
                        "opacity:1 !important;" +
                    "}" +
                    "#btnEle span.iqxin-btn-active{" +
                        "color:red;" +
                        "border-color:red;" +
                    "}" +
                    "#newSearchListBox," +
                    "#newSearchBox{" +
                        "transition:0.6s;" +
                        "transform-origin: center center;" +
                        "animation-timing-function: ease-in;" +
                        "animation: iqxinsejopen 0.8s;" +
                        "position:fixed;" +
                        "z-index:200000100;" +
                        "top:50%;" +
                        "left:50%;" +
                        "padding:22px;" +
                        "background:rgb(29, 29, 29);" +
                        "border-radius:4px;" +
                        "color: #e8e8e8;" +
                        "margin: -149px -117px;" +
                    "}" +
                    "#newSearchListBox input," +
                    "#newSearchBox input{" +
                        "border: none;" +
                        "padding: 4px 0 4px 5px;" +
                        "border-radius: 4px;" +
                        "outline: none;" +
                    "}" +
                    "#newSearchListBox input:focus," +
                    "#newSearchBox input:focus {" +
                        "background: #f1d2d2;" +
                        "transition: 0.5s;" +
                    "}" +
                    ".addItemBoxBtn{" +
                        "cursor: pointer;" +
                        "background: #fff;" +
                        "border: none;" +
                        "border-radius: 4px;" +
                        "padding: 4px 10px;" +
                        "color: #333;" +
                        "transition:0.3s;" +
                    "}" +
                    "#xin-newtab select{" +
                        "height:auto;" +
                        "border: none;" +
                        "outline: none;" +
                        "color: #3ABDC1;" +
                        "font-size: 1em;" +
                        "font-family: arial,sans-serif;" +
                        "appearance: none;" +
                        "-moz-appearance: none;" +
                        "-webkit-appearance: none;" +
                        "padding: 0px 5px;" +
                        "cursor: pointer;" +
                        "text-decoration: underline;" +
                        "background: #EFF4F8;" +
                    "}" +
                    "#titleEdit{" +
                        "width:6em;" +
                    "}" +
                    // 按钮效果 ： 确定 取消按钮
                    ".iqxin-closeBtn," +
                    ".iqxin-enterBtn{" +
                        "box-sizing: border-box;" +
                    "}" +
                    ".iqxin-closeBtn:hover{" +
                        "background: #ff6565;" +
                        "border-color: #ff6565;" +
                        "color: #fff;" +
                    "}" +
                    ".iqxin-enterBtn:hover{" +
                        "background: #84bb84;" +
                         "border-color: #84bb84;" +
                         "color: #fff;" +
                    "}" +
                    "#iqxin-editCodeBox button{" +
                        "cursor:pointer;" +
                    "}" +

                    // 关闭按钮
                    "#xin-close{" +
                        "background:white;" +
                        "color:#3ABDC1;" +
                        "line-height:20px;" +
                        "text-align:center;" +
                        "height:20px;" +
                        "width:20px;" +
                        "text-align:center;" +
                        "font-size:20px;" +
                        "padding:10px;" +
                        "border: 3px solid #3ABDC1;" +
                        "border-radius: 50%;" +
                        "transition: .5s;" +
                        "top: -20px;" +
                        "right:-20px;" +
                        "position: absolute;" +
                    "}" +
                    "#xin-close::before{" +
                        "content:'\\2716';" +
                    "}" +
                    "#xin-close:hover{" +
                        "background: indianred;" +
                        "border-color: indianred;" +
                        "color: #fff;" +
                    "}" +
                    // type[range] 效果
                    "input[type=range] {" +
                        "outline: none;" +
                        "-webkit-appearance: none;" +
                        "background:-webkit-linear-gradient(left,#3ABDC1,#83e7ea) no-repeat, #fff;" +
                        "border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/" +
                    "}" +
                    "input[type=range]::-webkit-slider-thumb {" +
                        "-webkit-appearance: none;" +
                    "} " +
                    "input[type=range]::-webkit-slider-runnable-track {" +
                        "height: 10px;" +
                        "border-radius: 10px; /*将轨道设为圆角的*/" +
                        "box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/" +
                    "}" +
                    "input[type=range]::-webkit-slider-thumb {" +
                        "-webkit-appearance: none;" +
                        "height: 18px;" +
                        "width: 18px;" +
                        "margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/" +
                        "background: #fff; " +
                        "border-radius: 50%; /*外观设置为圆形*/" +
                        "border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/" +
                        "box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/" +
                    "}" +
                    // 导入
                    "#importingBox{" +
                        "position:fixed;" +
                        "width:350px;" +
                        "top:50%;" +
                        "left:50%;" +
                        "transform:translate(-50%,-50%);" +
                        "padding: 15px 30px;" +
                        "border-radius: 4px;" +
                        "background:#1D1D1D;" +
                        "color:#fff;" +
                    "}" +
                    "#importingBox li{" +
                        "margin:5px;" +
                        "border-bottom:1px solid #3ACBDD;" +
                    "}" +
                    "#importingBox li p{" +
                        "white-space: nowrap;" +
                        "overflow: hidden;" +
                        "text-overflow: ellipsis;" +
                        "margin-top:0;" +
                        "margin-bottom:0;" +
                    "}" +
                    ".xin-importing-item{" +
                        "cursor:pointer;" +
                    "}" +
                    "";
                head = document.getElementsByTagName('head')[0];
                style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = css;
                head.appendChild(style);
            }
        };

        // 增加设置按钮
        if (getSettingData.setBtnOpacity>=0){
            var setBtn = document.createElement("span");
            setBtn.id = "setBtn";
            GM_addStyle("#setBtn{" +
                            "opacity:"+getSettingData.setBtnOpacity+";"+
                            "transition:0.5s;"+
                        "}"+
                        "#sej-container:hover span#setBtn{" +
                            "opacity:1;" +
                        "}" +
                        "");
            setBtn.innerHTML = "<img style='margin:0 0 -3px 6px;width:16px;vertical-align: baseline;display:inline-block;cursor:pointer;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACSklEQVR4nGNkIAPYy8tzhLS2f0cWy42JYiTHLLI0TV6y7D82cXIcwUSqhr658/bhkaaeAyYvWfZ/0qLFW9HVs7JzOOLR8w+bObhCjIEBh4vxaaAEYIsijBCgleW4zGYipIDawEpYVgqnA8jNSqSAY28fP8PpgIEALORoUlWQwyp++8Ejks0iKQQYGRlxWs7AgNth+ABKCLRPmhqHT7GKvCwDAwMDQ11gxMRTr58UIMtNmzbjuZKejoSqghyhkGBkYGD4j8xhYGAgnANgvmvyj5RGT0gwYC4mU9y4bkUPAwPh6IAleEZisx7MAR42Nnhzyo4jR/4T4wAYICoNIFlOUH1dULglAwMDg7S4GPUcgAQIhtapV09PMDAwMHBxchBlIMvHj++JUEZ86tbnlxdgYGBg+PL1KwMxZhMVAmcuXmRgYEDELz7QuXXpewYGBoYbd+4QYzQDU012NuOmxvZJRKkmDIguyjc2dfrWZGczomhomToVrw9N9PUZGBiw54T1O3emc3Jzz2BgQIQYLlCTnQ3Xj2EQPkcYaGszsLDgL71JsZyBgcRccOHqVbwWELIcGyCrMiLHIlxgwKtjFAeYSkkJD6gD/Kur39DaQjNxmWScDkBPodQGWxrbU0+9fDIXpwNwOWJTQ8eSzY3tC4m1aHNje8mmhvY+FLGG9qQTr57MQVeL08cW4jJmJ14+OYUuTqiwwuYBczFpvZOvnl7Cpp7kIPdQUWG3KSz8QazlhADJ2XDHnTs/SdVDVQcwMDAwLJs6lR1djNwEDAB1JMSK2b7KxQAAAABJRU5ErkJggg=='>"
            document.querySelector("#sej-container").appendChild(setBtn);
            var sejSet = null;

            setBtn.addEventListener("click",setBtnStart);
        };

        // 注册菜单
        GM_registerMenuCommand("search jump 搜索跳转设置",setBtnStart);

        function setBtnStart(){
            if(!document.querySelector("#settingLayerMask")){
                sejSet = new SEJsetting();

                var sej_save = document.querySelector("#xin-save");
                // var sej_close = document.querySelector("#xin-close");
                // var sej_reset = document.querySelector("#xin-reset");
                var sej_addDel = document.querySelector("#xin-addDel");
                var sej_edit = document.querySelector("#xin-modification");

                // sej_save.addEventListener("click",function(){sejSet.saveData();sejSet.hide();if(!getSettingData.debug)window.location.reload();});
                sej_save.addEventListener("click",function(){sejSet.saveData();sejSet.hide();sejSet.reloadSet();});
                // sej_close.addEventListener("click",function(){sejSet.hide();});
                // sej_reset.addEventListener("click",function(){sejSet.reset();sejSet.hide();window.location.reload();});
                sej_addDel.addEventListener("click",function(e){sejSet.addDel(e);});
                // sej_edit.addEventListener("click",function(e){sejSet.addEdit(e);});
                sej_edit.addEventListener("click",function(){sejSet.editCodeBox();});

                //
                window.addEventListener("resize",sejSet.windowResize.bind(sejSet));
            }
            sejSet.show();
        }

        // 获取存储的数据信息
        function get_data(){
            setData = GM_getValue("searchEngineJumpData");
        }
        var setData = null;
        // get_data();
    }

    // 从此处开始执行
    var debug;
    function reloadDebug(bool) {
        debug = bool ? console.info.bind(console) : function() {};
    }

    // 消息提示框
        // 目前只是为了给用户一个反馈。 - 成功了么 - 嗯,成功了
    var iqxinTimerGlobalTip = null
    function iqxinShowTip(text,duration){
        console.log("iqxin -- 消息提示框: ", text);
        var odom = document.querySelector("#iqixn-global-tip");
        if(!odom){
            odom = document.createElement("iqxinDiv");
            odom.id = "iqixn-global-tip";
            odom.style.cssText = "" +
                "opacity: 0;" +
                "height: 25px;" +
                "line-height: 25px;" +
                "letter-spacing: 1px;" +
                "font-size: 1em;" +
                "color: #fff;" +
                "padding: 5px 20px;" +
                "border-radius: 5px;" +
                "background-color: #666;" +
                "position: fixed;" +
                "z-index: 200000001;" +
                "left: 50%;" +
                "bottom: 5%;" +
                "transform: translate(-50%);" +
                "transition: .4s;" ;
            document.body.appendChild(odom);
        }

        odom.innerHTML=text;
        odom.style.opacity=1;

        duration = duration?duration:1500;
        //防止持续时间内多次触发提示
        if(!iqxinTimerGlobalTip){
            iqxinTimerGlobalTip = setTimeout(function(){
                odom.style.opacity=0;
                iqxinTimerGlobalTip = null;
            },duration);
        }
    }

    // hash-query  不刷新页面的搜索
        // hashchange 和 popstate 都无法检测到谷歌和百度搜索时网址的变化,不理解
    if (window.self != window.top) return;
    // 下面这种方法百度一直报错无法使用,遂用定时器
    // if (true) {
    //     console.log('iqxin添加标题节点监视器: title');

    //     var watch = document.querySelector('title');
    //     console.log("titile: ",watch);
    //     console.log("titile: ",document.title);
    //     new (window.MutationObserver || window.WebKitMutationObserver)(function(mutations){
    //         console.log('iqxin标题发生了变化', document.title);
    //         if(!document.querySelector('sejspan')){
    //          runInPageContext(contentScript);
    //         }
    //     }).observe(watch, {childList: true, subtree: true, characterData: true});
    // }
    // 给谷歌和百度搜索的主页单独加个列表
    var url = window.location.href;

    var hashList = [
        /^https?:\/\/www\.baidu\.com\/$/i,
        /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/$/i,
        /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/,
    ];
    var hashtag = hashList.some(function hashUrl(element, index, array){
            return ~url.search(element);
        });
    if (hashtag){
        var oldTitle = document.title;
        var newTitle = "";
        var timer = setInterval(function(){
             // console.log("循环中",newTitle,oldTitle);
            newTitle = document.title;
            if (document.querySelector("#appbar") && !document.querySelector("sejspan")){
                console.log("new");
                iqxinstart();
            } else if (document.querySelector("sejspan")){
                // console.log("已存在");
                clearInterval(timer);
            }else if (oldTitle!=newTitle){
                // console.log("不存在开始插入");
                iqxinstart();
            }
        },1000)
    } else {
        // console.log("普通插入");
        iqxinstart();
    }

})();
