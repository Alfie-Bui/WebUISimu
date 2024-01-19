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
 *
 * @param {*} item: which HTML file
 * @param {*} option: take 3 value:
 *            Apply : When change the UI event
 *            Cancel: When reject all change on UI
 */
function applyElemLS(item, option, change_entity) {
  var Status = JSON.parse(localStorage.getItem("Status"));
  var Basic = JSON.parse(localStorage.getItem("Basic"));
  var Wifi = JSON.parse(localStorage.getItem("Wifi"));
  var Advanced = JSON.parse(localStorage.getItem("Advanced"));
  var Security = JSON.parse(localStorage.getItem("Security"));
  var Utilities = JSON.parse(localStorage.getItem("Utilities"));
  var VoIP = JSON.parse(localStorage.getItem("VoIP"));
  switch (item) {
    case "advanced-alg.html":
      Advanced = change_entity;
      break;
    case "advanced-ddns.html":
      Advanced = change_entity;
      break;
    case "advanced-device_management.html":
      break;
    case "advanced-dmz.html":
      break;
    case "advanced-multicast-ipv4Setting.html":
      break;
    case "advanced-multicast.html":
      break;
    case "advanced-port_mapping-add.html":
      break;
    case "advanced-port_mapping.html":
      break;
    case "advanced-port_triggering-add.html":
      break;
    case "advanced-port_triggering.html":
      break;
    case "advanced-static_routing-add.html":
      break;
    case "advanced-static_routing-ipv6Config-add.html":
      break;
    case "advanced-static_routing-ipv6Config.html":
      break;
    case "advanced-static_routing.html":
      break;
    case "advanced-upnp.html":
      break;
    case "advanced-vpn-add.html":
      break;
    case "advanced-vpn.html":
      break;
    case "basic-lan-dev_connected.html":
      break;
    case "basic-lan-ipv4Config.html":
      break;
    case "basic-lan-ipv6Config.html":
      break;
    case "basic-registration_ID.html":
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
    case "index.html":
      break;
    case "login.html":
      break;
    case "logout.html":
      break;
    case "security-firewall.html":
      break;
    case "security-parental_control_settings.html":
      break;
    case "security-parental_control-devControl-add.html":
      break;
    case "security-parental_control-devControl.html":
      break;
    case "status-overview.html":
      break;
    case "status-pon_status.html":
      break;
    case "status-system_stats-lan_thr.html":
      break;
    case "status-system_stats-wan_thr.html":
      break;
    case "status-system_stats-wifi_thr.html":
      break;
    case "utilities-diagnostics.html":
      break;
    case "utilities-speed_test.html":
      break;
    case "utilities-system-backup.html":
      break;
    case "utilities-system-log_rule-edit.html":
      break;
    case "utilities-system-log_rule.html":
      break;
    case "utilities-system-time.html":
      break;
    case "utilities-system-user_mgnt-edit.html":
      break;
    case "utilities-system-user_mgnt.html":
      break;
    case "utilities-update_fw.html":
      break;
    case "voip-config.html":
      break;
    case "wifi-2_4G-config.html":
      break;
    case "wifi-2_4G-mac_filtering.html":
      break;
    case "wifi-2_4G-ssids.html":
      break;
    case "wifi-2_4G-statistics.html":
      break;
    case "wifi-2_4G-wds.html":
      break;
    case "wifi-2_4G-wps.html":
      break;
    case "wifi-5G-config.html":
      break;
    case "wifi-5G-mac_filter.html":
      break;
    case "wifi-5G-ssids.html":
      break;
    case "wifi-5G-statistics.html":
      break;
    case "wifi-5G-wds.html":
      break;
    case "wifi-5G-wps.html":
      ``;
      break;
    case "wifi-guest_access-add.html":
      break;
    case "wifi-guest_access.html":
      break;
    default:
      console.log(`Load ${item} fail --- no available page`);
      return;
  }

  // Load all change on Local Storage
  if (option != "Cancel") {
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
  window.location.href = item;
}
