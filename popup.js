document.addEventListener("DOMContentLoaded", () => {

  document.body.insertAdjacentHTML("beforeend", `
  <div id="overlay">
    <div id="box">

      <div id="mascotWrap">
        <img src="mascot1.png" id="mascot">
      </div>

      <div id="panel">
        <div>Complete Steps</div>

        <button id="adsBtn" class="btn red">Watch Ads</button>
        <div id="adsStatus" class="status">ยังไม่ได้ทำ</div>

        <button id="ytBtn" class="btn red disabled">Like & Comment</button>
        <div id="ytStatus" class="status">ล็อคอยู่</div>

        <div id="progress">
          <div id="barBox"><div id="bar"></div></div>
          <div id="percent">0%</div>
        </div>

        <button id="enter" class="btn green">ENTER</button>
      </div>

    </div>
  </div>
  `);

  init();
  candyParticles();
});

function init() {

  let done1 = false;
  let tracking = false;
  let adStart = 0;
  let timeSpent = 0;

  const adsBtn = document.getElementById("adsBtn");
  const ytBtn = document.getElementById("ytBtn");

  const adsStatus = document.getElementById("adsStatus");
  const ytStatus = document.getElementById("ytStatus");

  const bar = document.getElementById("bar");
  const percent = document.getElementById("percent");
  const progress = document.getElementById("progress");
  const enter = document.getElementById("enter");

  // ===== ADS =====
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
        tracking = false;

        adsBtn.outerHTML = '<button class="btn green">Completed</button>';
        adsStatus.innerText = "สำเร็จแล้ว";

        ytBtn.classList.remove("disabled");
        ytStatus.innerText = "พร้อมใช้งาน";
      } else {
        adsStatus.innerText = "อยู่ให้นานขึ้น...";
      }
    }
  });

  // ===== STEP2 =====
  ytBtn.onclick = () => {
    if (!done1) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    ytBtn.outerHTML = '<button class="btn green">Completed</button>';
    ytStatus.innerText = "สำเร็จแล้ว";

    startProgress();
  };

  // ===== PROGRESS (smooth จริง) =====
  function startProgress() {
    progress.style.display = "block";

    let start = null;
    let duration = 5000;

    function animate(ts) {
      if (!start) start = ts;

      let t = (ts - start) / duration;
      let eased = 1 - Math.pow(1 - t, 3);
      let value = Math.floor(eased * 100);

      bar.style.width = value + "%";
      percent.innerText = value + "%";

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        percent.innerText = "100%";
        enter.style.display = "block";
      }
    }

    requestAnimationFrame(animate);
  }

  enter.onclick = () => {
    document.getElementById("overlay").remove();
  };
}

// 🍬 candy particles
function candyParticles() {
  const wrap = document.getElementById("mascotWrap");

  setInterval(() => {
    let c = document.createElement("div");
    c.className = "candy";

    c.style.left = Math.random() * 100 + "%";
    c.style.bottom = "0px";

    wrap.appendChild(c);

    setTimeout(() => c.remove(), 4000);
  }, 180);
}
