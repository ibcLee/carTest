/**
 * Created by fashion1993 on 2015/9/10.
 */
$(document).ready(function(){
    var _height = $(window).height();
    var _width = $(window).width();
    var myReq;
    var plankLeft = false;
    var plankRight = false;
    var canvas = $("#wrap").get(0);
    $(canvas).attr("height",_height);
    $(canvas).attr("width",_width);
    var ballctx = canvas.getContext('2d');
    var plankctx = canvas.getContext('2d');
    var ball = {
        x:100,
        y:100,
        vx:5,
        vy:2,
        radius:25,
        color:'red',
        draw:function(){
            ballctx.beginPath();
            ballctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            ballctx.closePath();
            ballctx.fillStyle = this.color;
            ballctx.fill();
        }
    }
    var plank = {
        x:_width/2,
        y:_height-50,
        width:200,
        height:50,
        color:'blue',
        moveLeft:function(){
            plankLeft = true;
            plankctx.clearRect(this.x,this.y,this.width,this.height);
            this.x -=20;
            this.draw();

        },
        moveRight:function(){
            plankRight = true;
            plankctx.clearRect(this.x,this.y,this.width,this.height);
            this.x +=20;
            this.draw();
        },
        draw:function(){
            plankctx.beginPath();
            plankctx.fillRect(this.x,this.y,this.width,this.height);
            plankctx.fillStyle = plank.color;
            plankctx.fill();
        }
    }
    $(document).keydown(function(event){
        switch(event.keyCode){
            case 37:
                plank.moveLeft();
                break;
            case 39:
                plank.moveRight();
                break;
        }
        return false;
    })
    plank.draw();
    function draw(){
        ballctx.clearRect(0,0,canvas.width,canvas.height);
        ball.draw();
        plank.draw();
        ball.x +=ball.vx;
        ball.y +=ball.vy;
        //if(ball.y+ball.radius == plank.y || ball.y + ball.vy -20 < 0){
        //    ball.vy = -ball.vy;
        //    if(ball.x>=plank.x){
        //        if(ball.x<=plank.x+plank.width){
        //            ball.vy = -ball.vy;
        //        }
        //    }
        //}
        if(ball.y + ball.vy +20 >canvas.height || ball.y + ball.vy -20 < 0){
            ball.vy = -ball.vy;
        }
        if(ball.x + ball.vx +20>canvas.width || ball.x + ball.vx-20 < 0){
            ball.vx = -ball.vx;
        }
        myReq = requestAnimationFrame(draw);
    }
    myReq = requestAnimationFrame(draw);
    ball.draw();
})