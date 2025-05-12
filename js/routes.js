'use strict'

// Definimos los componentes
const routeHome = {
  name: 'home',
  template: '<Home></Home>'
}

const routeLuggage = {
  name: 'luggage',
  template: '<Luggage></Luggage>'
}

const routeQrScanner = {
  name: 'qrScanner',
  template: '<QrScanner></QrScanner>'
}

const routeSettings = {
  name: 'settings',
  template: '<Settings></Settings>'
}

const route404 = {
  name: '404',
  template: `
    <h1>Error 404</h1>
    <p>Página no encontrada</p>
    <router-link to="/">Volver al inicio</router-link>
  `
}

// Asociamos las rutas con los componentes
const routes = [
  {
    path: '/',
    component: routeHome
  },
  {
    path: '/index.html',
    component: routeHome
  },
  {
    path: '/luggage',
    component: routeLuggage
  },
  {
    path: '/qr-scanner',
    component: routeQrScanner
  },
  {
    path: '/settings',
    component: routeSettings
  },
  {
    path: '/:pathMatch(.*)*',
    component: route404
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})