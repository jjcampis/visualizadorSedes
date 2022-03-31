import Vue from "vue";
import Vuex from "vuex";
//import createPersistedState from "vuex-persistedstate";
import axios from '@/axios'
//import * as localforage from 'localforage'
import createPersistedState from "vuex-persist-indexeddb";
import eventHub from '@/eventHub'
Vue.use(Vuex);
var self = this;

function rehydratedvue ({state}){//this.$eventHub.$emit('cargado IDB');
  //this.$emit('cargado IDB')
  if (Object.keys(state.rubricas_sede) != 0) {
    console.log('ok');
    state.count = Object.keys(state.rubricas_sede).length
    setTimeout(() => {
      eventHub.$emit('direccion');
    }, 1000);
    //router.push({name:'Home'});
  }
  //console.log(self)
  }

export default new Vuex.Store({
  state: {
    count: 0,
    sedes:[
      /*{sede:'Colonia Wanda', id:1005588},
      {sede:'Dos Arroyos', id:1005589},
      {sede:'Mojón Grande', id:1005596},
      */
      {sede:'25 de Mayo', id:19198},
      {sede:'9 de julio', id:1005583},
      {sede:'Alba Posse', id:19199},
      {sede:'Almafuerte', id:19200},
      {sede:'Apóstoles', id:19201},
      {sede:'Aristóbulo del Valle', id:19202},
      {sede:'Arroyo del Medio', id:1005584},
      {sede:'Azara', id:19203},
      {sede:'Bernardo de Irigoyen', id:19204},
      {sede:'Bonpland', id:1005585},
      {sede:'Caá Yarí', id:19205},
      {sede:'Campo Grande', id:19206},
      {sede:'Campo Ramón', id:19207},
      {sede:'Campo Viera', id:19208},
      {sede:'Candelaria', id:19209},
      {sede:'Capioví', id:19210},
      {sede:'Caraguatay', id:1005586},
      {sede:'Cerro Azul', id:19211},
      {sede:'Cerro Corá', id:19212},
      {sede:'Colonia Alberdi', id:19213},
      {sede:'Colonia Aurora', id:19214},
      {sede:'Colonia Delicia', id:19215},
      {sede:'Colonia Polana', id:1005587},
      {sede:'Colonía Victoria', id:19216},
      {sede:'Colonia Wanda', id:1005588},
      {sede:'Comandante Andresito', id:19217},
      {sede:'Concepción de la Sierra', id:19218},
      {sede:'Corpus', id:19219},
      {sede:'Dos Arroyos', id:1005589},
      {sede:'Dos de Mayo', id:19220},
      {sede:'El Alcazar', id:19221},
      {sede:'El Soberbio', id:19222},
      {sede:'Eldorado', id:19223},
      {sede:'Fachinal', id:19224},
      {sede:'Florentino Ameghino', id:1005590},
      {sede:'Garuhape', id:19225},
      {sede:'Garupá', id:19226},
      {sede:'General Alvear', id:1005591},
      {sede:'General Urquiza', id:19227},
      {sede:'Gobernador López', id:1005592},
      {sede:'Gobernador Roca', id:19228},
      {sede:'Guaraní', id:19229},
      {sede:'Hipólito Irigoyen', id:1005593},
      {sede:'Itacaruaré', id:19230},
      {sede:'Jardín América', id:19231},
      {sede:'Leandro N. Alem', id:19232},
      {sede:'Loreto', id:19233},
      {sede:'Los helechos', id:19234},
      {sede:'Mártires', id:1005595},
      {sede:'Mojón Grande', id:1005596},
      {sede:'Montecarlo', id:19235},
      {sede:'Oberá', id:19236},
      {sede:'Olegario Víctor Andrade', id:1005597},
      {sede:'Panambí', id:19237},
      {sede:'Posadas (En el Polo TIC)', id:19238},
      {sede:'Pozo Azul', id:19239},
      {sede:'Profundidad', id:19240},
      {sede:'Puerto Esperanza', id:19241},
      {sede:'Puerto Iguazú', id:19242},
      {sede:'Puerto Leoni', id:1005598},
      {sede:'Puerto Libertad', id:19243},
      {sede:'Puerto Piray', id:19244},
      {sede:'Puerto Rico 01', id:19245},
      {sede:'Puerto Rico 02', id:19286},
      {sede:'Ruiz de Montoya', id:19246},
      {sede:'Salto Encantado', id:19247},
      {sede:'San Antonio', id:1005599},
      {sede:'San Ignacio', id:19248},
      {sede:'San Javier', id:19249},
      {sede:'San José', id:19250},
      {sede:'San Martín', id:19251},
      {sede:'San Pedro', id:19252},
      {sede:'San Vicente', id:19253},
      {sede:'Santa Ana', id:19254},
      {sede:'Santa María', id:1005600},
      {sede:'Santiago de Liniers', id:19255},
      {sede:'Santo Pipó', id:19256},
      {sede:'Tres Capones', id:1005601},
],
    rubricas_sede:{},
    rubricas_G:{},
    horario:[],
    //datos_sede:[],
    cargando: false
  },
  mutations: {
    increment(state){
      state.count++;
    },
    SET_rubricas(state,payload){
      //state.rubricas_sede = payload;
      let sede = payload.sede.sede;
      let rubricas = [];
      console.log(payload);
      if (payload.hasOwnProperty('response')) {//si son todos viene con .data
        rubricas = payload.response.data;
      }else{
        rubricas = payload.rubricas_sede;
      }
      //console.log('recibi: ',rubricas);
      state.cargando = false;
      if (state.rubricas_sede[sede] == undefined) {
        state.rubricas_sede[sede] = [];
      }
      Object.assign(state.rubricas_sede[sede],rubricas);
    },


    SET_rubricasG(state,payload){
      let sede = payload.sede;
      let datos_sede = payload.dato
   
   /* console.log('comit',datos_sede);
      console.log('comit sede:',sede);
      console.log('comit_crudo',payload);
    */
      if (state.rubricas_G[sede] == undefined) {
        state.rubricas_G[sede] = {};
        //console.log('se creo la sede en comit');
      }
      //Object.assign(state.rubricas_G[sede],datos_sede);
      Vue.set(state.rubricas_G,sede,datos_sede);
    },



    SET_horario(state,payload){
      state.cargando = false;
      state.horario = payload;
    },
    Reiniciarbd(state){
      state.rubricas_sede = {};
      state.rubricas_G = {};
    }
  },
  actions: {
    async obtener_rubricas({state,commit},sede){
    try{
      //la URL base ya esta cargada en main.js (axios.baseURL)
      if (state.rubricas_sede[sede.sede] == undefined) {
        state.cargando = true;
        let response = await axios.get(axios.defaults.baseURL+'/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id);
        let rubricas_sede = response.data;
        console.log(rubricas_sede);
        commit('SET_rubricas',{sede,rubricas_sede});
        return response;
      }else{
      state.cargando = false;
      console.log('ya existe');
      return 200;
      }
    }catch(error){
      state.cargando = false;
      console.log(error);
    }
  },
  async obtener_horario({state,commit}){
    try{
      //la URL base ya esta cargada en main.js (axios.baseURL)
      console.log(state.horario)
      if (Object.entries(state.horario).length == 0) {
        state.cargando = true;
        let response = (process.env.NODE_ENV == 'production') ? await axios.get(axios.defaults.baseURL+'/json/horario-grupos?_format=json') : await axios.get('/json.html');
        //let response = await axios.get('/json.html');
        let horario = response.data;
        console.log(horario);
        commit('SET_horario',horario);
        //return response;
      }else{
      state.cargando = false;
      console.log('ya existe');
      return 200;
      }
    }catch(error){
      state.cargando = false;
      console.log(error);
    }
  },
  obtener_rub_sede({commit},sede){
    try {
      //devuelvo promesa para que cargar.vue pueda esperar antes de llamar al siguiente
      return new Promise((resolve,reject) => {
      axios.get(axios.defaults.baseURL+'/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter='+sede.id)
      .then(function(response){
        resolve(response);
        console.log("cargo:"+JSON.parse(response.data));
        commit('SET_rubricas',{sede,response});
      })
      .catch((error) => {
        reject( error );
      });
    })
    }catch (error) {
      console.log(error);
    }
  },

    incrementale({commit}){
      commit('increment');
    }

  },
  modules: {},
  //plugins: [createPersistedState({key: 'dashboard_red_maker'})]
  //plugins:[createPersistedState({key: 'dashboard_red_maker',storage: localforage.createInstance()})]

  /*plugins: [
    createPersistedState({
        storage: {
            getItem: key => {localforage.getItem('dashboard_red_maker', function (err, value) {
              console.log(value);
              console.log(err);
              // if err is non-null, we got an error. otherwise, value is the value
            })},
          }
        }
    )]*/
    
    //no funka 
    /*plugins:[createPersistedState({
      key: 'dashboard_red_maker',
      paths:['rubricas_sede'],
      storage: localforage,
      asyncStorage: true,
    })]*/

    //vuex indexeddb
    
    plugins:[createPersistedState({
      key: 'dashboard_red_maker',
      paths:['rubricas_sede','rubricas_G',"horario"],
      rehydrated: rehydratedvue
    })]
    
});
