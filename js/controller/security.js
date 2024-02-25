function loadPage(page, options) {
  let Status = JSON.parse(localStorage.getItem("Status"));
  let Basic = JSON.parse(localStorage.getItem("Basic"));
  let Wifi = JSON.parse(localStorage.getItem("Wifi"));
  let Advanced = JSON.parse(localStorage.getItem("Advanced"));
  let Security = JSON.parse(localStorage.getItem("Security"));
  let Utilities = JSON.parse(localStorage.getItem("Utilities"));
  let VoIP = JSON.parse(localStorage.getItem("VoIP"));
  var curTimeTarget = "";

  switch (page) {
    case "security-firewall.html":
      console.log(`Load ${page}`, Security.Firewall);

      const enableFirewall = document.getElementById("DeviceFirewall_Enable");
      var applyBtn = document.getElementById("Apply");
      const switches = ["Telnet", "SSH", "HTTPS", "ICMP"];

      function toggleSwitch(id) {
        const switchElement = document.getElementById(id);
        switchElement.classList.toggle("gemtek-switch-on");
        switchElement.classList.toggle("gemtek-switch-off");
      }

      function fillData() {
        enableFirewall.checked = Security.Firewall.EnableFirewall;
        switches.forEach((switchID) => {
          const switchElement = document.getElementById(switchID);
          const serviceEnabled =
            Security.Firewall.Services["Enable" + switchID];
          switchElement.checked = serviceEnabled;
          switchElement.classList.toggle("gemtek-switch-on", serviceEnabled);
          switchElement.classList.toggle("gemtek-switch-off", !serviceEnabled);
        });
      }

      function initEvent() {
        switches.forEach((switchID) => {
          document
            .getElementById(switchID)
            .addEventListener("click", function () {
              toggleSwitch(switchID);
            });
        });

        enableFirewall.addEventListener("change", function () {
          console.log("Enable Firewall Settings changed:", this.checked);
        });
      }

      fillData();
      initEvent();

      applyBtn.addEventListener("click", () => {
        Security.Firewall.EnableFirewall = enableFirewall.checked;
        switches.forEach((switchID) => {
          Security.Firewall.Services["Enable" + switchID] = document
            .getElementById(switchID)
            .classList.contains("gemtek-switch-on");
        });

        console.log("Security settings updated:", Security);
        applyThenStoreToLS("security-firewall.html", "Apply", Security);
      });

      break;
    case "security-parental_control_settings.html":
      console.log(`Load ${page}`, Security.ParentalControl);

      var enableParentalControl = document.getElementById(
        "DeviceFirewallX_GTK_ParentalControl_Enable"
      );
      var permitRadio = document.getElementById("permit");
      var denyRadio = document.getElementById("deny");
      var applyBtn = document.getElementById("Apply");

      var fillDataSettings = () => {
        enableParentalControl.checked =
          Security.ParentalControl.ParentalControlSettings.EnableParentalControl;
        if (
          Security.ParentalControl.ParentalControlSettings.DefaultAction === "1"
        ) {
          permitRadio.checked = true;
        } else {
          denyRadio.checked = true;
        }
      };

      fillDataSettings();

      applyBtn.addEventListener("click", () => {
        Security.ParentalControl.ParentalControlSettings.EnableParentalControl =
          enableParentalControl.checked;
        permitRadio.checked
          ? (Security.ParentalControl.ParentalControlSettings.DefaultAction =
              "1")
          : (Security.ParentalControl.ParentalControlSettings.DefaultAction =
              "0");
        console.log(
          "Parental Control settings updated:",
          Security.ParentalControl.ParentalControlSettings
        );
        applyThenStoreToLS(
          "security-parental_control_settings.html",
          applyBtn.value,
          Security
        );
      });

      break;
    case "security-parental_control-devControl-add.html":
      console.log(`Load ${page}`, Security.ParentalControl);

      var filledData;
      var addFlag = false;
      if (Security.ParentalControl.DeviceUnderParentalControl.onEdit === "") {
        addFlag = true;
        filledData = {
          EnableParentalControlRule: false,
          PolicyName: "",
          ParentalControlType: "ipaddress",
          MACAddress: "",
          TimeStart: "00:00",
          TimeEnd: "00:00",
          DaysOfTheWeek: "",
          Target: "Accept",
          URL: "",
        };
      } else {
        filledData =
          Security.ParentalControl.DeviceUnderParentalControl.Rules.filter(
            (obj) =>
              obj.PolicyName ===
              Security.ParentalControl.DeviceUnderParentalControl.onEdit
          )[0];
        console.log(
          `Load ${page} -- Edit ${filledData.PolicyName}}\n${JSON.stringify(
            filledData
          )}`
        );
      }

      var EnableParentalControlRule = document.getElementById("props_Enable");
      var PolicyName = document.getElementById("PolicyName");
      var ParentalControlType = document.getElementById("ParentalControlType");
      var MACAddress = document.getElementById("MACAddress");
      var TimeStart = document.getElementById("TimeStart");
      var TimeEnd = document.getElementById("TimeEnd");
      var Target = document.getElementById("Target");
      var URL = document.getElementById("url");

      var listItems = document.querySelectorAll(".weekdayslist li");
      listItems.forEach(function (item) {
        item.addEventListener("click", function () {
          console.log(this);
          this.classList.toggle("active");
          updateHiddenInput();
        });
      });

      function updateHiddenInput() {
        var activeDays = document.querySelectorAll(".weekdayslist li.active");
        var selectedDays = [];
        activeDays.forEach(function (day) {
          selectedDays.push(day.textContent);
        });
        ParentalControlDaysOfTheWeek.value = selectedDays.join(",");
      }

      function fillDataAdd() {
        EnableParentalControlRule.checked =
          filledData.EnableParentalControlRule;
        PolicyName.value = filledData.PolicyName;
        ParentalControlType.value = filledData.ParentalControlType;
        MACAddress.value = filledData.MACAddress;
        TimeStart.value = filledData.TimeStart;
        TimeEnd.value = filledData.TimeEnd;
        Target.value = filledData.Target;
        URL.value = filledData.URL;
        if (!addFlag) {
          var listItems = document.querySelectorAll(".weekdayslist li");
          const daysArray = filledData.DaysOfTheWeek.split(",").map((day) =>
            day.trim()
          );
          const filteredArray = daysArray.filter((day) => day !== "");
          console.log(filteredArray);
          const dayToNumber = {
            Su: 0,
            Mo: 1,
            Tu: 2,
            We: 3,
            Th: 4,
            Fr: 5,
            Sa: 6,
          };
          const numberArray = filteredArray.map((day) => dayToNumber[day]);
          console.log(numberArray);
          numberArray.forEach(function (index) {
            listItems[index].classList.toggle("active");
          });
        }
      }

      fillDataAdd();

      function open_dtBox(id) {
        curTimeTarget = id;
        const dtpicker = document.getElementById("dtBox");
        dtpicker.style.display = "block";
      }

      TimeStart.addEventListener("click", function () {
        open_dtBox(this.id);
      });

      TimeEnd.addEventListener("click", function () {
        open_dtBox(this.id);
      });

      function initEventPT() {
        const hour_up = document.getElementById("hour_up");
        const hour_down = document.getElementById("hour_down");
        const hour = document.getElementById("hour");
        const minute_up = document.getElementById("minute_up");
        const minute_down = document.getElementById("minute_down");
        const minute = document.getElementById("minute");
        const startTimeInput = document.getElementById("TimeStart");
        const endTimeInput = document.getElementById("TimeEnd");
        const setButton = document.querySelector(".dtpicker-buttonSet");

        hour_up.addEventListener("click", () => {
          hour.value = (parseInt(hour.value) + 1) % 24;
          updateTimeDisplay(); // Update the time display when hour changes
        });

        hour_down.addEventListener("click", () => {
          hour.value = (parseInt(hour.value) - 1 + 24) % 24;
          updateTimeDisplay(); // Update the time display when hour changes
        });

        minute_up.addEventListener("click", () => {
          minute.value = (parseInt(minute.value) + 1) % 60;
          updateTimeDisplay(); // Update the time display when minute changes
        });

        minute_down.addEventListener("click", () => {
          minute.value = (parseInt(minute.value) - 1 + 60) % 60;
          updateTimeDisplay(); // Update the time display when minute changes
        });

        setButton.addEventListener("click", () => {
          const hourValue = hour.value.padStart(2, "0");
          const minuteValue = minute.value.padStart(2, "0");
          console.log(`User input: ${hourValue}:${minuteValue}`);
        });

        function updateTimeDisplay() {
          const hourValue = hour.value.padStart(2, "0");
          const minuteValue = minute.value.padStart(2, "0");
          const timeDisplay = document.querySelector(".dtpicker-value");

          timeDisplay.textContent = `${hourValue}:${minuteValue}`;

          if (curTimeTarget === "TimeStart") {
            startTimeInput.value = `${hourValue}:${minuteValue}`;
          } else if (curTimeTarget === "TimeEnd") {
            endTimeInput.value = `${hourValue}:${minuteValue}`;
          }
          console.log(`Time updated: ${hourValue}:${minuteValue}`);
        }
      }

      initEventPT();

      document.getElementById("Apply").addEventListener("click", () => {
        filledData.EnableParentalControlRule =
          EnableParentalControlRule.checked;
        filledData.PolicyName = PolicyName.value;
        filledData.ParentalControlType = ParentalControlType.value;
        filledData.MACAddress = MACAddress.value;
        filledData.TimeStart = TimeStart.value;
        filledData.TimeEnd = TimeEnd.value;
        filledData.Target = Target.value;
        filledData.URL = URL.value;
        filledData.DaysOfTheWeek = ParentalControlDaysOfTheWeek.value;

        if (addFlag === true)
          Security.ParentalControl.DeviceUnderParentalControl.Rules.push(
            filledData
          );

        applyThenStoreToLS(
          "security-parental_control-devControl.html",
          "Apply",
          Security
        );
      });

      break;
    case "security-parental_control-devControl.html":
      console.log(
        `Load ${page}`,
        Security.ParentalControl.DeviceUnderParentalControl
      );

      var tbody = document.getElementById("bodyData");
      var ruleElem = document.getElementById("ruleTemplate");
      var addBtn = document.getElementById("Add");

      var fillDevControlData = () => {
        for (const elem of Security.ParentalControl.DeviceUnderParentalControl
          .Rules) {
          const tr = ruleElem.content.cloneNode(true);
          const policyName = tr.querySelector(".policyName");
          const parentalControlType = tr.querySelector(".parentalControlType");
          const macAddress = tr.querySelector(".macAddress");
          const timeStartEnd = tr.querySelector(".timeStartEnd");
          const access = tr.querySelector(".Access");
          const daysOfTheWeek = tr.querySelector(".daysOfTheWeek");
          const statusParentalControlRule = tr.querySelector(
            ".statusParentalControlRule"
          );

          const editBtn = tr.querySelector(".editBtn");
          const deleteBtn = tr.querySelector(".deleteBtn");

          elem.EnableParentalControlRule
            ? statusParentalControlRule.classList.add("gemtek-enabled")
            : statusParentalControlRule.classList.add("gemtek-disabled");
          policyName.textContent = elem.PolicyName;
          parentalControlType.textContent = checkParentalControlType(
            elem.ParentalControlType
          );
          macAddress.textContent = elem.MACAddress;
          timeStartEnd.textContent = elem.TimeStart + " - " + elem.TimeEnd;
          daysOfTheWeek.textContent = elem.DaysOfTheWeek;
          if (elem.Target === "Accept") {
            access.innerHTML =
              '<span class="gemtek-permit">' + access.innerHTML + "</span>";
          } else if (elem.Target === "Drop") {
            access.innerHTML =
              '<span class="gemtek-deny">' + access.innerHTML + "</span>";
          }

          editBtn.addEventListener("click", () => {
            Security.ParentalControl.DeviceUnderParentalControl.onEdit =
              elem.PolicyName;
            applyThenStoreToLS(
              "security-parental_control-devControl-add.html",
              "Apply",
              Security
            );
          });

          deleteBtn.addEventListener("click", () => {
            if (window.confirm("Are you sure you want to Delete ?")) {
              Security.ParentalControl.DeviceUnderParentalControl.Rules.splice(
                parseInt(deleteBtn.closest("tr").rowIndex - 1),
                1
              );
              applyThenStoreToLS(
                "security-parental_control-devControl.html",
                "Apply",
                Security
              );
            }
          });
          tbody.appendChild(tr);
        }
      };
      var checkParentalControlType = function (parentalControlType) {
        switch (parentalControlType) {
          case "url":
            return "URL";
          case "ipaddress":
            return "IP Address";
          case "port":
            return "Port";
          default:
            return "";
        }
      };

      fillDevControlData();

      addBtn.addEventListener("click", () => {
        Security.ParentalControl.DeviceUnderParentalControl.onEdit = "";
        applyThenStoreToLS(
          "security-parental_control-devControl-add.html",
          "Apply",
          Security
        );
      });

      break;
    default:
      console.log(`Load ${page} fail --- no available page`);
      return;
  }
}
