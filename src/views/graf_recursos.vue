<template>
  <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
    <v-col cols="12" md="12">
      <b-card class="py-0 px-2 titulo">
        <b-card-header class="bot-collapse" header-tag="header" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="danger">
            <div class="text-h6 text-span-i">
              Recursos {{ recu }}
              <span>
                <v-icon
                  :class="{
                    'mdi mdi-chevron-up': recu,
                    'mdi mdi-chevron-down': !recu,
                  }"
                ></v-icon>
              </span>
            </div>
          </b-button>
        </b-card-header>

        <b-collapse
          v-model="recu"
          class="py-0 px-0"
          id="accordion-2"
          accordion="my-accordion"
        >
          <b-card-body class="py-0 px-0"  v-show="recu">
            <div>algo  {{this.graf_rec}}</div>
            <v-row v-show="!$vuetify.breakpoint.mobile && showcharts && rec1">
              <v-col cols="12" md="12">
                <v-card
                  elevation="3"
                  dense
                  class="h-100 round-top mt-3"
                  style="min-height: 320px"
                >
                  <v-card-item>
                    <v-toolbar-title class="text-h6 red round-top">
                      Compus Nuestras
                    </v-toolbar-title>
                  </v-card-item>
                  <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                    <apexchart
                      class="apex-moco"
                      type="bar"
                      height="400"
                      width="100%"
                      :options="chartEquipos"
                      :series="recurso('nuestraspc')"
                      :lazyUpdate="true"
                    ></apexchart>
                  </div>
                </v-card>
              </v-col>
            </v-row>

<v-row v-show="!$vuetify.breakpoint.mobile && showcharts && rec2">
              <v-col cols="12" md="12">
                <v-card
                  elevation="3"
                  dense
                  class="h-90 round-top mt-3"
                  style="min-height: 320px"
                >
                  <v-card-item>
                    <v-toolbar-title class="text-h6 red round-top">
                      Otras Compus
                    </v-toolbar-title>
                  </v-card-item>
                  <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                    <apexchart
                      class="apex-moco"
                      type="bar"
                      height="250"
                      width="100%"
                      :options="chartEquipos"
                      :series="recurso('otrospc')"
                      :lazyUpdate="true"
                      :deferred-render="true"
                    ></apexchart>
                  </div>
                </v-card>
              </v-col>
            </v-row>

        <!--     <v-row
              v-show="
                !$vuetify.breakpoint.mobile && showcharts && this.graf_rec[0]
              "
            >
              <v-col cols="12" md="12">
                <v-card
                  elevation="3"
                  dense
                  class="h-100 round-top mt-3"
                  style="min-height: 320px"
                >
                  <v-card-item>
                    <v-toolbar-title class="text-h6 red round-top">
                      Compus Nuestras
                    </v-toolbar-title>
                  </v-card-item>
                  <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                    <apexchart
                      ref="recursos1"
                      class="apex-moco"
                      type="bar"
                      height="400"
                      width="100%"
                      :options="chartEquipos"
                      :series="recurso('nuestraspc')"
                      :lazyUpdate="true"
                    ></apexchart>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-row v-show="!$vuetify.breakpoint.mobile && showcharts">
              <v-col cols="12" md="12" v-show="this.graf_rec[1]">
                <v-card
                  elevation="3"
                  dense
                  class="h-90 round-top mt-3"
                  style="min-height: 320px"
                >
                  <v-card-item>
                    <v-toolbar-title class="text-h6 red round-top">
                      Otras Compus
                    </v-toolbar-title>
                  </v-card-item>
                  <div :class="[cambio ? 'chart-wrapper2' : 'chart-wrapper']">
                    <apexchart
                      ref="recursos2"
                      class="apex-moco"
                      type="bar"
                      height="250"
                      width="100%"
                      :options="chartEquipos"
                      :series="recurso('otrospc')"
                      :lazyUpdate="false"
                      :visible="showcharts"
                      :deferred-render="true"
                    ></apexchart>
                  </div>
                </v-card>
              </v-col>
            </v-row> -->
          </b-card-body>
        </b-collapse>
      </b-card>
    </v-col>
  </v-row>
</template>

<script>
import { chartEquipos }from "@/components/datas/chart_equipos"; //objeto chartoptions
import { mapState } from "vuex";
import eventBus from '../eventHub';

export default {
  data: () => {
    return {
      cant_rec: 9,
      graf_rec: [],
      //nuevo
      rec1:false,
      rec2:false,
      recu: false,
      showcharts: false,
      cambio: false,
      menuinicial: false,
      chartEquipos: chartEquipos,
    };
  },
  mounted() {
    //console.log(this.chartEquipos.xaxis);
    //renderizo lo graficos de recursos 1 a 1
    /* for (let i = 1; i <= this.cant_rec; i++) {
        const chartRef = this.$refs['recursos' + i];
        this.graf_rec.push(chartRef);
      } */
eventBus.$on('chartAnimationEnd', (chartContext, options) => {
      // Realiza acciones adicionales cuando se produce el evento
      console.log("Evento de animación del gráfico recibido");
      console.log(chartContext);
      console.log(options);
    });


    setTimeout(() => {
      this.showcharts = true;
    }, 150);

    for (let i = 0; i < this.cant_rec; i++) {
      this.graf_rec.push(false);
    }
    console.log("array de recursos: ", this.graf_rec);
  },
  methods: {
renderChartsWithDelay() {
  const numCharts = 3; // Número total de gráficos
  const delayMultiplier = 2000; // Multiplicador para el tiempo de retraso

  let currentIndex = 0;

  const showNextChart = () => {
    const propertyName = 'rec' + (currentIndex + 1);
    this[propertyName] = true;

    currentIndex++;

    if (currentIndex < numCharts) {
      setTimeout(showNextChart, delayMultiplier);
    }
  };

  setTimeout(showNextChart, delayMultiplier);
},

    recurso(que) {
      if (Object.keys(this.rubricas_G).length > 0) {
        //recorro con map el array de rubricas_G

        let ok = Object.keys(this.rubricas_G).map((x) => {
          return this.rubricas_G[x]["recursos"][que].rrmm_stock_funcionando;
        });
        let reparacion = Object.keys(this.rubricas_G).map((x) => {
          return this.rubricas_G[x]["recursos"][que].rrmm_stock_para_reparar;
        });
        let baja = Object.keys(this.rubricas_G).map((x) => {
          return this.rubricas_G[x]["recursos"][que].rrmm_stock_con_baja;
        });
        //this.type = "bar";
        return [
          { name: "ok", data: ok },
          { name: "reparacion", data: reparacion },
          { name: "baja", data: baja },
        ];
      } else {
        return [];
      }
    },
  },
  created() {
    this.$set(this.chartEquipos.xaxis, "categories", this.vsedes);
    this.$set(this, "menuinicial", this.$root.$children[0].drawer);
  },
  watch: {
    //observo si se clickeo el menu
    recu(antes, ahora) {
      if (!ahora) {
        //alert(ahora);
        // Llama a la función para iniciar la renderización iterativa con retraso
        this.renderChartsWithDelay();
      }
    },
    menux(antes, ahora) {
      console.log(antes, ahora);
      if (antes != this.menuinicial) {
        //se cambio
        console.log("cambio");
        this.cambio = true;
      }
    },
  },

  computed: {
    ...mapState(["rubricas_sede", "sedes", "rubricas_G", "selectedSede"]),
    vsedes() {
      if (Object.keys(this.rubricas_G).length > 0) {
        return Object.keys(this.rubricas_G).map((x) => {
          return x;
        });
      } else {
        return [];
      }
    },
    todassedes() {
      if (Object.keys(this.rubricas_G).length > 0) {
        let vec = Object.keys(this.rubricas_G).map((x) => {
          return x;
        });
        //let vec = Object.values(this.sedes).map(x=>x.sede);
        vec.unshift("Todo");
        return vec;
      } else {
        return [];
      }
    },
  },
};
</script>

<style>
.titulo > .card-body {
  padding-bottom: 0px;
}
.text-span-i span > i {
  color: white !important;
}
.h-90 {
  height: 90% !important;
}

.red {
  background: rgb(189, 25, 25);
  color: aliceblue;
}

.round-top {
  border-radius: 25px 25px 0px 0px !important;
}

.bot-collapse {
  margin-left: -1.8em;
  margin-right: -1.8em;
  padding: 0px !important;
  margin-top: -1.4em;
}

.apex-moco .apexcharts-canvas .apexcharts-svg {
  /* background: blue !important; */
  overflow: visible !important;

  /* color: #F44336', '#E91E63', '#9C27B0' */
}

/* no se podia acceder al elemento despues de cargar, se soluciono con estas preguntas 

https://stackoverflow.com/questions/64124752/apexchart-width-overflows-or-doesnt-strech

*/
.stackwraper {
  width: calc(100%);
  height: 100%;
  margin-left: 0px;
  padding-bottom: 40px;
  display: block;
}
@media only screen and (max-width: 600px) {
  .stackwraper > div {
    background: #bd1919;
    width: 99%;
    display: block;
  }
}

.chart-wrapper {
  /* esta bien cuando carga pero despues hay que sacar el margin: -30px */
  width: calc(100% - 30px);
  height: 100%;
  margin-left: 30px;
  /* margin-left: calc(30px); */
  /* padding-bottom: 40px; */
  display: block;
  /* width: 100%;
    height: 100%;
    display: contents; */
  /* overflow: hidden; */
}

.chart-wrapper2 {
  width: 100% !important;
  height: 100%;
  margin-left: 0px !important;
  /* margin-left: calc(30px); */
  /* padding-bottom: 40px; */
  display: block;
}

.v-application .primary--text {
  color: #ccc !important;
  caret-color: #bd1919 !important;
}
div.chart-wrapperm {
  display: flex;
  align-items: center;
  justify-content: center;
}
.apexcharts-bar-area:hover {
  fill: #e9f5479c !important;
}
.apexcharts-bar-area[selected="true"] {
  fill: turquoise !important;
}
.my-element {
  visibility: hidden;
}
</style>