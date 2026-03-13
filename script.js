const scripts = [

{title:"Auto Farm Script",img:"https://picsum.photos/400/250?1",link:"script1.html"},
{title:"Fast Attack Script",img:"https://picsum.photos/400/250?2",link:"script2.html"},
{title:"Auto Raid Script",img:"https://picsum.photos/400/250?3",link:"script3.html"},
{title:"Auto Boss Script",img:"https://picsum.photos/400/250?4",link:"script4.html"},
{title:"Auto Mastery Script",img:"https://picsum.photos/400/250?5",link:"script5.html"},
{title:"Sea Event Script",img:"https://picsum.photos/400/250?6",link:"script6.html"},
{title:"Auto Level Script",img:"https://picsum.photos/400/250?7",link:"script1.html"},
{title:"Auto Quest Script",img:"https://picsum.photos/400/250?8",link:"script1.html"},
{title:"Fruit Finder Script",img:"https://picsum.photos/400/250?9",link:"script1.html"}

];

let page = 1;
const perPage = 6;

function renderPage(){

const grid = document.getElementById("scriptGrid");
grid.innerHTML="";

let start = (page-1)*perPage;
let end = start+perPage;

let items = scripts.slice(start,end);

items.forEach(function(s){

let card = document.createElement("a");
card.className="card";
card.href=s.link;

card.innerHTML = `
<img src="${s.img}">
<h3>${s.title}</h3>
`;

grid.appendChild(card);

});

document.getElementById("pageNum").innerText = page;

}

document.getElementById("nextBtn").onclick=function(){

if(page*perPage < scripts.length){

page++;
renderPage();

}

}

document.getElementById("prevBtn").onclick=function(){

if(page>1){

page--;
renderPage();

}

}

renderPage();
