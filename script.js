// select canvas
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// draw rectangle function
function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

// make canvas


// computer paddle
const com = {
    x: canvas.width / 2 - 50 / 2,
    y: 10,
    width: 50,
    height: 10,
    color: "white",
    score: 0
};



// user paddle
const user = {
    x: canvas.width / 2 - 50 / 2,
    y: canvas.height - 10 - 10,
    width: 50,
    height: 10,
    color: "white",
    score: 0
};

// center line
function centerLine() {
    context.beginPath();
    context.setLineDash([6]);
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.strokeStyle = "white";
    context.stroke();
}

// call the centerLine function
centerLine();

// Draw a circle
function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// draw ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 1,
    velocityX: 5,
    velocityY: 5,
    color: "white"
};


//scores 
function drawText(text,x,y,color){
    context.fillStyle=color;
    context.font = "32px josefin sans";
    context.fillText(text,x,y);
}

//rendering the game
function render(){
    // make canvas
    drawRect(0, 0, 400, 600, "black"); 
    //computer paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);
    //user paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    // call the centerLine function
    centerLine();
    //ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    //scores
    drawText(com.score,30,canvas.height/2 - 30);
    drawText(user.score,30,canvas.height/2 + 50);
    
}


//moving user paddle
canvas.addEventListener("mousemove",movepaddle);
function movepaddle(e){
    let rect=canvas.getBoundingClientRect();
    user.x= e.clientX - rect.left -user.width/2;
}

//collision detection
function collision(b,p){//ball paddle
    b.top = b.y - b.radius;
    b.bottom= b.y + b.radius;
    b.left = b.x - b.radius;
    b.right= b.x + b.radius

    p.top= p.y;
    p.bottom= p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right >b.left && p.left <b.right && b.bottom>p.top && b.top < p.bottom;

}
// balll restart
function resetball(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 1 ;
    ball.velocityY = -ball.velocityY

}
//game over
function showGameOver(){
    canvas.style.display="none";
    const can=document.getElementById("mygame");
    can.style.display="none";
    //container
    const result = document.getElementById("result");
    result.style.display="block";
}


//function update
function update(){
    ball.x+=ball.velocityX * ball.speed;
    ball.y+=ball.velocityY * ball.speed;
    //computer paddle
    let computerLevel=0.2;
    com.x += (ball.x-(com.x + com.width/2))* computerLevel;
    if(ball.speed > 2  ){
        com.x += (ball.x > com.x + com.width / 2) ? 5 : -5;
    }
    //reflecting th e ball
    if(ball.x + ball.radius>canvas.width || ball.x-ball.radius<0){
        ball.velocityX=-ball.velocityX;
    }
    //if collision occurs
    let player= (ball.y < canvas.height/2 ) ? com : user ;
    if(collision(ball,player)){
        ball.velocityY = - ball.velocityY ; 
        ball.speed += 0.1;
    }
    //points score
    if(ball.y - ball.radius<0){
        user.score++;
       resetball();

    }
    else if(ball.y + ball.radius > canvas.height){
        com.score++;
        resetball();
    }
    //game done
    if(user.score >4 ||com.score >4){
        clearInterval(loop);
        showGameOver();
    }
}
//start the game
function start(){
    update();
    render();
}
//loop 
const loop =setInterval(start,1000/50);

