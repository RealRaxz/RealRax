document.addEventListener("DOMContentLoaded", () => {

  // ===== STYLE =====
  const style = document.createElement("style");
  style.innerHTML = `
  .pf-overlay{
    position:fixed; inset:0;
    backdrop-filter:blur(12px);
    background:rgba(0,0,0,.25);
    display:flex; justify-content:center; align-items:center;
    z-index:999999;
    font-family:sans-serif;
  }

  .pf-box{display:flex;flex-direction:column;align-items:center;gap:20px;}

  /* mascot first */
  .pf-mascotWrap{
    opacity:0;
    transform:translateY(-60px) scale(.9);
    animation:pop1 .8s cubic-bezier(.22,1,.36,1) forwards;
  }

  @keyframes pop1{
    0%{opacity:0;transform:translateY(-60px) scale(.9);}
    60%{opacity:1;transform:translateY(10px) scale(1.05);}
    100%{opacity:1;transform:translateY(0) scale(1);}
  }

  /* panel after */
  .pf-panel{
    width:320px;padding:20px;border-radius:16px;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(20px);
    text-align:center;
    box-shadow:0 0 20px rgba(255,255,255,.4);

    opacity:0;
    transform:translateY(20px) scale(.95);
    transition:.6s cubic-bezier(.22,1,.36,1);
  }

  .pf-panel.show{
    opacity:1;
    transform:translateY(0) scale(1);
  }

  .pf-mascot{
    width:200px;
    filter:drop-shadow(0 0 15px #fff);
    animation:aura 2s infinite alternate;
  }

  @keyframes aura{
    0%{filter:drop-shadow(0 0 10px #fff);}
    100%{filter:drop-shadow(0 0 25px #fff);}
  }

  .pf-btn{
    width:100%;padding:12px;margin-top:10px;
    border:none;border-radius:10px;
    cursor:pointer;font-weight:bold;
    transition:.2s;
  }

  .pf-btn:hover{transform:translateY(-2px);}
  .pf-btn:active{transform:scale(.96);}

  .pf-red{background:linear-gradient(135deg,#FFD700,#FF0000);color:#fff;}
  .pf-green{background:linear-gradient(135deg,#FFFF66,#00FF66);color:#000;}
  .pf-disabled{opacity:.4;pointer-events:none;}

  .pf-status{font-size:12px;color:#fff;}

  .pf-progress{display:none;margin-top:10px;}
  .pf-barBox{width:100%;height:8px;background:#222;border-radius:6px;overflow:hidden;}
  .pf-bar{height:100%;width:0%;background:linear-gradient(90deg,yellow,limegreen);}
  .pf-percent{font-size:12px;color:#fff;text-align:right;}
  `;
  document.head.appendChild(style);

  // ===== HTML =====
  document.body.insertAdjacentHTML("beforeend", `
  <div class="pf-overlay">
    <div class="pf-box">
      <div class="pf-mascotWrap">
        <img src="mascot1.png" class="pf-mascot">
      </div>

      <div class="pf-panel">
        <div style="color:white;margin-bottom:10px;">Complete Steps</div>

        <button id="pfYT1" class="pf-btn pf-red">Like & Comment 1</button>
        <div id="pfS1" class="pf-status">ต้องเปิด 3 วินาที</div>

        <button id="pfYT2" class="pf-btn pf-red pf-disabled">Like & Comment 2</button>
        <div id="pfS2" class="pf-status">ล็อคอยู่</div>

        <div id="pfProgress" class="pf-progress">
          <div class="pf-barBox"><div id="pfBar" class="pf-bar"></div></div>
          <div id="pfPercent" class="pf-percent">0%</div>
        </div>

        <button id="pfEnter" class="pf-btn pf-green" style="display:none;">ENTER</button>
      </div>
    </div>
  </div>
  `);

  // panel delay
  setTimeout(()=>document.querySelector(".pf-panel").classList.add("show"),700);

  // ===== LOGIC =====
  const yt1 = document.getElementById("pfYT1");
  const yt2 = document.getElementById("pfYT2");
  const s1 = document.getElementById("pfS1");
  const s2 = document.getElementById("pfS2");

  const bar = document.getElementById("pfBar");
  const percent = document.getElementById("pfPercent");
  const progress = document.getElementById("pfProgress");
  const enter = document.getElementById("pfEnter");

  let done1=false, done2=false;

  function openAndTrack(url, callback){
    const w = window.open(url, "_blank", "width=900,height=600");

    if(!w){
      alert("Popup blocked!");
      return;
    }

    let start = Date.now();
    let passed = false;

    const timer = setInterval(()=>{
      if(w.closed){
        clearInterval(timer);
        if(passed) callback(true);
        else callback(false);
      } else {
        let t = (Date.now()-start)/1000;
        if(t>=3) passed = true;
      }
    },100);
  }

  yt1.onclick = ()=>{
    if(done1) return;

    yt1.classList.add("pf-disabled");
    s1.innerText="กำลังตรวจสอบ...";

    openAndTrack("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd",(ok)=>{
      if(ok){
        done1=true;
        yt1.className="pf-btn pf-green";
        yt1.innerText="Completed";
        s1.innerText="สำเร็จแล้ว";

        yt2.classList.remove("pf-disabled");
      }else{
        yt1.classList.remove("pf-disabled");
        s1.innerText="ต้องอยู่ให้ครบ 3 วินาที";
      }
    });
  };

  yt2.onclick = ()=>{
    if(!done1 || done2) return;

    yt2.classList.add("pf-disabled");
    s2.innerText="กำลังตรวจสอบ...";

    openAndTrack("https://youtu.be/DHsN-UjeDdU?si=nmCZtki5fyylgO7W",(ok)=>{
      if(ok){
        done2=true;
        yt2.className="pf-btn pf-green";
        yt2.innerText="Completed";
        s2.innerText="สำเร็จแล้ว";
        startProgress();
      }else{
        yt2.classList.remove("pf-disabled");
        s2.innerText="ต้องอยู่ให้ครบ 3 วินาที";
      }
    });
  };

  function startProgress(){
    progress.style.display="block";
    let start=performance.now();
    let duration=5000;

    function anim(now){
      let t=(now-start)/duration;
      if(t>1)t=1;

      let val=(1-Math.pow(1-t,3))*100;
      bar.style.width=val+"%";
      percent.innerText=Math.floor(val)+"%";

      if(t<1) requestAnimationFrame(anim);
      else enter.style.display="block";
    }
    requestAnimationFrame(anim);
  }

  enter.onclick=()=>document.querySelector(".pf-overlay").remove();

});
