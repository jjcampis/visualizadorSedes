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
            <div v-if="vacios.length>0">
              <span v-for="(x,index) in vacios" :key="index">
                <p style="border-bottom:1px solid #FFF">
                  {{x}}
                </p>
              </span>
            </div>
          </b-tooltip>
        </div>
      </v-col>
  </v-row>

<!-- loading -->
<v-row v-if="cargando" align="center">
      <v-col
        md="6"
        offset-md="3"
      >
      <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Cargando...</strong>
              </div>
      </v-col>
</v-row>
<!-- end loading -->
<!-- <button @click="actu">click</button> -->
<apexchart :key="createdH" ref="barritash" v-show="showchartsH && !cargando" class="apex-moco" :type="type" height="200" width="100%" :options="chartOptions" :series="vechoras" @animationEnd="testb(0,2)" @dataPointSelection="get_Hb"></apexchart>
  <!-- thead-tr-class="d-none" -->
  <!-- <b-table sticky-header head-variant="dark" 
      :fields="fields"
      :items="horarioGrouped"
      :busy="cargando"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc" class="my-0" outlined> -->
      <!-- <b-table sticky-header head-variant="dark" :busy="cargando" class="my-0" outlined> -->
      <b-table-simple sticky-header striped small responsive>
      <b-thead head-variant="dark">
            <b-tr>
                <b-th rowspan="3">Lunes</b-th>
                <b-th rowspan="3">Martes</b-th>
                <b-th rowspan="3">Miércoles</b-th>
                <b-th rowspan="3">Jueves</b-th>
                <b-th rowspan="3">Viernes</b-th>
                <b-th rowspan="3">Sábado</b-th>
            </b-tr>
      </b-thead>
      <!-- body -->
      <!-- <b-tbody v-if="cargando">
        <b-tr>
          <b-td colspan="5" class="fill-height">
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Cargando...</strong>
              </div>
            </b-td>
          </b-tr>
      </b-tbody> -->
      <b-tbody v-if="horarioGrouped != null && Object.entries(horarioGrouped).length > 0">
        <b-tr>
           <b-td :class="valign('Lunes')" style="min-width: 250.6px">
              <div v-if="horarioGrouped.hasOwnProperty('Lunes')">
                <span class="text-info" v-for="(dato, index) in horarioGrouped.Lunes" :key="'L'+index">
                    <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b><small> [{{dato.hr_carga_horaria}}]</small></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="baseline" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p class="mb-1">{{dato.hr_trayecto.slice(7)}}</p>
                              <span v-for="(facilitador, index) in dato.hr_facilitador.split(',')" :key="'hL'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador}}</p>
                              </span>

                            </b-col>
                          </b-row>
                    </b-container>
                </span>
              </div>
           </b-td>
            <!-- Martes -->
            <b-td :class="valign('Martes')" style="min-width: 250.6px">
              <div v-if="horarioGrouped.hasOwnProperty('Martes')">
                <span class="text-info" v-for="(dato, index) in horarioGrouped.Martes" :key="'M'+index">
                    <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b><small> [{{dato.hr_carga_horaria}}]</small></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="baseline" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p class="mb-1">{{dato.hr_trayecto.slice(7)}}</p>
                              <span v-for="(facilitador, index) in dato.hr_facilitador.split(',')" :key="'hM'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador}}</p>
                              </span>
                            </b-col>
                          </b-row>
                    </b-container>
                </span>
              </div>
            </b-td>
            <!-- Miercoles -->
             <b-td :class="valign('Miércoles')" style="min-width: 250.6px">
                <div v-if="horarioGrouped.hasOwnProperty('Miércoles')">
                  <span class="text-info" v-for="(dato, index) in horarioGrouped.Miércoles" :key="'X'+index">
                   <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="baseline" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p class="mb-1">{{dato.hr_trayecto.slice(7)}}</p>
                              <span v-for="(facilitador, index) in dato.hr_facilitador.split(',')" :key="'hX'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador}}</p>
                              </span>
                            </b-col>
                          </b-row>
                    </b-container>
                  </span>
                </div>
              </b-td>
              <!-- Jueves -->
              <b-td :class="valign('Jueves')" style="min-width: 250.6px">
                <div v-if="horarioGrouped.hasOwnProperty('Jueves')">
                  <span class="text-info" v-for="(dato, index) in horarioGrouped.Jueves" :key="'J'+index">
                    <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="baseline" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p class="mb-1">{{dato.hr_trayecto.slice(7)}}</p>
                              <span v-for="(facilitador, index) in dato.hr_facilitador.split(',')" :key="'hJ'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador}}</p>
                              </span>
                            </b-col>
                          </b-row>
                    </b-container>    
                  </span>
                </div>
              </b-td>
              <!-- Viernes -->
              <b-td :class="valign('Viernes')" style="min-width: 250.6px">
                <div v-if="horarioGrouped.hasOwnProperty('Viernes')">
                  <span class="text-info" v-for="(dato, index) in horarioGrouped.Viernes" :key="'V'+index">
                   <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="baseline" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p class="mb-1">{{dato.hr_trayecto.slice(7)}}</p>
                              <span v-for="(facilitador, index) in dato.hr_facilitador.split(',')" :key="'hV'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador}}</p>
                              </span>
                            </b-col>
                          </b-row>
                    </b-container>      
                  </span>
                </div>
              </b-td>
              <!-- sabado -->
              <b-td :class="valign('Sabado')" style="min-width: 250.6px">
                <div v-if="horarioGrouped.hasOwnProperty('Sábado')">
                  <span class="text-info" v-for="(dato, index) in horarioGrouped.Sábado" :key="'S'+index">
                   <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="baseline" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p class="mb-1">{{dato.hr_trayecto.slice(7)}}</p>
                              <span v-for="(facilitador, index) in dato.hr_facilitador.split(',')" :key="'hS'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador}}</p>
                              </span>
                            </b-col>
                          </b-row>
                    </b-container>      
                  </span>
                </div>
              </b-td>
          
          
        </b-tr>
      </b-tbody>
      <!--<template #cell(Lunes)="data">
        <span v-if="data.item[0] == 'Lunes'" class="text-info">
          <p>De <span class="text-success">{{ data.item[1][0].hr_hora_inicio }}</span> A <span class="text-success">{{ data.item[1][0].hr_hora_fin }}</span></p>
          {{data.item[1]}}
        </span> -->
        <!-- <span v-if="data.item[0] == 'Lunes'" class="text-info" v-for="(dato, index) in data.item[1]" :key="'L'+index">
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
      </template> -->
      </b-table-simple>


</div>
</template>

<script>

import hmix from '../mixins/horarios'
import store from '@/store';

export default {

  mixins:[hmix],
  methods:{
    get_Hb(event, chartContext, config){
            console.log("click")
            console.log(this.sedes[config.dataPointIndex]);
            this.sede = this.sedes[config.dataPointIndex].sede;
             let sede = this.sede;
             store.commit('SET_selectedSede',{sede});
        },
  },
  mounted(){
    setTimeout(
      ()=>{this.actu()},1500);
    },
}
</script>

<style scoped>
.b-table-sticky-header {
    overflow-y: auto;
    max-height: 750px !important;
    min-height: 540px;
    /*height: 46vh;*/
}



/* 
.text-info p {
    margin: auto;
}
.text-info p:nth-child(1) {
font-weight: bold;
    color: #ffffff;
}

.text-info p:nth-child(3) {
    font-weight: bold;
}

td span.text-info {
    margin: -1px 0px;
    display: block;
    border: 1px solid;
    padding: 10px 0px;
}

span.enc-row {
    display: flex;
    background: #156673;
    margin-bottom: 10px;
}

.enc-row p:nth-child(2) {
    background: #17a2b8;
    color: #fff;
    padding: 0px 5px;
    margin: 0px;
    font-weight: bold;
} */
.max{
  max-height: 140px;
  min-height: 140px;
}
.min{
  min-height: 50px;
}
span.cupo-max {
    font-size: 70%;
}
.border{
  border: 1px solid #17a2b8 !important;
  min-height: 110px;
}
.color1{
background: #156673;
}
.color2{
background: #17a2b8;
}
.colorbad{
  background: #ff7007;
}
small{
  color:#FFF;
  font-weight: bolder
}
.nomfac{
  min-height: 24px;
  font-size: 12px;
}
</style>