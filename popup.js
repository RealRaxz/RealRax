let token = null;

ads.onclick = async ()=>{
  if(done1) return;

  // ขอ token จาก server
  let res = await fetch("http://localhost:3000/start");
  let data = await res.json();

  token = data.token;

  window.open("https://airconditionstrodefist.com/zamjdwmm?key=4632b457606c55aeef029a52d64159f6");

  adsStatus.innerText = "กำลังตรวจสอบ...";
};

// ตอนกลับมา
window.addEventListener("focus", async ()=>{

  if(done1 || !token) return;

  let res = await fetch("http://localhost:3000/verify?token="+token);
  let data = await res.json();

  if(data.ok){
    done1 = true;

    ads.className="pf-btn pf-green";
    ads.innerText="Completed";

    adsStatus.classList.add("done");
    adsStatus.innerText="สำเร็จแล้ว";

    yt.classList.remove("pf-disabled");
  } else {
    adsStatus.innerText="ไม่ผ่านเงื่อนไข";
  }

});
