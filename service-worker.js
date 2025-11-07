self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
});

var cacheName = 'v1';
var appShellFiles = [
    './',
    '.1 Calorie.html',
    '.10 Protein Intake Calculator.html',
    '.11 Water Intake Calculator.html',
    '.12 Target Heart Rate (THR) Calculator.html',
    '.13 VO2 Max Calculator (Cardio Fitness).html',
    '.14 FFMI Calculator (Fat-Free Mass Index).html',
    '.15 One Rep Max (1RM) Calculator.html',
    '.16 Body Surface Area (BSA).html',
    '.17 Glycemic Load Calculator.html',
    '.18 Calories Burned Calculator.html',
    '.19 MET Calculator (Metabolic Equivalent Task).html',
    '.2 BMI Calculator.html',
    '.20 Sleep Calculator.html',
    '.3  BMR Calculator .html',
    '.4 Body Fat Percentage Calculator.html',
    '.5 Macro Calculator (Protein, Carb, Faacro Calculatort Split).html',
    '.6 Ideal Body Weight Calculator.html',
    '.7 Waist-to-Hip Ratio (WHR) Calculator.html',
    '.8 Waist-to-Height Ratio Calculator.html',
    '.9 Lean Body Mass Calculator (LBM).html',
    '.ac.html',
    '.bb.html',
    '.ct.html',
    '.day.html',
    '.diet.html',
    '.fit tools.html',
    '.full.html',
    '.habit traker.html',
    '.habit.html',
    '.icon-128x128.png',
    '.icon-144x144.png',
    '.icon-152x152.png',
    '.icon-192x192.png',
    '.icon-256x256.png',
    '.icon-512x512.png',
    '.index.html',
    '.l.html',
    '.manifest.json',
    '.profile.html',
    '.progress.html',
    '.s.html',
    '.settings.html',
    '.workouts.html',
];

self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
