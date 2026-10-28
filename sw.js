const CACHE='lessons-v8';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./assets/stories/story-storm.jpg','./assets/stories/story-ruins.jpg','./assets/stories/story-civic.jpg','./assets/stories/story-planning.jpg','./assets/stories/story-team.jpg','./assets/history/history-uprising-1821.jpg','./assets/history/history-ibrahim-1825.jpg','./assets/history/history-missolonghi-1826.jpg','./assets/history/history-diplomacy-1827.jpg'];
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
    event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
  }
});
