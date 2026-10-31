/* Bruno app-shell service worker: network-first for our own files (so edits show up), cache fallback offline. */
const CACHE='bruno-shell-v1';
const SHELL=['./','index.html','base.css','extra.css','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png',
  'js/bruno.js','js/art.js','js/data.js','js/core.js','js/lesson.js','js/screens.js','js/main.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin){ // fonts etc: serve cached copy, refresh in background
    if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(h=>{const f=fetch(r).then(n=>{c.put(r,n.clone());return n}).catch(()=>h);return h||f})));
    return}
  e.respondWith(fetch(r).then(n=>{if(n.ok){const cp=n.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return n}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():self.clients.openWindow('./')))});
