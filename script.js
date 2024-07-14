$(function() {
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");

    // Set canvas size to fit the screen
    function resizeCanvas() {
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;

        // Optionally, keep the canvas square based on the smaller dimension
        var size = Math.min(screenWidth, screenHeight);

        canvas.width = size;
        canvas.height = size;
    }

    // Call resizeCanvas initially and when the window is resized
    

   

    var boardSize = 10;
    var cellSize = canvas.width / boardSize;
    console.log(cellSize)
    
    function drawBoard() {
        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    drawBoard();

    var player = {
        x: 0,
        y: 0,
        radius: 0.25 * cellSize, // Diameter will be 0.5 * cellSize
        color: "blue"
    };

    function drawPlayer() {
        ctx.beginPath();
        ctx.arc(
            player.x * cellSize + cellSize / 2, // Center x within the cell
            player.y * cellSize + cellSize / 2, // Center y within the cell
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

    drawPlayer();

    function movePlayerTo(cellX, cellY) {
        clearPlayer();
        player.x = cellX;
        player.y = cellY;
        drawPlayer();
    }

    // Add drag-and-drop functionality using jQuery
    $("#gameBoard").on("mousedown", function(e) {
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
