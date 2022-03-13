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
  <b-table sticky-header head-variant="dark" thead-tr-class="d-none" :fields="fields" :items="trayecto_data" :busy="cargando" class="my-0" outlined>
<template #thead-top>
        <b-tr>
        <b-th rowspan="3">Dni</b-th>
        <b-th rowspan="3">Estudiante</b-th>
        <b-th colspan="12" class="text-center">Grados de Aprendizaje y capacidades por Ejes en %</b-th>
        <b-th rowspan="3">Promedio Saberes Totales % (PST)</b-th>
        <b-th rowspan="3">Situación Académica</b-th>
        <b-th rowspan="3">Información Adicional</b-th>
      </b-tr>
      <b-tr>
        <b-th colspan="3" class="bg-warning text-center">Electrónica</b-th>
        <b-th colspan="3" class="bg-danger text-center">Construcción</b-th>
        <b-th colspan="3" class="bg-info text-center">Diseño</b-th>
        <b-th colspan="3" class="bg-success text-center">Programación</b-th>
      </b-tr>
      <b-tr>
        <b-th>A1</b-th>
        <b-th>A2</b-th>
        <b-th>A3</b-th>
<b-th>A1</b-th>
        <b-th>A2</b-th>
        <b-th>A3</b-th>
<b-th>A1</b-th>
        <b-th>A2</b-th>
        <b-th>A3</b-th>
<b-th>A1</b-th>
        <b-th>A2</b-th>
        <b-th>A3</b-th>
      </b-tr>
</template>

<template #cell(dni)="data">
        <span class="text-info">{{ data.item.uid }}</span>
</template>
<template #cell(estudiante)="data">
        <span class="text-info">{{ data.item.field_estu_apellido_y_nombre }}, {{ data.item.field_estu_nombres }}</span>
</template>
<template class="bg-warning" #cell(field_rubrica_electronica_a1)="data">
        <span class="text-info">{{ data.item.field_rubrica_electronica_a1 }}</span>
</template>
<template #cell(field_rubrica_electronica_a2)="data">
        <span class="text-info">{{ data.item.field_rubrica_electronica_a2 }}</span>
</template>
<template #cell(field_rubrica_electronica_a3)="data">
        <span class="text-info">{{ data.item.field_rubrica_electronica_a3 }}</span>
</template>
<!--construccion-->
<template #cell(field_rubrica_contruccion_a1)="data">
        <span class="text-info">{{ data.item.field_rubrica_contruccion_a1 }}</span>
</template>
<template #cell(field_rubrica_contruccion_a2)="data">
        <span class="text-info">{{ data.item.field_rubrica_contruccion_a2 }}</span>
</template>
<template #cell(field_rubrica_contruccion_a3)="data">
        <span class="text-info">{{ data.item.field_rubrica_contruccion_a3 }}</span>
</template>
<!--disenno-->
<template #cell(field_rubrica_diseno_a1)="data">
        <span class="text-info">{{ data.item.field_rubrica_diseno_a1 }}</span>
</template>
<template #cell(field_rubrica_diseno_a2)="data">
        <span class="text-info">{{ data.item.field_rubrica_diseno_a2 }}</span>
</template>
<template #cell(field_rubrica_diseno_a3)="data">
        <span class="text-info">{{ data.item.field_rubrica_diseno_a3 }}</span>
</template>
<!--programacion-->
<template #cell(field_rubrica_programacion_a1)="data">
        <span class="text-info">{{ data.item.field_rubrica_programacion_a1 }}</span>
</template>
<template #cell(field_rubrica_programacion_a2)="data">
        <span class="text-info">{{ data.item.field_rubrica_programacion_a2 }}</span>
</template>
<template #cell(field_rubrica_programacion_a3)="data">
        <span class="text-info">{{ data.item.field_rubrica_programacion_a3 }}</span>
</template>

<template #cell(PST)="data">
        <span class="text-info">{{ data.item.field_rubrica_promedio_php }}</span>
</template>
<template #cell(situacion)="data">
        <span class="text-info">{{ data.item.estado }}</span>
</template>

<template #cell(adicional)="data">
        <span class="text-info">{{ data.item.field_rubrica_info_adicional }}</span>
</template>
      
<!-- <template slot="FOOT[dni]" slot-scope="scope">
      {{ trayecto_data.length }}
    </template> -->
 <template #bottom-row>
        <b-th rowspan="3">Totales:</b-th>
        <b-th rowspan="3">{{ trayecto_data.length }}</b-th>
        <b-th rowspan="3">{{ ea1tot }}</b-th>
        <b-th rowspan="3">{{ ea2tot }}</b-th>
        <b-th rowspan="3">{{ ea3tot }}</b-th>

        <b-th rowspan="3">{{ ca1tot }}</b-th>
        <b-th rowspan="3">{{ ca2tot }}</b-th>
        <b-th rowspan="3">{{ ca3tot }}</b-th>

        <b-th rowspan="3">{{ da1tot }}</b-th>
        <b-th rowspan="3">{{ da2tot }}</b-th>
        <b-th rowspan="3">{{ da3tot }}</b-th>

        <b-th rowspan="3">{{ pa1tot }}</b-th>
        <b-th rowspan="3">{{ pa2tot }}</b-th>
        <b-th rowspan="3">{{ pa3tot }}</b-th>
        <b-th rowspan="3">{{ psttot }}</b-th>
        <b-th class="pl-0 pr-0">
          <p class="text-center" style="margin-right:-20px"><b class="text-success">Aprobados: </b>{{ aprobados.length }}<br>
          <b class="text-warning">No aprobados: </b>{{ noAprobados.length }}</p>
        </b-th>
        <b-th rowspan="3">
          <p class="text-center">Inscriptos: {{trayecto_data.length}}<br>
          Bajas: {{ bajas.length }}<br>
          S/SA: {{ trayecto_data.length-aprobados.length-noAprobados.length-bajas.length }}</p>
        </b-th>
</template>


<!-- <template slot="bottom-row"
          slot-scope="data"
>
    <td v-for="(field, i) in data.fields">
         {{ i }}
    </td>
</template> -->
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
import { mapActions, mapState } from 'vuex'
export default {
  data(){
return{
  trayecto: '',
  sede: 0,
trayectos: ['Todos','TrendKids','TecnoKids','MakerJuniors','TeensMaker','TeamInn','HighMaker'
          /*{ value: 'Trend-kids', text: 'TrendKids' },
          { value: {sel:'Tecno-kids' , matricula: 15} , text: 'Tecnokids',  },
          { value: {sel:'Maker-Juniors', matricula: 35} , text: 'Maker-Juniors' },*/
        ],
      fields:[{key:'dni',sortable: true},'estudiante',
      {
        key:'field_rubrica_electronica_a1',
        tdClass: this.colores,
        sortable:true
      },
      {
        key:'field_rubrica_electronica_a2',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_electronica_a3',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_contruccion_a1',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_contruccion_a2',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_contruccion_a3',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_diseno_a1',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_diseno_a2',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_diseno_a3',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_programacion_a1',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_programacion_a2',
        tdClass: this.colores
      },
      {
        key:'field_rubrica_programacion_a3',
        tdClass: this.colores
      },
      'PST','situacion','adicional'],
      dato_sede:[]
}
},
/*watch: {
  'rubricas_sede': function() {
    console.log(this.rubricas_sede)
  }
},*/
computed:{
  ...mapState(['rubricas_sede','cargando','sedes']),
  trayecto_data(){
    if(this.sede.id != undefined && !this.cargando){
      console.log('id de sede');
      if(this.rubricas_sede[this.sede.sede] != undefined){
          this.dato_sede = this.rubricas_sede[this.sede.sede];
          console.log('se creo la sede');
      if(this.dato_sede.length > 0){
          let campo = this.trayecto;
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
      }else{
        this.$nextTick(console.log('siguiente tick data: ',this.rubricas_sede[this.sede.sede]))
        return [];
      }
      }else{
    return [];
  }
  },
  //calculo de promedios
  ea1tot(){
    if(this.dato_sede.length > 0){
    let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_electronica_a1) > 0).map(dato => parseInt(dato.field_rubrica_electronica_a1));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_electronica_a1) > 0).length;
        return promedio.toFixed(1);
      }
      return
  }else{
    return 0
  }
  },
    ea2tot(){
    if(this.dato_sede.length > 0){
    let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_electronica_a2) > 0).map(dato => parseInt(dato.field_rubrica_electronica_a2));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_electronica_a2) > 0).length;
        return promedio.toFixed(1);
      }
      return
  }else{
    return 0
  }
  },
    ea3tot(){
    if(this.dato_sede.length > 0){
    let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_electronica_a3) > 0).map(dato => parseInt(dato.field_rubrica_electronica_a3));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_electronica_a3) > 0).length;
        return promedio.toFixed(1);
      }
      return
  }else{
    return 0
  }
  },
  //-- Construccion promedios --//
  ca1tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_contruccion_a1) > 0).map(dato => parseInt(dato.field_rubrica_contruccion_a1));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_contruccion_a1) > 0).length;
        return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  ca2tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_contruccion_a2) > 0).map(dato => parseInt(dato.field_rubrica_contruccion_a2));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_contruccion_a2) > 0).length;
        return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  ca3tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_contruccion_a3) > 0).map(dato => parseInt(dato.field_rubrica_contruccion_a3));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_contruccion_a3) > 0).length;
        return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  //-- Disenno --//
  da1tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_diseno_a1) > 0).map(dato => parseInt(dato.field_rubrica_diseno_a1));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_diseno_a1) > 0).length;
        return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  da2tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_diseno_a2) > 0).map(dato => parseInt(dato.field_rubrica_diseno_a2));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_diseno_a2) > 0).length;
        return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  da3tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_diseno_a3) > 0).map(dato => parseInt(dato.field_rubrica_diseno_a3));
      if(resultado.length>0){
        resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
        let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_diseno_a3) > 0).length;
        return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  //-- Programacion --//
  pa1tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_programacion_a1) > 0).map(dato => parseInt(dato.field_rubrica_programacion_a1));
      if(resultado.length>0){
      resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
      let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_programacion_a1) > 0).length;
      return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  pa2tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_programacion_a2) > 0).map(dato => parseInt(dato.field_rubrica_programacion_a2));
      if(resultado.length>0){
      resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
      let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_programacion_a2) > 0).length;
      return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  pa3tot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_programacion_a3) > 0).map(dato => parseInt(dato.field_rubrica_programacion_a3));
      if(resultado.length>0){
      resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
      let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_programacion_a3) > 0).length;
      return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  //--PST--//
  psttot(){
      if(this.dato_sede.length > 0){
      let resultado = this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_promedio_php) > 0).map(dato => parseInt(dato.field_rubrica_promedio_php));
      if(resultado.length>0){
      resultado = resultado.reduce((previousValue, currentValue) => previousValue + currentValue);
      let promedio = resultado/this.trayecto_data.filter(dato => parseInt(dato.field_rubrica_promedio_php) > 0).length;
      return promedio.toFixed(1);
      }
      return
    }else{
      return 0
    }
  },
  aprobados(){
    if(this.dato_sede.length > 0){
      return this.trayecto_data.filter((estud)=> {return estud.estado == "Aprobado"});
    }else{
      return [];
  } 
  },
    noAprobados(){
    if(this.dato_sede.length > 0){
      return this.trayecto_data.filter((estud)=> {return estud.estado == "No Aprobado"});
    }else{
      return [];
  } 
  },
   bajas(){
    if(this.dato_sede.length > 0){
      return this.trayecto_data.filter((estud)=> {return estud.estado == "Baja"});
    }else{
      return [];
  } 
  }
},
methods:{
  ...mapActions([
    'obtener_rubricas'
  ]),
colores: ((value, key, item) => {
            //console.log(item,key,value);
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
/*async getSede(sede) {
//console.log(sede)
this.isBusy = true;
try{
      //la URL base ya esta cargada en main.js (axios.baseURL)
      let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id);
      this.dato_sede = response.data;
      console.log(response.data);
      this.isBusy = false;

  }catch(error){
      console.log(error);
      this.isBusy = false;
  }
  }*/
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