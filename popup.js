// inject html เข้าเว็บ
fetch("popup.html")
  .then(res => res.text())
  .then(data => {
    document.body.insertAdjacentHTML("beforeend", data);
    initPopup();
  });

function initPopup() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const adsBtn = document.getElementById("adsBtn");
  const ytBtn = document.getElementById("ytBtn");
  const progress = document.getElementById("progress-container");
  const bar = document.getElementById("progress-bar");
  const enterBtn = document.getElementById("enterBtn");

  let done1 = false;
  let done2 = false;

  // เปิด step1
  step1.classList.remove("disabled");

  // STEP 1 (Ads)
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

  // STEP 2 (YouTube)
  ytBtn.onclick = () => {
    if (!done1) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2 = true;
    ytBtn.innerText = "✅ เสร็จแล้ว";

    startProgress();
  };

  function startProgress() {
    if (!done1 || !done2) return;

    progress.style.display = "block";

    let percent = 0;
    let interval = setInterval(() => {
      percent += 2;
      bar.style.width = percent + "%";

      if (percent >= 100) {
        clearInterval(interval);
        enterBtn.style.display = "block";
      }
    }, 30);
  }

  // ENTER
  enterBtn.onclick = () => {
    document.getElementById("popup-overlay").remove();
    document.body.style.overflow = "auto";
  };

  // ล็อค scroll
  document.body.style.overflow = "hidden";
}
