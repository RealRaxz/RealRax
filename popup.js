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

  // 🎬 STEP 0: มาสคอตลอยขึ้นก่อน
  setTimeout(() => {
    mascotZone.classList.add("show-mascot");
  }, 200);

  // 🎬 STEP 1: split layout (ซ้าย-ขวา)
  setTimeout(() => {
    mascotZone.classList.add("split-layout");
    actionZone.classList.add("show-actions");
    step1.classList.remove("disabled");
  }, 900);

  // STEP 1
  adsBtn.onclick = () => {
    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");

    adsBtn.innerText = "⏳ รอ 2 วิ...";
    adsBtn.disabled = true;

    setTimeout(() => {
      done1 = true;
      adsBtn.innerText = "✅ เสร็จแล้ว";
      step2.classList.remove("disabled");
    }, 2000);
  };

  // STEP 2
  ytBtn.onclick = () => {
    if (!done1) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2 = true;
    ytBtn.innerText = "✅ เสร็จแล้ว";

    startProgress();
  };

  function startProgress() {
    progress.style.display = "block";

    let p = 0;
    let interval = setInterval(() => {
      p += 2;
      bar.style.width = p + "%";

      if (p >= 100) {
        clearInterval(interval);
        enterBtn.style.display = "block";
      }
    }, 30);
  }

  enterBtn.onclick = () => {
    document.getElementById("popup-overlay").remove();
    document.body.style.overflow = "auto";
  };
}
