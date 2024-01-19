var intervalID;

/*
 * Echarts myChart1: default style line chart here
 */
function draw_chart(lower_limit, upper_limit, stopSignal) {
  if (stopSignal) {
    clearInterval(intervalID);
  }
  reset_param();

  var speed_line = document.getElementById("line-container");
  var speedometer = document.getElementById("chart-container");

  var defalutLineData = [];

  const INTERVAL = 200;

  for (let i = 0; i < 50; i++) {
    defalutLineData.push(0);
  }

  var myChart1 = echarts.init(speed_line, null, {
    renderer: "svg",
    useDirtyRect: false,
  });

  option1 = {
    animation: false,
    // animationDuration: 5000,
    xAxis: {
      show: false,
      type: "category",
    },
    yAxis: {
      show: false,
      type: "value",
    },
    grid: {
      show: false,
      left: 0,
      bottom: "98%",
    },
    series: [
      {
        name: "speed_download_line",
        type: "line",
        data: defalutLineData,
        smooth: true,
        showSymbol: false,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#63cdf6",
            },
            {
              offset: 1,
              color: "#14b56a",
            },
          ],
          global: false,
        },
      },
      {
        name: "speed_upload_line",
        type: "line",
        data: defalutLineData,
        smooth: true,
        showSymbol: false,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#ff8cd5",
            },
            {
              offset: 1,
              color: "#6268f4",
            },
          ],
          global: false,
        },
      },
    ],
  };

  myChart1.setOption(option1);

  /*
   * Echarts myChart2: default style gauge chart here
   */

  var myChart2 = echarts.init(speedometer, null, {
    renderer: "svg",
    useDirtyRect: false,
  });

  option2 = {
    series: [
      {
        name: "tacho",
        type: "gauge",
        pointer: {
          show: true,
          icon: "roundRect",
          width: "1",
          length: "85%",
          offsetCenter: [0, -7],
          itemStyle: {
            borderColor: "#dee5ec",
            borderWidth: "2",
          },
        },
        progress: {
          show: true,
          width: 20,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#63cdf6",
                },
                {
                  offset: 1,
                  color: "#14b56a",
                },
              ],
              global: false,
            },
          },
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [[1, "#dee5ec"]],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          show: true,
          size: 10,
          itemStyle: {
            borderWidth: 3,
            borderColor: "#dee5ec",
            color: "transparent",
          },
        },
        title: {
          show: true,
        },
        detail: {
          valueAnimation: true,

          formatter: ["{value|{value}}"].join("\n"),
          offsetCenter: [0, "85%"],

          rich: {
            value: {
              fontSize: 30,
              fontWeight: "normal",
              color: "#4b5057",
            },
          },
        },
        data: [
          {
            value: 0,
          },
        ],
        animation: false,
        animationDuration: 100,
      },
      {
        name: "pointer",
        type: "gauge",
        zlevel: 1,
        progress: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          distance: 5,
          color: "#dee5ec",
          fontSize: 12,
          fontWeight: "bold",
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          show: false,
        },
        pointer: {
          show: true,
          icon: "circle",
          width: 10,
          offsetCenter: [0, "-63%"],
          itemStyle: {
            color: "#fff",
            borderColor: "#dee5ec",
            borderWidth: 3,
          },
        },
        data: [
          {
            value: 0,
          },
        ],
        animation: false,
      },
    ],
  };
  myChart2.setOption(option2);

  myChart1.group = "group1";
  myChart2.group = "group1";
  echarts.connect("group1");

  // if stop signal --> just init, do not take data
  if (stopSignal) {
    return;
  }

  /**
   * Call getData to fake data
   */
  let count = 0;
  let downloadData = [0];
  let uploadData = [0];
  let pingData = [];
  let pingAvg;
  let uploadAvg;
  function getData() {
    console.log(`Count: ${count}`);
    count++;

    let paramValue;

    if (count <= 150) {
      paramValue = Math.floor(
        Math.random() * (upper_limit - lower_limit) + lower_limit
      );

      downloadData.push(paramValue);
      pingData.push(paramValue);
      updateData("download", downloadData, paramValue, count);
    } else if (count > 150 && count <= 300) {
      paramValue = Math.floor(
        Math.random() * (upper_limit - lower_limit) + lower_limit
      );

      if (count === 151) {
        // fill average value to 'DOWNLOAD Mbps' after download test finish
        document.getElementById("download_avg").textContent =
          calculateAverage(downloadData).toFixed(2);

        //change icon to upload
        const icon = document.getElementById("icon_up_down");
        icon.classList.remove("download");
        icon.classList.add("upload");
      }
      uploadData.push(paramValue);
      pingData.push(paramValue);
      updateData("upload", uploadData, paramValue, count);
    } else if (count == 301) {
      // calculate ping average and upload speed average
      pingAvg = calculateAverage(pingData);
      uploadAvg = calculateAverage(uploadData);
    } else {
      document.getElementById("upload_avg").textContent = uploadAvg.toFixed(2);
      document.getElementById("ping_val").textContent = pingAvg.toFixed(2);
      document.getElementById("loss_val").textContent = "0%";

      // stop interval and return the button
      clearInterval(intervalID);

      document.getElementById("stopBtn").classList.add("ng-hide");
      document.getElementById("restartBtn").classList.remove("ng-hide");
    }
  }

  intervalID = setInterval(getData, INTERVAL);
  /*
   * update data
   */
  function updateData(dataType, updatedata, data, count) {
    let labelPercentage = data / 100;

    if (dataType === "download") {
      if (count === 1) {
        myChart1.setOption({
          series: [
            {
              name: "speed_download_line",
              data: updatedata,
            },
          ],
        });

        myChart2.setOption({
          series: [
            {
              name: "tacho",
              data: [
                {
                  value: data,
                },
              ],
              pointer: {
                itemStyle: {
                  borderColor: "#14b56a",
                },
              },
              anchor: {
                itemStyle: {
                  borderColor: "#252525",
                },
              },
            },
            {
              name: "pointer",
              data: [
                {
                  value: data,
                },
              ],
              axisLine: {
                lineStyle: {
                  color: [
                    [labelPercentage, "#4b5057"],
                    [1, "#dee5ec"],
                  ],
                },
              },
              axisLabel: {
                color: "inherit",
              },
              pointer: {
                itemStyle: {
                  borderColor: "#14b56a",
                },
              },
            },
          ],
        });
      } else {
        myChart1.setOption({
          series: [
            {
              name: "speed_download_line",
              data: updatedata,
            },
          ],
        });

        myChart2.setOption({
          series: [
            {
              name: "tacho",
              data: [
                {
                  value: data,
                },
              ],
            },
            {
              name: "pointer",
              data: [
                {
                  value: data,
                },
              ],
              axisLine: {
                lineStyle: {
                  color: [
                    [labelPercentage, "#4b5057"],
                    [1, "#dee5ec"],
                  ],
                },
              },
            },
          ],
        });
      }
    } else if (dataType === "upload") {
      if (count === 151) {
        myChart1.setOption({
          series: [
            {
              name: "speed_upload_line",
              data: updatedata,
            },
          ],
        });

        myChart2.setOption({
          series: [
            {
              name: "tacho",
              data: [
                {
                  value: data,
                },
              ],
              progress: {
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#ff8cd5",
                      },
                      {
                        offset: 1,
                        color: "#6268f4",
                      },
                    ],
                    global: false,
                  },
                },
              },
              pointer: {
                itemStyle: {
                  borderColor: "#6268f4",
                },
              },
              anchor: {
                itemStyle: {
                  borderColor: "#252525",
                },
              },
            },
            {
              name: "pointer",
              data: [
                {
                  value: data,
                },
              ],
              pointer: {
                itemStyle: {
                  borderColor: "#6268f4",
                },
              },
              axisLine: {
                lineStyle: {
                  color: [
                    [labelPercentage, "#4b5057"],
                    [1, "#dee5ec"],
                  ],
                },
              },
              axisLabel: {
                color: "inherit",
              },
            },
          ],
        });
      } else {
        myChart1.setOption({
          series: [
            {
              name: "speed_upload_line",
              data: updatedata,
            },
          ],
        });

        myChart2.setOption({
          series: [
            {
              name: "tacho",
              data: [
                {
                  value: data,
                },
              ],
            },
            {
              name: "pointer",
              data: [
                {
                  value: data,
                },
              ],
              axisLine: {
                lineStyle: {
                  color: [
                    [labelPercentage, "#4b5057"],
                    [1, "#dee5ec"],
                  ],
                },
              },
            },
          ],
        });
      }
    }
  }
}

/**
 * Sub function
 */
function calculateAverage(arr) {
  // Check if the array is empty to avoid division by zero
  if (arr.length === 0) {
    return 0; // Return 0 for an empty array or handle it as needed
  }

  const sum = arr.reduce((total, currentValue) => total + currentValue, 0);
  const average = sum / arr.length;
  return average;
}

function reset_param() {
  document.getElementById("upload_avg").textContent = "- -";
  document.getElementById("download_avg").textContent = "- -";
  document.getElementById("ping_val").textContent = "- -";
  document.getElementById("loss_val").textContent = "- -";
}
