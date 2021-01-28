const mem = "weather";
const assets = [
  "./",
  "./index.html",
  "./sail.html",
  "./style.css",
  "./script.js",
  "./resources/",
  "./tide.js",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(mem).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
