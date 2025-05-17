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

    <div id="modalSelectContainer"></div>

    <ul>
      <li v-for="(setting, index) of settings" @click="openModal(index)">
        <h2>{{setting.title}}</h2>
        <p>{{findSelected(setting.options, setting.selected)}}</p>
      </li>
    </ul>

    <ModalSelect
      :title="settings[0].title"
      :selected="settings[0].selected"
      :options="settings[0].options"
    ></ModalSelect>
  `,
  methods: {
    goBack: function() {
      this.$router.back()
    },
    findSelected: function(options, id) {
      let result = ''
      
      options.forEach(item => {
        if(item.id == id) {
          result = item.name
          return
        }
      })

      return result
    },
    openModal: function(index) {
      const $modalContainer = document.querySelector('#modalSelectContainer')
      
      $modalContainer.innerHTML = `
        
      `
    }
  }
}