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
          :disabled="cargando"
        ></v-select>
        <v-select
          :items="sedes"
          item-text="sede"
          item-value="sede"
          label="Sede"
          v-model="sede"
          :disabled="cargando"
        ></v-select>
      </v-col>
      <!-- vacios -->
      <v-col
        class="d-flex"
        cols="12"
        md="6"
      >
        <div class="text-center">
            <span id="disabled-wrapper" class="d-inline-block" tabindex="0">
              <b-button :class="[vacios.length > 0 ? 'btn-outline-danger' : 'btn-outline-success']" style="pointer-events: none;" disabled>
                <v-icon v-if="vacios.length > 0" left color="#bd1919">
                  mdi-alert
                </v-icon>
                <v-icon v-if="vacios.length == 0" left color="success">
                  mdi-checkbox-marked-circle-outline
                </v-icon>
                
                 No cargados: {{vacios.length}}
              </b-button>
            </span>
          <b-tooltip target="disabled-wrapper" variant="danger">
            <div v-if="vacios.length>0" v-for="x in vacios">
              <p style="border-bottom:1px solid #FFF">
                {{x}}
              </p>
            </div>
          </b-tooltip>
        </div>
      </v-col>
  </v-row>
  <!-- thead-tr-class="d-none" -->
  <b-table sticky-header head-variant="dark" 
      :fields="fields"
      :items="horarioGrouped"
      :busy="cargando"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc" class="my-0" outlined>
      <!-- <template #thead-top>
            <b-tr>
                <b-th rowspan="3">Lunes</b-th>
                <b-th rowspan="3">Martes</b-th>
                <b-th rowspan="3">Miércoles</b-th>
                <b-th rowspan="3">Jueves</b-th>
                <b-th rowspan="3">Viernes</b-th>
                <b-th rowspan="3">Sábado</b-th>
            </b-tr>
      </template> -->
      <!-- body -->
      <template #cell(Lunes)="data">
        <!-- <span v-if="data.item[0] == 'Lunes'" class="text-info">
          <p>De <span class="text-success">{{ data.item[1][0].hr_hora_inicio }}</span> A <span class="text-success">{{ data.item[1][0].hr_hora_fin }}</span></p>
          {{data.item[1]}}
        </span> -->
        <span v-if="data.item[0] == 'Lunes'" class="text-info" v-for="(dato, index) in data.item[1]" :key="'L'+index">
          <p>{{dato.hr_trayecto}}</p>
          <p>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</p>
          <p>Cupo {{dato.hr_cantidad_actual}} De {{dato.hr_cupo_maximo}}</p>       
        </span>
      </template>
      <template #cell(Martes)="data">
        <span v-if="data.item[0] == 'Martes'" class="text-info" v-for="(dato, index) in data.item[1]" :key="'M'+index">
          <p>{{dato.hr_trayecto}}</p>
          <p>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</p>
          <p>Cupo {{dato.hr_cantidad_actual}} De {{dato.hr_cupo_maximo}}</p>       
        </span>
      </template>
      <template #cell(Miercoles)="data">
        <span v-if="data.item[0] == 'Miércoles'" class="text-info" v-for="(dato, index) in data.item[1]" :key="'X'+index">
          <p>{{dato.hr_trayecto}}</p>
          <p>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</p>
          <p>Cupo {{dato.hr_cantidad_actual}} De {{dato.hr_cupo_maximo}}</p>       
        </span>
      </template>
      <template #cell(Jueves)="data">
        <span v-if="data.item[0] == 'Jueves'" class="text-info" v-for="(dato, index) in data.item[1]" :key="'J'+index">
          <p>{{dato.hr_trayecto}}</p>
          <p>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</p>
          <p>Cupo {{dato.hr_cantidad_actual}} De {{dato.hr_cupo_maximo}}</p>       
        </span>
      </template>
      <template #cell(Viernes)="data">
        <span v-if="data.item[0] == 'Viernes'" class="text-info" v-for="(dato, index) in data.item[1]" :key="'V'+index">
          <p>{{dato.hr_trayecto}}</p>
          <p>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</p>
          <p>Cupo {{dato.hr_cantidad_actual}} De {{dato.hr_cupo_maximo}}</p>       
        </span>
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
import { mapActions,mapState } from 'vuex'
export default {
data(){
    return{
        sede:'',
        fields:[
          {key:'Lunes'},
          {key:'Martes'},
          {key:'Miercoles'},
          {key:'Jueves'},
          {key:'Viernes'},
        ],
        sortBy:"hr_trayecto",
      sortDesc:true
    }
},
mounted(){
this.obtener_horario();
},
computed:{
    ...mapState(['horario','cargando','sedes']),
    horarioF(){
        //console.log(Object.entries(this.horario).filter(x=>x[1].hr_espaciomaker == this.sede));
        console.log(Object.entries(this.horario).length > 0);
        console.log(this.cargando);
        if(Object.entries(this.horario).length > 0 && !this.cargando){
            //return Object.entries(this.horario).filter(x=>x[1].hr_espaciomaker == this.sede);
        return Object.values(this.horario).filter((tray) => {
            return tray.hr_espaciomaker.toLowerCase().includes(this.sede.toLowerCase());
            //return tray.hr_espaciomaker == this.sede;
          })
        
        }else{
            return ['no habia'];
        }
    },
    horarioGrouped(){
      //https://stackoverflow.com/questions/40774697/how-can-i-group-an-array-of-objects-by-key
      if (this.horarioF[0] != 'no habia'){
      let outObject = this.horarioF.reduce(function(a, e) {
  // GROUP BY estimated key (estKey), well, may be a just plain key
  // a -- Accumulator result object
  // e -- sequentally checked Element, the Element that is tested just at this itaration

  // new grouping name may be calculated, but must be based on real value of real field
    let estKey = (e['hr_dia']); 

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
      return a;
    }, {});
    return Object.entries(outObject);
      }
    },
    vacios(){
      if(Object.entries(this.horario).length > 0 && !this.cargando){
        //hago 2 arreglos solo con los municipios
        let ob1 = Object.values(this.horario).map(i => i.hr_espaciomaker);
        let ob2 =  this.sedes.map(x=>x.sede);
        //filtro los que no estan en ob1
        return ob2.filter(o2 => ob1.indexOf(o2) === -1);
      }else{
        return [];
      }
    }

},
methods:{
  ...mapActions(['obtener_horario']),
}
}
</script>

<style>
.b-table-sticky-header {
    overflow-y: auto;
    max-height: 750px;
    height: 80vh;
}
</style>