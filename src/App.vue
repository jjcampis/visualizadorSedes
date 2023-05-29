<template>
  <v-app :class="[$route.name == 'cargar' ? 'fondoVerde' : 'fondoBlanco']">
    <div v-if="logueado && $route.name !== 'cargar'">
      <v-app-bar
        v-if="$route.name !== 'cargar' && !loading"
        app
        style="background: #bd1919; z-index: 22"
      >
        <v-app-bar-nav-icon
          class="text-white"
          @click.stop="drawer = !drawer"
          style="
            padding: 25px;
            background: #26958a;
            border-radius: 0px 20px 20px 0px;
            left: -4px;
          "
        ></v-app-bar-nav-icon>

        <v-row class="text-white" align="center" justify="space-between">
          <v-col cols="1" class="text-right"> Sede </v-col>
          <v-col cols="4" class="text-left">
            <v-select
              style="z-index: 20; margin-top: 20px"
              class="red_select"
              @change="updateSelectedSede"
              :items="todassedes"
              item-text="sede"
              item-value="sede"
              v-model="sede"
            ></v-select>
          </v-col>

          <v-col cols="6" class="text-right">
            Actualizado al:
            <span v-if="ult_act.r2d2_date" class="selsede">{{
              ult_act.r2d2_date
            }}</span>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-navigation-drawer
        hide-overlay
        v-if="$route.name !== 'cargar' && !loading"
        v-model="drawer"
        app
      >
        <v-img :src="require('./assets/logo_red_maker.png')"></v-img>
        <b style="color: #26958a">DASHBOARD</b>
        <p>Version: 2.2.23</p>
        <v-list>
          <v-list-item to="/"
            ><v-list-item-title>General</v-list-item-title></v-list-item
          >
          <!-- <v-list-item to="/newhome"><v-list-item-title>Preinscriptos**</v-list-item-title></v-list-item> -->
          <v-list-item to="/imprimir"
            ><v-list-item-title
              >Distribución Horaria</v-list-item-title
            ></v-list-item
          >
          <v-list-item to="/personal"
            ><v-list-item-title>Personal</v-list-item-title></v-list-item
          >
          <v-list-item to="/cargar"
            ><v-list-item-title
              >Actualizar - Datos</v-list-item-title
            ></v-list-item
          >
          <!-- <v-list-item to="/about"><v-list-item-title>Asistencias</v-list-item-title></v-list-item> -->
          <v-list-item to="/rubricaT"
            ><v-list-item-title
              >Rubrica Estudiantes</v-list-item-title
            ></v-list-item
          >
          <v-list-item to="/rubG"
            ><v-list-item-title>Rubrica Sedes</v-list-item-title></v-list-item
          >
          <v-list-item to="/graf_recursos"
            ><v-list-item-title>recursos</v-list-item-title></v-list-item
          >
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid fill-heights style="max-width: 95%" class="px-0">
          <v-container v-if="loading">
            <v-img
              v-if="!timeElapsed"
              :src="require('@/assets/logo_red_maker.png')"
            ></v-img>
            <transition name="fade" mode="out-in">
              <component
                v-on:sedesCargadas="cargaOk"
                v-if="timeElapsed"
                :is="compo"
              ></component>
            </transition>
          </v-container>

          <transition v-if="!loading" name="fab-transition" mode="out-in">
            <!-- <keep-alive exclude="Home"> -->
            <!-- <keep-alive exclude="newhome"> -->
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
          </transition>
        </v-container>
      </v-main>
    </div>
    <div v-else>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
<script>
//import * as localforage from 'localforage'
//import * as cargar from '@/views/cargar'
import eventHub from "@/eventHub";
import { mapState } from "vuex";
import cargar from "./views/cargar.vue";
import store from '@/store';

export default {
  data: () => {
    return {
      drawer: true,
      sede: "Todo",
      loading: true,
      compo: cargar,
      timeElapsed: false,
    };
  },
  mounted() {
    //console.log(this.databaseExists('dashboard_red_maker'));
    //console.log(this.checkdata());
    console.log("nuevo contenido 123-dani");
  },
  computed: {
    ...mapState([
      "rubricas_sede",
      "selectedSede",
      "personal",
      "logueado",
      "rubricas_G",
    ]),
    ult_act() {
      if (this.personal.length > 0) {
        return this.personal.slice(-1)[0];
      } else {
        return { r2d2_date: 0 };
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
  methods: {
    cargaOk() {
      console.log("recibido");
      this.loading = false;
    },
    updateSelectedSede() {
      store.commit('SET_selectedSede', { sede: this.sede });
    }
  },
  created() {
    eventHub.$on("direccion", () => {
      this.loading = false;
    });
    setTimeout(() => {
      this.timeElapsed = true;
    }, 3000);
    /*
  console.log();
  this.$eventHub.$emit('aloja');
  this.$nextTick(() => {
    
  if(Object.keys(this.rubricas_sede) != 0){
    console.log('existe');
  }else{
    console.log('no data..');
    //this.$router.push({name:'cargar'});
  }
    });
  setTimeout(() => {
    if(Object.keys(this.rubricas_sede) != 0){
    console.log('existe');
  this.loading = false;
  }else{
    console.log('no data..');
    this.$router.push({name:'cargar'});
  }
  }, 5000);
  this.loading = false;*/
  },

  /*created(){
    localforage.getItem('dashboard_red_maker', function (err, value) {
    console.log(value);
    console.log(err);
    // if err is non-null, we got an error. otherwise, value is the value
  }),
  localforage.keys().then(function(keys) {
    // An array of all the key names.
    console.log(keys);
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
}),
localforage.ready().then(function() {
    // This code runs once localforage
    // has fully initialized the selected driver.
    console.log(localforage.driver()); // LocalStorage
})
  }*/
};
</script>

<style lang="less">
.fondoVerde {
  background: #26958a !important;
}
.fondoBlanco {
  background: #fff !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
//activo
.v-list .v-list-item--active,
.v-list .v-list-item--active .v-icon {
  color: white !important;
  //background: #1970a3;
  background: #bd1919;
}
//back del menu side
//.v-navigation-drawer__content{
//background: #4b9ac7b5;
//RM-background: #f72323;
//}
//container
.container {
  max-width: 100vw;
  padding: 0px;
}
.selsede {
  background: #26958a;
  color: #ffffff;
  padding: 10px;
}
.red_select .v-select__selection--comma {
  color: #fff; /* Cambia el color aquí */
}
</style>
