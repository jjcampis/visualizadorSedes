<template>
<div>
  <div>
      <div class="pt-5 text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Finalizando...</strong>
      </div>
  </div>
</div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {

created(){
this.obtener_personal();
console.log("tercer carga");
},

methods:{
  ...mapActions(['obtener_personal'])
},
computed:{
    ...mapState(['personal','cargando']),
    },
    watch:{
      personal(newVal,oldVal){
        console.log("cambio el personal");
      if(Object.entries(this.personal).length > 0 && !this.cargando){
        this.$emit("pcargado")
      }

    }
}
}
</script>

<style scoped>
</style>