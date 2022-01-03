<template>
<div>
<v-row no-gutters>
      <v-col
        cols="12"
      >
<v-img
              :src="require('../assets/dash.png')"
            ></v-img>
      </v-col>
</v-row>
</div>
</template>
<script>
import axios from '@/axios'
export default {
data(){
return{
      sedes:[
            {sede:'Colonia Victoria',id: 19216},
            {sede: 'Colonia Delicia', id: 19215},
            {sede: 'Almafuerte', id: 19200}
],
      dato_sede:[]
}
},
mounted(){
      console.log('me cargue al montar');
      console.log(this.sedes[1].id);
      this.getTodos();
      /*axios.get('http://localhost:8080/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+this.sedes[1].id).then(
            function(response) {
                  console.log(response.data);      
            }
      )*/
      
},
methods:{
 async getTodos() {
try{
      //la URL base ya esta cargada en main.js (axios.baseURL)
      //console.log(axios.defaults.baseURL);
      let response = await axios.get(axios.defaults.baseURL+this.sedes[1].id);
      console.log(response.data);
  }catch(error){
      console.log(error);
  }
  }
}
}
</script>