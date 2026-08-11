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

  // Alle vorherigen Auswahlzustände zurücksetzen
  images.forEach(img => {
    img.chosen = false;
  });

  let grid = document.getElementById("grid");
  grid.innerHTML = "";
  

  // Kopie des Arrays mischen, damit das Original nicht verändert wird
  let shuffled = [...images].sort(() => Math.random() - 0.5);
  
shuffled.forEach((img) => {

  let div = document.createElement("div");
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
  let correct = images.every(img =>
    (img.drunk && img.chosen) || (!img.drunk && !img.chosen)
  );

  if(correct){
    success();
  } else {
    wrongCount++;

    let msgs = [
      "Fast! Das war wohl der Trauzeuge 😄",
      "Nicht ganz – aber guter Versuch!",
      "Der Bräutigam hat protestiert 🤖",
    ];

    if(wrongCount >= 5){
      msgs.push("Okay ehrlich… gib dein Bier kurz ab 🍺😄");
    }

    document.getElementById("msg").innerText =
      msgs[Math.floor(Math.random()*msgs.length)];

    renderGrid();
  }
}

/* SUCCESS */
function success(){
  document.getElementById("captcha").classList.add("hidden");
  document.getElementById("success").classList.remove("hidden");

  confetti();
}

/* CONFETTI */
function confetti() {

    const duration = 4000;
    const end = Date.now() + duration;

    const colors = [
        "#6b7d3a", // Oliv
        "#ff2e8a", // Pink
        "#ff9f6b", // Apricot
        "#e7d3b0", // Sand
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
