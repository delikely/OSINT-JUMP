// ==UserScript==
// @name           OSINT-JUMP
// @author         delikley
// @description    开源情报收集的导航站，方便在各搜索引擎之间跳转。
// @version        0.0.5
// @created        2019-05-04
// @lastUpdated    2022-03-24
// @original-script https://github.com/qxinGitHub/searchEngineJump
// @original-author qxinGitHub

// @namespace      OSINT
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
        engineList.web = [
            {
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
            },{
                name: '百度',
                url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
                favicon: icon.baidu,
            },{
                name: '必应',
                url: 'https://cn.bing.com/search?q=%s',
                favicon: icon.bing,
            },{
                name: 'DDG',
                url: 'https://duckduckgo.com/?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADiElEQVQ4jXWTfVDTBRjHn+uyi8KAbWz7/TbeNzeUeNkLCljGS3hrspDUsC7vqivz5cI/OtQ7vSxNrpvdkQx0k10M5FYgztECgfOoM7kurs6IFx1ja7xsgMiLAySDffvDtLrs8/fz+T7PH8+X6BFIQymxOGb1WyWy8COH13LL9svCSgtEoTt4RMyj5h/CIRKfSImsMKu4NrOKZ6vZwDafz2Tbajaw9ur1wibzemHj+7Lwo0S06j9yYtgqRX0m216lFDS0FCR3Obcl3/FvFmJCFwt/0Rr0aOPGrVlsuymduVShEljDiCL+3hxCUbWZTLtBwfuqXyeZCThqsTTUj0BrPUZ2psGTE4mxQilmt8twLT/WVaUSXvgsjW8hoseJiOhYUuTpSqWw8YYmPjC6JQ5TtXqsLAYAAMu3fLj9eSk8eQw8OimmXpGjMzfWaU5nv94RvfodkoQ+se6cmm2+tDGqe1Ijxm+HXsd4IIi5+WUAQBDA6MRdePdq4c4Xw12wBlNFifginW0tTxN8Sa9Gh+02qlh7v0ayOJTNh8d4Ev7AMq4P+BAM3g/4rm8KvdVn4H6exWCOHMMaOTqzY1wGJXORDkg5H1ermZYRnQyubCEG9R/Av7CCsnOd+P3eCgCg68YCbnZ0YGyXCLf0AowfjML1PMm8UcHaqVTOO1WjFnWMFMjgyhWjZ48OC3/cPx9YRnD6POArAoZSsfT9k7jTEIHR/THoyZXerVYzLfReQvjRs0qRw7NFBmd+HH4pTMXk6Mhf/jTg4WDGRBjex4f33Th43ojHoEaG7nzJXKWSsdHLwmd2VSmE9h9flMwNaqT4NSca3mudeMCs4xDGj4fgdiUfc1YOJssF8OpkcGTF9FUomIvEIRIb0li7RSX+dqxAjt6NAgxYDA8Dpq116E+JhHdzPJxaKfpyZBjWymFQsPZPkvgWIiLancA9Up7C2K5sivd6XxCh98MS+JYmMDzvxqJ7AN2FctSVKtC9dS18LyWiXh3dZVKK257jPaV98IxPn0oWNpYlCera1cxN/55itLpt2H45A3uvbMObjiy89pMWP7ydioZk0dXyFNZWIuGW/asLoUR8fZLQenod325MlzsuXLVMHnMeRIXrLC67G4OHP8roPZ4hajI9y7YdSOB9+n+FfKw4KmLfSUlEbdPOvJ9dJv3sUnMTZmqM9yypsd+ckHLNm7ghW/8p/Alp3+8i87OHIgAAAABJRU5ErkJggg==',
            },{
                name: '360',
                url: 'https://www.so.com/s?ie=utf-8&q=%s',
                favicon: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVR4nIWTvWtTURTAf+e+GpPWRFptmigIDhWELo5+DKLCMxZEJfVjEhTqok4O/geik2MdOuhUm4ogpTS6iNQoRV3sIOqQgpiX2NKEprH58B2HvMQEUnO3ezi/3/m4XKHD2fvywrCr1oirbvWPuh9XYs8znfIApPUSmR97KHAbaY8rVIBxx0487iz4ML4tsrrmCAxsVckTpRw7cbQ1ZgCiq2vLDViVSatAb8ZOSMZOiEttCFj0qh2Jzo8l2jqIJOM3BJmowxJ3Tk8/61Q9koxPCnINwHXN/mzsaRrACDzwcl5vBQM49sx1VDcARNxHLSNIqG51b/5vfgAVuV/vm+NtOwAI6sb3rgKVhTqP75+gpvTlK2SswM5ughoa9a9XQdGmYKK0pF9CKZYqi7e6CT5XF+5+63vLlcKP5UZMirODUz1GLgFsL2pQLv4qdoLLc7sPKeYTQEnN1YFR5wmA6DS+8o5wuT6jbmLMwUAsm26Ff8+GT4nhFYBCPnAm19/sAKD0InzY9JBqEspPRd8g+FE5IULIg93NcnmXz+c7aYnMqOqUAeg9m3unRofVe2eEPSJyWZBzDRjVtN+SUP/5Qt4S2efVP9D2aQBKc4PHBO6IyohCVeA9uPf8oytfW/PWk0PhoJ3NdVt81/MXwby4bACYqGIAAAAASUVORK5CYII=',
                disable:true,
            },{
                name: 'yahoo',
                url: 'https://search.yahoo.com/search;?p=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqNJREFUOI1dk7+LnFUUhp9z7v3mx87MbnY3OwElIdG4SSMrLgQJuNpqoZXYKFgKYpqISIhIbMRop0h6GxsVGwUbs/4BYkgjI4lRIoiOEJKd+eb77r3nWEwE8f0DXl6eh1fOyqXZ4fDI9yXnyaBau3a6/9w+DTfebYT/5p3gMOShn+bfPNWm9rES6+1pmezJWS55ZECPDRZMWRAx7tFTCHRRKjJzsq2QSayxhhBZ8BeZhqh0WOUYHYYIG7z56SluXb/LV5dv0a8Ux6hT4YXzD3P80RGfvPIzXXFwZ8YfqBDosEpPNuizSY9DvPb+GY4deYBu2mQljTm6cZTXPzzDMK7TZ4u+bLLCeLlQUBBAhIF2+ODlG3iGt77eYU7kgMiFb3egwOWXfmEYKlyMIg2ZGnUKRsYl4yExwrhyfsLJx0fsPrvK7jNDTu6OuPLGhFXAQsalYJIBR57kPV+XbXphHVVFBKZNy2e398jJcIdON/Dig1fZ6nUxd9oyo/a/uWu/oY5TpCXJjMQBSQ4Ykfjo3A+Mj/c5cqLPx+d+ZEgiS02WOSYNJi1CIIJTWFCIGIKiyACufnGbV2/OQOC7z3/l8KBDtgZzx8QwTzhOdKCQSD5DJaAo6kogc2daIwJKQ8YpJAwjewEHJxOdRPEWyIgHgitqSkOi6ikq0DCj8QW+1I9hJJ+DO9ERMjXmy/nmEQEaMlVHEYWGmmId3B1zo/h9cxjRKRSvMVcEJXhAUBoWDEZdRKDhgNZ6uPuyxIziDQ7IE7ztjoGAii45iALOn3kOOFtVHxDcC1jEvFC8RYn/WmhQDxQHEwcRVALrURGgWIvdB2csEA8YaalRJc7H4fR+yTY5VI2vneo/v0/Dzf/f+WLXqbqcuF5/+fS9NN0JUbfvlN/3/gF3RFcy2ZOKSwAAAABJRU5ErkJggg==',
                disable:true
            },{
                name: '搜狗',
                url: 'https://www.sogou.com/web?query=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqFJREFUOI1dk99r1XUYx1/P93yPtNAumssfR8tQ2GYM3cUGdRPBBBX0pltJs7sUzBRxLogWTkMpFkRdpNtfkLBQSgm8KpxMCvyxQXNonkkIgjDPzjnfz/O8vRg43fv6eV488Ho/xpLo+62byewkHj1IFULgUUUap/ATNjA1+eK8PV8c3gLLyxep+06kWerpMhETBMK9l7L14bGWEr/y1HfbV9OLAA1vgZZ8hnraQOH7UYzY0dsvX/blRkD7gBHKTFMrNtnQf+QAvJpfolZsoIh1dvRmFUAn2yHUjdTE/RYKbHBmVP1v/k7BLGUbA3abvut6h8xu0vD9duzWiIbaD7EsG6DpbUigABdEQMmu8qT+AWZ7yRglRYfp264LmHqZ9wrETjIu0nCQHuIaJuIxinZy24yim5pvJ+kfyqqS4lpO8l6KuGwDk2hwUxcGeICUkeIR8vN2+sFSWehg2xUUfRkRa4k0AUCKb8g0CQHJV6E4h5D6K7d1ePVZfbZmkZDSOBGVDHfwEIAN3oW51EkzPiTnNxRzuKNa6iTiCFmq6cDKVgA8MjzIKLxKit7nxTh1Dzt9/xf7+v4OmmkFLjP0t1KgeW8hj58BCPWQ/EFOaJwSfep/CzydIbcDRFyl7tMUMQXRinidFBiCuZjQ3uVgsY0U10zH13eQcYemf4TiOsvsJxrxPvGCwuSAahTxA65jeHRQ0h2a3rnQxC/WjTHvu0jxhg3//0iftgICVzcKw+MGCuz80wUDe1qgFO8xn/5cAHy+Gkr6l0ZsJMXHSKP24+OXte15BeBtPGYI7cB0iUL9i890sA3KMUYjdiHN0owruI/jkQE9ZGwjfA3SuxTxF6Y/aESfsST65LV2TKcWzKiCB7iqKK4TcZzkU8hOIA3ZBXgGeVahfALHRAkAAAAASUVORK5CYII=',
                disable:true
            }
            
        ];

        //翻译
        engineList.translate = [
            {
                name: '谷歌翻译',
                url: 'https://translate.google.com/?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4jYWTT0ybdRyH34MH4wVjovG2ZIl60IMXNTgoDtlG/wAy49bt4r+8XSFm2SZGox6WWNnal45SbKAbygKbShAT38yMNC9LMGyQsS5OdGtpOwqNvNkLLbwv76+KJns8lES9jG/yXJ98kidf6bGn6vY42tWEo/2SVutXtZotHEcT2o5q33vSdlfbpk68OQSH4uCNw8F+ONAPhwbhlQ9mbkuS9NADBY72S1e8cXg9ItgfEbR2bxH5k5aw+PuRJ5994YGCGr+qeePQ2i1whQRuReAMCZq6BC0992k6+nVCfuetE7J8pEOW5Q6fz/e+LMsdbW1tH7pcrgNSjV/V3uiD5rAgNr7BzB2TyzdM3u63aThVxjcgSGcKCNvCtm0sy8I0TWzbZm1tDellv6o1RSE2bpGcX+fjbzcIjG1w+AvBvqDApQhGxlMsZNOsrhgY9+6h6zq6rmNZFlL1EVVr7oXrKZOOCzbeXpvLSZPxpIl81sYR+IPPLi6RufMr0aERpm/ewiwV0fXlyoJqn6p5eiBx02RgwmJfUBBSLQr6Ov4vbeo7NzkYXiZ6foxPzvQRHvyGyPAo/SM/kM0vVQTNUfCds5lNrzM5ZzKT+lfmCpVxKwLl/E9cvXaNxORVOuNDpLM5VovFimB/DPaeFnh7BSe/2+D4sE1jsFLDrQj2hjY53jdHOP4VysAFrkxNoy//TqlUQnrRp2qtMfB0CRqDgvrPBQ2dW0lDNq5QpYbcV+IjJc6xUz2kUmmWFhcxDAOp2p+YqgjKeLrKuJXKZNcWzpCNMyioD6wTvTjFqPojp88NM/fbbVYMA+kZd6C7JQaeHvBEwNN9H/d/cHZt0qiUcXT+RXB0maVcmu/HNSanr7OyYiBJkvTwozt27a7aufvVqp21/+Pxp+uddd6xhYZ3b7Dr8BRnBn8ml02zcDdHLpdF13W2fbbnX2o/W/faBJ8GJpi79QvpdIr5+XkymQzF4ur2gqonnttzUkmSSmXJ5++Szy9SKBQwDIPZ2eTaP/p6Y/2tPjpQAAAAAElFTkSuQmCC',
            },{
                name: '百度翻译',
                url: 'http://fanyi.baidu.com/#auto/zh/%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAC1QTFRFT6b44O/+Uaf44fD+Uaf4T6b4U6j44fD+Uaf4GYr12+39F4n1Gov1////FIj1B6sNLAAAAAl0Uk5T50ThROTm5kPip4USNgAAAFZJREFUCNdVzbEJAmEQBeFtxR6sy9gOrEZL+Tt4i4mB3O1Xg8EhaDYMA1PXBfutLsCr1gFbGffkoegxFKQpad0UnZlWtHGYSfybJL/NwrB9p886L3ifPt+ucPSWYnodAAAAAElFTkSuQmCC',
            },{
                name: '有道词典',
                url: 'http://dict.youdao.com/search?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jWNgGFQggps34Y2i2v83imr/78gpvZdgYFBgYGBg8OXkCUMWx2sITOEbRbX/MAMYGBgEkMVxahZiYJCBKTonLX+fkDgG0GNlNYIpnCQsOh8mbsjCYgkTXy8uvR+nAcgK0/gECmDifpw8oTDxMgGhBpwGOLKzu8MU7peSOW/BweFgyMJimc4rUAQT9+TiCiDKC7gwUsBiBezIzoUFGrKr8GnGBgSQDYjg5k3Aq7pFSKTfgoPDwYKDwyGNT6CAZNtx+RuqWYCgAXfklN6jayTo7AEHAIjTnaHLaQtfAAAAAElFTkSuQmCC',
                blank:true,
            },{
                name: '必应翻译',
                url: 'http://cn.bing.com/dict/search?q=%s',
                favicon: icon.bing
            },{
                name: '海词',
                url: 'http://dict.cn/%s',
                favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACAAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAkdJREFUeJx1k81LbVUYxn9n7y1+g3qPWYMosaKyVBp07yDJwFuUUKOoaU0v0SwuTRravHF/QFA0CQoHJTQJvHDR6IMUvXCvYpkfR49Hj573eRrsvY9KtWCxWO96n2e9H89bAZhd2XoVuG08aXvIMna5hWVUnqE9W8uSPl16eXyhMruyddPwre2USyCVJFJ+j9IuLCE5JL2eGX9sO82d//fXS2CXJKmk25nl59ogm7epc+OhQY4ED/d1U+3qpNY44ZuNTb6sQ8MgqSDXRCKrKuXsUyc1br0wzlBPN+XK0pSx4Wt8+OIEn48/Qn80kQJFEBHVrMgHWzzdnQKQVip89fs6PR0d9HZkjA/0MjP6KE+NDPPJaJ0PVneKOgTZlbwSA5BU4KfOwTzvM/H1doPV3Z957YnHeOXJUR7/4wFrkWCJRKF2SK0Qp62g2cptEWWo4vvDJmQd/Lr9F890pvm7gkwReQoSh9Fku37MTqNBblf7LQGqPV1gk2BKXKZoV5TaWZP7h8fsHDWIKPudR/NmtZ+hrk4AlmonSBUkkYWi7Xhu2Nzb56TVYjpt4sSkmJdGhnhn8lkAfly7x0YLrEAuIigJxgb6eHcqd3yPf6/N/Rof3V29UGVOELuSrlkCZ/8Bg3qzyRfLv/HZ+g57RdcK4f1def67Oz9YmpFEn87pcSADhdNpmN0IWqaYC7d1Y3sxU8S8pGkr0gOZ/aI4V7TfnhNdmlKH7fnkl7nrC4rWnEKLCh2EotDFRQesizpZOrC0aOmNP99/a+EfiilTPoj1fYcAAAAASUVORK5CYII=",
            }
        ];

        //学术
        engineList.scholar = [
            {
                name: '谷歌学术',
                url: 'https://scholar.google.com/scholar?hl=zh-CN&q=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAgNJREFUOI2FkktIVHEUxn/nfx96nasMvQwzigadwNIQ2kSvjYsWQW3ctLZoVSRGUAtdtDGlZRBBVNAmjEKCghb2QKMkESbDEYQchRaV4zQ5c2/j/beYsuY6kwfO5vCd853znQ/WCb0eoGLjHFy856XOD44v5PRkQyWcKldcyK50dj1Z9kdTqvH5h6XNpy7n598m093lsBIu3B35efNpQrrm0h62ocjMjuUDw67eUudw8kD0wZkTsc6yAzQw+Cg/+fij0apWPJSAKIPM7FhemVZ1oMHD5HibO3P18N5mafnnhLx+1tJze3lxKCGtZlBsXnOrgCMFhicyTWeH3+fSWh8FkIdv/P77o37P52WFJUFxGw0FDVoMFpMvc5Zd5VimQklxsrcixDZV0bF/ww0zzBRoiNhC01YT11Gwu8P5kc0yNTXDl3QW01AlysmfE67cOfT61bwR3WgXaNtpEQTFTQBEBNM0GH83QepbjoO7nHz/pfZjUZGREhGvDeUmP2WtVscKVptXmUTwPR8rM50cONIel31l3qiBWy+09n3NWg8Kpi2cbqwTiX3/K25Yg7oacB3BdVQoBbcacPriJd8p5QDXYlH//kQ4XYucNFyYrjgAYM92emtrQIe8EIlAcz3Xw/gyloG5r/pcIkXvkkdUa6i1yTbXMxDfJn3l8BVDA3rH/zG/ABn5vnYwGZDIAAAAAElFTkSuQmCC',
            },{
                name: '百度学术',
                url: 'http://xueshu.baidu.com/s?wd=%s',
                favicon: icon.baidu,
            },{
                name: '知网',
                url: 'http://epub.cnki.net/kns/brief/default_result.aspx?txt_1_value1=%s&dbPrefix=SCDB&db_opt=CJFQ%2CCJFN%2CCDFD%2CCMFD%2CCPFD%2CIPFD%2CCCND%2CCCJD%2CHBRD&singleDB=SCDB&action=scdbsearch',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jaXSMUhqURzH8YuBrSbiIIKIS4vo4ORQgyJCBg5Fuuqgsyh3tKFwUsjFycEIwq0lBMc7RLQFIl4RnLxXzqbe4Yp0v28I6vle+F70h99y4Hw45///S9SO+Ukkasf8XovFgkKhgCzLrFYrdtZXgBCCw8NDbDYbnU7n+4Cu67hcLlKpFEKI7wOPj4/Y7Xaen595eXmhUqmg6/r/AUIIQqEQBwcH5PN5HA4HTqcTVVW37mma9t6fP4GrqyskSfqIx+Oh1+sBsNlseHp6olwuE4lEuLy8/BsYj8fc3NwQCATw+/0Mh0NM0+Tu7o5Go0GhUKBerxMOh4nFYl/3wDAMms0mPp+P+/t7ptMpXq+XYrGIaZqs12vOzs5QFGUbGAwG9Pt9FEUhm80iSRJHR0dMJhNOTk6oVCoAtNttzs/P2Ww2n4CmabjdbhwOB7FYDL/fjyzLCCGwLItSqUQwGKRarbK3t0c6nWa5XH4Cs9mM09NTcrkco9GIWq3G7e0tlmUBMJ1OiUajxONxWq0Wqqry9va2/YXFYvExynQ6zfX1NZlMhvF4/HFuGMbuPdA0jWQySbVaRdd19vf3ubi4YL1e/3uRXl9fyefzJBIJ5vM5AN1ul4eHh/fn7gR+kF/ZQQ/WnEhepgAAAABJRU5ErkJggg==',
            },{
                name: '万方',
                url: 'http://s.g.wanfangdata.com.cn/Paper.aspx?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJ0lEQVQ4jdWSvY4BURhAPwoS8TuTqESC3lN4DZGYVqGTaPQa4g1UYjqxdN5EoURI/CQ0M9/ZYnYya9fsRrHFFqe5Jzm5936ftEXatog9EZm+ii1iy1xkQbUKlgXNpodlQb0O8TjUao/O940GJJPIRGRKr4fCd0wTXa2eO4BK5SPQ6XiHqh6Ans+oYaCz2aPz/e0GpdJfBk4nL7BcPn+C60K5/MsNTBMdj9HDAd1uA3Y7dLOBYvGHwPWKFgqoSCiI/BC4XNB8HrUsdDRCB4OA4RDt98EwwgOcz2guFzpG/sEYXwp0uziuq59x73d1DEOdxUK/Osd11XUcDfag1UKPx2DO+z2s194nhuwB/h7MRd6IxSCbhXTaI5OBVAoiEUgkHp1PKgXRKO8NfBp7UCxd2QAAAABJRU5ErkJggg==',
            },{
                name: 'EBSCO',
                url: 'http://web.b.ebscohost.com/ehost/results?sid=8e76c941-084d-4b93-b05a-d5f182196017%40sessionmgr102&vid=1&hid=128&bquery=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJ0lEQVQ4jZWT3UtTYRzHT+w4pzddeRFdBAbd1Z8giXtJz9mKvBDCxMqkrK57u6kEyx13zjHWIl8TEbMptaLpZMeMCgdBS8dSRC8WWAS9UJRS1j5d7AWnjuqB78UPHj58n+f7+wpFLp0il45Z1hBs7nVS0krPdoXM/YyEIpdOgaRSWt/JGZ9BvWeUOiXIUXWMxvZxGrQQTd4wTd4wrkv3sDh1LOsBYpVKaX0XPaEYmfPx6wqHlSAHLt/nlDdMZO4tyWSSHXUdmKrUXECxS0eUVIS9V3kYWQTAiCYQKlpT1itaESs9BKYWqHU/QrApuYDsYFMYnJwF4PH0G0RJxeLUKJQ1BKubbYdusvNIF2ZZzQOwKww9mcsCTJKKKKmU1PgoPzvElkoPBZK68RM3AxjRRMp++TWO6yFGns3nT2EzwIcvyzyILBB+mWD1128GJl7nvP2vgOjie6zn/Ow77+d5fInhp/P/BzCiCQSrG6GsBfsFP/1GHMHRhsX5j4BMCoWyxtaD19l1rBuzrGGWVYr3t+cH3Jmc2xijU8NU5UFwKFwZmGLPyb7sMmUBZllDKGvhbtrBxKv0ItmVlMpaqG4O8O7TN7bX3kKU1gDMskZJjY/G9nG+r/wEYPnHKg1aCMfFYaqbA6gjLwCYX/pMYdpVFmCq9LD7xG36jTg9oRgdwWm6x2L0heN0js7QOx5jcHKW3lCM0zcMxPVdyKmzdY3SFc6ptKMtJ4U/fkBXz/LD6BYAAAAASUVORK5CYII=',
            },{
                name: 'WOS',
                url: 'http://apps.webofknowledge.com/UA_GeneralSearch.do?fieldCount=3&action=search&product=UA&search_mode=GeneralSearch&max_field_count=25&max_field_notice=Notice%3A+You+cannot+add+another+field.&input_invalid_notice=Search+Error%3A+Please+enter+a+search+term.&input_invalid_notice_limits=+%3Cbr%2F%3ENote%3A+Fields+displayed+in+scrolling+boxes+must+be+combined+with+at+least+one+other+search+field.&sa_img_alt=Select+terms+from+the+index&value(input1)=%s&value%28select1%29=TI&value%28hidInput1%29=initVoid&value%28hidShowIcon1%29=0&value%28bool_1_2%29=AND&value%28input2%29=&value%28select2%29=AU&value%28hidInput2%29=initAuthor&value%28hidShowIcon2%29=1&value%28bool_2_3%29=AND&value%28input3%29=&value%28select3%29=SO&value%28hidInput3%29=initSource&value%28hidShowIcon3%29=1&limitStatus=collapsed&expand_alt=Expand+these+settings&expand_title=Expand+these+settings&collapse_alt=Collapse+these+settings&collapse_title=Collapse+these+settings&SinceLastVisit_UTC=&SinceLastVisit_DATE=&timespanStatus=display%3A+block&timeSpanCollapsedListStatus=display%3A+none&period=Range+Selection&range=ALL&ssStatus=display%3Anone&ss_lemmatization=On&ss_query_language=&rsStatus=display%3Anone&rs_rec_per_page=10&rs_sort_by=PY.D%3BLD.D%3BVL.D%3BSO.A%3BPG.A%3BAU.A&rs_refinePanel=visibility%3Ashow',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABr0lEQVQ4jZ2TPYobQRCFvyNUMpGTjgQbGAqBEZs1i5AD4VWzBoNgF1cihB0NONyk1/mgEwxzgmFuMHMD6Sa7RxgHQ8uzI+HAFRXUT79+7xVMQjPUO/zxFyfv8ONcM3Tafw4nuHZPlxZM62lBu6dzgrsYNsWKNQcA/YAW9xyKew5xSSy/UhWfh1qx5mCKvVsS74ivz7wB2CcsrogAAiIgmqGmWP+bHuD1mbd4N/RgitVbGic4zdBwQxAQm2NxSSwfqI4/OYUZwRSrv9FohtZbGlOMckPVv9ALSP1IAxA+EsYQNUPTYPs08NS/0JcbKvIFeZgRNEM1Q53gwg1hSqIpZoqVG6roiWFGyBfk9JG+j/Te4cOMkN+SX5PLO3x+OzzmHT7NnRFETyw3VKZYviC/QDAfmE9IzwgSB+P/HXecxiic4GyOAdSPNAJy5mCsQvtEFz1RM/S451RvaeKSmIZtjnmHF5CzClMftN/pTDHN0OQDgLj6u+idD5JMyYkCUj5QFevBhcUXDnE1oBKQ5MQLop3g2h1dgnlNBZtj7e7KLYwjHVP7gy5dY8r/eY3/G38A1vO4VlociLQAAAAASUVORK5CYII=',
            },{
                name: 'JSTOR',
                url: 'http://www.jstor.org/action/doAdvancedSearch?q0=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAC3klEQVQokSXO309TZxwH4M/3fd/+hLbSALZLj2sbNiECGcZ5oy4husUM4xJJvNrAMLzmersw8S/gYi5Rt8Rbs91sydjgQmw6EpkDY2TVRQykpx6s0FPtr9PTnvOe1wufv+Ch24wASCIAHFBKKZACAEjPYwBnzCMiKFIKgADQN3FcO3uW+33ljQ17f//DqamjM7ORbBZA7soVz3XDySRj1CiVir/9LhTj2rlz//38U7dWP7O4uH7tGq2sxI+NRoeGVqanX96/HxwYUASnVh+dn3dcR/CAv31wEB8e7h8f1//6c2h6uvr8eUsvAnj7tNA3NtaXTnc6diAQrO/uCiGY27bDicMNw9j55VcwHtFSx2ZnvffdUCg6ONh8XTY3Nku5XDiRcB2XMeDJjR8Pnzh54vp12e28fvjv1p07jHMAYKyu6/arcmbqy08WFvSlPzgUk4SPLl+OfJCobW+/WltrlEq28ZKEAMCEoJ7wyPy3z+7eld1uoH+AhI9xzntSqcqz/418fvLW7YimRTJZ7vMDEMFQ8tOTSmF0bq6Uy43MzSnpMh4I1La3ewcHtcnJzcXF9IULnVqNfD4AxCiaTsu2ZRl71c1Nc+sJCwSF07J6tVS1UKju7mS++Lxw82ajWBTBAAAeDBmr96z9A0/K2Mhw+e81abcZg9r64UYsk+U9vXv5fNs0nVYTxACQ4Fat7kmZuXixY1YTp0+DSCgFz277otEjp071T0y09ozKo0ee4wCQXedQKlUvlZq6br95U3/xQikwIvLHYsRIX16uFgpKejtLS+FkslOteq5jrK93TLNhGKnPzliVCgFMxGLHv/u+VzsSiMf15eX8woI/3KOdP39vZqZp7I1dnc9eulR9WlBSRrNZBQhp25XHj4mx8oMHX62uulYrPjbeLBYPHv7z8dfftE3T63R8wZAIhZ1WEwDdYgQiKACK+f0kfK5lMYLyPEfBxznj3JOuUgCBPPUO9Dle6yO6LxoAAAAASUVORK5CYII=',
            },{
                name: 'Springer',
                url: 'http://rd.springer.com/search?query=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jbWRsQ2EMAxFMwjFzULHJvR0GeAaKL2GV4jEANmBiorqOipf5ejH+Dg46b5kRYLv5x8niKNl3SQSC6fs/a4UvOamG0pxyrKs231A24+H8xKg7cdi1ukKjcTngEhcjBobT72SC0ADmjA6pyxNN/gApHPKEoklElcAHYJLDRpdjXaJNrL9FjCaNnrTTwEK0RfAl7gMsCBPH3eAzfYaWN5eDgnuqgLs8ySv5+Nr7fP0J8AvegOhkGr6AYHSEgAAAABJRU5ErkJggg==',
            }
        ];

        //知识列表
        engineList.knowledge = [
            {
                name: '百度文库',
                url: 'http://wenku.baidu.com/search?word=%s&ie=utf-8',
                favicon: icon.baidu,
            },{
                name: '豆丁文档',
                url: 'http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsklEQVQ4jZ3SWUgTcBwH8H+QeDCpLUXR2vKGyZzHFuq8ErMi1PBK01LSBKdplgeYCPWQZWFgGV2GQhbpQ4XNSs3l0XRTZ+pm6hRiTtnmXOKZZfv2EstSevD3/P18H778CNnmOfmYHSSE7NquJylVjq1O3pTQbWH3Y7YpZcNBhn1uFpz/5SzNdhOGOZXQTa2Ji60XJdgr3ibndBWjtXKSi7Ju33lCCHWTsnY28Uoud3tyo5Oruv/Jb/VO/4Hlsj7Pn8VSD5SM+KB83Ae3J5lIr2Z2bcLc41YZtYrAtc7FaPTqz6JPx4dkNg3CmRjUjnFRKHZFUgcb2SNchJ13ufUXZvJMj76a8YfmRwOWvg9ANlcE2VwhZPqLGNJloXM6ETWjQeB3s5Eg9Qcz1D5uozcpf+0+Il6IhELfhKn5z5BqL6BPm4ZeTSrE6kQIp6LwXBGJq4P+yO7mGWh0mrtRO3ma8xpVAeiYiYZcVwOFXoCB2TyoV5qhXHwG3eoHKBcFqFdE4NqwF3JbuF8pFIq1sSD0BDWzeS4EzcrD0K/JAAASdS4AYG19HdolFQCgS12BkgF7ZApYGkIIzVgQdoqW16jh4eUkD+plMdYNK2hTpQIAZLoGNCjifxfcQ26PHfhNbL2lJbH6M2CgRVTtBAvVI87QrkoAAIIvcQCAIV0d6sajAABC1SOc6WCAX++tIITs3Dgi7fJbx/kK+V50Td+FfFaIx6MHMarrxouJK7gpDYdcK8HDwUvg97ERUeBSuekHAk7uKbo+xkKByAH5H+koFrsgt8sBWe1uyGhlIaHRFSltbOQLgxaodub0rV53R2yp3dNSOReZIi5S33OQ9I6D2CYOYgTeSBP5oUh06Jt7kE3kVth4wcmMgrw3Icr8/iPI6Q9HVk8gzrUHGNIfhLTs97Dx/Tf/C0aUi3kge/guAAAAAElFTkSuQmCC',
            },{
                name: '道客巴巴',
                url: 'https://www.doc88.com/tag/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAoFJREFUOI11kU1IVFEUx3/nvjeT46SUXzmpCEk1FpaGUGhopi0qIRAsS+gLLIiIaJEbd7VqGS1qF9HCRUREXwvTUimRxBCRsiJNbRrxaxoVZ3zv3RajYk79F4fDPff+zrn/Izv0RL2NfUQQSwNCTBq9lMeiA0SBdbETcSCaguu6Od38+CFAwLIATbIy8IgQtC3QGq8y8CjBpUzy1ifROTNFulKYIlBXM6IAArbFnaK9BGvPU5GWQVA79ByuZfBYPdWZ2Yjp5qq/gI6jx3ldcRS3y4WtNYJgLk3M+fxCPEpxaouf01t3sic1HYDmymps4FtoGoCcpGQat+/iSl83G9HaBEhAaHjzglN5+TR+7GIoEmFL3wfcSjCAkOMwWH0CgGvd7XRPjpOhDABMDSQaBuWZ2cxEFjiY7sNrmNzeX7VkJvRMjuMxTALzczyprOZufy+XP3axETAXHIfKDB8NOwoBmLUWGZ0NA/Au+JPStufc8BdQnJpBaDGCDy+LjrP8c5RLhM/hEC1jwwBYjoODBqBk02Z0XQMX/Lu51PaSzsDoyoqXZZoi9M+FaRn9TlVWLqvVMjbMofZXbHAnYDkWxb4s1iq2BVG4lYorVmXlok9eBODp0Fd+hEP/AaySXpW/DYxw4H0r21xuBmd/86wkZqwSWbkTB0g0XUTsmEnlvhx0zZm4rgPTUySK+jfgnL+AT6Fpmnq7iNo2SgAEAURgzlqkazKIV60BrFMGDtA6NkxVVi43i/bFdV5WU3c7t74MkLIMSFOKtl9j3Ht0n5G5MOmJXjzK+MuP2Bxgac1UNEKaYQAYsl1PPJhv6yiLGso2AFMES+u4x6shSiOI6OSy0rN/AN655QnLolwGAAAAAElFTkSuQmCC',
            },{
                name: '维基百科',
                url: 'http://zh.wikipedia.org/wiki/%s',
                favicon: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACKklEQVR4nM2Xva3yMBSG3xPdBai8Ah0WS1iUiCYbeINITBAWyApImSAjuKOgSUYwFRv43ILryCR2IN8VN58lGr/E5zm/TgiR5Zzj2P5vV5ZlNNzrNz5l9BVMtoTx0Gb214aHa3EAWiL84Vo8AosDfAHAbrfD7XaDEAKr1aoXu64DAFwuF2y326R+PB5RluWTfr/fsdlscDqdRs92XYf1eo3z+fxoB/8rioIBMBExEbG1lkO9rmsWQvR6qDnnWErJRMRVVY20siyZiFgp9bT/BGCt5TzPkwZCSAAjzT87BA/h27ZNA3gIb6BpmiiEBxx6CoDruh7931rLSik2xoy0EYBzjoUQDICllFEAKSUDYCFE760xhpVSUe+bpolGLAlQVVXv5TBnzjlu27aHFEKwMSaZMh+xPM/fB7DW9l6myLXWPWSe5yyEmASIpSYJ4L1MdUOYcyKKFlcYzVhXvAQIi01rPamHtRCrp5T2EsD3NRFxWZaTaYgVrFJqMjUvAZqmYSJKdoQ3npobAJLRewvA5zBWjMaY/nCvh1Fq2zZZ+bMAvKfDIRP2fJgGX4xa62RhzgYY9rxS6iklfg54CD/33zn7LYBw/vvDw2hYa0cFmZqi/wQwvKRid0R4h0gpJ1tvNsAwzFO1krqOfw3g3KPai6JI6v4OmXPm15zXp6IosN/vk/rhcMD1ep1z5OPL6Me7P19ZltHiL6X/B0Dsq/Xjhn9sRg1/qiZijn4DhUA2yPD/DEEAAAAASUVORK5CYII=',
            },{
                name: '百度百科',
                url: 'http://baike.baidu.com/search/word?pic=1&sug=1&word=%s',
                favicon: icon.baidu,
            },{
                name: '国家标准(在线阅读)',
                url: 'http://openstd.samr.gov.cn/bzgk/gb/std_list?p.p2=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAwxJREFUOI1tk01oXFUYhp9z7rl37r0zk8lMfpqE/sRYrQkiVWLQLgIuDCkEq5tKEYor1+JCBBF07cKNKyld1RKlaGsVsYI/aCGFIqKgUvOjUzuNyXQyNzN3JvfOPee4CG39e9ff8/At3lfwr9ileZ9u8zhbG3Ogx2ntwNg917Dd8+x98GMx9a75+734B3zx3jmr9KnVarxPOi7KdUm3M8KRIkL6jOzJ/0izcVIs/Pz9fwT2y5mTtRubp5N218kuxMjLHbrDUP7TsOM5iGMV/PkyeSXj0ujwgnj8668A5C785OHfVm+c7sWJY96MUJfadF1L/EQf6sUpQhzyZzbZeavGjpJ5vPCcvTrbf0dA9vsr1tGOPtthq52gnqkQtGCw4XDrs2V03GNrLiT/a0J0pk6jGQ1QuP8lAGkvPt23vqWeEhGkSy0CLele2cb0C4JPGxRXethAkrvWQ7Qy9Od1DAY2vzm++4G/driTJIGoGUSi8W9leLUMM1/ElBTxfS7ykE9hNUVYS6FjaK006Lh7x23tVU8RNUf0ThtqPRTgWoEwkP+gjdvVlCOByFIkICwULERZH8b3cpjaoCLTHbdvCGe8AbQQwMaYYuj1YdLM4LgKlbqo16rQ0nQdQX5qAi/sT/AHthXpgW9VbzkRjwzkeo81kdrgz4RYCU6fj1AScgE8N4ZcS+iVSxSGfDyv9YUYfKctAOyHBxdvlkaf7VZ/wa63cWWIE5QRyuK6CunnkUJgSiHevj2I3ACFsHlM7H/vo13B+emp6k/1H0yy7RTsEO6pVaKWgaNFwtQQXI6JKznEy5P41ZTi0UevMDN7RMjnzd0mTpbOXt+ITwQvPEzvgZjoZp3CmEIGAbnIwwyX8c6t4lzYoDBZOSGW6osA6s4Qrie+1Yb2299RKrp4FdCD4FgXt2UR0Qq9tkQPD4I1B29jdwX9+WW9pTWHhLN5RGD+kARzQ7gdibMpULMjdN5YY0QMxIS6BvX/WePE6AK+nibO2rQ605T8dVITolOficolqDzE/gPvi8VPrt5m/gJ8TEjw25LYBgAAAABJRU5ErkJggg==',
            },{
                name: '标准库(下载)',
                url: 'http://www.bzko.com/search.aspx?searchtype=0&Keyword=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABvUlEQVQokWWSy09TURDGv7m3tw+KUk1lIT5SlZgmotG40ERcGHe4UbZu/et8JJqwJ3EpC4E0RE1JVFpBebSgeO85M+dz0caU3lme+X3zON8ISeTi4K8JUKvE+VSUe6EaW9v2sWveiFy1cQGJ1o7vp9g/5ofvLq+ITtL8squdQ3qjN7b3wsqWG5s5GqU18NcfeoMz+gBv6PSDN45qIgAgSLb3dLVrt2cKk0UMOtSr8uha8eVq+n4zCxzKZFD400/tHDJTTpVx90Ky3HYkHl5N3rVcp2/O0Dgrz+YqlSSS3rF+3rVeCqfMlM5QK2P+SkLK21ba7dMbndEHOVXi4lypAEGq8Apn8AZv9AEWBmNCA3ygEhpCpogjEZKZhpUt3+nTKc9MyINGsrSRkXjSLL1ZTzf3gw+4VJPndyqny7GQw3XWun77KNy/nCxtuB9HQQ31KhZvll+tpdOTstCsxAKIyP8vG7R6vZ7t/KYancEbz1Xlxb2JYiwiMu6DiJQK0cVarINlAjXg+nQ8So87LSLzjeJsPdJAM9w6Hz+eLY/SAArjxwUsNEvfegbg6Y3ySRhD4/Karwe+EGFmKsmn/gEXdC5bcURzrAAAAABJRU5ErkJggg==',
            },{
                name: 'semanticscholar',
                url: 'https://www.semanticscholar.org/search?q=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAbhJREFUOI1jYBhowIjMUU7r3svAwPiagYGBnZGRQZyBgeE/XCEjA+O///+f3p1ZGophgHr+3HZ2Ng6WL+8eCHHyCib9/fXj06/ff1oZGRh4/zMyMDH8Z/r5j+HfD05Wls7PP37HPJlXvhTDKfqlC/8Zzf5grJbR88Wqe5cYLierZfZMR+azBM67NpmZmdl/Tbw6k37pwjdfvnyczHD/6jYGBgYTbAYwMTI8xBD0nXVpRuTyR48kE9u32i35Zqqe2f0blwsYGP4LMDAwMPzZrNf/Z4tOIDwQ/eZem8kjovj99K4FSox/vyrenFGiy4hN+0Xbjf/f/mBgdPIKZGRo/McEk9iUrJV+68M/ZlY29oP//v39pJDe5YGs8d/rxM5/9yOf/PvDfpjJ6bQ/I0PjPwYGBgYWZEWnRbgvMPb/n6uW3hHN/J/ZgIGBYQcDAwPD31epj/8zMHxjVlwug9trDAwMnxk8Rf8fEX/AwLCunIFhVcL/15EF/79k/f/3KmkeXo3I4M9G057/p80//H9ot/b/h8T//14ndxOtGW7IXqvb/6/7/P930WcKyZoh4D/D372WB8nUTGcAAKRjqWaj/WhvAAAAAElFTkSuQmCC',
            }
        ];

        //购物
        engineList.shopping = [
            {
                name: '淘宝',
                url: 'http://s.taobao.com/search?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jaWTsRGAIAxFs4Gj0DgGtTtQOIY7sAO1EzCOOxgLiCQRUfTf/TtE/zPBCAAAGAPiMvU5BgQRJjkj1zfe7JAguEw5tKfQPBYAX5NWn/YzpADmsQRWLyHcdP8C0IGa+H4TUGtFgy8AZ2Tp3RVwgH7b6wpaLfw6g8cWuGpnwStErHxG/aA2Vw4XQAxpLBtj2xxl+h82OwgQXd/5DGudpX0VOtMVPgBRELV9pv7F+wAAAABJRU5ErkJggg==',
            },{
                name: '京东',
                url: 'http://search.jd.com/Search?keyword=%s&enc=utf-8',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoElEQVQ4jZWTW0iTYRjHdxcUfrPZtq+cm25LxaQSQ4tO2IkKO1yEQVEERWJFYUQJQQUZUWQG0QGKIgoCS4pVBlKapH6fztNsW+zQZnOW5GGyxFkQvy4+LbUguvjxvu//efjxXDyvqmCaUFymFitKBf1/U6YWK1TlgljVMzsNt96qoLPi1lqUc/w+zng21tsjpqEqFfQVbr0VWWv+CykKsxSkhGQkjUl5a824ddYJglkpyDoLrRm5dK7Kx25dSEdOHq5NBQqbt9OxZA3Nxnm/hJMEUkIyTeJcfPuPEKmuwb11B+ErN4j5Aww73jHc6eRrcyufb96hMy8fSWPCNUmgMdE0O5Wuk2f51tODd08R/bYqYv4AwZLT+IqK6Xv0hNFQNwPPXvJu7RacmpQ/BcGSM8QCQTy7C+mrtBF5VUd71jIapou0ZuYSLr/G974+ui+U41Qb/y0YelOPY+k6GuMSaZwh4li5gahsZ8D2Ak/aov8QqA1IGhOtmbn0V9oYfFWLPydvikCcS/DE6b8LBANSvJH27BUMVFUz+LIa34KlYwKdhUbBgKyzEDp/mdGPITw799FfaWOo9i0dS9bQMF1PY9wcvHsPEgt00Xv7Hu7EdFSlgrbifVIGbVnL8OwuJCrbGXY4cW7cRv/T50Rlu7IDi1fjP3SMaEsbI14/nl37ccablAm6Vm/iy8PHjHj9jPj8dJ06R0t6NpHqGn6MfiPyuo6hunpGvH6iTS0Ejp3Ebp6PS2tRBMHl6wmXXeXT9dv4DhylJS0bSZPMh8PH6b37gM+37tF75z6hsxdx5RfQbMxA1pgmbKLWjKQ2IAkGpPgk5IRkZK0ZKT4JKS5RyQWD0jPT+Kvu1llRXRLEqrCYiktr+c3Yr5uUTam5dVbC+lR+AkXUXUZHV2HdAAAAAElFTkSuQmCC',
            },{
                name: '亚马逊',
                url: 'http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVQ4jY3QT0jTYRzH8a9d0m1M8rbMZklQbjRDOpSnHXSTjpFHvVgH0UODwShJWn8gGXXRi6Q1lIpfWYwCYZkQwWqHdhrYH/UwgxmzGU5sv7Hf3h3CJ3U5+sJzeL58ntfzfR4REbHZbPZgMHhL+8+ampp61Nvbe0lE9ondbj+SSqWW2VWRSIRAIED/wABjY2Osrq7ujhAOhyclFArd3d5cWFzE4XQiIjuWtbaWN3NzZYhMT08/39qUSiU6PB5EBLPFwp3hYYaGhqgxmRARvJ2d5YCmadrWxjAMfD4f7e3t3B8fVyG3242I4GppwTCMvYHtFYvFGBkd5bLPx2G7HRHhRHMzuq5XBpLJJGfb2tTbzRYLFqsVEaHZ4agM5PN5TrW2IiIcrK8nGo2ysbGB1+tFRHA4nZWBRCKhbvb7/Sp00uVSE1T8xA/xuAI6PB4ymQzjExOICFVVVVRXV/N6dnZvYD2X42hTk0JqzGZEhEMNDap3PXjzX0BJNeLxOG63mwN1dTQ2NnJ1cJB0Os2Fri4CgQCGnoO1edhcUcBT9Hn4dA8K6wrK/syhF4plb+b7W4hdhPc9CngGRfg8AjNnIHEF1j4Chb+HjCJsLsPSQ3h3HpK34cvoH6Cvr69fBX8kYO4cPDGBZoaXx+DVcXhRD5oVZk7DtwjoWeAX+XxeFxHZHw6HJ3fNCZnHsHQDFq7BygMwvu5IZLPZte7u7p7fLX31eStakCQAAAAASUVORK5CYII=',
            },{
                name: '闲鱼',
                url: 'https://s.2.taobao.com/list/list.htm?q=%s&search_type=item&_input_charset=utf8',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jaWTsRGAIAxFs4Gj0DgGtTtQOIY7sAO1EzCOOxgLiCQRUfTf/TtE/zPBCAAAGAPiMvU5BgQRJjkj1zfe7JAguEw5tKfQPBYAX5NWn/YzpADmsQRWLyHcdP8C0IGa+H4TUGtFgy8AZ2Tp3RVwgH7b6wpaLfw6g8cWuGpnwStErHxG/aA2Vw4XQAxpLBtj2xxl+h82OwgQXd/5DGudpX0VOtMVPgBRELV9pv7F+wAAAABJRU5ErkJggg==',
            },{
                name: 'Ebay',
                url: 'https://www.ebay.com/sch/i.html?_nkw=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACOSURBVDhPY/iPBdy4ceO/h4fHfx4eHjAGsUFi2ACGAbdv3/4vKir6f9q0af8/f/4MxiA2SAwkhw4wDAgMDPw/efJkKA8BJkyYAJZDBxgGgJwMshUdPH/+HCyHDhiAAERQgrEKEo+fGln8R8YMKZdQ8Nf1TCi4bYc4Ch41YFAYgBGvpGOsgqRgrIJEYob/AJ9QN6R4CcpEAAAAAElFTkSuQmCC',
            },{
                name: '华强芯城',
                url: 'http://www.hqchip.com/search/%s.html',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAASdJREFUOI3VkjFOw0AQRd8sFHTkBkkTLYqDME0kdz4CnCBX8A3IEXIDcgRukKVaKQ1uHMlKg2/gSBQ08VA4FkkgNi1fGml2/s7fv7ML/x4C4O14Dho2xSjP4ib3NojBJIqGItJHq1fARXk2A7g80NoLaPrdPF4gMkV1K4hDSUFi0J9WvA2ct4E7WM/8za16G7i3fr93vNcOmty03C5R1eLq8+PhvijKQybK8/dWAW+DGJFrgZfT5lO0OACQtJ3vEFCtem38WYGLSksAEQl/4zsFJpt1qqoFItPVcNQqIgCr4SjcGbOoS5pEeebqQZolqlvQOeD2Zw6gGjQfyQDsjMwRuavDLAGiPHNa6aNCiZgnxCzr4BlMeOSgC7VD6UE9n8lm3fk6f8YXG/xtb+J07GMAAAAASUVORK5CYII=',
            },{
                name: '立创商城',
                url: 'https://so.szlcsc.com/global.html?k=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAOOSURBVFhHxVXbUhNBEM1G/FiVP5FQJhu+BOTyZgG+W/oQeJSQmEuBJkFQ2ex4zumeDVTN8zCV3pnt6T7dfaZn02r1RuFFJanMKUllTkkqc0pSmVOSypySVOaUpDKn6FFOIaNQ9K8x/witZh7DyOf+xNZxn2v6Yq8Qhr0XJezKIbCuMHsQ9yV+wViyd9uiNwytPYCU43B0+Ttw1JDZr0rA7b45cL3Vox3BHMAToS9Fjhpr/fg6X1aWnIJPLNk9vrM4rPWA4lV3GA4v7gyjrsJs9c8yZxWc+5uK2z2+eyKYv40fQl3T8/FZDnxfu+Z4cIc4SACJkqGYeEtAXVQCYDJQm2eYLsAAM4aRAnaRAACsegB4Al9H92Edo/rMoLa08HVldOyc3qqgWIAlAJCC4KDpeHCPSio5Tlfr0KYBkpMDA+/hXGkPfdGdhJ3PS4UhOBmISVuSo9A5WwAJeNyH2XwJVuPRIZ5sVYkouQonOgIygAQA1jQcncgGGqvd2zTsbBkJBmNIuDlXYLJfuCb10YhMbR/8tAJYHG3ZgC2v8OTiwY3XYbZ4NCPQrkYsv1twNSzpmwiUthxHl3cO6mcLPNlpxrtTbzcBmDoGFKiupBKz3QIDHK/IAPYIQOExcSYjqHB7f+654onf+/OFdTjP9mm/aLYrKLaJgQQ464h1L5XV5hpyzBZ/pRcgHZo1qxmKyqejcz63gAymwOgXMGe+YE2B4askWAyEBZqTZXUyWKkqysTvL6lSpuoDzt48SIj9Eu13T3HNCC4B5gc/Cgahb2RA/tAzLnvGsjLl4cUKUESs0FTBDL2xrA+QtUDMmU0Y7746nOeqhqa9VdjB1eO+PUJ4c3AjPZkXU6xEFYISNqFuAYz1BaOBjAHctWRec4aeAEdsWgzHbm6O7GGze4Zj4qYM7GqrCOGyICRLuuxqMYF4ZUAtWGh8fXAdLx4rIUPTBd4bI7vC3pfP9Fx2Pt04M8aSRDSwIUAtrxJHJSAftYeUanPmbz/eem9MURk/XhiIbDHNP35VOfhRMiYZC03JnmBcKvmH1C6v9V+wGXD2b6yeehCQSazDu/1bgbRL+zqyWeOw/wVz+TL6I6ZY9Ra/A1jbEfEoMKvJeFd51sjOGo9nTCcagSHYqFrS54zFfbtyOEJPgoGaPc4K5Cwrjv3x6RjUA9p8QUkqc0pSmVOSypySVOaUpDKnJJU5JanMJqPwH0HH5Nojm6G1AAAAAElFTkSuQmCC',
            },{
                name: '贸泽电子',
                url: 'https://www.mouser.cn/Search/Refine?Keyword=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAApRJREFUOI1Vkk1rXVUUhp+1z7kfNrdpYgyUdtSCgjNH4kAcOxH/gP+iv8BZJ/0BdSB04EAHUmilKFZLkbYGo6RRS5O00HDLvUlzc3M/cs7ZZ++9loOTRl2jxYL3WYv3XTKc2Puz6eS+r3xHzVCFpEZQJUTFR8MHxUelrBNlnSi84jXzSxfe+cgBV2rvOwgAiBhgCIKI4ERw7j+9CM6BproDXMnNEDUwM8xADRQwDON1GZj9byaAZEieDKujcmG1x/mV3qlk7e8BqkpSBYRPP7yEqiEi/Ppkn5839xAwFyKEoKj+uw+g90abEJWQjKVeGwH05Mpkhsty+lPIfYIqJuIJYF4EemdaLJ/t8nw4I0Rj9dwZQjIOJp6Vc12QjAe/P+bWgx9xPkJZKzE1gLKOzIqa5cUuVd04v7LUZTT1zKuAmrC28Se3vr4Dq8u4ZOBDOgWowfCwoNvOkBP3FxfabL8cMy08IRmTWQkLHQDc1W240y945fUEYDwdzgEIIrw8LnHA5ze+p78/pgpGSAbS5O6+2YfrT8Y8OqgBeFYZn9wdAlCQwClB4e76LglhXkWq0AQNkKNAMSOvqybfFGF3yIujig8uv8W0WGTzxQgGR1RBmZaR0sfTtByTCYwPwZfNy4QIowMePR1wefUs7158k4ebz8Epx1VkNA/Mq8Drz3UMB3A4ohU9AB0xmIy499s2nZYjb2f8tLYFLaWKxrg05t5OATmjV0I55YubD/llfYvhUQFW8OUP6+wP9qhD4vYfO7CQc/2r72i3WvT3RtBpASY55bERPRs7fTa2+g05E+p5ybf3HoMpiIFF/trZBTNwDpwAYo63P75GXXuiB/WQPNQVhAoIYAFSaISZgzxrxJJ53vvs2j+A8Z4p+MBd5gAAAABJRU5ErkJggg==',
            },{
                name:'1688',
                url:'https://s.1688.com/selloffer/offer_search.htm?keywords=%s',
                favicon:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXVJREFUOI2l0z9IlVEYgPHf+VIMaY00KTKiJJECKQgCoybBDAo3IdKiQQLjOkhDGA0J1ZJbFIiLRIENTuKQQkEQqQkVBpnDvTlEIQUKFl/Dd+v2iZfw+i7nD+/znvO8nBPijGY8RLWNxWd0hjgjVwL8t0i0CRiqy/6bcvgMRy6zt4nyymTv60eGzzI/IyoKnu7nTkz7Uw40EyJGr9ATmH1C1zTlhDgjToE7a+heINrChzGe3+XdGL/WHNC/zL190goHT9Exnsx7QnGt2gbKtpLL/qNQ21CAx/uSsQK9c1SuKdD1hsfn8Uch4Hbe5Nsnsq8JgZUlhi+k4auv+LnCwHHIK7TdLyTkphg8t/7VW25R05jSSwocvZSsbgS+F/HeU8+JXm6me1No4upyGo6wq47ce1bR+iDZP3adqkNsr2P2Ub4Hu/fTMcm2HUnSwgvmJ3h2jR/5go1tnOzjyxxvR3g5hPXewQYjkvyqUmMxwkUslgBn0fkb51liu7gLx1QAAAAASUVORK5CYII='
            }
        ];


        //社交列表
        engineList.sociality = [
            {
                name: '微信搜索',
                url: 'http://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAbJJREFUOI2tkktrE2EUhp/zzUxSNAQKjU2iLhR/hCsX4sqFF6LZCN0W/0Shy+IP8A9oF431Bu6EgqtuslfqZZfajlAQDM18M9/rYmodm4CKvsuHc33PgX+UnQTzG/P361HtnjN3Aegc4d2g8GlSZI8P+gcPZxZovWheivNTb1zNdVQIAqBKlAOLjJCF3TweX0lvfn1PiaG53uwnobFjzjrywqYHwzDkhTnrJKGx01xv9o8LNOZOP0ICgaRRVvgB4LHjGX1W+IGkEQKkMgdwi4PWc4ssQWCxMQ5+Ke2l/RDCFq5sEULYSntpfxz8ksUGAossWXzSembdzfYHzC6ispvEyOO3ayQ3gPhogzzDv0xILpvR/RGL9NE6T9uZyZKqreYMFaIqiwwF/TQWkMk7xN4vnompZDhiVWyA7IuTeFda+ZdyIBVv3XJv+ZrZ9Nl+J3PG2d75627VVvF5tmb1Pyxi4OYM7/O1oQ0PI4BvG+PX9Vv1PK7FVwnMePCSWWwQwB/6lf276QonQ8+96koTENq3mp0hVPad6HOhfHvvTnp75mQLg4UH3c32sMokIaYv8l/1HdwavwNcKS/kAAAAAElFTkSuQmCC',
            },{
                name: '新浪微博',
                url: 'http://s.weibo.com/weibo/%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVQ4jb2SXUiTcRTGH9CZNmeyvXO+2163tSWaFWmsMmtpSpC1EBNDJaiky0AEL6S0D4pKHVFpXmTaB5FdtIuEqBslBCMqKyNDUFKpLQ2rOb9y/s/pIlYUeBFBz+U55wfnBw/wHxO7zowNa4zIAKD6a3pPOkpG6zA+WoeJ50fwJi8VOxc91gLKzpjYwjUq1cbwLA7QbluJHVuSkespxsWpywi5HNj+JxtToZWOv7As980kp3G/1T4pAXJ42VCCpp5q9KZbkHmhFC091ej7JQgk3JLND4LJK3nckcJ+Rwr3W+yTOUuW5rvV6pIqrXRib6L6QI0bp7uq8NRlx7aRs/gc5uO9RqU76EjlUZOF3+llGjGYaECSZ/t0CV8+KTaeSU7jLr190GWM3N68H9d2rEaB34PZH6/pE9umbCt42GBmX3YezRytJXH9JoVaWjlQWcUfMjfzmKzwsySrzwDYAGCtAmdDEZqRGR2d609azr6UVRy40kJibo7eDg/Tw+5uGvT5SAhB8z4/TVRW0ZCshO4ZlccZkdFbfro36PVtAesKnrrrZSEEnfF4CAABIJ1OR16vl4QQtDA/Tx93FfC02cbdim1IA0gAgDvx0qPpfDcLIehJby9pNBoqKioit9tNKpWKnE4nCSFICEHjhyvIn2DkfqtjMqyCGrXG8y07j5mYOzo7aavLRYFAgLKysggAHSwvJyEEhfx+8m1y8YzFwU16QzuAiHBpzA+khFd88hQvBINcW1/P63NyOE6WqXDfPhqbnubQ4BB/LS7loMnC90yWHgkw/tYeCZDr1eqW97sLJ7ntBr++1MgDV1uZO+4zHzvBX9Od/FJv8FfrpHMA4hetsAVILYuIOOSREi+3GpX2xrhlt2tUMed3R0WVGYGkRcF/yXdyajYEKzT4iQAAAABJRU5ErkJggg==',
            },{
                name: '豆瓣',
                url: 'http://www.douban.com/search?source=suggest&q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOElEQVQ4jZXST0jTYRjA8UfQNd2w3DqERIQQBmFQNPFgHVwI2SHokKTQpaB/RJvZ/JPLhWWkCcq2lCIhFILyEHaoYEr9LE1/bXMzqYOYTmeUOT2olWjfDjYV+qcvfC4vL194eR6R7Zqjkqf3SK5ubfL0HslJuCeSr1ekciNSmoAUa1bPvh6pMCJyRNcmJVqqntehjvhXLa02EynSIpKr80iJlmrFSceHLtoHlP/qGfGxs3ZvNKD3yGUDYtWw5XoaJqeZzPoD7Gs4+JsMdzYmZxYxxQakUIfYjdFAEnI+lpa+VgCmv88QmZ1k6uvUkonZSaIn3WVGLLGI3bAiYInjYfARAObbh0i+ksLmyh1Lkh1bud/bAoDJmYVY4v4e2HQ1FTkhyNkVjgt1L+v/FYil9d1TANydd6hsu0mN4qZGcVGjuHA8u4Z3tBeADHf2H75QoKX0iYPP0+MADEaGCX7sp//TewJjb/k2PwdAz4iP1KrdSIF2ZcCAFCUhZwTr40sAHG46hpyLQQr1iC0R/1gfEzMREsqSEeu6xffLASNSEI+cFrZV72F+YZ5GtRk5JchJIeXGLhZ+LNDse7B4Z4lFLiZGx7i4SLe67qKGvPSO9S2NSw15UYd7GIqEABif/oI6rKKO+jG5zIhNsxxoeN2ILxzgzaif9oEOXgx24gsH8IWDdIe8tA8ovBrqxhcO4gsHSHft/xXI1ytSbkQuxCNWzerZEhGHEZEcXZNUGBF7ElK2BuUGxLZh7icJ8DyZ0CDAawAAAABJRU5ErkJggg==',
            },{
                name: '百度贴吧',
                url: 'http://tieba.baidu.com/f?kw=%s&ie=utf-8',
                favicon: icon.baidu,
                blank:true,
            },{
                name: '知乎',
                url: 'http://www.zhihu.com/search?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4jY2SS0hUcRTGzyLcRI9Nm8BlbaqFm9xFi+hhm9EgrVZBUETOI3VsUGeiN/RGAqFyGmcRFCFUFJRFWCs1k3LunZnGbOb+73W0ssfo3HEG+7W4E4iBtPjg4xz48Z2PI7J+Z4Psj/ZJ/Z0+qQ//v/ZH+2TX+YjIvmi/nJtBQhNIu4UETMcHraUVyiKnvyPSEHkhQQtpjlN5JkXrw0mkSUcaNcSjI81xxKc7fqFaEkjQRKQ+3CdBC3FrnHv2hUS2wPauDDXditqoSeXZMTZeGWd3WOHqMXH1mGy7abD6ZAppM8qADotlLXGG0nmGzQL54jyTv0oMpPPsDRv0j82ifpR4a9iMKBuAmrCJNKfLgFbFnogipmwqWuI8iuXwPMgiR2KIT2fEtKmNmMjRGOLVGVY2e6LWAkC7SfW1cdaeSiGHPvAiOcPBuxZyaBRx67xTNq4e0+nleJy3yqZuMWBV6CM7bitc3QptskDn62lqbxlUXR5nIJOnLmoibg1pijP8D+CEwhU2GMjYDBo2dvE3+tQcA2mbM8+/8ObTLLU9SwGCFuJPIG6NFW1JdNNmw6Vx5PAo4nVOWDpB0EJaE4hHZ8uNDKXiPPeGfrI8kETcGu+UTU1YOSUe1RjM5BeV+Bfg1rg//JMnsRxPYzl63/+iwqujT87R9HiKNYEErrBiKldyEjQtBDRq7L5lAFDdmWZlIMn7TJ7N1z9z8eU3coV5UtkCI2aBV6lZqq6nEX+mDAiYbOlM8yNXorN/2nldn866C2NUnk0hxzQuvvyKpzfr7LzlV+5QiByI9kvHBJuufmZrl+Es/AnkRBJpXuD9CcQXR/xJpLWsUBaRXecjcnoaCRhOpHbDIS/W4nkoi7TEi38AwHibcZoJerYAAAAASUVORK5CYII=',
            },{
                name: 'Quora',
                url: 'https://www.quora.com/search?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADQUlEQVR4nO2WXYhUZRjHf8+ZzS0Jw9oUtMSa2V0TI1MJwqiETSzNWnFnxkzpoi5CSqKLCIwGL2Shqz4uFvoAtZCZYEet9GI1Ay+EDRQ1ktWZvNiIVNA+2V3dc/5eNDvunPPOeLS9Uv9X5zw8z/P/vec9vM8Lt3Szy+Im7kkx5W+PTnyWCRYYTBc0A2cMymb0kaCYHmBgQgEKj3OHzvGOxJvA1Ks0k6A4yWPTqlOc+N8AhRRzJfKCedUC4yjGF+bxEz5DwMxALDfjZYmmStMhYGOmzKfXDVBIMVdwUOLuarLHxzaft9Jf40fykywMoI9xX8kz3k2X6L5mgN453HNplKMSM8eFD2ZKPGWGGkCvDMSuGgOPlzKn2FGvxnMFL15iS8gcS7C5kTlAusRujCM1QfHhtw/X/3ciAMUUSYPXQuEL9ggHGplXQY1ijb+4959h3o4NcBEyim7NYde+OwECfowExZrYAIhnHXnlOOYVlRw9Hyy00x4PAGaFAwZ/xLY3/nSF5TM7HoAxPVJsDMf1b064c6VoXzeAOB9lojkuwIiY4oqbcSYegDHogLorLgDelYNrvG5r4rQr3hT14nvgsRBUcuwx38ZzCnjFoBW4U/ALRq/Xwrb0IYYsYFrExRjszFIi5+INEyWip5bgUeXwdrUzA5/diC6J+RIpxFICenSW/uIcZgcBixwmn1mOwPUFIgCrBzgG9IYIWgpf8cQLA/wmjw0Y3Ubt2BXMGxllD2JpzeKNc02T6XGZQ51ZsDPJ/SNwXFzZe4N9mTLPjL0feJrbz/7KdonVDZrLS7C86yR76+U4Z8GLZQa9BM9XxioAgo58im7l/qtZ8gPD0+5jHXCsjrlvxoZG5pW8+sq38qTEDsSMaoHRr8p9wIy/NMoKiS2Oxp2ZMjurC8jh8T4KD7Sr3oi+aaPlX58Pxl84Ysn4PFviVYB8Gx3y6QP2Z8t0XBPAmArtPCCf9cAyYIHEpEqD34GfMRZLtQeWwXdm9AewHpE0+ChTZuN1AYQ1NuNXHOcCQL6V9xSwuWGRsTBb4vCEAIRV6CKhI2yVWFvH/JNsiTei4QmUcnj5L1lj4nWMhxAJjBN49GROsnUivW7pxtFlNM8U1KJDSwUAAAAASUVORK5CYII=',
            },{
                name: 'Facebook',
                url: 'https://www.facebook.com/search/results.php?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAbQtE48bOXX9J8UrGmdeBhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZYOJRdZhUA8w9a48QmVfxAwATIfnUl6gLIAAAAABJRU5ErkJggg==',
            },{
                name: 'Twitter',
                url: 'https://twitter.com/search/%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVQ4jWNgGEyAH5e4bXhCgX1ibqOVb2gCklpU9ealvRuRFMCBau3cCwxTzvxnmHbhP8PEk//1yyfvl6xb9sDGLywJRaFh/+ZTDBNP/rfOrZ8PM11VW9uAYcnj/wxr3iHwwvv/eZfc/mxkZeeEYoBvdnkdw5p3/xnm3PjP37TunXVu/XyH3LopKJqhODCrtIKBgYEHxQCDliVH4YpWvvrPMOfGf4aZVzA0M6x595+Xl1cEI6RcfIPDeFc8/oxNAzLWWHjuNq5Y4PFvmT6fkCH++dWNuAxgcPAJCteYc+Y2PttFRUUlcBrAwMDA7x4UEWUzbcchbJotbW3tcWq0zq2fz1+38h1D597/DPNvo2h2nrBmG1QzMy4DmNXU1DR8I2IT/FtnLYThkPKWTs+g0HA1NTUNfJqRAY+kpKQ8DEP9y06MxoEDAKUW4Kpi1NnUAAAAAElFTkSuQmCC',
            },{
                name: 'REG007 注册过哪些网站',
                url: 'https://www.reg007.com/search?q=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAIeSURBVFhHxZcxswExEMfDK5Q6dEpfQaHwBYzGN/ApNOa1Cr3eGKVBq1bTGKWWSqm7l3+yYa29d3dmuN/M320ue8lmL7mEiYjpdBr1er2oVqtFxpiPCG2jD/QVcAEMh0P1gU8KfboAEI3m8A2h7x/L7+FwsOXvY/s25pPvPEnou0CF3CjSFZMxUdfr1Ww2G9Pv9+kpz3a7Vf2TFNpx6ciCDSSyD99TaQOgmvQcj0f37D0DWSiXy2Y8HlPpPZbLpbve54ANCpdMrFYr0+12XWPNZpPuvoKAS6USlYy5XC6mWq1SidIoCfeDRqMR1TwIaUwSXhnHBszrvSFhDnftdjuq9ZzPZ9WPazKZkPcDXv/WHMhCu90my7Pf78l64CKRhPtB2kiQEenHhZUiGQwG0s8b76A09iS5PGNemTeykjR66Ha7kbdnNptpft7IAkbGGlCFzjgIRvOz8kZaktIehHRz4oKOXQWFQsEJHw1Op9MhKx4bpKlUKlTyrNdrsl5xkUjCfW32831AEz5QnNPppPqRvCFhDqnTCWlLD4PQfEnekDAHNQtxcwGfWc4/ky/IGxLm4CSzELcPyKVnzw+qX1DqT/FisSDL02g03GTj2Ew97XpgPp+TFY+LRBLuc8ksyMklJ1+a3TLTZiSzUK/X3agBsoGscMKh4z/yP5TaozGZ3wd9F1utFhW/D/ou4kyXF65vzNZc/5y6X0s+f8+j6A8GHHalWmUWlwAAAABJRU5ErkJggg==',
            }
        ];


        //资产-域名/IP/Port
        engineList.property = [
            {
                name: 'Riskiq',
                url: 'https://community.riskiq.com/api/dns/passive/subdomains?query=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAdZJREFUOI19kz9oE1Ecxz/vxV6MpskgOFmXXBUEB8HBoXZWEBcX/6RpItTJwVVwFiFD1VFqL7mIYFEnFcHJZtDJQS3Su3cpIqIOgqZaLyl3zyExl9jrfaff+74v3+/3B+9BEhrKx/YeJElELLuwOoMhr2Nk9tH1A+A5JfNUYtgAdfUBW70d4RbdKrb6huXcjG9QV0207iDlQfywyKXJl7HmNfUYwVFgDWgxa1YklrvEruwUUuxlpjCBIapDbZosqqsAWO5tBD6z5n6yuWkE5aiB7bUpFXLUnHvk91yg/eMV6ADDmGKz+wWtPYQ4DOQpmYKaeoJGUTGv7Ogv8h2A8oEiUByqvEzZnI7Ozq3+5CNYB+gZaC1jd5ZibDBb6gQw3gvUghAZGWyH3bljNLxPiLBBKC5jpMeBi8OSfyuEsQa/f76n051j7tBrFpyPBBuF/k0AOoiEtvK5s3pyi0FNLcca19031NV9AInlPiKTTZNOVbcIJcexvaURbk3nyOaPkEqd60kqk2fY+PUCaNHwPnPXOTsQa+0RhF+jZPWMZusd6+2HdDevxbbDdlew3ZURznLm+095/n/5Np/JPc+YuMHOzASdPyGIp5QKp+MTk9BQPrab+J3/AlVirIzEzHGpAAAAAElFTkSuQmCC'
            },{
                name: 'IPIP 域名反查',
                url: 'https://tools.ipip.net/ipdomain.php?ip=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOI2dk88rRFEUxz93Zt4oozHqWUxRZKlYkL/BnoVhNxsWiPkn2PgxlKEUC+b6ubf0B1hISEkp5RUvw2uUesax8IyZvHnJWZ17+v4495x7ISi0ZNGSDYJEAsirOPaol9eRUmN+sFBNAeECBSgvPxJfmPpVORQY8Mp5meIdMFnkhXMUxwyp8ZqmaFlCyx0HFW5yA9tyxsq9sPYoaJn3v4KWORx7goLVgsst+56I6gBFjogBJRcce7pSJFRBzlByIWKAMEMY2PJEhlWOBjPtJ6LQksWxJ8vkBjNNgg0cThEaMWhnsDyTEZyHLT5KEDYgbi6FgC+bavIJT1Y3BasNl+uqmfhuQUsO4ZIEyx65pwqVSF4BsxTtTd7db/cFUirzs8YjgQLnFKxOAOrjRaKxN54t82taYSpaXyClMtVb6FegOCZsQDRawo11EaOZpuQr4Ev2jx3Jsi595fOegJai3xv4e+xK6//IeYmTl94gSO3PBPDBBBEmgyCfyBCnvw67vvkAAAAASUVORK5CYII='
            },{
                name: '高精度IP地址查询',
                url: 'https://www.chaipip.com/aiwen.html',
                favicon: 'data:image/jpeg;base64,AAABAAEAEBAgAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0sXZo2pM9SgwDr/nLs4/5y8OP+bujf/krAz/3GJKMosNQ9XAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAEKcocssLbaP/+fwS7/ka4z/46sLv+KqSb/jast/5KwNf+YuDb/mbk2/1JjHZwAAAABAAAAAAAAAAAAAAABdIkstrnePf+/13H/2uO8/6K7Uf+1yHT/2+W9/7DFbf+Lqij/kK0z/5GvM/+evzf/UWIcnAAAAAAAAAAARVIbb73fSf+kxzH/z+GS//////+rwmL/ydic///////D05D/iKci/5GuNP+QrTP/ka8z/5m6Nv8pMg5TBQYCDJm0POi01Uf/pMYz/83gjf//////qsFf/8fWlf//////vc6E/4KkF/+Mqyv/j6ww/5CtM/+YuDb/cYgn0S42Eku32En/rsxF/6XHNP/N4I7//////6rBYP/H1pb//////9Dcp/+mvln/pb1Y/5SwOf+KqSb/ka8z/5KwM/9QXiB7vN5L/67MRf+myDX/zuCP//////+rwWH/x9aW///////////////////////x9ef/us2A/4uqKf+bujf/XG0lh73eTP+uzUb/p8g1/87gj///////rMFi/8fWlv//////5O7C/8zfi//Y56j//f75//////+ov13/lrct/1NhIn693k3/rsxH/6fJN//N4Iz//P34/6vBYP/I1pf//////8ndhf+Zvxn/mb8Z/83gkP//////w9KR/5a4Kf8zPBVTu9tN/6/NSP+sy0D/vNVm/9Pkmf+fuUX/y9if///////Q4ZT/psg2/6/NSv/i7b///////8DRhf+gwy3/CQoEEaK9Q/C21Uv/qMg3/9Hilv//////r8Nn/87coP////////////z9+P///////////+/03/+01Er/iqYu2wAAAABSYCOBwuRR/6zMQf++1mn/1OSe/7LNVv+/123/0+Oa/9PknP/U5J7/0+Sc/87gkP+wzk3/tto8/zxHF2MAAAAAAwMBB4adOMrC41L/rcxC/6jIOP+uzUT/q8s+/6fINf+mxzT/pccz/6TGMv+kxzL/u99C/3CFK7IAAAAAAAAAAAAAAAALDQUXh545x8LjUf+21Uz/r81I/67NR/+uzUb/rcxF/63MRP+11Ub/vd9J/3WLLbQEBQEKAAAAAAAAAAAAAAAAAAAAAAEBAAZWZCSCor5D6bvcTf++3k7/vd5N/73eTP+42En/mrU94EhVHHIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKBBI0PRZRU2EifFxsJYZQXiB4LzcTSgQFAgwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='
            },{
                name: 'Dnsdumpster',
                url: 'https://dnsdumpster.com/',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABp0lEQVQokX2RT2tTQRTF79w7E2depP5pLKQiCO4EP4fZiAim3RTBjUhBBDd+jnwEV0UQXCpuBLtQcaPSRWMSXLjQUErTvryk6byZ40J9yUuKZzXcO7+559xR3vtms9ntdq21AOg0ichgMGg0Gq1WSy+2mfnPAcDiEyWARRRhOMy0NjF4FuOcDSEAUErNA0pReniQTfBw89GVlSVj3euXW2+2P9VqlxI3dVsACJBbd9aWayu3Gze33746f/nq/Qeb165/6H3b+bzTKXzOWELMRpM6589fbJmK7b9/p1hXE5dlI2Y1n0Gx+HH6/Vd/bf0uHY+JY1RKG7fX233W7tili6MsKwNEeYj11XqnvXu8nxrnT4yZjHn1bPXCueowRFoMTUQxRNEiWrOGsGjNSlGMUDS1xLMAAAKIUKqUNQVAxMJ5CLnPg/d5yL3PCaQUzUK6uG2M2fvZv3FvwyFEjpGoUkl6Xz6moxOT2GLsPyBG65If7a9PnzyuGIkgAkQ4PTokfYYQC2vT0ACM0UeDg79NRQQSrUV4NklpSwC0MXMVgE75uP+sZU6/Afg6zCm+oZvZAAAAAElFTkSuQmCC',
            },{
                name: 'threatcrowd',
                url: 'https://www.threatcrowd.org/domain.php?domain=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAUVBMVEUCqfRyz/owufeM1viR2PcMrfUitPYAqPRMwvj+mQDumg+wyblszvo4vPhcyPqB1PpAv/qd1+y6vZLQpkUasvar4vzKq1av1NW/tHaqzsvdnyjqIMTcAAAAAWJLR0QAiAUdSAAAAHdJREFUGJV9jkkWAyEIBRFRwKHH9JDc/6DRRRtWYffrFR8AGJjBDjqHNlcSITTOLMxS/oG+cky2Fl0RLwZwm0jSzgcYIkcvy+xLNOS47nNbB+HXuqumzQ1jyUlVdwoPqO8OTv8ACHQn/eTfQ4yU8+WG0Gtlqi1/AfyuBJROmzPtAAAAAElFTkSuQmCC'
            },{
                name: '查子域',
                url: 'https://chaziyu.com/%s/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZJJREFUOI2tkz9LW2EYxX/nkj+2uQ2JodASME5V6ewgKPgB7KTQwaVT3KsfwA8g4mi62FVxdOhcGnXQQScFlxQyib3xem/SiOZxMIGbeAWhPdP7vM95D+f588I/QnGXSyuG2QBRUFl7SndiVQ0n9GueI6qOqIZ+zZPFcxPP+Cq42dIJxiyAmy39RBSAyxc5iIE9l4gXMMKGdz5psG2w3fhzNokRvFxANHP5sY8ID+HlhscnEK14agTlZcMRq2akEG1gupv6hZGWuDfYqKzpKtaBI2g2L78gAoyUoCqo8igYtFpXi4Ji9E0CunPvMG/G+/RQ/gbjVGJvszv3pWUD49PQq0LDjLnyV/sg2K2s69GBgGZY3wRmHCWOA7/2HWMqUuhC4Ne2MI6A8TD4/c2iDgAybvFCCT5zB262tINIRqtzs6V9gzKA+2bkuLep0R5o4NwfC2QgpxcNCNy2G++45xBxEAb1WQw/InAd3tSnEAd0OGz/9Qp9TTQgmcyNdrq2XrvFvs8k40cmU3zb28d0Ks9/wwOf/Y4LIoXi6AAAAABJRU5ErkJggg=='
            },{
                name: 'Virustotal',
                url: 'https://www.virustotal.com/#/domain/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAAA3NCSVQICAjb4U/gAAAAIVBMVEU0Sf9HcEw2S/8ySP84Tf8xR/81S/84Tf81Sv8uRf86UP+4/t3fAAAACnRSTlOpANCc4I3K7rB4Vz2Y+AAAAEVJREFUCJldz0kOACAIA0CqKMr/H+wS0dgeJ6GANP8jELcsEZ2A7BWRumBKCkgbUK4ceBKA7spgNKJUql8pr+XD+HR+bgB4lAMuigWbtgAAAABJRU5ErkJggg=='
            },{
                name: 'ChinaZ权重查询',
                url: 'http://rank.chinaz.com/all/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAB2SURBVDhPpdDdCYAwEANgxY1dryN4K0klhZRyTeGuBoI/Nd+Dx3WX+qcN8DGz+j5nqzpnJDCOCayQCfDjFKDGYWA1RkOAGhJVAM74XgL8SAHjGJ0ARgF+jPaf6OMBNUbDwKrbAILrFsDgPg2MwXMK8OnAfkv9ABNP9lloIfkeAAAAAElFTkSuQmCC'
            },{
                name:'查站网（同网段网站查询）',
                url:'http://ip.siteloop.net/ip/%s',
                favicon:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAAkUlEQVQoka2QQQ6DIBREZ5RD2HThrj1Er9VbeC29RHcujKcg0wVggp8qJp0FIWEe7wMBgKiNQBDL0B907u95et7C/vVZm+rLYy4DbmcnTx6UASS99wQUKAFE27SHIxEKVSUmjwG0dW25DEQsegzlCv3EFCWFb5WgYEimnwZJzhlnzuyPx0dnnScj/RngtlRF+ALmaTGMLZ3DNwAAAABJRU5ErkJggg=='
            },{
                name: 'SecurityTrails DOMAIN',
                url: 'https://securitytrails.com/list/apex_domain/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAnNCSVQICFXsRgQAAAACYktHRAAAqo0jMgAAAOVJREFUKJGNkb9KgnEUhh8TugQvIJwd3AO9jNbwItKp61DJXLqASCKQhqTATchqcUnBlsQiKMHiafh+2e/7huidDufPe877HtjAjncuXXpvlyxsmcVRXL5UPRMRt+0lLVcAW2CT6gc5hswQmXBNjhXsBhZV7Kf4L0RVyNum3KPIfrRyTok1a4oc7uBY8SmafhE/nVpQfeB5MRRvfPPWE3UlThJ61Ve+FntiTT0VW1Y2ikODYz0OqYFYDvHjzwrb8fUj5yGqe67aDTKz+JUJ2EwmDpypOrUhvsd2p60mZfX/nvXXu78BNOtLaZHO35EAAAAASUVORK5CYII='
            },{
                name: 'SecurityTrails NX',
                url: 'https://securitytrails.com/list/ns/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAnNCSVQICFXsRgQAAAACYktHRAAAqo0jMgAAAOVJREFUKJGNkb9KgnEUhh8TugQvIJwd3AO9jNbwItKp61DJXLqASCKQhqTATchqcUnBlsQiKMHiafh+2e/7huidDufPe877HtjAjncuXXpvlyxsmcVRXL5UPRMRt+0lLVcAW2CT6gc5hswQmXBNjhXsBhZV7Kf4L0RVyNum3KPIfrRyTok1a4oc7uBY8SmafhE/nVpQfeB5MRRvfPPWE3UlThJ61Ve+FntiTT0VW1Y2ikODYz0OqYFYDvHjzwrb8fUj5yGqe67aDTKz+JUJ2EwmDpypOrUhvsd2p60mZfX/nvXXu78BNOtLaZHO35EAAAAASUVORK5CYII='
            },{
                name: 'IP138',
                url: 'https://site.ip138.com/%s/domain.htm',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAByUlEQVQokWMs2GrBgA2UHLyNVZwFqygDA0OPvWqgVoGdQvjf94+ZBWW/HJn5cXM1QkOycaeOuN2PP1/WX5tw6slWBgaGQK0CFSGjFx1Gf98/YhaUE45fxO/b+nFzNRNEw7JLzc8+3eZg4QnUKoCI2CmEM00L//v+EQMDw9/3j94ujOOxSWdgYIBq+P77y5135xgYGDhYeDhZeRgYGP6+fwxRDQF/3z/6+/4x1En9XseffbotxacKkdMVtz/1ZCuzoCyzoBxcD7OgHLOgLNSGDQfuwVVDXK8kpP/v61vRrK3MgnIQ1cLxi74cmcnAwMBYsNXi+rYKcWEuM68NKkJG7qrJDAwM//7/ZWJk/v/nFyMLG1ooMbpnb0AOTVcLueIYQwh7773FW25MQ46WHntVJrTgV5bhh7OdlWLNZLzxRZyrhVyAgxIDA8O5G6+NNEQZGBgi9WoYGBhOPdnaYw/1JLOKWQSaY3affNwy5xSzzBpdcTsGBgZdcbv33188/QRNKQgnZQTrMDAwXL79pnfxOYipyy+1QKQg9mBx0r2nHxtnndL06oBwIWkkUq/m2SdEQkQPJQYGBrgGrAA9lBgYGK5vq7i+rQKXBgAa+qrxWmoS9QAAAABJRU5ErkJggg=='
            },{
                name: 'Wayback Machine',
                url: 'http://web.archive.org/web/*/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABWUlEQVQokX1RQarCMBCdGaXWqvfwDLpyI+gFvIfeQnDlLbyAeACLBxAXdi0IXUSFlpY0mb+YkJ9f4b9FGF7mvcybICICgD+NMfAXRMTMUqOAiHzfYrGYzWbz+TzLssvlstvtvNKbIjNvNpvxeDyZTOq6bprGGENEiBjHcZ7np9Npu926blHfbreyLK218AVETJJktVpdr1dE7MoLh8OhqqrhcFiWJTMnSVJVVdM0o9GoKIooip7P528mANjv94/HAwDSNE3TVBillDDn81k6EbErGxBXKcTIWutrzwCAW5m1thXAC1o8facMR/XbbAtCttXRYkicmDn88jCMr11oGVEplec5ALxeL7lWSn0+HwB4v99haPfTx+OxKIp+v1/XNTPHcay11loL0+v11uv1/X53a10ul1mWGWP8YCGYudPpTKdTJ5BXBoOB1rqVLwwWRZEL8235D4joB1rD3NJ+rOl5AAAAAElFTkSuQmCC'
            },{
                name: 'Spyse',
                url: ' https://spyse.com/target/ip/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAnNCSVQICFXsRgQAAAACYktHRAAAqo0jMgAAAOFJREFUKJF10DEvA2Ecx/HPaVND1REkFnJnsDQGk7WJN2CoSRi9A7tB4m14C2I1SmxiskhONDQxkGoIDckZtL1ene/0PP98n39+vyeIkiD2L2kSxOngUrZqWsmnNx1PwykoObBtdvjySjMv7NrXduhOYM68L/LCOk6cFaSYyI4fhTH7wj22rAlVx4R+iwWnFvujnlvHLvMCVU2Riil1K7oaOnkho+zcsj0X4yEHfHtA7W+LjBq6w32gYdOjtmdlG+peXeeF2M7IhhtH3vMtKmaEQpN6XiSj/xC1gqWiHL+krR+7ADD5urP8OQAAAABJRU5ErkJggg=='
            },{
                name: '百度云观测',
                url: ' http://ce.baidu.com/index/getRelatedSites?site_address=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAhpJREFUOI2dk81LVGEUxn/ve++dOxe7M+MMgWIOEVo2FSG20SiJiog2EUTrslkWQUT+A5EQtLJFUYtAaNWiFtFGQqgM/CYTlcL8yDF0xmmuzofO3LdFQzpaYj2rs3iec36H876CLnW+tZIndSITLCi2JU3AqLISbTFaaB1XcfWfujWm4rJOZILbm7tZB2QmqP8NeyqreP99hXzBpcLWObXT2OQpKND/FL452Mf9CcBbBR4LUmkwJSPHfOy3tRLvpgZ3Bx/xci5J/4ko9YFyAFaBy73LRDqXmDjjZ7e15pfrwwvpCfpjd3jVeOF3GMAAntYvs3ByGLLdKJVfIxDFIqdgZrGXiBWn1l9TQrWY+cJ0sptsfoHJ5Btej49wpeEtUgSQuoAhp8CQA3kFZWJ5w1IK26ziUMVFAvY1zta9IGQ18PzjJTyaifRIwcOZHD4NakOHcVZgNtW3roFAl16EMJl0fpArQENVlKlkF1KAlAIGHJfO+Sx+ay9Hd0XpGDjCbKq/hGM44VJm2IS88GG6nXCgGVeB6PicVnvKDZp6HJpDBvW2l0j6Bt/iD7DNX2EnB4YEISCTB58J15tiPPsaRM+50BjUmTzu5938KqbmsiPUzuma2zhLPeTyK4jisRQKj25ysPIcEgNXZdC14hnCliQcNtdBV4NdvfGZlEgTIEeVldjStYU+uVZCb4txVcDjff/4nceUlbg3R8tPFQz1VtE1gGoAAAAASUVORK5CYII='
            },{
                name: 'DNSSCAN 子域名与域名反查',
                url: 'https://www.dnsscan.cn/dns.html',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAUGSURBVEhLdZVbTFt1HMfPNsfKpRRK75TNBxMTo0tM5rP64pu+aHwz88XEF5do3KNZjImJcYNeoO25VvA2o4uw9tzPKbs6YCPCxki3ABuQ09NzTgtDx1hZL/7+UAZs+KU0XM7/w/f3/f1+f7Dc/6ig5x8aVskorujGg1z+sVl8bBSW84YOv9O0zWee0bMsTdOKen7NKl6eyZ4YYV+9wNjZkGOo53W1/81rv/0yPb5iWit5c0/cbpamrRmFqwszxzL9mBB2cnGXSHhkyiUl3XyyTSAwMRJgIz9Oj1etB8jgbu1gaVrJXCKmRw5wPQ4R90q0VyJ9Eu6TiIDEBETah74lnHIC48PvX/vjX6uYr5+sa5u1ahTo2yMY2+MWaa9MBAWibZjs4mmnClDKKxGA9spApA9zRAMfe+fK2ZJVrB/eUJ0FSV9fmMXSp31Cv0vp98uET8bBi1diXBLZxkd9fF+bincKtEthPArlkvsPspFTk5lHRiG3FV2dBW16WWFaJdwl036RciukTybAUUCg7YOhb2fG9ErNMXjapVJ+kfHIYJAEm81D4ay2YObq0SEWNO783FRDOuqWKb9E+mXIhQqKcWA18vH3Rs/VarW5lRVM6nYqZJdAIWsyeYQn96uJ4yPpVcPaZkFSH4+mHELCJ1PQNS8iwgt3CsRLIgkg0NiSsY87ExTpLoEAU36JgUzBmoPtWy8sbbOgwBap14OipQIyBaagRqdMNQ2F5tfWatUavC7pCwe5kFsegPg9Ch6QKJeKw/MNbHR0NmvpqKUY1LpqFjEx7FFQ16HGjd6T+1IhfvEeOFqvVOD998UslvquhUs4BBxChNQ6VNwnMjY+ztwdW9aNOmspbzbwUT8aBeQoIFLN56Mnp64AolwpVRGqNmEZJ6YvfDYpHR8ZQmlINPgKCEwzFw9l/3qgm/UaH5nFfUJvkGc6RQKm0ab0vXsV5V2Gj/VytVKplqHObb3ARmCSPUociDYe7797o+4LPh+bhQaxzyWDbbQxranIWX0OzgDgCbxXy+UqAAFahh++fe3XFjEREBmXmugU6UOpBJedgPHc8mUUPhgZbEK7QvhF0iPTHVz0xT/DhwfDH40OwvlytfykVoIvvrp16SAbcsmQA/rDPpG2cb2lnX0s6kZ69uah81GvhFoTFH6AiXcqtJ1LfDjBIoMbjs6Z9zC2+wiX9CEW1a4yNin26Ti3a75AsFlHMz81q7hfxN0K41Yop0q1cYlPpjNAgWrnS2u29JlOHiH8sOEZPMjTGBe6ry0aO+ceBAWPzs9hXDc84ZbhVkh0CYn2dN/JO5cRq1Y7yiWb5ASMu0eBWYUWJZvT0c8nJbijNgmgOgv2Eyb2izF2v9jrlpMQXLuasKdj389PAAjSbORiG3uKw+pAWE0y8VqGeWhaO2+xLVYOGV0vLB+7OmDnYh7AiZRdJI7fkL75+9IBLtyhogEOCqQTEhDpViF8S7u/2b6n2maBoPJVs3AMhRrvUJgjPNWoxFuEGGwfzB2sROsw45QIO9sztjCzsjGfO7WLBQLcQ7Pw1vBAUyrmyMC4keiSUQiXAuPCODmyPdVzc2Hun7wJ/xnqZ7b0LAuEcFbxy3HVNhQ+NEy6JWDhHVKykY29cXFgVtdgyp8HgfZggVB2VpHLTr4iEI3piI2NOrjI17cvVqzlpzff89qbtakl3VgtLg3emfh56vqioa/m6zO5t3K5/wBOMSKhntiOsgAAAABJRU5ErkJggg=='
            },{
                name: 'RapidDNS',
                url: 'https://rapiddns.io/subdomain/%s#result',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAACXBIWXMAABJ0AAASdAHeZh94AAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAaaSURBVEiJtVZLjx5XEa269/bt7ttff4+Z8TyMPXEgCokh2QSxQCQrBAtWSEj8ApaIdRas+A1s2SEk/gA7JCQWQUIoJkaCSBYhspgZ2zPfs7vvq6pYfOOxQzzmIVG7bumec+tU1a2DVVNrbZrSLpaLtp2yKBEAAEYAABBhlsm4Dn1PLEPwAMDEQszCzAwAsj1wTeiybKrCnF9cEEkIoR05ApU5CZJBVGgKo6Lva9dW9ajvg0JEBaIAANTlHQQRryUYNW3KEUCIGAD8MHzjvW+/+953bt48BoGmrnd2dm/cOHBNvd7MlTLMSJSVQkQAuUR/CQe241nfzcuqHPqACFopZUpXj5hTYa1r2xhj3w/Ht+/s7h9yTo/OPlXK/u2TB0IEzETEzMy8pXlBBilFEamrMsakFKJSmRMRE7ExegghhADAOZP33Z/v/WF+fj5yzTe/9d3V8mKzXADgFvq6SmgQAYDGOSLSWhfGAAIga210WTWurapaKYOSVosng/fMktKwPD85uvXaen2RYhQBEVFKXUOwLdRWL8SccyJSStWj6WQyK4xerpZlaSiFvu9FAMFkCgCyXK5Gk6kfvFAm4uvKcElgjEFUKUUAKIrKlM3u3r7RijLHkJqmXm82GrEq9diWax9QwfHxa81sdzSZUApHh7fn8/MXZnCZF1EW4cIYrVVVNaUtKabNerNarRAR0VSlG1L42U9/cvqbH9/enx0cHE/G0/2dQ478ypff/tJbX/vhj95//c2vXpsBM1RVVRRFVbXK6kKXewdHiBCGoXT1ar0UTij0q1//7sFjf9bV73z93Q8++O39D3/fr1fTyS6guriYHx7eufuVtxrnTk4eXhF8RrX9/cPIkoKvXAvWNsY8OjsTxMaVRkHXb5RWwma6M805SNbed123srYorRVQbjT+4qtvfP97Pxj65S9++fP79z96lgEAKKVCGCiRLkzdznZ29gREKYxhEI7EZIxmytqo5EPf91VZMuJ4sgeCAiKchm499IsY+77f3L17908f3UspPSMQEWZuxxMsyunujXYytbbo1guibAtMMSECs6TgU0o5BQAw2tq6rpyL/QAoIuK9/+vHf7n34R9j8svV2nt/SXDZYaia8c54NBlNpt16PqosIwKn7GMIHoBySkScM5W2zDm1k92yKp88OlVIqA0qZYtyb2/H1hPfL88ePXnWRU+btRCEHH23Xri2IeEYY4yJmLQxLACAOYPWRcpJaWXLcnlxbhRkJj/4zXqzWMwfP3n8zpu3W2c/00WIqBTWbSsogGirKiTvRiMjuFjMlZJN17FATrztDNe0O7s3vO8EsohQ5hQDAIhADMmn+PYbr3/84FMB0Vqr7RBqrWvXSgqgMMSgiCARgCznFyJkrWHi0agZt+O6dovlRc7ZuYYz55xyTiAsIlobQGka11bl48U6xKirqso5A4C1ljkBsuQkTEIxBprPz2KMANA0TdNUwzCsu06huXl0qyjqGGPfbZi5KIoYk7VlShGR92fTh/846YeQiTRRVkoZY5xzKSWiDJyVMoWpve+69RJAisL2fdd1fduOnWvr2g1D74e+rqvajWIIMaacU1mWMYZX7rx68/btnNPZ4wsAwMKWmVKhDSLmFABRUNpmlnNOyRujq6oSyJv1cOv4zmJ+YWzBWUIc9nZuDD6cnz9hoXbUClMIg2uqnEmhmk1nn/z9IQDooqiZ0/atzkQAUFfO+8F7j0oQFRFRloODw7PTU611XTtmqev69OSkKitEJMpaKe+9Mabv++AzAAjIMAQAUMTe2MIY87SbdIwppYwICrVSOqW8v394fn6utR41o/n5BYKsFksRqeuy7zYKsNt0KWXvo8ICQJWVFbkcAF25EREzUc5ZRIwxKaXt5CEiEe/v75+entZ1jYje+xCCtXa5XBpjVqsVEW13mVJKay3CztXWFqtlt/UcUI93bFkjIiIWRfH8YCPibDZDgIODA+fcbDYDgOl0enk1rZ8OkNJaW2udc3VtR6MG8dn8Gok+Rb+9RUrp6mECQNe4+Xx+dHTUdX2MuSwrbcwWGhGvTNHVNs45IwJzfH49qxCGz+9rAShKI6AOj75Qu1EmMrYARADZanKlzFVs7QUR/wvYi82MtVYb41zNLCmnGIIxJqecczSmjDFsxXm5p7tU8vO/tsUojPHe+77fSrf1AyKXqvxb3Gsz2FYMAIgIALTW29y11sz8X0G/IJ73NttG2pJtP19iQP8j0P8d4uVxBfp/QQf4J3e3KagPw0wGAAAAAElFTkSuQmCC'
            }
        ];

        // 网络空间测绘
        engineList.cyberSearch = [{
                name: 'Zoomeye',
                url: 'https://www.zoomeye.org/searchResult?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAcxJREFUOI1jYBjygBGXhMOav/HfX9zy/f//Pz8jM+tDDjGVhoMhjE8wDHBY/z+G6f8/np/vngv+/f1Lj11c8ezfz2+Tf3989ZyVV2Tnr8+vHrHximj//PAyi11IetGReJECFAMsVv1n+PPwzH92MYUZ7DwimT8/vZ7FJig6dX8A40V028wmXnnAIabUfSiSayqqczf+jzCbcvMsAwMDg+P6/1EMDAwMMkHrk6U8Zn2S8pzzXj72qBcDAwOD7br/DGYTr3zE6mezSVcf2K/7bwXjS3nN/sTAwMCgWvifW9JjxkuYuOXMB5us57/Ih/GZYAw2PrG+X68fVsJN/M/wT6XyPwMrO4M4AwPDX7g6Ufn235/eFGEYcCRBdNLfH1/sbNf9Z2BgYGBgFpBN+3Z+5pv3F2Yd4xDTi4B6L/JgEONxRkam1w7r/0czMKBFo93KH1k/XtwpO5Wvo4DuRccN/3X/fHyX909IKPX/m9czfr15mM6uZsKIkQ5sFr3r//n2cTy7gPi0X5/fXGXjFZP7/fmtO6uAmBQLr9Ccn68eGjKxsF5g5hX+yMTM/gVrQrJf81/65+t7Df/+/FRgZGT8yCGmvOVgGNsCbGqHAQAA436z2xiCGIYAAAAASUVORK5CYII='
            },{
                name: 'Shodan',
                url: 'https://www.shodan.io/search?query=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAtlJREFUOI19kstPE2EUxc/3fTOdTtuB0mpTsQZYaOsDJMb4SEFEQF5RDBL/Ane60o1u/B/cuTXEGMUoNWqCQY2ABhVNeAloEET6gELptNB2ZjozbkRBomd37rn3d5ObS/APPa1qOGq3sKsOp/NgXlXllCw/UjLizTMfn2Q29pGNxgQoAYzHwVMNZWWl3d76kzbe64WeSmF1eBizg0PdCy5Hx4WuLn19hgOAUPCsZMvLl95uK2oZBESe0eIdradtUlUQFp8PRjYLKkkoTiTPpSamOgDc+w14dqS5oMCmPympbam2B/YAjEGJRsF5PLD4fAAAKoqwle8H3z8ACWbdJgCz6tfLGuqqnQ11sAb8oIIV2akvyE5/23QTPZOFJssgoPrGOnUVFbaKfj+sgQCoVQQIgRjwg4oiki9fwczloIYjiD94iEw0hlWThTYCOIuVd4NjoIKwaSNz2BG73YlETy+UWAzaYhwrSXlUtgjTmwBrydWvyuz3Ym1hAbzX+ztYHR5BLhKDujQG+94ApMOHIAEHtoejY72s8W4+iytNgz0Jdt7r02yq0q4nVmDmNWjLy1jqDiH5uh/K4iLc9bXY3tIE54kqSJUHiW1nMZM4rnItMl9RVb7vMbvzY2a0zV6YNxbj1bmRUSb3DSA9PmGkI9FYUfkBh6ftDHEcOwre4wHnckEoKYWpKKDLS7vz8wtxBgCdczP9rW7fw0w6NZXO5IZWlOwNjVhSu4JHagqCQXCuoj+fRymIICAzNQlzdjbNrQdn3/SMAxhf98/rW9sJIQDH8LeoYIGpaqAEAt2S/pKqaqO5SBTq3I8t2drnSSiRKDIGmd+K/6WOPRVhXl65wBu6k1AK3u2GqetIv3uP+P0urM3NpyMGd438CwAAoZrGpl2F9rsFvp1O5nTCUFSo4TCyiaQ6Y7CL53tDnf8FAECotsnvMPXLIs8fN3WDKab5SdHzt5r7XnwAgJ/MRCxzvC/EewAAAABJRU5ErkJggg==',
            },{
                name: 'Fofa',
                url: 'https://fofa.so/result?q=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAmxJREFUOI2lk81LVFEYxn93nLxXGW8yZpK5SMpUtDShiEEhJaz+AEmqnRsRCT9QmbIRjQwJTYrCQgg1pJBWLWwjQomboJQ0F4OMY1nkxygz48y9t5lOC/OWHy2iszuH93nO+7zP80pCiKtAPWDl304E6JSEEN7dwOMTM8qbtxOxAEUn8w1Hfra2G4llO7i7b0jNLL2YOjA8Yk88eMBmT0u1DbwasWedK0/t7htStxFYJSHEwuaturXLriEpjXVVxCvylsqwrtPR+RA9GDAG7riWN98tZsuTM0pIoLQ4a4lXZL4trXK7+ynOm4+obrqLz+enxVmLbEuI/bMTk8DV1aOWXypDkiCs6Vy71cvERw/ehSWWV4MsfFlEkqCpvoqewRc2UwPAij9sjVFk6779yUSF4OXwa4IhjeMZqVxvqNgiJU6WKS4uZHxiRnHkZ2sWgGn3rDU9/RAA60YEIb4DMOX+THN7Lx33nxEIhkySgrxjbDq0wz4tEgVgbXmexKQ03HNfid1jZWXVT4ItHgBJkrBI0m8JORmHI57H/SbJum4QCqxwoeQ0NdUV2//g/eQHLp8vMcwhJqlxkaimR7zeTxs64xUAMnOyMKI/toDDusHo6BiOvI1gmS601VX6H9zrwTAMUlKSkWUZNXEva5rBUkjDF9ZZDKzTdKOd3g6Xb4eNjrxsraz0jL/Z2UqCqjL4/AkZR48AIATMeuZpbHBx9tQJvxAC8Qu7JYmwEShXV48ao8imMx7PHFFNj7TVVfqFEFypabb3d7X5igpytb8u04o/bJ12z5pDTlLjIgACLGPvpmILC3INCQzpf9f5J5i3B5cwqvtqAAAAAElFTkSuQmCC'
            },{
                name: '360网络空间测绘系统',
                url: 'https://quake.360.cn/quake/#/searchResult?searchVal=%s&selectIndex=quake_service',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAkZJREFUOI1tk99LU2EYxz/v2XH5CzRTVJw1XURbxbJSKSJqUglFN0FIF12UCd104U1k13nRRQZBkN34B/SDuiowacPAYlSaLkV0ZtqG80czVpt2ztvFznFn0y888P74Ps/3eb4vr/DIHqwIEW4A2vHP+4gk6lCERlXhd07UDABPPNQNW/nCLBBiJr8s/uPF8qvfZ7BrGppUWcsTCCsbnSvuXqDTg/PvRoELPCv1D/G1zTbhuFwVo9ye5i8m4Xm0iFvhBn79KcwUaqx8x4GKVg+1KQVgDytPXzoGHTd3xSjfZpA0KFehw5FgtnmQ9qoZ0GQ6hqIngR4AkZIc1KJ8KrAhkIBuhAT3aBMA39wfQYfuyQruTHlBVyAviTwXOKvaY1xFQaAbykYyEsZXy7LOulwxWkr7CSyX0LojDqtcU5H4zARrMtJinuW+uRSaS+Lm/qiQURJICs3W3WNNGeUcuIsXCdUHrSLrKtJoP1d1C+g53QBrQs4zimTfpvYliGBregLv62x/Mn6FFCRvR1bg3kQlH5a2IJnQcjxKr/uF/IdX9PmCJFUVRad79zC362MgwTN5BB0YdwY3mZvU0PO3c1h4ZA8h5h7RO3LDFOuonua+a4oi2yZFABaS0L+3YuBucVeLYrxTJ42VAWwCbILeBRc7vxzj8U9YSWXGWV6DhxG4tHQoNl1ccxGyPtNsAfCAvrF2JMrG7BJQU6CisW5X9h/X3p92Jc6/oS2eVcBEiBkvcB3/nI9IwokubVQXhTlVa3xn52cr/z/nywKQ1govmwAAAABJRU5ErkJggg=='
            },{
                name: '知风',
                url: 'https://zhifeng.io/monitor',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAARVJREFUOI3F0L0rhWEYBvDfwaFE4gyyGEiiWDCcUTZlthnM/gejMrEZZfEH2EQG5WM5g8FCTCSSj3x/HIb3PvX2djrZXPX03M/93PfVdV38N3I1/ibRjxes4fWvBNPoRQkfsTiGAuazw3WZ9yyecYFmnCKPB2xgqZaCvpCdxxV+ol/GEwawjyIWqyn4xDKOcYcbtKMHbaHmPEUM6lP1fdwncQoh/R1NWMcjhnCGN2jIekphGF+SIFdT/XLYlCXIhw2YkQRZRgta0YhbdOC6spQOcTTkDWIvyHrwHf+d2AnbW5WldAaXGMc2RiTJb0uy6cYRumJmAptZAjjAVNSlUEMSZBErQbJQzUIWc5L0czjEbo3Zf8Qvo9Q9et52IOoAAAAASUVORK5CYII='
            },{
                name: '灯塔-物联网安全威胁情报搜索引擎',
                url: 'https://www.iotsec.io',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAABHNCSVQICAgIfAhkiAAAAmNJREFUKJFdkb9rE3EYxp/3e/0m1zT0kiBCqDWRy1DIUKlTu7RS0MmhsRRE7CBpEZ3EP0EQBENcHIzF/sAhoHXJ1CFIsRZd/AEdDBg1gaZg01zSmOtdLndfB3Ml7bs+z+fled+HcGoikch4NBp9TUThTqeT3draunnaQ7Ozs6K/vx+cc9i2fXt3d/elEOK/SARd1z/F43FuGMaY4ziQJKnI6vV6bW1tjYaHh8dXV1eXLcvaabfb+Xw+T93FnzOZzKWpqamRQCCQ0XXd2wdAEBEAfAQAIYQNoNOTxtULi4uLBhGB9WadnJz8wTkf5ZxfnZ6eFrZtw+/331VV9XJ3IQNwEtrc3Iw5jtMQQsBxHDDG0Gq13haLxXe9vhNQMBg8T0QKADDGYJrmt1gsljv+GhGEEILZtu0ejFAodI4xBsdx/nLOnw8NDaHZbN53dcuyAKDDFEUJuS8+Ojrymab5VVXVV4yxhf39/VEAlgvt7e31NRqNUl+73Ub3O5ibm+PlcjlYKpXucM4RiUSWBwYG9J74Y0SkMc75z2QymQaAZrN54/DwMBIKhb5PTEzcq9Vq1wqFwoILGYYR9Xg8H5jP53t/cHCQAABN06qqqj6VJOn39vb2s3q9fkaWZc/GxsZIOp2+SERnV1ZWHpIQAjMzM0JRlJTX6y1XKpXHrVZL7vYCv9+PXC5HiUSi4vV6d7LZ7BUCgGQy+aBarT4hIl3TNJ97owsGAoE/kiTp6+vrF457WlpaSoXD4VtCCIexE9VBlmXIsvzLBQCAcGrm5+df1Gq166ZpBgcHB79Eo9FHqVTqTa/nH8ZVBezd0+hdAAAAAElFTkSuQmCC'
            }
        ];


        // 证书透明
        engineList.certificate = [
            {
                name: 'censys',
                url: 'https://censys.io/certificates?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAATlBMVEVHcEzxgD3ygDzyfz3/givxfz3/hS7xfz3ygD3xgD3zgTzyfz3/gTzxgD3zgTzzgTryfz3xgDzxfz3ygD3ygTz1hTfygD3xfz32fzzxgD7HE20dAAAAGXRSTlMA0WG0BdkD5X6uO8kJmSghb43zvkoSVKAZHERevgAAAAFiS0dEAIgFHUgAAACZSURBVBiVXY9XDsQwCETdcYlrHDvc/6KLY622zAeCAT2AsaVDjBgze8t4FwQgF9eucwW0E0lnP6geGqnZgAcpoydDNERbbfbzDDERzzrkKZtFerjKTe7M3qVWVBLqNOwjJVGOP6MJ9msgFDrpSv5+jAiaB5u6K/rsC3vboDVAc5VG+/6M09mtaAzj2JzbArqqy/X1rywlPekLUc4IFNq3gFIAAAAASUVORK5CYII=',
            },{
                name: 'crt.sh',
                url: 'https://crt.sh/?q=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl5JREFUOI1tU0tIVGEU/s5/752XOmmjk1AZmm4qJVtESNiqWkVgIVnWulYSbYI2EQTtMpCKKOgl0sKdRKVEuchNaA9FsxmDwhlHC2fG0Zn7mP+0uN7bPPpW53+c7//Od85PKEGIh1oRTw7kF+JtMqMHAHDJFSK/R+XOViVN3VALT8I8dEh/NzPB6aybxiX5pCkIdLbej1M3ABQTmN9iD3gtay/8Gnx7dsyppLkimKWSq9/+NU4nL7mETtDCw0iMfWRsGIBXReB4+4klOjNSWmIpXAVprG8hkP0WEUxYI3X8ENbP9X7OmlJtrEtVeyqfR+hUtJBAOIGO5oPI521ZqpBW8hwkmrvk/FKfjCYuG2PT15ffTkZqM4/u/ZdAw0Ij5+1aKVT1J1VDULC4C5JtCywJZHIwJyIXw/yso6wEtjjsmCUC3jUA2Irdt1eOwVQgKvXXn2+ybgo2LBjfV04D+FCkAOJfaEUTTWEe7Etg/mwQvoFl6rklDjd82TQIrOtKWQkeIYfJ57EXhoXcy0/9cnR2MG1mbgAA/cpW2z1jaPsaYmUEMTo/q3U036UKL6AIQDI4L0GalgAAmc0FsdkhBWLFyXPnwEENDx2oSOq9uWpPjQJSA1CuBjGz+GPUYGQNkN8DHG07kqKe8SITHaxSz+QqMFm4F+IXO4mnHAvgR348VdYFANs2nj4xpqJ7IVR7IFgCVV62xqfbOWfakmuDsSXqdcldghC/uWO9GrsASxZL+r0G8OZ8VPrg3990JVlwTABQx49hvI+wXDcsZ5oLQUKw1lI/52tquLZIXUX/4y9BOfzLv6DT9AAAAABJRU5ErkJggg=='
            },{
                name: 'certdb',
                url: 'https://https://certdb.com/domain/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAJ1BMVEUAJ1YAlGgA2XMAVV4AtG0Av24ApGoAM1gAdWMAy3EAhGUAaGAAQVpFbL0RAAAAAWJLR0QAiAUdSAAAAGhJREFUGJWNj0sOxDAIQ2swBEjuf95JP1HbRaVhx5Nt2dv257XWnu/oXVXHYgNAVcSkJ0CRdJ/0AurOTDOEnibQ0kSI6heAp4iYL0VzMndFrFBYZgr9EWovyyxiR2jcbXUH+hoT9TXzB1W2An0kfbqSAAAAAElFTkSuQmCC'
            },{
                name: 'FACEBOOK证书透明监控',
                url: 'https://developers.facebook.com/tools/ct/%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAbQtE48bOXX9J8UrGmdeBhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZYOJRdZhUA8w9a48QmVfxAwATIfnUl6gLIAAAAABJRU5ErkJggg==',
            }
        ];
        // 指纹识别
        engineList.fingerprint = [
            {
            name: 'BuiltWith',
            url: 'https://builtwith.com/%s',
            favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqVJREFUOI2dk02IVXUYxn/v/3/OPefc+dDrnet1ZrxdZjTQhdRibGFBFuhAYRRDyWAEBYNYhAtdGBNBJAhG4CJGXJQKLrUM+5zBikiYakJRlKZgcgRHi/FrHOce7znn/7YYbs5GyJ7N+y4efjzvAy9tQ/7mwjveturd5tX8D1lV+S6d5KV0Ivst/sH9/KAAI0KMA4lMc3G/v6Vbmx4M0FiScff43DF35EpvrOWvc88uNFU0ouVN+16Xhq3tY7lVpRP+IxWNCgBewySWDIAMZvZlR9u1OboiswB4N7WaTdE3vTXtyK7qBo2pJKeTN4Ch+QQCfo98unQkEgRICG/11S4sftffm3/B/nFzKBvQO5QkIkOoAbP1MR2saoAnef7SmErtC7ej/kvcizZuItQbLNJZlrtpiiS0iYiCguKZJjnj42PCJ+xuLBCzJruk/Qj4K+WQWSST9d/dczhCU+Q6gGbqoYjkmcpu69qEBHNte/2zlte9DbZTRkyZU+E62TVzIH21td9sNYuZ8B+Wj1sHzaDtks9zj9pRv9sMl4+HPV5ZTpl7FcLyc+GT7V8GG1doU6U45L/crU3VZUdzz3Rdix5rfsV+0Plj8FTpQO7FhzRP4X1/oENbGvXNK7/JTmuNYrje7I6/d2/nN9m35k5keyTPhO2QnyRgLrmgr3UM+61TvcntZd+EYrmzIIMQA5kEEqMgIfPTYzad1KdtQc7jkL8H0sNkcHVjrLbkfWVYKMVm01oCSC9pJ4A6LI5InfoAUa/3CYBXkePZDe35F2ALTADUx9x2BO6Oup0Atk3GceT9FeZXBGrD6fMI2LJcRPFtA9B5JjhY+1Z7TIuMlz4M+uNRV7VL5Gzpo6CvdjItBmu9Y6bECIYZTfgzWm9Ouut6+f5f8h/1D5UcAogegK/kAAAAAElFTkSuQmCC'
            },{
                name: 'ipfinder',
                url: 'https://ipfinder.io/widget/?get=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAATlBMVEUyQVdATmSHzulCUWYyQVcxQFhSvucyRFgyQVdCUWZOuuGHz+pDUWYyQVc2RVowQFZdveKHzekyQVkzQlhDUWeHzulPweo8SmBmx+ptyOotDYoaAAAAE3RSTlPAhPf2qJmcWfnDp4SysHc5WoBCyuvTuwAAAAFiS0dEAIgFHUgAAABoSURBVBiVVctJEoAgDETRqCjigFMwcv+Lajos5G9S/apC50paH3HIkx8vjRyONDUI1yBcw7cr0P0H7A82t2pNXJCnrUdxH9BeXiRMt5ZnA2GDnAqwQU4F2OBJBdhAN4ANsBU6FIYWHS/7Iw2szQ/4XwAAAABJRU5ErkJggg=='
            },{
                name: 'What CMS',
                url: 'https://whatcms.org/?s=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAftJREFUOI2lk81rE0EYxn8z2XRL9bBJgzaQ4Ff8AEUPKSIikWiRWjyp/UMKHnrJzUMPuXn0EOqlvdSbCPUjnjwU/KDaYpsGCglNk7SptKY2u9mMh103WURFHJg5vDzPj+edmVcAkJ2fA5FGEEIp/riEAMUOqDwPbt0TZOfn6Ou/i9Xir+ZeSFAH8+CpBJH+JzM4WqsFiLT0Yls27Ft+4XfL2b1r33K0SoEgJH+acyPnUJkxaJqu0GRvcpTKxM0upGmiMmM8vnHWg0gAApLpzxsAXI4ZYHcwQgMc1iRDh3QY6AO7w5WYAUBuaQMCjtU9BW9KOwCMn4qAaTN5Pspao0nlW4vMhShYNvcTEQDelr6CFD0AN8X7coPrJx3AyOkjfCht87G0zeiZo2DapE5EeFdugNa1+QCvi3WG44Ng2iRjYZ4Vajwv1Lh6PAIHbYbjg+SLdS++HyAFT1ZrCOBOMgbA9GqdR1+qANxOxhFAbqXmxf8F8KmySxt4eC3BSn0PFGDaFBtNplIJTKVY3tz9DQBAkyysb3EpavByrQoBAZrkVaHKxSGDhfUtX/8AmvO3lQeYWSwT7teYXd70ep1dqpA6FmZmsewHCIEg+6LhGyK7A+0OBAPdqB33p2qye4HuUElQeYK6U3BfA13z9YkUTq3XHNQBlXdU/zHOPwAx0M5qW9H+QQAAAABJRU5ErkJggg=='
            }
        ];

        //漏洞库
        engineList.exploit = [
            {
                name: 'CVE Name',
                url: 'http://cve.mitre.org/cgi-bin/cvename.cgi?name=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACN0lEQVQokZVRTUwTYRCd+fYrSyoIRVoBaSlETVraBqMRsiQelIMmXpCbCPEiBy8evBoTvfkTPYIhXIyReMJEg1wrElAMkIgQSQX6S2ihpfZ3t7s7HrbaeJN3mEnezJvMzEMigsOAHaobALiRiHTSVU1HExcAjSmk6xoRITIgAgJCEARuCHQ18UkJvNDAvNd867jjHBMYAZTWny9tlbqOBYB0jWhFvdF7oY8DgJbdii48nVqg1mbtbPuzED10dpwGraQlP69+M9W17xFAdF9NNSbLK6mRd6/mzErVqUK6ulZvq4v+tDtPUmYjtvtLre/fb+nM5nKsHntcLkTkRHoosDzzMXjv/s1CsTA9NTbQ15Z2n6/Jb6zvcE+XV5J6EBHLhwEnUmOJzODQ8NjoKOd8eOCiRfAHQyEXX82qNRK+3vZ/OOq5Y7XZ/ryVgKFgsdSLoliUi0ca3U4b395cp/R3RdH17OaXpbV4PF55KzLeZDU/eDJ+fWhQKanjEy99txtY0r/DkgdVl+fyDtEJLSda/wqQiIprj2ZWxOAucJPpmmSKh5cbWHAtLFR33pUkCQgEzhljFadZ05Vu29feMw3uprgSm/4R4421kCyIXpgoLY7IiyPv376RZbnitMniUWq7HQeTOUGbnLdeutq/GX6czmMkGgPARFpPiHlVVUVRLK8EAHJJnp+dDYbCHp/P6/FEItFU6gCIMtkMAHZ0tNvtdkSsCACAiDRNEwTBKBi8ERHRIP8R/Cd+A23CD2FPe0a0AAAAAElFTkSuQmCC'
            },{
                name: 'CVE Keyword',
                url: 'https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACN0lEQVQokZVRTUwTYRCd+fYrSyoIRVoBaSlETVraBqMRsiQelIMmXpCbCPEiBy8evBoTvfkTPYIhXIyReMJEg1wrElAMkIgQSQX6S2ihpfZ3t7s7HrbaeJN3mEnezJvMzEMigsOAHaobALiRiHTSVU1HExcAjSmk6xoRITIgAgJCEARuCHQ18UkJvNDAvNd867jjHBMYAZTWny9tlbqOBYB0jWhFvdF7oY8DgJbdii48nVqg1mbtbPuzED10dpwGraQlP69+M9W17xFAdF9NNSbLK6mRd6/mzErVqUK6ulZvq4v+tDtPUmYjtvtLre/fb+nM5nKsHntcLkTkRHoosDzzMXjv/s1CsTA9NTbQ15Z2n6/Jb6zvcE+XV5J6EBHLhwEnUmOJzODQ8NjoKOd8eOCiRfAHQyEXX82qNRK+3vZ/OOq5Y7XZ/ryVgKFgsdSLoliUi0ca3U4b395cp/R3RdH17OaXpbV4PF55KzLeZDU/eDJ+fWhQKanjEy99txtY0r/DkgdVl+fyDtEJLSda/wqQiIprj2ZWxOAucJPpmmSKh5cbWHAtLFR33pUkCQgEzhljFadZ05Vu29feMw3uprgSm/4R4421kCyIXpgoLY7IiyPv376RZbnitMniUWq7HQeTOUGbnLdeutq/GX6czmMkGgPARFpPiHlVVUVRLK8EAHJJnp+dDYbCHp/P6/FEItFU6gCIMtkMAHZ0tNvtdkSsCACAiDRNEwTBKBi8ERHRIP8R/Cd+A23CD2FPe0a0AAAAAElFTkSuQmCC'
            },{
                name: 'Exploit-DB',
                url: 'https://www.exploit-db.com/search?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqBJREFUOI2Nk1toVFcYhb995pLYKB1Frbf2oTQgLdUXLyiWQAWpWKS1LdGpl1KLPlpfSkHwQX1Qi6Qg1KJE2r6oVVQCRaHQtNGoManCNNGajIJ4i1PMnJMZT3JmztnLhzp6bBH8YT/stfnX/vnXWkZgDOiv+cyqe5WPnYSZGHo6PfM0bbxAGYEBMKAa2P8hR+x5jDfIGeehfpnbYG48l0Gx3g3qASAHWT9/ZUjxstaTtO+5NAPZut/vrkbX16bLoWypYqUbQ77d1XrYHm2/GBarso+pOuOdDkA+29BWn6w2lW7Ca99cbxgcLIxdsn4zv7Z3mHQ6bVzXTfx27k9zZxQLLJS0pza9AyCF48KKpb6pmeTkGWzf20rjtMlc7O4m19vLP4UCCqt47rAzHCGkT2t7S4Iwpi7DKLw0732KpTL3Sz5TMuNIOA6SKBQKhKM+YSXg3sQJLJ7z9itdsHH8clJOflX6OInMd1FENZFMEUYRCWOeymQMfhDgln06zncRyghgDEwvtHHcoWo6Zd0dkce3fv+lkUmZlzEISU8XZQwPR0Zwyz7Jiu8IirNg6yK467xxrLInKtUvc6YnP3O/3H2CYKTy9efN3HrgYWMk1SjCytK0YC5+rqv4ZMK4JH1waFrHqQ8y77xXn+u7SstPRyn6AWFkWfTW62z6Yh2p8hC3PplKNIVc4yFmP+OGUasDkhRILaHVbUmqBIHCxw4I3QfX+peg22tQPuvkABhYkVr/r5T6UZK8nrP7+6DlisMfd/ZtOelZbRts3Rn0TmJt7aP8qjE/9MxkKgBt8K57of2aJA1f7vz+7zf5ub851RKLBt2wNJ/FG1g5Pvu/GFSkjyQpiqKv/mtvSSZ+z2fHHowT14KIpMYnoGTip4Y9Qx17ewTXfI0kXmCprgAAAABJRU5ErkJggg==',
            },{
                name: 'Seebug',
                url: 'https://www.seebug.org/search/?keywords=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABmJLR0QA/wD/AP+gvaeTAAAB5klEQVQokX2Rvc/xYBTG20eHhoFKF0/CoDERJhbpQGIksWoiFv+AxE7CwMAiFouPRcSGxdrBKAZhaJSg0iAM9ZWS8w6V+/U+T/Je233O9btzznVwAMA+tFqtptPp8XgEAIPBwDCMy+UiCAIZcATsdrtOp0OSpNvttlgsOp3ufD7PZrPFYsGyrN/vfxMAAACTySSbzYqiCL90v99rtVqr1dKeGABIkpTJZG632283UqPR6PV6b6BcLguC8B+3plwudzgcCEmScBxnGEab8Pl8AkC73dbr9cFgkKIotC7LsjzPE4IgOBwOVH29XolEot1ue73e8Xi83+9lWbbb7bFYzOPxtFotvN/vm0wmFIIsyxzHWa1WRVG63e7fNHE8nU5bLJYvvV6vKApqkCRpNpvr9brNZgsEAqgOAMVicb1eY8vlslKpoM1SqZTmiEajl8slGAx+njUUCr3R7XYLAJvNxmg0aj2apk+n0+PxCIfDCGAYBgMAQRDy+TwAjEajz/+04FVVjcfjWsXn831pHMuypVJJVVWSJBEwHA4xDCMIIhKJaKlwHIeh6efzeS6Xo2kaAU6nczgcFgqFwWCgqmqz2bxcLhj8K57nv7+/EVOtVq/X66fhJwAAoigmk0mGYSiK6na7P7p/AOp0kpo0vk81AAAAAElFTkSuQmCC'
            },{
                name: 'Circl.lu',
                url: 'https://cve.circl.lu/cve/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACTklEQVQokW2SX0hTYRjG3+8757jNVBrNP222lbOEIujGRAqyi8whaFJdOKnoIsPoz230BwKLGZligZOIKC+iIgoho0kQIVoXkqQsSgyZTUW2sx3O2s7Z2c73drHpMnuuPnh+D+/78j0EEWFFKEaUV69TQ8NsZhYYo85tQmOD8WgLtVkhB60o3t0bBgiDWSxxiDanaHOKpVvDgiUMELtyfRUjmQnxy9fU27eItQIohXXC4CJXt3/jBx8AZO0NXTfTjwaNmkak2PoAEGPewQOZZzbwKyKdWIg+6Peq59tpcBaUZI5mTECWunQhm019ncZAYG5+ISb/ZoCYZyjfWVXwZBCfv9DLbMBzNBha7u4cKNrUe8aNkSiR6hvTI8MUzCSfBwAuEZro6ntWUtaeVnZ5+5VJv2Hf3qsdF6sonPRPJu89JJHtuzGRAEIyEzlRmuq88ZhxOuIOu839bUqtrcFpv8NzR02mwFzIg67/50gCAmJAjgUqnNUejzb6RbVZoCAfECl1bPknwxjKPN9gt979/HHPabc6M8fKi4EQQCQmE+Vd9SjFc7Sib7aYeyJLh1vd2tBbvbwSBD7rxVXBdYgaW5pRDeWWAdSNBrPPp5WWQL5pzfdJC4a2VspVOg3t53Axkg2Y+GBwaeJsB7c8v+YsOc43NAk11RQACr33aZUDRTlj8YwNKDq2nYKEurKMAol00cunAKvl01LSkeNhABEg9Obd+I+fi/7vIoBYbA8DRGvrmCxnwFxbEVEb+yQ1HUuNjmX729MnuZqTI+//Zv4A6+lCZjDR4RwAAAAASUVORK5CYII='
            },{
                name: 'Vulners',
                url: 'https://vulners.com/search?query=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAYNJREFUOI21kb9LW2EUhp/zfdcfqRmcokMrHexi3OzoJKQlyZXSf0CQWOLQ4iA4CR0cC6WgiGDbpbO0IAQd3Dq7KAp1ckq6lFJaheTmHAcxJLk3VATf8XznPO97zgf3qHHgR7FYPMvlcpO9mlyP+h5wBjzx3o+nUqmjQqGwfxvAB6AOPL8pmBmqShAEz8IwbOTz+fU4wODFQ6rAEtCX5KSqGBLUgsHXqy+nf3YCBL7NMnpQwK5xnRIRDEElsu3hQ10b+Z6Jr9CEmcdI+AjpBpgZdYOnfX9k6sG5a7fovIFC1OXvnENEEBEUF8vX6xcAfgMrjUZj2cx+ORcLBkDQXahecgF8ARYBKpUKwPuxXLiZTdscwlB7fwtrZQwDbXLiP5FNctMFjsWRxYFsXc+2VjCligMXMGFlTEt8bQ2W2LEyJp4sHoioxRIA6DzvCHgjngEAi/iHYOJJY2BN6igb7jPLiYC2qLviCdtfLaLiPlJM6k/UW6NfFzixV5z+XSTz/4k76gpcD31weUrHMAAAAABJRU5ErkJggg=='
            },{
                name: '0day.today',
                url: 'https://www.0day.today/search?search_request=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAP5JREFUOI1jZICCsMiY/wwkAFklTYbe1mpGFpjm+XNnoyj4+fMnAzs7O15Dfvz69Z8JXTAxOZWBgYEBrhnGR5dnYGBg+PbtOwMTuuT8ubPhirDx0QGGC/ABdG+SbABOEBYZ8//rt+//v377/h+Zjc4Pi4yB46/fvv9PzC77z0LImch8mngBbsDfv38ZGBjwRxs2PtwAZmZmkjWjGMDAgN//DAwMDObWDgzK6roMLV2TGPomz2KQEBVmwAhEXKClaxJDiI8znD9l/iqG+VO7GDFSIj4aXTNcAD3useHKhs7/Z8+c+V/Z0ImSaxmRDcHnBWkFdQYOdjaG9oZyRmRxANU1ofsjsf+KAAAAAElFTkSuQmCC'
            },{
                name: 'SPLOITUS',
                url: 'https://sploitus.com/?query=%s#exploits',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAilBMVEVHcExbWNxbW/dTU+JeWd5ZV9tXV9xZV9tWVdpZWdxYVtrnVQJYVtpPWfFZV9pZVdrkVQLnVgFWVtxYVtpYVtrmVQBYVtlZVtniUw7nVQDnVQFYV9roVwD/ZgD/SQBXVtvnVQBjVMfJVjbnVQGuVVZXVdnoVQBXVdnnVwDoVgBYVtnmVQDoVgCSVYFa9ibTAAAALHRSTlMAMwQIFDlyQPksuPB7GlSTM74hnoWU0dUk5KJeSgUHZ8zyM7HQp2zhctziHtmQ7cMAAAABYktHRACIBR1IAAAAsElEQVQYlU2PWRKCMAxA00KbhlL2TRbBXRTufz0L6OD7yCRvMlkAFo5tnrcd7Dz1NOn7r3JMNU6WsTLOWgsT6eFwGHRkxGKIQRVHdR7Fb2BkhWBwrOPLJa67JQcmeg7nq9bXM/DeGkbSR3ma55PETBJBElD4UiuPkAJjZ/hpoUqlClWkvlj2cvQ8ryxtQL4ddpO+zDIb0q8IERuiBjHchJ3rouuiCZL9O9cC/3D4dsMH5+0K1/EzytkAAAAASUVORK5CYII='
            },{
                name: '威努特-工控系统漏洞库',
                url: 'http://ivd.winicssec.com/index.php/Home/Search/search.html?keyword=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAB10lEQVQokZWSz2+LcRzH39+u9NDGEhIHmSFxabjvQmLigkQkDjU9kjKcCH8AjliEEAfJmD6d7ND1qaddt0yFVsw2Pzb643myeJ6nCbqOhjzPZtb17dChvSz6On0O79cn+eTzFiTRDI6m0g1CeexVbdDv9a5msI7i1Wtm6BFXZUWYBEYBkr9ULRuUJoHkn12Fx8p9YOzM2QahHOofB77Gh0g+BFLAFFAIBkmO7OmUgB+G8U/4Pv2+YttZQD0emHuWGgVeHj6iAdPwLJVKCpA65q+lf340YOl65sJFkp9PdH8A8l3+JPApkZgNdOcA7dTpJ4D15u03VX3X00MSScAcGCC5pBsGkAGmAJKLubwJqED23Pn4jp22rpuyTNJRBWZ7+wA4t7Q7ADewbTACYE1bm+3z513u+Upl18iwduv25v0HADg2BE6WFXlYiEKon9GoiMgzSiwuRNTjXnvo4O4XzynEgmlu3NsJZ8vKH3RJGt/qTQDp9u36gz4zHLYyuWJ4cMLXNeE7amva60uXq5Zdu1uQXP5SFE7nvBJraV1XvHHHfppYBjZF5ArEQsGckYL70um/jxb15bNiQ5wrVV2uxUy+ePOu5/qV9R0drV5vfTMahObK95/8Bu1UQLc0bMhWAAAAAElFTkSuQmCC'
            },{
                name: '青莲云-物联网安全漏洞库',
                url: 'https://iotvd.qinglianyun.com/Front/Leak/index',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAspJREFUOI2lk19olXUYxz/P7/2zs3N0kROWTVqb4xwnE8NSJFtENCqPQpGaimThpaKYF6YUXgRzqFR33YVYQhdT0G0lzAslysFG/p/uTF26nU2mFPN4dvae9z2/p4tjyy686oHn6uH7feB5vh/hiWrobDvuiDSC1IpINarlgYAqeVEdKaG3b63Zl/5HIwAKpLraC+I6MbUK+rifLAFEEGPQkqUQFj8dee+Lrw1Aqrv9EcbENCqBtTPiTDRNJpwqGyhgFY1KAFR6/lcApr6z7Yi4bgJrsSiZsIA+Fvet+Ijbb+2YMclEAYGWF4gxLOg8cNa4Io2UyuKsMWTe3MZQVABVjo1coOPOBVBLppjjzCtrWfbMPAK1qLUY4UUXmK+qjFlLIchxfjzD769+QsdwP7uXrKIYFanx4mBL+MalY+IG+LNIqkHE1Lkgc0dtxN6ahbz+XJJj2StsGT5PrnUns0/uBxsytupzvrnaw4/j1+l5eSODk/fYfrePpPEwIiSmooD1C1/jUm6CdbXN/NKc5tDFn/C9BC/E5vDOb9+zNdXCh/OaGMhN8EFTC0QBAG75wpba2dXsGDgNIgy/u4dvB04zXxxcES4/HCdWEefja92gsCG1cua7RpU8YvhrOg/xZ8GNkQ8KLPYThCgK4HhUOg4YHwQ8x/3XAPQBjkf/2CDHm1ohCugZvcbBRa2MBA8ZigJONK+mLzsINuTwgjf4489xMA6IYIDRpFvB+1dO0fJ8E0cXr2HX1RPEvQp+XrYJbJG5lVWke7/jy4aVbH/pbZb2HqXRqwTVrNR3th3xfX9LKQy5GU3x6/LNLKqpp+tWP1WOT0tdM/fzk1THq8hO3mdJ7w/UKcRcjygKzwlAsrv9EWISai1D0TTYCBy/nN9SCFKmCePQ4MRwjSknM71HXIDB9GezUl3tBeM6saSJ/xcmp+KpMM3Q+H9w/huJS0TyXBcdGQAAAABJRU5ErkJggg=='
            },{
                name: '工控系统行业漏洞',
                url: 'https://ics.cnvd.org.cn/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACoUlEQVQokT3LW2sTQRiA4W9mdvbUzW5206TBaCpaa42WCiIeQEG9UAT1l/ifvPNKRPBCPIAIFQQVBVtt0TZt2ua83U32vDszXnh4r98Hcc7hfzyFogvRNwi+QrgHgEFfAPsWaAtA9D8L+gc4ZB1w3/HeKp+GXF+AmaMgmwgBEjFQG5fPYaMJiEgIIeAM4jWx/4wNN3PS9Mt3+tkRntlFJh+4ScMMZy3FyWWjSBHVJRBCxFtw8JTtvE/k877zwNNaaYanMfMjHiOxm8HgUFRzNg+86oAkigDGb+DXcyYWp/U7kblMAWwqDJUEca5RlqY8CHkUo5zjtIgwhD/h4JXY302sq5nVMnVcKZEkLWZLhCAWJQUShSbxPM/aB5P1todh8B5631hRHvOGapQrJRolRXcct3vBoR/dWC7VLMJY7k2iKE7KhoRh8BncIaJ1JOkYgyRhVSZ2SaqVlaLIP20MP653KwZqzRt1R5EwSDDag2nak+xUqBpjfpAM3PBwEjUcemmpLAA154w4zb9s9IqCV0wqQQpbk4ZGXZIHBCNdpXOOzrnww0yVyerXjl1S0ywHzlw//LE9wGCeVZMi6Pcn+9s77b3+ODRn5GpZ9SZxxVKtGblZN4Mo3e26/iTAIDAs3neoZkaj6q+XtPPZ96ZRkqkKSdPs+/bAm4ZbnVF36Lt+UDXpyglHguYVpXWv5j2Gzqplzo4tu4/OAFU45xvt4dae2x9ONEU6aYnLx7WlY5aEqCJuPRReBF9eltbeooTvn7470o7opn3U1kKPsFE0R9G1prE0b1BZRkIIAGD+WLx4hN49QX4fGots5ea0vtTLFZ2iWjok3gCdWiGti0Q3/gIAEEKwnU22+gI+vIb+ruAMLAeOLYrLt+mF66RSQwgBwG/wR3FJKWyfpAAAAABJRU5ErkJggg=='
            },{
                name: 'WPScan Vulnerability Database',
                url: 'https://wpvulndb.com/search?text=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAXdQTFRF////6/r1oefQpejS7vv29v36t+3bXdauMsyZM8yZYdewvO7d9/37/P79zfPmcty5OM2cLsuXN82bOs6cd9270vTo/f7+/v/+3vfviuLFQtCgYNiwsObUreXTXNeuMsyYL8uXRNCikOPH4vjw/v//8fz4guDBMcyYTdOmounRydbSqKWmqaeoy9rVnOfOStKkNc2aiuLE9fz68v34lN7LcNG63/fv/v7+qqqq6enp1NTUqKen2vbtbM+4m+HO9P35+fv9tNHhQYyzKH6pkLvT6vP3oqGhu7u7j4+OtLOyirjQJXynR5C1utXj+/z98ff5d63IDm2eAGKWEm+ffpqpi5CTsbS2tbm7ncDSN4evA2aZAGKXEW+fgLLM9fn7+vz9vdfkSJG2KXyncIybPoSmVpu+Upi7CmudCGqcUZa5w9rn+/3+8vf6osfaQY2zBGaZAGOXAmaZNYaupsnb9Pj74+70HHakH3mlh7fP5/H10+Tt1ubu/v7/euxYhwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAACqSURBVBjTY2DADhiZmFmQuKxs7BycXNw8UC4vH7+AoICQoLCIqBiQKy4hKSXIKS0jKyevoKikrMKgqsaprqGppa2jq6evbmBoxMBgbGJqZm5haWXNYGNrZ8/A4ODo5Ozi6ubu4enq5e3j68fgHxAYFBwSGhYeERkVHRMbx8AQn5CYlJySmpYelJGZlQ22Nyc3L7+goLCouATustLYsvKKSmSni1VV1zCQCwAnDiAsSgY2ywAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMC0wMVQxODoyMzowNyswMDowMLnF3U8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTAtMDFUMTg6MjM6MDcrMDA6MDDImGXzAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjcuOC05IDIwMTQtMDUtMTIgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3IbtAAAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQAMTkyDwByhQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxOTLTrCEIAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1Mzg0MTgxODey2Dz3AAAAD3RFWHRUaHVtYjo6U2l6ZQAwQkKUoj7sAAAAVnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vbW50bG9nL2Zhdmljb25zLzIwMTgtMTAtMDEvODE1NDM4YTYzYzdjNGQwY2E3NjRkYTMzYTUzNmM4MzcuaWNvLnBuZ+5KCDAAAAAASUVORK5CYII='
            }
        ];


        // 在线工具
        engineList.tool = [{
                name: 'CyberChef',
                url: 'https://gchq.github.io/CyberChef/',
                favicon: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEA8AAAEAIAAkBAAAFgAAACgAAAAQAAAAHgAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATExMAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHBwP5CQkE+Ojo5OiIiIS4aGhkt8fHxLe3t7S4GBgU6Hh4dWZWVlMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaWlrvS0tL/0dHR/9HR0f/Pz8/+qamp/6ysrP+srKz/rKys/3h4eJIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKioqix8fH/8bGxv/Gxsb/xcXF/pqamv+cnJz/nJyc/5ycnP9paWl/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLCwyOjo6P/m5ub/5ubm/+Xl5f7Ly8v/zc3N/83Nzf/Ozs7/lZWVowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALGxscfn5+f/5ubm/+bm5v/k5OT+ysrK/8zMzP/MzMz/zc3N/5KSkqIAAAAAYWFhDwAAAAAEBAQA////AAAAAACqqqrI5+fn/+bm5v/m5ub/5OTk/srKyv/MzMz/zMzM/83Nzf+wsLDcnp6eo6urq8pjY2MbAAAAAAAAAACVlZWm4uLi/+bm5v/m5ub/5ubm/+Tk5P7Kysr/zMzM/8zMzP/MzMz/zMzM/8zMzP+8vLz7bGxsLQAAAACioqJ+6Ojo/+bm5v7l5eX/5ubm/+bm5v/l5eX+ysrK/8zMzP/MzMz/zMzM/8zMzP/MzMz/t7e33Y2NjVxFRUULx8fHwubm5v/m5ub/5ubm/+bm5v/m5ub+5eXl/8rKyv7MzMz/zMzM/8zMzP/MzMz/zMzM/svLy//Hx8f/WlpaDcnJycnm5ub/5ubm/+bm5v/m5ub/5ubm/+Xl5f7Kysr/zMzM/8zMzP/MzMz/zMzM/8zMzP/Dw8P3oKCgxQAAAAG1tbWZ5+fn/+Xl5f7m5ub/5ubm/+bm5v/k5OT+ysrK/8zMzP/MzMz/y8vL/szMzP/Nzc3/tbW15UNDQxgAAAAAAAAAD76+vuLo6Oj/5ubm/+bm5v/m5ub/5OTk/srKyv/MzMz/zMzM/8zMzP/BwcH9tra2+L29vflpaWkuR0dHAAAAAAAAAAAAiYmJZKurq4uXl5d909PT7eXl5f/MzMz/x8fH/6qqqty9vb3/g4ODlQAAABFra2tAAAAAAAAAAAAbGxsAAAAAAAAAAAAAAAAAAAAAAG9vbyOTk5N5j4+PnHl5eVZCQkIVkpKSJmNjYxEAAAAAAAAAAAAAAAD//wAA//8AAOAHAADgDwAA4AcAAOAHAADgAQAAwAEAAMABAACAAAAAgAAAAIABAADAAQAA9AcAAP9/AAA='
            },{
                name: 'Regex101',
                url: 'https://regex101.com/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABBElEQVR4AWNwrd5NEqJYg3PVLudKEHKp2kVYg0ftntSJx/NmnMqdfjKu9wiQ64JHg0vV7pC2AxfvvTt0+eWOs09P3ny9/MB934Z9Lng0hLUfPHfnbcrEY241u+N7j1y8/65s7lmnyl34NJy98zah76hDxU6gnsNXXtYvuYBPQ2j7wUv337Wvupw/89SUzTeAGiI7DwHFcWtoO3jzycf9l14cvPzizrNPQLc5A8OKoB+SJxzzb9oH1NOx6rJzJREakiYcc6zYWT7v7Pm7b6O6DgPF8QTrwaNXXwE9DXSJe+2e9ccezdl5m0DExfce9a7fC9Ef1HIAqNmthlDSQLYT09O0T60AJsuZztN6g5cAAAAASUVORK5CYII='
            },{
                name: 'Diffchecker',
                url: 'https://www.diffchecker.com/diff',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAhxJREFUOI2Fk01LlFEYhq/nnPdrXme0XAQWZIGR9AP6BYFtItIc+8A+qE206z9UK3dtskUZTkaIVgRBuJZ+ghImFWoYOVP5Mb5fT4txZNQpn9U5z3nOde77hiNsVXvp/Jn24MADIxxFCUQQhShTXUyzdHq+v3SHJiUACpx6d1trO9AoRVURxyBGUIUsSeO1qHp3YeDlk0aAATg0dPZFZe47lU9LlD8vvZ258FRme5/J+q/y4Wp1c0TjFCPiFsKW4c5Xl+/tAaQb0clotUq8sUnl28JE/fDr4OTS/MXRGytRpQcFTTIC1x/aA7DWBta1WNfByRdyu33+uPT6Q5yl42IEMYau8cGpHQA39MXJ+Tg5HxP6zbLiYd9IPwKaKdbY0zsBhcDxCgFea4DbFjQFFBGyJF0FxXhOQRsBfmtovEIOrxAS5MOmAABBYhBUlROT128BOABijBUjYA0Y809AY6kSbytQsPr/ebbmPFBEhLnekefbABEM+xCOl3o7jWtbQEijZKXerylQdfZ73Qb5x2SKWCHVZLrer2WgxNSt+2Zt9+WOsf4rjuP0qCqaaTzXN3puh4IM/ShGEBGi+fI1rfnl4KOeYudo8U1bkC+hta/yJ14baIRLfdE9eVON7/BzZgHNFDdwcVtzuKGH9T2yJC1X1n8Xl69OTDUCtr0vLs92dRzpHtY0OUZGqJlj0yhdxcaLUZa8/1Icu98sm7/v/NFq4GrO+gAAAABJRU5ErkJggg=='
            }
        ];


        // 企业信息
        engineList.companyInformation = [
            {
                name: '天眼查',
                url: 'https://www.tianyancha.com/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAjdJREFUOI1l099r1nUUB/DX57tnm/p9iNwm2IoINwqnIkvQTGGU/QAhUryKhRQk4h8gIv4AJZQpGkhQXYhdeNFFV0E3QpMoECFB8mYhokJsiOKU5/s13Z7n+XTxebbHuQMHPgfOOe9z3p/zDjHGU2VZ7o8xmrPODjoyspDiRjN5vTmfIoQgz/PToSiKmOe55+23W1z+hyv3iIEP+/l4LW/3L0hTlqXK88h3phk4T3Maga1v8OUapgOXbpN381Zvu0GMUajVarFarZq4z+qzWEZWYccqiv+4dAfNlmPfBr75lO6MoiiEolaLebUqHEeWkNPiLa+ztI/3+vj3CX/fZNcwP4+mBpXOCuevpkTdreImZjn5PiNvsvnV9ti3HjI4htEUZ50ZY9fQ2UZeVeX3PXx9neGVC4kb6OHo9nachYybU63xG2zs5cIuRr7jwGqWdFhkx0a4+zh9cza/b0xTnNvJyA/p3dO3uBhmI5//QneFLEb0ouTKbt75EUsTmfXIX5M8a7SLr03RNca7LyfMSqPJ4SGKGcYnMNPmoy/nzDjrX+fgn4lYTxPJHw2l66zM1Nm7hcmSTd9iWQsq8krOT9dZ18/EXi5e5cY0Q8vZNkBRkDUjr71E7UkLYZ5ebk+yc5hD42m1weWMruHE9gVpybYNcPEzFK1GHXx1mSMfoM6jR3zxK4MrFhK6SEwPnvL9Hxy5gSnOfkLZoKeLfVvah0oSU3hRzlmgq5LkHAKz9VTUlN5z0puT8/+cHs0LGOaBYAAAAABJRU5ErkJggg=='
            },{
                name: '启信宝',
                url: 'https://www.qixin.com/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABmJLR0QA/wD/AP+gvaeTAAACNUlEQVQokXWSXUhTYRjH/8/7nnPc/MiiOWWoqNmmE4xA0JIiL60Lu6mLMqjwQrwM6jroziiIugmKkuzDi6IyiyKRQumDTK3EmODSctqcWnPCdnb2Pl1sJ0fQ//b5/Xg+3peYGX9jzSI+jPXniE1CWcirQn4LHC3Qa0B6GiFmhrWMXzcQf5ZYGl0Mrb15L+IJFBfx9AztaVIVlfoWTy3y9qGwA446YmZELmDh9LUe+faD+D5P9XWqbX+qyMWPnsqpgDBNbK/izuOpkppWlD/RAEDGP47RiyHReTJ1/Zbs6rAqfQwTZ/xWIobgrLh3X74bpbZaE4AGACTiJnm38d7dqZ67koBXg/JBvzR0JoKUME04cwEmWwAIUAwzCTAUw7WV/T6lafYtLJS4GYwNITtCIBym8c/CyBwGZhLlpVwv/iOwQkEBl3pY00AAgKSFzZuQ3SH7LQCACEKAaKOn4gyVXtqhSbYsuywx94PGPlF+XkaOraPMQ82a0xaM2uJiXlmltRgpBgGRZfLX8ImjVjIJIdB9SS8sZDj9tpDTVFZR5nYtvB4RvmoG4HRibEIsRXQpkDDxO4qGnQq5B9LjMzPz6sXgY3Gk0Ri8IvkLoiOYfkjBfnp5Wbb6cgbOS54/mAZtgVMcOjTeK9qbjKuntG8DtDhI/d3y2C6j76zGAS+bc2mONn4rxxHuCk3c7O3TpgKkFNwutB+2djQ3wHMbRrWN/ZPoHZ5pXBnO/znkUF+9vHKOVSy7/gcdVB9/3RJYvQAAAABJRU5ErkJggg=='
            },{
                name: '爱企查',
                url: 'https://aiqicha.baidu.com/s?q=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABU0lEQVQokZWSzyvDcRzGXx+W0mrlIuIyZdlpuDhQ/oUlRI4OlOTq6uLALorawUGR3+VHzjKTo+2wIiy0kRxsK+Xnvo/L5jum1Z7Tp+d5XofPu8dIohxVlNUGHMVW+IKbJxBNtXR5SwKRO9qDkIFKyMIbuIhM0OouKCmvs1sxIv+CEumck0ipLyD6dXb105INMCn/vCTpetXab7Z23bpcljQ4K8dwERA6F6NKpKX4WnYT3R8rGbKW0eXKQ1r0KBz9DSweijFJyh549HCSC5NH2nJJYkBLBzkvf1aBZT/zMhgD8GmnuSt56uCV+wwN3inrpMt0hkE67TbGCfCFz1N0JcbVH5AkxdetvUZrp17bLi2hWFAFsoFIXPRqaEaPmYI8FtQcen/+MUzhliLXdEzzmYJq+MJpeNmAjxRVNfa3iscXjhJPgoXPQ1vL32n8A5RW2Wv9Bp9qJ5YEvYSKAAAAAElFTkSuQmCC'
            },{
                name: '公安部备案查询',
                url: 'http://www.beian.gov.cn/portal/recordQuery',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAnxQTFRFAAAA6LZC560z4Jke4Zkc3IsU46Yy46Uq7cdV3Zsf4aId6LI25KEl46ow4qIh5aYo67c65Ks+3Jsb7b5E6bo53KEh8Mte56JJ3qQp6bIk3aIp7sJB9d122pMb99xe1o0Y8tRj9+R13Ywz3JkX99lW3Jcf9tpU4Zsu3oQg9cBe/PuexCAM9TYU2wsH9TUU0BcQ2wsF8Dcr9kEpzxwV5CYU3RsQ6hEI7R8P6hkN8hcI7jYZ5TQo9VVI3JkV3pwa4qEf3JMb5qso560w3pgY2kkN3A4D0yQD5A0B3BME3WIW5aon4Jka3CMJ3gMB0xMCyGUR6H0r5hMH6AYB3TkN6LIr3qAY3T8QyxcC4lQT3AYC3FMU1TYH4wgC10wL6BQG2VYX7b0635EY1wcD1BQE2R0F2hYD5QoC4hMC4hEE3iYG6QcC1hED67043aMj4HcW2AAA3AEA3wMB2F4Q4xkG1zgH5DgM6gQA6gYB4gcB3pom2psT3V0O3AAA4QAB4gEB4wwE6AMB6AoC6QYB7AQA7QUB7gUB35Y089BJ36ko4n0W4gAB4wABzRsF4psb4pcZ5Zwd6ZYi8BME8AYB5wkC6sBW5K8p3zgG4TUE1WsP4Z0b5KUh5qkj6bAs8G4e8k0X4l4m89Ve5r493aAV3IgJ4YoT5JMk5Zcj6pwn7KQy7qUz7LQ98tFU89hn338S634n8BoF4Q0D4VYQ61AO9BUD6ScK6p0z8n8t4hME63k15qEq14gW46Ia5asj7Jwp6rI68F4Y8w8C4QkC3w0D7hoI7CwI6UAI7D8N8TIM8iMG7RcI7SUW3jQG2W4J11IL4Jgg5Y4i73kj87c74zga////s5nyPAAAAD10Uk5TAAhepMTEnk4CRuLSMF789EAw/OwQqIIO9tg++AZWGkz4DBD4tqhOKvzIAqZYrnyK/PRiTIB0qJCaolyKNGDaTGsAAAABYktHRNOX354mAAAACXBIWXMAAABIAAAASABGyWs+AAABA0lEQVQY02NgAAJGJmYWVjZ2DgYo4OSytbN3cHTi5oHwefmcXVzd3D08vfgFQHxBIW8fXz//gMCg4BBhEaCAaGhYeERkVHRMbFx8ghgDg7hEYlJySmpaekZmVnaOJAODVG5efkFhUXFJaVl5RaW0DINsVXVNbV19Q2NTc0trW7scg3xHZ1d3T29f/4SJkyZPUVBkUFKeOm36jJmzZs+ZO2/+AhWgLaoLFy1esnTZ8hUrV61eowYUUNdYu279ho2bNm/Zuk1TC+Qy7e07du7avWfvvv0HdMBO1z146PCRo8eOnzh5Sg8soG9w+szZc+cvXLxkaATxnbGJqZm5haWVtQ2QAwDY4FaMm8tm8gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wNy0yOVQwNjoxMDoyMSswODowMAt8NCYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDctMjlUMDY6MTA6MjErMDg6MDB6IYyaAAAAAElFTkSuQmCC'
            },{
                name: '工信部备案查询',
                url: 'https://beian.miit.gov.cn/#/Integrated/index',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFRDAzMDFGQTRERjExRTdBOERFRDM3QzM0QkNFNDU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFRDAzMDIwQTRERjExRTdBOERFRDM3QzM0QkNFNDU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REVEMDMwMURBNERGMTFFN0E4REVEMzdDMzRCQ0U0NTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVEMDMwMUVBNERGMTFFN0E4REVEMzdDMzRCQ0U0NTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7byXusAAAK8ElEQVR42uRXeXAUVRr/Xl/TMz2ZyUyOCWESAiEGSLiWhAQEJRARCYiCgKvFobUrWNaulFrK7rKo5a7ueq2iBV5AsARFDtldQZc7SCALgYQjEMhBIPfJTJLunr7e29eTLVdZ9m//2J7qmp6erv6+9zu+73uIEAI/5cHAT3z85AlwPfs/+/4HoR8XcgLf3w99rAx8+jiweCewusaTkr1T1TNlM8X8GWXStHv2GO2tYFkWKFs3bMRVFydCxrBz1rO/WUFcTlkMhcBZUQOWbgGOjwUpMwsQwwKLMOzu9ECF7IGAy4LRowYDd3tcKDAsB1b3DTD6QmD23Awan769n/SqbKS+vNfMSJrgGDSkFpd+N9s6tf9xbAGgiy3ZMSdPrQF3jIzjYsEy9ABWNEBCoP3796LbIHDrDcTRW5g4QFH8NJFWoeEacLpCsGAhJtXfyUhxNWzV+alM7KB6osgJ4oT8T4gZ8Vm6lsZo2KFnpgCuu5Rj7Nj4hdWnis4FS1ehtIxdLMYUYMuG+ZYECP5BdATWza4UdefmD4zmKznozul/YvNmvg+xQrMjFHqB8DQLpSsIFQcWR47vWcU6JQDT6mMdUgcXzDxu4XDQUMIdaN/Od0lLUzqY9O/y40+z987ZJWsmVCoeuNTHgMD/IAEBO4CSCYRnAUkuiBz7arleeWI2K1AmLpz6JZuWUW2eujCNvVZRRHqasgAPSJehcOKbUeGATQG+eobSxjzNJqaXsSkZJXzaHUfU40dWOKdO+/CUzJHtN1yQEBcPOlFB+AEMKHJgL1C4wWqrAyY5jqJk+uT1L1YzwdRSPivvW3xs++9JuCvI0MUyPBPlEdEsiDkQnNDfURANug56D+s2g/TZjNyv+dyC4sbcZSXvNzl9l6+3STPSvJ0WWO1ul8eMEUwYkZkMHLHTpwolsgpINQGlem+KS1feT65WzTX3b3wHkYiT8TL2I3TVGJCdfIy/AyWPOoq9iSepYhrB5cFGqC+ZbWu4S2+oLmL6ZQlXnZ5jyf3xXaMeLPFwzngnwz/8zuHGR5wCdAyL6y0pGOn7ZJzAnkXapZOgHT9apO4sXsUHk2vFufd/QXrDiermV7ZzTio8Bw1OozD2Mp1OlZny6FpIGfopcIkdZn8XiD0tgPwB0GQMrBAD4POOVLe/tdWsqRqPFQB+3vKnWwqXrKv3ZMGJut6HX9t79XOgehAFLvLsnOG/YEDuFdS9W181G64U6uePrcTNnUO13RveYzkLIX5g5SwNjgLBRmb+b2fwOXPeBIQ7CChAUkaDlTAEiKEDoifhKTXB4GWu4IFXkW05W2yNtVNGhmshVHsVQha/2+cWO0DgIGJicdORhjVcf1s3bznd9ZTYMfzEgm1mTXkB7m4PcBR2ZFNOYSei1M/NXrXIDI4oU5EFjs46MLypEkqbopqeRGyF24Dpbqeep6bq6gImout2KSF2ndVMLdKqQnKGD9JMPjViWh4q1qiATIw5BpwuWVy4/EHXwiUrhOHZJ/Dl4wsYMerI6GmLC+XP/ZDLHFt2PTAC2hODwBrqOIZl0h1YIw5TodqIAHYjQD4/sMGhYNVXLIsqnOqFG593QB2ZAa7UABysavmjqhMxaiETw/TMuH2M0NwGILgAT5z5kRXuVnCfIiEa2S7LCFPoY+P62Lw5Gzo8AWhNTAfcXDcGCdJ9wojJVZzRTaDhJGClJ2pl3NcD5t6Pf2edPzzfdokjc/R3Sv7crTdS82HL6dDqA9WhRSBQTg0C8V5n26JJwTc4s71lgnHu6kxCzYPMUDDaE2wbUX8R20+S91yko6vuQnAIe6HZGDO6ZMsaS3JcNDuuWwIn0lVSiHgKWWvDROv03hfw+dPzGXpLmHDn5+Gfv/Tk10KG8LcjbWv3netaDTxVs2ZAik+of3JW1qN9rvgmTv5221aoqc0UJ/+slBmSesXC/y4uZODbofeGw9dOwe6MFcO9mpofH2p2G5er11h9YQ8O3HGFdF4PsJ1fFpJrF6eQXpqLx3tDm/LwixfynyjeISfn7CxrX9/Q2p8b5ZPCnj3Yc+S5aUnLJL+3sYNwwCGeU+2YuC/M4e7OSLSw0MDIsrOg10KCxI2bRy808TtdmtWdu3xd3FfPZ/JnD60CfGigwbCgWPFph7XC2dsqUwv/up/P9u2vE4vL6lsfsRSDtzn380zHrDFJ63KHxL3hdVl6v0FrDnUJ55m9+DE562IBx/BuYDCxubNrk50xYghoPd3ZbpZPXOiDS+UKchQmrvzVE8vyVmc0npIdPc0kEshQ2/ypVqOY5ixVYvLOdOJv2rvkHJC7owgOixMujAt4i9P9zOdZg3ytnX2YWtAEizrBDsPxg1MqHamBSs7pp/X8fJ6OmFfA5oFmjW0ftnfEo5N7lmb7B7/5XDB30RtN7OZfRyYWk+R8lUs0FWyYghHS4qFfBdA1mr0JyW6mIT1ROpwpMXuGBVz7h4isFgi1AGcicNKq5qX2iNg9gfoUyacPAunsBrX0yELexcfq5QdXWNcvT2AlRIsQipZfxp903b3ipZzG9Mldf5cyaVcjWV39MElRjNFtYd3p57Ca4UJdJKJd8cUwV9K9Uk2/jBWmpwOGyy0wKZaBeE1xYJoIlTptkrbLBoYDpFwuA3nTBy/L24rXCqPSq6X5S1+SP/7DVoY3WIa3k6CPUqy44eMOivMeW9AWl9J7QhwMPb5hYIg+KO+SITNGgEmJIlRfa6PNSYN0SwepqRbS6y9AAolARIk8hEeknuMSE2rANH88D/C9IVu5rTYhxsW6EdqEa2O5yYXbrEPfLCEeiihlA1Ek9OrKQlN572hCwfyn5sfFn1Rry6GHkyA31Aw8nQs8lK1U0MEPIrjdsaD3dQMbbk/uOXn0L2zmyLqYqfm7sEH9SdgfD0CR0yW0iGC+5+N330JamOV8SWf5WTO/1jev22FWVUxFdoWz+z/VBKHaQIJgsCMm7BCSMvdxMd4zutnZwuiaYqoKIWkZEqeJyUS1spQrFTPM8tOLnVNn7JGeWv0EtZYVXc2tE5h8+Bi1Aw9GdzMwVhc1vgcMTb4D1dZOMipLZ+iVx5cw1C6I0mELMzoLGANDCRFFnXFI3QixN2nRsocuP+7tTbDCGm/TJtxVuNF5z7z1zvE5Z4mq3nYoRPKRkujEaoRaATkx8P4ACr/z6meR0pKHXPcU/RFZukM/V/o49N1MsoPa3o0Gt9+FB067U9v2jSZGr9lAco1QMGuDXl+fZ1y9epdv7ZtjGLfURSzrv4dS0S9ELxy+IG2ntJtZFo97QklY1gT5q90vOxYveB29/NZY7h+HHrCaaoqslmtjQQknE03n7RnTnhVoKdZQvL+F9Q2qQGPHf8l7EiP9xR9+YLR3J0XnwqqKIum+wi0DKNySACOwP5qZCYP0mGUrHiS843UsSTpbVPQauONCTGr2P/X2tklCTsFHENE1zDv7QbsZoroYzvI8bR2CB+uYlwrv306brOBsbFpnHTz4uJST97Yja9R2W8jgEG4zlpP/bEvs6mfDhESh13n39JWaJIGARXC0RkALh4ap3xxabrjpk7xD9z6z9m7X5Nyy8JZNf+7btf15ohJgB8W1OkZmP8P6PLpz+r2vMUNHreMEkKO13W4ut9mH3n5rhnF0yqFqBEv0g+aLA2vI0EpXft4m4kmoc9993yfusTllkV46c+XdtZ44Yxv5oUMrxMkz37aSh2GDtm5LVuw9hkyi1vvfG2D0f787/pcAAwAwtTs7N8++1QAAAABJRU5ErkJggg=='
            },{
                name:'opencorporates',
                url:'https://opencorporates.com/companies?jurisdiction_code=&q=%s&utf8=%E2%9C%93',
                favicon:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAe1BMVEVHcEyfHjInKyyfHjOfHjSfHzSeHDEnKyycFy2fHjOdGzApLS6dGC6dGS+aESahGjGeGzAqLi8qLi8jKCkqLS8fIyUpLS6aFiqhGikmKiycFSunGjQhJiYmKiomKSsgJiadGS6hGi+yEi4mLCynITcsMDGiIDUeLzCsIjk6OMHTAAAAJHRSTlMA0cfm+/LCv4DautKKk0qkrPz4jOlS23Ixs2kdZHmrL5kxfqep38XFAAAAkElEQVQYlW2O5w7DIAyEDwJhZVRZ3RtI3v8JixtFjZT6xxl/Pp8AtnW2efF93BVvU6sn+5CiAlS4tWFA4ctEpcQ79EAXYCK5a/8ah9QvPaIhUPl8VHNkZKTPH8gEaenrsZvBzp+SpiQXrotlD+s10ASueEMeZlhFq6Nz6s/HV3VYDzKDnjSMWECZUi2gi83dB85uB3ImFqoRAAAAAElFTkSuQmCC'
            }
        ];



        // 源代码
        engineList.code = [
            {
                name: 'GitHub',
                url: 'https://github.com/search?utf8=✓&q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVR4nM1Xz2sTQRT+dpNScqhJW7ZJ9mx706RJ0/SHbRHR/8Cz9ORBBBEUEfwjBJVePHhQFPUiIi09SNqkSbtJU70p6dH+IOChQmpNss9Ddqezu7NJmgT0LQPZN/O+75s3bzI7wD826QxjPURUawtUktrGbWfggK7rR3bnxWjc8v51p+AIlGVZBkAdC9B1nQXbCZuZXYwsy648bh1yvV6vA8D9Bw+xvLLSNrlFSPFUiMfjEXKJnJ5arVYDgMj4REfEdvtSzAMAvF6vg8/hqFWrBACRWKIn5EzEttYQ0ddn4bS8VE3yHs3cIaKYR6VSOfD7/WHTJ3P9YSJykCuKgp1tDTvGDNoxt/FEBJ/PF+J9LAMnJycEAFFb6s9CbDc7Fo/X398vAYDX8A+ACJH4pBOFmm7jpiaMtOHJAPD7+PiIiBqdthaJJUBEHbVmeKqqjjEBLMhQzbdifrNjAcX8phCTiLBbKn1jS0BEGJ9IOrJlkndlgngeUwbQ11AsylhnM+fbtpZzxTUF+BrpFzw9ECDCXrhyjQlgSyAq2a7TDyC1tu7AHvT7LQKO+ZT0WsCdu/ccvvdvX1uWoEq6LlyC8cQUSNe7a6LH6DMFgIhQyGUE+6W7QoxNzjTFtAhwK8RYcqYj8pu3botnbxR3YGjoPBMwODx8jhWi0fLZNPsdT84inpxti/jxk2eIJ2ehaQXh7PPZtDn7XYA7jH6WywQA8alLrFgKuTSm5y7jT7VqKaJCLi0sOD7WzczYIUWRWAYMh0oAVpc/WgA31j87QIR/ry2pgXwuDeLIgdPTEAD2iQgBbo8CjfrQsutWAS7bs9m2fffmJYgINxYXr/N+xydZ+fCQACAxPcd8dgFuxsfYzcRQgkH3TzLDPOWDgxoATMzMOzpfvXiOsdFRIYlo/OqnDxgMBBrkoZCDT7Y7ANSVUMhDRNAyKWiZlOUk+bG377oD7KeOlkmxJRWRuwkAAH0kHJbM4traWMPWxhoAYGF+rmURmuMJwNOlpUcj4fCZLya8DRzu7TmuZu1YUFVbXs3cMsDbr6CqSkFV9X4vlbJuszfbhWj0qjFeakX+X9hfKwNpwLLdyLQAAAAASUVORK5CYII=',
            },{
                name: 'GitHub Code Search',
                url: 'https://cs.github.com/?scopeName=All+repos&scope=&q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVR4nM1Xz2sTQRT+dpNScqhJW7ZJ9mx706RJ0/SHbRHR/8Cz9ORBBBEUEfwjBJVePHhQFPUiIi09SNqkSbtJU70p6dH+IOChQmpNss9Ddqezu7NJmgT0LQPZN/O+75s3bzI7wD826QxjPURUawtUktrGbWfggK7rR3bnxWjc8v51p+AIlGVZBkAdC9B1nQXbCZuZXYwsy648bh1yvV6vA8D9Bw+xvLLSNrlFSPFUiMfjEXKJnJ5arVYDgMj4REfEdvtSzAMAvF6vg8/hqFWrBACRWKIn5EzEttYQ0ddn4bS8VE3yHs3cIaKYR6VSOfD7/WHTJ3P9YSJykCuKgp1tDTvGDNoxt/FEBJ/PF+J9LAMnJycEAFFb6s9CbDc7Fo/X398vAYDX8A+ACJH4pBOFmm7jpiaMtOHJAPD7+PiIiBqdthaJJUBEHbVmeKqqjjEBLMhQzbdifrNjAcX8phCTiLBbKn1jS0BEGJ9IOrJlkndlgngeUwbQ11AsylhnM+fbtpZzxTUF+BrpFzw9ECDCXrhyjQlgSyAq2a7TDyC1tu7AHvT7LQKO+ZT0WsCdu/ccvvdvX1uWoEq6LlyC8cQUSNe7a6LH6DMFgIhQyGUE+6W7QoxNzjTFtAhwK8RYcqYj8pu3botnbxR3YGjoPBMwODx8jhWi0fLZNPsdT84inpxti/jxk2eIJ2ehaQXh7PPZtDn7XYA7jH6WywQA8alLrFgKuTSm5y7jT7VqKaJCLi0sOD7WzczYIUWRWAYMh0oAVpc/WgA31j87QIR/ry2pgXwuDeLIgdPTEAD2iQgBbo8CjfrQsutWAS7bs9m2fffmJYgINxYXr/N+xydZ+fCQACAxPcd8dgFuxsfYzcRQgkH3TzLDPOWDgxoATMzMOzpfvXiOsdFRIYlo/OqnDxgMBBrkoZCDT7Y7ANSVUMhDRNAyKWiZlOUk+bG377oD7KeOlkmxJRWRuwkAAH0kHJbM4traWMPWxhoAYGF+rmURmuMJwNOlpUcj4fCZLya8DRzu7TmuZu1YUFVbXs3cMsDbr6CqSkFV9X4vlbJuszfbhWj0qjFeakX+X9hfKwNpwLLdyLQAAAAASUVORK5CYII=',
            },{
                name:'码云',
                url:'https://search.gitee.com/?q=%s',
                favicon:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAYRJREFUOI2lkztLY1EUhb+dc+M0EiLROHBBLYYIM1am8Sek0F8gA6JYiSJajWAl+G+sYmE1nWAVrMxDSUhMcMRGLMTck5NtYQzmXp/MgtMc1n6tvTaEoPjZB9IHjnStSiqokgoc6doD6QPFz4b5Mhicyzc4mbcYXIhogDiOCeYOhaOFSAIlU77gX8ZxhwIaLtVDDJgmUxEq0wOVz0loEbS5tqn26lrfQwlUyeX7M9dJagm0ub71buAzzkDrJFXxs14bu2MxKDC++weA+8Ip1xvbaGAHVBIRurd3GIaxGNrYHS8Os643szc2CsDN3j7B8d+oyj2eMIID4jDr1XF+VKkYDvipr0tZFMGQoo7zY2+I/WnEJjGt8Kd2OhigLEJFhLIIl4tLkeBJTMuzUDAw9dI432Z+0W20kKEhVBWMkFxdAcBeNhGejGWh0F/jGXxqhY3fy1p6scanlsnlSx8kCFpX2lha1SLoOYm+kQasXKaS6b4hlvSeIcEPvvet/N/HFMFXz/kR7xsz8uPQkQEAAAAASUVORK5CYII='
            },{
                name:'SOURCEFORGE',
                url:'https://sourceforge.net/directory/os:windows/os:mac/os:linux/?q=%s',
                favicon:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAM1BMVEVHcEzmOwDfPwD0eBrzdRT0fB/0ex3zdBPzehz0fB/zdxfxbA7ybQ3uMwD6fyH9gSL0fCDCzO7UAAAADnRSTlMACgidgO/Td773jUdLDxXvmgkAAABjSURBVBiVbY5JDsAgDAPdNmxdnPz/tQUKopsPRDNyIoD/JI0fdvJkUYY7x0PYTd1PHt1U9jQ04+iBXY3bcplQHqFRatHhMjRTQdRUjhSzGmPhCd3kkXluHwkc/Wbc6Le8eeQEbQgEnaKUzVMAAAAASUVORK5CYII='
            },{
                name:'SearchCode',
                url: 'https://searchcode.com/?q=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAjVJREFUOI1tk89LVFEUxz/nvqtvJmlaCEW6CNpICCUMKqWQVtJCiKI2IRhBq0YSF0H9A0Wt+uG4alFILsJo0yLQRiQVHrMQgpYtjGJqIYGTOc+5750WT81xPMtzvud77/1+v1fYr14r/OaiCI8Bo8pdynzgvtRB6zvjelyEKaob3UTVpOc1QEM6UGWIEfm6P8G4gvBKXGUYtwkiIF4y0whUwTaiNjWJMMxt2UWQ12sivKRSbkqAPur5b4FPKB5Cr0ThFVyYEPsH/yrcJCdvhLwiaESlbABIZUq6SYuOCXwvgETQOoA8UaSBX1TWDgOQzkTqYRMCt6m4SnIyvujAcwql9oXl5eUegGw2O9935EufzOaaRMM/uBBsCjWNYrYeCSKo9ad1VCiU2heKxWKPcw7nHEEQnF1YPVXgjqzj+e+RLekMGOJtOT2IWWJlhu2Td1cQBP36YxZVijvixmDw9thq64xNBiKQgKOdWxswiQ+SWGU4Q+sAHR0di3uX29ra5qS1HzGcRqNkx8B/DVQRF16Vp8r5ls+9nZ2di9ZarLV0dXXND3a3nOOZHsOFg6iCmBgHwoQicaSE62zZ+FMdR3VUYGUGLImNgOT1HWH5MqqQzoQak9oO0pDAC8JyaidI1p8mZgnwMJxkjWEOgSjfEJpVuUFOpmuiLMIUrnK9LsoAjQceaU7ukddmhNXaKO+uCT0hyiTVjWzNZ0qlP6rjAiO1K/UEAA8UMlwSeIhQVRjDZ45b9fB/+9HnNNWwWLQAAAAASUVORK5CYII='
            },{
                name: 'stackoverflow',
                url: 'https://stackoverflow.com/search?q=%s',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACRklEQVR4nM3XXWjPURzH8dcfUVsekjuhZVa0mI3kIeUhzcMFkvJ0sSgXLpCSkljZhRQXKLlAUliJkodSyhXSPJQ8jF14KuXG04rR/i7Omf2a/2y/bf/9fet0zu90Ht7nez7fc84vk81mFdIGFHR2DOqqQXPthLxMXLz3Jf4DD/Q1wDTcRXkhAIbjJmbgEkb0N8BnbEIWpTiHgfkGGIhJie+L2B/L1ajLN8ARPMDmRN0+XI3lnVidL4BxWIEhOI4zKEIr1uEFMjiFyfkAeI2puB2/N+AeygQ9LI95ES5jVF8DwAcsxAFBfOW4j1V4HqGyKNGJKHsCsBbLEn1/YRdW4hOGoR6HcEPQhAh6sLcAw3EUV9CIbbGO4ObpeCTs/XbcwknhXPgmeKVXAKPxJJbH4zDeRqgyvMJMnI5t5qBBEGkFTvQW4CnmoipO8gNDsUVY3XXMw8aYvqMl9mvKNWBPRfgANRiDPXgvuL0a1/BMUP8iLMa7zgZKA7BEiO+J2tX8UTj5SrBGuIgI23EEs7VvWU7r8j2QsB2YH8vNeIyHgjceCsfweeFG3IoFONbVoGkAfuKLEGbFmBVTm7UIq23AHdTia48ATp2t/1NOHOTVwpaVCidgZcyrMBKDY11lbL9UiIr0ANHaXquZRF2rEP+NuJCoHxtBKmI+RdRD/fi6LKxu2p0cp1sAaexNTJfSdkwDkPb9nnPFHa3gj9I0HujWitJawT2QyfVrFsOwr//ZMjXr/36dFdwD/9JAXva8oxXcAzk10J/2Gw08e05AgXJ5AAAAAElFTkSuQmCC',
            },{
                name:'Pastebin',
                url:'https://pastebin.com/search?q=%s',
                favicon:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAP5JREFUOI1jZICCsMiY/wwkAFklTYbe1mpGFpjm+XNnoyj4+fMnAzs7O15Dfvz69Z8JXTAxOZWBgYEBrhnGR5dnYGBg+PbtOwMTuuT8ubPhirDx0QGGC/ABdG+SbABOEBYZ8//rt+//v377/h+Zjc4Pi4yB46/fvv9PzC77z0LImch8mngBbsDfv38ZGBjwRxs2PtwAZmZmkjWjGMDAgN//DAwMDObWDgzK6roMLV2TGPomz2KQEBVmwAhEXKClaxJDiI8znD9l/iqG+VO7GDFSIj4aXTNcAD3useHKhs7/Z8+c+V/Z0ImSaxmRDcHnBWkFdQYOdjaG9oZyRmRxANU1ofsjsf+KAAAAAElFTkSuQmCC'
            },{
                name:'Github Gist',
                url:'https://gist.github.com/search?utf8=%E2%9C%93&q=%s',
                favicon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVR4nM1Xz2sTQRT+dpNScqhJW7ZJ9mx706RJ0/SHbRHR/8Cz9ORBBBEUEfwjBJVePHhQFPUiIi09SNqkSbtJU70p6dH+IOChQmpNss9Ddqezu7NJmgT0LQPZN/O+75s3bzI7wD826QxjPURUawtUktrGbWfggK7rR3bnxWjc8v51p+AIlGVZBkAdC9B1nQXbCZuZXYwsy648bh1yvV6vA8D9Bw+xvLLSNrlFSPFUiMfjEXKJnJ5arVYDgMj4REfEdvtSzAMAvF6vg8/hqFWrBACRWKIn5EzEttYQ0ddn4bS8VE3yHs3cIaKYR6VSOfD7/WHTJ3P9YSJykCuKgp1tDTvGDNoxt/FEBJ/PF+J9LAMnJycEAFFb6s9CbDc7Fo/X398vAYDX8A+ACJH4pBOFmm7jpiaMtOHJAPD7+PiIiBqdthaJJUBEHbVmeKqqjjEBLMhQzbdifrNjAcX8phCTiLBbKn1jS0BEGJ9IOrJlkndlgngeUwbQ11AsylhnM+fbtpZzxTUF+BrpFzw9ECDCXrhyjQlgSyAq2a7TDyC1tu7AHvT7LQKO+ZT0WsCdu/ccvvdvX1uWoEq6LlyC8cQUSNe7a6LH6DMFgIhQyGUE+6W7QoxNzjTFtAhwK8RYcqYj8pu3botnbxR3YGjoPBMwODx8jhWi0fLZNPsdT84inpxti/jxk2eIJ2ehaQXh7PPZtDn7XYA7jH6WywQA8alLrFgKuTSm5y7jT7VqKaJCLi0sOD7WzczYIUWRWAYMh0oAVpc/WgA31j87QIR/ry2pgXwuDeLIgdPTEAD2iQgBbo8CjfrQsutWAS7bs9m2fffmJYgINxYXr/N+xydZ+fCQACAxPcd8dgFuxsfYzcRQgkH3TzLDPOWDgxoATMzMOzpfvXiOsdFRIYlo/OqnDxgMBBrkoZCDT7Y7ANSVUMhDRNAyKWiZlOUk+bG377oD7KeOlkmxJRWRuwkAAH0kHJbM4traWMPWxhoAYGF+rmURmuMJwNOlpUcj4fCZLya8DRzu7TmuZu1YUFVbXs3cMsDbr6CqSkFV9X4vlbJuszfbhWj0qjFeakX+X9hfKwNpwLLdyLQAAAAASUVORK5CYII='
            }
        ];


        //威胁情报
        engineList.threatExchange=[
            {
                name:'AlienVault',
                url: 'https://otx.alienvault.com/browse/pulses',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACcElEQVQokVWRTUhUcRTFz73//0zMvHQmGa2ZDKad5BBpFFgSfRkRuUqkmoiKojCjbURlmwrSiD5WFZWikKVF3/RlC6eNm8qodpVBLQbGkPG9aV7v/W+LUaOzvNzf4XCOqpwbJ1J/PJ9ZgxUxQwgggEBMShNrZiVEllUWnVOhHdtZt25tU9N6x3YAACiPlGutAbiuO5mfLB3DVvj58xdDQ6+1Uyg0Nq5sP9jmeV7pb3T0w/CbjCK1ds3qmpoaEfF9X2tdKBQePX6iCRAjAIwx+Xx+7779dwYGIAIBKd6ze9flSxcBaK3FCAFaAGICEAwG2w8dvt1/Kz6/umQBwrWrV2Kx2JnTpwAQkwBc8gbw/v3o4ODdRPUCb1rGmHnx6p6e3i9fv2I6yD9gZGRkPJfN5XKe5xETMbmuO/5r/OeP72/fvgPgGx+AxrQEONFx0vP83r6+iYkJEamqrNpxOF0s/nZdFwARTQHEDCCRSKRStSsaGrZtbd2wcdNsy3r27OnCZPLly1eseAZgAAwCUF+35MaN7mw2m0qlmps3t7RsWZhMfvs21n/7Tn1dPQBmngJKLSUSidraRanFS44d7xgb+/7x0+cjR44uXbZ81arGaDQykxykgmc7u0TEdV0RaW3dCqAiVhWtiAE4cKBNRIrFooic7ewiFfw3nOd5Sqmr167YjvP40UMA6R07L1w473m+7/ulWv8bLhAIMHN5WdmD+/eu3+wOzZqVTm+fzhGYGU6HQ6FM5k0oFLJtm5nFCCuORCK243R2nRMjxGSMsSxreDgTDoWocm7csR3bsZlYphYRMT4AUgogAAQYMVbYClvhv3m2GnWjwwnhAAAAAElFTkSuQmCC'
            },{
                name: '微步在线',
                url: 'https://x.threatbook.cn/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACBElEQVQokY2SS0iUURSAv3P/xzjjjCZUChEhlmQPKTHaRLXIKKJaZUSLICQojBbSJmjbJlpEL4gIXEQvEIpeWBvDjSH2ILWmLCKIHovS+Z3xf9z/tphxRqFFZ3E4B8537uXeT7bempYYpY1oVGyUptiqGCnlcouKjQ0Ab33zIwBtNliy0KIcviY7ZSQyS2zqXQFs4LVvRjtTDRkF9I0Epwf9RgegELGuXj3qSQOfvkVdl7z6KhSwypFjj2eKK3evdw822VMR2pCHMwfSQK5g9l70FiUFUICjGPHiZ+Mh4Ah72tyVtfKhYG4fqrYtgBPXcsvTglACgCZXOp77fgSwrE51trvVjixeYAFXHua/ThqnNDgLCGx05MJAAchUSRxxriPR3esNvQ+vDoe1buUZVLnKWJwcj7LfNbC91R3MRjtWO4fv5hvTAv8C/jMqQE5ztsVubrCA/jfBpmb7yWh4fV/qs2fmAqWPMzAUmoEtSSA3Y5RNT7//4njGsTjS7vS9DOvs+SdMBObp5kTCBvjyO74zHEyH5ucfDRzdlVpaK2E8Bwhj2tJqW4tTrO+PBO8mzYqk7O+djjTA+a7MR89gZoGx0FzeWVVc8OBVcGMiqrGxhBScuukBmaTc607/KhhAiraO5eO58pVtDcN58lVsXZOQtTYqRmmYvS6QsGitEaVRMWiAv1g13mump/9wAAAAAElFTkSuQmCC'
            },{
                name: 'X-Force',
                url: 'https://exchange.xforce.ibmcloud.com/search/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAiZJREFUOI2Nks1PU0EUxc9M3/QDKjTQQq0NuBMNEWtTFxIWpVBdmegGNbr0bzAkXWk0LowrExO3mhjigoULiRVK8Cs0abGYNHGj0UJLoQLSp+175c11oWihz4a7vHPOb869Mwz/KVv3seEOv+8hCGx9OX9NK2ZnzHTMrNkdiLwRQpwmIoAI3KJA17W3xYXpwaYA90D4kU2IK4wxEBEY51hKTjFvYCQprNaQlAY0XX9cyiSuNgB8wdEit1i6SMp/dM5Ryn0dqhayrx29J8+73J33FWH1GTW9lE/FPQDA68K015sBgKSEp6f3lffEyLvKl/RkIRU/9EMt3wUgTBJEK4zBvms+xqDXthM2my1M0oCmaU/WFmcv12s4mhXjWH0/PVzKF84ZUi7bHS2XfMGo6jo6GNsfgCS8gch8JbfwrJCK+1VVvQNGotXpvLkjUZr6iaAI6yl/6Axpuj6xlklc3ADGPcfDE/tK8PsZnzNpyJzd7hjzBaNqW9/Q+NpiYqwRQLQJZvqvkE/He9SyeguA0u5qu+0NROYbADVje5btAZCU8IfOknsg/HQjOxfLp17YtUp1ypDy09+U9YaDwdFvFs47iOjPKYNhGB+FsB6RRq2i/tTufc/Oxeo9u3ZQSMU7pZTqThLGOFbSL/u2tso3iBhvbbFf33up6dDeQOSDIqz9AEHX9MnVzMwF0+UAsJg11ZXPD+iARxWK6Ldwfpg5u6ra+lLSTPsLsoTnSPc4thgAAAAASUVORK5CYII='
            },{
                name: 'Riskiq',
                url: 'https://community.riskiq.com/search/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAdZJREFUOI19kz9oE1Ecxz/vxV6MpskgOFmXXBUEB8HBoXZWEBcX/6RpItTJwVVwFiFD1VFqL7mIYFEnFcHJZtDJQS3Su3cpIqIOgqZaLyl3zyExl9jrfaff+74v3+/3B+9BEhrKx/YeJElELLuwOoMhr2Nk9tH1A+A5JfNUYtgAdfUBW70d4RbdKrb6huXcjG9QV0207iDlQfywyKXJl7HmNfUYwVFgDWgxa1YklrvEruwUUuxlpjCBIapDbZosqqsAWO5tBD6z5n6yuWkE5aiB7bUpFXLUnHvk91yg/eMV6ADDmGKz+wWtPYQ4DOQpmYKaeoJGUTGv7Ogv8h2A8oEiUByqvEzZnI7Ozq3+5CNYB+gZaC1jd5ZibDBb6gQw3gvUghAZGWyH3bljNLxPiLBBKC5jpMeBi8OSfyuEsQa/f76n051j7tBrFpyPBBuF/k0AOoiEtvK5s3pyi0FNLcca19031NV9AInlPiKTTZNOVbcIJcexvaURbk3nyOaPkEqd60kqk2fY+PUCaNHwPnPXOTsQa+0RhF+jZPWMZusd6+2HdDevxbbDdlew3ZURznLm+095/n/5Np/JPc+YuMHOzASdPyGIp5QKp+MTk9BQPrab+J3/AlVirIzEzHGpAAAAAElFTkSuQmCC'
            },{
                name: 'MalwareBazaar Database',
                url: 'https://bazaar.abuse.ch/browse/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABZElEQVQokWNkcItmIAWwYAoxMTIqSIgyMDA8ePH63///6LKYGjxN9e8u6Lu7oM/ZUBuLcZhCqV6OUIanI2ENUsKC3mYG//7///f/v7+VsbggPwENSe72LMzMBy9dP3T5BhsLS7yrLT4NjIyMCW62DAwMS/cdW7rvKAMDQ5qXIyMjI04Nbsa6ypLiP3//Xnvk1OpDp378+q0sKe6gp4lTA8SXm46f+/Dl28ev3zafOAexBLsGcUF+PwsjBgaGuTsPQkTm7TzIwMAQaG0iws+LRUOimx0rC/OTN+/2nLsCEdl19vKjV2/ZWVnjXGzQNTAyMia520NM/fvvH0Tw3///i/YcZmBgSPNygnsdqsHJQEtVWuL///+Ldh9BdvG8nQf//f+vLiNpo62GogHi3X0Xrt19/hJZw/0Xrw9eus6AFP2MkNSqpyjHysL8/N2HZ2/fM6ACKWFBSSGBX3/+XL7/GKGBeAAAbxF+ngKpQJoAAAAASUVORK5CYII='
            },{
                name: 'IntelX.io',
                url: 'https://intelx.io/?s=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACTklEQVQokW2SX0hTYRjG3+8757jNVBrNP222lbOEIujGRAqyi8whaFJdOKnoIsPoz230BwKLGZligZOIKC+iIgoho0kQIVoXkqQsSgyZTUW2sx3O2s7Z2c73drHpMnuuPnh+D+/78j0EEWFFKEaUV69TQ8NsZhYYo85tQmOD8WgLtVkhB60o3t0bBgiDWSxxiDanaHOKpVvDgiUMELtyfRUjmQnxy9fU27eItQIohXXC4CJXt3/jBx8AZO0NXTfTjwaNmkak2PoAEGPewQOZZzbwKyKdWIg+6Peq59tpcBaUZI5mTECWunQhm019ncZAYG5+ISb/ZoCYZyjfWVXwZBCfv9DLbMBzNBha7u4cKNrUe8aNkSiR6hvTI8MUzCSfBwAuEZro6ntWUtaeVnZ5+5VJv2Hf3qsdF6sonPRPJu89JJHtuzGRAEIyEzlRmuq88ZhxOuIOu839bUqtrcFpv8NzR02mwFzIg67/50gCAmJAjgUqnNUejzb6RbVZoCAfECl1bPknwxjKPN9gt979/HHPabc6M8fKi4EQQCQmE+Vd9SjFc7Sib7aYeyJLh1vd2tBbvbwSBD7rxVXBdYgaW5pRDeWWAdSNBrPPp5WWQL5pzfdJC4a2VspVOg3t53Axkg2Y+GBwaeJsB7c8v+YsOc43NAk11RQACr33aZUDRTlj8YwNKDq2nYKEurKMAol00cunAKvl01LSkeNhABEg9Obd+I+fi/7vIoBYbA8DRGvrmCxnwFxbEVEb+yQ1HUuNjmX729MnuZqTI+//Zv4A6+lCZjDR4RwAAAAASUVORK5CYII='
            },{
                name: 'Have I Been Pwned',
                url: 'https://haveibeenpwned.com',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAATJJREFUOI1jYKAQMDMwMDAkh0c7iwmLGN59+OA6qQYw/X/3juHw6RN7FGVkn5DlBH0t7Q3aahrHyNLMwMDA9PXbN39WVuazZBvAy80zWUFObjNMwNLYZLalsckqcg1k0NfSPqutpv6AWPWM6AL/b7yBSGiIMPx/84bhwqnrokryQn+v3HzKYqXu+oqB5yPnrXvnuXm4uf9LiYv/xDAAGZjoGfR9+vyp8D8Dw39GRkbGMD9fra179s768vWrDQMDAwMjI+MPvAb8f/OGgeErCwMDw0cGBgZ+BoZfrxkY+PkZGL6zQcWwAE8H53Bbc8tKYvzPwMDAwIQu8Ordm4RXb16XkmXA//37Gb59/67Ny8NDXjQ6W9vGa6iofvj/4gXRelBcwM7BweFq7+zIKCFBlgPIAgDWs1p6XrSPZAAAAABJRU5ErkJggg=='
            },{
                name: 'Firefox Monitor',
                url: 'https://monitor.firefox.com',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABFFBMVEVHcEz4HEGnSvdyZvj/UU75H2L/hVj9Ik74FmD5HWP/P02UT/yDW/37IVv/OlL/gUn/h1r/YlKrKdX/wEL/tEn/3zfhJDb/AEEAUNL7GEO4V4r5WVH5IGP/aVToWW1MYdj/dVH/S1D3GWX9JU+nO/GuRvD/jVFkaOv/xymkQfT/nE3/s0eyO+T/eDT/SFH/8ACwQ+v/cFb/kVT/qEX/jU7/e1f/lFL//wD/rEr/p0ydAPT/flj+L1L/dFb/pzz/oU3/xUH/7if/pUv/U1H/UVP/H2j/sEz/cVn/RlT/W1V4bP+eVv+LYv//uUn/n1b/J13/2EAVZt5Oad9obfe4Sv22Pub/pVb/xUq6WMW5O+bYqoz/YFdaHSeyAAAARHRSTlMAEfygmubyZ5buvqCiuvpV/r7H0PXMVTIzNd/4/evhqoD003Ro9KzeRIS54Kgx4xnkyvuWk9LuTNPqQfm9uF3WvC3HvRv0bD0AAADKSURBVBiVY2AAA0dRUXMGJOAQEBAVIQTnGruFCzMwCEWG6oC5/GZhlnYghpVBiKoKkLYWMGFgcBIREdZn0GRiAgq42zIwGPnZW/j6ajBwewMFogUZTAX4GRh03bQhAi7ODO6GIDO03Bh4fIA0HxeDpyBIQM0PIuBvw6DnAhJgY2Ng9gIJ8DKweyiysMi6K0AEXFkZGZT5PFw8pRkY1IOBAhyurrwMDJLiYi5ygUHyIL2MSq4yHECay0VKAuoZdk5XThCF5F0OVhgLAI36FzuK6OaIAAAAAElFTkSuQmCC'
            }
        ];


        // IOT
        engineList.IOT=[
            {
                name:'半导小芯',
                url: 'http://semiee.com/search?searchModel=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAA6NJREFUWEe9V2lLVFEYvtCP6DeU7WWlpdWHICrqgxAV9KEiiIgiCCr6YLa5TPtiYQttVEaLZdJCH7JQZ1FHbbRJM3Usx21sHHVGR3um9zll6HhRmrnjhYdhuOfc9znv8rzv0eSZMnV/YUHcCXtwSaYlmHzKGkw2xR4rzjuCSSZrgVZY21Vwx/xj8MDTOiw/bcOCk2Ykn7IJrDGG2BAiWkrOp9DuB85QzodmvKnuxN5cJxamm7HUpLfJQKjv20JaYqbVHy+nnnW0GGsvlWPjtSqsvliOxExL7EkINGHhH/6TmGVRRExvGpBb6sbc4yVjNhiNUQSIpVlCRE5f09KDnfdqEC/hGPneaIwhQMSlFSPX5sYDq1t5JPy9kdAhYEPckWI8LmvF84o2zBQyo98bizEEEsT9rII23wBSX3yNeR6MIGBThuOOFOFlVTsaO/1YnCGVIDkRvslIaPHpFj9POUNcvUbK8GNdFzp7BrDush0sTxLT22gUtE3XqwKHntXirYhQt38Q7794sPJcKeafKMGySVBEzRcYDDLerxwd2HG3GnOOlWCRuH4yjBNaytWKAI2x3FQfmAT1GwltUYbVvyRGicYEZmIzx3jAcMw+VqwvRNFAWqzyJA2QwJabn5CW/xU3ir4jz96mQp1f2Y675hZkvP5mJIE/rZyn3X7HISLWjiaPH23d/ahv74Pd1Y2S+p+wNnjhbO2F1x8EH0MI8NQz5cRSUbB886Kzd0Bpyb5HTqy6UPYvDHQ5k5wVxj2bZX3UBIaNZ0kHHRz6hTyRbxqlrswTQ2xsXKOS+y/4n3lHYlEToPErhS7lzoNPazFdlJQKypDorQ9HVATo1j0Pncr44bw6TEst0l03HiImwAxPkJNSts0Sd55cuVpn7XiImADVckNOJZq7Ath1v0bFW2/dRIgqBCoBJdmYTJFKd8QEmN3smGffNaphlnOE3rqJEDEBGuT0zCf7vUvlQCReiCoElFvOjYHgkDLOUMj3xqwbD1ERYBgITk92l08Uzqzk+H88ERUBGuLUtPJcGeo7+vDZ3Yv12XY11rFKJmzt8l4IlEZMgBgmwUvNk/JWeHqDuGdpgcwZSqiolPylZxgirmUvYF9Q7XjZmfKQeCE0IdtxYVOhoDG2X453Lk8ApU3dqu2mSjumVmy95cC22w51/2TveFvjCWlJJttzMS7X8sjqOBzD98w1UiFpL+uRL12xstmHBsmTFm+/Uk7Onr7AENze/oHfPq6SZbqPjhUAAAAASUVORK5CYII='
            },{
                
                name:'丝印反查',
                url: 'http://www.smdmark.com/zh-CN/search/code?id=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqBJREFUOI2Nk1tI0wEUxr9d1E2nTrw0lYlrmKYWmptKVpKMMioCUyHRHkIGWgZFhQ9dDIIQ6SVDCWygvYShBL2Ut0Rq2qTErCVomk2c6abhdDp1/68HMbAg/eC8nd/hwPkdYJuQQjFJkNPgyrp8u/6tsCA8ccw62GRq4rWrN0YAX7Y2tO7d+YBVouZ+jRMAN0pOtSrWyRnuAP61qk1N1g1twkVFJdTrMgiA6akZ3aQNACD5B3QToyPfnpZcKG2wTY9HnMg9CY1GC11aGgwGA+z2n7B86It1OSWSXov5jZTkZQCnQbyura517D+Q8mho+EvAoaws5BechVwmh8u1gGClEnV19bD0WwDI0NnecYtL7JFaP1tvmt+Zw29fv2NY5Rqci7MAgH1JiQhUKOAVBIyNjaO9vQMjo8NIiktGvHYP3Mtu1D+sh4geninML3zx6mUbfOU+uFtdBYlEArFYjHWvgMbGJlj6e6HwC0Hcbg2CA4NgyDXAWG50KHcpw8WeRc9yiDIEyWlJ8K550dneBZVKhebnLbh4qQyW/n5kpWXhoF4PqUQKY7nxXnZOtrXP3BvmA5/jAABTnamutLiU8ZoEhsrDqI6IIQBGR8TwsO4IjeeNND02kQLLAcAx4+iZ+D7BZbf7oxgA8sryyqNUUZ/SdXpI/aRY8XiQkpCKmMhoyGSyH4nxiQ/0mXpM2iaNABAaHlq1tLi0uOB0tYn+nM9FVFyp8NhsNl9FgALaOC385f7PKqsqz9HrjbRav04FBgVBrVZnisSi9yQhEom2KIC58bnco5k5zD9V4BoaHCIFdgMASczPzfeZ35oX6Fk/9l8DB7oGsumltLW5hbYJ2xK5oe3GQ+1A4c1m+5R9dXBgkBRYujPqr6ytUUn3NusC+A3bOkFOP4GHTQAAAABJRU5ErkJggg=='
            },
            {
                name:'ALLDATASHEET',
                url: 'https://www.alldatasheet.com/view.jsp?Searchword=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACvElEQVQokUWQS2gUWRiFz61bVd096fjIQ5OJiTHqRk2MgvhCkRGjgriIoxkDKi5cSXZudGODoOILZmA2CgPCgERQEFzqME4S0iatBs2jHW1HTdup7k7a2K+qunVv/bOIJGd34Hxw+BgRAQAQH8+cOPOkbUudr5SCAhhAHKaCylluyHRvXelobKrUhS1HJmZdHoi9TPs1i9bsbROewxTAQGCQctWPFVZq+uLxRzPp8h93DrOhF9mj+3v3VqSE6fua9GwFAhgAGEAyy5Yc233w5w2P774oFLV1zYbuGIGO0Mfb9g3YOhgHuZiPj6jddDq7tXvl8p5rh14Pzbz/K6ZDqQ+lxcPBPR7nnl/y8i4Ym9uHbGe0urm9td5QQngmeYJr0JvCrKFz03VjS2a68CFZaFhdyzzJGAOQL4oN62u7T24slgR3feEDAJu3NBybunAt1nNpnyeEkj4An0NXJKWSSlRWhN+8yqYGX+vzh6UQAU2aQU2Dpjgw51WHoXPADC8OhkOcgAXAEzI1JeODli096RP7jgAAEVWG+Md3tmOrhUvpdOnK1X4rXTS5X11VAQ5hq9xs2TR4VdUPRMQNo31zHSMityxHx3Jlx21sDDc3LxWC4m8z5YK/rC7U0rJkrtp56YNqlgV5JBIZGv5y4MgDK12Ij2c2tdYn/ps51Plw0srHx6z21vpEYqaz+1HJcd6MTQvHAxE9ffpvV3cvEUWffzp85M/+Z5+7fuklooH+xIlTD58Pfjlw8G5f32S0PzkRz+oAzEAgmxPRqDUWn+7Ys5Y0ZhgGgEAoaAs3ENKnsuq33wcUmTu3LdcBcGBkZPbyzYHtW2vPn9v9z7NP428zf/dNJt5ZP+1q+Zqz62v4/Xtd8AENPBKJ5L85KxqCv97cv2vHSgAgLZksDsZS1dXBnrPbXEd65O/Y3jQn+X9jiXPV4F5AKQAAAABJRU5ErkJggg=='
            },{
                name:'FCC ID',
                url: 'https://fccid.io/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABHNCSVQICAgIfAhkiAAAAohJREFUKJGFkjtMEwEcxr97lD7o3bVC22sr2kp7EGspoAOSQMSExCYuxuDk4OBijLK5KEFj3BzY1JhgNHEmTjZdjAlxYEBlsD0PKi2lUKilT/u6h5tSbfTb/sn3/Zb/j0CHaJqGRw8fPKnXmzOjZ06vMAybn56evtqpSxw+Xi4uXtz4lrjzo1qdyGb3cMxzHCaTCVNTU/L4+Ljuj/pvwPzc3fuKol4vlUpuiqLBWSzY2d0BRVHoO9oHfVdX7VQwaDQYjU8nJydvHAaQUjw+4z3RP1+tVt0UrUO1VkO9UYfX64VBbwBNUeg2dxuz2V1wHCtEo9FrbQDaoH81MjIKn18AwzKw2XpBkRSgavD7fNhMJpHJZEBSFBIbifMMY37RBtBUTTkoHKSDwSBcLhesFisajQYkSYLBaMDAgACGYWE2m0HraMiygkjk7btIJBIAALLZaOR9gv+Dg+fhdrvR03MEguCHy+1CMpWCx+MFy7JYXl4GTdMgSQK8gz9n5+33AIC6fWuWkmVZTxJEzswwfoIgoCgqnE4XCoUiisUChkIhtJotpFIp+H1+sCwLvV7fH74QvkwKg8JjRVFEuaXUOZZDuVwp6HQ0TCYThodDqFQqyOe/Y+zsGEJDIZjM3aC7dEhubhptvb1DbY8VRbFqs9ueF4vF2U+rH2F3OFAplxCLiwiHwyBJEun0FmJfYoCmwuF0rtJtBira63KpnCvkDyQNmi+X2ycCJwMQBgaxvZ3G/t4+VE0Fz/MxmiQXdCT5/i+11tfXr8jN5k3Oau1fW/vsZjkONEVDVRXILTlqsVrnAoHASietfyXxNTEhSZL4ZmlpQRTFWnIr+eyfg06Jx+JLmUzm0v96PwEDo/jJ2StKGAAAAABJRU5ErkJggg=='
            },{
                name:'CMIIT ID',
                url: 'http://www.srrc.org.cn/WP_Search.aspx',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACWklEQVQokU2Pv4tUVxiG3/ec79x7Z2dmB3dX8QcW0SYiCKYK+B9oyqAWtoLBRkFiYWOTJk3AQlIYoqiFYYugpYYgwcKwjYUiurgGdl3dZTWJM3Pn3nPO91ksik/9PvA+bFIDgGZKmjEYlCRpMAAAgRZwqt6cOYMAAGB0hJKqUo1V6zp6I0DAEitxcVpqZx4IsjnPdADp5bc7C7/cuv/Pq0nhOo4Bxpyxf6/8fuVUmxTIsnkmg/D+uzOXbz9Y2z23p+xHWjKYt2Sx8MEDINQAAcyMhbib83/d+HNt98zssFnnuFDvwAamufWTerOGBhOlB9WllBF+PH+4KsGcXPYwQ7axc5lhttSIqCABMQ30k/F40rT/buvNVXRVMRWmQm9KypKdvnQ70zPd4NsIFwxwji0ZlpaHl399cvX632/Ho8zatXVqEZPf0oZujJKskU42AyAKJ4zDOj7ZSCsb4+NhUIpJBV9xoE19bf7/pdXVL3YdvHi2dYBBYB4at++sLpw82C2rXhjWjTftWlZZXx79cG4GeH3oG5Wzms2BAgJazPZ72zo6GEgQX1SlBF91fDXdj8AIOzq+JODMARCYGm3Q6y4tvn78fJWFUWOLFBG/mi1Pn/g+3fjZoPiII2BwMdfHjh65+2hx8W374r28eefWh+Wlp3g5s0/QEPxMIGgZFr8+MHfrp2/XNlYm/43aFGw8QZ37NsporGk+CWxiVANdkgxfVM+Wh3/cW1hef1+i2btvz5eLD3svXqUdW/efPx1VDeAktmqggzMDaBTxBOCBCbTKBoURLRJAgh8ATw44G2gJkMIAAAAASUVORK5CYII='
            },{
                name:'MSIP/KCC',
                url: 'http://certid.org/msipid/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZtJREFUOI2lkj+LFEEQxX/VXT3+QTA6bxc2Eg3WVMRAUUyM/Q4XyB0KgmDgoiar2SXKRSZ+Aw0VDI6D8wMYnNkiCHp/9CKDmdnuLoOVYWdPmAMLiob3ilfV9QqOEw9X7jC6t/4vSgbL/Tde/UUgN6CIL6tqc/dg/zEATx584NSJ28QIKX8hxU3Gr9YANIRwxau/1FIFzPJhAzh3lWkEM/BuiJ4cMn60SlW9cyaWzIxWAmakZvygZzGbiWWDlACDHHdc5/9Pn7lLzkfxlOH5xqhbwLsbRzDnIKfPAE4MFRFaiSCYAhDTW1Ka4D14D05mGeN7ABmc6730wZ+3vOBCWW7vHf580eo8ur+B6i2cG/JsXTqnP07IoNd77ZxeEGFuU+brst768evgaX9paVwUxXWQ1LCGs5wn33a/r2jQcM2rDluqs+c3QAjF5SIUN22hc0qpD6AmEs0WaJHmDkRIs7tYqPnLd9vYEf8toGKmIm1HBEEED2CGCtIsZq7IA+i0nn7Mlifzd4CIVmX1CaCuq22QjFlsaIeL0/QV4A+yrarsiYyv9QAAAABJRU5ErkJggg=='
            },{
                name:'FCC ID Get alerts',
                url: 'https://electric.garden',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAG1BMVEXltW/+/fvqxIz04cTmunjmuHTovoHv1Kv68uWmUV2kAAAAMElEQVQYlWNgoA9gYmJjYWBgZmaCCzAzQgAHOwtUiIWdAyqGrIwZKMHGBBdgpa07ATs7AHDC954YAAAAAElFTkSuQmCC'
            },{
                name:'FCC Reports',
                url: 'https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAkNJREFUOI3FU19IU3EU/n67d8t0qaxekqQHQZvkZtiSFCmivBpKqf2TMF8MjGLawJceegmfKqHHIgh8iKBCAqGkLA1KCOl/QeUiSE1nm267d3f3bu7rIZUp+VIPHThw4JzzHfi+7wiS+Jew/NVW2lE5pOFMipABgAABSJk2+LNsuLc4FNLQHtRQPp+CvN6OVxvsokcsQTgUInsfgZ0L6ea128+GSCKs8yAKmnSgnEAFgUr+rvdyRuUpkoBwNjK/6mQwqLFtRmXHjEqfZrI2alABPMTW5thsjCdUk4gYRERnnavGOw24GIjSCxQ1cEtN53eSSE8UN0fhPBw3ksSxjisfgBICLpbW+SaNBHH1zsjDW4/H+mRAQAjLMinCcdTj45j9p/rC6+vuHR15+S5PNd6WShaEjnt7BjYpXZ8DgxcLAUCsKW4iLNJ8hcv5zUwmJEmSUxM/pnP9Q18cmjkosmxuzulv6nMy0P8nQWQCyLRaEy1H6r5qMd0qy1Jq+OlIvn/ok2NRaRL29KX5FCAtGaCokc7as8s4iBrcDXg4Feb5632jA9h8IDkbY8uczoac7a2RjVXt00tcoaiRhdWd4ytJLNhzegrZCuMJorf/9X2gjICb53ruPo8niUs3Hg0/eR+5uSqAbnIbsItYV83JMLtjJqGZRCDKLhQeMgA3w3EeBRwK7TvaAisBFkBcJft9E4BnwUDlBDzMKmudjRpUSEKMh3hZCMzl5eLCatZXTVTGDCgpwrrWhuGcDDxY7In/841p8QupVWPRrTN9MAAAAABJRU5ErkJggg=='
            },{
                name:'DigChip',
                url: 'https://www.digchip.com/datasheets/search.php?pn=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAuhJREFUOI19kW9IlWcYxn/P877vOUedTM0jZ1tRE5IU26Ea84wYWV+M1iAWW0UQREW0AzUHMfpQRLC29WGR/RGGjcG23D/Qvm0tOToGk1LU/qnZlEOtxI7HaXbe532Pz/vug53Tvswb7i83/K7r5rpEoHqjv2NdlEikgs9/TNDX+imVSxfzwcef8d1Pv7Nr+3q+ONFIMBCg8dhppBQETYOz316l5eR+RMvXrX7GVuze+S7JB4+oramn70YHNVWvEgwtxc6M8TRj03jsNCUvFnPyyAE8z6e17RccW2E6bpY5rbGVw8uRMHsO7qPrj2ssr1wCgHJcggGLby5cYmikg9mnGaSU1K99g1Qqhcl/Zm5Os6Z2ObZyEM9upilJJAYBg/TEQyLltVzrHeDO0F9Ylok0pMSQEoCCUIDD53+mvKIMIQTg8WQmxPr6FUApk7OapqYzrHsrxo3hMW6PJJF37iXpvXmPF4oK+OHyr2x6fRkFVDF4dxpwmPxnDNt2ud7bwjsNH/Jm/UbOn23CCgSorVqGOHPhK9+yJBk7w+joIj6Kv8+i8sec+/J7ykpLSE9Ns3/3NvB9/h5/zNXOPwkGTRJdCT45fhQxNTXhX25PUhdbRUU4hePO4fsCy7Ly2WSzWQAMQ2CZAscpYjJdTEX4ITKZLGTT269QUvIoD+eg3ArhYxgeSgW5/yDCld/G2bp1c7cVCCLFs7gzmRDT0y8hpZd3zoGuW8D4+GI6Oyc5dGh79+hoP1u27Ih5nkYWF2fp7+8llSqnuVm+ls2WLQhu2LAt1tPThNbzzcnCQoVphrh4sZmGBvYWFT1ZEJyZUbS1XSEcHsPzBFJrj5qalZw69R7pdN9Bw5B0dEwtCNq2i+vq+Q8AtNYopYlEJhgYuMXwcPf/grbtorWmrq4Oz/PmBXIi0ehqPE/Q03MuD5aWjuRB13WJx+MopYhGo2itnwvkqquurqa9fd5xdtYmFluLUop4PJ6vNWcI8C9QC44wTl7LTgAAAABJRU5ErkJggg=='
            },{
                name:'进网许可证查询',
                url: 'http://jwxk.miit.gov.cn/WSFW/LicenceQ.aspx',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACbElEQVQokZWSX0hTcRTHz+/u3s3pNi3UFWKBllCjIhpIFk4yUMiIXoKymVhRkiDYUxAlpoGEL6FFRIKgDjL6Q2Y9pFhRUbSKtNSCZIN7tzHnul737977+50e1BXSS5+3A9/vOZzzPQQR4X/gVtU06Nd+fgOAxDOPOvXxHw5cgek6Is6fr4m4t1MlOnfUIXc105iieHpYKpmWLU/QA77w4aLk2F3TphLBvlZp3MHzCbIgxnrblJ4LuuRLdydLO6CmKu11EJoCaYITgGTnw7oSGpQ036xQdVo60fXqx/yeopwt6y2AiErfNaW3XW5xyQdJrDZDG73FqI6IjLF4f1u4wqCHpetjs9yZ4XteiQcAKs5i1I9fXwoWMJ7qNrgaILUIGVZCCO8oI4RhQhEEMyPE65M5ALC1dBmsNkKAy8k3lNcnpscBEAAwLquey8bSqoB1w5XnPlum8eTeQl6d/BA5u9/sdCIDyCueiRP7+yHT9ChS0MYHOEf1u32t9bcndSAj55zFeVm8wV5grqkDWWQa6JLfwkPHtou1/vvEaPrkfjoYyHzzJNjgyL3kKsjLEgCAIKIeEmO9Hanhm7yZWK8Of99aPSCqQUXNBerM4asKM20cBV4ghCyfNtLeHDpWFjqwMVQGkUP56sRr/As9JC4+HkyXBBFpNMKiYW3KK3c2QeIX4TnjzgrBUYqEV6e/6AEpt/sBby9Yym4lOESxcnPGrt0E1eTYQ9RUQCCWNabymuRnr9XdlO1uXP1LqZlJTfTHxkcCxyuVR/1zrU3iERejdGGojypyWvbHsIQWFKM3OmkiHn/7QvbcYYytEvwGlCmQIV8ejiQAAAAASUVORK5CYII='
            },{
                name:'车辆 VIN 码',
                url: 'http://www.yiparts.com/vin?type=vin&keyword=%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXxJREFUOI21kzFowkAUhv84KLZIU+JSwZIpLg4WOrlEaKFLB6fOmYROde2k0NXBLgUn49Kpg9SpQ0sWzSIodUoWD6VOCYgpFl1eBzVoYwSH/stx9/73vePdO2CHvgoFMmSZOjxPfUWhXd6t+hRFagPUBmjG2P6AGWM0KhZpomm+yRwAyKVXSsUFFK/PcXwY4qpNg1Td8JjLN2mcnUa5zsCi8nsP/EFwLZqrkHj/7FZilrPY5yqUfXpzz/vWhPh8lVIPLwQAgfUKzHagGSMCADEa4UQhAgBIxQXXU9NNjKdzrGIuICPFAADjn9nOvjDb2YAG/hq6Q3s3wPoGAPDh0CYgf5kEAKgt0ze5M7BIM0fgD4LIpkQAy1dYSW0ZpKgaRCGCu4skarqJ7tCGkpZwFA6ipi/g9dsrZBIxzgNYXNGhepeB2Q5U3XAbpqSl5Zrw5PgqU2oQchUqNtq+g+Rp4r76X8BqJsbTua9na0OqTYMeP3obMyFLJ+5fWPf+AjWBnuQ3QyrzAAAAAElFTkSuQmCC'
            },{
                name:' VIN Lookup',
                url: 'https://www.vindecoderz.com/EN/check-lookup/%s',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAQAAADlauupAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAJiS0dE//8UqzHNAAAACXBIWXMAAABIAAAASABGyWs+AAAB8UlEQVQ4y8WTT0jTcRjGP1/3Vcv8A1vTw0g0rdaQKJRtTlwMAkFZRaWxCIROQTAwIQqqy5I8lKYXzVCITkGSIUl0sohGUSQas0IyWCtIHVlLmm2/t1Mdol8XDz3w4b09D8/L+8L/lvo9a2ue5H4407qppa1Bb7FcY4O6zVfaACjiFinZm4llj8bHbw7/qOi+z4uXRwD5ZeDKOX7SWd17euRyj72wIIoF3x9Rj2FlG9nOwwvzc4Pde4yRngJgFsAHxZdsxbFQV60RlasismLCgMiFZeOR9XvMDcXnAJ+G3Cx47tlVVb3zs3It1gFvTAq7walUjX25yp/EcwMmrZpgZ4kea2//djbvwKlB1mVK/700XUHJ6rG8iE73l2cOXb+CDsa3el8bpUN2kWCfCCER3CaERIKTIkPlIt4JY6Nuitu1/uJ452pW6cA+iE/B+HrgqUn8Dtj5HgL7IepVC1PnHflKnTCspfVqqc4LswJvdwEpE4NC2PwRti/Bszvw6ZXYFKxWgvaD6geZgKwFSJtY5IMlC6oZJAyZhxrGBqA2AZVJSCThwV2QDpO764XdLeBIwrwfnoeAsg4YboKMFUYbwRKBnOq/Y4nAaAAyNhhuhLKwhtRFmO6DRQ/MdEH2IDBnUqEIZmahIQzTCUhF1v5Na9VPF2LPejc7Ai4AAAAASUVORK5CYII='
            },{
                name:'OBD位置查询',
                url: 'https://www.hum.com/port/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABv0lEQVQokXWSzW7TQBSF750k9oztOG3SIBFSmtJfpahN+RMLKCyQWCPxYLwGVYXEC6AKiUoINhVJmkVVoKQ1qLIdUTu2Y5jLhsZ2CrOa0T3fnLlnLr5odyC9EBljJCUAIGMkJRGl6/msGCN/+GV/3+6fAlC5Vmu0NrihpxmWVvvuYG975+eZPd/amN9sea6793Ln3HYQMZGln/T+1WtzptJ8vHWhoIO375xT6/7zZ2OGpa8fDgaL9+78juNz2/Fs51cUL9y9HXqe5yQmSQ+jIChwXuC8/Wa33z1AZFeXFtefPlGEGA0DQASiDKDqWhxFoe87J5ZmlgDBtazI8+MwVHUdLvr+CxCRVioZ5XK/0602rjPGWC43CsOTXk8zTWN6ahxUJqXm1oN+t8d1/ezr8Y+jz6JYPP7UaT56iCyRJTsiKs5UGq31ww8f4yhSBP/W7szeXDOvVP/9DwAgpaytLCMi1/WCqkZBcG11RUqZ1mQAIFKEqC0v+e7Atb7fuLXJiwZkRyMLAABAQQjMMcZyqibwUjU/cUZEY3qqUq+PgmFeUcbx/9eBiKpzc8hQEaIyW58YVZiYpbQPIBIRXAL+AH5cwTjt949OAAAAAElFTkSuQmCC'
            },{
                name:'OpenCelliD',
                url: 'https://opencellid.org/#zoom=17&lat=39.916945&lon=116.391',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAlJJREFUOI1tk01IlFEUhp97vSNjkuaMPzhkY1amjakwSqCgoJYEbWrXJhiIqAQXCsGsWwUJrsI2RSvXrbIysoXiD45TTf6CZRipM+hAgzrOfN9tMTH6+XVWl/s+78s593KE1hpL6XQuv8dvsjndTeLXebThoMAboaT5HZ7W1wh1cBQXloDo7DXmng6l1amzsqwZ8stBa0isY25MovTedxr7H1LaNGIPWHtzV8+/GKK+N4e8Ysz1j/BnDZCIwirE6Q50fAUReWaIuns9VN54fhgQ+9LGeN+o4fY7KPBCfAVRcRVRUAnaQO8sYa69RXpa0JszyPiiIdoGO3HXfxJam/AhEEnHf/gAREUXsvo25vIwensBZA6itAl57hbG9GOILwGgTlXO0/myTujY5/b0WO9Y9h1ynOAsQtYGEG4faI3emsVcHoa9KGgji6r2wQ5FNNRp+QVjH4QjY5p9AkIivNfBTFvMAMTCHYrdDS/HK/ETbSYRnlZIJ9GxMOzHbBi7G2cUCNOu/Bsl3wOpXUgl/ouA0Ip8z6rt2lWHbA6CcoI2wTjADA2goyEreKJ8VVLS9P54gN6OQO5JhNONyCsBp9tuBij1j0pctZPKfWnGJkrHkZakTVauC3O4fBMZpaG3RylH0kIYqcOzmbJISjmSNPQ9AMgEFNXM4A8GlFJZ0hh/hI7OobdCmBPBI2aVwh8M4KqdguPLtP2thfDAUHpn9TKAqLkDQqAXXmXMRVVfaey/j8s3kZ3Ots5oQSzcxeZUN4XVFxFSEl9cpOzKCMWNoyAshr9X3e9e2visfgAAAABJRU5ErkJggg=='
            },{
                name:'MAC地址 OUI',
                url: 'https://mac.51240.com/%s__mac/',
                favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAdBJREFUOI2d0b1rU1EcxvHvfcnN7W1MSTWNmCg2lCallFhx8S9wFlGc7JLBwUXBwc1FpIv4D7jqXsFiwbcGHCoUUQu+NK2YpKTccNMkzctN7slx0GgVhSTPcn7L8+Gc31He7knzxfLSnbWXzy416vsx+og5YhWn51IrF66kr2uJ1OnF1eXHN7xOOyj7aQOe1wnsFvKp3HZ2RjscjjxYuHg+ODV5ko1Pn/skfqRcshNaPDl7b/3dB4TwKDnlgQAAtTf0e/3/AsPmF6AMCei9QerQHhfIgMqo3yDkszA1H5qiIenSqrcx/AZCFVQ8l0q1jr5zABC6xIqHKAQdmuEW0UAYtVojfiROmyayodIyXDbtPEfHT7D2PsPszrHfwIQ5xs3LadLP71J0dsjsbTCRM9haz/Ex+4XktXnMWJBdo0Wr7iCl/PMJJbfGYuYhjY5LV0ikVLCDLqfOxrEOVbGli+HuUxNNutJG8hfgtjs8ffKKmBUhWgmCAlNnGvj8Bc7Nh9BcFT0vaAhwnC6TyhiVg4Dp6SQ7Maj0tgpbb0b/sXffz9MAQDVHrCKAEN5Q36hOz6VWADa/fhu4HIkef63df7S0mt/OzpRLdmLQ8tVbtxe+AwF7uGsCBlxVAAAAAElFTkSuQmCC'
            },{
                name:'Micron FBGA Decoder',
                url: 'https://www.micron.com/support/tools-and-utilities/fbga?fbga=%s',
                favicon:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAMFBMVEUAds5HcEwAd8kAdskAd8oAdMoAbdsAdMwAd8oAeMkAd8gAd8kAd8cAd8oAeMkAeMi67xlrAAAAEHRSTlMUAP6YTjkHJ3LTsMFggfHojKmQCAAAAIFJREFUGJVtz1EKRCEIBVDzappWb/+7fdUwEMP4EXYQrlL5Kbp79aF0fUUk2xcq0W79A5VsjVaqBWMDoYXtdyjOnExmL87coDuFwA+nNm7Zdyw5OHJZ4JEF1aUzLFr05A0yyoKTEwdCSp9Qs1rEbcF06olrYeQA4zpo7Wei/6899QLSygOR8yZhyAAAAABJRU5ErkJggg=='
            }
        ];




        // 导入列表
        var engineList_plus = [];
        // engineList_plus[0] = {
        //     "status":3,
        //     "version":1,
        //     "message":"学术列表",
        //     "name":"学术",
        //     "engineDetails":['学术',"app_xin",true],
        //     "engineList":[
        //         {
        //             name: '谷歌学术',
        //             url: 'https://scholar.google.com/scholar?hl=zh-CN&q=%s',
        //             favicon: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVR4AWL4//8/RRjO8Iucx+noO0O2qmlbUEnt5r3Juas+hsQD6KaG7dqCKPgx72Pe9GIY27btZBrbtm3btm0nO12D7tVXe63jqtqqU/iDw9K58sEruKkngH0DBljOE+T/qqx/Ln718RZOFasxyd3XRbWzlFMxRbgOTx9QWFzHtZlD+aqLb108sOAIAai6+NbHW7lUHaZkDFJt+wp1DG7R1d0b7Z88EOL08oXwjokcOvvUxYMjBFCamWP5KjKBjKOpZx2HEPj+Ieod26U+dpg6lK2CIwTQH0oECGT5eHj+IgSueJ5fPaPg6PZrz6DGHiGAISE7QPrIvIKVrSvCe2DNHSsehIDatOBna/+OEOgTQE6WAy1AAFiVcf6PhgCGxEvlA9QngLlAQCkLsNWhBZIDz/zg4ggmjHfYxoPGEMPZECW+zjwmFk6Ih194y7VHYGOPvEYlTAJlQwI4MEhgTOzZGiNalRpGgsOYFw5lEfTKybgfBtmuTNdI3MrOTAQmYf/DNcAwDeycVjROgZFt18gMso6V5Z8JpcEk2LPKpOAH0/4bKMCAYnuqm7cHOGHJTBRhAEJN9d/t5zCxAAAAAElFTkSuQmCC',
        //         }
        //     ]
        // };


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
            "newtab":1,
            "foldlist":false,
            "setBtnOpacity":0.8,
            "debug":false,
            "fixedTop":true,
            "fixedTopUpward":false,
            "baiduOffset":-120,
            "getIcon":0,
            "engineDetails":[['网页', 'web',true],['翻译','translate',true],['代码','code',true],['学术','scholar',false],['知识','knowledge',true],['购物','shopping',true],['社交', 'sociality',true],['资产', 'property',true],['空间绘测','cyberSearch',true],['证书透明','certificate',true],['企业信息','companyInformation',true],['漏洞库', 'exploit',true],['威胁情报','threatExchange',true],['指纹识别','fingerprint',true],['IOT','IOT',true],['工具', 'tool',true]],
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
                            "<span class='feedback'><a target='_blank' href='https://greasyfork.org/zh-CN/scripts/387060-osint-jump'>反馈 greasyfork</a></span>" +
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
