// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
          light: {
            primary: '#ccc',
            caretColor:'#bd1919',
            secondary: '#b0bec5',
            anchor: '#8c9eff',
          },
        },
      }



}

export default new Vuetify(opts)