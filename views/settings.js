'use strict'

const viewSettings = {
  data() {
    return {
      settings: [
        {
          title: 'Idiomas',
          selected: 2,
          options: [
            {
              id: 1,
              name: 'Español'
            },
            {
              id: 2,
              name: 'English'
            }
          ]
        }
      ]
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

    <ul>
      <li v-for="setting of settings" @click="">
        <h2>{{setting.title}}</h2>
        <p>{{findSelected(setting.options, setting.selected)}}</p>
      </li>
    </ul>
  `,
  methods: {
    goBack: function() {
      this.$router.back()
    },
    findSelected(options, id) {
      let result = ''
      
      options.forEach(item => {
        if(item.id == id) {
          result = item.name
          return
        }
      })

      return result
    }
  }
}