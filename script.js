const canvas=document.getElementById("snow")
const ctx=canvas.getContext("2d")

let snow=[]

function resize(){
canvas.width=window.innerWidth
canvas.height=window.innerHeight
}

resize()

window.addEventListener("resize",resize)

for(let i=0;i<180;i++){

snow.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*3+1,
speed:Math.random()*1+0.6
})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"
ctx.beginPath()

snow.forEach(f=>{
ctx.moveTo(f.x,f.y)
ctx.arc(f.x,f.y,f.r,0,Math.PI*2)
})

ctx.fill()

snow.forEach(f=>{
f.y+=f.speed

if(f.y>canvas.height){
f.y=0
f.x=Math.random()*canvas.width
}

})

}

setInterval(draw,30)
