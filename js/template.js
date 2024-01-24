/**
 *
 * @NOTE Change Version to refresh database in case you have any update at database
 *
 */
const SIMULATOR_VERSION = "0.2.9_D22/M02/Y2024";

/**
 *
 * ===== Template data (at init it will load template data to local store then fill in HTML file)
 *
 */
const template = {
  Status: {},
  Basic: {
    WAN: {
      onEdit: "", // if empty --> Add button instead of Edit button
      atv6Config: false,
      Interfaces: [
        {
          Name: "ANI0_wan8",
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
          IPAddress: "192.168.99.51",
          DefaultGateway: "192.168.99.1",
          Actions: false,
          /** IPv6 information */
          EnableIPv6: true,
          IPv6: {
            // main WAN --> IPv6
            IPv6Address: "2222::382f:e77d:b85e:4d2f",
            v6DefaultGateway: "fe80::e0:92ff:fe00:141",
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
        },
        {
          Name: "ANI0_wan9",
          SelectionMode: "PON",
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
          IPAddress: "192.168.9.101",
          DefaultGateway: "192.168.9.100",
          Actions: true,
          /** IPv6 information */
          EnableIPv6: false,
          IPv6: {
            // main WAN --> IPv6
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
        },
      ],
    },
    LAN: {
      IPv4Configuration: {
        DeviceIPAddress: "192.168.1.1",
        SubnetMask: "255.255.255.0",
        DHCPMode: 1,
        BeginAddress: "192.168.1.2",
        EndAddress: "192.168.1.254",
        LeaseTime: 1,
        IPAddressReservation: [],
      },
      IPv6Configuration: {
        Enable: true,
        AutoConfigurationMode: 2,
        Prefix: "fd00::",
        PrimaryDNSv6: "fd00::1",
        SecondaryDNSv6: "",
        DomainName: "gemtek.com",
      },
      DeviceConnected: {
        HostName: "DESKTOP-DL2F1BS",
        MACAddress: "ac:1a:3d:91:fc:cb",
        IPAddress: "192.168.1.2",
      },
    },
    RegistrationID: {
      RegistrationID: "",
    },
  },
  Wifi: {
    "2.4G": {
      SSIDs: [
        {
          WPSEnabled: false,
          RekeyInterval: "3600",
          Maxconnected: "255",
          BridgeName: "br-lan",
          Configuration: {
            EnableRadio: true,
            AutoChannel: true,
            OperationMode: 4,
            Channel: 1,
            ChannelBandwidth: 2,
            AdvertiseSSID: true,
            WMM: true,
            WMMPS: true,
            APIsolation: false,
            SSID: "GEMTEK",
            SecurityType: 2,
            Passphrase: "wifi_password",
            DTIM: 2,
            BeaconInterval: 100,
            PowerScale: 12,
            EnableCoExistence: true,
          },
          WDS: {
            WDSMode: 0,
            MACAddress: [],
          },
          MACFiltering: {
            ACLMode: 0,
            MACAddressFilter: [],
          },
        },

        {
          WPSEnabled: false,
          RekeyInterval: "3600",
          Maxconnected: "255",
          BridgeName: "br-lan",
          Configuration: {
            EnableRadio: true,
            AutoChannel: true,
            OperationMode: 4,
            Channel: 1,
            ChannelBandwidth: 2,
            AdvertiseSSID: true,
            WMM: true,
            WMMPS: true,
            APIsolation: false,
            SSID: "GEMTEK2",
            SecurityType: 1,
            Passphrase: "wifi_password2",
            DTIM: 2,
            BeaconInterval: 100,
            PowerScale: 12,
            EnableCoExistence: true,
          },
          WDS: {
            WDSMode: 0,
            MACAddress: [],
          },
          MACFiltering: {
            ACLMode: 0,
            MACAddressFilter: [],
          },
        },
      ],
    },
    "5G": {
      SSIDs: [
        {
          WPSEnabled: false,
          RekeyInterval: "3600",
          Maxconnected: "255",
          BridgeName: "br-lan",
          Configuration: {
            EnableRadio: true,
            AutoChannel: true,
            UseDFSChannels: true,
            OperationMode: 1,
            Channel: 36,
            ChannelBandwidth: 2,
            AdvertiseSSID: true,
            WMM: true,
            WMMPS: true,
            APIsolation: false,
            SSID: "GEMTEK5_1",
            SecurityType: 3,
            Passphrase: "wifi_password2",
            DTIM: 2,
            BeaconInterval: 100,
            PowerScale: 12,
            DFS: true,
          },
          WDS: {
            WDSMode: 0,
            MACAddress: [],
          },
          MACFiltering: {
            ACLMode: 0,
            MACAddressFilter: [],
          },
        },
      ],
    },
    GuestAccess: {
      WirewlessBand: 0,
      SSID: "Gemtek_Guest",
      SecurityType: 2,
      Passphrase: "password",
      RekeyInterval: "10000",
      GuestIsolation: true,
    },
  },
  Advanced: {
    ALG: {
      EnableFTPALG: true,
      EnableTFTPALG: true,
      EnableH323ALG: true,
      EnableSIPALG: true,
      EnablePPTPPassthrough: true,
      EnableL2TPPassthrough: true,
      EnableIPSecPassthrough: true,
    },
    DDNS: {
      EnableDDNS: true,
      ServiceProvider: 1,
      LocalWanInterface: 1,
      Username: "your_username",
      Password: "your_password",
      DomainName: "yourhost.example.com",
    },
    DMZ: {
      EnableDMZ: false,
      IPAddr: "0.0.0.0",
    },
    DeviceManagement: {
      EnaCWMP: true,
      LocalWANInterface: 0,
      ACSURL: "http://192.168.99.100:3000",
      ACSUsername: "admin",
      ACSPassword: "admin",
      ConnectionReqUsername: "admin",
      ConnectionReqPasword: "admin",
      EnaPerodic: true,
      PerodicInterval: 86400,
    }
  },
  Security: {},
  Utilities: {},
  VoIP: {},
};

/**
 * Deploy template to localStorage
 */

/**
 * Test query
 */
// for (let key in template)
// {
//   console.log(key.toString());
//   console.log(template["Wifi"]["2.4G"]);
// }

/**
 *
 * Dialog template
 *
 */
const deleteDialogTemplate =
  '<div id="deletedialog" class="ngdialog ngdialog-theme-default dialogwidth800 hide"> \
  <div class="ngdialog-overlay"></div> \
  <div class="ngdialog-content"> \
    <div class="ngdialog-message"> \
      <img src="images/icons/icon-1/deletedialog.svg" /> \
      <h3></h3> \
      <p class="ng-binding"></p> \
    </div> \
    <div class="ngdialog-buttons"> \
      <button type="button" class="ngdialog-button gemtek-btn-normal ng-binding" id="Cancel">Cancel</button> \
      <button type="button" class="ngdialog-button gemtek-btn-danger ng-binding" id="OK">Ok</button> \
    </div> \
  </div> \
</div>';

const alertDialogTemplate =
  '<div id="alertDialog" class="ngdialog ngdialog-theme-default dialogwidth800">\
  <div class="ngdialog-overlay"></div>\
  <div class="ngdialog-content">\
    <div class="ngdialog-message">\
      <img src="images/icons/icon-1/ico-notice.svg" />\
      <h3>Notice</h3>\
      <p id="alertDialog_msg"></p>\
    </div>\
    <div class="ngdialog-buttons">\
      <button id="Close" type="button" class="gemtek-btn-primary ng-binding">Close</button>\
    </div>\
  </div>\
</div>';

/** Pattern */
const IPv4_PATTERN =
  "^((?:2[0-2][0-3]|[01]?[0-9][0-9]?)\\.){1}((?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){2}((?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$";
const SUBNET_PATTERN =
  "^(((255\\.){3}(255|254|252|248|240|224|192|128|0+))|((255\\.){2}(255|254|252|248|240|224|192|128|0+)\\.0)|((255.)(255|254|252|248|240|224|192|128|0+)(\\.0+){2})|((255|254|252|248|240|224|192|128)(\\.0+){3}))$";
const MAC_PATTERN =
  "^[\\da-fA-F](?:[^\\Wg-zG-Z13579bBdDfF_]{1})([:])(?:[0-9a-fA-F]{1,2}\\1){4}[0-9a-fA-F]{1,2}$";

const WIFI_MAC_PATTERN =
  "^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{2}[\\-]){5}([0-9A-Fa-f]{2})$";

const IPv6_PREFIX_ADDR_PATTERN =
  "(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\/(\\d{1,2}|1[0-1]\\d|12[0-8])$";
const IPv6_PATTERN =
  "^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$";

const WEP64_KEY_PATTERN = "^[0-9a-fA-F]+$";
const WEP128_KEY_PATTERN = "^[0-9a-fA-F]+$";

/** Pool WAN interface */
const WAN_INTERFACE_POOL = [
  "ANI0_wan8",
  "ANI0_wan9",
  "ANI0_wan10",
  "ANI0_wan11",
  "ANI0_wan12",
  "ANI0_wan13",
  "ANI0_wan14",
];
