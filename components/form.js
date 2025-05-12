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
    <form @submit.prevent="emitForm()">
      <div>
        <input class="main-form" type="text" :placeholder="placeholder" v-model="formValue">
        <button>
          <Icon name="plus" touch-area="false"></Icon>
          <span class="sr-only">Añadir</span>
        </button>
      </div>
      <small>{{formError}}</small>
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

      this.$emit('form-submit', value)
    }
  }
})