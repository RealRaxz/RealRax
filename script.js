const perPage=8
let page=1

const scripts=[

/* ===== เพิ่มการ์ดใหม่ตรงนี้ ===== */
/* ถ้าเพิ่มใหม่ ให้ใส่ไว้บรรทัดบนสุด เพื่อให้ขึ้นหน้าแรก */

{title:"Random Script 1",id:1,thumb:"ueHLbrNRBlI",badge:"NEW"},
{title:"Random Script 2",id:2,thumb:"ueHLbrNRBlI",badge:"HOT"},
{title:"Random Script 3",id:3,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 4",id:4,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 5",id:5,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 6",id:6,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 7",id:7,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 8",id:8,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 9",id:9,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 10",id:10,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 11",id:11,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 12",id:12,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 13",id:13,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 14",id:14,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 15",id:15,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 16",id:16,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 17",id:17,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 18",id:18,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 19",id:19,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 20",id:20,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 21",id:21,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 22",id:22,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 23",id:23,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 24",id:24,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 25",id:25,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 26",id:26,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 27",id:27,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 28",id:28,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 29",id:29,thumb:"ueHLbrNRBlI",badge:""},
{title:"Random Script 30",id:30,thumb:"ueHLbrNRBlI",badge:""}

]

function render(){

let search=document.getElementById("search").value.toLowerCase()

let filtered=scripts.filter(s=>s.title.toLowerCase().includes(search))

let start=(page-1)*perPage

let items=filtered.slice(start,start+perPage)

const grid=document.getElementById("grid")

grid.innerHTML=""

items.forEach(s=>{

let img=`https://img.youtube.com/vi/${s.thumb}/maxresdefault.jpg`

grid.innerHTML+=`

<div class="card">

${s.badge?`<div class="badge">${s.badge}</div>`:""}

<img src="${img}">

<h3>${s.title}</h3>

<a href="script1.html?id=${s.id}">Get Script</a>

</div>

`

})

renderPagination(filtered.length)

}

function renderPagination(total){

let pages=Math.ceil(total/perPage)

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
