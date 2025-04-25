const MAX_LENGTH = 50 // Variable para definir el máximo de caracteres por item & equipajes (fácilmente salteable editándolos posteriormente)
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
    let luggages = JSON.parse(localStorage.getItem('luggages'))
    if(!luggages) {
      luggages = [
        {
          id: 'm9uexp220.q6plnfhjzr',
          title: 'Equipaje de ejemplo',
          items: [
            {
              name: '✨ Esto es una lista básica (default)',
              checked: true
            },
            {
              name: '➕ Te permite añadir items',
              checked: true
            },
            {
              name: '✅ Marcarlos como "listos" (click)',
              checked: true
            },
            {
              name: '✍ Editarlos',
              checked: false
            },
            {
              name: '🚮 Eliminarlos permanentemente',
              checked: false
            },
            {
              name: '🔃 Y resetearlos todos a 0 ("sin equipar")',
              checked: true
            },
            {
              name: '👨‍💻 ¡Pruébalo por ti mismo!',
              checked: false
            },
            {
              name: 'Espero que te sirva 💖',
              checked: true
            }
          ]
        }
      ]

      localStorage.setItem('luggages', JSON.stringify(luggages))
    }

    return {
      editModeIsOn: false,
      formData: {
        title: '',
        errorMessage: ''
      },
      luggages
    }
  },
  template: `
    <form action="#" method="post" @submit.prevent="createLuggage()">
      <div class="input-group">
        <input class="input-group__input" type="text" v-model="formData.title" placeholder="Añadir nuevo equipaje">
        <button class="input-group__button">
          <span class="sr-only">Añadir</span>
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        </button>
      </div>
      <small>{{formData.errorMessage}}</small>
    </form>

    <div class="view-options">
      <label class="view-options__option">
        <span class="sr-only">Activar / Desactivar modo edición</span>
        <input class="view-options__input" type="checkbox" v-model="editModeIsOn">
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
      </label>
    </div>

    <ul class="list" v-if="luggages.length">
      <li class="list__item" v-for="item of luggages" @click="readLuggage(item.id)">
        <input :class="editModeIsOn ? 'list__item-input': 'list__item-input pointer-events-none'" type="text" v-model="item.title" @blur="updateLocalStorage()" :disabled="!editModeIsOn">
        <button class="list__item-button" v-if="editModeIsOn" @click="deleteLuggage(item.id)">
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
    createLuggage: function() {
      this.formData.errorMessage = ''

      if(this.formData.title.trim() == '') {
        this.formData.errorMessage = 'No deje el campo vacío'
      }else if(this.formData.title.length > MAX_LENGTH) {
        this.formData.errorMessage = `Solo se admiten ${MAX_LENGTH} caracteres como máximo`
      }else {
        // Everything's good. Add the new luggage
        this.luggages.push({
          id: Date.now().toString(36) + Math.random().toString(36), // This creates a very random ID depending on the current date. Unless you're som kind of crazy machine, you won't get the same id
          title: this.formData.title,
          items: []
        })

        this.formData.title = ''
        this.updateLocalStorage()
      }
    },
    readLuggage: function(id) {
      if(this.editModeIsOn) return

      localStorage.setItem('view', 'luggage')
      localStorage.setItem('selectedLuggage', id)

      location.reload()
    },
    updateLocalStorage: function() {
      localStorage.setItem('luggages', JSON.stringify(this.luggages))
    },
    deleteLuggage: function(id) {
      this.luggages.forEach((item, index) => {
        if(item.id == id) {
          this.luggages.splice(index, 1)
          this.updateLocalStorage()
          return
        }
      })
    }
  }
})

app.component('view-luggage', {
  data() {
    let index = 0
    const allLuggages = JSON.parse(localStorage.getItem('luggages'))
    const luggageData = allLuggages.find((curr, i) => {
      if(curr.id == this.luggageId) {
        index = i
        return true
      }
    })

    return {
      editModeIsOn: false,
      formData: {
        name: '',
        errorMessage: ''
      },
      index,
      id: luggageData.id,
      title: luggageData.title,
      items: luggageData.items
    }
  },
  props: ['luggageId'],
  template: `
    <div class="view-header">
      <h1>{{cutStr(ucFirst(title), 22)}}</h1>

      <button @click="goBack()">
        <span class="sr-only">Cerrar (Volver al Inicio)</span>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
      </button>
    </div>

    <form action="#" method="post" @submit.prevent="createItem()">
      <div class="input-group">
        <input class="input-group__input" type="text" v-model="formData.name" placeholder="Añadir nuevo item">
        <button class="input-group__button">
          <span class="sr-only">Añadir</span>
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        </button>
      </div>
      <small>{{formData.errorMessage}}</small>
    </form>

    <div class="view-options">
      <button class="view-options__option" @click="resetItems()">
        <span class="sr-only">Resetear items</span>
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
      </button>  
      <label class="view-options__option">
        <span class="sr-only">Activar / Desactivar modo edición</span>
        <input class="view-options__input" type="checkbox" v-model="editModeIsOn">
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
      </label>
    </div>

    <ul class="list" v-if="items.length">
      <template v-for="(item, index) of items">
        <li @click="checkItem(index)" :class="item.checked ? 'list__item active' : 'list__item'">
            <input class="hidden" type="checkbox" v-model="item.checked" @change="updateLocalStorage()">
            <input :class="editModeIsOn ? 'list__item-input' : 'list__item-input pointer-events-none'" type="text" v-model="item.name" @blur="updateLocalStorage()" :disabled="!editModeIsOn">
            <button class="list__item-button" v-if="editModeIsOn" @click="deleteItem(index)">
              <svg width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
            </button>
        </li>
      </template>
    </ul>

    <div class="no-registers" v-else>
      <img src="img/person-looking-at-papers.webp" alt="Persona mirando a unos papeles vacíos">
      <p>No hay ningún item en este equipaje</p>
      <small>¡Añade tu primer item!</small>
    </div>

    <small># {{id}}</small>
  `,
  methods: {
    createItem: function() {
      this.formData.errorMessage = ''

      if(this.formData.name.trim() == '') {
        this.formData.errorMessage = 'No deje el campo vacío'
      }else if(this.formData.name.trim().length > MAX_LENGTH) {
        this.formData.errorMessage = `Sólo se admiten ${MAX_LENGTH} caracteres como máximo`
      }else {
        this.items.push({
          name: this.formData.name,
          checked: false
        })

        this.formData.name = ''
        this.updateLocalStorage()
      }
    },
    updateLocalStorage: function() {
      const allLuggages = JSON.parse(localStorage.getItem('luggages'))

      allLuggages[this.index].items = this.items

      localStorage.setItem('luggages', JSON.stringify(allLuggages))
    },
    deleteItem: function(index) {
      this.items.splice(index, 1)
      this.updateLocalStorage()
    },
    checkItem: function(index) {
      if(this.editModeIsOn) return

      this.items[index].checked = !this.items[index].checked
      this.updateLocalStorage()
    },
    resetItems: function() {
      this.items.forEach(item => {
        item.checked = false
      })

      this.updateLocalStorage()
    },
    goBack: function() {
      localStorage.setItem('view', 'home')

      location.reload()
    },
    ucFirst: function(value) {
      let result = value.split('')
      result[0] = result[0].toUpperCase()

      return result.join('')
    },
    cutStr: function(value, maxLength) {
      if(value.length <= maxLength) return value
      return value.split('').slice(0, maxLength).join('') + '...'
    }
  }
})

app.mount('#app')