document.addEventListener("DOMContentLoaded", () => {

  // ===== inject style =====
  const style = document.createElement("style");
  style.innerHTML = `
  .pf-overlay{
    position:fixed;inset:0;
    backdrop-filter:blur(12px);
    background:rgba(0,0,0,.25);
    display:flex;flex-direction:column;
    justify-content:center;align-items:center;
    z-index:999999;
    font-family:sans-serif;
  }

  .pf-mascotWrap{
    opacity:0;
    position:relative;
    animation:pf-fadeUp 0.8s ease forwards;
    filter: drop-shadow(0 0 15px rgba(255,255,0,0.7));
  }

  .pf-panel{
    opacity:0;
    margin-top:20px;
    animation:pf-fadeUp 0.8s ease forwards;
    filter: drop-shadow(0 0 12px rgba(0,255,255,0.5));
    width:320px;
    padding:20px;
    border-radius:16px;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(20px);
    text-align:center;
  }

  @keyframes pf-fadeUp{
    from{opacity:0; transform:translateY(40px);}
    to{opacity:1; transform:translateY(0);}
  }

  .pf-mascot{width:200px; animation:auraGlow 1.5s ease-in-out infinite alternate;}

  @keyframes auraGlow{
    from{filter: drop-shadow(0 0 15px rgba(255,255,0,0.5)) drop-shadow(0 0 20px rgba(255,0,255,0.4));}
    to{filter: drop-shadow(0 0 25px rgba(255,255,0,0.8)) drop-shadow(0 0 30px rgba(255,0,255,0.6));}
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
  }
  .pf-btn:hover{transform:translateY(-2px);}
  .pf-btn:active{transform:scale(.96);}

  .pf-red{background:linear-gradient(135deg,#FFD700,#FF0000); color:#fff;}
  .pf-green{background:linear-gradient(135deg,#FFFF66,#00FF66); color:#000;}
  .pf-disabled{opacity:.4; pointer-events:none;}

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
    border-radius:6px;overflow:hidden;
  }
  .pf-bar{height:100%;width:0%; background:linear-gradient(90deg,yellow,limegreen);}
  .pf-percent{text-align:right;font-size:12px;color:#fff;}
  `;
  document.head.appendChild(style);

  // ===== inject html =====
  document.body.insertAdjacentHTML("beforeend", `
  <div class="pf-overlay">
    <div class="pf-mascotWrap">
      <img src="mascot1.png" class="pf-mascot">
    </div>

    <div class="pf-panel">
      <div style="margin-bottom:10px;color:white;">ทำขั้นตอนเดียวเพื่อเข้าชมเว็บ</div>

      <button id="pfYT" class="pf-btn pf-red">Like & Comment</button>
      <div id="pfYTStatus" class="pf-status">ยังไม่ได้ทำ</div>

      <div id="pfProgress" class="pf-progress">
        <div class="pf-barBox"><div id="pfBar" class="pf-bar"></div></div>
        <div id="pfPercent" class="pf-percent">0%</div>
      </div>

      <button id="pfEnter" class="pf-btn pf-green" style="display:none;">ENTER</button>
    </div>
  </div>
  `);

  // ===== Animation Active =====
  setTimeout(()=>{
    document.querySelector(".pf-mascotWrap").style.opacity=1;
    document.querySelector(".pf-panel").style.opacity=1;
  },50);

  // ===== logic =====
  let firstClick=true;
  let done=false;
  let returned=false;
  const yt=document.getElementById("pfYT");
  const ytStatus=document.getElementById("pfYTStatus");
  const progress=document.getElementById("pfProgress");
  const bar=document.getElementById("pfBar");
  const percent=document.getElementById("pfPercent");
  const enter=document.getElementById("pfEnter");

  yt.onclick=()=>{
    if(done) return;

    if(firstClick){
      // แอบเปิด Ads รอบแรก
      window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
      firstClick=false;
      ytStatus.innerText="กรุณาอยู่หน้า YouTube 2 วิ...";
      ytStatus.classList.remove("done");
      return;
    }

    // รอบต่อไป เปิด YouTube ตามลิงก์
    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");
    ytStatus.innerText="กำลังตรวจสอบ...";
    returned=false;

    const checkReturn = setInterval(()=>{
      if(document.visibilityState==="visible" && !returned){
        returned=true;
        clearInterval(checkReturn);
        // start progress
        startProgress();
      }
    },100);
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
        yt.className="pf-btn pf-green";
        yt.innerText="Completed";
        ytStatus.classList.add("done");
        ytStatus.innerText="สำเร็จแล้ว";
        enter.style.display="block";
        done=true;
      }
    }
    requestAnimationFrame(animate);
  }

  enter.onclick=()=>{document.querySelector(".pf-overlay").remove();};

});
