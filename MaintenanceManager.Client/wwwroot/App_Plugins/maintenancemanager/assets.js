const n = [
  {
    type: "dashboard",
    name: "maintenancemanager",
    alias: "maintenancemanager.dashboard",
    elementName: "maintenancemanager-dashboard",
    weight: -10,
    js: () => import("./dashboard.element-eIf0A7Tn.js"),
    meta: {
      label: "MaintenanceManager",
      pathname: "maintenancemanager"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], t = [...n], e = [
  {
    type: "globalContext",
    alias: "maintenance.context",
    name: "maintenance context",
    js: () => import("./context-BaM4y99h.js")
  }
], s = [...e], i = [
  {
    type: "localization",
    alias: "time.lang.enus",
    name: "English (US)",
    weight: 0,
    meta: {
      culture: "en-us"
    },
    js: () => import("./en-us-BxutQFPA.js")
  },
  {
    type: "localization",
    alias: "time.lang.engb",
    name: "English (UK)",
    weight: 0,
    meta: {
      culture: "en-gb"
    },
    js: () => import("./en-us-BxutQFPA.js")
  }
], o = [...i], m = [
  {
    type: "modal",
    alias: "settings.modal",
    name: "Settings modal",
    js: () => import("./settings-modal-element-BvIbFJLR.js")
  }
], c = [...m], l = [
  ...t,
  ...s,
  ...o,
  ...c
], g = (r, a) => {
  a.registerMany(l);
};
export {
  g as onInit
};
//# sourceMappingURL=assets.js.map
