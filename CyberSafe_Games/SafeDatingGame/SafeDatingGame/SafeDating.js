// ============================================================
//  SafeDating.js
//  Game logic for the Safe Online Dating game.
//
//  Reads from the `levels` array in SafeDating_levels.js
//  which must be loaded before this file in the HTML.
//
//  PROGRESS NOTE:
//  `unlockedLevel` starts at 0 (first level unlocked).
//  When connecting to the wider app, replace this variable
//  with the value from the user's account, and call your
//  save function wherever saveProgress() is called below.
// ============================================================


// ------------------------------------------------------------
//  GAME STATE
// ------------------------------------------------------------

let unlockedLevel    = 0;   // Replace with user account data when app is ready
let currentLevel     = 0;
let currentStep      = 0;
let conversationDone = false;
let waitingForReply  = false; // true while the typing indicator is showing
let shownMessages    = [];    // { type: 'them' | 'me', text: string }


// ------------------------------------------------------------
//  PROGRESS
//  Replace the body of this function to save to the user account
// ------------------------------------------------------------

function saveProgress(newLevel) {
  if (newLevel > unlockedLevel) {
    unlockedLevel = newLevel;
    // TODO: save `unlockedLevel` to the user's account here
  }
}


// ------------------------------------------------------------
//  HELPER
// ------------------------------------------------------------

function setScreen(html) {
  document.getElementById('screen').innerHTML = html;
}


// ============================================================
//  HOME SCREEN
// ============================================================

function showHome() {
  currentStep      = 0;
  conversationDone = false;
  waitingForReply  = false;
  shownMessages    = [];

  const cardsHTML = levels.map((lv, idx) => {

    const state = idx < unlockedLevel   ? 'completed'
                : idx === unlockedLevel ? 'unlocked'
                :                        'locked';

    const badge     = state === 'completed' ? '&#9989;'
                    : state === 'unlocked'  ? '&#9654;&#65039;'
                    :                         '&#128274;';

    const clickAttr = state !== 'locked' ? `onclick="startLevel(${idx})"` : '';
    const roleAttr  = state !== 'locked' ? 'role="button"' : '';

    return `
      <div class="level-card ${state}" ${clickAttr} ${roleAttr}
           aria-label="Level ${idx + 1}: ${lv.name}, ${state}">
        <div class="level-avatar">${lv.emoji}</div>
        <div class="level-info">
          <div class="level-num">Level ${idx + 1}</div>
          <div class="level-name">${lv.name}</div>
          <div class="level-desc">${lv.tagline}</div>
        </div>
        <div class="level-badge">${badge}</div>
      </div>`;

  }).join('');

  setScreen(`
    <div class="home-header">
      <div class="home-icon">&#128172;</div>
      <h1>Safe Online Dating</h1>
      <p>Can you spot the green and red flags?</p>
    </div>
    <div class="levels-label">Choose a level</div>
    ${cardsHTML}
    <div style="height: 16px; flex-shrink: 0;"></div>
  `);
}


// ============================================================
//  CHAT SCREEN
//
//  The entire screen scrolls as one unit.
//  The chat header, messages, choices, and flag buttons
//  all live in one scrollable column inside #screen.
// ============================================================

function startLevel(idx) {
  currentLevel     = idx;
  currentStep      = 0;
  conversationDone = false;
  waitingForReply  = false;
  shownMessages    = [];

  renderChat();
  setTimeout(addMessage, 300);
}


function renderChat() {
  const lv   = levels[currentLevel];
  const step = lv.conversation[currentStep];

  // --- Chat bubbles ---
  const bubblesHTML = shownMessages.map(m =>
    `<div class="bubble ${m.type === 'them' ? 'them' : 'me'}">${m.text}</div>`
  ).join('');

  // --- Reply choices ---
  // Hidden while waiting for the character's reply or after conversation ends
  let choicesHTML = '';
  if (!conversationDone && !waitingForReply && step && step.choices) {
    const btns = step.choices.map((c, i) =>
      `<button class="choice-btn" onclick="pickChoice(${i})">${c.text}</button>`
    ).join('');

    choicesHTML = `
      <div class="choices-area">
        <div class="choices-label">Choose your reply</div>
        ${btns}
      </div>`;
  }

  // --- Flag buttons ---
  // Disabled until the conversation ends
  const ready        = conversationDone;
  const disabledAttr = ready ? '' : 'disabled';
  const flagLabel    = ready ? 'What do you think?' : 'Read the chat first';

  const flagHTML = `
    <div class="flag-area">
      <div class="flag-label">${flagLabel}</div>
      <div class="flag-row">
        <button class="flag-btn red-flag"
                onclick="submitFlag('red')"
                ${disabledAttr}
                aria-label="Red flag - unsafe">
          &#128681; Red Flag
        </button>
        <button class="flag-btn yellow-flag"
                onclick="submitFlag('yellow')"
                ${disabledAttr}
                aria-label="Not sure - yellow flag">
          &#9888;&#65039; Not Sure
        </button>
        <button class="flag-btn green-flag"
                onclick="submitFlag('green')"
                ${disabledAttr}
                aria-label="Green flag - safe">
          &#127937; Green Flag
        </button>
      </div>
    </div>`;

  setScreen(`
    <div class="chat-header">
      <div class="chat-avatar">${lv.emoji}</div>
      <div class="chat-header-text">
        <div class="chat-name">${lv.name}</div>
        <div class="chat-tagline">${lv.tagline}</div>
      </div>
    </div>

    <div class="chat-messages">
      ${bubblesHTML}
    </div>

    ${choicesHTML}
    ${flagHTML}
  `);

  // Scroll to the bottom of the screen to show latest content
  const screen = document.getElementById('screen');
  if (screen) screen.scrollTop = screen.scrollHeight;
}


function addMessage() {
  const lv   = levels[currentLevel];
  const step = lv.conversation[currentStep];
  if (!step) return;

  // Only add a bubble if there is text to show
  if (step.them) {
    shownMessages.push({ type: 'them', text: step.them });
  }

  // No choices means end of conversation
  if (!step.choices) {
    conversationDone = true;
  }

  renderChat();
}


function pickChoice(choiceIdx) {
  const lv     = levels[currentLevel];
  const step   = lv.conversation[currentStep];
  const choice = step.choices[choiceIdx];

  // Show the player's chosen reply
  shownMessages.push({ type: 'me', text: choice.text });

  // Advance step and block choices while waiting for the reply
  currentStep     = choice.next;
  waitingForReply = true;
  renderChat();

  // Show typing indicator then character's reply
  setTimeout(() => {
    const screen = document.getElementById('screen');
    const msgArea = screen ? screen.querySelector('.chat-messages') : null;

    if (msgArea) {
      const indicator       = document.createElement('div');
      indicator.className   = 'typing';
      indicator.textContent = '• • •';
      msgArea.appendChild(indicator);
      screen.scrollTop = screen.scrollHeight;
    }

    setTimeout(() => {
      // Remove typing indicator
      const msgArea2 = document.getElementById('screen').querySelector('.chat-messages');
      if (msgArea2) {
        const indicator = msgArea2.querySelector('.typing');
        if (indicator) indicator.remove();
      }

      // Add the character's reply to this choice as a bubble
      if (choice.reply) {
        shownMessages.push({ type: 'them', text: choice.reply });
      }

      // Unblock and move to next step
      waitingForReply = false;
      addMessage();

    }, 700);

  }, 200);
}


// ============================================================
//  FLAG SUBMISSION
// ============================================================

function submitFlag(playerChoice) {
  // playerChoice is the string 'green', 'red', or 'yellow'
  // lv.flag is 'green', 'red', 'yellow-red', or 'yellow-green'

  const lv   = levels[currentLevel];
  const flag = lv.flag;
  let result;

  if (flag === 'green') {
    result = playerChoice === 'green' ? 'correct' : 'wrong';

  } else if (flag === 'red') {
    result = playerChoice === 'red' ? 'correct' : 'wrong';

  } else if (flag === 'yellow-red') {
    // Yellow = correct, Red = close, Green = wrong
    if      (playerChoice === 'yellow') result = 'correct';
    else if (playerChoice === 'red')    result = 'close';
    else                                result = 'wrong';

  } else if (flag === 'yellow-green') {
    // Yellow = correct, Green = close, Red = wrong
    if      (playerChoice === 'yellow') result = 'correct';
    else if (playerChoice === 'green')  result = 'close';
    else                                result = 'wrong';
  }

  showResult(result, playerChoice);
}


// ============================================================
//  RESULT SCREEN
// ============================================================

function showResult(result, playerChoice) {
  const lv     = levels[currentLevel];
  const isLast = currentLevel >= levels.length - 1;

  // Unlock next level on correct or close
  if (result === 'correct' || result === 'close') {
    saveProgress(currentLevel + 1);
  }

  // Label for the player's choice
  const choiceLabel = playerChoice === 'green'  ? '&#127937; Green Flag'
                    : playerChoice === 'red'     ? '&#128681; Red Flag'
                    :                              '&#9888;&#65039; Not Sure';

  // Label for the correct answer
  const correctLabel = lv.flag === 'green'   ? '&#127937; Green Flag'
                     : lv.flag === 'red'      ? '&#128681; Red Flag'
                     :                          '&#9888;&#65039; Not Sure';

  // Icon and heading for each outcome
  const icon  = result === 'correct' ? '&#127881;'
              : result === 'close'   ? '&#129300;'
              :                        '&#128532;';

  const title = result === 'correct' ? 'Well done!'
              : result === 'close'   ? 'Almost!'
              :                        'Not quite...';

  // Pick the right explanation
  let explanationText;
  if (result === 'correct') {
    explanationText = lv.flag.startsWith('yellow')
      ? lv.yellowExplanation
      : lv.explanation;
  } else if (result === 'close') {
    explanationText = lv.closeExplanation;
  } else {
    explanationText = lv.explanation;
  }

  // Action buttons
  let actionsHTML = '';

  if (result === 'correct') {
    actionsHTML = !isLast
      ? `<button class="action-btn primary"   onclick="startLevel(${currentLevel + 1})">Next Level &#8250;</button>
         <button class="action-btn secondary" onclick="showHome()">Back to Levels</button>`
      : `<button class="action-btn primary"   onclick="showHome()">Back to Levels &#127968;</button>`;

  } else if (result === 'close') {
    // Recommended retry but not forced
    const nextAction = !isLast
      ? `<button class="action-btn secondary" onclick="startLevel(${currentLevel + 1})">Move On &#8250;</button>`
      : `<button class="action-btn secondary" onclick="showHome()">Back to Levels</button>`;

    actionsHTML = `
      <button class="action-btn primary" onclick="startLevel(${currentLevel})">Try Again &#8617;</button>
      ${nextAction}`;

  } else {
    // Wrong: must retry
    actionsHTML = `
      <button class="action-btn primary"   onclick="startLevel(${currentLevel})">Try Again &#8617;</button>
      <button class="action-btn secondary" onclick="showHome()">Back to Levels</button>`;
  }

  setScreen(`
    <div class="result-screen">

      <div class="result-verdict">
        <div class="verdict-icon">${icon}</div>
        <div class="verdict-title">${title}</div>
        <div class="verdict-flag ${result}">You said: ${choiceLabel}</div>
        <div class="verdict-answer">The answer was: <strong>${correctLabel}</strong></div>
      </div>

      <div class="result-explanation">
        <h3>Why?</h3>
        <p>${explanationText}</p>
      </div>

      <div class="result-actions">
        ${actionsHTML}
      </div>

    </div>
  `);
}


// ============================================================
//  START THE GAME
// ============================================================
showHome();