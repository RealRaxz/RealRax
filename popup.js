document.addEventListener("DOMContentLoaded", () => {

  document.body.insertAdjacentHTML("beforeend", `
  <div id="overlay">
    <div id="box">

      <div id="mascotWrap">
        <img src="mascot1.png" id="mascot">
      </div>

      <div id="panel">
        <div>Complete Steps</div>

        <button id="adsBtn" class="btn redgold">Watch Ads</button>
        <button id="ytBtn" class="btn redgold disabled">Like & Comment</button>

        <div id="progress">
          <div id="barBox"><div id="bar"></div></div>
          <div id="percent">0%</div>
        </div>

        <button id="enter" class="btn bluegold">ENTER</button>
      </div>

    </div>
  </div>
  `);

  init();
  particles();
});

function init() {

  let done1 = false;
  let adStart = 0;
  let timeSpent = 0;
  let tracking = false;
  let waitingFinal = false;

  const adsBtn = document.getElementById("adsBtn");
  const ytBtn = document.getElementById("ytBtn");

  const bar = document.getElementById("bar");
  const percent = document.getElementById("percent");
  const progress = document.getElementById("progress");
  const enter = document.getElementById("enter");

  // ADS
  adsBtn.onclick = () => {
    if (done1) return;

    window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");
    tracking = true;
  };

  document.addEventListener("visibilitychange", () => {
    if (tracking && !done1) {
      if (document.hidden) {
        adStart = Date.now();
      } else {
        timeSpent += (Date.now() - adStart)/1000;
        if (timeSpent >= 2) {
          done1 = true;
          adsBtn.className = "btn bluegold";
          adsBtn.innerText = "Completed";
          ytBtn.classList.remove("disabled");
        }
      }
    }

    // 🎯 FINAL trigger progress ตอนกลับมา
    if (waitingFinal && !document.hidden) {
      waitingFinal = false;
      startProgress();
    }
  });

  // STEP2
  ytBtn.onclick = () => {
    if (!done1) return;

    window.open("https://youtu.be/-lCf-dBK1cs?si=za60J3O5xnlSbgvd");

    ytBtn.className = "btn bluegold";
    ytBtn.innerText = "Completed";

    waitingFinal = true; // รอกลับมา
  };

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

// 🍭 particles multi-type
function particles() {
  const wrap = document.getElementById("mascotWrap");
  const types = ["circle","cane","star","snow"];

  setInterval(() => {
    let el = document.createElement("div");
    let type = types[Math.floor(Math.random()*types.length)];

    el.className = "candy " + type;
    el.style.left = Math.random()*100 + "%";
    el.style.bottom = "0px";

    wrap.appendChild(el);
    setTimeout(()=>el.remove(),4000);
  },150);
}
