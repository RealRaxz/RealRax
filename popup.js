// ===== inject HTML =====
document.addEventListener("DOMContentLoaded", () => {

  document.body.insertAdjacentHTML("beforeend", `
  <div id="overlay">
    <div id="box">

      <img src="mascot1.png" id="mascot">

      <div id="panel">
        <div class="title">Complete Steps</div>

        <button id="adsBtn" class="btn primary">Watch Ads</button>
        <div id="adsStatus" class="status">ยังไม่ได้ทำ</div>

        <button id="ytBtn" class="btn secondary disabled">Like & Comment</button>
        <div id="ytStatus" class="status">ล็อคอยู่</div>

        <div id="progress"><div id="bar"></div></div>

        <button id="enter" class="btn">ENTER WEBSITE</button>
      </div>

    </div>
  </div>
  `);

  initPopup();
});


// ===== logic =====
function initPopup() {

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
  const progress = document.getElementById("progress");
  const enter = document.getElementById("enter");

  document.body.style.overflow = "hidden";

  // ===== ADS =====
  adsBtn.onclick = () => {
    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");

    tracking = true;
    adsStatus.innerText = "กำลังตรวจสอบ...";
  };

  document.addEventListener("visibilitychange", () => {
    if (!tracking) return;

    if (document.hidden) {
      adStart = Date.now();
    } else {
      let t = (Date.now() - adStart)/1000;
      timeSpent += t;

      if (timeSpent >= 2 && !done1) {
        done1 = true;
        adsStatus.innerText = "สำเร็จ";
        ytBtn.classList.remove("disabled");
        ytStatus.innerText = "พร้อมใช้งาน";
      } else {
        adsStatus.innerText = "ต้องอยู่โฆษณานานขึ้น";
      }
    }
  });

  // ===== STEP2 =====
  ytBtn.onclick = () => {
    if (!done1) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2 = true;
    ytStatus.innerText = "สำเร็จ";

    startProgress();
  };

  // ===== PROGRESS =====
  function startProgress() {
    progress.style.display = "block";

    let start = null;
    let duration = 1800;

    function animate(ts) {
      if (!start) start = ts;

      let t = (ts - start)/duration;
      let eased = 1 - Math.pow(1 - t, 3);

      bar.style.width = (eased*100) + "%";

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        enter.style.display = "block";
      }
    }

    requestAnimationFrame(animate);
  }

  // ===== ENTER =====
  enter.onclick = () => {
    document.getElementById("overlay").remove();
    document.body.style.overflow = "auto";
  };
}
