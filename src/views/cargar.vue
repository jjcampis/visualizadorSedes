<template>
  <v-main>
      <v-container fluid fill-heights
      style="max-width: 95%;"
      class="px-0">
      <v-row no-gutters>
        <v-col md="6"
        offset-md="3" cols="6" sm="6">
          <v-img :src="require('@/assets/logo_red_maker.png')"></v-img>
          <div v-if="ncarga == 1">
              <!-- Cargando rubricas Trimestrales -->
              01 / 04
           <b-progress :value="mapear(cargado,0,sedes.length-1,0,100)" variant="danger" :animated=animated class="mt-3"></b-progress>
            <p class="pt-5">
                <b class="fadered" :key="sedes[cargado].sede">{{sedes[cargado].sede}}</b>
            </p>
          {{cargado+1}} - {{sedes.length}}
          </div>
        <div v-show="ncarga == 2">
            <!-- Cargando rubricas Generales -->
            02 / 04
        </div>
        <div v-show="ncarga == 3">
            <!-- Cargando rubricas Generales -->
            03 / 04
        </div>
        <div v-show="ncarga == 4">
            <!-- Cargando rubricas Generales -->
            04 / 04
        </div>
          <datosede v-on:datosSedesCargados="dasedcargado" v-if="ncarga == 2" :cargar='true' ref="dsedes"></datosede>
          <distH v-on:hcargado="hcargo" v-if="ncarga == 3"></distH>
          <personal v-on:pcargado="pcargo" v-if="ncarga == 4"></personal>
        </v-col>
      </v-row>
      </v-container>
  </v-main>
</template>

<script>
import datosede from '@/components/cargas/cargaDatosSedes'
import distH from '@/components/cargas/distribH'
import personal from '@/components/cargas/personal'
import axios from '@/axios'
import store from '@/store'
import {mapState, mapActions} from 'vuex'
import router from '@/router'//necesito para acceder en que ruta estoy
export default {
data(){
    return{
        animated:true,
        cargado:0,
        ncarga:1//esto hace referencia a la segunda carga(datos sedes)
    }
},
components:{
    datosede,
    distH,
    personal
},
computed:{
    ...mapState(['rubricas_sede','sedes','cargando']),
},
created(){
    this.cargar();
},
methods:{
...mapActions(['obtener_horario']),
async cargar(){
    console.log(router);
    store.commit('Reiniciarbd');
    for (const sede of this.sedes) {
        console.log(sede);
        // console.log("URL: "+"r2d2.roboticamisiones.com"+'/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id);
          // let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id)
          // let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id+'.json')
          let response = await axios.get(axios.defaults.baseURL+'/dashboard/json/evaluacion_estudiantes_'+sede.id+'.json')
          //let dato = response.data;
          console.log("resp del serv: ",response.data);
            //if(dato){
                if (this.cargado < this.sedes.length-1) {
                    this.cargado++;
                }    
                store.commit('SET_rubricas',{sede,response});
            if (this.cargado == this.sedes.length-1) {
                this.ncarga = 2;
            }


                
            //}
    }
/* this.sedes.forEach((sede,index) => {
    this.$store.dispatch('obtener_rub_sede',sede)
    .then(msg=> {if(msg.status == 200){
        
        if (this.cargado < this.sedes.length-1) {
            this.cargado++
        }///cuando cargo todas
        if (this.cargado == this.sedes.length-1) {
            //this.$router.push({name:'Home'});
            //this.$emit('sedesCargadas');//se llama desde el hijo(datos sedes)
            
            this.segunda = true;
            
            //this.$refs.dsedes.cargard();//funciona pero error en consola

            /* if(router.history.current.name == 'cargar'){
                router.push({name:'Home'});
            } ////*
        
        
        }
        }else{
            console.log('No existia'+sede.sede);
             this.cargado++;
        }
        
        });
}); */
},
dasedcargado(){
    console.log('datosSedesCargados');
    //cargar horarios
    this.ncarga = 3; 
},

hcargo(){
  //this.redirect();
  this.ncarga = 4;
},
pcargo(){
this.redirect();
},
redirect(){
  this.$emit('sedesCargadas');
  console.log("redireccionando");
  if(router.history.current.name == 'cargar'){
      setTimeout(() => {
        router.push({name:'Home'});  
  }, 1000);
    }
},
cargadatoSede(sede){
return new Promise((resolve,reject) => {
        //axios.get(axios.defaults.baseURL+'/json/evaluacion_sedes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id)
        axios.get(axios.defaults.baseURL+'/dashboard/json/evaluacion_sedes_'+sede.id+'.json')
        
        .then(function(response){
        console.log('me cargue');
        resolve(response);
        console.log(response.data);
        return response.data;
      }).catch((error) => {
        reject( error );
      });
    })
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
.fadered {
  animation: mymove .5s ease-out;
}
@keyframes mymove {
  from {
    /* background-color: red; */
    opacity: 0;
    /* color:rgba(255, 0, 0, 0.247) */
  }
  to {
    /* background-color: yellow; */
    opacity: 1;
    /* color:rgba(0, 0, 0, 1); */
  }
}
</style>