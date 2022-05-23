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
          @change="obtener_rubricas(sede)"
        ></v-select>
      </v-col>
  </v-row>
<b-table-simple sticky-header striped small responsive caption-top>
  <caption>
<b class="text-danger"> NA: </b>{{noAprobados.length}}
<b class="text-success">A: </b>{{aprobados.length}}<br>
bajas: {{bajas.length}}
inscriptos: {{rubricas_sede.length}}<br>
Prom PST: {{promPST}}
S/SA: {{ rubricas_sede.length-aprobados.length - noAprobados.length - bajas.length }}

  </caption>
<b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="16"></b-th>
        <b-th colspan="3">% TOTALES PROMEDIO POR TRAYECTO (PST)</b-th>
        <b-th>Promedio Trayecto</b-th>
        </b-tr>
      <b-tr>
        <b-th  v-for="(field,index) in fields" :key="index">{{field.label}}</b-th>
      </b-tr>
    </b-thead>

    <b-tbody v-for="(tray, index) in table_trayectitos" :key="index">       
        <b-tr>
           <b-td rowspan="12" class="align-middle">
             {{sede.sede}}
           </b-td>
           <b-td rowspan="12" class="align-middle">{{tray[0]}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].tiene_este_trayecto}}</b-td>
           
           <b-td rowspan="12" class="align-middle">{{inscriptosT(tray[0])}}</b-td>
           <b-td rowspan="12" class="align-middle">{{aprobadosT(tray[0])}}</b-td>
           <b-td rowspan="12" class="align-middle">{{noAprobadosT(tray[0])}}</b-td>
           <b-td rowspan="12" class="align-middle">{{bajasT(tray[0])}}</b-td>
           <b-td rowspan="12" class="align-middle">{{ inscriptosT(tray[0]) - aprobadosT(tray[0]) - noAprobadosT(tray[0]) - bajasT(tray[0]) }}</b-td>
           <b-td rowspan="12" class="align-middle">{{evaluadoT(tray[0])}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].informacion_adicional}}</b-td>
 
             <b-td rowspan="3">Electronica</b-td>
             <b-td rowspan="3">{{tray[1].elect_recursos}}</b-td>
             <b-td rowspan="3">{{tray[1].elect_ejecutado}}</b-td>
             <b-td rowspan="12" class="align-middle">{{tray[1].ods}}</b-td>
             <b-td>Conocer A1</b-td>
             <b-td>{{tray[1].electronica.a1}}</b-td>
             <b-td rowspan="12" class="align-middle">{{paT(tray[0],1)}}</b-td>
             <b-td rowspan="12" class="align-middle">{{paT(tray[0],2)}}</b-td>
             <b-td rowspan="12" class="align-middle">{{paT(tray[0],3)}}</b-td>
             <b-td rowspan="12" class="align-middle">{{tray[1].promedio_php.pst}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Hacer A2</b-td>
             <b-td>{{tray[1].electronica.a2}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Convivir A3</b-td>
             <b-td>{{tray[1].electronica.a3}}</b-td>
         </b-tr>
 
         <b-tr>
             <b-td rowspan="3">Construcción</b-td>
             <b-td rowspan="3">{{tray[1].const_recursos}}</b-td>
             <b-td rowspan="3">{{tray[1].const_ejecutado}}</b-td>
             <b-td>Conocer A1</b-td>
             <b-td>{{tray[1].contruccion.a1}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Hacer A2</b-td>
             <b-td>{{tray[1].contruccion.a2}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Convivir A3</b-td>
             <b-td>{{tray[1].contruccion.a3}}</b-td>
         </b-tr>
 
         <b-tr>
             <b-td rowspan="3">Diseño</b-td>
             <b-td rowspan="3">{{tray[1].disen_recursos}}</b-td>
             <b-td rowspan="3">{{tray[1].disen_ejecutado}}</b-td>
             <b-td>Conocer A1</b-td>
             <b-td>{{tray[1].diseno.a1}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Hacer A2</b-td>
             <b-td>{{tray[1].diseno.a2}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Convivir A3</b-td>
             <b-td>{{tray[1].diseno.a3}}</b-td>
         </b-tr>
 
         <b-tr>
             <b-td rowspan="3">Programacion</b-td>
             <b-td rowspan="3">{{tray[1].progr_recursos}}</b-td>
             <b-td rowspan="3">{{tray[1].progr_ejecutado}}</b-td>
             <b-td>Conocer A1</b-td>
             <b-td>{{tray[1].programacion.a1}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Hacer A2</b-td>
             <b-td>{{tray[1].programacion.a2}}</b-td>
         </b-tr>
         <b-tr>
             <b-td>Convivir A3</b-td>
             <b-td>{{tray[1].programacion.a3}}</b-td>
         </b-tr>
         
     </b-tbody>

</b-table-simple>
</div>
</template>

<script>
import axios from '@/axios'
import { mapActions,mapState } from 'vuex'
export default {
  data(){
return{
  trayecto: '',
  promediosAs: [],
  /*promTray:{
    teaminn:{
      electronica:[],
      construccion:[],
      diseno:[],
      programacion:[]
    }
  },*/
  ejes:['electronica','contruccion','diseno','programacion','promedio_php'],
  claves_datos:['tr','tk','mj','tm','ti','hm'],
  trayectito:{},
  table_trayectitos:[],
  table_trayectitosP:[],
  sede: 0,
   isBusy: false,
     
trayectos: ['TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'
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
            key:'m',
        label: 'Objetivos ODS'
        },
        {
            key:'n',
        label: 'Grados de Aprendizajes y Capacidades'
        },
        {
            key:'o',
        label: 'Parcial Saberes Por Eje %'
        },
        {
            key:'p',
        label: 'A1'
        },
        {
            key:'q',
        label: 'A2'
        },
        {
            key:'r',
        label: 'A3'
        },
        {
            key:'s',
        label: 'PST'
        }
      ],
      dato_sede:[]
}
},
computed:{
  ...mapState(['rubricas_sede','cargando','sedes']),
  aprobados(){
    if(this.dato_sede.length > 0){
      return this.rubricas_sede.filter((estud)=> {return estud.estado == "Aprobado"});
    }else{
      return [];
  } 
  },
    noAprobados(){
    if(this.dato_sede.length > 0){
      return this.rubricas_sede.filter((estud)=> {return estud.estado == "No Aprobado"});
    }else{
      return [];
  } 
  },
  promPST(){
    if(this.dato_sede.length > 0){
      let resultado = this.rubricas_sede.filter(dato => parseInt(dato.field_rubrica_promedio_php) > 0).map(dato => parseInt(dato.field_rubrica_promedio_php));
      if(resultado.length > 0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue)
        let promedio = resultado/this.rubricas_sede.filter(dato => parseInt(dato.field_rubrica_promedio_php) > 0).length;
        return promedio.toFixed(2);
      }
      return
     }else{
      return 0;
  } 
  },
   bajas(){
    if(this.dato_sede.length > 0){
      return this.rubricas_sede.filter((estud)=> {return estud.estado == "Baja"});
    }else{
      return [];
  } 
  }
},
methods:{
  ...mapActions([
    'obtener_rubricas'
  ]),
  /*obtener_rubrica(sede){
    this.obtener_rubricas(sede);
  },*/

  aprobadosT(trayecto){
    if(this.dato_sede.length > 0){
      return this.aprobados.filter((estud)=> {
        return estud.field_user_estudiante.toLowerCase().includes(trayecto.toLowerCase());
      }).length;
    }else{
      return 0;
  } 
  },
  noAprobadosT(trayecto){
    if(this.dato_sede.length > 0){
      return this.noAprobados.filter((estud)=> {
        return estud.field_user_estudiante.toLowerCase().includes(trayecto.toLowerCase());
      }).length;
    }else{
      return 0;
  } 
  },
  evaluadoT(trayecto){
    if(this.dato_sede.length > 0){
      //trayecto
      let trayec = this.rubricas_sede.filter((estud)=> {
        return estud.field_user_estudiante.toLowerCase().includes(trayecto.toLowerCase());
      });

      return trayec.filter((est)=>{ return parseInt(est.field_rubrica_promedio_php) > 0}).length;
    }else{
      return 0;
  } 
  },
  bajasT(trayecto){
    if(this.dato_sede.length > 0){
      return this.bajas.filter((estud)=> {
        return estud.field_user_estudiante.toLowerCase().includes(trayecto.toLowerCase());
      }).length;
    }else{
      return 0;
  } 
  },
  inscriptosT(trayecto){
    if(this.dato_sede.length > 0){
      return this.rubricas_sede.filter((estud)=> {
        return estud.field_user_estudiante.toLowerCase().includes(trayecto.toLowerCase());
      }).length;
    }else{
      return 0;
  } 
  },
  //((parseFloat (tray[1].electronica.a1) + parseFloat (tray[1].contruccion.a1) + parseFloat (tray[1].programacion.a1) + parseFloat (tray[1].diseno.a1)) / 4).toFixed(2)
  paT(trayecto,a){
    var promA = 0;
    var suma = 0;
    var contador = 0;
    var vector = [];
    var vecttemp = {};
    if(this.dato_sede.length > 0){
      //trayecto
      let sede = this.sedes.sede;
      // console.log(this.trayectito);
      // console.log('vector:');
      // console.log('elect trend',this.table_trayectitos[0][1].electronica.a1);
      
      //console.log('indice: ',trayecto,'posicion: ',this.table_trayectitos.indexOf(trayecto));
      
      for (let i = 0; i < this.table_trayectitos.length; i++) {
        const dato_trayecto = this.table_trayectitos[i][1];
        const nombre_trayecto = this.table_trayectitos[i][0];
        
        //console.log(dato_trayecto['electronica']['a1']);
        
        //vector.push(nombre_trayecto);
        
        
            vecttemp = {};
          for (let aa = 1; aa < 4; aa++) {
            promA = 0;
            suma = 0;
            contador = 0;
            for (let eje = 0; eje < this.ejes.length-1; eje++) {
              let ejex = this.ejes[eje];
              let busqueda = dato_trayecto[ejex]['a'+aa];
              if(parseFloat(busqueda) > 0){
                contador++;
                suma += parseFloat(busqueda); 
              }
            }
              if(suma > 0){
            promA = suma/contador;
              }else{
                promA = 0;
              }
            //vecttemp.push({['a'+aa] : promA});
            console.log(nombre_trayecto,'a'+aa,'Promedio: ',promA);
            Object.assign(vecttemp,{['a'+aa] : promA})

          console.log(vecttemp);
        //suma += parseFloat(trayec['field_rubrica_'+this.ejes[index]+'_a'+a]);
        }
        vector[nombre_trayecto]=vecttemp;
      }
      console.log(vector);
      /*this.$nextTick(() => {
        this.promediosAs = vector;
      });*/
      return (vector[trayecto]['a'+a]).toFixed(2);
      //return 'x999'
      //this.$set(this.promediosAs,vector);


    }else{
      return 0;
  } 
  },

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
      //let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_sedes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id);
      let response = await axios.get(axios.defaults.baseURL+'/dashboard/json/evaluacion_sedes_'+sede.id+'.json');
      this.dato_sede = response.data;
      console.log(response.data);
      this.getDatosSede(sede.id);

  }catch(error){
      console.log(error);
      this.getDatosSede(sede.id);
      this.isBusy = false;
  }
  },

async getDatosSede(sede) {
console.log(sede)
this.isBusy = true;
try{
      //la URL base ya esta cargada en main.js (axios.baseURL)
      let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede);
      this.rubricas_sede = response.data;
      console.log('datosr');
      console.log(response.data);
      this.isBusy = false;
      console.log('trayendo datos de metodo');
      this.trayectos.forEach(element => {
        this.trayecto_data(element);
      })
      this.añadir_claves_trayectos();
      //this.promediosAs = this.paT();

  }catch(error){
      console.log(error);
      this.isBusy = false;
  }
  },
trayecto_data(trayecto){
    if(this.rubricas_sede.length > 0){
    var campo = trayecto;
    let filter = this.rubricas_sede.filter((estud)=> {
        return estud.field_user_estudiante.toLowerCase().includes(campo.toLowerCase());
      });
      //return filter;
      //this.promTray[trayecto].electronica = [];
        this.ejes.forEach(eje => {
          this.calcprom(filter,eje,trayecto);
        })
  }else{
    return [];
  }
  },
añadir_claves_trayectos(){
  //tr,tk...
  var llaves = {};
this.claves_datos.forEach(element => {
  llaves[element] = Object.keys(this.dato_sede[0]).filter((clave) =>{return clave.substring(0, 2)==element})
  //return llaves
});
console.log('aqui llave', llaves);//tengo un array con las clasves de datos_sede separado por trayecto// seria sin el tr_rbr_
this.claves_datos.forEach(clave => {
llaves[clave].forEach(element => {
  //console.log(element);
  if(clave == 'tr'){
    try {
      //console.log(this.dato_sede[0][element]);
      if(this.trayectito[this.sede.sede]['TrendKids'] == undefined){
        this.trayectito[this.sede.sede]['TrendKids'] = {}
      }
      Object.assign(this.trayectito[this.sede.sede]['TrendKids'],{[element.substring(7)]:this.dato_sede[0][element]})
    } catch (error) {
      console.log('El error: ',error);
      console.log(this.trayectito[this.sede.sede]['TrendKids']);
      console.log(this.dato_sede[0][element]);    }
  }
  if(clave == 'tk'){
    //console.log(this.dato_sede[0][element]);
    Object.assign(this.trayectito[this.sede.sede]['TecnoKids'],{[element.substring(7)]:this.dato_sede[0][element]})
  }
  if(clave == 'mj'){
    //console.log(this.dato_sede[0][element]);
    Object.assign(this.trayectito[this.sede.sede]['MakerJuniors'],{[element.substring(7)]:this.dato_sede[0][element]})
  }
  if(clave == 'tm'){
    //console.log(this.dato_sede[0][element]);
    Object.assign(this.trayectito[this.sede.sede]['TeensMaker'],{[element.substring(7)]:this.dato_sede[0][element]})
  }
  if(clave == 'ti'){
    //console.log(this.dato_sede[0][element]);
    Object.assign(this.trayectito[this.sede.sede]['TeamInn'],{[element.substring(7)]:this.dato_sede[0][element]})
  }
  if(clave == 'hm'){
    //console.log(this.dato_sede[0][element]);
    Object.assign(this.trayectito[this.sede.sede]['HighMaker'],{[element.substring(7)]:this.dato_sede[0][element]})
  }
});
})
this.table_trayectitos = Object.entries(this.trayectito[this.sede.sede]);
//testing///
this.table_trayectitosP.push(this.table_trayectitos[0]) 
console.log(this.table_trayectitos);
},



calcprom(filtrado,eje,trayecto){
//eje = electronica, diseno, programacion,contruccion,promedio_php(pst)
//A = A1,A2,A3
//trayecto
 if(this.trayectito[this.sede.sede] == undefined){
            this.trayectito[this.sede.sede] = {}
          }
          if(this.trayectito[this.sede.sede][trayecto] == undefined){
            this.trayectito[this.sede.sede][trayecto] = {}
          }
          if(this.trayectito[this.sede.sede][trayecto][eje] == undefined){
          //console.log('se creo');
            this.trayectito[this.sede.sede][trayecto][eje] = {}
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
          Object.assign(this.trayectito[this.sede.sede][trayecto][eje],datito);
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
    Object.assign(this.trayectito[this.sede.sede][trayecto][eje],datito);
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