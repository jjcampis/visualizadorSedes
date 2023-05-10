<template>
<div>
  <!-- <div v-for="(cp,index) in cant_pers" :key="index">

    {{cp[0]['ps_espacio_maker']}} - {{cp.length}}
  </div> -->
 <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="min-height:340px;">
      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
      <apexchart v-if="showcharts" ref="barras" class="apex-moco" :type="type" height="300" width="100%" :options="chartOptions" :series="cant_pers" @click="get_S" @animationEnd="testb(0,2)" @dataPointSelection="clickeado" :lazyUpdate="true"></apexchart>
      </div>
    </v-card>
  </v-col>
</v-row>
<!-- {{cant_horasP}} -->
<v-row v-show="showcharts && this.$route.name !='Home'">
 <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="min-height:340px;">
      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
      <horariospers></horariospers>
      </div>
    </v-card>
  </v-col>
</v-row>

<p class="pt-3 text-left"><b>{{sede}}</b>

<b-button v-show="this.$route.name =='Home'" v-b-toggle.collapse-2 variant="outline-info"> 
            <span v-if="psVisible">
              <v-icon>
                  mdi-chevron-up
                </v-icon>
            </span>
            <span v-else>
              <v-icon>
                  mdi-chevron-down
                </v-icon>  
            </span>
            </b-button>

</p>



<v-row v-show="showcharts">
 <v-col  cols="12" md="12">
   <b-collapse v-model="psVisible" visible id="collapse-2" class="mt-2">
     <div class="d-flex justify-content-between">
        <v-btn-toggle
          v-model="fTipo"
          rounded
        >
          <v-btn value="Todos">
            <v-icon :class="{'text-white':fTipo == 'Todos'}">mdi-sigma</v-icon> Todos
          </v-btn>
          <v-btn value="Pedagógico">
            <v-icon :class="{'text-white':fTipo == 'Pedagógico'}">mdi-school</v-icon> pedagogicos
          </v-btn>
          <v-btn value="Programador">
            <v-icon :class="{'text-white':fTipo == 'Programador'}">mdi-emoticon-cool-outline</v-icon> Programadores
          </v-btn>

          <v-btn value="Técnico">
            <v-icon :class="{'text-white':fTipo == 'Técnico'}"> mdi-account-hard-hat</v-icon> Tecnicos
          </v-btn>
        </v-btn-toggle>
          <div v-if="personalFTipo != null && Object.entries(personalFTipo).length > 0"
            style="
                display: flex;
                flex-grow: 1;">
          <v-badge
          overlap
          color="medalla"
          :content="personalFTipo.length">

          </v-badge>
          </div>

<v-select v-if="this.$route.name !='Home'"
            style="z-index: 13"
          :items="todassedes"
          item-text="sede"
          item-value="sede"
          label="Sede"
          v-model="sede"
        >
        </v-select>
        
        <v-btn-toggle
          v-model="fLA"
          rounded
        >
        <v-btn value="Todos">
            <v-icon :class="{'text-white':fLA == 'Todos'}">mdi-sigma</v-icon> Todos
          </v-btn>
          <v-btn value="Red Maker">
            <div>
              <span class="rm">RM</span>
            </div>
          </v-btn>
          <v-btn value="Conectar Igualdad">
            <div>
            <span  class="ci">CI</span>  
            </div>
          </v-btn>
          <v-btn value="Sumá tu escuela">
            <div>
              <span class="se">SE</span>  
            </div>
          </v-btn>
        </v-btn-toggle>
     </div>

<b-table-simple class="b-table-sticky-header-ac" sticky-header striped small responsive>
      <b-thead head-variant="dark">
            <tr>
                <b-th>Sede</b-th>
                <b-th>DNI</b-th>
                <b-th>Apellido</b-th>
                <b-th>Nombre</b-th>
                <b-th>Celular</b-th>
                <b-th>Email</b-th>
                <b-th>Rol</b-th>
                <b-th>Perfil</b-th>
                <b-th>Linea de Accion</b-th>
                <b-th>C.H. <br > a Cumplir</b-th>
                <b-th>C.H. <br > Cumpliendo</b-th>
                <b-th>C.H. <br > Diferencia</b-th>
                <b-th>C.H. <br > En Trayecto</b-th>
                <b-th>Tarea <br > Complementaria 01</b-th>
                <b-th>C.H <br > T.C 01</b-th>
                <b-th>Tarea <br > Complementaria 02</b-th>
                <b-th>C.H <br > T.C 02</b-th>
            </tr>
      </b-thead>
          <b-tbody v-if="personalFTipo != null && Object.entries(personalFTipo).length > 0">
            <b-tr v-for="(pers,index) in personalFTipo" :key="index">
              <b-td>
                {{pers.ps_espacio_maker}}
              </b-td>
              <b-td>
                {{pers.ps_dni}}
              </b-td>
              <b-td>
                {{pers.ps_apellido}}
              </b-td>
              <b-td>
                {{pers.ps_nombre}}
              </b-td>
              <b-td>
                {{pers.ps_celular || 1111}}
              </b-td>
              <b-td>
                {{pers.ps_email || "red@maker.com"}}
              </b-td>
              <b-td>
                <!-- {{pers.ps_rol}} -->
                <v-tooltip  v-if="pers.ps_rol == 'Facilitador de Sede'" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="FC">
                      FC
                    </span>
                  </template>
                  <span>Facilitador de sede</span>
                </v-tooltip>

                <v-tooltip  v-if="pers.ps_rol == 'Referente de Sede'" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="RS">
                      RS
                    </span>
                  </template>
                  <span>Referente de sede</span>
                </v-tooltip>

                <v-tooltip  v-if="pers.ps_rol == 'Referente de Administrativo'" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="RA">
                      RA
                    </span>
                  </template>
                  <span>Referente Administrativo</span>
                </v-tooltip>

              </b-td>
              <b-td style="min-width:152px">
                <div v-if="Object.entries(pers).length > 0">
                  <span v-for="(perfil, index) in pers.ps_perfil.split(',')" :key="'perf'+index">
                  <p class="iconos-rm">
                    <v-tooltip  v-if="perfil.trim() == 'Pedagógico'" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="redmaker-icon"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-school
                          </v-icon>
                        </template>
                        <span>Pedagógico</span>
                      </v-tooltip>
                    
                    <v-tooltip  v-if="perfil.trim() == 'Programador'" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="programador-icon"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-emoticon-cool-outline
                          </v-icon>
                        </template>
                        <span>Programador</span>
                      </v-tooltip>
                      <v-tooltip  v-if="perfil.trim() == 'Técnico'" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="tecnico-icon"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-account-hard-hat
                          </v-icon>
                        </template>
                        <span>Técnico</span>
                      </v-tooltip>
                  </p>
                  <p class="iconos-rm">
                  </p>
                  <!-- <p v-if="perfil != 'Pedagógico' || perfil != ' Programador'" class="nomfac my-0 text-dark">{{perfil}}</p> -->
                  
                </span>
                </div>
              </b-td>
              <b-td style="min-width:152px">
                <span v-for="(LA, index) in pers.ps_linea_de_accion.split(',')" :key="'LA'+index">
                  <p class="iconos-rm">
                    <v-tooltip  v-if="LA.trim() == 'Conectar Igualdad'" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on" class="ci">CI</span>
                        </template>
                        <span>Conectar Igualdad</span>
                      </v-tooltip>
                    <v-tooltip  v-if="LA.trim() == 'Red Maker'" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on" class="rm">RM</span>
                        </template>
                        <span>Red Maker</span>
                      </v-tooltip>
                    <v-tooltip  v-if="LA.trim() == 'Sumá tu escuela'" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on" class="se">SE</span>
                        </template>
                        <span>Sumá tu Escuela</span>
                      </v-tooltip>
                <!-- {{LA}} -->
                  </p>
                </span>
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_total}}
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_cumpliend}}
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_diferenci}}
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_actual_trayecto}}
              </b-td>
              <b-td>
                <span v-html="pers.ps_tc_1"></span>
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_tc_1}}
              </b-td>
              <b-td>
                <span v-html="pers.ps_tc_2"></span>
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_tc_2}}
              </b-td>
            </b-tr>
          </b-tbody>
          <b-tbody v-else>
            <b-tr>
              <b-td colspan="16" style="padding: 70px">
                <span>
                  No Existen Datos
                </span>
              </b-td>
            </b-tr>
          </b-tbody>
      </b-table-simple>
   </b-collapse>
</v-col>
</v-row>

</div>
</template>

<script>
import { mapActions,mapState } from 'vuex';
import store from '@/store';
import horariospers from '@/components/personal/compHorariosPers.vue'
import data_personal from '@/components/datas/cantidad_personal';//objeto chartoptions

export default {
//cargar datos desde json
//https://r2d2.roboticamisiones.com/json/personal?_format=json
components:{
    horariospers
  },
data:()=>{
  return{
  type:"line",
  showcharts:false,
  cambio: false,
  dpclick:false,
  cantP: {},
  sede:'Alba Posse',
  psVisible:true,
  fTipo:'Todos',
  fLA:'Todos',
  chartOptions: data_personal
  }
},
computed:{
  ...mapState(["personal","sedes","rubricas_G"]),
  menux(){
        return this.$root.$children[0].drawer;
      },
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
      },
    personalF(){
      if(this.sede != 'Todo'){
        if(this.personal.length > 0){
                  //return Object.entries(this.personal).filter(x=>x[1].hr_espaciomaker == this.sede);
              return this.personal.filter((tray) => {
                  //return tray.hr_espaciomaker.toLowerCase().includes(this.sede.toLowerCase());
                    return tray.ps_espacio_maker == this.sede;
                })
              
              }else{
                  return ['no habia'];
              }
    }else{
      console.log("todos");
      return this.personal.filter(x=>x.hasOwnProperty('ps_perfil'))
      //f.filter(x=>x.hasOwnProperty('ps_perfil'))
    }
    /*else{
       if(this.personal.length > 0){
                  //return Object.entries(this.personal).filter(x=>x[1].hr_espaciomaker == this.sede);
              console.log(this.personal)
              return Object.entries(this.personal).map(x=>x)
              }
    }*/

    },
    personalFTipo(){
      if(this.personalF != null && Object.entries(this.personalF).length > 0){
        if (this.fTipo != undefined && this.fTipo != "Todos" || (this.fLA != undefined && this.fLA != "Todos")){
          
          if(this.fTipo != undefined && this.fTipo != "Todos" ){
            var filtro = this.personalF.filter(pers=> pers.ps_perfil.includes(this.fTipo))
            //return filtro
            }else{//no hay ningun filtro o son todos
              filtro = this.personalF
            }
           if (this.fLA != undefined && this.fLA != "Todos"){
             if(filtro.length > 0){
                return filtro.filter(pers=> pers.ps_linea_de_accion.includes(this.fLA))   
             }
           }
           return filtro
          /*
          if (this.fLA != undefined && this.fLA != ""){//si no esta vacio el filtro linea de accion lo filtro
            let preF = this.personalF.filter(pers=> pers.ps_perfil.includes(this.fTipo))
            return preF.filter(pers=> pers.ps_linea_de_accion.includes(this.fLA))
          }else if(this.fTipo != undefined && this.fTipo != "Todos" ){
            return this.personalF.filter(pers=> pers.ps_perfil.includes(this.fTipo))
          }*/
        
        }else{//no hay ningun filtro o son todos
          return this.personalF
        }
      }
    },
    cant_horasP(){
      if (this.personal.length > 0){
      let outObject = this.personal.reduce(function(a, e) {
      let estKey = (e['ps_espacio_maker']); 
        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
          return a;
        }, {});
        console.log("filtrado: ",outObject);
        let agrupadohp = this.ordenar(outObject);
        console.log("ordenadoPersonal: ",agrupadohp);
        //let cp = Object.entries(outObject).map((x) => x[1].length);

        //return agrupadohp;
        let suma = Object.values(agrupadohp).map((x)=>{return x}).map(x=>x.map(y=>y.ps_carga_horaria_total));
        let reducex = suma.map(x=>x.reduce((a,b)=>parseFloat(a)+parseFloat(b),0 ))
        return reducex
        
          }
    },
  cant_pers(){
    
    /*if (this.personal.length > 0){
      let outObject = this.personal.reduce(function(a, e) {
      let estKey = (e['ps_espacio_maker']); 
        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
          return a;
        }, {});
        console.log("filtrado: ",outObject);
        let cp = Object.entries(outObject).map((x) => x[1].length);
        return [{'name':'cantidad personal','type':'column','data':cp}]
        //return outObject;
          }*/

    if(this.personal.length > 0){
          //Recorro con map las sedes y dentro (para cada sede hago un filtro de todos los horarios para cada sede)
          let cp =  this.sedes.map(x => this.cantP[x.sede] = this.personal.filter((sede) => {
                return sede.ps_espacio_maker == x.sede;
              }).length
              );
            //filtro los que no estan en ob1
          //console.log(obj2.filter(o2 => obj1.indexOf(o2) === 1));
          console.log("filtrado> ",cp);
          return [{'name':'cantidad personal','type':'column','data':cp}]
    }

  }

},
methods:{
  ordenar(vec){
    let temp = {}
    let cp =  this.sedes.map(x => temp[x.sede] = this.personal.filter((sede) => {
                return sede.ps_espacio_maker == x.sede;
              })
              );
              console.log("orden> ",temp);
              return temp
  },
clickeado(event, chartContext, config){
        this.dpclick = true;
        //this.get_S(event, chartContext, config);
        //let selected = config.dataPointIndex;
        //this.testb(selected);
    },
testb(selected,...x){
      if (this.dpclick == false){
        this.$refs.barras.toggleDataPointSelection(0,selected);
        console.log("x ",x);
        if(x[0] > 0){
          let sede= this.sedes[selected].sede;
          console.log(sede);
          this.sede = sede;
          store.commit('SET_selectedSede',{sede});
        }
      }
      this.dpclick = false;
    },
    get_S(event, chartContext, config){
        console.log("click")
        // console.log("dppp"+this.sedes[config.dataPointIndex]);
        console.log("dppp",config);
        let sede= this.sedes[config.dataPointIndex].sede;
        console.log(sede);
        this.sede = sede;
        store.commit('SET_selectedSede',{sede});
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
      },
      selectedSede(newVal,oldVal){
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
          }
  },
  mounted(){
      setTimeout(() => {
        this.creado = true;
        this.created++
      }, 1);
      //this.delayed('insDelay');
      setTimeout(() => {
        this.showcharts = true;
        },500)
      //esto me da la lib de vuetify si es mobile
      //console.log(this.$vuetify.breakpoint.width)
    },
    created() {
      // sino no toma
      // this.creado = true;
      ///de esta manera asigno el valor de una computed al cargar la pagina
       this.$set(this.chartOptions, 'labels', this.vsedes);
       //this.$set(this.chartOptions.xaxis, 'categories', this.vsedes);
      /*this.$set(this.chartOptions, 'labels', Object.values(this.sedes).map(x=>x.sede));
      console.log(Object.values(this.sedes).map(x=>x.sede));
      this.$set(this.radarOptions.xaxis, 'categories', Object.values(this.sedes).map(x=>x.sede));
      this.$set(this.stackop.xaxis, 'categories', Object.values(this.sedes).map(x=>x.sede));
      */
     // this.$set(this,'menuinicial',this.$root.$children[0].drawer);
    },
}
</script>
<style>
.medalla{
  background: #26958a;
}
.redmaker-icon{
  color: #bd1919 !important;
}
.programador-icon, .tecnico-icon{
  color: #17a2b8 !important;
}
</style>
<style scoped>
.b-table-sticky-header-ac{
  overflow-y: auto;
  max-height: max-content;
}
.redmaker-icon{
  color: #bd1919 !important;
}
.programador-icon, .tecnico-icon{
  color: #17a2b8 !important;
}
p.iconos-rm {display: inline-flex;}

.iconos-rm i, .iconos-rm span {margin: 0 4px;}
span.FC {border: 2px solid #c53434;padding: 2px;border-radius: 5px;background: #f1f1f1;color: #c53434;font-weight: bold;}
span.RA {border: 2px solid #17a2b8;padding: 2px;border-radius: 5px;background: #17a2b8;color: #fff;font-weight: bold;}
span.RS {border: 2px solid #c53434;padding: 2px;border-radius: 5px;background: #c53434;color: #fff;font-weight: bold;}
span.ci {border: 2px solid #17a2b8;padding: 2px;border-radius: 5px;background: #17a2b8;color: #fff;font-weight: bold;}
span.rm {border: 2px solid #c53434;padding: 2px;border-radius: 5px;background: #c53434;color: #fff;font-weight: bold;}
span.se {border: 2px solid #17a2b8;
    padding: 2px;
    border-radius: 5px;
    background: #ffffff;
    color: #bd1919;
    font-weight: bold;}

    .v-btn-toggle>.v-btn.v-btn--active {
    color:#FFF !important;
    opacity: 1;
    background: #bd1919;
}
</style>