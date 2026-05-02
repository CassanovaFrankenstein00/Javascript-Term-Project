function Main() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var gameInterval;
    var timeInterval;
    var seconds = 0;
    var points = 0; // Added points tracker

    var faint = false;
    var win = false;

    // Portal data
    var portal = { x: 900, y: 500, radius: 20 };

    var border = [
        {x:0, y:0, w:5, h:600},
        {x:0, y:0, w:1000, h:5},
        {x:1000, y:0, w:-5, h:600},
        {x:0, y:600, w:1000, h:-5},
    ];

    var innerWalls = [
        {x:100, y:600, w:5, h:-100}, {x:0, y:400, w:300, h:5},
        {x:300, y:400, w:5, h:130}, {x:400, y:600, w:5, h:-400},
        {x:400, y:200, w:-320, h:5}, {x:80, y:200, w:5, h:-130},
        {x:400, y:0, w:5, h:130}, {x:400, y:200, w:300, h:5},
        {x:80, y:150, w:75, h:5}, {x:300, y:200, w:5, h:-100},
        {x:700, y:200, w:-5, h:-100}, {x:700, y:100, w:-200, h:5},
        {x:500, y:100, w:5, h:-50}, {x:800, y:0, w:5, h:205},
        {x:695, y:200, w:5, h:75}, {x:695, y:275, w:225, h:5},
        {x:920, y:280, w:5, h:-225}, {x:1000, y:350, w:-500, h:5},
        {x:500, y:355, w:5, h:-75}, {x:600, y:355, w:5, h:-100},
        {x:750, y:600, w:5, h:-175}, {x:750, y:500, w:-75, h:5},
        {x:675, y:500, w:5, h:50}
    ];

    var jewels = [
        {x: 170, y: 550, w: 8, h: 8}, {x: 50, y: 370, w: 8, h: 8},
        {x: 100, y: 175, w: 8, h: 8}, {x: 650, y:140, w: 8, h: 8},
        {x: 550, y: 325, w: 8, h: 8}, {x: 715, y: 525, w: 8, h: 8}
    ];

    function DoTimer() {
        seconds += 1;
        updateUI();
    }

    function updateUI() {
        var timerDiv = document.getElementById('timer');
        timerDiv.textContent = `${seconds}s | Points: ${points}`;
    }

    // Helper to handle your specific coordinate system (neg widths/heights)
    function isColliding(rect1, rect2) {
        // Normalizing rect2 since some of your w/h values are negative
        let r2x = rect2.w < 0 ? rect2.x + rect2.w : rect2.x;
        let r2y = rect2.h < 0 ? rect2.y + rect2.h : rect2.y;
        let r2w = Math.abs(rect2.w || rect2.width);
        let r2h = Math.abs(rect2.h || rect2.height);

        return (
            rect1.x < r2x + r2w &&
            rect1.x + rect1.width > r2x &&
            rect1.y < r2y + r2h &&
            rect1.y + rect1.height > r2y
        );
    }

    function checkWallCollisions(rect) {
        const allWalls = [...border, ...innerWalls];
        for (let wall of allWalls) {
            if (isColliding(rect, wall)) return true;
        }
        return false;
    }

    function checkJewelCollisions(playerRect) {
        for (let i = jewels.length - 1; i >= 0; i--) {
            if (isColliding(playerRect, jewels[i])) {
                jewels.splice(i, 1); // Remove jewel
                points += 10;
                updateUI();
            }
        }
    }

    function checkPortalCollision(playerRect) {
        // Check if player center is near portal center
        let pCenterX = playerRect.x + playerRect.width / 2;
        let pCenterY = playerRect.y + playerRect.height / 2;
        let dist = Math.sqrt(Math.pow(pCenterX - portal.x, 2) + Math.pow(pCenterY - portal.y, 2));
        if (dist < portal.radius) win = true;
    }

    var player = { x: 20, y: 560, width: 16, height: 24 };

    window.addEventListener("keydown", function(e) {
        e.preventDefault();
        let nextX = player.x;
        let nextY = player.y;
        let speed = 7;

        if (e.keyCode == 39) nextX += speed;
        else if (e.keyCode == 37) nextX -= speed;
        else if (e.keyCode == 38) nextY -= speed;
        else if (e.keyCode == 40) nextY += speed;

        let nextRect = { x: nextX, y: nextY, width: player.width, height: player.height };

        if (!checkWallCollisions(nextRect)) {
            player.x = nextX;
            player.y = nextY;
        }

        // Collect items or hit portal
        checkJewelCollisions(player);
        checkPortalCollision(player);
    });

    function DrawObjects() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 1000, 600);

        ctx.fillStyle = '#06f067';
        border.forEach(i => ctx.fillRect(i.x, i.y, i.w, i.h));

        ctx.fillStyle = '#64f006';
        innerWalls.forEach(i => ctx.fillRect(i.x, i.y, i.w, i.h));

        jewels.forEach(i => {
            ctx.fillStyle = "gold";
            ctx.fillRect(i.x, i.y, i.w, i.h);
        });

        // Portal
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, portal.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.strokeStyle = "purple";
        ctx.stroke();
    }

    function GameLoop() {
        DrawObjects();
        
        // Draw Player
        ctx.fillStyle = "purple";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        if (win) {
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            alert('You won with ' + points + ' points!');
            location.reload();
        }
    }

    gameInterval = setInterval(GameLoop, 16);
    timeInterval = setInterval(DoTimer, 1000);
}

Main();