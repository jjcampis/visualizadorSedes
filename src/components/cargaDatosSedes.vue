<template>
<div>
  <div>
     <b-progress :value="mapear(cargado,0,sedes.length-1,0,100)" variant="danger" class="mt-3"></b-progress>
      <p class="pt-5">
          <b class="fadered" :key="sedes[cargado].sede">{{sedes[cargado].sede}}</b>
      </p>
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
    props:['cargar'],
    computed:{
    ...mapState(['rubricas_sede','rubricas_G','sedes','cargando']),
},
created(){
    if (this.cargar){
      console.log('segunda carga');
      this.cargard()
    }
},
    methods:{
mapear: function(val, in_min, in_max, out_min, out_max){
return Math.round((val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
},
      ///funciono de a uno
      async cargard(){
        let pos = 0;
        this.cargado = 0;
        //deep clone
        //window.mysede = JSON.parse(JSON.stringify(this.trayectos));//clona a otro con igual hace ref
        window.mysede = this.rubricas_sede//por mas que haga ref al ser solo lectura puedo modificar este
        for (const sede of this.sedes) {
          let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_sedes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id)
          //return response
          //aca llamo a otra funcion de ser necesario
          //await this.otra(response.data);//debe devolver una promise para que espere el tiempo de otra()
          
          let dato = response.data;
          console.log("antes de filtrar: "+JSON.stringify(dato));
          if (dato.length > 0){
            console.log("xxse filtra");
            
          }else{
            console.log("xxno se filtra");
          }
          //store.commit('SET_rubricasG',{sede,dato})//esto tendria que hacer una vez filtrado todo
          await this.filtro_trayectos(sede.sede);//envio los datos de la sede actual
          //asigno las llaves
          this.añadir_claves_trayectos(dato,sede.sede);
          console.log('termino el sede; ',sede);
          console.log(this.sedes[pos].sede,dato);
          console.log('trayectito: ',this.trayectitos_sedes);
          
          //this.extras(sede.sede);//aprobados no aprobados etc
          
          if (this.cargado < this.sedes.length-1) {
            pos++;
            this.cargado++;
          }
          if (pos == this.sedes.length-1) {
            console.log('todo ok cargado');
            await this.otra("x");
            this.$emit('datosSedesCargados');
          }
        }
      },
      async filtro_trayectos(sede){
        return new Promise((resolve)=>{
          console.log(sede);
          for (const trayecto of this.vTrayectos) {//recorro cada trayecto
            if(Object.keys(this.rubricas_sede).length > 0){//en teoria no haria falta
            console.log(this.rubricas_sede[sede].length);
                //if (this.rubricas_sede[sede].length > 0) {
                  let filter = this.rubricas_sede[sede].filter((estud)=> {//recorro rubrica en la posicion sede
                    return estud.field_user_estudiante.toLowerCase().includes(trayecto.toLowerCase());
                  });
                  for(const eje of this.ejes) {
                    this.calcprom(filter,eje,trayecto,sede);
                  console.log('que1');
                  }
                  console.log(sede,trayecto,filter);
                  console.log('trayectitos: ',this.trayectitos_sedes);
                
                /*}else{
                 //return [];
                 resolve();
                }*/
            }/*else{
              console.log('error',Object.keys(this.rubricas_sede).length);
              return []
            }*/
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
            this.trayectitos_sedes[sede]['inscriptos'] = this.rubricas_sede[sede].length;
            this.trayectitos_sedes[sede]['aprobados'] = this.rubricas_sede[sede].filter((estud)=> {return estud.estado == "Aprobado"}).length;
            this.trayectitos_sedes[sede]['noaprobados'] = this.rubricas_sede[sede].filter((estud)=> {return estud.estado == "No Aprobado"}).length;
            this.trayectitos_sedes[sede]['bajas'] = this.rubricas_sede[sede].filter((estud)=> {return estud.estado == "Baja"}).length;
            this.trayectitos_sedes[sede]['ssa'] = this.rubricas_sede[sede].length - this.trayectitos_sedes[sede]['aprobados'] - this.trayectitos_sedes[sede]['noaprobados'] - this.trayectitos_sedes[sede]['bajas'];
            this.trayectitos_sedes[sede]['evaluados'] = this.rubricas_sede[sede].filter((est)=>{ return parseInt(est.field_rubrica_promedio_php) > 0}).length;
            
            let resultado = this.rubricas_sede[sede].filter(dato => parseInt(dato.field_rubrica_promedio_php) > 0).map(dato => parseInt(dato.field_rubrica_promedio_php));
            let promedio = 0;
            if(resultado.length > 0){
              resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue)
              promedio = resultado/this.rubricas_sede[sede].filter(dato => parseInt(dato.field_rubrica_promedio_php) > 0).length;
              //return promedio.toFixed(2);//no retorno porque lo ocupo en linea
            }
            this.trayectitos_sedes[sede]['promPST'] = promedio; 
            this.trayectitos_sedes[sede]['trayectos'] = {}
            console.log('se creo sede',sede);
          }
          if(this.trayectitos_sedes[sede]['trayectos'][trayecto] == undefined){
            this.trayectitos_sedes[sede]['trayectos'][trayecto] = {}
            this.trayectitos_sedes[sede]['trayectos'][trayecto]['inscriptos'] = filtrado.length;
            this.trayectitos_sedes[sede]['trayectos'][trayecto]['aprobados'] = filtrado.filter((estud)=> {return estud.estado == "Aprobado"}).length;
            this.trayectitos_sedes[sede]['trayectos'][trayecto]['noaprobados'] = filtrado.filter((estud)=> {return estud.estado == "No Aprobado"}).length;
            this.trayectitos_sedes[sede]['trayectos'][trayecto]['bajas'] = filtrado.filter((estud)=> {return estud.estado == "Baja"}).length;
            this.trayectitos_sedes[sede]['trayectos'][trayecto]['ssa'] = filtrado.length - this.trayectitos_sedes[sede]['trayectos'][trayecto]['aprobados'] - this.trayectitos_sedes[sede]['trayectos'][trayecto]['noaprobados'] - this.trayectitos_sedes[sede]['trayectos'][trayecto]['bajas'];
            this.trayectitos_sedes[sede]['trayectos'][trayecto]['evaluados'] = filtrado.filter((est)=>{ return parseInt(est.field_rubrica_promedio_php) > 0}).length;

            console.log('se creo trayecto',trayecto);
          }
          if(this.trayectitos_sedes[sede]['trayectos'][trayecto][eje] == undefined){
            console.log('se creo eje',eje);
            this.trayectitos_sedes[sede]['trayectos'][trayecto][eje] = {} 
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
          Object.assign(this.trayectitos_sedes[sede]['trayectos'][trayecto][eje],datito);
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
    Object.assign(this.trayectitos_sedes[sede]['trayectos'][trayecto][eje],datito);
  
  /*resolve();
  })*/
  },


añadir_claves_trayectos(dato_sede,sede){
  //tr,tk...
  console.log('datosxx',dato_sede.length > 0);
  // console.log('datosxy',dato_sede,sede);
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
      if(this.trayectitos_sedes[sede]['trayectos']['TrendKids'] == undefined){
        this.trayectitos_sedes[sede]['trayectos']['TrendKids'] = {}
      }
      Object.assign(this.trayectitos_sedes[sede]['trayectos']['TrendKids'],{[element.substring(7)]:dato_sede[0][element]})
    } catch (error) {
      console.log('El error: ',error);
      console.log(this.trayectitos_sedes[sede]['trayectos']['TrendKids']);
      console.log(dato_sede[0][element]);    }
  }
  if(clave == 'tk'){
    console.log('datosede: ',dato_sede);
    Object.assign(this.trayectitos_sedes[sede]['trayectos']['TecnoKids'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'mj'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['trayectos']['MakerJuniors'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'tm'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['trayectos']['TeensMaker'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'ti'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['trayectos']['TeamInn'],{[element.substring(7)]:dato_sede[0][element]})
  }
  if(clave == 'hm'){
    //console.log(dato_sede[0][element]);
    Object.assign(this.trayectitos_sedes[sede]['trayectos']['HighMaker'],{[element.substring(7)]:dato_sede[0][element]})
  }
});
})
//this.table_trayectitos = Object.entries(this.trayectitos_sedes[sede]);
//testing///
//this.table_trayectitosP.push(this.table_trayectitos[0]) 
//console.log(this.table_trayectitos);
let dato = this.trayectitos_sedes[sede];
console.log('dato a enviar:',dato,sede); 
store.commit('SET_rubricasG',{sede,dato})
}else{
  let dato = {
    "inscriptos": 0,
    "aprobados": 0,
    "noaprobados": 0,
    "bajas": 0,
    "ssa": 0,
    "evaluados": 0,
    "promPST": 0,
    "trayectos": {
        "TrendKids": {
            "inscriptos": 0,
            "aprobados": 0,
            "noaprobados": 0,
            "bajas": 0,
            "ssa": 0,
            "evaluados": 0,
            "electronica": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "contruccion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "diseno": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "programacion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "promedio_php": {
                "pst": 0
            },
            "tiene_este_trayecto": "No",
            "informacion_adicional": "",
            "elect_recursos": "",
            "elect_ejecutado": "0%",
            "const_recursos": "",
            "const_ejecutado": "0%",
            "disen_recursos": "",
            "disen_ejecutado": "0%",
            "progr_recursos": "",
            "progr_ejecutado": "0%",
            "ods": ""
        },
        "TecnoKids": {
            "inscriptos": 0,
            "aprobados": 0,
            "noaprobados": 0,
            "bajas": 0,
            "ssa": 0,
            "evaluados": 0,
            "electronica": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "contruccion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "diseno": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "programacion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "promedio_php": {
                "pst": 0
            },
            "tiene_este_trayecto": "No",
            "informacion_adicional": "",
            "elect_recursos": "",
            "elect_ejecutado": "0%",
            "const_recursos": "",
            "const_ejecutado": "0%",
            "disen_recursos": "",
            "disen_ejecutado": "0%",
            "progr_recursos": "",
            "progr_ejecutado": "0%",
            "ods": ""
        },
        "MakerJuniors": {
            "inscriptos": 0,
            "aprobados": 0,
            "noaprobados": 0,
            "bajas": 0,
            "ssa": 1,
            "evaluados": 0,
            "electronica": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "contruccion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "diseno": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "programacion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "promedio_php": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "tiene_este_trayecto": "No",
            "informacion_adicional": "",
            "elect_recursos": "",
            "elect_ejecutado": "0%",
            "const_recursos": "",
            "const_ejecutado": "0%",
            "disen_recursos": "",
            "disen_ejecutado": "0%",
            "progr_recursos": "",
            "progr_ejecutado": "0%",
            "ods": ""
        },
        "TeensMaker": {
            "inscriptos": 0,
            "aprobados": 0,
            "noaprobados": 0,
            "bajas": 0,
            "ssa": 0,
            "evaluados": 0,
            "electronica": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "contruccion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "diseno": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "programacion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "promedio_php": {
                "pst": 0
            },
            "tiene_este_trayecto": "No",
            "elect_recursos": "",
            "const_recursos": "",
            "disen_recursos": "",
            "progr_recursos": "",
            "informacion_adicional": "",
            "elect_ejecutado": "0%",
            "const_ejecutado": "0%",
            "disen_ejecutado": "0%",
            "progr_ejecutado": "0%",
            "ods": ""
        },
        "TeamInn": {
            "inscriptos": 0,
            "aprobados": 0,
            "noaprobados": 0,
            "bajas": 0,
            "ssa": 0,
            "evaluados": 0,
            "electronica": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "contruccion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "diseno": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "programacion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "promedio_php": {
                "pst": 0
            },
            "informacion_adicional": "",
            "elect_ejecutado": "0%",
            "const_ejecutado_4": "0%",
            "disen_ejecutado": "0%",
            "progr_ejecutado": "0%",
            "ods": "",
            "tiene_este_trayecto": "No",
            "elect_recursos": "",
            "const_recursos": "",
            "disen_recursos": "",
            "progr_recursos": ""
        },
        "HighMaker": {
            "inscriptos": 0,
            "aprobados": 0,
            "noaprobados": 0,
            "bajas": 0,
            "ssa": 0,
            "evaluados": 0,
            "electronica": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "contruccion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "diseno": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "programacion": {
                "a1": 0,
                "a2": 0,
                "a3": 0
            },
            "promedio_php": {
                "pst": 0
            },
            "tiene_este_trayecto": "No",
            "informacion_adicional": "",
            "elect_recursos": "",
            "elect_ejecutado": "0%",
            "const_recursos": "",
            "const_ejecutado": "0%",
            "disen_recursos": "",
            "disen_ejecutado": "0%",
            "progr_recursos": "",
            "progr_ejecutado": "0%",
            "ods": ""
        }
    }
};
  store.commit('SET_rubricasG',{sede,dato})
}
},

/* extras(sede){//aprobados no aprobados etc

}, */














      async otra(sed){
        return new Promise((resolve)=>{
          setTimeout(() => {
          resolve(sed);
        }, 2000);
        })
      },
    }
  }
</script>