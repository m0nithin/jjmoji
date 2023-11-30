! function(t) {
    var o = function(o, s) {
        var e, i, n = !1,
            r = !1,
            a = !1,
            c = {},
            f = -1,
            p = {
                to: "top",
                offset: 0,
                effectsOffset: 0,
                parent: !1,
                classes: {
                    sticky: "ekit-sticky",
                    stickyActive: "ekit-sticky-active",
                    stickyEffects: "ekit-sticky-effects",
                    spacer: "ekit-sticky-spacer",
                    up: "ekit-sticky--up",
                    down: "ekit-sticky--down"
                }
            },
            l = function(t, o, s) {
                var e = {},
                    i = t[0].style;
                s.forEach((function(t) {
                    e[t] = undefined !== i[t] ? i[t] : ""
                })), t.data("css-backup-" + o, e)
            },
            m = function(t, o) {
                return t.data("css-backup-" + o)
            },
            d = function() {
                l(e, "unsticky", ["position", "width", "margin-top", "margin-bottom", "top", "bottom"]);
                var t = {
                    position: "fixed",
                    width: y(e, "width"),
                    marginTop: 0,
                    marginBottom: 0
                };
                t[i.to] = i.offset + "px", t["top" === i.to ? "bottom" : "top"] = "", e.css(t).addClass(i.classes.stickyActive)
            },
            u = function() {
                e.css(m(e, "unsticky")).removeClass(i.classes.stickyActive)
            },
            y = function(t, o, s) {
                var e = getComputedStyle(t[0]),
                    i = parseFloat(e[o]),
                    n = "height" === o ? ["top", "bottom"] : ["left", "right"],
                    r = [];
                return "border-box" !== e.boxSizing && r.push("border", "padding"), s && r.push("margin"), r.forEach((function(t) {
                    n.forEach((function(o) {
                        i += parseFloat(e[t + "-" + o])
                    }))
                })), i
            },
            k = function(t) {
                var o = c.$window.scrollTop(),
                    s = y(t, "height"),
                    e = innerHeight,
                    i = t.offset().top - o,
                    n = i - e;
                return {
                    top: {
                        fromTop: i,
                        fromBottom: n
                    },
                    bottom: {
                        fromTop: i + s,
                        fromBottom: n + s
                    }
                }
            },
            h = function() {
                c.$spacer = e.clone().addClass(i.classes.spacer).css({
                    visibility: "hidden",
                    transition: "none",
                    animation: "none"
                }), e.after(c.$spacer), d(), n = !0, e.trigger("sticky:stick")
            },
            w = function() {
                u(), c.$spacer.remove(), n = !1, e[0].style.transform = null, e.trigger("sticky:unstick")
            },
            v = function() {
                var t = k(e),
                    o = "top" === i.to;
                if (r) {
                    (o ? t.top.fromTop > i.offset : t.bottom.fromBottom < -i.offset) && (c.$parent.css(m(c.$parent, "childNotFollowing")), e.css(m(e, "notFollowing")), r = !1)
                } else {
                    var s = k(c.$parent),
                        n = getComputedStyle(c.$parent[0]),
                        a = parseFloat(n[o ? "borderBottomWidth" : "borderTopWidth"]),
                        f = o ? s.bottom.fromTop - a : s.top.fromBottom + a;
                    (o ? f <= t.bottom.fromTop : f >= t.top.fromBottom) && function() {
                        l(c.$parent, "childNotFollowing", ["position"]), c.$parent.css("position", "relative"), l(e, "notFollowing", ["position", "top", "bottom"]);
                        var t = {
                            position: "absolute"
                        };
                        t[i.to] = "", t["top" === i.to ? "bottom" : "top"] = 0, e.css(t), r = !0
                    }()
                }
            },
            g = function() {
                var t, o = i.offset;
                if (i.stopAt || i.column) {
                    var s = e[0],
                        r = i.stopAt || e.parent(),
                        f = r.offset().top,
                        p = r[0].clientHeight - s.clientHeight,
                        l = this.scrollY - f + i.offset,
                        m = l >= p;
                    if ("bottom" === i.to && (p = f - (this.innerHeight - s.clientHeight), m = (l = this.scrollY + i.offset) <= p, l == p - s.clientHeight), m && i.column && "widget" === s.dataset.element_type) return n && w(), void(s.style.transform = "translateY(" + p + "px)");
                    s.style.transform = null
                }
                if (n) {
                    var d = k(c.$spacer);
                    t = "top" === i.to ? d.top.fromTop - o : -d.bottom.fromBottom - o, i.parent && v(), t > 0 && w()
                } else {
                    var u = k(e);
                    (t = "top" === i.to ? u.top.fromTop - o : -u.bottom.fromBottom - o) <= 0 && (h(), i.parent && v())
                }(i.stopAt || i.column) && m && i.stopAt && (l = "top" === i.to ? -(l - p) : p - l, s.style.transform = "translateY(" + l + "px)"),
                    function(t) {
                        a && -t < i.effectsOffset ? (e.removeClass(i.classes.stickyEffects), a = !1) : !a && -t >= i.effectsOffset && (e.addClass(i.classes.stickyEffects), a = !0)
                    }(t), b()
            },
            b = function() {
                i.isShowOnScrollUp && -1 != f && (f > window.scrollY ? e.addClass(i.classes.up).removeClass(i.classes.down) : e.addClass(i.classes.down).removeClass(i.classes.up)), f = window.scrollY
            },
            $ = function() {
                g()
            },
            C = function() {
                n && (u(), d())
            };
        this.destroy = function() {
            n && w(), c.$window.off("scroll", $).off("resize", C), e.removeClass(i.classes.sticky)
        }, i = jQuery.extend(!0, p, s), e = t(o).addClass(i.classes.sticky), c.$window = t(window), i.parent && ("parent" === i.parent ? c.$parent = e.parent() : c.$parent = e.closest(i.parent)), c.$window.on({
            scroll: $,
            resize: C
        }), g()
    };
    t.fn.ekit_sticky = function(s) {
        var e = "string" == typeof s;
        return this.each((function() {
            var i = t(this);
            if (e) {
                var n = i.data("ekit_sticky");
                if (!n) throw Error("Trying to perform the `" + s + "` method prior to initialization");
                if (!n[s]) throw ReferenceError("Method `" + s + "` not found in sticky instance");
                n[s].apply(n, Array.prototype.slice.call(arguments, 1)), "destroy" === s && i.removeData("ekit_sticky")
            } else i.data("ekit_sticky", new o(this, s))
        })), this
    }, window.EkitSticky = o
}(jQuery);