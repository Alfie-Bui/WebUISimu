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
    default:
      console.log(`Load ${page} fail --- no available page`);
      return;
  }
}
