/* theme.js — áp giao diện tối/sáng thật sớm (gọi trong <head>) để tránh nháy màu. */
(function () {
  'use strict';

  var STORAGE_KEY = 'cc:theme';

  function readPref() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) { /* chế độ riêng tư: bỏ qua */ }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0d1421' : '#3b5bdb');
  }

  var current = readPref();
  apply(current);

  window.CCTheme = {
    get: function () {
      return document.documentElement.getAttribute('data-theme') || current;
    },
    set: function (theme) {
      current = theme;
      apply(theme);
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
      document.dispatchEvent(new CustomEvent('cc:theme', { detail: { theme: theme } }));
    },
    toggle: function () {
      this.set(this.get() === 'dark' ? 'light' : 'dark');
      return this.get();
    },
    followSystem: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      apply(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  };

  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }
      if (!saved) apply(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
