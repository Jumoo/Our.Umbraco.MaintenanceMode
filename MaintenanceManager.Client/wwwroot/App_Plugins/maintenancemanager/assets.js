const n = [
  {
    type: "dashboard",
    name: "maintenancemanager",
    alias: "maintenancemanager.dashboard",
    elementName: "maintenancemanager-dashboard",
    weight: -10,
    js: () => import("./dashboard.element-qLmWkVIw.js"),
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
    js: () => import("./context-H6KD_sQ7.js")
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
    js: () => import("./en-us-HOHmAWzC.js")
  },
  {
    type: "localization",
    alias: "time.lang.engb",
    name: "English (UK)",
    weight: 0,
    meta: {
      culture: "en-gb"
    },
    js: () => import("./en-us-HOHmAWzC.js")
  }
], o = [...i], m = [
  {
    type: "modal",
    alias: "settings.modal",
    name: "Settings modal",
    js: () => import("./settings-modal-element-p40VMMsL.js")
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
