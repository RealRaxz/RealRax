const scripts=[

/* ===== เพิ่ม Script ใหม่ตรงนี้ ===== */

{
title:"Blox Fruits Auto Farm",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"HOT",
id:1
},

{
title:"Anime Fighters Script",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"NEW",
id:2
},

{
title:"King Legacy Script",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"",
id:3
},

{
title:"Doors Script",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"",
id:4
},

{
title:"Pet Simulator Script",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"",
id:5
},

{
title:"Anime Warriors Script",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"",
id:6
},

{
title:"Blade Ball Script",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"",
id:7
},

{
title:"Blox Fruits Raid Script",
img:"https://img.youtube.com/vi/ueHLbrNRBlI/maxresdefault.jpg",
badge:"",
id:8
},

/* เพิ่มต่อไปจน 30 การ์ดได้ */

]

let page=1
const perPage=8

function render(){

const grid=document.getElementById("grid")

const search=document.getElementById("search").value.toLowerCase()

let filtered=scripts.filter(s=>s.title.toLowerCase().includes(search))

let start=(page-1)*perPage

let items=filtered.slice(start,start+perPage)

grid.innerHTML=""

items.forEach(s=>{

grid.innerHTML+=`

<div class="card">

${s.badge?`<div class="badge">${s.badge}</div>`:""}

<img src="${s.img}">

<h3>${s.title}</h3>

<a href="script1.html?id=${s.id}">Get Script</a>

</div>

`

})

renderPagination(filtered.length)

}

function renderPagination(total){

const pages=Math.ceil(total/perPage)

let html=""

for(let i=1;i<=pages;i++){

html+=`<button onclick="goPage(${i})">${i}</button>`

}

document.getElementById("pagination").innerHTML=html

}

function goPage(p){

page=p
render()

}

document.getElementById("search").addEventListener("input",()=>{

page=1
render()

})

render()
