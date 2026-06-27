const images = [
  {src:"images/1.jpg", drunk:true},
  {src:"images/2.jpg", drunk:true},
  {src:"images/3.jpg", drunk:true},
  {src:"images/4.jpg", drunk:true},
  {src:"images/5.jpg", drunk:true},
  {src:"images/6.jpg", drunk:true},
  {src:"images/7.jpg", drunk:true},
  {src:"images/8.jpg", drunk:true},
  {src:"images/9.jpg", drunk:true},
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

  currentTask = tasks[Math.floor(Math.random()*tasks.length)].text;
  document.getElementById("taskBox").innerText = currentTask;

  renderGrid();
}

/* GRID */
function renderGrid(){
  selected = [];
  let grid = document.getElementById("grid");
  grid.innerHTML = "";

  let shuffled = images.sort(()=>Math.random()-0.5);

  shuffled.forEach((img, i)=>{
    let div = document.createElement("div");
    div.className="cell";
    div.style.backgroundImage = `url(${img.src})`;

    div.onclick = ()=>{
      div.classList.toggle("selected");
      img.chosen = !img.chosen;
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
function confetti(){
  for(let i=0;i<80;i++){
    let c = document.createElement("div");
    c.style.position="fixed";
    c.style.left=Math.random()*100+"%";
    c.style.top="-10px";
    c.style.width="8px";
    c.style.height="8px";
    c.style.background=["#ff2e8a","#ff9f6b","#6b7d3a","#e7d3b0"][Math.floor(Math.random()*4)];
    document.body.appendChild(c);

    let fall = setInterval(()=>{
      c.style.top = (parseFloat(c.style.top)+2)+"px";
      if(parseFloat(c.style.top)>window.innerHeight){
        c.remove();
        clearInterval(fall);
      }
    },10);
  }
}
