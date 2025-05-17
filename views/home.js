'use strict'

const viewHome = {
  data() {
    return {
      isEditing: false,
      luggages: []
    }
  },
  template: `
    <div class="view-list">
      <h1>Mis equipajes</h1>
      <Form @form-submit="createLuggage" placeholder="Añadir equipaje"></Form>

      <ul class="view-actions">
        <li>
          <label>
            <Icon name="pencil"></Icon>
            <input class="sr-only" type="checkbox" v-model="isEditing">
          </label>
        </li>
      </ul>

      <div v-if="luggages.length <= 0">
        <img src="img/person-looking-at-papers.webp" alt="Persona mirando a unos papeles vacíos">
        <p>No tenés ningún equipaje para mostrar</p>
      </div>

      <div v-else>
        <ul class="list">
          <li class="list__item list__item--dot" v-for="(item, index) of luggages" @click="viewLuggage(item.id)">
            <input :class="isEditing? 'list__padding': 'list__padding pointer-events-none'" type="text" v-model="item.title" @input="updateLocalStorage()" :disabled="!isEditing">
            <div v-show="isEditing">
              <button @click="deleteLuggage(index)">
                <Icon touch-area="false" name="trash"></Icon>
                <span class="sr-only">Eliminar equipaje</span>
              </button>
              <!--<button>
                <Icon touch-area="false" name="menu"></Icon>
                <span class="sr-only">Mover de posición</span>
              </button>-->
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  methods: {
    createLuggage: function(title) {
      this.luggages.push({
        id: Date.now().toString(36) + Math.random().toString(36),
        title,
        items: []
      })

      this.updateLocalStorage()
    },
    viewLuggage: function(selectedLuggage) {
      if(this.isEditing) return

      localStorage.setItem('selectedLuggage', selectedLuggage)
      this.$router.push('/luggage')
    },
    updateLocalStorage: function() {
      localStorage.setItem('luggages', JSON.stringify(this.luggages))
    },
    deleteLuggage: function(index) {
      this.luggages.splice(index, 1)
      this.updateLocalStorage()
    }
  },
  created: function() {
    let luggages = JSON.parse(localStorage.getItem('luggages')) ?? [
      {
        'id': 'm9uu5mlb0.8hu6uk3haz4',
        'title': 'Tu primer equipaje',
        'items': [
          {
            'name': 'Este es un equipaje de muestra',
            'checked': false
          },
          {
            'name': 'Puedes crear items',
            'checked': true
          }
        ]
      }
    ]

    this.luggages = luggages
    this.updateLocalStorage()
  },
  mounted: function() {
    // console.log('mounted')
    // const settings = [
    //     {
    //       title: 'Idiomas',
    //       selected: 2,
    //       options: [
    //         {
    //           id: 1,
    //           name: 'Español'
    //         },
    //         {
    //           id: 2,
    //           name: 'English'
    //         }
    //       ]
    //     }
    //   ]
    // const modal = document.createElement('ModalSelect')
    // console.log(modal)
    // document.body.append(modal)
  }
}