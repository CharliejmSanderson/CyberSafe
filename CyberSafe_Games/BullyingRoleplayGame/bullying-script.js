const hubBtn = document.getElementById("hubBtn");
const exitToHubBtn = document.getElementById("exitToHubBtn");

const settingsBtn = document.getElementById("settingsBtn");
const closeSettings = document.getElementById("closeSettings");
const settingsModal = document.getElementById("settingsModal");

const speakBtn = document.getElementById("speakBtn");
const stopSpeechBtn = document.getElementById("stopSpeechBtn");
const ttsToggle = document.getElementById("ttsToggle");

const homeScreen = document.getElementById("homeScreen");
const listScreen = document.getElementById("listScreen");
const chatScreen = document.getElementById("chatScreen");

const startBtn = document.getElementById("startBtn");
const backToListBtn = document.getElementById("backToListBtn");

const contactList = document.getElementById("contactList");
const chatAvatar = document.getElementById("chatAvatar");
const chatName = document.getElementById("chatName");
const chatArea = document.getElementById("chatArea");
const choiceArea = document.getElementById("choiceArea");

const tipBox = document.getElementById("tipBox");
const tipText = document.getElementById("tipText");
const closeTipBtn = document.getElementById("closeTipBtn");

const themeButtons = document.querySelectorAll(".theme-option");
const sizeButtons = document.querySelectorAll(".size-option");

let currentChat = null;
let round = 1;
let completedChats = [];
let lastSpokenText = "";

const contacts = [
  {
    id: 1,
    name: "Sir Sly Paws",
    avatar: "🦊",
    preview: "Hey, why are you even here?",
    situation: "A person in a chat is making rude comments about you.",
    firstMessage: "Hey, why are you even here? Nobody wants you in this group.",
    continueMessage: "I do not care. You are still annoying and everyone knows it.",
    apologyMessage: "Okay... I am sorry. That was rude of me.",
    finalMessage: "Fine. I will stop messaging you.",
    choices1: [
      {
        text: "Please stop. That is hurtful.",
        type: "good",
        reply: "Okay... I am sorry. That was rude of me.",
        tip: "Good choice. You used calm words and clearly told the person to stop.",
        endsEarly: true
      },
      {
        text: "You are worse than me!",
        type: "bad",
        reply: "Haha, now you are angry. This is funny.",
        tip: "Try not to reply with insults. It can make the bullying worse."
      },
      {
        text: "I will ignore you forever.",
        type: "warning",
        reply: "You cannot ignore me. I will keep messaging you.",
        tip: "Ignoring can help sometimes, but if bullying continues, you should block, report, or ask for help."
      }
    ],
    choices2: [
      {
        text: "I am blocking and reporting this chat.",
        type: "good",
        reply: "Wait, no. I will stop.",
        tip: "Great choice. Blocking and reporting can protect you from continued bullying."
      },
      {
        text: "Keep going, I do not care.",
        type: "warning",
        reply: "Then I will keep saying things.",
        tip: "Pretending it does not hurt may not solve the problem. It is okay to get support."
      },
      {
        text: "I will tell everyone your secrets.",
        type: "bad",
        reply: "That is not okay either.",
        tip: "Do not share someone else's private information. Use safe tools like blocking, reporting, and asking for help."
      }
    ]
  },
  {
    id: 2,
    name: "Mocking Panda",
    avatar: "🐼",
    preview: "Your photo looks so weird.",
    situation: "Someone is making fun of your photo online.",
    firstMessage: "Your photo looks so weird. I am going to send it to everyone.",
    continueMessage: "Too late. Maybe I should post it in another group too.",
    apologyMessage: "Sorry. I should not make fun of your photo.",
    finalMessage: "Okay, I will delete it.",
    choices1: [
      {
        text: "Please do not share my photo. I do not give permission.",
        type: "good",
        reply: "Sorry. I should not make fun of your photo.",
        tip: "Good response. You clearly said no and protected your privacy.",
        endsEarly: true
      },
      {
        text: "Share it then, I do not care.",
        type: "warning",
        reply: "Okay, then I might post it.",
        tip: "If you do care, say clearly that they do not have permission. You can also report them."
      },
      {
        text: "I will post a bad photo of you too.",
        type: "bad",
        reply: "Go on then. I dare you.",
        tip: "Do not respond by doing the same harmful behaviour. It can make the situation worse."
      }
    ],
    choices2: [
      {
        text: "I will save this message and report it.",
        type: "good",
        reply: "Okay, I will delete it.",
        tip: "Excellent choice. Saving evidence and reporting is a safe way to respond."
      },
      {
        text: "I will keep arguing with you.",
        type: "bad",
        reply: "This is getting more fun.",
        tip: "Long arguments can make online bullying worse. Try to step away and ask for help."
      },
      {
        text: "I will leave this chat now.",
        type: "good",
        reply: "Fine. Leave then.",
        tip: "Leaving an unsafe chat is a good way to protect yourself."
      }
    ]
  },
  {
    id: 3,
    name: "Rude Koala",
    avatar: "🐨",
    preview: "You are too slow to understand.",
    situation: "Someone is insulting your ability to understand something.",
    firstMessage: "You are too slow to understand this. Why do you even try?",
    continueMessage: "I am just telling the truth. You should not be here.",
    apologyMessage: "I am sorry. I should have been kinder.",
    finalMessage: "Okay, I will stop now.",
    choices1: [
      {
        text: "That is unkind. Please speak respectfully.",
        type: "good",
        reply: "I am sorry. I should have been kinder.",
        tip: "Good choice. You calmly asked for respectful communication.",
        endsEarly: true
      },
      {
        text: "Maybe you are the stupid one.",
        type: "bad",
        reply: "Now you are being rude too.",
        tip: "Replying with more insults can make the problem bigger."
      },
      {
        text: "I will not say anything.",
        type: "warning",
        reply: "See? You cannot even answer.",
        tip: "Staying silent may help sometimes, but if the person continues, use block, report, or ask someone for support."
      }
    ],
    choices2: [
      {
        text: "I am going to ask a trusted person for help.",
        type: "good",
        reply: "Okay, I will stop now.",
        tip: "Great choice. Asking a trusted person for help is safe and responsible."
      },
      {
        text: "I will keep reading your messages.",
        type: "warning",
        reply: "Then I will keep sending them.",
        tip: "You do not have to keep reading hurtful messages. It is okay to leave or block."
      },
      {
        text: "I will threaten you back.",
        type: "bad",
        reply: "That is serious. You should not threaten people.",
        tip: "Threatening someone is unsafe. Use reporting tools and ask for help instead."
      }
    ]
  },
  {
    id: 4,
    name: "Loud Tiger",
    avatar: "🐯",
    preview: "Everyone is laughing at you.",
    situation: "Someone claims other people are laughing at you.",
    firstMessage: "Everyone is laughing at you in the other chat.",
    continueMessage: "I can send more screenshots if you want to feel worse.",
    apologyMessage: "I am sorry. I should not have said that.",
    finalMessage: "Okay, I will stop sending messages.",
    choices1: [
      {
        text: "Please stop. I do not want to be treated like this.",
        type: "good",
        reply: "I am sorry. I should not have said that.",
        tip: "Good choice. You clearly said how you feel and asked them to stop.",
        endsEarly: true
      },
      {
        text: "Send them. I want to see everything.",
        type: "warning",
        reply: "Okay, I will send more.",
        tip: "Seeing more hurtful messages may make you feel worse. Consider asking a trusted person for help."
      },
      {
        text: "I will make everyone laugh at you too.",
        type: "bad",
        reply: "Now you are bullying me too.",
        tip: "Do not respond by bullying back. Choose safer actions like saving evidence, blocking, and reporting."
      }
    ],
    choices2: [
      {
        text: "I am saving this and reporting it.",
        type: "good",
        reply: "Okay, I will stop sending messages.",
        tip: "Excellent response. Saving evidence and reporting helps protect you."
      },
      {
        text: "I will delete the app.",
        type: "warning",
        reply: "You do not have to delete everything.",
        tip: "You do not always need to delete the app. You can block the person, report the chat, and ask for support."
      },
      {
        text: "I will post angry comments about you.",
        type: "bad",
        reply: "That will only make things worse.",
        tip: "Posting angry comments can escalate the situation. Use safer actions instead."
      }
    ]
  }
];

function showScreen(screen) {
  homeScreen.classList.remove("active");
  listScreen.classList.remove("active");
  chatScreen.classList.remove("active");

  screen.classList.add("active");
}

function renderContactList() {
  contactList.innerHTML = "";

  contacts.forEach((contact) => {
    const card = document.createElement("div");
    card.className = "contact-card";

    const completed = completedChats.includes(contact.id);

    card.innerHTML = `
      <div class="avatar">${contact.avatar}</div>
      <div class="contact-info">
        <h3>${contact.name} ${completed ? "✅" : ""}</h3>
        <p>${completed ? "Conversation completed" : contact.preview}</p>
      </div>
    `;

    card.addEventListener("click", () => openChat(contact));

    contactList.appendChild(card);
  });
}

function openChat(contact) {
  stopSpeech();

  currentChat = contact;
  round = 1;

  chatAvatar.textContent = contact.avatar;
  chatName.textContent = contact.name;

  chatArea.innerHTML = "";
  choiceArea.innerHTML = "";
  tipBox.classList.add("hidden");

  addMessage(contact.firstMessage, "left");

  renderChoices(contact.choices1);

  showScreen(chatScreen);
}

function renderChoices(choices) {
  choiceArea.innerHTML = "";

  choices.forEach((choice) => {
    const btn = document.createElement("button");

    btn.className = `choice-btn choice-${choice.type}`;
    btn.textContent = choice.text;

    btn.addEventListener("click", () => handleChoice(choice));

    choiceArea.appendChild(btn);
  });
}

function handleChoice(choice) {
  stopSpeech();

  addMessage(choice.text, "right");

  setTimeout(() => {
    addMessage(choice.reply, "left");
    showTip(choice.tip);

    if (isTtsOn()) speakText(choice.tip);

    if (choice.endsEarly) {
      setTimeout(() => {
        showThankYouChoice();
      }, 700);
      return;
    }

    if (round === 1) {
      round = 2;

      setTimeout(() => {
        addMessage(currentChat.continueMessage, "left");
        renderChoices(currentChat.choices2);
      }, 1100);
    } else {
      completeChat();
    }
  }, 700);
}

function showThankYouChoice() {
  choiceArea.innerHTML = "";

  const btn = document.createElement("button");
  btn.className = "choice-btn choice-good";
  btn.textContent = "Thank you. I will leave the chat now.";

  btn.addEventListener("click", () => {
    addMessage(btn.textContent, "right");

    setTimeout(() => {
      showTip("Good ending. When someone apologises, you can thank them, leave the chat, and protect your peace.");
      completeChat();
    }, 700);
  });

  choiceArea.appendChild(btn);
}

function completeChat() {
  choiceArea.innerHTML = "";

  if (!completedChats.includes(currentChat.id)) {
    completedChats.push(currentChat.id);
  }

  const doneBtn = document.createElement("button");
  doneBtn.className = "choice-btn choice-good";
  doneBtn.textContent = "Conversation completed. Go back to chat list.";

  doneBtn.addEventListener("click", () => {
    renderContactList();
    showScreen(listScreen);
  });

  choiceArea.appendChild(doneBtn);
}

function addMessage(text, side) {
  const bubble = document.createElement("div");
  bubble.className = side === "left" ? "message-left" : "message-right";

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  bubble.innerHTML = `
    <div>${text}</div>
    <div class="message-time">${time}</div>
  `;

  chatArea.appendChild(bubble);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function showTip(text) {
  tipText.textContent = text;
  tipBox.classList.remove("hidden");
  lastSpokenText = text;
}

function isTtsOn() {
  return ttsToggle ? ttsToggle.checked : false;
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;

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
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

hubBtn.addEventListener("click", () => {
  stopSpeech();
  window.location.href = "../mainmenu.html";
});

exitToHubBtn.addEventListener("click", () => {
  stopSpeech();
  window.location.href = "../mainmenu.html";
});

startBtn.addEventListener("click", () => {
  renderContactList();
  showScreen(listScreen);
});

backToListBtn.addEventListener("click", () => {
  stopSpeech();
  renderContactList();
  showScreen(listScreen);
});

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.add("active");
});

closeSettings.addEventListener("click", () => {
  settingsModal.classList.remove("active");
});

settingsModal.addEventListener("click", (event) => {
  if (event.target === settingsModal) {
    settingsModal.classList.remove("active");
  }
});

closeTipBtn.addEventListener("click", () => {
  tipBox.classList.add("hidden");
});

speakBtn.addEventListener("click", () => {
  if (lastSpokenText) {
    speakText(lastSpokenText);
  } else {
    speakText("Welcome to Bullying Roleplay. Choose a chat and practise a safe response to online bullying.");
  }
});

stopSpeechBtn.addEventListener("click", stopSpeech);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;

    document.body.classList.remove(
      "theme-default",
      "theme-dark",
      "theme-light",
      "theme-blueyellow"
    );

    document.body.classList.add(`theme-${theme}`);

    themeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const scale = button.dataset.scale;

    document.documentElement.style.setProperty("--font-scale", scale);

    sizeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});