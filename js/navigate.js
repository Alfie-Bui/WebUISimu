/**
 * Load page and fill data into them
 * @NOTE: i split it over category to avoid the load function is too large
 * @BUG Local storage is not same domain
 * @FIX Firefox: Set "security.fileuri.strict_origin_policy" to false
 */
function loadPage(item, options) {
  // options take edit or add button page
  console.log(
    `On run version: ${localStorage.getItem(
      "VERSION"
    )} ... Newest version: ${SIMULATOR_VERSION}`
  );
  if (
    localStorage.length === 0 ||
    localStorage.getItem("VERSION") === null ||
    localStorage.getItem("VERSION") !== SIMULATOR_VERSION
  ) {
    console.log(`Update DB to newest version: ${SIMULATOR_VERSION}`);
    initLS();
    localStorage.setItem("VERSION", SIMULATOR_VERSION);
  }

  // load data from local storage
  let Status = JSON.parse(localStorage.getItem("Status"));
  let Basic = JSON.parse(localStorage.getItem("Basic"));
  let Wifi = JSON.parse(localStorage.getItem("Wifi"));
  let Advanced = JSON.parse(localStorage.getItem("Advanced"));
  let Security = JSON.parse(localStorage.getItem("Security"));
  let Utilities = JSON.parse(localStorage.getItem("Utilities"));
  let VoIP = JSON.parse(localStorage.getItem("VoIP"));

  // fill data and make event on specific page
  switch (item) {
    case "advanced-alg.html":
      console.log(`Load ${item}\n${JSON.stringify(Advanced.ALG)}`);
      var ftp = document.getElementById("DeviceNATX_GTK_ALG_FTP");
      var tftp = document.getElementById("DeviceNATX_GTK_ALG_TFTP");
      var h323 = document.getElementById("DeviceNATX_GTK_ALG_H323");
      var sip = document.getElementById("DeviceNATX_GTK_ALG_SIP");
      var pptp = document.getElementById("DeviceNATX_GTK_ALG_PPTP");
      var l2tp = document.getElementById("DeviceNATX_GTK_ALG_L2TP");
      var ipsec = document.getElementById("DeviceNATX_GTK_ALG_IPSec");

      var algApplyBtn = document.getElementById("ALGModify");
      var algCancelBtn = document.getElementById("ALGCancel");

      // fill data
      if (Advanced.ALG.EnableFTPALG) ftp.checked = true;
      if (Advanced.ALG.EnableTFTPALG) tftp.checked = true;
      if (Advanced.ALG.EnableH323ALG) h323.checked = true;
      if (Advanced.ALG.EnableSIPALG) sip.checked = true;
      if (Advanced.ALG.EnablePPTPPassthrough) pptp.checked = true;
      if (Advanced.ALG.EnableL2TPPassthrough) l2tp.checked = true;
      if (Advanced.ALG.EnableIPSecPassthrough) ipsec.checked = true;

      // apply click event
      algApplyBtn.addEventListener("click", () => {
        Advanced.ALG.EnableFTPALG = ftp.checked;
        Advanced.ALG.EnableTFTPALG = tftp.checked;
        Advanced.ALG.EnableH323ALG = h323.checked;
        Advanced.ALG.EnableSIPALG = sip.checked;
        Advanced.ALG.EnablePPTPPassthrough = pptp.checked;
        Advanced.ALG.EnableL2TPPassthrough = l2tp.checked;
        Advanced.ALG.EnableIPSecPassthrough = ipsec.checked;
        applyElemLS("advanced-alg.html", algApplyBtn.value, Advanced);
      });

      algCancelBtn.addEventListener("click", () => {
        applyElemLS("advanced-alg.html", algCancelBtn.value);
      });
      break;
    case "advanced-ddns.html":
      console.log(`Load ${item}\n${JSON.stringify(Advanced.DDNS)}`);
      var enableDDNS = document.getElementById("EnableDDNS");
      var serviceProvider = document.getElementById("Server");
      var localWAN = document.getElementById("Interface");
      var username = document.getElementById("Username");
      var password = document.getElementById("Password");
      var domainName = document.getElementById("Name");

      var pwdEye = document.getElementById("pwdEye");
      var ddnsApplyBtn = document.getElementById("DDNSModify");
      var ddnsCancelBtn = document.getElementById("DDNSCancel");

      // fill data
      enableDDNS.checked = Advanced.DDNS.EnableDDNS;
      if (enableDDNS.checked) {
        document
          .getElementById("connectionStatusOn")
          .classList.remove("ng-hide");
        document.getElementById("connectionStatusOff").classList.add("ng-hide");
      } else {
        document
          .getElementById("connectionStatusOff")
          .classList.remove("ng-hide");
        document.getElementById("connectionStatusOn").classList.add("ng-hide");
      }
      ``;
      serviceProvider.value = Advanced.DDNS.ServiceProvider;

      // load WAN interface from Basic --> WAN --> IPv4
      var countOptionValue = 1;
      for (const elem of Basic.WAN.Interfaces) {
        const option = document.createElement("option");
        option.text = elem.Name;
        option.value = countOptionValue;
        countOptionValue += 1;
        localWAN.appendChild(option);
      }

      localWAN.value = Advanced.DDNS.LocalWanInterface;
      username.value = Advanced.DDNS.Username;
      password.value = Advanced.DDNS.Password;
      domainName.value = Advanced.DDNS.DomainName;

      /** Add required field event trigger */
      serviceProvider.addEventListener("input", () => {
        checkError_selectField(
          serviceProvider,
          document.getElementById("empty_error_server")
        );
      });

      localWAN.addEventListener("input", () => {
        checkError_selectField(
          localWAN,
          document.getElementById("empty_error_interface")
        );
      });

      username.addEventListener("input", () => {
        checkError_inputField(
          username,
          document.getElementById("empty_error_username"),
          document.getElementById("exceed_error_username")
        );
      });

      password.addEventListener("input", () => {
        checkError_inputField(
          password,
          document.getElementById("empty_error_password"),
          document.getElementById("exceed_error_password")
        );
      });

      domainName.addEventListener("input", () => {
        checkEmpty_inputField(
          domainName,
          document.getElementById("empty_error_domainName")
        );
      });

      pwdEye.addEventListener("click", () => {
        hide_show_pw(pwdEye, password);
      });

      // event on Apply and CancelConnectionType
      ddnsApplyBtn.addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          Advanced.DDNS.EnableDDNS = enableDDNS.checked;
          Advanced.DDNS.ServiceProvider = serviceProvider.value;
          Advanced.DDNS.LocalWanInterface = localWAN.value;
          Advanced.DDNS.Username = username.value;
          Advanced.DDNS.Password = password.value;
          Advanced.DDNS.DomainName = domainName.value;
          applyElemLS("advanced-ddns.html", ddnsApplyBtn.value, Advanced);
        }
        console.log("Advanced.DDNS: Apply fail");
      });

      ddnsCancelBtn.addEventListener("click", () => {
        applyElemLS("advanced-ddns.html", ddnsCancelBtn.value);
      });

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
      var filledData;
      var addNew_flag = false;

      /** Take data from Loca Storage, corresponds to Add or Edit */
      if (Basic.WAN.onEdit !== "") {
        // if edit --> Load from Local Storage
        filledData = Basic.WAN.Interfaces.filter(
          (obj) => obj.Name === Basic.WAN.onEdit
        )[0];
        console.log(
          `Load ${item} -- Edit ${filledData.Name}}\n${JSON.stringify(
            filledData
          )}`
        );
      } else {
        // if add New interface --> make prototype
        addNew_flag = true;
        var current_wan_interfaces = Basic.WAN.Interfaces.map(
          (obj) => obj.Name
        );
        var remain_in_pool = WAN_INTERFACE_POOL.filter(
          (interface) => !current_wan_interfaces.includes(interface)
        ); // make new interface name
        filledData = {
          Name: remain_in_pool[0],
          SelectionMode: "ETH",
          ConnectionType: "DHCP",
          VLAN: "", // if empty --> false
          MacCloning: "",
          // Static connection type option
          IPAddressStatic: "",
          SubnetMask: "",
          GatewayAddressStatic: "",
          IPv4DNSServer: [],
          // DHCP connection type option
          Option60: "",
          Option61: "",
          Option125: "",
          // PPPoE connection type option
          Username: "",
          Password: "",
          MTUSize: "",
          IPAddress: "",
          DefaultGateway: "",
          Actions: false,
          IPv6: {
            IPv6Address: "",
            v6DefaultGateway: "",
            //
            AddressingType: "DHCPv6",
            PrefixMode: "", // if empty --> disable "Enable PD" checkbox
            PrefixAddress: "",
            PrimaryTime: "",
            ValidTime: "",
            // DHCP v6 Connection type option
            Option16_1: "",
            Option16_2: "",
            Option1: "",
            Option17: "",
            // Static v6 Connection type option
            IPv6AddressStatic: "",
            Prefix: "",
            v6GatewayAddressStatic: "",
            IPv6DNSServer: [],
          },
        };
        console.log(
          `Load ${item} -- Add ${filledData.Name}}\n${JSON.stringify(
            filledData
          )}`
        );
      }

      /** Common */
      var selectionMode = document.getElementById("SelectionMode");
      var connectionType = document.getElementById("ConnectionType");

      var enableVLAN = document.getElementById("EnableVLAN");
      var vlan = document.getElementById("VLANShow");
      var vlan_input = document.getElementById("VLANID");

      var macCloingEnable = document.getElementById("MacCloningEnable");
      var macAddress = document.getElementById("MacCloningShow");
      var macAddress_input = document.getElementById("MACAddress");

      /** V6 common */
      var enablev6 = document.getElementById("EnableIPv6");
      var addressType = document.getElementById("AddressType");
      var enablepd = document.getElementById("EnablePD");
      var prefixMode = document.getElementById("ipv6_prefix_select");
      var prefixAddress = document.getElementById("PrefixAddress");
      var primaryTime = document.getElementById("PrimaryTime");
      var validTime = document.getElementById("ValidTime");

      /** Static Connection Type */
      // IPv4
      var static_panel = document.getElementById("Static_panel");
      var ipaddressStatic = document.getElementById("IPAddressStatic");
      var subnetMask = document.getElementById("SubnetMask");
      var gatewayStatic = document.getElementById("GatewayIPAddress");
      var addv4DNS = document.getElementById("Add");
      var v4DNSlist = document.getElementById("bodyData");
      var v4dnsElem = document.getElementById("rowElement");

      // IPv6
      var staticv6_panel = document.getElementById("Staticv6_panel");
      var ipaddressStaticv6 = document.getElementById("IPv6Address");
      var prefixStaticv6 = document.getElementById("IPv6Prefix");
      var gatewayStaticv6 = document.getElementById("IPv6GW");
      var addv6DNS = document.getElementById("Addv6");
      var v6DNSlist = document.getElementById("v6bodyData");
      var v6dnsElem = document.getElementById("v6rowElement");

      /** DHCP Connection Type */
      // IPv4
      var dhcp_panel = document.getElementById("DHCP_panel");

      var enableOption60 = document.getElementById("EnableOption60");
      var option60 = document.getElementById("Option60");
      var option60_input = document.getElementById("VendorClassID");

      var enableOption61 = document.getElementById("EnableOption61");
      var option61 = document.getElementById("Option61");
      var option61_input = document.getElementById("ClientID");

      var enableOption125 = document.getElementById("EnableOption125");
      var option125 = document.getElementById("Option125");
      var option125_input = document.getElementById("EnterpriseNumber");

      // IPv6
      var dhcpv6_panel = document.getElementById("DHCPv6_panel");

      var enableOption16 = document.getElementById("EnableOption16");
      var option16 = document.getElementById("Option16");
      var option16_1_input = document.getElementById("Option16_1_input");
      var option16_2_input = document.getElementById("Option16_2_input");

      var enableOption1 = document.getElementById("EnableOption1");
      var option1 = document.getElementById("Option1");
      var option1_input = document.getElementById("Option1_input");

      var enableOption17 = document.getElementById("EnableOption17");
      var option17 = document.getElementById("Option17");
      var option17_input = document.getElementById("Option17_input");

      /** PPPoE Connection Type */
      var pppoe_panel = document.getElementById("PPPoE_panel");
      var pppoe_username = document.getElementById("pppoe_username");
      var pppoe_password = document.getElementById("pppoe_password");
      var pppoe_pwdEye = document.getElementById("pwd_eye_ppoe_password");
      var pppoe_mtu_size = document.getElementById("pppoe_mtu_size");

      /* init event con common field */
      var setup = function () {
        enableVLAN.addEventListener("click", () => {
          enableVLAN.checked != enableVLAN.checked;
          if (enableVLAN.checked == true) {
            vlan.classList.remove("ng-hide");
            vlan_input.value = filledData.VLAN;
            checkEmpty_inputField(
              vlan_input,
              document.getElementById("empty_error_vlan")
            );
          } else {
            vlan.classList.add("ng-hide");
          }
        });

        vlan_input.addEventListener("input", () => {
          checkError_inputField(
            vlan_input,
            document.getElementById("empty_error_vlan"),
            document.getElementById("exceed_error_vlan")
          );
        });

        macCloingEnable.addEventListener("change", () => {
          macCloingEnable.checked != macCloingEnable.checked;
          if (macCloingEnable.checked == true) {
            macAddress.classList.remove("ng-hide");
            macAddress_input.value = filledData.MacCloning;
            checkEmpty_inputField(
              macAddress_input,
              document.getElementById("empty_error_mac")
            );
          } else {
            macAddress.classList.add("ng-hide");
          }
        });

        macAddress_input.addEventListener("input", () => {
          checkPattern_inputField(
            macAddress_input,
            new RegExp(MAC_PATTERN),
            document.getElementById("pattern_error_mac"),
            document.getElementById("empty_error_mac")
          );
        });
      };

      var setupv6 = function () {
        enablev6.addEventListener("click", () => {
          enablev6.checked != enablev6.checked;
          if (enablev6.checked === true) {
            document
              .getElementById("v6AddressType")
              .classList.remove("ng-hide");
            document
              .getElementById("v6PrefixSetting")
              .classList.remove("ng-hide");
          } else {
            document.getElementById("v6AddressType").classList.add("ng-hide");
            document.getElementById("v6PrefixSetting").classList.add("ng-hide");
          }
          handleConnectionType(connectionType.value, false);
        });

        enablepd.addEventListener("click", () => {
          enablepd.checked != enablepd.checked;
          if (enablepd.checked === true) {
            document.getElementById("pd_panel").classList.remove("ng-hide");
            if (prefixMode.value === "Manual") {
              document
                .getElementById("manual_prefix_mode_panel")
                .classList.remove("ng-hide");
            } else {
              document
                .getElementById("manual_prefix_mode_panel")
                .classList.add("ng-hide");
            }
          } else {
            document.getElementById("pd_panel").classList.add("ng-hide");
            document
              .getElementById("manual_prefix_mode_panel")
              .classList.add("ng-hide");
          }
        });

        prefixMode.addEventListener("change", () => {
          if (prefixMode.value === "Manual") {
            document
              .getElementById("manual_prefix_mode_panel")
              .classList.remove("ng-hide");

            checkPattern_inputField(
              prefixAddress,
              new RegExp(IPv6_PREFIX_ADDR_PATTERN),
              document.getElementById("pattern_error_prefix"),
              document.getElementById("empty_error_prefix")
            );

            checkRange_inputField(
              primaryTime,
              document.getElementById("range_error_primaryTime"),
              document.getElementById("empty_error_primaryTime")
            );

            checkRange_inputField(
              validTime,
              document.getElementById("range_error_validTime"),
              document.getElementById("empty_error_validTime")
            );
          } else {
            document
              .getElementById("manual_prefix_mode_panel")
              .classList.add("ng-hide");
          }
        });

        prefixAddress.addEventListener("input", () => {
          checkPattern_inputField(
            prefixAddress,
            new RegExp(IPv6_PREFIX_ADDR_PATTERN),
            document.getElementById("pattern_error_prefix"),
            document.getElementById("empty_error_prefix")
          );
        });

        primaryTime.addEventListener("input", () => {
          checkRange_inputField(
            primaryTime,
            document.getElementById("range_error_primaryTime"),
            document.getElementById("empty_error_primaryTime")
          );
        });

        validTime.addEventListener("input", () => {
          checkRange_inputField(
            validTime,
            document.getElementById("range_error_validTime"),
            document.getElementById("empty_error_validTime")
          );
        });
      };

      /** Connection Type */
      var addDNSServer = function (ipversion, elem) {
        if (ipversion === "IPv4") {
          const tr = v4dnsElem.content.cloneNode(true);
          const dnsServer = tr.querySelector(".DNSServer");

          const deleteRow = tr.querySelector(".Delete");
          const empty_error = tr.querySelector(".EmptyError");
          const pattern_error = tr.querySelector(".PatternError");

          dnsServer.value = elem;
          checkPattern_inputField(
            dnsServer,
            new RegExp(IPv4_PATTERN),
            pattern_error,
            empty_error
          );

          dnsServer.addEventListener("input", () => {
            checkPattern_inputField(
              dnsServer,
              new RegExp(IPv4_PATTERN),
              pattern_error,
              empty_error
            );
          });

          deleteRow.addEventListener("click", () => {
            var row = deleteRow.closest("tr");
            deleteDialogHandle(
              row,
              "Delete DNS Server",
              "Are you sure you want to Delete ?"
            );
          });

          v4DNSlist.appendChild(tr);
        } else {
          const tr = v6dnsElem.content.cloneNode(true);
          const dnsServer = tr.querySelector(".DNSServerv6");

          const deleteRow = tr.querySelector(".Deletev6");

          const empty_error = tr.querySelector(".EmptyErrorv6");
          const pattern_error = tr.querySelector(".PatternErrorv6");

          dnsServer.value = elem;
          checkPattern_inputField(
            dnsServer,
            new RegExp(IPv6_PATTERN),
            pattern_error,
            empty_error
          );

          dnsServer.addEventListener("input", () => {
            checkPattern_inputField(
              dnsServer,
              new RegExp(IPv6_PATTERN),
              pattern_error,
              empty_error
            );
          });

          deleteRow.addEventListener("click", () => {
            var row = deleteRow.closest("tr");
            deleteDialogHandle(
              row,
              "Delete DNS Server",
              "Are you sure you want to Delete ?"
            );
          });

          v6DNSlist.appendChild(tr);
        }
      };

      var handleConnectionType = function (
        connection_type,
        loadData_from_LocalStorage
      ) {
        // apply UI with corresponding Connection Type & fill data from Local Storage
        if (connection_type == "Static") {
          dhcp_panel.classList.add("ng-hide");
          static_panel.classList.remove("ng-hide");
          pppoe_panel.classList.add("ng-hide");

          if (loadData_from_LocalStorage === true) {
            ipaddressStatic.value = filledData.IPAddressStatic;
            subnetMask.value = filledData.SubnetMask;
            gatewayStatic.value = filledData.GatewayAddressStatic;
            v4DNSlist.innerHTML = ""; // clear after fill data

            if (!addNew_flag) {
              for (const elem of filledData.IPv4DNSServer) {
                addDNSServer("IPv4", elem);
              }
            }
          }
          checkPattern_inputField(
            ipaddressStatic,
            new RegExp(IPv4_PATTERN),
            document.getElementById("pattern_error_ip"),
            document.getElementById("empty_error_ip")
          );
          checkPattern_inputField(
            subnetMask,
            new RegExp(SUBNET_PATTERN),
            document.getElementById("pattern_error_subnet"),
            document.getElementById("empty_error_subnet")
          );
          checkPattern_inputField(
            gatewayStatic,
            new RegExp(IPv4_PATTERN),
            document.getElementById("pattern_error_gw"),
            document.getElementById("empty_error_gw")
          );

          // Enable IPv6
          if (enablev6.checked === true) {
            staticv6_panel.classList.remove("ng-hide");
            dhcpv6_panel.classList.add("ng-hide");

            if (loadData_from_LocalStorage === true) {
              ipaddressStaticv6.value = filledData.IPv6.IPv6AddressStatic;
              prefixStaticv6.value = filledData.IPv6.Prefix;
              gatewayStaticv6.value = filledData.IPv6.v6GatewayAddressStatic;
              v6DNSlist.innerHTML = ""; // clear after fill data
              if (!addNew_flag) {
                for (const elem of filledData.IPv6.IPv6DNSServer) {
                  addDNSServer("IPv6", elem);
                }
              }
            } else {
              ipaddressStaticv6.value = "";
              prefixStaticv6.value = "";
              gatewayStaticv6.value = "";
              v6DNSlist.innerHTML = ""; // clear after fill data
            }
            checkPattern_inputField(
              ipaddressStaticv6,
              new RegExp(IPv6_PATTERN),
              document.getElementById("pattern_error_ipv6Address"),
              document.getElementById("empty_error_ipv6Address")
            );
            checkRange_inputField(
              prefixStaticv6,
              document.getElementById("range_error_ipv6Prefix"),
              document.getElementById("empty_error_ipv6Prefix")
            );
            checkPattern_inputField(
              gatewayStaticv6,
              new RegExp(IPv6_PATTERN),
              document.getElementById("pattern_error_ipv6GW"),
              document.getElementById("empty_error_ipv6GW")
            );
          } else {
            staticv6_panel.classList.add("ng-hide");
          }
        } else if (connection_type == "DHCP") {
          dhcp_panel.classList.remove("ng-hide");
          static_panel.classList.add("ng-hide");
          pppoe_panel.classList.add("ng-hide");

          if (loadData_from_LocalStorage === true) {
            if (filledData.Option60 !== "") {
              enableOption60.checked = true;
              option60.classList.remove("ng-hide");
              option60_input.value = filledData.Option60;
              checkEmpty_inputField(
                option60_input,
                document.getElementById("empty_error_option60")
              );
            } else {
              // enableOption60.checked = false;
              option60.classList.add("ng-hide");
            }

            if (filledData.Option61 !== "") {
              enableOption61.checked = true;
              option61.classList.remove("ng-hide");
              option61_input.value = filledData.Option61;
              checkEmpty_inputField(
                option61_input,
                document.getElementById("empty_error_option61")
              );
            } else {
              enableOption61.checked = false;
              option61.classList.add("ng-hide");
            }

            if (filledData.Option125 !== "") {
              enableOption125.checked = true;
              option125.classList.remove("ng-hide");
              option125_input.value = filledData.Option125;
              checkEmpty_inputField(
                option125_input,
                document.getElementById("empty_error_option125")
              );
            } else {
              enableOption125.checked = false;
              option125.classList.add("ng-hide");
            }
          }
          // Enable IPv6
          if (enablev6.checked === true) {
            dhcpv6_panel.classList.remove("ng-hide");
            staticv6_panel.classList.add("ng-hide");

            if (loadData_from_LocalStorage) {
              if (
                filledData.IPv6.Option16_1 !== "" &&
                filledData.IPv6.Option16_2 !== ""
              ) {
                enableOption16.checked = true;
                option16.classList.remove("ng-hide");
                option16_1_input.value = filledData.IPv6.Option16_1;
                option16_2_input.value = filledData.IPv6.Option16_2;
                checkEmpty_inputField(
                  option16_1_input,
                  document.getElementById("empty_error_option16_1")
                );
                checkEmpty_inputField(
                  option16_2_input,
                  document.getElementById("empty_error_option16_2")
                );
              } else {
                enableOption16.checked = false;
                option16.classList.add("ng-hide");
              }

              if (filledData.IPv6.Option1 !== "") {
                enableOption1.checked = true;
                option1.classList.remove("ng-hide");
                option1_input.value = filledData.IPv6.Option1;
                checkEmpty_inputField(
                  option1_input,
                  document.getElementById("empty_error_option1")
                );
              } else {
                enableOption1, (checked = false);
                option1.classList.add("ng-hide");
              }

              if (filledData.IPv6.Option17 !== "") {
                enableOption17.checked = true;
                option17.classList.remove("ng-hide");
                option17_input.value = filledData.IPv6.Option17;
                checkEmpty_inputField(
                  option17_input,
                  document.getElementById("empty_error_option17")
                );
              } else {
                enableOption17.checked = false;
                option17.classList.add("ng-hide");
              }
            }
          } else {
            dhcpv6_panel.classList.add("ng-hide");
          }
        } else if (connection_type == "PPPoE") {
          pppoe_panel.classList.remove("ng-hide");
          dhcp_panel.classList.add("ng-hide");
          static_panel.classList.add("ng-hide");

          if (loadData_from_LocalStorage) {
            pppoe_username.value = filledData.Username;
            pppoe_password.value = filledData.Password;
            pppoe_mtu_size.value = filledData.MTUSize;
          }
          checkEmpty_inputField(
            pppoe_username,
            document.getElementById("empty_error_pppoe_username")
          );
          checkEmpty_inputField(
            pppoe_password,
            document.getElementById("empty_error_pppoe_password")
          );
          checkRange_inputField(
            pppoe_mtu_size,
            document.getElementById("range_error_pppoe_mtu_size"),
            document.getElementById("empty_error_pppoe_mtu_size")
          );
        } else {
          console.log("Error, Connection Type select is not available");
        }
      };

      var setupConnectionType = function () {
        /* Init event for each Connection type */
        // Static option setup
        ipaddressStatic.addEventListener("input", () => {
          checkPattern_inputField(
            ipaddressStatic,
            new RegExp(IPv4_PATTERN),
            document.getElementById("pattern_error_ip"),
            document.getElementById("empty_error_ip")
          );
        });

        subnetMask.addEventListener("input", () => {
          checkPattern_inputField(
            subnetMask,
            new RegExp(SUBNET_PATTERN),
            document.getElementById("pattern_error_subnet"),
            document.getElementById("empty_error_subnet")
          );
        });

        gatewayStatic.addEventListener("input", () => {
          checkPattern_inputField(
            gatewayStatic,
            new RegExp(IPv4_PATTERN),
            document.getElementById("pattern_error_gw"),
            document.getElementById("empty_error_gw")
          );
        });

        addv4DNS.addEventListener("click", () => {
          addDNSServer("IPv4", "");
        });

        // v6 Static option setup
        ipaddressStaticv6.addEventListener("input", () => {
          checkPattern_inputField(
            ipaddressStaticv6,
            new RegExp(IPv6_PATTERN),
            document.getElementById("pattern_error_ipv6Address"),
            document.getElementById("empty_error_ipv6Address")
          );
        });

        prefixStaticv6.addEventListener("input", () => {
          checkRange_inputField(
            prefixStaticv6,
            document.getElementById("range_error_ipv6Prefix"),
            document.getElementById("empty_error_ipv6Prefix")
          );
        });

        gatewayStaticv6.addEventListener("input", () => {
          checkPattern_inputField(
            gatewayStaticv6,
            new RegExp(IPv6_PATTERN),
            document.getElementById("pattern_error_ipv6GW"),
            document.getElementById("empty_error_ipv6GW")
          );
        });

        addv6DNS.addEventListener("click", () => {
          addDNSServer("IPv6", "");
        });

        // DHCP option setup
        enableOption60.addEventListener("change", () => {
          enableOption60.checked != enableOption60.checked;
          if (enableOption60.checked == true) {
            option60.classList.remove("ng-hide");
            checkEmpty_inputField(
              option60_input,
              document.getElementById("empty_error_option60")
            );
          } else {
            option60.classList.add("ng-hide");
          }
        });

        enableOption61.addEventListener("change", () => {
          enableOption61.checked != enableOption61.checked;
          if (enableOption61.checked == true) {
            option61.classList.remove("ng-hide");
            checkEmpty_inputField(
              option61_input,
              document.getElementById("empty_error_option61")
            );
          } else {
            option61.classList.add("ng-hide");
          }
        });

        enableOption125.addEventListener("change", () => {
          enableOption125.checked != enableOption125.checked;
          if (enableOption125.checked == true) {
            option125.classList.remove("ng-hide");
            checkEmpty_inputField(
              option125_input,
              document.getElementById("empty_error_option125")
            );
          } else {
            option125.classList.add("ng-hide");
          }
        });

        option60_input.addEventListener("input", () => {
          checkEmpty_inputField(
            option60_input,
            document.getElementById("empty_error_option60")
          );
        });

        option61_input.addEventListener("input", () => {
          checkEmpty_inputField(
            option61_input,
            document.getElementById("empty_error_option61")
          );
        });

        option125_input.addEventListener("input", () => {
          checkEmpty_inputField(
            option125_input,
            document.getElementById("empty_error_option125")
          );
        });

        // v6 DHCP
        enableOption16.addEventListener("click", () => {
          enableOption16.checked != enableOption16.checked;
          if (enableOption16.checked === true) {
            option16.classList.remove("ng-hide");
            checkEmpty_inputField(
              option16_1_input,
              document.getElementById("empty_error_option16_1")
            );
            checkEmpty_inputField(
              option16_2_input,
              document.getElementById("empty_error_option16_2")
            );
          } else {
            option16.classList.add("ng-hide");
          }
        });

        enableOption1.addEventListener("click", () => {
          enableOption1.checked != enableOption1.checked;
          if (enableOption1.checked === true) {
            option1.classList.remove("ng-hide");
            checkEmpty_inputField(
              option1_input,
              document.getElementById("empty_error_option1")
            );
          } else {
            option1.classList.add("ng-hide");
          }
        });

        enableOption17.addEventListener("click", () => {
          enableOption17.checked != enableOption17.checked;
          if (enableOption17.checked === true) {
            option17.classList.remove("ng-hide");
            checkEmpty_inputField(
              option17_input,
              document.getElementById("empty_error_option17")
            );
          } else {
            option17.classList.add("ng-hide");
          }
        });

        option16_1_input.addEventListener("input", () => {
          checkEmpty_inputField(
            option16_1_input,
            document.getElementById("empty_error_option16_1")
          );
        });

        option16_2_input.addEventListener("input", () => {
          checkEmpty_inputField(
            option16_2_input,
            document.getElementById("empty_error_option16_2")
          );
        });

        option17_input.addEventListener("input", () => {
          checkEmpty_inputField(
            option17_input,
            document.getElementById("empty_error_option17")
          );
        });

        option1_input.addEventListener("input", () => {
          checkEmpty_inputField(
            option1_input,
            document.getElementById("empty_error_option1")
          );
        });

        // PPPoE option setup
        pppoe_username.addEventListener("input", () => {
          checkEmpty_inputField(
            pppoe_username,
            document.getElementById("empty_error_pppoe_username")
          );
        });

        pppoe_password.addEventListener("input", () => {
          checkEmpty_inputField(
            pppoe_password,
            document.getElementById("empty_error_pppoe_password")
          );
        });

        pppoe_pwdEye.addEventListener("click", () => {
          hide_show_pw(pppoe_pwdEye, pppoe_password);
        });

        pppoe_mtu_size.addEventListener("input", () => {
          checkRange_inputField(
            pppoe_mtu_size,
            document.getElementById("range_error_pppoe_mtu_size"),
            document.getElementById("empty_error_pppoe_mtu_size")
          );
        });

        connectionType.addEventListener("change", () => {
          handleConnectionType(connectionType.value);
        });
      };

      /** Fill data into FE */
      var fillData = function () {
        selectionMode.value = filledData.SelectionMode;

        connectionType.value = filledData.ConnectionType;

        if (filledData.VLAN !== "") {
          enableVLAN.checked = true;
          vlan.classList.remove("ng-hide");
          vlan_input.value = filledData.VLAN;
          checkEmpty_inputField(
            vlan_input,
            document.getElementById("empty_error_vlan")
          );
        } else {
          enableVLAN.checked = false;
        }

        if (filledData.MacCloning !== "") {
          macCloingEnable.checked = true;
          macAddress.classList.remove("ng-hide");
          macAddress_input.value = filledData.MacCloning;
          checkEmpty_inputField(
            macAddress_input,
            document.getElementById("empty_error_mac")
          );
        } else {
          macCloingEnable.checked = false;
        }

        if (filledData.EnableIPv6 === true) {
          enablev6.checked = true;
          document.getElementById("v6AddressType").classList.remove("ng-hide");
          document
            .getElementById("v6PrefixSetting")
            .classList.remove("ng-hide");
          addressType.value = filledData.IPv6.AddressingType;

          if (filledData.IPv6.PrefixMode !== "") {
            enablepd.checked = true;
            document.getElementById("pd_panel").classList.remove("ng-hide");

            prefixMode.value = filledData.IPv6.PrefixMode;
            // enable PD if option is Auto or Manual
            if (filledData.IPv6.PrefixMode === "Manual") {
              document
                .getElementById("manual_prefix_mode_panel")
                .classList.remove("ng-hide");

              prefixAddress.value = filledData.IPv6.PrefixAddress;
              checkPattern_inputField(
                prefixAddress,
                new RegExp(IPv6_PREFIX_ADDR_PATTERN),
                document.getElementById("pattern_error_prefix"),
                document.getElementById("empty_error_prefix")
              );

              primaryTime.value = filledData.IPv6.PrimaryTime;
              checkRange_inputField(
                primaryTime,
                document.getElementById("range_error_primaryTime"),
                document.getElementById("empty_error_primaryTime")
              );

              validTime.value = filledData.IPv6.ValidTime;
              checkRange_inputField(
                validTime,
                document.getElementById("range_error_validTime"),
                document.getElementById("empty_error_validTime")
              );
            } else {
              // Auto
              document
                .getElementById("manual_prefix_mode_panel")
                .classList.add("ng-hide");
            }
          } else {
            enablepd.checked = false;
            document.getElementById("pd_panel").classList.add("ng-hide");
          }
        } else {
          enablev6.checked = false;
          document.getElementById("v6AddressType").classList.add("ng-hide");
          document.getElementById("v6PrefixSetting").classList.add("ng-hide");
        }
        handleConnectionType(connectionType.value, true);
      };

      /** declare variable of tag and add event listerner for them */
      setup();
      setupv6();
      setupConnectionType();
      // fill data into FE
      fillData();

      /** Button Cancel and Apply */
      var cancelBtn = document.getElementById("Cancel");
      var applyBtn = document.getElementById("Apply");

      /** At Cancel and Apply */
      cancelBtn.addEventListener("click", () => {
        applyElemLS("basic-wan-ipv4.html", "Cancel");
      });

      applyBtn.addEventListener("click", () => {
        var static_apply_flag = true;
        var dhcp_apply_flag = true;
        var pppoe_apply_flag = true;
        var common_apply_flag = true;

        var elemAfterChange;
        if (!addNew_flag) {
          // if edit
          elemAfterChange = Basic.WAN.Interfaces.find(
            (obj) => obj.Name === filledData.Name
          );
        } else {
          // add new WAN interface
          elemAfterChange = filledData;
        }

        elemAfterChange.Name = filledData.Name;
        elemAfterChange.SelectionMode = selectionMode.value;
        elemAfterChange.ConnectionType = connectionType.value;
        elemAfterChange.Actions = false; // Status UP after Apply

        /** Check Error at common field */
        if (enableVLAN.checked === true) {
          elemAfterChange.VLAN = vlan_input.value;
          common_apply_flag &= checkError_show(
            document.querySelectorAll(".vlan_error")
          );
        } else {
          elemAfterChange.VLAN = "";
        }

        if (macCloingEnable.checked === true) {
          elemAfterChange.MacCloning = macAddress_input.value;
          common_apply_flag &= checkError_show(
            document.querySelectorAll(".macCloning_error")
          );
        } else {
          elemAfterChange.MacCloning = "";
        }

        // check v6
        if (enablev6.checked === true) {
          elemAfterChange.EnableIPv6 = true;
          elemAfterChange.IPv6.AddressingType = addressType.value;
          if (enablepd.checked) {
            if (prefixMode.value === "Manual") {
              elemAfterChange.IPv6.PrefixAddress = prefixAddress.value;
              elemAfterChange.IPv6.PrimaryTime = parseInt(primaryTime.value);
              elemAfterChange.IPv6.ValidTime = parseInt(validTime.value);
              checkError_show(document.querySelectorAll(".v6_common_error"));
            }
            elemAfterChange.IPv6.PrefixMode = prefixMode.value;
          }
        } else {
          elemAfterChange.EnableIPv6 = false;
          elemAfterChange.IPv6.AddressingType = "DHCPv6";
          elemAfterChange.IPv6.PrefixMode = "";
          elemAfterChange.IPv6.PrefixAddress = "";
          elemAfterChange.IPv6.PrimaryTime = "";
          elemAfterChange.IPv6.ValidTime = "";
        }

        function generateIPv6WANAddress() {
          // Generate eight 16-bit hexadecimal blocks
          const blocks = Array.from({ length: 8 }, () =>
            Math.floor(Math.random() * 0xffff)
          );

          // Format the blocks into an IPv6 address
          const ipv6Address = blocks
            .map((block) => block.toString(16))
            .join(":");

          return ipv6Address;
        }

        switch (connectionType.value) {
          case "Static":
            static_apply_flag &= checkError_show(
              document.querySelectorAll(".static_error")
            );

            // check v6
            if (enablev6.checked === true) {
              static_apply_flag &= checkError_show(
                document.querySelectorAll(".staticv6_error")
              );
            }
            console.log(
              `Case Static Connection: common_apply_flag = ${common_apply_flag}, static_apply_flag = ${static_apply_flag}`
            );

            if (common_apply_flag && static_apply_flag) {
              // if no error --> wrap data in the page to store
              elemAfterChange.IPAddress = ipaddressStatic.value;
              elemAfterChange.IPAddressStatic = ipaddressStatic.value;
              elemAfterChange.SubnetMask = subnetMask.value;
              elemAfterChange.GatewayAddressStatic = gatewayStatic.value;
              elemAfterChange.DefaultGateway = gatewayStatic.value;
              elemAfterChange.IPv4DNSServer = []; // clear
              for (const elem of v4DNSlist.querySelectorAll(".DNSServer")) {
                elemAfterChange.IPv4DNSServer.push(elem.value);
              }

              // v6 fill
              elemAfterChange.EnableIPv6 = enablev6.checked;
              if (enablev6.checked === true) {
                elemAfterChange.IPv6.IPv6Address = ipaddressStaticv6.value;
                elemAfterChange.IPv6.v6DefaultGateway = gatewayStaticv6.value;
                //
                elemAfterChange.IPv6.IPv6AddressStatic =
                  ipaddressStaticv6.value;
                elemAfterChange.IPv6.Prefix = parseInt(prefixStaticv6.value);
                elemAfterChange.IPv6.v6GatewayAddressStatic =
                  gatewayStaticv6.value;
                elemAfterChange.IPv6.IPv6DNSServer = [];
                for (const elem of v6DNSlist.querySelectorAll(".DNSServerv6")) {
                  elemAfterChange.IPv6.IPv6DNSServer.push(elem.value);
                }
              }

              if (addNew_flag) {
                // if Add button --> push new element instead off modify
                Basic.WAN.Interfaces.push(elemAfterChange);
              }

              /* Clear */
              applyElemLS("basic-wan-ipv4.html", "Apply", Basic);
            } else {
              console.log("Basic.WAN.addWAN: Apply Static fail");
            }
            break;
          case "DHCP":
            // v4
            if (enableOption60.checked === true) {
              elemAfterChange.Option60 = option60_input.value;
              dhcp_apply_flag &= checkError_show(
                document.getElementById("empty_error_option60")
              );
            } else {
              elemAfterChange.Option60 = "";
            }

            if (enableOption61.checked === true) {
              elemAfterChange.Option61 = option61_input.value;
              dhcp_apply_flag &= checkError_show(
                document.getElementById("empty_error_option61")
              );
            } else {
              elemAfterChange.Option61 = "";
            }

            if (enableOption125.checked === true) {
              elemAfterChange.Option125 = option125_input.value;
              dhcp_apply_flag &= checkError_show(
                document.getElementById("empty_error_option125")
              );
            } else {
              elemAfterChange.Option125 = "";
            }

            // v6
            if (enablev6.checked === true) {
              if (enableOption16.checked === true) {
                elemAfterChange.IPv6.Option16_1 = option16_1_input.value;
                elemAfterChange.IPv6.Option16_2 = option16_2_input.value;
                dhcp_apply_flag &= checkError_show(
                  document.getElementById("empty_error_option16_1"),
                  document.getElementById("empty_error_option16_2")
                );
              } else {
                elemAfterChange.IPv6.Option16_1 = "";
                elemAfterChange.IPv6.Option16_2 = "";
              }

              if (enableOption1.checked === true) {
                elemAfterChange.IPv6.Option1 = option1_input.value;
                dhcp_apply_flag &= checkError_show(
                  document.getElementById("empty_error_option1")
                );
              } else {
                elemAfterChange.IPv6.Option1 = "";
              }

              if (enableOption17.checked === true) {
                elemAfterChange.IPv6.Option17 = option17_input.value;
                dhcp_apply_flag &= checkError_show(
                  document.getElementById("empty_error_option17")
                );
              } else {
                elemAfterChange.IPv6.Option17 = "";
              }
            }

            console.log(
              `Case DHCP Connection: common_apply_flag = ${common_apply_flag}, dhcp_apply_flag = ${dhcp_apply_flag}`
            );

            if (common_apply_flag && dhcp_apply_flag) {
              // if no error --> wrap data in the page to store
              var networkPart = Math.floor(Math.random() * 254) + 1; // Generates a random integer between 1 and 254
              var hostPart = Math.floor(Math.random() * 254) + 1; // Generates a random integer between 1 and 254
              if (
                document.getElementById("EnableDefaultGateway").checked === true
              ) {
                // if default gateway v4
                elemAfterChange.DefaultGateway = "192.168.99.1";
                elemAfterChange.IPAddress = `192.168.99.${hostPart.toString()}`;

                // v6
                elemAfterChange.IPv6.IPv6Address = generateIPv6WANAddress();
                elemAfterChange.IPv6.v6DefaultGateway =
                  "fe80::e0:92ff:fe00:141";
              } else {
                elemAfterChange.DefaultGateway = `192.168.${hostPart.toString()}.1`;
                elemAfterChange.IPAddress = `192.168.${networkPart.toString()}.${hostPart.toString()}`;

                // v6
                elemAfterChange.IPv6.IPv6Address = generateIPv6WANAddress();
                elemAfterChange.IPv6.v6DefaultGateway =
                  generateIPv6WANAddress();
              }

              if (addNew_flag) {
                // if Add button --> push new element instead off modify
                Basic.WAN.Interfaces.push(elemAfterChange);
              }
              applyElemLS("basic-wan-ipv4.html", "Apply", Basic);
            } else {
              console.log("Basic.WAN.addWAN: Apply DHCP fail");
            }
            break;
          case "PPPoE":
            pppoe_apply_flag &= checkError_show(
              document.querySelectorAll(".pppoe_error")
            );
            if (common_apply_flag && pppoe_apply_flag) {
              // if no error --> wrap data in the page to store
              var networkPart = Math.floor(Math.random() * 254) + 1; // Generates a random integer between 1 and 254
              var hostPart = Math.floor(Math.random() * 254) + 1; // Generates a random integer between 1 and 254
              if (
                document.getElementById("EnableDefaultGateway").checked === true
              ) {
                // if default gateway
                elemAfterChange.DefaultGateway = "192.168.99.1";
                elemAfterChange.IPAddress = `192.168.99.${hostPart.toString()}`;

                // v6
                elemAfterChange.IPv6.IPv6Address = generateIPv6WANAddress();
                elemAfterChange.IPv6.v6DefaultGateway =
                  "fe80::e0:92ff:fe00:141";
              } else {
                elemAfterChange.DefaultGateway = `192.168.${hostPart.toString()}.1`;
                elemAfterChange.IPAddress = `192.168.${networkPart.toString()}.${hostPart.toString()}`;

                // v6
                elemAfterChange.IPv6.IPv6Address = generateIPv6WANAddress();
                elemAfterChange.IPv6.v6DefaultGateway =
                  generateIPv6WANAddress();
              }
              elemAfterChange.Username = pppoe_username.value;
              elemAfterChange.Password = pppoe_password.value;
              elemAfterChange.MTUSize = parseInt(pppoe_mtu_size.value);

              if (addNew_flag) {
                // if Add button --> push new element instead off modify
                Basic.WAN.Interfaces.push(elemAfterChange);
              }
              applyElemLS("basic-wan-ipv4.html", "Apply", Basic);
            } else {
              console.log("Basic.WAN.addWAN: Apply PPPoE fail");
            }
            break;
          default:
            console.log(
              "Some thing wrong in Connection Type. Check it out !!!"
            );
        }
      });
      break;
    case "basic-wan-ipv4.html":
      console.log(`Load ${item}\n${JSON.stringify(Basic.WAN.Interfaces)}`);
      var bodyData = document.getElementById("bodyData");
      var addBtn = document.getElementById("Add");
      var rowElement = document.getElementById("rowElement");

      for (const elem of Basic.WAN.Interfaces) {
        const tr = rowElement.content.cloneNode(true);

        const nameCell = tr.querySelector(".NameCell");
        const connectiomTypeCell = tr.querySelector(".ConnectiomTypeCell");
        const iPAddressCell = tr.querySelector(".IPAddressCell");
        const statusCell = tr.querySelector(".StatusCell");
        const defaultGatewayCell = tr.querySelector(".DefaultGatewayCell");
        const actionConnectCell = tr.querySelector(".ActionConnectCell");
        const imgActionConnectCell = tr.querySelector(".imgActionConnectCell");
        const editBtn = tr.querySelector(".EditBtn");
        const deleteBtn = tr.querySelector(".DeleteBtn");

        // fill data
        nameCell.textContent = elem.Name;
        connectiomTypeCell.textContent = elem.SelectionMode;
        iPAddressCell.textContent = elem.IPAddress;
        if (elem.Actions === false) {
          statusCell.classList.add("gemtek-status-up");
          statusCell.classList.add("gemtek-status-up-text");
          imgActionConnectCell.src = "images/icons/icon-1/disconnect.svg";
          actionConnectCell.checked = false;
        } else {
          statusCell.classList.add("gemtek-status-down");
          statusCell.classList.add("gemtek-status-down-text");
          imgActionConnectCell.src = "images/icons/icon-1/connect.svg";
          actionConnectCell.checked = true;
        }
        defaultGatewayCell.textContent = elem.DefaultGateway;

        // Add click event for them
        actionConnectCell.addEventListener("click", () => {
          var clickElemName = actionConnectCell
            .closest("tr")
            .innerText.split("\t")[0]; // Name of clicked element
          console.log(clickElemName);
          var clickElem = Basic.WAN.Interfaces.find(
            (obj) => obj.Name === clickElemName
          );
          clickElem.Actions = !clickElem.Actions;
          actionConnectCell.checked = !actionConnectCell.checked;
          applyElemLS("basic-wan-ipv4.html", "Apply", Basic);
        });

        editBtn.addEventListener("click", () => {
          Basic.WAN.onEdit = elem.Name;
          Basic.WAN.atv6Config = false;
          applyElemLS("basic-wan-addWAN.html", "Apply", Basic);
        });

        deleteBtn.addEventListener("click", () => {
          if (bodyData.getElementsByTagName("tr").length === 1) {
            alertDialogHandle("Cannot delete all WAN interfaces");
          } else {
            var row = deleteBtn.closest("tr");
            deleteDialogHandle(
              row,
              "Delete WAN IPv4",
              "Are you sure you want to delete ?"
            )
              .then(() => {
                // if true --> delete (OK button is pressed)
                Basic.WAN.Interfaces = Basic.WAN.Interfaces.filter(
                  (obj) =>
                    obj.Name !==
                    row.innerText
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)[0]
                );

                applyElemLS("basic-wan-ipv4.html", "Apply", Basic);
              })
              .catch(() => {});
          }
        });

        // append table
        bodyData.appendChild(tr);
      }

      addBtn.addEventListener("click", () => {
        Basic.WAN.onEdit = "";
        Basic.WAN.atv6Config = false;
        if (Basic.WAN.Interfaces.length >= WAN_INTERFACE_POOL.length) {
          alertDialogHandle("Maximum settings limit has been exceeded");
        } else {
          applyElemLS("basic-wan-addWAN.html", "Apply", Basic);
        }
      });
      break;
    case "basic-wan-ipv6.html":
      console.log(`Load ${item}\n${JSON.stringify(Basic.WAN.Interfaces)}`);
      var bodyData = document.getElementById("bodyData");
      var addBtn = document.getElementById("Add");
      var rowElement = document.getElementById("rowElement");

      for (const elem of Basic.WAN.Interfaces) {
        if (elem.EnableIPv6 === true) {
          const tr = rowElement.content.cloneNode(true);

          const nameCell = tr.querySelector(".NameCell");
          const connectiomTypeCell = tr.querySelector(".ConnectiomTypeCell");
          const iPAddressCell = tr.querySelector(".IPAddressCell");
          const statusCell = tr.querySelector(".StatusCell");
          const defaultGatewayCell = tr.querySelector(".DefaultGatewayCell");
          const editBtn = tr.querySelector(".EditBtn");
          const deleteBtn = tr.querySelector(".DeleteBtn");

          // fill data
          nameCell.textContent = elem.Name;
          connectiomTypeCell.textContent = elem.SelectionMode;
          iPAddressCell.textContent = elem.IPv6.IPv6Address;
          defaultGatewayCell.textContent = elem.IPv6.v6DefaultGateway;

          if (elem.Actions === false) {
            statusCell.classList.add("gemtek-status-up");
            statusCell.classList.add("gemtek-status-up-text");
          } else {
            statusCell.classList.add("gemtek-status-down");
            statusCell.classList.add("gemtek-status-down-text");
          }

          editBtn.addEventListener("click", () => {
            Basic.WAN.onEdit = elem.Name;
            Basic.WAN.atv6Config = true;
            applyElemLS("basic-wan-addWAN.html", "Apply", Basic);
          });

          deleteBtn.addEventListener("click", () => {
            if (Basic.WAN.Interfaces.length === 1) {
              alertDialogHandle("Cannot delete all WAN interfaces");
            } else {
              var row = deleteBtn.closest("tr");
              deleteDialogHandle(
                row,
                "Delete WAN IPv6",
                "Are you sure you want to delete ?"
              )
                .then(() => {
                  // if true --> delete (OK button is pressed)
                  Basic.WAN.Interfaces = Basic.WAN.Interfaces.filter(
                    (obj) =>
                      obj.Name !==
                      row.innerText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean)[0]
                  );
                  applyElemLS("basic-wan-ipv6.html", "Apply", Basic);
                })
                .catch(() => {});
            }
          });

          // append table
          bodyData.appendChild(tr);
        }
        // else {
        //   console.log(`${elem.Name} interface does not have IPv6 config`);
        // }
      }

      addBtn.addEventListener("click", () => {
        Basic.WAN.onEdit = "";
        Basic.WAN.atv6Config = true;
        if (Basic.WAN.Interfaces.length >= WAN_INTERFACE_POOL.length) {
          alertDialogHandle("Maximum settings limit has been exceeded");
        } else {
          applyElemLS("basic-wan-addWAN.html", "Apply", Basic);
        }
      });
      break;
    case "main.html":
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
      console.log(`Load ${item}\n${JSON.stringify(Wifi["2.4G"])}`);
      var enable2_4G = document.getElementById("Enable");
      var autoChannel = document.getElementById("AutoChannelEnable");
      var operationModeSelect = document.getElementById("OperatingStandards");
      var channelSelect = document.getElementById("Channel");
      var channelBWSelect = document.getElementById(
        "OperatingChannelBandwidth"
      );
      var advertiseSSID = document.getElementById("SSIDAdvertisementEnabled");
      var wmm = document.getElementById("WMMCapability");
      var wmmps = document.getElementById("UAPSDEnable");
      var apIso = document.getElementById("IsolationEnable");
      var ssid = document.getElementById("SSID");
      var securityTypeSelect = document.getElementById("ModeEnabled");
      var password = document.getElementById("Password_field");
      var pwdEye = document.getElementById("pwd_Eye");
      var dtim = document.getElementById("DTIMPeriod");
      var beaconInterval = document.getElementById("BeaconPeriod");
      var powerScale = document.getElementById("TransmitPower");
      var coEx = document.getElementById("CoexEnabled");

      // adapt security type
      var check_security_type = function () {
        var password_field = document.getElementById("Password_field");
        var title_pass = document.getElementById("title_pass");
        var lowLimit_error = document.getElementById("lowLimit_pass_error");
        var upLimit_error = document.getElementById("upLimit_pass_error");

        var adapt_type = function (title, placeholder, pattern, min, max) {
          title_pass.textContent = title;
          password_field.placeholder = placeholder;
          password_field.pattern = pattern;
          password_field.min = min;
          password_field.max = max;
          lowLimit_error.textContent = `String length is below the limit: ${min}`;
          upLimit_error.textContent = `String length Exceeded the limit: ${max}`;
        };

        switch (securityTypeSelect.value) {
          case "None":
            document
              .getElementById("panel_passphrase")
              .classList.add("ng-hide");
            break;
          case "4": // WEP-64
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type(
              "Key(Exactly 10 Hex digits)",
              "Enter Password web",
              WEP64_KEY_PATTERN,
              10,
              10
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          case "5": // WEP-128
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type(
              "Key(Exactly 26 Hex digits)",
              "Enter Password web",
              WEP128_KEY_PATTERN,
              26,
              26
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          case "6": // WPA3-Personal
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          case "7": // WPA2-WPA3-Personal
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          default:
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63); // pattern mean accpt all

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
        }
      };

      var checkOperationMode = () => {
        checkError_selectField(
          operationModeSelect,
          document.getElementById("select_operation_error")
        );

        // adapt with others
        if (
          operationModeSelect.value == "3" ||
          operationModeSelect.value == "4"
        ) {
          // 3: bgn, 4: bgnax
          document
            .getElementById("channel_bw_select")
            .classList.remove("ng-hide");
          checkError_selectField(
            channelBWSelect,
            document.getElementById("select_bw_error")
          );
        } else {
          document.getElementById("channel_bw_select").classList.add("ng-hide");
          document.getElementById("select_bw_error").classList.add("ng-hide");
        }
      };

      var initEvent = () => {
        enable2_4G.addEventListener("click", () => {
          enable2_4G.classList.toggle("checked");
        });

        autoChannel.addEventListener("click", () => {
          autoChannel.classList.toggle("checked");
          if (autoChannel.classList.contains("checked")) {
            channelSelect.disabled = true;
            channelBWSelect.value = "Auto";
            document
              .getElementById("select_channel_error")
              .classList.add("ng-hide"); // hide error if auto channel
          } else {
            channelSelect.disabled = false;
            checkError_selectField(
              channelSelect,
              document.getElementById("select_channel_error")
            );
          }
        });

        operationModeSelect.addEventListener("change", () => {
          checkOperationMode();
        });

        channelSelect.addEventListener("change", () => {
          checkError_selectField(
            channelSelect,
            document.getElementById("select_channel_error")
          );
        });

        channelBWSelect.addEventListener("change", () => {
          checkError_selectField(
            channelBWSelect,
            document.getElementById("select_bw_error")
          );
        });

        advertiseSSID.addEventListener("click", () => {
          advertiseSSID.classList.toggle("checked");
        });

        wmm.addEventListener("click", () => {
          wmm.classList.toggle("checked");
          if (wmm.classList.contains("checked")) {
            document.getElementById("wmm-ps-show").classList.remove("ng-hide");
          } else {
            document.getElementById("wmm-ps-show").classList.add("ng-hide");
          }
        });

        wmmps.addEventListener("click", () => {
          wmmps.classList.toggle("checked");
        });

        apIso.addEventListener("click", () => {
          apIso.classList.toggle("checked");
        });

        ssid.addEventListener("input", () => {
          checkEmpty_inputField(
            ssid,
            document.getElementById("empty_ssid_error")
          );
        });

        securityTypeSelect.addEventListener("change", () => {
          check_security_type();
        });

        password.addEventListener("input", () => {
          checkPasswordError_inputField(
            password,
            new RegExp(password.getAttribute("pattern")),
            document.getElementById("invalid_pass_error"),
            document.getElementById("empty_pass_error"),
            document.getElementById("lowLimit_pass_error"),
            document.getElementById("upLimit_pass_error")
          );
        });

        pwdEye.addEventListener("click", () => {
          hide_show_pw(pwdEye, password);
        });

        dtim.addEventListener("input", () => {
          checkMinMaxError_inputField(
            dtim,
            document.getElementById("lowLimit_dtim_error"),
            document.getElementById("upLimit_dtim_error"),
            document.getElementById("invalid_dtim_error")
          );
        });

        beaconInterval.addEventListener("input", () => {
          checkMinMaxError_inputField(
            beaconInterval,
            document.getElementById("lowLimit_beacon_error"),
            document.getElementById("upLimit_beacon_error"),
            document.getElementById("invalid_beacon_error")
          );
        });

        powerScale.addEventListener("change", () => {
          checkError_selectField(
            powerScale,
            document.getElementById("select_power_error")
          );
        });

        coEx.addEventListener("click", () => {
          coEx.classList.toggle("checked");
        });
      };

      var fillData = () => {
        var filledData = Wifi["2.4G"].SSIDs[0];
        console.log(`Fill data into Configuration: ${filledData}`);

        filledData.Configuration.EnableRadio
          ? enable2_4G.classList.add("checked")
          : enable2_4G.classList.remove("checked");
        filledData.Configuration.AutoChannel
          ? autoChannel.classList.add("checked")
          : autoChannel.classList.remove("checked");
        operationModeSelect.value = filledData.Configuration.OperationMode;
        if (autoChannel.classList.contains("checked")) {
          channelSelect.disabled = true;
          channelSelect.value = "?";
        } else {
          channelSelect.value = filledData.Configuration.Channel;
          channelSelect.disabled = false;
        }
        channelBWSelect.value = filledData.Configuration.ChannelBandwidth;
        filledData.Configuration.AdvertiseSSID
          ? advertiseSSID.classList.add("checked")
          : advertiseSSID.classList.remove("checked");
        filledData.Configuration.WMM
          ? wmm.classList.add("checked")
          : wmm.classList.remove("checked");
        if (wmm.classList.contains("checked")) {
          document.getElementById("wmm-ps-show").classList.remove("ng-hide");
          filledData.Configuration.WMMPS
            ? wmmps.classList.add("checked")
            : wmmps.classList.remove("checked");
        } else {
          document.getElementById("wmm-ps-show").classList.add("ng-hide");
        }
        filledData.Configuration.APIsolation
          ? apIso.classList.add("checked")
          : apIso.classList.remove("checked");
        ssid.value = filledData.Configuration.SSID;
        securityTypeSelect.value = filledData.Configuration.SecurityType;
        password.value = filledData.Configuration.Passphrase;
        dtim.value = filledData.Configuration.DTIM;
        beaconInterval.value = filledData.Configuration.BeaconInterval;
        powerScale.value = filledData.Configuration.PowerScale;
        filledData.Configuration.EnableCoExistence
          ? coEx.classList.add("checked")
          : coEx.classList.remove("checked");

        checkOperationMode();
        check_security_type();
      };

      // init event on input and switch and so forth entity
      initEvent();
      // fill data into FE
      fillData();

      // apply and cancel event
      document.getElementById("Apply", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          filledData.Configuration.EnableRadio =
            enable2_4G.classList.contains("checked");
          filledData.Configuration.AutoChannel =
            autoChannel.classList.contains("checked");
          filledData.Configuration.OperationMode = operationModeSelect.value;
          filledData.Configuration.Channel = channelSelect.value;
          filledData.Configuration.ChannelBandwidth = channelBWSelect.value;
          filledData.Configuration.AdvertiseSSID =
            advertiseSSID.classList.contains("checked");
          filledData.Configuration.WMM = wmm.classList.contains("checked");
          filledData.Configuration.WMMPS = wmmps.classList.contains("checked");
          filledData.Configuration.APIsolation =
            apIso.classList.contains("checked");
          filledData.Configuration.SSID = ssid.value;
          filledData.Configuration.SecurityType = securityTypeSelect.value;
          filledData.Configuration.Passphrase = password.value;
          filledData.Configuration.DTIM = dtim.value;
          filledData.Configuration.BeaconInterval = beaconInterval.value;
          filledData.Configuration.PowerScale = powerScale.value;
          filledData.Configuration.EnableCoExistence =
            coEx.classList.contains("checked");

          console.log(`Store data: ${Wifi["2.4G"].SSIDs[0]}`);
          applyElemLS("wifi-2_4G-config.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyElemLS("wifi-2_4G-config.html", "Cancel");
      });
      break;
    case "wifi-2_4G-mac_filtering.html":
      var numberOfSSIDs = Wifi["2.4G"].SSIDs.length;
      filledData = Wifi["2.4G"].SSIDs;
      console.log(`Load number of SSID: ${numberOfSSIDs}`);

      var ssid_select = document.getElementById("SSID");
      var acl_mode_select = document.getElementById("acl_mode_select");
      var tbody = document.getElementById("bodyData");
      var addBtn = document.getElementById("MACAddressControlList");
      var rowElementTemplate = document.getElementById(
        "input_field_mac_template"
      );

      //
      var applyBtn = document.getElementById("Apply");

      var addNewMAC = function (macValue) {
        const tr = rowElementTemplate.content.cloneNode(true);

        //
        const macField = tr.querySelector(".macAddrValue");
        const deleteBtn = tr.querySelector(".deleteBtn");

        const empty_error = tr.querySelector(".empty_error");
        const invalid_error = tr.querySelector(".invalid_error");

        macField.value = macValue;
        checkPattern_inputField(
          macField,
          new RegExp(WIFI_MAC_PATTERN),
          invalid_error,
          empty_error
        );

        // init event
        macField.addEventListener("input", () => {
          checkPattern_inputField(
            macField,
            new RegExp(WIFI_MAC_PATTERN),
            invalid_error,
            empty_error
          );
        });

        deleteBtn.addEventListener("click", () => {
          if (acl_mode_select.value != "0" && tbody.children.length <= 1) {
            alertDialogHandle("Keep at least one MAC address");
          } else {
            deleteDialogHandle(
              deleteBtn.closest("tr"),
              "Delete MAC Address",
              "Are you sure you want to Delete ?"
            );
          }
        });

        tbody.appendChild(tr);
      };

      var fillMacList = function () {
        // clear MAC List current
        tbody.innerHTML = "";
        for (const elem of filledData[parseInt(ssid_select.value)].MACFiltering
          .MACAddressFilter) {
          addNewMAC(elem);
        }
      };

      var fillData = function () {
        // Load SSID & WDS mode
        numberOfSSIDs = 0;
        for (const elem of Wifi["2.4G"].SSIDs) {
          var optionElement = document.createElement("option");
          optionElement.value = numberOfSSIDs; // as value, corresponds to index of itself in SSIDs array
          numberOfSSIDs += 1;
          optionElement.label = elem.Configuration.SSID;
          optionElement.textContent = elem.Configuration.SSID;
          ssid_select.appendChild(optionElement);
        }

        ssid_select.value = 0; // default SSID cannot remove so we fill data and show the first element

        // ACL mode
        acl_mode_select.value = filledData[0].MACFiltering.ACLMode;
        fillMacList();
      };

      var initEvent = () => {
        ssid_select.addEventListener("change", () => {
          acl_mode_select.value =
            filledData[parseInt(ssid_select.value)].MACFiltering.ACLMode;
          fillMacList();
        });

        acl_mode_select.addEventListener("change", () => {
          if (acl_mode_select.value != "0") {
            if (tbody.children.length === 0) {
              alertDialogHandle("Please add MAC Address");
            }
          }
        });

        addBtn.addEventListener("click", () => {
          addNewMAC("");
        });
      };

      initEvent();
      fillData();

      // Apply and Cancel
      applyBtn.addEventListener("click", () => {
        if (acl_mode_select.value != "0" && tbody.children.length === 0) {
          alertDialogHandle("Please add MAC Address");
          // escape event
          return;
        }
        if (checkError_show(document.querySelectorAll(".error"))) {
          filledData[parseInt(ssid_select.value)].MACFiltering.ACLMode =
            acl_mode_select.value;

          // clear MAC list after update new one
          filledData[
            parseInt(ssid_select.value)
          ].MACFiltering.MACAddressFilter.length = 0;
          for (const elem of document.querySelectorAll(".macAddrValue")) {
            filledData[
              parseInt(ssid_select.value)
            ].MACFiltering.MACAddressFilter.push(elem.value);
          }

          applyElemLS("wifi-2_4G-mac_filtering.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyElemLS("wifi-2_4G-mac_filtering.html", "Cancel");
      });
      break;
    case "wifi-2_4G-ssids.html":
      console.log(`Load ${item}\n${JSON.stringify(Wifi["2.4G"])}`);
      var addWifiBtn = document.getElementById("AddBtn");
      var tableHeader = document.getElementById("headerTable");
      var tbody = document.getElementById("bodyData");
      var add_wifi_form_template = document.getElementById(
        "addWifiFormTemplate"
      );

      var applyBtn = document.getElementById("Apply");
      var cancelBtn = document.getElementById("Cancel");
      var wifi_detail_template = document.getElementById("wifi_detail");
      var wifi_infor_template = document.getElementById("rowElementTemplate");

      var add_lock = false; // if lock --> cannot create more add_wifi_form
      var detail_on_show = false;

      // buffer to store new but not yet apply of Wifi
      var wifiInfoBuffer = Wifi["2.4G"].SSIDs;

      // adapt security type
      var check_security_type = function (
        current_parent,
        currentRow,
        alert_on
      ) {
        var password_field = current_parent.getElementById("Password_field");
        var rekeyInterval = current_parent.getElementById("rekeyInterval");
        var title_pass = current_parent.getElementById("title_pass");
        var lowLimit_error = current_parent.getElementById(
          "lowLimit_pass_error"
        );
        var upLimit_error = current_parent.getElementById("upLimit_pass_error");

        var adapt_type = function (title, placeholder, pattern, min, max) {
          title_pass.textContent = title;
          password_field.placeholder = placeholder;
          password_field.pattern = pattern;
          password_field.min = min;
          password_field.max = max;
          lowLimit_error.textContent = `String length is below the limit: ${min}`;
          upLimit_error.textContent = `String length Exceeded the limit: ${max}`;
        };

        switch (currentRow.querySelector(".security_type_select").value) {
          case "None":
            current_parent
              .getElementById("panel_passphrase")
              .classList.add("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            break;
          case "4": // WEP-64
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type(
              "Key(Exactly 10 Hex digits)",
              "Enter Password web",
              WEP64_KEY_PATTERN,
              10,
              10
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          case "5": // WEP-128
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type(
              "Key(Exactly 26 Hex digits)",
              "Enter Password web",
              WEP128_KEY_PATTERN,
              26,
              26
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          case "6": // WPA3-Personal
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          case "7": // WPA2-WPA3-Personal
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          default:
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = false;

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63); // pattern mean accpt all

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
        }
      };

      var save_then_destroy_detail_row = function (currentRow) {
        // check detail_error and store the change at Wifi
        var currentRowIndex = Array.from(
          currentRow.parentElement.children
        ).indexOf(
          document.getElementById("detail_panel").previousElementSibling
        );

        // store the previous detail pannel
        if (checkError_show(document.querySelectorAll(".detail_error"))) {
          // console.log(
          //   `On-going store changed element, index: ${currentRowIndex}, state now: ${JSON.stringify(
          //     wifiInfoBuffer[currentRowIndex]
          //   )}`
          // );
          wifiInfoBuffer[currentRowIndex].Configuration.Passphrase =
            document.getElementById("Password_field").value;
          wifiInfoBuffer[currentRowIndex].RekeyInterval =
            document.getElementById("RekeyingInterval").value;
          wifiInfoBuffer[currentRowIndex].Configuration.WMM = document
            .getElementById("WMMCapability")
            .classList.contains("checked");
          wifiInfoBuffer[currentRowIndex].Configuration.WMMPS = document
            .getElementById("UAPSDEnable")
            .classList.contains("checked");
          wifiInfoBuffer[currentRowIndex].Configuration.APIsolation = document
            .getElementById("IsolationEnable")
            .classList.contains("checked");
          wifiInfoBuffer[currentRowIndex].Maxconnected =
            document.getElementById("MaxAssociatedDevices").value;
          wifiInfoBuffer[currentRowIndex].BridgeName = document.getElementById(
            "X_LANTIQ_COM_Vendor_BridgeName"
          ).value;
          console.log(
            `Store the change before jump to other detail Wifi: ${JSON.stringify(
              wifiInfoBuffer[currentRowIndex]
            )}`
          );
        } else {
          console.log(
            "Do not store the change Wifi because error still remain"
          );
        }

        // destroy step
        for (const elem of document.querySelectorAll(".detailBtn"))
          elem.classList.remove("gemtek-less-btn");
        console.log(document.getElementById("detail_panel"));
        tbody.removeChild(document.getElementById("detail_panel"));
      };

      var make_detail_row = function (currentRow) {
        const tr_detail = wifi_detail_template.content.cloneNode(true);

        // extra row template
        var password_field = tr_detail.getElementById("Password_field");
        var pwd_Eye = tr_detail.getElementById("pwd_Eye");
        var rekeyInterval = tr_detail.getElementById("RekeyingInterval");
        var wmmBtn = tr_detail.getElementById("WMMCapability");
        var wmmpsBtn = tr_detail.getElementById("UAPSDEnable");
        var apIso = tr_detail.getElementById("IsolationEnable");
        var maxAssociatedDevices = tr_detail.getElementById(
          "MaxAssociatedDevices"
        );
        var bridgeName = tr_detail.getElementById(
          "X_LANTIQ_COM_Vendor_BridgeName"
        );

        check_security_type(tr_detail, currentRow, false);

        // @TODO fill data and check Error
        var currentRowIndex = Array.from(
          currentRow.parentElement.children
        ).indexOf(currentRow);
        var filledData = wifiInfoBuffer[currentRowIndex];

        console.log(
          `Click on row (exclude detail): ${currentRowIndex}, data on row: ${JSON.stringify(
            filledData
          )}`
        );

        password_field.value = filledData.Configuration.Passphrase;
        rekeyInterval.value = filledData.RekeyInterval;
        filledData.Configuration.WMM
          ? wmmBtn.classList.add("checked")
          : wmmBtn.classList.remove("checked");
        if (filledData.Configuration.WMM === true) {
          filledData.Configuration.WMMPS
            ? wmmpsBtn.classList.add("checked")
            : wmmpsBtn.classList.remove("checked");
        } else {
          tr_detail.getElementById("wmm-ps-show").classList.add("ng-hide");
        }

        filledData.Configuration.APIsolation
          ? apIso.classList.add("checked")
          : apIso.classList.remove("checked");
        maxAssociatedDevices.value = filledData.Maxconnected;
        bridgeName.value = filledData.BridgeName;

        var invalid_pass_error = tr_detail.getElementById("invalid_pass_error");
        var empty_pass_error = tr_detail.getElementById("empty_pass_error");
        var lowLimit_pass_error = tr_detail.getElementById(
          "lowLimit_pass_error"
        );
        var upLimit_pass_error = tr_detail.getElementById("upLimit_pass_error");
        var range_rekey_error = tr_detail.getElementById("range_rekey_error");
        var empty_rekey_error = tr_detail.getElementById("empty_rekey_error");
        var min_sta_error = tr_detail.getElementById("min_sta_error");
        var max_sta_error = tr_detail.getElementById("max_sta_error");
        var empty_sta_error = tr_detail.getElementById("empty_sta_error");
        var empty_bridge_error = tr_detail.getElementById("empty_bridge_error");

        var wmmpsShow = tr_detail.getElementById("wmm-ps-show");

        checkPasswordError_inputField(
          password_field,
          new RegExp(password_field.getAttribute("pattern")),
          invalid_pass_error,
          empty_pass_error,
          lowLimit_pass_error,
          upLimit_pass_error
        );
        checkRange_inputField(
          rekeyInterval,
          range_rekey_error,
          empty_rekey_error
        );
        checkMinMaxError_inputField(
          maxAssociatedDevices,
          min_sta_error,
          max_sta_error,
          empty_sta_error
        );
        checkEmpty_inputField(bridgeName, empty_bridge_error);

        // @TODO event init on input field
        password_field.addEventListener("input", () => {
          console.log(password_field.getAttribute("pattern"));
          checkPasswordError_inputField(
            password_field,
            new RegExp(password_field.getAttribute("pattern")),
            invalid_pass_error,
            empty_pass_error,
            lowLimit_pass_error,
            upLimit_pass_error
          );
        });

        pwd_Eye.addEventListener("click", () => {
          hide_show_pw(pwd_Eye, password_field);
        });

        rekeyInterval.addEventListener("input", () => {
          checkRange_inputField(
            rekeyInterval,
            range_rekey_error,
            empty_rekey_error
          );
        });

        wmmBtn.addEventListener("click", () => {
          wmmBtn.classList.toggle("checked");
          if (wmmBtn.classList.contains("checked")) {
            wmmpsShow.classList.remove("ng-hide");
          } else {
            wmmpsShow.classList.add("ng-hide");
          }
        });

        wmmpsBtn.addEventListener("click", () => {
          wmmpsBtn.classList.toggle("checked");
        });

        apIso.addEventListener("click", () => {
          apIso.classList.toggle("checked");
        });

        maxAssociatedDevices.addEventListener("input", () => {
          checkMinMaxError_inputField(
            maxAssociatedDevices,
            min_sta_error,
            max_sta_error,
            empty_sta_error
          );
        });

        bridgeName.addEventListener("input", () => {
          checkEmpty_inputField(bridgeName, empty_bridge_error);
        });

        return tr_detail;
      };

      var append_detail_function_right_below = function (currentRow) {
        // destroy must be act after store change
        currentRow.querySelector(".detailBtn").classList.add("gemtek-less-btn");

        currentRow.parentNode.insertBefore(
          make_detail_row(currentRow),
          currentRow.nextSibling
        );
      };

      // after add button is accepted --> add more row on tbody wifi
      var append_wifi_table = function (ssid_info) {
        const tr = wifi_infor_template.content.cloneNode(true);

        //
        const ssid = tr.querySelector(".ssid");
        const security_type_select = tr.querySelector(".security_type_select");
        const wps_enable = tr.querySelector(".wps_enable");
        const deleteBtn = tr.querySelector(".delete_wifi");
        const detailBtn = tr.querySelector(".detailBtn");

        // error
        const ssid_empty_error = tr.querySelector(".wifi_error");
        // Generate a unique ID for the checkbox
        var uniqueId = "checkbox_" + Math.floor(Math.random() * 999999999); // generating unique IDs

        // Update the ID of the checkbox and its associated labels
        tr.querySelector("input[type='checkbox']").id = uniqueId;
        tr.querySelector("label[for]").htmlFor = uniqueId;

        // fill data
        ssid.value = ssid_info.Configuration.SSID;
        security_type_select.value = ssid_info.Configuration.SecurityType;
        if (
          security_type_select.value === "None" ||
          security_type_select.value == 4 ||
          security_type_select.value == 5 ||
          security_type_select.value == 6 ||
          security_type_select.value == 7
        ) {
          wps_enable.disabled = true;
        } else {
          wps_enable.disabled = false;
          wps_enable.checked = ssid_info.WPSEnabled;
        }

        // checkError at init
        checkEmpty_inputField(ssid, ssid_empty_error);

        // make event
        ssid.addEventListener("input", () => {
          checkEmpty_inputField(ssid, ssid_empty_error);
        });

        security_type_select.addEventListener("change", () => {
          var currentRow = security_type_select.closest("tr");
          if (detail_on_show === false) {
            detail_on_show = true;
            append_detail_function_right_below(currentRow);
            check_security_type(document, currentRow, true);
          } else {
            if (
              currentRow.nextElementSibling ===
              document.getElementById("detail_panel")
            ) {
              // @TODO modify corresponding security Type
              check_security_type(document, currentRow, true);
            } else {
              // if other is click --> destroy current and make new one below
              save_then_destroy_detail_row(currentRow);
              append_detail_function_right_below(currentRow);
              check_security_type(document, currentRow, true);
            }
          }
        });

        deleteBtn.addEventListener("click", () => {
          if (tbody.querySelectorAll("tr").length === 1) {
            // @TODO alert if only remain 1
            show_alert_dialog("Default SSID cannot be removed");
          } else {
            var currentRow = deleteBtn.closest("tr");

            // remove at Wifi variable
            var currentRowIndex = Array.from(
              currentRow.parentElement.children
            ).indexOf(currentRow);
            wifiInfoBuffer.splice(currentRowIndex, 1);
            console.log(
              `Remove Wifi --> Wifi now (length ${
                wifiInfoBuffer.length
              }): ${JSON.stringify(wifiInfoBuffer)}`
            );

            // remove if detail panel on it
            if (
              currentRow.nextElementSibling ===
              document.getElementById("detail_panel")
            ) {
              detail_on_show = false;
              document.getElementById("detail_panel").remove();
            }
            // FE remove
            currentRow.remove();
          }
        });

        detailBtn.addEventListener("click", () => {
          var currentRow = detailBtn.closest("tr");

          // if no detail is showing
          if (detail_on_show === false) {
            detail_on_show = true;
            append_detail_function_right_below(currentRow);
          } else {
            // check if detail is currentRow's
            // if --> destroy
            if (
              currentRow.nextElementSibling ===
              document.getElementById("detail_panel")
            ) {
              detail_on_show = false;
              save_then_destroy_detail_row(currentRow);
            } else {
              // esle --> destroy + make one below
              save_then_destroy_detail_row(currentRow);
              append_detail_function_right_below(currentRow);
            }
          }
        });

        tbody.appendChild(tr);
      };

      var make_add_wifi_form = function () {
        const formAddWifi = add_wifi_form_template.content.cloneNode(true);

        var newWifiInfo = {
          WPSEnabled: false,
          RekeyInterval: "3600",
          Maxconnected: "255",
          BridgeName: "br-lan",
          Configuration: {
            EnableRadio: false,
            AutoChannel: true,
            OperationMode: 4,
            Channel: 0,
            ChannelBandwidth: 2,
            AdvertiseSSID: true,
            WMM: true,
            WMMPS: true,
            APIsolation: false,
            SSID: "",
            SecurityType: 0,
            Passphrase: "password",
            DTIM: "",
            BeaconInterval: "",
            PowerScale: "",
            EnableCoExistence: false,
          },
          WDS: {
            WDSMode: 0,
            MACAddress: [],
          },
          MACFiltering: {
            ACLMode: 1,
            MACAddressFilter: [],
          },
        };

        const ssid_field = formAddWifi.querySelector(".add_ssid");
        const ap_type = formAddWifi.querySelector(".ap_type");
        const security_type = formAddWifi.querySelector(".security_type");
        const wps = formAddWifi.querySelector(".wps");
        const confirm_add_btn = formAddWifi.querySelector(".confirm_add");
        const cancel_add_btn = formAddWifi.querySelector(".cancel_add");

        // error and toggle icon for 4 field above
        const empty_ssid_error = formAddWifi.querySelector(".empty_ssid_error");
        const empty_ap_type_error = formAddWifi.querySelector(
          ".empty_ap_type_error"
        );
        const security_type_error =
          formAddWifi.querySelector(".security_error");

        // check Error at init
        checkEmpty_inputField(ssid_field, empty_ssid_error);
        checkEmpty_inputField(ap_type, empty_ap_type_error);
        checkError_selectField(security_type, security_type_error);

        // make event on input or click
        ssid_field.addEventListener("input", () => {
          checkEmpty_inputField(ssid_field, empty_ssid_error);
        });

        ap_type.addEventListener("change", () => {
          checkEmpty_inputField(ap_type, empty_ap_type_error);
        });

        security_type.addEventListener("change", () => {
          checkError_selectField(security_type, security_type_error);
          if (
            security_type.value == "None" ||
            security_type.value == 4 ||
            security_type.value == 5 ||
            security_type.value == 6 ||
            security_type.value == 7
          ) {
            wps.disabled = true;
            wps.checked = false;
            window.alert("WPS function only supports WPA and WPA2 mode.");
          } else {
            wps.disabled = false;
          }
        });

        //
        tableHeader.appendChild(formAddWifi);

        confirm_add_btn.addEventListener("click", () => {
          add_lock = false;
          if (
            checkError_show(document.querySelectorAll(".add_wifi_error")) ===
            true
          ) {
            newWifiInfo.Configuration.SSID = ssid_field.value;
            newWifiInfo.Configuration.SecurityType = security_type.value;
            newWifiInfo.WPSEnabled = wps.checked;
            // remove form
            tableHeader.removeChild(tableHeader.lastElementChild);
            // append table Wifi
            wifiInfoBuffer.push(newWifiInfo);
            append_wifi_table(newWifiInfo);
          }
        });

        cancel_add_btn.addEventListener("click", () => {
          add_lock = false;
          tableHeader.removeChild(tableHeader.lastElementChild);
        });
      };

      // fill data at load page
      var fillData = function () {
        for (const elem of Wifi["2.4G"].SSIDs) {
          append_wifi_table(elem);
        }
      };

      fillData();

      // event init on total Page
      addWifiBtn.addEventListener("click", () => {
        if (!add_lock) {
          add_lock = true;
          make_add_wifi_form();
        }
      });

      applyBtn.addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".wifi_error"))) {
          var listSSIDs = document.querySelectorAll(".ssid");
          var listSecurityType = document.querySelectorAll(
            ".security_type_select"
          );
          var listWPSEnable = document.querySelectorAll(".wps_enable");
          console.log(`Apply press, store ${listSSIDs.length} element`);
          for (var i = 0; i < listSSIDs.length; i++) {
            wifiInfoBuffer[i].Configuration.SSID = listSSIDs[i].value;
            wifiInfoBuffer[i].Configuration.SecurityType =
              listSecurityType[i].value;
            wifiInfoBuffer[i].WPSEnabled = listWPSEnable[i].checked;
          }

          // store current detail panel info
          var detail_panel = document.getElementById("detail_panel");
          if (detail_panel !== null) {
            var currentRowIndex = Array.from(
              detail_panel.parentElement.children
            ).indexOf(detail_panel.previousElementSibling);

            wifiInfoBuffer[currentRowIndex].Configuration.Passphrase =
              document.getElementById("Password_field").value;
            wifiInfoBuffer[currentRowIndex].RekeyInterval =
              document.getElementById("RekeyingInterval").value;
            wifiInfoBuffer[currentRowIndex].Configuration.WMM = document
              .getElementById("WMMCapability")
              .classList.contains("checked");
            wifiInfoBuffer[currentRowIndex].Configuration.WMMPS = document
              .getElementById("UAPSDEnable")
              .classList.contains("checked");
            wifiInfoBuffer[currentRowIndex].Configuration.APIsolation = document
              .getElementById("IsolationEnable")
              .classList.contains("checked");
            wifiInfoBuffer[currentRowIndex].Maxconnected =
              document.getElementById("MaxAssociatedDevices").value;
            wifiInfoBuffer[currentRowIndex].BridgeName =
              document.getElementById("X_LANTIQ_COM_Vendor_BridgeName").value;
          }

          console.log(
            `Apply accept, data Wifi at last: ${JSON.stringify(
              Wifi["2.4G"].SSIDs
            )}`
          );
          applyElemLS("wifi-2_4G-ssids.html", "Apply", Wifi);
        }
      });

      cancelBtn.addEventListener("click", () => {
        applyElemLS("wifi-2_4G-ssids.html", "Cancel");
      });
      break;
    case "wifi-2_4G-statistics.html":
      var numberOfSSIDs = Wifi["2.4G"].SSIDs.length;
      filledData = Wifi["2.4G"].SSIDs;
      console.log(`Load number of SSID: ${numberOfSSIDs}`);

      var ssid_select = document.getElementById("SSID");

      // Load SSID & WDS mode
      numberOfSSIDs = 0;
      for (const elem of Wifi["2.4G"].SSIDs) {
        var optionElement = document.createElement("option");
        optionElement.value = numberOfSSIDs; // as value, corresponds to index of itself in SSIDs array
        numberOfSSIDs += 1;
        optionElement.label = elem.Configuration.SSID;
        optionElement.textContent = elem.Configuration.SSID;
        ssid_select.appendChild(optionElement);
      }

      checkError_selectField(
        ssid_select,
        document.getElementById("select_error")
      );
      ssid_select.addEventListener("change", () => {
        checkError_selectField(
          ssid_select,
          document.getElementById("select_error")
        );
      });
      break;
    case "wifi-2_4G-wds.html":
      var numberOfSSIDs = Wifi["2.4G"].SSIDs.length;
      filledData = Wifi["2.4G"].SSIDs;
      console.log(`Load number of SSID: ${numberOfSSIDs}`);

      var ssid_select = document.getElementById("SSID");
      var wds_select_mode = document.getElementById(
        "DeviceWiFiAccessPointX_GTK_Vendor_WaveWDSMode"
      );

      // option Hybrid
      var add_btn = document.getElementById("Add");

      // panel
      var hybrid_mode_panel = document.getElementById("wds_mode_hybrid");
      var mac_input_panel = document.getElementById("mac_input_panel");
      var tbody = document.getElementById("mac_addr_list");
      var rowElementTemplate = document.getElementById("rowElement");

      // button & input field inside panel
      var closeBtn = document.getElementById("Close");
      var addMacBtn = document.getElementById("AddMac");
      var mac_input_field = document.getElementById(
        "DeviceWiFiAccessPointX_GTK_Vendor_WaveWDSPeers"
      );

      var addNewMAC = function (macValue) {
        const tr = rowElementTemplate.content.cloneNode(true);

        //
        const macField = tr.querySelector(".macAddrValue");
        const deleteBtn = tr.querySelector(".deleteBtn");

        macField.textContent = macValue;
        deleteBtn.addEventListener("click", () => {
          if (window.confirm("Are you sure you want to Delete?")) {
            deleteBtn.closest("tr").remove();
          }
        });

        tbody.appendChild(tr);
      };

      var adaptWdsMode = () => {
        if (wds_select_mode.value == "1") {
          // Hybrid --> load MAC Address too
          hybrid_mode_panel.classList.remove("ng-hide");
          add_btn.classList.remove("ng-hide");
          // remove tbody but the add-MAC panel
          while (tbody.children.length > 1) {
            tbody.removeChild(tbody.children[1]);
          }
          // load current
          if (ssid_select.value !== "?") {
            for (const elem of filledData[parseInt(ssid_select.value)].WDS
              .MACAddress) {
              addNewMAC(elem);
            }
          }
        } else {
          hybrid_mode_panel.classList.add("ng-hide");
          add_btn.classList.add("ng-hide");
        }
      };

      var fillData = function () {
        // Load SSID & WDS mode
        numberOfSSIDs = 0;
        for (const elem of Wifi["2.4G"].SSIDs) {
          var optionElement = document.createElement("option");
          optionElement.value = numberOfSSIDs; // as value, corresponds to index of itself in SSIDs array
          numberOfSSIDs += 1;
          optionElement.label = elem.Configuration.SSID;
          optionElement.textContent = elem.Configuration.SSID;
          document.getElementById("SSID").appendChild(optionElement);
        }

        ssid_select.value = 0; // default SSID cannot remove so we fill data and show the first element
        checkError_selectField(
          document.getElementById("SSID"),
          document.getElementById("empty_ssid_error")
        );

        // WDS
        wds_select_mode.value = filledData[0].WDS.WDSMode;
        adaptWdsMode();
      };

      var initEvent = function () {
        ssid_select.addEventListener("change", () => {
          if (
            checkError_selectField(
              document.getElementById("SSID"),
              document.getElementById("empty_ssid_error")
            )
          ) {
            wds_select_mode.value =
              filledData[parseInt(ssid_select.value)].WDS.WDSMode;
            adaptWdsMode();
          }
        });

        wds_select_mode.addEventListener("change", () => {
          adaptWdsMode();
        });

        add_btn.addEventListener("click", () => {
          mac_input_panel.classList.remove("ng-hide");
          mac_input_field.value = "";
          checkEmpty_inputField(
            mac_input_field,
            document.getElementById("empty_mac_error")
          );
        });

        // add Btn panel show
        mac_input_field.addEventListener("input", () => {
          checkPattern_inputField(
            mac_input_field,
            new RegExp(WIFI_MAC_PATTERN),
            document.getElementById("pattern_mac_error"),
            document.getElementById("empty_mac_error")
          );
        });

        addMacBtn.addEventListener("click", () => {
          if (
            checkPattern_inputField(
              mac_input_field,
              new RegExp(WIFI_MAC_PATTERN),
              document.getElementById("pattern_mac_error"),
              document.getElementById("empty_mac_error")
            )
          ) {
            addNewMAC(mac_input_field.value);
            mac_input_panel.classList.add("ng-hide");
          }
        });

        closeBtn.addEventListener("click", () => {
          mac_input_panel.classList.add("ng-hide");
        });
      };

      fillData();
      initEvent();

      document.getElementById("Modify").addEventListener("click", () => {
        if (checkError_show(document.getElementById("empty_ssid_error"))) {
          filledData[parseInt(ssid_select.value)].WDS.WDSMode =
            wds_select_mode.value;

          filledData[parseInt(ssid_select.value)].WDS.MACAddress.length = 0;

          // if (wds_select_mode.value === "1"){
          for (const elem of document.querySelectorAll(".macAddrValue")) {
            filledData[parseInt(ssid_select.value)].WDS.MACAddress.push(
              elem.textContent
            );
          }
          // }

          applyElemLS("wifi-2_4G-wds.html", "Apply", Wifi);
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyElemLS("wifi-2_4G-wds.html", "Cancel");
      });
      break;
    case "wifi-2_4G-wps.html":
      var numberOfSSIDs = Wifi["2.4G"].SSIDs.length;
      console.log(`Load number of SSID data: ${numberOfSSIDs}`);
      for (const elem of Wifi["2.4G"].SSIDs) {
        var optionElement = document.createElement("option");
        optionElement.value = numberOfSSIDs;
        optionElement.label = elem.Configuration.SSID;
        optionElement.textContent = elem.Configuration.SSID;
        document.getElementById("SSID").appendChild(optionElement);
      }

      var endPoint = document.getElementById("EndpointPIN");
      endPoint.addEventListener("input", () => {
        checkEmpty_inputField(
          endPoint,
          document.getElementById("invalid_endpoint_error")
        );
      });

      var macAddr = document.getElementById("AuthorizedMac");
      macAddr.addEventListener("input", () => {
        if (!new RegExp(WIFI_MAC_PATTERN).test(macAddr.value)) {
          document
            .getElementById("invalid_mac_error")
            .classList.remove("ng-hide");
        } else {
          document.getElementById("invalid_mac_error").classList.add("ng-hide");
        }
      });

      document.getElementById("ResetWPS").addEventListener("click", () => {
        applyElemLS("wifi-2_4G-wps.html", "Cancel");
      });

      document.getElementById("ConnectDevice").addEventListener("click", () => {
        if (
          !checkEmpty_inputField(
            endPoint,
            document.getElementById("invalid_endpoint_error")
          )
        ) {
          return;
        }

        if (!new RegExp(WIFI_MAC_PATTERN).test(macAddr.value)) {
          document
            .getElementById("invalid_mac_error")
            .classList.remove("ng-hide");
          return;
        } else {
          document.getElementById("invalid_mac_error").classList.add("ng-hide");
        }

        applyElemLS("wifi-2_4G-wps.html", "Cancel");
      });
      break;
    case "wifi-5G-config.html":
      console.log(`Load ${item}\n${JSON.stringify(Wifi["5G"])}`);

      var enable5G = document.getElementById("Enable");
      var autoChannel = document.getElementById("AutoChannelEnable");
      var useDFSChannel = document.getElementById("IEEE80211hEnabled");
      var operationModeSelect = document.getElementById("OperatingStandards");
      var channelSelect = document.getElementById("Channel");
      var channelBWSelect = document.getElementById(
        "OperatingChannelBandwidth"
      );

      var advertiseSSID = document.getElementById("SSIDAdvertisementEnabled");
      var wmm = document.getElementById("WMMCapability");
      var wmmps = document.getElementById("UAPSDEnable");
      var apIso = document.getElementById("IsolationEnable");

      var ssid = document.getElementById("SSID");
      var securityTypeSelect = document.getElementById("ModeEnabled");
      var password = document.getElementById("Password_field");
      var pwdEye = document.getElementById("pwd_Eye");

      var dtim = document.getElementById("DTIMPeriod");
      var beaconInterval = document.getElementById("BeaconPeriod");
      var powerScale = document.getElementById("TransmitPower");
      var dfsEna = document.getElementById("DFS");

      // adapt security type
      var check_security_type = function () {
        var password_field = document.getElementById("Password_field");
        var title_pass = document.getElementById("title_pass");
        var lowLimit_error = document.getElementById("lowLimit_pass_error");
        var upLimit_error = document.getElementById("upLimit_pass_error");

        var adapt_type = function (title, placeholder, pattern, min, max) {
          title_pass.textContent = title;
          password_field.placeholder = placeholder;
          password_field.pattern = pattern;
          password_field.min = min;
          password_field.max = max;
          lowLimit_error.textContent = `String length is below the limit: ${min}`;
          upLimit_error.textContent = `String length Exceeded the limit: ${max}`;
        };

        switch (securityTypeSelect.value) {
          case "None":
            document
              .getElementById("panel_passphrase")
              .classList.add("ng-hide");
            break;
          case "4": // WEP-64
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type(
              "Key(Exactly 10 Hex digits)",
              "Enter Password web",
              WEP64_KEY_PATTERN,
              10,
              10
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          case "5": // WEP-128
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type(
              "Key(Exactly 26 Hex digits)",
              "Enter Password web",
              WEP128_KEY_PATTERN,
              26,
              26
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          case "6": // WPA3-Personal
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          case "7": // WPA2-WPA3-Personal
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
          default:
            document
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63); // pattern mean accpt all

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              document.getElementById("invalid_pass_error"),
              document.getElementById("empty_pass_error"),
              document.getElementById("lowLimit_pass_error"),
              document.getElementById("upLimit_pass_error")
            );
            break;
        }
      };

      const avaiBW = ["20MHz", "40MHz", "80MHz", "160MHz", "Auto"];
      var adaptOperationMode = () => {
        checkError_selectField(
          operationModeSelect,
          document.getElementById("select_operation_error")
        );

        // remove option exclude selected
        while (channelBWSelect.options.length > 1) {
          channelBWSelect.remove(1);
        }

        // adapt with others

        if (operationModeSelect.value == "1") {
          // 1: a
          document.getElementById("channel_bw_select").classList.add("ng-hide");
          document.getElementById("select_bw_error").classList.add("ng-hide");
        } else if (operationModeSelect.value == "2") {
          // 2: an, 3: anac, 4: anacax
          for (var i = 0; i < 2; i++) {
            // in an mode, just have 20MHz and 40MHz & Auto
            var optionElement = document.createElement("option");
            optionElement.value = i; // as value, corresponds to index of itself in SSIDs array
            optionElement.label = avaiBW[i];
            optionElement.textContent = avaiBW[i];
            channelBWSelect.appendChild(optionElement);
          }
          var optionElement = document.createElement("option");
          optionElement.value = avaiBW.length - 1; // as value, corresponds to index of itself in SSIDs array
          optionElement.label = avaiBW[avaiBW.length - 1];
          optionElement.textContent = avaiBW[avaiBW.length - 1];
          channelBWSelect.appendChild(optionElement);

          document
            .getElementById("channel_bw_select")
            .classList.remove("ng-hide");
          checkError_selectField(
            channelBWSelect,
            document.getElementById("select_bw_error")
          );
        } else {
          for (var i = 0; i < avaiBW.length; i++) {
            var optionElement = document.createElement("option");
            optionElement.value = i; // as value, corresponds to index of itself in SSIDs array
            optionElement.label = avaiBW[i];
            optionElement.textContent = avaiBW[i];
            channelBWSelect.appendChild(optionElement);
          }
          document
            .getElementById("channel_bw_select")
            .classList.remove("ng-hide");
          checkError_selectField(
            channelBWSelect,
            document.getElementById("select_bw_error")
          );
        }
      };

      var initEvent = () => {
        useDFSChannel.addEventListener("click", () => {
          useDFSChannel.classList.toggle("checked");
        });

        enable5G.addEventListener("click", () => {
          enable5G.classList.toggle("checked");
        });

        autoChannel.addEventListener("click", () => {
          autoChannel.classList.toggle("checked");
          if (autoChannel.classList.contains("checked")) {
            channelSelect.disabled = true;
            channelBWSelect.value = "Auto";
            document
              .getElementById("select_channel_error")
              .classList.add("ng-hide"); // hide error if auto channel
          } else {
            channelSelect.disabled = false;
            checkError_selectField(
              channelSelect,
              document.getElementById("select_channel_error")
            );
          }
        });

        operationModeSelect.addEventListener("change", () => {
          adaptOperationMode();
        });

        channelSelect.addEventListener("change", () => {
          checkError_selectField(
            channelSelect,
            document.getElementById("select_channel_error")
          );
        });

        channelBWSelect.addEventListener("change", () => {
          checkError_selectField(
            channelBWSelect,
            document.getElementById("select_bw_error")
          );
        });

        advertiseSSID.addEventListener("click", () => {
          advertiseSSID.classList.toggle("checked");
        });

        console.log();
        wmm.addEventListener("click", () => {
          wmm.classList.toggle("checked");
          if (wmm.classList.contains("checked")) {
            document.getElementById("wmm-ps-show").classList.remove("ng-hide");
          } else {
            document.getElementById("wmm-ps-show").classList.add("ng-hide");
          }
        });

        wmmps.addEventListener("click", () => {
          wmmps.classList.toggle("checked");
        });

        apIso.addEventListener("click", () => {
          apIso.classList.toggle("checked");
        });

        ssid.addEventListener("input", () => {
          checkEmpty_inputField(
            ssid,
            document.getElementById("empty_ssid_error")
          );
        });

        securityTypeSelect.addEventListener("change", () => {
          check_security_type();
        });

        password.addEventListener("input", () => {
          checkPasswordError_inputField(
            password,
            new RegExp(password.getAttribute("pattern")),
            document.getElementById("invalid_pass_error"),
            document.getElementById("empty_pass_error"),
            document.getElementById("lowLimit_pass_error"),
            document.getElementById("upLimit_pass_error")
          );
        });

        pwdEye.addEventListener("click", () => {
          hide_show_pw(pwdEye, password);
        });

        dtim.addEventListener("input", () => {
          checkMinMaxError_inputField(
            dtim,
            document.getElementById("lowLimit_dtim_error"),
            document.getElementById("upLimit_dtim_error"),
            document.getElementById("invalid_dtim_error")
          );
        });

        beaconInterval.addEventListener("input", () => {
          checkMinMaxError_inputField(
            beaconInterval,
            document.getElementById("lowLimit_beacon_error"),
            document.getElementById("upLimit_beacon_error"),
            document.getElementById("invalid_beacon_error")
          );
        });

        powerScale.addEventListener("change", () => {
          checkError_selectField(
            powerScale,
            document.getElementById("select_power_error")
          );
        });

        dfsEna.addEventListener("click", () => {
          dfsEna.classList.toggle("checked");
        });
      };

      var fillData = () => {
        var filledData = Wifi["5G"].SSIDs[0];
        console.log(`Fill data into Configuration: ${filledData}`);

        filledData.Configuration.EnableRadio
          ? enable5G.classList.add("checked")
          : enable5G.classList.remove("checked");
        filledData.Configuration.AutoChannel
          ? autoChannel.classList.add("checked")
          : autoChannel.classList.remove("checked");
        filledData.Configuration.UseDFSChannels
          ? useDFSChannel.classList.add("checked")
          : useDFSChannel.classList.remove("checked");

        operationModeSelect.value = filledData.Configuration.OperationMode;

        if (autoChannel.classList.contains("checked")) {
          channelSelect.disabled = true;
          channelSelect.value = "?";
        } else {
          channelSelect.value = filledData.Configuration.Channel;
          channelSelect.disabled = false;
        }

        channelBWSelect.value = filledData.Configuration.ChannelBandwidth;
        filledData.Configuration.AdvertiseSSID
          ? advertiseSSID.classList.add("checked")
          : advertiseSSID.classList.remove("checked");
        filledData.Configuration.WMM
          ? wmm.classList.add("checked")
          : wmm.classList.remove("checked");
        if (wmm.classList.contains("checked")) {
          document.getElementById("wmm-ps-show").classList.remove("ng-hide");
          filledData.Configuration.WMMPS
            ? wmmps.classList.add("checked")
            : wmmps.classList.remove("checked");
        } else {
          document.getElementById("wmm-ps-show").classList.add("ng-hide");
        }
        filledData.Configuration.APIsolation
          ? apIso.classList.add("checked")
          : apIso.classList.remove("checked");
        ssid.value = filledData.Configuration.SSID;
        securityTypeSelect.value = filledData.Configuration.SecurityType;
        password.value = filledData.Configuration.Passphrase;
        dtim.value = filledData.Configuration.DTIM;
        beaconInterval.value = filledData.Configuration.BeaconInterval;
        powerScale.value = filledData.Configuration.PowerScale;
        filledData.Configuration.DFS
          ? dfsEna.classList.add("checked")
          : dfsEna.classList.remove("checked");

        adaptOperationMode();
        check_security_type();
      };

      // init event on input and switch and so forth entity
      initEvent();
      // fill data into FE
      fillData();

      // apply and cancel event
      document.getElementById("Apply", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          filledData.Configuration.EnableRadio =
            enable5G.classList.contains("checked");
          filledData.Configuration.AutoChannel =
            autoChannel.classList.contains("checked");
          filledData.Configuration.UseDFSChannels =
            useDFSChannel.classList.contains("checked");
          filledData.Configuration.OperationMode = operationModeSelect.value;
          filledData.Configuration.Channel = channelSelect.value;
          filledData.Configuration.ChannelBandwidth = channelBWSelect.value;
          filledData.Configuration.AdvertiseSSID =
            advertiseSSID.classList.contains("checked");
          filledData.Configuration.WMM = wmm.classList.contains("checked");
          filledData.Configuration.WMMPS = wmmps.classList.contains("checked");
          filledData.Configuration.APIsolation =
            apIso.classList.contains("checked");
          filledData.Configuration.SSID = ssid.value;
          filledData.Configuration.SecurityType = securityTypeSelect.value;
          filledData.Configuration.Passphrase = password.value;
          filledData.Configuration.DTIM = dtim.value;
          filledData.Configuration.BeaconInterval = beaconInterval.value;
          filledData.Configuration.PowerScale = powerScale.value;
          filledData.Configuration.DFS = dfsEna.classList.contains("checked");

          console.log(`Store data: ${Wifi["5G"].SSIDs[0]}`);
          applyElemLS("wifi-5G-config.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyElemLS("wifi-5G-config.html", "Cancel");
      });
      break;
    case "wifi-5G-mac_filter.html":
      var numberOfSSIDs = Wifi["5G"].SSIDs.length;
      filledData = Wifi["5G"].SSIDs;
      console.log(`Load number of SSID: ${numberOfSSIDs}`);

      var ssid_select = document.getElementById("SSID");
      var acl_mode_select = document.getElementById("acl_mode_select");
      var tbody = document.getElementById("bodyData");
      var addBtn = document.getElementById("MACAddressControlList");
      var rowElementTemplate = document.getElementById(
        "input_field_mac_template"
      );

      //
      var applyBtn = document.getElementById("Apply");

      var addNewMAC = function (macValue) {
        const tr = rowElementTemplate.content.cloneNode(true);

        //
        const macField = tr.querySelector(".macAddrValue");
        const deleteBtn = tr.querySelector(".deleteBtn");

        const empty_error = tr.querySelector(".empty_error");
        const invalid_error = tr.querySelector(".invalid_error");

        macField.value = macValue;
        checkPattern_inputField(
          macField,
          new RegExp(WIFI_MAC_PATTERN),
          invalid_error,
          empty_error
        );

        // init event
        macField.addEventListener("input", () => {
          checkPattern_inputField(
            macField,
            new RegExp(WIFI_MAC_PATTERN),
            invalid_error,
            empty_error
          );
        });

        deleteBtn.addEventListener("click", () => {
          if (acl_mode_select.value != "0" && tbody.children.length <= 1) {
            alertDialogHandle("Keep at least one MAC address");
          } else {
            deleteDialogHandle(
              deleteBtn.closest("tr"),
              "Delete MAC Address",
              "Are you sure you want to Delete ?"
            );
          }
        });

        tbody.appendChild(tr);
      };

      var fillMacList = function () {
        // clear MAC List current
        tbody.innerHTML = "";
        for (const elem of filledData[parseInt(ssid_select.value)].MACFiltering
          .MACAddressFilter) {
          addNewMAC(elem);
        }
      };

      var fillData = function () {
        // Load SSID & WDS mode
        numberOfSSIDs = 0;
        for (const elem of Wifi["5G"].SSIDs) {
          var optionElement = document.createElement("option");
          optionElement.value = numberOfSSIDs; // as value, corresponds to index of itself in SSIDs array
          numberOfSSIDs += 1;
          optionElement.label = elem.Configuration.SSID;
          optionElement.textContent = elem.Configuration.SSID;
          ssid_select.appendChild(optionElement);
        }

        ssid_select.value = 0; // default SSID cannot remove so we fill data and show the first element

        // ACL mode
        acl_mode_select.value = filledData[0].MACFiltering.ACLMode;
        fillMacList();
      };

      var initEvent = () => {
        ssid_select.addEventListener("change", () => {
          acl_mode_select.value =
            filledData[parseInt(ssid_select.value)].MACFiltering.ACLMode;
          fillMacList();
        });

        acl_mode_select.addEventListener("change", () => {
          if (acl_mode_select.value != "0") {
            if (tbody.children.length === 0) {
              alertDialogHandle("Please add MAC Address");
            }
          }
        });

        addBtn.addEventListener("click", () => {
          addNewMAC("");
        });
      };

      initEvent();
      fillData();

      // Apply and Cancel
      applyBtn.addEventListener("click", () => {
        if (acl_mode_select.value != "0" && tbody.children.length === 0) {
          alertDialogHandle("Please add MAC Address");
          // escape event
          return;
        }
        if (checkError_show(document.querySelectorAll(".error"))) {
          filledData[parseInt(ssid_select.value)].MACFiltering.ACLMode =
            acl_mode_select.value;

          // clear MAC list after update new one
          filledData[
            parseInt(ssid_select.value)
          ].MACFiltering.MACAddressFilter.length = 0;
          for (const elem of document.querySelectorAll(".macAddrValue")) {
            filledData[
              parseInt(ssid_select.value)
            ].MACFiltering.MACAddressFilter.push(elem.value);
          }

          applyElemLS("wifi-5G-mac_filter.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyElemLS("wifi-5G-mac_filter.html", "Cancel");
      });
      break;
    case "wifi-5G-ssids.html":
      console.log(`Load ${item}\n${JSON.stringify(Wifi["5G"])}`);
      var addWifiBtn = document.getElementById("AddBtn");
      var tableHeader = document.getElementById("headerTable");
      var tbody = document.getElementById("bodyData");
      var add_wifi_form_template = document.getElementById(
        "addWifiFormTemplate"
      );

      var applyBtn = document.getElementById("Apply");
      var cancelBtn = document.getElementById("Cancel");
      var wifi_detail_template = document.getElementById("wifi_detail");
      var wifi_infor_template = document.getElementById("rowElementTemplate");

      var add_lock = false; // if lock --> cannot create more add_wifi_form
      var detail_on_show = false;

      // buffer to store new but not yet apply of Wifi
      var wifiInfoBuffer = Wifi["5G"].SSIDs;

      // adapt security type
      var check_security_type = function (
        current_parent,
        currentRow,
        alert_on
      ) {
        var password_field = current_parent.getElementById("Password_field");
        var rekeyInterval = current_parent.getElementById("rekeyInterval");
        var title_pass = current_parent.getElementById("title_pass");
        var lowLimit_error = current_parent.getElementById(
          "lowLimit_pass_error"
        );
        var upLimit_error = current_parent.getElementById("upLimit_pass_error");

        var adapt_type = function (title, placeholder, pattern, min, max) {
          title_pass.textContent = title;
          password_field.placeholder = placeholder;
          password_field.pattern = pattern;
          password_field.min = min;
          password_field.max = max;
          lowLimit_error.textContent = `String length is below the limit: ${min}`;
          upLimit_error.textContent = `String length Exceeded the limit: ${max}`;
        };

        switch (currentRow.querySelector(".security_type_select").value) {
          case "None":
            current_parent
              .getElementById("panel_passphrase")
              .classList.add("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            break;
          case "4": // WEP-64
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type(
              "Key(Exactly 10 Hex digits)",
              "Enter Password web",
              WEP64_KEY_PATTERN,
              10,
              10
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          case "5": // WEP-128
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type(
              "Key(Exactly 26 Hex digits)",
              "Enter Password web",
              WEP128_KEY_PATTERN,
              26,
              26
            );

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          case "6": // WPA3-Personal
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          case "7": // WPA2-WPA3-Personal
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            rekeyInterval.classList.add("ng-hide");
            adapt_type("Passphrase", "Enter Password", ".*", 8, 63);

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
          default:
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = false;

            adapt_type("Passphrase", "Enter Password", ".*", 8, 63); // pattern mean accpt all

            checkPasswordError_inputField(
              password_field,
              new RegExp(password_field.getAttribute("pattern")),
              current_parent.getElementById("invalid_pass_error"),
              current_parent.getElementById("empty_pass_error"),
              current_parent.getElementById("lowLimit_pass_error"),
              current_parent.getElementById("upLimit_pass_error")
            );
            break;
        }
      };

      var save_then_destroy_detail_row = function (currentRow) {
        // check detail_error and store the change at Wifi
        var currentRowIndex = Array.from(
          currentRow.parentElement.children
        ).indexOf(
          document.getElementById("detail_panel").previousElementSibling
        );

        // store the previous detail pannel
        if (checkError_show(document.querySelectorAll(".detail_error"))) {
          // console.log(
          //   `On-going store changed element, index: ${currentRowIndex}, state now: ${JSON.stringify(
          //     wifiInfoBuffer[currentRowIndex]
          //   )}`
          // );
          wifiInfoBuffer[currentRowIndex].Configuration.Passphrase =
            document.getElementById("Password_field").value;
          wifiInfoBuffer[currentRowIndex].RekeyInterval =
            document.getElementById("RekeyingInterval").value;
          wifiInfoBuffer[currentRowIndex].Configuration.WMM = document
            .getElementById("WMMCapability")
            .classList.contains("checked");
          wifiInfoBuffer[currentRowIndex].Configuration.WMMPS = document
            .getElementById("UAPSDEnable")
            .classList.contains("checked");
          wifiInfoBuffer[currentRowIndex].Configuration.APIsolation = document
            .getElementById("IsolationEnable")
            .classList.contains("checked");
          wifiInfoBuffer[currentRowIndex].Maxconnected =
            document.getElementById("MaxAssociatedDevices").value;
          wifiInfoBuffer[currentRowIndex].BridgeName = document.getElementById(
            "X_LANTIQ_COM_Vendor_BridgeName"
          ).value;
          console.log(
            `Store the change before jump to other detail Wifi: ${JSON.stringify(
              wifiInfoBuffer[currentRowIndex]
            )}`
          );
        } else {
          console.log(
            "Do not store the change Wifi because error still remain"
          );
        }

        // destroy step
        for (const elem of document.querySelectorAll(".detailBtn"))
          elem.classList.remove("gemtek-less-btn");
        console.log(document.getElementById("detail_panel"));
        tbody.removeChild(document.getElementById("detail_panel"));
      };

      var make_detail_row = function (currentRow) {
        const tr_detail = wifi_detail_template.content.cloneNode(true);

        // extra row template
        var password_field = tr_detail.getElementById("Password_field");
        var pwd_Eye = tr_detail.getElementById("pwd_Eye");
        var rekeyInterval = tr_detail.getElementById("RekeyingInterval");
        var wmmBtn = tr_detail.getElementById("WMMCapability");
        var wmmpsBtn = tr_detail.getElementById("UAPSDEnable");
        var apIso = tr_detail.getElementById("IsolationEnable");
        var maxAssociatedDevices = tr_detail.getElementById(
          "MaxAssociatedDevices"
        );
        var bridgeName = tr_detail.getElementById(
          "X_LANTIQ_COM_Vendor_BridgeName"
        );

        check_security_type(tr_detail, currentRow, false);

        // @TODO fill data and check Error
        var currentRowIndex = Array.from(
          currentRow.parentElement.children
        ).indexOf(currentRow);
        var filledData = wifiInfoBuffer[currentRowIndex];

        console.log(
          `Click on row (exclude detail): ${currentRowIndex}, data on row: ${JSON.stringify(
            filledData
          )}`
        );

        password_field.value = filledData.Configuration.Passphrase;
        rekeyInterval.value = filledData.RekeyInterval;
        filledData.Configuration.WMM
          ? wmmBtn.classList.add("checked")
          : wmmBtn.classList.remove("checked");
        if (filledData.Configuration.WMM === true) {
          filledData.Configuration.WMMPS
            ? wmmpsBtn.classList.add("checked")
            : wmmpsBtn.classList.remove("checked");
        } else {
          tr_detail.getElementById("wmm-ps-show").classList.add("ng-hide");
        }

        filledData.Configuration.APIsolation
          ? apIso.classList.add("checked")
          : apIso.classList.remove("checked");
        maxAssociatedDevices.value = filledData.Maxconnected;
        bridgeName.value = filledData.BridgeName;

        var invalid_pass_error = tr_detail.getElementById("invalid_pass_error");
        var empty_pass_error = tr_detail.getElementById("empty_pass_error");
        var lowLimit_pass_error = tr_detail.getElementById(
          "lowLimit_pass_error"
        );
        var upLimit_pass_error = tr_detail.getElementById("upLimit_pass_error");
        var range_rekey_error = tr_detail.getElementById("range_rekey_error");
        var empty_rekey_error = tr_detail.getElementById("empty_rekey_error");
        var min_sta_error = tr_detail.getElementById("min_sta_error");
        var max_sta_error = tr_detail.getElementById("max_sta_error");
        var empty_sta_error = tr_detail.getElementById("empty_sta_error");
        var empty_bridge_error = tr_detail.getElementById("empty_bridge_error");

        var wmmpsShow = tr_detail.getElementById("wmm-ps-show");

        checkPasswordError_inputField(
          password_field,
          new RegExp(password_field.getAttribute("pattern")),
          invalid_pass_error,
          empty_pass_error,
          lowLimit_pass_error,
          upLimit_pass_error
        );
        checkRange_inputField(
          rekeyInterval,
          range_rekey_error,
          empty_rekey_error
        );
        checkMinMaxError_inputField(
          maxAssociatedDevices,
          min_sta_error,
          max_sta_error,
          empty_sta_error
        );
        checkEmpty_inputField(bridgeName, empty_bridge_error);

        // @TODO event init on input field
        password_field.addEventListener("input", () => {
          console.log(password_field.getAttribute("pattern"));
          checkPasswordError_inputField(
            password_field,
            new RegExp(password_field.getAttribute("pattern")),
            invalid_pass_error,
            empty_pass_error,
            lowLimit_pass_error,
            upLimit_pass_error
          );
        });

        pwd_Eye.addEventListener("click", () => {
          hide_show_pw(pwd_Eye, password_field);
        });

        rekeyInterval.addEventListener("input", () => {
          checkRange_inputField(
            rekeyInterval,
            range_rekey_error,
            empty_rekey_error
          );
        });

        wmmBtn.addEventListener("click", () => {
          wmmBtn.classList.toggle("checked");
          if (wmmBtn.classList.contains("checked")) {
            wmmpsShow.classList.remove("ng-hide");
          } else {
            wmmpsShow.classList.add("ng-hide");
          }
        });

        wmmpsBtn.addEventListener("click", () => {
          wmmpsBtn.classList.toggle("checked");
        });

        apIso.addEventListener("click", () => {
          apIso.classList.toggle("checked");
        });

        maxAssociatedDevices.addEventListener("input", () => {
          checkMinMaxError_inputField(
            maxAssociatedDevices,
            min_sta_error,
            max_sta_error,
            empty_sta_error
          );
        });

        bridgeName.addEventListener("input", () => {
          checkEmpty_inputField(bridgeName, empty_bridge_error);
        });

        return tr_detail;
      };

      var append_detail_function_right_below = function (currentRow) {
        // destroy must be act after store change
        currentRow.querySelector(".detailBtn").classList.add("gemtek-less-btn");

        currentRow.parentNode.insertBefore(
          make_detail_row(currentRow),
          currentRow.nextSibling
        );
      };

      // after add button is accepted --> add more row on tbody wifi
      var append_wifi_table = function (ssid_info) {
        const tr = wifi_infor_template.content.cloneNode(true);

        //
        const ssid = tr.querySelector(".ssid");
        const security_type_select = tr.querySelector(".security_type_select");
        const wps_enable = tr.querySelector(".wps_enable");
        const deleteBtn = tr.querySelector(".delete_wifi");
        const detailBtn = tr.querySelector(".detailBtn");

        // error
        const ssid_empty_error = tr.querySelector(".wifi_error");
        // Generate a unique ID for the checkbox
        var uniqueId = "checkbox_" + Math.floor(Math.random() * 999999999); // generating unique IDs

        // Update the ID of the checkbox and its associated labels
        tr.querySelector("input[type='checkbox']").id = uniqueId;
        tr.querySelector("label[for]").htmlFor = uniqueId;

        // fill data
        ssid.value = ssid_info.Configuration.SSID;
        security_type_select.value = ssid_info.Configuration.SecurityType;
        if (
          security_type_select.value === "None" ||
          security_type_select.value == 4 ||
          security_type_select.value == 5 ||
          security_type_select.value == 6 ||
          security_type_select.value == 7
        ) {
          wps_enable.disabled = true;
        } else {
          wps_enable.disabled = false;
          wps_enable.checked = ssid_info.WPSEnabled;
        }

        // checkError at init
        checkEmpty_inputField(ssid, ssid_empty_error);

        // make event
        ssid.addEventListener("input", () => {
          checkEmpty_inputField(ssid, ssid_empty_error);
        });

        security_type_select.addEventListener("change", () => {
          var currentRow = security_type_select.closest("tr");
          if (detail_on_show === false) {
            detail_on_show = true;
            append_detail_function_right_below(currentRow);
            check_security_type(document, currentRow, true);
          } else {
            if (
              currentRow.nextElementSibling ===
              document.getElementById("detail_panel")
            ) {
              // @TODO modify corresponding security Type
              check_security_type(document, currentRow, true);
            } else {
              // if other is click --> destroy current and make new one below
              save_then_destroy_detail_row(currentRow);
              append_detail_function_right_below(currentRow);
              check_security_type(document, currentRow, true);
            }
          }
        });

        deleteBtn.addEventListener("click", () => {
          if (tbody.querySelectorAll("tr").length === 1) {
            // @TODO alert if only remain 1
            show_alert_dialog("Default SSID cannot be removed");
          } else {
            var currentRow = deleteBtn.closest("tr");

            // remove at Wifi variable
            var currentRowIndex = Array.from(
              currentRow.parentElement.children
            ).indexOf(currentRow);
            wifiInfoBuffer.splice(currentRowIndex, 1);
            console.log(
              `Remove Wifi --> Wifi now (length ${
                wifiInfoBuffer.length
              }): ${JSON.stringify(wifiInfoBuffer)}`
            );

            // remove if detail panel on it
            if (
              currentRow.nextElementSibling ===
              document.getElementById("detail_panel")
            ) {
              detail_on_show = false;
              document.getElementById("detail_panel").remove();
            }
            // FE remove
            currentRow.remove();
          }
        });

        detailBtn.addEventListener("click", () => {
          var currentRow = detailBtn.closest("tr");

          // if no detail is showing
          if (detail_on_show === false) {
            detail_on_show = true;
            append_detail_function_right_below(currentRow);
          } else {
            // check if detail is currentRow's
            // if --> destroy
            if (
              currentRow.nextElementSibling ===
              document.getElementById("detail_panel")
            ) {
              detail_on_show = false;
              save_then_destroy_detail_row(currentRow);
            } else {
              // esle --> destroy + make one below
              save_then_destroy_detail_row(currentRow);
              append_detail_function_right_below(currentRow);
            }
          }
        });

        tbody.appendChild(tr);
      };

      var make_add_wifi_form = function () {
        const formAddWifi = add_wifi_form_template.content.cloneNode(true);

        var newWifiInfo = {
          WPSEnabled: false,
          RekeyInterval: "3600",
          Maxconnected: "255",
          BridgeName: "br-lan",
          Configuration: {
            EnableRadio: false,
            AutoChannel: true,
            OperationMode: 4,
            Channel: 0,
            ChannelBandwidth: 2,
            AdvertiseSSID: true,
            WMM: true,
            WMMPS: true,
            APIsolation: false,
            SSID: "",
            SecurityType: 0,
            Passphrase: "password",
            DTIM: "",
            BeaconInterval: "",
            PowerScale: "",
            EnableCoExistence: false,
          },
          WDS: {
            WDSMode: 0,
            MACAddress: [],
          },
          MACFiltering: {
            ACLMode: 1,
            MACAddressFilter: [],
          },
        };

        const ssid_field = formAddWifi.querySelector(".add_ssid");
        const ap_type = formAddWifi.querySelector(".ap_type");
        const security_type = formAddWifi.querySelector(".security_type");
        const wps = formAddWifi.querySelector(".wps");
        const confirm_add_btn = formAddWifi.querySelector(".confirm_add");
        const cancel_add_btn = formAddWifi.querySelector(".cancel_add");

        // error and toggle icon for 4 field above
        const empty_ssid_error = formAddWifi.querySelector(".empty_ssid_error");
        const empty_ap_type_error = formAddWifi.querySelector(
          ".empty_ap_type_error"
        );
        const security_type_error =
          formAddWifi.querySelector(".security_error");

        // check Error at init
        checkEmpty_inputField(ssid_field, empty_ssid_error);
        checkEmpty_inputField(ap_type, empty_ap_type_error);
        checkError_selectField(security_type, security_type_error);

        // make event on input or click
        ssid_field.addEventListener("input", () => {
          checkEmpty_inputField(ssid_field, empty_ssid_error);
        });

        ap_type.addEventListener("change", () => {
          checkEmpty_inputField(ap_type, empty_ap_type_error);
        });

        security_type.addEventListener("change", () => {
          checkError_selectField(security_type, security_type_error);
          if (
            security_type.value == "None" ||
            security_type.value == 4 ||
            security_type.value == 5 ||
            security_type.value == 6 ||
            security_type.value == 7
          ) {
            wps.disabled = true;
            wps.checked = false;
            window.alert("WPS function only supports WPA and WPA2 mode.");
          } else {
            wps.disabled = false;
          }
        });

        //
        tableHeader.appendChild(formAddWifi);

        confirm_add_btn.addEventListener("click", () => {
          add_lock = false;
          if (
            checkError_show(document.querySelectorAll(".add_wifi_error")) ===
            true
          ) {
            newWifiInfo.Configuration.SSID = ssid_field.value;
            newWifiInfo.Configuration.SecurityType = security_type.value;
            newWifiInfo.WPSEnabled = wps.checked;
            // remove form
            tableHeader.removeChild(tableHeader.lastElementChild);
            // append table Wifi
            wifiInfoBuffer.push(newWifiInfo);
            append_wifi_table(newWifiInfo);
          }
        });

        cancel_add_btn.addEventListener("click", () => {
          add_lock = false;
          tableHeader.removeChild(tableHeader.lastElementChild);
        });
      };

      // fill data at load page
      var fillData = function () {
        for (const elem of Wifi["5G"].SSIDs) {
          append_wifi_table(elem);
        }
      };

      fillData();

      // event init on total Page
      addWifiBtn.addEventListener("click", () => {
        if (!add_lock) {
          add_lock = true;
          make_add_wifi_form();
        }
      });

      applyBtn.addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".wifi_error"))) {
          var listSSIDs = document.querySelectorAll(".ssid");
          var listSecurityType = document.querySelectorAll(
            ".security_type_select"
          );
          var listWPSEnable = document.querySelectorAll(".wps_enable");
          console.log(`Apply press, store ${listSSIDs.length} element`);
          for (var i = 0; i < listSSIDs.length; i++) {
            wifiInfoBuffer[i].Configuration.SSID = listSSIDs[i].value;
            wifiInfoBuffer[i].Configuration.SecurityType =
              listSecurityType[i].value;
            wifiInfoBuffer[i].WPSEnabled = listWPSEnable[i].checked;
          }

          // store current detail panel info
          var detail_panel = document.getElementById("detail_panel");
          if (detail_panel !== null) {
            var currentRowIndex = Array.from(
              detail_panel.parentElement.children
            ).indexOf(detail_panel.previousElementSibling);

            wifiInfoBuffer[currentRowIndex].Configuration.Passphrase =
              document.getElementById("Password_field").value;
            wifiInfoBuffer[currentRowIndex].RekeyInterval =
              document.getElementById("RekeyingInterval").value;
            wifiInfoBuffer[currentRowIndex].Configuration.WMM = document
              .getElementById("WMMCapability")
              .classList.contains("checked");
            wifiInfoBuffer[currentRowIndex].Configuration.WMMPS = document
              .getElementById("UAPSDEnable")
              .classList.contains("checked");
            wifiInfoBuffer[currentRowIndex].Configuration.APIsolation = document
              .getElementById("IsolationEnable")
              .classList.contains("checked");
            wifiInfoBuffer[currentRowIndex].Maxconnected =
              document.getElementById("MaxAssociatedDevices").value;
            wifiInfoBuffer[currentRowIndex].BridgeName =
              document.getElementById("X_LANTIQ_COM_Vendor_BridgeName").value;
          }

          console.log(
            `Apply accept, data Wifi at last: ${JSON.stringify(
              Wifi["5G"].SSIDs
            )}`
          );
          applyElemLS("wifi-5G-ssids.html", "Apply", Wifi);
        }
      });

      cancelBtn.addEventListener("click", () => {
        applyElemLS("wifi-5G-ssids.html", "Cancel");
      });
      break;
    case "wifi-5G-statistics.html":
      var numberOfSSIDs = Wifi["5G"].SSIDs.length;
      filledData = Wifi["5G"].SSIDs;
      console.log(`Load number of SSID: ${numberOfSSIDs}`);

      var ssid_select = document.getElementById("SSID");

      // Load SSID & WDS mode
      numberOfSSIDs = 0;
      for (const elem of Wifi["5G"].SSIDs) {
        var optionElement = document.createElement("option");
        optionElement.value = numberOfSSIDs; // as value, corresponds to index of itself in SSIDs array
        numberOfSSIDs += 1;
        optionElement.label = elem.Configuration.SSID;
        optionElement.textContent = elem.Configuration.SSID;
        ssid_select.appendChild(optionElement);
      }

      checkError_selectField(
        ssid_select,
        document.getElementById("select_error")
      );
      ssid_select.addEventListener("change", () => {
        checkError_selectField(
          ssid_select,
          document.getElementById("select_error")
        );
      });
      break;
    case "wifi-5G-wds.html":
      var numberOfSSIDs = Wifi["5G"].SSIDs.length;
      filledData = Wifi["5G"].SSIDs;
      console.log(`Load number of SSID: ${numberOfSSIDs}`);

      var ssid_select = document.getElementById("SSID");
      var wds_select_mode = document.getElementById(
        "DeviceWiFiAccessPointX_GTK_Vendor_WaveWDSMode"
      );

      // option Hybrid
      var add_btn = document.getElementById("Add");

      // panel
      var hybrid_mode_panel = document.getElementById("wds_mode_hybrid");
      var mac_input_panel = document.getElementById("mac_input_panel");
      var tbody = document.getElementById("mac_addr_list");
      var rowElementTemplate = document.getElementById("rowElement");

      // button & input field inside panel
      var closeBtn = document.getElementById("Close");
      var addMacBtn = document.getElementById("AddMac");
      var mac_input_field = document.getElementById(
        "DeviceWiFiAccessPointX_GTK_Vendor_WaveWDSPeers"
      );

      var addNewMAC = function (macValue) {
        const tr = rowElementTemplate.content.cloneNode(true);

        //
        const macField = tr.querySelector(".macAddrValue");
        const deleteBtn = tr.querySelector(".deleteBtn");

        macField.textContent = macValue;
        deleteBtn.addEventListener("click", () => {
          if (window.confirm("Are you sure you want to Delete?")) {
            deleteBtn.closest("tr").remove();
          }
        });

        tbody.appendChild(tr);
      };

      var adaptWdsMode = () => {
        if (wds_select_mode.value == "1") {
          // Hybrid --> load MAC Address too
          hybrid_mode_panel.classList.remove("ng-hide");
          add_btn.classList.remove("ng-hide");
          // remove tbody but the add-MAC panel
          while (tbody.children.length > 1) {
            tbody.removeChild(tbody.children[1]);
          }
          // load current
          if (ssid_select.value !== "?") {
            for (const elem of filledData[parseInt(ssid_select.value)].WDS
              .MACAddress) {
              addNewMAC(elem);
            }
          }
        } else {
          hybrid_mode_panel.classList.add("ng-hide");
          add_btn.classList.add("ng-hide");
        }
      };

      var fillData = function () {
        // Load SSID & WDS mode
        numberOfSSIDs = 0;
        for (const elem of Wifi["5G"].SSIDs) {
          var optionElement = document.createElement("option");
          optionElement.value = numberOfSSIDs; // as value, corresponds to index of itself in SSIDs array
          numberOfSSIDs += 1;
          optionElement.label = elem.Configuration.SSID;
          optionElement.textContent = elem.Configuration.SSID;
          document.getElementById("SSID").appendChild(optionElement);
        }

        ssid_select.value = 0; // default SSID cannot remove so we fill data and show the first element
        checkError_selectField(
          document.getElementById("SSID"),
          document.getElementById("empty_ssid_error")
        );

        // WDS
        wds_select_mode.value = filledData[0].WDS.WDSMode;
        adaptWdsMode();
      };

      var initEvent = function () {
        ssid_select.addEventListener("change", () => {
          if (
            checkError_selectField(
              document.getElementById("SSID"),
              document.getElementById("empty_ssid_error")
            )
          ) {
            wds_select_mode.value =
              filledData[parseInt(ssid_select.value)].WDS.WDSMode;
            adaptWdsMode();
          }
        });

        wds_select_mode.addEventListener("change", () => {
          adaptWdsMode();
        });

        add_btn.addEventListener("click", () => {
          mac_input_panel.classList.remove("ng-hide");
          mac_input_field.value = "";
          checkEmpty_inputField(
            mac_input_field,
            document.getElementById("empty_mac_error")
          );
        });

        // add Btn panel show
        mac_input_field.addEventListener("input", () => {
          checkPattern_inputField(
            mac_input_field,
            new RegExp(WIFI_MAC_PATTERN),
            document.getElementById("pattern_mac_error"),
            document.getElementById("empty_mac_error")
          );
        });

        addMacBtn.addEventListener("click", () => {
          if (
            checkPattern_inputField(
              mac_input_field,
              new RegExp(WIFI_MAC_PATTERN),
              document.getElementById("pattern_mac_error"),
              document.getElementById("empty_mac_error")
            )
          ) {
            addNewMAC(mac_input_field.value);
            mac_input_panel.classList.add("ng-hide");
          }
        });

        closeBtn.addEventListener("click", () => {
          mac_input_panel.classList.add("ng-hide");
        });
      };

      fillData();
      initEvent();

      document.getElementById("Modify").addEventListener("click", () => {
        if (checkError_show(document.getElementById("empty_ssid_error"))) {
          filledData[parseInt(ssid_select.value)].WDS.WDSMode =
            wds_select_mode.value;

          filledData[parseInt(ssid_select.value)].WDS.MACAddress.length = 0;

          // if (wds_select_mode.value === "1"){
          for (const elem of document.querySelectorAll(".macAddrValue")) {
            filledData[parseInt(ssid_select.value)].WDS.MACAddress.push(
              elem.textContent
            );
          }
          // }

          applyElemLS("wifi-5G-wds.html", "Apply", Wifi);
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyElemLS("wifi-5G-wds.html", "Cancel");
      });
      break;
    case "wifi-5G-wps.html":
      var numberOfSSIDs = Wifi["5G"].SSIDs.length;
      console.log(`Load number of SSID data: ${numberOfSSIDs}`);

      var ssid_select = document.getElementById("SSID");

      for (const elem of Wifi["5G"].SSIDs) {
        var optionElement = document.createElement("option");
        optionElement.value = numberOfSSIDs;
        optionElement.label = elem.Configuration.SSID;
        optionElement.textContent = elem.Configuration.SSID;
        ssid_select.appendChild(optionElement);
      }

      var endPoint = document.getElementById("EndpointPIN");
      endPoint.addEventListener("input", () => {
        checkEmpty_inputField(
          endPoint,
          document.getElementById("invalid_endpoint_error")
        );
      });

      var macAddr = document.getElementById("AuthorizedMac");
      macAddr.addEventListener("input", () => {
        if (!new RegExp(WIFI_MAC_PATTERN).test(macAddr.value)) {
          document
            .getElementById("invalid_mac_error")
            .classList.remove("ng-hide");
        } else {
          document.getElementById("invalid_mac_error").classList.add("ng-hide");
        }
      });

      document.getElementById("ResetWPS").addEventListener("click", () => {
        applyElemLS("wifi-5G-wps.html", "Cancel");
      });

      document.getElementById("ConnectDevice").addEventListener("click", () => {
        if (
          !checkEmpty_inputField(
            endPoint,
            document.getElementById("invalid_endpoint_error")
          )
        ) {
          return;
        }

        if (!new RegExp(WIFI_MAC_PATTERN).test(macAddr.value)) {
          document
            .getElementById("invalid_mac_error")
            .classList.remove("ng-hide");
          return;
        } else {
          document.getElementById("invalid_mac_error").classList.add("ng-hide");
        }
        applyElemLS("wifi-5G-wps.html", "Cancel");
      });
      break;
    case "wifi-guest_access-add.html":
      break;
    case "wifi-guest_access.html":
      break;
    default:
      console.log(`Load ${item} fail --- no available page`);
      return;
  }
}
