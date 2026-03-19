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

  document.body.style.overflow = "hidden";

  step1.classList.remove("disabled");

  let adTime = 0;

  adsBtn.onclick = () => {
    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
    adTime = Date.now();
    adsBtn.innerText = "Checking...";
  };

  window.addEventListener("focus", () => {
    if (!done1 && adTime > 0) {
      let t = (Date.now() - adTime) / 1000;

      if (t >= 2) {
        done1 = true;
        adsBtn.innerText = "Done";
        step2.classList.remove("disabled");
      } else {
        adsBtn.innerText = "Stay longer";
      }
    }
  });

  ytBtn.onclick = () => {
    if (!done1) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    done2 = true;
    ytBtn.innerText = "Done";

    startProgress();
  };

  function startProgress() {
    progress.style.display = "block";

    let start = null;
    let duration = 2000;

    function animate(ts) {
      if (!start) start = ts;
      let t = (ts - start) / duration;
      let eased = 1 - Math.pow(1 - t, 3);

      bar.style.width = (eased * 100) + "%";

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        enterBtn.classList.add("show");
      }
    }

    requestAnimationFrame(animate);
  }

  enterBtn.onclick = () => {
    document.getElementById("popup-overlay").remove();
    document.body.style.overflow = "auto";
  };
}
