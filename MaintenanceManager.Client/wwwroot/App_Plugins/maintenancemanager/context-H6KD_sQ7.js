var $ = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
};
var s = (e, t, r) => ($(e, t, "read from private field"), r ? r.call(e) : t.get(e)), l = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, d = (e, t, r, a) => ($(e, t, "write to private field"), a ? a.call(e, r) : t.set(e, r), r);
import { UmbControllerBase as F } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as P } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as v } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as V } from "@umbraco-cms/backoffice/auth";
import { tryExecuteAndNotify as w } from "@umbraco-cms/backoffice/resources";
class I extends Error {
  constructor(t, r, a) {
    super(a), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = t;
  }
}
class _ extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
var g, y, h, S, T, R, O;
class G {
  constructor(t) {
    l(this, g, void 0);
    l(this, y, void 0);
    l(this, h, void 0);
    l(this, S, void 0);
    l(this, T, void 0);
    l(this, R, void 0);
    l(this, O, void 0);
    d(this, g, !1), d(this, y, !1), d(this, h, !1), d(this, S, []), d(this, T, new Promise((r, a) => {
      d(this, R, r), d(this, O, a);
      const n = (c) => {
        var u;
        s(this, g) || s(this, y) || s(this, h) || (d(this, g, !0), (u = s(this, R)) == null || u.call(this, c));
      }, o = (c) => {
        var u;
        s(this, g) || s(this, y) || s(this, h) || (d(this, y, !0), (u = s(this, O)) == null || u.call(this, c));
      }, i = (c) => {
        s(this, g) || s(this, y) || s(this, h) || s(this, S).push(c);
      };
      return Object.defineProperty(i, "isResolved", {
        get: () => s(this, g)
      }), Object.defineProperty(i, "isRejected", {
        get: () => s(this, y)
      }), Object.defineProperty(i, "isCancelled", {
        get: () => s(this, h)
      }), t(n, o, i);
    }));
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, r) {
    return s(this, T).then(t, r);
  }
  catch(t) {
    return s(this, T).catch(t);
  }
  finally(t) {
    return s(this, T).finally(t);
  }
  cancel() {
    var t;
    if (!(s(this, g) || s(this, y) || s(this, h))) {
      if (d(this, h, !0), s(this, S).length)
        try {
          for (const r of s(this, S))
            r();
        } catch (r) {
          console.warn("Cancellation threw an error", r);
          return;
        }
      s(this, S).length = 0, (t = s(this, O)) == null || t.call(this, new _("Request aborted"));
    }
  }
  get isCancelled() {
    return s(this, h);
  }
}
g = new WeakMap(), y = new WeakMap(), h = new WeakMap(), S = new WeakMap(), T = new WeakMap(), R = new WeakMap(), O = new WeakMap();
const b = {
  BASE: "",
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
}, D = (e) => e != null, N = (e) => typeof e == "string", B = (e) => N(e) && e !== "", M = (e) => typeof e == "object" && typeof e.type == "string" && typeof e.stream == "function" && typeof e.arrayBuffer == "function" && typeof e.constructor == "function" && typeof e.constructor.name == "string" && /^(Blob|File)$/.test(e.constructor.name) && /^(Blob|File)$/.test(e[Symbol.toStringTag]), H = (e) => e instanceof FormData, z = (e) => {
  try {
    return btoa(e);
  } catch {
    return Buffer.from(e).toString("base64");
  }
}, L = (e) => {
  const t = [], r = (n, o) => {
    t.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(o))}`);
  }, a = (n, o) => {
    D(o) && (Array.isArray(o) ? o.forEach((i) => {
      a(n, i);
    }) : typeof o == "object" ? Object.entries(o).forEach(([i, c]) => {
      a(`${n}[${i}]`, c);
    }) : r(n, o));
  };
  return Object.entries(e).forEach(([n, o]) => {
    a(n, o);
  }), t.length > 0 ? `?${t.join("&")}` : "";
}, W = (e, t) => {
  const r = e.ENCODE_PATH || encodeURI, a = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, (o, i) => {
    var c;
    return (c = t.path) != null && c.hasOwnProperty(i) ? r(String(t.path[i])) : o;
  }), n = `${e.BASE}${a}`;
  return t.query ? `${n}${L(t.query)}` : n;
}, k = (e) => {
  if (e.formData) {
    const t = new FormData(), r = (a, n) => {
      N(n) || M(n) ? t.append(a, n) : t.append(a, JSON.stringify(n));
    };
    return Object.entries(e.formData).filter(([a, n]) => D(n)).forEach(([a, n]) => {
      Array.isArray(n) ? n.forEach((o) => r(a, o)) : r(a, n);
    }), t;
  }
}, j = async (e, t) => typeof t == "function" ? t(e) : t, J = async (e, t) => {
  const r = await j(t, e.TOKEN), a = await j(t, e.USERNAME), n = await j(t, e.PASSWORD), o = await j(t, e.HEADERS), i = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([c, u]) => D(u)).reduce((c, [u, p]) => ({
    ...c,
    [u]: String(p)
  }), {});
  if (B(r) && (i.Authorization = `Bearer ${r}`), B(a) && B(n)) {
    const c = z(`${a}:${n}`);
    i.Authorization = `Basic ${c}`;
  }
  return t.body && (t.mediaType ? i["Content-Type"] = t.mediaType : M(t.body) ? i["Content-Type"] = t.body.type || "application/octet-stream" : N(t.body) ? i["Content-Type"] = "text/plain" : H(t.body) || (i["Content-Type"] = "application/json")), new Headers(i);
}, K = (e) => {
  var t;
  if (e.body !== void 0)
    return (t = e.mediaType) != null && t.includes("/json") ? JSON.stringify(e.body) : N(e.body) || M(e.body) || H(e.body) ? e.body : JSON.stringify(e.body);
}, X = async (e, t, r, a, n, o, i) => {
  const c = new AbortController(), u = {
    headers: o,
    body: a ?? n,
    method: t.method,
    signal: c.signal
  };
  return e.WITH_CREDENTIALS && (u.credentials = e.CREDENTIALS), i(() => c.abort()), await fetch(r, u);
}, Q = (e, t) => {
  if (t) {
    const r = e.headers.get(t);
    if (N(r))
      return r;
  }
}, Y = async (e) => {
  if (e.status !== 204)
    try {
      const t = e.headers.get("Content-Type");
      if (t)
        return ["application/json", "application/problem+json"].some((n) => t.toLowerCase().startsWith(n)) ? await e.json() : await e.text();
    } catch (t) {
      console.error(t);
    }
}, Z = (e, t) => {
  const a = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...e.errors
  }[t.status];
  if (a)
    throw new I(e, t, a);
  if (!t.ok) {
    const n = t.status ?? "unknown", o = t.statusText ?? "unknown", i = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new I(
      e,
      t,
      `Generic Error: status: ${n}; status text: ${o}; body: ${i}`
    );
  }
}, C = (e, t) => new G(async (r, a, n) => {
  try {
    const o = W(e, t), i = k(t), c = K(t), u = await J(e, t);
    if (!n.isCancelled) {
      const p = await X(e, t, o, c, i, u, n), q = await Y(p), U = Q(p, t.responseHeader), x = {
        url: o,
        ok: p.ok,
        status: p.status,
        statusText: p.statusText,
        body: U ?? q
      };
      Z(t, x), r(x.body);
    }
  } catch (o) {
    a(o);
  }
});
class A {
  /**
   * @returns any Success
   * @throws ApiError
   */
  static getSettings() {
    return C(b, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/GetSettings"
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static getStatus() {
    return C(b, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/GetStatus"
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static saveSettings({
    requestBody: t
  }) {
    return C(b, {
      method: "POST",
      url: "/umbraco/maintenance/api/v1/SaveSettings",
      body: t,
      mediaType: "application/json"
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleAccess({
    maintenanceMode: t
  }) {
    return C(b, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleAccess",
      query: {
        maintenanceMode: t
      }
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleFrozen({
    maintenanceMode: t
  }) {
    return C(b, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleFrozen",
      query: {
        maintenanceMode: t
      }
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleMode({
    maintenanceMode: t
  }) {
    return C(b, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleMode",
      query: {
        maintenanceMode: t
      }
    });
  }
}
var f, E, m;
class tt extends F {
  constructor(r) {
    super(r);
    l(this, f, void 0);
    l(this, E, void 0);
    l(this, m, void 0);
    d(this, f, new v(void 0)), this.status = s(this, f).asObservable(), d(this, E, new v(void 0)), this.settings = s(this, E).asObservable(), d(this, m, r), this.provideContext(et, this), this.consumeContext(V, (a) => {
      if (a === void 0)
        return;
      const n = () => a.getLatestToken();
      b.TOKEN = n, b.WITH_CREDENTIALS = !0, this.getStatus();
    });
  }
  async getStatus() {
    let r = await w(s(this, m), A.getStatus());
    console.log(r), r.data != null && s(this, f).setValue(r.data);
  }
  async getSettings() {
    let r = await w(s(this, m), A.getSettings());
    console.log(r), r.data != null && s(this, E).setValue(r.data);
  }
  async toggleMaintenance() {
    var r;
    await w(s(this, m), A.toggleMode({
      maintenanceMode: !((r = s(this, f).getValue()) != null && r.isInMaintenanceMode)
    })), await this.getStatus(), console.log("eeby");
  }
  async toggleFrozen() {
    var r;
    await w(s(this, m), A.toggleFrozen({
      maintenanceMode: !((r = s(this, f).getValue()) != null && r.isContentFrozen)
    })), await this.getStatus(), console.log("deeby");
  }
  async toggleBackofficeAccess() {
    var r, a, n;
    console.log(s(this, f).getValue()), await w(s(this, m), A.toggleAccess({
      maintenanceMode: !((n = (a = (r = s(this, f)) == null ? void 0 : r.getValue()) == null ? void 0 : a.settings) != null && n.allowBackOfficeUsersThrough)
    })), await this.getStatus();
  }
  //////////////
  updateSettings(r) {
    s(this, E).update(r);
  }
  async saveSettings() {
    const r = s(this, E).getValue();
    r != null && await w(s(this, m), A.saveSettings({
      requestBody: r
    }));
  }
}
f = new WeakMap(), E = new WeakMap(), m = new WeakMap();
const et = new P(tt.name);
export {
  et as MAINTENANCE_CONTEXT_TOKEN,
  tt as MaintenanceContext,
  tt as default
};
//# sourceMappingURL=context-H6KD_sQ7.js.map
