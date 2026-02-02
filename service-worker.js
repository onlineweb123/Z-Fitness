// ✅ Service Worker - Z-Fitness
const cacheName = 'zfitness-v1';

// உங்கள் ஸ்கிரீன்ஷாட்களில் உள்ள சரியான பெயர்கள் இங்கே சேர்க்கப்பட்டுள்ளன
const appShellFiles = [
  './',
  './index.html',
  './manifest.json',

  // Calculators (Naming matched with screenshots)
  './1 Calorie.html',
  './2 BMI Calculator.html',
  './3 BMR Calculator .html',
  './4 Body Fat Percentage Calculator.html',
  './5 Macro Calculator.html',
  './6 Ideal Body Weight Calculator.html',
  './7 Waist-to-Hip Ratio (WHR) Calculator.html',
  './8 Waist-to-Height Ratio Calculator.html',
  './9 Lean Body Mass Calculator (LBM).html',
  './10 Protein Intake Calculator.html',
  './11 Water Intake Calculator.html',
  './12 Target Heart Rate (THR) Calculator.html',
  './13 VO2 Max Calculator (Cardio Fitness).html',
  './14 FFMI Calculator (Fat-Free Mass Index).html',
  './15 One Rep Max (1RM) Calculator.html',
  './16 Body Surface Area (BSA).html',
  './17 Glycemic Load Calculator.html',
  './18 Calories Burned Calculator.html',
  './19 MET Calculator (Metabolic Equivalent T.html', // truncated name in screenshot
  './20 Sleep Calculator.html',

  // Core Pages
  './diet.html',
  './full.html',
  './fit tools.html', 
  './habit traker.html',
  './habit.html',
  './help.html',
  './l.html',
  './meditation.html',
  './new index.html',
  './nutrition tracker.html',
  './personal diet.html',
  './pr.html',
  './profile.html',
  './progress.html',
  './s.html',
  './settings.html',
  './summa Nutrition Tracker.html',
  './summa test.html',
  './terms and conditions.html',
  './workouts.html',
  './ac.html',
  './admin.html',
  './bb.html',
  './ct.html',

  // Icons
  './icon-128x128.png',
  './icon-144x144.png',
  './icon-152x152.png',
  './icon-192x192.png',
  './icon-256x256.png',
  './icon-512x512.png'
];

// ✅ Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(appShellFiles);
    })
  );
  self.skipWaiting();
});

// ✅ Activate Event (Old cache cleanup)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// ✅ Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          // ஆடியோ கோப்புகள் பெரியதாக இருப்பதால் அவற்றை கச்சிங் செய்வதை தவிர்க்கலாம்
          if (!e.request.url.endsWith('.mp3')) {
            cache.put(e.request, response.clone());
          }
          return response;
        });
      });
    }).catch(() => {
      if (e.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
