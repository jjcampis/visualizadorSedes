<template>
<v-app>
    <v-app-bar app style="background: #bd1919;">
      <v-app-bar-nav-icon class="text-white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white">Visualizador por sedes</v-toolbar-title>
    </v-app-bar>
  
    <v-navigation-drawer v-model="drawer" app>
      <v-img :src="require('./assets/logo_red_maker.png')"></v-img>
      
      <v-list >
        <v-list-item to="/"><v-list-item-title>Sedes</v-list-item-title></v-list-item>
        <v-list-item to="/about"><v-list-item-title>Alumnos</v-list-item-title></v-list-item>  
        <v-list-item to="/rubricaT"><v-list-item-title>Rubrica Trimestral</v-list-item-title></v-list-item>  
      </v-list>
    </v-navigation-drawer>
  
    <v-main>
      <v-container fluid fill-heights
      style="max-width: 95%;"
      >
      <transition name="fab-transition" mode="out-in">
        <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
</v-app>
</template>
<script>
export default {
  data:()=>{
    return{
      drawer: false
    }
  }
}
</script>

<style lang="less">
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
</style>
