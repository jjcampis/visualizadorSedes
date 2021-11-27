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
<b-table-simple hover small caption-top responsive>
    <colgroup><col><col></colgroup>
    <colgroup><col><col><col></colgroup>
    <colgroup><col><col></colgroup>
    <b-thead class="table-dark">
      <b-tr>
        <b-th rowspan="2">Ejes</b-th>
        <b-th rowspan="2">Recursos Utilizados</b-th>
        <b-th rowspan="2">Objetivos Código ODS</b-th>
        <b-th rowspan="2">% Nivel Ejecutado</b-th>
        <b-th colspan="3">Nivel desarrollo de proyectos</b-th>
        <b-th rowspan="2">Grados de Aprendizaje y Capacidades</b-th>
        <b-th rowspan="2">Parcial Saberes por Eje</b-th>
        <b-th colspan="3">% Totales promedio por Trayecto PST</b-th>
      </b-tr>
      <b-tr>
        <b-th>Básico</b-th>
        <b-th>Intermedio</b-th>
        <b-th>Avanzado</b-th>
        <b-th>A1</b-th>
        <b-th>A2</b-th>
        <b-th>A3</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
<b-tr>
<b-th rowspan="1">Electrónica</b-th>
<b-th><input type="text"></b-th>
<b-th><b-form-input></b-form-input></b-th>
<b-th><b-form-input v-model="rango" type="range" min="0" max="100"></b-form-input>{{rango}}</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th class="text-center">   
<b-tr>
    <b-th>A1</b-th>
   </b-tr>
  <b-tr>
    <b-th>A2</b-th>
  </b-tr>
  <b-tr>
    <b-th>A3</b-th>
  </b-tr>
</b-th>
<b-th>
      <b-tr>
    <b-th>50</b-th>
   </b-tr>
  <b-tr>
    <b-th>40</b-th>
  </b-tr>
  <b-tr>
    <b-th>30</b-th>
  </b-tr>
</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>80%</b-th>
</b-tr>
<b-tr>
<b-th>Construcción</b-th>
<b-th>Gamificación</b-th>
<b-th>Bien</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>80%</b-th>
</b-tr>
<b-tr>
<b-th>Diseño</b-th>
<b-th>Gamificación</b-th>
<b-th>Bien</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>80%</b-th>
</b-tr>
<b-tr>
<b-th>Programación</b-th>
<b-th>Gamificación</b-th>
<b-th>Bien</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>50%</b-th>
<b-th>80%</b-th>
</b-tr>
           <b-tr>
        <b-th class="text-right">Utrecht</b-th>
        <b-td>80</b-td>
        <b-td variant="danger">12</b-td>
        <b-td>43</b-td>
        <b-td>36</b-td>
        <b-td variant="warning">19</b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr>
        <b-td colspan="12" variant="secondary" class="text-right">
          Total Rows: <b>5</b>
        </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>


</div>
</template>


<script>
  export default {
    data() {
      return {
        rango: 0,
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