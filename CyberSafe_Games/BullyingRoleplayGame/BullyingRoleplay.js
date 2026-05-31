let progress = 0;
let currentCharacter = "";
let step = 0;

//
// TOP BAR
//
function topBar(title) {
  return `
    <div class="topbar">
      <span onclick="showHome()">🏠</span>
      <span class="title">${title}</span>
      <span onclick="openSettings()">⚙️</span>
    </div>
  `;
}

//
// HOME SCREEN
//
function showHome() {
  let percent = (progress / 4) * 100;

  document.getElementById("screen").innerHTML = `
    ${topBar("Bullying Roleplay")}

    <div class="chat-list">

      <div class="chat-item" onclick="startChat('sly')">
        <div class="avatar">🦊</div> Sir Sly Paws
      </div>

      <div class="chat-item" onclick="startChat('chonk')">
        <div class="avatar">🐼</div> Captain Chonk
      </div>

      <div class="chat-item" onclick="startChat('dozy')">
        <div class="avatar">🐨</div> Dozy Dropbear
      </div>

      <div class="chat-item" onclick="startChat('roar')">
        <div class="avatar">🐯</div> Tiny Roar
      </div>

      <!-- PROGRESS CARD -->
      <div class="progress-card">
        <h3>Your Progress</h3>
        <p>${progress} of 4 conversations completed</p>

        <div class="progress-bar">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>

        <p>${percent}% Complete</p>
      </div>

      <!-- ACHIEVEMENTS -->
      <div class="achievements">
        <h4>🏆 Rewards & Achievements</h4>

        ${progress >= 1 ? achievementCard("⭐", "First Steps", "Complete your first conversation") : ""}
        ${progress >= 2 ? achievementCard("🟢", "Communication Pro", "Complete 2 conversations") : ""}
        ${progress >= 3 ? achievementCard("🏆", "Conflict Resolver", "Complete 3 conversations") : ""}
        ${progress >= 4 ? achievementCard("🎯", "Master Communicator", "Complete all conversations") : ""}
      </div>

    </div>
  `;
}

//
// SETTINGS
//

function openSettings() {
  document.getElementById('settingsOverlay').classList.add('active');
}

function closeSettings() {
  document.getElementById('settingsOverlay').classList.remove('active');
}

const settingsOverlay = document.getElementById('settingsOverlay');

if (settingsOverlay) {
  settingsOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeSettings();
  });
}

//
// THEME FIX (APPLIES TO MOBILE FRAME)
//
function setTheme(theme, btn) {
  document.body.classList.remove('theme-dark', 'theme-light', 'theme-blueyellow');
  if (theme !== 'default') document.body.classList.add('theme-' + theme);

  document.querySelectorAll('#settingsOverlay .setting-option[id^="theme-"]')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

//
//TEXT SIZE 
// 
function setTextSize(btn) {
  const scale = btn.dataset.scale;
  document.documentElement.style.setProperty('--font-scale', scale);

  document.querySelectorAll('#settingsOverlay .size-grid .setting-option')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

//
// ACHIEVEMENT CARD
//
function achievementCard(icon, title, desc) {
  return `
    <div class="achievement-card">
      <div class="icon-circle">${icon}</div>
      <div class="achievement-text">
        <b>${title}</b>
        <small>${desc}</small>
        <div class="unlocked-text">✔ Unlocked</div>
      </div>
    </div>
  `;
}

//
// START CHAT
//
function startChat(character) {
  currentCharacter = character;
  step = 0;

  let firstMessage = {
    sly: "Hey! Can we talk?",
    chonk: "Morning Lovely!",
    dozy: "Oi Oi!",
    roar: "Are you ignoring me?"
  };

  document.getElementById("screen").innerHTML = `
    ${topBar(getName())}

    <div class="chat-area" id="chat">
      <div class="bot">${firstMessage[character]}</div>
    </div>

    <div id="options"></div>

    <div class="input-bar">
      <input placeholder="Type a message..." readonly onclick="handleAction()">
      <button onclick="handleAction()">➤</button>
    </div>
  `;
}

//
// HANDLE FLOW
//
function handleAction() {
  let options = document.getElementById("options");

  if (step === 0) {
    options.innerHTML = `<button class="reply-btn" onclick="sendReply()">Reply</button>`;
    step = 1;
  }

  else if (step === 2) {
    options.innerHTML = `
      <div class="options">
        <button class="red" onclick="finalChoice('anger')">Reply with anger</button>
        <button class="orange" onclick="finalChoice('block')">Block & Report</button>
        <button class="green" onclick="finalChoice('nice')">Reply nicely</button>
      </div>
    `;
    step = 3;
  }
}

//
// SEND MESSAGE
//
function sendReply() {
  let chat = document.getElementById("chat");
  let options = document.getElementById("options");

  chat.innerHTML += `<div class="user">Hello</div>`;
  chat.innerHTML += `<div class="bot">${getSecondMessage()}</div>`;

  options.innerHTML = "";
  step = 2;
}

//
// SECOND MESSAGE
//
function getSecondMessage() {
  return {
    sly: "😒 Your picture looks weird.",
    chonk: "😐 Your picture looks bad.",
    dozy: "😂 Your posts are boring.",
    roar: "😠 You never reply properly!"
  }[currentCharacter];
}

//
// FINAL RESULT
//
function finalChoice(choice) {
  let correct = false;

  if (currentCharacter === "sly" && choice === "nice") correct = true;
  if (currentCharacter === "chonk" && choice === "block") correct = true;
  if (currentCharacter === "dozy" && choice === "block") correct = true;
  if (currentCharacter === "roar" && choice === "anger") correct = true;

  if (correct) progress++;

  let percent = (progress / 4) * 100;

  document.getElementById("screen").innerHTML = `
    ${topBar("Result")}

    <div style="padding:20px; text-align:center;">

      <h3 style="color:${correct ? 'green' : 'red'};">
        ${correct ? "✔ Correct response!" : "❌ Not the best choice"}
      </h3>

      <br>

      <h4>Progress</h4>
      <p>${progress} of 4 completed</p>

      <div style="background:#ddd; border-radius:20px; height:20px; margin:10px;">
        <div style="
          width:${percent}%;
          background:#2e7d32;
          height:100%;
          border-radius:20px;
          color:white;
          font-size:12px;
          line-height:20px;">
          ${percent}%
        </div>
      </div>

      <br>

      <button class="reply-btn" onclick="showHome()">
        Back to Chats
      </button>

    </div>
  `;
}

//
// HELPER
//
function getName() {
  return {
    sly: "🦊 Sir Sly Paws",
    chonk: "🐼 Captain Chonk",
    dozy: "🐨 Dozy Dropbear",
    roar: "🐯 Tiny Roar"
  }[currentCharacter];
}

// START
showHome();
