const overlay = document.getElementById("gateOverlay");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const enterBtn = document.getElementById("enterBtn");

requestAnimationFrame(() => overlay.classList.add("show"));

// ใช้ sessionStorage เก็บสถานะขั้นตอน
let step = Number(sessionStorage.getItem("popupStep") || 0);
updateUI();

// ป้องกัน busy click
let busy = false;

// ฟังก์ชัน verify บังคับดู ads 2 วิ
function verify(link, cb) {
  if (busy) return;
  busy = true;

  const newWindow = window.open(link, "_blank");
  const start = Date.now();

  const checkInterval = setInterval(() => {
    if (newWindow.closed) {
      clearInterval(checkInterval);
      const elapsed = Date.now() - start;
      const waitTime = Math.max(2000 - elapsed, 0); // บังคับ 2 วิ
      setTimeout(() => {
        cb();
        busy = false;
      }, waitTime);
    }
  }, 100);
}

// step1
btn1.onclick = () => verify("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6", () => {
  step = 1;
  sessionStorage.setItem("popupStep", step);
  updateUI();
});

// step2
btn2.onclick = () => {
  if (step !== 1 || busy) return;
  verify("https://youtu.be/-lCf-dBK1cs?si=b_EgtIkpC-Kd-6c6", () => {
    step = 2;
    sessionStorage.setItem("popupStep", step);
    updateUI();
    startProgress();
  });
};

// progress + show enter
function startProgress() {
  if (sessionStorage.getItem("popupProgress") === "100") {
    enterBtn.classList.add("show");
    return;
  }
  let p = 0;
  const interval = setInterval(() => {
    p++;
    fill.style.width = p + "%";
    percent.textContent = p + "%";
    sessionStorage.setItem("popupProgress", p);
    if (p >= 100) {
      clearInterval(interval);
      setTimeout(() => enterBtn.classList.add("show"), 200);
    }
  }, 30);
}

// enter
enterBtn.onclick = () => {
  overlay.remove();
  sessionStorage.clear(); // เคลียร์หลังเข้าจริง
};

// update UI ตามขั้นตอน
function updateUI() {
  if (step >= 1) {
    btn1.classList.add("success");
    btn1.textContent = "Done";
    btn2.classList.remove("lock");
  }
  if (step >= 2) {
    btn2.classList.add("success");
    btn2.textContent = "Done";
    startProgress();
  }
}
