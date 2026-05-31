function launchGame(path) {
  window.location.href = path;
}

function speakText(text) {
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
