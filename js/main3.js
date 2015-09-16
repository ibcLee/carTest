/**
 * Created by fashion1993 on 2015/9/11.
 */
$(document).ready(function(){
    var _height = $(window).height();
    var _width = $(window).width();
    var canvas = $("#wrap").get(0);
    $(canvas).attr("height",_height);
    $(canvas).attr("width",_width);
    var birdctx = canvas.getContext('2d');
    var boxctx = canvas.getContext('2d');

    //var imgBird = $("#bird");
    //var imgPipe = $("#pipe");
    var Bird = function(y,x,w,h,color,vy,vx){
        this.y = y || 0;
        this.x = x || 100;
        this.w = w || 100;
        this.h = h || 100;
    //    this.img = imgBird;
        this.color = color || 'red';
        this.vy = vy || 5;
        this.vx = vx || 1;
        this.draw = function(){
            birdctx.fillRect(this.x,this.y,this.w,this.h);
            birdctx.fillStyle = this.color;
        //    birdctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.x,this.y,this.w,this.h);
        };
        this.moveup = function(){
            this.y +=this.vy;
            this.x +=this.vx;
            birdctx.clearRect(0,0,canvas.width,canvas.height);
            this.draw();
        };
    }
    var bird = new Bird();
    $(document).keydown(function(event){
            switch (event.keyCode){
                case 38:
                    bird.y -= 100;
            }
        }
    )
    var Box = function(x,y,w,h,color){
        this.x = x || 300;
        this.y = y || 0;
        this.w = 100;
        this.h = 100;
        this.visible = true;
        this.color = color || 'blue';
        this.draw = function(){
            boxctx.fillRect(this.x,this.y,this.width,this.height);
            boxctx.fillStyle = this.color;
        };
    }
    var pipe = function(postX,vx,maxNum){
        this.x = postX;
        this.vx = vx;
        var boxList = [];
        var box = new Box(0,0);
        var boxW = box.w;
        var boxH = box.h;
        var boxTmp;
        var maxNum = maxNum || Math.ceil(canvas.height/boxW);
        for(var i=0;i<maxNum;i++){
            boxTmp = new Box(postX,i*boxH);
            boxList.push(boxTmp);
        }
        this.obj = boxList;
        this.boxW = boxW;
        this.draw = function(){
            var box;
            for(var i=0;i<this.obj.length;i++){
                box = this.obj[i];
                box.x = this.x;
                if(box.visible){
                    box.draw();
                }
            }
        };
        this.rand = function(){
            for(var i=0;i<this.obj.length;i++){
                this.obj[i].visible = true;
            }
            var rand = Math.floor(Math.random()*5)+1;
            this.obj[rand].visible = false;
            this.obj[rand+1].visible = false;
        }
        this.move = function(){
            this.x +=this.vx;
            if(this.x<-this.boxW){
                this.x = canvas.width;
                this.rand();
            }
            this.draw();
        }
        return this;
    }

    var pipe1 = new pipe(320,-1,0);
    pipe1 = pipe1.rand();
    function collision(bird,pip1){
        var birdx = bird.x;
        var birdy = bird.y;
        var birdw = bird.w;
        var birdh = bird.h;
        var boxes = pipe1.obj;
        var box1,box2,num;
        for(var i=0;i<boxes.length-1;i++){
            if(!boxes[i].visible){
                box1 = boxes[i];
                box2 = boxes[i+1];
                break;
            }
        }
        var emptyx = box1.x,
            emptyy = box1.y,
            emptyw = box1.w,
            emptyh = box1.h + box1.h;

        var collUp = calculate(birdx, birdy, birdw, birdh, emptyx, 0, emptyw, box1.y);
        var collDown = calculate(birdx, birdy, birdw, birdh, emptyx, box2.y + box2.h, emptyw, canvas.height - box2.y - box2.h);
        if (collUp || collDown) {
            stop();
        }
        if (birdy > canvas.height - birdh) {
            stop();
        }
    }
    function calculate(x1,y1,w1,h1,x2,y2,w2,h2){
        var ax = x1+w1/2,
            ay = y1+h1/2,
            bx = x2+w2/2,
            by = y2+h2/2;
        var collX = false,
            collY = false;
        (Math.abs(bx-ax)<(w1+w2)/2)&&(collX=true);
        (Math.abs(by-ay)<(h1+h2)/2)&&(collY=true);
        return collX && collY;
    }
    var myReq= 0,stopped;
    function render(){
        if(!stopped){
            bird.moveup();
            pipe1.move();
            collision(bird,pipe1);
            myReq = requestAnimationFrame(render);
        }
    }
    function start(){
        myReq = requestAnimationFrame(render);
        stopped = false;
    }
    function stop(){
        if(myReq){
            window.cancelAnimationFrame(myReq);
        }
        stopped = true;
    }
    start();
})