(function(e){function t(t){for(var a,s,c=t[0],d=t[1],u=t[2],l=t[3]||[],f=0,p=[];f<c.length;f++)s=c[f],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(e[a]=d[a]);b&&b(t),i.push.apply(i,l);while(p.length)p.shift()();return n.push.apply(n,u||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],a=!0,s=1;s<r.length;s++){var u=r[s];0!==o[u]&&(a=!1)}a&&(n.splice(t--,1),e=d(d.s=r[0]))}return 0===n.length&&(i.forEach((function(e){if(void 0===o[e]){o[e]=null;var t=document.createElement("link");d.nc&&t.setAttribute("nonce",d.nc),t.rel="prefetch",t.as="script",t.href=c(e),document.head.appendChild(t)}})),i.length=0),e}var a={},s={app:0},o={app:0},n=[],i=[];function c(e){return d.p+"js/"+({about:"about",imprimir:"imprimir",rubG:"rubG",rubricaT:"rubricaT",rubrigaG:"rubrigaG",test:"test"}[e]||e)+"."+{about:"cf9fc5c7",imprimir:"6b6f44a9",rubG:"d28f38b6",rubricaT:"4524c7e2",rubrigaG:"dc057836",test:"e19d643d"}[e]+".js"}function d(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,d),r.l=!0,r.exports}d.e=function(e){var t=[],r={rubG:1,rubricaT:1,rubrigaG:1};s[e]?t.push(s[e]):0!==s[e]&&r[e]&&t.push(s[e]=new Promise((function(t,r){for(var a="css/"+({about:"about",imprimir:"imprimir",rubG:"rubG",rubricaT:"rubricaT",rubrigaG:"rubrigaG",test:"test"}[e]||e)+"."+{about:"31d6cfe0",imprimir:"31d6cfe0",rubG:"44386c9e",rubricaT:"44386c9e",rubrigaG:"44386c9e",test:"31d6cfe0"}[e]+".css",o=d.p+a,n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var c=n[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===o))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){c=l[i],u=c.getAttribute("data-href");if(u===a||u===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||o,n=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");n.code="CSS_CHUNK_LOAD_FAILED",n.request=a,delete s[e],f.parentNode.removeChild(f),r(n)},f.href=o;var b=document.getElementsByTagName("head")[0];b.appendChild(f)})).then((function(){s[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var n=new Promise((function(t,r){a=o[e]=[t,r]}));t.push(a[2]=n);var i,u=document.createElement("script");u.charset="utf-8",u.timeout=120,d.nc&&u.setAttribute("nonce",d.nc),u.src=c(e);var l=new Error;i=function(t){u.onerror=u.onload=null,clearTimeout(f);var r=o[e];if(0!==r){if(r){var a=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",l.name="ChunkLoadError",l.type=a,l.request=s,r[1](l)}o[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:u})}),12e4);u.onerror=u.onload=i,document.head.appendChild(u)}return Promise.all(t)},d.m=e,d.c=a,d.d=function(e,t,r){d.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},d.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,t){if(1&t&&(e=d(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(d.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)d.d(r,a,function(t){return e[t]}.bind(null,a));return r},d.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="/dashboard/preview/",d.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var b=l,p=function(){return n.push([0,"chunk-vendors"]),r()}();t([[],{},0,["imprimir","rubG"]])})({0:function(e,t,r){e.exports=r("56d7")},1052:function(e,t,r){},2013:function(e,t,r){},4360:function(e,t,r){"use strict";var a=r("1da1"),s=(r("96cf"),r("b64b"),r("d3b7"),r("2b0e")),o=r("2f62"),n=r("eeb9"),i=(r("a18c"),r("1625")),c=r("558f");s["default"].use(o["a"]);function d(e){var t=e.state;0!=Object.keys(t.rubricas_sede)&&(console.log("ok"),t.count=Object.keys(t.rubricas_sede).length,setTimeout((function(){c["a"].$emit("direccion")}),1e3))}t["a"]=new o["a"].Store({state:{count:0,sedes:[{sede:"25 de Mayo",id:19198},{sede:"Alba Posse",id:19199},{sede:"Almafuerte",id:19200},{sede:"Apóstoles",id:19201},{sede:"Aristóbulo del Valle",id:19202},{sede:"Azara",id:19203},{sede:"Bernardo de Irigoyen",id:19204},{sede:"Caá Yarí",id:19205},{sede:"Campo Grande",id:19206},{sede:"Campo Ramón",id:19207},{sede:"Campo Viera",id:19208},{sede:"Candelaria",id:19209},{sede:"Capioví",id:19210},{sede:"Cerro Azul",id:19211},{sede:"Cerro Corá",id:19212},{sede:"Colonia Alberdi",id:19213},{sede:"Colonia Aurora",id:19214},{sede:"Colonia Delicia",id:19215},{sede:"Colonía Victoria",id:19216},{sede:"Comandante Andresito",id:19217},{sede:"Concepción de la Sierra",id:19218},{sede:"Corpus",id:19219},{sede:"Dos de Mayo",id:19220},{sede:"El Alcazar",id:19221},{sede:"El Soberbio",id:19222},{sede:"Eldorado",id:19223},{sede:"Fachinal",id:19224},{sede:"Garuhape",id:19225},{sede:"Garupá",id:19226},{sede:"General Urquiza",id:19227},{sede:"Gobernador Roca",id:19228},{sede:"Guaraní",id:19229},{sede:"Jardín América",id:19231},{sede:"Leandro N. Alem",id:19232},{sede:"Loreto",id:19233},{sede:"Los helechos",id:19234},{sede:"Montecarlo",id:19235},{sede:"Oberá",id:19236},{sede:"Panambí",id:19237},{sede:"Posadas (En el Polo TIC)",id:19238},{sede:"Pozo Azul",id:19239},{sede:"Profundidad",id:19240},{sede:"Puerto Esperanza",id:19241},{sede:"Puerto Iguazú",id:19242},{sede:"Puerto Libertad",id:19243},{sede:"Puerto Piray",id:19244},{sede:"Puerto Rico 01",id:19245},{sede:"Puerto Rico 02",id:19286},{sede:"Ruiz de Montoya",id:19246},{sede:"Salto Encantado",id:19247},{sede:"San Ignacio",id:19248},{sede:"San Javier",id:19249},{sede:"San José",id:19250},{sede:"San Martín",id:19251},{sede:"San Pedro",id:19252},{sede:"San Vicente",id:19253},{sede:"Santa Ana",id:19254},{sede:"Santiago de Liniers",id:19255},{sede:"Santo Pipó",id:19256}],rubricas_sede:{},rubricas_G:{},datos_sede:[],cargando:!1},mutations:{increment:function(e){e.count++},SET_rubricas:function(e,t){var r=t.sede.sede,a=[];a=t.hasOwnProperty("response")?t.response.data:t.rubricas_sede,e.cargando=!1,void 0==e.rubricas_sede[r]&&(e.rubricas_sede[r]=[]),Object.assign(e.rubricas_sede[r],a)},SET_rubricasG:function(e,t){var r=t.sede,a=t.dato;void 0==e.rubricas_G[r]&&(e.rubricas_G[r]={}),Object.assign(e.rubricas_G[r],a)}},actions:{obtener_rubricas:function(e,t){return Object(a["a"])(regeneratorRuntime.mark((function r(){var a,s,o,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(a=e.state,s=e.commit,r.prev=1,void 0!=a.rubricas_sede[t.sede]){r.next=13;break}return a.cargando=!0,r.next=6,n["a"].get(n["a"].defaults.baseURL+"/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter="+t.id);case 6:return o=r.sent,i=o.data,console.log(i),s("SET_rubricas",{sede:t,rubricas_sede:i}),r.abrupt("return",o);case 13:return a.cargando=!1,console.log("ya existe"),r.abrupt("return",200);case 16:r.next=22;break;case 18:r.prev=18,r.t0=r["catch"](1),a.cargando=!1,console.log(r.t0);case 22:case"end":return r.stop()}}),r,null,[[1,18]])})))()},obtener_rub_sede:function(e,t){var r=e.commit;try{return new Promise((function(e,a){n["a"].get(n["a"].defaults.baseURL+"/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter="+t.id).then((function(a){e(a),r("SET_rubricas",{sede:t,response:a})})).catch((function(e){a(e)}))}))}catch(a){console.log(a)}},incrementale:function(e){var t=e.commit;t("increment")}},modules:{},plugins:[Object(i["a"])({key:"dashboard_red_maker",paths:["rubricas_sede","rubricas_G"],rehydrated:d})]})},"558f":function(e,t,r){"use strict";var a=r("2b0e"),s=new a["default"];t["a"]=s},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",["cargar"===e.$route.name||e.loading?e._e():a("v-app-bar",{staticStyle:{background:"#bd1919"},attrs:{app:""}},[a("v-app-bar-nav-icon",{staticClass:"text-white",on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),a("v-toolbar-title",{staticClass:"text-white"},[e._v("Visualizador por sedes")])],1),"cargar"===e.$route.name||e.loading?e._e():a("v-navigation-drawer",{attrs:{app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-img",{attrs:{src:r("b48c")}}),a("v-list",[a("v-list-item",{attrs:{to:"/"}},[a("v-list-item-title",[e._v("Sedes")])],1),a("v-list-item",{attrs:{to:"/"}},[a("v-list-item-title",[e._v("Preinscriptos")])],1),a("v-list-item",{attrs:{to:"/"}},[a("v-list-item-title",[e._v("Distribución")])],1),a("v-list-item",{attrs:{to:"/about"}},[a("v-list-item-title",[e._v("Asistencias")])],1),a("v-list-item",{attrs:{to:"/rubricaT"}},[a("v-list-item-title",[e._v("Rubrica Estudiantes")])],1),a("v-list-item",{attrs:{to:"/rubG"}},[a("v-list-item-title",[e._v("Rubrica Sedes")])],1)],1)],1),a("v-main",[a("v-container",{staticClass:"px-0",staticStyle:{"max-width":"95%"},attrs:{fluid:"","fill-heights":""}},[e.loading?a("v-container",[e.timeElapsed?e._e():a("v-img",{attrs:{src:r("b48c")}}),a("transition",{attrs:{name:"fade",mode:"out-in"}},[e.timeElapsed?a(e.compo,{tag:"component",on:{sedesCargadas:e.cargaOk}}):e._e()],1)],1):e._e(),e.loading?e._e():a("transition",{attrs:{name:"fab-transition",mode:"out-in"}},[a("keep-alive",{attrs:{exclude:"Home"}},[a("router-view")],1)],1)],1)],1)],1)},o=[],n=r("5530"),i=r("558f"),c=r("2f62"),d=r("e9a0"),u={data:function(){return{drawer:!1,loading:!0,compo:d["default"],timeElapsed:!1}},mounted:function(){},computed:Object(n["a"])({},Object(c["c"])(["rubricas_sede"])),methods:{cargaOk:function(){console.log("recibido"),this.loading=!1}},created:function(){var e=this;i["a"].$on("direccion",(function(){e.loading=!1})),setTimeout((function(){e.timeElapsed=!0}),3e3)}},l=u,f=(r("7c55"),r("0c7c")),b=Object(f["a"])(l,s,o,!1,null,null,null),p=b.exports,h=r("9483");Object(h["a"])("".concat("/dashboard/preview/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var m=r("a18c"),g=r("4360"),v=r("ce5b"),_=r.n(v);r("bf40");a["default"].use(_.a);var y={theme:{themes:{light:{primary:"#ccc",caretColor:"#bd1919",secondary:"#b0bec5",anchor:"#8c9eff"}}}},j=new _.a(y),w=r("1e18"),O=(r("2dd8"),r("f9e3"),r("5363"),r("1321")),k=r.n(O),x=r("63d6"),C=r.n(x);a["default"].use(C.a),a["default"].use(k.a),a["default"].component("apexchart",k.a),a["default"].use(w["a"]),a["default"].config.productionTip=!1,new a["default"]({router:m["a"],vuetify:j,store:g["a"],render:function(e){return e(p)}}).$mount("#app")},"7c55":function(e,t,r){"use strict";r("2013")},a18c:function(e,t,r){"use strict";r("d3b7"),r("3ca3"),r("ddb0");var a=r("2b0e"),s=r("8c4f"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-row",[r("v-col",{attrs:{cols:"12",md:"12"}},[r("v-card",{staticClass:"h-100",staticStyle:{"padding-bottom":"25px"},attrs:{elevation:"3"}},[r("div",{class:[e.cambio?"chart-wrapper2":"chart-wrapper"]},[r("apexchart",{staticClass:"apex-moco",attrs:{type:"line",height:"500",width:"100%",options:e.chartOptions,series:e.vecins}})],1)])],1)],1),r("v-row",{staticClass:"mt-0"},[r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-card",{staticClass:"h-100",attrs:{elevation:"3"}},[r("v-list-item",{attrs:{"two-line":""}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"text-left text-h5"},[r("v-row",{attrs:{align:"center"}},[r("v-col",{attrs:{cols:"6"}},[e._v(" Inscriptos ")]),r("v-col",{attrs:{cols:"6"}},[r("v-select",{staticStyle:{"z-index":"13"},attrs:{items:e.sedes,"item-text":"sede","item-value":"sede",label:"Sede"},model:{value:e.sede,callback:function(t){e.sede=t},expression:"sede"}})],1)],1)],1),r("v-list-item-subtitle",{staticClass:"text-left"},[e._v("Cantidad de alumnos Inscriptos")])],1)],1),r("chart",{attrs:{etiquetas:e.etiquetas,series:e.seriesSedes2}})],1)],1)],1)],1)},n=[],i=r("b85c"),c=r("5530"),d=(r("b64b"),r("d81d"),r("b680"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("apexchart",{attrs:{type:"pie",width:"100%",options:e.chartOptionsp,series:e.series}})],1)}),u=[],l={props:["series","etiquetas"],data:function(){return{chartOptionsp:{chart:{width:500,type:"pie",toolbar:{show:!0,offsetX:0,offsetY:0,tools:{download:!0,selection:!0,zoom:!0,zoomin:!0,zoomout:!0,pan:!0,reset:1,customIcons:[]}}},labels:this.etiquetas,dataLabels:{background:{enabled:!1,foreColor:"#fff",padding:15,borderRadius:2,borderWidth:2,borderColor:"#000",opacity:1},dropShadow:{enabled:!0,top:0,left:0,blur:2,color:"#000",opacity:1},style:{fontSize:"14px",fontFamily:"Helvetica, Arial, sans-serif",fontWeight:"bold",colors:["#fff"]},formatter:function(e,t){return console.log(e),console.log(t),[t.w.globals.labels[t.seriesIndex],e.toFixed(1)+"%"]}},legend:{formatter:function(e,t){return[e," - ",t.w.globals.series[t.seriesIndex]]}},responsive:[{breakpoint:480,options:{chart:{width:430},legend:{position:"top"}}}]}}}},f=l,b=r("0c7c"),p=Object(b["a"])(f,d,u,!1,null,null,null),h=p.exports,m=r("2f62"),g={name:"Home",components:{chart:h},computed:Object(c["a"])(Object(c["a"])({},Object(m["c"])(["rubricas_sede","sedes","rubricas_G"])),{},{vsedes:function(){return Object.keys(this.rubricas_G).length>0?Object.keys(this.rubricas_G).map((function(e){return e})):[]},seriesSedes2:function(){var e=this;if(Object.keys(this.rubricas_G).length>0){if(console.log(this.sede),""!=this.sede){var t,r=[],a=Object(i["a"])(this.etiquetas);try{for(a.s();!(t=a.n()).done;){var s=t.value;console.log(s,this.rubricas_G[this.sede]["trayectos"][s].inscriptos),r.push(this.rubricas_G[this.sede]["trayectos"][s].inscriptos)}}catch(u){a.e(u)}finally{a.f()}return r}var o,n={},c=Object(i["a"])(this.etiquetas);try{var d=function(){var t=o.value;console.log(t);var r=Object.keys(e.rubricas_G).map((function(r){return e.rubricas_G[r]["trayectos"][t].inscriptos})).reduce((function(e,t){return e+t}));void 0==n[t]&&(n[t]={}),n[t]=r};for(c.s();!(o=c.n()).done;)d()}catch(u){c.e(u)}finally{c.f()}return Object.keys(n).map((function(e){return n[e]}))}return[]},menux:function(){return this.$root.$children[0].drawer},vecins:function(){var e=this;if(Object.keys(this.rubricas_G).length>0){var t=Object.keys(this.rubricas_G).map((function(t){return e.rubricas_G[t].inscriptos})),r=Object.keys(this.rubricas_G).map((function(t){return e.rubricas_G[t].aprobados})),a=Object.keys(this.rubricas_G).map((function(t){return e.rubricas_G[t].noaprobados}));return[{name:"inscriptos",type:"column",data:t},{name:"aprobados",type:"area",data:r},{name:"no aprobados",type:"line",data:a}]}return[]}}),data:function(){return{creado:!1,sede:"",cambio:!1,menuinicial:!1,etiquetas:["TrendKids","TecnoKids","MakerJuniors","TeensMaker","TeamInn","HighMaker"],seriesSedes:[20,35,23,90,20,45],chartOptions:{chart:{height:"auto",width:"100%",type:"line",stacked:!1},dataLabels:{enabled:!0,enabledOnSeries:[0]},colors:["#F44336","#E91E63","#9C27B0"],stroke:{width:[0,2,5],curve:"smooth"},plotOptions:{bar:{columnWidth:"60%"}},legend:{position:"top"},fill:{opacity:[.85,.25,1],gradient:{inverseColors:!1,shade:"light",type:"vertical",opacityFrom:.85,opacityTo:.55,stops:[0,100,100,100]}},labels:[],markers:{size:0},xaxis:{type:"string"},yaxis:{title:{text:"Alumnos"},min:0},tooltip:{shared:!0,intersect:!1,y:{formatter:function(e){return"undefined"!==typeof e?e.toFixed(0)+" alumnos":e}}}}}},watch:{menux:function(e,t){console.log(e,t),e!=this.menuinicial&&(console.log("cambio"),this.cambio=!0)}},mounted:function(){var e=this;setTimeout((function(){e.creado=!0}),1)},created:function(){console.log("padre: ",this.$root.$children[0].drawer),this.$set(this.chartOptions,"labels",this.vsedes),this.$set(this,"menuinicial",this.$root.$children[0].drawer)}},v=g,_=(r("cccb"),Object(b["a"])(v,o,n,!1,null,null,null)),y=_.exports;r("4360");a["default"].use(s["a"]);var j=[{path:"/",name:"Home",component:y,props:!0},{path:"/about",name:"About",component:function(){return r.e("about").then(r.bind(null,"f820"))}},{path:"/test",name:"test",component:function(){return r.e("test").then(r.bind(null,"2762"))}},{path:"/rubricaT",name:"rubricaT",component:function(){return r.e("rubricaT").then(r.bind(null,"7372"))}},{path:"/rubricaG",name:"rubricaG",component:function(){return r.e("rubrigaG").then(r.bind(null,"f231"))}},{path:"/cargar",name:"cargar",component:function(){return Promise.resolve().then(r.bind(null,"e9a0"))}},{path:"/imprimir",name:"imprimir",component:function(){return r.e("imprimir").then(r.bind(null,"a410"))}},{path:"/rubG",name:"rubG",component:function(){return r.e("rubG").then(r.bind(null,"6e1c"))}}],w=new s["a"]({mode:"hash",base:"/dashboard/preview/",routes:j});t["a"]=w},b48c:function(e,t,r){e.exports=r.p+"img/logo_red_maker.f737fb94.png"},cccb:function(e,t,r){"use strict";r("1052")},dea9:function(e,t,r){},df93:function(e,t,r){"use strict";r("dea9")},e9a0:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-main",[a("v-container",[a("v-img",{attrs:{src:r("b48c")}}),e.segunda?e._e():a("div",[e._v(" Cargando rubricas Trimestrales "),a("b-progress",{staticClass:"mt-3",attrs:{value:e.mapear(e.cargado,0,e.sedes.length-1,0,100),variant:"danger",animated:e.animated}}),a("p",{staticClass:"pt-5"},[a("b",{key:e.sedes[e.cargado].sede,staticClass:"fadered"},[e._v(e._s(e.sedes[e.cargado].sede))])]),e._v(" "+e._s(e.cargado+1)+" - "+e._s(e.sedes.length)+" ")],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.segunda,expression:"segunda"}]},[e._v(" Cargando rubricas Generales ")]),e.segunda?a("datosede",{ref:"dsedes",attrs:{cargar:e.segunda},on:{datosSedesCargados:e.dasedcargado}}):e._e()],1)],1)},s=[],o=r("5530"),n=(r("d3b7"),r("159b"),r("b0c0"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",[r("b-progress",{staticClass:"mt-3",attrs:{value:e.mapear(e.cargado,0,e.sedes.length-1,0,100),variant:"danger"}}),r("p",{staticClass:"pt-5"},[r("b",{key:e.sedes[e.cargado].sede,staticClass:"fadered"},[e._v(e._s(e.sedes[e.cargado].sede))])]),e._v(" "+e._s(e.cargado+1)+" - "+e._s(e.sedes.length)+" ")],1)])}),i=[],c=r("ade3"),d=r("53ca"),u=r("b85c"),l=r("1da1"),f=(r("b64b"),r("4de4"),r("caad"),r("2532"),r("d81d"),r("b680"),r("96cf"),r("eeb9")),b=r("4360"),p=r("2f62"),h={data:function(){return{rango:0,cargado:0,muestra:!1,trayecto:null,trayectitos_sedes:{},ejes:["electronica","contruccion","diseno","programacion","promedio_php"],claves_datos:["tr","tk","mj","tm","ti","hm"],vTrayectos:["TrendKids","TecnoKids","MakerJuniors","TeensMaker","TeamInn","HighMaker"],trayectos:[{value:null,text:"Selecciona Trayecto"},{value:{sel:"Trend-kids",matricula:25},text:"Trend-Kids"},{value:{sel:"Tecno-kids",matricula:15},text:"Tecno-kids"},{value:{sel:"Maker-Juniors",matricula:35},text:"Maker-Juniors"}],sede:null}},props:["cargar"],computed:Object(o["a"])({},Object(p["c"])(["rubricas_sede","rubricas_G","sedes","cargando"])),created:function(){this.cargar&&(console.log("segunda carga"),this.cargard())},methods:{mapear:function(e,t,r,a,s){return Math.round((e-t)*(s-a)/(r-t)+a)},cargard:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r,a,s,o,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=0,e.cargado=0,window.mysede=e.rubricas_sede,a=Object(u["a"])(e.sedes),t.prev=4,a.s();case 6:if((s=a.n()).done){t.next=22;break}return o=s.value,t.next=10,f["a"].get(f["a"].defaults.baseURL+"/json/evaluacion_sedes?_format=json&field_user_espaciomaker_target_id_entityreference_filter="+o.id);case 10:return n=t.sent,i=n.data,t.next=14,e.filtro_trayectos(o.sede);case 14:e.añadir_claves_trayectos(i,o.sede),console.log("termino el sede; ",o),console.log(e.sedes[r].sede,i),console.log("trayectito: ",e.trayectitos_sedes),e.cargado<e.sedes.length-1&&(r++,e.cargado++),r==e.sedes.length-1&&(console.log("todo ok cargado"),e.$emit("datosSedesCargados"));case 20:t.next=6;break;case 22:t.next=27;break;case 24:t.prev=24,t.t0=t["catch"](4),a.e(t.t0);case 27:return t.prev=27,a.f(),t.finish(27);case 30:case"end":return t.stop()}}),t,null,[[4,24,27,30]])})))()},filtro_trayectos:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.abrupt("return",new Promise((function(r){console.log(e);var a,s=Object(u["a"])(t.vTrayectos);try{var o=function(){var r=a.value;if(!(Object.keys(t.rubricas_sede).length>0))return console.log("error",Object.keys(t.rubricas_sede).length),{v:[]};var s,o=t.rubricas_sede[e].filter((function(e){return e.field_user_estudiante.toLowerCase().includes(r.toLowerCase())})),n=Object(u["a"])(t.ejes);try{for(n.s();!(s=n.n()).done;){var i=s.value;t.calcprom(o,i,r,e),console.log("que1")}}catch(c){n.e(c)}finally{n.f()}console.log(e,r,o),console.log("trayectitos: ",t.trayectitos_sedes)};for(s.s();!(a=s.n()).done;){var n=o();if("object"===Object(d["a"])(n))return n.v}}catch(i){s.e(i)}finally{s.f()}console.log("que2"),r()})));case 1:case"end":return r.stop()}}),r)})))()},calcprom:function(e,t,r,a){if(void 0==this.trayectitos_sedes[a]){this.trayectitos_sedes[a]={},this.trayectitos_sedes[a]["inscriptos"]=this.rubricas_sede[a].length,this.trayectitos_sedes[a]["aprobados"]=this.rubricas_sede[a].filter((function(e){return"Aprobado"==e.estado})).length,this.trayectitos_sedes[a]["noaprobados"]=this.rubricas_sede[a].filter((function(e){return"No Aprobado"==e.estado})).length,this.trayectitos_sedes[a]["bajas"]=this.rubricas_sede[a].filter((function(e){return"Baja"==e.estado})).length,this.trayectitos_sedes[a]["ssa"]=this.rubricas_sede[a].length-this.trayectitos_sedes[a]["aprobados"]-this.trayectitos_sedes[a]["noaprobados"]-this.trayectitos_sedes[a]["bajas"],this.trayectitos_sedes[a]["evaluados"]=this.rubricas_sede[a].filter((function(e){return parseInt(e.field_rubrica_promedio_php)>0})).length;var s=this.rubricas_sede[a].filter((function(e){return parseInt(e.field_rubrica_promedio_php)>0})).map((function(e){return parseInt(e.field_rubrica_promedio_php)})),o=0;s.length>0&&(s=s.reduce((function(e,t){return e+t})),o=s/this.rubricas_sede[a].filter((function(e){return parseInt(e.field_rubrica_promedio_php)>0})).length),this.trayectitos_sedes[a]["promPST"]=o,this.trayectitos_sedes[a]["trayectos"]={},console.log("se creo sede",a)}void 0==this.trayectitos_sedes[a]["trayectos"][r]&&(this.trayectitos_sedes[a]["trayectos"][r]={},this.trayectitos_sedes[a]["trayectos"][r]["inscriptos"]=e.length,this.trayectitos_sedes[a]["trayectos"][r]["aprobados"]=e.filter((function(e){return"Aprobado"==e.estado})).length,this.trayectitos_sedes[a]["trayectos"][r]["noaprobados"]=e.filter((function(e){return"No Aprobado"==e.estado})).length,this.trayectitos_sedes[a]["trayectos"][r]["bajas"]=e.filter((function(e){return"Baja"==e.estado})).length,this.trayectitos_sedes[a]["trayectos"][r]["ssa"]=e.length-this.trayectitos_sedes[a]["trayectos"][r]["aprobados"]-this.trayectitos_sedes[a]["trayectos"][r]["noaprobados"]-this.trayectitos_sedes[a]["trayectos"][r]["bajas"],this.trayectitos_sedes[a]["trayectos"][r]["evaluados"]=e.filter((function(e){return parseInt(e.field_rubrica_promedio_php)>0})).length,console.log("se creo trayecto",r)),void 0==this.trayectitos_sedes[a]["trayectos"][r][t]&&(console.log("se creo eje",t),this.trayectitos_sedes[a]["trayectos"][r][t]={});var n="",i={};if(e.length>0)if(console.log(e,t,r),"promedio_php"==t){n="field_rubrica_"+t,i={};var d=e.filter((function(e){return parseInt(e[n])>0})).map((function(e){return parseInt(e[n])||0}));if(d.length>0){d=d.reduce((function(e,t){return e+t}));var u=d/e.filter((function(e){return parseInt(e.field_rubrica_promedio_php)>0})).length;if(u>0){var l="pst";i=Object(c["a"])({},l,u.toFixed(2))}}}else for(var f=1;f<4;f++){n="field_rubrica_"+t+"_a"+f,console.log("Aca datos:"),console.log(parseInt(e[0]["field_rubrica_"+t+"_a1"])||0),console.log(e[0]["field_rubrica_"+t+"_a2"]),console.log(e[0]["field_rubrica_"+t+"_a3"]),i={};var b=e.filter((function(e){return parseInt(e[n])>0})).map((function(e){return parseInt(e[n])||0}));if(console.log("res =>",b),b.length>0){b=b.reduce((function(e,t){return e+t}));var p=b/e.filter((function(e){return parseInt(e[n])>0})).length,h="a"+f;i=Object(c["a"])({},h,p.toFixed(2)),Object.assign(this.trayectitos_sedes[a]["trayectos"][r][t],i)}}else i="promedio_php"==t?{pst:0}:{a1:0,a2:0,a3:0};0==Object.keys(i).length&&(console.log("esta vacio"),i={a1:0,a2:0,a3:0}),console.log("datito",i,"trayecto",r,"eje",t),Object.assign(this.trayectitos_sedes[a]["trayectos"][r][t],i)},"añadir_claves_trayectos":function(e,t){var r=this;if(console.log("datosxx",e.length>0),e.length>0){var a={};this.claves_datos.forEach((function(t){a[t]=Object.keys(e[0]).filter((function(e){return e.substring(0,2)==t}))})),console.log("aqui llave",a),this.claves_datos.forEach((function(s){a[s].forEach((function(a){if("tr"==s)try{void 0==r.trayectitos_sedes[t]["trayectos"]["TrendKids"]&&(r.trayectitos_sedes[t]["trayectos"]["TrendKids"]={}),Object.assign(r.trayectitos_sedes[t]["trayectos"]["TrendKids"],Object(c["a"])({},a.substring(7),e[0][a]))}catch(o){console.log("El error: ",o),console.log(r.trayectitos_sedes[t]["trayectos"]["TrendKids"]),console.log(e[0][a])}"tk"==s&&(console.log("datosede: ",e),Object.assign(r.trayectitos_sedes[t]["trayectos"]["TecnoKids"],Object(c["a"])({},a.substring(7),e[0][a]))),"mj"==s&&Object.assign(r.trayectitos_sedes[t]["trayectos"]["MakerJuniors"],Object(c["a"])({},a.substring(7),e[0][a])),"tm"==s&&Object.assign(r.trayectitos_sedes[t]["trayectos"]["TeensMaker"],Object(c["a"])({},a.substring(7),e[0][a])),"ti"==s&&Object.assign(r.trayectitos_sedes[t]["trayectos"]["TeamInn"],Object(c["a"])({},a.substring(7),e[0][a])),"hm"==s&&Object.assign(r.trayectitos_sedes[t]["trayectos"]["HighMaker"],Object(c["a"])({},a.substring(7),e[0][a]))}))}));var s=this.trayectitos_sedes[t];b["a"].commit("SET_rubricasG",{sede:t,dato:s})}},otra:function(e){return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){setTimeout((function(){t(e)}),150)})));case 1:case"end":return t.stop()}}),t)})))()}}},m=h,g=r("0c7c"),v=Object(g["a"])(m,n,i,!1,null,null,null),_=v.exports,y=r("a18c"),j={data:function(){return{animated:!0,cargado:0,segunda:!1}},components:{datosede:_},computed:Object(o["a"])({},Object(p["c"])(["rubricas_sede","sedes","cargando"])),created:function(){this.cargar()},methods:{cargar:function(){var e=this;console.log(y["a"]),this.sedes.forEach((function(t,r){e.$store.dispatch("obtener_rub_sede",t).then((function(t){200==t.status&&(e.cargado<e.sedes.length-1&&e.cargado++,e.cargado==e.sedes.length-1&&(e.segunda=!0))}))}))},dasedcargado:function(){console.log("datosSedesCargados"),this.$emit("sedesCargadas"),"cargar"==y["a"].history.current.name&&y["a"].push({name:"Home"})},cargadatoSede:function(e){return new Promise((function(t,r){f["a"].get(f["a"].defaults.baseURL+"/json/evaluacion_sedes?_format=json&field_user_espaciomaker_target_id_entityreference_filter="+e.id).then((function(e){return console.log("me cargue"),t(e),console.log(e.data),e.data})).catch((function(e){r(e)}))}))},mapear:function(e,t,r,a,s){return Math.round((e-t)*(s-a)/(r-t)+a)}}},w=j,O=(r("df93"),Object(g["a"])(w,a,s,!1,null,null,null));t["default"]=O.exports},eeb9:function(e,t,r){"use strict";var a=r("bc3a"),s=r.n(a);t["a"]=s.a.create({baseURL:"https://r2d2.roboticamisiones.com",headers:{"Access-Control-Allow-Origin":"*"}})}});
//# sourceMappingURL=app.92ddd1e1.js.map