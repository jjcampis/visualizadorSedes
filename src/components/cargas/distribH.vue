<template>
<div>
  <div>
      <div class="pt-5 text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Cargando Horarios...</strong>
      </div>
  </div>
</div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {

created(){
this.obtener_horario();
console.log("tercer carga");
},

methods:{
  ...mapActions(['obtener_horario'])
},
computed:{
    ...mapState(['horario','cargando']),
    },
    watch:{
      horario(newVal,oldVal){
        console.log("cambio el horario");
      if(Object.entries(this.horario).length > 0 && !this.cargando){
        this.$emit("hcargado")
      }

    }
}
}
</script>

<style scoped>
</style>