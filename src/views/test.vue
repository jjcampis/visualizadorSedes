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
</div>
</template>


<script>
  export default {
    data() {
      return {
        rango: 0,
        muestra:false,
        trayecto: null,
        trayectos: [
          { value: null, text: 'Selecciona Trayecto' },
          { value: {sel:'Trend-kids' , matricula: 25} , text: 'Trend-Kids' },
          { value: {sel:'Tecno-kids' , matricula: 15} , text: 'Tecno-kids',  },
          { value: {sel:'Maker-Juniors', matricula: 35} , text: 'Maker-Juniors' },
        ],
        sede: null,
        sedes:[
          { value: null, text: 'Selecciona Sede' },
          { value: {sel: 'Colonia Aurora', matricula: 160} , text: 'Colonia Aurora'},
          { value: {sel: 'Candelaria', matricula: 190} , text: 'Candelaria' }
        ]
      }
    }
  }
</script>