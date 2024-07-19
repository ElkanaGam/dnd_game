window.addEventListener('load', function() {
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");

    var boardSize = 10; // 10x10 grid
    var cellSize;
    var player = {
        x: 0,
        y: 0,
        radius: 0,
        color: "blue"
    };

    function resizeCanvas() {
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;
        var size;

        if (screenWidth > screenHeight) {
            size = screenHeight;
        } else {
            size = screenWidth;
        }

        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        canvas.width = size;
        canvas.height = size;

        cellSize = size / boardSize;
        player.radius = 0.25 * cellSize;

        drawBoard();
        drawPlayer();
    }

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    function drawPlayer() {
        ctx.beginPath();
        ctx.arc(
            player.x * cellSize + cellSize / 2,
            player.y * cellSize + cellSize / 2,
            player.radius,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.closePath();
    }

    function clearPlayer() {
        ctx.clearRect(
            player.x * cellSize, 
            player.y * cellSize, 
            cellSize, 
            cellSize
        );
        ctx.strokeRect(player.x*cellSize, player.y*cellSize, cellSize, cellSize);
    }

    function movePlayerTo(cellX, cellY) {
        clearPlayer();
        player.x = cellX;
        player.y = cellY;
        drawPlayer();
    }

    // Initial resize and drawing
    resizeCanvas();

    // Resize the canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);

    // Add drag-and-drop functionality
    $("#gameBoard").on("mousedown", function(e) {
        console.log("dragg")
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cellX = Math.floor(x / cellSize);
        var cellY = Math.floor(y / cellSize);

        if (cellX === player.x && cellY === player.y) {
            $(document).on("mousemove", function(e) {
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var cellX = Math.floor(x / cellSize);
                var cellY = Math.floor(y / cellSize);
                movePlayerTo(cellX, cellY);
            });

            $(document).on("mouseup", function() {
                $(document).off("mousemove");
            });
        }
    });
});
