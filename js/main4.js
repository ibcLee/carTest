/**
 * Created by fashion1993 on 2015/9/14.
 */
$(document).ready(function(){
    var canvas = document.getElementById('wrap');
    var ctx = canvas.getContext('2d');
    var imgBird = document.getElementById('bird');
    var imgPipe = document.getElementById('pipe');
    var Bird = function (param) {
        this.x = param.x || 0;
        this.y = param.y || 0;
        this.w = param.w;
        this.h = param.h;
        this.yDir = param.yDir || 1;
        this.img = param.img;
    };
    Bird.prototype.draw = function () {
        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.w, this.h);
    };
    Bird.prototype.jump = function () {
        this.y += this.yDir;
        this.draw();
    }
    var Box = function (x, y) {
        this.x = x || boxOption.x;
        this.y = y || boxOption.y;
        this.w = boxOption.w;
        this.h = boxOption.h;
        this.img = boxOption.img;
        this.visible = true;
    };
    Box.prototype.draw = function () {
        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y,
        this.w, this.h);
    };
    var pipe = function (posX, xDir, maxNum) {
        this.x = posX;
        this.xDir = xDir;
        var boxList = [];
        var box = new Box(0, 0);
        var boxW = box.w,
        boxH = box.h;
        var boxTmp;
        var maxNum = maxNum || Math.ceil(canvas.height / boxW);
        for (var i = 0; i < maxNum; i++) {
            boxTmp = new Box(posX, i * boxH);
            boxList.push(boxTmp);
        }
        this.obj = boxList;
        this.boxW = boxW;
    };
    pipe.prototype.draw = function () {
        var box;
        for (var i = 0; i < this.obj.length; i++) {
            box = this.obj[i];
            box.x = this.x;
            if (box.visible) {
                box.draw();
            }
        }
    };
    pipe.prototype.rand = function () {
        for (var i = 0; i < this.obj.length; i++) {
            this.obj[i].visible = true;
        }
        var rand = Math.floor(Math.random() *  5) + 1;
        this.obj[rand].visible = false;
        this.obj[rand + 1].visible = false;
        return this;
    };
    pipe.prototype.move = function () {
        this.x += this.xDir;
        if (this.x < -this.boxW) {
            this.x = canvas.width;
            this.rand();
            $(".grade").text(parseInt($(".grade").text())+1);
        }
        this.draw();
        return this;
    };
    var bird,
        birdConf = {
        x : 50,
        y : 200,
        w : 50,
        h : 50,
        img : imgBird
    };
    var boxOption = {
        xDir : -5,
        x : 300,
        y : 0,
        w : 80,
        h : 80,
        img : imgPipe
    }
    bird = new Bird(birdConf);
    var pipe1 = new pipe(320, -1, 8);
    pipe1 = pipe1.rand();
    function collision (bird, pipe1) {
        var birdx = bird.x,
        birdy = bird.y,
        birdw = bird.w,
        birdh = bird.h;
        var boxes = pipe1.obj;
        var box1, box2;
        for (var i = 0; i < boxes.length - 1; i++) {
            if (!boxes[i].visible) {
            box1 = boxes[i];
            box2 = boxes[i + 1];
            break;
            }
        }
        var emptyx = box1.x;
        var emptyw = box1.w;
        var collUp = calculate(birdx, birdy, birdw, birdh, emptyx, 0, emptyw, box1.y);
        var collDown = calculate(birdx, birdy, birdw, birdh, emptyx, box2.y + box2.h, emptyw, canvas.height - box2.y - box2.h);
        if (collUp || collDown) {
            stop();
        }
        if (birdy > canvas.height - birdh) {
            stop();
        }
    }
    function calculate (x1, y1, w1, h1, x2, y2, w2, h2) {
        var ax = x1 + w1 / 2,
        ay = y1 + h1 / 2,
        bx = x2 + w2 / 2,
        by = y2 + h2 / 2;
        var collX = false,
        collY = false;
        (Math.abs(bx - ax) < (w1 + w2) / 2) && (collX = true);
        (Math.abs(by - ay) < (h1 + h2) / 2) && (collY = true);
        return collX && collY;
    }
    var stopped, requestId = 0;
    function render() {
        if (!stopped) {
            ctx.fillStyle = '#ccc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            bird.jump();
            pipe1.move();
            collision(bird, pipe1);
            requestId = window.requestAnimationFrame(render);
        }
    }
    $(document).keydown(function(event){
            switch (event.keyCode){
                case 38:
                bird.y -= 25;
            }
        }
    )
    function start() {
        requestId = window.requestAnimationFrame(render);
        stopped = false;
    }
    function stop() {
        if (requestId) {
        window.cancelAnimationFrame(requestId);
        }
        stopped = true;
    }
    start();
})