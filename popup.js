<script>
const adBtn = document.getElementById("adButton1");
const likeBtn = document.getElementById("likeButton1");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const continueBtn = document.getElementById("continueButton");

let actionDone = { ad: false, like: false };
let busy = false;
let progress = 0;

function verify(link, key, cb) {
  if (busy) return;
  busy = true;

  const newWindow = window.open(link, "_blank");
  const start = Date.now();

  const interval = setInterval(() => {
    if (!newWindow || newWindow.closed) {
      clearInterval(interval);
      const elapsed = Date.now() - start;
      const waitTime = Math.max(2000 - elapsed, 0); // 2 วิ

      setTimeout(() => {
        actionDone[key] = true;
        updateUI();
        busy = false;
        cb && cb();
      }, waitTime);
    }
  }, 100);
}

function updateUI() {
  if (actionDone.ad) {
    adBtn.textContent = "Done";
    adBtn.style.pointerEvents = "none";
    likeBtn.classList.remove("disabled");
  }

  if (actionDone.like) {
    likeBtn.textContent = "Done";
    likeBtn.style.pointerEvents = "none";
  }

  if (actionDone.ad && actionDone.like && progress === 0) {
    progressContainer.style.display = "block";
    startProgress();
  }
}

function startProgress() {
  const interval = setInterval(() => {
    progress++;
    progressBar.style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(interval);
      continueBtn.style.display = "block";
    }
  }, 30);
}

adBtn.addEventListener("click", () => verify(adBtn.href, "ad"));
likeBtn.addEventListener("click", () => verify(likeBtn.href, "like"));
continueBtn.addEventListener("click", () => {
  document.getElementById("subscribePopup").style.display = "none";
});
</script>
