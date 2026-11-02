// Bemutató service worker: csak a nyitott oldal által kért értesítéseket jeleníti meg.
// Valódi push (bezárt alkalmazásnál) az éles rendszerben, szerverrel jön.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Értesítésre kattintva a rendszer ablaka kerül előtérbe (vagy megnyílik)
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) if ('focus' in c) return c.focus();
      return self.clients.openWindow('./#fleet');
    })
  );
});
