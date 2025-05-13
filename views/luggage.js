'use strict'

const viewLuggage = {
  data() {
    return {
      isEditing: false,
      isSharing: false,

      index: '',
      id: '',
      title: '',
      items: []
    }
  },
  template: `
    <template v-if="id === ''">
      <p>No se pudo encontrar el equipaje seleccionado</p>
    </template>

    <div class="view-list" v-else>
      <header>
        <h1>{{title}}</h1>
        <button @click="goBack()">
          <Icon name="x"></Icon>
        </button>
      </header>
      <Form @form-submit="createItem" placeholder="Añadir ítem"></Form>

      <ul class="view-actions">
        <li>
          <label>
            <Icon name="share"></Icon>
            <input class="sr-only" type="checkbox" v-model="isSharing">
          </label>
        </li>
        <li @click="resetItems()">
          <label>
            <Icon name="reset"></Icon>
            <button class="sr-only">Resetear ítems</button>
          </label>
        </li>
        <li>
          <label>
            <Icon name="pencil"></Icon>
            <input class="sr-only" type="checkbox" v-model="isEditing">
          </label>
        </li>
      </ul>

      <div v-if="items.length <= 0">
        <img src="img/person-looking-at-papers.webp" alt="Persona mirando a unos papeles vacíos">
        <p>No tenés ningún ítem en este equipaje</p>
      </div>

      <div v-else-if="isSharing">
        <p>Compartir equipaje :)</p>
      </div>

      <div v-else>
        <ul class="list">
          <template v-for="(item, index) of items">
            <li :class="\`list__item list__item--dot \${item.checked? 'active': ''}\`"  @click="checkItem(index)">
              <input :class="\`list__padding \${isEditing? '':'pointer-events-none'}\`" type="text" v-model="item.name" @input="updateLocalStorage()" :disabled="!isEditing">
              <div v-show="isEditing">
                <button @click="deleteItem(index)">
                  <Icon touch-area="false" name="trash"></Icon>
                  <span class="sr-only">Eliminar equipaje</span>
                </button>
                <!--<button>
                  <Icon touch-area="false" name="menu"></Icon>
                  <span class="sr-only">Mover de posición</span>
                </button>-->
              </div>
            </li>
          </template>
        </ul>
      </div>
      
      <small class="luggage_id">#{{id}}</small>
    </div>
  `,
  methods: {
    createItem: function(name) {
      this.items.push({
        name,
        checked: false
      })

      this.updateLocalStorage()
    },
    updateLocalStorage: function() {
      const allLuggages = JSON.parse(localStorage.getItem('luggages'))
      const currentLuggage = allLuggages[this.index]

      currentLuggage.items = this.items
      allLuggages.splice(this.index, 1, currentLuggage)

      localStorage.setItem('luggages', JSON.stringify(allLuggages))
    },
    checkItem: function(index) {
      if(this.isEditing) return

      this.items[index].checked = !this.items[index].checked
      this.updateLocalStorage()
    },
    resetItems: function() {
      this.items.forEach(elem => elem.checked = false)
      this.updateLocalStorage()
    },
    deleteItem: function(index) {
      this.items.splice(index, 1)
      this.updateLocalStorage()
    },
    goBack: function() {
      this.$router.back()
    }
  },
  created: function() {
    const selectedLuggage = localStorage.getItem('selectedLuggage') ?? ''

    if(selectedLuggage === '') {
      this.id = selectedLuggage
      return
    }

    const allLuggages = JSON.parse(localStorage.getItem('luggages'))
    let index = 0
    const result = allLuggages.find((elem, i) => {
      if(elem.id === selectedLuggage) {
        index = i
        return true
      }
    })

    if(!result) return
    this.index = index
    this.id = result.id
    this.title = result.title
    this.items = result.items
  }
}