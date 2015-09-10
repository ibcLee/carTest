/**
 * Created by fashion1993 on 2015/9/8.
 */
$(document).ready(function(){
    var carLeft = false;           //控制左
    var carRight = false;          //控制右
    var comeTime = 0;
    var moveWid = $("#line1").width();   //每次移动距离
    var minLeft = moveWid/2 - 25;   //移动范围  距离左边界最小距离
    var maxLeft = moveWid*2 + minLeft;    //距离左边界最大距离
    var myReq;                            //开始动画
    var gameover = true;                  //判断动画结束
    var frame = 1000/60;                  //每一帧的时间
    var leftArr = [1/2,3/2,5/2];          //控制敌机出现位置
    var flyArr = [];                      //存放敌机对象
    var carX = 3*moveWid/2-25;            //飞机初始x坐标
    var _height = $(window).height();
    var _width = $(window).width();
    var carY = _height-50;                 //飞机初始y坐标
    var canvas=$("#game").get(0);          //飞机所在画布
    $(canvas).attr("height",_height);
    $(canvas).attr("width",_width)
    var canvas1=$("#game1").get(0);         //敌机所在画布
    $(canvas1).attr("height",_height);
    $(canvas1).attr("width",_width)
    var car=canvas.getContext("2d");
    var flyCar = canvas1.getContext("2d");
    car.fillStyle='red';                  //绘制飞机
    car.fillRect(carX,carY,50,50);

//定义一个飞机
    function Car(x,y){
        this.x = x;
        this.y = y;
        this.moveLeft = function(){
            carLeft=true;
            car.clearRect(carX,carY,60,50);
            carX -=moveWid;
            if(carX>0){
                car.fillRect(carX,carY,50,50);
            }else{
                car.fillRect(minLeft,carY,50,50);
            }
        };
        this.moveRight = function(){
            carRight=true;
            car.clearRect(carX,carY,60,50);
            carX +=moveWid;
            if(carX<maxLeft){
                car.fillRect(carX,carY,50,50);
            }else{
                car.fillRect(maxLeft,carY,50,50);
            }
        }
    }
//绘制飞机
    function drawCar(mycar){
        car.beginPath();
        car.fillRect(mycar.x,mycar.y,50,50);
        car.fillStyle='red';
    }
    var mycar = new Car(carX,carY);
    drawCar(mycar);
//控制飞机移动
    $(document).keydown(function(event){
        switch(event.keyCode){
            case 37:
                mycar.moveLeft();
                break;
            case 39:
                mycar.moveRight();
                break;
        }
        return false;
    })
//定义一个敌机对象
    function Flycar(x, y){
        this.x = x;
        this.y = y;
        this.moveDown = function(){
            this.y += 10;
        };
    }
//绘制敌机
    function drawflycar(flycar){
            flyCar.beginPath();
            flyCar.fillRect(flycar.x, flycar.y, 50,50);
            flyCar.fillStyle='blue';;
    }

//清除画布
    function clearCanvas(){
        flyCar.clearRect(0, 0, _width, _height);
    }
//设置动画开始时间
    var  index;
    var creatCar1 = function(){
        var current = new Date().getTime();
        clearCanvas();
        if(current-comeTime>30*frame){
            var n = Math.floor(Math.random()*leftArr.length+1)-1;
            var flyX= leftArr[n]*moveWid-25;
            var flyY = 0;
            var flycar = new Flycar(flyX,flyY);
            flyArr.push(flycar);
            comeTime = current;
        }
        for(index in flyArr){
            drawflycar(flyArr[index]);
            if(flyArr[index].y+40>=carY && flyArr[index].y<_height){
                if(flyArr[index].x == carX){
                    clearCanvas();
                    car.fillStyle='black';
                    car.fillRect(carX,carY,50,50);
                    $(".score").text("Game Over!");
                    gameover = false;
                }else if(flyArr[index].y+40>=_height && flyArr[index].y<_height-30){
                    $(".score").text(parseInt($(".score").text())+1);
                }
            }
            flyArr[index].moveDown();
        }
        if(gameover){
            myReq = requestAnimationFrame(creatCar1);
        }
    }
    myReq = requestAnimationFrame(creatCar1);
})