var intervalID;
const marker = 1024;
const decimal = 1;
const kiloBytes = marker;
const megaBytes = marker * marker;
const gigaBytes = marker * marker * marker;
// let teraBytes = marker * marker * marker * marker;

function draw_chart(interface_name, network_type) {
  const el = echarts.init(document.querySelector(".html_widget"));

  const UPDATE_DATA_INTERVAL = 5000; // 30 seconds
  var lower_limit;
  var upper_limit;

  switch (network_type) {
    case "WAN_ETH":
      lower_limit = 0;
      upper_limit = 2.5 * gigaBytes; // 2.5 GB
      break;
    case "LAN":
      lower_limit = 0;
      upper_limit = 1 * gigaBytes;
      break;
    case "WAN_PON":
      lower_limit = 0;
      upper_limit = 10 * gigaBytes; // PON upto 10 GB
      break;
    case "WIFI":
      lower_limit = 0;
      upper_limit = 100 * megaBytes; // 100 MB
      break;
    default:
      console.log("Network Type is not available !!!");
      lower_limit = 0;
      upper_limit = 0;
      break;
  }

  const dataXaxis = [];
  const dataTx = [0];
  const dataRx = [0];

  const colorsData = ["#8fbcc5", "#9a94bf"];
  const areacolorsData = ["rgba(179,235,247,0.7)", "rgba(193,186,239,0.7)"];
  clearInterval(intervalID);

  options = {
    tooltip: {
      show: true,
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: dataXaxis,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: function (val) {
          return bytes_to_auto(val);
        },
      },
    },
    grid: {
      height: 300,
    },
    legend: {
      show: true,
      icon: "roundRect",
      top: "bottom",
      itemGap: 30,
    },
    series: [
      {
        name: interface_name + " Tx",
        type: "line",
        smooth: true,
        symbol: "none",
        itemStyle: {
          color: colorsData[0],
        },
        areaStyle: {
          color: areacolorsData[0],
        },
        data: dataTx,
        z: 100,
      },
      {
        name: interface_name + " Rx",
        type: "line",
        smooth: true,
        symbol: "none",
        itemStyle: {
          color: colorsData[1],
        },
        areaStyle: {
          color: areacolorsData[1],
        },
        data: dataRx,
      },
    ],
  };

  el.setOption(options);

  function updateData() {
    const timeStamp = new Date();
    const hours = timeStamp.getHours();
    const minutes =
      timeStamp.getMinutes() < 10
        ? "0" + timeStamp.getMinutes()
        : timeStamp.getMinutes();
    const seconds =
      timeStamp.getSeconds() < 10
        ? "0" + timeStamp.getSeconds()
        : timeStamp.getSeconds();

    dataXaxis.push(`${hours}:${minutes}:${seconds}`);

    dataTx.push(
      Math.floor(Math.random() * (upper_limit - lower_limit) + lower_limit)
    );
    dataRx.push(
      Math.floor(Math.random() * (upper_limit - lower_limit) + lower_limit)
    );

    // scale the chart just 30 minutes window
    if (dataXaxis.length > 360){
      dataTx.shift();
      dataRx.shift();
      dataXaxis.shift();
    }

    el.setOption({
      tooltip: {
        formatter: function (params) {
          let html = "";

          params.forEach((item, idx) => {
            const convertBytes = bytes_to_auto(item.value);
            if (idx == 0) {
              html += item.axisValue + "<br>";
            }
            if (item.seriesName.includes("tx")) {
              html +=
                `${item.marker}${interface_name} Tx: ${convertBytes}` + "<br>";
            } else {
              html +=
                `${item.marker}${interface_name} Rx: ${convertBytes}` + "<br>";
            }
          });

          return html;
        },
      },
      xAxis: {
        data: dataXaxis,
      },
      series: [
        {
          name: interface_name + " Tx",
          data: dataTx,
        },
        {
          name: interface_name + " Rx",
          data: dataRx,
        },
      ],
    });
  }

  intervalID = setInterval(updateData, UPDATE_DATA_INTERVAL);

  window.addEventListener("resize", () => {
    el.resize();
  });
}

/**
 * Sub function
 */

function bytes_to_auto(bytes) {
  if (bytes < kiloBytes) return bytes + " Bytes";
  else if (bytes < megaBytes)
    return (bytes / kiloBytes).toFixed(decimal) + " Kbps";
  else if (bytes < gigaBytes)
    return (bytes / megaBytes).toFixed(decimal) + " Mbps";
  else return (bytes / gigaBytes).toFixed(decimal) + " Gbps";
}
