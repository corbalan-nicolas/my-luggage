'use strict'

const viewSettings = {
  data() {
    return {
      
    }
  },
  template: `
    <header>
      <h1>Configuración</h1>
      <button @click="goBack()">
        <Icon name="x"></Icon>
        <span class="sr-only">Volver</span>
      </button>
    </header>
  `,
  methods: {
    goBack: function() {
      this.$router.back()
    }
  }
}