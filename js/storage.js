/**
 * Local storage (LS) manipulate (Elem: Element)
 *
 * @BUG Local storage is not same domain
 * @FIX Firefox: Set "security.fileuri.strict_origin_policy" to false
 */
function initLS() {
  console.log("Init local storage");
  localStorage.clear();
  for (let key in template) {
    localStorage.setItem(key.toString(), JSON.stringify(template[key]));
  }
}

/**
 * @brief: Check current Version (of database incase template DB has been changed)
 * - If version is different then load new template DB into LS
 */
function checkVersion() {
  console.log(
    `On run version: ${localStorage.getItem(
      "VERSION"
    )} ... Newest version: ${SIMULATOR_VERSION}`
  );
  if (
    localStorage.length === 0 ||
    localStorage.getItem("VERSION") === null ||
    localStorage.getItem("VERSION") === undefined
  ) {
    console.log(`Load DB at new device. Version: ${SIMULATOR_VERSION}`);
    initLS();
    localStorage.setItem("VERSION", SIMULATOR_VERSION);
  } else if (localStorage.getItem("VERSION") !== SIMULATOR_VERSION) {
    console.log(`Update DB. Version: ${SIMULATOR_VERSION}`);
    initLS();
  } else {
    console.log(`Version: ${SIMULATOR_VERSION}`);
    localStorage.setItem("VERSION", SIMULATOR_VERSION);
    localStorage.setItem("Account", JSON.stringify(template.Account));
  }
}

/**
 *
 * @param {*} page: which HTML file
 * @param {*} option: take 3 value:
 *            Apply : When change the UI event and refresh
 *            Cancel: When reject all change on UI and refresh page
 */
function applyThenStoreToLS(page, option, change_entity) {
  if (option !== "Cancel") {
    var Status = JSON.parse(localStorage.getItem("Status"));
    var Basic = JSON.parse(localStorage.getItem("Basic"));
    var Wifi = JSON.parse(localStorage.getItem("Wifi"));
    var Advanced = JSON.parse(localStorage.getItem("Advanced"));
    var Security = JSON.parse(localStorage.getItem("Security"));
    var Utilities = JSON.parse(localStorage.getItem("Utilities"));
    var VoIP = JSON.parse(localStorage.getItem("VoIP"));
    switch (page) {
      case "advanced-alg.html":
        Advanced = change_entity;
        break;
      case "advanced-ddns.html":
        Advanced = change_entity;
        break;
      case "advanced-device_management.html":
        Advanced = change_entity;
        break;
      case "advanced-dmz.html":
        Advanced = change_entity;
        break;
      case "advanced-multicast-ipv4Setting.html":
        Advanced = change_entity;
        break;
      case "advanced-multicast.html":
        Advanced = change_entity;
        break;
      case "advanced-port_mapping-add.html":
        Advanced = change_entity;
        break;
      case "advanced-port_mapping.html":
        Advanced = change_entity;
        break;
      case "advanced-port_triggering-add.html":
        Advanced = change_entity;
        break;
      case "advanced-port_triggering.html":
        Advanced = change_entity;
        break;
      case "advanced-static_routing-add.html":
        Advanced = change_entity;
        break;
      case "advanced-static_routing-ipv6Config-add.html":
        Advanced = change_entity;
        break;
      case "advanced-static_routing-ipv6Config.html":
        Advanced = change_entity;
        break;
      case "advanced-static_routing.html":
        Advanced = change_entity;
        break;
      case "advanced-upnp.html":
        Advanced = change_entity;
        break;
      case "advanced-vpn-add.html":
        Advanced = change_entity;
        break;
      case "advanced-vpn.html":
        Advanced = change_entity;
        break;
      case "advanced-vpn-l2tp.html":
        Advanced = change_entity;
        break;
      case "advanced-vpn-pptp.html":
        Advanced = change_entity;
        break;
      case "basic-lan-dev_connected.html":
        Basic = change_entity;
        break;
      case "basic-lan-ipv4Config.html":
        Basic = change_entity;
        break;
      case "basic-lan-ipv6Config.html":
        Basic = change_entity;
        break;
      case "basic-registration_ID.html":
        Basic = change_entity;
        break;
      case "basic-wan-addWAN.html":
        Basic = change_entity;
        break;
      case "basic-wan-ipv4.html":
        Basic = change_entity;
        break;
      case "basic-wan-ipv6.html":
        Basic = change_entity;
        break;
      case "main.html":
        Status = change_entity;
        break;
      case "index.html":
        break;
      case "logout.html":
        break;
      case "security-firewall.html":
        Security = change_entity;
        break;
      case "security-parental_control_settings.html":
        Security = change_entity;
        break;
      case "security-parental_control-devControl-add.html":
        Security = change_entity;
        break;
      case "security-parental_control-devControl.html":
        Security = change_entity;
        break;
      case "status-overview.html":
        Status = change_entity;
        break;
      case "status-pon_status.html":
        Status = change_entity;
        break;
      case "status-system_stats-lan_thr.html":
        Status = change_entity;
        break;
      case "status-system_stats-wan_thr.html":
        Status = change_entity;
        break;
      case "status-system_stats-wifi_thr.html":
        Status = change_entity;
        break;
      case "utilities-diagnostics.html":
        Utilities = change_entity;
        break;
      case "utilities-speed_test.html":
        Utilities = change_entity;
        break;
      case "utilities-system-backup.html":
        Utilities = change_entity;
        break;
      case "utilities-system-log_rule-edit.html":
        Utilities = change_entity;
        break;
      case "utilities-system-log_rule.html":
        Utilities = change_entity;
        break;
      case "utilities-system-time.html":
        Utilities = change_entity;
        break;
      case "utilities-system-user_mgnt-edit.html":
        Utilities = change_entity;
        break;
      case "utilities-system-user_mgnt.html":
        Utilities = change_entity;
        break;
      case "utilities-update_fw.html":
        Utilities = change_entity;
        break;
      case "voip-config.html":
        VoIP = change_entity;
        Advanced = arguments[3];
        break;
      case "wifi-2_4G-config.html":
        Wifi = change_entity;
        break;
      case "wifi-2_4G-mac_filtering.html":
        Wifi = change_entity;
        break;
      case "wifi-2_4G-ssids.html":
        Wifi = change_entity;
        break;
      case "wifi-2_4G-statistics.html":
        Wifi = change_entity;
        break;
      case "wifi-2_4G-wds.html":
        Wifi = change_entity;
        break;
      case "wifi-2_4G-wps.html":
        Wifi = change_entity;
        break;
      case "wifi-5G-config.html":
        Wifi = change_entity;
        break;
      case "wifi-5G-mac_filtering.html":
        Wifi = change_entity;
        break;
      case "wifi-5G-ssids.html":
        Wifi = change_entity;
        break;
      case "wifi-5G-statistics.html":
        Wifi = change_entity;
        break;
      case "wifi-5G-wds.html":
        Wifi = change_entity;
        break;
      case "wifi-5G-wps.html":
        Wifi = change_entity;
        break;
      case "wifi-guest_access-add.html":
        Wifi = change_entity;
        break;
      case "wifi-guest_access.html":
        Wifi = change_entity;
        break;
      case "advanced-qos.html":
        Advanced = change_entity;
        break;
      case "advanced-qos-edit.html":
        Advanced = change_entity;
        break;
      case "advanced-qos-addQ.html":
        Advanced = change_entity;
        break;
      case "advanced-qos-addCL.html":
        Advanced = change_entity;
        break;
      case "advanced-qos-addShaper.html":
        Advanced = change_entity;
        break;
      default:
        console.log(`Load ${page} fail --- no available page`);
        return;
    }

    // Load all change on Local Storage
    localStorage.setItem("Status", JSON.stringify(Status));
    localStorage.setItem("Basic", JSON.stringify(Basic));
    localStorage.setItem("Wifi", JSON.stringify(Wifi));
    localStorage.setItem("Advanced", JSON.stringify(Advanced));
    localStorage.setItem("Security", JSON.stringify(Security));
    localStorage.setItem("Utilities", JSON.stringify(Utilities));
    localStorage.setItem("VoIP", JSON.stringify(VoIP));
    console.log("Load data into Local Storage success");
  }

  // redirect to next page or reload current page
  window.location.href = page;
}

function manageJSONData(keyJSON, jsonPath, data, option) {
  const pathArray = jsonPath.split(".");
  let currentObject = keyJSON;

  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    currentObject[key] = currentObject[key] ?? {};
    currentObject = currentObject[key];
  }

  if (option === "add") {
    // Add new data
    currentObject[pathArray[pathArray.length - 1]] = data;
  } else if (option === "delete") {
    // Delete data and update indexes
    const deletedIndex = pathArray[pathArray.length - 1];
    delete currentObject[deletedIndex];

    // Update indexes if the deleted entry was not the last one
    const remainingIndexes = Object.keys(currentObject)
      .map(Number)
      .sort((a, b) => a - b);
    for (let i = 0; i < remainingIndexes.length; i++) {
      const currentIndex = remainingIndexes[i];
      if (currentIndex !== i) {
        currentObject[i] = currentObject[currentIndex];
        delete currentObject[currentIndex];
      }
    }

    // Update the NumberOfEntries property if it exists
    if (currentObject.NumberOfEntries !== undefined) {
      currentObject.NumberOfEntries = Object.keys(currentObject).length - 1;
    }
  } else {
    // Handle invalid option
    console.error('Invalid option. Use "add" or "delete".');
  }
}
