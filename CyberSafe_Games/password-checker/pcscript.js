const homeScreen       = document.getElementById("homeScreen");
const checkerScreen    = document.getElementById("checkerScreen");
const startBtn         = document.getElementById("startBtn");
const hubBtn           = document.getElementById("hubBtn");
const hubBtn2          = document.getElementById("hubBtn2");
const settingsBtn      = document.getElementById("settingsBtn");
const homeSettingsBtn  = document.getElementById("homeSettingsBtn");
const settingsModal    = document.getElementById("settingsModal");
const closeSettings    = document.getElementById("closeSettings");
const passwordInput    = document.getElementById("passwordInput");
const message          = document.getElementById("message");
const crackTime        = document.getElementById("crackTime");
const strengthBar      = document.getElementById("strengthBar");
const cardTitle        = document.getElementById("cardTitle");
const tipsList         = document.getElementById("tipsList");
const robotBox         = document.getElementById("robotBox");
const showPasswordToggle = document.getElementById("showPasswordToggle");
const clearBtn         = document.getElementById("clearBtn");
const speakResultBtn   = document.getElementById("speakResultBtn");
const ttsToggle        = document.getElementById("ttsToggle");
const themeButtons     = document.querySelectorAll(".theme-option");
const sizeButtons      = document.querySelectorAll(".size-option");

let lastResultText = "";

/* NAVIGATION */

hubBtn.addEventListener("click", () => {
  stopSpeech();
  window.location.href = '../MainMenu/mainmenu.html';
});

hubBtn2.addEventListener("click", () => {
  stopSpeech();
  window.location.href = '../MainMenu/mainmenu.html';
});

startBtn.addEventListener("click", () => {
  stopSpeech();
  homeScreen.classList.remove("active");
  checkerScreen.classList.add("active");
});

/* SETTINGS */

settingsBtn.addEventListener("click", openSettings);
homeSettingsBtn.addEventListener("click", openSettings);
closeSettings.addEventListener("click", closeSettingsModal);

settingsModal.addEventListener("click", (event) => {
  if (event.target === settingsModal) closeSettingsModal();
});

function openSettings() {
  settingsModal.classList.add("active");
}

function closeSettingsModal() {
  settingsModal.classList.remove("active");
}

/* TTS */

function isTtsOn() {
  return ttsToggle ? ttsToggle.checked : false;
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;

  // Remove emoji characters before speaking
  const cleanText = text
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .trim();

  const speech = new SpeechSynthesisUtterance(cleanText);

  speech.lang = "en-AU";
  speech.rate = 0.85;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

ttsToggle.addEventListener("change", () => {
  if (!isTtsOn()) stopSpeech();
});

speakResultBtn.addEventListener("click", () => {
  if (lastResultText) speakText(lastResultText);
});

/* SHOW / HIDE PASSWORD */

showPasswordToggle.addEventListener("change", () => {
  passwordInput.type = showPasswordToggle.checked ? "text" : "password";
});

/* CLEAR PASSWORD */

clearBtn.addEventListener("click", () => {
  passwordInput.value = "";
  checkPassword("");
  closeSettingsModal();
});

/* THEMES */

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.dataset.theme;
    document.body.classList.remove("theme-default", "theme-dark", "theme-light", "theme-blueyellow");
    document.body.classList.add(`theme-${selectedTheme}`);
    themeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

/* TEXT SIZE */

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const scale = button.dataset.scale;
    document.documentElement.style.setProperty("--font-scale", scale);
    sizeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

/* PASSWORD INPUT */

passwordInput.addEventListener("input", () => {
  checkPassword(passwordInput.value);
});

/* PASSWORD CHECKING */

function checkPassword(password) {
  let score = 0;
  let tips  = [];

  if (password.length > 0) {
    robotBox.classList.add("hidden");
  } else {
    robotBox.classList.remove("hidden");
  }

  if (password.length === 0) { resetUI(); return; }

  if (password.length >= 8)                             score++; else tips.push("Use at least 8 characters");
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; else tips.push("Mix uppercase and lowercase letters");
  if (/\d/.test(password))                              score++; else tips.push("Add some numbers");
  if (/[^A-Za-z0-9]/.test(password))                   score++; else tips.push("Add symbols like ! @ # $");
  if (password.length >= 12)                            score++; else tips.push("Make it a bit longer for better security");

  updateUI(score, password, tips);
}

/* UPDATE UI */

function updateUI(score, password, tips) {
  let percent = 0, barColor = "", msg = "", time = "", title = "";

  message.className = "";
  tipsList.innerHTML = "";

  if (score <= 1) {
    percent = 20; barColor = "#d97b5c";
    msg   = "&#10060; Oh no! Password is extremely weak!";
    time  = "&#9888;&#65039; Instant to crack";
    title = "&#128517; Come on, you can do better!!";
    message.classList.add("weak-text");
  } else if (score === 2 || score === 3) {
    percent = 55; barColor = "#d9b15c";
    msg   = "&#9889; Not bad, but it still needs improvement.";
    time  = "&#128336; Could take a few hours to crack";
    title = "&#128578; Almost there";
    message.classList.add("medium-text");
  } else {
    percent = 100; barColor = "#8ccf8a";
    msg   = "&#9989; Nice! Your password is pretty good!";
    time  = "&#128737;&#65039; " + estimateCrackTime(password);
    title = "&#127881; Great job! Keep it up!";
    message.classList.add("good-text");
  }

  strengthBar.style.width      = percent + "%";
  strengthBar.style.background = barColor;
  message.innerHTML             = msg;
  crackTime.innerHTML           = time;
  cardTitle.textContent         = title;

  if (tips.length === 0) {
    tipsList.innerHTML = "<li>&#9989; Safe to use</li><li>&#128737;&#65039; A hacker would need longer to crack this password</li>";
  } else {
    tips.forEach((tip) => {
      const li = document.createElement("li");
      li.textContent = "&#128161; " + tip;
      tipsList.appendChild(li);
    });
  }

  /* store plain text for TTS replay */
  lastResultText = message.textContent + ". " + crackTime.textContent;
  if (isTtsOn()) speakText(lastResultText);
}

/* CRACK TIME */

function estimateCrackTime(password) {
  const length    = password.length;
  const hasLower  = /[a-z]/.test(password);
  const hasUpper  = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  let pool = 0;
  if (hasLower)  pool += 26;
  if (hasUpper)  pool += 26;
  if (hasNumber) pool += 10;
  if (hasSymbol) pool += 32;
  const combinations = Math.pow(pool || 1, length);
  if (combinations < 1e6)  return "Instant to crack";
  if (combinations < 1e9)  return "A few minutes to crack";
  if (combinations < 1e12) return "A few hours to crack";
  if (combinations < 1e15) return "Several months to crack";
  if (combinations < 1e18) return "Many years to crack";
  return "Hundreds of years to crack";
}

/* RESET UI */

function resetUI() {
  stopSpeech();
  lastResultText = "";
  message.textContent        = "Start typing to check your password strength.";
  crackTime.textContent      = "";
  strengthBar.style.width    = "0%";
  strengthBar.style.background = "transparent";
  cardTitle.textContent      = "Tips";
  message.className          = "";
  tipsList.innerHTML = `
    <li>Use at least 8 characters</li>
    <li>Mix uppercase and lowercase letters</li>
    <li>Add numbers</li>
    <li>Add symbols like ! @ # $</li>
  `;
}
