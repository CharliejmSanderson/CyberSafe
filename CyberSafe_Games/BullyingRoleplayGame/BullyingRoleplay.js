let completedScenarios = [];
let progress = 0;
let currentCharacter = '';
let step = 0;
let waitingForReply = false;
let onHomeScreen = true;

/* CHARACTERS */

const characters = {
  sly: {
    name: 'Sir Sly Paws',
    emoji: '🦊',
    type: 'Verbal Bullying',
    correct: 'nice'
  },

  chonk: {
    name: 'Captain Chonk',
    emoji: '🐼',
    type: 'Cyberbullying',
    correct: 'block'
  },

  dozy: {
    name: 'Dozy Dropbear',
    emoji: '🐨',
    type: 'Social Exclusion',
    correct: 'block'
  },

  roar: {
    name: 'Tiny Roar',
    emoji: '🐯',
    type: 'Intimidation',
    correct: 'anger'
  }
};

const firstMessages = {
  sly:   'Hey! Can we talk?',
  chonk: 'Morning Lovely!',
  dozy:  'Oi Oi!',
  roar:  'Are you ignoring me?'
};

const secondMessages = {
  sly:
    'Everyone laughs when you talk. Maybe you should stop speaking.',

  chonk:
    'I made a group chat about you. Everyone is sharing jokes about you.',

  dozy:
    'We are all meeting later, but you are not invited.',

  roar:
    'If you do not do what I say, nobody will want to be your friend.'
};

const explanations = {
  sly: {
    nice:  'Good choice. Sir Sly Paws may just be feeling insecure. A kind reply can help without encouraging bad behaviour.',
    block: 'Blocking is sometimes right, but here a calm reply could have helped. Sir Sly Paws may just need to talk.',
    anger: 'Replying with anger usually makes things worse. Try a calm, kind approach first.'
  },
  chonk: {
    nice:  'Being kind is good, but Captain Chonk is being unkind repeatedly. Blocking and reporting protects you.',
    block: 'Correct. Captain Chonk is being unkind. Blocking and reporting is the right way to protect yourself.',
    anger: 'Anger can escalate the situation. Blocking and reporting is the safer choice here.'
  },
  dozy: {
    nice:  'Dozy Dropbear is mocking you. A kind reply may not stop the behaviour. Blocking and reporting is better.',
    block: 'Correct. Dozy Dropbear is being hurtful. Blocking and reporting keeps you safe.',
    anger: 'Anger can make things worse. Blocking and reporting is the right call here.'
  },
  roar: {
    nice:  'Tiny Roar is using pressure tactics. A firm but calm response is more appropriate here.',
    block: 'Blocking removes the pressure, but a firm response first can also be the right move with Tiny Roar.',
    anger: 'Correct. Tiny Roar is trying to pressure you. A firm, direct response is appropriate here.'
  }
};

const consequences = {

  sly: {
    nice:  'The conversation becomes calmer and the situation improves.',
    block: 'The conversation ends, but the misunderstanding is not resolved.',
    anger: 'The argument becomes worse and everyone feels upset.'
  },

  chonk: {
    nice:  'The bullying may continue because the behaviour was not addressed.',
    block: 'The bullying stops and can be reported to keep you safe.',
    anger: 'The conflict may become bigger and more hurtful.'
  },

  dozy: {
    nice:  'The exclusion may continue and you may still feel left out.',
    block: 'You protect yourself and can seek support from trusted people.',
    anger: 'The situation may become more stressful.'
  },

  roar: {
    nice:  'The pressure may continue because no clear boundary was set.',
    block: 'The pressure stops, but the issue is not discussed.',
    anger: 'You set a clear boundary and challenge the intimidation.'
  }
};

/* SOUNDS */

let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

function playSound(type) {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  const ctx = getAudioCtx();

  if (type === 'message') {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.14);

  } else if (type === 'correct') {
    [523.25, 659.25].forEach(function(freq, i) {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.14;
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t); osc.stop(t + 0.4);
    });

  } else if (type === 'wrong') {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.35);
  }
}

/* TTS */

function isTtsOn() {
  const toggle = document.getElementById('ttsToggle');
  return toggle ? toggle.checked : false;
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-AU'; utterance.rate = 0.85; utterance.pitch = 1; utterance.volume = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function handleTtsToggle() {
  if (!isTtsOn()) stopSpeech();
}

/* SETTINGS */

function openSettings()  { document.getElementById('settingsOverlay').classList.add('active'); }
function closeSettings() { document.getElementById('settingsOverlay').classList.remove('active'); }

function setTheme(theme, btn) {
  document.body.classList.remove('theme-dark', 'theme-light', 'theme-blueyellow');
  if (theme !== 'default') document.body.classList.add('theme-' + theme);
  document.querySelectorAll('#settingsOverlay .setting-option[id^="theme-"]')
    .forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
}

function setTextSize(btn) {
  const scale = btn.dataset.scale;
  document.documentElement.style.setProperty('--font-scale', scale);
  document.querySelectorAll('#settingsOverlay .size-grid .setting-option')
    .forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
}

/* TOPBAR */

function topBarHTML(title, showBack) {
  const leftBtn = showBack
    ? '<button class="topbar-btn" onclick="goBack()" aria-label="Back">&#8592;</button>'
    : '<button class="topbar-btn" onclick="window.location.href=\'../MainMenu/mainmenu.html\'" aria-label="Go to main menu">&#127968;</button>';
  return '<div class="topbar">'
    + leftBtn
    + '<span class="topbar-title">' + title + '</span>'
    + '<button class="topbar-btn" onclick="openSettings()" aria-label="Settings">&#9881;&#65039;</button>'
    + '</div>';
}

function goBack() {
  stopSpeech();
  showHome();
}

/* HOME SCREEN */

function showHome() {
  onHomeScreen = true;
  stopSpeech();
  const percent = (progress / 4) * 100;

  let achievementsHTML = '';
  if (progress >= 1) achievementsHTML += achievementCard('⭐', 'First Steps', 'Complete your first conversation');
  if (progress >= 2) achievementsHTML += achievementCard('🟢', 'Communication Pro', 'Complete 2 conversations');
  if (progress >= 3) achievementsHTML += achievementCard('🏆', 'Conflict Resolver', 'Complete 3 conversations');
  if (progress >= 4) achievementsHTML += achievementCard('🎯', 'Master Communicator', 'Complete all conversations');

  document.getElementById('screen').innerHTML =
    topBarHTML('Bullying Roleplay', false)
    + '<div class="content">'
    + '<div class="chat-list">'
    + chatItemHTML('sly',   '🦊', 'Sir Sly Paws')
    + chatItemHTML('chonk', '🐼', 'Captain Chonk')
    + chatItemHTML('dozy',  '🐨', 'Dozy Dropbear')
    + chatItemHTML('roar',  '🐯', 'Tiny Roar')
    + '</div>'
    + '<div class="progress-card">'
    + '<h3>Your Progress</h3>'
    + '<p>' + progress + ' of 4 conversations completed</p>'
    + '<div class="progress-bar-bg"><div class="progress-bar-fill" style="width:' + percent + '%"></div></div>'
    + '</div>'
    + (achievementsHTML ? '<div class="achievements"><h4>🏆 Achievements</h4>' + achievementsHTML + '</div>' : '')
    + '</div>';
}

function chatItemHTML(id, emoji, name) {
  return '<div class="chat-item" onclick="startChat(\'' + id + '\')">'
    + '<div class="avatar">' + emoji + '</div>'
    + '<div>'
    + '<div class="chat-item-name">' + name + '</div>'
    + '<small>' + characters[id].type + '</small>'
    + '</div>'
    + '</div>';
}

function achievementCard(icon, title, desc) {
  return '<div class="achievement-card">'
    + '<div class="icon-circle">' + icon + '</div>'
    + '<div class="achievement-text"><b>' + title + '</b><small>' + desc + '</small>'
    + '<div class="achievement-unlocked">&#10004; Unlocked</div></div>'
    + '</div>';
}

/* CHAT SCREEN */

function startChat(character) {
  onHomeScreen = false;
  currentCharacter = character;
  step = 0;
  waitingForReply = false;
  stopSpeech();

  const char = characters[character];
  const msg  = firstMessages[character];

  document.getElementById('screen').innerHTML =
    topBarHTML(char.emoji + ' ' + char.name, true)
    + '<div class="chat-header">'
    + '<div class="chat-header-avatar">' + char.emoji + '</div>'
    + '<span class="chat-header-name">' + char.name + '</span>'
    + '</div>'
    + '<div class="chat-area" id="chat"></div>'
    + '<div class="choices-area" id="choices"></div>';

  setTimeout(function() {
    addTheirBubble(msg, char.emoji);
    playSound('message');
    if (isTtsOn()) speakText(msg);
    step = 1;
    showReplyButton();
  }, 600);
}

function addTheirBubble(text, emoji) {
  const chat = document.getElementById('chat');
  if (!chat) return;
  const safeText = text.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  const div = document.createElement('div');
  div.className = 'bubble-wrap-them';
  div.innerHTML = '<div class="bubble-avatar">' + emoji + '</div>'
    + '<div class="bubble bubble-them">' + text
    + '<button class="bubble-speak" onclick="speakText(\'' + safeText + '\')" aria-label="Read aloud">&#128266;</button>'
    + '</div>';
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addMyBubble(text) {
  const chat = document.getElementById('chat');
  if (!chat) return;
  const div = document.createElement('div');
  div.className = 'bubble-wrap-me';
  div.innerHTML = '<div class="bubble bubble-me">' + text + '</div>';
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function showTypingIndicator() {
  const chat = document.getElementById('chat');
  if (!chat) return;
  const div = document.createElement('div');
  div.className = 'typing-indicator';
  div.id = 'typing';
  const emoji = characters[currentCharacter].emoji;
  div.innerHTML = '<div class="bubble-avatar">' + emoji + '</div>'
    + '<div class="typing-dots"><span></span><span></span><span></span></div>';
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typing');
  if (el) el.remove();
}

function showReplyButton() {
  const choices = document.getElementById('choices');
  if (!choices) return;
  choices.innerHTML = '<div style="padding:8px 0 4px;">'
    + '<button class="back-btn" onclick="handleReply()" style="margin-top:0;">Reply &#8594;</button>'
    + '</div>';
}

function handleReply() {
  if (waitingForReply) return;
  waitingForReply = true;

  const choices = document.getElementById('choices');
  if (choices) choices.innerHTML = '';

  addMyBubble('Hello');
  playSound('message');
  showTypingIndicator();

  setTimeout(function() {
    removeTypingIndicator();
    const msg = secondMessages[currentCharacter];
    addTheirBubble(msg, characters[currentCharacter].emoji);
    playSound('message');
    if (isTtsOn()) speakText(msg);
    waitingForReply = false;
    step = 2;
    showChoices();
  }, 1200);
}

function showChoices() {
  const choices = document.getElementById('choices');
  if (!choices) return;

  const options = [
    { id: 'anger', label: '😤 Reply with anger' },
    { id: 'block', label: '🚫 Block and report' },
    { id: 'nice',  label: '😊 Reply nicely' }
  ];

  let html = '<div class="choices-label">How do you respond?</div>';
  options.forEach(function(opt) {
    const safeLabel = opt.label.replace(/'/g, '&#39;');
    html += '<div class="choice-row">'
      + '<button class="choice-btn" onclick="finalChoice(\'' + opt.id + '\')">' + opt.label + '</button>'
      + '<button class="choice-speak" onclick="speakText(\'' + safeLabel + '\')" aria-label="Read option aloud">&#128266;</button>'
      + '</div>';
  });
  choices.innerHTML = html;
}

/* RESULT */

function finalChoice(choice) {
  stopSpeech();
  const char = characters[currentCharacter];
  const correct = choice === char.correct;
  const expl = explanations[currentCharacter][choice];
  const consequence = consequences[currentCharacter][choice];

  if (correct) {

    if (!completedScenarios.includes(currentCharacter)) {
      completedScenarios.push(currentCharacter);
      progress++;
    }

    playSound('correct');

  } else {

    playSound('wrong');

  }

  if (completedScenarios.length === 4) {
  showLearningSummary();
  return;
  }

  const percent = (progress / 4) * 100;
  const safeExpl = expl.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  const resultText = (correct ? 'Correct! ' : 'Not quite. ') + expl;

  document.getElementById('screen').innerHTML =
    topBarHTML('Result', true)
    + '<div class="result-area">'
    + '<div class="result-icon">' + (correct ? '🎉' : '🤔') + '</div>'
    + '<div class="result-title ' + (correct ? 'result-correct' : 'result-wrong') + '">'
    + (correct ? '&#10004; Correct response!' : 'Not the best choice') + '</div>'
    + '<div class="result-explanation">'
    + '<strong>Feedback:</strong><br><br>'
    + expl
    + '<br><br><strong>What could happen next?</strong><br><br>'
    + consequence
    + '<button class="bubble-speak" onclick="speakText(\'' + safeExpl + '\')" aria-label="Read explanation aloud">&#128266;</button>'
    + '</div>'
    + '<div class="result-progress-label">' + progress + ' of 4 conversations completed</div>'
    + '<div class="result-progress-bar-bg"><div class="result-progress-bar-fill" style="width:' + percent + '%"></div></div>'
    + '<button class="back-btn" onclick="startChat(currentCharacter)">🔄 Replay Scenario</button>'
    + '<br><br>'
    + '<button class="back-btn" onclick="showHome()">&#8592; Back to Chats</button>'
    + '</div>';

  if (isTtsOn()) speakText(resultText);
}

function showLearningSummary() {

  document.getElementById('screen').innerHTML =

    topBarHTML('Learning Summary', true)

    + '<div class="content">'

    + '<div class="achievement-card">'
    + '<div class="achievement-text">'
    + '<h3>🎓 What You Learned</h3><br>'

    + '✅ Bullying can happen in different forms.<br><br>'

    + '✅ Staying calm can help in difficult situations.<br><br>'

    + '✅ Blocking and reporting can help stop cyberbullying.<br><br>'

    + '✅ Setting boundaries can protect your wellbeing.<br><br>'

    + '✅ It is okay to ask for help from trusted people.'
    + '</div>'
    + '</div>'

    + '<div class="achievement-card">'
    + '<div class="achievement-text">'
    + '<h3>🏆 Great Work!</h3><br>'
    + 'You completed all bullying scenarios and practised safe responses.'
    + '<div style="margin-top:15px;">'
    + '<span class="summary-badge">Verbal Bullying</span>'
    + '<span class="summary-badge">Cyberbullying</span>'
    + '<span class="summary-badge">Social Exclusion</span>'
    + '<span class="summary-badge">Intimidation</span>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<button class="back-btn" onclick="showHome()">Return Home</button>'

    + '</div>';

  if (isTtsOn()) {
    speakText(
      'Congratulations. You completed all bullying scenarios and learned how to recognise bullying and respond safely.'
    );
  }
}
/* SETTINGS OVERLAY CLOSE ON BACKDROP TAP */

document.getElementById('settingsOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeSettings();
});

/* START */
showHome();
