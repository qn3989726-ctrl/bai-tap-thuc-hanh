/* storage.js — wrapper localStorage (an toàn khi bị chặn) + sự kiện CCStore. */
(function () {
  'use strict';

  var PREFIX = 'cc:';
  var memory = {};
  var available = (function () {
    try {
      var k = PREFIX + '__test__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  })();

  function fullKey(key) { return PREFIX + key; }

  var CCStore = {
    persistent: available,

    get: function (key, fallback) {
      var raw;
      try {
        raw = available ? window.localStorage.getItem(fullKey(key)) : memory[key];
      } catch (e) { raw = memory[key]; }
      if (raw === null || raw === undefined) return fallback;
      try { return JSON.parse(raw); } catch (e) { return raw; }
    },

    set: function (key, value) {
      var raw = JSON.stringify(value);
      try {
        if (available) window.localStorage.setItem(fullKey(key), raw);
        else memory[key] = raw;
      } catch (e) { memory[key] = raw; }
      document.dispatchEvent(new CustomEvent('cc:store', { detail: { key: key, value: value } }));
      return value;
    },

    remove: function (key) {
      try { if (available) window.localStorage.removeItem(fullKey(key)); } catch (e) { /* ignore */ }
      delete memory[key];
    },

    /* Đọc/sửa mảng theo khoá, tự lưu */
    list: function (key) {
      var v = CCStore.get(key, []);
      return Array.isArray(v) ? v : [];
    },
    update: function (key, mutator) {
      var value = CCStore.get(key, null);
      value = mutator(value);
      if (value === null || value === undefined) CCStore.remove(key);
      else CCStore.set(key, value);
      return value;
    },

    /* Đồng bộ giữa các tab */
    onRemoteChange: function (handler) {
      window.addEventListener('storage', function (e) {
        if (!e.key || e.key.indexOf(PREFIX) !== 0) return;
        handler(e.key.slice(PREFIX.length), CCStore.get(e.key.slice(PREFIX.length), null));
      });
    },

    clearAll: function () {
      if (!available) { memory = {}; return; }
      var keys = [];
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(PREFIX) === 0) keys.push(k);
      }
      keys.forEach(function (k) { window.localStorage.removeItem(k); });
    },

    /* Tải file JSON-like xuống máy người dùng */
    download: function (filename, text, mime) {
      var blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
  };

  window.CCStore = CCStore;
})();
