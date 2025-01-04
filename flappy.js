let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

canvas.width = 256
canvas.height = 512

let bird = new Image()
bird.src = "bird.png"

let back = new Image()
back.src = "back.png"

let pipeBottom = new Image()
pipeBottom.src = "pipeBottom.png"

let pipeUp = new Image()
pipeUp.src = "pipeUp.png"

let road = new Image()
road.src = "road.png"

let fly = new Audio()
fly.src = "fly.mp3"

let score_audio = new Audio()
score_audio.src = "score.mp3"

let xPos = 10
let yPos = 150

let velY = 0
let gravity = 0.2

let gap = 110
let pipe = []
pipe[0]= {
	x : canvas.width,
	y: 0
}

let score = 0


function draw() {
	ctx.drawImage(back, 0, 0)
	ctx.drawImage(bird, xPos, yPos)

	if(yPos + bird.height >= canvas.height-road.height){
		reload()
	}

	velY += gravity
	yPos += velY

	for(let i = 0; i < pipe.length; i++ ){
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y+pipeUp.height+gap)
		pipe[i].x -=2
		if( pipe[i].x == 80){
			pipe.push({
				x: canvas.width,
				y: Math.floor(Math.random()*pipeUp.height)-pipeUp.height
			})
		}
	
	if (xPos+bird.width >= pipe[i].x && xPos<= pipe[i].x+pipeUp.width && 
		(yPos<=pipe[i].y+pipeUp.height || yPos+bird.height >= pipe[i].y+pipeUp.height + gap)){
		reload()
	}	
	if(pipe[i].x==0){
		score_audio.play()
		}
	}
	ctx.drawImage(road, 0, canvas.height-road.height)
}

canvas.addEventListener("mousedown", moveUp)

function moveUp(){
	velY -=4
	fly.play()
}

function reload() {
	xPos =10
	yPos = 150
	velY = 0
	pipe = []
	pipe[0] = {
		x: canvas.width,
		y:0
	}
	score = 0
}

setInterval(draw, 20)
