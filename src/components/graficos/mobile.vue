<template>
    <div>
      <v-row>
            <v-col cols="12" md="12">
                <v-card elevation="3" class="h-100" style="padding-bottom: 25px;">
                    <div ref="chart" class="chart"></div>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0, 0.5, 1.0]
            }
          }" elevation="3" class="h-100" style="padding-bottom: 25px;">
                     <apexchart ref="piesito" type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
                </v-card>
            </v-col>
        </v-row>
      <v-row>
        <v-col>
          <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0
        }"
        min-height="200"
      >
          <apexchart ref="rubriquita" :options="stackop2" :series="veccomp"></apexchart>
          </v-lazy>
        </v-col>
        </v-row>
        
    </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  props:[
    'vecins'
  ],
   activated: function() {
    console.log('de nuevo rubriquita');
    if (this.$refs.rubriquita) {
            // HTML element exists
          console.log('esta el chart');
         // chart.render();
          this.$refs.rubriquita.refresh();
        }
  },
  watch:{
    isIntersecting(){
      if (this.isIntersecting) {
        this.$refs.piesito.refresh()
      }
    } 
  },
  methods:{
    onIntersect (entries, observer) {
        // More information about these options
        // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        console.log(entries);
        this.isIntersecting = entries[0].intersectionRatio >= 0.5;
        // this.$refs.piesito.refresh()
      },
  },
  data(){
    return{
      isActive: false,
      isIntersecting:false,
       series: [44, 55, 13, 43, 22],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },  


      stackop2:{
            chart: {
                type: 'bar',
                height: 2000,
                stacked: true,
                stackType: '100%'
            },
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '100%',
                    columnWidth: '100%'
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: ["25 de Mayo", "Alba Posse", "Almafuerte", "Apóstoles", "Aristóbulo del Valle", "Azara", "Bernardo de Irigoyen", "Caá Yarí", "Campo Grande", "Campo Ramón", "Campo Viera", "Candelaria", "Capioví", "Cerro Azul", "Cerro Corá", "Colonia Alberdi", "Colonia Aurora", "Colonia Delicia", "Colonía Victoria", "Comandante Andresito", "Concepción de la Sierra", "Corpus", "Dos de Mayo", "El Alcazar", "El Soberbio", "Eldorado", "Fachinal", "Garuhape", "Garupá", "General Urquiza", "Gobernador Roca", "Guaraní", "Jardín América", "Leandro N. Alem", "Loreto", "Los helechos", "Montecarlo", "Oberá", "Panambí", "Posadas (Nemesio Parma)","Posadas (Sur Argentino)","Posadas (PAS - Barrio Yacyretá)", "Pozo Azul", "Profundidad", "Puerto Esperanza", "Puerto Iguazú", "Puerto Libertad", "Puerto Piray", "Puerto Rico 01", "Ruiz de Montoya", "Salto Encantado", "San Ignacio", "San Javier", "San José", "San Martín", "San Pedro", "San Vicente", "Santa Ana", "Santiago de Liniers", "Santo Pipó"],
            },
            yaxis: {
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 100,
                    maxWidth: 120,
                }
            },


            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "alumnos"
                    }
                }
            },
            fill: {
                opacity: 1

            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        },
    }
  },
  computed:{
    veccomp(){
      return this.vecins
    }
  },
    mounted() {
        var stackop = {
            chart: {
              redrawOnParentResize: false,
              redrawOnWindowResize: false,
              animations: {
                enabled: false
                },
                type: 'bar',
                height: 2000,
                stacked: true,
                stackType: '100%'
            },
            series: this.vecins,
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '100%',
                    columnWidth: '100%'
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: ["25 de Mayo", "Alba Posse", "Almafuerte", "Apóstoles", "Aristóbulo del Valle", "Azara", "Bernardo de Irigoyen", "Caá Yarí", "Campo Grande", "Campo Ramón", "Campo Viera", "Candelaria", "Capioví", "Cerro Azul", "Cerro Corá", "Colonia Alberdi", "Colonia Aurora", "Colonia Delicia", "Colonía Victoria", "Comandante Andresito", "Concepción de la Sierra", "Corpus", "Dos de Mayo", "El Alcazar", "El Soberbio", "Eldorado", "Fachinal", "Garuhape", "Garupá", "General Urquiza", "Gobernador Roca", "Guaraní", "Jardín América", "Leandro N. Alem", "Loreto", "Los helechos", "Montecarlo", "Oberá", "Panambí", "Posadas (Nemesio Parma)","Posadas (Sur Argentino)","Posadas (PAS - Barrio Yacyretá)", "Pozo Azul", "Profundidad", "Puerto Esperanza", "Puerto Iguazú", "Puerto Libertad", "Puerto Piray", "Puerto Rico 01", "Ruiz de Montoya", "Salto Encantado", "San Ignacio", "San Javier", "San José", "San Martín", "San Pedro", "San Vicente", "Santa Ana", "Santiago de Liniers", "Santo Pipó"],
            },
            yaxis: {
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 100,
                    maxWidth: 120,
                }
            },


            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "alumnos"
                    }
                }
            },
            fill: {
                opacity: 1

            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        };
        if (this.$refs.chart) {
            // HTML element exists
            var chart = new ApexCharts(this.$refs.chart, stackop);
            chart.render();
        }

    }
}
</script>

<style>

</style>