<template>
<v-app>
  <div v-if="logueado && $route.name !=='cargar'">
   <v-app-bar v-if="$route.name !=='cargar'  && !loading" app style="background: #bd1919; z-index:22">
      <v-app-bar-nav-icon class="text-white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white">Visualizador por sedes 
        <span class="selsede" v-if="selectedSede.sede">{{selectedSede.sede}}</span>
        <span class="selsede" v-else>{{selectedSede}}</span>
        <!-- ver una computed -->
        Actualizado al: <span v-if="ult_act.r2d2_date" class="selsede">{{ult_act.r2d2_date}}</span>

       </v-toolbar-title>
    </v-app-bar>
  
    <v-navigation-drawer hide-overlay v-if="$route.name !=='cargar' && !loading" v-model="drawer" app>
      <v-img :src="require('./assets/logo_red_maker.png')"></v-img>
      
      <v-list >
        <v-list-item to="/"><v-list-item-title>General</v-list-item-title></v-list-item>
        <!-- <v-list-item to="/newhome"><v-list-item-title>Preinscriptos**</v-list-item-title></v-list-item> -->
        <v-list-item to="/imprimir"><v-list-item-title>Distribución Horaria</v-list-item-title></v-list-item>
        <v-list-item to="/personal"><v-list-item-title>Personal</v-list-item-title></v-list-item>
        <v-list-item to="/cargar"><v-list-item-title>Actualizar - Datos</v-list-item-title></v-list-item>
        <!-- <v-list-item to="/about"><v-list-item-title>Asistencias</v-list-item-title></v-list-item> -->
        <!-- <v-list-item to="/rubricaT"><v-list-item-title>Rubrica Estudiantes</v-list-item-title></v-list-item> -->
        <!-- <v-list-item to="/rubG"><v-list-item-title>Rubrica Sedes</v-list-item-title></v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  

    <v-main>
      <v-container fluid fill-heights
      style="max-width: 95%;"
      class="px-0"
      >
      <v-container  v-if="loading">
        <v-img v-if="!timeElapsed" :src="require('@/assets/logo_red_maker.png')"></v-img>
        <transition name="fade" mode="out-in">
        <component v-on:sedesCargadas="cargaOk" v-if="timeElapsed" :is="compo"></component>
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
import eventHub from '@/eventHub'
import {mapState} from 'vuex';
import cargar from './views/cargar.vue'

export default {
  data:()=>{
    return{
      drawer: true,
      loading:true,
      compo: cargar,
      timeElapsed: false
    }
  },
mounted(){
//console.log(this.databaseExists('dashboard_red_maker'));
//console.log(this.checkdata());
},
computed:{
  ...mapState(['rubricas_sede','selectedSede','personal','logueado']),
  ult_act(){
    if (this.personal.length > 0) {
      return this.personal.slice(-1)[0]
    }else{
      return {r2d2_date:0}
    }
  }
},
methods:{
  cargaOk(){
    console.log('recibido');
    this.loading = false;
  }
},
created(){
  eventHub.$on('direccion',()=>{
    this.loading = false;
  })
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
}


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
}
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active  {
  transition: opacity 3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
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
.v-list .v-list-item--active, .v-list .v-list-item--active .v-icon {
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
.container{
     max-width: 100vw;
     padding:0px;
  }
  .selsede{
    background: #26958a;
    color: #ffffff;
    padding: 10px;
  }
</style>
