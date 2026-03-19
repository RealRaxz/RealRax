fetch("popup.html")
  .then(res => res.text())
  .then(data => {
    document.body.insertAdjacentHTML("beforeend", data);
    initPopup();
  });

function initPopup() {

  const mascotZone = document.getElementById("mascot-zone");
  const actionZone = document.getElementById("action-zone");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  const adsBtn = document.getElementById("adsBtn");
  const ytBtn = document.getElementById("ytBtn");

  const progress = document.getElementById("progress-container");
  const bar = document.getElementById("progress-bar");
  const enterBtn = document.getElementById("enterBtn");

  let done1 = false;
  let done2 = false;

  document.body.style.overflow = "hidden";

  // animation flow
  setTimeout(() => mascotZone.classList.add("show-mascot"), 200);

  setTimeout(() => {
    mascotZone.classList.add("split");
    actionZone.classList.add("show-actions");
    step1.classList.remove("disabled");
  }, 900);

  // 🔥 ตรวจจับ ads จริง
  let adOpenedTime = 0;

  adsBtn.onclick = () => {
    const adWindow = window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");

    adOpenedTime = Date.now();
    adsBtn.innerText = "กำลังตรวจสอบ...";
  };

  window.addEventListener("focus", () => {
    if (!done1 && adOpenedTime > 0) {
      let duration = (Date.now() - adOpenedTime) / 1000;

      if (duration >= 2) {
        done1 = true;
        adsBtn.innerText = "✅ สำเร็จ";
        step2.classList.remove("disabled");
      } else {
        adsBtn.innerText = "❌ อยู่ไม่ครบ 2 วิ";
      }
    }
  });

  // STEP 2
  ytBtn.onclick = () => {
    if (!done1) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2 = true;
    ytBtn.innerText = "✅ สำเร็จ";

    startProgress();
  };

  // 🔥 easing progress
  function startProgress() {
    progress.style.display = "block";

    let start = null;
    let duration = 2000;

    function animate(ts) {
      if (!start) start = ts;
      let progressTime = ts - start;
      let percent = easeOutCubic(progressTime / duration) * 100;

      bar.style.width = percent + "%";

      if (progressTime < duration) {
        requestAnimationFrame(animate);
      } else {
        bar.style.width = "100%";
        enterBtn.classList.add("show");
      }
    }

    requestAnimationFrame(animate);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // enter
  enterBtn.onclick = () => {
    document.getElementById("popup-overlay").remove();
    document.body.style.overflow = "auto";
  };
}
