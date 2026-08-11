const images = [
  {src:"images/betrunken1.jpg", drunk:true},
  {src:"images/betrunken2.jpg", drunk:true},
  {src:"images/betrunken3.jpg", drunk:true},
  {src:"images/betrunken4.jpg", drunk:true},
  {src:"images/nüchtern1.jpg", drunk:false},
  {src:"images/nüchtern2.jpg", drunk:false},
  {src:"images/nüchtern3.jpg", drunk:false},
  {src:"images/nüchtern4.jpg", drunk:false},
  {src:"images/nüchtern5.jpg", drunk:false},
];

let selected = [];
let currentTask = "";
let wrongCount = 0;

/* LOADING */
let p = 0;
let load = setInterval(()=>{
  p += 5;
  document.querySelector(".barFill").style.width = p + "%";
  document.getElementById("loadText").innerText = p + "%";

  if(p >= 100){
    clearInterval(load);
    document.getElementById("loading").style.display="none";
    startCaptcha();
  }
}, 80);

/* TASKS */
const tasks = [
  {text:"Klicke alle Bilder an, bei denen das Brautpaar betrunken aussieht 🍻"},
];

function startCaptcha(){
  document.getElementById("captcha").classList.remove("hidden");

  document.getElementById("msg").innerText = "";

  currentTask = tasks[Math.floor(Math.random()*tasks.length)].text;
  document.getElementById("taskBox").innerText = currentTask;

  renderGrid();
}

/* GRID */
function renderGrid(){

  // Auswahl vom vorherigen Versuch vollständig löschen
  images.forEach(img => {
    img.chosen = false;
  });

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  // Nicht das Originalarray verändern
  const shuffled = [...images].sort(() => Math.random() - 0.5);

  shuffled.forEach((img) => {

    const div = document.createElement("div");

    div.className = "cell";
    div.style.backgroundImage = `url(${img.src})`;

    div.onclick = () => {

      img.chosen = !img.chosen;

      if (img.chosen) {
        div.classList.add("selected");
      } else {
        div.classList.remove("selected");
      }
    };

    grid.appendChild(div);
  });
}


/* CHECK */
function check(){

  const correct = images.every(img =>
    (img.drunk && img.chosen === true) ||
    (!img.drunk && img.chosen !== true)
  );

  if(correct){

    success();

  } else {

    wrongCount++;

    const msgs = [
      "Fast! Das war wohl der Trauzeuge 😄",
      "Nicht ganz – aber guter Versuch!",
      "Der Bräutigam hat protestiert 🤖",
    ];

    if(wrongCount >= 5){
      msgs.push("Okay ehrlich… gib dein Bier kurz ab 🍺😄");
    }

    const message =
      msgs[Math.floor(Math.random() * msgs.length)];

    // Neue Bilder und Auswahlzustände erzeugen
    renderGrid();

    // Fehlermeldung DANACH anzeigen
    document.getElementById("msg").innerText = message;
  }
}


/* SUCCESS */
function success(){

  document.getElementById("captcha").classList.add("hidden");
  document.getElementById("success").classList.remove("hidden");

  startConfetti();
}

/* CONFETTI */
function startConfetti() {

  const duration = 4000;
  const end = Date.now() + duration;

  const colors = [
    "#6b7d3a",
    "#ff2e8a",
    "#ff9f6b",
    "#e7d3b0",
    "#ffffff"
  ];

  (function frame() {

    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: colors
    });

    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }

  })();
}
