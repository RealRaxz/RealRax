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
    position:relative;
  }

  @keyframes pf-drop{
    from{opacity:0; transform:translateY(-80px);}
    to{opacity:1; transform:translateY(0);}
  }

  .pf-mascot{
    width:200px;
    position:relative;
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
    color:#fff; /* เปลี่ยนเป็นสีขาว */
    margin-bottom:5px;
  }

  .pf-status.done{
    color:#00FF66;
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
        <div id="pfYT1Status" class="pf-status">กรุณากดไลก์และคอมเมนต์ยูทูป 3 วิ</div>

        <button id="pfYT2" class="pf-btn pf-red pf-disabled">Like & Comment 2</button>
        <div id="pfYT2Status" class="pf-status">ปลดล็อคหลังจากทำขั้นตอนแรก</div>

        <div id="pfProgress" class="pf-progress">
          <div class="pf-barBox"><div id="pfBar" class="pf-bar"></div></div>
          <div id="pfPercent" class="pf-percent">0%</div>
        </div>

        <button id="pfEnter" class="pf-btn pf-green" style="display:none;">ENTER</button>
      </div>
    </div>
  </div>
  `);

  // ===== logic =====
  const yt1 = document.getElementById("pfYT1");
  const yt2 = document.getElementById("pfYT2");
  const yt1Status = document.getElementById("pfYT1Status");
  const yt2Status = document.getElementById("pfYT2Status");
  const bar = document.getElementById("pfBar");
  const percent = document.getElementById("pfPercent");
  const progress = document.getElementById("pfProgress");
  const enter = document.getElementById("pfEnter");

  let done1=false, done2=false;
  let yt1Opened=false, yt2Opened=false;
  let start1=0, start2=0;

  // ปุ่มแรก
  yt1.onclick = ()=>{
    if(done1) return;
    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");
    yt1Opened=true; start1=performance.now();
    yt1.className="pf-btn pf-disabled";
    yt1Status.innerText="อยู่หน้า YouTube 3 วินาที...";
  };

  // ปุ่มสอง
  yt2.onclick = ()=>{
    if(!done1 || done2) return;
    window.open("https://youtu.be/DHsN-UjeDdU?si=nmCZtki5fyylgO7");
    yt2Opened=true; start2=performance.now();
    yt2.className="pf-btn pf-disabled";
    yt2Status.innerText="อยู่หน้า YouTube 3 วินาที...";
  };

  // ตรวจ 3 วิ หน้ายูทูป
  const checkInterval = setInterval(()=>{
    // ปุ่ม 1
    if(yt1Opened && !done1){
      const t=(performance.now()-start1)/1000;
      if(t>=3 && document.visibilityState==="visible"){
        done1=true;
        yt1.className="pf-btn pf-green";
        yt1.innerText="Completed";
        yt1Status.classList.add("done");
        yt1Status.innerText="สำเร็จแล้ว";
        yt2.classList.remove("pf-disabled");
      }
    }
    // ปุ่ม 2
    if(yt2Opened && !done2 && done1){
      const t2=(performance.now()-start2)/1000;
      if(t2>=3 && document.visibilityState==="visible"){
        done2=true;
        yt2.className="pf-btn pf-green";
        yt2.innerText="Completed";
        yt2Status.classList.add("done");
        yt2Status.innerText="สำเร็จแล้ว";
        startProgress();
        clearInterval(checkInterval);
      }
    }
  },100);

  // progress bar
  function startProgress(){
    progress.style.display="block";
    let start = performance.now();
    let duration = 5000;
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

  enter.onclick=()=>document.querySelector(".pf-overlay").remove();

});
