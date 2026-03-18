const overlay = document.getElementById("gateOverlay");
const gateBox = document.getElementById("gateBox");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const enterBtn = document.getElementById("enterBtn");

// State ปลอดภัย
let step = Number(localStorage.getItem("popupStep") || 0);
let progress = Number(localStorage.getItem("popupProgress") || 0);
let actionComplete = JSON.parse(localStorage.getItem("actionComplete") || '{"btn1":false,"btn2":false}');

let busy = false;

// Responsive
function resizePopup() {
  const vw = window.innerWidth;
  gateBox.style.width = vw < 400 ? "90%" : "320px";
}
window.addEventListener("resize", resizePopup);
resizePopup();

requestAnimationFrame(() => overlay.classList.add("show"));

// ฟังก์ชัน verify แบบ Action 2/2
function verify(link, actionKey, cb) {
  if (busy) return;
  busy = true;

  const newWindow = window.open(link, "_blank");
  const start = Date.now();

  const interval = setInterval(() => {
    if (!newWindow || newWindow.closed) {
      clearInterval(interval);
      const elapsed = Date.now() - start;
      const waitTime = Math.max(2000 - elapsed, 0);

      setTimeout(() => {
        actionComplete[actionKey] = true;
        localStorage.setItem("actionComplete", JSON.stringify(actionComplete));
        cb();
        busy = false;
      }, waitTime);
    }
  }, 100);
}

// Update UI ทุกขั้นตอน
function updateUI() {
  // Step1
  if (actionComplete.btn1) {
    btn1.classList.add("success");
    btn1.textContent = "Done";
    btn2.classList.remove("lock");
  }

  // Step2
  if (actionComplete.btn2) {
    btn2.classList.add("success");
    btn2.textContent = "Done";
  }

  // ถ้าครบ Action ทั้งสองปุ่ม เริ่ม progress
  if (actionComplete.btn1 && actionComplete.btn2) {
    startProgress(progress);
  }
}

// Responsive verify
btn1.onclick = () => verify("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6","btn1",()=>updateUI());
btn2.onclick = () => {
  if (!actionComplete.btn1 || busy) return;
  verify("https://youtu.be/-lCf-dBK1cs?si=b_EgtIkpC-Kd-6c6","btn2",()=>updateUI());
}

// Progress + show enter
function startProgress(start=0){
  let p = start;
  fill.style.width = p + "%";
  percent.textContent = p + "%";

  if (p >= 100) {
    enterBtn.classList.add("show");
    return;
  }

  const interval = setInterval(()=>{
    p++;
    fill.style.width = p + "%";
    percent.textContent = p + "%";
    localStorage.setItem("popupProgress",p);
    if(p>=100){
      clearInterval(interval);
      enterBtn.classList.add("show");
    }
  },30);
}

// Enter button
enterBtn.onclick = () => {
  overlay.remove();
  localStorage.removeItem("popupStep");
  localStorage.removeItem("popupProgress");
  localStorage.removeItem("actionComplete");
}

// Initial
updateUI();
