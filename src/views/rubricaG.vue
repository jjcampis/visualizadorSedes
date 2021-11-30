<template>
<div>
  <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        md="6"
      >
        <v-select
          :items="sedes"
          item-text="sede"
          item-value="id"
          label="Sede"
          v-model="sede"
          return-object
          @change="getSede(sede)"
        ></v-select>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        md="6"
      >
        <v-select
          :items="trayectos"
          label="Trayecto"
          v-model="trayecto"
          return-object
        ></v-select>
      </v-col>
  </v-row>
  <b-table sticky-header head-variant="dark"  :fields="fields" :items="dato_sede" :busy="isBusy" class="mt-3" outlined>
<template #thead-top>
        <b-tr>
        <b-th colspan="15"></b-th>
        <b-th colspan="3">% TOTALES PROMEDIO POR TRAYECTO (PST)</b-th>
        <b-th>Promedio Trayecto</b-th>
      </b-tr>
</template>
<template #cell(field_sd_municipio)="data">
        <span class="text-info">{{data.item.field_sd_municipio}}</span>
</template>
<template #cell()="data">
        <span class="text-info">datoXX</span>
</template>
<template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Cargando...</strong>
        </div>
      </template>
    </b-table>
</div>
</template>

<script>
import axios from '@/axios'
export default {
  data(){
return{
  trayecto: '',
  sede: 0,
   isBusy: false,
      sedes:[
            {sede:'25 de Mayo', id:19198},
{sede:'Alba Posse', id:19199},
{sede:'Almafuerte', id:19200},
{sede:'Apóstoles', id:19201},
{sede:'Aristóbulo del Valle', id:19202},
{sede:'Azara', id:19203},
{sede:'Bernardo de Irigoyen', id:19204},
{sede:'Caá Yarí', id:19205},
{sede:'Campo Grande', id:19206},
{sede:'Campo Ramón', id:19207},
{sede:'Campo Viera', id:19208},
{sede:'Candelaria', id:19209},
{sede:'Capioví', id:19210},
{sede:'Cerro Azul', id:19211},
{sede:'Cerro Corá', id:19212},
{sede:'Colonia Alberdi', id:19213},
{sede:'Colonia Aurora', id:19214},
{sede:'Colonia Delicia', id:19215},
{sede:'Colonía Victoria', id:19216},
{sede:'Comandante Andresito', id:19217},
{sede:'Concepción de la Sierra', id:19218},
{sede:'Corpus', id:19219},
{sede:'Dos de Mayo', id:19220},
{sede:'El Alcazar', id:19221},
{sede:'El Soberbio', id:19222},
{sede:'Eldorado', id:19223},
{sede:'Fachinal', id:19224},
{sede:'Garuhape', id:19225},
{sede:'Garupá', id:19226},
{sede:'General Urquiza', id:19227},
{sede:'Gobernador Roca', id:19228},
{sede:'Guaraní', id:19229},
{sede:'Jardín América', id:19231},
{sede:'Leandro N. Alem', id:19232},
{sede:'Loreto', id:19233},
{sede:'Los helechos', id:19234},
{sede:'Montecarlo', id:19235},
{sede:'Oberá', id:19236},
{sede:'Panambí', id:19237},
{sede:'Posadas (En el Polo TIC)', id:19238},
{sede:'Pozo Azul', id:19239},
{sede:'Profundidad', id:19240},
{sede:'Puerto Esperanza', id:19241},
{sede:'Puerto Iguazú', id:19242},
{sede:'Puerto Libertad', id:19243},
{sede:'Puerto Piray', id:19244},
{sede:'Puerto Rico 01', id:19245},
{sede:'Puerto Rico 02', id:19286},
{sede:'Ruiz de Montoya', id:19246},
{sede:'Salto Encantado', id:19247},
{sede:'San Ignacio', id:19248},
{sede:'San Javier', id:19249},
{sede:'San José', id:19250},
{sede:'San Martín', id:19251},
{sede:'San Pedro', id:19252},
{sede:'San Vicente', id:19253},
{sede:'Santa Ana', id:19254},
{sede:'Santiago de Liniers', id:19255},
{sede:'Santo Pipó', id:19256},
],
trayectos: ['Todos','TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'
          /*{ value: 'Trend-kids', text: 'TrendKids' },
          { value: {sel:'Tecno-kids' , matricula: 15} , text: 'Tecnokids',  },
          { value: {sel:'Maker-Juniors', matricula: 35} , text: 'Maker-Juniors' },*/
        ],
      fields:[
        {
        key:'field_sd_municipio',
        label: 'Municipio'
        },
        {
          key:'a',
        label: 'Trayecto'
        },
        {
          key:'b',
        label: 'Tiene este Trayecto'
        },
        {
          key:'c',
        label: 'Inscriptos'
        },
        {
          key:'d',
        label: 'Aprobados'
        },
        {
            key:'e',
        label: 'No Aprobados'
        },
        {
            key:'f',
        label: 'Baja'
        },
        {
            key:'g',
        label: 'Sin Situacion'
        },
        {
            key:'h',
        label: 'Evaluados'
        },
        {
            key:'i',
        label: 'Información Adicional'
        },
        {
            key:'j',
        label: 'Ejes'
        },
        {
            key:'k',
        label: 'Recursos Utilizados'
        },
        {
            key:'l',
        label: 'Nivel Ejecutado planificado %'
        },
        {
            key:'c',
        label: 'Objetivos ODS'
        },
        {
            key:'m',
        label: 'Grados de Aprendizajes y Capacidades'
        },
        {
            key:'n',
        label: 'Parcial Saberes Por Eje %'
        },
        {
            key:'o',
        label: 'A1'
        },
        {
            key:'p',
        label: 'A2'
        },
        {
            key:'q',
        label: 'A3'
        },
        {
            key:'r',
        label: 'PST'
        }
      ],
      dato_sede:[]
}
},
computed:{
  /*trayecto_data(){
    if(this.dato_sede.length > 0){
    var campo = this.trayecto;
    if(campo == 'Todos'){
      campo = ''
    }
    let filter = this.dato_sede.filter((tray) => {
        return tray.field_user_estudiante.toLowerCase().includes(campo.toLowerCase());
      })
      return filter;
  }else{
    return [];
  }
  }*/
},
methods:{
colores: ((value, key, item) => {
            console.log(item,key,value);
            if(parseInt(item[key]) <= 25){
            return 'bg-rojo';
            }
            if(parseInt(item[key]) > 25 && parseInt(item[key]) < 51){
            return 'bg-amarillo';
            }
            if(parseInt(item[key]) > 50 && parseInt(item[key]) < 76){
            return 'bg-verdeclaro';
            }
            if(parseInt(item[key]) > 75 && parseInt(item[key]) <= 100){
            return 'bg-verdeoscuro';
            }else{
              return 'bg-black';
            }
      }),
 async getSede(sede) {
//console.log(sede)
this.isBusy = true;
try{
      //la URL base ya esta cargada en main.js (axios.baseURL)
      let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_sedes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id);
      this.dato_sede = response.data;
      console.log(response.data);
      this.isBusy = false;

  }catch(error){
      console.log(error);
      this.isBusy = false;
  }
  }
}
}
</script>

<style>
.v-application .primary--text {
    color: #ccc !important;
    caret-color: #bd1919 !important;
}
.bg-rojo{
  background: #f2dede;
}
.bg-amarillo{
  background: #fcf8e3;
}
.bg-verdeclaro{
  background: #dff0d8;
}
.bg-verdeoscuro{
  background: #9ce698;
}
.bg-black{
  background: #ccc;
}
thead {
    position: sticky;
    top: 0px;
    background: #343a40;
}
.table th {
    border: 0px !important;
}
.b-table-sticky-header {
    overflow-y: auto;
    max-height: 750px;
    height: 80vh;
}
.b-table-bottom-row{
  position: sticky;
  bottom: -1px;
  background: #343a40;
  color: #FFF;
}
</style>