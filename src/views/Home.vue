<template>
    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation="3" class="h-100">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-left text-h5">
                Sedes
              </v-list-item-title>
              <v-list-item-subtitle class="text-left">porcentaje de alumnos aprobados</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="3">
          <apexchart type="line" height="350" :options="chartOptions2" :series="series2"></apexchart>  
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="3" class="h-100">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-left text-h5">
                Inscriptos
              </v-list-item-title>
              <v-list-item-subtitle class="text-left">Cantidad de alumnos Inscriptos</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data: ()=>{
    return{
          series: [44, 55, 13, 43, 22],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },

          ///otro chart
            series2: [{
            name: 'TEAM A',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
          }, {
            name: 'TEAM B',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
          }, {
            name: 'TEAM C',
            type: 'line',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
          }],
          chartOptions2: {
            chart: {
              height: 350,
              type: 'line',
              stacked: false,
            },
            stroke: {
              width: [0, 2, 5],
              curve: 'smooth'
            },
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            },
            
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
            labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
              '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
            ],
            markers: {
              size: 0
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              title: {
                text: 'Points',
              },
              min: 0
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                  }
                  return y;
            
                }
              }
            }
          },
          
          
        }
    }
  }
</script>
