const radarOptions={
    chart: {
      height: 350,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    title: {
      text: 'Radar Chart - Multi Series'
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 0
    },
     xaxis: {
       categories:[]
    },
    /* xaxis: {
      type: 'string',
      // categories: ['2011', '2012', '2013', '2014', '2015', '2016']
    } */
}
export { radarOptions };