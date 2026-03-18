const overlay=document.getElementById("gateOverlay");
const b1=document.getElementById("btn1");
const b2=document.getElementById("btn2");
const fill=document.getElementById("fill");
const percent=document.getElementById("percent");
const enterBtn=document.getElementById("enterBtn");

requestAnimationFrame(()=>overlay.classList.add("show"));

let step=0;
let busy=false;

/* verify รองรับกลับเร็ว */
function verify(link, cb){
  if(busy)return;
  busy=true;

  const newWindow = window.open(link,"_blank");
  const start = Date.now();
  
  const checkInterval = setInterval(()=>{
    if(newWindow.closed){ 
      clearInterval(checkInterval);
      const elapsed = Date.now() - start;
      if(elapsed >= 2000){ 
        cb();
      }else{
        setTimeout(cb, 2000 - elapsed); 
      }
      busy=false;
    }
  },100);
}

/* step1 */
b1.onclick=()=>verify("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6",()=>{
  step=1;
  b1.classList.add("success");
  b1.textContent="Done";
  b2.classList.remove("lock");
});

/* step2 */
b2.onclick=()=>{ 
  if(step!==1) return;
  verify("https://youtu.be/-lCf-dBK1cs?si=b_EgtIkpC-Kd-6c6",()=>{
    step=2;
    b2.classList.add("success");
    b2.textContent="Done";
    startProgress();
  });
};

/* progress + show enter */
function startProgress(){
  let p=0;
  const interval = setInterval(()=>{
    p++;
    fill.style.width=p+"%";
    percent.textContent=p+"%";
    if(p>=100){
      clearInterval(interval);
      setTimeout(()=>enterBtn.classList.add("show"),200);
    }
  },30);
}

/* enter */
enterBtn.onclick=()=>overlay.remove();
