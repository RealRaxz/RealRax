const proAdBtn = document.getElementById("proAdBtn");
const proLikeBtn = document.getElementById("proLikeBtn");
const proProgressContainer = document.getElementById("proProgressContainer");
const proProgressBar = document.getElementById("proProgressBar");
const proContinueBtn = document.getElementById("proContinueBtn");

let proActions = { ad:false, like:false };
let busy = false;
let progress = 0;

function verify(link, key) {
  if (busy) return;
  busy = true;

  const win = window.open(link,"_blank");
  const start = Date.now();

  const interval = setInterval(()=>{
    if(!win || win.closed){
      clearInterval(interval);
      const elapsed = Date.now() - start;
      setTimeout(()=>{
        proActions[key] = true;
        updateProUI();
        busy = false;
      }, Math.max(2000-elapsed,0));
    }
  },100);
}

function updateProUI(){
  if(proActions.ad){
    proAdBtn.textContent="Done";
    proAdBtn.style.pointerEvents="none";
    proLikeBtn.classList.remove("disabled");
    document.getElementById("proStep1").classList.remove("active");
    document.getElementById("proStep2").classList.add("active");
  }
  if(proActions.like){
    proLikeBtn.textContent="Done";
    proLikeBtn.style.pointerEvents="none";
    document.getElementById("proStep2").classList.remove("active");
    document.getElementById("proStep3").classList.add("active");
  }

  if(proActions.ad && proActions.like && progress===0){
    proProgressContainer.style.display="block";
    startProProgress();
  }
}

function startProProgress(){
  const interval = setInterval(()=>{
    progress++;
    proProgressBar.style.width = progress+"%";
    if(progress>=100){
      clearInterval(interval);
      proContinueBtn.style.display="block";
    }
  },30);
}

proAdBtn.addEventListener("click",()=>verify(proAdBtn.href,"ad"));
proLikeBtn.addEventListener("click",()=>verify(proLikeBtn.href,"like"));
proContinueBtn.addEventListener("click",()=>{
  document.getElementById("proPopup").style.display="none";
});
