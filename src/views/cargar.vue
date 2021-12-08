<template>
  <v-main>
      <v-container>
          <v-img :src="require('@/assets/logo_red_maker.png')"></v-img>
          <div>
           <b-progress :value="mapear(cargado,0,sedes.length-1,0,100)" variant="danger" :animated=animated class="mt-3"></b-progress>
          <p>{{sedes[cargado].sede}}</p>
          {{cargado+1}} - {{sedes.length}}
          </div>
      </v-container>
  </v-main>
</template>

<script>
import {mapState} from 'vuex'
import router from '@/router'//necesito para acceder en que ruta estoy
export default {
data(){
    return{
        animated:true,
        cargado:0
    }
},
computed:{
    ...mapState(['rubricas_sede','sedes','cargando']),
},
created(){
    this.cargar();
},
methods:{
/*loaded(){
    const carga = setInterval(() => {
        this.cargado++
        if(this.cargado == 100){
            clearInterval(carga);
        }
    }, 200);
},*/
cargar(){
    console.log(router);
this.sedes.forEach((sede,index) => {
    this.$store.dispatch('obtener_rub_sede',sede)
    .then(msg=> {if(msg.status == 200){
        if (this.cargado < this.sedes.length-1) {
            this.cargado++
        }///cuando cargo todas
        if (this.cargado == this.sedes.length-1) {
            //this.$router.push({name:'Home'});
            this.$emit('sedesCargadas');
            if(router.history.current.name == 'cargar'){
                router.push({name:'Home'});
            }
        }
        }});
});
},
mapear: function(val, in_min, in_max, out_min, out_max){
return Math.round((val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
}
}
}
</script>

<style>
.progress-bar-striped{
    background-repeat: repeat;
}
</style>