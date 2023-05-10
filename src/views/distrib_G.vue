<template>
<div>
  <v-row align="center">
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
<apexchart :key="createdH" ref="barritash" v-show="showchartsH && !cargando" class="apex-moco" :type="type" height="200" width="100%" :options="chartOptions" :series="vechoras" @animationEnd="testb(0,2)" @dataPointSelection="get_H"></apexchart>
  <!-- thead-tr-class="d-none" -->
  <!-- <b-table sticky-header head-variant="dark" 
      :fields="fields"
      :items="horarioGrouped"
      :busy="cargando"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc" class="my-0" outlined> -->
      <!-- <b-table sticky-header head-variant="dark" :busy="cargando" class="my-0" outlined> -->

        <!-- <button @click="testbb">clickedamo</button> -->
      <v-row>
        <v-col class="text-left" cols="12" md="12">
          <b>{{sede}} </b>
          <b-button v-b-toggle.collapse-1 variant="outline-info"> 
            <span v-if="hsVisible">
              <v-icon>
                  mdi-chevron-up
                </v-icon>
            </span>
            <span v-else>
              <v-icon>
                  mdi-chevron-down
                </v-icon>  
            </span>
            </b-button>
        </v-col>
      </v-row>
      <b-collapse v-model="hsVisible" visible id="collapse-1" class="mt-2">
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
                              <p class="mb-0"><b class="dash-b"><span class="text-white color1 py-0">AU{{dato.hr_aula.slice(-1)}}</span> {{dato.hr_trayecto.slice(7)}}</b></p>
                              <!-- <span v-for="(facilitador, index) in dato.hr_facilitador.split(',')" :key="'hL'+index"> -->
                                
                                <span v-if="dato.hr_facilitador_export.length == 0">
                                <span v-for="(facilitadorn, index) in dato.hr_facilitador.split(',')" :key="'hhL'+index">
                                  <p class="nomfac my-0 text-dark">{{facilitadorn}}</p>
                                </span>
                              </span>

                              <span v-else v-for="(facilitador, index) in dato.hr_facilitador_export" :key="'hL'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador.ps_apellido}} {{facilitador.ps_nombre}} 
                                <span v-for="(perfil,index) in facilitador.ps_perfil" :key="'pL'+index">
                                      <v-tooltip  v-if="perfil == 'Pedagógico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="redmaker-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-school
                                            </v-icon>
                                          </template>
                                          <span>Pedagógico</span>
                                        </v-tooltip>
                                      
                                      <v-tooltip  v-if="perfil == 'Programador'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="programador-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-emoticon-cool-outline
                                            </v-icon>
                                          </template>
                                          <span>Programador</span>
                                        </v-tooltip>
                                        <v-tooltip  v-if="perfil == 'Técnico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="tecnico-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-account-hard-hat
                                            </v-icon>
                                          </template>
                                          <span>Técnico</span>
                                        </v-tooltip>
                                  </span>
                                </p>
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
                              <p class="mb-0"><b class="dash-b"><span class="text-white color1 py-0">AU{{dato.hr_aula.slice(-1)}}</span>{{dato.hr_trayecto.slice(7)}}</b></p>
                              
                               <span v-if="dato.hr_facilitador_export.length == 0">
                                <span v-for="(facilitadorn, index) in dato.hr_facilitador.split(',')" :key="'hhM'+index">
                                  <p class="nomfac my-0 text-dark">{{facilitadorn}}</p>
                                </span>
                              </span>

                              <span v-else v-for="(facilitador, index) in dato.hr_facilitador_export" :key="'hM'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador.ps_apellido}} {{facilitador.ps_nombre}} 
                                <span v-for="(perfil,index) in facilitador.ps_perfil" :key="'pM'+index">
                                      <v-tooltip  v-if="perfil == 'Pedagógico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="redmaker-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-school
                                            </v-icon>
                                          </template>
                                          <span>Pedagógico</span>
                                        </v-tooltip>
                                      
                                      <v-tooltip  v-if="perfil == 'Programador'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="programador-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-emoticon-cool-outline
                                            </v-icon>
                                          </template>
                                          <span>Programador</span>
                                        </v-tooltip>
                                        <v-tooltip  v-if="perfil == 'Técnico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="tecnico-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-account-hard-hat
                                            </v-icon>
                                          </template>
                                          <span>Técnico</span>
                                        </v-tooltip>
                                  </span>
                                </p>
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
                              <p class="mb-0"><b class="dash-b"><span class="text-white color1 py-0">AU{{dato.hr_aula.slice(-1)}}</span>{{dato.hr_trayecto.slice(7)}}</b></p>
                              
                               <span v-if="dato.hr_facilitador_export.length == 0">
                                <span v-for="(facilitadorn, index) in dato.hr_facilitador.split(',')" :key="'hhX'+index">
                                  <p class="nomfac my-0 text-dark">{{facilitadorn}}</p>
                                </span>
                              </span>

                              <span v-else v-for="(facilitador, index) in dato.hr_facilitador_export" :key="'hX'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador.ps_apellido}} {{facilitador.ps_nombre}} 
                                <span v-for="(perfil,index) in facilitador.ps_perfil" :key="'pX'+index">
                                      <v-tooltip  v-if="perfil == 'Pedagógico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="redmaker-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-school
                                            </v-icon>
                                          </template>
                                          <span>Pedagógico</span>
                                        </v-tooltip>
                                      
                                      <v-tooltip  v-if="perfil == 'Programador'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="programador-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-emoticon-cool-outline
                                            </v-icon>
                                          </template>
                                          <span>Programador</span>
                                        </v-tooltip>
                                        <v-tooltip  v-if="perfil == 'Técnico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="tecnico-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-account-hard-hat
                                            </v-icon>
                                          </template>
                                          <span>Técnico</span>
                                        </v-tooltip>
                                  </span>
                                </p>
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
                              <p class="mb-0"><b class="dash-b"><span class="text-white color1 py-0">AU{{dato.hr_aula.slice(-1)}}</span>{{dato.hr_trayecto.slice(7)}}</b></p>
                              
                               <span v-if="dato.hr_facilitador_export.length == 0">
                                <span v-for="(facilitadorn, index) in dato.hr_facilitador.split(',')" :key="'hhJ'+index">
                                  <p class="nomfac my-0 text-dark">{{facilitadorn}}</p>
                                </span>
                              </span>

                              <span v-else v-for="(facilitador, index) in dato.hr_facilitador_export" :key="'hJ'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador.ps_apellido}} {{facilitador.ps_nombre}} 
                                <span v-for="(perfil,index) in facilitador.ps_perfil" :key="'pJ'+index">
                                      <v-tooltip  v-if="perfil == 'Pedagógico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="redmaker-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-school
                                            </v-icon>
                                          </template>
                                          <span>Pedagógico</span>
                                        </v-tooltip>
                                      
                                      <v-tooltip  v-if="perfil == 'Programador'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="programador-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-emoticon-cool-outline
                                            </v-icon>
                                          </template>
                                          <span>Programador</span>
                                        </v-tooltip>
                                        <v-tooltip  v-if="perfil == 'Técnico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="tecnico-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-account-hard-hat
                                            </v-icon>
                                          </template>
                                          <span>Técnico</span>
                                        </v-tooltip>
                                  </span>
                                </p>
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
                              <p class="mb-0"><b class="dash-b"><span class="text-white color1 py-0">AU{{dato.hr_aula.slice(-1)}}</span>{{dato.hr_trayecto.slice(7)}}</b></p>
                              
                               <span v-if="dato.hr_facilitador_export.length == 0">
                                <span v-for="(facilitadorn, index) in dato.hr_facilitador.split(',')" :key="'hhV'+index">
                                  <p class="nomfac my-0 text-dark">{{facilitadorn}}</p>
                                </span>
                              </span>

                              <span v-else v-for="(facilitador, index) in dato.hr_facilitador_export" :key="'hV'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador.ps_apellido}} {{facilitador.ps_nombre}} 
                                <span v-for="(perfil,index) in facilitador.ps_perfil" :key="'pV'+index">
                                      <v-tooltip  v-if="perfil == 'Pedagógico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="redmaker-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-school
                                            </v-icon>
                                          </template>
                                          <span>Pedagógico</span>
                                        </v-tooltip>
                                      
                                      <v-tooltip  v-if="perfil == 'Programador'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="programador-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-emoticon-cool-outline
                                            </v-icon>
                                          </template>
                                          <span>Programador</span>
                                        </v-tooltip>
                                        <v-tooltip  v-if="perfil == 'Técnico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="tecnico-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-account-hard-hat
                                            </v-icon>
                                          </template>
                                          <span>Técnico</span>
                                        </v-tooltip>
                                  </span>
                                </p>
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
                              <p class="mb-0"><b class="dash-b"><span class="text-white color1 py-0">AU{{dato.hr_aula.slice(-1)}}</span>{{dato.hr_trayecto.slice(7)}}</b></p>
                              
                               <span v-if="dato.hr_facilitador_export.length == 0">
                                <span v-for="(facilitadorn, index) in dato.hr_facilitador.split(',')" :key="'hhS'+index">
                                  <p class="nomfac my-0 text-dark">{{facilitadorn}}</p>
                                </span>
                              </span>

                              <span v-else v-for="(facilitador, index) in dato.hr_facilitador_export" :key="'hS'+index">
                              <p class="nomfac my-0 text-dark">{{facilitador.ps_apellido}} {{facilitador.ps_nombre}} 
                                <span v-for="(perfil,index) in facilitador.ps_perfil" :key="'pS'+index">
                                      <v-tooltip  v-if="perfil == 'Pedagógico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="redmaker-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-school
                                            </v-icon>
                                          </template>
                                          <span>Pedagógico</span>
                                        </v-tooltip>
                                      
                                      <v-tooltip  v-if="perfil == 'Programador'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="programador-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-emoticon-cool-outline
                                            </v-icon>
                                          </template>
                                          <span>Programador</span>
                                        </v-tooltip>
                                        <v-tooltip  v-if="perfil == 'Técnico'" bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                              class="tecnico-icon"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              mdi-account-hard-hat
                                            </v-icon>
                                          </template>
                                          <span>Técnico</span>
                                        </v-tooltip>
                                  </span>
                                </p>
                              </span>

                            </b-col>
                          </b-row>
                    </b-container>      
                  </span>
                </div>
              </b-td>
          
          
        </b-tr>
      </b-tbody>
    </b-table-simple>
      </b-collapse>
</div>
</template>

<script>

import hmix from '../mixins/horarios'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      hsVisible:true
    }
  },
  mounted(){
    //alert("this.chartOptions.chart");
    console.log("this.chartOptions.chart");
    this.$set(this.chartOptions.chart, 'id', 2);
    this.actu2();
  },
  computed:{
        ...mapState(['selectedSede']),
        },
        watch:{
          selectedSede(newVal,oldVal){
            this.sede = newVal.sede;
            // console.log("Primer",newVal,oldVal);
          let a = this.chartOptions.xaxis.categories;
          //console.log("barritas",this.$refs.barritash.$el);
          var selected = a.findIndex(a => a === newVal.sede);
          // console.log("barras",selected);
          //this.$refs.barritash.toggleDataPointSelection(0,selected)
          if (newVal.sede != oldVal.sede) {
            this.testbb(selected);
          }
          //console.log(this.$refs.barritash.toggleDataPointSelection);


          //this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[selected].setAttribute("fill","#0f0");
            //console.log("seleccionado",this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[selected]);
          
          /*this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].foreach((box, index) => {
            box.setAttribute("selected", "false");
          });*/
          
          //console.log("arraysito",this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0]);
          
          /*this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].pop().foreach((box, index) => {
            box.setAttribute("selected", "true");
          });*/
                    //this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[selected].setAttribute("selected","true");
          



          /*
          if (oldVal == "Todo") {
            console.log("lalala");
            // alert(this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[selected].getAttribute("selected"));
            this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[selected].setAttribute("selected",true);

            //this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[selected].setAttribute("selected","true");
          }else{
            let olds = a.findIndex(a => a === oldVal.sede);
            this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[olds].setAttribute("selected","false");
            this.$refs.barritash.$el.children[0].children[0].children[0].children[4].children[0].children[selected].setAttribute("selected","true");
          }
          */

        }
        },
methods:{
  testbb(selected){
    this.$refs.barritash.toggleDataPointSelection(0,selected);
    //alert(selected);
  },
  actu2(){
        // :key="created" 
        setTimeout(() => {
            this.creado = true;
            this.createdH++
          }, 1500),
        setTimeout(() => {this.showchartsH = true;},500)
        // window.dispatchEvent(new Event('resize'))
        //this.$refs.barritash.refresh();
      }
},
created() {
          // sino no toma
          ///de esta manera asigno el valor de una computed al cargar la pagina
    //this.actu2();
    },
  mixins:[hmix]
}
</script>

<style scoped>
.b-table-sticky-header {
    overflow-y: hidden;
    max-height: 100% !important;
    min-height: 540px;
}
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
  min-height: 16px;
  font-size: 12px;
}
.dash-b{
  color: #156673
}
</style>