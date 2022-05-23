<template>
<div>

<b-row class="justify-content-md-center">
    <b-col col lg="1" class="text-end"><label class="me-0" for="sedes">Sede:</label></b-col>
    <b-col col lg="1" class="text-start" md="auto"><b-form-select id="sedes" v-model="sede" :options="sedes"></b-form-select></b-col>
    <b-col col lg="1" class="text-end"><div>Matrícula: <strong v-if="sede">{{sede.matricula}}</strong></div></b-col>
  </b-row>

<b-row class="justify-content-md-center">
    <b-col col lg="1" class="text-end"><label class="me-0" for="trayecto">Trayecto:</label></b-col>
    <b-col col lg="1" class="text-start" md="auto"><b-form-select id="trayecto" v-model="trayecto" :options="trayectos"></b-form-select></b-col>
    <b-col col lg="1" class="text-end"><div>Matrícula:<strong v-if="trayecto">{{trayecto.matricula}}</strong></div></b-col>
  </b-row>

  
  
  


  <p class="mt-5" ><b>PLANILLA DE EVALUACIÓN GENERAL TRIMESTRAL POR SEDE Y POR TRAYECTOS</b></p>
<b-button @click="muestra = !muestra">clickme</b-button>
{{muestra}}
<transition name="fade">
  <div v-if="muestra">aloja</div>
</transition>

<b-button @click="cargard">carga</b-button>
<div>
           <b-progress :value="mapear(cargado,0,sedes.length-1,0,100)" variant="success" class="mt-3"></b-progress>
          <p>{{sedes[cargado].sede}}</p>
          {{cargado+1}} - {{sedes.length}}
          </div>
</div>
</template>


<script>
import axios from '@/axios'
import store from '@/store'
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        rango: 0,
        cargado:0,
        muestra:false,
        trayecto: null,
        trayectitos_sedes:{},//es lo que se va a enviar al comit
          ejes:['electronica','contruccion','diseno','programacion','promedio_php'],
          claves_datos:['tr','tk','mj','tm','ti','hm'],
        vTrayectos: ['TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'],
        trayectos: [
          { value: null, text: 'Selecciona Trayecto' },
          { value: {sel:'Trend-kids' , matricula: 25} , text: 'Trend-Kids' },
          { value: {sel:'Tecno-kids' , matricula: 15} , text: 'Tecno-kids',  },
          { value: {sel:'Maker-Juniors', matricula: 35} , text: 'Maker-Juniors' },
        ],
        sede: null
      }
    },
    computed:{
    ...mapState(['rubricas_sede','rubricas_G','sedes','cargando']),
},
    methods:{
mapear: function(val, in_min, in_max, out_min, out_max){
return Math.round((val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
},
      ///funciono de a uno
      async cargard(){
        let pos = 0;
        //deep clone
        //window.mysede = JSON.parse(JSON.stringify(this.trayectos));//clona a otro con igual hace ref
        window.mysede = this.rubricas_sede//por mas que haga ref al ser solo lectura puedo modificar este
        for (const sede of this.sedes) {
          //let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_sedes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id)
          let response = await axios.get(axios.defaults.baseURL+'/dashboard/json/evaluacion_sedes_'+sede.id+'.json')
          //return response
          //aca llamo a otra funcion de ser necesario
          //await this.otra(response.data);//debe devolver una promise para que espere el tiempo de otra()
          
          let dato = response.data;
          store.commit('SET_rubricasG',{sede,dato})//esto tendria que hacer una vez filtrado todo
          await this.filtro_trayectos(sede.sede);//envio los datos de la sede actual
          //asigno las llaves
          this.añadir_claves_trayectos(dato,sede.sede);
          console.log('termino el sede; ',sede);
          console.log(this.sedes[pos].sede,dato);
          console.log('trayectito: ',this.trayectitos_sedes);
          
          if (pos == this.sedes.length-1) {
            console.log('todo ok cargado')
          }
          pos++;
          this.cargado++;
        }
      },
      async filtro_trayectos(sede){
        return new Promise((resolve)=>{
          console.log(sede);
          for (const trayecto of this.vTrayectos) {//recorro cada trayecto
            if(Object.keys(this.rubricas_sede).length > 0){//en teoria no haria falta
            let filter = this.rubricas_sede[sede].filter((estud)=> {//recorro rubrica en la posicion sede
              return estud.field_user_estudiante.toLowerCase().includes(trayecto.toLowerCase());
            });
            for(const eje of this.ejes) {
              this.calcprom(filter,eje,trayecto,sede);
            console.log('que1');
            }
            console.log(sede,trayecto,filter);
            console.log('trayectitos: ',this.trayectitos_sedes);
            
            }else{
              console.log('error',Object.keys(this.rubricas_sede).length);
              return []
            }
          }
          console.log('que2');
          //if (sede == '25 de Mayo' ) {
            resolve();
            
          //}
        })
      },

      calcprom(filtrado,eje,trayecto,sede){
       //return new Promise((resolve)=>{

        
//eje = electronica, diseno, programacion,contruccion,promedio_php(pst)
//A = A1,A2,A3
//trayecto
 if(this.trayectitos_sedes[sede] == undefined){
            this.trayectitos_sedes[sede] = {}
            console.log('se creo sede',sede);
          }
          if(this.trayectitos_sedes[sede][trayecto] == undefined){
            this.trayectitos_sedes[sede][trayecto] = {}
            console.log('se creo trayecto',trayecto);
          }
          if(this.trayectitos_sedes[sede][trayecto][eje] == undefined){
            console.log('se creo eje',eje);
            this.trayectitos_sedes[sede][trayecto][eje] = {}
          }
  var columna = '';
  var datito = {};
if(filtrado.length > 0){
  //console.log('filteringData...');
  console.log(filtrado,eje,trayecto);

  //let resultadoP = filtrado.filter(dato => parseInt(dato['field_rubrica_electronica_a1']) > 0).map(dato => parseInt(dato['field_rubrica_electronica_a1']));
      //console.log(resultadoP,eje,filtrado,trayecto);
    if(eje == 'promedio_php'){
      columna = 'field_rubrica_'+eje;
      datito = {};
      let resultado = filtrado.filter(dato => parseInt(dato[columna]) > 0).map(dato => parseInt(dato[columna]) || 0);//parseo a Int sino devuelvo 0
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/filtrado.filter(dato => parseInt(dato.field_rubrica_promedio_php) > 0).length;
        if(promedio > 0){
          //console.log('ok');
          let pos = 'pst';
          //console.log('guardando: '+promedio.toFixed(2));
          datito = {[pos]:promedio.toFixed(2)};
          //console.log(datito);
        }
        }
    }else{
  for (let i = 1; i < 4; i++) {
      columna = 'field_rubrica_'+eje+'_a'+i;
      //console.log(filtrado[0]['field_rubrica_'+eje+'_a'+i]);
      console.log('Aca datos:');
      console.log(parseInt(filtrado[0]['field_rubrica_'+eje+'_a1']) || 0);
      console.log(filtrado[0]['field_rubrica_'+eje+'_a2']);
      console.log(filtrado[0]['field_rubrica_'+eje+'_a3']);
      datito = {};
      let resultado = filtrado.filter(dato => parseInt(dato[columna]) > 0).map(dato => parseInt(dato[columna]) || 0);
      console.log('res =>',resultado);
      if(resultado.length>0){
        //console.log('entronding');
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/filtrado.filter(dato => parseInt(dato[columna]) > 0).length;
          //console.log('ok');
          let pos = 'a'+i;
          //console.log('guardando: '+promedio.toFixed(2));
          datito = {[pos]:promedio.toFixed(2)};
          //console.log(datito);
          Object.assign(this.trayectitos_sedes[sede][trayecto][eje],datito);
        }
  //fin for
    }
  }
  }else{//Filtrado no devolvio es decir no habian estudiantes en este trayecto
    if(eje == 'promedio_php'){
    datito = {'pst':0};
    }else{
      datito = {'a1':0,'a2':0,'a3':0};
    }
    }
    if(Object.keys(datito).length == 0){
      console.log('esta vacio');
      datito = {'a1':0,'a2':0,'a3':0};
    }
    console.log('datito',datito,'trayecto',trayecto,'eje',eje);
    Object.assign(this.trayectitos_sedes[sede][trayecto][eje],datito);
  
  /*resolve();
  })*/
  },


añadir_claves_trayectos(dato_sede,sede){
  //tr,tk...
  console.log('datosxx',dato_sede.length > 0);
  if(dato_sede.length > 0){
  var llaves = {};
this.claves_datos.forEach(element => {
  llaves[element] = Object.keys(dato_sede[0]).filter((clave) =>{return clave.substring(0, 2)==element})
  //return llaves
});
console.log('aqui llave', llaves);//tengo un array con las clasves de datos_sede separado por trayecto// seria sin el tr_rbr_
this.claves_datos.forEach(clave => {
llaves[clave].forEach(element => {
  //console.log(element);
  if(clave == 'tr'){
    try {
      //console.log(dato_sede[0][element]);
      if(this.trayectitos_sedes[sede]['TrendKids'] == undefined){
        this.trayectitos_sedes[sede]['TrendKids'] = {}
      }
      Object.assign(this.trayectitos_sedes[sede]['TrendKids'],{[element.substring(7)]:dato_sede[0][element]})
    } catch (error) {
      console.log('El error: ',error);
      console.log(this.trayectitos_sedes[sede]['TrendKids']);
      console.log(dato_sede[0][element]);    }
  }
  if(clave == 'tk'){
    console.log('datosede: ',dato_sede);
    Object.assign(this.trayectitos_sedes[sede]['TecnoKids'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'mj'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['MakerJuniors'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'tm'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['TeensMaker'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'ti'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['TeamInn'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'hm'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['HighMaker'],{[element.substring(7)]:dato_sede[0][element]})
  }
});
})
//this.table_trayectitos = Object.entries(this.trayectitos_sedes[sede]);
//testing///
//this.table_trayectitosP.push(this.table_trayectitos[0]) 
//console.log(this.table_trayectitos);
}
},














      async otra(sed){
        return new Promise((resolve)=>{
          setTimeout(() => {
          resolve(sed);
        }, 150);
        })
      },
    }
  }
</script>