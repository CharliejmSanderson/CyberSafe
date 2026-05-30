let index = 0;
let score = 0;
let attempts = [];

/* SCENARIOS */
let scenarios = [

{
    t:"Sharing a sunset photo 🌅",
    safe:true,
    reason:"This is okay because it does not share private information."
},

{
    t:"Posting your home address 🏠",
    safe:false,
    reason:"Your address is private and could be dangerous to share online."
},

{
    t:"Sharing a birthday cake photo 🎂",
    safe:true,
    reason:"This photo is safe because it does not show personal details."
},

{
    t:"Posting your bank card 💳",
    safe:false,
    reason:"Bank details should never be shared online."
},

{
    t:"Sharing a pet photo 🐶",
    safe:true,
    reason:"This is usually safe to share online."
},

{
    t:"Showing your school ID 🪪",
    safe:false,
    reason:"School IDs contain personal information."
}

];

/* TTS */

function isTtsOn(){
    const t = document.getElementById('ttsToggle');
    return t ? t.checked : false;
}

function speakText(text){
    if(!('speechSynthesis' in window)) return;
    const s = new SpeechSynthesisUtterance(text);
    s.lang = 'en-AU'; s.rate = 0.85; s.pitch = 1; s.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(s);
}

function stopSpeech(){
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function handleTtsToggle(){
    if(!isTtsOn()) stopSpeech();
}

/* TOP BAR */
function topBar(title){

return `
<div class="topbar">

<span onclick="window.location.href='../MainMenu/mainmenu.html'">🏠</span>

<span>${title}</span>

<span onclick="settings()">⚙️</span>

</div>`;
}

/* HOME */
function home(){

index = 0;
score = 0;
attempts = [];

show();
}

/* SHOW QUESTION */
function show(){

let data = scenarios[index];

let progressPercent =
((index) / scenarios.length) * 100;

const escaped = data.t.replace(/'/g, "\\'").replace(/"/g, '&quot;');

document.getElementById("screen").innerHTML = `

${topBar("Safe Posting Online")}

<div class="content">

<h1>Online Safety</h1>

<div class="progress-box">
<div class="progress"
style="width:${progressPercent}%">
</div>
</div>

<h2>Is this safe to post online?</h2>

<div class="card">
${data.t}
<button class="speak-btn" onclick="speakText('${escaped}')" aria-label="Read aloud">&#128266;</button>
</div>

<button
class="answer-btn safe-btn"
onclick="answer(true)">

&#128077; SAFE TO POST

</button>

<button
class="answer-btn unsafe-btn"
onclick="answer(false)">

&#128078; NOT SAFE

</button>

</div>`;

if(isTtsOn()) speakText(data.t);
}
}

/* ANSWER */
function answer(choice){

let current = scenarios[index];

let correct =
current.safe === choice;

/* SAVE ATTEMPT */
attempts.push({
    question: current.t,
    chosen: choice,
    correctAnswer: current.safe,
    correct: correct
});

if(correct){
    score++;
}

const resultText = (correct ? "Correct!" : "Oops!") + " " + current.reason;
const escaped = current.reason.replace(/'/g, "\\'").replace(/"/g, '&quot;');

document.getElementById("screen").innerHTML = `

${topBar("Answer")}

<div class="content">

<div class="result-title
${correct ? "good" : "bad"}">

${correct ? "Correct &#10004;" : "Oops &#10006;"}

</div>

<p>
${current.reason}
<button class="speak-btn" onclick="speakText('${escaped}')" aria-label="Read aloud">&#128266;</button>
</p>

<button class="next-btn"
onclick="next()">

NEXT

</button>

</div>`;

if(isTtsOn()) speakText(resultText);
}
}

/* NEXT */
function next(){

index++;

if(index < scenarios.length){

    show();

}else{

    finalResult();
}
}

/* FINAL RESULT */
function finalResult(){

let reviewHTML = "";

attempts.forEach(item => {

reviewHTML += `

<div class="badge">

<div style="
font-weight:bold;
margin-bottom:10px;
">

${item.question}

</div>

<div>
Your answer:
<b>
${item.chosen ? "SAFE" : "NOT SAFE"}
</b>
</div>

<div style="margin-top:5px;">
Correct answer:
<b>
${item.correctAnswer ? "SAFE" : "NOT SAFE"}
</b>
</div>

<div style="
margin-top:10px;
font-weight:bold;
color:${item.correct ? "green" : "red"};
">

${item.correct ? "✔ Correct" : "✖ Wrong"}

</div>

</div>
`;
});

document.getElementById("screen").innerHTML = `

${topBar("Your Results")}

<div class="content">

<h1>Great Job!</h1>

<h2>
You got ${score}
out of ${scenarios.length}
</h2>

${badge("⭐ Beginner", score >= 1)}

${badge("🟢 Smart User", score >= 3)}

${badge("🏆 Safety Expert", score >= 5)}

<h2 style="margin-top:30px;">
Review Your Answers
</h2>

${reviewHTML}

<button class="next-btn"
onclick="home()">

PLAY AGAIN

</button>

</div>`;
}

/* BADGES */
function badge(title, unlocked){

return `
<div class="badge">

${title}
${unlocked ? "✔" : "🔒"}

</div>`;
}

/* SETTINGS */
function settings(){
document.getElementById('settingsModal') && document.getElementById('settingsModal').classList.add('active');
document.getElementById('settingsOverlay') && document.getElementById('settingsOverlay').classList.add('active');
}

function closeSettings(){
document.getElementById('settingsOverlay') && document.getElementById('settingsOverlay').classList.remove('active');
}
/* THEME */
function setTheme(theme){

let phone =
document.querySelector(".phone");

/* REMOVE OLD THEMES */
phone.classList.remove(
"dark-theme",
"contrast-dark",
"contrast-light",
"blue-yellow"
);

/* APPLY THEME */
if(theme === "dark"){
    phone.classList.add("dark-theme");
}

if(theme === "contrast-dark"){
    phone.classList.add("contrast-dark");
}

if(theme === "contrast-light"){
    phone.classList.add("contrast-light");
}

if(theme === "blue-yellow"){
    phone.classList.add("blue-yellow");
}
}

/* TEXT SIZE */
function setTextSize(size){

const scaleMap = { small:0.85, medium:1, large:1.2, xlarge:1.4 };
document.documentElement.style.setProperty('--font-scale', scaleMap[size] || 1);
}

/* START */
home();
