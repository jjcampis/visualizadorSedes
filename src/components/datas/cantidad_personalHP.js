export default{
  //chartOptions: {
            chart: {
              height: 'auto',
              width: '100%',
              stacked: false,
              events: {
              click(event, chartContext, config) {
                /* let ID = config;//.config.xaxis.categories[config.dataPointIndex];
                //console.log("clickes"+JSON.stringify(config));
                console.log(config);
                console.log(chartContext); */

                //self.dpselected = config.dataPointIndex;
                //self.handleClickdp(ID);
              }
            },
            
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [0]
            },
            colors: ['#F44336', '#E91E63', '#9C27B0'],
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
              width: [0, 2, 5],
              curve: 'smooth'
            },
            plotOptions: {
              bar: {
                columnWidth: '60%',
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
              opacity: [0.85, 0.25, 1],
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
                      fontSize: '8.5px',
                      trim:true,
                      hideOverlappingLabels: false
                    }
                    },
              type: 'string'
            },
            yaxis: {
              title: {
                text: 'Cantidad Horas',
                
              },
              "labels": {
                "formatter": function (val) {
                    return Math.round(val)
                }},
              min: 0
            },
            tooltip: {
              shared: true,
              position:'topRight',
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0) + " horas";
                  }
                  return y;
                }
              }
            }
         // }
}