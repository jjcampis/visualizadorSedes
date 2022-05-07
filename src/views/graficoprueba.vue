<template>
  <div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>

export default {

      data:()=>{
          return{
              colors:['#dc3545','#28a745','#ffc107'],
          series: [{
            name: 'Website Blog',
            type: 'column',
            data: [-40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 57, 60,
            40, 55, 44, 71, 22, 13, 21, 52, 72, 32, 57, 16,
            40, 55, 44, 71, 22, 13, 21, 52, 72, 32, 57, 16,
            40, 55, 44, 71, 22, 13, 21, 52, 72, 32, 57, 16,
            40, 55, 44, 71, 22, 13, 21, 52, 72, 32, 57, 16,
            40, 55, 44, 71, 22, 13, 21, 52, 72, 32, 57, 16]
          },
          {
            name: 'Personal',
            type: 'column',
            data: [40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10]
          }, {
            name: 'Social Media',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10,
            40, 5, 14, 71, 27, 13, 1, 52, 52, 20, 27, 10]
          }],
       
       
       chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              stacked: false,
            },
            stroke: {
              width: [9, 9, 5],
            },
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            },
            
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
            labels: [
            '01/01/2003', '02/01/2003', '03/01/2003', 
            '04/01/2003', '05/01/2003', '06/01/2003', 
            '07/01/2003', '08/01/2003', '09/01/2003',
            ],
            dataLabels: {
              enabled: true,
              enabledOnSeries: [2]
            },
            markers: {
              size: 0
            },
            xaxis: {
              type: 'string'
            },
            yaxis: {
              title: {
                text: 'Points',
              },
              min: 0
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                  }
                  return y;
            
                }
              }
            }
          },
       
       
       //   chartOptions: {
        //     chart: {
        //       height: 350,
        //       type: 'line',
        //     },
        //     stroke: {
        //       width: [0, 4]
        //     },
        //     title: {
        //       text: 'Traffic Sources'
        //     },
        //     dataLabels: {
        //       enabled: true,
        //       enabledOnSeries: [1]
        //     },
        //     labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
        //     xaxis: {
        //       type: 'datetime'
        //     },
        //     yaxis: [{
        //       title: {
        //         text: 'Website Blog',
        //       },
            
        //     }, {
        //       opposite: true,
        //       title: {
        //         text: 'Social Media'
        //       }
        //     }]
        //   }

      }
      }
}
</script>

<style>

</style>