const CACHE='lessons-v44';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./assets/chemistry/acids-bases-module.css','./assets/chemistry/acids-bases-module.js','./assets/physics/electric-charge-module.css','./assets/physics/electric-charge-module.js','./assets/full-school.css','./assets/full-school.js','./assets/school-workshops.js','./assets/biology-motion.js','./assets/biology-illustrations.js','./assets/biology-concepts.js','./assets/biology-path.js','./assets/biology-theory.js','./assets/biology-zoom.js','./assets/greek-writing.js','./assets/greek-matching.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}
      return response;
    }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
  }else{
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
      return response;
    })));
  }
});
