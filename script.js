function copyScript(){

let text=document.getElementById("script");

text.select();

navigator.clipboard.writeText(text.value);

alert("Script copied");

}


let page=1;

function nextPage(){

page++;

location.href="index.html?page="+page;

}

function prevPage(){

if(page>1){

page--;

location.href="index.html?page="+page;

}

}



const canvas=document.getElementById("snow");

if(canvas){

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

let snow=[];

for(let i=0;i<150;i++){

snow.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*3+1,
s:Math.random()*1+0.5

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";

snow.forEach(f=>{

ctx.beginPath();

ctx.arc(f.x,f.y,f.r,0,Math.PI*2);

ctx.fill();

f.y+=f.s;

if(f.y>canvas.height){

f.y=0;

f.x=Math.random()*canvas.width;

}

})

}

setInterval(draw,30)

}
