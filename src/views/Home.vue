<template>
<div>
    <v-row>
      <v-col cols="12" md="12">
        <v-card elevation="3" class="h-100" style="padding-bottom: 60px;">
          <apexchart class="apex-moco" type="line" height="500" width="100%" :options="chartOptions" :series="vecins"></apexchart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
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
        <chart :etiquetas='etiquetas' :series='seriesN' ></chart>
        </v-card>
      </v-col>
    </v-row>
</div>
</template>

<script>
// @ is an alias to /src
import chart from "@/components/chart.vue";
import { mapState } from 'vuex'
export default {
  name: "Home",
  components:{
    chart
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
       
      
      return [{'name':'inscriptos','type':'column','data': inscripted},
      {'name':'aprobados','type':'area','data': aproved},
      {'name':'no aprobados','type':'line','data': na}      
      ]
    }else{
      return []
    }}
    /* vinsc(){
      if (Object.keys(this.rubricas_G).length > 0) {
      return this.sedes.map((x)=>{
        let ins = this.rubricas_G[x.sede].inscriptos;
        console.log(ins);
        return {'name':'inscriptos','type':'column','data':ins}
      })
    }else{
      return []
    }
    } */
    },
  data: ()=>{
    return{
      etiquetas: ['TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'],
      seriesN: [20, 35, 23, 90, 20,45],

          chartOptions: {
            chart: {
              height: "auto",
              type: 'line',
              stacked: false,
            },
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            stroke: {
              width: [0, 2, 5],
              curve: 'smooth'
            },
            plotOptions: {
              bar: {
                columnWidth: '60%'
              }
            },
            legend: {
              position: 'top'
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
            //labels: ["25 de Mayo","Alba Posse","Almafuerte","Apóstoles","Aristóbulo del Valle","Azara","Bernardo de Irigoyen","Caá Yarí","Campo Grande","Campo Ramón","Campo Viera","Candelaria","Capioví","Cerro Azul","Cerro Corá","Colonia Alberdi","Colonia Aurora","Colonia Delicia","Colonía Victoria","Comandante Andresito","Concepción de la Sierra","Corpus","Dos de Mayo","El Alcazar","El Soberbio","Eldorado","Fachinal","Garuhape","Garupá","General Urquiza","Gobernador Roca","Guaraní","Jardín América","Leandro N. Alem","Loreto","Los helechos","Montecarlo","Oberá","Panambí","Posadas (En el Polo TIC)","Pozo Azul","Profundidad","Puerto Esperanza","Puerto Iguazú","Puerto Libertad","Puerto Piray","Puerto Rico 01","Puerto Rico 02","Ruiz de Montoya","Salto Encantado","San Ignacio","San Javier","San José","San Martín","San Pedro","San Vicente","Santa Ana","Santiago de Liniers","Santo Pipó"],
            labels: [],
            markers: {
              size: 0
            },
            xaxis: {
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
        }

    },
    created() {
      // sino no toma
      this.$set(this.chartOptions, 'labels', this.vsedes);
    }
  }
</script>
<style>
.apex-moco .apexcharts-canvas .apexcharts-svg{
  /* background: blue !important; */
  overflow: visible !important;
  
  /* color: #F44336', '#E91E63', '#9C27B0' */

}
</style>