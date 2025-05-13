'use strict'

// APP |> ROOT
const app = Vue.createApp({
  data() {
    return {
      settings: {
        theme: 'white'
      }
    }
  }
})

// ROUTER
app.use(router)

// COMPONENTS
app.component('Icon', componentIcon)
app.component('Form', componentForm)
app.component('LuggageQr', componentLuggageQr)
app.component('ModalSelect', componentModalSelect)

// VIEWS
app.component('Home', viewHome)
app.component('Luggage', viewLuggage)
app.component('QrScanner', viewQrScanner)
app.component('Settings', viewSettings)

// MOUNT
app.mount('#app')