document.addEventListener("DOMContentLoaded", () => {

  // ===== inject style (กันชน CSS) =====
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

  /* animation */
  .pf-mascotWrap,.pf-panel{opacity:0;}

  .pf-box.active .pf-mascotWrap{
    animation:pf-left .7s ease forwards;
  }
  .pf-box.active .pf-panel{
    animation:pf-right .7s ease forwards;
  }

  @keyframes pf-left{
    from{opacity:0;transform:translateX(-80px);}
    to{opacity:1;transform:translateX(0);}
  }
  @keyframes pf-right{
    from{opacity:0;transform:translateX(80px);}
    to{opacity:1;transform:translateX(0);}
  }

  .pf-mascot{width:200px;}

  .pf-panel{
    width:320px;
    padding:20px;
    border-radius:16px;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(20px);
    text-align:center;
  }

  /* ===== BUTTON SYSTEM (ไม่บัคแน่นอน) ===== */
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

  /* state */
  .pf-red{
    background:linear-gradient(135deg,#FFD700,#FF0000);
    color:#fff;
  }

  .pf-green{
    background:linear-gradient(135deg,#FFFF66,#00FF66);
    color:#000;
  }

  .pf-disabled{
    opacity:.4;
    pointer-events:none;
  }

  /* status */
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

  /* progress */
  .pf-progress{display:none;margin-top:10px;}
  .pf-barBox{
    width:100%;height:8px;
    background:rgba(255,255,255,.1);
    border-radius:6px;overflow:hidden;
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

        <button id="pfAds" class="pf-btn pf-red">Watch Ads  →  ดูโฆษณา 2 วินาที</button>
        <div id="pfAdsStatus" class="pf-status">กรุณาทำขั้นตอนนี้ก่อน</div>

        <button id="pfYT" class="pf-btn pf-red pf-disabled">Like & Comment</button>
        <div id="pfYTStatus" class="pf-status">ปลดล็อคหลังจากดูโฆษณา</div>

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
    document.querySelector(".pf-box").classList.add("active");
  },50);

  // ===== logic =====
  let done1=false, done2=false;
  let tracking=false, adStart=0, timeSpent=0;
  let ytOpened=false, returned=false;

  const ads=document.getElementById("pfAds");
  const yt=document.getElementById("pfYT");

  const adsStatus=document.getElementById("pfAdsStatus");
  const ytStatus=document.getElementById("pfYTStatus");

  const bar=document.getElementById("pfBar");
  const percent=document.getElementById("pfPercent");
  const progress=document.getElementById("pfProgress");
  const enter=document.getElementById("pfEnter");

  // ads
  ads.onclick=()=>{
    if(done1) return;

    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
    tracking=true;
    adsStatus.innerText="กรุณาอยู่หน้าโฆษณาสักครู่...";
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
          ads.className="pf-btn pf-green";
          ads.innerText="Completed";

          adsStatus.classList.add("done");
          adsStatus.innerText="สำเร็จแล้ว";

          yt.classList.remove("pf-disabled");
        }
      }
    }

    if(ytOpened && document.visibilityState==="visible" && !returned){
      returned=true;
      startProgress();
    }
  });

  // yt
  yt.onclick=()=>{
    if(!done1 || done2) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2=true;
    ytOpened=true;

    yt.className="pf-btn pf-green";
    yt.innerText="Completed";

    ytStatus.classList.add("done");
    ytStatus.innerText="สำเร็จแล้ว";
  };

  // progress
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
