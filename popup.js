document.addEventListener("DOMContentLoaded", async () => {

  // โหลด HTML
  const res = await fetch("popup.html");
  const html = await res.text();
  document.body.insertAdjacentHTML("beforeend", html);

  // โหลด CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "popup.css";
  document.head.appendChild(link);

  setTimeout(()=>{
    document.getElementById("box").classList.add("active");
  },50);

  init();
});

function init(){

  let done1=false, done2=false;
  let tracking=false, adStart=0, timeSpent=0;

  let ytOpened=false, returned=false;

  const adsBtn = document.getElementById("adsBtn");
  const ytBtn = document.getElementById("ytBtn");

  const adsStatus = document.getElementById("adsStatus");
  const ytStatus = document.getElementById("ytStatus");

  const bar = document.getElementById("bar");
  const percent = document.getElementById("percent");
  const progress = document.getElementById("progress");
  const enter = document.getElementById("enter");

  adsBtn.onclick = ()=>{
    if(done1) return;

    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
    tracking=true;
    adsStatus.innerText="กำลังตรวจสอบ...";
  };

  document.addEventListener("visibilitychange", ()=>{

    if(tracking && !done1){
      if(document.hidden){
        adStart=performance.now();
      }else{
        let t=(performance.now()-adStart)/1000;
        timeSpent+=t;

        if(timeSpent>=2){
          done1=true;
          adsBtn.className="btn doneBtn";
          adsBtn.innerText="Completed";

          adsStatus.classList.add("done");
          adsStatus.innerText="สำเร็จแล้ว";

          ytBtn.disabled=false;
        }
      }
    }

    if(ytOpened && document.visibilityState==="visible" && !returned){
      returned=true;
      startProgress();
    }
  });

  ytBtn.onclick=()=>{
    if(!done1 || done2) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2=true;
    ytOpened=true;

    ytBtn.className="btn doneBtn";
    ytBtn.innerText="Completed";

    ytStatus.classList.add("done");
    ytStatus.innerText="สำเร็จแล้ว";
  };

  function startProgress(){
    progress.style.display="block";

    let start=performance.now();
    let duration=5000;

    function animate(now){
      let t=(now-start)/duration;
      if(t>1) t=1;

      let eased=1-Math.pow(1-t,3);
      let val=eased*100;

      bar.style.width=val+"%";
      percent.innerText=Math.floor(val)+"%";

      if(t<1){
        requestAnimationFrame(animate);
      }else{
        percent.innerText="100%";
        enter.style.display="block";
      }
    }

    requestAnimationFrame(animate);
  }

  enter.onclick=()=>{
    document.getElementById("overlay").remove();
  };
}
