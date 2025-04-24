// VARIABLES
const CACHE_VERSION = '1.0.2 MVP'
const CACHE_FILES = [
  "/",
  "index.html",
  "css/styles.css",
  "img/icons/icon-192x192.webp",
  "img/icons/icon-512x512.webp",
  "img/icons/favicon-16x16.png",
  "img/icons/favicon-32x32.png",
  "img/icons/favicon-96x96.png",
  "img/person-looking-at-papers.webp",
  "js/app.js",
  "js/vue.js"
]



// EVENTS
self.addEventListener('install', event => {
  console.log('@install')

  event.waitUntil(

    caches.open(CACHE_VERSION).then(cache => {

      return cache.addAll(CACHE_FILES)

    })

  )
})

self.addEventListener('activate', event => {
  console.log('@activate')

  event.waitUntil(

    caches.keys().then(cacheNames => {

      return Promise.all(

        cacheNames.filter(cacheName => cacheName !== CACHE_VERSION)
        .map(cacheName => caches.delete(cacheName))

      )

    })

  )
})

self.addEventListener('fetch', event => {
  console.log('@fetch')

  event.respondWith(

    caches.match(event.request).then(response => {

      return response || fetch(event.request)

    })

  )
})



// INIT
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js').then(reg => {

    console.log('> Service Worker registrado')
    // console.log(reg)

  }).catch(error => {

    console.log('> Error al registrar el Service Worker')
    console.log(error)

  })
}