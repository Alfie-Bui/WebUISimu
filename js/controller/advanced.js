function loadPage(page, options) {
  // load data from local storage
  let Status = JSON.parse(localStorage.getItem("Status"));
  let Basic = JSON.parse(localStorage.getItem("Basic"));
  let Wifi = JSON.parse(localStorage.getItem("Wifi"));
  let Advanced = JSON.parse(localStorage.getItem("Advanced"));
  let Security = JSON.parse(localStorage.getItem("Security"));
  let Utilities = JSON.parse(localStorage.getItem("Utilities"));
  let VoIP = JSON.parse(localStorage.getItem("VoIP"));
  switch (page) {
    case "advanced-alg.html":
      console.log(`Load ${page}`, Advanced.ALG);
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
        applyThenStoreToLS("advanced-alg.html", algApplyBtn.value, Advanced);
      });

      algCancelBtn.addEventListener("click", () => {
        applyThenStoreToLS("advanced-alg.html", algCancelBtn.value);
      });
      break;
    case "advanced-ddns.html":
      console.log(`Load ${page}`, Advanced.DDNS);
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
          applyThenStoreToLS(
            "advanced-ddns.html",
            ddnsApplyBtn.value,
            Advanced
          );
        }
        console.log("Advanced.DDNS: Apply fail");
      });

      ddnsCancelBtn.addEventListener("click", () => {
        applyThenStoreToLS("advanced-ddns.html", ddnsCancelBtn.value);
      });

      break;
    case "advanced-device_management.html":
      console.log(`Load ${page}`, Advanced.DeviceManagement);
      var enaCWMP = document.getElementById(
        "DeviceManagementServer_EnableCWMP"
      );
      var localWANInterfaceSelect = document.getElementById("X_GTK_Interface");
      var acsUrl = document.getElementById("URL");
      var acsUsername = document.getElementById("Username");
      var acsPassword = document.getElementById(
        "DeviceManagementServerPassword"
      );
      var connectionRequestURL = document.getElementById(
        "ConnectionRequestURL"
      );

      var pwd_Eye = document.getElementById("icon_pw");
      var connectionReqUsername = document.getElementById(
        "ConnectionRequestUsername"
      );
      var connectionReqPwd = document.getElementById(
        "DeviceManagementServerConnectionRequestPassword"
      );
      var pwdEye2 = document.getElementById("icon_pw_2");
      var enaPerodic = document.getElementById(
        "DeviceManagementServer_PeriodicInformEnable"
      );
      var perocdicInterval = document.getElementById("PeriodicInformInterval");

      var initEvent = () => {
        pwd_Eye.addEventListener("click", () => {
          hide_show_pw(pwd_Eye, acsPassword);
        });

        pwdEye2.addEventListener("click", () => {
          hide_show_pw(pwdEye2, connectionReqPwd);
        });

        perocdicInterval.addEventListener("input", () => {
          checkMinMaxError_inputField(
            perocdicInterval,
            document.getElementById("lowLimit_error"),
            document.getElementById("upLimit_error"),
            document.getElementById("invalid_error")
          );
        });

        localWANInterfaceSelect.addEventListener("change", () => {
          checkError_selectField(
            localWANInterfaceSelect,
            document.getElementById("select_error")
          );
        });
      };

      // fill data
      var fillData = () => {
        enaCWMP.checked = Advanced.DeviceManagement.EnaCWMP;

        let countValue = 0;
        for (const elem of Basic.WAN.Interfaces) {
          var optionElement = document.createElement("option");
          optionElement.value = countValue; // as value, corresponds to index of itself in SSIDs array
          countValue += 1;
          optionElement.label = elem.Name;
          optionElement.textContent = elem.Name;
          localWANInterfaceSelect.appendChild(optionElement);
        }
        localWANInterfaceSelect.value =
          Advanced.DeviceManagement.LocalWANInterface;

        // if Enable --> take IP of WAN interface
        if (enaCWMP.checked === true) {
          connectionRequestURL.value = `http://${
            Basic.WAN.Interfaces[parseInt(localWANInterfaceSelect.value)]
              .IPAddress
          }:7547/`;
        }

        acsUrl.value = Advanced.DeviceManagement.ACSURL;
        acsUsername.value = Advanced.DeviceManagement.ACSUsername;
        acsPassword.value = Advanced.DeviceManagement.ACSPassword;
        connectionReqUsername.value =
          Advanced.DeviceManagement.ConnectionReqUsername;
        connectionReqPwd.value = Advanced.DeviceManagement.ConnectionReqPasword;
        enaPerodic.checked = Advanced.DeviceManagement.EnaPerodic;
        perocdicInterval.value = Advanced.DeviceManagement.PerodicInterval;
      };

      initEvent();
      fillData();

      // Apply and Cancel button
      document.getElementById("Modify").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          Advanced.DeviceManagement.EnaCWMP = enaCWMP.checked;
          Advanced.DeviceManagement.LocalWANInterface =
            localWANInterfaceSelect.value;
          Advanced.DeviceManagement.ACSURL = acsUrl.value;
          Advanced.DeviceManagement.ACSUsername = acsUsername.value;
          Advanced.DeviceManagement.ACSPassword = acsPassword.value;
          Advanced.DeviceManagement.ConnectionReqUsername =
            connectionReqUsername.value;
          Advanced.DeviceManagement.ConnectionReqPasword =
            connectionReqPwd.value;
          Advanced.DeviceManagement.EnaPerodic = enaPerodic.checked;
          Advanced.DeviceManagement.PerodicInterval = perocdicInterval.value;

          applyThenStoreToLS(
            "advanced-device_management.html",
            "Apply",
            Advanced
          );
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel", () => {
        applyThenStoreToLS("advanced-device_management.html", "Cancel");
      });
      break;
    case "advanced-dmz.html":
      console.log(`Load ${page}`, Advanced.DMZ);

      var enaDMZ = document.getElementById("DeviceNATX_GTK_DMZ_Enable");
      var ipAddr = document.getElementById("IPAddress");
      var ipError = document.getElementById("invalid_ip_error");

      // fill data
      enaDMZ.checked = Advanced.DMZ.EnableDMZ;
      ipAddr.value = Advanced.DMZ.IPAddr;

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-dmz.html", "Cancel");
      });

      function testIPvalid(input_IP, dev_IP, start_IP, end_IP, subnetmask) {
        var ipComponents = dev_IP.split(".");
        var subnetComponents = subnetmask.split(".");
        var inputComponents = input_IP.split(".");

        /**
         * Method: IP AND subnetmask === deviceIP AND subnetmask --> at the same network
         */
        for (var i = 0; i < ipComponents.length; i++) {
          if (
            (parseInt(ipComponents[i]) & parseInt(subnetComponents[i])) !=
            (parseInt(inputComponents[i]) & parseInt(subnetComponents[i]))
          ) {
            ipError.textContent =
              "Invalid DMZ IP address, please check device IP and Subnet Mask";
            return false;
          }
        }
        // pass Network address pattern --> test range IP
        var startComponents = start_IP.split(".");
        var endComponents = end_IP.split(".");

        if (
          parseInt(startComponents[3]) > parseInt(inputComponents[3]) ||
          parseInt(endComponents[3]) < parseInt(inputComponents[3])
        ) {
          ipError.textContent = `Invalid DMZ IP address, valid range for IP address from: ${start_IP} to ${end_IP}`;
          return false;
        }
        return true;
      }

      function errorHandleDMZIP() {
        if (
          testIPvalid(
            ipAddr.value.toString(),
            Basic.LAN.IPv4Configuration.DeviceIPAddress,
            Basic.LAN.IPv4Configuration.BeginAddress,
            Basic.LAN.IPv4Configuration.EndAddress,
            Basic.LAN.IPv4Configuration.SubnetMask
          )
        ) {
          ipError.classList.add("ng-hide");
        } else {
          ipError.classList.remove("ng-hide");
        }
      }

      ipAddr.addEventListener("input", () => {
        errorHandleDMZIP();
      });

      document.getElementById("Apply").addEventListener("click", () => {
        errorHandleDMZIP();

        if (checkError_show(ipError)) {
          Advanced.DMZ.EnableDMZ = enaDMZ.checked;
          Advanced.DMZ.IPAddr = ipAddr.value;
          applyThenStoreToLS("advanced-dmz.html", "Apply", Advanced);
        } else {
          console.log("Apply fail");
        }
      });
      break;
    case "advanced-multicast-ipv4Setting.html":
      console.log(`Load ${page}`, Advanced.Multicast);

      var fastLeave = document.getElementById(
        "DeviceX_GTK_McastIGMPParameters_FastLeaveStatus"
      );
      var groupQInterval = document.getElementById("QueryRespInterval");
      var groupLInterval = document.getElementById("LastMemQueryInterval");
      var groupLCount = document.getElementById("LastMemQueryCount");

      var fillData = () => {
        fastLeave.checked = Advanced.Multicast.FastLeave;
        groupQInterval.value = Advanced.Multicast.GroupQInterval;
        groupLInterval.value = Advanced.Multicast.GroupLInterval;
        groupLCount.value = Advanced.Multicast.GroupLCount;
      };

      var initEvent = () => {
        groupQInterval.addEventListener("input", () => {
          checkEmpty_inputField(
            groupQInterval,
            document.getElementById("invalid_groupQInterval_error")
          );
        });

        groupLInterval.addEventListener("click", () => {
          checkEmpty_inputField(
            groupLInterval,
            document.getElementById("invalid_groupLInterval_error")
          );
        });

        groupLCount.addEventListener("input", () => {
          checkEmpty_inputField(
            groupLCount,
            document.getElementById("invalid_groupLCount_error")
          );
        });
      };

      fillData();
      initEvent();

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-multicast-ipv4Setting.html", "Cancel");
      });

      document.getElementById("Modify").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          Advanced.Multicast.FastLeave = fastLeave.checked;
          Advanced.Multicast.GroupQInterval = groupQInterval.value;
          Advanced.Multicast.GroupLInterval = groupLInterval.value;
          Advanced.Multicast.GroupLCount = groupLCount.value;

          applyThenStoreToLS(
            "advanced-multicast-ipv4Setting.html",
            "Apply",
            Advanced
          );
        }
      });

      break;
    case "advanced-multicast.html":
      console.log(`Load ${page}`, Advanced.Multicast);
      var igmpProxy = document.getElementById(
        "DeviceX_GTK_McastIGMPParameters_ProxyStatus"
      );
      var snooping = document.getElementById(
        "DeviceX_GTK_McastIGMPParameters_SnoopingStatus"
      );
      var upstreamList = document.getElementById(
        "DeviceX_GTK_Mcast_UpStreamIntrfName"
      );
      var downStreamList = document.getElementById(
        "DeviceX_GTK_Mcast_DownStreamIntrf"
      );

      var upElemTemplate = document.getElementById("up_element_template");
      var downElemTemplate = document.getElementById("down_element_template");
      var numberOfWAN = Basic.WAN.Interfaces.length;

      var fillData = () => {
        igmpProxy.checked = Advanced.Multicast.IGMPProxy;
        snooping.checked = Advanced.Multicast.Snooping;

        console.log(`Number of WAN interfaces: ${numberOfWAN}`);
        for (let i = 0; i < numberOfWAN; i++) {
          const clone = upElemTemplate.content.cloneNode(true);

          clone.firstElementChild.childNodes[1].id = i;
          clone.firstElementChild.childNodes[2].htmlFor = i;

          clone.firstElementChild.childNodes[1].checked =
            Advanced.Multicast.UpstreamInterface[i];
          clone.firstElementChild.childNodes[2].textContent =
            Basic.WAN.Interfaces[i].Name;

          upstreamList.appendChild(clone);
        }

        // for (const elem of Advanced.Multicast.DownStreamInterface) {
        document.getElementById("DownStreamIntrf1").checked =
          Advanced.Multicast.DownStreamInterface[0];
        // }
      };

      fillData();

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-multicast.html", "Cancel");
      });

      document.getElementById("Modify").addEventListener("click", () => {
        // get data
        Advanced.Multicast.IGMPProxy = igmpProxy.checked;
        Advanced.Multicast.Snooping = snooping.checked;

        Advanced.Multicast.UpstreamInterface.length = 0;
        for (var i = 0; i < numberOfWAN; i++) {
          Advanced.Multicast.UpstreamInterface.push(
            document.getElementById(i).checked
          );
        }

        console.log(` Apply: ${JSON.stringify(Advanced.Multicast)}`);
        Advanced.Multicast.DownStreamInterface.length = 0;
        Advanced.Multicast.DownStreamInterface.push(
          document.getElementById("DownStreamIntrf1").checked
        );

        applyThenStoreToLS("advanced-multicast.html", "Apply", Advanced);
      });
      break;
    case "advanced-port_mapping-add.html":
      console.log(`Load ${page}`, Advanced.PortMapping);
      var isAddRule = false;
      if (Advanced.PortMapping.onEdit != "") {
        filledData = Advanced.PortMapping.data.find(
          (obj) => obj.NameOfRule === Advanced.PortMapping.onEdit
        );
      } else {
        isAddRule = true;
        filledData = {
          NameOfRule: "",
          Enable: true,
          IPv4: "",
          Interface: "?",
          PortRange: [null, null],
          Protocol: "TCP",
          IPAddr: "",
          Port: "",
        };
      }
      console.log("filledData", filledData);

      var nameOfRule = document.getElementById("portAddRuleName");
      var enableRule = document.getElementById(
        "DeviceNATPortMapping_Enableresponsestatus"
      );
      var ipv4 = document.getElementById("host");
      var showSelectInterface = document.getElementById("showSelectInterface");
      var interfaceSelect = document.getElementById("virtualinreface");
      var allInterfaceCheck = document.getElementById(
        "DeviceNATPortMapping_AllInterfaces"
      );
      var startPort = document.getElementById("startport");
      var endPort = document.getElementById("endportrange");
      var protocolSelect = document.getElementById("virtualprotocol");
      var IPaddr = document.getElementById("client");
      var port = document.getElementById("internalport");

      var fillData = function () {
        nameOfRule.value = filledData.NameOfRule;
        enableRule.checked = filledData.Enable;
        ipv4.value = filledData.IPv4;

        for (const elem of Basic.WAN.Interfaces) {
          var optionElement = document.createElement("option");
          optionElement.value = elem.Name; // as value, corresponds to index of itself in SSIDs array
          optionElement.label = elem.Name;
          optionElement.textContent = elem.Name;
          interfaceSelect.appendChild(optionElement);
        }

        if (filledData.Interface == "All") {
          allInterfaceCheck.checked = true;
          showSelectInterface.classList.add("ng-hide");
          document
            .getElementById("interface_select_error")
            .classList.add("ng-hide");
          console.log(
            document.getElementById("interface_select_error").classList
          );
        } else {
          showSelectInterface.classList.remove("ng-hide");
          interfaceSelect.value = filledData.Interface;
          checkError_selectField(
            interfaceSelect,
            document.getElementById("interface_select_error")
          );
        }
        startPort.value = filledData.PortRange[0];
        endPort.value = filledData.PortRange[1];
        protocolSelect.value = filledData.Protocol;
        IPaddr.value = filledData.IPAddr;
        port.value = filledData.Port;

        // check Error (in case add so need to check empty)
        checkPattern_inputField(
          nameOfRule,
          new RegExp(nameOfRule.getAttribute("pattern")),
          document.getElementById("invalid_name_error"),
          document.getElementById("empty_name_error")
        );

        checkPattern_inputField(
          ipv4,
          new RegExp(ipv4.getAttribute("pattern")),
          document.getElementById("invalid_ipv4_error"),
          document.getElementById("empty_ipv4_error")
        );

        checkMinMaxError_inputField(
          startPort,
          document.getElementById("min_start_error"),
          document.getElementById("max_start_error"),
          document.getElementById("empty_start_error")
        );

        checkMinMaxError_inputField(
          endPort,
          document.getElementById("min_end_error"),
          document.getElementById("max_end_error"),
          document.getElementById("empty_end_error")
        );

        checkPattern_inputField(
          IPaddr,
          new RegExp(IPaddr.getAttribute("pattern")),
          document.getElementById("invalid_ipaddr_error"),
          document.getElementById("empty_ipaddr_error")
        );

        checkMinMaxError_inputField(
          port,
          document.getElementById("min_port_error"),
          document.getElementById("max_port_error"),
          document.getElementById("empty_port_error")
        );
      };

      // init event on element
      var initEvent = function () {
        nameOfRule.addEventListener("input", () => {
          document
            .getElementById("duplicate_name_error")
            .classList.add("ng-hide");
          checkPattern_inputField(
            nameOfRule,
            new RegExp(nameOfRule.getAttribute("pattern")),
            document.getElementById("invalid_name_error"),
            document.getElementById("empty_name_error")
          );
        });

        ipv4.addEventListener("input", () => {
          checkPattern_inputField(
            ipv4,
            new RegExp(ipv4.getAttribute("pattern")),
            document.getElementById("invalid_ipv4_error"),
            document.getElementById("empty_ipv4_error")
          );
        });

        interfaceSelect.addEventListener("change", () => {
          checkError_selectField(
            interfaceSelect,
            document.getElementById("interface_select_error")
          );
        });

        startPort.addEventListener("input", () => {
          document.getElementById("portRangeInvalid").classList.add("ng-hide");
          checkMinMaxError_inputField(
            startPort,
            document.getElementById("min_start_error"),
            document.getElementById("max_start_error"),
            document.getElementById("empty_start_error")
          );
        });

        endPort.addEventListener("input", () => {
          document.getElementById("portRangeInvalid").classList.add("ng-hide");
          checkMinMaxError_inputField(
            endPort,
            document.getElementById("min_end_error"),
            document.getElementById("max_end_error"),
            document.getElementById("empty_end_error")
          );
        });

        IPaddr.addEventListener("input", () => {
          checkPattern_inputField(
            IPaddr,
            new RegExp(IPaddr.getAttribute("pattern")),
            document.getElementById("invalid_ipaddr_error"),
            document.getElementById("empty_ipaddr_error")
          );
        });

        port.addEventListener("input", () => {
          checkMinMaxError_inputField(
            port,
            document.getElementById("min_port_error"),
            document.getElementById("max_port_error"),
            document.getElementById("empty_port_error")
          );
        });

        allInterfaceCheck.addEventListener("change", () => {
          if (allInterfaceCheck.checked == true) {
            showSelectInterface.classList.add("ng-hide");
            document
              .getElementById("interface_select_error")
              .classList.add("ng-hide");
          } else {
            checkError_selectField(
              interfaceSelect,
              document.getElementById("interface_select_error")
            );
            showSelectInterface.classList.remove("ng-hide");
          }
        });
      };

      // first fill data into FE
      fillData();

      // init event on each element
      initEvent();

      document.getElementById("Close").addEventListener("click", () => {
        applyThenStoreToLS("advanced-port_mapping.html", "Cancel");
      });

      function verifyRule() {
        const currentRules = Advanced.PortMapping.data.filter(
          (obj) => obj.NameOfRule !== Advanced.PortMapping.onEdit
        );
        console.log("Current rule: ", currentRules);
        // step 1: check name
        // check name of rule if it is duplicated
        for (const elem of currentRules) {
          if (nameOfRule.value === elem.NameOfRule) {
            document
              .getElementById("duplicate_name_error")
              .classList.remove("ng-hide");
            console.log("Check rule false Step 1");
            return false;
          }
        }

        // step 2: check Port range && interface && protocol
        //check port range
        if (parseInt(endPort.value) < parseInt(startPort.value)) {
          document
            .getElementById("portRangeInvalid")
            .classList.remove("ng-hide");
          return false;
        }
        var onPageInterface;
        allInterfaceCheck.checked
          ? (onPageInterface = "All")
          : (onPageInterface = interfaceSelect.value);
        for (const elem of currentRules) {
          if (
            elem.PortRange[0] == startPort.value.toString() &&
            elem.PortRange[1] == endPort.value.toString() &&
            elem.Interface === onPageInterface &&
            elem.Protocol === protocolSelect.value
          ) {
            document
              .getElementById("duplicate_name_error")
              .classList.remove("ng-hide");
            console.log("Check rule false Step 2");
            return false;
          }
        }

        // step 3: check all infor
        for (const elem of currentRules) {
          if (
            nameOfRule.value === elem.NameOfRule &&
            elem.PortRange[0] === startPort.value.toString() &&
            elem.PortRange[1] === endPort.value.toString() &&
            elem.Interface === onPageInterface &&
            elem.IPv4 === ipv4.value &&
            elem.IPAddr === IPaddr.value &&
            elem.Port === port.value.toString() &&
            elem.Protocol === protocolSelect.value
          ) {
            document
              .getElementById("duplicate_name_error")
              .classList.remove("ng-hide");
            console.log("Check rule false Step 3");
            return false;
          }
        }
        document
          .getElementById("duplicate_name_error")
          .classList.add("ng-hide");
        return true;
      }

      document.getElementById("Apply").addEventListener("click", () => {
        if (
          verifyRule() &&
          checkError_show(document.querySelectorAll(".error"))
        ) {
          filledData.NameOfRule = nameOfRule.value;
          filledData.Enable = enableRule.checked;
          filledData.IPv4 = ipv4.value;

          if (allInterfaceCheck.checked == true) {
            filledData.Interface = "All";
          } else {
            filledData.Interface = interfaceSelect.value;
          }
          filledData.PortRange[0] = startPort.value;
          filledData.PortRange[1] = endPort.value;
          filledData.IPAddr = IPaddr.value;
          filledData.Port = port.value;

          if (isAddRule) {
            Advanced.PortMapping.data.push(filledData);
          }
          applyThenStoreToLS("advanced-port_mapping.html", "Apply", Advanced);
        } else {
          console.log("Apply fail");
        }
      });
      break;
    case "advanced-port_mapping.html":
      console.log(`Load ${page}`, Advanced.PortMapping);

      var filledData = Advanced.PortMapping.data;

      var addBtn = document.getElementById("Device.NAT.PortMapping");
      var tbody = document.getElementById("bodyData");
      var rowElem = document.getElementById("rowElem");

      // fill data
      for (const elem of filledData) {
        const tr = rowElem.content.cloneNode(true);

        elem.Enable
          ? tr.querySelector(".enable").classList.add("gemtek-enabled")
          : tr.querySelector(".enable").classList.add("gemtek-disabled");
        tr.querySelector(".name").textContent = elem.NameOfRule;
        tr.querySelector(".interface").textContent = elem.Interface;
        tr.querySelector(".remote").textContent = elem.IPv4;
        tr.querySelector(".startPort").textContent = elem.PortRange[0];
        tr.querySelector(".endPort").textContent = elem.PortRange[1];
        tr.querySelector(".internalPort").textContent = elem.Port;
        tr.querySelector(".protocol").textContent = elem.Protocol;
        tr.querySelector(".lan").textContent = elem.IPAddr;

        const editBtn = tr.querySelector(".editBtn");
        const deleteBtn = tr.querySelector(".deleteBtn");

        editBtn.addEventListener("click", () => {
          Advanced.PortMapping.onEdit = editBtn
            .closest("tr")
            .querySelector(".name")
            .textContent.trim();
          applyThenStoreToLS(
            "advanced-port_mapping-add.html",
            "Apply",
            Advanced
          ); // do not need modify anything so Cancel is make sense
        });

        deleteBtn.addEventListener("click", () => {
          var deletedRow = deleteBtn.closest("tr");
          deleteDialogHandle(
            deletedRow,
            "Delete Port Rule",
            "Are you sure you want to Delete ?"
          )
            .then(() => {
              filledData.splice(deletedRow.rowIndex - 1, 1); // the name of column is index 0
              applyThenStoreToLS(page, "Apply", Advanced);
            })
            .catch(() => {
              console.log("Cancel delete");
            });
        });

        tbody.appendChild(tr);
      }

      // init event
      addBtn.addEventListener("click", () => {
        Advanced.PortMapping.onEdit = "";
        applyThenStoreToLS("advanced-port_mapping-add.html", "Apply", Advanced);
      });

      break;
    case "advanced-port_triggering-add.html":
      console.log(`Load ${page}`, Advanced.PortTriggering);

      var filledData;
      var addFlag = false;
      if (Advanced.PortTriggering.onEdit === "") {
        addFlag = true;
        filledData = {
          EnaRule: true,
          TrigerPort: "",
          TrigerPortRange: "",
          TrigerProtocol: "0",
          IncomingPort: "",
          IncomingPortRange: "",
          IncomingProtocol: "0",
        };
      } else {
        filledData =
          Advanced.PortTriggering.Rules[
            parseInt(Advanced.PortTriggering.onEdit)
          ];
      }

      console.log(`filledData: ${JSON.stringify(filledData)}`);

      var enaRule = document.getElementById(
        "DeviceNATX_GTK_PortTriggering_Enable"
      );
      var triggerPort = document.getElementById("TriggerPort");
      var triggerPortRange = document.getElementById("TriggerPortEndRange");
      var triggerProtocol = document.getElementById("TriggerProtocol");
      var incomingPort = document.getElementById("OpenPort");
      var incomingPortRange = document.getElementById("OpenPortEndRange");
      var incomingPortProtocol = document.getElementById("OpenProtocol");

      var fillData = () => {
        enaRule.checked = filledData.EnaRule;
        triggerPort.value = filledData.TrigerPort;
        triggerPortRange.value = filledData.TrigerPortRange;
        triggerProtocol.value = filledData.TrigerProtocol;
        incomingPort.value = filledData.IncomingPort;
        incomingPortRange.value = filledData.IncomingPortRange;
        incomingPortProtocol.value = filledData.IncomingProtocol;

        // check errror in case it's Add new
        checkMinMaxError_inputField(
          triggerPort,
          document.getElementById("lowLimit_triggerPort_error"),
          document.getElementById("upLimit_triggerPort_error"),
          document.getElementById("invalid_triggerPort_error")
        );
        checkMinMaxError_inputField(
          triggerPortRange,
          document.getElementById("lowLimit_triggerRange_error"),
          document.getElementById("upLimit_triggerRange_error"),
          document.getElementById("invalid_triggerRange_error")
        );
        checkMinMaxError_inputField(
          incomingPort,
          document.getElementById("lowLimit_incoming_error"),
          document.getElementById("upLimit_incoming_error"),
          document.getElementById("invalid_incoming_error")
        );
        checkMinMaxError_inputField(
          incomingPortRange,
          document.getElementById("lowLimit_incomingRange_error"),
          document.getElementById("upLimit_incomingRange_error"),
          document.getElementById("invalid_incomingRange_error")
        );
      };

      var initEvent = () => {
        triggerPort.addEventListener("input", () => {
          checkMinMaxError_inputField(
            triggerPort,
            document.getElementById("lowLimit_triggerPort_error"),
            document.getElementById("upLimit_triggerPort_error"),
            document.getElementById("invalid_triggerPort_error")
          );
        });

        triggerPortRange.addEventListener("input", () => {
          checkMinMaxError_inputField(
            triggerPortRange,
            document.getElementById("lowLimit_triggerRange_error"),
            document.getElementById("upLimit_triggerRange_error"),
            document.getElementById("invalid_triggerRange_error")
          );
        });

        incomingPort.addEventListener("input", () => {
          checkMinMaxError_inputField(
            incomingPort,
            document.getElementById("lowLimit_incoming_error"),
            document.getElementById("upLimit_incoming_error"),
            document.getElementById("invalid_incoming_error")
          );
        });

        incomingPortRange.addEventListener("input", () => {
          checkMinMaxError_inputField(
            incomingPortRange,
            document.getElementById("lowLimit_incomingRange_error"),
            document.getElementById("upLimit_incomingRange_error"),
            document.getElementById("invalid_incomingRange_error")
          );
        });
      };

      fillData();
      initEvent();

      // apply & cancel button
      document.getElementById("Close").addEventListener("click", () => {
        applyThenStoreToLS("advanced-port_triggering.html", "Cancel");
      });

      document.getElementById("Add").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          // take data
          filledData.EnaRule = enaRule.checked;
          filledData.TrigerPort = triggerPort.value;
          filledData.TrigerPortRange = triggerPortRange.value;
          filledData.TrigerProtocol = triggerProtocol.value;
          filledData.IncomingPort = incomingPort.value;
          filledData.IncomingPortRange = incomingPortRange.value;
          filledData.IncomingProtocol = incomingPortProtocol.value;

          if (addFlag === true) Advanced.PortTriggering.Rules.push(filledData);

          applyThenStoreToLS(
            "advanced-port_triggering.html",
            "Apply",
            Advanced
          );
        } else {
          console.log("Apply fail");
        }
      });
      break;
    case "advanced-port_triggering.html":
      console.log(`Load ${page}`, Advanced.PortTriggering);

      var tbody = document.getElementById("bodyData");
      var ruleElem = document.getElementById("ruleTemplate");

      var fillData = () => {
        for (const [index, elem] of Advanced.PortTriggering.Rules.entries()) {
          const tr = ruleElem.content.cloneNode(true);
          tr.querySelector("tr").setAttribute("index", index);

          const enaRule = tr.querySelector(".enaRule");
          const triggerPort = tr.querySelector(".triggerPort");
          const triggerRange = tr.querySelector(".triggerRange");
          const triggerProtocol = tr.querySelector(".triggerProtocol");
          const incoming = tr.querySelector(".incoming");
          const incomingRage = tr.querySelector(".incomingRange");
          const incomingProtocol = tr.querySelector(".incomingProtocol");

          const editBtn = tr.querySelector(".editBtn");
          const deleteBtn = tr.querySelector(".deleteBtn");

          elem.EnaRule
            ? enaRule.classList.add("gemtek-enabled")
            : enaRule.classList.add("gemtek-disabled");
          triggerPort.textContent = elem.TrigerPort;
          triggerRange.textContent = elem.TrigerPortRange;
          if (elem.TrigerProtocol == "0") triggerProtocol.textContent = "TCP";
          else triggerProtocol.textContent = "UDP";

          incoming.textContent = elem.IncomingPort;
          incomingRage.textContent = elem.IncomingPortRange;
          if (elem.IncomingProtocol == "0")
            incomingProtocol.textContent = "TCP";
          else incomingProtocol.textContent = "UDP";

          editBtn.addEventListener("click", () => {
            var index = editBtn.closest("tr").getAttribute("index");
            Advanced.PortTriggering.onEdit = parseInt(index);
            applyThenStoreToLS(
              "advanced-port_triggering-add.html",
              "Apply",
              Advanced
            );
          });

          deleteBtn.addEventListener("click", () => {
            var index = deleteBtn.closest("tr").getAttribute("index");
            if (window.confirm("Are you sure you want to Delete ?")) {
              Advanced.PortTriggering.Rules.splice(
                parseInt(index), // because the first line is text of name
                1
              );
              applyThenStoreToLS(
                "advanced-port_triggering.html",
                "Apply",
                Advanced
              );
            }
          });

          tbody.appendChild(tr);
        }
      };

      document
        .getElementById("Device.NAT.X_GTK_PortTriggering")
        .addEventListener("click", () => {
          Advanced.PortTriggering.onEdit = "";
          applyThenStoreToLS(
            "advanced-port_triggering-add.html",
            "Apply",
            Advanced
          );
        });

      fillData();
      break;
    case "advanced-static_routing.html":
      console.log(`Load ${page}`, Advanced.StaticRouting);
      // Function to create a new table row with the provided data
      function createNewRow(data, option, idx) {
        // Create a new table row
        let newRow = document.createElement("tr");
        newRow.className = "ng-scope";
        if (option == "ipv6") {
          let cellEn = document.createElement("td");
          cellEn.className = "no-padding-hr ng-scope";
          let spanEn = document.createElement("span");
          spanEn.className = "gemtek-enabled";
          cellEn.appendChild(spanEn);
          newRow.appendChild(cellEn);
        }
        // Add table cells with data
        for (let key in data) {
          let cell = document.createElement("td");
          cell.className = "no-padding-hr ng-scope";
          let span = document.createElement("span");
          span.textContent = data[key];
          cell.appendChild(span);
          newRow.appendChild(cell);
        }
        // Add the delete button cell
        let deleteCell = document.createElement("td");
        deleteCell.className = "no-padding-hr ng-scope";
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-xs table-btn no-margin";
        deleteButton.setAttribute("name", "delete");
        deleteButton.value = option;
        deleteButton.onclick = function () {
          if (
            (Advanced.StaticRouting.StaticRoutingConfiguration
              .NumberOfEntries === "1" &&
              deleteButton.value === "ipv4") ||
            (Advanced.StaticRouting.IPv6StaticRoutingConfiguration
              .NumberOfEntries === "1" &&
              deleteButton.value === "ipv6")
          ) {
            alertDialogHandle("Cannot delete all static routing rules");
            return;
          }
          document.getElementById("deletedialog").classList.remove("hide");
          document.getElementById("deletedialog").value = idx.toString();
        };
        let deleteImg = document.createElement("img");
        deleteImg.setAttribute("src", "images/icons/icon-1/delete.svg");
        deleteButton.appendChild(deleteImg);
        deleteCell.appendChild(deleteButton);
        // Add the delete dialog cell (hidden initially)
        let deleteDialogCell = document.createElement("td");
        // ... (Add the content of the delete dialog cell as needed)
        // Append cells to the row
        newRow.appendChild(deleteCell);
        newRow.appendChild(deleteDialogCell);
        return newRow;
      }

      let numberOfEntries = Number(
        Advanced.StaticRouting.StaticRoutingConfiguration.NumberOfEntries
      );
      for (let index = 0; index < numberOfEntries; index++) {
        let newStaticRoute = {
          ip: Advanced.StaticRouting.StaticRoutingConfiguration[index]
            .DestIPAddress,
          subnet:
            Advanced.StaticRouting.StaticRoutingConfiguration[index]
              .DestSubnetMask,
          gateway:
            Advanced.StaticRouting.StaticRoutingConfiguration[index]
              .GatewayIPAddress,
        };
        document
          .querySelector("#bodyData")
          .appendChild(createNewRow(newStaticRoute, "ipv4", index));
      }

      document.querySelector("#OK").onclick = () => {
        document.getElementById("deletedialog").classList.add("hide");
        let delIdx = document.getElementById("deletedialog").value;
        manageJSONData(
          Advanced,
          `StaticRouting.StaticRoutingConfiguration.${delIdx}`,
          null,
          "delete"
        );
        Advanced.StaticRouting.StaticRoutingConfiguration.NumberOfEntries = (
          Number(
            Advanced.StaticRouting.StaticRoutingConfiguration.NumberOfEntries
          ) - 1
        ).toString();
        applyThenStoreToLS(page, "Apply", Advanced);
      };

      break;
    case "advanced-static_routing-add.html":
      loadWanInterfaceToSelect(document.querySelector("#Interface"));
      console.log(`Load ${page}`, Advanced.StaticRouting);

      let destIPValid = false;
      let destSubmaskValid = false;
      let destGWValid = false;
      let ifValid = false;
      let applyBtnOn = false;
      let ipv4RouteIdx = Number(
        Advanced.StaticRouting.StaticRoutingConfiguration.NumberOfEntries
      );

      function applyBtnCheck() {
        applyBtnOn =
          destGWValid && destSubmaskValid && destIPValid && ifValid
            ? true
            : false;
        document.querySelector("#Add").disabled = applyBtnOn ? false : true;
      }

      ipv4Regex =
        /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
      document.querySelector("#Add").disabled = true;
      document.querySelectorAll("input").forEach(function (input) {
        input.onkeyup = function () {
          if (input.value.length > 0) {
            if (ipv4Regex.test(input.value)) {
              switch (input.id) {
                case "DestIPAddress":
                  document.querySelector("#DestIPNotify").innerHTML = "";
                  destIPValid = true;
                  break;
                case "DestSubnetMask":
                  document.querySelector("#subMaskNotify").innerHTML = "";
                  destSubmaskValid = true;
                  break;
                default:
                  document.querySelector("#gatewayNotify").innerHTML = "";
                  destGWValid = true;
                  break;
              }
            } else {
              switch (input.id) {
                case "DestIPAddress":
                  destIPValid = false;
                  document.querySelector("#DestIPNotify").innerHTML =
                    "Invalid pattern , Example IPv4 address :192.168.1.232";
                  break;
                case "DestSubnetMask":
                  destSubmaskValid = false;
                  document.querySelector("#subMaskNotify").innerHTML =
                    "Invalid Subnet Mask! Examples: 255.X.X.X / 254.0.0.0 / 252.0.0.0 / 248.0.0.0 / 240.0.0.0 / 224.0.0.0 / 192.0.0.0 / 128.0.0.0 ...";
                  break;
                default:
                  destGWValid = false;
                  document.querySelector("#gatewayNotify").innerHTML =
                    "Invalid pattern , Example IPv4 address :192.168.1.1";
                  break;
              }
            }
          } else {
            switch (input.id) {
              case "DestIPAddress":
                document.querySelector("#DestIPNotify").innerHTML =
                  "* This Field is Required";
                destIPValid = false;
                break;
              case "DestSubnetMask":
                document.querySelector("#subMaskNotify").innerHTML =
                  "* This Field is Required";
                destSubmaskValid = false;
                break;
              default:
                document.querySelector("#gatewayNotify").innerHTML =
                  "* This Field is Required";
                destGWValid = false;
                break;
            }
          }
          applyBtnCheck();
        };
      });

      notifyErrorForSelectElement(document.getElementById("Interface"));
      document.querySelector("#Interface").onchange = function () {
        ifValid =
          document.querySelector("#Interface").value !== "?" ? true : false;
        notifyErrorForSelectElement(document.getElementById("Interface"));
        applyBtnCheck();
      };

      // get data from input and store data to DB
      document.querySelector("#Add").addEventListener("click", function () {
        document.querySelectorAll("input").forEach(function (input) {
          if (
            input.id === "DestIPAddress" ||
            input.id === "DestSubnetMask" ||
            input.id === "GatewayIPAddress"
          ) {
            manageJSONData(
              Advanced,
              `StaticRouting.StaticRoutingConfiguration.${ipv4RouteIdx.toString()}.${
                input.id
              }`,
              input.value,
              "add"
            );
          }
        });
        ipv4RouteIdx++;
        Advanced.StaticRouting.StaticRoutingConfiguration.NumberOfEntries =
          ipv4RouteIdx.toString();
        // store data to DB
        applyThenStoreToLS(page, "Apply", Advanced);
        // back to ipv4 static routing table
        window.location.href = "advanced-static_routing.html";
      });

      break;
    case "advanced-static_routing-ipv6Config.html":
      console.log(`Load ${page}`, Advanced.StaticRouting);

      let numberOfEntriesv6 = Number(
        Advanced.StaticRouting.IPv6StaticRoutingConfiguration.NumberOfEntries
      );
      for (let index = 0; index < numberOfEntriesv6; index++) {
        let newStaticRoutev6 = {
          ip: Advanced.StaticRouting.IPv6StaticRoutingConfiguration[index]
            .DestIPPrefix,
          gateway:
            Advanced.StaticRouting.IPv6StaticRoutingConfiguration[index]
              .NextHop,
        };
        document
          .querySelector("#bodyDatav6")
          .appendChild(createNewRow(newStaticRoutev6, "ipv6", index));
      }

      document.querySelector("#OKv6").onclick = () => {
        document.getElementById("deletedialog").classList.add("hide");
        let delIdx = document.getElementById("deletedialog").value;
        manageJSONData(
          Advanced,
          `StaticRouting.IPv6StaticRoutingConfiguration.${delIdx}`,
          null,
          "delete"
        );
        Advanced.StaticRouting.IPv6StaticRoutingConfiguration.NumberOfEntries =
          (
            Number(
              Advanced.StaticRouting.IPv6StaticRoutingConfiguration
                .NumberOfEntries
            ) - 1
          ).toString();
        applyThenStoreToLS(page, "Apply", Advanced);
      };
      break;
    case "advanced-static_routing-ipv6Config-add.html":
      console.log(`Load ${page}`, Advanced.StaticRouting);
      loadWanInterfaceToSelect(document.querySelector("#Interface"));

      let destIPValidv6 = false;
      let destGWValidv6 = false;
      let ifValidv6 = false;
      let applyBtnOnv6 = false;
      let ipv6RouteIdx = Number(
        Advanced.StaticRouting.IPv6StaticRoutingConfiguration.NumberOfEntries
      );

      function applyBtnCheckv6() {
        applyBtnOnv6 =
          destGWValidv6 && destIPValidv6 && ifValidv6 ? true : false;
        document.querySelector("#Addv6").disabled = applyBtnOnv6 ? false : true;
      }

      const ipv6Regex =
        /^\s*((([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){6}(:[0-9a-fA-F]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-fA-F]{1,4}:){5}(((:[0-9a-fA-F]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-fA-F]{1,4}:){4}(((:[0-9a-fA-F]{1,4}){1,3})|((:[0-9a-fA-F]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-fA-F]{1,4}:){3}(((:[0-9a-fA-F]{1,4}){1,4})|((:[0-9a-fA-F]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-fA-F]{1,4}:){2}(((:[0-9a-fA-F]{1,4}){1,5})|((:[0-9a-fA-F]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-fA-F]{1,4}:){1}(((:[0-9a-fA-F]{1,4}){1,6})|((:[0-9a-fA-F]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-fA-F]{1,4}){1,7})|((:[0-9a-fA-F]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
      document.querySelector("#Addv6").disabled = true;
      document.querySelectorAll("input").forEach(function (input) {
        input.onkeyup = function () {
          if (input.value.length > 0) {
            if (ipv6Regex.test(input.value)) {
              switch (input.id) {
                case "DestIPPrefix":
                  document.querySelector("#DestIPPrefixNotify").innerHTML = "";
                  destIPValidv6 = true;
                  break;
                default:
                  document.querySelector("#nextHopNotify").innerHTML = "";
                  destGWValidv6 = true;
                  break;
              }
            } else {
              switch (input.id) {
                case "DestIPPrefix":
                  destIPValidv6 = false;
                  document.querySelector("#DestIPPrefixNotify").innerHTML =
                    "Invalid pattern, Example IPv6 address: 2001:0db8:85a3:0000:0000:8a2e:0370:7334";
                  break;
                default:
                  destGWValidv6 = false;
                  document.querySelector("#nextHopNotify").innerHTML =
                    "Invalid pattern, Example IPv6 address: 2001:0db8:85a3:0000:0000:8a2e:0370:7334";
                  break;
              }
            }
          } else {
            switch (input.id) {
              case "DestIPPrefix":
                document.querySelector("#DestIPPrefixNotify").innerHTML =
                  "* This Field is Required";
                destIPValidv6 = false;
                break;
              default:
                document.querySelector("#nextHopNotify").innerHTML =
                  "* This Field is Required";
                destGWValidv6 = false;
                break;
            }
          }
          applyBtnCheckv6();
        };
      });

      notifyErrorForSelectElement(document.getElementById("Interface"));
      document.querySelector("#Interface").onchange = function () {
        ifValidv6 =
          document.querySelector("#Interface").value !== "?" ? true : false;
        notifyErrorForSelectElement(document.getElementById("Interface"));
        applyBtnCheckv6();
      };

      // get data from input and store data to DB
      document.querySelector("#Addv6").addEventListener("click", function () {
        document.querySelectorAll("input").forEach(function (input) {
          if (input.id === "DestIPPrefix" || input.id === "NextHop") {
            manageJSONData(
              Advanced,
              `StaticRouting.IPv6StaticRoutingConfiguration.${ipv6RouteIdx.toString()}.${
                input.id
              }`,
              input.value,
              "add"
            );
          }
        });
        ipv6RouteIdx++;
        Advanced.StaticRouting.IPv6StaticRoutingConfiguration.NumberOfEntries =
          ipv6RouteIdx.toString();
        // store data to DB
        applyThenStoreToLS(page, "Apply", Advanced);
        // back to IPv6 static routing table
        window.location.href = "advanced-static_routing-ipv6Config.html";
      });

      break;
    case "advanced-upnp.html":
      console.log(`Load ${page}`, Advanced.UPnP);

      var enaUPnP = document.getElementById("DeviceUPnPDevice_Enable");

      // fill data
      Advanced.UPnP.EnaUPnP
        ? enaUPnP.classList.add("checked")
        : enaUPnP.classList.remove("checked");

      // event
      enaUPnP.addEventListener("click", () => {
        enaUPnP.classList.toggle("checked");
      });

      // Apply and Cancel
      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS(page, "Cancel");
      });

      document.getElementById("Modify").addEventListener("click", () => {
        Advanced.UPnP.EnaUPnP = enaUPnP.classList.contains("checked");

        applyThenStoreToLS(page, "Apply", Advanced);
      });
      break;
    case "advanced-vpn.html":
      console.log(`Load ${page}`, Advanced.vpn);
      function createIpsecRow(data, index) {
        // Create <tr> element
        var tr = document.createElement("tr");
        tr.classList.add("ng-scope");
        // Iterate through data and create <td> elements
        for (var key in data) {
          var td = document.createElement("td");
          td.classList.add("no-padding-hr", "ng-scope");

          var span = document.createElement("span");
          if (key === "openwrtipsecremote_enabled") {
            if (data[key] === "on") {
              span.classList.add("gemtek-enabled");
            } else {
              span.classList.add("gemtek-disabled");
            }
          } else {
            // Create <span> element for non-array data
            var span = document.createElement("span");
            span.classList.add("ng-binding", "ng-scope");
            span.textContent = data[key];
          }
          td.appendChild(span);
          tr.appendChild(td);
        }
        // Create buttons and append to the last <td>
        var lastTd = document.createElement("td");
        lastTd.classList.add("no-padding-hr", "ng-scope");
        var editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-xs", "table-btn-txt");
        editButton.setAttribute("name", "edit");
        editButton.setAttribute("id", "openwrt.ipsec.remote.1");
        editButton.addEventListener("click", function () {
          manageJSONData(
            Advanced,
            `vpn.openwrtipsecremote.${index.toString()}.status`,
            "onchanging",
            "add"
          );
          applyThenStoreToLS(page, "Apply", Advanced);
          window.location.href = "advanced-vpn-add.html";
        });
        editButton.innerHTML = '<img src="images/icons/icon-1/edit.svg" />';
        lastTd.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-xs", "table-btn", "no-margin");
        deleteButton.setAttribute("popupinfo", "openwrtipsecremote");
        deleteButton.setAttribute("name", "delete");
        deleteButton.setAttribute("id", "openwrt.ipsec.remote.1");
        deleteButton.addEventListener("click", function () {
          document.getElementById("deletedialog").classList.remove("hide");
          document.getElementById("deletedialog").value = index.toString();
        });
        deleteButton.innerHTML = '<img src="images/icons/icon-1/delete.svg" />';
        lastTd.appendChild(deleteButton);

        // Append last <td> to <tr>
        tr.appendChild(lastTd);

        // Return the created <tr> element
        return tr;
      }

      let numberOfTunnel = Number(
        Advanced.vpn.openwrtipsecremote.NumberOfEntries
      );
      for (let index = 0; index < numberOfTunnel; index++) {
        let tunnelInfo = {
          openwrtipsecremote_enabled:
            Advanced.vpn.openwrtipsecremote[index].openwrtipsecremote_enabled,
          tunnel_name: Advanced.vpn.openwrtipsecremote[index].tunnel_name,
          acceptable_kmp: Advanced.vpn.openwrtipsecremote[index].acceptable_kmp,
          conn_ifname: Advanced.vpn.openwrtipsecremote[index].conn_ifname,
          remote_ip: Advanced.vpn.openwrtipsecremote[index].remote_ip,
          src: Advanced.vpn.openwrtipsecremote[index].src,
          dst: Advanced.vpn.openwrtipsecremote[index].dst,
        };
        document
          .querySelector("#bodyData")
          .appendChild(createIpsecRow(tunnelInfo, index));
      }

      document.querySelector("#OK").onclick = () => {
        document.getElementById("deletedialog").classList.add("hide");
        let delIdx = document.getElementById("deletedialog").value;
        manageJSONData(
          Advanced,
          `vpn.openwrtipsecremote.${delIdx}`,
          null,
          "delete"
        );
        Advanced.vpn.openwrtipsecremote.NumberOfEntries = (
          Number(Advanced.vpn.openwrtipsecremote.NumberOfEntries) - 1
        ).toString();
        applyThenStoreToLS(page, "Apply", Advanced);
      };

      break;
    case "advanced-vpn-add.html":
      console.log(`Load ${page}`, Advanced.vpn);
      loadWanInterfaceToSelect(document.querySelector("#conn_ifname"));
      let is_tunnel_name_valid = false;
      let is_openwrtipsecremotepre_shared_key_valid = false;
      let is_acceptable_kmp_valid = false;
      let is_conn_ifname_valid = false;
      let is_remote_ip_valid = false;
      let is_src_valid = false;
      let is_dst_valid = false;
      let is_kmp_enc_alg_valid = false;
      let is_kmp_hash_alg_valid = false;
      let is_kmp_dh_group_valid = false;
      let is_encryption_algorithm_valid = false;
      let is_hash_algorithm_valid = false;
      let is_enc_dh_group_valid = false;
      let is_ipsec_sa_lifetime_time_valid = false;
      let ipsec_apply_btn_on = false;
      let is_edit_ipsec = false;
      let edit_tunnel_idx = -1;
      let tunnel_idx = Number(Advanced.vpn.openwrtipsecremote.NumberOfEntries);
      const ipv4Regex1 =
        /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
      const isValidSubnet = (subnet) =>
        /^(\d{1,3}\.){3}\d{1,3}\/(0|1\d|2[0-9]|3[0-2])$/.test(subnet) &&
        subnet
          .split("/")
          .every((val, index) =>
            index === 0 ? /^(\d{1,3}\.){3}\d{1,3}$/.test(val) : true
          );
      const isNumberGreaterThanOne = (value) =>
        typeof value === "number" && value > 1;

      for (let index = 0; index < tunnel_idx; index++) {
        if (Advanced.vpn.openwrtipsecremote[index].status !== "unchanged") {
          // edit ipsec tunnel
          is_edit_ipsec = true;
          edit_tunnel_idx = index;
          document.querySelector("#openwrtipsecremote_enabled").checked =
            Advanced.vpn.openwrtipsecremote[index]
              .openwrtipsecremote_enabled === "on"
              ? true
              : false;
          document.querySelector("#tunnel_name").value =
            Advanced.vpn.openwrtipsecremote[index].tunnel_name;
          document.querySelector("#openwrtipsecremotepre_shared_key").value =
            Advanced.vpn.openwrtipsecremote[
              index
            ].openwrtipsecremotepre_shared_key;
          document.querySelector("#acceptable_kmp").value =
            Advanced.vpn.openwrtipsecremote[index].acceptable_kmp;
          document.querySelector("#conn_ifname").value =
            Advanced.vpn.openwrtipsecremote[index].conn_ifname;
          document.querySelector("#remote_ip").value =
            Advanced.vpn.openwrtipsecremote[index].remote_ip;
          document.querySelector("#src").value =
            Advanced.vpn.openwrtipsecremote[index].src;
          document.querySelector("#dst").value =
            Advanced.vpn.openwrtipsecremote[index].dst;
          document.querySelector("#kmp_enc_alg").value =
            Advanced.vpn.openwrtipsecremote[index].kmp_enc_alg;
          document.querySelector("#kmp_hash_alg").value =
            Advanced.vpn.openwrtipsecremote[index].kmp_hash_alg;
          document.querySelector("#kmp_dh_group").value =
            Advanced.vpn.openwrtipsecremote[index].kmp_dh_group;
          document.querySelector("#encryption_algorithm").value =
            Advanced.vpn.openwrtipsecremote[index].encryption_algorithm;
          document.querySelector("#hash_algorithm").value =
            Advanced.vpn.openwrtipsecremote[index].hash_algorithm;
          document.querySelector("#enc_dh_group").value =
            Advanced.vpn.openwrtipsecremote[index].enc_dh_group;
          document.querySelector("#ipsec_sa_lifetime_time").value =
            Advanced.vpn.openwrtipsecremote[index].ipsec_sa_lifetime_time;
          Advanced.vpn.openwrtipsecremote[index].status = "unchanged";
          localStorage.setItem("Advanced", JSON.stringify(Advanced));
        }
      }

      if (is_edit_ipsec) {
        is_tunnel_name_valid = true;
        is_openwrtipsecremotepre_shared_key_valid = true;
        is_acceptable_kmp_valid = true;
        is_conn_ifname_valid = true;
        is_remote_ip_valid = true;
        is_src_valid = true;
        is_dst_valid = true;
        is_kmp_enc_alg_valid = true;
        is_kmp_hash_alg_valid = true;
        is_kmp_dh_group_valid = true;
        is_encryption_algorithm_valid = true;
        is_hash_algorithm_valid = true;
        is_enc_dh_group_valid = true;
        is_ipsec_sa_lifetime_time_valid = true;
        ipsec_apply_btn_on = true;
        is_edit_ipsec = true;
      } else {
        document.querySelector("#tunnel_name_notify").innerHTML =
          "* This Field is Required";
        document.querySelector(
          "#openwrtipsecremotepre_shared_key_notify"
        ).innerHTML = "* This Field is Required";
        document.querySelector("#remote_ip_notify").innerHTML =
          "* This Field is Required";
        document.querySelector("#src_notify").innerHTML =
          "* This Field is Required";
        document.querySelector("#dst_notify").innerHTML =
          "* This Field is Required";
        document.querySelector("#ipsec_sa_lifetime_time_notify").innerHTML =
          "* This Field is Required";
      }

      function ipsec_apply_btn_Check() {
        ipsec_apply_btn_on =
          is_tunnel_name_valid &&
          is_openwrtipsecremotepre_shared_key_valid &&
          is_acceptable_kmp_valid &&
          is_conn_ifname_valid &&
          is_remote_ip_valid &&
          is_src_valid &&
          is_dst_valid &&
          is_kmp_enc_alg_valid &&
          is_kmp_hash_alg_valid &&
          is_kmp_dh_group_valid &&
          is_encryption_algorithm_valid &&
          is_hash_algorithm_valid &&
          is_enc_dh_group_valid &&
          is_ipsec_sa_lifetime_time_valid
            ? true
            : false;

        document.querySelector("#Add").disabled = !ipsec_apply_btn_on;
      }

      document.querySelector("#Add").disabled = !ipsec_apply_btn_on;

      function input_valid_check(input) {
        if (input.value.length > 0) {
          switch (input.id) {
            case "tunnel_name":
              is_tunnel_name_valid = true;
              document.querySelector("#tunnel_name_notify").innerHTML = "";
              break;
            case "openwrtipsecremotepre_shared_key":
              is_openwrtipsecremotepre_shared_key_valid = true;
              document.querySelector(
                "#openwrtipsecremotepre_shared_key_notify"
              ).innerHTML = "";
              break;
            case "remote_ip":
              is_remote_ip_valid = ipv4Regex1.test(input.value);
              document.querySelector("#remote_ip_notify").innerHTML =
                is_remote_ip_valid
                  ? ""
                  : "* Invalid pattern , Example IPv4 address :192.168.1.232";
              break;
            case "src":
              is_src_valid = isValidSubnet(input.value);
              document.querySelector("#src_notify").innerHTML = is_src_valid
                ? ""
                : "* Subnet in classless format only eg: 192.168.1.0/24";
              break;
            case "dst":
              is_dst_valid = isValidSubnet(input.value);
              document.querySelector("#dst_notify").innerHTML = is_dst_valid
                ? ""
                : "* Subnet in classless format only eg: 192.168.6.0/24";
              break;
            case "ipsec_sa_lifetime_time":
              is_ipsec_sa_lifetime_time_valid = isNumberGreaterThanOne(
                Number(input.value)
              );
              document.querySelector(
                "#ipsec_sa_lifetime_time_notify"
              ).innerHTML = is_ipsec_sa_lifetime_time_valid
                ? ""
                : "* Value must be greater than or equal to 1";
              break;
          }
        } else {
          switch (input.id) {
            case "tunnel_name":
              document.querySelector("#tunnel_name_notify").innerHTML =
                "* This Field is Required";
              is_tunnel_name_valid = false;
              break;
            case "openwrtipsecremotepre_shared_key":
              document.querySelector(
                "#openwrtipsecremotepre_shared_key_notify"
              ).innerHTML = "* This Field is Required";
              is_openwrtipsecremotepre_shared_key_valid = false;
              break;
            case "remote_ip":
              document.querySelector("#remote_ip_notify").innerHTML =
                "* This Field is Required";
              is_remote_ip_valid = false;
              break;
            case "src":
              document.querySelector("#src_notify").innerHTML =
                "* This Field is Required";
              is_src_valid = false;
              break;
            case "dst":
              document.querySelector("#dst_notify").innerHTML =
                "* This Field is Required";
              is_dst_valid = false;
              break;
            case "ipsec_sa_lifetime_time":
              document.querySelector(
                "#ipsec_sa_lifetime_time_notify"
              ).innerHTML = "* This Field is Required";
              is_ipsec_sa_lifetime_time_valid = false;
              break;
            default:
              break;
          }
        }
        ipsec_apply_btn_Check();
      }

      document.querySelectorAll("input").forEach(function (input) {
        input.onkeyup = function () {
          input_valid_check(input);
        };
      });

      document.querySelectorAll("select").forEach(function (select) {
        // After reloading pages, check select field to notify suitable message
        notifyErrorForSelectElement(select);
        // After select changing, check select field to notify suitable message
        select.onchange = () => {
          switch (select.id) {
            case "acceptable_kmp":
              is_acceptable_kmp_valid = select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            case "conn_ifname":
              is_conn_ifname_valid = select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            case "kmp_enc_alg":
              is_kmp_enc_alg_valid = select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            case "kmp_hash_alg":
              is_kmp_hash_alg_valid = select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            case "kmp_dh_group":
              is_kmp_dh_group_valid = select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            case "encryption_algorithm":
              is_encryption_algorithm_valid =
                select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            case "hash_algorithm":
              is_hash_algorithm_valid = select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            case "enc_dh_group":
              is_enc_dh_group_valid = select.value !== "?" ? true : false;
              notifyErrorForSelectElement(select);
              break;
            default:
              break;
          }
          ipsec_apply_btn_Check();
        };
      });

      // get data from input and store data to DB
      document.querySelector("#Add").addEventListener("click", function () {
        if (is_edit_ipsec) {
          tunnel_idx = edit_tunnel_idx;
        }
        manageJSONData(
          Advanced,
          `vpn.openwrtipsecremote.${tunnel_idx.toString()}.status`,
          "unchanged",
          "add"
        );
        document.querySelectorAll("input").forEach(function (input) {
          if (
            input.id === "tunnel_name" ||
            input.id === "openwrtipsecremotepre_shared_key" ||
            input.id === "remote_ip" ||
            input.id === "src" ||
            input.id === "dst" ||
            input.id === "ipsec_sa_lifetime_time"
          ) {
            manageJSONData(
              Advanced,
              `vpn.openwrtipsecremote.${tunnel_idx.toString()}.${input.id}`,
              input.value,
              "add"
            );
          } else if (input.id === "openwrtipsecremote_enabled") {
            if (input.checked === true) {
              manageJSONData(
                Advanced,
                `vpn.openwrtipsecremote.${tunnel_idx.toString()}.openwrtipsecremote_enabled`,
                "on",
                "add"
              );
            } else {
              manageJSONData(
                Advanced,
                `vpn.openwrtipsecremote.${tunnel_idx.toString()}.openwrtipsecremote_enabled`,
                "off",
                "add"
              );
            }
          }
        });
        document.querySelectorAll("select").forEach(function (select) {
          if (
            select.id === "acceptable_kmp" ||
            select.id === "conn_ifname" ||
            select.id === "kmp_enc_alg" ||
            select.id === "kmp_hash_alg" ||
            select.id === "kmp_dh_group" ||
            select.id === "encryption_algorithm" ||
            select.id === "hash_algorithm" ||
            select.id === "enc_dh_group"
          ) {
            manageJSONData(
              Advanced,
              `vpn.openwrtipsecremote.${tunnel_idx.toString()}.${select.id}`,
              select.value,
              "add"
            );
          }
        });
        if (!is_edit_ipsec) {
          tunnel_idx++;
          Advanced.vpn.openwrtipsecremote.NumberOfEntries =
            tunnel_idx.toString();
          is_edit_ipsec = false;
        }

        // store data to DB
        applyThenStoreToLS(page, "Apply", Advanced);
        // back to ipv4 static routing table
        window.location.href = "advanced-vpn.html";
      });
      break;
    case "advanced-qos.html":
      console.log("Load data: ", Advanced.QoS);
      var lanDropdown = document.getElementById("LANdropdown");
      var wlanDropdown = document.getElementById("WLANdropdown");
      var ethWlanDropdown = document.getElementById("ethWLANdropdown");

      // button redirect
      var addQBtn = document.getElementById("AddQ");
      var addCLBtn = document.getElementById("AddCL");
      var addShaperBtn = document.getElementById("AddShaper");

      var fillData = function () {
        // Configuration
        Advanced.QoS.Ena
          ? document.getElementById("EnaQoS").classList.add("gemtek-enabled")
          : document.getElementById("EnaQoS").classList.add("gemtek-disabled");

        document.getElementById("Traffic").textContent =
          Advanced.QoS.TrafficClass;
        document.getElementById("DSCPMark").textContent =
          Advanced.QoS.DefaultDSCPMark;
        document.getElementById("PriorityMark").textContent =
          Advanced.QoS.EthPriorityMark;

        // Shapers
        var shaperTable = document.getElementById("shaperTable");
        var rowTemplate = document.getElementById("shaperEntry");

        for (const [index, entry] of Advanced.QoS.Shapers.entries()) {
          const tr = rowTemplate.content.cloneNode(true);

          // Set the value of the index attribute
          tr.querySelector("tr").setAttribute("index", index);

          const ena = tr.querySelector(".EnaShaper");
          const shapingRate = tr.querySelector(".shapingRate");
          const interface = tr.querySelector(".interface");
          const editShaper = tr.querySelector(".editShaper");
          const deleteShaper = tr.querySelector(".deleteShaper");

          entry.Enable
            ? ena.classList.add("gemtek-enabled")
            : ena.classList.add("gemtek-disabled");

          shapingRate.innerHTML = entry.PeakRate.toString() + "<i>kbps</i>";
          interface.textContent = entry.Interface.toString();

          editShaper.addEventListener("click", () => {
            Advanced.QoS.onEditShaper = editShaper
              .closest("tr")
              .getAttribute("index");
            applyThenStoreToLS(
              "advanced-qos-addShaper.html",
              "Apply",
              Advanced
            );
          });

          deleteShaper.addEventListener("click", () => {
            const rowTr = deleteShaper.closest("tr");
            deleteDialogHandle(
              rowTr,
              "Delete",
              "Are you sure you want to Delete ?"
            )
              .then(() => {
                Advanced.QoS.Shapers.splice(
                  parseInt(rowTr.getAttribute("index")),
                  1
                );
                applyThenStoreToLS("advanced-qos.html", "Apply", Advanced);
              })
              .catch(() => {
                console.log("Cancel delete");
              });
          });

          shaperTable.appendChild(tr);
        }

        // Queue
        const queueList = document.getElementById("queueList");
        const queueRowTemplate = document.getElementById("queueRow");

        const CLRowTemplate = document.getElementById("CLrow");
        var moreOnPage = [];

        for (const [index, queue] of Advanced.QoS.Queues.entries()) {
          const div = queueRowTemplate.content.cloneNode(true);

          div
            .querySelector(".custom_heading")
            .setAttribute("id", "row" + index.toString());

          const enable = div.querySelector(".enableStatus");
          const name = div.querySelector(".name");
          const moreBtn = div.querySelector(".moreBtn");
          const detail_panel = div.querySelector(".queueDetail");

          queue.Enable
            ? enable.setAttribute(
                "src",
                "images/icons/icon-1/gemtek-enabled.svg"
              )
            : enable.setAttribute(
                "src",
                "images/icons/icon-1/gemtek-disabled.svg"
              );

          name.textContent = queue.QueueName;
          detail_panel.setAttribute("id", "detail" + index.toString());
          moreBtn.setAttribute("id", "more" + index.toString());

          moreBtn.addEventListener("click", () => {
            var justRemove = null;
            console.log(moreOnPage);
            if (moreOnPage.length > 0) {
              document
                .getElementById(moreOnPage[0].toString())
                .classList.add("ng-hide");
              document
                .getElementById(
                  moreOnPage[0].toString().replace("detail", "more")
                )
                .classList.remove("gemtek-less-btn");
              justRemove = moreOnPage.pop();
            }
            if (justRemove != detail_panel.getAttribute("id")) {
              detail_panel.classList.remove("ng-hide");
              moreBtn.classList.add("gemtek-less-btn");
              moreBtn.classList.add("gemtek-more-btn");

              moreOnPage.push(detail_panel.getAttribute("id"));
            }
          });

          // detail
          const interfaceQueue = div.querySelector(".interfaceQueue");
          const precedence = div.querySelector(".precedence");
          const scheduler = div.querySelector(".scheduler");

          const editQ = div.querySelector(".editQ");
          const deleteQ = div.querySelector(".deleteQ");

          /* value */
          interfaceQueue.textContent = queue.Interface;
          precedence.textContent = queue.QueuePrecedence;
          scheduler.textContent = queue.ScheduleAlgorithm;
          editQ.setAttribute("index", index);
          deleteQ.setAttribute("index", index);

          // disable Delete Queue
          if (queue.Classifiers.length > 0) {
            deleteQ.disabled = true;
          }

          for (const shaper of Advanced.QoS.Shapers) {
            if (shaper.Interface == queue.Interface) {
              deleteQ.disabled = true;
            }
          }

          // event on detail panel
          editQ.addEventListener("click", () => {
            Advanced.QoS.onEditQueue = editQ.getAttribute("index");
            applyThenStoreToLS("advanced-qos-addQ.html", "Apply", Advanced);
          });

          deleteQ.addEventListener("click", () => {
            Advanced.QoS.Queues.splice(
              parseInt(editQ.getAttribute("index")),
              1
            );
            deleteDialogHandle(
              document.getElementById(
                "row" + editQ.getAttribute("index").toString()
              ),
              "Delete",
              "Are you sure you want to Delete ?"
            )
              .then(() => {
                applyThenStoreToLS("advanced-qos.html", "Apply", Advanced);
              })
              .catch(() => {});
          });

          // CL
          const tbody = div.querySelector(".classifierList");

          for (const [indexCL, classifier] of queue.Classifiers.entries()) {
            const CLrow = CLRowTemplate.content.cloneNode(true);
            CLrow.querySelector(".CLindex").setAttribute("index", indexCL);

            const enaCL = CLrow.querySelector(".enaCL");
            const CLname = CLrow.querySelector(".CLname");
            const CLinterface = CLrow.querySelector(".CLinterface");
            const CLorder = CLrow.querySelector(".CLorder");

            const editCL = CLrow.querySelector(".editCL");
            const deleteCL = CLrow.querySelector(".deleteCL");

            classifier.Enable
              ? enaCL.classList.add("gemtek-enabled")
              : enaCL.classList.add("gemtek-disabled");

            CLname.textContent = classifier.ClassifierName;
            CLinterface.textContent = classifier.ClassifierInterface;
            CLorder.textContent = classifier.Order;

            editCL.addEventListener("click", () => {
              Advanced.QoS.onEditQueue = moreOnPage[0].match(/\d/g).join("");
              Advanced.QoS.onEditCL = editCL
                .closest("tr")
                .getAttribute("index");

              console.log(Advanced.QoS);
              applyThenStoreToLS("advanced-qos-addCL.html", "Apply", Advanced);
            });

            deleteCL.addEventListener("click", () => {
              deleteDialogHandle(
                deleteCL.closest("tr"),
                "Delete",
                "Are you sure you want to Delete ?"
              )
                .then(() => {
                  const listCL =
                    Advanced.QoS.Queues[
                      parseInt(moreOnPage[0].match(/\d/g).join(""))
                    ].Classifiers;
                  listCL.splice(
                    deleteCL.closest("tr").getAttribute("index"),
                    1
                  );
                  applyThenStoreToLS("advanced-qos.html", "Apply", Advanced);
                })
                .catch(() => {});
            });
            tbody.appendChild(CLrow);
          }

          queueList.appendChild(div);
        }
      };

      var initEvent = function () {
        lanDropdown.addEventListener("click", () => {
          lanDropdown.classList.toggle("open");
          wlanDropdown.classList.remove("open");
          ethWlanDropdown.classList.remove("open");
        });
        wlanDropdown.addEventListener("click", () => {
          wlanDropdown.classList.toggle("open");
          ethWlanDropdown.classList.remove("open");
          lanDropdown.classList.remove("open");
        });
        ethWlanDropdown.addEventListener("click", () => {
          ethWlanDropdown.classList.toggle("open");
          wlanDropdown.classList.remove("open");
          lanDropdown.classList.remove("open");
        });

        // redirect to other page
        addQBtn.addEventListener("click", () => {
          Advanced.QoS.onEditQueue = "";
          applyThenStoreToLS("advanced-qos-addQ.html", "Apply", Advanced);
        });
        addCLBtn.addEventListener("click", () => {
          Advanced.QoS.onEditQueue = "";
          Advanced.QoS.onEditCL = "";
          applyThenStoreToLS("advanced-qos-addCL.html", "Apply", Advanced);
        });
        addShaperBtn.addEventListener("click", () => {
          Advanced.QoS.onEditShaper = "";
          applyThenStoreToLS("advanced-qos-addShaper.html", "Apply", Advanced);
        });

        // QoS select
        window.onclick = function (event) {
          if (!event.target.closest(".qosDropdown")) {
            lanDropdown.classList.remove("open");
            wlanDropdown.classList.remove("open");
            ethWlanDropdown.classList.remove("open");
          }
        };
      };

      fillData();
      initEvent();

      break;
    case "advanced-qos-edit.html":
      var QoSEna = document.getElementById("X_GTK_QoSEnable");
      var trafficClass = document.getElementById("DefaultTrafficClass");
      var defaultDSCPMark = document.getElementById("DefaultDSCPMark");
      var ethPriorityMark = document.getElementById(
        "DefaultEthernetPriorityMark"
      );

      var fillData = function () {
        Advanced.QoS.Ena
          ? QoSEna.classList.add("checked")
          : QoSEna.classList.remove("checked");
        trafficClass.value = Advanced.QoS.TrafficClass;
        defaultDSCPMark.value = Advanced.QoS.DefaultDSCPMark;
        ethPriorityMark.value = Advanced.QoS.EthPriorityMark;
      };

      var initEvent = function () {
        QoSEna.addEventListener("click", () => {
          QoSEna.classList.toggle("checked");
        });

        trafficClass.addEventListener("input", () => {
          // if (
          //   trafficClass.value.length >
          //   trafficClass.getAttributeNames("maxlength")
          // ) {
          //   document
          //     .getElementById("exceed_error_traffic")
          //     .classList.remove("ng-hide");
          // } else {
          //   document
          //     .getElementById("exceed_error_traffic")
          //     .classList.add("ng-hide");
          // }
        });

        ethPriorityMark.addEventListener("input", () => {
          // console.log(ethPriorityMark.value.length);
          // if (
          //   ethPriorityMark.value.length >
          //   ethPriorityMark.getAttributeNames("maxlength")
          // ) {
          //   document
          //     .getElementById("exceed_error_eth")
          //     .classList.remove("ng-hide");
          // } else {
          //   document
          //     .getElementById("exceed_error_eth")
          //     .classList.add("ng-hide");
          // }
        });
      };

      fillData();
      initEvent();

      document.getElementById("Modify").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          Advanced.QoS.Ena = QoSEna.classList.contains("checked");
          Advanced.QoS.TrafficClass = trafficClass.value || "0";
          Advanced.QoS.DefaultDSCPMark = defaultDSCPMark.value;
          Advanced.QoS.EthPriorityMark = ethPriorityMark.value || "-1";
          applyThenStoreToLS("advanced-qos.html", "Apply", Advanced);
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-qos.html", "Cancel");
      });
      break;
    case "advanced-qos-addShaper.html":
      console.log("On Edit ", Advanced.QoS.onEditShaper);
      console.log("Load data ", Advanced.QoS.Shapers);

      var addFlag = Advanced.QoS.onEditShaper === "";
      var shaperElem;
      if (addFlag) {
        shaperElem = {
          Enable: false,
          ShaperName: "",
          PeakRate: "",
          Interface: "?",
          Location: "?",
        };
      } else {
        document.getElementById("breadcrumb").textContent = "Edit";
        shaperElem = Advanced.QoS.Shapers[parseInt(Advanced.QoS.onEditShaper)];
      }
      console.log(
        "Load data edit ",
        shaperElem,
        parseInt(Advanced.QoS.onEditShaper)
      );

      var enaShaper = document.getElementById("Enable");
      var shaperName = document.getElementById("Alias");
      var peakRate = document.getElementById("ShapingRate");
      var interfaceSelect = document.getElementById("X_GTK_LowerLayers");
      var location = document.getElementById("X_GTK_Location");

      var fillData = function () {
        // create the WAN interface selection element
        Basic.WAN.Interfaces.forEach((interface) => {
          var optionElement = document.createElement("option");
          optionElement.textContent = interface.Name;
          optionElement.value = interface.Name;
          interfaceSelect.appendChild(optionElement);
        });

        // fill data
        shaperElem.Enable
          ? enaShaper.classList.add("checked")
          : enaShaper.classList.remove("checked");

        shaperName.value = shaperElem.ShaperName;
        peakRate.value = shaperElem.PeakRate;
        interfaceSelect.value = shaperElem.Interface;
        location.value = shaperElem.Location;

        if (addFlag === false) location.disabled = true;

        // check error at first
        checkEmpty_inputField(
          shaperName,
          document.getElementById("empty_error_name")
        );

        checkMinMaxError_inputField(
          peakRate,
          document.getElementById("min_error_peak"),
          document.getElementById("max_error_peak"),
          document.getElementById("invalid_error_peak")
        );

        checkError_selectField(
          interfaceSelect,
          document.getElementById("select_error")
        );
      };

      var initEvent = function () {
        enaShaper.addEventListener("click", () => {
          enaShaper.classList.toggle("checked");
        });

        shaperName.addEventListener("input", () => {
          checkEmpty_inputField(
            shaperName,
            document.getElementById("empty_error_name")
          );

          if (
            shaperName.value.length > parseInt(shaperName.getAttribute("max"))
          )
            document
              .getElementById("max_error_name")
              .classList.remove("ng-hide");
          else
            document.getElementById("max_error_name").classList.add("ng-hide");
        });

        peakRate.addEventListener("input", () => {
          checkMinMaxError_inputField(
            peakRate,
            document.getElementById("min_error_peak"),
            document.getElementById("max_error_peak"),
            document.getElementById("invalid_error_peak")
          );
        });

        interfaceSelect.addEventListener("change", () => {
          var validInterface = false;
          for (const elem of Advanced.QoS.Queues) {
            if (elem.Interface == interfaceSelect.value) {
              validInterface = true;
              location.value = elem.Location;
              location.disabled = true;
              break;
            }
          }

          if (validInterface == false && interfaceSelect.value != "?") {
            document
              .getElementById("interface_error")
              .classList.remove("ng-hide");
            location.disabled = false;
            location.value = "?";
          } else {
            document.getElementById("interface_error").classList.add("ng-hide");
          }

          checkError_selectField(
            interfaceSelect,
            document.getElementById("select_error")
          );
        });
      };

      fillData();
      initEvent();

      document.getElementById("Apply").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          document.getElementById("dup_error_name").classList.add("ng-hide");
          document
            .getElementById("dup_interface_error")
            .classList.add("ng-hide");
          var dup_flag = false;
          if (addFlag) {
            for (const shaper of Advanced.QoS.Shapers) {
              // check dup name
              if (shaper.ShaperName == shaperName.value) {
                document
                  .getElementById("dup_error_name")
                  .classList.remove("ng-hide");
                dup_flag = true;
              }
              // check dup interface
              if (shaper.Interface == interfaceSelect.value) {
                document
                  .getElementById("dup_interface_error")
                  .classList.remove("ng-hide");
                dup_flag = true;
              }
            }
          }
          if (dup_flag == true) return;

          shaperElem.Enable = enaShaper.classList.contains("checked");
          shaperElem.ShaperName = shaperName.value;
          shaperElem.PeakRate = peakRate.value;
          shaperElem.Interface = interfaceSelect.value;
          shaperElem.Location = location.value;

          if (addFlag === true) Advanced.QoS.Shapers.push(shaperElem);

          applyThenStoreToLS("advanced-qos.html", "Apply", Advanced);
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-qos.html", "Cancel");
      });
      break;
    case "advanced-qos-addQ.html":
      console.log("On edit", Advanced.QoS.onEditQueue);
      console.log("Load data:", Advanced.QoS.Queues);

      var addFlag = Advanced.QoS.onEditQueue === "";
      var specificQueue;
      if (addFlag === true) {
        specificQueue = {
          Enable: false,
          QueueName: "",
          Interface: "?",
          QueuePrecedence: "0",
          TrafficClass: [],
          DropAlgorithm: "?",
          ScheduleAlgorithm: "?",
          PeakRate: "",
          Location: "?",
          REDMin: "",
          REDMax: "",
          QueueWeight: "",
          CommitedRate: "",
          QueueLength: "",
          Classifiers: [],
        };
      } else {
        document.getElementById("breadcrumb").textContent = "Edit";
        specificQueue = Advanced.QoS.Queues[parseInt(Advanced.QoS.onEditQueue)];
      }

      var enableQ = document.getElementById("Enable");
      var queueName = document.getElementById("Alias");
      var interfaceSelect = document.getElementById("X_GTK_LowerLayers");
      var queuePrecedence = document.getElementById("Precedence");

      var trafficClasses = document.getElementById(
        "DeviceQoSQueue_TrafficClasses"
      );
      const trafficList = document.querySelectorAll(".trafficList");
      var beChecked = Array.from({ length: trafficList.length }, () => 0);

      var dropAlgorithmSelect = document.getElementById("DropAlgorithm");
      var scheduleAlgorithmSelect =
        document.getElementById("SchedulerAlgorithm");
      var peakShapingRate = document.getElementById("ShapingRate");
      var location = document.getElementById("X_GTK_Location");

      // sub input at choosing algorithm
      // Drop Algorithm -- RED
      var REDthreshold = document.getElementById("REDThreshold");
      var REDPercent = document.getElementById("REDPercentage");

      // Drop Algorithm -- DT
      var queueLength = document.getElementById("X_GTK_GreenThreshold");

      // Schdule Algorithm -- WFQ
      var queueWeight = document.getElementById("Weight");
      var commitedrate = document.getElementById("X_GTK_CommittedRate");

      function dropAlApdapter(drop_algorithm) {
        switch (drop_algorithm) {
          case "RED":
            for (const REDconfig of document.querySelectorAll(".RED")) {
              REDconfig.classList.remove("ng-hide");
            }

            for (const DTconfig of document.querySelectorAll(".DT")) {
              DTconfig.classList.add("ng-hide");
            }

            checkEmpty_inputField(
              REDthreshold,
              document.getElementById("empty_error_redmin")
            );
            checkEmpty_inputField(
              REDPercent,
              document.getElementById("empty_error_redmax")
            );
            break;
          case "DT":
            for (const REDconfig of document.querySelectorAll(".RED")) {
              REDconfig.classList.add("ng-hide");
            }
            for (const DTconfig of document.querySelectorAll(".DT")) {
              DTconfig.classList.remove("ng-hide");
            }
            break;
          default: // WRED scenario
            for (const REDconfig of document.querySelectorAll(".RED")) {
              REDconfig.classList.add("ng-hide");
            }
            for (const DTconfig of document.querySelectorAll(".DT")) {
              DTconfig.classList.add("ng-hide");
            }
        }
      }

      function scheduleAlApdapter(sche_algorithm) {
        if (sche_algorithm === "WFQ") {
          for (const WFQconfig of document.querySelectorAll(".WFQ")) {
            WFQconfig.classList.remove("ng-hide");
          }
        } else {
          for (const WFQconfig of document.querySelectorAll(".WFQ")) {
            WFQconfig.classList.add("ng-hide");
          }
        }
      }

      var fillData = function () {
        specificQueue.Enable
          ? enableQ.classList.add("checked")
          : enableQ.classList.remove("checked");

        queueName.value = specificQueue.QueueName;

        // interface load
        for (const elem of Basic.WAN.Interfaces) {
          const option = document.createElement("option");
          option.text = elem.Name;
          option.value = elem.Name;
          interfaceSelect.appendChild(option);
        }
        interfaceSelect.value = specificQueue.Interface;
        queuePrecedence.value = specificQueue.QueuePrecedence;

        for (const elem of specificQueue.TrafficClass) {
          document.getElementById(elem).checked = true;
        }

        dropAlgorithmSelect.value = specificQueue.DropAlgorithm;
        dropAlApdapter(dropAlgorithmSelect.value);

        scheduleAlgorithmSelect.value = specificQueue.ScheduleAlgorithm;
        scheduleAlApdapter(scheduleAlgorithmSelect.value);

        peakShapingRate.value = specificQueue.PeakRate;
        location.value = specificQueue.Location;
        if (specificQueue.Location != "?" && addFlag === false) {
          // edit --> disable Location
          location.disabled = true;
        }

        REDthreshold.value = specificQueue.REDMin;
        REDPercent.value = specificQueue.REDMax;
        queueLength.value = specificQueue.QueueLength;
        queueWeight.value = specificQueue.QueueWeight;
        commitedrate.value = specificQueue.CommitedRate;

        // Check error
        checkEmpty_inputField(
          queueName,
          document.getElementById("empty_error_name")
        );

        checkError_selectField(
          interfaceSelect,
          document.getElementById("select_interface_error")
        );

        checkError_selectField(
          queuePrecedence,
          document.getElementById("select_precedence_error")
        );

        checkError_selectField(
          dropAlgorithmSelect,
          document.getElementById("select_drop_error")
        );

        checkError_selectField(
          scheduleAlgorithmSelect,
          document.getElementById("select_schedule_error")
        );

        checkEmpty_inputField(
          REDthreshold,
          document.getElementById("empty_error_redmin")
        );

        checkEmpty_inputField(
          REDPercent,
          document.getElementById("empty_error_redmax")
        );
      };

      var initEvent = function () {
        enableQ.addEventListener("click", () => {
          enableQ.classList.toggle("checked");
        });
        queueName.addEventListener("input", () => {
          checkEmpty_inputField(
            queueName,
            document.getElementById("empty_error_name")
          );

          if (queueName.value.length > parseInt(queueName.getAttribute("max")))
            document
              .getElementById("max_error_name")
              .classList.remove("ng-hide");
          else
            document.getElementById("max_error_name").classList.add("ng-hide");
        });

        interfaceSelect.addEventListener("change", () => {
          checkError_selectField(
            interfaceSelect,
            document.getElementById("select_interface_error")
          );
        });

        queuePrecedence.addEventListener("change", () => {
          checkError_selectField(
            queuePrecedence,
            document.getElementById("select_precedence_error")
          );
        });

        dropAlgorithmSelect.addEventListener("change", () => {
          dropAlApdapter(dropAlgorithmSelect.value);
          checkError_selectField(
            dropAlgorithmSelect,
            document.getElementById("select_drop_error")
          );
        });

        scheduleAlgorithmSelect.addEventListener("change", () => {
          scheduleAlApdapter(scheduleAlgorithmSelect.value);
          checkError_selectField(
            scheduleAlgorithmSelect,
            document.getElementById("select_schedule_error")
          );
        });

        queueLength.addEventListener("input", () => {
          checkMinMaxErrorNaN_inputField(
            queueLength,
            document.getElementById("min_error_queueLength"),
            document.getElementById("max_error_queueLength"),
            document.getElementById("invalid_error_queueLength")
          );
        });

        REDthreshold.addEventListener("input", () => {
          checkEmpty_inputField(
            REDthreshold,
            document.getElementById("empty_error_redmin")
          );
        });

        REDPercent.addEventListener("input", () => {
          checkEmpty_inputField(
            REDPercent,
            document.getElementById("empty_error_redmax")
          );
        });

        peakShapingRate.addEventListener("input", () => {
          if (peakShapingRate.value == "") {
            document
              .getElementById("min_error_peakRate")
              .classList.add("ng-hide");
            document
              .getElementById("max_error_peakRate")
              .classList.add("ng-hide");
            return;
          }
          if (
            parseInt(peakShapingRate.value) >
            parseInt(peakShapingRate.getAttribute("max"))
          ) {
            document
              .getElementById("max_error_peakRate")
              .classList.remove("ng-hide");
            document
              .getElementById("min_error_peakRate")
              .classList.add("ng-hide");
          }
          if (
            parseInt(peakShapingRate.value) <
            parseInt(peakShapingRate.getAttribute("min"))
          ) {
            document
              .getElementById("min_error_peakRate")
              .classList.remove("ng-hide");
            document
              .getElementById("max_error_peakRate")
              .classList.add("ng-hide");
          }
        });

        for (const checkBox of trafficList) {
          checkBox.addEventListener("click", () => {
            if (checkBox.checked) {
              beChecked[parseInt(checkBox.getAttribute("number")) - 1] = 1;

              // disable the others
              for (var i = 0; i < beChecked.length; i++) {
                if (beChecked[i] == 0)
                  document.getElementById(
                    `TrafficClasses${i + 1}`
                  ).disabled = true;
              }

              beChecked[parseInt(checkBox.getAttribute("number")) - 1] = 0;
            } else {
              // if not checked --> enable check all
              for (var i = 0; i < beChecked.length; i++) {
                document.getElementById(
                  `TrafficClasses${i + 1}`
                ).disabled = false;
              }
            }
          });
        }
      };

      fillData();
      initEvent();

      document.getElementById("Apply").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".checkerror"))) {
          document.getElementById("dup_error_name").classList.add("ng-hide");
          if (addFlag) {
            // check dup name
            for (const queue of Advanced.QoS.Queues) {
              if (queue.QueueName == queueName.value) {
                document
                  .getElementById("dup_error_name")
                  .classList.remove("ng-hide");
                return;
              }
            }
          }

          // if RED Algorithm --> check error at RED
          if (dropAlgorithmSelect.value == "RED") {
            if (checkError_show(document.querySelectorAll(".REDerror"))) {
              specificQueue.REDMin = REDthreshold.value;
              specificQueue.REDMax = REDPercent.value;
            } else {
              console.log("Apply fail");
            }
          }
          // if DT Algorithm --> check error at DT
          else if (dropAlgorithmSelect.value == "DT") {
            if (checkError_show(document.querySelectorAll(".DTerror"))) {
              specificQueue.QueueLength = queueLength.value;
            } else {
              console.log("Apply fail");
            }
          }

          specificQueue.Enable = enableQ.classList.contains("checked");
          specificQueue.QueueName = queueName.value;
          specificQueue.Interface = interfaceSelect.value;
          specificQueue.QueuePrecedence = queuePrecedence.value;

          specificQueue.TrafficClass = []; // reset, else at Edit it alway push new elem
          for (const traffic of trafficClasses.querySelectorAll(
            ".trafficList"
          )) {
            if (traffic.checked) {
              if (traffic.getAttribute("number") != queuePrecedence.value) {
                alertDialogHandle(
                  "Queue Precedence and Traffic Class must be equal"
                );
                return;
              }
              specificQueue.TrafficClass.push(traffic.getAttribute("id"));
            }
          }

          specificQueue.DropAlgorithm = dropAlgorithmSelect.value;
          specificQueue.ScheduleAlgorithm = scheduleAlgorithmSelect.value;
          specificQueue.PeakRate = peakShapingRate.value;

          if (location.value == "?") specificQueue.Location = "Egress";
          else specificQueue.Location = location.value;

          if (scheduleAlgorithmSelect.value == "WFQ") {
            specificQueue.QueueWeight = queueWeight.value;
            specificQueue.CommitedRate = commitedrate.value;
          }

          if (addFlag) Advanced.QoS.Queues.push(specificQueue);

          applyThenStoreToLS("advanced-qos.html", "Apply", Advanced);
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-qos.html", "Cancel");
      });

      break;
    case "advanced-qos-addCL.html":
      console.log("Load data: ", Advanced.QoS.Queues);
      console.log("onEdit Queue: ", Advanced.QoS.onEditQueue);
      console.log("onEdit Classifier: ", Advanced.QoS.onEditClassifier);

      var specificClassifier;
      if (Advanced.QoS.onEditCL && Advanced.QoS.onEditQueue) {
        document.getElementById("breadcrumb").textContent = "Edit";
        specificClassifier =
          Advanced.QoS.Queues[parseInt(Advanced.QoS.onEditQueue)].Classifiers[
            parseInt(Advanced.QoS.onEditCL)
          ];
      } else {
        specificClassifier = {
          Enable: false,
          ClassifierName: "",
          Order: "",
          ClassifierInterface: "",
          QueuingInterface: "",
          EnableMPTCP: false,
          QueueID: "",
          Layer2: {},
          Layer3: {},
          Layer4: {},
          Actions: {},
          onActiveLayer: "layer2",
        };
      }

      var enableCL = document.getElementById("Enable");
      var order = document.getElementById("DeviceQoSClassification_Order");
      var className = document.getElementById("DeviceQoSClassification_Alias");
      var classInterface = document.getElementById(
        "DeviceQoSClassification_X_GTK_LowerLayers"
      );
      var queueID = document.getElementById(
        "DeviceQoSClassification_TrafficClass"
      );
      var enableMPTCP = document.getElementById(
        "DeviceQoSClassification.X_GTK_MPTCP"
      );
      var queuingInterface = document.getElementById(
        "DeviceQoSClassification_X_GTK_OutInterface"
      );
      var onActiveLayerAtPage = specificClassifier.onActiveLayer;
      // layer 2
      var excludeSource = document.getElementById("SourceMACExclude");
      var sourceMACaddr = document.getElementById(
        "DeviceQoSClassification_SourceMACAddress"
      );
      var sourceMACmask = document.getElementById(
        "DeviceQoSClassification_SourceMACMask"
      );

      var excludeDest = document.getElementById("DestMACExclude");
      var destMACaddr = document.getElementById(
        "DeviceQoSClassification_DestMACAddress"
      );
      var destMACmask = document.getElementById(
        "DeviceQoSClassification_DestMACMask"
      );

      var excludeVLAN = document.getElementById("VLANIDExclude");
      var vlanRange = document.getElementById(
        "DeviceQoSClassification_VLANIDCheck"
      );

      var exclude = document.getElementById("EthernetPriorityExclude");
      var incoming802Select = document.getElementById(
        "DeviceQoSClassification_EthernetPriorityCheck"
      );
      // layer 3
      var incomingDSCP = document.getElementById(
        "DeviceQoSClassification_DSCPCheck"
      );
      var excludeDestIP = document.getElementById("DestIPExclude");
      var destIP = document.getElementById("DeviceQoSClassification_DestIP");
      var destMask = document.getElementById(
        "DeviceQoSClassification_DestMask"
      );

      var excludeSourceIP = document.getElementById("SourceIPExclude");
      var sourceIP = document.getElementById(
        "DeviceQoSClassification_SourceIP"
      );
      var sourceMask = document.getElementById(
        "DeviceQoSClassification_SourceMask"
      );

      // layer 4
      var excludeProtocol = document.getElementById("ProtocolExclude");
      var l4Protocol = document.getElementById(
        "DeviceQoSClassification_Protocol"
      );
      var excludeDestPort = document.getElementById("DestPortExclude");
      var destStart = document.getElementById(
        "DeviceQoSClassification_DestPort"
      );
      var destEnd = document.getElementById(
        "DeviceQoSClassification_DestPortRangeMax"
      );

      var excludeSourcePort = document.getElementById("SourcePortExclude");
      var sourceStart = document.getElementById(
        "DeviceQoSClassification_SourcePort"
      );
      var sourceEnd = document.getElementById(
        "DeviceQoSClassification_SourcePortRangeMax"
      );

      var enaTCP = document.getElementById("TCPACK");

      // actions
      var outgoing = document.getElementById(
        "DeviceQoSClassification_DSCPMark"
      );
      var outgoing802 = document.getElementById(
        "DeviceQoSClassification_EthernetPriorityMark"
      );
      var disableAcceleration = document.getElementById(
        "DeviceQoSClassification.X_GTK_DisableAcceleration"
      );
      var rateLimit = document.getElementById(
        "DeviceQoSClassification_X_GTK_LimitRate"
      );

      var fillData = function () {
        document.getElementById(onActiveLayerAtPage).classList.add("active");
        document
          .getElementById(onActiveLayerAtPage + "panel")
          .classList.remove("ng-hide");

        // fill Interface WAN
        Basic.WAN.Interfaces.forEach((interface) => {
          var optionElement = document.createElement("option");
          optionElement.textContent = interface.Name;
          optionElement.value = interface.Name;
          queuingInterface.appendChild(optionElement);
        });

        Basic.WAN.Interfaces.forEach((interface) => {
          var optionElement = document.createElement("option");
          optionElement.textContent = interface.Name;
          optionElement.value = interface.Name;
          classInterface.appendChild(optionElement);
        });

        // Queue
        Advanced.QoS.Queues.forEach((queue, index) => {
          var optionElement = document.createElement("option");
          optionElement.textContent = queue.QueueName;
          optionElement.value = index;
          queueID.appendChild(optionElement);
        });

        // data
        if (Advanced.QoS.onEditCL && Advanced.QoS.onEditQueue) {
          console.log("onEdit --> Fill data ", specificClassifier);
          Advanced.QoS.Queues[parseInt(Advanced.QoS.onEditQueue)].Classifiers[
            parseInt(Advanced.QoS.onEditCL)
          ].Enable
            ? enableCL.classList.add("checked")
            : enableCL.classList.remove("checked");
          className.value = specificClassifier.ClassifierName;
          order.value = specificClassifier.Order;
          classInterface.value = specificClassifier.ClassifierInterface;
          queuingInterface.value = specificClassifier.QueuingInterface;
          enableMPTCP.checked = specificClassifier.EnableMPTCP;
          queueID.value = specificClassifier.QueueID;
          switch (specificClassifier.onActiveLayer) {
            case "layer2":
              specificClassifier.Layer2.ExcludeSourceMAC
                ? excludeSource.classList.add("checked")
                : excludeSource.classList.remove("checked");
              sourceMACaddr.value = specificClassifier.Layer2.SourceMACAddr;
              sourceMACmask.value = specificClassifier.Layer2.SourceMACMask;

              specificClassifier.Layer2.ExcludeDestMAC
                ? excludeDest.classList.add("checked")
                : excludeDest.classList.remove("checked");
              destMACaddr.value = specificClassifier.Layer2.DestMACAddr;
              destMACmask.value = specificClassifier.Layer2.DestMACMask;

              specificClassifier.Layer2.ExcludeVLAN
                ? excludeVLAN.classList.add("checked")
                : excludeVLAN.classList.remove("checked");
              vlanRange.value = specificClassifier.Layer2.VLANIDRange;

              specificClassifier.Layer2.Exclude
                ? exclude.classList.add("checked")
                : exclude.classList.remove("checked");
              incoming802Select.value = specificClassifier.Layer2.Incoming802;
              break;
            case "layer3":
              incomingDSCP.value = specificClassifier.Layer3.IncomingDSCP;
              specificClassifier.Layer3.ExcludeDestIP
                ? excludeDestIP.classList.add("checked")
                : excludeDestIP.classList.remove("checked");
              destIP.value = specificClassifier.Layer3.DestIP;
              destMask.value = specificClassifier.Layer3.DestMask;

              specificClassifier.Layer3.ExcludeSourceIP
                ? excludeSourceIP.classList.add("checked")
                : excludeSourceIP.classList.remove("checked");
              sourceIP.value = specificClassifier.Layer3.SourceIP;
              sourceMask.value = specificClassifier.Layer3.SourceMask;
              break;
            case "layer4":
              specificClassifier.Layer4.ExcludeProtocol
                ? excludeProtocol.classList.add("checked")
                : excludeProtocol.classList.remove("checked");
              l4Protocol.value = specificClassifier.Layer4.L4Protocol;

              specificClassifier.Layer4.ExcludeDestPort
                ? excludeDestPort.classList.add("checked")
                : excludeDestPort.classList.remove("checked");
              destStart.value = specificClassifier.Layer4.DestPortStart;
              destEnd.value = specificClassifier.Layer4.DestPortEnd;

              specificClassifier.Layer4.ExcludeSourcePort
                ? excludeSourcePort.classList.add("checked")
                : excludeSourcePort.classList.remove("checked");
              sourceStart.value = specificClassifier.Layer4.SourcePortStart;
              sourceEnd.value = specificClassifier.Layer4.SourcePortEnd;

              specificClassifier.Layer4.EnableTCPAck
                ? enaTCP.classList.add("checked")
                : enaTCP.classList.remove("checked");
              break;
            case "actions":
              outgoing.value = specificClassifier.Actions.OutgoingDSCP || "?";
              outgoing802.value = specificClassifier.Actions.Outgoing802 || "?";
              specificClassifier.Actions.DisableAcceleration
                ? (disableAcceleration.checked = true)
                : (disableAcceleration.checked = false);
              rateLimit.value = specificClassifier.Actions.RateLimit;
              break;
            default:
              console.log(
                `Fill data error, ${specificClassifier.onActiveLayer} not available`
              );
          }
        }

        checkEmptyNaN_inputField(
          order,
          document.getElementById("empty_order_error"),
          document.getElementById("invalid_order_error")
        );
        checkEmpty_inputField(
          className,
          document.getElementById("empty_CLname_error")
        );
        checkError_selectField(
          classInterface,
          document.getElementById("select_CLinterface_error")
        );
        checkError_selectField(
          queueID,
          document.getElementById("select_queueID_error")
        );
      };

      var initEvent = function () {
        enableCL.addEventListener("click", () => {
          enableCL.classList.toggle("checked");
        });

        order.addEventListener("input", () => {
          if (
            checkEmptyNaN_inputField(
              order,
              document.getElementById("empty_order_error"),
              document.getElementById("invalid_order_error")
            ) == true
          ) {
            if (
              parseInt(order.value) > parseInt(order.getAttribute("max")) ||
              parseInt(order.value) < parseInt(order.getAttribute("min"))
            )
              document
                .getElementById("range_order_error")
                .classList.remove("ng-hide");
            else
              document
                .getElementById("range_order_error")
                .classList.add("ng-hide");
          } else {
            document
              .getElementById("range_order_error")
              .classList.add("ng-hide");
          }
        });
        className.addEventListener("input", () => {
          checkEmpty_inputField(
            className,
            document.getElementById("empty_CLname_error")
          );

          if (className.value.length > parseInt(className.getAttribute("max")))
            document
              .getElementById("max_error_name")
              .classList.remove("ng-hide");
          else
            document.getElementById("max_error_name").classList.add("ng-hide");
        });
        classInterface.addEventListener("change", () => {
          checkError_selectField(
            classInterface,
            document.getElementById("select_CLinterface_error")
          );
        });
        queueID.addEventListener("change", () => {
          checkError_selectField(
            queueID,
            document.getElementById("select_queueID_error")
          );
        });

        // layer switch
        document.getElementById("layer2").addEventListener("click", () => {
          document
            .getElementById(onActiveLayerAtPage)
            .classList.remove("active");
          document.getElementById("layer2").classList.add("active");
          document
            .getElementById(onActiveLayerAtPage + "panel")
            .classList.add("ng-hide");
          document.getElementById("layer2panel").classList.remove("ng-hide");
          onActiveLayerAtPage = "layer2";
        });
        document.getElementById("layer3").addEventListener("click", () => {
          document
            .getElementById(onActiveLayerAtPage)
            .classList.remove("active");
          document.getElementById("layer3").classList.add("active");
          document
            .getElementById(onActiveLayerAtPage + "panel")
            .classList.add("ng-hide");
          document.getElementById("layer3panel").classList.remove("ng-hide");
          onActiveLayerAtPage = "layer3";
        });
        document.getElementById("layer4").addEventListener("click", () => {
          document
            .getElementById(onActiveLayerAtPage)
            .classList.remove("active");
          document.getElementById("layer4").classList.add("active");
          document
            .getElementById(onActiveLayerAtPage + "panel")
            .classList.add("ng-hide");
          document.getElementById("layer4panel").classList.remove("ng-hide");
          onActiveLayerAtPage = "layer4";
        });
        document.getElementById("actions").addEventListener("click", () => {
          document
            .getElementById(onActiveLayerAtPage)
            .classList.remove("active");
          document.getElementById("actions").classList.add("active");
          document
            .getElementById(onActiveLayerAtPage + "panel")
            .classList.add("ng-hide");
          document.getElementById("actionspanel").classList.remove("ng-hide");
          onActiveLayerAtPage = "actions";
        });

        //layer2
        excludeSource.addEventListener("click", () => {
          excludeSource.classList.toggle("checked");
        });
        sourceMACaddr.addEventListener("input", () => {
          var pattern = new RegExp(
            sourceMACaddr.getAttribute("pattern").toString()
          );
          if (pattern.test(sourceMACaddr.value) || sourceMACaddr.value == "") {
            document
              .getElementById("invalid_source_MAC")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("invalid_source_MAC")
              .classList.remove("ng-hide");
          }
        });
        sourceMACmask.addEventListener("input", () => {
          var pattern = new RegExp(
            sourceMACmask.getAttribute("pattern").toString()
          );
          if (pattern.test(sourceMACmask.value) || sourceMACmask.value == "") {
            document
              .getElementById("invalid_source_MACmask")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("invalid_source_MACmask")
              .classList.remove("ng-hide");
          }
        });
        excludeDest.addEventListener("click", () => {
          excludeDest.classList.toggle("checked");
        });
        destMACaddr.addEventListener("input", () => {
          var pattern = new RegExp(
            destMACaddr.getAttribute("pattern").toString()
          );
          if (pattern.test(destMACaddr.value) || destMACaddr.value == "") {
            document
              .getElementById("invalid_dest_MAC")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("invalid_dest_MAC")
              .classList.remove("ng-hide");
          }
        });
        destMACmask.addEventListener("input", () => {
          var pattern = new RegExp(
            destMACmask.getAttribute("pattern").toString()
          );
          if (pattern.test(destMACmask.value) || destMACmask.value == "") {
            document
              .getElementById("invalid_dest_MACmask")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("invalid_dest_MACmask")
              .classList.remove("ng-hide");
          }
        });
        excludeVLAN.addEventListener("click", () => {
          excludeVLAN.classList.toggle("checked");
        });
        vlanRange.addEventListener("input", () => {
          checkRangeNaN_inputField(
            vlanRange,
            document.getElementById("rangeVLAN_error"),
            document.getElementById("invalidVLAN_error")
          );
        });
        exclude.addEventListener("click", () => {
          exclude.classList.toggle("checked");
        });

        //layer 3
        excludeDestIP.addEventListener("click", () => {
          excludeDestIP.classList.toggle("checked");
        });
        destIP.addEventListener("input", () => {
          var pattern = new RegExp(destIP.getAttribute("pattern").toString());
          if (pattern.test(destIP.value) || destIP.value == "") {
            document
              .getElementById("invalid_dest_addr")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("invalid_dest_addr")
              .classList.remove("ng-hide");
          }
        });
        destMask.addEventListener("input", () => {
          var patternv4 = new RegExp(
            destMask.getAttribute("patternv4").toString()
          );
          var patternv6 = new RegExp(
            destMask.getAttribute("patternv6").toString()
          );
          if (
            patternv4.test(destMask.value) ||
            patternv6.test(destMask.value) ||
            destMask.value == ""
          ) {
            document
              .getElementById("pattern_error_destMask")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("pattern_error_destMask")
              .classList.remove("ng-hide");
          }
        });

        excludeSourceIP.addEventListener("click", () => {
          excludeSourceIP.classList.toggle("checked");
        });
        sourceIP.addEventListener("input", () => {
          var pattern = new RegExp(sourceIP.getAttribute("pattern").toString());
          if (pattern.test(sourceIP.value) || sourceIP.value == "") {
            document
              .getElementById("invalid_source_addr")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("invalid_source_addr")
              .classList.remove("ng-hide");
          }
        });
        sourceMask.addEventListener("input", () => {
          var patternv4 = new RegExp(sourceMask.getAttribute("patternv4"));
          var patternv6 = new RegExp(sourceMask.getAttribute("patternv6"));
          if (
            patternv4.test(sourceMask.value) ||
            patternv6.test(sourceMask.value) ||
            sourceMask.value == ""
          ) {
            document
              .getElementById("pattern_error_sourceMask")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("pattern_error_sourceMask")
              .classList.remove("ng-hide");
          }
        });

        // layer4
        excludeProtocol.addEventListener("click", () => {
          excludeProtocol.classList.toggle("checked");
        });
        excludeDestPort.addEventListener("click", () => {
          excludeDestPort.classList.toggle("checked");
        });
        destStart.addEventListener("input", () => {
          checkMinMaxErrorNaN_inputField(
            destStart,
            document.getElementById("min_sdest_port_error"),
            document.getElementById("max_sdest_port_error"),
            document.getElementById("invalid_sdest_port_error")
          );
        });
        destEnd.addEventListener("input", () => {
          checkMinMaxErrorNaN_inputField(
            destEnd,
            document.getElementById("min_edest_port_error"),
            document.getElementById("max_edest_port_error"),
            document.getElementById("invalid_edest_port_error")
          );
        });
        excludeSourcePort.addEventListener("click", () => {
          excludeSourcePort.classList.toggle("checked");
        });
        sourceStart.addEventListener("input", () => {
          checkMinMaxErrorNaN_inputField(
            sourceStart,
            document.getElementById("min_ssource_port_error"),
            document.getElementById("max_ssource_port_error"),
            document.getElementById("invalid_ssource_port_error")
          );
        });
        sourceEnd.addEventListener("input", () => {
          checkMinMaxErrorNaN_inputField(
            sourceEnd,
            document.getElementById("min_esource_port_error"),
            document.getElementById("max_esource_port_error"),
            document.getElementById("invalid_esource_port_error")
          );
        });
        enaTCP.addEventListener("click", () => {
          enaTCP.classList.toggle("checked");
        });

        // actions
        rateLimit.addEventListener("input", () => {
          if (isNaN(rateLimit.value)) {
            document
              .getElementById("invalid_rate_error")
              .classList.remove("ng-hide");
            document
              .getElementById("max_error_peakRate")
              .classList.add("ng-hide");
            document
              .getElementById("min_error_peakRate")
              .classList.add("ng-hide");
          } else {
            document
              .getElementById("invalid_rate_error")
              .classList.add("ng-hide");
            if (
              parseInt(rateLimit.value) >
              parseInt(rateLimit.getAttribute("max"))
            ) {
              document
                .getElementById("max_error_peakRate")
                .classList.remove("ng-hide");
              document
                .getElementById("min_error_peakRate")
                .classList.add("ng-hide");
            }
            if (
              parseInt(rateLimit.value) <
              parseInt(rateLimit.getAttribute("min"))
            ) {
              document
                .getElementById("min_error_peakRate")
                .classList.remove("ng-hide");
              document
                .getElementById("max_error_peakRate")
                .classList.add("ng-hide");
            }
          }
        });
      };

      fillData();
      initEvent();

      document.getElementById("Apply").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".clerror"))) {
          document.getElementById("dup_error_name").classList.add("ng-hide");
          if (!(Advanced.QoS.onEditCL && Advanced.QoS.onEditQueue)) {
            // check dup CL name
            for (const queue of Advanced.QoS.Queues) {
              for (const cl of queue.Classifiers) {
                if (cl.ClassifierName == className.value) {
                  document
                    .getElementById("dup_error_name")
                    .classList.remove("ng-hide");
                  return;
                }
              }
            }
          }
          
          var layerInfoValid;
          switch (onActiveLayerAtPage) {
            case "layer2":
              layerInfoValid = checkError_show(
                document.querySelectorAll(".l2error")
              );
              specificClassifier.Layer2.ExcludeSourceMAC =
                excludeSource.classList.contains("checked");
              specificClassifier.Layer2.SourceMACAddr = sourceMACaddr.value;
              specificClassifier.Layer2.SourceMACMask = sourceMACmask.value;

              specificClassifier.Layer2.ExcludeDestMAC =
                excludeDest.classList.contains("checked");
              specificClassifier.Layer2.DestMACAddr = destMACaddr.value;
              specificClassifier.Layer2.DestMACMask = destMACmask.value;

              specificClassifier.Layer2.ExcludeVLAN =
                excludeVLAN.classList.contains("checked");
              specificClassifier.Layer2.VLANIDRange = vlanRange.value;

              specificClassifier.Layer2.Exclude =
                exclude.classList.contains("checked");
              specificClassifier.Layer2.Incoming802 = incoming802Select.value;
              specificClassifier.onActiveLayer = "layer2";
              break;
            case "layer3":
              layerInfoValid = checkError_show(
                document.querySelectorAll(".l3error")
              );

              specificClassifier.Layer3.IncomingDSCP = incomingDSCP.value;
              specificClassifier.Layer3.ExcludeDestIP =
                excludeDestIP.classList.contains("checked");
              specificClassifier.Layer3.DestIP = destIP.value;
              specificClassifier.Layer3.DestMask = destMask.value;

              specificClassifier.Layer3.ExcludeSourceIP =
                excludeSourceIP.classList.contains("checked");
              specificClassifier.Layer3.SourceIP = sourceIP.value;
              specificClassifier.Layer3.SourceMask = sourceMask.value;
              specificClassifier.onActiveLayer = "layer3";
              break;
            case "layer4":
              layerInfoValid = checkError_show(
                document.querySelectorAll(".l4error")
              );

              specificClassifier.Layer4.ExcludeProtocol =
                excludeProtocol.classList.contains("checked");
              specificClassifier.Layer4.L4Protocol = l4Protocol.value;

              specificClassifier.Layer4.ExcludeDestPort =
                excludeDestPort.classList.contains("checked");
              specificClassifier.Layer4.DestPortStart = destStart.value;
              specificClassifier.Layer4.DestPortEnd = destEnd.value;

              specificClassifier.Layer4.ExcludeSourcePort =
                excludeSourcePort.classList.contains("checked");
              specificClassifier.Layer4.SourcePortStart = sourceStart.value;
              specificClassifier.Layer4.SourcePortEnd = sourceEnd.value;

              specificClassifier.Layer4.EnableTCPAck =
                enaTCP.classList.contains("checked");
              specificClassifier.onActiveLayer = "layer4";

              break;
            case "actions":
              layerInfoValid = checkError_show(
                document.querySelectorAll(".actionserror")
              );

              specificClassifier.Actions.OutgoingDSCP = outgoing.value;
              specificClassifier.Actions.Outgoing802 = outgoing802.value;
              specificClassifier.Actions.DisableAcceleration =
                disableAcceleration.checked;
              specificClassifier.Actions.RateLimit = rateLimit.value;
              specificClassifier.onActiveLayer = "actions";
              break;
            default:
              console.log("Cannot recognize the Active Layer");
              return;
          }

          if (layerInfoValid === true) {
            specificClassifier.Enable = enableCL.classList.contains("checked");
            specificClassifier.ClassifierName = className.value;
            specificClassifier.Order = order.value;
            specificClassifier.ClassifierInterface = classInterface.value;
            specificClassifier.QueuingInterface = queuingInterface.value;
            specificClassifier.EnableMPTCP = enableMPTCP.checked;
            specificClassifier.QueueID = queueID.value;

            if (!(Advanced.QoS.onEditCL && Advanced.QoS.onEditQueue)) {
              // add
              Advanced.QoS.Queues[parseInt(queueID.value)].Classifiers.push(
                specificClassifier
              );
            }
            applyThenStoreToLS("advanced-qos.html", "Apply", Advanced);
          } else {
            console.log("Layer Valid fail");
          }
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-qos.html", "Cancel");
      });
      break;
    default:
      console.log(`Load ${page} fail --- no available page`);
      return;
  }
}
