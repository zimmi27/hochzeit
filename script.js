let images = [
  {src:"images/1.jpg", drunk:true, chosen:false},
  {src:"images/2.jpg", drunk:true, chosen:false},
  {src:"images/3.jpg", drunk:true, chosen:false},
  {src:"images/4.jpg", drunk:true, chosen:false},
  {src:"images/5.jpg", drunk:true, chosen:false},
  {src:"images/6.jpg", drunk:true, chosen:false},
  {src:"images/7.jpg", drunk:true, chosen:false},
  {src:"images/8.jpg", drunk:true, chosen:false},
  {src:"images/9.jpg", drunk:true, chosen:false},
];

let lastClick = 0;
let wrong = 0;

/* LOADING */
let p=0;
let load=setInterval(()=>{
  p+=5;
  document.querySelector(".barFill").style.width=p+"%";
  document.getElementById("loadText").innerText=p+"%";
  if(p>=100){
    clearInterval(load);
    document.getElementById("loading").style.display="none";
    start();
  }
},70);

/* CAPTCHA */
function start(){
  document.getElementById("captcha").classList.remove("hidden");

  document.getElementById("taskBox").innerText =
    "Klicke alle Bilder an, bei denen das Brautpaar betrunken aussieht 🍻";

  render();
}

function render(){
  let grid=document.getElementById("grid");
  grid.innerHTML="";
  images.sort(()=>Math.random()-0.5);

  images.forEach(img=>{
    let d=document.createElement("div");
    d.className="cell";
    d.style.backgroundImage=`url(${img.src})`;

    d.onclick=()=>{

      openZoom(img.src);

      img.chosen=!img.chosen;
      d.classList.toggle("selected");
    };

    grid.appendChild(d);
  });
}

/* CHECK + ANTI DOUBLE CLICK */
function check(){

  if(Date.now()-lastClick<2000){
    document.getElementById("msg").innerText="Langsam 😄";
    return;
  }
  lastClick=Date.now();

  let ok=images.every(i=>i.drunk===i.chosen);

  if(ok){
    success();
  }else{
    wrong++;
    document.getElementById("msg").innerText="Fast 😄 Versuch's nochmal";
    render();
  }

  if(wrong>=5){
    document.getElementById("msg").innerText="🍺 Gib das Bier kurz ab 😄";
  }
}

/* SUCCESS */
function success(){
  document.getElementById("captcha").classList.add("hidden");
  document.getElementById("success").classList.remove("hidden");
  document.getElementById("tableView").classList.remove("hidden");

  confetti();
}

/* CONFETTI */
function confetti(){
  window.confetti({
    particleCount:120,
    spread:80,
    origin:{y:0.6}
  });
}

/* LIGHTBOX */
function openZoom(src){
  document.getElementById("zoomImg").src=src;
  document.getElementById("lightbox").classList.remove("hidden");
}

function closeZoom(){
  document.getElementById("lightbox").classList.add("hidden");
}

/* TABLE CLICK */
document.addEventListener("click",e=>{
  if(e.target.classList.contains("table")){
    document.getElementById("tableInfo").innerText =
      "👉 " + e.target.dataset.info;
  }
});

/* PARALLAX */
document.addEventListener("mousemove",e=>{
  let x=(e.clientX/window.innerWidth-0.5)*2;
  let y=(e.clientY/window.innerHeight-0.5)*2;

  document.querySelector(".layer-back").style.transform=`translate(${x*10}px,${y*10}px)`;
  document.querySelector(".layer-mid").style.transform=`translate(${x*20}px,${y*20}px)`;
  document.querySelector(".layer-front").style.transform=`translate(${x*30}px,${y*30}px)`;
});
