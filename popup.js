document.addEventListener("DOMContentLoaded", () => {

  document.body.insertAdjacentHTML("beforeend", `
  <div id="overlay">
    <div id="box">

      <div id="mascotWrap">
        <img src="mascot1.png" id="mascot">
      </div>

      <div id="panel">
        <div style="margin-bottom:10px;">Complete Steps</div>

        <button id="adsBtn" class="btn gradient">Watch Ads</button>
        <div id="adsStatus" class="status">ยังไม่ได้ทำ</div>

        <button id="ytBtn" class="btn gradient" disabled>Like & Comment</button>
        <div id="ytStatus" class="status">ล็อคอยู่</div>

        <div id="progress">
          <div id="barBox"><div id="bar"></div></div>
          <div id="percent">0%</div>
        </div>

        <button id="enter" class="btn">ENTER</button>
      </div>

    </div>
  </div>
  `);

  setTimeout(()=> {
    document.getElementById("box").classList.add("active");
  },50);

  init();
  particles();
});

function init(){

  let done1=false, done2=false;
  let adStart=0, timeSpent=0, tracking=false;

  let ytOpened=false, returned=false;

  const adsBtn=document.getElementById("adsBtn");
  const ytBtn=document.getElementById("ytBtn");

  const adsStatus=document.getElementById("adsStatus");
  const ytStatus=document.getElementById("ytStatus");

  const bar=document.getElementById("bar");
  const percent=document.getElementById("percent");
  const progress=document.getElementById("progress");
  const enter=document.getElementById("enter");

  adsBtn.onclick=()=>{
    if(done1) return;

    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
    tracking=true;
    adsStatus.innerText="กำลังตรวจสอบ...";
  };

  document.addEventListener("visibilitychange",()=>{

    if(tracking && !done1){
      if(document.hidden){
        adStart=performance.now();
      }else{
        let t=(performance.now()-adStart)/1000;
        timeSpent+=t;

        if(timeSpent>=2){
          done1=true;
          tracking=false;

          adsBtn.className="btn completed";
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

    ytBtn.className="btn completed";
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

function particles(){
  const wrap=document.getElementById("mascotWrap");

  setInterval(()=>{
    let el=document.createElement("div");
    let types=["candy","star","snow"];
    el.className=types[Math.floor(Math.random()*types.length)];

    el.style.left=Math.random()*100+"%";
    el.style.bottom="0px";

    wrap.appendChild(el);
    setTimeout(()=>el.remove(),4000);
  },150);
}
