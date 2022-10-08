!function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var n = t();

    for (var r in n) ("object" == typeof exports ? exports : e)[r] = n[r];
  }
}(this, function () {
  return function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }

    var n = {};
    return t.m = e, t.c = n, t.i = function (e) {
      return e;
    }, t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, {
        configurable: !1,
        enumerable: !0,
        get: r
      });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 11);
  }([function (e, t, n) {
    "use strict";

    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    };
    e.exports = {
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
      },
      isObject: function (e, t) {
        return t ? "object" === this.type(e) : e && "object" === (void 0 === e ? "undefined" : r(e));
      },
      isFormData: function (e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      },
      trim: function (e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
      },
      encode: function (e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      },
      formatParams: function (e) {
        function t(e, r) {
          var a = s.encode,
              i = s.type(e);
          if ("array" == i) e.forEach(function (e, n) {
            t(e, r + "%5B%5D");
          });else if ("object" == i) for (var u in e) r ? t(e[u], r + "%5B" + a(u) + "%5D") : t(e[u], a(u));else o || (n += "&"), o = !1, n += r + "=" + a(e);
        }

        var n = "",
            o = !0,
            s = this;
        return "object" != (void 0 === e ? "undefined" : r(e)) ? e : (t(e, ""), n);
      },
      merge: function (e, t) {
        for (var n in t) e.hasOwnProperty(n) ? this.isObject(t[n], 1) && this.isObject(e[n], 1) && this.merge(e[n], t[n]) : e[n] = t[n];

        return e;
      }
    };
  }, function (e, t, n) {
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function o(e) {
      return function () {
        function t() {
          r(this, t), this.requestHeaders = {}, this.readyState = 0, this.timeout = 0, this.responseURL = "", this.responseHeaders = {};
        }

        return a(t, [{
          key: "_call",
          value: function (e) {
            this[e] && this[e].apply(this, [].splice.call(arguments, 1));
          }
        }, {
          key: "_changeReadyState",
          value: function (e) {
            this.readyState = e, this._call("onreadystatechange");
          }
        }, {
          key: "open",
          value: function (e, t) {
            if (this.method = e, t) {
              if (t = i.trim(t), 0 !== t.indexOf("http") && u) {
                var n = document.createElement("a");
                n.href = t, t = n.href;
              }
            } else t = location.href;

            this.responseURL = t, this._changeReadyState(1);
          }
        }, {
          key: "send",
          value: function (t) {
            var n = this;

            if (t = t || null, u) {
              var r = document.cookie;
              r && (this.requestHeaders.cookie = r);
            }

            var o = this;

            if (e) {
              var a = {
                method: o.method,
                url: o.responseURL,
                headers: o.requestHeaders || {},
                body: t
              };
              i.merge(a, o._options || {}), "GET" === a.method && (a.body = null), o._changeReadyState(3);
              var c;
              o.timeout = o.timeout || 0, o.timeout > 0 && (c = setTimeout(function () {
                3 === o.readyState && (n._call("onloadend"), o._changeReadyState(0), o._call("ontimeout"));
              }, o.timeout)), a.timeout = o.timeout, e(a, function (e) {
                function t(t) {
                  var n = e[t];
                  return delete e[t], n;
                }

                if (3 === o.readyState) {
                  clearTimeout(c), o.status = t("statusCode") - 0;
                  var n = t("responseText"),
                      r = t("statusMessage");

                  if (o.status) {
                    var a = t("headers"),
                        i = {};

                    for (var f in a) {
                      var l = a[f],
                          p = f.toLowerCase();
                      "object" === (void 0 === l ? "undefined" : s(l)) ? i[p] = l : (i[p] = i[p] || [], i[p].push(l));
                    }

                    var d = i["set-cookie"];
                    u && d && d.forEach(function (e) {
                      document.cookie = e.replace(/;\s*httpOnly/gi, "");
                    }), o.responseHeaders = i, o.statusText = r || "", o.response = o.responseText = n, o._response = e, o._changeReadyState(4), o._call("onload");
                  } else o.statusText = n, o._call("onerror", {
                    msg: r
                  });

                  o._call("onloadend");
                }
              });
            } else console.error("Ajax require adapter");
          }
        }, {
          key: "setRequestHeader",
          value: function (e, t) {
            this.requestHeaders[i.trim(e)] = t;
          }
        }, {
          key: "getResponseHeader",
          value: function (e) {
            return (this.responseHeaders[e.toLowerCase()] || "").toString() || null;
          }
        }, {
          key: "getAllResponseHeaders",
          value: function () {
            var e = "";

            for (var t in this.responseHeaders) e += t + ":" + this.getResponseHeader(t) + "\r\n";

            return e || null;
          }
        }, {
          key: "abort",
          value: function (e) {
            this._changeReadyState(0), this._call("onerror", {
              msg: e
            }), this._call("onloadend");
          }
        }], [{
          key: "setAdapter",
          value: function (t) {
            e = t;
          }
        }]), t;
      }();
    }

    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    },
        a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        i = n(0),
        u = "undefined" != typeof document;

    e.exports = o;
  }, function (e, t, n) {
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        s = n(0),
        a = "undefined" != typeof document,
        i = function () {
      function e(t) {
        function n(e) {
          function t() {
            e.p = n = r = null;
          }

          var n, r;
          s.merge(e, {
            lock: function () {
              n || (e.p = new Promise(function (e, t) {
                n = e, r = t;
              }));
            },
            unlock: function () {
              n && (n(), t());
            },
            clear: function () {
              r && (r("cancel"), t());
            }
          });
        }

        r(this, e), this.engine = t || XMLHttpRequest, this.default = this;
        var o = this.interceptors = {
          response: {
            use: function (e, t) {
              this.handler = e, this.onerror = t;
            }
          },
          request: {
            use: function (e) {
              this.handler = e;
            }
          }
        },
            a = o.request;
        n(o.response), n(a), this.config = {
          method: "GET",
          baseURL: "",
          headers: {},
          timeout: 0,
          params: {},
          parseJson: !0,
          withCredentials: !1
        };
      }

      return o(e, [{
        key: "request",
        value: function (e, t, n) {
          var r = this,
              o = new this.engine(),
              i = "Content-Type",
              u = i.toLowerCase(),
              c = this.interceptors,
              f = c.request,
              l = c.response,
              p = f.handler,
              d = new Promise(function (c, d) {
            function h(e) {
              return e && e.then && e.catch;
            }

            function m(e, t) {
              e ? e.then(function () {
                t();
              }) : t();
            }

            function y(n) {
              function r(e, t, r) {
                m(l.p, function () {
                  if (e) {
                    r && (t.request = n);
                    var o = e.call(l, t, Promise);
                    t = void 0 === o ? t : o;
                  }

                  h(t) || (t = Promise[0 === r ? "resolve" : "reject"](t)), t.then(function (e) {
                    c(e);
                  }).catch(function (e) {
                    d(e);
                  });
                });
              }

              function f(e) {
                e.engine = o, r(l.onerror, e, -1);
              }

              function p(e, t) {
                this.message = e, this.status = t;
              }

              t = n.body, e = s.trim(n.url);
              var y = s.trim(n.baseURL || "");

              if (e || !a || y || (e = location.href), 0 !== e.indexOf("http")) {
                var v = "/" === e[0];

                if (!y && a) {
                  var g = location.pathname.split("/");
                  g.pop(), y = location.protocol + "//" + location.host + (v ? "" : g.join("/"));
                }

                if ("/" !== y[y.length - 1] && (y += "/"), e = y + (v ? e.substr(1) : e), a) {
                  var b = document.createElement("a");
                  b.href = e, e = b.href;
                }
              }

              var x = s.trim(n.responseType || ""),
                  w = "GET" === n.method,
                  j = s.type(t),
                  S = n.params || {};
              w && "object" === j && (S = s.merge(t, S)), S = s.formatParams(S);
              var k = [];
              S && k.push(S), w && t && "string" === j && k.push(t), k.length > 0 && (e += (-1 === e.indexOf("?") ? "?" : "&") + k.join("&")), o.open(n.method, e);

              try {
                o.withCredentials = !!n.withCredentials, o.timeout = n.timeout || 0, "stream" !== x && (o.responseType = x);
              } catch (e) {}

              var R = n.headers[i] || n.headers[u],
                  T = "application/x-www-form-urlencoded";
              s.trim((R || "").toLowerCase()) === T ? t = s.formatParams(t) : s.isFormData(t) || -1 === ["object", "array"].indexOf(s.type(t)) || (T = "application/json;charset=utf-8", t = JSON.stringify(t)), R || (n.headers[i] = T);

              for (var _ in n.headers) if (_ === i && s.isFormData(t)) delete n.headers[_];else try {
                o.setRequestHeader(_, n.headers[_]);
              } catch (e) {}

              o.onload = function () {
                var e = o.response || o.responseText;
                e && n.parseJson && -1 !== (o.getResponseHeader(i) || "").indexOf("json") && !s.isObject(e) && (e = JSON.parse(e));
                var t = o.responseHeaders;

                if (!t) {
                  t = {};
                  var a = (o.getAllResponseHeaders() || "").split("\r\n");
                  a.pop(), a.forEach(function (e) {
                    if (e) {
                      var n = e.split(":")[0];
                      t[n] = o.getResponseHeader(n);
                    }
                  });
                }

                var u = o.status,
                    c = o.statusText,
                    d = {
                  data: e,
                  headers: t,
                  status: u,
                  statusText: c
                };
                if (s.merge(d, o._response), u >= 200 && u < 300 || 304 === u) d.engine = o, d.request = n, r(l.handler, d, 0);else {
                  var h = new p(c, u);
                  h.response = d, f(h);
                }
              }, o.onerror = function (e) {
                f(new p(e.msg || "Network Error", 0));
              }, o.ontimeout = function () {
                f(new p("timeout [ " + o.timeout + "ms ]", 1));
              }, o._options = n, setTimeout(function () {
                o.send(w ? null : t);
              }, 0);
            }

            s.isObject(e) && (n = e, e = n.url), n = n || {}, n.headers = n.headers || {}, m(f.p, function () {
              s.merge(n, r.config);
              var o = n.headers;
              o[i] = o[i] || o[u] || "", delete o[u], n.body = t || n.body, e = s.trim(e || ""), n.method = n.method.toUpperCase(), n.url = e;
              var a = n;
              p && (a = p.call(f, n, Promise) || n), h(a) || (a = Promise.resolve(a)), a.then(function (e) {
                e === n ? y(e) : c(e);
              }, function (e) {
                d(e);
              });
            });
          });
          return d.engine = o, d;
        }
      }, {
        key: "all",
        value: function (e) {
          return Promise.all(e);
        }
      }, {
        key: "spread",
        value: function (e) {
          return function (t) {
            return e.apply(null, t);
          };
        }
      }]), e;
    }();

    i.default = i, ["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
      i.prototype[e] = function (t, n, r) {
        return this.request(t, n, s.merge({
          method: e
        }, r));
      };
    }), ["lock", "unlock", "clear"].forEach(function (e) {
      i.prototype[e] = function () {
        this.interceptors.request[e]();
      };
    }), e.exports = i;
  },,,, function (e, t, n) {
    "use strict";

    e.exports = function (e, t) {
      var n = {
        method: e.method,
        url: e.url,
        dataType: e.dataType || void 0,
        header: e.headers,
        data: e.body || {},
        success: function (e) {
          t({
            statusCode: e.statusCode,
            responseText: e.data,
            headers: e.header,
            statusMessage: e.errMsg
          });
        },
        fail: function (e) {
          t({
            statusCode: e.statusCode || 0,
            statusMessage: e.errMsg
          });
        }
      };
      uni.request(n);
    };
  },,,,, function (e, t, n) {
    "use strict";

    var r = n(2),
        o = n(1),
        s = n(6),
        a = o(s);

    e.exports = function (e) {
      return new r(e || a);
    };
  }]);
});