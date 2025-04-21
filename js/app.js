const app = Vue.createApp({
  data() {
    return {
      section: localStorage.getItem('section') ?? 'home',
      formData: {
        petName: '', // Nombre del bichín
        petType: '', // Gato, perro, iguana, etc
        petBirthdate: '', // Fecha de nacimiento
        petBehavior: '', // Comportamiento: (miedoso, adhd, etc)
        petLoveLevel: '', // Qué tan cariñoso/a es tu mascota
      }
    }
  },
  methods: {
    setSection: function(newSection) {
      this.section = newSection
      localStorage.setItem('section', newSection)
    }
  }
})

app.component('form-input', {
  data() {
    return {
      isInvalid: false,
      errorMessage: '',
      validationTimer: 0 // 
    }
  },
  props: ['id', 'name', 'value'],
  template: `
    <div>
      <label :for="id">{{name}}</label>
      <input :id="id" type="text" v-model="value" @input="validateInput(value)" :aria-invalid="isInvalid" :aria-describedby="id + 'Error'">
      <small :id="id + 'Error'">
        {{errorMessage}}
      </small>
    </div>
  `,
  methods: {
    validateInput: function(value) {
      if(this.validationTimer) clearTimeout(this.validationTimer)

      this.validationTimer = setTimeout(() => {
        // Después de 400ms, hace la validación
        console.log('Se está ejecutando la validación')

        this.errorMessage = ''
        this.isInvalid = false
      }, 400)
    }
  }
})

app.component('form-horoscope', {
  data() {
    return {
      formData: this.getFormDataFromLocalStorage() ?? {
        petName: '', // Nombre del bichín
        petType: '', // Gato, perro, iguana, etc
        petBirthdate: '', // Fecha de nacimiento
        petBehavior: '', // Comportamiento: (miedoso, adhd, etc)
        petLoveLevel: '', // Qué tan cariñoso/a es tu mascota
      },
      petTypes: {
        'dog': {
          'name': 'Perro'
        },
        'cat': {
          'name': 'Gato'
        }
      },
      petBehaviors: {
        'pillin': {
          'src': 'brave.gif',
          'alt': 'Tu mascotita es súper valiente :)'
        },
        'furioso': {
          'src': 'stable.gif',
          'alt': 'Animal estable'
        }
      }
    }
  },
  template: `
    <form action="#" @submit.prevent="validateForm()">
      <p>petName: {{formData.petName}}</p>

      <form-input id="name" name="Nombre de tu mascota" :value="formData.petName"></form-input>

      <div>
        <select name="type">
          <option selected hidden>Selecciona la mascota</option>
          <template v-for="(item, key) in this.petTypes">
            <option :value="key">{{item.name}}</option>
          </template>
        </select>
      </div>

      <div>
        <p>¿Cuál de los siguientes memes representa mejor a tu mascota?</p>

        <template v-for="(item, key) in this.petBehaviors">
          <label>
            <input type="radio" name="behavior">
            <span>
              <img :src="'img/behaviours/' + item.src" :alt="item.alt">
            </span>
          </label>
        </template>
      </div>

      <button>Ver Resultados</button>
    </form>
  `,
  methods: {
    validateForm: function() {
      console.log('Formulario enviado')
    },
    getFormDataFromLocalStorage: function() {

    },
    updateLocalStorage: function() {

    }
  }
})

app.mount('#app')