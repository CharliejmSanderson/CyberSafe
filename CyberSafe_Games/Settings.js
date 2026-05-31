var SETTINGS_DEFAULTS = {
  theme:     'default',
  fontScale: '1',
  ttsOn:     false,
  volume:    0.5
};


function loadSettings() {
  var s = {};
  s.theme     = localStorage.getItem('cs_theme')     || SETTINGS_DEFAULTS.theme; 
  s.fontScale = localStorage.getItem('cs_fontScale') || SETTINGS_DEFAULTS.fontScale;
  s.ttsOn     = localStorage.getItem('cs_ttsOn') === 'true';
  var vol     = parseFloat(localStorage.getItem('cs_volume'));
  s.volume    = isNaN(vol) ? SETTINGS_DEFAULTS.volume : vol;
  return s;
}

function saveSettings(key, value) {
  localStorage.setItem('cs_' + key, value);
}

function getVolume() {
  var vol = parseFloat(localStorage.getItem('cs_volume'));
  return isNaN(vol) ? SETTINGS_DEFAULTS.volume : vol;
}

function applyFontScale(scale) {
  document.documentElement.style.setProperty('--font-scale', scale);
}

function applyTtsToggle(on) {
  var toggle = document.getElementById('ttsToggle');
  if (toggle) toggle.checked = on;
} 

function syncSettingsUI(s) {
  /* theme buttons */
  document.querySelectorAll('[id^="theme-"]').forEach(function(b) {
    b.classList.remove('active');
  });
  var activeThemeBtn = document.getElementById('theme-' + s.theme);
  if (activeThemeBtn) activeThemeBtn.classList.add('active');

  /* size buttons */
  document.querySelectorAll('[data-scale]').forEach(function(b) {
    b.classList.toggle('active', b.dataset.scale === s.fontScale);
  }); 
  

  /* volume slider */
  var slider = document.getElementById('volumeSlider');
  if (slider) slider.value = s.volume;

  /* TTS toggle */
  applyTtsToggle(s.ttsOn);
}
