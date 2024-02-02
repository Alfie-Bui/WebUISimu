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
      console.log(`Load ${page}\n${JSON.stringify(Advanced.ALG)}`);
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
      console.log(`Load ${page}\n${JSON.stringify(Advanced.DDNS)}`);
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
      var enaCWMP = document.getElementById(
        "DeviceManagementServer_EnableCWMP"
      );
      var localWANInterfaceSelect = document.getElementById("X_GTK_Interface");
      var acsUrl = document.getElementById("URL");
      var acsUsername = document.getElementById("Username");
      var acsPassword = document.getElementById(
        "DeviceManagementServerPassword"
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
      console.log(`Load data: ${JSON.stringify(Advanced.DMZ)}`);

      var enaDMZ = document.getElementById("DeviceNATX_GTK_DMZ_Enable");
      var ipAddr = document.getElementById("IPAddress");
      var ipError = document.getElementById("invalid_ip_error");

      // fill data
      enaDMZ.checked = Advanced.DMZ.EnableDMZ;
      ipAddr.value = Advanced.DMZ.IPAddr;

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("advanced-dmz.html", "Cancel");
      });

      var IP_DMZ_PATTERN = new RegExp(ipAddr.getAttribute("pattern"));
      ipAddr.addEventListener("input", () => {
        if (!IP_DMZ_PATTERN.test(ipAddr.value)) {
          ipError.classList.remove("ng-hide");
        } else {
          ipError.classList.add("ng-hide");
        }
      });

      document.getElementById("Apply").addEventListener("click", () => {
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
      console.log(`Load data: ${JSON.stringify(Advanced.Multicast)}`);
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
      console.log("Load data:", Advanced.PortMapping);
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
          PortRange: [],
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

        if (interfaceSelect.value == "All") {
          allInterfaceCheck.checked = true;
          showSelectInterface.classList.add("ng-hide");
        } else {
          showSelectInterface.classList.remove("ng-hide");
          interfaceSelect.value = filledData.Interface;
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

        checkError_selectField(
          interfaceSelect,
          document.getElementById("interface_select_error")
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
          checkMinMaxError_inputField(
            startPort,
            document.getElementById("min_start_error"),
            document.getElementById("max_start_error"),
            document.getElementById("empty_start_error")
          );
        });

        endPort.addEventListener("input", () => {
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

      document.getElementById("Apply").addEventListener("click", () => {
        if (checkError_show(document.querySelectorAll(".error"))) {
          filledData.NameOfRule = nameOfRule.value;
          filledData.Enable = enableRule.checked;
          filledData.IPv4 = ipv4.value;

          if (allInterfaceCheck.checked == true) {
            filledData.Interface = "All";
          } else {
            filledData.Interface = interfaceSelect.value;
          }
          filledData.PortRange.push(startPort.value, endPort.value);
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
      console.log(`Load data:`, Advanced.PortMapping);

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
      console.log(`Load data: ${JSON.stringify(Advanced.PortTriggering)}`);

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
      console.log(`Load data: ${JSON.stringify(Advanced.PortTriggering)}`);

      var tbody = document.getElementById("bodyData");
      var ruleElem = document.getElementById("ruleTemplate");

      var fillData = () => {
        for (const elem of Advanced.PortTriggering.Rules) {
          const tr = ruleElem.content.cloneNode(true);

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
            Advanced.PortTriggering.onEdit = parseInt(
              editBtn.closest("tr").rowIndex
            );
            window.location.href = "advanced-port_triggering-add.html";
          });

          deleteBtn.addEventListener("click", () => {
            if (window.confirm("Are you sure you want to Delete ?")) {
              Advanced.PortTriggering.Rules.splice(
                parseInt(deleteBtn.closest("tr").rowIndex - 1), // because the first line is text of name
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
    case "advanced-static_routing-add.html":
      break;
    case "advanced-static_routing-ipv6Config-add.html":
      break;
    case "advanced-static_routing-ipv6Config.html":
      break;
    case "advanced-static_routing.html":
      break;
    case "advanced-upnp.html":
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
    case "advanced-vpn-add.html":
      break;
    case "advanced-vpn.html":
      break;
    default:
      console.log(`Load ${page} fail --- no available page`);
      return;
  }
}
