const chartOptions ={
    chart: {
      height: 'auto',
      width: '100%',
      stacked: true,
      stackType: '100%',
      events: {                  
      click(event, chartContext, config){
        /* let ID = config;//.config.xaxis.categories[config.dataPointIndex];
        //console.log("clickes"+JSON.stringify(config));
        console.log(config);
        console.log(chartContext); */

        //self.dpselected = config.dataPointIndex;
        //self.handleClickdp(ID);
      }
    },
    
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 200,
      animateGradually: {
        enabled: true,
        speed: 100
      },
      dynamicAnimation: {
        enabled: true,
        speed: 1000
      }
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0,1,2],
      style: {
       // colors: ['#23b14d', '#fef200'],
        /* colors:[
function ({ seriesIndex,dataPointIndex,  w  }) {
if (w.config.series[seriesIndex].data[dataPointIndex] > 0) {
return "#ff0014";
} else {
return "#1f52b0";
}
},
], */

fontSize: '10px',
fontFamily: 'Helvetica, Arial, sans-serif',
fontWeight: 'bold',
colors: ['#23b14d', '#fef200','#ff0000'],

        //forecolor:'#000'
      },
      background: {
        enabled: true,
        foreColor: '#333',
        padding: 5,
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: '#F06',
        opacity: 1,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      }
    },
    //no para el 100%
    /*dataLabels: {
      enabled: true,
      enabledOnSeries: [0,1],
      position:'center',
      offsetY:0
    },*/
    
    // colors: ['#F44336', '#E91E63', '#9C27B0'],
    colors: ['#23b14d', '#fef200', '#ed1b24'],
    /*colors: [
      function ({ value, seriesIndex, dataPointIndex, w }) {
          if (dataPointIndex == 2) {
            return "#7E36AF";
          } else {
            return "#D9534F";
          }
        }
    ],*/
    stroke: {
      // width: [0, 2, 5],
      width: [1,1,1],
      //curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        barHeight: '100%',
        horizontal: false
      }
    },
    legend: {
      position: 'top'
    },



    responsive: [{
      breakpoint: 580,
      options: {
        chart:{
        stacked: true,
        type:'bar',
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
          title: {
            text: 'Alumnos',
          },
          min: 0
        },
        tooltip: {
          shared: true,
          position:'bottomLeft',
        
         delay: { show: 5000 },
         x: {
            formatter: function (x) {
              if (typeof x !== "undefined") {
                return x.toFixed(0) + " alumnos";
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
      // opacity: [0.85, 0.25, 1],
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
    //labels: ["25 de Mayo","Alba Posse","Almafuerte","Apóstoles","Aristóbulo del Valle","Azara","Bernardo de Irigoyen","Caá Yarí","Campo Grande","Campo Ramón","Campo Viera","Candelaria","Capioví","Cerro Azul","Cerro Corá","Colonia Alberdi","Colonia Aurora","Colonia Delicia","Colonía Victoria","Comandante Andresito","Concepción de la Sierra","Corpus","Dos de Mayo","El Alcazar","El Soberbio","Eldorado","Fachinal","Garuhape","Garupá","General Urquiza","Gobernador Roca","Guaraní","Jardín América","Leandro N. Alem","Loreto","Los helechos","Montecarlo","Oberá","Panambí","Posadas (En el Polo TIC)","Pozo Azul","Profundidad","Puerto Esperanza","Puerto Iguazú","Puerto Libertad","Puerto Piray","Puerto Rico 01","Puerto Rico 02","Ruiz de Montoya","Salto Encantado","San Ignacio","San Javier","San José","San Martín","San Pedro","San Vicente","Santa Ana","Santiago de Liniers","Santo Pipó"],
    labels: [],
    markers: {
      size: 0
    },
    xaxis: {
      labels:{
            style:{
              fontSize: '6.5px',
              trim:true,
              hideOverlappingLabels: false
            }
            },
      type: 'string'
    },
    yaxis: {
      title: {
        text: 'Alumnos',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      position:'topRight',
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " alumnos";
          }
          return y;
        }
       }
    }
  }
  export { chartOptions };