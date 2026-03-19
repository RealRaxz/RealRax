document.addEventListener("DOMContentLoaded", () => {

  const style = document.createElement("style");
  style.innerHTML = `/* CSS เดิมของคุณ (ไม่เปลี่ยน) */ 
  .pf-overlay{position:fixed; inset:0;backdrop-filter:blur(12px);background:rgba(0,0,0,.25);display:flex; justify-content:center; align-items:center;z-index:999999;font-family:sans-serif;}
  .pf-box{display:flex; flex-direction:column; align-items:center; gap:20px;}
  .pf-mascotWrap{opacity:0; transform:translateY(-60px) scale(0.92);transition: all 0.7s cubic-bezier(0.22,1,0.36,1);}
  .pf-mascotWrap.show{opacity:1; transform:translateY(0) scale(1);}
  .pf-panel{width:320px; padding:20px; border-radius:16px;background:rgba(255,255,255,0.08); backdrop-filter:blur(20px);text-align:center; box-shadow:0 0 15px rgba(255,255,255,0.5);opacity:0; transform:translateY(20px); transition: all 0.7s cubic-bezier(0.22,1,0.36,1);}
  .pf-panel.show{opacity:1; transform:translateY(0);}
  .pf-mascot{width:200px; filter:drop-shadow(0 0 15px rgba(255,255,255,0.6)); animation:aura 2s infinite alternate;}
  @keyframes aura{0%{filter:drop-shadow(0 0 15px rgba(255,255,255,0.4));}50%{filter:drop-shadow(0 0 25px rgba(255,255,255,0.7));}100%{filter:drop-shadow(0 0 15px rgba(255,255,255,0.4));}}
  .pf-btn{width:100%; padding:12px; margin-top:10px; border:none; border-radius:10px;cursor:pointer; font-weight:bold; transition:.2s; box-shadow:0 0 10px rgba(255,255,255,0.4);}
  .pf-btn:hover{transform:translateY(-2px);}
  .pf-btn:active{transform:scale(.96);}
  .pf-red{background:linear-gradient(135deg,#FFD700,#FF0000); color:#fff;}
  .pf-green{background:linear-gradient(135deg,#FFFF66,#00FF66); color:#000;}
  .pf-disabled{opacity:.4; pointer-events:none;}
  .pf-status{font-size:12px;color:white;}
  .pf-status.done{color:white;}
  .pf-progress{display:none;margin-top:10px;}
  .pf-barBox{width:100%;height:8px;background:rgba(255,255,255,.1);border-radius:6px;overflow:hidden;}
  .pf-bar{height:100%;width:0%;background:linear-gradient(90deg,yellow,limegreen);}
  .pf-percent{text-align:right;font-size:12px;color:#fff;}
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", `
  <div class="pf-overlay">
    <div class="pf-box">
      <div class="pf-mascotWrap"><img src="mascot1.png" class="pf-mascot"></div>
      <div class="pf-panel">
        <div style="margin-bottom:10px;color:white;">ทำตามขั้นตอน / 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲 𝗦𝘁𝗲𝗽𝘀</div>

        <button id="pfYT1" class="pf-btn pf-red">กดไลก์ & คอมเมนต์ / Like & Comment</button>
        <div id="pfYTStatus1" class="pf-status">กดไลก์และคอมเมนต์</div>

        <button id="pfYT2" class="pf-btn pf-red pf-disabled">กดไลก์ & คอมเมนต์ / Like & Comment</button>
        <div id="pfYTStatus2" class="pf-status">ล็อคอยู่</div>

        <div id="pfProgress" class="pf-progress">
          <div class="pf-barBox"><div id="pfBar" class="pf-bar"></div></div>
          <div id="pfPercent" class="pf-percent">0%</div>
        </div>

        <button id="pfEnter" class="pf-btn pf-green" style="display:none;">ENTER</button>
      </div>
    </div>
  </div>
  `);

  const mascotWrap = document.querySelector(".pf-mascotWrap");
  const panel = document.querySelector(".pf-panel");
  requestAnimationFrame(()=>{
    mascotWrap.classList.add("show");
    setTimeout(()=> panel.classList.add("show"), 400);
  });

  const yt1=document.getElementById("pfYT1");
  const yt2=document.getElementById("pfYT2");
  const ytStatus1=document.getElementById("pfYTStatus1");
  const ytStatus2=document.getElementById("pfYTStatus2");
  const bar=document.getElementById("pfBar");
  const percent=document.getElementById("pfPercent");
  const progress=document.getElementById("pfProgress");
  const enter=document.getElementById("pfEnter");

  let done1=false, done2=false;

  // ✅ ใช้ accumulator แทน (กัน bypass จริง)
  let yt1Time=0, yt2Time=0;
  let yt1Running=false, yt2Running=false;
  let lastTime=0;

  yt1.onclick=()=>{
    if(done1) return;
    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");
    yt1Running=true;
    lastTime=performance.now();
    yt1.className="pf-btn pf-disabled";
    ytStatus1.innerText="อยู่หน้า YouTube 3 วินาที...";
  };

  yt2.onclick=()=>{
    if(!done1||done2) return;
    window.open("https://youtu.be/DHsN-UjeDdU?si=nmCZtki5fyylgO7W");
    yt2Running=true;
    lastTime=performance.now();
    yt2.className="pf-btn pf-disabled";
    ytStatus2.innerText="อยู่หน้า YouTube 3 วินาที...";
  };

  setInterval(()=>{
    const now=performance.now();
    const dt=(now-lastTime)/1000;
    lastTime=now;

    // 🔒 นับเฉพาะตอน "hidden" (อยู่ YouTube)
    if(document.visibilityState==="hidden"){
      if(yt1Running && !done1){
        yt1Time+=dt;
        if(yt1Time>=3){
          done1=true;
          yt1Running=false;
          yt1.className="pf-btn pf-green";
          yt1.innerText="𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲𝗱!";
          ytStatus1.classList.add("done");
          ytStatus1.innerText="สำเร็จแล้ว✅";
          yt2.classList.remove("pf-disabled");
        }
      }

      if(yt2Running && !done2 && done1){
        yt2Time+=dt;
        if(yt2Time>=3){
          done2=true;
          yt2Running=false;
          yt2.className="pf-btn pf-green";
          yt2.innerText="𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲𝗱!";
          ytStatus2.classList.add("done");
          ytStatus2.innerText="สำเร็จแล้ว✅";
          startProgress();
        }
      }
    }

  },100);

  function startProgress(){
    progress.style.display="block";
    let start=performance.now(); let duration=5000;
    function animate(now){
      let t=(now-start)/duration; if(t>1)t=1;
      let eased=1-Math.pow(1-t,3); let val=eased*100;
      bar.style.width=val+"%"; percent.innerText=Math.floor(val)+"%";
      if(t<1) requestAnimationFrame(animate);
      else {percent.innerText="100%"; enter.style.display="block";}
    }
    requestAnimationFrame(animate);
  }

  enter.onclick=()=>document.querySelector(".pf-overlay").remove();
});
