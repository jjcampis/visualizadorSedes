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

<p class="pt-3 text-left"><b>{{sede}}</b></p>
<v-row v-show="showcharts">
 <v-col  cols="12" md="12">
<b-table-simple class="b-table-sticky-header-ac" sticky-header striped small responsive>
      <b-thead head-variant="dark">
            <tr>
                <b-th>DNI</b-th>
                <b-th>Apellido</b-th>
                <b-th>Nombre</b-th>
                <b-th>Celular</b-th>
                <b-th>Email</b-th>
                <b-th>Rol</b-th>
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
                {{pers.ps_tc_1}}
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_tc_1}}
              </b-td>
              <b-td>
                {{pers.ps_tc_2}}
              </b-td>
              <b-td>
                {{pers.ps_carga_horaria_tc_2}}
              </b-td>
            </b-tr>
          </b-tbody>
      </b-table-simple>
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
</style>>

</style>