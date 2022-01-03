<template>
  <div class="home">
    <div id="chart" class="chart-wrapper">
        <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
      </div>
      <div>
        <div ref="chart" class="chart"></div>
        <v-row>
          <v-col  cols="12" md="12">
            <v-card elevation="3" class="h-100" style="padding-bottom: 25px;">
              <div ref="este" class="chart"></div>
            </v-card>
            </v-col>
            </v-row>





      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
//import apex from "apexcharts";
export default {
  name: "pie",
  components:{
  //  apex
  },
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





        }
    },
    mounted() {
    // code from Example: https://apexcharts.com/javascript-chart-demos/area-charts/spline/
    var options = {
      chart: {
        redrawOnWindowResize: false,
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],

      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00",
          "2018-09-19T01:30:00",
          "2018-09-19T02:30:00",
          "2018-09-19T03:30:00",
          "2018-09-19T04:30:00",
          "2018-09-19T05:30:00",
          "2018-09-19T06:30:00"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
        var stackop = {
 chart: {
              type: 'bar',
              height: 2000,
              stacked: true,
              stackType: '100%'
            },
            series: this.vecins,
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: '100%',
                columnWidth:'100%'
              },
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            xaxis: {
              categories:["25 de Mayo","Alba Posse","Almafuerte","Apóstoles","Aristóbulo del Valle","Azara","Bernardo de Irigoyen","Caá Yarí","Campo Grande","Campo Ramón","Campo Viera","Candelaria","Capioví","Cerro Azul","Cerro Corá","Colonia Alberdi","Colonia Aurora","Colonia Delicia","Colonía Victoria","Comandante Andresito","Concepción de la Sierra","Corpus","Dos de Mayo","El Alcazar","El Soberbio","Eldorado","Fachinal","Garuhape","Garupá","General Urquiza","Gobernador Roca","Guaraní","Jardín América","Leandro N. Alem","Loreto","Los helechos","Montecarlo","Oberá","Panambí","Posadas (En el Polo TIC)","Pozo Azul","Profundidad","Puerto Esperanza","Puerto Iguazú","Puerto Libertad","Puerto Piray","Puerto Rico 01","Ruiz de Montoya","Salto Encantado","San Ignacio","San Javier","San José","San Martín","San Pedro","San Vicente","Santa Ana","Santiago de Liniers","Santo Pipó"],
            },
            yaxis:{
              labels: {
                show: true,
                align: 'right',
                minWidth: 100,
                maxWidth: 120,
            }},


            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "alumnos"
                }
              }
            },
            fill: {
              opacity: 1
            
            },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
              offsetX: 40
          }
};
console.log(stackop);
    if (this.$refs.este) {
      console.log(stackop);
      //this.$set(stackop.xaxis, 'categories', this.vsedes);
      console.log(this.$refs.este);
      var charte = new ApexCharts(this.$refs.este, stackop);
      charte.render();
    }else{
      console.log('negativo');
    }

    

    if (this.$refs.chart) {
      // HTML element exists
      var chart = new ApexCharts(this.$refs.chart, options);
      chart.render();
    }
  },
  created(){
    console.log('creado');

  },
  computed:{
    ...mapState(['rubricas_sede','sedes','rubricas_G']),
    vsedes(){
      if(Object.keys(this.rubricas_G).length > 0){
      return Object.keys(this.rubricas_G).map((x)=>{return x});
      }else{
        return []
      }
    },
    vecins(){
      if(Object.keys(this.rubricas_G).length > 0){
      let inscripted = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].inscriptos});
      let aproved = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].aprobados});
      let na = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].noaprobados});
       return [{'name':'inscriptos','data': inscripted},
                {'name':'aprobados','data': aproved},
                {'name':'no aprobados','data': na}      
              ]  

      /* if (this.$vuetify.breakpoint.xs) {
        console.log('es mobile');
        return [{'name':'inscriptos','data': inscripted},
                {'name':'aprobados','data': aproved},
                {'name':'no aprobados','data': na}      
              ]  
      }else{
      //es desktop
      return [{'name':'inscriptos','type':'column','data': inscripted},
      {'name':'aprobados','type':'area','data': aproved},
      {'name':'no aprobados','type':'line','data': na}]
      
      } */
    }else{
      return []
    }}
  }

  }
</script>
<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center
}
</style>