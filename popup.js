const overlay = document.getElementById("gateOverlay");
const gateBox = document.getElementById("gateBox");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const enterBtn = document.getElementById("enterBtn");

// ใช้ localStorage แทน sessionStorage สำหรับความเสถียรข้าม reload/back
let step = Number(localStorage.getItem("popupStep") || 0);
let progress = Number(localStorage.getItem("popupProgress") || 0);

// แสดง overlay
requestAnimationFrame(() => overlay.classList.add("show"));

// ป้องกัน multi click
let busy = false;

// Responsive scale ตาม viewport
function resizePopup() {
  const vw = window.innerWidth;
  gateBox.style.width = vw < 400 ? "90%" : "320px";
}
window.addEventListener("resize", resizePopup);
resizePopup();

// Verify function รองรับทุกแพลตฟอร์ม
function verify(link, cb) {
  if (busy) return;
  busy = true;

  // ป้องกัน popup block บนมือถือ
  const newWindow = window.open(link, "_blank");
  const start = Date.now();

  // check ทุก 100ms ว่าปิดหรือไม่
  const interval = setInterval(() => {
    if (!newWindow || newWindow.closed) {
      clearInterval(interval);
      const elapsed = Date.now() - start;
      const waitTime = Math.max(2000 - elapsed, 0); // บังคับ 2 วินาที
      setTimeout(() => {
        cb();
        busy = false;
      }, waitTime);
    }
  }, 100);
}

// Update UI ทุกขั้นตอน
function updateUI() {
  if (step >= 1) {
    btn1.classList.add("success");
    btn1.textContent = "Done";
    btn2.classList.remove("lock");
  }
  if (step >= 2) {
    btn2.classList.add("success");
    btn2.textContent = "Done";
    startProgress(progress);
  }
}

// ปุ่ม step 1
btn1.onclick = () => verify("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6", () => {
  step = 1;
  localStorage.setItem("popupStep", step);
  updateUI();
});

// ปุ่ม step 2
btn2.onclick = () => {
  if (step !== 1 || busy) return;
  verify("https://youtu.be/-lCf-dBK1cs?si=b_EgtIkpC-Kd-6c6", () => {
    step = 2;
    localStorage.setItem("popupStep", step);
    updateUI();
    startProgress(progress);
  });
};

// Progress + show enter
function startProgress(start = 0) {
  let p = start;
  fill.style.width = p + "%";
  percent.textContent = p + "%";

  if (p >= 100) {
    enterBtn.classList.add("show");
    return;
  }

  const interval = setInterval(() => {
    p++;
    fill.style.width = p + "%";
    percent.textContent = p + "%";
    localStorage.setItem("popupProgress", p);
    if (p >= 100) {
      clearInterval(interval);
      enterBtn.classList.add("show");
    }
  }, 30);
}

// Enter button
enterBtn.onclick = () => {
  overlay.remove();
  localStorage.removeItem("popupStep");
  localStorage.removeItem("popupProgress");
};

// Initial load
updateUI();
