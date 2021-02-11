const mem = "weather";
const assets = [
  "./",
  "./index.html",
  "./sail.html",
  "./resources/arrow-dark.png",
  "./resources/arrow-light.png",
  "./resources/location.png",
  "./resources/maskable_icon_x1.png",
  "./resources/maskable_icon_x96.png",
  "./resources/maskable_icon_x128.png",
  "./resources/maskable_icon_x180.png",
  "./resources/maskable_icon_x192.png",
  "./resources/sailboat-dark.png",
  "./resources/sailboat-light.png",
  "./resources/sunrise.png",
  "./resources/sunset.png",
  "./resources/weather-dark.png",
  "./resources/weather-light.png",
  "./resources/wind.png",
  "./canvasjs.min.js",
  "./manifest.json"
];



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(mem).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.addAll(assets);
          return response;
        });
      });
    })
  );
});