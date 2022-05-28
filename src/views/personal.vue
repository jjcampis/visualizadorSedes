<template>
<div>
  <!-- <div v-for="(cp,index) in cant_pers" :key="index">

    {{cp[0]['ps_espacio_maker']}} - {{cp.length}}
  </div> -->
 <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
  <v-col  cols="12" md="12">
    <v-card elevation="3" class="h-100" style="min-height:340px;">
      <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
      <apexchart v-if="showcharts" ref="barras" class="apex-moco" :type="type" height="300" width="100%" :options="chartOptions" :series="cant_pers" @click="get_S" @animationEnd="testb(0,2)" @dataPointSelection="clickeado"></apexchart>
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

<v-btn-toggle
          v-model="toggle_exclusive"
          rounded
          class="d-flex align-start"
        >
          <v-btn value="todos">
            <v-icon>mdi-sigma</v-icon> Todos <b-badge variant="light">4</b-badge>
          </v-btn>
          <v-btn value="pedagogicos">
            <v-icon>mdi-school</v-icon> pedagogicos
          </v-btn>
          <v-btn value="programadores">
            <v-icon>mdi-emoticon-cool-outline</v-icon> Programadores
          </v-btn>
          <v-btn value="tecnicos">
            <v-icon> mdi-account-hard-hat</v-icon> Tecnicos
          </v-btn>
        </v-btn-toggle>

<b-table-simple class="b-table-sticky-header-ac" sticky-header striped small responsive>
      <b-thead head-variant="dark">
            <tr>
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
          <b-tbody v-if="personalF != null && Object.entries(personalF).length > 0">
            <b-tr v-for="(pers,index) in personalF" :key="index">
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
                {{pers.ps_rol}}
              </b-td>
              <b-td style="min-width:152px">
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
  sede:'Todo',
  psVisible:true,
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

<style scoped>
.b-table-sticky-header-ac{
  overflow-y: auto;
  max-height: max-content;
}
.redmaker-icon{
  color: #bd1919 !important;
}
.programador-icon, .tecnico-icon{
  color: #26958a !important;
}
p.iconos-rm {display: inline-flex;}

.iconos-rm i, .iconos-rm span {margin: 0 4px;}
span.ci {border: 2px solid #00adff;padding: 2px;border-radius: 5px;background: #00adff;color: #fff;font-weight: bold;}
span.rm {border: 2px solid #c53434;padding: 2px;border-radius: 5px;background: #c53434;color: #fff;font-weight: bold;}
span.se {border: 2px solid #00adff;
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
</style>>

</style>