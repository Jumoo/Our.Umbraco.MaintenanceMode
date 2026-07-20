export default {
  maintenance: {
    title: "Maintenance Mode",

    onMsg:
      "The site is currently in maintenance mode<br /> Visitors will be seeing the in maintenance page for all pages.",
    frozenMsg:
      "Content and Media updates on this site are currently frozen<br /> no one can save/update or delete content or media.",
    siteLockedMsg:
      "This site is locked<br /> no one can save, update, move, or delete content, media, or settings.",

    btnModeOn: "Turn on maintenance mode",
    btnModeOff: "Turn off maintenance mode",

    btnFreezeOn: "Freeze Content/Media",
    btnFreezeOff: "Unfreeze Content/Media",

    btnLockSiteOn: "Lock Site",
    btnLockSiteOff: "Unlock Site",

    btnAdvanced: "Advanced options",

    webConfigWarn:
      "Maintenance Mode has been enabled in appsettings.json, so you cannot turn it on or off via the dashboard.",

    labelTemplate: "Template Name",
    labelTemplateDesc: "Template to be used on maintenance page.",

    labelUnfreeze: "Unfrozen/unlocked users",
    labelUnFreezeDesc:
      "Users who can still edit when content is frozen or locked.",

    labelPageTitle: "Page title",
    labelPageTitleDesc: "The title of the maintenance page in your browser.",

    labelTitle: "Title",
    labelTitleDesc: "The title on the maintenance page.",

    labelText: "Text",
    labelTextDesc: "The text on the maintenance page.",

    labelUrlWhitelist: "Url Whitelist",
    labelUrlWhitelistDesc:
      "File paths that do not trigger maintenance page override.",

    labelIpWhitelist: "IP Whitelist",
    labelIpWhitelistDesc:
      "IP adresses that do not trigger maintenance page override.",
  },
};
