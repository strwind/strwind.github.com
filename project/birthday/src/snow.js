
define(function (require) {
    var $ = require('zepto');
    var A = {};
    A.ui = {};
    A.ui.snow = function(b) {
        return new a(b)
    };
    function a(h) {
        var f = [];
        var g = 55;
        var h = h ? h : 2;
        var e = navigator.userAgent;
        var i = e.match(/MSIE (\d+)/);
        i = i && +i[1];
        var b = (i == 6);
        var c = null;
        if (!b) {
            //A.uicss("snow/snow.css");
            function d() {
                var l = 55 - 20 * (3 - h);
                var m = function(t) {
                    var B = document.documentElement.clientWidth || document.body.clientWidth, E = document.documentElement.clientHeight || document.body.clientHeight, G = Math.random() * 1 - 0.3, y = Math.ceil(16 * (1 + G)), w = Math.random() * (B - 100), v = 0, u = 0, r = 0, s = parseInt(h, 10) + Math.random() * 3, q = Math.random() * 3, n = 1, H = null, o = null, F = null, C = this;
                    if (Math.random() - 0.5 > 0) {
                        u = (0.01 + Math.random() / 100)
                    } else {
                        u = -(0.01 + Math.random() / 100)
                    }
                    var x = function() {
                        H = document.createElement("img");
                        var I = Math.ceil(Math.random() * 100) % 100;
                        if (I > 95) {
                            I = 4
                        } else {
                            if (I <= 95 && I > 65) {
                                I = 3
                            } else {
                                if (I <= 65 && I > 35) {
                                    I = 2
                                } else {
                                    if (I <= 35 && I > 0) {
                                        I = 1
                                    } else {
                                        I = 1
                                    }
                                }
                            }
                        }
                        var K = {position: "absolute",zIndex: "10000000",opacity: n,width: (y + "px"),height: (y + "px")};
                        H.src = "img/snowflake" + I + ".png";
                        for (var J in K) {
                            if (K.hasOwnProperty(J)) {
                                H.style[J] = K[J]
                            }
                        }
                        H.style.left = w + "px";
                        H.style.top = v + "px";
                        document.body.appendChild(H)
                    };
                    var z = function() {
                        r += u;
                        w = w + q * Math.sin(r);
                        v += s;
                        var I = document.documentElement.clientWidth || document.body.clientWidth, J = document.documentElement.clientHeight || document.body.clientHeight;
                        if (50 < w && w < (I - 50) && 0 < v && v < (J - 100)) {
                            H.style.left = w + "px";
                            H.style.top = v + "px"
                        } else {
                            H.style.left = w + "px";
                            H.style.top = v + "px";
                            if (!F) {
                                F = setInterval(function() {
                                    if (n >= 0) {
                                        n -= 0.2;
                                        H.style.opacity = n
                                    } else {
                                        p();
                                        f[t] = new m(t)
                                    }
                                }, 50)
                            }
                        }
                    };
                    var p = this.destory = function() {
                        clearInterval(F);
                        clearInterval(o);
                        if (H.parentNode) {
                            H.parentNode.removeChild(H)
                        }
                        C = null
                    };
                    var D = function() {
                        x();
                        o = setInterval(function() {
                            z()
                        }, 50)
                    };
                    D()
                };
                function j() {
                    var o = 10 + 3 * h;
                    for (var n = 0; n < o; n++) {
                        f[n] = new m(n)
                    }
                    c = setInterval(function() {
                        var p = f.length;
                        if (p < l) {
                            f[p] = new m(p)
                        } else {
                            clearInterval(c)
                        }
                    }, 300)
                }
                function k() {
                    var n = $('<div class="opui-snow-btn c-btn c-btn-primary c-btn-large">关闭动画</div>');
                    $("body").append(n);
                    n.on("click", function() {
                        clearInterval(c);
                        for (var o = 0; o < l; o++) {
                            if (f[o]) {
                                f[o].destory()
                            }
                        }
                        n.remove()
                    })
                }
                k();
                j()
            }
            d()
        }
        this.dispose = dispose = function() {
            clearInterval(c);
            for (var j = 0; j < g; j++) {
                if (f[j]) {
                    f[j].destory()
                }
            }
            $(".opui-snow-btn").remove()
        }
    }
    return A.ui;
    A.ui.snow();
});