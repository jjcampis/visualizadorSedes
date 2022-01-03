<template>
   <div>
     <apexchart type="pie" width="100%" :options="chartOptionsp" :series="series"></apexchart>
   </div>
</template>

<script>
export default {
    props:['series','etiquetas'],
    data: function() {
      return {
        //seriesp: [44, 55, 13, 43],
        chartOptionsp: {
            chart: {
              width: "100%",//100% y en responsive era 430
              type: 'pie',
              toolbar: {
        show: true,
        offsetX: -10,
        offsetY: 0,
        /* tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        } */
        }
            },
            // colors: ['#690E2C', '#EC6592', '#E91E63', '#692D41','#B5184C'],
            // colors: ['#700303', '#BDBB2B', '#BD1919', '#0676BD','#094870'],//triada
            colors: ['#BD4F22', '#5EBD2B', '#BD1919', '#06BDA1','#BD0FBD'],//doble separacion complementaria
            //labels: ['TrendKids', 'TecnoKids', 'MakerJuniors', 'TeenMakers'],
            labels: this.etiquetas,
            dataLabels:{
                background: {
                    enabled: false,
                    foreColor: '#fff',
                    padding: 15,
                    borderRadius: 2,
                    borderWidth: 2,
                    borderColor: '#000',
                    opacity: 1,
                },
                dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 2,
                    color: '#000',
                    opacity: 1
                },

                style: {
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: ['#fff']
                },
                formatter: function(val, opt) {
                    // console.log(val);
                    // console.log(opt);
                    //para separar el label y el porcentaje devuelvo un vector
                    return [opt.w.globals.labels[opt.seriesIndex],val.toFixed(1)+"%"];
                }
            },
            legend: {
                /*
                * @param {string} seriesName - The name of the series corresponding to the legend
                * @param {object} opts - Contains additional information as below
                * opts: {
                *   seriesIndex
                *   w: {
                *     config,
                *     globals  
                *   },
                * }
                */
               
                horizontalAlign: 'left',
                formatter: function(seriesName, opts) {
                    return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]]
                }
            },
            responsive: [{
              breakpoint: 680,
              options: {
                chart: {
                  width: "100%"
                },
                style: {
                    fontSize: '5px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: ['#fff']
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
        }
      },
}
</script>
<style>
.apexcharts-legend.apx-legend-position-right{
  align-items: flex-start;
}
</style>