<template>
   <div>
       <div v-show="!$vuetify.breakpoint.mobile">
       <desktop></desktop>
       </div>
       <div v-show="$vuetify.breakpoint.mobile">
       <mobile :vecins="vecins"></mobile>
       </div>
       <!-- <component :is="compo"></component> -->
   </div>
</template>

<script>
import desktop from '@/components/graficos/Desktop.vue'
import mobile from '@/components/graficos/mobile.vue'
import { mapState } from 'vuex'
export default {
components:{
    desktop,
    mobile
},
 activated: function() {
    console.log('de nuevo');
    if (this.$refs.chart) {
            // HTML element exists
          console.log('esta el chart');
          //chart.refresh();
        }
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
      
      if (this.$vuetify.breakpoint.mobile) {
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
      
      }
    }else{
      return []
    }},
    
    
    compo(){
        if (this.$vuetify.breakpoint.mobile) {
            return 'mobile'
        } else {
            return 'desktop'
        }
    }
}
}
</script>

<style>

</style>