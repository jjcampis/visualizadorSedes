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
          item-value="sede"
          label="Sede"
          v-model="sede"
          @change="selsede"
        ></v-select>
      </v-col>
  </v-row>
<b-table-simple sticky-header striped small responsive caption-top>
  <caption v-if="sede != '' && rubricas_G[sede] != undefined">
<b class="text-danger"> NA: </b>{{rubricas_G[sede].noaprobados}}
<b class="text-success">A: </b>{{rubricas_G[sede].aprobados}}<br>
bajas: {{rubricas_G[sede].bajas}}
inscriptos: {{rubricas_G[sede].inscriptos}}<br>
Prom PST: {{rubricas_G[sede].promPST.toFixed(2)}}
S/SA: {{ rubricas_G[sede].ssa }}

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

    <b-tbody v-if="sede != '' && rubricas_G[sede] != undefined" v-for="(tray, index) in table_trayectitos" :key="index">       
        <b-tr>
           <b-td rowspan="12" class="align-middle">
             {{sede}}
           </b-td>
           <b-td rowspan="12" class="align-middle">{{tray[0]}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].tiene_este_trayecto}}</b-td>
           
           <b-td rowspan="12" class="align-middle">{{tray[1].inscriptos}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].aprobados}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].noaprobados}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].bajas}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].ssa}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].evaluados}}</b-td>
           <b-td rowspan="12" class="align-middle">{{tray[1].informacion_adicional}}</b-td>
 
             <b-td rowspan="3">Electronica</b-td>
             <b-td rowspan="3">{{tray[1].elect_recursos}}</b-td>
             <b-td rowspan="3">{{tray[1].elect_ejecutado}}</b-td>
             <b-td rowspan="12" class="align-middle">{{tray[1].ods}}</b-td>
             <b-td>Conocer A1</b-td>
             <b-td>{{tray[1].electronica.a1}}</b-td>
             <b-td rowspan="12" class="align-middle">{{patot[tray[0]].a1.toFixed(2)}}</b-td>
             <b-td rowspan="12" class="align-middle">{{patot[tray[0]].a2.toFixed(2)}}</b-td>
             <b-td rowspan="12" class="align-middle">{{patot[tray[0]].a3.toFixed(2)}}</b-td>
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

import { mapState } from 'vuex'
export default({
data(){
return{
sede:'',
trayectos: ['TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'],
ejes:['electronica','contruccion','diseno','programacion','promedio_php'],//ejes a sacar promedio 
claves_datos:['tr','tk','mj','tm','ti','hm'],//para que todos tengan el mismo nombre
trayectitos_sedes:{},//es lo que sera enviado al comit es un objeto que contendra todas las sedes, con sus datos
table_trayectitos:[],//la sede actual a ser renderizada separado por trayectos

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
patot: {}
}
},
computed:{
    ...mapState(['rubricas_sede','sedes','rubricas_G']),
    /*noAprobados(){
    if(this.sede.length > 0){//evaluacion de estudiante segun sede
      return this.trayecto_data.filter((estud)=> {return estud.estado == "No Aprobado"});
    }else{
      return [];
  } 
  },*/
},
methods:{
//filtro la sede por trayecto
selsede(){
  console.log('sede',this.sede,' rubrica: ',this.rubricas_G[this.sede]);

if (this.rubricas_G[this.sede] != undefined){
  //existe la sede
  if (Object.keys(this.rubricas_G[this.sede].trayectos).length) {
  //tiene algo dentro de trayectos  
  
  
this.table_trayectitos = Object.entries(this.rubricas_G[this.sede]['trayectos']);
//this.trayecto_data = this.rubricas_sede[this.sede];

//calculo de los ultimos A1,a2..
var rx =[];
for (const trayecto of this.trayectos) {
  console.log('entra',trayecto);
  for (let aa = 1; aa < 4; aa++){
      for(const el in this.rubricas_G[this.sede]['trayectos'][trayecto]){
      if(el == 'electronica' || el == 'programacion' || el == 'diseno' || el == 'contruccion'){
        rx.push(this.rubricas_G[this.sede]['trayectos'][trayecto][el]['a'+aa])//extraigo los a1
        console.log('rx',rx,'de: ','a'+aa);
      }
      }
  
  if (this.patot[trayecto] == undefined) {
    console.log('se crea patot','a'+aa);
    this.patot[trayecto] = {};
    this.patot[trayecto]['a'+aa] = {};
  }
  //filtro, mapeo y saco promedio
  let res = rx.filter((x)=>x>0);
    //calculo el promedio
    if(res.length > 0){
      res = res.reduce((x,n)=>parseFloat(x)+parseFloat(n))
      this.patot[trayecto]['a'+aa] = res/rx.filter((x)=>x>0).length;
    }else{
      this.patot[trayecto]['a'+aa] = 0;
    }
    rx = [];
  }
} 
}
}
},
}

})
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