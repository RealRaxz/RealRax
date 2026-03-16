// สร้างกล่องเตือน
let warn = document.createElement("div")

warn.id = "adblock-warning"

warn.innerHTML = `
<div style="
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:#111;
color:white;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
z-index:99999;
text-align:center;
padding:20px;
">

<h2 style="color:#ff4040">⚠ Adblock Detected</h2>

<p>Please disable Adblock to access this website.</p>

<p>This website is supported by ads.</p>

<button onclick="location.reload()" style="
padding:10px 20px;
border:none;
background:#d60000;
color:white;
border-radius:6px;
cursor:pointer;
">
I Disabled Adblock
</button>

</div>
`

document.body.appendChild(warn)

warn.style.display="none"

function detectAdblock(){

let ad = document.createElement("div")

ad.className="adsbox"
ad.style.height="1px"

document.body.appendChild(ad)

setTimeout(function(){

if(ad.offsetHeight === 0){

warn.style.display="block"

}

ad.remove()

},100)

}

window.addEventListener("load",detectAdblock)
