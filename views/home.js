'use strict'

const viewHome = {
  data() {
    return {
      isEditing: false,
      luggages: []
    }
  },
  template: `
    <h1>Lista de equipajes</h1>
    <Form @form-submit="createLuggage" placeholder="Añadir equipaje"></Form>

    <ul>
      <li>
        <label>
          <Icon name="pencil"></Icon>
          <input class="sr-only" type="checkbox" v-model="isEditing">
        </label>
      </li>
    </ul>

    <ul>
      <li v-for="item of luggages" @click="viewLuggage(item.id)">
        <input :class="isEditing? '': 'pointer-events-none'" type="text" v-model="item.title" :disabled="!isEditing">
        <button v-show="isEditing">
          <Icon name="trash"></Icon>
        </button>
      </li>
    </ul>
  `,
  methods: {
    createLuggage: function(title) {
      this.luggages.push({
        id: Date.now(),
        title,
        items: []
      })
    },
    updateLocalStorage: function() {
      localStorage.setItem('luggages', JSON.stringify(this.luggages))
    },
    viewLuggage: function(selectedLuggage) {
      if(this.isEditing) return

      localStorage.setItem('selectedLuggage', selectedLuggage)
      this.$router.push('/luggage')
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
  }
}