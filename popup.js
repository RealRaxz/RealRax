document.addEventListener("DOMContentLoaded", () => {

  document.body.insertAdjacentHTML("beforeend", `
  <div id="overlay">
    <div id="box" class="animate">

      <div id="mascotWrap">
        <img src="mascot1.png" id="mascot">
      </div>

      <div id="panel" class="animate">
        <div>Complete Steps</div>

        <button id="adsBtn" class="btn gradient">Watch Ads</button>
        <div id="adsStatus" class="status">ยังไม่ได้ทำ</div>

        <button id="ytBtn" class="btn gradient" disabled>Like & Comment</button>
        <div id="ytStatus" class="status">ล็อคอยู่</div>

        <div id="progress">
          <div id="barBox"><div id="bar"></div></div>
          <div id="percent">0%</div>
        </div>

        <button id="enter" class="btn enterBtn">ENTER WEBSITE</button>
      </div>

    </div>
  </div>
  `);

  init();
  particles();
});

function init() {

  let done1 = false;
  let done2 = false;
  let adStart = 0;
  let timeSpent = 0;
  let tracking = false;

  const adsBtn = document.getElementById("adsBtn");
  const ytBtn = document.getElementById("ytBtn");

  const adsStatus = document.getElementById("adsStatus");
  const ytStatus = document.getElementById("ytStatus");

  const bar = document.getElementById("bar");
  const percent = document.getElementById("percent");
  const progress = document.getElementById("progress");
  const enter = document.getElementById("enter");

  // ads
  adsBtn.onclick = () => {
    if (done1) return;

    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
    tracking = true;
    adsStatus.innerText = "กำลังตรวจสอบ...";
  };

  document.addEventListener("visibilitychange", () => {
    if (!tracking || done1) return;

    if (document.hidden) {
      adStart = Date.now();
    } else {
      let t = (Date.now() - adStart)/1000;
      timeSpent += t;

      if (timeSpent >= 2) {
        done1 = true;

        adsBtn.className = "btn completed";
        adsBtn.innerText = "Completed";

        adsStatus.classList.add("done");
        adsStatus.innerText = "สำเร็จแล้ว";

        ytBtn.disabled = false;
      }
    }
  });

  // step2
  ytBtn.onclick = () => {
    if (!done1 || done2) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2 = true;

    ytBtn.className = "btn completed";
    ytBtn.innerText = "Completed";

    ytStatus.classList.add("done");
    ytStatus.innerText = "สำเร็จแล้ว";

    startProgress();
  };

  // progress
  function startProgress() {
    progress.style.display = "block";

    let start = null;
    let duration = 5000;

    function animate(ts) {
      if (!start) start = ts;

      let t = (ts - start)/duration;
      let eased = 1 - Math.pow(1 - t, 3);
      let val = Math.floor(eased * 100);

      bar.style.width = val + "%";
      percent.innerText = val + "%";

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        enter.style.display = "block";
      }
    }

    requestAnimationFrame(animate);
  }

  enter.onclick = () => {
    document.getElementById("overlay").remove();
  };
}

// particles
function particles() {
  const wrap = document.getElementById("mascotWrap");

  setInterval(() => {
    let el = document.createElement("div");
    let types = ["candy","star","snow"];
    let type = types[Math.floor(Math.random()*types.length)];

    el.className = type;
    el.style.left = Math.random()*100 + "%";
    el.style.bottom = "0px";

    wrap.appendChild(el);

    setTimeout(()=>el.remove(),4000);
  },150);
}
