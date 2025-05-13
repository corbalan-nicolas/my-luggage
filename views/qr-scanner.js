'use strict'

const viewQrScanner = {
  template: `
    <h1>Importar un equipaje</h1>
    <input type="camera">

    <input
      type="file"
      id="picture"
      name="picture"
      accept="image/*"
      capture="environment"
    />

    <h2>Esta sección está en proceso :)</h2>
  `
}


// https://github.com/nimiq/qr-scanner