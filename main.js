var canvasWidth = 360;
var canvasHeight = 690;
var blockSize = 30;
var boardWidth = canvasWidth / blockSize; //ボードの横幅
var boardHeight = canvasHeight / blockSize; //ボードの縦幅
//ブロックの色を指定
var tetrominoColors = [
    "#00008b", "#4682b4", "#4169e1", "#191970", "#1e90ff", "#6495ed", "#00dfff", "#87cefa", "#afeeee", "#00ced1", "#20b2aa", "#b0e4de", "#87ceeb", "#5f9ea0", "#00ffff", "#0000ff"
];
//ブロックの形を指定
var tetrominoShapes = [
    [[1], [1], [1], [1]],
    [[1, 1], [1, 1]],
    [[1, 1, 1], [0, 1, 0], [0, 0, 0]],
    [[1, 1, 1], [1, 0, 0], [0, 0, 0]],
    [[1, 1, 1], [0, 0, 1], [0, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [0, 1, 0], [1, 1, 0]],
    [[1, 1], [0, 1]],
    [[1, 1, 1], [1, 0, 0], [1, 1, 1]],
    [[1]],
    [[1], [1]],
    [[1], [1], [1]] //３マス
];
var canvas;
var ctx;
var board;
var currentTetromino;
var currentColor;
var currentRow;
var currentCol;
var score;
var gameOver;
var blockFallInterval = 400; // ブロックが自動で落ちる間隔 (ミリ秒)
function initializeCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    if (!ctx) {
        alert("キャンバスがサポートされていません。");
        throw new Error("Canvas not supported");
    }
    // ボードを画面の中央に配置
    canvas.style.margin = "auto";
    canvas.style.display = "block";
}
// ゲームの初期化
function initializeGame() {
    board = Array.from({ length: boardHeight }, function () { return Array(boardWidth).fill(0); });
    generateRandomTetromino();
    score = 0;
    gameOver = false;
}
// テトロミノの形状をランダムに選択
function getRandomTetromino() {
    var randomIndex = Math.floor(Math.random() * tetrominoShapes.length);
    return tetrominoShapes[randomIndex];
}
// テトロミノの色をランダムに選択
function getRandomColor() {
    var randomIndex = Math.floor(Math.random() * tetrominoColors.length);
    return tetrominoColors[randomIndex];
}
// 新しいテトロミノを生成
function generateRandomTetromino() {
    currentTetromino = getRandomTetromino();
    currentColor = getRandomColor();
    currentRow = 0;
    currentCol = Math.floor((boardWidth - currentTetromino[0].length) / 2);
    if (currentTetromino.some(function (row, r) {
        return row.some(function (cell, c) {
            return cell && (board[r + currentRow] && board[r + currentRow][c + currentCol]) !== 0;
        });
    })) {
        gameOver = true;
        showGameOver();
    }
}
// ゲームボードの描画
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ボードの外側の枠を描画
    ctx.strokeStyle = "#000";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    for (var row = 0; row < boardHeight; row++) {
        for (var col = 0; col < boardWidth; col++) {
            var cell = board[row][col];
            if (cell > 0) {
                var x = col * blockSize;
                var y = row * blockSize;
                drawBlock(x, y, tetrominoColors[cell - 1]);
            }
        }
    }
}
// ブロックを描画
function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(x, y, blockSize, blockSize);
}
// テトロミノを描画
function drawTetromino() {
    for (var row = 0; row < currentTetromino.length; row++) {
        for (var col = 0; col < currentTetromino[row].length; col++) {
            if (currentTetromino[row][col]) {
                var x = (currentCol + col) * blockSize;
                var y = (currentRow + row) * blockSize;
                drawBlock(x, y, currentColor);
            }
        }
    }
}
// ゲームのループ
var lastTime = 0;
function gameLoop(currentTime) {
    if (gameOver) {
        return;
    }
    // 経過時間を計算
    var deltaTime = currentTime - lastTime;
    // 一定の時間が経過したらブロックを自動で落とす
    if (deltaTime >= blockFallInterval) {
        dropTetromino(); // ブロックを自動で落とす
        lastTime = currentTime;
    }
    // ゲームの更新処理をここに追加
    // ゲームボードの描画
    drawBoard();
    // テトロミノの描画
    drawTetromino();
    // スコアの表示
    drawScore();
    // ゲームオーバー条件のチェック
    checkGameOver();
    // ゲームループを再帰呼び出し
    requestAnimationFrame(gameLoop);
}
// ゲームを開始
initializeCanvas();
initializeGame();
gameLoop(0); // ゲームループの初回呼び出し
