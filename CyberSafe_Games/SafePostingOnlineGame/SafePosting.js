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

/* TOP BAR */
function topBar(title){

return `
<div class="topbar">

<span onclick="home()">🏠</span>

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
</div>

<button
class="answer-btn safe-btn"
onclick="answer(true)">

👍 SAFE TO POST

</button>

<button
class="answer-btn unsafe-btn"
onclick="answer(false)">

👎 NOT SAFE

</button>

</div>`;
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

document.getElementById("screen").innerHTML = `

${topBar("Answer")}

<div class="content">

<div class="result-title
${correct ? "good" : "bad"}">

${correct ? "Correct ✔" : "Oops ✖"}

</div>

<p>
${current.reason}
</p>

<button class="next-btn"
onclick="next()">

NEXT

</button>

</div>`;
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

document.getElementById("screen").innerHTML = `

${topBar("Settings")}

<div class="content">

<h2>Choose a Theme</h2>

<div class="setting-option"
onclick="setTheme('normal')">

🌸 Default Theme

</div>

<div class="setting-option"
onclick="setTheme('dark')">

🌙 Dark Theme

</div>

<div class="setting-option"
onclick="setTheme('contrast-dark')">

⚫ High Contrast Dark

</div>

<div class="setting-option"
onclick="setTheme('contrast-light')">

⚪ High Contrast Light

</div>

<div class="setting-option"
onclick="setTheme('blue-yellow')">

🔵 Blue & Yellow Accessible

</div>

<h2 style="margin-top:30px;">
Text Size
</h2>

<div class="setting-option"
onclick="setTextSize('small')">

🔤 Small Text

</div>

<div class="setting-option"
onclick="setTextSize('medium')">

🔠 Medium Text

</div>

<div class="setting-option"
onclick="setTextSize('large')">

🅰 Large Text

</div>

<div class="setting-option"
onclick="setTextSize('xlarge')">

🅰🅰 Extra Large Text

</div>

<button class="next-btn"
onclick="show()">

DONE

</button>

</div>`;
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

let phone =
document.querySelector(".phone");

/* REMOVE OLD TEXT SIZES */
phone.classList.remove(
"text-small",
"text-medium",
"text-large",
"text-xlarge"
);

/* APPLY SIZE */
if(size === "small"){
    phone.classList.add("text-small");
}

if(size === "medium"){
    phone.classList.add("text-medium");
}

if(size === "large"){
    phone.classList.add("text-large");
}

if(size === "xlarge"){
    phone.classList.add("text-xlarge");
}
}

/* START */
home();