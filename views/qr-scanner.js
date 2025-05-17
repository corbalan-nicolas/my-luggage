'use strict'

const viewQrScanner = {
  data() {
    return {
      QrScanner: '',
      data: '',
      hasScanned: false
    }
  },
  template: `
    <h1>Importar un equipaje</h1>
    <div class="camera-container">
      <div class="camera">
        <video class="camera__video" id="videoElement"></video>

        <div class="camera__list">
          <select id="cameraList"></select>
        </div>

        <button class="camera__close" @click="stopScanner()">
          <Icon name="x"></Icon>
          <span class="sr-only">Cancelar escaneo</span>
        </button>
      </div>
    </div>

    <div v-if="hasScanned">
      <h3>Se escanearon los siguientes datos</h3>
      <p>{{data.title}}</p>
      <ul>
        <li v-for="item of data.items">
          {{item}}
        </li>
      </ul>

      <p>¿Quieres continuar?</p>
      <button @click="startScanner">Volver a escanear</button>
      <button @click="confirm">Confirmar</button>
    </div>

    <button v-else @click="startScanner">Empezar a scanear</button>
  `,
  methods: {
    startScanner: function() {
      const $cameraList = document.querySelector('#cameraList')

      document.querySelector('.camera-container').classList.add('active')
      this.QrScanner.start()
    },
    stopScanner: function() {
      this.QrScanner.stop()
      document.querySelector('.camera-container').classList.remove('active')
    },
    decodeLuggage: function(data) {
      this.hasScanned = true
      this.data = JSON.parse(data.data)

      document.querySelector('.camera-container').classList.remove('active')
      this.QrScanner.stop()

      console.log(this.data)
    },
    confirm: function() {
      const newLuggage = ({
        id: Date.now().toString(36) + Math.random().toString(36),
        title: this.data.title,
        items: this.data.items.map(item => {
          return {
            name: item,
            checked: false
          }
        }, [])
      })

      const allLuggages = JSON.parse(localStorage.getItem('luggages'))
      allLuggages.push(newLuggage)
      localStorage.setItem('luggages', JSON.stringify(allLuggages))

      this.$router.push('/')
    }
  },
  mounted: function() {
    const videoElement = document.querySelector('#videoElement')
    const qrScanner = new QrScanner(videoElement, this.decodeLuggage, { 
        returnDetailedScanResult: true,
        highlightCodeOutline: true,
      },
    )

    this.QrScanner = qrScanner
    // qrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
    //   console.log(camera)
    // }))
  }
}


// https://github.com/nimiq/qr-scanner