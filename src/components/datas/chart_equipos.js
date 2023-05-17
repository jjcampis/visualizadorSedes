const chartEquipos = {
    chart: {
      height: 'auto',
      width: '100%',
      stacked: true,
    },
    animations: {
      enabled: false
      },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
      style: {
        fontSize: '10px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#23b14d', '#fef200', '#ff0000'],
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        color: '#000',
        padding: 5,
        //borderRadius: 5,
        //borderWidth: 0.52,
        //borderColor: '#F06',
        //opacity: 0.4,
        /* dropShadow: {
          enabled:false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          //opacity: 1
        } */
      },
    },
    colors: ['#23b14d', '#fef200', '#ed1b24'],
    stroke: {
      width: [1, 1, 1],
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        barHeight: '100%',
        horizontal: false
      }
    },
    /* legend: {
      position: 'top'
    }, */
    responsive: [{
      breakpoint: 580,
      options: {
        chart: {
          stacked: true,
          type: 'bar',
          stackType: '100%',
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            horizontal: true
          }
        },
        yaxis: {
          type: 'string'
        },
        xaxis: {
          type:'category',
          title: {
            text: 'Equipos',
          },
          categories: [],
          min: 0
        },
        tooltip: {
          shared: true,
          position: 'bottomLeft',
          delay: { show: 5000 },
          x: {
            formatter: function (x) {
              if (typeof x !== "undefined") {
                return x.toFixed(0) + " equipos";
              }
              return x;
            }
          }
        },
        legend: {
          position: "bottom"
        }
      }
    }],
    fill: {
      opacity: [1, 1, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: [],
    markers: {
      size: 0
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '6.5px',
          trim: true,
          hideOverlappingLabels: false
        }
      },
      categories: [],
      type:'category'
    },
    yaxis: {
      title: {
        text: 'Equipos',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      position: 'topRight',
      intersect: false,
      y: {
        formatter: function (y) {
          if (
typeof y !== "undefined") {
return y.toFixed(0) + " equipos";
}
return y;
}
}
}
};
export { chartEquipos };