'use strict';
var win = window;
if (win.Tracert && win.Tracert._isRenderInit === true) {
    win.Tracert._isInit = true;
}
var TracertCmdCache = win.TracertCmdCache;
if (TracertCmdCache && TracertCmdCache.length > 0) {
    for (let i = 0; i < TracertCmdCache.length; i++) {
        if (TracertCmdCache[i][0] === 'start') {
            TracertCmdCache[i][0] = 'set';
        }
    }
}
if (!win._to) {
    win._to = {}
}
if (!win._to.spmAPos) {
    win._to.spmAPos = 'a385'
}
if (win._to.bizType === undefined) {
    win._to.bizType = 'common'
}
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.dmmma ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).__tracert = e.__tracert || {},
        e.__tracert.starter = t())
}(this, (function() {
        "use strict";
        var Bridge = function() {
            function e() {
                this._ready = new Promise((function(e) {
                        window.AlipayJSBridge ? e() : document.addEventListener("AlipayJSBridgeReady", e, !1)
                    }
                ))
            }
            return e.prototype.call = function(e, t) {
                window.AlipayJSBridge.call(e, t)
            }
                ,
                e.prototype.ready = function() {
                    return this._ready
                }
                ,
                e.prototype.getStartupParams = function() {
                    return window.AlipayJSBridge.startupParams
                }
                ,
                e.prototype.isH5Env = function() {
                    return !window.AlipayJSBridge.startupParams.enableDSL
                }
                ,
                e
        }();
        function _typeof(e) {
            return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    }
                    : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
            )(e)
        }
        function _classCallCheck(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass(e, t, r) {
            return t && _defineProperties(e.prototype, t),
            r && _defineProperties(e, r),
                e
        }
        function _defineProperty(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        var cookiesPrefix = "_TRACERT_COOKIE_";
        function strToObj(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "^";
            if ("string" != typeof e)
                return null;
            var r = e.split(t);
            if (-1 === e.indexOf("="))
                return r;
            for (var n, o = r.length, i = {}, a = 0; o > a; a++)
                (n = r[a]) && (i[(n = n.split("="))[0]] = n[1] || "");
            return i
        }
        var spmDataKey = "data-aspm"
            , spmDPosMarkAttr = "data-aspm-click"
            , spmDPosTagPattern = /^a|area$/i;
        function getAttr(e, t) {
            return e && e.getAttribute && e.getAttribute(t) || ""
        }
        function isDom(e) {
            return null !== e && "object" === _typeof(e) && 1 === e.nodeType
        }
        function isViewDom(e) {
            return !(!e || !isDom(e) || e === document.body || e === document.documentElement)
        }
        function getSpmBPos() {
            return getAttr(document.body, spmDataKey)
        }
        function getSpmCPos(e) {
            var t = e;
            if (!isViewDom(t))
                return "";
            for (var r = ""; t && t !== document.body && !(r = getAttr(t, spmDataKey)); )
                t = t.parentNode;
            return r
        }
        function getDPosDom(e) {
            var t = e;
            if (!isViewDom(t))
                return "null";
            do {
                if (spmDPosTagPattern.test(t.tagName) || t.hasAttribute(spmDPosMarkAttr))
                    return t
            } while ((t = t.parentNode) && t && t.tagName && "BODY" !== t.tagName && t !== document.body && !getAttr(t, spmDataKey));
            return null
        }
        function getSpmDPos(e) {
            var t = e;
            if (!isViewDom(t))
                return "";
            if (spmDPosTagPattern.test(t.tagName) || t.hasAttribute(spmDPosMarkAttr) || (t = getDPosDom(t)),
                !t)
                return "";
            e = getAttr(t, spmDPosMarkAttr);
            var r = t.tagName;
            if (("string" == typeof e || spmDPosTagPattern.test(r)) && !e) {
                for (var n = 0, o = t; isDom(o) && r === o.tagName && n++,
                    o = o.previousSibling; )
                    ;
                e = n
            }
            return "".concat(e)
        }
        function getDomParam(e) {
            var t = {};
            if (e = e && e.getAttribute && e.getAttribute("data-aspm-param") || "") {
                var r = e.split("^");
                if (-1 === e.indexOf("="))
                    t = r;
                else
                    for (var n, o = r.length, i = 0; o > i; i++)
                        (n = r[i]) && (t[(n = n.split("="))[0]] = n[1] || "")
            }
            return t
        }
        function getContentParam(e) {
            if (!(e && e.hasAttribute && e.hasAttribute("data-aspm-content")))
                return {};
            var t = e && e.getAttribute && e.getAttribute("data-anewChinfo") || "";
            e = e && e.getAttribute && e.getAttribute("data-ascm") || "";
            return {
                param5: "newChinfo=".concat(t, "^scm=").concat(e)
            }
        }
        function extend() {
            for (var e = 0, t = {}; arguments.length > e; e++) {
                var r, n = arguments[e];
                for (r in n)
                    t[r] = n[r]
            }
            return t
        }
        function init(e) {
            function t(r, n, o) {
                var i, a;
                if ("undefined" != typeof document) {
                    if (arguments.length > 1) {
                        "number" == typeof (o = extend({
                            path: "/"
                        }, t.defaults, o)).expires && ((a = new Date).setMilliseconds(a.getMilliseconds() + 864e5 * o.expires),
                            o.expires = a),
                            o.expires = o.expires ? o.expires.toUTCString() : "";
                        try {
                            i = JSON.stringify(n),
                            /^[\{\[]/.test(i) && (n = i)
                        } catch (r) {}
                        n = e.write ? e.write(n, r) : encodeURIComponent(n + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                            r = (r = (r = encodeURIComponent(r + "")).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                        var s, c = "";
                        for (s in o)
                            o[s] && (c += "; " + s,
                            !0 !== o[s] && (c += "=" + o[s]));
                        return document.cookie = r + "=" + n + c
                    }
                    r || (i = {});
                    for (var u = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, p = 0; u.length > p; p++) {
                        var f = u[p].split("=")
                            , d = f.slice(1).join("=");
                        this.json || '"' !== d.charAt(0) || (d = d.slice(1, -1));
                        try {
                            var m = f[0].replace(l, decodeURIComponent);
                            d = e.read ? e.read(d, m) : e(d, m) || d.replace(l, decodeURIComponent);
                            if (this.json)
                                try {
                                    d = JSON.parse(d)
                                } catch (r) {}
                            if (r === m) {
                                i = d;
                                break
                            }
                            r || (i[m] = d)
                        } catch (r) {}
                    }
                    return i
                }
            }
            return (t.set = t).get = function(e) {
                return t.call(t, e)
            }
                ,
                t.getJSON = function() {
                    return t.apply({
                        json: !0
                    }, [].slice.call(arguments))
                }
                ,
                t.defaults = {},
                t.remove = function(e, r) {
                    t(e, "", extend(r, {
                        expires: -1
                    }))
                }
                ,
                t.withConverter = init,
                t
        }
        var Cookies = init((function() {}
        ));
        function get(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , r = window.localStorage && window.localStorage.getItem(e) || Cookies.get(e, t);
            if (Cookies.get(e, t) && window.localStorage)
                try {
                    window.localStorage.setItem(e, r),
                        Cookies.remove(e, t)
                } catch (e) {
                    console && console.warn && console.warn("localstorage error")
                }
            return r
        }
        function set(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (!t || t.length < 400 || !r.cookie && window.localStorage)
                if (window.localStorage)
                    try {
                        window.localStorage.setItem(e, t)
                    } catch (n) {
                        Cookies.set(e, t, r)
                    }
                else
                    Cookies.set(e, t, r);
            else
                console && console.warn && console.warn("Tracert cookie set too long")
        }
        function remove(e, t) {
            window.localStorage && window.localStorage.removeItem(e),
                Cookies.remove(e, t)
        }
        var TemporaryStorage = function() {
            function e() {
                _classCallCheck(this, e)
            }
            return _createClass(e, [{
                key: "set",
                value: function() {
                    var e = [].slice.call(arguments);
                    2 > e.length ? this._set(e) : this._set(_defineProperty({}, e[0], e[1]), e[2] || {})
                }
            }, {
                key: "get",
                value: function(e, t, r) {
                    return t = arguments.length > 1 && void 0 !== t ? t : {},
                        r = arguments.length > 2 && void 0 !== r && r,
                        t = get(e = "".concat(cookiesPrefix, "_").concat(e), t),
                    r && remove(e),
                        t
                }
            }, {
                key: "_set",
                value: function(e, t) {
                    var r = arguments.length > 1 && void 0 !== t ? t : {};
                    if (e && 0 !== Object.keys(e).length)
                        for (var n in e)
                            e.hasOwnProperty(n) && set("".concat(cookiesPrefix, "_").concat(n), e[n], r)
                }
            }]),
                e
        }()
            , temporary_storage = new TemporaryStorage
            , CrossIframe = function() {
            function e() {
                _classCallCheck(this, e),
                    this._iframe = null
            }
            return _createClass(e, [{
                key: "initIframe",
                value: function() {
                    if (this._iframe)
                        return this._iframe;
                    var e = document.createElement("iframe");
                    e.style.width = "1px",
                        e.style.height = "1px",
                        e.style.position = "absolute",
                        e.style.left = "-100px",
                        e.style.bottom = "-100px",
                        e.style.width = "-100px",
                        e.setAttribute("src", "https://tracert.alipay.com/cross.html"),
                        e.onload = function() {
                            e.style.display = "none"
                        }
                    ;
                    try {
                        document.body.appendChild(e)
                    } catch (e) {}
                    return this._iframe = e
                }
            }]),
                e
        }()
            , cross_iframe = new CrossIframe
            , UEPConfigManager = function() {
            function e(e) {
                this._manager = e
            }
            return e.prototype._getTracertData = function(e) {
                return window.Tracert && window.Tracert.ready ? window.Tracert[e] : ""
            }
                ,
                e.prototype._getMateValue = function(e) {
                    return (e = document.querySelector('meta[name="' + e + '"]') || null) ? e.content : ""
                }
                ,
                e.prototype.getSpmAPos = function() {
                    return this._getTracertData("spmAPos") || this._getMateValue("data-aspm")
                }
                ,
                e.prototype.getSpmBPos = function() {
                    return this._getTracertData("spmBPos") || getSpmBPos() || ""
                }
                ,
                e.prototype.getSpmCDPos = function(e) {
                    var t = getSpmCPos(e);
                    e = getSpmDPos(e);
                    return t ? !e || t.indexOf(".") > -1 ? t : t + "." + e : ""
                }
                ,
                e.prototype.getBizType = function() {
                    return this._getTracertData("bizType") || this._getMateValue("data-bizType")
                }
                ,
                e.prototype.getParams = function(e) {
                    return e = getDomParam(e),
                        Array.isArray(e) ? e.reduce((function(e, t) {
                                return e[t] = "",
                                    e
                            }
                        ), {}) : e
                }
                ,
                e.prototype.getScmParams = function(e) {
                    return (e = getContentParam(e)) && e.param5 ? (e = strToObj(e.param5)) && e.scm : ""
                }
                ,
                e
        }()
            , TAG_NAME = {
            INPUT: "INPUT",
            SELECT: "SELECT",
            TEXTAREA: "TEXTAREA",
            LABEL: "LABEL"
        }
            , INPUT_ELEMENT_TYPES = {
            TEXT: "text",
            CHECKBOX: "checkbox",
            RADIO: "radio",
            PASSWORD: "password",
            URL: "url",
            EMAIL: "email",
            TEL: "tel",
            FILE: "file",
            SEARCH: "search",
            NUMBER: "number",
            DATETIME: "datetime",
            DATE: "date",
            MONTH: "month",
            WEEK: "week",
            DATETIME_LOCAL: "datetime-local",
            RANGE: "range"
        }
            , UEPH5_VERSION = "0.1.19"
            , extendStatics = function(e, t) {
            return (extendStatics = Object.setPrototypeOf || {
                        __proto__: []
                    }instanceof Array && function(e, t) {
                        e.__proto__ = t
                    }
                    || function(e, t) {
                        for (var r in t)
                            t.hasOwnProperty(r) && (e[r] = t[r])
                    }
            )(e, t)
        };
        function __extends(e, t) {
            function r() {
                this.constructor = e
            }
            extendStatics(e, t),
                e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
                    new r)
        }
        var __assign = function() {
            return (__assign = Object.assign || function(e) {
                    for (var t, r = 1, n = arguments.length; n > r; r++)
                        for (var o in t = arguments[r])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }
            ).apply(this, arguments)
        };
        function getXPath(e) {
            for (var t, r, n = []; e && 1 === e.nodeType; e = e.parentNode) {
                for (t = 1,
                         r = e.previousSibling; r; r = r.previousSibling)
                    r.localName === e.localName && t++;
                n.unshift(e.localName.toLowerCase() + "[" + t + "]")
            }
            return n.length ? "/" + n.join("/") : ""
        }
        function findLabelControl(e) {
            return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }
        function debounce(e, t, r) {
            var n, o, i, a, s, c, u = 0, l = !1, p = !1, f = !0, d = !t && 0 !== t && "function" == typeof requestAnimationFrame;
            function m(t) {
                var r = n
                    , i = o;
                return n = o = void 0,
                    u = t,
                    a = e.apply(i, r)
            }
            function g(e, t) {
                return d ? requestAnimationFrame(e) : setTimeout(e, t)
            }
            function h(e) {
                var r = e - c;
                return void 0 === c || r >= t || 0 > r || p && e - u >= i
            }
            function v() {
                var e, r = Date.now();
                if (h(r))
                    return y(r);
                s = g(v, (r = (e = r) - u,
                    e = t - (e - c),
                    p ? Math.min(e, i - r) : e))
            }
            function y(e) {
                return s = void 0,
                    f && n ? m(e) : (n = o = void 0,
                        a)
            }
            return t = +t || 0,
            r && (l = r.leading,
                i = (p = "maxWait"in r) ? Math.max(+r.maxWait || 0, t) : i,
                f = "trailing"in r ? r.trailing : f),
                r = function() {
                    for (var e = [], r = 0; arguments.length > r; r++)
                        e[r] = arguments[r];
                    var i = Date.now()
                        , f = h(i);
                    if (n = e,
                        o = this,
                        c = i,
                        f) {
                        if (void 0 === s)
                            return u = f = c,
                                s = g(v, t),
                                l ? m(f) : a;
                        if (p)
                            return s = g(v, t),
                                m(c)
                    }
                    return void 0 === s && (s = g(v, t)),
                        a
                }
                ,
                r.cancel = function() {
                    void 0 !== s && function(e) {
                        if (d)
                            return cancelAnimationFrame(e);
                        clearTimeout(e)
                    }(s),
                        n = c = o = s = void (u = 0)
                }
                ,
                r.flush = function() {
                    return void 0 === s ? a : y(Date.now())
                }
                ,
                r.pending = function() {
                    return void 0 !== s
                }
                ,
                r
        }
        function throttle(e, t, r) {
            var n = !0
                , o = !0;
            return r && (n = "leading"in r ? r.leading : n,
                o = "trailing"in r ? r.trailing : o),
                debounce(e, t, {
                    leading: n,
                    maxWait: t,
                    trailing: o
                })
        }
        var ELEMENT_ID = "__uepElementId"
            , uid = 0
            , BaseFeature = function() {
            function e(e) {
                this._manager = e,
                    this._init()
            }
            return e.prototype._getTargetCode = function(e) {
                return e && !e[ELEMENT_ID] && (e[ELEMENT_ID] = ++uid + ""),
                e[ELEMENT_ID] || ""
            }
                ,
                e.prototype._getSPM = function(e) {
                    var t = this._manager.getConfig()
                        , r = t.getSpmAPos()
                        , n = t.getSpmBPos();
                    e = t.getSpmCDPos(e);
                    return r && n && e ? r + "." + n + "." + e : ""
                }
                ,
                e.prototype._getDomParam = function(e) {
                    return this._manager.getConfig().getParams(e)
                }
                ,
                e.prototype._getDomScmParams = function(e) {
                    return this._manager.getConfig().getScmParams(e)
                }
                ,
                e.prototype.getElementInfo = function(e) {
                    if (!e || 1 !== e.nodeType)
                        return {};
                    var t = {
                        xpath: getXPath(e),
                        target: this._getTargetCode(e)
                    }
                        , r = this._getSPM(e);
                    return r && (t.spm = r),
                    (r = this._getDomParam(e)) && (t.params = r),
                    (e = this._getDomScmParams(e)) && (t.scm = e),
                        t
                }
                ,
                e.prototype._getToken = function() {
                    return this._manager.getToken()
                }
                ,
                e
        }()
            , ClickFeature = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    var e = this;
                    document.addEventListener("click", (function(t) {
                            if (t.target) {
                                var r = t.target;
                                if (r.tagName === TAG_NAME.LABEL) {
                                    if (!(n = findLabelControl(r)))
                                        return;
                                    if (n.type !== INPUT_ELEMENT_TYPES.CHECKBOX && n.type !== INPUT_ELEMENT_TYPES.RADIO)
                                        return
                                }
                                var n = e.getElementInfo(r);
                                t = __assign(__assign({}, n), {
                                    type: "click",
                                    timestamp: Date.now(),
                                    text: e._getText(r),
                                    clickable: !0,
                                    subPageToken: e._getToken(),
                                    xPos: t.clientX,
                                    yPos: t.clientY
                                });
                                e._manager.getReport().report(t)
                            }
                        }
                    ), {
                        passive: !0,
                        capture: !0
                    })
                }
                ,
                t.prototype._getText = function(e) {
                    return e.tagName !== TAG_NAME.SELECT || (e = e.options[e.selectedIndex]) ? (e.textContent || "").trim().slice(0, 20) : ""
                }
                ,
                t
        }(BaseFeature)
            , EXPOSURE_DATA = "__uepExposureData"
            , ExposureFeature = function(e) {
            function t(t) {
                return e.call(this, t) || this
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    this._checkExposure = throttle(this.checkExposure.bind(this), 500, {
                        leading: !1,
                        trailing: !0
                    }),
                        this.checkExposure();
                    var e, t = window.MutationObserver || window.WebKitMutationObserver;
                    !t || (e = document.querySelector("body")) && (new t(this._checkExposure).observe(e, {
                        attributes: !0,
                        childList: !0,
                        subtree: !0
                    }),
                        document.addEventListener("scroll", this._checkExposure, {
                            capture: !0,
                            passive: !0
                        }))
                }
                ,
                t.prototype.checkExposure = function() {
                    for (var e = document.querySelectorAll("[data-aspm-expo]"), t = 0; e.length > t; t++)
                        this.exposureEleHandle(e[t])
                }
                ,
                t.prototype.exposureEleHandle = function(e) {
                    e[EXPOSURE_DATA] || (e[EXPOSURE_DATA] = {
                        show: !1,
                        percent: 0
                    });
                    var t, r = this.checkEleExpoPercent(e), n = "none";
                    n = r > 0 ? "start" : "end";
                    e[EXPOSURE_DATA].percent !== r && (t = this.getElementInfo(e),
                        n = __assign(__assign({}, t), {
                            percent: r,
                            type: "exposure",
                            subPageToken: this._getToken(),
                            timestamp: Date.now(),
                            state: n
                        }),
                        this._manager.getReport().report(n),
                        e[EXPOSURE_DATA].percent = r)
                }
                ,
                t.prototype.checkEleExpoPercent = function(e) {
                    var t = e.clientWidth;
                    if (0 >= (s = e.clientHeight) || 0 >= t)
                        return 0;
                    var r = e.getBoundingClientRect()
                        , n = r.left
                        , o = r.top
                        , i = r.right
                        , a = r.bottom
                        , s = window.innerHeight;
                    t = window.innerWidth;
                    return 0 > a || o > s || 0 > i || n > t ? 0 : (e = Math.max(0, o),
                        r = Math.max(0, n),
                        s = Math.min(s, a),
                        Math.floor((e = (Math.min(t, i) - r) * (s - e)) / (o = (i - n) * (a - o)) * 100))
                }
                ,
                t
        }(BaseFeature)
            , InputFeature = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._curInputtingElement = null,
                    t._originalValue = null,
                    t._eleType = "",
                    t
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    document.addEventListener("focus", this._focusEvent.bind(this), {
                        passive: !0,
                        capture: !0
                    }),
                        document.addEventListener("blur", this._blurEvent.bind(this), {
                            passive: !0,
                            capture: !0
                        })
                }
                ,
                t.prototype._focusEvent = function(e) {
                    var t = e.target;
                    e = "";
                    t.tagName === TAG_NAME.TEXTAREA ? e = "textarea" : t.tagName !== TAG_NAME.INPUT || t.type !== INPUT_ELEMENT_TYPES.TEXT && t.type !== INPUT_ELEMENT_TYPES.PASSWORD && t.type !== INPUT_ELEMENT_TYPES.EMAIL && t.type !== INPUT_ELEMENT_TYPES.SEARCH && t.type !== INPUT_ELEMENT_TYPES.TEL && t.type !== INPUT_ELEMENT_TYPES.NUMBER || (e = "text"),
                    "" !== e && (this._curInputtingElement = t,
                        this._originalValue = t.value,
                        this._eleType = e)
                }
                ,
                t.prototype._clearCache = function() {
                    this._curInputtingElement = null,
                        this._originalValue = null,
                        this._eleType = ""
                }
                ,
                t.prototype._blurEvent = function(e) {
                    var t = e.target;
                    this._curInputtingElement === t && (e = this.getElementInfo(t),
                        t = __assign(__assign({}, e), {
                            subPageToken: this._getToken(),
                            type: "input",
                            inputType: this._eleType,
                            timestamp: Date.now(),
                            changed: this._originalValue !== t.value
                        }),
                        this._manager.getReport().report(t)),
                        this._clearCache()
                }
                ,
                t
        }(BaseFeature)
            , ScrollFeature = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    var e = this
                        , t = !1
                        , r = debounce((function() {
                            (t = !t) && setTimeout((function() {
                                    r()
                                }
                            ), 0);
                            var n = e.getElementInfo(document.documentElement);
                            e._manager.getReport().report(__assign(__assign({}, n), {
                                timestamp: Date.now(),
                                type: "scroll",
                                subPageToken: e._getToken(),
                                state: t ? "start" : "end",
                                xOffset: window.scrollX,
                                yOffset: window.scrollY
                            }))
                        }
                    ), 500, {
                        leading: !0,
                        trailing: !0
                    });
                    document.addEventListener("scroll", r)
                }
                ,
                t
        }(BaseFeature)
            , TouchFeature = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    function e(e) {
                        return function(r) {
                            r = {
                                state: e,
                                xPos: (r = r.touches && r.touches[0] || r.changedTouches && r.changedTouches[0] || {}).clientX,
                                yPos: r.clientY,
                                subPageToken: t._getToken(),
                                type: "touch",
                                timestamp: Date.now()
                            },
                                t._manager.getReport().report(r)
                        }
                    }
                    var t = this;
                    document.addEventListener("touchstart", e("start"), {
                        passive: !0,
                        capture: !0
                    }),
                        document.addEventListener("touchend", e("end"), {
                            passive: !0,
                            capture: !0
                        })
                }
                ,
                t
        }(BaseFeature)
            , PVFeature = function(e) {
            function t(t, r) {
                return void 0 === r && (r = {}),
                    (t = e.call(this, t) || this).tracert = r,
                    t
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    this._cacheURL = window.location.href,
                        this._reportPV(this._cacheURL, !1)
                }
                ,
                t.prototype._reportPV = function(e, t) {
                    void 0 === t && (t = !0);
                    var r = (i = this._manager.getConfig()).getSpmAPos()
                        , n = i.getSpmBPos()
                        , o = i.getBizType()
                        , i = void 0 === (s = (a = window.AlipayJSBridge.startupParams).appId) ? "" : s
                        , a = void 0 === (s = a.appVersion) ? "" : s
                        , s = (this.tracert || window.Tracert || {})._v;
                    s = {
                        sdkVersion: UEPH5_VERSION,
                        timestamp: Date.now(),
                        subPageToken: this._getToken(),
                        url: e,
                        params: {
                            tracertVersion: s
                        }
                    };
                    r && n && (s.spm = r + "." + n),
                    o && (s.bizCode = o),
                    i && (s.appId = i),
                    a && (s.appVersion = a),
                        this._manager.getReport().reportPV(s, t)
                }
                ,
                t
        }(BaseFeature)
            , ChangeFeature = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    document.addEventListener("change", this._changeHandle.bind(this), {
                        passive: !0,
                        capture: !0
                    })
                }
                ,
                t.prototype._changeHandle = function(e) {
                    var t = e.target;
                    e = "";
                    t.tagName === TAG_NAME.SELECT ? e = "select" : t.tagName === TAG_NAME.INPUT && (t.type === INPUT_ELEMENT_TYPES.CHECKBOX ? e = "checkbox" : t.type === INPUT_ELEMENT_TYPES.RADIO && (e = "radio")),
                    "" !== e && (t = this.getElementInfo(t),
                        e = __assign(__assign({}, t), {
                            type: "input",
                            subPageToken: this._getToken(),
                            inputType: e,
                            timestamp: Date.now(),
                            changed: !0
                        }),
                        this._manager.getReport().report(e))
                }
                ,
                t
        }(BaseFeature)
            , UnloadFeature = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
                t.prototype._init = function() {
                    var e = this;
                    window.addEventListener("unload", (function() {
                            e._manager.getReport().flushData()
                        }
                    ), {
                        passive: !0,
                        capture: !0
                    })
                }
                ,
                t
        }(BaseFeature);
        function createCommonjsModule(e, t) {
            return e(t = {
                exports: {}
            }, t.exports),
                t.exports
        }
        var EConfigType, _objectPath_0_11_4_objectPath = createCommonjsModule((function(e) {
                function t(e, t) {
                    return null != e && Object.prototype.hasOwnProperty.call(e, t)
                }
                function r(e) {
                    if (!e)
                        return 1;
                    if (s(e) && 0 === e.length)
                        return 1;
                    if ("string" != typeof e) {
                        for (var r in e)
                            if (t(e, r))
                                return;
                        return 1
                    }
                }
                function n(e) {
                    return a.call(e)
                }
                function o(e) {
                    var t = parseInt(e);
                    return "" + t === e ? t : e
                }
                function i(e) {
                    e = e || {};
                    var i = function(e) {
                        return Object.keys(i).reduce((function(t, r) {
                                return "create" === r || "function" == typeof i[r] && (t[r] = i[r].bind(i, e)),
                                    t
                            }
                        ), {})
                    };
                    function a(r, n) {
                        return e.includeInheritedProps || "number" == typeof n && Array.isArray(r) || t(r, n)
                    }
                    function c(e, t) {
                        if (a(e, t))
                            return e[t]
                    }
                    function u(e, t, r, n) {
                        if ("number" == typeof t && (t = [t]),
                        !t || 0 === t.length)
                            return e;
                        if ("string" == typeof t)
                            return u(e, t.split(".").map(o), r, n);
                        var i = t[0]
                            , a = c(e, i);
                        return 1 === t.length ? (void 0 !== a && n || (e[i] = r),
                            a) : (void 0 === a && (e[i] = "number" == typeof t[1] ? [] : {}),
                            u(e[i], t.slice(1), r, n))
                    }
                    return i.has = function(r, n) {
                        if ("number" == typeof n ? n = [n] : "string" == typeof n && (n = n.split(".")),
                        !n || 0 === n.length)
                            return !!r;
                        for (var i = 0; n.length > i; i++) {
                            var a = o(n[i]);
                            if (!("number" == typeof a && s(r) && r.length > a || (e.includeInheritedProps ? a in Object(r) : t(r, a))))
                                return !1;
                            r = r[a]
                        }
                        return !0
                    }
                        ,
                        i.ensureExists = function(e, t, r) {
                            return u(e, t, r, !0)
                        }
                        ,
                        i.set = u,
                        i.insert = function(e, t, r, n) {
                            var o = i.get(e, t);
                            n = ~~n,
                            s(o) || i.set(e, t, o = []),
                                o.splice(n, 0, r)
                        }
                        ,
                        i.empty = function(e, t) {
                            var o, c, u;
                            if (!r(t) && null != e && (o = i.get(e, t))) {
                                if ("string" == typeof o)
                                    return i.set(e, t, "");
                                if ("boolean" == typeof (u = o) || "[object Boolean]" === n(u))
                                    return i.set(e, t, !1);
                                if ("number" == typeof o)
                                    return i.set(e, t, 0);
                                if (s(o))
                                    o.length = 0;
                                else {
                                    if ("object" != typeof (u = o) || "[object Object]" !== n(u))
                                        return i.set(e, t, null);
                                    for (c in o)
                                        a(o, c) && delete o[c]
                                }
                            }
                        }
                        ,
                        i.push = function(e, t) {
                            var r = i.get(e, t);
                            s(r) || i.set(e, t, r = []),
                                r.push.apply(r, Array.prototype.slice.call(arguments, 2))
                        }
                        ,
                        i.coalesce = function(e, t, r) {
                            for (var n, o = 0, a = t.length; a > o; o++)
                                if (void 0 !== (n = i.get(e, t[o])))
                                    return n;
                            return r
                        }
                        ,
                        i.get = function(e, t, r) {
                            if ("number" == typeof t && (t = [t]),
                            !t || 0 === t.length)
                                return e;
                            if (null == e)
                                return r;
                            if ("string" == typeof t)
                                return i.get(e, t.split("."), r);
                            var n = o(t[0])
                                , a = c(e, n);
                            return void 0 === a ? r : 1 === t.length ? a : i.get(e[n], t.slice(1), r)
                        }
                        ,
                        i.del = function(e, t) {
                            if ("number" == typeof t && (t = [t]),
                            null == e)
                                return e;
                            if (r(t))
                                return e;
                            if ("string" == typeof t)
                                return i.del(e, t.split("."));
                            var n = o(t[0]);
                            return a(e, n) ? 1 !== t.length ? i.del(e[n], t.slice(1)) : (s(e) ? e.splice(n, 1) : delete e[n],
                                e) : e
                        }
                        ,
                        i
                }
                var a, s;
                e.exports = (a = Object.prototype.toString,
                    s = Array.isArray || function(e) {
                        return "[object Array]" === a.call(e)
                    }
                    ,
                    (e = i()).create = i,
                    e.withInheritedProps = i({
                        includeInheritedProps: !0
                    }),
                    e)
            }
        )), t;
        t = EConfigType = EConfigType || {},
            t.Global = "global",
            t.QueryString = "queryString",
            t.Element = "element";
        var ALIPAY_DOMAIN_REGEXP = /(\.h5app)?\.alipay\.(com|net)$/
            , RENDER_DOMAIN = ["render", "shandie"]
            , UEPPageStatus = function() {
            function e() {
                var e = this;
                this._isRenderPage = !1,
                    this._statusCheckResult = {},
                    this._statusRuleTypes = [EConfigType.Global, EConfigType.QueryString, EConfigType.Element],
                    this._statusRuleProcessConfig = {
                        global: {
                            getOriginValue: function(e) {
                                return _objectPath_0_11_4_objectPath.get(window, e)
                            },
                            checkValue: function(e, t) {
                                return e === t
                            }
                        },
                        queryString: {
                            getOriginValue: function(t) {
                                return e._getParamValue(t)
                            },
                            checkValue: function(e, t) {
                                return e === t
                            }
                        },
                        element: {
                            checkValue: function(e) {
                                return (e = document.querySelectorAll(e)) && e.length
                            }
                        }
                    };
                var t = this._configServiceKey()
                    , r = location.host;
                ALIPAY_DOMAIN_REGEXP.test(r) && window.AlipayJSBridge.call("configService.getConfig", {
                    configKey: t
                }, (function(t) {
                        try {
                            e._statConfigs = t && t.configKey ? JSON.parse(t.configKey) : null
                        } catch (t) {
                            e._console("info", "[UEP] getPageStatusConfigs error:", t)
                        }
                    }
                ))
            }
            return e.prototype._getParamValue = function(e) {
                var t = "";
                e = RegExp("(?:\\b" + e + "=)([^&]*)");
                return (e = (location.search || "").match(e)) && (t = e[1]),
                    t
            }
                ,
                e.prototype._configServiceKey = function() {
                    var e = location.host
                        , t = location.pathname
                        , r = location.hash
                        , n = e.split(".")[0] || "default";
                    return this._pageId = t + (r ? "_" + r.slice(1) : ""),
                    ALIPAY_DOMAIN_REGEXP.test(e) && (n = e.replace(ALIPAY_DOMAIN_REGEXP, ""),
                    RENDER_DOMAIN.indexOf(n) > -1 && (this._isRenderPage = !0,
                        n = n + "_" + t.replace(/\//g, "") + "_" + r.slice(1))),
                        n
                }
                ,
                e.prototype._ruleValuePreProgress = function(e) {
                    var t = [];
                    return e.split("||").map((function(e) {
                            t.push(e.split("&&"))
                        }
                    )),
                        t
                }
                ,
                e.prototype._statusRuleHandler = function(e) {
                    var t = {
                        key: e[0],
                        ruleValue: e[1],
                        type: e[2]
                    }
                        , r = this._statusRuleProcessConfig[e[2]]
                        , n = !r.getOriginValue || r.getOriginValue(e[0]);
                    if (!(t.pageValue = n))
                        return !1;
                    for (var o = this._ruleValuePreProgress(e[1]), i = !1, a = 0; o.length > a; a += 1) {
                        for (var s = !1, c = o[a], u = 0; c.length > u; u += 1) {
                            var l = c[u].trim()
                                , p = !1;
                            if (/^!/.test(l) && (p = !0,
                                l = l.substr(1)),
                                !(s = !p == !!r.checkValue(l, n)))
                                break
                        }
                        if (i = s)
                            break
                    }
                    return t.checkRes = i,
                    this._statusCheckResult[this._pageStatusChecking] || (this._statusCheckResult[this._pageStatusChecking] = []),
                        this._statusCheckResult[this._pageStatusChecking].push(t),
                        i
                }
                ,
                e.prototype._ruleValidate = function(e) {
                    var t = 3 === e.length
                        , r = e[1] && !/^\|\|/.test(e[1]);
                    e = this._statusRuleTypes.indexOf(e[2]) > -1;
                    return t && r && e
                }
                ,
                e.prototype._pageStatusRulesCheck = function(e) {
                    var t = !0;
                    if (e && e.length)
                        for (var r = 0; e.length > r; r += 1) {
                            var n = !1
                                , o = e[r];
                            if (this._ruleValidate(o) && (n = this._statusRuleHandler(o)),
                                !(t = n))
                                break
                        }
                    return t
                }
                ,
                e.prototype.pageStatusIdentify = function() {
                    var e = "default"
                        , t = this._statConfigs;
                    if (this._isRenderPage || (t = this._statConfigs && this._statConfigs[this._pageId]),
                        !t)
                        return "";
                    try {
                        this._statusCheckResult = {};
                        for (var r = Object.keys(t), n = 0; r.length > n; n += 1)
                            if (this._pageStatusChecking = r[n],
                                this._pageStatusRulesCheck(t[this._pageStatusChecking])) {
                                e = this._pageStatusChecking;
                                break
                            }
                    } catch (t) {
                        e = "",
                            this._console("info", "[UEP] pageStatusIdentify error:", t)
                    }
                    return this._console("info", "[UEP] __uep_page_status__ result: " + e),
                    this._getParamValue("__uep_debug__") && this._console("info", "[UEP] __uep_debug__: " + JSON.stringify(this._statusCheckResult, null, 2)),
                        e
                }
                ,
                e.prototype._console = function(e) {
                    for (var t = [], r = 1; arguments.length > r; r++)
                        t[r - 1] = arguments[r];
                    console && "function" == typeof console[e] && console[e].apply(console, t)
                }
                ,
                e
        }()
            , UEPReport = function() {
            function e(e) {
                this._manager = e,
                    this._cacheData = [],
                    this._doFlushData = throttle(this.flushData.bind(this), 500, {
                        leading: !1
                    })
            }
            return e.prototype.report = function(e) {
                var t;
                (t = (t = this._manager.getPageStatus()) && t.pageStatusIdentify()) && (e.params || (e.params = {}),
                    e.params.__uep_page_status_ = t),
                    this._cacheData.push(__assign({}, e)),
                    "click" === e.type ? this.flushData() : this._doFlushData()
            }
                ,
                e.prototype.flushData = function() {
                    this._cacheData.length && (this._manager.getBridge().call("handleUEPEvent", {
                        eventArray: this._cacheData
                    }),
                        this._cacheData = [])
                }
                ,
                e.prototype.reportPV = function(e, t) {
                    this._manager.getBridge().call("reportUEPData", {
                        type: "h5",
                        update: t,
                        uep: __assign({}, e)
                    })
                }
                ,
                e
        }()
            , UEPManager = function() {
            function e(e) {
                var t = this;
                this._token = Date.now() + "",
                    this._uepReport = new UEPReport(this),
                    this._uepConfig = new UEPConfigManager(this),
                    this._bridge = new Bridge,
                    this._bridge.ready().then((function() {
                            t._bridge.isH5Env() && t._init(e)
                        }
                    ))
            }
            return e.prototype._init = function(e) {
                this._uepPageStatus = new UEPPageStatus,
                    this._pvFeature = new PVFeature(this,e),
                    this._clickFeature = new ClickFeature(this),
                    this._exposureFeature = new ExposureFeature(this),
                    this._inputFeature = new InputFeature(this),
                    this._scrollFeature = new ScrollFeature(this),
                    this._touchFeature = new TouchFeature(this),
                    this._changeFeature = new ChangeFeature(this),
                    this._unloadFeature = new UnloadFeature(this)
            }
                ,
                e.prototype.getReport = function() {
                    return this._uepReport
                }
                ,
                e.prototype.getConfig = function() {
                    return this._uepConfig
                }
                ,
                e.prototype.getToken = function() {
                    return this._token
                }
                ,
                e.prototype.getBridge = function() {
                    return this._bridge
                }
                ,
                Object.defineProperty(e.prototype, "version", {
                    get: function() {
                        return UEPH5_VERSION
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                e.prototype.getPageStatus = function() {
                    return this._uepPageStatus
                }
                ,
                e
        }()
            , uep = function(e, t) {
            return (e = e || window.Tracert)._uep || (e._uep = new UEPManager(e)),
                t(),
                e
        }
            , ap_min = uep;
        function ownKeys(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys(Object(r), !0).forEach((function(t) {
                        _defineProperty$1(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$1(e) {
            return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$1(e)
        }
        function _defineProperty$1(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        function addEvent(e, t, r) {
            var n = 3 >= arguments.length || void 0 === arguments[3] || arguments[3];
            if (e) {
                var o = t || window.document;
                o.addEventListener ? o.addEventListener(e, r, n) : o.attachEvent ? o.attachEvent("on".concat(e), r) : o[e] = r
            }
        }
        function removeEvent(e, t, r) {
            var n = 3 >= arguments.length || void 0 === arguments[3] || arguments[3];
            if (e) {
                var o = t || window.document;
                o.removeEventListener ? o.removeEventListener(e, r, n) : o.detachEvent ? o.detachEvent("on".concat(e), r) : o[e] = r
            }
        }
        function ownAddEventListener(e, t, r) {
            var n = 3 >= arguments.length || void 0 === arguments[3] || arguments[3];
            return addEvent(e, t, r, n),
                function() {
                    removeEvent(e, t, r, n)
                }
        }
        function ownKeys$1(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$1(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$1(Object(r), !0).forEach((function(t) {
                        _defineProperty$2(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$1(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$2(e) {
            return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$2(e)
        }
        function _classCallCheck$1(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties$1(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass$1(e, t, r) {
            return t && _defineProperties$1(e.prototype, t),
            r && _defineProperties$1(e, r),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                e
        }
        function _defineProperty$2(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        function load(e) {
            "interactive" === document.readyState || "complete" === document.readyState ? e() : addEvent("DOMContentLoaded", document, e)
        }
        function requestIdleCallback(e) {
            return "requestIdleCallback"in window ? requestIdleCallback(e) : setTimeout(e)
        }
        function dealExtra(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                , r = {};
            for (var n in e)
                if (e.hasOwnProperty(n)) {
                    var o = 0 === n.indexOf(t) ? n : t + n;
                    r[o] = e[n]
                }
            return r
        }
        function objectAssign(e, t) {
            var r = e || {};
            for (var n in t)
                t.hasOwnProperty(n) && void 0 !== t[n] && (r[n] = t[n]);
            return r
        }
        function getValueFromSearch(e, t) {
            var r = "";
            try {
                r = RegExp("(?=\\?|\\&|\\b|^)".concat(e, "\\=(.+?)(?=\\&|$)")).exec(t),
                    r = decodeURIComponent(r = r ? "".concat(r[1]) : "")
            } catch (e) {
                console.warn(e)
            }
            return r
        }
        function getValueFromStartupParams(e) {
            var t = window.AlipayJSBridge;
            return t && t.startupParams && t.startupParams[e]
        }
        function getValue(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.search;
            if (!e)
                return "";
            var r = "";
            return "" === (r = getValueFromSearch(e, t)) && (r = getValueFromStartupParams(e)),
                r
        }
        function getApFloatVersion(e) {
            var t = e || window.navigator.userAgent;
            if (!RegExp("aliapp\\(".concat("ap"), "i").test(t))
                return 0;
            var r = /alipayclient\/(\d+)\.?(\d+)?\.?(\d+)?/i.exec(t)
                , n = 0;
            if (r) {
                var o = r[1] || 0
                    , i = r[2] || 0
                    , a = r[3] || 0;
                10 > +i && (i = "0".concat(i)),
                10 > +a && (a = "0".concat(a)),
                    n = parseFloat("".concat(o, ".").concat(i).concat(a))
            }
            return n
        }
        var cookiesPrefix$1 = "_TRACERT_COOKIE_";
        function deprecated(e) {
            console && console.warn && console.warn("Tracert deprecated：".concat(e))
        }
        function jsonParse(e, t, r) {
            var n = void 0
                , o = void 0;
            try {
                return "function" == typeof t ? o = t : n = t,
                void 0 !== r && (n = r),
                    JSON.parse(e, o)
            } catch (e) {
                return n
            }
        }
        function noop() {}
        var index = {
            load: load,
            requestIdleCallback: requestIdleCallback,
            dealExtra: dealExtra,
            objectAssign: objectAssign,
            getValue: getValue,
            getApFloatVersion: getApFloatVersion,
            cookiesPrefix: cookiesPrefix$1,
            getValueFromStartupParams: getValueFromStartupParams,
            deprecated: deprecated,
            jsonParse: jsonParse,
            noop: noop
        };
        function objToStr(e) {
            var t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "^", n = [];
            if (e instanceof Array)
                n = e;
            else if (e instanceof Object)
                for (t in e)
                    e.hasOwnProperty(t) && n.push("".concat(t, "=").concat(e[t]));
            return n.join(r)
        }
        function strToObj$1(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "^";
            if ("string" != typeof e)
                return null;
            var r = e.split(t);
            if (-1 === e.indexOf("="))
                return r;
            for (var n, o = r.length, i = {}, a = 0; o > a; a++)
                if (n = r[a]) {
                    var s = n.indexOf("=");
                    if (s > 0) {
                        var c = n.substring(0, s)
                            , u = n.substr(s + 1) || "";
                        i[c] = u
                    }
                }
            return i || {}
        }
        function timeFormat(e, t) {
            var r = {
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "h+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds(),
                "q+": Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds()
            };
            for (var n in /(y+)/.test(t) && (t = t.replace(RegExp.$1, "".concat(e.getFullYear()).substr(4 - RegExp.$1.length))),
                r)
                RegExp("(".concat(n, ")")).test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? r[n] : "00".concat(r[n]).substr("".concat(r[n]).length)));
            return t
        }
        function encode(e) {
            return e ? encodeURIComponent(e).replace(/'/g, "%27") : e
        }
        function decode(e) {
            return e ? decodeURIComponent(e) : ""
        }
        var format = {
            timeFormat: timeFormat,
            objToStr: objToStr,
            strToObj: strToObj$1,
            encode: encode,
            decode: decode
        }
            , objectAssign$1 = index.objectAssign
            , objToStr$1 = format.objToStr;
        function addMexOption(e, t) {
            var r = e || {}
                , n = t || {};
            if (!n.spmId || "mergeExpose" !== n.actionId)
                return r;
            if (3 === n.spmId.split(".").length) {
                var o = n.spmId;
                r[o] || (r[o] = {},
                    r[o] = objectAssign$1({}, n))
            }
            return r
        }
        function addToExObj(e, t) {
            var r = e || {}
                , n = t || {};
            if (!n.spmId || "mergeExpose" !== n.actionId)
                return null;
            if (3 === n.spmId.split(".").length) {
                var o = n.spmId;
                r[o] || (r[o] = {});
                var i = "";
                n.param4 && n.param4.rid ? (i = n.param4.rid,
                    delete n.param4.rid) : i = "",
                r[o][i] || (r[o][i] = []),
                    r[o][i].push(n.param4)
            }
            return r
        }
        function formatExObj(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                , n = []
                , o = ["fullURL", "mBizScenario", "mPageState", "mPageName", "version"];
            if ("object" === _typeof$2(e))
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var a = {};
                        t ? a = objectAssign$1(a, t[i]) : (a.spmId = i,
                            a.actionId = "mergeExpose");
                        var s = [];
                        if (e[i].options)
                            a.param4 = objToStr$1(e[i].options.param4);
                        else {
                            for (var c in e[i])
                                if (e[i].hasOwnProperty(c)) {
                                    for (var u = [], l = e[i][c], p = 0; l.length > p; p++) {
                                        var f = []
                                            , d = l[p];
                                        for (var m in d)
                                            d.hasOwnProperty(m) && -1 === o.indexOf(m) && f.push("".concat(m, "|").concat(d[m]));
                                        u.push(f.join(";"))
                                    }
                                    s.push("rid|".concat(c, ":").concat(u.join("&")))
                                }
                            a.param4 = "exposed=".concat(s.join("__"))
                        }
                        n.push({
                            ExObj: a,
                            currentConfig: r
                        })
                    }
            return n
        }
        var spmDataKey$1 = "data-aspm"
            , spmDPosMarkAttr$1 = "data-aspm-click"
            , spmExpoAttr = "data-aspm-expo"
            , spmExtParamAttr = "data-aspm-param"
            , spmVisualAttr = "data-aspm-visual"
            , spmDPosTags = ["A", "AREA"];
        function nodeListToArray(e) {
            var t, r;
            try {
                return t = [].slice.call(e)
            } catch (o) {
                t = [],
                    r = e.length;
                for (var n = 0; r > n; n++)
                    t.push(e[n]);
                return t
            }
        }
        function getAttr$1(e, t) {
            return e && e.getAttribute && e.getAttribute(t) || ""
        }
        function isDom$1(e) {
            return null !== e && "object" === _typeof$2(e) && 1 === e.nodeType
        }
        function isViewDom$1(e) {
            return !(!e || !isDom$1(e) || e === document.body || e === document.documentElement)
        }
        function getMetaSpm(e, t) {
            for (var r, n, o, i, a, s = t || document, c = nodeListToArray(e || s.getElementsByTagName("meta")), u = c.length, l = 0; u > l; l++) {
                switch (n = getAttr$1(r = c[l], "name"),
                    o = getAttr$1(r, "content"),
                    n) {
                    case spmDataKey$1:
                        a = o;
                        break;
                    case "data-bizType":
                        i = o
                }
                if (a && i)
                    break
            }
            var p = {};
            return a && (p.spmAPos = a),
            i && (p.bizType = i),
                p
        }
        function getSpmBPos$1() {
            return getAttr$1(document.body, spmDataKey$1)
        }
        function getSpmCPos$1(e) {
            var t = e;
            if (!isViewDom$1(t))
                return "";
            for (var r = ""; t && t !== document.body && !(r = getAttr$1(t, spmDataKey$1)); )
                t = t.parentNode;
            return r
        }
        function getDPosDom$1(e) {
            var t = e;
            if (!isViewDom$1(t))
                return "null";
            do {
                if (-1 !== spmDPosTags.indexOf(t.tagName) || t.hasAttribute(spmDPosMarkAttr$1))
                    return t
            } while ((t = t.parentNode) && t && t.tagName && "BODY" !== t.tagName && t !== document.body && !getAttr$1(t, spmDataKey$1));
            return null
        }
        function getSpmDPos$1(e) {
            var t = e;
            if (!isViewDom$1(t))
                return "";
            if (-1 !== spmDPosTags.indexOf(t.tagName) || t.hasAttribute(spmDPosMarkAttr$1) || (t = getDPosDom$1(t)),
                !t)
                return "";
            var r = getAttr$1(t, spmDPosMarkAttr$1)
                , n = t.tagName;
            if (("string" == typeof r || -1 !== spmDPosTags.indexOf(n)) && !r) {
                var o = 0
                    , i = t;
                do {
                    isDom$1(i) && n === i.tagName && o++,
                        i = i.previousSibling
                } while (i);
                r = o
            }
            return "".concat(r)
        }
        function getDomParam$1(e) {
            return strToObj$1(e && e.getAttribute ? e.getAttribute("data-aspm-param") : "") || {}
        }
        function getDomConfig(e) {
            return strToObj$1(e && e.getAttribute ? e.getAttribute("data-aspm-config") : "") || {}
        }
        function getContentParam$1(e) {
            if (!e || !e.hasAttribute)
                return {};
            if (!e.hasAttribute("data-aspm-content"))
                return {};
            var t = e.getAttribute("data-anewChinfo") || ""
                , r = e.getAttribute("data-new-ascm") || ""
                , n = e.getAttribute("data-ascm") || r;
            return {
                param5: "newChinfo=".concat(t, "^scm=").concat(n),
                newScm: r
            }
        }
        function getCssSelector(e) {
            return e && 1 === e.nodeType && "BODY" !== e.tagName && "HTML" !== e.tagName ? "function" == typeof e.getAttribute && e.getAttribute("id") ? "#".concat(e.getAttribute("id")) : "string" == typeof e.className && e.className ? ".".concat(e.className.split(/\s+/).join(" .")) : "" : ""
        }
        function getXPath$1(e) {
            if (!e)
                return "";
            for (var t = []; e && 1 === e.nodeType && "BODY" !== e.tagName && "HTML" !== e.tagName; ) {
                for (var r = 1, n = e.previousSibling; n; )
                    n.localName === e.localName && r++,
                        n = n.previousSibling;
                t.unshift("".concat(e.localName.toLowerCase(), "[").concat(r, "]")),
                    e = e.parentNode
            }
            return t.length ? "/".concat(t.join("/")) : ""
        }
        for (var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", tagMap = Object.create(null), list = HTML_TAGS.split(","), i = 0; list.length > i; i++)
            tagMap[list[i]] = !0;
        function getLeafText(e) {
            if (!e || "function" != typeof e.getAttribute)
                return "";
            var t = "";
            switch ("string" == typeof e.nodeName ? e.nodeName.toLowerCase() : "") {
                case "img":
                    if (!(t = (t = e.getAttribute("alt") || "").trim()))
                        return (t = e.getAttribute("src") || "").trim().substring(t.length - 20);
                    break;
                case "button":
                    t = e.getAttribute("value") || e.textContent;
                    break;
                case "svg":
                    for (var r = e.children || [], n = 0; r.length > n; n++) {
                        var o = r[n];
                        if (o && "use" === o.nodeName) {
                            t = "function" == typeof o.getAttribute ? o.getAttribute("xlink:href") : "";
                            break
                        }
                    }
                    break;
                default:
                    t = e.textContent
            }
            return structuredText(t)
        }
        function structuredText(e) {
            return "string" != typeof e ? "" : e.trim().substring(0, 20).replace(/\d+./g, "")
        }
        function getDomText(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            if (!e || !e.children || 1 > e.children.length || "svg" === e.tagName)
                return getLeafText(e);
            for (var r = [], n = t > 3 ? 3 : t, o = e.children[0]; o && n > r.length && o !== e; ) {
                for (; o && o.children && o.children.length > 0 && "svg" !== o.tagName; )
                    o = o.children[0];
                var i = getLeafText(o);
                if (i && (r.push(i),
                r.length >= n))
                    return r.join("");
                for (; o; ) {
                    if (o.nextElementSibling) {
                        o = o.nextElementSibling;
                        break
                    }
                    if (!(o = o.parentNode) || o === e)
                        return r.join("")
                }
            }
            return r.join("")
        }
        function getNewDate() {
            return timeFormat(new Date, "yyyy-MM-dd hh:mm:ss.S")
        }
        function processParam4(e) {
            if ("object" === _typeof$2(e))
                for (var t in e)
                    if (e.hasOwnProperty(t) && "string" == typeof e[t]) {
                        var r = e[t].replace(/,/g, "%2C").replace(/\s+/g, " ").replace(/=/g, "%3D");
                        e[t] = "fullURL" === t && r.length > 300 ? r.slice(0, 300) : r
                    }
            return e
        }
        function getUserId() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , t = e.role_id || e.roleId || e.backupUserId || e.bucUserId || "";
            return encode(t)
        }
        var YUYANID = "180020010000000339";
        function reportError(e, t) {
            if (!e || !t)
                return "";
            console && console.warn && console.warn("[Tracker]", e);
            var r = t || {}
                , n = r.v
                , o = void 0 === n ? "" : n
                , i = r.spmAPos
                , a = void 0 === i ? "" : i
                , s = r.spmBPos
                , c = void 0 === s ? "" : s
                , u = getSpm(t);
            yuyanLog({
                yuyan_id: YUYANID,
                code: 11,
                msg: getErrorMessage(e),
                d1: getErrorName(e),
                d2: getErrorStack(e),
                d3: o,
                d4: u,
                d5: getNetwork(),
                d6: getValueFromStartupParams("appId"),
                fullURL: getFullURL(),
                spm: u,
                spma: a,
                spmb: c
            }, t)
        }
        function getUA() {
            return navigator && navigator.userAgent ? encode(navigator.userAgent.replace(/,/g, "-")) : ""
        }
        function getNetwork() {
            return navigator && navigator.connection && navigator.connection.effectiveType ? encode(navigator.connection.effectiveType) : ""
        }
        function getSpm(e) {
            if (!e)
                return "";
            var t = e.spmAPos || ""
                , r = e.spmBPos || "";
            return t && r ? encode("".concat(t, ".").concat(r)) : ""
        }
        function getErrorName(e) {
            return e ? encode(e.name || "") : ""
        }
        function getErrorMessage(e) {
            return e ? encode(e.message || "") : ""
        }
        function getErrorStack(e) {
            var t = e.stack
                , r = e.message
                , n = e.name
                , o = void 0 === n ? "" : n
                , i = (void 0 === t ? "" : t).replace(void 0 === r ? "" : r, "");
            return (i = i.replace(o, "")) && i.length && i.length > 250 && (i = i.slice(0, 250)),
                encode(i)
        }
        function getFullURL() {
            return location ? encode(location && location.href || "") : ""
        }
        var apUserId = "";
        function yuyanLog(e, t) {
            if (getHttpObj()) {
                var r = ["D-AE", getNewDate(), "", "", "2", "", "", apUserId || getUserId(t), "1000", "102023", "yuyanmonitorl", "2", getSpm(t), "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", getUA(), "", "", "", "", "", "", Object.keys(e).map((function(t) {
                        return "".concat(encode(t), "=").concat(encode(e[t]))
                    }
                )).join("^")]
                    , n = window.AlipayJSBridge;
                if (!apUserId && n && "function" == typeof n.call)
                    try {
                        return void n.call("getUserInfo", (function(e) {
                                r[7] = apUserId = e ? e.userId : "",
                                    sendHttpRequest(r, t)
                            }
                        ))
                    } catch (e) {
                        console && console.warn && console.warn("[Tracker]", e)
                    }
                sendHttpRequest(r)
            }
        }
        function sendHttpRequest(e) {
            var t = "https://collect.alipay.com/yuyan/";
            try {
                var r = getHttpObj();
                r.open("POST", "".concat(t, "?bizType=yuyanmonitorl"), !0),
                    r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                    r.send("data=".concat(e, "&time=").concat((new Date).getTime()))
            } catch (r) {
                try {
                    (new Image).src = "".concat("".concat(t, "?bizType=yuyanmonitorl"), "&data=").concat(e, "&time=").concat((new Date).getTime())
                } catch (e) {
                    console && console.warn && console.warn("[Tracker]", e)
                }
            }
        }
        function getHttpObj() {
            var e = null;
            try {
                e = new XMLHttpRequest
            } catch (t) {
                try {
                    e = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {
                    try {
                        e = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (e) {}
                }
            }
            return e
        }
        function getAppInfo(e) {
            return window ? checkApp(e = e || window.navigator.userAgent) : {
                name: "non-browser"
            }
        }
        function checkApp(e) {
            var t = {
                is: !1,
                name: "",
                version: ""
            };
            try {
                var r = e.match(/AliApp\S+\b\)/gi);
                t.is = /(T-UA)|(TBIOS)|(WindVane)|(AliApp)/i.test(e),
                    t.name = r ? r[0].match(/\(\w+-*\w*/)[0].split("(")[1] : "",
                    t.version = r ? r[0].match(/(\d+\.*)+/gi)[0] : ""
            } catch (e) {}
            return t
        }
        function isLikeAlipayApp(e) {
            var t = getAppInfo(e);
            return ["AF", "AFW", "BK", "AM", "APHK", "KB", "Snail"].indexOf(t.name) > -1
        }
        var detect = {}
            , NA_VERSION = "-1"
            , userAgent = navigator && navigator.userAgent || ""
            , appVersion = navigator && navigator.appVersion || ""
            , vendor = navigator && navigator.vendor || ""
            , re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
        function toString(e) {
            return Object.prototype.toString.call(e)
        }
        function isObject(e) {
            return "[object Object]" === toString(e)
        }
        function isFunction(e) {
            return "[object Function]" === toString(e)
        }
        function each(e, t, r) {
            for (var n = 0, o = e.length; o > n && !1 !== t.call(e, e[n], n); n++)
                ;
        }
        var OS = [["wp", function(e) {
            return -1 !== e.indexOf("windows phone ") ? /\bwindows phone (?:os )?([0-9.]+)/ : -1 !== e.indexOf("xblwp") ? /\bxblwp([0-9.]+)/ : -1 !== e.indexOf("zunewp") ? /\bzunewp([0-9.]+)/ : "windows phone"
        }
        ], ["ios", function(e) {
            return /\bcpu(?: iphone)? os /.test(e) ? /\bcpu(?: iphone)? os ([0-9._]+)/ : -1 !== e.indexOf("iph os ") ? /\biph os ([0-9_]+)/ : /\bios\b/
        }
        ], ["yunos", /\baliyunos ([0-9.]+)/], ["android", /\bandroid[\/\- ]?([0-9.x]+)?/], ["linux", "linux"]]
            , BROWSER = [["qq", /\bm?qqbrowser\/([0-9.]+)/], ["ie", re_msie], ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/], ["uc", function(e) {
            return 0 > e.indexOf("ucbrowser/") ? /\buc\/[0-9]/.test(e) ? /\buc\/([0-9.]+)/ : 0 > e.indexOf("ucweb") ? /\b(?:ucbrowser|uc)\b/ : /\bucweb[\/]?([0-9.]+)?/ : /\bucbrowser\/([0-9.]+)/
        }
        ], ["android", function(e) {
            if (-1 !== e.indexOf("android"))
                return /\bversion\/([0-9.]+(?: beta)?)/
        }
        ], ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//], ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/]];
        function detector(e, t, r) {
            var n = isFunction(t) ? t.call(null, r) : t;
            if (!n)
                return null;
            var o = {
                name: e,
                version: NA_VERSION,
                codename: ""
            };
            "android" === e && (o.type = r.indexOf("Mobi") > -1 ? "phone" : "pad"),
            "ios" === e && (o.type = r.indexOf("iPhone") > -1 ? "phone" : "pad");
            var i = toString(n);
            if (!0 === n)
                return o;
            if ("[object String]" === i) {
                if (-1 !== r.indexOf(n))
                    return o
            } else {
                if (isObject(n))
                    return n.hasOwnProperty("version") && (o.version = n.version),
                        o;
                if (n.exec) {
                    var a = n.exec(r);
                    if (a)
                        return o.version = a.length >= 2 && a[1] ? a[1].replace(/_/g, ".") : NA_VERSION,
                            o
                }
            }
        }
        var na = {
            name: "na",
            version: NA_VERSION
        };
        function init$1(e, t, r, n) {
            var o = na;
            each(t, (function(t) {
                    var r = detector(t[0], t[1], e);
                    if (r)
                        return o = r,
                            !1
                }
            )),
                r.call(n, o.name, o.version)
        }
        var parse = function(e) {
            e = (e || "").toLowerCase();
            var t = {};
            return init$1(e, OS, (function(e, r) {
                    var n = parseFloat(r);
                    t.os = {
                        name: e,
                        version: n,
                        fullVersion: r
                    },
                        t.os[e] = n
                }
            ), t),
                init$1(e, BROWSER, (function(e, r) {
                        var n = parseFloat(r);
                        t.browser = {
                            name: e,
                            version: n,
                            fullVersion: r
                        },
                            t.browser[e] = n
                    }
                ), t),
                t
        };
        detect = parse("".concat(userAgent, " ").concat(appVersion, " ").concat(vendor)),
            detect.parse = parse,
            detect._checkApp = checkApp,
            detect.app = detect._checkApp(userAgent);
        var detect$1 = detect
            , sequenceNumber = {}
            , sequenceEventNumber = {}
            , sequence = null
            , Sequence = function() {
            function e() {
                _classCallCheck$1(this, e)
            }
            return _createClass$1(e, [{
                key: "getEventSequence",
                value: function(e, t) {
                    return sequenceEventNumber[t] || (sequenceEventNumber[t] = {}),
                        sequenceEventNumber[t] && sequenceEventNumber[t][e] ? ++sequenceEventNumber[t][e] : sequenceEventNumber[t] ? (sequenceEventNumber[t][e] = 1,
                            sequenceEventNumber[t][e]) : (sequenceEventNumber[t] = {},
                            sequenceEventNumber[t][e] = 1,
                            sequenceEventNumber[t][e])
                }
            }, {
                key: "getSequence",
                value: function(e) {
                    return sequenceNumber[e] ? ++sequenceNumber[e] : (sequenceNumber[e] = 1,
                        sequenceNumber[e])
                }
            }]),
                e
        }();
        function createSequence() {
            return sequence || (sequence = new Sequence),
                sequence
        }
        var SequenceEvent = createSequence()
            , SEQUENCE_NAME = "__tracert_sequence"
            , SEQUENCE_ID = "__tracert_sequence_id"
            , SEQUENCE_EVENT_NAME = "__tracert_event_sequence"
            , VERSION_NAME = "sdkVersion"
            , requestTypeEnum = {
            http: "http",
            AlipayJSBridge: "AlipayJSBridge"
        };
        Object.freeze(requestTypeEnum);
        var jsApiTypeEnum = {
            autoClick: "autoClick",
            remoteLog: "remoteLog",
            pageMonitor: "pageMonitor",
            reportData: "reportData",
            semLog: "semLog",
            handleUEPEvent: "handleUEPEvent",
            reportUEPData: "reportUEPData"
        };
        function httpSendBefore(e, t) {
            var r = t.v
                , n = void 0 === r ? "" : r
                , o = t._instanceId
                , i = e;
            if (i && i.length) {
                var a = i[0];
                "D-AE" === a && (i[36] = addSequence(i[36], i[9], n, o)),
                "DW-COOKIE" === a && (i[8] = addSequence(i[8], i[3], n, o))
            }
            return i
        }
        function jsApiSendBefore(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , r = arguments.length > 2 ? arguments[2] : void 0
                , n = t
                , o = r.v
                , i = void 0 === o ? "" : o
                , a = r._instanceId
                , s = void 0 === a ? "" : a;
            return e === jsApiTypeEnum.autoClick && (n.param || (n.param = {}),
            n.param.param4 || (n.param.param4 = {}),
                n.param.param4 = addSequence(n.param.param4, "autoClick", i, s)),
            e === jsApiTypeEnum.remoteLog && (n.param4 || (n.param4 = ""),
                n.param4 = addSequence(n.param4, n.actionId || "", i, s)),
            e === jsApiTypeEnum.pageMonitor && (n.param || (n.param = {}),
                n.param = addSequence(n.param, "pageMonitor", i, s)),
            e === jsApiTypeEnum.reportData && (n.spmDetail || (n.spmDetail = {}),
                n.spmDetail = addSequence(n.spmDetail, "reportData", i, s),
                n.spmDetail["".concat(SEQUENCE_EVENT_NAME, "_pageMonitor")] = SequenceEvent.getEventSequence("pageMonitor", s)),
                n
        }
        function addSequence() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , t = arguments.length > 1 ? arguments[1] : void 0
                , r = arguments.length > 2 ? arguments[2] : void 0
                , n = arguments.length > 3 ? arguments[3] : void 0
                , o = "string" == typeof e
                , i = o ? strToObj$1(e) : e;
            return i[VERSION_NAME] = r,
                i[SEQUENCE_ID] = n,
                i[SEQUENCE_NAME] = SequenceEvent.getSequence(n),
                i[SEQUENCE_EVENT_NAME] = SequenceEvent.getEventSequence(t, n),
                o ? objToStr(i) : i
        }
        function request(e) {
            var t = e.tracert
                , r = e.type
                , n = e.jsApiType
                , o = void 0 === n ? "remoteLog" : n
                , i = e.errorHandler;
            if (!t)
                throw Error("request tracert");
            var a = e.data
                , s = void 0 === a ? {} : a
                , c = t.server
                , u = t.taskId
                , l = t.verifyServer;
            switch (r) {
                case requestTypeEnum.http:
                    try {
                        s = httpSendBefore(s, t)
                    } catch (e) {
                        reportError(e, t)
                    }
                    sendHttpRequest$1(c, s, "", t),
                    u && l && sendHttpRequest$1(l, s, u, t);
                    break;
                case requestTypeEnum.AlipayJSBridge:
                    try {
                        s = jsApiSendBefore(o, s, t)
                    } catch (e) {
                        reportError(e, t)
                    }
                    sendAlipayJSBridge(s, o, t, i);
                    break;
                default:
                    sendHttpRequest$1(c, s, u, t)
            }
        }
        function sendHttpRequest$1(e, t, r, n) {
            var o = n.openSendBeacon
                , i = void 0 !== o && o;
            if (e)
                if (!t || t.length && 0 === t.length)
                    reportError(Error("空数据"), n);
                else if (i && supportsSendBeacon()) {
                    var a = getSendValue(t, r)
                        , s = new Blob([a],{
                        type: "application/x-www-form-urlencoded"
                    });
                    navigator.sendBeacon(getHttpSendUrl(e, t, n).url, s)
                } else
                    sendXhrPost(e, t, r, n);
            else
                reportError(Error("请配置Tracert服务接收地址"), n)
        }
        function getSendValue(e, t) {
            return t ? "data=".concat(encode(e.join()), "&time=").concat((new Date).getTime(), "&taskId=").concat(t) : "data=".concat(encode(e.join()), "&time=").concat((new Date).getTime())
        }
        function getHttpSendUrl(e, t, r) {
            var n = r.bizType
                , o = r.spmAPos
                , i = ""
                , a = detect$1.os.name;
            if (a && "na" !== a || (a = "PC"),
            t && t.length) {
                var s = t[0];
                "D-AE" === s && (i = t[9]),
                "DW-COOKIE" === s && (i = t[3])
            }
            return {
                url: "https://collect.alipay.com/dwcookie" === e || "https://loggwpre.alipay.com/dwcookie" === e ? "".concat(e, "?biztype=").concat(n, "&eventid=").concat(i, "&productid=").concat(a, "&spmAPos=").concat(o) : e,
                bizType: n,
                eventid: i,
                productid: a
            }
        }
        function sendXhrPost(e, t, r, n) {
            var o = getHttpObj();
            o && (o.open("POST", getHttpSendUrl(e, t, n).url, !0),
                o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                o.send(getSendValue(t, r)))
        }
        Object.freeze(jsApiTypeEnum);
        var sendXhrGet = function(e, t, r) {
            var n = getHttpObj();
            n ? (n.open("GET", e, !0),
                    n.send(),
                    n.onreadystatechange = function() {
                        4 === n.readyState && (200 !== n.status ? r && r(Error("request fail: status code " + n.status), n) : t && t(n.responseText, n))
                    }
            ) : r && r(Error("create xhr fail"))
        };
        function supportsSendBeacon() {
            return !!(navigator && navigator.sendBeacon && "function" == typeof navigator.sendBeacon && Blob && "function" == typeof Blob)
        }
        function sendAlipayJSBridge(e, t, r, n) {
            try {
                window && window.AlipayJSBridge ? window.AlipayJSBridge.call(t, e, (function(o) {
                        [1, 4].indexOf(o.error) > -1 && (n && n(e, r),
                            reportError(Error("".concat(t || "", " no permission or no exist")), r))
                    }
                )) : my && my.canIUse(t) ? my.call(t, e) : reportError(Error("AlipayJSBridge and my is empty, ".concat(t || "")), r)
            } catch (t) {
                n && n(e, r),
                    reportError(t, r)
            }
        }
        function isAnchor(e) {
            if (!e || "#" === e)
                return !1;
            var t = e.substr(1);
            if ("/" === t[0])
                return !1;
            var r = t.indexOf("?");
            -1 !== r && (t = t.substr(0, r));
            var n = document.getElementById(decodeURI(t));
            return null != n
        }
        function parse$1(e) {
            var t = e.split("//")
                , r = t[0]
                , n = t[1] || ""
                , o = n.split("/")[0]
                , i = o.split(":")
                , a = i[0]
                , s = i[1] || ""
                , c = n.replace(o, "").split("#")
                , u = c[0]
                , l = c[1] || ""
                , p = l ? "#".concat(l) : null
                , f = u.split("?")
                , d = f[0]
                , m = f[1] || ""
                , g = {
                protocol: r,
                slashes: !0,
                auth: null,
                host: o,
                port: s || null,
                hostname: a,
                hash: p,
                search: m ? "?".concat(m) : null,
                query: m || null,
                pathname: d,
                path: u,
                href: e,
                hashIsAnchor: isAnchor(p),
                format: function() {
                    return "".concat(g.protocol, "//").concat(g.host).concat(g.path).concat(g.hash || "")
                }
            };
            return g
        }
        var url = {
            parse: parse$1,
            isAnchor: isAnchor
        };
        function getAutoSpmB() {
            if (!location || "string" != typeof location.href)
                return "";
            var e = parse$1(location.href)
                , t = e.hash
                , r = e.pathname;
            return t && !1 === e.hashIsAnchor && (r = t.substring(1).split("?")[0]),
            0 !== (r = r.replace(/\./g, "_")).indexOf("/") && (r = "/".concat(r)),
                r
        }
        function isAutoSpmB(e) {
            return "string" == typeof e && (0 === e.indexOf("/") && -1 === e.indexOf("."))
        }
        function isAutoLog(e, t) {
            return !(!t || "auto" !== t.combineType) || "string" == typeof e && isAutoSpmB(e.split(".")[1])
        }
        var uep$1 = {
            isAutoSpmB: isAutoSpmB,
            isAutoLog: isAutoLog,
            getAutoSpmB: getAutoSpmB
        }
            , INPUT_TYPE = {
            NONE: "",
            TEXT: "text",
            SELECT: "select",
            TEXTAREA: "textarea",
            CHECKBOX: "checkbox",
            RADIO: "radio"
        }
            , TAG_NAME$1 = {
            INPUT: "INPUT",
            SELECT: "SELECT",
            TEXTAREA: "TEXTAREA",
            LABEL: "LABEL"
        }
            , INPUT_ELEMENT_TYPES$1 = {
            TEXT: "text",
            CHECKBOX: "checkbox",
            RADIO: "radio",
            PASSWORD: "password",
            URL: "url",
            EMAIL: "email",
            TEL: "tel",
            FILE: "file",
            SEARCH: "search",
            NUMBER: "number",
            DATETIME: "datetime",
            DATE: "date",
            MONTH: "month",
            WEEK: "week",
            DATETIME_LOCAL: "datetime-local",
            RANGE: "range"
        }
            , COMBINE_TYPE = {
            AUTO: "auto",
            MIX: "mix",
            MANUAL: "manual"
        }
            , EVENT_TYPE = {
            CLICK: "clicked",
            EXPOSURE: "exposure",
            INPUT: "input",
            SCROLL: "scroll",
            TOUCH: "touch"
        }
            , EVENT_TYPES = [EVENT_TYPE.CLICK, EVENT_TYPE.EXPOSURE, EVENT_TYPE.INPUT, EVENT_TYPE.SCROLL, EVENT_TYPE.TOUCH]
            , APP_TYPE = {
            AP: "alipay",
            TB: "taobao",
            FM: "idlefishx",
            TM: "tmall",
            QN: "qianniu",
            LX: "fliggy",
            KB: "koubei",
            AM: "koubeimerchant",
            AFW: "afwealth",
            ELMC: "elemec"
        }
            , index$1 = Object.freeze({
            __proto__: null,
            INPUT_TYPE: INPUT_TYPE,
            TAG_NAME: TAG_NAME$1,
            INPUT_ELEMENT_TYPES: INPUT_ELEMENT_TYPES$1,
            COMBINE_TYPE: COMBINE_TYPE,
            EVENT_TYPE: EVENT_TYPE,
            EVENT_TYPES: EVENT_TYPES,
            APP_TYPE: APP_TYPE
        })
            , notInAlipay = isLikeAlipayApp()
            , i$1 = 1
            , FLUSH_TIMER = 0
            , ELEMENT_ID$1 = "__uepElementId"
            , eventArray = []
            , combineEventArray = []
            , PAYLOAD_LIMIT_SIZE = 10
            , FLUSH_TIMEOUT = 240;
        function remoteLog(e, t) {
            request({
                tracert: t,
                type: requestTypeEnum.AlipayJSBridge,
                data: e,
                jsApiType: jsApiTypeEnum.remoteLog
            })
        }
        function uepToRemote(e, t) {
            e.combineEventArray && e.combineEventArray.forEach((function(r) {
                    delete r.uep,
                        r.context = e.context,
                        remoteLog(r, t)
                }
            ))
        }
        var initPageListener = !1;
        function listenerPagePause() {
            document && !initPageListener && (addEvent("pause", document, (function(e) {
                    window.Tracert && flushLogPayLoad(!0, window.Tracert)
                }
            ), !1),
                initPageListener = !0)
        }
        function flushLogPayLoad() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                , t = arguments.length > 1 ? arguments[1] : void 0;
            if (e || eventArray.length + combineEventArray.length >= PAYLOAD_LIMIT_SIZE) {
                if (FLUSH_TIMER && (clearTimeout(FLUSH_TIMER),
                    FLUSH_TIMER = null),
                0 !== eventArray.length || 0 !== combineEventArray.length) {
                    var r = {};
                    eventArray.length && (r.eventArray = [].concat(eventArray)),
                    combineEventArray.length && (r.combineEventArray = [].concat(combineEventArray)),
                        eventArray.length = 0,
                        combineEventArray.length = 0,
                        notInAlipay ? uepToRemote(r, t) : request({
                            tracert: t,
                            type: requestTypeEnum.AlipayJSBridge,
                            data: r,
                            jsApiType: jsApiTypeEnum.handleUEPEvent,
                            errorHandler: uepToRemote
                        })
                }
            } else
                FLUSH_TIMER || (FLUSH_TIMER = setTimeout((function() {
                        FLUSH_TIMER = null,
                            flushLogPayLoad(!0, t)
                    }
                ), FLUSH_TIMEOUT))
        }
        function getTargetCode(e) {
            return e && "string" != typeof e && e.getAttribute && e.setAttribute ? (e.getAttribute(ELEMENT_ID$1) || e.setAttribute(ELEMENT_ID$1, "".concat(i$1++)),
                e.getAttribute(ELEMENT_ID$1)) : ""
        }
        function getExpoParams(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , r = arguments.length > 2 ? arguments[2] : void 0
                , n = t || {}
                , o = n.percent
                , i = n.spmId
                , a = {
                state: (null == r ? void 0 : r.expoState) || "end",
                percent: o || 0,
                text: ""
            };
            return "string" == typeof i && 4 === i.split(".").length && (a.text = getDomText(e)),
                {
                    paramsByEvent: a
                }
        }
        function isClickable(e) {
            return !e || !e.hasAttribute || !e.hasAttribute("disabled")
        }
        function getClickParams(e) {
            if (!e)
                return null;
            var t = e.target || e.srcElement
                , r = document.documentElement.scrollHeight || 0
                , n = document.documentElement.scrollWidth || 0
                , o = {
                width: null == t ? void 0 : t.clientWidth,
                height: null == t ? void 0 : t.clientHeight
            };
            return t && "function" == typeof t.getBoundingClientRect && (o = t.getBoundingClientRect()),
                {
                    paramsByEvent: {
                        text: getDomText(t),
                        xPos: ~~e.pageX,
                        yPos: ~~e.pageY,
                        clickable: isClickable(t)
                    },
                    extParamsByEvent: {
                        scrollWidth: n,
                        scrollHeight: r,
                        width: o.width || 0,
                        height: o.height || 0
                    }
                }
        }
        function getParamsByEvent(e, t, r) {
            switch (e.actionId) {
                case "exposure":
                    return getExpoParams(t, e, r);
                case "clicked":
                    return getClickParams(t)
            }
            return e
        }
        function getSpmId(e, t) {
            var r = getSpmDPos$1(e)
                , n = "";
            if (!t.spmAPos || !t.spmBPos || !r)
                return "";
            var o = r.split(".")
                , i = !0;
            if (1 === o.length)
                o.unshift(getSpmCPos$1(e));
            for (var a = 0; 2 > a; a++)
                if (!o[a]) {
                    i = !1;
                    break
                }
            i && (n = [t.spmAPos, t.spmBPos].concat(o).join("."));
            return n
        }
        function getScm(e) {
            var t = getContentParam$1(e);
            return t && t.param5 ? t.newScm || strToObj$1(t.param5).scm : ""
        }
        function throttleLog(e) {
            var t = e.params
                , r = e.event
                , n = e.context
                , o = e.combineType
                , i = e.extParams
                , a = void 0 === i ? {} : i
                , s = r ? r.target || r.srcElement || r : null
                , c = getSpmId(s, n)
                , u = c && getDomParam$1(s)
                , l = _objectSpread2$1({
                timestamp: Date.now(),
                spm: c,
                scm: c && getScm(s),
                params: _objectSpread2$1(_objectSpread2$1({}, u), a),
                combineType: o,
                xpath: getXPath$1(s),
                selector: getCssSelector(s),
                target: getTargetCode(s),
                sdkParams: {
                    sdkVersion: n.v
                }
            }, t);
            getValueFromStartupParams("uepCombineMode") || delete l.combineType,
                eventArray.push(l),
            initPageListener || listenerPagePause(),
                flushLogPayLoad(!1, n)
        }
        function log(e) {
            var t = e.params
                , r = void 0 === t ? {} : t
                , n = e.context
                , o = e.currentConfig
                , i = void 0 === o ? {} : o;
            if (-1 !== EVENT_TYPES.indexOf(r.actionId)) {
                var a, s = r.actionId, c = void 0 === s ? r.type : s, u = i.event, l = void 0 === u ? {} : u, p = i.combineType, f = i.bizType;
                l.nodeName || l.nodeType ? a = l : l.type && (a = l.target || "");
                var d = r.param4 ? strToObj$1(r.param4) : null
                    , m = getParamsByEvent(r, l, i)
                    , g = m.paramsByEvent
                    , h = m.extParamsByEvent
                    , v = void 0 === h ? {} : h
                    , y = _objectSpread2$1(_objectSpread2$1({}, void 0 === g ? {} : g), {}, {
                    spm: r.spmId,
                    scm: r.newScm || r.scm,
                    type: c === EVENT_TYPE.CLICK ? "click" : c,
                    timestamp: r.eventTime,
                    xpath: getXPath$1(a),
                    selector: getCssSelector(a),
                    target: getTargetCode(a),
                    params: _objectSpread2$1(_objectSpread2$1({}, d), v),
                    bizCode: f || r.bizType,
                    combineType: p || "manual",
                    sdkParams: {
                        sdkVersion: n.v,
                        dpr: window.devicePixelRatio || 1
                    }
                });
                c === EVENT_TYPE.EXPOSURE && (y.sdkParams.mmaExpo = !0 === n.enableIntersectionObserver),
                    delete r.newScm;
                var b = getValueFromStartupParams("uepCombineMode");
                b || delete y.combineType,
                    b && p !== COMBINE_TYPE.AUTO ? combineEventArray.push(_objectSpread2$1(_objectSpread2$1({}, r), {}, {
                        uep: y
                    })) : eventArray.push(y),
                initPageListener || listenerPagePause(),
                    flushLogPayLoad(!1, n)
            } else
                remoteLog(r, n)
        }
        function uepToRemote$1(e, t) {
            delete e.uep,
                request({
                    tracert: t,
                    type: requestTypeEnum.AlipayJSBridge,
                    data: e,
                    jsApiType: jsApiTypeEnum.reportData
                })
        }
        function logPv(e, t) {
            t && t.debug && console.log(e),
                isLikeAlipayApp() ? uepToRemote$1(e, t) : request({
                    tracert: t,
                    type: requestTypeEnum.AlipayJSBridge,
                    data: e,
                    jsApiType: jsApiTypeEnum.reportUEPData,
                    errorHandler: uepToRemote$1
                })
        }
        function extend$1() {
            for (var e = 0, t = {}; arguments.length > e; e++) {
                var r = arguments[e];
                for (var n in r)
                    t[n] = r[n]
            }
            return t
        }
        function init$1$1(e) {
            function t(r, n, o) {
                var i;
                if ("undefined" != typeof document) {
                    if (arguments.length > 1) {
                        if ("number" == typeof (o = extend$1({
                            path: "/"
                        }, t.defaults, o)).expires) {
                            var a = new Date;
                            a.setMilliseconds(a.getMilliseconds() + 864e5 * o.expires),
                                o.expires = a
                        }
                        o.expires = o.expires ? o.expires.toUTCString() : "";
                        try {
                            i = JSON.stringify(n),
                            /^[\{\[]/.test(i) && (n = i)
                        } catch (e) {}
                        n = e.write ? e.write(n, r) : encodeURIComponent(n + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                            r = (r = (r = encodeURIComponent(r + "")).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                        var s = "";
                        for (var c in o)
                            o[c] && (s += "; " + c,
                            !0 !== o[c] && (s += "=" + o[c]));
                        return document.cookie = r + "=" + n + s
                    }
                    r || (i = {});
                    for (var u = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, p = 0; u.length > p; p++) {
                        var f = u[p].split("=")
                            , d = f.slice(1).join("=");
                        this.json || '"' !== d.charAt(0) || (d = d.slice(1, -1));
                        try {
                            var m = f[0].replace(l, decodeURIComponent);
                            if (d = e.read ? e.read(d, m) : e(d, m) || d.replace(l, decodeURIComponent),
                                this.json)
                                try {
                                    d = JSON.parse(d)
                                } catch (e) {}
                            if (r === m) {
                                i = d;
                                break
                            }
                            r || (i[m] = d)
                        } catch (e) {}
                    }
                    return i
                }
            }
            return t.set = t,
                t.get = function(e) {
                    return t.call(t, e)
                }
                ,
                t.getJSON = function() {
                    return t.apply({
                        json: !0
                    }, [].slice.call(arguments))
                }
                ,
                t.defaults = {},
                t.remove = function(e, r) {
                    t(e, "", extend$1(r, {
                        expires: -1
                    }))
                }
                ,
                t.withConverter = init$1$1,
                t
        }
        var Cookies$1 = init$1$1((function() {}
        ));
        function get$1(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , r = void 0;
            try {
                r = window.localStorage && window.localStorage.getItem(e) || Cookies$1.get(e, t),
                Cookies$1.get(e, t) && window.localStorage && (window.localStorage.setItem(e, r),
                    Cookies$1.remove(e, t))
            } catch (e) {}
            return r
        }
        function set$1(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            try {
                if (t && t.length >= 400 && (r.cookie || !window.localStorage))
                    return void (console && console.warn && console.warn("Tracert cookie set too long"));
                if (window.localStorage)
                    return void window.localStorage.setItem(e, t)
            } catch (e) {}
            Cookies$1.set(e, t, r)
        }
        function remove$1(e, t) {
            try {
                window.localStorage && window.localStorage.removeItem(e)
            } catch (e) {}
            Cookies$1.remove(e, t)
        }
        var TemporaryStorage$1 = function() {
            function e() {
                _classCallCheck$1(this, e)
            }
            return _createClass$1(e, [{
                key: "set",
                value: function() {
                    var e = [].slice.call(arguments);
                    2 > e.length ? this._set(e) : this._set(_defineProperty$2({}, e[0], e[1]), e[2] || {})
                }
            }, {
                key: "get",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        , r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                        , n = "".concat(cookiesPrefix$1, "_").concat(e)
                        , o = get$1(n, t);
                    return r && remove$1(n),
                        o
                }
            }, {
                key: "_set",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (e && 0 !== Object.keys(e).length)
                        for (var r in e)
                            if (e.hasOwnProperty(r)) {
                                var n = "".concat(cookiesPrefix$1, "_").concat(r);
                                set$1(n, e[r], t)
                            }
                }
            }]),
                e
        }()
            , temporary_storage$1 = new TemporaryStorage$1;
        function uuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16)
                }
            ))
        }
        var CrossIframe$1 = function() {
            function e() {
                _classCallCheck$1(this, e),
                    this._iframe = null
            }
            return _createClass$1(e, [{
                key: "initIframe",
                value: function() {
                    if (this._iframe)
                        return this._iframe;
                    var e = document.createElement("iframe");
                    e.style.width = "1px",
                        e.style.height = "1px",
                        e.style.position = "absolute",
                        e.style.left = "-100px",
                        e.style.bottom = "-100px",
                        e.style.width = "-100px",
                        e.setAttribute("src", "https://tracert.alipay.com/cross.html"),
                        e.onload = function() {
                            e.style.display = "none"
                        }
                    ;
                    try {
                        document.body.appendChild(e)
                    } catch (e) {}
                    return this._iframe = e,
                        e
                }
            }]),
                e
        }()
            , cross_iframe$1 = new CrossIframe$1;
        function isWechat() {
            return "undefined" != typeof WeixinJSBridge || "undefined" != typeof QQJSBridge || !(!window.navigator || !(window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1 || window.navigator.userAgent.toLowerCase().indexOf("qq") > -1 || window.navigator.userAgent.toLowerCase().indexOf("toutiaomicroapp") > -1 || void 0 !== window.navigator.wxuserAgent))
        }
        function ownKeys$2(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$2(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$2(Object(r), !0).forEach((function(t) {
                        _defineProperty$3(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$2(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$3(e) {
            return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$3(e)
        }
        function _classCallCheck$2(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties$2(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass$2(e, t, r) {
            return t && _defineProperties$2(e.prototype, t),
            r && _defineProperties$2(e, r),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                e
        }
        function _defineProperty$3(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        function _toArray(e) {
            return _arrayWithHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableRest()
        }
        function _toConsumableArray(e) {
            return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
        }
        function _arrayWithoutHoles(e) {
            if (Array.isArray(e))
                return _arrayLikeToArray(e)
        }
        function _arrayWithHoles(e) {
            if (Array.isArray(e))
                return e
        }
        function _iterableToArray(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
        }
        function _unsupportedIterableToArray(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return _arrayLikeToArray(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e, t) : void 0
            }
        }
        function _arrayLikeToArray(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = Array(t); t > r; r++)
                n[r] = e[r];
            return n
        }
        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function isObject$1(e) {
            var t = _typeof$1(e);
            return null != e && ("object" == t || "function" == t)
        }
        var freeGlobal = "object" == ("undefined" == typeof global ? "undefined" : _typeof$1(global)) && global && global.Object === Object && global
            , freeSelf = "object" == ("undefined" == typeof self ? "undefined" : _typeof$1(self)) && self && self.Object === Object && self
            , root = freeGlobal || freeSelf || Function("return this")()
            , now = function() {
            return root.Date.now()
        }
            , reWhitespace = /\s/;
        function trimmedEndIndex(e) {
            for (var t = e.length; t-- && reWhitespace.test(e.charAt(t)); )
                ;
            return t
        }
        var reTrimStart = /^\s+/;
        function baseTrim(e) {
            return e ? e.slice(0, trimmedEndIndex(e) + 1).replace(reTrimStart, "") : e
        }
        var Symbol$1 = root.Symbol
            , objectProto = Object.prototype
            , hasOwnProperty = objectProto.hasOwnProperty
            , nativeObjectToString = objectProto.toString
            , symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
        function getRawTag(e) {
            var t = hasOwnProperty.call(e, symToStringTag)
                , r = e[symToStringTag];
            try {
                e[symToStringTag] = void 0;
                var n = !0
            } catch (e) {}
            var o = nativeObjectToString.call(e);
            return n && (t ? e[symToStringTag] = r : delete e[symToStringTag]),
                o
        }
        var objectProto$1 = Object.prototype
            , nativeObjectToString$1 = objectProto$1.toString;
        function objectToString(e) {
            return nativeObjectToString$1.call(e)
        }
        var nullTag = "[object Null]"
            , undefinedTag = "[object Undefined]"
            , symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
        function baseGetTag(e) {
            return null == e ? void 0 === e ? undefinedTag : nullTag : symToStringTag$1 && symToStringTag$1 in Object(e) ? getRawTag(e) : objectToString(e)
        }
        function isObjectLike(e) {
            return null != e && "object" == _typeof$1(e)
        }
        var symbolTag = "[object Symbol]";
        function isSymbol(e) {
            return "symbol" == _typeof$1(e) || isObjectLike(e) && baseGetTag(e) == symbolTag
        }
        var NAN = NaN
            , reIsBadHex = /^[-+]0x[0-9a-f]+$/i
            , reIsBinary = /^0b[01]+$/i
            , reIsOctal = /^0o[0-7]+$/i
            , freeParseInt = parseInt;
        function toNumber(e) {
            if ("number" == typeof e)
                return e;
            if (isSymbol(e))
                return NAN;
            if (isObject$1(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = isObject$1(t) ? t + "" : t
            }
            if ("string" != typeof e)
                return 0 === e ? e : +e;
            e = baseTrim(e);
            var r = reIsBinary.test(e);
            return r || reIsOctal.test(e) ? freeParseInt(e.slice(2), r ? 2 : 8) : reIsBadHex.test(e) ? NAN : +e
        }
        var FUNC_ERROR_TEXT = "Expected a function"
            , nativeMax = Math.max
            , nativeMin = Math.min;
        function debounce$1(e, t, r) {
            var n, o, i, a, s, c, u = 0, l = !1, p = !1, f = !0;
            if ("function" != typeof e)
                throw new TypeError(FUNC_ERROR_TEXT);
            function d(t) {
                var r = n
                    , i = o;
                return n = o = void 0,
                    u = t,
                    a = e.apply(i, r)
            }
            function m(e) {
                return u = e,
                    s = setTimeout(h, t),
                    l ? d(e) : a
            }
            function g(e) {
                var r = e - c;
                return void 0 === c || r >= t || 0 > r || p && e - u >= i
            }
            function h() {
                var e = now();
                if (g(e))
                    return v(e);
                s = setTimeout(h, function(e) {
                    var r = t - (e - c);
                    return p ? nativeMin(r, i - (e - u)) : r
                }(e))
            }
            function v(e) {
                return s = void 0,
                    f && n ? d(e) : (n = o = void 0,
                        a)
            }
            function y() {
                var e = now()
                    , r = g(e);
                if (n = arguments,
                    o = this,
                    c = e,
                    r) {
                    if (void 0 === s)
                        return m(c);
                    if (p)
                        return clearTimeout(s),
                            s = setTimeout(h, t),
                            d(c)
                }
                return void 0 === s && (s = setTimeout(h, t)),
                    a
            }
            return t = toNumber(t) || 0,
            isObject$1(r) && (l = !!r.leading,
                i = (p = "maxWait"in r) ? nativeMax(toNumber(r.maxWait) || 0, t) : i,
                f = "trailing"in r ? !!r.trailing : f),
                y.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                        u = 0,
                        n = c = o = s = void 0
                }
                ,
                y.flush = function() {
                    return void 0 === s ? a : v(now())
                }
                ,
                y
        }
        var FUNC_ERROR_TEXT$1 = "Expected a function";
        function throttle$1(e, t, r) {
            var n = !0
                , o = !0;
            if ("function" != typeof e)
                throw new TypeError(FUNC_ERROR_TEXT$1);
            return isObject$1(r) && (n = "leading"in r ? !!r.leading : n,
                o = "trailing"in r ? !!r.trailing : o),
                debounce$1(e, t, {
                    leading: n,
                    maxWait: t,
                    trailing: o
                })
        }
        var doc = document
            , deprecated$1 = function(e) {
            console && console.warn && console.warn("Tracert deprecated：".concat(e))
        }
            , Core = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                _classCallCheck$2(this, e);
                var r = {
                    container: window.document,
                    autoLogPv: !0,
                    ifRouterNeedPv: !1,
                    eventType: "click",
                    autoExpo: !1,
                    bizType: "H5behavior",
                    state: "",
                    name: "",
                    logLevel: "2",
                    mdata: {},
                    seedIdPrefix: "",
                    seedIdSuffix: "",
                    spmAPos: "",
                    spmBPos: "",
                    bizScenario: getValue("bizScenario") || "",
                    paramPrefix: "",
                    debug: !1,
                    server: "",
                    taskId: "",
                    verifyServer: "",
                    lastClkSpm: "",
                    url: location.href.split(/\?|#|;jsessionid=/)[0],
                    referSPM: "",
                    srcSpm: "",
                    sessionIdKey: "tracert-session-key",
                    seedIdCfg: {
                        pageSeedId: "H5_MTRACKER_AP_PAGE",
                        clkSeedId: "H5_MTRACKER_AP_CLK",
                        calcSeedId: "H5_MTRACKER_AP_CALC",
                        expoSeedId: "H5_MTRACKER_AP_EXPO",
                        syslogSeedId: "H5_MTRACKER_AP_SYSLOG"
                    },
                    _plugins: [],
                    platformType: "",
                    ready: !1,
                    apiCashList: [],
                    timeMap: {},
                    expoFixedDom: !1,
                    expoOnce: !1,
                    _wap_intervalEx: 400,
                    _wap_interval: 300,
                    _wap_mgObjIndex: 0,
                    _wap_exObjIndex: 0,
                    _wap_mgTdObjIndex: 0,
                    _expoMergeItvObj: 0,
                    hasExpoMerge: !1,
                    fmtedExObjArr: [],
                    fmtedExObj: {},
                    fmtedExOptions: {},
                    cacheExObjArr: [],
                    cacheMrExObjArr: [],
                    expotTimeout: 300,
                    expoObj: {},
                    expoType: function(e) {
                        return ownAddEventListener("scroll", doc, throttle$1(e, 300, {
                            leading: !1,
                            trailing: !0
                        }))
                    },
                    expoSection: [-.3, .3],
                    _beforeEvObj: {
                        logPv: [],
                        click: [],
                        expo: [],
                        set: [],
                        send: [],
                        autoClick: [],
                        autoExpo: []
                    },
                    _afterEvObj: {
                        start: [],
                        logPv: [],
                        click: [],
                        expo: [],
                        set: []
                    },
                    _sideEffects: [],
                    _pluginLoadCnt: 0,
                    sysInfo: {},
                    v: "",
                    _instanceId: uuid()
                };
                objectAssign(r, t),
                    objectAssign(this, r);
                var n = window.TracertCmdCache;
                if (n && n.length)
                    for (var o = 0; n.length > o; o++) {
                        var i = [].slice.call(n[o])
                            , a = _toArray(i)
                            , s = a[0]
                            , c = a.slice(1);
                        this.call.apply(this, [s].concat(_toConsumableArray(c)))
                    }
                this._start()
            }
            return _createClass$2(e, [{
                key: "before",
                value: function(e, t) {
                    var r = this._beforeEvObj[e];
                    if (!r)
                        throw Error("目标方法不支持该事件");
                    if ("function" != typeof t)
                        throw Error("监听器不是函数");
                    r.push(t)
                }
            }, {
                key: "_runBeforeFns",
                value: function(e, t) {
                    var r = this._beforeEvObj[e] || [];
                    if (!r || !r.length)
                        return !0;
                    for (var n = 0; r.length > n; n++) {
                        var o = !0;
                        try {
                            o = r[n].call(this, t)
                        } catch (e) {
                            reportError(e, this)
                        }
                        if (!1 === o)
                            return console && console.debug && console.debug("Tracert before fns: ".concat(e, " stop propagation")),
                                !1
                    }
                    return !0
                }
            }, {
                key: "after",
                value: function(e, t) {
                    var r = this._afterEvObj[e];
                    if (!r)
                        throw Error("目标方法不支持该事件");
                    if ("function" != typeof t)
                        throw Error("监听器不是函数");
                    "start" === e && this.ready ? t() : r.push(t)
                }
            }, {
                key: "_runAfterFns",
                value: function(e, t) {
                    var r = this._afterEvObj[e] || [];
                    if (r && r.length)
                        for (var n = 0; r.length > n; n++)
                            r[n].call(this, t)
                }
            }, {
                key: "init",
                value: function() {}
            }, {
                key: "load",
                value: function(e) {
                    load(e)
                }
            }, {
                key: "onReady",
                value: function(e) {
                    this.ready ? e && e() : this.container.addEventListener("TracertOnReady", (function() {
                            e && e()
                        }
                    ))
                }
            }, {
                key: "_start",
                value: function() {
                    var e = this
                        , t = function() {
                        e.load((function() {
                                if (!e.ready) {
                                    if (e.get("_isMain")) {
                                        var t = getMetaSpm(null, e.container);
                                        t.spmAPos = e.spmAPos || t.spmAPos,
                                        e.spmBPos || (t.spmBPos = getSpmBPos$1()),
                                            e.set(t)
                                    }
                                    e.ready = !0;
                                    for (var r = 0; e.apiCashList.length > r; r++) {
                                        e.call.apply(e, e.apiCashList[r])
                                    }
                                    e._runAfterFns("start"),
                                        e.apiCashList = []
                                }
                            }
                        ))
                    };
                    this.pluginReady && this.started ? t() : (this.container.addEventListener("TracertPluginReady", (function(r) {
                            e.started && e._instanceId === r._instanceId && t()
                        }
                    )),
                        this.container.addEventListener("TracertStart", (function(r) {
                                e.pluginReady && e._instanceId === r._instanceId && t()
                            }
                        )))
                }
            }, {
                key: "start",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.run(e)
                }
            }, {
                key: "run",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.set(_objectSpread2$2(_objectSpread2$2({}, e), {}, {
                        started: !0
                    }));
                    var t = document.createEvent("HTMLEvents");
                    t._isMain = !!this._isMain,
                        t._instanceId = this._instanceId,
                        t.initEvent("TracertStart", !0, !0),
                        this.container.dispatchEvent(t),
                    this.autoLogPv && this.call("logPv", {
                        combineType: index$1.COMBINE_TYPE.MIX
                    })
                }
            }, {
                key: "addSideEffects",
                value: function() {
                    var e = [].slice.call(arguments);
                    "function" == typeof e[0] && -1 === this._sideEffects.indexOf(e) && this._sideEffects.push(e)
                }
            }, {
                key: "clearSideEffects",
                value: function() {
                    if (!this._sideEffects || !this._sideEffects.length)
                        return !0;
                    for (var e = 0; this._sideEffects.length > e; e++) {
                        var t = this._sideEffects[e]
                            , r = t.slice(1);
                        "function" == typeof t[0] && t[0].apply(this, r)
                    }
                    return this._sideEffects.length = 0,
                        !0
                }
            }, {
                key: "loadPlugins",
                value: function(e) {
                    if (e && e.length) {
                        this._plugins = e;
                        for (var t = 0; e.length > t; t++) {
                            this.loadPlugin(e[t])
                        }
                    }
                }
            }, {
                key: "loadPlugin",
                value: function(e) {
                    var t = this;
                    e && ((window["tracert".concat(e)] && "function" == typeof window["tracert".concat(e)] || "function" == typeof e) && ("function" == typeof e ? e : window["tracert".concat(e)])(this, (function() {
                            if (t._pluginLoadCnt++,
                            t._pluginLoadCnt === t._plugins.length) {
                                t.set({
                                    pluginReady: !0
                                });
                                var e = document.createEvent("HTMLEvents");
                                e._isMain = !!t._isMain,
                                    e._instanceId = t._instanceId,
                                    e.initEvent("TracertPluginReady", !0, !0),
                                    t.container.dispatchEvent(e)
                            }
                        }
                    )))
                }
            }, {
                key: "call",
                value: function() {
                    var e, t = [].slice.call(arguments);
                    if (!t[0] || "run" !== t[0] && "start" !== t[0] || this.set({
                        started: !0
                    }),
                        this.ready) {
                        if (!this[t[0]] || "function" != typeof this[t[0]])
                            return console.warn("未找到方法：".concat(t[0])),
                                null;
                        var r = t.slice(1);
                        r = this.optionsHandle(r),
                            e = this[t[0]].apply(this, r)
                    } else
                        this.apiCashList.push(t);
                    return e
                }
            }, {
                key: "optionsHandle",
                value: function(e) {
                    return e && e.length ? (e.forEach((function(e) {
                            var t = e;
                            t && (t.spmid && (t.spmId = t.spmid),
                            t.seedid && (t.seedId = t.seedid),
                            t.ucid && (t.ucId = t.ucid))
                        }
                    )),
                        e) : e
                }
            }, {
                key: "get",
                value: function(e) {
                    return this[e]
                }
            }, {
                key: "set",
                value: function() {
                    var e = this
                        , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                        , r = t;
                    this._runBeforeFns("set", r),
                    r.eventName && objectAssign(r, {
                        eventType: r.eventName
                    }),
                    "object" === _typeof$3(r.mdata) && (r.mdata = _objectSpread2$2(_objectSpread2$2({}, this.mdata), r.mdata));
                    for (var n = {}, o = Object.keys(r), i = 0; o.length > i; i++) {
                        var a = o[i];
                        r[a]instanceof Function ? function() {
                            var t = r[a];
                            n[a] = function() {
                                try {
                                    for (var r = arguments.length, n = Array(r), o = 0; r > o; o++)
                                        n[o] = arguments[o];
                                    return t.apply(e, n)
                                } catch (t) {
                                    reportError(t, e)
                                }
                            }
                        }() : n[a] = r[a]
                    }
                    objectAssign(this, n),
                        this._runAfterFns("set", r)
                }
            }, {
                key: "getSysInfo",
                value: function(e) {
                    return this.sysInfo[e]
                }
            }, {
                key: "setSysInfo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                        , t = e;
                    objectAssign(this.sysInfo, t)
                }
            }, {
                key: "config",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    deprecated$1("config 已废弃！请使用 set 方法"),
                        this.set(e)
                }
            }, {
                key: "remoteLog",
                value: function() {}
            }, {
                key: "logPv",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                        , t = this._runBeforeFns("logPv", e);
                    t && (this._logPv(e),
                        this._runAfterFns("logPv", e))
                }
            }, {
                key: "_logPv",
                value: function() {}
            }, {
                key: "report",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                        , t = e.params
                        , r = e.spmId;
                    if (r) {
                        var n = r.split(".")
                            , o = n[0]
                            , i = n[1];
                        o && i && this.set({
                            spmAPos: o,
                            spmBPos: i
                        })
                    }
                    "object" === _typeof$3(t) && this.set({
                        mdata: _objectSpread2$2(_objectSpread2$2({}, this.mdata), t)
                    }),
                        this.set({
                            _calledLogPv: !!r
                        }),
                        this.call("logPv")
                }
            }, {
                key: "pageState",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    this.set({
                        state: e
                    }),
                        this.call("logPv")
                }
            }, {
                key: "pageName",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    deprecated$1("已废弃"),
                        this.set({
                            name: e
                        })
                }
            }, {
                key: "setPageState",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    this.call("pageState", e)
                }
            }, {
                key: "time",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                        , t = "".concat(e)
                        , r = this.timeMap;
                    t && !r[t] && (r[t] = new Date - 0)
                }
            }, {
                key: "timeEnd",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                        , t = "".concat(e)
                        , r = this.timeMap;
                    if (!t || !r[t])
                        return "";
                    var n = r[t]
                        , o = new Date - 0 - n;
                    return delete r[t],
                        o
                }
            }, {
                key: "_goRemotelog",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (e.seedId || e.spmId) {
                        var t = e.spmId || e.spmid || ""
                            , r = t.split(".")
                            , n = r.length
                            , o = this.spmAPos
                            , i = this.spmBPos;
                        if (o && i)
                            switch (n) {
                                case 1:
                                case 2:
                                    if ("" === t)
                                        break;
                                    if (0 !== t.indexOf("c"))
                                        break;
                                    t = [o, i, t].join(".")
                            }
                        var a = {
                            ucId: e.ucId,
                            seedId: e.seedId,
                            spmId: t,
                            actionId: e.actionId,
                            logLevel: e.logLevel || this.logLevel,
                            param4: e.mdata || {}
                        };
                        if (e.type && (a.type = e.type),
                        e.params && "object" === _typeof$3(e.params))
                            if (e.params.length)
                                objectAssign(a, {
                                    param1: e.params[0] || "",
                                    param2: e.params[1] || "",
                                    param3: e.params[2] || ""
                                });
                            else {
                                var s = e.mdata || {};
                                objectAssign(s, e.params),
                                    objectAssign(a.param4, s)
                            }
                        if (e.timeKey) {
                            var c = this.call("timeEnd", e.timeKey);
                            c && (a.param4.consume = c)
                        }
                        this.call("remoteLog", a)
                    } else
                        console.warn("请填入埋点seedId或spmId")
                }
            }, {
                key: "info",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._goRemotelog(e)
                }
            }, {
                key: "error",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    objectAssign(e, {
                        type: "error",
                        actionId: "exception"
                    }),
                        this._goRemotelog(e)
                }
            }, {
                key: "click",
                value: function() {
                    var e = this
                        , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                        , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                        , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    o.combineType = o.combineType || "manual";
                    var i = {
                        spmId: t,
                        extra: r,
                        options: n,
                        currentConfig: o
                    }
                        , a = this._runBeforeFns("click", i);
                    if (a) {
                        var s = r.extraSpmIds;
                        i.extra.extraSpmIds && delete i.extra.extraSpmIds;
                        var c = i.spmId.split(":")
                            , u = c[1] ? {
                            seedDesc: c[1]
                        } : {};
                        objectAssign(u, dealExtra(i.extra, this.paramPrefix));
                        var l = {
                            param1: this.url,
                            param2: c[0],
                            param4: u,
                            seedId: this.seedIdCfg.clkSeedId,
                            actionId: index$1.EVENT_TYPE.CLICK,
                            spmId: c[0]
                        };
                        if (this.fullLinkAndChInfo) {
                            var p = i.extra.newChinfo || ""
                                , f = i.extra.entityId || i.extra.scm || "";
                            if (p && f) {
                                var d = {
                                    param5: "newChinfo=".concat(p, "^scm=").concat(f)
                                };
                                objectAssign(i.options, d)
                            }
                        }
                        objectAssign(l, i.options),
                            this.set({
                                lastClkSpm: i.spmId
                            }),
                            this.call("remoteLog", _objectSpread2$2({}, l), o),
                        s && s.length && s.forEach((function(t) {
                                e.call("remoteLog", _objectSpread2$2(_objectSpread2$2({}, l), {}, {
                                    extraPageId: t
                                }), o)
                            }
                        )),
                            this._runAfterFns("click", i)
                    }
                }
            }, {
                key: "expo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                        , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "up"
                        , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                        , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
                        , o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
                    o.combineType = o.combineType || "manual";
                    var i = {
                        spmId: e,
                        offset: t,
                        extra: r,
                        options: n,
                        currentConfig: o
                    }
                        , a = this._runBeforeFns("expo", i);
                    if (a) {
                        var s = {
                            param1: this.url,
                            param2: i.spmId,
                            param3: i.offset,
                            param4: dealExtra(i.extra, this.paramPrefix),
                            seedId: this.seedIdCfg.expoSeedId,
                            actionId: index$1.EVENT_TYPE.EXPOSURE,
                            spmId: i.spmId
                        };
                        if (this.fullLinkAndChInfo) {
                            var c = i.extra.newChinfo || ""
                                , u = i.extra.entityId || i.extra.scm || "";
                            if (c && u) {
                                var l = {
                                    param5: "newChinfo=".concat(c, "^scm=").concat(u)
                                };
                                objectAssign(s, l),
                                    objectAssign(i.options, l)
                            }
                        }
                        objectAssign(s, i.options);
                        var p = n && n.force;
                        if (!p && this.expoOnce && o.combineType !== index$1.COMBINE_TYPE.AUTO) {
                            this.expoObj = this.expoObj || {};
                            var f = this.expoObj[i.spmId] || {};
                            this.expoObj[i.spmId] || (this.expoObj[i.spmId] = f);
                            var d = o.uuid || i.spmId;
                            if (1 === f[d]) {
                                if (o.combineType === index$1.COMBINE_TYPE.MANUAL)
                                    return void console.warn("点位 ".concat(i.spmId, " 已经曝光过了"));
                                o.combineType = index$1.COMBINE_TYPE.AUTO
                            } else
                                f[d] = 1
                        }
                        return this.call("remoteLog", s, o),
                            this._runAfterFns("expo", i),
                            !0
                    }
                }
            }, {
                key: "calc",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                        , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                        , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    deprecated$1("calc 已废弃");
                    var n = {
                        param1: this.url,
                        param2: e,
                        param3: t,
                        param4: dealExtra(r, this.paramPrefix),
                        seedId: this.seedIdCfg.calcSeedId,
                        actionId: "timestamp"
                    };
                    this.call("remoteLog", n)
                }
            }, {
                key: "expoContent",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                        , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                        , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ""
                        , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
                        , o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ""
                        , i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
                    this.expo(e, "up", n, {
                        param5: "newChinfo=".concat(r, "^scm=").concat(t || o),
                        newScm: o
                    }, i)
                }
            }, {
                key: "clickContent",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                        , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                        , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ""
                        , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
                        , o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ""
                        , i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
                    this.click(e, n, {
                        param5: "newChinfo=".concat(r, "^scm=").concat(t || o),
                        newScm: o
                    }, i)
                }
            }]),
                e
        }();
        function ownKeys$3(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$3(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$3(Object(r), !0).forEach((function(t) {
                        _defineProperty$4(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$3(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$4(e) {
            return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$4(e)
        }
        function _defineProperty$4(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        var helper = {
            initFromStartParams: function(e, t) {
                var r = t.key
                    , n = t.value;
                e.mdata = e.mdata || {},
                n && (e.mdata[r] = n,
                    e[r] = n)
            },
            expoMerge: function(e, t) {
                var r = this
                    , n = t.reset
                    , o = ownAddEventListener(t.eventName, window.document, (function() {
                        if (!e.hasExpoMerge) {
                            n && (e.hasExpoMerge = !0);
                            for (var t = 0; e.fmtedExObjArr.length > t; t++)
                                request({
                                    tracert: r,
                                    type: requestTypeEnum.AlipayJSBridge,
                                    data: e.fmtedExObjArr[t].ExObj,
                                    jsApiType: jsApiTypeEnum.remoteLog
                                });
                            n && (e.hasExpoMerge = !0)
                        }
                    }
                ), !1);
                e.call("addSideEffects", o)
            },
            checkSubPage: function(e) {
                var t = window.AlipayJSBridge;
                if (t && t.startupParams && t.startupParams.extLogInfo && 0 === e._apCurrentIndex)
                    try {
                        var r = t.startupParams.extLogInfo;
                        "string" == typeof r && (r = JSON.parse(r));
                        var n = r.pageId;
                        if (!n)
                            return;
                        var o = n.split("__")[0].split(".");
                        o[0] && o[1] && 2 === o.length && e.call("config", {
                            spmAPos: o[0],
                            spmBPos: o[1],
                            autoLogPv: !1
                        })
                    } catch (e) {
                        console.warn("解析extLogInfo失败", e)
                    }
            },
            formatRemoteParams: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    , r = t || {}
                    , n = r.seedId;
                e.seedIdPrefix && (n = "".concat(e.seedIdPrefix, "-").concat(n)),
                e.seedIdSuffix && (n = "".concat(n, "-").concat(e.seedIdSuffix));
                var o = r.spmId || ""
                    , i = o.split(".")
                    , a = i.length
                    , s = e.spmAPos
                    , c = e.spmBPos;
                if (s && c)
                    switch (a) {
                        case 1:
                            if ("" === o) {
                                delete r.spmId;
                                break
                            }
                            r.spmId = [s, c, o].join(".");
                            break;
                        case 2:
                            r.spmId = [s, c, o].join(".");
                            break;
                        case 3:
                        case 4:
                            break;
                        default:
                            r.param2 = o,
                                delete r.spmId
                    }
                else
                    3 > a && delete r.spmId;
                var u = {
                    mBizScenario: e.mdata.bizScenario,
                    mPageState: e.state,
                    mPageName: e.name,
                    role_id: getUserId(e),
                    fullURL: location.href
                }
                    , l = r.param4 || {};
                if (objectAssign(l, u),
                e.mdata && "object" === _typeof$4(e.mdata))
                    for (var p in e.mdata)
                        e.mdata.hasOwnProperty(p) && (l[p] = l[p] || e.mdata[p]);
                var f = r.logLevel || e.logLevel;
                return objectAssign(r, {
                    type: r.type || "monitor",
                    bizType: r.bizType || e.bizType,
                    logLevel: parseInt(f, 10),
                    actionId: r.actionId || "clicked",
                    param4: l,
                    seedId: n
                }),
                    r
            }
        };
        function getAppxScmData() {
            var e = "appx_scm_data"
                , t = getValueFromStartupParams(e);
            if (t)
                return t;
            if (!window.location)
                return "";
            var r = getValueFromSearch(e, window.location.search);
            if (r)
                return r;
            var n = getValueFromSearch(e, window.location.hash);
            return n || ""
        }
        var base = {
            _calledLogPv: !1,
            init: function() {
                !0 === getValueFromStartupParams("enableTracker") && helper.initFromStartParams(this, {
                    key: "enableTracker",
                    value: !0
                }),
                    helper.initFromStartParams(this, {
                        key: "bizScenario",
                        value: getValue("bizScenario")
                    }),
                    helper.initFromStartParams(this, {
                        key: "version",
                        value: getValue("version")
                    }),
                    helper.initFromStartParams(this, {
                        key: "appId",
                        value: getValue("appId")
                    }),
                    helper.initFromStartParams(this, {
                        key: "chInfo",
                        value: getValue("chInfo") || getValue("chinfo")
                    }),
                    helper.initFromStartParams(this, {
                        key: "cityid",
                        value: getValue("cityId") || getValue("cityid")
                    }),
                    this.appxScmData = getAppxScmData(),
                    helper.expoMerge(this, {
                        eventName: "collectDestroyJsApi",
                        reset: !0
                    }),
                    helper.expoMerge(this, {
                        eventName: "back",
                        reset: !0
                    }),
                    helper.expoMerge(this, {
                        eventName: "pause"
                    }),
                    helper.checkSubPage(this)
            },
            remoteLog: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    , r = e || {};
                r.bizType = t.bizType || r.bizType || "";
                var n = helper.formatRemoteParams(this, r)
                    , o = {};
                if (objectAssign(o, n),
                "mergeExpose" === o.actionId && o.spmId && 3 === o.spmId.split(".").length && o.param4)
                    return this.fmtedExOptions = addMexOption(this.fmtedExOptions, objectAssign({}, o)),
                        this.fmtedExObj = addToExObj(this.fmtedExObj, objectAssign({}, o)),
                        this.fmtedExObjArr = formatExObj(this.fmtedExObj, this.fmtedExOptions, t),
                        void (this.debug && console.log(n));
                o.param4 && void 0 !== o.param4.entityId && (o.entityId = o.param4.entityId),
                    o.param4 = objToStr(o.param4),
                    o.scm = (strToObj$1(o.param5) || {}).scm,
                    o.eventTime = Date.now(),
                    this.reportEvent(o, this, t)
            },
            run: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.set(_objectSpread2$3(_objectSpread2$3({}, e), {}, {
                    started: !0
                }));
                var t = document.createEvent("HTMLEvents");
                t._isMain = !!this._isMain,
                    t._instanceId = this._instanceId,
                    t.initEvent("TracertStart", !0, !0),
                    document.dispatchEvent(t),
                    this.call("logPv", this.autoLogPv ? {
                        combineType: index$1.COMBINE_TYPE.MIX
                    } : {
                        combineType: index$1.COMBINE_TYPE.AUTO
                    })
            },
            _getReportDataParams: function(e) {
                var t = this.bizType
                    , r = this.spmAPos && this.spmBPos ? [this.spmAPos, this.spmBPos].join(".") : ""
                    , n = {
                    url: this.url,
                    bizType: t,
                    isSPM: !!r,
                    scm: this.scm
                };
                r && (n.spmId = r),
                this.entityId && (n.entityId = this.entityId);
                var o = _objectSpread2$3(_objectSpread2$3({}, this.mdata), {}, {
                    url: this.url,
                    fullUrl: location.href,
                    mPageState: this.state,
                    mBizScenario: this.bizScenario
                }, e);
                return !o.appx_scm_data && this.appxScmData && (o.appx_scm_data = this.appxScmData),
                    {
                        spm: n,
                        spmDetail: o
                    }
            },
            report: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = e.params
                    , r = e.spmId;
                if (r) {
                    var n = r.split(".")
                        , o = n[0]
                        , i = n[1];
                    o && i && this.set({
                        spmAPos: o,
                        spmBPos: i
                    })
                }
                "object" === _typeof$4(t) && this.set({
                    mdata: _objectSpread2$3(_objectSpread2$3({}, this.mdata), t)
                });
                var a = !!r;
                this.call("pageMonitorEnd", a),
                a && this.set({
                    _calledLogPv: !0
                }),
                    this.call("pageMonitor")
            },
            _pageMonitor: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = this._getReportDataParams(e)
                    , r = window
                    , n = r.AlipayJSBridge
                    , o = n && n.startupParams || {}
                    , i = o.appVersion
                    , a = o.appId
                    , s = o.ap_framework_scheme
                    , c = o.query
                    , u = t.spm
                    , l = t.spmDetail
                    , p = _objectSpread2$3(_objectSpread2$3({}, t), {}, {
                    type: "h5",
                    update: e.combineType === index$1.COMBINE_TYPE.AUTO || !this._calledLogPv,
                    uep: {
                        timestamp: Date.now(),
                        url: l.fullUrl,
                        spm: u.spmId,
                        bizCode: u.bizType,
                        appVersion: i,
                        appId: a,
                        combineType: e.combineType || "manual",
                        sdkVersion: this.v,
                        params: _objectSpread2$3(_objectSpread2$3(_objectSpread2$3({}, this.mdata), e), {}, {
                            exposureRange: {
                                height: window.innerHeight,
                                yOffset: window.scrollY
                            }
                        }),
                        sdkParams: {
                            sdkVersion: this.v,
                            scheme: s,
                            query: c || ""
                        }
                    }
                });
                logPv(p, this)
            },
            available: function(e) {
                var t = window.AlipayH5Performance;
                if (t) {
                    var r = e;
                    e instanceof Object && "object" === _typeof$4(e.params) && (r = e.params),
                        t.addTrackData({
                            name: "timeReport",
                            value: objToStr(r, "|")
                        })
                }
            },
            send: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (this._runBeforeFns("send", t),
                    e) {
                    var r = t.bizType || this.bizType;
                    delete t.bizType;
                    var n = t.logLevel || this.logLevel;
                    delete t.logLevel,
                        window.AlipayJSBridge.call("handleLoggingAction", {
                            actionType: "reportEvent",
                            params: {
                                eventId: "string" == typeof e ? e : "" + e,
                                bizType: r,
                                logLevel: n,
                                extData: _objectSpread2$3(_objectSpread2$3({}, t), {}, {
                                    fullURL: location.href,
                                    appId: this.appId || ""
                                })
                            }
                        })
                }
            }
        }
            , uep$2 = {
            _logPv: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.pageMonitor(e)
            },
            reportEvent: function(e, t, r) {
                log({
                    params: e,
                    context: t,
                    currentConfig: r
                })
            },
            pageMonitor: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this._pageMonitor(e),
                e.combineType !== index$1.COMBINE_TYPE.AUTO && (this._calledLogPv = !0)
            },
            pageMonitorEnd: function() {}
        }
            , remoteLog$1 = {
            _logPv: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                e.combineType !== index$1.COMBINE_TYPE.AUTO ? (e.combineType === index$1.COMBINE_TYPE.MIX && this.uepLogPv(e),
                    this.tracertLogPv(e)) : this.uepLogPv(e)
            },
            uepLogPv: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this._pageMonitor(e)
            },
            tracertLogPv: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.pageMonitorEnd(!0),
                    this._calledLogPv = !0,
                    this.pageMonitor(e)
            },
            pageMonitor: function(e) {
                var t = this._getReportDataParams(e);
                this.debug && console.log(t),
                    request({
                        tracert: this,
                        type: requestTypeEnum.AlipayJSBridge,
                        data: t,
                        jsApiType: jsApiTypeEnum.reportData
                    })
            },
            pageMonitorEnd: function(e) {
                e && this._calledLogPv && request({
                    tracert: this,
                    type: requestTypeEnum.AlipayJSBridge,
                    data: {
                        actionType: "end"
                    },
                    jsApiType: jsApiTypeEnum.pageMonitor
                })
            },
            reportEvent: function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                    , n = r.combineType;
                this.debug && console.log(e),
                    n !== index$1.COMBINE_TYPE.AUTO ? (n === index$1.COMBINE_TYPE.MIX && log({
                        params: e,
                        context: t,
                        currentConfig: r
                    }),
                        request({
                            tracert: this,
                            type: requestTypeEnum.AlipayJSBridge,
                            data: e,
                            jsApiType: jsApiTypeEnum.remoteLog
                        })) : log({
                        params: e,
                        context: t,
                        currentConfig: r
                    })
            }
        };
        function factory() {
            var e = {};
            return objectAssign(e, base),
                getValueFromStartupParams("uepCombineMode") ? objectAssign(e, uep$2) : objectAssign(e, remoteLog$1)
        }
        var ap = function(e, t) {
            objectAssign(e, factory()),
                e.before("set", (function(t) {
                        var r = t.spmAPos
                            , n = t.spmBPos;
                        if (e.get("_isMain")) {
                            if (r) {
                                for (var o = nodeListToArray(window.document.getElementsByTagName("meta")), i = !1, a = 0; o.length > a; a++) {
                                    var s = o[a]
                                        , c = getAttr$1(s, "name");
                                    getAttr$1(s, "content") && c && ("data-aspm" === c && (s.content = r,
                                        i = !0))
                                }
                                if (!i) {
                                    var u = window.document.createElement("meta");
                                    u.name = "data-aspm",
                                        u.content = r,
                                        window.document.getElementsByTagName("head")[0].appendChild(u)
                                }
                            }
                            if (n) {
                                var l = window.document.getElementsByTagName("BODY")[0];
                                l && l.setAttribute && l.setAttribute("data-aspm", n)
                            }
                        }
                    }
                ));
            var r = function() {
                window.AlipayJSBridge.call("getSceneStackInfo", (function(r) {
                        r && e.set({
                            _apCurrentIndex: r.currentIndex
                        });
                        t()
                    }
                ))
            };
            return e.call("init"),
                window.AlipayJSBridge ? r() : document.addEventListener("AlipayJSBridgeReady", r, !1),
                e
        };
        function _typeof$5(e) {
            return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$5(e)
        }
        function _classCallCheck$3(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties$3(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass$3(e, t, r) {
            return t && _defineProperties$3(e.prototype, t),
            r && _defineProperties$3(e, r),
                e
        }
        function _slicedToArray(e, t) {
            return _arrayWithHoles$1(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray$1(e, t) || _nonIterableRest$1()
        }
        function _toConsumableArray$1(e) {
            return _arrayWithoutHoles$1(e) || _iterableToArray$1(e) || _unsupportedIterableToArray$1(e) || _nonIterableSpread$1()
        }
        function _arrayWithoutHoles$1(e) {
            if (Array.isArray(e))
                return _arrayLikeToArray$1(e)
        }
        function _arrayWithHoles$1(e) {
            if (Array.isArray(e))
                return e
        }
        function _iterableToArray$1(e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                return Array.from(e)
        }
        function _iterableToArrayLimit(e, t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                var r = []
                    , n = !0
                    , o = !1
                    , i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value),
                    !t || r.length !== t); n = !0)
                        ;
                } catch (e) {
                    o = !0,
                        i = e
                } finally {
                    try {
                        n || null == s.return || s.return()
                    } finally {
                        if (o)
                            throw i
                    }
                }
                return r
            }
        }
        function _unsupportedIterableToArray$1(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return _arrayLikeToArray$1(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray$1(e, t) : void 0
            }
        }
        function _arrayLikeToArray$1(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = Array(t); t > r; r++)
                n[r] = e[r];
            return n
        }
        function _nonIterableSpread$1() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _nonIterableRest$1() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var checkEnv = function(e) {
            return function() {
                if (!e || !e.navigator || !e.navigator.userAgent)
                    return "";
                var t = e.navigator.userAgent
                    , r = "";
                return !!t.match(/iphone|ipad|iPod/gi) && (r = "iOS"),
                !!t.match(/android/gi) && (r = "Android"),
                !!t.match(/Firefox/gi) && (r = "Firefox"),
                !!t.match(/Chrome/gi) && (r = "Chrome"),
                !t.match(/Chrome/gi) && !!t.match(/Safari/gi) && (r = "Safari"),
                !!t.match(/Opera/gi) && (r = "Opera"),
                !!t.match(/MSIE/gi) && (r = "IE"),
                    r
            }
        }(void 0);
        function checkAndriodSpecial() {
            return !0
        }
        var generateHandler = function(e) {
            switch (e) {
                case "iOS":
                    return {
                        filter: function(e) {
                            return 0 > e.indexOf("[native code]") && e.indexOf("@") >= 0
                        }
                    };
                case "Android":
                    return {
                        filter: function(e, t) {
                            return t && 0 > e.indexOf("nonymous") && checkAndriodSpecial()
                        }
                    };
                default:
                    return {
                        filter: function() {
                            return !0
                        }
                    }
            }
        };
        function safeAdd(e, t) {
            var r = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
        }
        function bitRotateLeft(e, t) {
            return e << t | e >>> 32 - t
        }
        function md5cmn(e, t, r, n, o, i) {
            return safeAdd(bitRotateLeft(safeAdd(safeAdd(t, e), safeAdd(n, i)), o), r)
        }
        function md5ff(e, t, r, n, o, i, a) {
            return md5cmn(t & r | ~t & n, e, t, o, i, a)
        }
        function md5gg(e, t, r, n, o, i, a) {
            return md5cmn(t & n | r & ~n, e, t, o, i, a)
        }
        function md5hh(e, t, r, n, o, i, a) {
            return md5cmn(t ^ r ^ n, e, t, o, i, a)
        }
        function md5ii(e, t, r, n, o, i, a) {
            return md5cmn(r ^ (t | ~n), e, t, o, i, a)
        }
        function binlMD5(e, t) {
            var r, n, o, i, a;
            e[t >> 5] |= 128 << t % 32,
                e[14 + (t + 64 >>> 9 << 4)] = t;
            var s = 1732584193
                , c = -271733879
                , u = -1732584194
                , l = 271733878;
            for (r = 0; e.length > r; r += 16)
                n = s,
                    o = c,
                    i = u,
                    a = l,
                    s = md5ff(s, c, u, l, e[r], 7, -680876936),
                    l = md5ff(l, s, c, u, e[r + 1], 12, -389564586),
                    u = md5ff(u, l, s, c, e[r + 2], 17, 606105819),
                    c = md5ff(c, u, l, s, e[r + 3], 22, -1044525330),
                    s = md5ff(s, c, u, l, e[r + 4], 7, -176418897),
                    l = md5ff(l, s, c, u, e[r + 5], 12, 1200080426),
                    u = md5ff(u, l, s, c, e[r + 6], 17, -1473231341),
                    c = md5ff(c, u, l, s, e[r + 7], 22, -45705983),
                    s = md5ff(s, c, u, l, e[r + 8], 7, 1770035416),
                    l = md5ff(l, s, c, u, e[r + 9], 12, -1958414417),
                    u = md5ff(u, l, s, c, e[r + 10], 17, -42063),
                    c = md5ff(c, u, l, s, e[r + 11], 22, -1990404162),
                    s = md5ff(s, c, u, l, e[r + 12], 7, 1804603682),
                    l = md5ff(l, s, c, u, e[r + 13], 12, -40341101),
                    u = md5ff(u, l, s, c, e[r + 14], 17, -1502002290),
                    s = md5gg(s, c = md5ff(c, u, l, s, e[r + 15], 22, 1236535329), u, l, e[r + 1], 5, -165796510),
                    l = md5gg(l, s, c, u, e[r + 6], 9, -1069501632),
                    u = md5gg(u, l, s, c, e[r + 11], 14, 643717713),
                    c = md5gg(c, u, l, s, e[r], 20, -373897302),
                    s = md5gg(s, c, u, l, e[r + 5], 5, -701558691),
                    l = md5gg(l, s, c, u, e[r + 10], 9, 38016083),
                    u = md5gg(u, l, s, c, e[r + 15], 14, -660478335),
                    c = md5gg(c, u, l, s, e[r + 4], 20, -405537848),
                    s = md5gg(s, c, u, l, e[r + 9], 5, 568446438),
                    l = md5gg(l, s, c, u, e[r + 14], 9, -1019803690),
                    u = md5gg(u, l, s, c, e[r + 3], 14, -187363961),
                    c = md5gg(c, u, l, s, e[r + 8], 20, 1163531501),
                    s = md5gg(s, c, u, l, e[r + 13], 5, -1444681467),
                    l = md5gg(l, s, c, u, e[r + 2], 9, -51403784),
                    u = md5gg(u, l, s, c, e[r + 7], 14, 1735328473),
                    s = md5hh(s, c = md5gg(c, u, l, s, e[r + 12], 20, -1926607734), u, l, e[r + 5], 4, -378558),
                    l = md5hh(l, s, c, u, e[r + 8], 11, -2022574463),
                    u = md5hh(u, l, s, c, e[r + 11], 16, 1839030562),
                    c = md5hh(c, u, l, s, e[r + 14], 23, -35309556),
                    s = md5hh(s, c, u, l, e[r + 1], 4, -1530992060),
                    l = md5hh(l, s, c, u, e[r + 4], 11, 1272893353),
                    u = md5hh(u, l, s, c, e[r + 7], 16, -155497632),
                    c = md5hh(c, u, l, s, e[r + 10], 23, -1094730640),
                    s = md5hh(s, c, u, l, e[r + 13], 4, 681279174),
                    l = md5hh(l, s, c, u, e[r], 11, -358537222),
                    u = md5hh(u, l, s, c, e[r + 3], 16, -722521979),
                    c = md5hh(c, u, l, s, e[r + 6], 23, 76029189),
                    s = md5hh(s, c, u, l, e[r + 9], 4, -640364487),
                    l = md5hh(l, s, c, u, e[r + 12], 11, -421815835),
                    u = md5hh(u, l, s, c, e[r + 15], 16, 530742520),
                    s = md5ii(s, c = md5hh(c, u, l, s, e[r + 2], 23, -995338651), u, l, e[r], 6, -198630844),
                    l = md5ii(l, s, c, u, e[r + 7], 10, 1126891415),
                    u = md5ii(u, l, s, c, e[r + 14], 15, -1416354905),
                    c = md5ii(c, u, l, s, e[r + 5], 21, -57434055),
                    s = md5ii(s, c, u, l, e[r + 12], 6, 1700485571),
                    l = md5ii(l, s, c, u, e[r + 3], 10, -1894986606),
                    u = md5ii(u, l, s, c, e[r + 10], 15, -1051523),
                    c = md5ii(c, u, l, s, e[r + 1], 21, -2054922799),
                    s = md5ii(s, c, u, l, e[r + 8], 6, 1873313359),
                    l = md5ii(l, s, c, u, e[r + 15], 10, -30611744),
                    u = md5ii(u, l, s, c, e[r + 6], 15, -1560198380),
                    c = md5ii(c, u, l, s, e[r + 13], 21, 1309151649),
                    s = md5ii(s, c, u, l, e[r + 4], 6, -145523070),
                    l = md5ii(l, s, c, u, e[r + 11], 10, -1120210379),
                    u = md5ii(u, l, s, c, e[r + 2], 15, 718787259),
                    c = md5ii(c, u, l, s, e[r + 9], 21, -343485551),
                    s = safeAdd(s, n),
                    c = safeAdd(c, o),
                    u = safeAdd(u, i),
                    l = safeAdd(l, a);
            return [s, c, u, l]
        }
        function binl2rstr(e) {
            var t, r = "", n = 32 * e.length;
            for (t = 0; n > t; t += 8)
                r += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
            return r
        }
        function rstr2binl(e) {
            var t, r = [];
            for (r[(e.length >> 2) - 1] = void 0,
                     t = 0; r.length > t; t += 1)
                r[t] = 0;
            var n = 8 * e.length;
            for (t = 0; n > t; t += 8)
                r[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return r
        }
        function rstrMD5(e) {
            return binl2rstr(binlMD5(rstr2binl(e), 8 * e.length))
        }
        function rstrHMACMD5(e, t) {
            var r, n, o = rstr2binl(e), i = [], a = [];
            for (i[15] = a[15] = void 0,
                 o.length > 16 && (o = binlMD5(o, 8 * e.length)),
                     r = 0; 16 > r; r += 1)
                i[r] = 909522486 ^ o[r],
                    a[r] = 1549556828 ^ o[r];
            return n = binlMD5(i.concat(rstr2binl(t)), 512 + 8 * t.length),
                binl2rstr(binlMD5(a.concat(n), 640))
        }
        function rstr2hex(e) {
            var t, r, n = "0123456789abcdef", o = "";
            for (r = 0; e.length > r; r += 1)
                t = e.charCodeAt(r),
                    o += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
            return o
        }
        function str2rstrUTF8(e) {
            return unescape(encodeURIComponent(e))
        }
        function rawMD5(e) {
            return rstrMD5(str2rstrUTF8(e))
        }
        function hexMD5(e) {
            return rstr2hex(rawMD5(e))
        }
        function rawHMACMD5(e, t) {
            return rstrHMACMD5(str2rstrUTF8(e), str2rstrUTF8(t))
        }
        function hexHMACMD5(e, t) {
            return rstr2hex(rawHMACMD5(e, t))
        }
        function md5(e, t, r) {
            return t ? r ? rawHMACMD5(t, e) : hexHMACMD5(t, e) : r ? rawMD5(e) : hexMD5(e)
        }
        var ErrorStack = function() {
            function e(t) {
                _classCallCheck$3(this, e),
                    this.env = t || checkEnv(),
                    this.stackFilter = generateHandler(this.env).filter
            }
            return _createClass$3(e, [{
                key: "makeReg",
                value: function() {
                    return "iOS" === this.env ? RegExp("(?:\\s*)\\w+(?=@)|(?:@).*?(?=:\\d*:)|(?::)\\d*(?=:)|(?::)\\d*$", "g") : null
                }
            }, {
                key: "stackFormatter",
                value: function(e) {
                    var t = e.message
                        , r = []
                        , n = "Android" === this.env
                        , o = "iOS" === this.env
                        , i = e.stack.split("\n").filter(this.stackFilter);
                    i.shift();
                    var a = i.join("\n")
                        , s = this.makeReg();
                    return s ? i.map((function(e) {
                            var t = e.match(s);
                            if (t) {
                                var i = _slicedToArray(t, 4)
                                    , a = i[0]
                                    , c = void 0 === a ? "" : a
                                    , u = i[1]
                                    , l = void 0 === u ? "" : u
                                    , p = i[2]
                                    , f = void 0 === p ? "" : p
                                    , d = i[3]
                                    , m = void 0 === d ? "" : d
                                    , g = n ? c.split(".").reverse()[0] : c
                                    , h = o ? 1 : 0;
                                r.push("at ".concat(g, " (").concat(l.substr(h), ":").concat(f.substr(h), ":").concat(m.substr(h), ")"))
                            } else
                                r.push(e);
                            return null
                        }
                    )) : r = i,
                        {
                            hash: this.encryptStack(t, r),
                            message: t,
                            stackList: r,
                            stackStr: a
                        }
                }
            }, {
                key: "encryptStack",
                value: function(e, t) {
                    var r = [].concat(_toConsumableArray$1(t.slice(0, 6)), _toConsumableArray$1(t.slice(7, 8)), _toConsumableArray$1(t.slice(9, 10)), _toConsumableArray$1(t.slice(11, 12)), _toConsumableArray$1(t.slice(13, 14))).join(";");
                    return md5("".concat(e, ":").concat(r))
                }
            }]),
                e
        }()
            , STACK_LENGTH_LIMIT = 20
            , ChromeREGEX = /^\s*at .*? ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::\d+)?(?::\d+)?\)?\s*$/i
            , GeckoREGEX = /^\s*.*?(?:\(.*?\))?(?:^|@)((?:file|https?|blob|chrome|resource|\[native).*?)(?::\d+)?(?::\d+)?\s*$/i
            , WinJSREGEX = /^\s*at (?:(?:\[object object\])?.+ )?\(?((?:file|ms-appx|https?|blob):.*?):\d+(?::\d+)?\)?\s*$/i;
        function parseStack(e) {
            for (var t = e.slice(0, STACK_LENGTH_LIMIT), r = ["", ""], n = {}, o = 1, i = 0; t.length > i; i += 1) {
                var a = ChromeREGEX
                    , s = (t[i] || "").match(a);
                if (null === s && (s = (t[i] || "").match(a = GeckoREGEX)),
                null === s && (s = (t[i] || "").match(a = WinJSREGEX)),
                null !== s) {
                    var c = s[1]
                        , u = n[c];
                    void 0 === u && (n[c] = "#".concat(o, "#"),
                        o += 1,
                        u = n[c]),
                        t[i] = t[i].replace(c, u)
                }
            }
            t.length > 0 && (r[1] = t.map((function(e) {
                    return e.trim()
                }
            )).join(""));
            var l = "";
            for (var p in n)
                n.hasOwnProperty(p) && (l += "".concat(p, "@").concat(n[p], ";"));
            return l = l.replace(/;$/, ""),
                r[0] = l,
                r.join("").replace(/\^/g, "").replace(/=/g, "").replace(/,/g, "")
        }
        function unParseStack(e) {
            var t = e && e.split("") || [];
            if (!t[0] || !t[1])
                return e;
            for (var r = {}, n = t[0].split(";"), o = 0; n.length > o; o += 1) {
                var i = n[o] && n[o].split("@#");
                r["#".concat(i[1])] = i[0]
            }
            return t[1].replace(/#[0-9]+#/g, (function(e) {
                    return r[e] || ""
                }
            )).replace(/\u0004/g, "^").replace(/\u0005/g, "=").replace(/\u0006/g, ",").split("")
        }
        "undefined" == typeof process || _typeof$5(process);
        var helper$1 = {
            compressStack: function(e) {
                return parseStack(e)
            },
            uncompressStack: function(e) {
                return unParseStack(e)
            }
        }
            , compressStack = helper$1.compressStack;
        function _typeof$6(e) {
            return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$6(e)
        }
        function _defineProperty$5(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        function ownKeys$4(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$4(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$4(Object(r), !0).forEach((function(t) {
                        _defineProperty$5(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$4(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _objectWithoutPropertiesLoose(e, t) {
            if (null == e)
                return {};
            var r, n, o = {}, i = Object.keys(e);
            for (n = 0; i.length > n; n++)
                0 > t.indexOf(r = i[n]) && (o[r] = e[r]);
            return o
        }
        function _objectWithoutProperties(e, t) {
            if (null == e)
                return {};
            var r, n, o = _objectWithoutPropertiesLoose(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (n = 0; i.length > n; n++)
                    0 > t.indexOf(r = i[n]) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
            }
            return o
        }
        var version = "0.1.37"
            , errorCodeEnums = {
            JS: 1,
            REQUEST: 2,
            PROMISEREJECTION: 3,
            ASSETS: 4
        };
        function getResourceErrorSrc() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , t = e.src || e.href;
            return "img" === e.tagName.toLowerCase() && 0 === t.indexOf("data:") && (t = t.split(",")[0]),
                t
        }
        function getTime() {
            var e = new Date
                , t = function(e) {
                return 10 > e ? "0".concat(e) : "".concat(e)
            };
            return "".concat(e.getFullYear(), "-").concat(t(e.getMonth() + 1), "-").concat(t(e.getDate()), " ").concat(t(e.getHours()), ":").concat(t(e.getMinutes()), ":").concat(t(e.getSeconds()), ":").concat(e.getMilliseconds())
        }
        function getXPath$2(e, t) {
            var r = e.id ? "".concat(e.id) : ""
                , n = e.className ? "".concat(e.className) : ""
                , o = e.tagName.toLowerCase()
                , i = r || n
                , a = [];
            r && a.push('[@id="'.concat(r, '"]')),
            n && a.push('[@class="'.concat(n, '"]'));
            var s = "".concat(o).concat(i ? a.join("") : "");
            return e.parentNode && e.parentNode.tagName && t - 1 != 0 ? "".concat(getXPath$2(e.parentNode, t - 1), ">").concat(s) : s
        }
        function safelyPush(e, t, r) {
            var n = r || 20;
            if (!e || !t)
                return null;
            n >= r && r || (r = n),
                e.push(t);
            var o = e.length - n;
            return o > 0 && (e = e.slice(o)),
                e
        }
        function generateIdentifier(e) {
            return [e.code, e.uid, e.page, e.msg || ""].join("_")
        }
        function getUserId$1(e) {
            return e && (e.role_id || e.roleId || e.cUserId || e.backupUserId || e.bucUserId) || ""
        }
        var objectAssign$2 = objectAssign
            , doc$1 = document
            , docEl = doc$1.documentElement
            , startTime = (new Date).getTime()
            , fieldLenLimt = 660
            , limitFields = ["code", "msg"]
            , encodeValue = function(e) {
            return encodeURIComponent(e).replace(/'/g, "%27")
        };
        function objToStr$2(e) {
            var t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "^", n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o = [];
            if (e instanceof Array)
                o = e;
            else if (e instanceof Object) {
                var i = n ? encodeValue : function(e) {
                        return e
                    }
                ;
                for (t in e)
                    if (e.hasOwnProperty(t)) {
                        var a = i(e[t]);
                        o.push("".concat(t, "=").concat(a))
                    }
            }
            return o.join(r)
        }
        function initSessionId(e) {
            if (!e.sessionId) {
                var t = window.sessionStorage
                    , r = e.sessionIdKey;
                t || (t = {}),
                t[r] || (t[r] = "".concat(uuid(), "_").concat(Date.now())),
                    e.set({
                        sessionId: t[r]
                    })
            }
        }
        function getNetwork$1() {
            return navigator && navigator.connection && navigator.connection.effectiveType ? navigator.connection.effectiveType : ""
        }
        function filterParam(e, t) {
            objectAssign$2(t, this.mdata || {}),
                t.title = document.title,
                t.dom_cnt = document.getElementsByTagName("*").length,
                t.delay = (new Date).getTime() - startTime,
                t.scroll_top = docEl.scrollTop + doc$1.body.scrollTop,
                t.content_height = Math.max(docEl.clientHeight, docEl.offsetHeight, docEl.scrollHeight),
                t.last_action = this._lastAction,
                t.monitorConfigFailed = this._monitorConfigFailed ? 1 : 0,
                t.network = getNetwork$1(),
                t.spmId = e;
            var r = this.refSpm || this.referSPM || "";
            t.ref = this.refUrl,
                t.referSPM = r,
                t.fullURL = this.fullURL || location.href,
                t.source_appid = this.spmAPos,
            this._spmId && (t._spmId = this._spmId),
            this._refSpm && (t._refSpm = this._refSpm),
            this.cOfflineVer && (t.c_offline_ver = this.cOfflineVer),
            this.cAppId && (t.c_app_id = this.cAppId);
            var n = [version]
                , o = this._v;
            if (o && n.push("h5:".concat(o)),
                t.tracert_ver = n.join(";"),
            "object" === _typeof$6(t)) {
                var i = t;
                for (var a in i)
                    if (i.hasOwnProperty(a) && "string" == typeof i[a]) {
                        0 > limitFields.indexOf(a) && !/^[dmc]\d+$/.test(a) || i[a].length > fieldLenLimt && (i[a] = i[a].slice(0, fieldLenLimt));
                        var s = i[a].replace(/\s+/g, " ");
                        i[a] = "fullURL" === a && s.length > 300 ? s.slice(0, 300) : s
                    }
            }
            return t
        }
        function getUA$1() {
            return navigator.userAgent ? navigator.userAgent.replace(/,/g, "%2C") : ""
        }
        function packFinalData(e) {
            var t = e.spmId
                , r = e.seedId
                , n = e.param4
                , o = n.__sid || this.sessionId || uuid();
            delete n.__sid;
            var i = new Date
                , a = function(e) {
                return 10 > e ? "0".concat(e) : "".concat(e)
            }
                , s = getUserId$1(this)
                , c = ["D-AE", "".concat(i.getFullYear(), "-").concat(a(i.getMonth() + 1), "-").concat(a(i.getDate()), " ").concat(a(i.getHours()), ":").concat(a(i.getMinutes()), ":").concat(a(i.getSeconds()), ":").concat(i.getMilliseconds()), this.clientId, "", "2", "", o, s, 1e3, r, "H5behavior", this.logLevel, "", "", "", "", "", "", "", "", "", "", "", "", "", "".concat(window.innerWidth || "", "x").concat(window.innerHeight, "x").concat(window.devicePixelRatio), "", "", "", getUA$1(), "", "", "", objToStr$2(this.sysInfo), "", ""];
            if (1 === n.s3 && 1 === n.code)
                c.push(objToStr$2(n, "^", !0));
            else {
                var u = filterParam.call(this, t, n);
                c.push(objToStr$2(u, "^", !0))
            }
            for (var l = 0; c.length > l; l++)
                "string" == typeof c[l] && (c[l] = c[l].replace(/,/g, "%2C"));
            return c
        }
        function sendData(e) {
            var t = window.encodeURIComponent;
            this.debug && console.log(e),
                this._httpLog(t(e.join()))
        }
        function bridgeLog(e) {
            window.AlipayJSBridge ? window.AlipayJSBridge.call("handleLoggingAction", {
                actionType: "reportEvent",
                params: {
                    eventId: this.seedIdCfg.exceptionSeedId || this._defaultExceptionSeedId,
                    bizType: "bmmonitor",
                    extData: e || {}
                }
            }) : this._warn("非容器环境，不能调用 handleLoggingAction")
        }
        function remoteLog$2(e) {
            this.init(),
                initSessionId(this);
            var t = e.param4
                , r = e.spmId;
            if (window.AlipayJSBridge && t && t.code > 10) {
                var n = filterParam.call(this, r, t);
                for (var o in delete n.__sid,
                    n._ua = getUA$1(),
                    n.spmId = r,
                    n)
                    n.hasOwnProperty(o) && "string" == typeof n[o] && (n[o] = encodeValue(n[o]));
                bridgeLog.call(this, n)
            } else {
                var i = packFinalData.call(this, e);
                sendData.call(this, i)
            }
        }
        function log$1(e) {
            try {
                var t = this._preproccess(e);
                if (!t)
                    return;
                if (void 0 !== t.sampleRate && Math.random() > t.sampleRate)
                    return void this._warn("当前已设置采样率 ".concat(t.sampleRate, "，未被采集"));
                this._runBeforeFns("send", t);
                var r = t.bmAppid || this._bmAppId;
                remoteLog$2.call(this, {
                    spmId: this.spmAPos && this.spmBPos ? "".concat(this.spmAPos, ".").concat(this.spmBPos) : "",
                    seedId: this.seedIdCfg.exceptionSeedId || this._defaultExceptionSeedId,
                    param4: _objectSpread2$4({
                        pid: this.pid || "",
                        bm_appid: r,
                        bm_sid: this._bmSprintId,
                        env: this._env || ""
                    }, t)
                })
            } catch (e) {
                this._warn("Tracert 异常上报失败:", e)
            }
        }
        function getMonitorConfig(e) {
            for (var t = null, r = 0; this._monitorConfigs.length > r; r++)
                this._monitorConfigs[r].code === e.code && (t = this._monitorConfigs[r]);
            return t
        }
        function filterOptions(e, t) {
            for (var r = {}, n = 0; t.fields.length > n; n++)
                r[t.fields[n]] = !0;
            for (var o in e)
                !r[o] && /^[dmc]\d+$/.test(o) && delete e[o];
            return e
        }
        function preproccess(e) {
            if (!e)
                return !1;
            if (1 === e.code && 1 === e.s3)
                return e;
            if ("function" == typeof this.beforeLog) {
                var t;
                try {
                    t = this.beforeLog(e)
                } catch (e) {}
                if (!1 === t)
                    return this._warn("当前由于 beforeLog 返回 false，未被采集"),
                        !1;
                "object" === _typeof$6(t) && (e = t)
            }
            for (var r = generateIdentifier(_objectSpread2$4({}, e, {
                uid: getUserId$1(this),
                page: this.fullURL || location.href
            })), n = !1, o = 0; this._trackedLogs.length > o; o++)
                if (this._trackedLogs[o] === r) {
                    n = !0;
                    break
                }
            if ((null == e.oncePerSession ? this.oncePerSession : e.oncePerSession) && n)
                this._warn("当前由于 OncePerSession 策略，未被采集");
            else {
                if (this._monitorConfigInited || this._monitorConfigFailed) {
                    if (this._monitorConfigFailed)
                        return e;
                    if (void 0 !== e.bmAppid && this._bmAppId !== e.bmAppid)
                        return e;
                    var i = getMonitorConfig.call(this, e);
                    return !!i && (i.isDeleted || !i.isActive ? (this._warn("当前监控项已关闭"),
                        !1) : (void 0 === e.sampleRate && (e.sampleRate = i.sampleRate),
                    !n && this._trackedLogs.push(r),
                        filterOptions(e, i)))
                }
                safelyPush(this._cacheLogs, e)
            }
        }
        function handleErrorOptions(e, t) {
            var r = e.target || e.srcElement;
            if (r)
                if ("unhandledrejection" !== e.type) {
                    if (r instanceof HTMLElement) {
                        var n = getResourceErrorSrc(r)
                            , o = r.tagName.toLowerCase()
                            , i = r.alt
                            , a = void 0 === i ? "" : i;
                        t({
                            code: errorCodeEnums.ASSETS,
                            msg: n || "",
                            s1: o,
                            s2: getXPath$2(r, 5),
                            s3: a
                        })
                    } else
                        e.error && e.error.stack ? this.logError(e.error) : t({
                            code: errorCodeEnums.JS,
                            msg: e.message,
                            s3: 0
                        })
                } else {
                    var s = e.reason || {};
                    if (s.message && s.stack)
                        this.logError(s, {
                            code: errorCodeEnums.PROMISEREJECTION
                        });
                    else {
                        var c = s.message || ("string" == typeof s ? s : JSON.stringify(s));
                        t({
                            code: errorCodeEnums.PROMISEREJECTION,
                            msg: c
                        })
                    }
                }
        }
        function handleErrorOptions$1(e, t) {
            try {
                handleErrorOptions.call(this, e, t)
            } catch (e) {
                this._warn("handleErrorOptions failed", e)
            }
        }
        var win = window;
        function interfaceRegister(e) {
            var t = !1;
            if ("XMLHttpRequest"in win) {
                var r = win.XMLHttpRequest.prototype
                    , n = r.open;
                r.open = function(e, t) {
                    this.__tracertMonitor__ = {
                        method: e,
                        url: t || "",
                        status_code: null
                    };
                    for (var r = Array(arguments.length), o = 0; r.length > o; ++o)
                        r[o] = arguments[o];
                    n.apply(this, r)
                }
                ;
                var o = r.send;
                r.send = function(r) {
                    var n = this;
                    function i() {
                        if (n.__tracertMonitor__ && 4 === n.readyState)
                            try {
                                var o = n.__tracertMonitor__.url;
                                if (0 === n.status)
                                    return;
                                var i = o.split("?")[0]
                                    , a = o.split("?")[1] || ""
                                    , s = "string" == typeof r ? r : JSON.stringify(r)
                                    , c = n.response + "";
                                c.length > 2048 && (c = "[too large]");
                                if (200 > n.status || n.status > 299 || t) {
                                    if (i === e.server)
                                        return void e._warn("Tracert 上报异常", s);
                                    e.logRequestError({
                                        type: "http",
                                        status: n.status,
                                        url: i,
                                        method: n.__tracertMonitor__.method,
                                        query: a,
                                        data: s,
                                        response: c,
                                        traceId: e.traceId || ""
                                    })
                                }
                            } catch (t) {
                                e._warn("Tracert 接口异常上报失败:", t)
                            }
                    }
                    if ("onreadystatechange"in n && "function" == typeof n.onreadystatechange) {
                        var a = n.onreadystatechange;
                        n.onreadystatechange = function() {
                            for (var e = Array(arguments.length), t = 0; e.length > t; ++t)
                                e[t] = arguments[t];
                            i.apply(this, e),
                                a.apply(this, e)
                        }
                    } else
                        n.onreadystatechange = i;
                    for (var s = Array(arguments.length), c = 0; s.length > c; ++c)
                        s[c] = arguments[c];
                    return o.apply(this, arguments)
                }
            }
            if ("fetch"in win) {
                var i = win.fetch;
                win.fetch = function() {
                    for (var r = Array(arguments.length), n = 0; r.length > n; ++n)
                        r[n] = arguments[n];
                    var o = "GET";
                    return r[1] && r[1].method && (o = r[1].method.toUpperCase()),
                        i.apply(this, r).then((function(n) {
                                return new Promise((function(i) {
                                        try {
                                            var a = r[0]
                                                , s = a.split("?")[0]
                                                , c = a.split("?")[1] || ""
                                                , u = r[1] && r[1].body || ""
                                                , l = "string" == typeof u ? u : JSON.stringify(u);
                                            n.clone().text().then((function(r) {
                                                    n.ok && !t || e.logRequestError({
                                                        type: "http",
                                                        status: n.status,
                                                        url: s,
                                                        method: o,
                                                        query: c,
                                                        data: l,
                                                        response: (r || "").length > 2048 ? "[too large]" : r,
                                                        traceId: e.traceId || ""
                                                    })
                                                }
                                            )).then((function() {
                                                    i(n)
                                                }
                                            ), (function(e) {
                                                    i(n)
                                                }
                                            ))
                                        } catch (e) {
                                            i(n)
                                        }
                                    }
                                ))
                            }
                        ))
                }
            }
        }
        function hashDetection(e, t) {
            try {
                var r = new XMLHttpRequest;
                r.open("GET", "https://dataservice.alipayobjects.com/alertserver/hash/".concat(e), !0),
                    r.send(),
                    r.onreadystatechange = function() {
                        if (4 === r.readyState) {
                            if (200 === r.status || 304 === r.status)
                                return;
                            t(1)
                        }
                    }
            } catch (e) {
                this._warn("hash 监测失败", e)
            }
        }
        var es = new ErrorStack;
        function logError(e) {
            var t = this
                , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            try {
                var n = r.code || errorCodeEnums.JS
                    , o = "";
                if (e && e.stack) {
                    var i = es.stackFormatter(e)
                        , a = i.hash
                        , s = i.stackList;
                    a && s && s.length && hashDetection(a, (function() {
                            t.log({
                                code: errorCodeEnums.JS,
                                s1: a,
                                s2: compressStack(s),
                                s3: 1
                            })
                        }
                    )),
                        o = a
                }
                this.log(_objectSpread2$4({
                    code: n,
                    msg: e.message,
                    s10: o
                }, r))
            } catch (e) {
                this._warn("Tracert 异常上报失败:", e)
            }
        }
        function logHttpError(e) {
            var t = e.status
                , r = e.url
                , n = e.method
                , o = e.query
                , i = e.data
                , a = e.response
                , s = e.traceId
                , c = e.code
                , u = _objectWithoutProperties(e, ["status", "url", "method", "query", "data", "response", "traceId", "code"])
                , l = _objectSpread2$4({
                code: c || 2,
                msg: "".concat(n.toUpperCase(), " ").concat(r)
            }, u);
            t && (l.s1 = t),
            o && (l.s2 = o),
            i && (l.s3 = i),
            a && (l.s4 = a),
            s && (l.s5 = s),
                this.log(l)
        }
        function logRequestError(e) {
            try {
                if (!e)
                    return;
                var t = e.type
                    , r = void 0 === t ? "http" : t;
                "http" === r && logHttpError.call(this, e)
            } catch (e) {
                this._warn("Tracert 接口异常上报失败:", e)
            }
        }
        var win$1 = window
            , metaFieldMap = {
            bm_app_id: "_bmAppId",
            bm_sprint_id: "_bmSprintId",
            env: "_env"
        }
            , context = {
            _monitorInited: !1,
            _monitorConfigInited: !1,
            _monitorConfigFailed: !1,
            _defaultExceptionSeedId: "102023",
            _bmAppId: "",
            _bmSprintId: "",
            _cachedHttpLines: [],
            _env: "",
            _cacheLogs: [],
            _trackedLogs: [],
            _monitorConfigs: [],
            _lastAction: "0".concat(getTime(), ""),
            log: log$1,
            logError: logError,
            logRequestError: logRequestError,
            _preproccess: preproccess,
            _handleErrorOptions: handleErrorOptions$1,
            _initException: function(e) {
                if (!this._monitorInited) {
                    for (var t = nodeListToArray(window.document.getElementsByTagName("meta")), r = {}, n = 0, o = 0; t.length > o; o++) {
                        var i = t[o]
                            , a = getAttr$1(i, "name")
                            , s = getAttr$1(i, "content")
                            , c = metaFieldMap[a];
                        c && s && !this[c] && (r[c] = s,
                            n++)
                    }
                    e.TRACERT_ENV && (r._env = e.TRACERT_ENV),
                    n && this.set(r),
                        this._monitorInited = !0
                }
            },
            getErrorEventHandler: function(e) {
                return function(t) {
                    e.isErrorHandler = !0,
                        e._handleErrorOptions(t, (function(t) {
                                e.log(t)
                            }
                        ))
                }
            },
            initMonitorConfigs: function(e) {
                var t = e.monitors
                    , r = void 0 === t ? [] : t;
                if (!this._disableInterface)
                    for (var n = 0; r.length > n; n++) {
                        var o = r[n];
                        if (o.code === errorCodeEnums.REQUEST && o.isActive && !o.isDeleted) {
                            interfaceRegister(this);
                            break
                        }
                    }
                this.set({
                    _monitorConfigs: r
                }),
                    this._monitorConfigInited = !0,
                    this._onMonitorConfigInited()
            },
            _onMonitorConfigInited: function() {
                var e = this._cacheLogs;
                if (e.length) {
                    for (var t = 0; e.length > t; t++)
                        this.log(e[t]);
                    this._cacheLogs = []
                }
            },
            _warn: function() {
                if ("object" === _typeof$6(win$1) && win$1.console && "function" == typeof win$1.console.warn && this.debug) {
                    var e = Array.prototype.slice.call(arguments);
                    win$1.console.warn.apply(null, ["[Tracert Debug]".concat(e[0])].concat(e.slice(1)))
                }
            },
            _debug: function() {
                if ("object" === _typeof$6(win$1) && win$1.console && "function" == typeof win$1.console.log && this.debug) {
                    var e = Array.prototype.slice.call(arguments);
                    win$1.console.log.apply(null, ["[Tracert Debug]".concat(e[0])].concat(e.slice(1)))
                }
            }
        }
            , win$2 = window
            , doc$1$1 = win$2.document;
        function register(e) {
            try {
                if (!doc$1$1)
                    return e.warn("当前为非 web 环境，不支持报错监听与插件使用"),
                        this;
                if (e.isErrorHandler)
                    return void e.warn("错误事件已监听");
                addEvent("error", win$2, e.getErrorEventHandler(e)),
                    addEvent("unhandledrejection", win$2, e.getErrorEventHandler(e))
            } catch (t) {
                e.warn("Tracert 加载异常插件失败")
            }
        }
        function errorHandler(e) {
            this._monitorConfigInited = !0,
                this._monitorConfigFailed = !0,
                this._onMonitorConfigInited(),
                this._warn("Tracert 获取服务端配置失败：", e)
        }
        function addScript(e) {
            var t = this
                , r = errorHandler.bind(this)
                , n = document.createElement("script");
            n.src = e,
                n.onerror = function(e) {
                    e.stopPropagation(),
                        r.call(t, e)
                }
                ,
                document.head.appendChild(n),
                setTimeout((function() {
                        t._monitorConfigInited || r.call(t, "超时")
                    }
                ), 5e3)
        }
        function fetchConfig(Tracert) {
            var onError = errorHandler.bind(Tracert);
            if (!Tracert._bmAppId)
                return setTimeout((function() {
                        onError("没有 bmAppid")
                    }
                ));
            var isPre = "pre" === Tracert._env
                , url = "https://render.alipay.com/p/alertserver".concat(isPre ? "_pre" : "", "/").concat(Tracert._bmAppId, "_config/index.js");
            window.AlipayJSBridge ? window.AlipayJSBridge.call("httpRequest", {
                url: url,
                method: "GET",
                contentType: "application/json"
            }, (function(res) {
                    if (res && 200 === res.status)
                        try {
                            eval(res.data)
                        } catch (e) {
                            onError(e)
                        }
                    else
                        onError("未找到配置")
                }
            )) : addScript.call(Tracert, url)
        }
        function fetchConfig$1(e) {
            try {
                fetchConfig(e)
            } catch (e) {
                errorHandler.call(this)
            }
        }
        function send(e, t) {
            e.postMessage(JSON.stringify(t), "*")
        }
        var verifyKey = "__TRACERT_MONITOR_verify";
        function verify(e) {
            var t, r = cross_iframe$1.initIframe();
            addEvent("load", r, (function() {
                    send(t = r.contentWindow, {
                        type: "storage",
                        action: "get",
                        key: verifyKey
                    })
                }
            )),
                addEvent("message", window, (function(r) {
                        try {
                            var n = JSON.parse(r.data);
                            if ("getStorage" === n.type && n.key === verifyKey) {
                                var o = JSON.parse(n.value) || {};
                                o[e._bmAppId] = 1,
                                t && send(t, {
                                    type: "storage",
                                    action: "set",
                                    key: verifyKey,
                                    value: JSON.stringify(o)
                                })
                            }
                        } catch (e) {}
                    }
                ))
        }
        function setVerify(e) {
            e._bmAppId ? load((function() {
                    verify(e),
                        setTimeout((function() {
                                alert("请关闭该页面查看验证结果"),
                                    setTimeout((function() {
                                            window.parent && window.parent.close && window.parent.close()
                                        }
                                    ))
                            }
                        ), 100)
                }
            )) : alert("未获取到应用ID")
        }
        var spliter = ""
            , doc$2 = document
            , docEl$1 = doc$2.documentElement;
        function setLastAction(e, t) {
            try {
                var r = []
                    , n = "click" === e.type;
                r.push(n ? 1 : 2);
                var o = n ? "".concat(getXPath$2(e.target, 5)) : "";
                r.push(o),
                    r.push(getTime());
                var i = n ? "".concat(e.x, "x").concat(e.y) : "".concat(docEl$1.scrollLeft + doc$2.body.scrollLeft, "x").concat(docEl$1.scrollTop + doc$2.body.scrollTop);
                r.push(i);
                var a = e.target && e.target.innerText
                    , s = a ? "".concat(a.slice(0, 8)) : "";
                r.push(s),
                    t._lastAction = r.join(spliter)
            } catch (e) {}
        }
        function lastAction(e) {
            var t;
            addEvent("scroll", document, (function(r) {
                    t || (t = !0,
                        setTimeout((function() {
                                t = !1
                            }
                        ), 300),
                        setLastAction(r, e))
                }
            )),
                addEvent("click", document, (function(t) {
                        setLastAction(t, e)
                    }
                ))
        }
        function getQueries() {
            for (var e = {}, t = window.location.search.substring(1).split("&").map((function(e) {
                    return e.split("=")
                }
            )), r = 0; t.length > r; r++) {
                var n = t[r];
                e[n[0]] = n[1]
            }
            return e
        }
        function handlePreCapture(e) {
            var t = window.g_monitor;
            if (t) {
                var r = t.listener
                    , n = void 0 === r ? {} : r
                    , o = t.events
                    , i = void 0 === o ? [] : o;
                for (var a in n)
                    n.hasOwnProperty(a) && (removeEvent(a, window, n[a]),
                        delete n[a]);
                for (var s = 0; i.length > s; s++)
                    e._handleErrorOptions(i[s], (function(t) {
                            e.log(t)
                        }
                    ));
                t.events = []
            }
        }
        var throttleWait = 0
            , maxRecordLen = 10
            , cachedHttpLineData = [];
        function sendHttpRequest$2(e) {
            try {
                var t = new XMLHttpRequest;
                t.open("POST", "https://mdap.alipay.com/loggw/dwcookieLogGet.do", !0),
                    t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                    t.send("data=".concat(e, "&time=").concat((new Date).getTime()))
            } catch (t) {
                try {
                    (new Image).src = "".concat(this.server, "?data=").concat(e, "&time=").concat((new Date).getTime())
                } catch (e) {
                    this._warn("Tracert 通过 IMG 上报失败.", e)
                }
            }
        }
        var sendAll = null;
        function httpLog(e) {
            0 === throttleWait ? sendHttpRequest$2(e) : (cachedHttpLineData.push(e),
            sendAll && sendAll())
        }
        function throttle$2(e) {
            var t = null;
            return function() {
                var r = this
                    , n = arguments;
                function o() {
                    clearTimeout(t),
                        t = null,
                        e.apply(r, n)
                }
                maxRecordLen > cachedHttpLineData.length ? t || (t = setTimeout((function() {
                        o()
                    }
                ), throttleWait)) : o()
            }
        }
        function getHttpLog() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return throttleWait = e,
                sendAll = throttle$2((function() {
                        if (cachedHttpLineData.length) {
                            var e = cachedHttpLineData.join("$$");
                            cachedHttpLineData = [],
                                sendHttpRequest$2(e)
                        }
                    }
                )),
                httpLog
        }
        function getInfoFromBridge(e) {
            try {
                var t = window.AlipayJSBridge;
                t.call("getUserInfo", (function(t) {
                        e.cUserId = t.userId
                    }
                )),
                    t.call("getStartupParams", (function(t) {
                            e.cOfflineVer = t.version,
                            t.version && (e.cAppId = t.appId)
                        }
                    ))
            } catch (t) {
                setTimeout((function() {
                        e._warn("调用容器接口获取信息失败", t)
                    }
                ))
            }
        }
        function init$2(e, t) {
            if (!e._monitorInited && t && "object" === _typeof$6(t)) {
                var r = t.autoCapture
                    , n = void 0 === r || r
                    , o = t.httpThrottle
                    , i = void 0 === o ? {} : o;
                e.set({
                    _bmAppId: t.bmAppid,
                    _bmSprintId: t.bmSprintId,
                    _disableInterface: !!t.disableInterface,
                    oncePerSession: !!t.oncePerSession,
                    beforeLog: t.beforeLog
                }),
                    e._httpLog = getHttpLog(i.wait || 0);
                var a = getQueries();
                e._initException(a),
                    fetchConfig$1(e),
                    window.AlipayJSBridge ? getInfoFromBridge(e) : document.addEventListener("AlipayJSBridgeReady", (function() {
                            getInfoFromBridge(e)
                        }
                    ), !1),
                "1" === a.TRACERT_VERIFY && setVerify(e),
                    handlePreCapture(e),
                n && register(e),
                    lastAction(e)
            }
        }
        window.hashDetection = hashDetection;
        var index$2 = function(e, t) {
            return e.set(_objectSpread2$4({}, context)),
                init$2(e, e.monitorOptions),
                e.after("start", (function() {
                        init$2(e, e.monitorOptions)
                    }
                )),
                e.before("set", (function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                            , r = t.monitorOptions;
                        init$2(e, r)
                    }
                )),
                t(),
                e
        };
        function ownKeys$5(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$5(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$5(Object(r), !0).forEach((function(t) {
                        _defineProperty$6(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$5(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$7(e) {
            return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$7(e)
        }
        function _defineProperty$6(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        var spmAbTest = "data-aspm-ab"
            , spmEntityid = "data-aspm-entityid";
        function spmEventHandler(e) {
            var t = this
                , r = t.getClickSpm(e.target || e.srcElement);
            if ("object" === _typeof$7(r) && r.spmId) {
                var n = r.dom
                    , o = {};
                getAttr$1(n, spmAbTest) && (o.abTest = !0),
                getAttr$1(n, spmEntityid) && (o.entityId = getAttr$1(n, spmEntityid));
                var i = getContentParam$1(n);
                i && i.param5 && (o.param5 = i.param5,
                    o.newScm = i.newScm);
                var a = getDomConfig(n) || {};
                t.call("click", r.spmId, getDomParam$1(n), o, _objectSpread2$5({
                    combineType: index$1.COMBINE_TYPE.MIX,
                    event: e
                }, a))
            } else
                t.call("click", "", void 0, void 0, {
                    combineType: index$1.COMBINE_TYPE.AUTO,
                    event: e
                })
        }
        var context$1 = {
            spmClickEvent: function(e, t) {
                var r = this
                    , n = t || this.eventType;
                if (n) {
                    "function" == typeof this._clickEventDisposer && this._clickEventDisposer();
                    this._clickEventDisposer = ownAddEventListener(n, this.container || window.document, (function(e) {
                            !1 !== r._runBeforeFns("autoClick", e) && spmEventHandler.call(r, e)
                        }
                    )),
                        this.call("addSideEffects", this._clickEventDisposer)
                }
            },
            _spmEventHandler: spmEventHandler,
            getClickSpm: function(e) {
                var t = getDPosDom$1(e)
                    , r = getSpmDPos$1(t)
                    , n = {
                    dom: t,
                    spmId: ""
                };
                if (!this.spmAPos || !this.spmBPos)
                    return n;
                if (t && r) {
                    var o = r.split(".")
                        , i = o.length
                        , a = "";
                    if (1 === i) {
                        if (!(a = getSpmCPos$1(t)))
                            return n;
                        o.unshift(a)
                    }
                    if (3 === i)
                        return n;
                    n.spmId = o.join(".")
                }
                return n
            }
        }
            , autoClick = function(e, t) {
            return e.set(_objectSpread2$5({}, context$1)),
                e.spmClickEvent("", e.eventType),
                e.before("set", (function(t) {
                        var r = t;
                        r.eventType = r.eventType || r.eventName,
                        r.eventType && e.spmClickEvent(e.eventType, r.eventType)
                    }
                )),
                t(),
                e
        };
        function getDefaultExportFromCjs(e) {
            return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
        }
        function createCommonjsModule$1(e, t, r) {
            return r = {
                path: t,
                exports: {},
                require: function(e, t) {
                    return commonjsRequire(e, null == t ? r.path : t)
                }
            },
                e(r, r.exports),
                r.exports
        }
        function commonjsRequire() {
            throw Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
        }
        var base$1 = createCommonjsModule$1((function(e, t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                    t.default = function(e, t, r) {
                        var n = void 0;
                        return -t > e ? n = -1 : 0 > e ? n = e / t : r > e + t ? n = 0 : r > e ? n = (e + t - r) / t : r > e || (n = 1),
                            n
                    }
                    ,
                    e.exports = t.default
            }
        ))
            , y = createCommonjsModule$1((function(e, t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r, n = (r = base$1) && r.__esModule ? r : {
                    default: r
                };
                var o = window.document.documentElement;
                t.default = function(e) {
                    var t = e.getBoundingClientRect();
                    return (0,
                        n.default)(t.top, t.height, o.clientHeight)
                }
                    ,
                    e.exports = t.default
            }
        ))
            , yStatus = getDefaultExportFromCjs(y)
            , x = createCommonjsModule$1((function(e, t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r, n = (r = base$1) && r.__esModule ? r : {
                    default: r
                };
                var o = window.document.documentElement;
                t.default = function(e) {
                    var t = e.getBoundingClientRect();
                    return (0,
                        n.default)(t.left, t.width, o.clientWidth)
                }
                    ,
                    e.exports = t.default
            }
        ))
            , xStatus = getDefaultExportFromCjs(x);
        function ownKeys$6(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$6(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$6(Object(r), !0).forEach((function(t) {
                        _defineProperty$7(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$6(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _defineProperty$7(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        function _slicedToArray$1(e, t) {
            return _arrayWithHoles$2(e) || _iterableToArrayLimit$1(e, t) || _unsupportedIterableToArray$2(e, t) || _nonIterableRest$2()
        }
        function _arrayWithHoles$2(e) {
            if (Array.isArray(e))
                return e
        }
        function _iterableToArrayLimit$1(e, t) {
            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != r) {
                var n, o, i = [], a = !0, s = !1;
                try {
                    for (r = r.call(e); !(a = (n = r.next()).done) && (i.push(n.value),
                    !t || i.length !== t); a = !0)
                        ;
                } catch (e) {
                    s = !0,
                        o = e
                } finally {
                    try {
                        a || null == r.return || r.return()
                    } finally {
                        if (s)
                            throw o
                    }
                }
                return i
            }
        }
        function _unsupportedIterableToArray$2(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return _arrayLikeToArray$2(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray$2(e, t) : void 0
            }
        }
        function _arrayLikeToArray$2(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = Array(t); t > r; r++)
                n[r] = e[r];
            return n
        }
        function _nonIterableRest$2() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var EXPO_TYPE = {
            DISAPPEAR: 0,
            START: 1,
            HAFT: 2,
            WHOLE: 4,
            EXPOSURED: 8
        };
        function singleAxisPercent(e, t, r) {
            var n;
            return -t > e ? n = -1 : 0 > e ? n = e / t : r > e + t ? n = 0 : r > e ? n = (e + t - r) / t : r > e || (n = 1),
                n
        }
        function isNoneDom(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (!e)
                return !0;
            if (!e.offsetParent) {
                if (!t || "function" != typeof window.getComputedStyle)
                    return !0;
                var r = window.getComputedStyle(e) || {};
                if (!r.position || "fixed" !== r.position.toLowerCase())
                    return !0;
                if (r.display && "none" === r.display.toLowerCase())
                    return !0
            }
            return !1
        }
        function expoSamePosition(e, t) {
            return 0 === e ? 0 == (7 & t) : e === (t & e)
        }
        function isEffectiveExpo(e) {
            return 0 != (e & (EXPO_TYPE.HAFT | EXPO_TYPE.WHOLE))
        }
        function setExpoStatus(e, t) {
            return e !== EXPO_TYPE.DISAPPEAR ? t | e : isEffectiveExpo(t) ? EXPO_TYPE.EXPOSURED : t >> 3 << 3
        }
        function getDomXYPercent(e) {
            var t = e.getBoundingClientRect()
                , r = window.document.documentElement
                , n = singleAxisPercent(t.left, t.width, r.clientWidth)
                , o = singleAxisPercent(t.top, t.height, r.clientHeight);
            return [n, o, Math.round((1 - Math.abs(n)) * (1 - Math.abs(o)) * 100), 0 === t.height || 0 === t.width]
        }
        function getExpoDomDs(e, t, r) {
            e[r] || (e[r] = {}),
            e[r][t] || (e[r][t] = {
                uuid: uuid(),
                status: 0,
                percent: 0,
                direction: [-1, -1]
            });
            var n = e[r][t];
            return n.direction = n.direction || [-1, -1],
                n
        }
        function getExpoSpmDPos(e, t, r) {
            var n = getDPosDom$1(e)
                , o = {
                dom: n,
                spmId: ""
            };
            if (!t || !r)
                return o;
            var i = getSpmDPos$1(n);
            if (n && i) {
                var a = i.split(".");
                if (1 === a.length && a.unshift(getSpmCPos$1(n)),
                a[0] && a[1])
                    o.spmId = [t, r].concat(a).join(".")
            }
            return o
        }
        function getExpoSpmCPos(e, t, r) {
            var n = {
                dom: e,
                spmId: ""
            };
            if (!t || !r)
                return n;
            var o = getSpmCPos$1(e);
            return o ? (n.spmId = [t, r, o].join("."),
                n) : n
        }
        function getSpmIdAndDom(e, t, r) {
            var n = getExpoSpmDPos(e, t, r);
            if (n.spmId)
                return n;
            var o = getExpoSpmCPos(e, t, r);
            return o.spmId ? o : {}
        }
        function getExpoInfos(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , r = arguments.length > 2 ? arguments[2] : void 0
                , n = getDomXYPercent(e)
                , o = _slicedToArray$1(n, 4)
                , i = o[0]
                , a = o[1]
                , s = o[2]
                , c = o[3]
                , u = _slicedToArray$1(t.direction, 2)
                , l = u[0]
                , p = u[1];
            if (!0 !== c && (l !== i || p !== a)) {
                var f = r.expoSection || []
                    , d = _slicedToArray$1(f, 2)
                    , m = d[0]
                    , g = d[1]
                    , h = {
                    expoDirection: "",
                    percent: s,
                    direction: [i, a]
                }
                    , v = !(m > a || a > g || m > i || i > g);
                if (v)
                    m > p ? h.expoDirection = "up" : p > g ? h.expoDirection = "down" : m > l ? h.expoDirection = "left" : l > g ? h.expoDirection = "right" : t.percent !== s && (h.expoDirection = "");
                else if (t.percent === s)
                    return;
                return h
            }
        }
        function isObject$2(e) {
            var t = _typeof$1(e);
            return null != e && ("object" == t || "function" == t)
        }
        var freeGlobal$1 = "object" == ("undefined" == typeof global ? "undefined" : _typeof$1(global)) && global && global.Object === Object && global
            , freeSelf$1 = "object" == ("undefined" == typeof self ? "undefined" : _typeof$1(self)) && self && self.Object === Object && self
            , root$1 = freeGlobal$1 || freeSelf$1 || Function("return this")()
            , now$1 = function() {
            return root$1.Date.now()
        }
            , reWhitespace$1 = /\s/;
        function trimmedEndIndex$1(e) {
            for (var t = e.length; t-- && reWhitespace$1.test(e.charAt(t)); )
                ;
            return t
        }
        var reTrimStart$1 = /^\s+/;
        function baseTrim$1(e) {
            return e ? e.slice(0, trimmedEndIndex$1(e) + 1).replace(reTrimStart$1, "") : e
        }
        var Symbol$1$1 = root$1.Symbol
            , objectProto$2 = Object.prototype
            , hasOwnProperty$1 = objectProto$2.hasOwnProperty
            , nativeObjectToString$2 = objectProto$2.toString
            , symToStringTag$2 = Symbol$1$1 ? Symbol$1$1.toStringTag : void 0;
        function getRawTag$1(e) {
            var t = hasOwnProperty$1.call(e, symToStringTag$2)
                , r = e[symToStringTag$2];
            try {
                e[symToStringTag$2] = void 0;
                var n = !0
            } catch (e) {}
            var o = nativeObjectToString$2.call(e);
            return n && (t ? e[symToStringTag$2] = r : delete e[symToStringTag$2]),
                o
        }
        var objectProto$1$1 = Object.prototype
            , nativeObjectToString$1$1 = objectProto$1$1.toString;
        function objectToString$1(e) {
            return nativeObjectToString$1$1.call(e)
        }
        var nullTag$1 = "[object Null]"
            , undefinedTag$1 = "[object Undefined]"
            , symToStringTag$1$1 = Symbol$1$1 ? Symbol$1$1.toStringTag : void 0;
        function baseGetTag$1(e) {
            return null == e ? void 0 === e ? undefinedTag$1 : nullTag$1 : symToStringTag$1$1 && symToStringTag$1$1 in Object(e) ? getRawTag$1(e) : objectToString$1(e)
        }
        function isObjectLike$1(e) {
            return null != e && "object" == _typeof$1(e)
        }
        var symbolTag$1 = "[object Symbol]";
        function isSymbol$1(e) {
            return "symbol" == _typeof$1(e) || isObjectLike$1(e) && baseGetTag$1(e) == symbolTag$1
        }
        var NAN$1 = NaN
            , reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i
            , reIsBinary$1 = /^0b[01]+$/i
            , reIsOctal$1 = /^0o[0-7]+$/i
            , freeParseInt$1 = parseInt;
        function toNumber$1(e) {
            if ("number" == typeof e)
                return e;
            if (isSymbol$1(e))
                return NAN$1;
            if (isObject$2(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = isObject$2(t) ? t + "" : t
            }
            if ("string" != typeof e)
                return 0 === e ? e : +e;
            e = baseTrim$1(e);
            var r = reIsBinary$1.test(e);
            return r || reIsOctal$1.test(e) ? freeParseInt$1(e.slice(2), r ? 2 : 8) : reIsBadHex$1.test(e) ? NAN$1 : +e
        }
        var FUNC_ERROR_TEXT$2 = "Expected a function"
            , nativeMax$1 = Math.max
            , nativeMin$1 = Math.min;
        function debounce$2(e, t, r) {
            var n, o, i, a, s, c, u = 0, l = !1, p = !1, f = !0;
            if ("function" != typeof e)
                throw new TypeError(FUNC_ERROR_TEXT$2);
            function d(t) {
                var r = n
                    , i = o;
                return n = o = void 0,
                    u = t,
                    a = e.apply(i, r)
            }
            function m(e) {
                return u = e,
                    s = setTimeout(h, t),
                    l ? d(e) : a
            }
            function g(e) {
                var r = e - c;
                return void 0 === c || r >= t || 0 > r || p && e - u >= i
            }
            function h() {
                var e = now$1();
                if (g(e))
                    return v(e);
                s = setTimeout(h, function(e) {
                    var r = t - (e - c);
                    return p ? nativeMin$1(r, i - (e - u)) : r
                }(e))
            }
            function v(e) {
                return s = void 0,
                    f && n ? d(e) : (n = o = void 0,
                        a)
            }
            function y() {
                var e = now$1()
                    , r = g(e);
                if (n = arguments,
                    o = this,
                    c = e,
                    r) {
                    if (void 0 === s)
                        return m(c);
                    if (p)
                        return clearTimeout(s),
                            s = setTimeout(h, t),
                            d(c)
                }
                return void 0 === s && (s = setTimeout(h, t)),
                    a
            }
            return t = toNumber$1(t) || 0,
            isObject$2(r) && (l = !!r.leading,
                i = (p = "maxWait"in r) ? nativeMax$1(toNumber$1(r.maxWait) || 0, t) : i,
                f = "trailing"in r ? !!r.trailing : f),
                y.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                        u = 0,
                        n = c = o = s = void 0
                }
                ,
                y.flush = function() {
                    return void 0 === s ? a : v(now$1())
                }
                ,
                y
        }
        var FUNC_ERROR_TEXT$1$1 = "Expected a function";
        function throttle$3(e, t, r) {
            var n = !0
                , o = !0;
            if ("function" != typeof e)
                throw new TypeError(FUNC_ERROR_TEXT$1$1);
            return isObject$2(r) && (n = "leading"in r ? !!r.leading : n,
                o = "trailing"in r ? !!r.trailing : o),
                debounce$2(e, t, {
                    leading: n,
                    maxWait: t,
                    trailing: o
                })
        }
        var mutationAttributes = ["data-aspm-click", "data-aspm-expo", "data-aspm", "data-aspm-param"];
        function mutationCallback() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                , t = arguments.length > 1 ? arguments[1] : void 0;
            e && 0 !== e.length && e.forEach((function(e) {
                    var r = e.addedNodes
                        , n = void 0 === r ? [] : r
                        , o = e.removedNodes
                        , i = void 0 === o ? [] : o
                        , a = e.type;
                    switch (void 0 === a ? "" : a) {
                        case "attributes":
                            e.target && t.expoCheck(e.target);
                            break;
                        case "subtree":
                        case "childList":
                            n && n.length && nodeListToArray(n).forEach((function(e) {
                                    return t.expoCheck(e)
                                }
                            )),
                            i && i.length && checkRemovedNodes(nodeListToArray(i), t)
                    }
                }
            ))
        }
        function checkRemovedNodes(e, t) {
            var r = [];
            e.forEach((function(e) {
                    e.getAttribute && null !== e.getAttribute("data-aspm-expo") && r.push(e),
                    "function" == typeof e.querySelectorAll && (r = r.concat(nodeListToArray(e.querySelectorAll("[data-aspm-expo]"))))
                }
            )),
                r.forEach((function(e) {
                        var r = e[t._instanceId] || {};
                        e[t._instanceId] = {},
                            Object.keys(r).forEach((function(n) {
                                    r[n] && 0 != (7 & r[n].status) && t._doExpo(n, e, e, {
                                        percent: 0,
                                        combineType: "auto",
                                        expoState: "end"
                                    })
                                }
                            ))
                    }
                ))
        }
        function throttleMutation(e, t) {
            var r = []
                , n = throttle$3((function() {
                    var t = [].concat(r);
                    r.length = 0,
                        e(t)
                }
            ), t, {
                leading: !1,
                trailing: !0
            });
            return function(e) {
                e.forEach((function(e) {
                        var t = e.target
                            , n = e.type
                            , o = r.find((function(e) {
                                return e.target === t && e.type === n
                            }
                        ));
                        (t && !o || "attributes" !== n) && r.push(e)
                    }
                )),
                    n()
            }
        }
        function createMutation(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : []
                , n = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            if (!n)
                return null;
            var o = new n(e)
                , i = t || document.querySelector("body")
                , a = {
                attributes: !0,
                childList: !0,
                subtree: !0,
                attributeFilter: mutationAttributes.concat(r)
            };
            return o.observe(i, a),
                o
        }
        var EXPO_TYPE$1 = EXPO_TYPE;
        function intersectionExpo(e, t) {
            var r = t.spmAPos
                , n = t.spmBPos;
            e.forEach((function(e) {
                    var o = e.isIntersecting
                        , i = e.intersectionRatio
                        , a = e.target;
                    if (isNoneDom(a, t.expoFixedDom))
                        t.intersectionObserver.unobserve(a);
                    else {
                        var s = getSpmIdAndDom(a, r, n)
                            , c = s.spmId
                            , u = s.dom;
                        if (c) {
                            var l = 0
                                , p = EXPO_TYPE$1.DISAPPEAR;
                            o && (p = 1 === i ? EXPO_TYPE$1.WHOLE : .5 > i ? EXPO_TYPE$1.START : EXPO_TYPE$1.HAFT,
                                l = Math.floor(100 * i));
                            var f = getExpoDomDs(a, c, t._instanceId)
                                , d = f.status;
                            if (!expoSamePosition(p, d)) {
                                var m = "auto";
                                !isEffectiveExpo(d) && isEffectiveExpo(p) && (m = "mix"),
                                    t._doExpo(c, u, a, {
                                        percent: l,
                                        combineType: m,
                                        uuid: f.uuid,
                                        expoState: p === EXPO_TYPE$1.DISAPPEAR ? "end" : "start"
                                    }, (function() {
                                            f.status = setExpoStatus(p, f.status)
                                        }
                                    ))
                            }
                        }
                    }
                }
            ))
        }
        function createIntersection(e, t) {
            if (window.IntersectionObserver && window.IntersectionObserverEntry) {
                return new IntersectionObserver((function(r) {
                        e(r, t)
                    }
                ),{
                    threshold: [0, .5, 1]
                })
            }
        }
        var EXPO_TYPE$2 = EXPO_TYPE;
        function oldExpoMethod(e, t) {
            if (!isNoneDom(e, t.expoFixedDom)) {
                var r = getSpmIdAndDom(e, t.spmAPos, t.spmBPos)
                    , n = r.spmId
                    , o = r.dom;
                if (n) {
                    var i = getExpoDomDs(e, n, t._instanceId)
                        , a = getExpoInfos(o, i, t);
                    if (a) {
                        var s = a.percent
                            , c = a.expoDirection
                            , u = EXPO_TYPE$2.START;
                        if (100 === s ? u = EXPO_TYPE$2.WHOLE : 50 > s ? 0 === s && 0 != (7 & i.status) && (u = EXPO_TYPE$2.DISAPPEAR) : u = EXPO_TYPE$2.HAFT,
                        c || !expoSamePosition(u, i.status))
                            t._doExpo(n, o, e, {
                                combineType: c ? "mix" : "auto",
                                percent: s,
                                expoDirection: c,
                                expoState: u === EXPO_TYPE$2.DISAPPEAR ? "end" : "start",
                                uuid: i.uuid
                            }, (function() {
                                    i.status = setExpoStatus(u, i.status),
                                        i.direction = a.direction,
                                        i.percent = s
                                }
                            ));
                        else
                            i.direction = a.direction
                    }
                }
            }
        }
        var context$2 = {
            _expoTypeHandle: null,
            _exposureKey: "__uepExposureData",
            enableWatchStyle: !1,
            _getYStatus: function(e) {
                return yStatus(e)
            },
            _getXStatus: function(e) {
                return xStatus(e)
            },
            _getExpoDomDs: function(e, t) {
                e[this._instanceId] || (e[this._instanceId] = {}),
                e[this._instanceId][t] || (e[this._instanceId][t] = {}),
                e[this._instanceId][t][this._exposureKey] || (e[this._instanceId][t][this._exposureKey] = {
                    percent: 0,
                    direction: [-1, -1]
                });
                var r = e[this._instanceId][t][this._exposureKey];
                return r.direction = r.direction || [-1, -1],
                    r
            },
            _setExpoDomDs: function(e, t, r) {
                e[this._instanceId] || (e[this._instanceId] = {}),
                e[this._instanceId][r] || (e[this._instanceId][r] = {}),
                    e[this._instanceId][r][this._exposureKey] = t
            },
            _doExpo: function(e, t, r, n, o) {
                var i = getDomParam$1(t)
                    , a = getDomConfig(t) || {}
                    , s = getContentParam$1(t)
                    , c = n || {}
                    , u = c.expoDirection
                    , l = c.combineType
                    , p = c.expoState
                    , f = c.uuid;
                s.percent = c.percent,
                !0 === this.expo(e, u || "", i, s, _objectSpread2$6({
                    combineType: l,
                    expoState: p || "end",
                    event: r,
                    uuid: f
                }, a)) && "function" == typeof o && o()
            },
            expoCheck: function(e) {
                if ((e || (e = this.container || document),
                "function" == typeof e.querySelectorAll) && !1 !== this._runBeforeFns("autoExpo", e)) {
                    var t = nodeListToArray(e.querySelectorAll("[data-aspm-expo]"));
                    "function" == typeof e.getAttribute && null !== e.getAttribute("data-aspm-expo") && t.push(e);
                    for (var r = 0; t.length > r; r++) {
                        var n = t[r];
                        this.intersectionObserver ? (this.intersectionObserver.unobserve(n),
                            this.intersectionObserver.observe(n)) : oldExpoMethod(n, this)
                    }
                }
            },
            startAutoExpo: function() {
                var e = this;
                "function" == typeof this._expoTypeHandle && this._expoTypeHandle(),
                this.enableIntersectionObserver && (this.intersectionObserver = this.intersectionObserver || createIntersection(intersectionExpo, this)),
                this.intersectionObserver || (this._expoTypeHandle = this.expoType((function() {
                        e.expoCheck()
                    }
                ))),
                    this.expoCheck(),
                    this.startMutationObserver(document.querySelector("body"), void 0, this.enableWatchStyle ? ["style"] : []),
                    this.call("addSideEffects", this.stopAutoExpo)
            },
            stopAutoExpo: function() {
                this._expoTypeHandle && this._expoTypeHandle(),
                    this.destroyMutationObserver()
            },
            _observerCb: function() {
                var e = this
                    , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                0 !== t.length && t.forEach((function(t) {
                        var r = t.target.parentNode
                            , n = t.addedNodes
                            , o = t.removedNodes
                            , i = void 0 === o ? [] : o
                            , a = t.type;
                        switch (void 0 === a ? "" : a) {
                            case "attributes":
                                r && e.expoCheck(r);
                                break;
                            case "subtree":
                            case "childList":
                                n && n.length && e._changeNodes(nodeListToArray(n).concat(nodeListToArray(i)))
                        }
                    }
                ))
            },
            _changeNodes: function() {
                var e = this
                    , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                t.forEach((function(t) {
                        e.expoCheck(t.parentNode)
                    }
                ))
            },
            _mutationObserver: function(e, t) {
                this.mutationObserver && this.mutationObserver.observe(e, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0,
                    attributeFilter: ["data-aspm-click", "data-aspm-expo", "data-aspm", "data-aspm-param"].concat(t),
                    characterData: !0
                })
            },
            startMutationObserver: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500
                    , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                if (this.mutationObserver)
                    console.warn("mutationObserver 已开启，请不要重复调用");
                else {
                    var n = this
                        , o = throttleMutation((function(e) {
                            mutationCallback(e, n)
                        }
                    ), t)
                        , i = createMutation(o, e || this.container, r);
                    i && (this.mutationObserver = i)
                }
            },
            stopMutationObserver: function() {
                this.mutationObserver && this.mutationObserver.disconnect()
            },
            destroyMutationObserver: function() {
                this.mutationObserver && (this.stopMutationObserver(),
                    this.mutationObserver = null,
                    delete this.mutationObserver)
            },
            getExpoSpmCPos: function(e) {
                var t = {
                    dom: e,
                    spmId: ""
                };
                if (!this.spmAPos || !this.spmBPos)
                    return t;
                var r = getSpmCPos$1(e);
                return r ? (t.spmId = [this.spmAPos, this.spmBPos, r].join("."),
                    t) : t
            },
            getExpoSpmDPos: function(e) {
                var t = getDPosDom$1(e)
                    , r = getSpmDPos$1(t)
                    , n = {
                    dom: t,
                    spmId: ""
                };
                if (!this.spmAPos || !this.spmBPos)
                    return n;
                if (t && r) {
                    var o = r.split(".")
                        , i = !0;
                    if (1 === o.length)
                        o.unshift(getSpmCPos$1(t));
                    for (var a = 0; 2 > a; a++)
                        if (!o[a]) {
                            i = !1;
                            break
                        }
                    if (i)
                        n.spmId = [this.spmAPos, this.spmBPos].concat(o).join(".")
                }
                return n
            }
        }
            , autoExpo = function(e, t) {
            e.set(_objectSpread2$6({}, context$2));
            var r = !0;
            return e.before("set", (function(t) {
                    if (t.autoExpo)
                        return void 0 !== e._calledLogPv ? e._calledLogPv ? void e.call("startAutoExpo") : void e.after("logPv", (function() {
                                r && e.call("startAutoExpo"),
                                    r = !1
                            }
                        )) : void e.call("startAutoExpo")
                }
            )),
            t && t(),
                e
        };
        function _classCallCheck$4(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties$4(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass$4(e, t, r) {
            return t && _defineProperties$4(e.prototype, t),
            r && _defineProperties$4(e, r),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                e
        }
        var RouterChange = function() {
            function e() {
                _classCallCheck$4(this, e),
                    this.handlerArr = [],
                    this.lastPath = location.pathname,
                    this.timer = null,
                    this.hashEventArray = ["hashchange", "popstate"],
                history.pushState && window.addEventListener && (this.removeEffects = this.init())
            }
            return _createClass$4(e, [{
                key: "onChange",
                value: function(e) {
                    var t = this.handlerArr;
                    return t.push(e),
                        function() {
                            for (var r = 0; t.length > r; r++)
                                if (t[r] === e) {
                                    t.splice(r, 1);
                                    break
                                }
                        }
                }
            }, {
                key: "batchExecHandlers",
                value: function(e) {
                    var t = this.handlerArr
                        , r = location.pathname !== this.lastPath;
                    r || e && -1 === this.hashEventArray.indexOf(e.type) || (r = location.hash && !url.isAnchor(location.hash)),
                    r && (this.timer && clearTimeout(this.timer),
                        this.timer = setTimeout((function() {
                                try {
                                    t.forEach((function(e) {
                                            "function" == typeof e && e()
                                        }
                                    ))
                                } catch (e) {}
                            }
                        ))),
                        this.lastPath = location.pathname
                }
            }, {
                key: "init",
                value: function() {
                    var e = window.history
                        , t = e.pushState
                        , r = e.replaceState
                        , n = this.batchExecHandlers.bind(this);
                    e.pushState = function() {
                        t.apply(this, arguments),
                            n()
                    }
                        ,
                        e.replaceState = function() {
                            r.apply(this, arguments),
                                n()
                        }
                    ;
                    var o = ownAddEventListener("popstate", window, n, !0)
                        , i = ownAddEventListener("hashchange", window, n, !0);
                    return function() {
                        window.history.pushState = t,
                            window.history.replaceState = r,
                            o(),
                            i()
                    }
                }
            }]),
                e
        }();
        function initLogPv(e) {
            var t = noop;
            if (e._isMain) {
                var r = new RouterChange;
                t = r.onChange.bind(r),
                    e.call("addSideEffects", r.removeEffects),
                    t((function() {
                            e.autoLogPv && (e.spmAPos ? window.AlipayJSBridge || e.pathName || (e.spmBPos = uep$1.getAutoSpmB(),
                                e.call("logPv")) : e.call("logPv", {
                                combineType: "mix"
                            }))
                        }
                    ))
            }
            e.set({
                onRouterChange: t
            })
        }
        var autoLogPv = function(e, t) {
            initLogPv(e);
            var r = e.pathName || "";
            return e.after("set", (function(t) {
                    t && t.pathName && e.spmAPos && (r && e.autoLogPv && e.call("logPv"),
                        r = e.pathName)
                }
            )),
                t(),
                e
        };
        function ownKeys$7(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$7(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$7(Object(r), !0).forEach((function(t) {
                        _defineProperty$8(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$7(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _defineProperty$8(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        function isObject$3(e) {
            var t = _typeof$1(e);
            return null != e && ("object" == t || "function" == t)
        }
        var freeGlobal$2 = "object" == ("undefined" == typeof global ? "undefined" : _typeof$1(global)) && global && global.Object === Object && global
            , freeSelf$2 = "object" == ("undefined" == typeof self ? "undefined" : _typeof$1(self)) && self && self.Object === Object && self
            , root$2 = freeGlobal$2 || freeSelf$2 || Function("return this")()
            , now$2 = function() {
            return root$2.Date.now()
        }
            , reWhitespace$2 = /\s/;
        function trimmedEndIndex$2(e) {
            for (var t = e.length; t-- && reWhitespace$2.test(e.charAt(t)); )
                ;
            return t
        }
        var reTrimStart$2 = /^\s+/;
        function baseTrim$2(e) {
            return e ? e.slice(0, trimmedEndIndex$2(e) + 1).replace(reTrimStart$2, "") : e
        }
        var _Symbol = root$2.Symbol
            , objectProto$3 = Object.prototype
            , hasOwnProperty$2 = objectProto$3.hasOwnProperty
            , nativeObjectToString$3 = objectProto$3.toString
            , symToStringTag$3 = _Symbol ? _Symbol.toStringTag : void 0;
        function getRawTag$2(e) {
            var t = hasOwnProperty$2.call(e, symToStringTag$3)
                , r = e[symToStringTag$3];
            try {
                e[symToStringTag$3] = void 0;
                var n = !0
            } catch (e) {}
            var o = nativeObjectToString$3.call(e);
            return n && (t ? e[symToStringTag$3] = r : delete e[symToStringTag$3]),
                o
        }
        var objectProto$1$2 = Object.prototype
            , nativeObjectToString$1$2 = objectProto$1$2.toString;
        function objectToString$2(e) {
            return nativeObjectToString$1$2.call(e)
        }
        var nullTag$2 = "[object Null]"
            , undefinedTag$2 = "[object Undefined]"
            , symToStringTag$1$2 = _Symbol ? _Symbol.toStringTag : void 0;
        function baseGetTag$2(e) {
            return null == e ? void 0 === e ? undefinedTag$2 : nullTag$2 : symToStringTag$1$2 && symToStringTag$1$2 in Object(e) ? getRawTag$2(e) : objectToString$2(e)
        }
        function isObjectLike$2(e) {
            return null != e && "object" == _typeof$1(e)
        }
        var symbolTag$2 = "[object Symbol]";
        function isSymbol$2(e) {
            return "symbol" == _typeof$1(e) || isObjectLike$2(e) && baseGetTag$2(e) == symbolTag$2
        }
        var NAN$2 = NaN
            , reIsBadHex$2 = /^[-+]0x[0-9a-f]+$/i
            , reIsBinary$2 = /^0b[01]+$/i
            , reIsOctal$2 = /^0o[0-7]+$/i
            , freeParseInt$2 = parseInt;
        function toNumber$2(e) {
            if ("number" == typeof e)
                return e;
            if (isSymbol$2(e))
                return NAN$2;
            if (isObject$3(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = isObject$3(t) ? t + "" : t
            }
            if ("string" != typeof e)
                return 0 === e ? e : +e;
            e = baseTrim$2(e);
            var r = reIsBinary$2.test(e);
            return r || reIsOctal$2.test(e) ? freeParseInt$2(e.slice(2), r ? 2 : 8) : reIsBadHex$2.test(e) ? NAN$2 : +e
        }
        var FUNC_ERROR_TEXT$3 = "Expected a function"
            , nativeMax$2 = Math.max
            , nativeMin$2 = Math.min;
        function debounce$3(e, t, r) {
            var n, o, i, a, s, c, u = 0, l = !1, p = !1, f = !0;
            if ("function" != typeof e)
                throw new TypeError(FUNC_ERROR_TEXT$3);
            function d(t) {
                var r = n
                    , i = o;
                return n = o = void 0,
                    u = t,
                    a = e.apply(i, r)
            }
            function m(e) {
                return u = e,
                    s = setTimeout(h, t),
                    l ? d(e) : a
            }
            function g(e) {
                var r = e - c;
                return void 0 === c || r >= t || 0 > r || p && e - u >= i
            }
            function h() {
                var e = now$2();
                if (g(e))
                    return v(e);
                s = setTimeout(h, function(e) {
                    var r = t - (e - c);
                    return p ? nativeMin$2(r, i - (e - u)) : r
                }(e))
            }
            function v(e) {
                return s = void 0,
                    f && n ? d(e) : (n = o = void 0,
                        a)
            }
            function y() {
                var e = now$2()
                    , r = g(e);
                if (n = arguments,
                    o = this,
                    c = e,
                    r) {
                    if (void 0 === s)
                        return m(c);
                    if (p)
                        return clearTimeout(s),
                            s = setTimeout(h, t),
                            d(c)
                }
                return void 0 === s && (s = setTimeout(h, t)),
                    a
            }
            return t = toNumber$2(t) || 0,
            isObject$3(r) && (l = !!r.leading,
                i = (p = "maxWait"in r) ? nativeMax$2(toNumber$2(r.maxWait) || 0, t) : i,
                f = "trailing"in r ? !!r.trailing : f),
                y.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                        u = 0,
                        n = c = o = s = void 0
                }
                ,
                y.flush = function() {
                    return void 0 === s ? a : v(now$2())
                }
                ,
                y
        }
        var context$3 = {
            startAutoScroll: function() {
                var e = this
                    , t = !1
                    , r = debounce$3((function(n) {
                        (t = !t) && setTimeout((function() {
                                r()
                            }
                        ), 0),
                            throttleLog({
                                params: {
                                    type: index$1.EVENT_TYPE.SCROLL,
                                    state: t ? "start" : "end",
                                    xOffset: window.scrollX,
                                    yOffset: window.scrollY,
                                    bizCode: e.bizType
                                },
                                event: n,
                                context: e,
                                combineType: index$1.COMBINE_TYPE.AUTO,
                                extParams: t ? {} : {
                                    exposureRange: {
                                        height: window.innerHeight,
                                        yOffset: window.scrollY
                                    }
                                }
                            })
                    }
                ), 500, {
                    leading: !0,
                    trailing: !0
                });
                document.addEventListener("scroll", r)
            }
        }
            , autoScroll = function(e, t) {
            return e.set(_objectSpread2$7({}, context$3)),
                e.startAutoScroll(),
                t(),
                e
        };
        function _classCallCheck$5(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties$5(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass$5(e, t, r) {
            return t && _defineProperties$5(e.prototype, t),
            r && _defineProperties$5(e, r),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                e
        }
        function _toArray$1(e) {
            return _arrayWithHoles$3(e) || _iterableToArray$2(e) || _unsupportedIterableToArray$3(e) || _nonIterableRest$3()
        }
        function _arrayWithHoles$3(e) {
            if (Array.isArray(e))
                return e
        }
        function _iterableToArray$2(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
        }
        function _unsupportedIterableToArray$3(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return _arrayLikeToArray$3(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray$3(e, t) : void 0
            }
        }
        function _arrayLikeToArray$3(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = Array(t); t > r; r++)
                n[r] = e[r];
            return n
        }
        function _nonIterableRest$3() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var load$1 = load
            , CrossIframe$2 = cross_iframe$1;
        function send$1(e, t, r) {
            e.postMessage(JSON.stringify({
                type: t,
                content: r
            }), "*")
        }
        var SyncCookie = function() {
            function e() {
                var t = this;
                _classCallCheck$5(this, e),
                    this.iframe = null,
                    this.iframeLoaded = !1,
                    this.userId = null,
                    this.pending = !1,
                    this.queue = [],
                    this.cachedQuery = [],
                    load$1((function() {
                            window.addEventListener("message", (function(e) {
                                    return t.receive(e)
                                }
                            ), !1),
                                t.pending = !0,
                                t.iframe = CrossIframe$2.initIframe()
                        }
                    ))
            }
            return _createClass$5(e, [{
                key: "receive",
                value: function(e) {
                    var t;
                    if (e.data) {
                        try {
                            t = JSON.parse(e.data)
                        } catch (e) {
                            return
                        }
                        if (t.type)
                            switch (t.type) {
                                case "getBucUserId":
                                    for (this.userId = t.content,
                                             this.pending = !1; this.queue.length; ) {
                                        (0,
                                            this.queue[0])(t.content),
                                            this.queue.shift()
                                    }
                                    break;
                                case "iframOnload":
                                    this.iframeOnLoad()
                            }
                    }
                }
            }, {
                key: "iframeOnLoad",
                value: function() {
                    this.iframeLoaded = !0,
                        this.executeCachedQuery()
                }
            }, {
                key: "executeCachedQuery",
                value: function() {
                    if (this.cachedQuery.length)
                        for (var e = 0; this.cachedQuery.length > e; e++) {
                            var t = _toArray$1(this.cachedQuery[e])
                                , r = t[0]
                                , n = t.slice(1);
                            this[r].apply(this, n)
                        }
                }
            }, {
                key: "getBucUserId",
                value: function(e) {
                    this.iframeLoaded ? (this.queue.push(e),
                    this.pending || (send$1(this.iframe.contentWindow, "getBucUserId"),
                        this.pending = !0)) : this.cachedQuery.push(["getBucUserId", e])
                }
            }, {
                key: "setBucUserId",
                value: function(e, t, r) {
                    var n = this;
                    this.iframeLoaded ? (this.queue.push((function() {
                            n.userId = t,
                                r()
                        }
                    )),
                        send$1(this.iframe.contentWindow, "setBucUserId", t)) : this.cachedQuery.push(["setBucUserId", e, t, r])
                }
            }]),
                e
        }(), objectAssign$3 = objectAssign, Cookies$2 = Cookies$1, isWechat$1 = isWechat, ALIPAYDOMAIN = ".alipay.com", COOKIEPREFIX = "__TRACERT_COOKIE_", BucName = function() {
            function e(t, r) {
                var n = this;
                _classCallCheck$5(this, e),
                    this.queue = [],
                    this.tracert = t,
                    objectAssign$3(this, r),
                    this.initBucName = !1,
                    this.interceptPv(),
                    this.tracert.after("start", (function() {
                            setTimeout((function() {
                                    return n.init()
                                }
                            ), 0)
                        }
                    ))
            }
            return _createClass$5(e, [{
                key: "cookiesHelper",
                get: function() {
                    return this._cookiesHelper || (this._cookiesHelper = new SyncCookie),
                        this._cookiesHelper
                }
            }, {
                key: "interceptPv",
                value: function() {
                    var e = this;
                    this.tracert.before("logPv", (function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return !!e.initBucName || (e.queue.push(t),
                                !1)
                        }
                    ))
                }
            }, {
                key: "sendQueue",
                value: function() {
                    var e = this;
                    this.initBucName = !0,
                        this.queue.forEach((function(t) {
                                e.tracert && e.tracert.call("logPv", t)
                            }
                        )),
                        this.queue.length = 0
                }
            }, {
                key: "init",
                value: function() {
                    if (!isWechat$1() || this.tracert) {
                        if (this.isAlipayDomain = -1 !== document.domain.indexOf(ALIPAYDOMAIN),
                        this.tracert.bucUserId || this.tracert.roleId)
                            return this.setBucUser(),
                                this.tracert.backupUserId = this.tracert.bucUserId || this.tracert.roleId,
                                void this.sendQueue();
                        var e = this.isAlipayDomain ? ALIPAYDOMAIN : null;
                        if (this.tracert.bucUserId = Cookies$2.get("".concat(COOKIEPREFIX, "bucUserId"), {
                            domain: e
                        }) || Cookies$2.get("bucUserId", {
                            domain: e
                        }),
                            this.tracert.bucUserId)
                            return this.synchronousBucId(!1),
                                void this.sendQueue();
                        this.synchronousBucId(!0)
                    } else
                        this.sendQueue()
                }
            }, {
                key: "setLocalBucUserId",
                value: function() {
                    Cookies$2.set("".concat(COOKIEPREFIX, "bucUserId"), this.tracert.bucUserId || this.tracert.roleId, {
                        domain: this.isAlipayDomain ? ALIPAYDOMAIN : null,
                        samesite: "none",
                        secure: !0
                    })
                }
            }, {
                key: "setBucUser",
                value: function() {
                    var e = this.tracert.bucUserId || this.tracert.roleId || "";
                    if ("string" == typeof e && /^((wb)|(WB))?\d+$/.test(e)) {
                        if (this.setLocalBucUserId(),
                            this.isAlipayDomain)
                            return;
                        this.cookiesHelper.setBucUserId("userId", e, (function() {}
                        ))
                    }
                }
            }, {
                key: "synchronousBucId",
                value: function(e) {
                    var t = this;
                    this.cookiesHelper.getBucUserId((function(r) {
                            r && (t.tracert && (t.tracert.bucUserId = r),
                                t.setLocalBucUserId()),
                            e && t.sendQueue()
                        }
                    ))
                }
            }]),
                e
        }(), bucName = function(e, t) {
            var r = e
                , n = new BucName(r,{});
            return r.set({
                buc: n
            }),
                t(),
                r
        }, win$3 = window, SCHEME = "nameStorage:", RE_PAIR = /^([^=]+)(?:=(.*))?$/, Q = "?", EQ = "=", AND = "&", encode$1 = encodeURIComponent, decode$1 = decodeURIComponent, STORAGE = {}, ORIGIN_NAME, nameStorage = {};
        function save() {
            var e, t = [], r = !0;
            for (var n in STORAGE)
                STORAGE.hasOwnProperty(n) && (r = !1,
                    e = STORAGE[n] || "",
                    t.push(encode$1(n) + EQ + encode$1(e)));
            win$3.name = r ? ORIGIN_NAME : SCHEME + encode$1(ORIGIN_NAME) + Q + t.join(AND)
        }
        function addEventListener(e, t, r) {
            e && (e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on" + t, (function(t) {
                    r.call(e, t)
                }
            )))
        }
        !function(e) {
            if (e && 0 === e.indexOf(SCHEME)) {
                var t = e.split(/[:?]/);
                t.shift(),
                    ORIGIN_NAME = decode$1(t.shift()) || "";
                for (var r, n, o, i = t.join("").split(AND), a = 0, s = i.length; s > a; a++)
                    (r = i[a].match(RE_PAIR)) && r[1] && (n = decode$1(r[1]),
                        o = decode$1(r[2]) || "",
                        STORAGE[n] = o)
            } else
                ORIGIN_NAME = e || ""
        }(win$3.name),
            nameStorage.setItem = function(e, t) {
                e && void 0 !== t && (STORAGE[e] = t + "",
                    save())
            }
            ,
            nameStorage.getItem = function(e) {
                return STORAGE.hasOwnProperty(e) ? STORAGE[e] : null
            }
            ,
            nameStorage.removeItem = function(e) {
                STORAGE.hasOwnProperty(e) && (STORAGE[e] = null,
                    delete STORAGE[e],
                    save())
            }
            ,
            nameStorage.clear = function() {
                STORAGE = {},
                    save()
            }
            ,
            nameStorage.valueOf = function() {
                return STORAGE
            }
            ,
            nameStorage.toString = function() {
                var e = win$3.name;
                return 0 === e.indexOf(SCHEME) ? e : SCHEME + e
            }
            ,
            addEventListener(win$3, "beforeunload", (function() {
                    save()
                }
            )),
            win$3.nameStorage = nameStorage;
        var _nameStorage_1_3_0_nameStorage = nameStorage;
        function _classCallCheck$6(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties$6(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass$6(e, t, r) {
            return t && _defineProperties$6(e.prototype, t),
            r && _defineProperties$6(e, r),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                e
        }
        var addEvent$1 = addEvent
            , storage = temporary_storage$1
            , nodeListToArray$1 = nodeListToArray
            , getAttr$2 = getAttr$1
            , url$1 = url
            , ALIPAYDOMAIN$1 = ".alipay.com"
            , refList = ["refUrl", "srcSpm", "referPageId", "referSPM", "dtLogMonitor"]
            , REF_PREFIX = "TRACERT_REF_"
            , FullfillRefspm = function() {
            function e(t) {
                var r = this;
                _classCallCheck$6(this, e),
                    this.tracert = t || {},
                    this.isAlipayDomain = document.domain && -1 !== document.domain.indexOf(ALIPAYDOMAIN$1),
                    this.cookiesDomain = this.isAlipayDomain ? ALIPAYDOMAIN$1 : null,
                    this.initRef(),
                    t.before("logPv", (function() {
                            t.srcSpm = t.lastClkSpm || t.srcSpm
                        }
                    )),
                    t.after("logPv", (function() {
                            t.referSPM = r.getPageSpmAB(),
                                t.referPageId = t.pageId,
                                t.refUrl = t.url,
                                t.srcSpm = t.lastClkSpm
                        }
                    )),
                    addEvent$1("beforeunload", window, (function() {
                            r.cache()
                        }
                    ))
            }
            return _createClass$6(e, [{
                key: "getPageSpmAB",
                value: function(e, t) {
                    return e || t || (e = this.tracert.spmAPos,
                        t = this.tracert.spmBPos),
                        e && t ? "".concat(e, ".").concat(encodeURIComponent(t)) : ""
                }
            }, {
                key: "initRef",
                value: function() {
                    var e = this.tracert
                        , t = {
                        referSPM: this.getMetaSpmId() || ""
                    }
                        , r = this.get();
                    refList.forEach((function(n) {
                            var o = getValue(n);
                            o || e.ignoreNameStorage || (o = _nameStorage_1_3_0_nameStorage.getItem("".concat(REF_PREFIX).concat(n))),
                            !o && r && (o = r[n]),
                            o && (t[n] = o)
                        }
                    )),
                        e.call("set", t)
                }
            }, {
                key: "getMetaSpmId",
                value: function() {
                    for (var e = nodeListToArray$1(window.document.getElementsByTagName("meta")), t = "", r = 0; e.length > r; r++) {
                        var n = e[r]
                            , o = getAttr$2(n, "name")
                            , i = getAttr$2(n, "content");
                        if (i && o && "pagename" === o)
                            t = i
                    }
                    return t ? this.getPageSpmAB(this.tracert.spmAPos, t) : t
                }
            }, {
                key: "cache",
                value: function() {
                    var e = this.tracert || {}
                        , t = location.href || "";
                    t.length > 150 && (t = e.url);
                    var r = this.getPageSpmAB()
                        , n = e.lastClkSpm
                        , o = e.referPageId;
                    if (storage.set("fullfill_ref", [t, r, n, o || ""].join(""), {
                        domain: this.cookiesDomain,
                        cookie: !0
                    }),
                        !e.ignoreNameStorage) {
                        var i = {
                            refUrl: t,
                            referPageId: o,
                            referSPM: r,
                            srcSpm: n
                        };
                        Object.keys(i).forEach((function(e) {
                                i[e] && _nameStorage_1_3_0_nameStorage.setItem("".concat(REF_PREFIX).concat(e), i[e])
                            }
                        ))
                    }
                }
            }, {
                key: "get",
                value: function() {
                    var e = storage.get("fullfill_ref", {
                        domain: this.cookiesDomain
                    }, !0);
                    if ("string" != typeof e)
                        return null;
                    var t = e.split("");
                    if (!t[0])
                        return null;
                    var r = t[0]
                        , n = t[1]
                        , o = t[2]
                        , i = t[3]
                        , a = url$1.parse(this.tracert.url || "");
                    return url$1.parse(r || "").host === a.host ? {
                        refUrl: r,
                        referSPM: n,
                        srcSpm: o,
                        referPageId: i
                    } : null
                }
            }]),
                e
        }()
            , fullfill = function(e, t) {
            var r = e
                , n = new FullfillRefspm(r);
            return r.set({
                fullfillRef: n
            }),
                t(),
                r
        };
        function ownKeys$8(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$8(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$8(Object(r), !0).forEach((function(t) {
                        _defineProperty$9(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$8(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$8(e) {
            return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$8(e)
        }
        function _classCallCheck$7(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _defineProperties$7(e, t) {
            for (var r = 0; t.length > r; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass$7(e, t, r) {
            return t && _defineProperties$7(e.prototype, t),
            r && _defineProperties$7(e, r),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                e
        }
        function _defineProperty$9(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        var FullLinkParamsLogger = function() {
            function e(t, r) {
                _classCallCheck$7(this, e),
                    this.tracert = t,
                    this.fullLinkAPI = r,
                    this.start()
            }
            return _createClass$7(e, [{
                key: "getParam5",
                value: function(e) {
                    var t = {};
                    e && e.param5 && e.param5.split("^").forEach((function(e) {
                            var r = e.split("=")[0];
                            "newChinfo" === r && (t.newChinfo = e.split("=")[1]),
                            "scm" === r && (t.scm = e.split("=")[1])
                        }
                    ));
                    return t
                }
            }, {
                key: "start",
                value: function() {
                    var e = this;
                    this.tracert.before("click", (function(t) {
                            var r = t.extra
                                , n = void 0 === r ? {} : r
                                , o = t.options
                                , i = e.getParam5(void 0 === o ? {} : o)
                                , a = i.newChinfo || n.newChinfo || ""
                                , s = i.scm || n.entityId || n.scm || "";
                            a && s && (e.fullLinkAPI.setNextPageParams({
                                newChinfo: a,
                                scm: s
                            }),
                                e.fullLinkAPI.appendChinfo({
                                    newChinfo: a,
                                    scm: s
                                }),
                                e.fullLinkAPI.setNextPageNewChinfo({
                                    newChinfo: a,
                                    scm: s
                                }))
                        }
                    ))
                }
            }]),
                e
        }()
            , AutoFullLinkParamsLogger = function() {
            function e(t) {
                _classCallCheck$7(this, e),
                    this.tracert = t,
                    this.trace = !!getValue("trace"),
                    this.chinfo = getValue("chinfo") || getValue("chInfo") || "",
                    this.scm = getValue("scm") || "",
                    this.isPageInfoLogged = !1,
                    this.start()
            }
            return _createClass$7(e, [{
                key: "start",
                value: function() {
                    this.trace && this._setPageInfo()
                }
            }, {
                key: "_setPageInfo",
                value: function() {
                    var e = this;
                    this.tracert.after("logPv", (function() {
                            e.isPageInfoLogged || (window.AlipayJSBridge.call("handleLoggingAction", {
                                actionType: "setPageParams",
                                data: JSON.stringify({
                                    chinfo: e.chinfo,
                                    scm: e.scm
                                })
                            }),
                                e.isPageInfoLogged = !0)
                        }
                    ))
                }
            }]),
                e
        }();
        function emptyCb() {}
        function respHandler(e, t, r) {
            var n = "function" == typeof t ? t : emptyCb;
            if (e && "success" === e.status)
                if (e.data)
                    if (r)
                        n(e.data);
                    else
                        try {
                            n(JSON.parse(e.data))
                        } catch (t) {
                            n({
                                err: "解析失败",
                                response: e.data
                            })
                        }
                else
                    n({
                        err: "容器返回空"
                    });
            else
                n({
                    err: "容器异常"
                })
        }
        var FullLinkAPI = function() {
            function e(t) {
                _classCallCheck$7(this, e),
                    this.tracert = t,
                    this.start()
            }
            return _createClass$7(e, [{
                key: "start",
                value: function() {
                    var e = this.getCurrentPageParams
                        , t = this.getChinfoChainUUID;
                    this.tracert.set({
                        getChinfoChain: this.getChinfoChain,
                        appendChinfo: this.appendChinfo.bind(this),
                        updateChinfo: this.updateChinfo.bind(this),
                        setPageParams: this.setPageParams.bind(this),
                        setNextPageParams: this.setNextPageParams.bind(this),
                        setCurrentPageNewChinfo: this.setCurrentPageNewChinfo.bind(this),
                        setNextPageNewChinfo: this.setNextPageNewChinfo.bind(this),
                        getCurrentPageParams: e,
                        getChinfoChainUUID: t
                    })
                }
            }, {
                key: "setPageParams",
                value: function(e, t) {
                    this._setParams("setPageParams", e, t)
                }
            }, {
                key: "setNextPageParams",
                value: function(e) {
                    this._setParams("setNextPageParams", e)
                }
            }, {
                key: "appendChinfo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._setChinfoChain("appendChinfo", e)
                }
            }, {
                key: "updateChinfo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._setChinfoChain("updateChinfo", e)
                }
            }, {
                key: "getChinfoChain",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                        , r = "getChinfoChain"
                        , n = {};
                    "boolean" == typeof t && t && (n.isFiltered = "1"),
                    "object" === _typeof$8(t) && (t.isFirst ? r = "getFirstChinfo" : t.isFiltered && (n.isFiltered = "1")),
                        window.AlipayJSBridge.call("handleLoggingAction", _objectSpread2$8({
                            actionType: r
                        }, n), (function(t) {
                                respHandler(t, e)
                            }
                        ))
                }
            }, {
                key: "getChinfoChainUUID",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        , r = {
                        actionType: "getChinfoChainUUID"
                    };
                    t.isFiltered && (r.isFiltered = "1"),
                    t.bizName && (r.bizName = t.bizName),
                        window.AlipayJSBridge.call("handleLoggingAction", r, (function(t) {
                                respHandler(t, e, !0)
                            }
                        ))
                }
            }, {
                key: "getCurrentPageParams",
                value: function(e) {
                    window.AlipayJSBridge.call("handleLoggingAction", {
                        actionType: "getCurrentPageParams"
                    }, (function(t) {
                            respHandler(t, e)
                        }
                    ))
                }
            }, {
                key: "setCurrentPageNewChinfo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._setNewChinfo("setCurrentPageNewChinfo", e)
                }
            }, {
                key: "setNextPageNewChinfo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._setNewChinfo("setNextPageNewChinfo", e)
                }
            }, {
                key: "_setParams",
                value: function(e, t, r) {
                    if (t) {
                        var n = {}
                            , o = {};
                        if ("string" == typeof t && (n.chinfo = t || "",
                            n.scm = r || ""),
                        "object" === _typeof$8(t)) {
                            var i = t.newChinfo
                                , a = void 0 === i ? "" : i
                                , s = t.chinfo
                                , c = void 0 === s ? "" : s
                                , u = t.entityId
                                , l = void 0 === u ? "" : u
                                , p = t.scm
                                , f = void 0 === p ? "" : p
                                , d = t.tracestep
                                , m = void 0 === d ? 3 : d
                                , g = t.isforce;
                            a && (n.newChinfo = a),
                            c && (n.chinfo = c),
                                n.scm = l || f || "",
                                o.tracestep = m,
                            g && (o.isforce = "1")
                        }
                        window.AlipayJSBridge.call("handleLoggingAction", _objectSpread2$8({
                            actionType: e,
                            data: JSON.stringify(n)
                        }, o))
                    }
                }
            }, {
                key: "_setChinfoChain",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        , r = {}
                        , n = t.newChinfo || ""
                        , o = t.chInfo || t.chinfo || ""
                        , i = t.entityId || t.scm || "";
                    n && (r.newChinfo = n),
                    o && (r.chinfo = o),
                    i && (r.scm = i),
                        window.AlipayJSBridge.call("handleLoggingAction", {
                            actionType: e,
                            data: JSON.stringify(r),
                            type: t.type || "click"
                        })
                }
            }, {
                key: "_setNewChinfo",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        , r = {}
                        , n = t.newChinfo
                        , o = void 0 === n ? "" : n
                        , i = t.scm
                        , a = void 0 === i ? "" : i;
                    o && (r.newChinfo = o,
                    a && (r.scm = a),
                        window.AlipayJSBridge.call("handleLoggingAction", {
                            actionType: e,
                            params: r
                        }))
                }
            }]),
                e
        }();
        function _AlipayJSBridgeReady(e) {
            window.AlipayJSBridge && "function" == typeof e ? e() : document.addEventListener("AlipayJSBridgeReady", e, !1)
        }
        var fullLinkParams = function(e, t) {
            var r = e;
            return _AlipayJSBridgeReady((function() {
                    var e = new FullLinkAPI(r);
                    r.after("start", (function() {
                            r.fullLinkAndChInfo && (window.fullLinkParamsLogger = new FullLinkParamsLogger(r,e))
                        }
                    )),
                        window.autoFullLinkParamsLogger = new AutoFullLinkParamsLogger(r),
                        t()
                }
            )),
                r
        }
            , lx = function(e, t) {
            var r = e;
            return load((function() {
                    var e = window.alitripBridge;
                    e && e.call && "function" == typeof e.call ? e.call("user_info", {
                        successCallback: function(e) {
                            e && e.userId ? (r.set({
                                role_id: e.userId
                            }),
                                t()) : t()
                        },
                        failCallback: function(e) {
                            console.log("Tracert 未获取到支付宝uid", e),
                                t()
                        }
                    }) : t()
                }
            )),
                r
        }
            , qn = function(e, t) {
            var r = e;
            return load((function() {
                    var e = window.WindVane;
                    e && e.call && "function" == typeof e.call ? window.WindVane.call("QianNiu", "getUserInfo", {}, (function(e) {
                            if (!e || !e.user_id)
                                return console.log("Tracert 未获取到千牛uid", e),
                                    void t();
                            r.set({
                                role_id: e.user_id
                            }),
                                t()
                        }
                    ), (function(e) {
                            console.log("Tracert 未获取到千牛uid", e),
                                t()
                        }
                    )) : t()
                }
            )),
                r
        };
        function ownKeys$9(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$9(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$9(Object(r), !0).forEach((function(t) {
                        _defineProperty$a(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$9(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$9(e) {
            return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$9(e)
        }
        function _defineProperty$a(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        var semKey = "data-asem"
            , semParamsKey = "data-asem-params"
            , helper$2 = {
            getSemDom: function(e) {
                var t = e;
                if (!isViewDom$1(t))
                    return null;
                do {
                    if (t.hasAttribute(semKey) && t.hasAttribute(semParamsKey))
                        return t
                } while ((t = t.parentNode) && t && t.tagName && "string" == typeof t.tagName && "BODY" !== t.tagName && t !== document.body);
                return null
            },
            getSemId: function(e) {
                var t = e;
                if (!isViewDom$1(t))
                    return "";
                if (t.hasAttribute(semKey) && t.hasAttribute(semParamsKey) && (t = this.getSemDom(t)),
                    !t)
                    return "";
                var r = getAttr$1(t, semKey);
                return "".concat(r)
            },
            getSemParams: function(e) {
                var t = e;
                if (!isViewDom$1(t))
                    return "";
                if (t.hasAttribute(semKey) && t.hasAttribute(semParamsKey) && (t = this.getSemDom(t)),
                    !t)
                    return "";
                var r = getAttr$1(t, semParamsKey);
                return "".concat(r)
            },
            getClickSem: function(e) {
                var t = this.getSemDom(e);
                return {
                    semId: this.getSemId(t),
                    params: this.getSemParams(t)
                }
            },
            formatRemoteParams: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    , r = e
                    , n = objectAssign({}, t)
                    , o = n.param4 || n.params || {};
                return n.params && delete n.params,
                    objectAssign(n, {
                        bizType: n.bizType || r.bizType,
                        actionId: n.actionId || "semclk",
                        param4: o
                    }),
                    n
            }
        };
        function semEventHandler(e) {
            var t = window.Tracert
                , r = helper$2.getClickSem(e.target || e.srcElement);
            "object" === _typeof$9(r) && r.semId && (r.actionId = "semclk",
                t.call("sem", r),
                t.setLastClkSem(r))
        }
        var context$4 = {
            lastClkSem: "",
            semClickEvent: function(e, t) {
                e && removeEvent(e, window.document, semEventHandler),
                    addEvent(t || this.eventType, window.document, semEventHandler)
            },
            setLastClkSem: function(e) {
                var t = e.semId
                    , r = e.params;
                "object" !== _typeof$9(r) && (r = strToObj$1(r));
                var n = r.rid;
                n ? this.lastClkSem = "semId_".concat(t, "__rpcId_").concat(n) : console.warn("sem扩展参数，缺省rid字段，无法正确上报")
            },
            sem: function(e) {
                var t = {};
                objectAssign(t, helper$2.formatRemoteParams(this, e)),
                "string" != typeof t.param4 && (t.param4 = objToStr(t.param4)),
                    request({
                        tracert: this,
                        type: requestTypeEnum.AlipayJSBridge,
                        data: t,
                        jsApiType: jsApiTypeEnum.semLog
                    })
            }
        }
            , sem = function(e, t) {
            return e.set(_objectSpread2$9({}, context$4)),
                e.semClickEvent(),
                e.before("set", (function(t) {
                        var r = t;
                        r.eventType = r.eventType || r.eventName,
                            e.semClickEvent(!!r.eventType && e.eventType, r.eventType)
                    }
                )),
                window.AlipayJSBridge ? t() : document.addEventListener("AlipayJSBridgeReady", (function() {
                        t()
                    }
                ), !1),
                e
        }
            , tb = function(e, t) {
            var r = e;
            return load((function() {
                    var e = window.lib
                        , n = window.WindVane
                        , o = function() {
                        e && e.mtop && "function" == typeof e.mtop.request ? e.mtop.request({
                            api: "mtop.taobao.wireless.alipay.getAlipayId",
                            v: "1.0",
                            data: {},
                            ecode: 1,
                            timeout: 1500
                        }, (function(e) {
                                e && e.data && e.data.alipayId ? (r.set({
                                    role_id: e.data.alipayId
                                }),
                                    t()) : t()
                            }
                        ), (function(e) {
                                console.log("Tracert 未获取到支付宝uid", e),
                                    t()
                            }
                        )) : t()
                    };
                    n && n.call ? n.call("TBDeviceInfo", "getUtdid", {}, (function(e) {
                            var t = e.utdid;
                            t ? (r.set({
                                mdata: {
                                    utdid: t
                                }
                            }),
                                o()) : o()
                        }
                    ), (function(e) {
                            console.log("Tracert 获取utdid失败", e),
                                o()
                        }
                    )) : o()
                }
            )),
                r
        };
        function isObject$4(e) {
            var t = typeof e;
            return null != e && ("object" == t || "function" == t)
        }
        var freeGlobal$3 = "object" == typeof global && global && global.Object === Object && global
            , freeSelf$3 = "object" == typeof self && self && self.Object === Object && self
            , root$3 = freeGlobal$3 || freeSelf$3 || Function("return this")()
            , now$3 = function() {
            return root$3.Date.now()
        }
            , reWhitespace$3 = /\s/;
        function trimmedEndIndex$3(e) {
            for (var t = e.length; t-- && reWhitespace$3.test(e.charAt(t)); )
                ;
            return t
        }
        var reTrimStart$3 = /^\s+/;
        function baseTrim$3(e) {
            return e ? e.slice(0, trimmedEndIndex$3(e) + 1).replace(reTrimStart$3, "") : e
        }
        var Symbol$2 = root$3.Symbol
            , objectProto$4 = Object.prototype
            , hasOwnProperty$3 = objectProto$4.hasOwnProperty
            , nativeObjectToString$4 = objectProto$4.toString
            , symToStringTag$4 = Symbol$2 ? Symbol$2.toStringTag : void 0;
        function getRawTag$3(e) {
            var t = hasOwnProperty$3.call(e, symToStringTag$4)
                , r = e[symToStringTag$4];
            try {
                e[symToStringTag$4] = void 0;
                var n = !0
            } catch (e) {}
            var o = nativeObjectToString$4.call(e);
            return n && (t ? e[symToStringTag$4] = r : delete e[symToStringTag$4]),
                o
        }
        var objectProto$5 = Object.prototype
            , nativeObjectToString$5 = objectProto$5.toString;
        function objectToString$3(e) {
            return nativeObjectToString$5.call(e)
        }
        var nullTag$3 = "[object Null]"
            , undefinedTag$3 = "[object Undefined]"
            , symToStringTag$5 = Symbol$2 ? Symbol$2.toStringTag : void 0;
        function baseGetTag$3(e) {
            return null == e ? void 0 === e ? undefinedTag$3 : nullTag$3 : symToStringTag$5 && symToStringTag$5 in Object(e) ? getRawTag$3(e) : objectToString$3(e)
        }
        function isObjectLike$3(e) {
            return null != e && "object" == typeof e
        }
        var symbolTag$3 = "[object Symbol]";
        function isSymbol$3(e) {
            return "symbol" == typeof e || isObjectLike$3(e) && baseGetTag$3(e) == symbolTag$3
        }
        var NAN$3 = NaN
            , reIsBadHex$3 = /^[-+]0x[0-9a-f]+$/i
            , reIsBinary$3 = /^0b[01]+$/i
            , reIsOctal$3 = /^0o[0-7]+$/i
            , freeParseInt$3 = parseInt;
        function toNumber$3(e) {
            if ("number" == typeof e)
                return e;
            if (isSymbol$3(e))
                return NAN$3;
            if (isObject$4(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = isObject$4(t) ? t + "" : t
            }
            if ("string" != typeof e)
                return 0 === e ? e : +e;
            e = baseTrim$3(e);
            var r = reIsBinary$3.test(e);
            return r || reIsOctal$3.test(e) ? freeParseInt$3(e.slice(2), r ? 2 : 8) : reIsBadHex$3.test(e) ? NAN$3 : +e
        }
        var FUNC_ERROR_TEXT$4 = "Expected a function"
            , nativeMax$3 = Math.max
            , nativeMin$3 = Math.min;
        function debounce$4(e, t, r) {
            var n, o, i, a, s, c, u = 0, l = !1, p = !1, f = !0;
            if ("function" != typeof e)
                throw new TypeError(FUNC_ERROR_TEXT$4);
            function d(t) {
                var r = n
                    , i = o;
                return n = o = void 0,
                    u = t,
                    a = e.apply(i, r)
            }
            function m(e) {
                return u = e,
                    s = setTimeout(h, t),
                    l ? d(e) : a
            }
            function g(e) {
                var r = e - c;
                return void 0 === c || r >= t || 0 > r || p && e - u >= i
            }
            function h() {
                var e = now$3();
                if (g(e))
                    return v(e);
                s = setTimeout(h, function(e) {
                    var r = t - (e - c);
                    return p ? nativeMin$3(r, i - (e - u)) : r
                }(e))
            }
            function v(e) {
                return s = void 0,
                    f && n ? d(e) : (n = o = void 0,
                        a)
            }
            function y() {
                var e = now$3()
                    , r = g(e);
                if (n = arguments,
                    o = this,
                    c = e,
                    r) {
                    if (void 0 === s)
                        return m(c);
                    if (p)
                        return clearTimeout(s),
                            s = setTimeout(h, t),
                            d(c)
                }
                return void 0 === s && (s = setTimeout(h, t)),
                    a
            }
            return t = toNumber$3(t) || 0,
            isObject$4(r) && (l = !!r.leading,
                i = (p = "maxWait"in r) ? nativeMax$3(toNumber$3(r.maxWait) || 0, t) : i,
                f = "trailing"in r ? !!r.trailing : f),
                y.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                        u = 0,
                        n = c = o = s = void 0
                }
                ,
                y.flush = function() {
                    return void 0 === s ? a : v(now$3())
                }
                ,
                y
        }
        var FUNC_ERROR_TEXT$5 = "Expected a function";
        function throttle$4(e, t, r) {
            var n = !0
                , o = !0;
            if ("function" != typeof e)
                throw new TypeError(FUNC_ERROR_TEXT$5);
            return isObject$4(r) && (n = "leading"in r ? !!r.leading : n,
                o = "trailing"in r ? !!r.trailing : o),
                debounce$4(e, t, {
                    leading: n,
                    maxWait: t,
                    trailing: o
                })
        }
        function ownKeys$a(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$a(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$a(Object(r), !0).forEach((function(t) {
                        _defineProperty$b(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$a(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$a(e) {
            return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$a(e)
        }
        function _defineProperty$b(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        function _slicedToArray$2(e, t) {
            return _arrayWithHoles$4(e) || _iterableToArrayLimit$2(e, t) || _unsupportedIterableToArray$4(e, t) || _nonIterableRest$4()
        }
        function _toArray$2(e) {
            return _arrayWithHoles$4(e) || _iterableToArray$3(e) || _unsupportedIterableToArray$4(e) || _nonIterableRest$4()
        }
        function _toConsumableArray$2(e) {
            return _arrayWithoutHoles$2(e) || _iterableToArray$3(e) || _unsupportedIterableToArray$4(e) || _nonIterableSpread$2()
        }
        function _arrayWithoutHoles$2(e) {
            if (Array.isArray(e))
                return _arrayLikeToArray$4(e)
        }
        function _arrayWithHoles$4(e) {
            if (Array.isArray(e))
                return e
        }
        function _iterableToArray$3(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
        }
        function _iterableToArrayLimit$2(e, t) {
            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != r) {
                var n, o, i = [], a = !0, s = !1;
                try {
                    for (r = r.call(e); !(a = (n = r.next()).done) && (i.push(n.value),
                    !t || i.length !== t); a = !0)
                        ;
                } catch (e) {
                    s = !0,
                        o = e
                } finally {
                    try {
                        a || null == r.return || r.return()
                    } finally {
                        if (s)
                            throw o
                    }
                }
                return i
            }
        }
        function _unsupportedIterableToArray$4(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return _arrayLikeToArray$4(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray$4(e, t) : void 0
            }
        }
        function _arrayLikeToArray$4(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = Array(t); t > r; r++)
                n[r] = e[r];
            return n
        }
        function _nonIterableSpread$2() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _nonIterableRest$4() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _createForOfIteratorHelper(e, t) {
            var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = _unsupportedIterableToArray$4(e)) || t && e && "number" == typeof e.length) {
                    r && (e = r);
                    var n = 0
                        , o = function() {};
                    return {
                        s: o,
                        n: function() {
                            return e.length > n ? {
                                done: !1,
                                value: e[n++]
                            } : {
                                done: !0
                            }
                        },
                        e: function(e) {
                            throw e
                        },
                        f: o
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0, s = !1;
            return {
                s: function() {
                    r = r.call(e)
                },
                n: function() {
                    var e = r.next();
                    return a = e.done,
                        e
                },
                e: function(e) {
                    s = !0,
                        i = e
                },
                f: function() {
                    try {
                        a || null == r.return || r.return()
                    } finally {
                        if (s)
                            throw i
                    }
                }
            }
        }
        var getValueFromSearch$1 = getValueFromSearch
            , getValueFromStartupParams$1 = getValueFromStartupParams
            , utilUrl = url
            , VISUAL_ARRAY_ATTR = "data-visual-list-key"
            , STATE_PROP_ATTR = "data-visual-comp-vars";
        function extParamFromUrlQuery(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.href
                , r = "";
            if ("string" != typeof t)
                return r;
            var n = utilUrl.parse(t);
            return r = getValueFromSearch$1(e, n.search) || ""
        }
        function extParamFromUrlPath(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.href
                , r = ""
                , n = /^\$\{pathParam(\d+)\}$/
                , o = e.match(n);
            if (null == o || void 0 === o[1] || "string" != typeof t)
                return r;
            var i = utilUrl.parse(t)
                , a = i.pathname.split("/");
            return r = a[o[1]] || ""
        }
        function extParamFromStartUp(e) {
            return getValueFromStartupParams$1(e) || ""
        }
        function extParamFromDataSet(e, t) {
            var r = "";
            return t && t.hasAttribute && t.hasAttribute("data-".concat(e)) && !/aspm\-?/.test(e) ? r = t.getAttribute("data-".concat(e)) || "" : r
        }
        var isDef = function(e) {
            return null != e
        };
        function extParamFromGlobal(e) {
            var t = null;
            return window.visualLogExtraParams && isDef(window.visualLogExtraParams[e]) && (t = window.visualLogExtraParams[e]),
            isDef(t) || (t = window[e]),
                "string" == typeof t || "number" == typeof t ? "".concat(t) : ""
        }
        function getVisualDomIndex(e, t) {
            for (var r = t.filter((function(e) {
                    return "[index]" === e
                }
            )).length, n = [], o = e; o && "function" == typeof o.getAttribute && o !== document.body && r > 0; ) {
                var i = o.getAttribute(VISUAL_ARRAY_ATTR);
                if (null !== i) {
                    var a = i.lastIndexOf("_")
                        , s = i.substr(a + 1);
                    if ("" !== s && (n = [s].concat(_toConsumableArray$2(n)),
                        r -= 1),
                    0 === r)
                        return n
                }
                o = o.parentNode
            }
            return []
        }
        function isArray(e) {
            return "[object Array]" == Object.prototype.toString.call(e)
        }
        function getTargetByPath(e, t, r) {
            if (!e || !t || !isArray(r))
                return "";
            for (var n = _toConsumableArray$2(r), o = 0; e.length > o; o++) {
                if ("object" !== _typeof$a(t) || null === t)
                    return "";
                var i = e[o];
                if ("[index]" === i) {
                    if (!n.length || !isArray(t))
                        return "";
                    i = n[0],
                        n.splice(0, 1)
                }
                t = t[i]
            }
            return t
        }
        function extParamFromCompVariable(e, t, r, n) {
            if ("string" != typeof e)
                return "";
            var o = e.split("?.")
                , i = getVisualDomIndex(t, o);
            if (0 === o.length)
                return "";
            for (var a = null, s = t, c = n || 1; s && "function" == typeof s.getAttribute && s !== document.body; ) {
                if (null !== s.getAttribute(STATE_PROP_ATTR)) {
                    if (1 === c) {
                        a = s.compVars || {};
                        break
                    }
                    c--
                }
                s = s.parentNode
            }
            var u = (window.__VISUAL_PARAMS__ || {}).getCompVars;
            try {
                if (a)
                    a = getTargetByPath(o, a, i);
                else if ("function" == typeof u) {
                    var l = u(t, c) || {}
                        , p = l.hooksList
                        , f = l.props
                        , d = l.hooksObj;
                    if ("string" != typeof r || "[]" === r || 0 !== e.indexOf("state") && 0 !== e.indexOf("ref"))
                        a = f || d,
                        f && o.shift();
                    else {
                        var m = JSON.parse(r)
                            , g = _toArray$2(o || [])
                            , h = g[0]
                            , v = g[1]
                            , y = g.slice(2)
                            , b = _slicedToArray$2(m.filter((function(e) {
                                return e.type === h && e.name === v
                            }
                        )), 1)[0];
                        b && p && p[b.index] && (a = p[b.index].value,
                            o = y)
                    }
                    "object" === _typeof$a(a = getTargetByPath(o, a, i) || "") && (a = JSON.stringify(a))
                }
            } catch (e) {
                return ""
            }
            return "string" == typeof a || "number" == typeof a ? a : ""
        }
        var spmDataKey$2 = spmDataKey$1
            , spmDPosMarkAttr$2 = spmDPosMarkAttr$1
            , spmExpoAttr$1 = spmExpoAttr
            , spmExtParamAttr$1 = spmExtParamAttr
            , spmVisualAttr$1 = spmVisualAttr
            , MutationOptions = {
            attributes: !0,
            childList: !0,
            subtree: !0,
            attributeFilter: [spmDataKey$2, spmDPosMarkAttr$2, "data-visual-component-id"],
            characterData: !1
        }
            , SpmTypes = {
            SPM_C: "spmc",
            SPM_D: "spmd"
        }
            , visualSpmMeta = null;
        function createMutation$1(e) {
            var t = window.MutationObserver || window.WebKitMutationObserver;
            if (t) {
                var r = new t(e);
                return load((function() {
                        r && r.observe(document.querySelector("body"), MutationOptions)
                    }
                )),
                    r
            }
        }
        function isMobile() {
            var e, t, r = null === (e = window) || void 0 === e || null === (t = e.navigator) || void 0 === t ? void 0 : t.userAgent;
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(r)
        }
        function getCdnUrl(e) {
            var t, r = !!e;
            r || (e = null === (t = visualSpmMeta) || void 0 === t ? void 0 : t.appId);
            var n = visualSpmMeta || {}
                , o = n.appType;
            if (!e || !o)
                return "";
            var i = "DEV" === n.env ? "DEV" : "PROD";
            return "".concat("https://ur.alipay.com/", "redirectService_").concat(r ? "VISUAL_CPT_H5" : o, "_").concat(e, "_").concat(i)
        }
        function getRemoteConfigByCdn(e, t, r, n) {
            var o = getCdnUrl(t)
                , i = function(e) {
                "function" == typeof r && r(e)
            };
            if (o) {
                var a = Date.now();
                sendXhrGet(o, (function(e) {
                        i(jsonParse(e))
                    }
                ), (function() {
                        "function" == typeof n && n(),
                            cdnLog({
                                link: "",
                                shortlink: o,
                                time: Date.now() - a,
                                success: !1
                            }, e),
                            i()
                    }
                ))
            } else
                i()
        }
        function writeAttrByVisualSpm(e, t, r) {
            if (e) {
                var n = function(t) {
                    var n = e[t]
                        , o = n.selector
                        , i = n.splitType
                        , a = n.spm
                        , s = getDomBySelector(o, i, r);
                    if (!s || 0 === s.length)
                        return "continue";
                    var c = o.similarBrotherIndex
                        , u = o.globalIndex
                        , l = o.selfSelector;
                    if (!0 === o.effectOthers) {
                        var p = s[0]
                            , f = getDomByStopAttr(p, o.effectOthersByAttr)
                            , d = p.hasAttribute(VISUAL_ARRAY_ATTR$1)
                            , m = getVisualDomAttr(p);
                        if (m && f && f.parentNode) {
                            var g = nodeListToArray(f.parentNode.querySelectorAll("[".concat(VISUAL_ARRAY_ATTR$1, "]")))
                                , h = [];
                            return g.forEach((function(e) {
                                    var t = e.getAttribute(VISUAL_ARRAY_ATTR$1);
                                    t && 0 === t.indexOf(m) && (d ? h.push(e) : h.push.apply(h, _toConsumableArray$2(nodeListToArray(getDomByAttrs(l, "normal", e)))))
                                }
                            )),
                                h.forEach((function(e, t) {
                                        addDomSpm(n, e, "".concat(a, "_").concat(t))
                                    }
                                )),
                                "continue"
                        }
                    }
                    if ("splited" === i)
                        return s.forEach((function(e, t) {
                                addDomSpm(n, e, "".concat(a, "_").concat(t))
                            }
                        )),
                            "continue";
                    var v = 0;
                    void 0 !== c ? v = c : void 0 !== u && (v = u),
                        addDomSpm(n, s[v], a)
                };
                for (var o in e)
                    n(o);
                t && deleteDomSpm(t)
            }
        }
        function getExpParam() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                , t = arguments.length > 1 ? arguments[1] : void 0
                , r = [];
            if (!e || !e.length)
                return "";
            var n, o = _createForOfIteratorHelper(e);
            try {
                for (o.s(); !(n = o.n()).done; ) {
                    var i = n.value
                        , a = i.extractType
                        , s = i.extractKey
                        , c = i.key
                        , u = i.extractHooksList
                        , l = i.extractParentLevel;
                    if ("function" != typeof extParamMethod[a])
                        return "";
                    var p = void 0;
                    "DataSet" !== a && "CompVariable" !== a || (p = t);
                    var f = extParamMethod[a](s, p, u, l);
                    r.push("".concat(c, "=").concat(f))
                }
            } catch (e) {
                o.e(e)
            } finally {
                o.f()
            }
            return r.join("^")
        }
        function addDomSpm(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            if (e && t && "function" == typeof t.getAttribute) {
                var n = e.spmType
                    , o = e.extParamConfigs
                    , i = n === SpmTypes.SPM_C ? spmDataKey$2 : spmDPosMarkAttr$2;
                t.getAttribute(i) != r && t.setAttribute(i, r);
                var a = !1;
                e.eventTypes && "function" == typeof e.eventTypes.indexOf && (a = -1 !== e.eventTypes.indexOf("exposure")),
                a && !t.hasAttribute(spmExpoAttr$1) && t.setAttribute(spmExpoAttr$1, ""),
                !a && t.hasAttribute(spmExpoAttr$1) && t.removeAttribute(spmExpoAttr$1);
                var s = getExpParam(o, t);
                t.getAttribute(spmExtParamAttr$1) !== s && t.setAttribute(spmExtParamAttr$1, s),
                t.hasAttribute(spmVisualAttr$1) || t.setAttribute(spmVisualAttr$1, "")
            }
        }
        function deleteDomSpm() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , t = [];
            for (var r in e) {
                var n = e[r]
                    , o = n.spmType
                    , i = n.spm
                    , a = "spmc" === o ? spmDataKey$2 : spmDPosMarkAttr$2
                    , s = "[".concat(a, '="').concat(i, '"][').concat(spmVisualAttr$1, "]")
                    , c = document.querySelectorAll(s);
                c && 0 !== c.length && (c.forEach((function(e, t) {
                        e.removeAttribute(spmVisualAttr$1),
                            e.removeAttribute(spmExpoAttr$1),
                            e.removeAttribute(spmDataKey$2),
                            e.removeAttribute(spmDPosMarkAttr$2)
                    }
                )),
                    t.push.call(t, c))
            }
            return t
        }
        var VISUAL_ARRAY_ATTR$1 = "data-visual-list-key"
            , url$2 = url
            , jsonParse$1 = jsonParse
            , strToObj$2 = strToObj$1
            , getAttr$3 = getAttr$1
            , yuyanLog$1 = yuyanLog
            , YUYANID$1 = YUYANID
            , extParamMethod = {
            UrlQueryParam: extParamFromUrlQuery,
            UrlPathParam: extParamFromUrlPath,
            StartUpParam: extParamFromStartUp,
            GlobalParam: extParamFromGlobal,
            DataSet: extParamFromDataSet,
            CompVariable: extParamFromCompVariable
        };
        function pathMatch(e, t) {
            if ("string" != typeof e || "string" != typeof t)
                return !1;
            if (e === t)
                return !0;
            for (var r = e.split("/"), n = t.split("/"), o = /\$\{pathParam\d+\}/, i = 0; Math.max(r.length, n.length) > i; i++)
                if (r[i] !== n[i] && !o.test(r[i]) && !o.test(n[i]))
                    return !1;
            return !0
        }
        function getDomByStopAttr(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!e || !t)
                return null;
            for (var n = [], o = e; o && "function" == typeof o.getAttribute && o !== document.body; ) {
                var i = o.getAttribute(VISUAL_ARRAY_ATTR$1);
                if (null !== i) {
                    var a = i.lastIndexOf("_")
                        , s = i.substr(a + 1);
                    if ("" !== s && (n = [s].concat(_toConsumableArray$2(n))),
                    i.substr(0, a) === t)
                        return r ? n : o
                }
                o = o.parentNode
            }
            return null
        }
        function closetDomByAttr(e, t) {
            for (var r = e; r && r.getAttribute && "body" !== r.tagName.toLowerCase(); ) {
                if (!0 === t(r))
                    return r;
                r = r.parentNode
            }
            return null
        }
        function getVisualDomAttr(e) {
            var t = "";
            return closetDomByAttr(e, (function(e) {
                    var r = e.getAttribute(VISUAL_ARRAY_ATTR$1);
                    if (null !== r) {
                        var n = r.lastIndexOf("_");
                        return "" !== (t = r.substr(0, n))
                    }
                }
            )) ? t : ""
        }
        function urlMatch(e, t) {
            if (e === t)
                return !0;
            if (!e || !t || "string" != typeof e || "string" != typeof t)
                return !1;
            var r = url$2.parse(e)
                , n = url$2.parse(t);
            return r.hash && n.hash && !1 === r.hashIsAnchor && !1 === n.hashIsAnchor ? pathMatch(r.hash || "", n.hash || "") : pathMatch(r.pathname, n.pathname)
        }
        function h5UrlMatch(e, t) {
            if (e === t)
                return !0;
            if (!e || !t)
                return !1;
            var r = e.match(/\/www\/.+/)
                , n = url$2.parse(t);
            return pathMatch(r ? r[0] : "", n.pathname)
        }
        function slelectorBuild(e) {
            if (e) {
                var t = {};
                for (var r in e)
                    if ("" !== e[r])
                        switch (r) {
                            case "className":
                                t[r] = "." + e[r].split(/\s+/).join(".");
                                break;
                            case "id":
                                t[r] = "#".concat(e[r]);
                                break;
                            case "dataTracker":
                                t[r] = '[data-tracker="'.concat(e[r], '"]');
                                break;
                            case "xpath":
                                t[r] = xpath2Selector(e[r]);
                                break;
                            default:
                                t[r] = e[r]
                        }
                return t
            }
        }
        function matchPositionParser(e) {
            if (e) {
                var t = {};
                for (var r in e)
                    t[r] = "attrs" === r || "parentAttrs" === r || "selfSelector" === r ? slelectorBuild(e[r]) : e[r];
                return t
            }
        }
        function getVisualUrlSpmBPos(e) {
            var t, r, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!e || !e.length)
                return null;
            for (var o = "WALLET_H5_APP" === (null == n ? void 0 : n.appType) ? h5UrlMatch : urlMatch, i = (null === (t = window) || void 0 === t || null === (r = t.__LYRA_LOCATION) || void 0 === r ? void 0 : r.href) || window.location.href, a = 0; e.length > a; a++) {
                var s = e[a]
                    , c = s.aggregationUrl
                    , u = void 0 === c ? "" : c
                    , l = s.fullSpm
                    , p = void 0 === l ? "" : l;
                if (o(i, u) && "string" == typeof p)
                    return _objectSpread2$a(_objectSpread2$a({}, e[a]), {}, {
                        spmBPos: p.split(".")[1]
                    })
            }
            return null
        }
        function configParser() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                , n = arguments.length > 3 ? arguments[3] : void 0
                , o = {
                spmbConfig: null,
                spmIdMap: {},
                prevDiffMap: {},
                origin: e
            }
                , i = e.spmbConfigsList
                , a = void 0 === i ? [] : i
                , s = e.appConfig
                , c = void 0 === s ? {} : s
                , u = t;
            if (!n) {
                var l = getVisualUrlSpmBPos(a, c || {});
                l && (o.spmbConfig = l,
                    u = l.spmBPos)
            }
            if (!u)
                return o;
            var p = parseCDListConfig(e, !1, u);
            return Object.keys(p).forEach((function(e) {
                    o.spmIdMap[e] = p[e],
                    r[e] && delete r[e]
                }
            )),
                p = null,
                o.prevDiffMap = r,
                o
        }
        var CDPositionList = [SpmTypes.SPM_C, SpmTypes.SPM_D];
        function parseCDListConfig(e) {
            var t = 1 >= arguments.length || void 0 === arguments[1] || arguments[1]
                , r = arguments.length > 2 ? arguments[2] : void 0
                , n = {};
            return CDPositionList.forEach((function(o) {
                    var i = e["".concat(o, "ConfigsList")];
                    if (i)
                        for (var a = 0; i.length > a; a++) {
                            var s = i[a]
                                , c = s.fullSpm
                                , u = void 0 === c ? "" : c
                                , l = s.matchPosition
                                , p = void 0 === l ? "" : l
                                , f = u.split(".")
                                , d = f[1];
                            if (t || "bFollowPage" === d || r === d) {
                                var m = f.slice(-1).join("");
                                if (o === SpmTypes.SPM_D) {
                                    var g = f.slice(0, 3).join(".")
                                        , h = n[g];
                                    (!h || h.matchPosition && 0 === Object.keys(h.matchPosition).length) && (m = f.slice(-2).join("."))
                                }
                                var v = jsonParse$1(p, {});
                                n[u] = _objectSpread2$a(_objectSpread2$a({}, i[a]), {}, {
                                    spm: m,
                                    spmType: o,
                                    matchPosition: v,
                                    selector: matchPositionParser(v)
                                })
                            }
                        }
                }
            )),
                n
        }
        function getVisualMeta() {
            var e = document.querySelector('meta[name="visual-spm"]');
            if (null === e)
                return null;
            var t = getAttr$3(e, "content") || "";
            return visualSpmMeta = strToObj$2(t)
        }
        function xpath2Selector(e) {
            var t = "";
            if ("string" != typeof e)
                return t;
            var r = e.replace(/^\//, "").split("/")
                , n = /\[(\d+)\]/
                , o = r.map((function(e) {
                    var t, r = null === (t = e.match(n)) || void 0 === t ? void 0 : t[1];
                    return void 0 === r ? e : "".concat(e.replace(n, ""), ":nth-of-type(").concat(r, ")")
                }
            ));
            return t = o.join(">")
        }
        function getDomByAttrs(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document
                , n = "splited" === t ? ["className", "dataTracker", "id", "xpath"] : ["dataTracker", "id", "className", "xpath"]
                , o = [];
            if (!e)
                return o;
            for (var i = 0, a = n; a.length > i; i++) {
                var s = a[i];
                if (e[s]) {
                    var c = "xpath" === s ? document : r;
                    return _toConsumableArray$2(o = c.querySelectorAll(e[s]) || [])
                }
            }
            return o
        }
        function getDomBySelector(e, t, r) {
            if (!e)
                return [];
            var n = e.parentAttrs
                , o = e.attrs
                , i = e.parentGlobalIndex
                , a = r || document;
            if (void 0 !== e.globalIndex && void 0 === e.similarBrotherIndex || !n)
                return getDomByAttrs(o, t, a);
            var s = getDomByAttrs(n, "", a);
            if (!s || 0 === s.length)
                return [];
            void 0 !== i && (s = s[i] ? [s[i]] : []);
            var c = [];
            return s.forEach((function(e) {
                    var r = getDomByAttrs(o, t, e);
                    r && 0 !== r.length && c.push.apply(c, _toConsumableArray$2(r))
                }
            )),
                c
        }
        function cdnLog(e, t) {
            yuyanLog$1({
                yuyan_id: YUYANID$1,
                code: 12,
                msg: e.link,
                d1: e.shortlink,
                d2: e.time,
                d3: e.success,
                m1: e.time
            }, t)
        }
        var visualCfgMap = {};
        function effectiveComponentCfg(e) {
            e.forEach((function(e) {
                    var t = visualCfgMap[e];
                    if (t)
                        for (var r = document.querySelectorAll('[data-ant-render-component="@alipay/'.concat(e, '"]')), n = 0; r.length > n; n++) {
                            writeAttrByVisualSpm(t, null, r[n])
                        }
                }
            ))
        }
        function writeComponentCfg(e, t) {
            t && (void 0 === visualCfgMap[t] ? (visualCfgMap[t] = null,
                getRemoteConfigByCdn(e, t, (function(e) {
                        e && (visualCfgMap[t] = parseCDListConfig(e),
                            effectiveComponentCfg([t]))
                    }
                ), (function() {
                        visualCfgMap[t] = void 0
                    }
                ))) : effectiveComponentCfg([t]))
        }
        var uep$3 = uep$1
            , isPC = !isMobile()
            , CONFIG_WAIT_TIME = isPC ? 1e3 : 500
            , waitRemoteTimer = null
            , visualSpmConfig = null
            , waitRemoteConfig = !0
            , clickLaterList = []
            , mutationObserver = null
            , cacheLogs = null
            , isInited = !1
            , logPvQueue = [];
        function getVisualMatchSpmB() {
            var e, t = (null === (e = visualSpmConfig) || void 0 === e ? void 0 : e.origin) || {}, r = getVisualUrlSpmBPos(t.spmbConfigsList, t.appConfig);
            return r ? r.spmBPos : null
        }
        function clearLogPvQueue(e) {
            logPvQueue.forEach((function(t) {
                    var r = t.opts
                        , n = t.spmBPos;
                    (n && !uep$3.isAutoSpmB(n) || !getVisualMatchSpmB()) && e && e.call("logPv", r)
                }
            )),
                logPvQueue.length = 0
        }
        function updateConfig(e, t) {
            var r;
            e && (visualSpmConfig = configParser(e, this.spmBPos, null === (r = visualSpmConfig) || void 0 === r ? void 0 : r.spmIdMap, t),
            !1 === waitRemoteConfig && configEffective(this))
        }
        function autoLogPv$1(e) {
            var t = (visualSpmConfig || {}).spmbConfig;
            t && t.spmBPos && t.spmBPos !== e.spmBPos && (e.spmBPos = t.spmBPos,
                e.call("logPv", e.autoLogPv ? {
                    combineType: index$1.COMBINE_TYPE.MIX
                } : {
                    combineType: index$1.COMBINE_TYPE.AUTO
                }))
        }
        function configEffective(e) {
            waitRemoteConfig = !1,
                clearLogPvQueue(e),
            visualSpmConfig && (autoLogPv$1(e),
                writeAttrByVisualSpm(visualSpmConfig.spmIdMap, visualSpmConfig.prevDiffMap),
                sendLaterLog(e),
                clearTimeout(waitRemoteTimer),
            "function" == typeof cacheLogs && cacheLogs())
        }
        function initConfig(e) {
            var t = window.__tracertVisual || {};
            updateConfig.call(e, t.config),
            waitRemoteConfig && (waitRemoteTimer = setTimeout((function() {
                    configEffective(e)
                }
            ), CONFIG_WAIT_TIME),
                getRemoteConfigByCdn(e, null, (function(t) {
                        updateConfig.call(e, t),
                            configEffective(e)
                    }
                )))
        }
        function sendLaterLog(e) {
            var t, r = _createForOfIteratorHelper(clickLaterList);
            try {
                for (r.s(); !(t = r.n()).done; ) {
                    e.call("_spmEventHandler", t.value)
                }
            } catch (e) {
                r.e(e)
            } finally {
                r.f()
            }
            clickLaterList.length = 0
        }
        function startMutationObserver(e) {
            if (!mutationObserver) {
                var t = throttle$4((function() {
                        mutationObserver.disconnect(),
                        visualSpmConfig && writeAttrByVisualSpm(visualSpmConfig.spmIdMap, visualSpmConfig.prevDiffMap),
                            mutationObserver.observe(document.querySelector("body"), MutationOptions)
                    }
                ), 300, {
                    leading: !0,
                    trailing: !0
                });
                mutationObserver = createMutation$1((function(r) {
                        r && r.length > 0 && r.forEach((function(t) {
                                var r = t.target;
                                if ("attributes" === t.type || "childList" === t.type)
                                    for (; r && "function" == typeof r.getAttribute && 1 === r.nodeType && "BODY" !== r.tagName && "HTML" !== r.tagName; ) {
                                        var n = r.getAttribute("data-ant-render-component");
                                        n && "string" == typeof n && writeComponentCfg(e, n.replace("@alipay/", ""), t.target),
                                            r = r.parentNode
                                    }
                            }
                        )),
                            t.call(e)
                    }
                ))
            }
        }
        function start(e) {
            initConfig(e),
            isInited || (isInited = !0,
                startMutationObserver(e),
                e.before("autoClick", (function(e) {
                        if (waitRemoteConfig)
                            return clickLaterList.push(e),
                                !1
                    }
                )),
                e.set({
                    autoExpo: !0
                }),
            waitRemoteConfig && (cacheLogs = ownAddEventListener("beforeunload", window, (function() {
                    configEffective(e)
                }
            ))),
                e.before("logPv", (function(t) {
                        if (!0 === waitRemoteConfig)
                            return logPvQueue.push({
                                opts: t,
                                spmBPos: e.spmBPos
                            }),
                                !1;
                        var r = getVisualMatchSpmB();
                        if (uep$3.isAutoSpmB(e.spmBPos) && r)
                            e.spmBPos = r;
                        else if (e.autoLogPv && "auto" === t.combineType && r)
                            return !1
                    }
                )),
            isPC && e.before("set", (function(e) {
                    if (e && e.pathName)
                        return uep$3.isAutoSpmB(e.spmBPos) && getVisualMatchSpmB() ? (console.log("当前页面已存在可视化配置时，自动设置的B位".concat(e.spmBPos, "失效!")),
                            !1) : void 0
                }
            )),
                e.after("set", (function(t) {
                        var r, n, o;
                        t.spmBPos && ((null === (r = visualSpmConfig) || void 0 === r || null === (n = r.spmbConfig) || void 0 === n ? void 0 : n.spmBPos) !== t.spmBPos && updateConfig.call(e, null === (o = visualSpmConfig) || void 0 === o ? void 0 : o.origin, !0))
                    }
                )),
            "function" == typeof e.onRouterChange && e.onRouterChange((function() {
                    var t;
                    updateConfig.call(e, null === (t = visualSpmConfig) || void 0 === t ? void 0 : t.origin)
                }
            )))
        }
        var context$5 = {
            initVisualSpm: function() {
                var e, t, r = this, n = getVisualMeta();
                waitRemoteConfig = !(!n || "false" === (null == n ? void 0 : n.remote)),
                (n || (null === (e = window) || void 0 === e || null === (t = e.__tracertVisual) || void 0 === t ? void 0 : t.config)) && start(this),
                    addEvent("TracertVisualConfigReady", document, (function() {
                            var e = window.__tracertVisual || {}
                                , t = e.config;
                            !t || !0 !== e.isAntLogDev && visualSpmConfig || updateConfig.call(r, t)
                        }
                    ))
            }
        }
            , visualSpm = function(e, t) {
            return e.set(_objectSpread2$a({}, context$5)),
                t(),
                e.call("initVisualSpm"),
                e
        };
        function ownKeys$b(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }
                ))),
                    r.push.apply(r, n)
            }
            return r
        }
        function _objectSpread2$b(e) {
            for (var t = 1; arguments.length > t; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys$b(Object(r), !0).forEach((function(t) {
                        _defineProperty$c(e, t, r[t])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys$b(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }
                ))
            }
            return e
        }
        function _typeof$b(e) {
            return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof$b(e)
        }
        function _defineProperty$c(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
                e
        }
        var helper$3 = {
            _guid: function() {
                return uuid()
            },
            generatePageId: function(e) {
                var t = e || {}
                    , r = t.spmAPos
                    , n = t.spmBPos
                    , o = r && n ? "".concat(r, ".").concat(n) : "";
                return "".concat(o, "_").concat(this._guid(), "_").concat(Date.now())
            },
            _initSessionId: function(e) {
                try {
                    var t = window.sessionStorage
                        , r = e.sessionIdKey;
                    return t || (t = {}),
                    t[r] || (t[r] = "".concat(this._guid(), "_").concat(Date.now())),
                    t[r] || ""
                } catch (e) {}
                return ""
            },
            _initClientId: function(e) {
                var t = window.localStorage
                    , r = e.sessionIdKey;
                if (t)
                    return t[r] || (t[r] = "".concat(this._guid(), "_").concat(Date.now())),
                    t[r] || ""
            },
            _initPageId: function(e) {
                window._tracert_loader_cfg = window._tracert_loader_cfg || {};
                var t = window._tracert_loader_cfg.pageId
                    , r = e || {}
                    , n = r.spmAPos
                    , o = r.spmBPos;
                if (!t) {
                    var i = getMetaSpm(null, r.container)
                        , a = n || i.spmAPos
                        , s = o || getSpmBPos$1()
                        , c = a && s ? "".concat(a, ".").concat(s) : "";
                    t = "".concat(c, "_").concat(this._guid(), "_").concat(Date.now()),
                        window._tracert_loader_cfg.pageId = t
                }
                return t
            },
            _initChInfo: function() {
                return getValue("chInfo") || getValue("chinfo")
            },
            _initVerify: function() {
                return {
                    taskId: getValue("tracertTaskId"),
                    verifyServer: getValue("tracertVerifyServer")
                }
            },
            fillInSpmId: function(e, t) {
                var r = e.spmId || ""
                    , n = e.actionId
                    , o = t.spmAPos
                    , i = t.spmBPos;
                if (n !== t.seedIdCfg.pageSeedId) {
                    var a = r.split(".").length;
                    n !== index$1.EVENT_TYPE.CLICK || r ? o && i ? "" !== r ? 3 > a ? e.spmId = [o, i, r].join(".") : a > 4 && (e.param2 = r,
                        delete e.spmId) : delete e.spmId : 3 > a && delete e.spmId : e.spmId = "".concat(o).concat(i ? "." + i : "")
                } else
                    e.spmId = r || "".concat(o).concat(i ? "." + i : "")
            },
            _formatParam: function(e, t) {
                var r = t || {};
                this.fillInSpmId(r, e),
                !r.param2 && r.spmId && (r.param2 = r.spmId);
                var n = "";
                e.spmAPos && e.spmBPos && (n = "".concat(e.spmAPos, ".").concat(encodeURIComponent(e.spmBPos)));
                for (var o = {
                    version: e.version,
                    mBizScenario: e.bizScenario,
                    mPageState: e.state,
                    role_id: getUserId(e),
                    fullURL: location.href,
                    ref: e.refUrl,
                    clientID: e.clientId,
                    pageSpm: n
                }, i = ["chInfo", "_spmId", "dtLogMonitor", "_refSpm"], a = 0; i.length > a; a++) {
                    var s = i[a];
                    e[s] && (o[s] = e[s])
                }
                return r.param4 ? objectAssign(r.param4, o) : r.param4 = o,
                    r.param4 = _objectSpread2$b(_objectSpread2$b({}, e.mdata), r.param4),
                    r
            },
            cutOffTitle: function(e) {
                if ("string" != typeof e)
                    return "";
                var t = e.length;
                return t > 20 ? "".concat(e.substring(0, 10)).concat(e.substring(t - 10), "|").concat(t - 20) : e
            },
            getClickParams: function(e) {
                var t = e ? e.target || e.srcElement || e : null;
                if (!t)
                    return {};
                var r = document.documentElement.scrollHeight || 0
                    , n = document.documentElement.scrollWidth || 0
                    , o = {
                    width: null == t ? void 0 : t.clientWidth,
                    height: null == t ? void 0 : t.clientHeight
                };
                "function" == typeof t.getBoundingClientRect && (o = t.getBoundingClientRect());
                var i = getXPath$1(t)
                    , a = getCssSelector(t) || "";
                return "string" == typeof a && 0 === a.indexOf("#") || (a = i),
                    {
                        xpath: i,
                        selectorId: a,
                        selectorName: getDomText(t, 1),
                        clickXPos: ~~e.pageX,
                        clickYPos: ~~e.pageY,
                        scrollWidth: n,
                        scrollHeight: r,
                        clickWidth: o.width || 0,
                        clickHeight: o.height || 0,
                        dpr: window.devicePixelRatio || 1
                    }
            }
        }
            , url$3 = url
            , uep$4 = uep$1
            , context$6 = {
            _calledLogPv: !1,
            server: "https://collect.alipay.com/dwcookie",
            openSendBeacon: !1,
            seedIdCfg: {
                pageSeedId: "pageMonitor",
                clkSeedId: "clicked",
                calcSeedId: "calc",
                expoSeedId: "exposure",
                syslogSeedId: "syslog",
                exceptionSeedId: "102023"
            },
            refUrl: document.referrer || "",
            clientIdKey: "tracert-client-key",
            verifyServer: "https://log.alipay.com/realTimeNonNativeLogCheck/uploadLog.json",
            init: function() {
                if (!this._calledInited) {
                    var e = helper$3._initSessionId(this)
                        , t = helper$3._initClientId(this)
                        , r = helper$3._initPageId(this)
                        , n = this.chInfo || helper$3._initChInfo(this)
                        , o = helper$3._initVerify();
                    this.call("set", _objectSpread2$b({
                        sessionId: e,
                        pageId: r,
                        clientId: t,
                        chInfo: n
                    }, o));
                    var i = this;
                    this.before("logPv", (function() {
                            i._calledLogPv && (i.pageId = helper$3.generatePageId(i)),
                            i.spmBPos || (i.spmBPos = uep$4.getAutoSpmB());
                            var e = url$3.parse(window.location.href || "");
                            i.url = e.format()
                        }
                    )),
                        this._calledInited = !0
                }
            },
            _logPv: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = getValue("cityId")
                    , r = this.spmAPos
                    , n = this.spmBPos
                    , o = this.framePageTitle
                    , i = "".concat(r).concat(n ? "." : "").concat(n)
                    , a = helper$3.cutOffTitle(o || document.title)
                    , s = {
                    seedId: this.seedIdCfg.pageSeedId,
                    actionId: this.seedIdCfg.pageSeedId,
                    spmId: i,
                    param1: this.url,
                    param2: "",
                    param3: "",
                    param4: _objectSpread2$b({
                        cityid: t,
                        framePageTitle: a
                    }, e)
                };
                this.call("remoteLog", s),
                    this._calledLogPv = !0
            },
            sendExpose: function() {
                var e = this
                    , t = setInterval((function() {
                        if (e.cacheExObjArr.length - 1 < e._wap_exObjIndex)
                            clearTimeout(t);
                        else {
                            var r = e._packFinalData(e.cacheExObjArr[e._wap_exObjIndex]);
                            e._send(r),
                                e._wap_exObjIndex++
                        }
                    }
                ), this._wap_intervalEx)
            },
            sendMergeExpose: function() {
                var e = this;
                this._expoMergeItvObj || (this._expoMergeItvObj = setInterval((function() {
                        if (e.fmtedExObjArr.length - 1 < e._wap_mgObjIndex)
                            clearTimeout(e._expoMergeItvObj),
                                e._expoMergeItvObj = null;
                        else {
                            var t = e.cacheMrExObjArr[e._wap_mgObjIndex];
                            if (t && t.length && t.length - 1 >= e._wap_mgTdObjIndex) {
                                var r = t[e._wap_mgTdObjIndex]
                                    , n = e._packFinalData(r.ExObj, "", r.currentConfig);
                                e._send(n),
                                    e._wap_mgTdObjIndex++
                            } else
                                t && t.length && (e._wap_mgTdObjIndex = 0,
                                    e._wap_mgObjIndex++);
                            var o = e.fmtedExObjArr[e._wap_mgTdObjIndex]
                                , i = e._packFinalData(o.ExObj, "", o.currentConfig);
                            e._send(i),
                                e._wap_mgObjIndex++
                        }
                    }
                ), this._wap_interval))
            },
            remoteLog: function(e, t) {
                if (e.actionId !== index$1.EVENT_TYPE.EXPOSURE || !t || t.combineType !== index$1.COMBINE_TYPE.AUTO) {
                    this.init();
                    var r = this
                        , n = helper$3._formatParam(this, e);
                    if (n.actionId === index$1.EVENT_TYPE.CLICK)
                        objectAssign(n.param4, helper$3.getClickParams(t.event));
                    else if (!n.spmId)
                        return;
                    if ("mergeExpose" === n.actionId && n.spmId && 3 === n.spmId.split(".").length && n.param4)
                        return this._wap_timer && clearTimeout(this._wap_timer),
                            this.fmtedExOptions = addMexOption(this.fmtedExOptions, objectAssign({}, n)),
                            this.fmtedExObj = addToExObj(this.fmtedExObj, objectAssign({}, n)),
                            this.fmtedExObjArr = formatExObj(this.fmtedExObj, this.fmtedExOptions, t),
                            void (this._wap_timer = setTimeout((function() {
                                    r.cacheMrExObjArr.push(r.fmtedExObjArr),
                                        r.fmtedExObj = {},
                                        r.fmtedExObjArr = [],
                                        r.sendMergeExpose()
                                }
                            ), this._wap_interval));
                    if ("exposure" === n.actionId && n.spmId && 3 === n.spmId.split(".").length)
                        return this._wap_timerEx && clearTimeout(this._wap_timerEx),
                            this.cacheExObjArr.push(n),
                            void (this._wap_timerEx = setTimeout((function() {
                                    r.sendExpose()
                                }
                            ), this._wap_intervalEx));
                    var o = this._packFinalData(n, void 0, t);
                    this._send(o)
                }
            },
            _packFinalData: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                    , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                "function" == typeof this._beforePackFinalData && this._beforePackFinalData(e);
                var n = e.param4;
                n && (uep$1.isAutoLog(e.spmId, r) && (n._autoLog = !0),
                    n.fullURL = location.href),
                    e.param4 = processParam4(e.param4),
                "clicked" === e.actionId && this.set({
                    lastClkSpm: e.spmId
                });
                for (var o = getUserId(this), i = detect$1, a = t && "event" === t ? ["D-AE", getNewDate(), this.clientId || "", "", "2", "", this.sessionId || "", o, 1e3, e.actionId, r.bizType || this.bizType, this.logLevel, this.pageId || "", "", "", "", "", "", "", "", "", "", "", "", "", "".concat(window.innerWidth || "", "x").concat(window.innerHeight, "x").concat(window.devicePixelRatio), "", "", "", navigator.userAgent ? navigator.userAgent.replace(/,/g, "%2C") : "", "", "", "", "object" === _typeof$b(this.sysInfo) ? objToStr(this.sysInfo) : "", "", "", "object" === _typeof$b(e.param4) ? objToStr(e.param4) : e.param4] : ["DW-COOKIE", this.sessionId || "", o, e.actionId || "", e.spmId || e.seedId || "", this.referSPM || "", this.url && this.url.length > 300 ? this.url.slice(0, 300) : this.url || "", this.refUrl || this.referPageId || "", "object" === _typeof$b(e.param4) ? objToStr(e.param4) : e.param4 || "", this.chInfo || "", this.platformType || "", this.pageId || "", navigator.userAgent ? navigator.userAgent.replace(/,/g, "%2C") : "", "na" === i.os.name ? "PC" : "H5", "".concat(i.app.name, "/").concat(i.app.version, "|").concat(i.browser.name, "/").concat(i.browser.fullVersion, "|").concat(i.os.name, "/").concat(i.os.fullVersion), this.srcSpm || "", this.referPageId || "", r.bizType || this.bizType || "", "", window.innerWidth || "", window.innerHeight || "", window.devicePixelRatio || "", "object" === _typeof$b(this.sysInfo) ? objToStr(this.sysInfo) : "", this.darwinExpId || ""], s = 0; a.length > s; s++)
                    "string" == typeof a[s] && (a[s] = a[s].replace(/,/g, "%2C"));
                return a
            },
            _send: function(e) {
                request({
                    tracert: this,
                    type: requestTypeEnum.http,
                    data: e
                })
            },
            send: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "clicked"
                    , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    , r = arguments.length > 2 ? arguments[2] : void 0
                    , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                this._runBeforeFns("send", t);
                var o = isNaN(e) ? "" : "event"
                    , i = this._packFinalData({
                    spmId: r || "".concat(this.spmAPos, ".").concat(this.spmBPos),
                    actionId: e,
                    param4: t
                }, o, n);
                this._send(i)
            }
        }
            , polyfill = {
            getChinfoChain: function() {},
            appendChinfo: function() {},
            updateChinfo: function() {},
            setPageParams: function() {},
            setNextPageParams: function() {},
            setCurrentPageNewChinfo: function() {},
            setNextPageNewChinfo: function() {},
            getCurrentPageParams: function() {},
            getChinfoChainUUID: function() {}
        }
            , wap = function(e, t) {
            var r = e;
            return r.set(_objectSpread2$b(_objectSpread2$b({}, context$6), polyfill)),
                r.call("init"),
                t(),
                r
        }
            , deprecatedReason = {
            yuyan: "相关功能已统一迁移到yuyanMonitor, 请联系雨燕同学轩恒使用。"
        };
        function deprecatedLogFn(e, t) {
            var r = !1;
            return function() {
                deprecated("".concat(e, "接口已废弃，").concat(t));
                var n = (window || {}).Tracert;
                !r && n && (reportError({
                    message: "已废弃接口".concat(e, "调用"),
                    name: "废弃接口调用",
                    stack: ""
                }, n),
                    r = !0)
            }
        }
        var deprecatedFns = {
            initDtLogMonitor: deprecatedLogFn("initDtLogMonitor", deprecatedReason.yuyan),
            dtLogMonitor: deprecatedLogFn("dtLogMonitor", deprecatedReason.yuyan)
        };
        function loadDeprecatedPlugins(e) {
            objectAssign(e, deprecatedFns)
        }
        var win$4 = window
            , TRACERT_INSTANTIATION_NAME = "__TRACERT_INSTANTIATION__";
        function getSubInstance(e) {
            var t = "".concat(TRACERT_INSTANTIATION_NAME).concat(e);
            return win$4[t] || void 0
        }
        var helper$4 = {
            checkApp: function(e) {
                return detect$1._checkApp(e)
            },
            isMobile: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : win$4.navigator.userAgent;
                return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(e)
            },
            disableBizLog: function(e) {
                win$4.BizLog && e && e._isMain && "function" == typeof win$4.BizLog.call && (win$4.BizLog.call("config", {
                    disabled: !0
                }),
                "function" == typeof document.addEventListener && document.addEventListener("AlipayJSBridgeReady", (function() {
                        win$4.BizLog.call("config", {
                            disabled: !0
                        })
                    }
                ), !1))
            },
            runBizlogLoader: function(e) {
                if (win$4.BizLog && e && e._isMain) {
                    var t = win$4.BizLog._readyToRun
                        , r = win$4.BizLog || {};
                    if (r.call = function() {
                        for (var t = arguments.length, r = Array(t), n = 0; t > n; n++)
                            r[n] = arguments[n];
                        return e.call.apply(e, r)
                    }
                        ,
                    t && t.length)
                        for (var n = 0; t.length > n; n++) {
                            var o = t[n];
                            if ("function" == typeof o)
                                try {
                                    o()
                                } catch (e) {
                                    console.warn(e)
                                }
                        }
                    win$4.BizLog = r
                }
            },
            initTracert: function(e) {
                if (e) {
                    if (e._isMain && win$4.Tracert) {
                        var t = win$4.Tracert._readyToRun;
                        if (win$4.Tracert.call = function() {
                            for (var t = arguments.length, r = Array(t), n = 0; t > n; n++)
                                r[n] = arguments[n];
                            return e.call.apply(e, r)
                        }
                            ,
                        t && t.length)
                            for (var r = 0; t.length > r; r++) {
                                var n = t[r];
                                if ("function" == typeof n)
                                    try {
                                        n()
                                    } catch (e) {
                                        console.warn(e)
                                    }
                            }
                    }
                    var o = getValue("lanInfo") || getValue("laninfo");
                    o && e.set({
                        mdata: {
                            lanInfo: o
                        }
                    }),
                    e._isMain && (e.set(win$4._to || {}),
                        e.set(win$4._tracert_loader_cfg || {})),
                        e.set({
                            parse: strToObj$1,
                            stringify: objToStr
                        }),
                        e.run()
                } else
                    console.log("tracert not exist!")
            },
            hasTracert: function(e) {
                return !(!e || "string" != typeof e) && (win$4.Tracert.get("spmAPos") === e ? win$4.Tracert : getSubInstance(e) || !1)
            },
            destroyTracert: function(e) {
                return new Promise((function(t, r) {
                        if (e && "string" == typeof e || r(Error("[Tracert] 需要A位spmAPos")),
                        win$4.Tracert.get("spmAPos") === e)
                            return r(Error("[Tracert] 主实例不可销毁".concat(e)));
                        var n = getSubInstance(e);
                        if (n) {
                            var o = n.clearSideEffects()
                                , i = delete win$4["".concat(TRACERT_INSTANTIATION_NAME).concat(e)];
                            o && i ? t("[Tracert] 实例已销毁', ".concat(e)) : r(Error("[Tracert] 实例销毁错误', ".concat(e)))
                        } else
                            r(Error("[Tracert] 未找到此实例', ".concat(e)))
                    }
                ))
            },
            getTracertInstance: function(e, t) {
                if ("function" == typeof e) {
                    var r = t.spmAPos;
                    if ("string" == typeof r && r) {
                        if (win$4.Tracert.get("spmAPos") === r)
                            return win$4.Tracert.set(_objectSpread2({
                                _isMain: !0
                            }, t)),
                                win$4.Tracert;
                        var n = getSubInstance(r) || e(objectAssign({}, t));
                        return win$4["".concat(TRACERT_INSTANTIATION_NAME).concat(r)] = n,
                            n.set(t),
                            n
                    }
                    console.warn("[Tracert] 需要A位spmAPos")
                } else
                    console.warn("[Tracert] getInstance is not function")
            }
        }
            , win$5 = window
            , v = "4.5.4"
            , Instance = {
            create: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = new Core(objectAssign({
                    v: v
                }, e))
                    , r = helper$4.checkApp(win$5.navigator.userAgent);
                if (["AP", "AF", "AFW", "BK", "AM", "APHK", "KB", "Snail"].indexOf(r.name) > "-1" && win$5.top === win$5)
                    t.loadPlugins([ap, autoClick, autoExpo, autoLogPv, sem, fullLinkParams, index$2, autoScroll, visualSpm]),
                        loadDeprecatedPlugins(t),
                        t.call("info", {
                            seedId: "H5_TRACERT_USE_LOG",
                            logLevel: "3",
                            mdata: {
                                "tracert-version": v
                            }
                        });
                else if (["TB", "TM", "JU"].indexOf(r.name) > -1)
                    t.loadPlugins([wap, tb, autoLogPv, autoClick, autoExpo, index$2]);
                else if (["LX"].indexOf(r.name) > -1)
                    t.loadPlugins([wap, lx, autoLogPv, autoClick, autoExpo, index$2]);
                else if (["QN"].indexOf(r.name) > -1)
                    t.loadPlugins([wap, qn, autoLogPv, autoClick, autoExpo, index$2]);
                else {
                    var n = [wap, fullfill, autoLogPv, autoClick, autoExpo, index$2, visualSpm];
                    helper$4.isMobile() || n.push(bucName),
                        t.loadPlugins(n)
                }
                return helper$4.disableBizLog(t),
                    helper$4.initTracert(t),
                    helper$4.runBizlogLoader(t),
                    t
            }
        }
            , win$6 = window
            , createTracert = function(e) {
            return helper$4.getTracertInstance(Instance.create, e)
        };
        !win$6.Tracert || win$6.Tracert._isInit ? win$6.Tracert = Instance.create({
            _isMain: !0
        }) : win$6.Tracert.startAutoScroll || win$6.Tracert && ap_min(win$6.Tracert, (function() {}
        )),
        win$6.Tracert.createTracert || (win$6.Tracert.createTracert = function(e) {
                return new Promise((function(t) {
                        win$6.Tracert.after("start", (function() {
                                t(createTracert(e))
                            }
                        ))
                    }
                ))
            }
        ),
        win$6.Tracert.hasTracert || (win$6.Tracert.hasTracert = helper$4.hasTracert),
        win$6.Tracert.destroyTracert || (win$6.Tracert.destroyTracert = helper$4.destroyTracert);
        var starter = win$6.Tracert;
        return starter
    }
));
