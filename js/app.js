const app = Vue.createApp({
  data() {
    return {
      view: localStorage.getItem('view') ?? 'home', // ej: home || equipaje
      selectedLuggage: localStorage.getItem('selectedLuggage') ?? ''
      //...
    }
  },
  methods: {
    setView: function(view) {
      //...
      this.view = view
      localStorage.setItem('view', view)
    }
  }
})

app.component('view-home', {
  data() {
    return {
      editModeIsOn: false,
      formData: {
        title: '',
        errorMessage: ''
      },
      luggages: this.getLuggages()
    }
  },
  template: `
    <form action="#" method="post" @submit.prevent="addLuggage()">
      <div class="input-group">
        <input class="input-group__input" type="text" v-model="formData.title" placeholder="Añadir nuevo equipaje">
        <button class="input-group__button" aria-labelledby="Añadir">
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        </button>
      </div>
      <small>{{formData.errorMessage}}</small>
    </form>

    <div class="view-options">
      <label class="view-options__option">
        <input class="view-options__input" type="checkbox" v-model="editModeIsOn">
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
      </label>
    </div>

    <ul class="list" v-if="luggages.length">
      <li class="list__item" v-for="item of luggages" @click="viewLuggage(item.id)">
        <input :class="editModeIsOn ? 'list__item-input': 'list__item-input pointer-events-none'" type="text" v-model="item.title" @blur="updateLuggages()" :disabled="!editModeIsOn">
        <button class="list__item-button" v-if="editModeIsOn" @click="removeLuggage(item.id)">
          <svg width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </button>
      </li>
    </ul>

    <div class="no-registers" v-else>
      <img src="img/person-looking-at-papers.webp" alt="Persona mirando a unos papeles vacíos">
      <p>No tienes ningún equipaje registrado</p>
      <small>¡Añade tu primer equipaje!</small>
    </div>
  `,
  methods: {
    addLuggage: function() {
      this.formData.errorMessage = ''

      if(this.formData.title.trim() == '') {
        this.formData.errorMessage = 'Complete el campo antes de añadir el nuevo equipaje'
      }else {
        // Everything's good. Add the new luggage
        this.luggages.push({
          id: Date.now().toString(36) + Math.random().toString(36), // This creates a very random ID depending on the current date. Unless you're som kind of crazy machine, you won't get the same id
          title: this.formData.title,
          items: []
        })

        this.formData.title = ''
        this.updateLuggages()
      }
    },
    removeLuggage: function(id) {
      this.luggages.forEach((item, index) => {
        if(item.id == id) {
          this.luggages.splice(index, 1)
          this.updateLuggages()
          return
        }
      })
    },
    getLuggages: function() {
      let luggages = JSON.parse(localStorage.getItem('luggages'))
      if(luggages) {
        return luggages
      }else {
        luggages = [
          {
            id: 'm9uexp220.q6plnfhjzr',
            title: 'Equipaje de muestra',
            items: [
              {
                name: 'Item listo en tu equpaje',
                checked: true
              },
              {
                name: 'Item sin equipar',
                checked: false
              }
            ]
          }
        ]

        localStorage.setItem('luggages', JSON.stringify(luggages))
      }
      return luggages
    },
    updateLuggages: function() {
      localStorage.setItem('luggages', JSON.stringify(this.luggages))
    },
    viewLuggage: function(luggageId) {
      if(this.editModeIsOn) {
        return
      }

      localStorage.setItem('view', 'luggage')
      localStorage.setItem('selectedLuggage', luggageId)

      location.reload()
    }
  }
})

app.component('view-luggage', {
  data() {
    return {
      editModeIsOn: false,
      formData: {
        name: '',
        errorMessage: ''
      },
      items: this.getItems() ?? []
    }
  },
  props: ['luggageId'],
  template: `
    <div class="view-header">
      <h1>{{ucFirst(this.getTitle())}}</h1>
      <button aria-labelledby="Cerrar equipaje" @click="closeView()">
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
      </button>
    </div>

    <form action="#" method="post" @submit.prevent="addItem()">
      <div class="input-group">
        <input class="input-group__input" type="text" v-model="formData.name" placeholder="Añadir nuevo item">
        <button class="input-group__button" aria-labelledby="Añadir">
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        </button>
      </div>
      <small>{{formData.errorMessage}}</small>
    </form>

    <div class="view-options">
      <button class="view-options__option" aria-labelledby="Resetear items" @click="resetItems()">
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
      </button>  
      <label class="view-options__option">
        <input class="view-options__input" type="checkbox" v-model="editModeIsOn">
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
      </label>
    </div>

    <ul class="list" v-if="items.length">
      <template v-for="(item, index) of items">
        <li>
          <label :class="item.checked ? 'list__item active' : 'list__item'">
            <input class="hidden" type="checkbox" v-model="item.checked" @change="updateLocalStorage()">
            <input :class="editModeIsOn ? 'list__item-input' : 'list__item-input pointer-events-none'" type="text" v-model="item.name" @blur="updateLocalStorage()" :disabled="!editModeIsOn">
            <button class="list__item-button" v-if="editModeIsOn" @click="removeItem(index)">
              <svg width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
            </button>
          </label>
        </li>
      </template>
    </ul>

    <div class="no-registers" v-else>
      <img src="img/person-looking-at-papers.webp" alt="Persona mirando a unos papeles vacíos">
      <p>No hay ningún item en este equipaje</p>
      <small>¡Añade tu primer item!</small>
    </div>

    <small># {{luggageId}}</small>
  `,
  methods: {
    getIndex: function() {
      const luggages = JSON.parse(localStorage.getItem('luggages'))
      let result;

      luggages.forEach((item, index) => {
        if(item.id == this.luggageId) {
          result = index
        }
      })

      return result;
    },
    getTitle: function() {
      const luggages = JSON.parse(localStorage.getItem('luggages'))
      let result;

      luggages.forEach((item, index) => {
        if(item.id == this.luggageId) {
          result = item.title
        }
      })

      return result;
    },
    getItems: function() {
      const luggages = JSON.parse(localStorage.getItem('luggages'))
      const index = this.getIndex();

      return luggages[index].items
    },
    addItem: function() {
      this.formData.errorMessage = ''

      if(this.formData.name.trim() == '') {
        this.formData.errorMessage = 'No deje el campo vacío'
      }else {
        // Everything's good. Add the new item
        this.items.push({
          name: this.formData.name,
          checked: false
        })

        this.formData.name = ''
        this.updateLocalStorage()
      }
    },
    removeItem: function(index) {
      this.items.splice(index, 1)
      this.updateLocalStorage()
    },
    resetItems: function() {
      this.items.forEach(item => {
        item.checked = false
      })

      this.updateLocalStorage()
    },
    updateLocalStorage: function() {
      const luggages = JSON.parse(localStorage.getItem('luggages'))
      const index = this.getIndex();

      luggages[index].items = this.items

      localStorage.setItem('luggages', JSON.stringify(luggages))
    },
    closeView: function() {
      localStorage.setItem('view', 'home')

      location.reload()
    },
    ucFirst: function(value) {
      return value.split('')[0].toUpperCase() + value.split('').slice(1).join('')
    }
  }
})

app.mount('#app')