function loadPage(page, options) {
    let Status = JSON.parse(localStorage.getItem("Status"));
    let Basic = JSON.parse(localStorage.getItem("Basic"));
    let Wifi = JSON.parse(localStorage.getItem("Wifi"));
    let Advanced = JSON.parse(localStorage.getItem("Advanced"));
    let Security = JSON.parse(localStorage.getItem("Security"));
    let Utilities = JSON.parse(localStorage.getItem("Utilities"));
    let VoIP = JSON.parse(localStorage.getItem("VoIP"));
    switch (page) {
        case "index.html":
            var manufacturer = document.getElementById("Manufacturer");
            var serialNumber = document.getElementById("SerialNumber");
            var softwareVersion = document.getElementById("SoftwareVersion");
            var modelName = document.getElementById("ModelName");
            var hardwareVersion = document.getElementById("HardwareVersion");
            var protocol = document.getElementById("Protocol");
            var internetAddr = document.getElementById("InternetAddress");
            var defaultGw = document.getElementById("DefaultGateway");
            var subnetMask = document.getElementById("SubnetMask");
            var primaryDNS = document.getElementById("PrimaryDNS");
            var secondaryDNS = document.getElementById("SecondaryDNS");
            var macAddr = document.getElementById("MacAddress");
            var wifi2SecurityLevel = document.getElementById("WiFi2SecurityLevel");
            var wifi5SecurityLevel = document.getElementById("WiFi5SecurityLevel");

            /* Fill data */
            var checkSecurityType = function (securityType) {
                switch (securityType) {
                    case "None":
                        return "None";
                    case "1":
                        return "WPA2-Personal";
                    case "2":
                        return "WPA-Personal";
                    case "3":
                        return "WPA-WPA2-Personal";
                    case "4":
                        return "WEP-64";
                    case "5":
                        return "WEP-128";
                    case "6":
                        return "WPA3-Personal";
                    case "7":
                        return "WPA2-WPA3-Personal";
                    default:
                        return "";
                }
            }

            var fillData = () => {
                manufacturer.textContent = Status.Status.Manufacturer;
                serialNumber.textContent = Status.Status.SerialNumber;
                softwareVersion.textContent = Status.Status.SoftwareVersion;
                modelName.textContent = Status.Status.ModelName;
                hardwareVersion.textContent = Status.Status.HardwareVersion;
                protocol.textContent = Basic.WAN.Interfaces[0].ConnectionType;
                internetAddr.textContent = Basic.WAN.Interfaces[0].IPAddress;
                defaultGw.textContent = Basic.WAN.Interfaces[0].DefaultGateway;
                if (Basic.WAN.Interfaces[0].SubnetMask != "") {
                    subnetMask.textContent = Basic.WAN.Interfaces[0].SubnetMask;
                } else {
                    subnetMask.textContent = Status.Status.SubnetMask;
                }
                primaryDNS.textContent = Status.Status.PrimaryDNS;
                secondaryDNS.textContent = Status.Status.SecondaryDNS;
                macAddr.textContent = Status.Status.MACAddress;
                wifi2SecurityLevel.textContent = checkSecurityType(Wifi["2.4G"].SSIDs[0].Configuration.SecurityType + "");
                wifi5SecurityLevel.textContent = checkSecurityType(Wifi["5G"].SSIDs[0].Configuration.SecurityType + "");
            };

            fillData();
            break;
        default:
            console.log(`Load ${page} fail --- no available page`);
            return;
    }
}
