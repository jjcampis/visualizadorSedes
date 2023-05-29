<template>
<div>


<v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <b-card class="py-0 px-2 titulo">
      <b-card-header class="bot-collapse" header-tag="header" role="tab">
        <b-button block v-b-toggle.accordion-inscr variant="danger">
          <div class="text-h6 text-span-i">Inscriptos
             <span>
             <v-icon
              :class="{'mdi mdi-chevron-up': visib, 'mdi mdi-chevron-down': !visib}"
            ></v-icon>
            </span>
          </div>
          
        </b-button>
      </b-card-header>
      <b-collapse v-model="visib" class="py-0 px-0" id="accordion-inscr" accordion="accordion-inscr" role="tabpanel">
        <b-card-body class="pt-0 px-0">

            <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
              <v-col  cols="12" md="12">
                <v-card elevation="3" class="h-100" style="min-height:320px;">
                  <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                        <apexchart 
                        ref="inscriptosx"
                        v-show="visib"
                        type="bar" 
                        height="350" 
                        width="100%" 
                        :options="graficos_inscriptos" 
                        :series="inscriptos_graf" 
                        :lazyUpdate="true"
                        :key="rendered"
                        @click="pintari"
                        @animationEnd="pintari">
                        <!-- @click="((event) => handle($refs.inscriptosx))" -->
                        <!-- @animationEnd="rendered++"> -->
                        </apexchart>
                  </div>
                </v-card>
              </v-col>
            </v-row>
        </b-card-body>
      </b-collapse>
    </b-card>
  </v-col>
</v-row>

<!-- <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="min-height:320px;">
      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
      <apexchart v-if="showcharts" ref="barras" class="apex-moco" type="bar" height="400" width="100%" :options="chartOptions" :series="vecins" @click="get_S" @animationEnd="testb(0,2)" @dataPointSelection="clickeado" :lazyUpdate="true"></apexchart>
      </div>
    </v-card>
  </v-col>
</v-row> -->

<!-- <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="min-height:320px;">
      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
            <apexchart v-if="showcharts" type="bar" height="350" width="100%" :options="graficos_saberes" :series="PSTs"></apexchart>
      </div>
    </v-card>
  </v-col>
</v-row>
 -->
<!-- <button @click="testb">clickedamo</button> -->


<!-- <b-button block variant="danger"  @click="visiblex" >cambiar {{visib}}</b-button>
 -->

<!-- <v-row v-show="$vuetify.breakpoint.mobile">
  <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="padding-bottom: 25px;">
     <div class="chart-wrapperm">
    <apexchart :key="created" type="bar" height="2000" :options="stackop" :series="vecins" @click="get_S" @dataPointSelection="clickeado"></apexchart>
   </div>
    </v-card>
  </v-col>
</v-row> -->
<v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <b-card class="py-0 px-2 titulo">
      <b-card-header class="bot-collapse" header-tag="header" role="tab">
        <b-button block v-b-toggle.accordion-pers variant="danger">
          <div class="text-h6 text-span-i">Personal {{perso}}
            <span>
             <v-icon
              :class="{'mdi mdi-chevron-up': perso, 'mdi mdi-chevron-down': !perso}"
            ></v-icon>
            </span>
          </div>
          
        </b-button>
      </b-card-header>
      <b-collapse v-model="perso" class="py-0 px-0" id="accordion-pers" accordion="accordion-pers">
        <b-card-body class="pt-0 px-0">
                <v-row v-show="$vuetify.breakpoint.mobile">
                  <v-col  cols="12" md="12">
                    <v-card elevation="3" class="h-100" style="padding-bottom: 25px;">
                      <div class="chart-wrapperm">
                        <apexchart 
                        :key="created" 
                        type="bar"
                        height="2000" 
                        :options="stackop" 
                        :series="vecins"
                        >
                        </apexchart>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row v-show="showcharts">
                <v-col  cols="12" md="12">
                    <v-card elevation="3" class="h-100" style="min-height:320px;">
                      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                      <!-- <apexchart v-if="showcharts" ref="barras" class="apex-moco" :type="type" height="400" width="100%" :options="chartOptions" :series="vecins" @dataPointSelection="get_S"></apexchart> -->
                      <horario :estado="perso"></horario>
                      <personal  :estado="perso"></personal>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>

        </b-card-body>
      </b-collapse>
    </b-card>
  </v-col>
</v-row>

<!-- <personal></personal> -->
    
<v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <b-card class="py-0 px-2 titulo">
      <b-card-header class="bot-collapse" header-tag="header" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="danger">
          <div class="text-h6 text-span-i">Recursos
            <span>
             <v-icon
              :class="{'mdi mdi-chevron-up': recu, 'mdi mdi-chevron-down': !recu}"
            ></v-icon>
            </span>
          </div>
          
        </b-button>
      </b-card-header>
      
      <b-collapse v-model="recu" class="py-0 px-0" id="accordion-2" accordion="accordion-2">
        <b-card-body class="py-0 px-0">
        <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
        <v-col cols="12" md="12">
          <v-card elevation="3" dense class="h-100 round-top mt-3" style="min-height:320px;">
            <v-card-item>
          <v-toolbar-title class="text-h6 red round-top">
                  Compus Nuestras
                </v-toolbar-title>
            </v-card-item>
            <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                <apexchart class="apex-moco" type="bar" height="400" width="100%" :options="chartEquipos" :series="recurso('nuestraspc')" :lazyUpdate="true"></apexchart>
            </div>
          </v-card>
        </v-col>
        </v-row>

        <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
          <v-col cols="12" md="12">
            <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:320px;">
              <v-card-item>
            <v-toolbar-title class="text-h6 red round-top">
                    Otras Compus 
                  </v-toolbar-title>
              </v-card-item>
              <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                  <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('otrospc')" :lazyUpdate="true"></apexchart>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
          <v-col cols="12" md="12">
            <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:150px;">
              <v-card-item>
            <v-toolbar-title class="text-h6 red round-top">
                    Kit - Robótica
                  </v-toolbar-title>
              </v-card-item>
              <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                  <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('robotica')" :lazyUpdate="true" ></apexchart>
              </div>
            </v-card>
          </v-col>
        </v-row>

          <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
          <v-col cols="12" md="12">
            <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:150px;">
              <v-card-item>
            <v-toolbar-title class="text-h6 red round-top">
                    Kit - Soldador
                  </v-toolbar-title>
              </v-card-item>
              <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                  <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('soldador')" :lazyUpdate="true" ></apexchart>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
          <v-col cols="12" md="12">
            <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:150px;">
              <v-card-item>
            <v-toolbar-title class="text-h6 red round-top">
                    Equipos - Teleconferencias
                  </v-toolbar-title>
              </v-card-item>
              <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                  <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('teleco')" :lazyUpdate="true" ></apexchart>
              </div>
            </v-card>
          </v-col>
        </v-row>

          <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
          <v-col cols="12" md="12">
            <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:150px;">
              <v-card-item>
            <v-toolbar-title class="text-h6 red round-top">
                    Kit - TV
                  </v-toolbar-title>
              </v-card-item>
              <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                  <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('tv')" :lazyUpdate="true" ></apexchart>
              </div>
            </v-card>
          </v-col>
        </v-row>

          <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
          <v-col cols="12" md="12">
            <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:150px;">
              <v-card-item>
            <v-toolbar-title class="text-h6 red round-top">
                    Impresoras 3D
                  </v-toolbar-title>
              </v-card-item>
              <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                  <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('impresoras')" :lazyUpdate="true" ></apexchart>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
          <v-col cols="12" md="12">
            <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:150px;">
              <v-card-item>
            <v-toolbar-title class="text-h6 red round-top">
                    Kit - Futbolistas
                  </v-toolbar-title>
              </v-card-item>
              <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                  <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('futbolistas')" :lazyUpdate="true" ></apexchart>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
        <v-col cols="12" md="12">
          <v-card elevation="3" dense class="h-90 round-top mt-3" style="min-height:150px;">
            <v-card-item>
          <v-toolbar-title class="text-h6 red round-top">
                  Internet
                </v-toolbar-title>
            </v-card-item>
            <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                <apexchart class="apex-moco" type="bar" height="250" width="100%" :options="chartEquipos" :series="recurso('internet')" :lazyUpdate="true" ></apexchart>
            </div>
          </v-card>
        </v-col>
      </v-row>

        </b-card-body>
      </b-collapse>

    </b-card>
  </v-col>
</v-row>

<v-row class="mt-0" v-show="showcharts">
  <v-col cols="12" md="4">
    <v-card elevation="3" style="min-height:300px; max-height: 390px">
      <v-list-item two-line style="min-height:113px;">
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
    <v-card elevation="3" style="min-height:300px; max-height: 390px">
       <v-list-item two-line style="min-height:113px;">
        <v-list-item-content>
          <v-list-item-title class="text-left text-h5">
            <p class="mb-0">Situación Académica</p>
          </v-list-item-title>
          <!-- <v-list-item-subtitle class="text-left">Cantidad de alumnos Inscriptos</v-list-item-subtitle> -->
          </v-list-item-content>
          </v-list-item>
              <chart v-if="showcharts" ref="situacionchart" :etiquetas='campo' :series='situacionAc' op='academica'></chart>
    </v-card>
  </v-col>

  <v-col cols="12" md="4">
    <v-card elevation="3" style="min-height:300px; max-height: 390px">
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


<!-- <v-row v-show="showcharts">
 <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="min-height:420px;">
      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
      <!-<apexchart v-if="showcharts" ref="barras" class="apex-moco" :type="type" height="400" width="100%" :options="chartOptions" :series="vecins" @dataPointSelection="get_S"></apexchart>
      <horario></horario>
      </div>
    </v-card>
  </v-col>
</v-row> -->

</div>
</template>

<script>
// @ is an alias to /src
import chart from "@/components/chart.vue";
import horario from "@/views/distrib_G.vue";
import personal from "@/views/personal.vue";
//opciones (parte grafica de personal)
import data_inscriptos from '@/components/datas/cantidad_inscriptos';
import data_saberes from '@/components/datas/cantidad_saberes';
import { chartEquipos }from "@/components/datas/chart_equipos";
import { chartOptions }from "@/components/datas/cantidad_options";
//import data_radar from '@/components/datas/cantidad_radar';//no ocupo
import store from '@/store';

import { mapState } from 'vuex'
export default {
  name: "Home",
  components:{
    chart,
    horario,
    personal
  },
  methods:{
    pintari(){
      const chart = this.$refs.inscriptosx;
      const index = this.chartEquipos.xaxis.categories.findIndex(a => a === this.selectedSede.sede);
      //console.log(chart);
      // compruebo que no este seleccionado  chart.w.globals.selectedDataPoints
      let seleccion = this.$refs.inscriptosx.chart.w.globals.selectedDataPoints
      if (Array.isArray(seleccion) && seleccion[0] != index) {
          chart.toggleDataPointSelection(0, index);
      }
      if (this.selectedSede.sede === "Todo") {
        chart.toggleDataPointSelection(0,seleccion);
      }
    },
   /*  handle(data){
      // console.log("from vue"+data.config);
      let seleccion = data.chart.w.globals.selectedDataPoints;
      if (Array.isArray(seleccion) && seleccion.length > 0 && seleccion[0] != '') {
        //console.log('correcto'); //ya esta seleccionado no hago nada
        console.log('correcto',seleccion[0])
        // this.pintari();
      }else{
        this.pintari();
        console.log('incorrecto')        
      }
    }, */
    actuinsc(){//forzar animacion
        setTimeout(() => {
            this.rendered++;
          }, 10),
        //setTimeout(() => {this.showchartsH = true;},500),
        this.$refs.barritash.refresh();
      },
    /* delayed: function(cual){
      setTimeout(() => {
        this[cual] = true;
      }, 1000)
    } */
  //para graficar recursos 1 a 1
/* renderChartsWithDelay(index) {
 // alert(index);
  if (index >= this.graf_rec.length) {
    return;
  }
  index = parseInt(index);
  const chartRef = this.$refs['recursos' + index];
  console.log(this.$refs['recursos1']);
  // Renderiza el gráfico actual y espera a que termine la animación
  console.log("charted: ",'recursos' + index);
  console.log("charted: ",chartRef);
  chartRef.refresh(() => {
    // La animación ha terminado, aumenta en uno el vector
    this.$set(this.graf_rec, index-1, true);

    setTimeout(() => {
      this.renderChartsWithDelay(index + 1);
      console.log("renderizando: recurso", index + 1);
    }, 1000); // Ajusta el tiempo de retraso según tus necesidades
  });
}, */
/* renderChartsWithDelay() {
  for (let i = 0; i < this.graf_rec.length; i++) {
    setTimeout(() => {
      //const chartRef = this.$refs['recursos' + (i + 1)];
      //chartRef.render();
      this.$set(this.graf_rec, i, true);
      //alert('recursos'+(i+1));
    }, 1000); // Ajusta el tiempo de retraso según tus necesidades
  }
}, */
  ///fin graficar recursos


    recurso(que){
      if(Object.keys(this.rubricas_G).length > 0){
      //recorro con map el array de rubricas_G

      let ok = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['recursos'][que].rrmm_stock_funcionando});
      let reparacion = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['recursos'][que].rrmm_stock_para_reparar});
      let baja = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['recursos'][que].rrmm_stock_con_baja});
      //this.type = "bar";
        return [{'name':'ok','data': ok},
                {'name':'reparacion','data': reparacion},
                {'name':'baja','data': baja}      
              ]
      }else{
        return []
      }
    },
    /* toggleRecursos(){
      this.recu = !this.recu;
    },
    toggleperso(){
      this.perso = !this.perso;
    }, */
    /* visiblex(){
      this.visib = !this.visib;
    }, */

    /* testb(selected,...x){
      if (this.dpclick == false){
        this.$refs.barras.toggleDataPointSelection(0,selected);
        console.log("algo");
        if(x[0] > 0){
            let sede= this.sedes[selected].sede;
            console.log(sede);
            this.sede = sede;
            store.commit('SET_selectedSede',{sede});
          }
      }

      this.dpclick = false;
    }, */


    /*handleClickdp(data){
      console.log("from vue"+data);
    },*/
    
    //reemplazo por watch
    // clickeado(event, chartContext, config){
        /*this.get_S(event, chartContext, config);
        let selected = config.dataPointIndex;
        this.testb(selected);*/
      //this.dpclick = true;
    //},

    /* get_S(event, chartContext, config){
        console.log("click")
        // console.log("dppp"+this.sedes[config.dataPointIndex]);
        console.log("dppp",config);
        let sede = this.sedes[config.dataPointIndex].sede;
        this.sede = sede;
        store.commit('SET_selectedSede',{sede});
    }, */
  },

  computed:{
    ...mapState(['rubricas_sede','sedes','rubricas_G','selectedSede']),
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
      //let vec = Object.values(this.sedes).map(x=>x.sede);
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
      //console.log('pute: ',this.rubricas_G[this.sede]);
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
                //console.log(trayectoxx);
                let inscripted = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['trayectos'][trayectoxx].inscriptos}).reduce((a,b)=>a+b);
                //console.log('trayecto',trayectoxx, inscripted);
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
      inscriptos_graf(){
        let insc = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].inscriptos});
        return [{'name':'inscriptos','data': insc}]
      },
    

    /*recursos(){
      if(Object.keys(this.rubricas_G).length > 0){
      //recorro con map el array de rubricas_G

      let ok = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['recursos'].nuestraspc.rrmm_stock_funcionando});
      let reparacion = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['recursos'].nuestraspc.rrmm_stock_para_reparar});
      let baja = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x]['recursos'].nuestraspc.rrmm_stock_con_baja});
      //this.type = "bar";
        return [{'name':'ok','data': ok},
                {'name':'reparacion','data': reparacion},
                {'name':'baja','data': baja}      
              ]
    }else{
      return []
    }},*/


    vecins(){
      if(Object.keys(this.rubricas_G).length > 0){
      //antes de la dibujada cosmica
      let inscripted = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].inscriptos});
      //let aproved = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].aprobados});
      //let na = Object.keys(this.rubricas_G).map((x)=>{return this.rubricas_G[x].noaprobados});
       //despues
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
      this.type = "bar";
      return [//{'name':'inscriptos','type':'column','data': inscripted},
     {'name':'aprobados','data': aproved},
      {'name':'no aprobados','data': na}]
      // {'name':'aprobados','type':'area','data': aproved},
      // {'name':'no aprobados','type':'line','data': na}]
      
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
    //https://stackoverflow.com/questions/46966689/how-can-i-call-method-from-data-on-vue-js
    //esto es para poder acceder a metodos dentro de las config de apexcharts
    //var self = this;
    return{
      
      //cantidad de graficos de recursos
      /* cant_rec: 9,
      graf_rec:[], */
      // insDelay:false,
      //dpclick era parte de que no deselccione
      //dpclick:false,
      visib:true,
      recu: false,
      perso:false,
      rendered:0,
      graficos_inscriptos: data_inscriptos,
      chartEquipos: chartEquipos,
      chartOptions: chartOptions,
      graficos_saberes: data_saberes,
      //graficos_radar: data_radar,
      created:0,
      creado:false,
      sede:'Todo',
      type:"line",
      
      //dpselected:-1,
      

      showcharts:false,//para mostrar los pie en activated es un hack
      cambio: false,//asigno true cuando cambia el estado del menu 
      menuinicial: false,//en realidad se setea con el valor actual del menu en el created()
      

      //campo: ['aprobados','noaprobados','ssa','bajas','evaluados'],
      campo: ['aprobados','noaprobados','ssa','bajas'],
      etiquetas: ['TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'],
      seriesSedes: [20, 35, 23, 90, 20,45],

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
        
    }
    },
    watch:{
      //observo si se clickeo el menu
      /* recu(antes,ahora){
        if(ahora){
          //alert(ahora);
           // Llama a la función para iniciar la renderización iterativa con retraso
        this.renderChartsWithDelay();
        }
      }, */
      menux(antes,ahora){
        console.log(antes,ahora);
        if(antes != this.menuinicial){//se cambio
          console.log('cambio');
          this.cambio = true;
        }
      },
      //esto era para que no se deselccione
      /* selectedSede(newVal,oldVal){
            this.sede = newVal.sede;
            console.log("Primer",newVal,oldVal);
          let a = this.chartOptions.xaxis.categories;
            console.log("aray",a);

          //console.log("barritas",this.$refs.barritash.$el);
          var selected = a.findIndex(a => a === newVal.sede);
          // console.log("barras",selected);
          //this.$refs.barritash.toggleDataPointSelection(0,selected)
            //this.testb(selected);
            console.log("Primers",selected);

          if (newVal.sede != oldVal.sede) {
            console.log("seleccionado");
            this.testb(selected);
          }
          }, */

          selectedSede(newVal) {
            if (newVal) {
              this.pintari();//pinta inscriptos
              }
          }
    },
    mounted(){
      //renderizo lo graficos de recursos 1 a 1
      /* for (let i = 1; i <= this.cant_rec; i++) {
        const chartRef = this.$refs['recursos' + i];
        this.graf_rec.push(chartRef);
      } */
      /* for (let i = 0; i < this.cant_rec; i++) {
        this.graf_rec.push(false);
      }
      console.log("array de recursos: ",this.graf_rec); */

  //fin graficar recursos


      setTimeout(() => {
        this.creado = true;
        this.created++
      }, 1);
      //this.delayed('insDelay');
      setTimeout(() => {
        this.showcharts = true;
        this.actuinsc();        
        },500);

      //if (this.$refs.barras) {
      // HTML element exists
      //this.$refs.barras.refresh();
      /* var chart = new ApexCharts(this.$refs.chart, options);
      chart.render(); */
    //}
      //esto me da la lib de vuetify si es mobile
      //console.log(this.$vuetify.breakpoint.width)
    },
    created() {
      // sino no toma
      // this.creado = true;
      //console.log('padre: ',this.$root.$children[0].drawer);
      ///de esta manera asigno el valor de una computed al cargar la pagina
       //this.$set(this.chartOptions, 'labels', this.vsedes); //no se usa creo
       this.$set(this.graficos_inscriptos, 'labels', this.vsedes);
       //console.log("acaaaaa",this.chartOptions);
       //this.$set(this.chartOptions.xaxis, 'categories', this.vsedes); //solo necesario para el selectedSedes
       this.$set(this.chartEquipos.xaxis, 'categories', this.vsedes);
       //this.$set(this.radarOptions.xaxis, 'categories', this.vsedes);
       this.$set(this.stackop.xaxis, 'categories', this.vsedes);
      /*this.$set(this.chartOptions, 'labels', Object.values(this.sedes).map(x=>x.sede));
      console.log(Object.values(this.sedes).map(x=>x.sede));
      this.$set(this.radarOptions.xaxis, 'categories', Object.values(this.sedes).map(x=>x.sede));
      this.$set(this.stackop.xaxis, 'categories', Object.values(this.sedes).map(x=>x.sede));
      */
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
.titulo > .card-body {
    padding-bottom: 0px;
}
.text-span-i span >i{
    color: white !important 
}
.h-90{
  height: 90% !important;
}

.red{
  background:rgb(189, 25, 25);
  color: aliceblue;
}

.round-top{
  border-radius: 25px 25px 0px 0px !important;
}

.bot-collapse{
    margin-left: -1.8em;
    margin-right: -1.8em;
    padding: 0px !important;
    margin-top: -1.4em;
    }


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
.apexcharts-bar-area:hover { fill: #e9f5479c !important; }
.apexcharts-bar-area[selected = true]{ fill: turquoise !important; }
.invisible {
    visibility: hidden;
  }
</style>