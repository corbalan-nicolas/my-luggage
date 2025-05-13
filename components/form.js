'use strict'

const componentForm = ({
  data() {
    return {
      formValue: '',
      formError: ''
    }
  },
  props: ['placeholder'],
  emits: ['form-submit'],
  template: `
    <form class="form" @submit.prevent="emitForm()">
      <div class="form__inputs">
        <input class="form__inputs-input" type="text" :placeholder="placeholder" v-model="formValue">
        <button class="form__inputs-button">
          <Icon name="plus" touch-area="false"></Icon>
          <span class="sr-only">Añadir</span>
        </button>
      </div>
      <small class="form__error">{{formError}}</small>
    </form>
  `,
  methods: {
    emitForm: function() {
      const value = this.formValue.trim()
      this.formError = ''

      if(value === '') {
        this.formError = 'No dejes el campo vacío'
        return
      }

      this.formValue = ''
      this.$emit('form-submit', value)
    }
  }
})