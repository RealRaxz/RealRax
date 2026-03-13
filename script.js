// COPY SCRIPT

function copyScript(){

var copyText = document.getElementById("script");

copyText.select();
copyText.setSelectionRange(0,99999);

navigator.clipboard.writeText(copyText.value);

alert("Script copied!");

}


// PAGINATION

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


// SNOW EFFECT

const canvas=document.getElementById("snow");

if(canvas){

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let snowflakes=[];

for(let i=0;i<120;i++){

snowflakes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*3+1,
d:Math.random()+1

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";

ctx.beginPath();

for(let i=0;i<snowflakes.length;i++){

let f=snowflakes[i];

ctx.moveTo(f.x,f.y);

ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true)

}

ctx.fill();

move();

}

function move(){

for(let i=0;i<snowflakes.length;i++){

let f=snowflakes[i];

f.y+=Math.pow(f.d,2)+1;

f.x+=Math.sin(f.y*0.01);

if(f.y>canvas.height){

snowflakes[i]={

x:Math.random()*canvas.width,
y:0,
r:f.r,
d:f.d

}

}

}

}

setInterval(draw,25)

}
