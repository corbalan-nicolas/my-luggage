'use strict'

// APP |> ROOT
const app = Vue.createApp({
  data() {
    return {
      
    }
  }
})

// ROUTER
app.use(router)

// COMPONENTS
app.component('Icon', componentIcon)
app.component('Form', componentForm)

// VIEWS
app.component('Home', viewHome)
app.component('Luggage', viewLuggage)
app.component('QrScanner', viewQrScanner)
app.component('Settings', viewSettings)

// MOUNT
app.mount('#app')