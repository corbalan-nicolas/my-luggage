'use strict'

const componentLuggageQr = {
  props: ['qr-data'],
  template: `
    <div class="qr-container">
      <img
        id="qr" 
        class="qr-container__qr"
        :src="'https://api.qrserver.com/v1/create-qr-code/?charse-source=UTF-8&data=' + qrData + '&amp;size=500x500'"
        alt="Código qr para escanear"
        title=""
      />
      
      <div id="loading">
        <Icon name="loading" size="48" stroke-width="1.5"></Icon>
        <p>Generando código QR</p>
      </div>
    </div>
  `,
  mounted: function() {
    const $qr = document.querySelector('#qr')
    const $loading = document.querySelector('#loading')

    $qr.onload = () => {
      $loading.remove()
      $qr.classList.add('fade-in')
    }
  }
  // beforeMount: function() {
  //   const img = document.querySelector('#qr')

  //   img.addEventListener('load', () => {
  //     console.log('Imagen cargada')
  //     document.querySelector('#loading').remove()
  //   })
  // }
}

/*
<img 
  class="download-indicator__qrcg-loader"
  src="https://qrcg-free-editor.qr-code-generator.com/latest/assets/images/download-modal/QR2.svg"
  data-uw-rm-alt-original=""
  role="presentation" alt=""
  data-uw-rm-alt="SVG"
>


*/