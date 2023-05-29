export default{
  //chartOptions: {
            chart: {
              height: 'auto',
              width: '100%',
              stacked: false,
              events: {
              animationEnd: function(chartContext,options){
                //alert('termine')
              },
              /* click(event, chartContext, config) {
                console.log('indice de la serie');
                console.log(config.globals.selectedDataPoints[0])
            }, */
               /* dataPointSelection: function(event, chartContext, config) {
                this.pintari();
              }  */
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
              enabledOnSeries: [0],
              style:{
                colors: ['#F44336'],
              },
              background: {
                enabled: true,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                
              },

            },
            colors: ['#F44336'],
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
                  type: 'string',
                },
                xaxis: {
                  title: {
                    text: 'Promedio',
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
                      fontSize: '6.5px',
                      trim:true,
                      hideOverlappingLabels: false
                    }
                    },
              type: 'string'
            },
            yaxis: {
              title: {
                text: 'Cantidad Inscriptos',
              },
              min: 0,
              labels: {
                show: true,
              },
            },
            tooltip: {
              shared: true,
              position:'topRight',
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y + " Alumnos";
                  }
                  return y;
                }
              }
            }
}