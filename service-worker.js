// Define cache name and assets to cache
const CACHE_NAME = "time-converter-cache-v1";
const ASSETS_TO_CACHE = [
  "/", // Adjust this if your app is served from a subdirectory
  "/index.html",
  "/styles.css",
  "/script.js", // Add your JavaScript file here if it's not already cached
  "/service-worker.js",
  "/manifest.json", // Include the manifest.json for PWA functionality
  "/images/icon-192x192.png", // Icon for the app
  "/images/icon-512x512.png", // Larger icon for various screens
  "/images/badge.png", // Badge for notifications (if you have one)
  // Add any other assets that need to be cached for offline use
];

// Install event - Caching assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - Cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event - Serve from cache if available, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("[Service Worker] Serving from cache:", event.request.url);
        return response;
      }
      console.log("[Service Worker] Fetching from network:", event.request.url);
      return fetch(event.request).catch((error) => {
        console.log("[Service Worker] Network request failed, serving offline page", error);
        // You can return a cached offline page here if needed
        return caches.match("/offline.html"); // Customize with your offline page if you have one
      });
    })
  );
});

// Push event - Show a notification when a push is received
self.addEventListener("push", (event) => {
  let notificationTitle = "Time Measurement Converter";
  let notificationOptions = {
    body: event.data ? event.data.text() : "You have a new notification!",
    icon: "/images/icon-192x192.png", // Set the icon for the notification
    badge: "/images/badge.png", // Optional: Set a badge for the notification
  };

  // Show the notification
  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// Notification click event - Handle user interaction with the notification
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click received:", event);
  event.notification.close(); // Close the notification

  // Open the app when the notification is clicked
  event.waitUntil(
    clients.openWindow("/") // Modify this URL if needed
  );
});
