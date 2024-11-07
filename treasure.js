async function loadGameData() {
    try {
        const response = await fetch("gameData.txt");
        const data = await response.text();
        displayGameData(data);
    } catch (error) {
        console.error("加载游戏数据失败:", error);
    }
}

function displayGameData(data) {
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML += `<div class="message">${data.replace(/\n/g, "<br>")}</div>`;
}

function savePlayerInfo() {
    const playerNickname = document.getElementById("player-nickname").value;
    const playerInfo = {
        id: Date.now(),
        nickname: playerNickname,
        history: [],
    };
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
}

function loadPlayerInfo() {
    const savedInfo = localStorage.getItem("playerInfo");
    if (savedInfo) {
        const playerInfo = JSON.parse(savedInfo);
        document.getElementById("player-nickname").value = playerInfo.nickname;
        playerInfo.history.forEach((message) => addMessage(message));
    }
}

function addMessage(message) {
    const messagesContainer = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);

    const playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
    playerInfo.history.push(message);
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
}

function startBackgroundMusic() {
    const music = document.getElementById("background-music");
    music.play();
}

document.getElementById("start-game").addEventListener("click", () => {
    savePlayerInfo();
    loadGameData();
    startBackgroundMusic();
    findTreasure();
});
