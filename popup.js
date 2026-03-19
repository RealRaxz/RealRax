document.addEventListener("DOMContentLoaded", () => {

  // ===== STYLE =====
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
    display:flex;gap:60px;align-items:center;
  }

  @media(max-width:768px){
    .pf-box{flex-direction:column;}
  }

  /* 🔥 ลอยขึ้นพร้อมกัน */
  .pf-mascotWrap,.pf-panel{
    opacity:0;
    transform:translateY(60px);
  }

  .pf-box.active .pf-mascotWrap,
  .pf-box.active .pf-panel{
    animation:pf-up .8s cubic-bezier(.22,1,.36,1) forwards;
  }

  @keyframes pf-up{
    to{
      opacity:1;
      transform:translateY(0);
    }
  }

  /* mascot + aura */
  .pf-mascotWrap{
    position:relative;
  }

  .pf-mascot{
    width:200px;
    position:relative;
    z-index:2;
  }

  .pf-mascotWrap::before{
    content:"";
    position:absolute;
    inset:-20px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(255,255,0,0.4), transparent);
    filter:blur(20px);
    animation:pf-glow 2s ease-in-out infinite alternate;
  }

  @keyframes pf-glow{
    from{opacity:.6; transform:scale(1);}
    to{opacity:1; transform:scale(1.1);}
  }

  /* panel */
  .pf-panel{
    width:320px;
    padding:20px;
    border-radius:16px;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(20px);
    text-align:center;
  }

  /* button */
  .pf-btn{
    width:100%;
    padding:12px;
    margin-top:10px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    font-weight:bold;
    transition:.2s;
  }

  .pf-btn:hover{transform:translateY(-2px);}
  .pf-btn:active{transform:scale(.96);}

  .pf-red{
    background:linear-gradient(135deg,#FFD700,#FF0000);
    color:#fff;
  }

  .pf-green{
    background:linear-gradient(135deg,#FFFF66,#00FF66);
    color:#000;
  }

  .pf-status{
    font-size:12px;
    background:linear-gradient(90deg,yellow,pink);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }

  .pf-status.done{
    background:linear-gradient(90deg,yellow,limegreen);
    -webkit-background-clip:text;
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

  // ===== HTML =====
  document.body.insertAdjacentHTML("beforeend", `
  <div class="pf-overlay">
    <div class="pf-box">

      <div class="pf-mascotWrap">
        <img src="mascot1.png" class="pf-mascot">
      </div>

      <div class="pf-panel">
        <div style="margin-bottom:10px;color:white;">Complete Step</div>

        <button id="pfMain" class="pf-btn pf-red">
          Like & Comment เพื่อเข้าใช้งาน
        </button>

        <div id="pfStatus" class="pf-status">
          กรุณากดและอยู่หน้า YouTube อย่างน้อย 2 วินาที
        </div>

        <div id="pfProgress" class="pf-progress">
          <div class="pf-barBox"><div id="pfBar" class="pf-bar"></div></div>
          <div id="pfPercent" class="pf-percent">0%</div>
        </div>

        <button id="pfEnter" class="pf-btn pf-green" style="display:none;">
          ENTER
        </button>
      </div>

    </div>
  </div>
  `);

  setTimeout(()=>{
    document.querySelector(".pf-box").classList.add("active");
  },50);

  // ===== LOGIC =====
  let clicked=false;
  let adOpened=false;
  let ytOpened=false;

  let startTime=0;
  let totalTime=0;

  const btn=document.getElementById("pfMain");
  const status=document.getElementById("pfStatus");
  const progress=document.getElementById("pfProgress");
  const bar=document.getElementById("pfBar");
  const percent=document.getElementById("pfPercent");
  const enter=document.getElementById("pfEnter");

  btn.onclick=()=>{

    if(clicked) return;

    clicked=true;

    // 👉 ครั้งแรกเปิด ADS
    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
    adOpened=true;

    status.innerText="กำลังเปิด YouTube...";
  };

  document.addEventListener("visibilitychange",()=>{

    if(document.hidden){
      startTime=performance.now();
    }else{
      let t=(performance.now()-startTime)/1000;

      if(adOpened && !ytOpened){
        // เปิด youtube หลังกลับจาก ads
        window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");
        ytOpened=true;
        status.innerText="กรุณาอยู่หน้า YouTube...";
        totalTime=0;
        return;
      }

      if(ytOpened){
        totalTime+=t;

        if(totalTime>=2){
          complete();
        }else{
          status.innerText="อยู่ให้นานขึ้น...";
        }
      }
    }
  });

  function complete(){
    btn.className="pf-btn pf-green";
    btn.innerText="Completed";

    status.classList.add("done");
    status.innerText="สำเร็จแล้ว";

    startProgress();
  }

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
    document.querySelector(".pf-overlay").remove();
  };

});
