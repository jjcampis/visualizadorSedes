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
<button @click="actu">click</button>
<apexchart :key="createdH" ref="barritash" v-show="showchartsH && !cargando" class="apex-moco" :type="type" height="200" width="100%" :options="chartOptions" :series="vechoras" @dataPointSelection="get_H"></apexchart>
{{showchartsH}} {{cargando}}
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
      <b-tbody v-if="horarioGrouped != null && Object.entries(horarioGrouped).length > 0">
        <b-tr>
           <b-td :class="valign('Lunes')" style="min-width: 250.6px">
              <div v-if="horarioGrouped.hasOwnProperty('Lunes')">
                <span class="text-info" v-for="(dato, index) in horarioGrouped.Lunes" :key="'L'+index">
                    <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="center" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p>{{dato.hr_trayecto.slice(7)}}</p>
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
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="center" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p>{{dato.hr_trayecto.slice(7)}}</p>
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
                          <b-row no-gutters align-v="center" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p>{{dato.hr_trayecto.slice(7)}}</p>
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
                          <b-row no-gutters align-v="center" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p>{{dato.hr_trayecto.slice(7)}}</p>
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
                          <b-row no-gutters align-v="center" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p>{{dato.hr_trayecto.slice(7)}}</p>
                            </b-col>
                          </b-row>
                    </b-container>      
                  </span>
                </div>
              </b-td>
              <!-- sabado -->
              <b-td :class="valign('Sabado')" style="min-width: 250.6px">
                <div v-if="horarioGrouped.hasOwnProperty('Sábado')">
                  <span class="text-info" v-for="(dato, index) in horarioGrouped.Sábado" :key="'V'+index">
                   <b-container fluid class="max px-0">
                          <b-row no-gutters>
                            <b-col cols="8" class="text-white color1 py-0"><b>{{dato.hr_hora_inicio}} A {{dato.hr_hora_fin}}</b></b-col>
                            <b-col cols="4" class="text-white color2 py-0" :class="[dato.hr_cantidad_actual > 6 ? 'color2' : 'colorbad']"><b>{{dato.hr_cantidad_actual}}/<span class="cupo-max">{{dato.hr_cupo_maximo}}</span></b></b-col>
                          </b-row>
                          <b-row no-gutters align-v="center" class="border">
                            <b-col cols="12" class="px-0 py-1 min">
                              <p>{{dato.hr_trayecto.slice(7)}}</p>
                            </b-col>
                          </b-row>
                    </b-container>      
                  </span>
                </div>
              </b-td>
          
          
        </b-tr>
      </b-tbody>
      </b-table-simple>


</div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
data(){
    return{
        sede:'',
        type:"line",
        fields:[
          {key:'Lunes'},
          {key:'Martes'},
          {key:'Miercoles'},
          {key:'Jueves'},
          {key:'Viernes'},
        ],
        sortBy:"hr_trayecto",
      sortDesc:true,
      hsedes:{},//vector donde creo sedes con sus horarios
      showchartsH: false,
      createdH:0,
      creado:false,
// Graficos
chartOptions: {
            chart: {
              height: 'auto',
              width: '100%',
              stacked: false,
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [0]
            },
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            stroke: {
              width: [0, 2, 5],
              curve: 'smooth'
            },
            plotOptions: {
              bar: {
                columnWidth: '60%',
                horizontal: false
              }
            },
            legend: {
              position: 'top'
            },



            responsive: [{
              breakpoint: 580,
              options: {
                chart:{
                stacked: true,
                type:'bar',
                stackType: '100%',
                },
                plotOptions: {
                  bar: {
                    barHeight: '100%',
                    horizontal: true
                  }
                },
                yaxis: {
                  type: 'string'
                },
                xaxis: {
                  title: {
                    text: 'Horas',
                  },
                  min: 0
                },
                tooltip: {
                  shared: true,
                  position:'bottomLeft',
                  x: {
                    formatter: function (x) {
                      if (typeof x !== "undefined") {
                        return x.toFixed(0);
                      }
                      return x;
                    }
                  }
                },
                legend: {
                  position: "bottom"
                }
              }
            }],



            fill: {
              opacity: [0.85, 0.25, 1],
              gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
              }
            },
            //labels: ["25 de Mayo","Alba Posse","Almafuerte","Apóstoles","Aristóbulo del Valle","Azara","Bernardo de Irigoyen","Caá Yarí","Campo Grande","Campo Ramón","Campo Viera","Candelaria","Capioví","Cerro Azul","Cerro Corá","Colonia Alberdi","Colonia Aurora","Colonia Delicia","Colonía Victoria","Comandante Andresito","Concepción de la Sierra","Corpus","Dos de Mayo","El Alcazar","El Soberbio","Eldorado","Fachinal","Garuhape","Garupá","General Urquiza","Gobernador Roca","Guaraní","Jardín América","Leandro N. Alem","Loreto","Los helechos","Montecarlo","Oberá","Panambí","Posadas (En el Polo TIC)","Pozo Azul","Profundidad","Puerto Esperanza","Puerto Iguazú","Puerto Libertad","Puerto Piray","Puerto Rico 01","Puerto Rico 02","Ruiz de Montoya","Salto Encantado","San Ignacio","San Javier","San José","San Martín","San Pedro","San Vicente","Santa Ana","Santiago de Liniers","Santo Pipó"],
            labels: [],
            markers: {
              size: 0
            },
            xaxis: {
              type: 'string',
              tickPlacement: 'on',
              labels:{
                style:{
                        fontSize: '8.5px'
                      }
              }
            },
            yaxis: {
              title: {
                text: 'Grupos - Horarios',
              },
              min: 0
            },
            tooltip: {
              shared: true,
              position:'topRight',
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0);
                  }
                  return y;
                }
              }
            }
          }
// fin graficos

    }
},
created() {
      // sino no toma
      ///de esta manera asigno el valor de una computed al cargar la pagina
      this.$set(this.chartOptions.xaxis, 'categories', Object.values(this.sedes).map(x=>x.sede));
    },
mounted(){
this.obtener_horario()
// .then(this.actu())
},
activated: function() {
    if (this.creado) {
      console.log('de nuevo');
      //refresco el chart
      this.showchartsH = false;
      setTimeout(() => {
        this.showchartsH = true;
      }, 500);
    }
  },
  watch:{
    horario(newVal,oldVal){
      console.log("cambioHo");
      this.actu();
    }
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
            //return tray.hr_espaciomaker.toLowerCase().includes(this.sede.toLowerCase());
            return tray.hr_espaciomaker == this.sede;
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
    console.log(outObject);
    //return Object.entries(outObject);
    return outObject;
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
    },

      vechoras(){
      if(Object.entries(this.horario).length > 0 && !this.cargando){
      //Recorro con map las sedes y dentro (para cada sede hago un filtro de todos los horarios para cada sede)
      let inscripted =  this.sedes.map(x => this.hsedes[x.sede] = Object.values(this.horario).filter((tray) => {
            return tray.hr_espaciomaker == x.sede;
          }).length
          );
        //filtro los que no estan en ob1
      //console.log(obj2.filter(o2 => obj1.indexOf(o2) === 1));
      console.log(inscripted);


      if (this.$vuetify.breakpoint.xs) {
        console.log('es mobile');
        this.type = "bar";
        return [{'name':'Grupos-Horarios','data': inscripted}]  
      }else{
      //es desktop
      this.type = "bar";
      return [{'name':'Grupos-Horarios','type':'bar','data': inscripted}]
      
      }
    }else{
      return []
    }}

},
methods:{
  ...mapActions(['obtener_horario']),
  //funcion para alinear verticalmente segun el horario
  actu(){
    // :key="created" 
    setTimeout(() => {
        this.creado = true;
        this.createdH++
      }, 150),
    setTimeout(() => {this.showchartsH = true;},500),
    // window.dispatchEvent(new Event('resize'))
    this.$refs.barritash.refresh();
      
  },
  valign(dia){
    return "align-top";
    /*if(this.horarioGrouped.hasOwnProperty(dia)){
      var h = parseInt(this.horarioGrouped[dia][0].hr_hora_inicio.substring(0, 2));
     return (h>=14 ? "align-bottom" : "align-top")
    }*/
  },
  get_H(event, chartContext, config){
        console.log("click")
        console.log(this.sedes[config.dataPointIndex]);
        this.sede = this.sedes[config.dataPointIndex].sede;
    },

}
}
</script>

<style scoped>
.b-table-sticky-header {
    overflow-y: auto;
    max-height: 750px !important;
    min-height: 540px;
}
.max{
  max-height: 60px;
  min-height: 60px;
}
.min{
  min-height: 50px;
}
span.cupo-max {
    font-size: 70%;
}
.border{
  border: 1px solid #17a2b8 !important;
  max-height: 30px;
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
</style>