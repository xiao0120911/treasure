// 模拟宝藏地图API
class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }

    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!");
            }, 1000);
        });
    }
}

// 添加消息到消息容器
function addMessage(message) {
    const messagesContainer = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);

    // 保存游戏历史到 localStorage
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
    playerInfo.history.push(message);
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
}

// 使用fetch API加载gameData.txt数据
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

// 存储玩家信息到localStorage
function savePlayerInfo() {
    const playerNickname = document.getElementById("player-nickname").value;
    const playerInfo = {
        id: Date.now(),
        nickname: playerNickname,
        history: [],
    };
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
}

// 加载玩家信息并显示历史消息
function loadPlayerInfo() {
    const savedInfo = localStorage.getItem("playerInfo");
    if (savedInfo) {
        const playerInfo = JSON.parse(savedInfo);
        document.getElementById("player-nickname").value = playerInfo.nickname;
        playerInfo.history.forEach((message) => addMessage(message));
    }
}

// 启动背景音乐
function startBackgroundMusic() {
    const music = document.getElementById("background-music");
    music.play();
}

// 寻宝过程逻辑
async function findTreasure() {
    try {
        const clue = await TreasureMap.getInitialClue();
        addMessage(clue);

        const decoded = await TreasureMap.decodeAncientScript(clue);
        addMessage(decoded);

        // 显示古庙图片作为背景
        const animationContainer = document.getElementById("animation-container");
        animationContainer.style.backgroundImage = "url('image1.jpeg')";

        // 解码成功后进入神庙
        addMessage("谜题解开，进入神庙！");

        try {
            const box = await TreasureMap.searchTemple(decoded);
            addMessage(box);

            // 找到宝箱时显示宝箱图片
            const treasureBoxImg = document.createElement("img");
            treasureBoxImg.src = "image3.jpg";
            animationContainer.appendChild(treasureBoxImg);

            const treasure = await TreasureMap.openTreasureBox();
            addMessage(treasure);

            // 全屏显示成功图片
            const fullScreenImage = document.getElementById("full-screen-image");
            fullScreenImage.style.backgroundImage = "url('image4.jpg')";
            fullScreenImage.style.display = "block";
        } catch (guardEncounter) {
            // 遇到守卫时显示守卫图片
            const guardImg = document.createElement("img");
            guardImg.src = "image2.jpg";
            animationContainer.appendChild(guardImg);

            addMessage(guardEncounter);

            // 全屏显示失败图片
            const fullScreenImage = document.getElementById("full-screen-image");
            fullScreenImage.style.backgroundImage = "url('image5.jpg')";
            fullScreenImage.style.display = "block";
        }
    } catch (error) {
        addMessage(error.message);
    }
}

// 设置按钮事件
document.getElementById("start-game").addEventListener("click", () => {
    savePlayerInfo();       // 存储玩家信息
    loadGameData();         // 加载游戏数据
    startBackgroundMusic(); // 开始播放背景音乐
    findTreasure();         // 开始游戏
});

// 页面加载时检查并恢复玩家信息
loadPlayerInfo();
