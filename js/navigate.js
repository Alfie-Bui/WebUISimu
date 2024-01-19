/**
 * Load page and fill data into them
 * @NOTE: i split it over category to avoid the load function is too large
 * @BUG Local storage is not same domain
 * @FIX Firefox: Set "security.fileuri.strict_origin_policy" to false
 */
function loadPage(item, options) {
  // options take edit or add button page
  if (localStorage.length === 0) initLS();

  // load data from local storage
  let Status = JSON.parse(localStorage.getItem("Status"));
  let Basic = JSON.parse(localStorage.getItem("Basic"));
  let Wifi = JSON.parse(localStorage.getItem("WiFi"));
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

      var ddns_error = document.querySelectorAll(".error");
      var ddns_error_clear = true;
      // event on Apply and CancelConnectionType
      ddnsApplyBtn.addEventListener("click", () => {
        // check if any error tag is showing --> if show --> still error
        for (const elem of ddns_error) {
          if (!elem.classList.contains("ng-hide")) {
            console.log(`Element error make fail: ${elem.outerHTML}`);
            ddns_error_clear = false;
            break;
          }
        }
        if (ddns_error_clear) {
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
      function setup() {
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
      }

      function setupv6() {
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
      }

      /** Connection Type */
      function addDNSServer(ipversion, elem) {
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
      }

      function handleConnectionType(
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
      }

      function setupConnectionType() {
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
      }

      /** Fill data into FE */
      function fillData() {
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
      }

      /** declare variable of tag and add event listerner for them */
      setup();
      setupv6();
      setupConnectionType();
      // fill data into FE
      fillData();

      /** Button Cancel and Apply */
      var cancelBtn = document.getElementById("Cancel");
      var applyBtn = document.getElementById("Apply");
      var static_apply_flag = true;
      var dhcp_apply_flag = true;
      var pppoe_apply_flag = true;
      var common_apply_flag = true;

      /** At Cancel and Apply */
      cancelBtn.addEventListener("click", () => {
        applyElemLS("basic-wan-ipv4.html", "Cancel");
      });

      applyBtn.addEventListener("click", () => {
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
              document.querySelectorAll("pppoe_error")
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
      console.log(`Load ${item}\n${JSON.stringify(Wifi["2.4G"])}`);
      var addWifiBtn = document.getElementById("AddBtn");
      var tableHeader = document.getElementById("headerTable");
      var tbody = document.getElementById("bodyData");
      var add_wifi_form_template = document.getElementById(
        "addWifiFormTemplate"
      );
      var wifi_detail_template = document.getElementById("wifi_detail");
      var wifi_infor_template = document.getElementById("rowElementTemplate");

      var add_lock = false; // if lock --> cannot create more add_wifi_form
      let detail_on_show = false;

      function check_security_type(current_parent, currentRow, alert_on) {
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

            break;
          case "5": // WEP-128
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            break;
          case "6": // WPA3-Personal
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            break;
          case "7": // WPA2-WPA3-Personal
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = true;
            if (alert_on)
              window.alert("WPS function only supports WPA and WPA2 mode.");

            break;
          default:
            current_parent
              .getElementById("panel_passphrase")
              .classList.remove("ng-hide");
            currentRow.querySelector(".wps_enable").disabled = false;

            break;
        }
      }

      function destroy_detail_row() {
        for (const elem of document.querySelectorAll(".detailBtn"))
          elem.classList.remove("gemtek-less-btn");
        tbody.removeChild(document.getElementById("detail_panel"));
      }

      function make_detail_row(currentRow) {
        console.log(
          `Load detail of Wifi-SSID: ${currentRow.querySelector(".ssid")}`
        );

        const tr_detail = wifi_detail_template.content.cloneNode(true);

        // extra row
        const password_field = tr_detail.getElementById("Password_field");
        const pwd_Eye = tr_detail.getElementById("pwd_Eye");
        const rekeyInterval = tr_detail.getElementById("RekeyingInterval");
        const wmmBtn = tr_detail.getElementById("WMMCapability");
        const uAPSDEnable = tr_detail.getElementById("UAPSDEnable");
        const apIso = tr_detail.getElementById("IsolationEnable");
        const maxAssociatedDevices = tr_detail.getElementById(
          "MaxAssociatedDevices"
        );
        const bridgeName = tr_detail.getElementById(
          "X_LANTIQ_COM_Vendor_BridgeName"
        );

        check_security_type(tr_detail, currentRow, false);
        return tr_detail;
      }

      function append_detail_function_right_below(currentRow) {
        currentRow.querySelector(".detailBtn").classList.add("gemtek-less-btn");

        currentRow.parentNode.insertBefore(
          make_detail_row(currentRow),
          currentRow.nextSibling
        );
      }

      // after add button is accepted --> add more row on tbody wifi
      function append_wifi_table(ssid_info) {
        const tr = wifi_infor_template.content.cloneNode(true);

        //
        const ssid = tr.querySelector(".ssid");
        const security_type_select = tr.querySelector(".security_type_select");
        const wps_enable = tr.querySelector(".wps_enable");
        const deleteBtn = tr.querySelector(".delete_wifi");
        const detailBtn = tr.querySelector(".detailBtn");

        // Generate a unique ID for the checkbox
        var uniqueId = "checkbox_" + Math.floor(Math.random() * 999999999); // generating unique IDs

        // Update the ID of the checkbox and its associated labels
        tr.querySelector("input[type='checkbox']").id = uniqueId;
        tr.querySelector("label[for]").htmlFor = uniqueId;

        // fill data
        ssid.value = ssid_info.Configuration.SSID;
        security_type_select.value = ssid_info.Configuration.SecurityType;
        wps_enable.checked = ssid_info.WPSEnabled;

        // checkError at init
        checkEmpty_inputField(ssid, tr.querySelector(".wifi_error"));

        // make event
        ssid.addEventListener("input", () => {
          checkEmpty_inputField(ssid, tr.querySelector(".wifi_error"));
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
              destroy_detail_row(currentRow);
              append_detail_function_right_below(currentRow);
              check_security_type(document, currentRow, true);
            }
          }
        });

        deleteBtn.addEventListener("click", () => {});

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
              destroy_detail_row(currentRow);
            } else {
              // esle --> destroy + make one below
              destroy_detail_row(currentRow);
              append_detail_function_right_below(currentRow);
            }
          }
        });

        tbody.appendChild(tr);
      }

      function make_add_wifi_form() {
        const formAddWifi = add_wifi_form_template.content.cloneNode(true);

        var newWifiInfo = {
          WPSEnabled: false,
          RekeyInterval: 3600,
          Maxconnected: 255,
          BridgeName: "",
          Configuration: {
            EnableRadio: false,
            AutoChannel: true,
            OperationMode: 4,
            Channel: 0,
            ChannelBandwidth: 2,
            AdvertiseSSID: true,
            WMM: false,
            WMMPS: false,
            APIsolation: false,
            SSID: "",
            SecurityType: 0,
            Passphrase: "",
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

        const ssid_field = formAddWifi.querySelector(".ssid");
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
          console.log(wps.checked);
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

        confirm_add_btn.addEventListener("click", () => {
          add_lock = false;

          if (
            checkError_show(formAddWifi.querySelectorAll(".add_wifi_error")) ===
            true
          ) {
            newWifiInfo.Configuration.SSID = ssid_field.value;
            newWifiInfo.Configuration.SecurityType = security_type.value;
            tableHeader.removeChild(tableHeader.lastElementChild);
            append_wifi_table(newWifiInfo);
          }
        });

        cancel_add_btn.addEventListener("click", () => {
          add_lock = false;
          tableHeader.removeChild(tableHeader.lastElementChild);
        });

        //
        tableHeader.appendChild(formAddWifi);
      }

      // fill data at load page
      function fillData() {
        for (const elem of Wifi["2.4G"].SSIDs) {
          append_wifi_table(elem);
        }
      }

      fillData();

      addWifiBtn.addEventListener("click", () => {
        if (!add_lock) {
          add_lock = true;
          make_add_wifi_form();
        }
      });
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
