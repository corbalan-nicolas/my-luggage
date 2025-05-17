'use strict'

const componentModalSelect = {
  props: ['title', 'options', 'selected'],
  emits: ['response'],
  template: `
    <div id="modalSelectContainer" class="modal-select__container" @click="closeModal(null)">
      <div class="modal-select__modal" @click.stop>
        <div class="modal-select__body">
          <p class="modal-select__title">{{title}}</p>

          <form @change="closeModal(true)">
            <ul class="list">
              <li v-for="item of options">
                <label class="list__item list__padding--y">
                  <span>{{item.name}}</span>
                  <input type="radio" name="option" :value="item.id" :checked="selected == item.id? 'true': ''">
                </label>
              </li>
            </ul>
          </form>
        </div>

        <button class="modal-select__footer" @click="closeModal(null)">Cancelar</button>
      </div>
    </div>
  `,
  methods: {
    closeModal: function(emitValue) {
      const $modal = document.querySelector('#modalSelectContainer')
      
      $modal.classList.add('modal-select--close')
      // console.log('function')
      $modal.addEventListener('animationend', event => {
        // console.log('Event animationend')
        if(event.animationName == 'fade-out') {
          // console.log('Remove')
          $modal.remove()
          // this.$emit('response', emitValue)
        }
      })
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert