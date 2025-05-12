'use strict'

const viewLuggage = {
  data() {
    return {
      isEditing: false,
      isSharing: false,

      id: '',
      title: '',
      items: []
    }
  },
  template: `
    <template v-if="id === ''">
      <p>No se pudo encontrar el equipaje seleccionado</p>
    </template>

    <template v-else>
      <h1>{{title}}</h1>

      <small>#{{id}}</small>
    </template>
  `,
  created: function() {
    const selectedLuggage = localStorage.getItem('selectedLuggage') ?? ''

    if(selectedLuggage === '') {
      this.id = selectedLuggage
      return
    }

    const allLuggages = JSON.parse(localStorage.getItem('luggages'))
  }
}