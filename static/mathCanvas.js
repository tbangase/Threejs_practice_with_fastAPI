window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth * 0.9;
    var height = canvas.height = window.innerHeight * 0.9;
    var centerX = width / 2;
    var centerY = height / 2;
    var xRadius = 400;
    var yRadius = 200;
    var xAngle = [];
    var yAngle = [];
    //var xSpeed = .1 / 2;
    //var ySpeed = .131 / 2;
    var xVelocity = [];
    var yVelocity = [];
    var xAccel = [];
    var yAccel = [];
    var restitution = [];
    var numOfObjects = 50;
    var slice = Math.PI * 2 / numOfObjects;
    var x = [], y = [];
    var x_1 = [], y_1 = [];
    var xCalc = [], yCalc = [];

    var minDenominator = 1.0;

    var gravityAmplify = 10;

    var m = 1.0;
    var c = 0.0;
    var dt = 1.0;

    var xMouse = centerX;
    var yMouse = centerY;

    //Create object states
    //Angle
    for (let i = 0; i < numOfObjects; i++) {
        xAngle.push(slice * i);
        yAngle.push(slice * i);

        //加速度設定
        xAccel.push(0.0);
        yAccel.push(0.1);

        //xSpeed.push((Math.random() - 0.5) / 10);
        //ySpeed.push((Math.random() - 0.5) / 10);
        //初速設定
        xVelocity.push(0.0);
        yVelocity.push(0.0);

        //時刻-1時の位置設定
        x_1.push(centerX);
        y_1.push(0.0);

        //初期位置設定
        x.push(centerX);
        y.push(0.0);

        //反発係数の設定
        restitution.push(Math.random()/2);
    }
    

    render();

    function render() {
        //canvas をクリアする
        context.clearRect(0,0,width,height);

        for(var i = 0; i < numOfObjects; i++){
            //Pathのスターと
            context.beginPath();

            //加速度の更新
            var dx = xMouse - x[i];
            var dy = yMouse - y[i];
            /*
            var r = Math.pow(Math.pow(dx, 2.0) + Math.pow(dy, 2.0), 0.5);
            var cos = dx / r;
            var sin = dy / r;
            var ax = cos / r ;
            var ay = sin / r ;
            xAccel[i] = ax > 1.0 ? 1.0 : ax;
            yAccel[i] = ay > 1.0 ? 1.0 : ay;

            //速度の更新（条件付き）
            if (y[i] > height && xVelocity[i] <= 0.0001 && xVelocity[i] >= -0.0001) {
                y[i] = height;
                xVelocity[i] = i%2 == 0 ? -1 * Math.random() : Math.random();
                yVelocity[i] = - yVelocity[i] * restitution[i];
            } else if (y[i] > height) {
                //xVelocity[i] = - xVelocity[i] * 2;
                y[i] = height;
                yVelocity[i] = - yVelocity[i] * restitution[i];
            } else if (y[i] < 0) {
                y[i] = 0.0;
                //xVelocity[i] = 0.0;
                //yVelocity[i] = 0.0;
                yVelocity[i] = - yVelocity[i] * restitution[i];
            } else if (x[i] < 0) {
                x[i] = 0.0;
                xVelocity[i] = - xVelocity[i] * restitution[i];
            } else if (x[i] > width) {
                x[i] = width;
                xVelocity[i] = - xVelocity[i] * restitution[i];
            }

            //位置の更新
            //x[i] = centerX + Math.cos(xAngle[i] + slice * i) * xRadius;
            //y[i] = centerY + Math.sin(yAngle[i] + slice * i) * yRadius;
            xVelocity[i] = xVelocity[i] + xAccel[i];
            x[i] = x[i] + xVelocity[i];
            yVelocity[i] = yVelocity[i] + yAccel[i];
            y[i] = y[i] + yVelocity[i];*/

            xCalc[i] = nextXPosition(x[i], x_1[i], dx, dy, m, c, dt, restitution[i]);
            yCalc[i] = nextYPosition(y[i], y_1[i], dx, dy, m, c, dt, restitution[i]);

            x_1[i] = x[i];
            x[i] = xCalc[i];
            y_1[i] = y[i];
            y[i] = yCalc[i];

            //点の形の設定
            context.arc(x[i],y[i], 10, 0, Math.PI * 2, false);
            context.fill();
        }

        //各変数の更新
        for (let i = 0; i < numOfObjects; i++) {
            xAngle[i] += xVelocity[i];
            yAngle[i] += yVelocity[i];
        }
        requestAnimationFrame(render);
    }

    function nextXPosition(xn, xn_1, dx, dy, m, c, dt, e) {
        var xPosition = 0.0;
        var rPow = Math.pow(dx, 2.0) + Math.pow(dy, 2.0);
        if (rPow < minDenominator) rPow = minDenominator; 
        xPosition = 2 * xn - xn_1 - c / m * (xn - xn_1) * dt + gravityAmplify * (dx / rPow) * Math.pow(dt, 2.0);

        if (xPosition < 0) xPosition = -xPosition * e;
        if (xPosition > width) xPosition = width - (xPosition - width) * e;

        return xPosition;
    }

    function nextYPosition(yn, yn_1, dx, dy, m, c, dt, e) {
        var yPosition = 0.0;
        var rPow = Math.pow(dx, 2.0) + Math.pow(dy, 2.0);
        if (rPow < minDenominator) rPow = minDenominator; 
        yPosition = 2 * yn - yn_1 - c / m * (yn - yn_1) * dt + gravityAmplify * (dy / rPow) * Math.pow(dt, 2.0);

        if (yPosition < 0) yPosition = -yPosition * e;
        if (yPosition > height) yPosition = height - (yPosition - height) * e;

        return yPosition;
    }

    document.body.addEventListener("mousemove", function (event) { 
        xMouse = event.clientX;
        yMouse = event.clientY;
    });
}