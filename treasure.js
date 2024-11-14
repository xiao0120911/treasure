const playerNickname = document.getElementById("player-nickname");
const gameButton = document.getElementById("game-button");
const mainImage = document.getElementById("main-image");
const messageDisplay = document.getElementById("message-display");

let gameState = 0; // 0 = 初始, 1 = 图书馆, 2 = 解码, 3 = 神庙, 4 = 成功, -1 = 失败

function resetGame() {
    gameState = 0;
    mainImage.src = "image2.jpg";
    gameButton.textContent = "开始游戏";
    gameButton.className = "start-button";
    messageDisplay.textContent = "";
}

function updateGameProgress(message, imageSrc, buttonText, buttonClass) {
    messageDisplay.textContent = message;
    mainImage.src = imageSrc;
    gameButton.textContent = buttonText;
    gameButton.className = buttonClass;
}

function displayOverlay(imageSrc) {
    const overlay = document.createElement("div");
    overlay.id = "full-screen-overlay";
    overlay.style.backgroundImage = `url('${imageSrc}')`;
    document.body.appendChild(overlay);
    overlay.style.display = "block";
    setTimeout(() => overlay.remove(), 1500);
}

gameButton.addEventListener("click", async () => {
    if (gameState === 0) { 
        updateGameProgress("在古老的图书馆里找到了第一个线索...", "image3.jpg", "进入图书馆", "decode-button");
        gameState = 1;
    } else if (gameState === 1) { 
        updateGameProgress("解码成功!宝藏在一座古老的神庙中...", "image4.jpg", "进入神庙", "enter-temple-button");
        gameState = 2;
    } else if (gameState === 2) { 
        try {
            const outcome = await searchTemple();
            if (outcome === "守卫") {
                updateGameProgress("糟糕!遇到了神庙守卫!", "image6.jpg", "退出", "start-button");
                gameState = -1;
                setTimeout(() => displayOverlay("image7.jpg"), 1000);
            } else {
                updateGameProgress("找到了一个神秘的箱子...", "image8.jpg", "进入宝藏", "enter-temple-button");
                gameState = 3;
            }
        } catch (e) {
            console.error(e);
        }
    } else if (gameState === 3) {
        updateGameProgress("恭喜!你找到了传说中的宝藏!", "image8.jpg", "退出", "start-button");
        displayOverlay("image9.jpg");
        gameState = 4;
    } else {
        resetGame();
    }
});

// 模拟探测神庙遇到守卫的过程
function searchTemple() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const encounterGuard = Math.random() < 0.5;
            resolve(encounterGuard ? "守卫" : "宝箱");
        }, 1000);
    });
}

resetGame();
