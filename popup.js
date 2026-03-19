document.addEventListener("DOMContentLoaded", () => {

  // ===== inject style =====
  const style = document.createElement("style");
  style.innerHTML = `
  .pf-overlay{
    position:fixed;inset:0;
    backdrop-filter:blur(12px);
    background:rgba(0,0,0,.25);
    display:flex;justify-content:center;align-items:center;
    z-index:999999;
    font-family:sans-serif;
  }

  .pf-box{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;
  }

  .pf-mascotWrap{
    opacity:0;
    animation:pf-drop .7s ease forwards;
  }

  @keyframes pf-drop{
    from{opacity:0; transform:translateY(-80px);}
    to{opacity:1; transform:translateY(0);}
  }

  .pf-mascot{
    width:200px;
    filter: drop-shadow(0 0 15px rgba(255,255,255,0.6));
    animation:aura 2s infinite alternate;
  }

  @keyframes aura{
    0%{filter:drop-shadow(0 0 15px rgba(255,255,255,0.4));}
    50%{filter:drop-shadow(0 0 25px rgba(255,255,255,0.7));}
    100%{filter:drop-shadow(0 0 15px rgba(255,255,255,0.4));}
  }

  .pf-panel{
    width:320px;
    padding:20px;
    border-radius:16px;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(20px);
    text-align:center;
    opacity:0;
    animation:pf-fadeIn .7s ease forwards;
    animation-delay:.3s;
    box-shadow: 0 0 15px rgba(255,255,255,0.5);
  }

  @keyframes pf-fadeIn{
    from{opacity:0; transform:translateY(20px);}
    to{opacity:1; transform:translateY(0);}
  }

  .pf-btn{
    width:100%;
    padding:12px;
    margin-top:10px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    font-weight:bold;
    transition:.2s;
    box-shadow:0 0 10px rgba(255,255,255,0.4);
  }

  .pf-btn:hover{transform:translateY(-2px);}
  .pf-btn:active{transform:scale(.96);}

  .pf-red{background:linear-gradient(135deg,#FFD700,#FF0000); color:#fff;}
  .pf-green{background:linear-gradient(135deg,#FFFF66,#00FF66); color:#000;}
  .pf-disabled{opacity:.4; pointer-events:none;}

  .pf-status{
    font-size:12px;
    color:white;
  }
  .pf-status.done{
    color:white;
  }

  .pf-progress{display:none;margin-top:10px;}
  .pf-barBox{
    width:100%;height:8px;
    background:rgba(255,255,255,.1);
    border-radius:6px;
    overflow:hidden;
  }

  .pf-bar{
    height:100%;
    width:0%;
    background:linear-gradient(90deg,yellow,limegreen);
  }

  .pf-percent{
    text-align:right;
    font-size:12px;
    color:#fff;
  }
  `;
  document.head.appendChild(style);

  // ===== inject html =====
  document.body.insertAdjacentHTML("beforeend", `
  <div class="pf-overlay">
    <div class="pf-box">
      <div class="pf-mascotWrap">
        <img src="mascot1.png" class="pf-mascot">
      </div>

      <div class="pf-panel">
        <div style="margin-bottom:10px;color:white;">Complete Steps</div>

        <button id="pfYT1" class="pf-btn pf-red">Like & Comment 1</button>
        <div id="pfYTStatus1" class="pf-status">กรุณาอยู่หน้า YouTube 3 วินาที</div>

        <button id="pfYT2" class="pf-btn pf-red pf-disabled">Like & Comment 2</button>
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

  setTimeout(()=>{
    document.querySelector(".pf-mascotWrap").style.opacity="1";
    document.querySelector(".pf-panel").style.opacity="1";
  },50);

  // ===== logic =====
  const yt1 = document.getElementById("pfYT1");
  const yt2 = document.getElementById("pfYT2");
  const ytStatus1 = document.getElementById("pfYTStatus1");
  const ytStatus2 = document.getElementById("pfYTStatus2");
  const bar = document.getElementById("pfBar");
  const percent = document.getElementById("pfPercent");
  const progress = document.getElementById("pfProgress");
  const enter = document.getElementById("pfEnter");

  let done1=false, done2=false, yt1Opened=false, yt2Opened=false, yt1Start=0, yt2Start=0;

  yt1.onclick = () => {
    if(done1) return;
    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");
    yt1Opened = true;
    yt1Start = performance.now();
    yt1.className="pf-btn pf-disabled";
    ytStatus1.innerText="อยู่หน้า YouTube 3 วินาที...";
  };

  yt2.onclick = () => {
    if(!done1 || done2) return;
    window.open("https://youtu.be/DHsN-UjeDdU?si=nmCZtki5fyylgO7W");
    yt2Opened = true;
    yt2Start = performance.now();
    yt2.className="pf-btn pf-disabled";
    ytStatus2.innerText="อยู่หน้า YouTube 3 วินาที...";
  };

  const checkInterval = setInterval(()=>{
    // ตรวจ yt1
    if(yt1Opened && !done1 && document.visibilityState==="visible"){
      const t = (performance.now()-yt1Start)/1000;
      if(t>=3){
        done1=true;
        yt1.className="pf-btn pf-green";
        yt1.innerText="Completed";
        ytStatus1.classList.add("done");
        ytStatus1.innerText="สำเร็จแล้ว";

        yt2.classList.remove("pf-disabled");
      }
    }

    // ตรวจ yt2
    if(yt2Opened && !done2 && document.visibilityState==="visible" && done1){
      const t = (performance.now()-yt2Start)/1000;
      if(t>=3){
        done2=true;
        yt2.className="pf-btn pf-green";
        yt2.innerText="Completed";
        ytStatus2.classList.add("done");
        ytStatus2.innerText="สำเร็จแล้ว";

        startProgress();
        clearInterval(checkInterval);
      }
    }
  },100);

  function startProgress(){
    progress.style.display="block";
    let start = performance.now();
    let duration = 5000;
    function animate(now){
      let t = (now-start)/duration;
      if(t>1) t=1;
      let eased = 1-Math.pow(1-t,3);
      let val = eased*100;
      bar.style.width = val+"%";
      percent.innerText = Math.floor(val)+"%";
      if(t<1){
        requestAnimationFrame(animate);
      }else{
        percent.innerText="100%";
        enter.style.display="block";
      }
    }
    requestAnimationFrame(animate);
  }

  enter.onclick = () => document.querySelector(".pf-overlay").remove();
});
