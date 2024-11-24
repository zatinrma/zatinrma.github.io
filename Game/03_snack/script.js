// Set up the game canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the size of the canvas
const scale = 20; // Grid size
const rows = 20; // Number of rows
const columns = 20; // Number of columns
canvas.width = columns * scale;
canvas.height = rows * scale;

// Initialize the snake
let snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
];

// Initial food position
let food = { x: 10, y: 10 };

// Initialize the game direction
let dx = scale;
let dy = 0;

// Initialize the game score
let score = 0;

// Handle keyboard input for direction (optional if you want to keep keyboard controls)
document.addEventListener('keydown', changeDirection);

// Handle on-screen buttons for direction
document.getElementById('upButton').addEventListener('click', () => changeDirection({ key: 'ArrowUp' }));
document.getElementById('downButton').addEventListener('click', () => changeDirection({ key: 'ArrowDown' }));
document.getElementById('leftButton').addEventListener('click', () => changeDirection({ key: 'ArrowLeft' }));
document.getElementById('rightButton').addEventListener('click', () => changeDirection({ key: 'ArrowRight' }));

// Game Over screen elements
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('scoreDisplay');

// Handle restart button click
restartButton.addEventListener('click', restartGame);

// Change direction based on keyboard input or button press
function changeDirection(event) {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -scale;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = scale;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -scale;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = scale;
        dy = 0;
    }
}

// Main game loop
function gameLoop() {
    if (gameOver()) {
        showGameOverScreen();
        return;
    }

    setTimeout(() => {
        clearCanvas();
        moveSnake();
        drawFood();
        drawSnake();
        updateScoreDisplay();
        gameLoop();
    }, 100);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake on the canvas
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

// Move the snake by adding a new head and removing the last segment
function moveSnake() {
    const newHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(newHead);

    // Check if snake eats food
    if (checkFoodCollision(newHead, food)) {
        score += 10; // Increase score by 10 points each time food is eaten
        generateFood(); // Regenerate the food to a new position
    } else {
        snake.pop(); // Remove the last segment of the snake
    }
}

// Check for collision between the snake's head and food (bounding box check)
function checkFoodCollision(snakeHead, food) {
    return (
        snakeHead.x < food.x + scale &&
        snakeHead.x + scale > food.x &&
        snakeHead.y < food.y + scale &&
        snakeHead.y + scale > food.y
    );
}

// Generate a new food position randomly
function generateFood() {
    food.x = Math.floor(Math.random() * columns) * scale;
    food.y = Math.floor(Math.random() * rows) * scale;
}

// Draw the food on the canvas
function drawFood() {
    const foodSize = scale / 1.5; // Food is smaller than the snake
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, foodSize, foodSize); // Food drawn smaller
}

// Update the score display outside the canvas
function updateScoreDisplay() {
    scoreDisplay.textContent = 'Score: ' + score;
}

// Check if the snake collides with the walls or itself
function gameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Show the Game Over screen
function showGameOverScreen() {
    finalScore.textContent = 'Game Over! Your score: ' + score;
    gameOverScreen.classList.remove('hidden');
}

// Restart the game
function restartGame() {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    dx = scale;
    dy = 0;
    score = 0;
    generateFood();
    gameOverScreen.classList.add('hidden');
    gameLoop();
}

// Start the game
generateFood();
gameLoop();
