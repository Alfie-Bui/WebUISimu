function loadPage(page, options) {
  let Status = JSON.parse(localStorage.getItem("Status"));
  let Basic = JSON.parse(localStorage.getItem("Basic"));
  let Wifi = JSON.parse(localStorage.getItem("Wifi"));
  let Advanced = JSON.parse(localStorage.getItem("Advanced"));
  let Security = JSON.parse(localStorage.getItem("Security"));
  let Utilities = JSON.parse(localStorage.getItem("Utilities"));
  let VoIP = JSON.parse(localStorage.getItem("VoIP"));
  switch (page) {
    case "wifi-2_4G-config.html":
      console.log(`Load ${page}\n${JSON.stringify(Wifi["2.4G"])}`);
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
          applyThenStoreToLS("wifi-2_4G-config.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("wifi-2_4G-config.html", "Cancel");
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

          applyThenStoreToLS("wifi-2_4G-mac_filtering.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("wifi-2_4G-mac_filtering.html", "Cancel");
      });
      break;
    case "wifi-2_4G-ssids.html":
      console.log(`Load ${page}\n${JSON.stringify(Wifi["2.4G"])}`);
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
          applyThenStoreToLS("wifi-2_4G-ssids.html", "Apply", Wifi);
        }
      });

      cancelBtn.addEventListener("click", () => {
        applyThenStoreToLS("wifi-2_4G-ssids.html", "Cancel");
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

          applyThenStoreToLS("wifi-2_4G-wds.html", "Apply", Wifi);
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("wifi-2_4G-wds.html", "Cancel");
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
        applyThenStoreToLS("wifi-2_4G-wps.html", "Cancel");
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

        applyThenStoreToLS("wifi-2_4G-wps.html", "Cancel");
      });
      break;
    case "wifi-5G-config.html":
      console.log(`Load ${page}\n${JSON.stringify(Wifi["5G"])}`);

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
          applyThenStoreToLS("wifi-5G-config.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("wifi-5G-config.html", "Cancel");
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

          applyThenStoreToLS("wifi-5G-mac_filter.html", "Apply", Wifi);
        } else {
          console.log(`Apply fail`);
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("wifi-5G-mac_filter.html", "Cancel");
      });
      break;
    case "wifi-5G-ssids.html":
      console.log(`Load ${page}\n${JSON.stringify(Wifi["5G"])}`);
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
          applyThenStoreToLS("wifi-5G-ssids.html", "Apply", Wifi);
        }
      });

      cancelBtn.addEventListener("click", () => {
        applyThenStoreToLS("wifi-5G-ssids.html", "Cancel");
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

          applyThenStoreToLS("wifi-5G-wds.html", "Apply", Wifi);
        } else {
          console.log("Apply fail");
        }
      });

      document.getElementById("Cancel").addEventListener("click", () => {
        applyThenStoreToLS("wifi-5G-wds.html", "Cancel");
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
        applyThenStoreToLS("wifi-5G-wps.html", "Cancel");
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
        applyThenStoreToLS("wifi-5G-wps.html", "Cancel");
      });
      break;
    case "wifi-guest_access-add.html":
      break;
    case "wifi-guest_access.html":
      break;
    default:
      console.log(`Load ${page} fail --- no available page`);
      return;
  }
}
