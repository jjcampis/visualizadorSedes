<template>
    <div>
       <apexchart :key="createdH" ref="barritash" v-show="showchartsH && !cargando" class="apex-moco" :type="type" height="300" width="100%" :options="chartOptionsHP" :series="vecHP" @dataPointSelection="get_H"></apexchart>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import charHP from '@/components/datas/cantidad_personalHP'

export default {
    data(){
        return{
            showchartsH: false,
            type: 'line',
            chartOptionsHP: charHP,
            createdH:0,
            vec_HP:{}
        }
        },
        mounted(){
            this.actu()
        },
        created(){
            this.$set(this.chartOptionsHP.xaxis, 'categories', this.vsedes);
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
            actu(){
        // :key="created" 
        setTimeout(() => {
            this.creado = true;
            this.createdH++
          }, 1500),
        setTimeout(() => {this.showchartsH = true;},500),
        // window.dispatchEvent(new Event('resize'))
        this.$refs.barritash.refresh();
            },
        testbb(selected){
            this.$refs.barritash.toggleDataPointSelection(0,selected);
            //alert(selected);
        },
            get_H(event, chartContext, config){
            console.log("click")
            console.log(this.sedes[config.dataPointIndex]);
            this.sede = this.sedes[config.dataPointIndex].sede;
        },
        },
      computed:{
        ...mapState(['personal','sedes','cargando','rubricas_G','selectedSede']),
        vsedes(){
      if(Object.keys(this.rubricas_G).length > 0){
      return Object.keys(this.rubricas_G).map((x)=>{return x});
      }else{
        return []
      }
    },
        vecHP(){
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
        let reducex = suma.map(x=>x.reduce((a,b)=>parseFloat(a)+parseFloat(b),0))

        let suma1 = Object.values(agrupadohp).map((x)=>{return x}).map(x=>x.map(y=>y.ps_carga_horaria_cumpliend));
        let reducex1 = suma1.map(x=>x.reduce((a,b)=>parseFloat(a)+parseFloat(b),0))

        let suma2 = Object.values(agrupadohp).map((x)=>{return x}).map(x=>x.map(y=>y.ps_carga_horaria_actual_trayecto));
        let reducex2 = suma2.map(x=>x.reduce((a,b)=>parseFloat(a)+parseFloat(b),0))
        //return reducex
        return [{'name':'a cumplir','type':'column','data':reducex},
                {'name':'cumpliendo','type':'column','data':reducex1},
                {'name':'en trayecto','type':'line','data':reducex2}
                
                ]
          }

        }
        },
        watch:{
          selectedSede(newVal,oldVal){
            this.sede = newVal.sede;
            // console.log("Primer",newVal,oldVal);
          let a = this.chartOptionsHP.xaxis.categories;
          //console.log("barritas",this.$refs.barritash.$el);
          var selected = a.findIndex(a => a === newVal.sede);
          // console.log("barras",selected);
          //this.$refs.barritash.toggleDataPointSelection(0,selected)
          if (newVal.sede != oldVal.sede) {
            this.testbb(selected);
          }
          }
        },
}
</script>

<style>

</style>