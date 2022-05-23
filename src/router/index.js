import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from '@/store';
//import * as localforage from 'localforage'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props:true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/personal",
    name: "personal",
    // route level code-splitting
    // this generates a separate chunk (personal.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "personal" */ "../views/personal.vue"),
  },
  {
    path: "/test",
    name: "test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/test.vue"),
  },
  {
    path: "/rubricaT",
    name: "rubricaT",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "rubricaT" */ "../views/rubricaT.vue"),
  },
  {
    path: "/rubricaG",
    name: "rubricaG",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "rubrigaG" */ "../views/rubricaG.vue"),
  },
  {
    path: "/cargar",
    name: "cargar",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "cargar" */
      /* webpackPrefetch: true */ "../views/cargar.vue"),
  },
  {
    path: "/imprimir",
    name: "imprimir",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      // import(/* webpackChunkName: "imprimir" */
      // /* webpackPrefetch: true */ "../views/printest.vue"),
      import(/* webpackChunkName: "imprimir" */
      /* webpackPrefetch: true */ "../views/distribucion.vue"),
  },
  {
    path: "/newhome",
    name: "newhome",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "newhome" */
      /* webpackPrefetch: true */ "../views/NewHome.vue"),
  },
  {
    path: "/graficoprueba",
    name: "graficoprueba",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "graficoprueba" */
      /* webpackPrefetch: true */ "../views/graficoprueba.vue"),
  }
  ,
  {
    path: "/rubG",
    name: "rubG",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "rubG" */
      /* webpackPrefetch: true */ "../views/rubG.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */
      /* webpackPrefetch: true */ "../views/login.vue"),
  }
];

// function guardMyroute(to, from, next)
// {
//  var isAuthenticated= false;
// //this is just an example. You will have to find a better or 
// // centralised way to handle you localstorage data handling 
// if(localStorage.getItem('LoggedUser'))
//   isAuthenticated = true;
//  else
//   isAuthenticated= false;
//  if(isAuthenticated) 
//  {
//   next(); // allow to enter route
//  } 
//  else
//  {
//   next('/login'); // go to '/login';
//  }
// }

const router = new VueRouter({
  mode: "hash",//no se opta por history para evitar error de navegacion
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isAuthenticated= false;
  console.log(to,from);
  if(store.state.logueado){
    isAuthenticated = true;
  }else{
    isAuthenticated = false;
  }
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    // return { name: 'login' }
    next({ name: 'login' })
  }else{
    next();
  }
})



/*
router.beforeEach((to, from, next) => {
  console.log(to,from);
  //console.log('estado = ',store.state.rubricas_sede);
  if(from.name == null && to.name == 'Home'){
    console.log('primer carga');
  if(store.state.count == 0){
  setTimeout(() => {
    console.log('no habia datos');
    next();  
  }, 3000);
  }else{
  next();
}
}
next();
})*/

/*const waitForStorageToBeReady = (to, from, next) => {
  if (!store._vm.$root.$data['vuexPersistStateRestored']) {
    store._vm.$root.$on('vuexPersistStateRestored', () => {
      next()
    })
  } else {
    next()
  }
}
router.beforeEach(waitForStorageToBeReady)*/

/*router.beforeEach(async (to, from, next) => {
  /*console.log(store);
  await store.restored;

  localforage.getItem('dashboard_red_maker', function (err, value) {
    console.log(value);
    console.log(err);
    store.commit('updateFromIDB',value);
    // if err is non-null, we got an error. otherwise, value is the value
  }),
  next();
});*/



export default router;
