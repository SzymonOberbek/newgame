var ctx, controller, player, loop, obstacle;


ctx = document.querySelector('canvas').getContext("2d");

ctx.canvas.height = 600;
ctx.canvas.width = 700;

//obiekt którym sterujemy
player = new Object();
player.height = 50;
player.jumping = true;
player.width = 50;
player.x = ctx.canvas.width / 2 - (player.width / 2);
player.y = 0;
player.y_velocity = 0;


//sterowanie
controller = {

    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "mousedown") ? true : false

                controller.up = key_state;
    

    }

};
//przeszkoda
obstacle = new Object();
obstacle.height = 50;
obstacle.width = 50;
obstacle.x = ctx.canvas.width;
obstacle.y = ctx.canvas.height - obstacle.height - 50;
obstacle.speed = 5;
obstacle.move = function () {
    obstacle.x -= obstacle.speed;
    if (obstacle.x == 0) {
        obstacle.x = ctx.canvas.width;
    }
}


//pętla gry
loop = function () {

    if (controller.up && player.jumping == false) {

        player.y_velocity -= 40;
        player.jumping = true;

    }

    
    player.y_velocity += 2;// grawitacja
    player.y += player.y_velocity;
    

    // pozycja na ziemi
    if (player.y > ctx.canvas.height - 50 - player.height) {

        player.jumping = false;
        player.y = ctx.canvas.height - 50 - player.height;
        player.y_velocity = 0;

    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 600);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 550);
    ctx.lineTo(700, 550);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fill();
    ctx.strokeStyle = 'red';
    setInterval(obstacle.move(), 1000);

    if (((player.x < obstacle.x && player.x + 50 > obstacle.x) || (obstacle.x + 50  >= player.x && obstacle.x <= player.x + player.width)) && (player.y + 25 > obstacle.y)){
        alert('Game Over');
        window.location.reload(true);
        window.requestAnimationFrame()
    }
    window.requestAnimationFrame(loop);

};

window.addEventListener("mousedown", controller.keyListener);
window.addEventListener("mouseup", controller.keyListener);
window.requestAnimationFrame(loop);