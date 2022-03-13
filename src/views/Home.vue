<template>
<div>
<v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="min-height:400px;">
      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
      <apexchart v-if="showcharts" ref="barras" class="apex-moco" :type="type" height="400" width="100%" :options="chartOptions" :series="vecins"></apexchart>
      </div>
    </v-card>
  </v-col>
</v-row>


<v-row v-show="$vuetify.breakpoint.mobile">
  <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="padding-bottom: 25px;">
      <!-- <apexchart type="radar" height="500" width="100%" :options="radarOptions" :series="vecins"></apexchart> -->
   <!-- <div :class="[cambio ? 'chart-wrapper2' : 'stackwraper']"> -->
     <div class="chart-wrapperm">
    <apexchart :key="created" type="bar" height="2000" :options="stackop" :series="vecins"></apexchart>
   </div>
    </v-card>
  </v-col>
</v-row>

<v-row class="mt-0" v-show="showcharts">
  <v-col cols="12" md="4">
    <v-card elevation="3" style="min-height:300px">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-left text-h5">
            <v-row align="center">
              <v-col cols="6">
                Inscriptos: {{seriesSedes2.reduce((x,b)=>x+b)}}
              </v-col>
              <v-col cols="6">
            <v-select
            style="z-index: 13"
          :items="todassedes"
          item-text="sede"
          item-value="sede"
          label="Sede"
          v-model="sede"
        ></v-select>
              </v-col>
              </v-row>
          </v-list-item-title>
          <v-list-item-subtitle class="text-left">Cantidad de alumnos Inscriptos</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    <chart v-if="showcharts" ref="inscriptoschart" :etiquetas='etiquetas' :series='seriesSedes2'></chart>
    </v-card>
  </v-col>
  <v-col cols="12" md="4">
    <v-card elevation="3" style="min-height:300px">
       <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-left text-h5">
            <p class="mb-0">Situación Académica</p>
          </v-list-item-title></v-list-item-content>
          </v-list-item>
          <br><br>
              <chart v-if="showcharts" ref="situacionchart" :etiquetas='campo' :series='situacionAc'></chart>
    </v-card>
  </v-col>

  <v-col cols="12" md="4">
    <v-card elevation="3" style="min-height:300px">
       <v-list-item class="py-0">
        <v-list-item-content>
          <v-list-item-title class="text-left text-h5">
            <p class="mb-0">Promedios PST:

              <span v-if="sede !='Todo'">{{rubricas_G[sede].promPST.toFixed(2)}}</span>
            </p>

          </v-list-item-title>
          </v-list-item-content>
          </v-list-item>
          <!-- <apexchart type="radar" height="500" width="100%" :options="radarOptions" :series="PSTs"></apexchart> -->
          <apexchart v-if="showcharts" type="treemap" height="350" width="100%" :options="treeOptions" :series="PSTs"></apexchart>
              <!-- <chart v-if="showcharts" ref="pstchart" :etiquetas='campo' :series='PSTs'></chart> -->
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
  methods:{
    /* delayed: function(cual){
      setTimeout(() => {
        this[cual] = true;
      }, 1000)
    } */
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
    todassedes(){
      if(Object.keys(this.rubricas_G).length > 0){
      let vec = Object.keys(this.rubricas_G).map((x)=>{return x});
      vec.unshift('Todo');
      return vec
      }else{
        return []
      }
      
      /*let vec = this.vsedes;
      if(vec.length > 0){
        vec.unshift('Todo');
      return vec
      }else{
        return []
      }*/

    },
    PSTs(){
      if(Object.keys(this.rubricas_G).length > 0){
        console.log(this.sede);
        return [{'name':'PST','data': Object.keys(this.rubricas_G).map((x)=>{return {'x':x,'y':this.rubricas_G[x]['promPST'].toFixed(2)}})}]

        /* if (this.sede != 'Todo'){
          //return [{'name':'PST','data': Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[this.sede]['promPST'].toFixed(2)})}]
          //treemap [{x_y}]
          return [{'name':'PST','data' : {'x':this.sede,'y':this.rubricas_G[this.sede]['promPST'].toFixed(2)}}]
        }else{
          return [{'name':'PST','data': Object.keys(this.rubricas_G).map((x)=>{return {'x':x,'y':this.rubricas_G[x]['promPST'].toFixed(2)}})}]
        } */
        }
    },

situacionAc(){
if(Object.keys(this.rubricas_G).length > 0){
        console.log(this.sede);
        if (this.sede != 'Todo'){
          // console.log('sede es: ',this.sede);
          //let campo = ['aprobados','noaprobados','ssa','bajas','evaluados'];
          let gral = this.rubricas_G[this.sede];
          let vecgral = [];
          
          for (const situacion of this.campo) {
            vecgral.push(gral[situacion])
          }
          return   vecgral;
        }else{//traigo todas las sedes pero agrupadas para eso uso reduce()
            //let traysAc = {};
            let vecgral = []
              for (const situ of this.campo) {
                let inscripted = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x][situ]}).reduce((a,b)=>a+b);
                vecgral.push(inscripted)
              }
              return  vecgral
    }
    }else{//no hay datos en rubG
      return[]
    }
},

    seriesSedes2(){
      if(Object.keys(this.rubricas_G).length > 0){
        console.log(this.sede);
        if (this.sede != 'Todo'){
          // console.log('sede es: ',this.sede);
          let trays = [];
          for(const t of this.etiquetas){
            console.log(t,this.rubricas_G[this.sede]["trayectos"][t].inscriptos);
          trays.push(this.rubricas_G[this.sede]["trayectos"][t].inscriptos);
          }
          return trays;

        }else{//traigo todas las sedes pero agrupadas para eso uso reduce()
            let trays = {};
              for (const trayectoxx of this.etiquetas) {
                console.log(trayectoxx);
                let inscripted = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['trayectos'][trayectoxx].inscriptos}).reduce((a,b)=>a+b);
                //console.log('trayecto',trayecto, inscripted);
              if(trays[trayectoxx] == undefined){trays[trayectoxx] ={}}                
              trays[trayectoxx] = inscripted
              }
              return  Object.keys(trays).map((x)=>{return trays[x]})
    }
    }else{//no hay datos en rubG
      return[]
    }
},
     menux(){
       //obtengo el estado del menu 
        return this.$root.$children[0].drawer;
      },
    vecins(){
      if(Object.keys(this.rubricas_G).length > 0){
      let inscripted = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].inscriptos});
      let aproved = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].aprobados});
      let na = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].noaprobados});
       
      if (this.$vuetify.breakpoint.xs) {
        console.log('es mobile');
        this.type = "radar";
        return [{'name':'inscriptos','data': inscripted},
                {'name':'aprobados','data': aproved},
                {'name':'no aprobados','data': na}      
              ]  
      }else{
      //es desktop
      this.type = "line";
      return [{'name':'inscriptos','type':'column','data': inscripted},
      {'name':'aprobados','type':'area','data': aproved},
      {'name':'no aprobados','type':'line','data': na}]
      
      }
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
      // insDelay:false,
      created:0,
      creado:false,
      sede:'Todo',
      type:"line",
      showcharts:false,//para mostrar los pie en activated es un hack
      cambio: false,//asigno true cuando cambia el estado del menu 
      menuinicial: false,//en realidad se setea con el valor actual del menu en el created()
      

      campo: ['aprobados','noaprobados','ssa','bajas','evaluados'],
      etiquetas: ['TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'],
      seriesSedes: [20, 35, 23, 90, 20,45],


radarOptions:{
            chart: {
              height: 350,
              type: 'radar',
              dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
              }
            },
            title: {
              text: 'Radar Chart - Multi Series'
            },
            stroke: {
              width: 2
            },
            fill: {
              opacity: 0.1
            },
            markers: {
              size: 0
            },
             xaxis: {
               categories:[]
            },
            /* xaxis: {
              type: 'string',
              // categories: ['2011', '2012', '2013', '2014', '2015', '2016']
            } */
},

treeOptions:{
            legend: {
              show: false
            },
            chart: {
              height: 350,
              type: 'treemap'
            },
            colors: [
              '#3B93A5',
              '#F7B844',
              '#ADD8C7',
              '#EC3C65',
              '#CDD7B6',
              '#C1F666',
              '#D43F97',
              '#1E5D8C',
              '#421243',
              '#7F94B0',
              '#EF6537',
              '#C0ADDB'
            ],
            plotOptions: {
              treemap: {
                distributed: true,
                enableShades: true
              }
            }
          
},

stackop:{
 chart: {
              type: 'bar',
              height: 'auto',
              stacked: true,
              stackType: '100%'
            },
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
              categories: [],
            },
            yaxis:{
              labels: {
                show: true,
                align: 'left',
                minWidth: 10,
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
},















          chartOptions: {
            chart: {
              height: 'auto',
              width: '100%',
              stacked: false,
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [0]
            },
            colors: ['#F44336', '#E91E63', '#9C27B0'],
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
        }

    },
    watch:{
      //observo si se clickeo el menu
      menux(antes,ahora){
        console.log(antes,ahora);
        if(antes != this.menuinicial){//se cambio
          console.log('cambio');
          this.cambio = true;
        }
      }
    },
    mounted(){
      setTimeout(() => {
        this.creado = true;
        this.created++
      }, 1);
      //this.delayed('insDelay');
      setTimeout(() => {
        this.showcharts = true;},500)

      if (this.$refs.barras) {
      // HTML element exists
      //this.$refs.barras.refresh();
      /* var chart = new ApexCharts(this.$refs.chart, options);
      chart.render(); */
    }
      //esto me da la lib de vuetify si es mobile
      //console.log(this.$vuetify.breakpoint.width)
    },
    created() {
      // sino no toma
      // this.creado = true;
      console.log('padre: ',this.$root.$children[0].drawer);
      ///de esta manera asigno el valor de una computed al cargar la pagina
      this.$set(this.chartOptions, 'labels', this.vsedes);
      this.$set(this.radarOptions.xaxis, 'categories', this.vsedes);
      this.$set(this.stackop.xaxis, 'categories', this.vsedes);
      this.$set(this,'menuinicial',this.$root.$children[0].drawer);
    },
    
    activated: function() {
    if (this.creado) {
      console.log('de nuevo');
      //solo los refs que terminan en chart
      this.showcharts = false;
      setTimeout(() => {
        this.showcharts = true;
        /* Object.keys(this.$refs).filter((x)=>{return x.includes('chart')}).forEach((chart) => {
          this.$refs[chart].$children[0].refresh();
        }); */
      }, 500);
    }
    /* if (this.$refs.chart) {
            // HTML element exists
          console.log('esta el chart');
          
          this.$refs.chart.refresh();
        } */
  },
  }
</script>
<style>
.apex-moco .apexcharts-canvas .apexcharts-svg{
  /* background: blue !important; */
  overflow: visible !important;
  
  /* color: #F44336', '#E91E63', '#9C27B0' */

}

/* no se podia acceder al elemento despues de cargar, se soluciono con estas preguntas 

https://stackoverflow.com/questions/64124752/apexchart-width-overflows-or-doesnt-strech

*/
.stackwraper{
 width: calc(100%);
    height: 100%;
    margin-left: 0px;
    padding-bottom: 40px;
    display: block;
}
@media only screen and (max-width: 600px) {
  .stackwraper > div{
    background: #bd1919;
    width: 99%;
    display: block;
  }
  
}

.chart-wrapper {
  /* esta bien cuando carga pero despues hay que sacar el margin: -30px */
  width: calc(100% - 30px);
    height: 100%;
    margin-left: 30px;
    /* margin-left: calc(30px); */
    /* padding-bottom: 40px; */
    display: block;
    /* width: 100%;
    height: 100%;
    display: contents; */
    /* overflow: hidden; */
}

.chart-wrapper2{
 width: 100% !important;
    height: 100%;
    margin-left: 0px !important;
    /* margin-left: calc(30px); */
    /* padding-bottom: 40px; */
    display: block;
}

.v-application .primary--text {
    color: #ccc !important;
    caret-color: #bd1919 !important;
}
div.chart-wrapperm {
  display: flex;
  align-items: center;
  justify-content: center
}
</style>