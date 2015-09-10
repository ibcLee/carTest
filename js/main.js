/**
 * Created by fashion1993 on 2015/9/6.
 */
$(document).ready(function(){
    var carLeft = false;           //控制左
    var carRight = false;          //控制右
    var moveWid = $("#line1").width();   //每次移动距离
    var carWid = $("#car").width();      //飞机宽度
    var minLeft = moveWid/2 - carWid/2;   //移动范围  距离左边界最小距离
    var maxLeft = moveWid*2 + minLeft;    //距离左边界最大距离
    var myReq;                            //开始动画
    var gameover = true;                  //判断动画结束
    var frame = 1000/60;                  //每一帧的时间
//定义初始位置
    $("#car").css({left:moveWid + moveWid/2 - carWid/2});
//判断移动位置
    function changeLine(){
        if(carLeft &&  $("#car").offset().left>minLeft){
            $("#car").css({left: $("#car").offset().left-moveWid});
        }else if(carRight && $("#car").offset().left<maxLeft){
            $("#car").css({left: $("#car").offset().left+moveWid});
        }
    };

//按下时移动
    $(document).keydown(function(event){
        switch(event.keyCode){
            case 37:
                carLeft=true;
                changeLine();
                break;
            case 39:
                carRight=true;
                changeLine();
                break;
        }
        return false;
    })
//抬起时清除
    $(document).keyup(function(event){
        switch (event.keyCode){
            case 37:
                carLeft=false;
                break;
            case 39:
                carRight = false;
                break;
        }
    })
//生成敌机
    var leftArr = [1/2,3/2,5/2];
    var comeTime = 0;
    var downTime = 0;
    function buildCar(){
        var flyCar = $('<div class="flyCar"></div>');
        flyCar.appendTo($("#wrap"));
        var flyWid = $(".flyCar").width();
        var n = Math.floor(Math.random()*leftArr.length+1)-1;
        var flyLeft= leftArr[n]*moveWid-flyWid/2;
        flyCar.css({left: flyLeft, top: -22});
    };
    //var creatCar = setInterval( buildCar(),,creatCarTime);
//敌机降落
    function carLandfall(){
        var flyCarFlow = $("#wrap").find(".flyCar");
        for(var i=0;i<flyCarFlow.length;i++){
            var nowFly = $(flyCarFlow[i]);
            var currentTop = nowFly.offset().top;
            var currentLeft = nowFly.offset().left;
            currentTop += 10;
            nowFly.css({top:currentTop});
            if(currentTop + 100 >= $(document).height()){
                nowFly.remove();
                $(".score").text(parseInt($(".score").text())+1);
            }else if(currentTop + 100 >= $("#car").offset().top && currentLeft ==$("#car").offset().left){
                flyCarFlow.remove();
                $(".score").text("Game Over!");
                gameover =false;
                //    clearInterval(creatCar);
            }

        }
    }
    //   setInterval(carLandfall,landSpeed);
    //var creatCar=setInterval(function(){
    //    var current = new Date().getTime();
    //    if( current- comeTime > 60*frame){
    //        buildCar();
    //        comeTime = current;
    //    }
    //    if(current-downTime> 2*frame){
    //        carLandfall();
    //        downTime = current;
    //    }
    //},frame)
    //========requestAnimationFrame===========
    var creatCar1 = function(){
        var current = new Date().getTime();
        if( current- comeTime > 60*frame){
            buildCar();
            comeTime = current;
        }
        if(current-downTime> 2*frame){
            carLandfall();
            downTime = current;
        }
        if(gameover){
            myReq = requestAnimationFrame(creatCar1);
        }
    }
    myReq = requestAnimationFrame(creatCar1);         //开始动画
})
