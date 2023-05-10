import { mapActions,mapState } from 'vuex';
import store from '@/store';
// import store from '@/store';
export default{
    data(){
        return{
            sede:'',
            type:"line",
            fields:[
              {key:'Lunes'},
              {key:'Martes'},
              {key:'Miercoles'},
              {key:'Jueves'},
              {key:'Viernes'},
            ],
            sortBy:"hr_trayecto",
          sortDesc:true,
          hsedes:{},//vector donde creo sedes con sus horarios
          showchartsH: false,
          createdH:0,
          dpclick:false,
          creado:false,
    // Graficos
    chartOptions: {
                chart: {
                  height: 'auto',
                  width: '100%',
                  stacked: false,
                },
                dataLabels: {
                  enabled: true,
                  enabledOnSeries: [0]
                },
                colors: ['#F44336', '#E91E63', '#9C27B0'],
                stroke: {
                  width: [0, 2, 5],
                  curve: 'smooth'
                },
                plotOptions: {
                  bar: {
                    columnWidth: '60%',
                    horizontal: false
                  }
                },
                legend: {
                  position: 'top'
                },
    
    
    
                responsive: [{
                  breakpoint: 580,
                  options: {
                    chart:{
                    stacked: true,
                    type:'bar',
                    stackType: '100%',
                    },
                    plotOptions: {
                      bar: {
                        barHeight: '100%',
                        horizontal: true
                      }
                    },
                    yaxis: {
                      type: 'string'
                    },
                    xaxis: {
                      title: {
                        text: 'Horas',
                      },
                      min: 0
                    },
                    tooltip: {
                      shared: true,
                      position:'bottomLeft',
                      x: {
                        formatter: function (x) {
                          if (typeof x !== "undefined") {
                            return x.toFixed(0);
                          }
                          return x;
                        }
                      }
                    },
                    legend: {
                      position: "bottom"
                    }
                  }
                }],
    
    
    
                fill: {
                  opacity: [0.85, 0.25, 1],
                  gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100]
                  }
                },
                //labels: ["25 de Mayo","Alba Posse","Almafuerte","Apóstoles","Aristóbulo del Valle","Azara","Bernardo de Irigoyen","Caá Yarí","Campo Grande","Campo Ramón","Campo Viera","Candelaria","Capioví","Cerro Azul","Cerro Corá","Colonia Alberdi","Colonia Aurora","Colonia Delicia","Colonía Victoria","Comandante Andresito","Concepción de la Sierra","Corpus","Dos de Mayo","El Alcazar","El Soberbio","Eldorado","Fachinal","Garuhape","Garupá","General Urquiza","Gobernador Roca","Guaraní","Jardín América","Leandro N. Alem","Loreto","Los helechos","Montecarlo","Oberá","Panambí","Posadas (En el Polo TIC)","Pozo Azul","Profundidad","Puerto Esperanza","Puerto Iguazú","Puerto Libertad","Puerto Piray","Puerto Rico 01","Puerto Rico 02","Ruiz de Montoya","Salto Encantado","San Ignacio","San Javier","San José","San Martín","San Pedro","San Vicente","Santa Ana","Santiago de Liniers","Santo Pipó"],
                labels: [],
                markers: {
                  size: 0
                },
                xaxis: {
                  type: 'string',
                  tickPlacement: 'on',
                  labels:{
                    style:{
                            fontSize: '6.5px'
                          }
                  }
                },
                yaxis: {
                  title: {
                    text: 'Grupos - Horarios',
                  },
                  min: 0
                },
                tooltip: {
                  shared: true,
                  position:'topRight',
                  intersect: false,
                  y: {
                    formatter: function (y) {
                      if (typeof y !== "undefined") {
                        return y.toFixed(0);
                      }
                      return y;
                    }
                  }
                }
              }
    // fin graficos
    
        }
    },
    created() {
          // sino no toma
          ///de esta manera asigno el valor de una computed al cargar la pagina
          this.$set(this.chartOptions.xaxis, 'categories', Object.values(this.sedes).map(x=>x.sede));
        },
    mounted(){
    this.obtener_horario().then(this.actu())
    },
    activated: function() {
        if (this.creado) {
          console.log('de nuevo');
          //refresco el chart
          this.showchartsH = false;
          setTimeout(() => {
            this.showchartsH = true;
          }, 500);
        }
      },
      watch:{
        horario(newVal,oldVal){
          console.log("cambioHo");
          this.actu();
        }
      },
      computed:{
        ...mapState(['horario','cargando','sedes']),
        horarioF(){
            //console.log(Object.entries(this.horario).filter(x=>x[1].hr_espaciomaker == this.sede));
            console.log(Object.entries(this.horario).length > 0);
            console.log(this.cargando);
            if(Object.entries(this.horario).length > 0 && !this.cargando){
                //return Object.entries(this.horario).filter(x=>x[1].hr_espaciomaker == this.sede);
            return Object.values(this.horario).filter((tray) => {
                //return tray.hr_espaciomaker.toLowerCase().includes(this.sede.toLowerCase());
                return tray.hr_espaciomaker == this.sede;
              })
            
            }else{
                return ['no habia'];
            }
        },
        horarioGrouped(){
          //https://stackoverflow.com/questions/40774697/how-can-i-group-an-array-of-objects-by-key
          if (this.horarioF[0] != 'no habia'){
          let outObject = this.horarioF.reduce(function(a, e) {
      // GROUP BY estimated key (estKey), well, may be a just plain key
      // a -- Accumulator result object
      // e -- sequentally checked Element, the Element that is tested just at this itaration
    
      // new grouping name may be calculated, but must be based on real value of real field
        let estKey = (e['hr_dia']); 
    
        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
          return a;
        }, {});
        console.log(outObject);
        //return Object.entries(outObject);
        return outObject;
          }
        },
        vacios(){
          if(Object.entries(this.horario).length > 0 && !this.cargando){
            //hago 2 arreglos solo con los municipios
            let ob1 = Object.values(this.horario).map(i => i.hr_espaciomaker);
            let ob2 =  this.sedes.map(x=>x.sede);
            //filtro los que no estan en ob1
            return ob2.filter(o2 => ob1.indexOf(o2) === -1);
          }else{
            return [];
          }
        },
    
          vechoras(){
          if(Object.entries(this.horario).length > 0 && !this.cargando){
          //Recorro con map las sedes y dentro (para cada sede hago un filtro de todos los horarios para cada sede)
          let inscripted =  this.sedes.map(x => this.hsedes[x.sede] = Object.values(this.horario).filter((tray) => {
                return tray.hr_espaciomaker == x.sede;
              }).length
              );
            //filtro los que no estan en ob1
          //console.log(obj2.filter(o2 => obj1.indexOf(o2) === 1));
          console.log(inscripted);
    
    
          if (this.$vuetify.breakpoint.xs) {
            console.log('es mobile');
            this.type = "bar";
            return [{'name':'Grupos-Horarios','data': inscripted}]  
          }else{
          //es desktop
          this.type = "bar";
          return [{'name':'Grupos-Horarios','type':'bar','data': inscripted}]
          }
        }else{
          return []
        }
      }
    },
    methods:{
      ...mapActions(['obtener_horario']),
      //funcion para alinear verticalmente segun el horario
      testb(selected,...x){
        if (this.dpclick == false){
          this.$refs.barritash.toggleDataPointSelection(0,selected);
          console.log("x ",x," ruta ", this.$route);
          if(x[0] > 0){
            let sede= this.sedes[selected].sede;
            console.log(sede);
            this.sede = sede;
            store.commit('SET_selectedSede',{sede});
          }
        }
        this.dpclick = false;
      },
      actu(){
        // :key="created" 
        setTimeout(() => {
            this.creado = true;
            this.createdH++
          }, 1),
        setTimeout(() => {this.showchartsH = true;},500),
        // window.dispatchEvent(new Event('resize'))
        this.$refs.barritash.refresh();
          
      },
      valign(dia){
        return "align-top";
        /*if(this.horarioGrouped.hasOwnProperty(dia)){
          var h = parseInt(this.horarioGrouped[dia][0].hr_hora_inicio.substring(0, 2));
         return (h>=14 ? "align-bottom" : "align-top")
        }*/
      },
      get_H(event, chartContext, config){
            console.log("click")
            console.log(this.sedes[config.dataPointIndex]);
            this.sede = this.sedes[config.dataPointIndex].sede;
            // let sede = this.sede;
            // store.commit('SET_selectedSede',{sede});
        },
    
    }
}