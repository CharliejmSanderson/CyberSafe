const bgm = document.getElementById("bgm");
const musicToggleBtn = document.getElementById("musicToggleBtn");

let musicOn = localStorage.getItem("musicOn") === "true";
let needsResumeTap = false;

function startMusic() {
  if (!bgm || !musicOn) return;

  bgm.volume = 0.25;

  bgm.play()
    .then(() => {
      needsResumeTap = false;
      musicToggleBtn.textContent = "🔇 Turn Off Music";
    })
    .catch(() => {
      needsResumeTap = true;
      musicToggleBtn.textContent = "🎵 Tap to Resume Music";
    });
}

function stopMusic() {
  if (!bgm) return;
  bgm.pause();
}

function updateMusicButton() {
  if (!musicToggleBtn) return;

  if (needsResumeTap && musicOn) {
    musicToggleBtn.textContent = "🎵 Tap to Resume Music";
  } else {
    musicToggleBtn.textContent = musicOn
      ? "🔇 Turn Off Music"
      : "🎵 Turn On Music";
  }
}

function toggleMusic() {
  if (needsResumeTap && musicOn) {
    startMusic();
    return;
  }

  musicOn = !musicOn;
  localStorage.setItem("musicOn", musicOn);

  if (musicOn) {
    startMusic();
  } else {
    needsResumeTap = false;
    stopMusic();
    updateMusicButton();
  }
}

if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", toggleMusic);
}

updateMusicButton();

if (musicOn) {
  startMusic();
}

function launchGame(path) {
  stopSpeech();
  window.location.href = path;
}

function speakText(text) {
  stopMusic();
  if (!("speechSynthesis" in window)) {
    alert("Text-to-speech is not supported on this browser.");
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-AU";
  speech.rate = 0.85;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (musicOn) {
    startMusic();
  }
}

function speakIntro() {
  const introText =
    "Welcome to the Cyber Safety Game Hub. Please select a game to start learning about online safety. " +
    "Bullying Roleplay helps you practise safe responses to online bullying. " +
    "Online Dating Safety helps you learn safe choices in online dating chats. " +
    "Password Checker helps you check password strength. " +
    "Spot the Scam helps you identify fake messages and emails. " +
    "Safe Posting Online helps you decide what is safe to post online.";

  speakText(introText);
}
