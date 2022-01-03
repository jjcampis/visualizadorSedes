<template>

  <div id="app" class="container text-center">
      <!-- <pdf ref="otro_ref_re_loco" v-if="cargado"></pdf> -->

<transition name="fade">
<div v-if="cargado">
     <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <p>ALOJAX!</p>
            
              <b-table hover :items="items"></b-table>
            
        </section>
    </vue-html2pdf>
    <b-button @click="generateReport">descarga</b-button>
   </div>
</transition>

<download-excel :data="items" type="csv">
  Download Data
</download-excel>;

  <h4 class=""><strong>Example to Print div in Vue</strong></h4>
  <div><a href="http://techformist.com/save-div-image-javascript" target="_blank">Accompanying Blog Post</a>
  </div>
  <button @click="printThis">Print!</button>
<v-btn
      tile
      color="success"
      @click="printThis"
    >
      <v-icon left>
        mdi-printer
      </v-icon>
      Edit
    </v-btn>

  <div style="height: 300px; overflow:scroll" class="text-center" ref="printcontent">
    <div>
      <strong>Example content to print</strong>
    </div>
    <div>
      <div>
        <b-table hover :items="items"></b-table>
      </div>
    </div>
  </div>
  
  <pie></pie>

  </div>
</template>

    </div>
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
    </svg>

  </div>
</div>
</template>

<script>
import pie from "@/components/pie";
import pdf from "@/components/pdf";
import VueHtml2pdf from 'vue-html2pdf'

import JsonExcel from "vue-json-excel";
export default {
  components:{
    pie,
    pdf,
    "downloadExcel":JsonExcel,//le doy un alias al componente
    VueHtml2pdf
  },
        data() {
      return {
        cargado: false,
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _rowVariant: 'danger'
          },
          {
            age: 40,
            first_name: 'Thor',
            last_name: 'MacDonald',
            _cellVariants: { age: 'info', first_name: 'warning' }
          },
          { age: 29, first_name: 'Dick', last_name: 'Dunlap' },
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _rowVariant: 'danger'
          },
          {
            age: 40,
            first_name: 'Thor',
            last_name: 'MacDonald',
            _cellVariants: { age: 'info', first_name: 'warning' }
          },
          { age: 29, first_name: 'Dick', last_name: 'Dunlap' },
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _rowVariant: 'danger'
          },
          {
            age: 40,
            first_name: 'Thor',
            last_name: 'MacDonald',
            _cellVariants: { age: 'info', first_name: 'warning' }
          },
          { age: 29, first_name: 'Dick', last_name: 'Dunlap' },
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _rowVariant: 'danger'
          },
          {
            age: 40,
            first_name: 'Thor',
            last_name: 'MacDonald',
            _cellVariants: { age: 'info', first_name: 'warning' }
          },
          { age: 29, first_name: 'Dick', last_name: 'Dunlap' }
          
        ]
      }
    },
    mounted(){
      setTimeout(() => {
        this.cargado = true;
      }, 500);
    },
      methods: {

generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },

    async printThis() {
      console.log("printing..");
      const el = this.$refs.printcontent;
      let actualHeight = el.style.height;
      el.style.height = "100vh";

      const options = {
        type: "dataURL",
        /* scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: el.offsetWidth,
        windowHeight: el.offsetHeight */
      };
      const printCanvas = await this.$html2canvas(el, options).then(console.log("MAGICx"))/* .then(
        el.style.height = actualHeight
      ); */
//console.log(printCanvas);

      const link = document.createElement("a");
      link.setAttribute("download", "download.png");
      link.setAttribute(
        "href", printCanvas
      );
      link.click();
      console.log("done");
      el.style.height = actualHeight//necesito cambiar el tamaño para que imprima todo 
    }
  }
}
</script>

<style>

</style>