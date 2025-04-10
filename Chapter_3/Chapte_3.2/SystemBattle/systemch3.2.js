// Game Variables
let playerHp = 100, playerSp = 100, enemyHp = 75;
let isPlayerTurn = true;
let countdownInterval;
let poisonTurns = 0;
let shieldTurns = 0;
let playerUsedDefend = false;

let itemUsed = {
    poison: false,
    shield: false
};

// Initialization
function startDeployAnimation() {
    const playerGif = document.getElementById('playerGif');
    const enemyGif = document.getElementById('enemyGif');

    playerGif.src = 'Nearl.png';
    enemyGif.src = 'Nearl.png';

    setTimeout(() => {
        showMainButtons();
    }, 100);
}

function showMainButtons() {
    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="showDifficultyButtons()">Attack</button>
        <button onclick="ItemCatagory()">Item</button>
        <button onclick="defend()">Defend</button>
        <button onclick="attemptEscape()">Escape</button>
    `;
}

// Player Actions
function showDifficultyButtons() {
    if (!isPlayerTurn) return;

    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="startQuiz('easy', 5, 5)">Easy</button>
        <button onclick="startQuiz('medium', 10, 10)">Medium</button>
        <button onclick="startQuiz('hard', 20, 25)">Hard</button>
    `;
}

function attemptEscape() {
    if (!isPlayerTurn) return;

    let escapeChance = Math.random();
    if (escapeChance <= 0.1) {
        alert('Escape successful!');
        window.location = "../../../Chapter_3/Chapte_3.3/Chapter3.3Dialog.html";
    } else {
        alert('Escape failed! The enemy attacks!');
        isPlayerTurn = false;
        enemyAttack();
    }
}

function defend() {
    if (!isPlayerTurn) return;

    clearInterval(countdownInterval);
    const spRestore = 15;
    playerSp = Math.min(playerSp + spRestore, 150);

    document.getElementById('mathContainer').style.display = 'block';
    document.getElementById('mathContainer').innerHTML = `<p>Anda bertahan! SP +${spRestore}</p>`;

    playerUsedDefend = true;
    updateBars();

    isPlayerTurn = false;
    setTimeout(enemyAttack, 2000);
}

function ItemCatagory() {
    if (!isPlayerTurn) return;

    let itemButtons = '';
    if (!itemUsed.poison) itemButtons += `<button onclick="usePoison()">Gunakan Poison</button>`;
    if (!itemUsed.shield) itemButtons += `<button onclick="useShield()">Gunakan Shield</button>`;
    if (itemButtons === '') itemButtons = `<p>Semua item sudah digunakan!</p>`;

    itemButtons += `<button onclick="showMainButtons()">Kembali</button>`;
    document.getElementById('buttonContainer').innerHTML = itemButtons;
}

function usePoison() {
    poisonTurns = 2;
    itemUsed.poison = true;
    document.getElementById('mathContainer').innerHTML = `<p>Musuh terkena Poison selama 2 giliran!</p>`;
    isPlayerTurn = false;
    setTimeout(enemyAttack, 2000);
}

function useShield() {
    shieldTurns = 2;
    itemUsed.shield = true;
    document.getElementById('mathContainer').innerHTML = `<p>Shield aktif selama 2 giliran!</p>`;
    isPlayerTurn = false;
    setTimeout(enemyAttack, 2000);
}

// Quiz System
function startQuiz(difficulty, damage, cost) {
    if (!isPlayerTurn) return;
    document.getElementById('buttonContainer').innerHTML = '';
    generateMathQuestion(difficulty, damage, cost);
}

function generateMathQuestion(difficulty, damage, cost) {
    const mathContainer = document.getElementById('mathContainer');
    mathContainer.innerHTML = '';
    mathContainer.style.display = 'block';

    let questions = {
        easy: [
            { question: "327 + 589", answer: 916 },
            { question: "874 - 356", answer: 518 }
        ],
        medium: [
            { question: "Hitung volume balok panjang 10 cm, lebar 6 cm, tinggi 4 cm.", answer: 240 },
            { question: "Hitung luas tabung jari-jari 7 cm, tinggi 10 cm.", answer: 745.22 }
        ],
        hard: [
            { question: "30 kain tenun dibuat 12 pekerja dalam 6 hari. Jika 4 pekerja berhenti, berapa kain dalam 9 hari?", answer: 30 },
            { question: "Gedung selesai dalam 60 hari dengan 24 pekerja. Setelah 15 hari, proyek berhenti 5 hari. Berapa pekerja tambahan?", answer: 3 }
        ]
    };

    let selected = questions[difficulty][Math.floor(Math.random() * questions[difficulty].length)];

    mathContainer.innerHTML = `
        <p>${selected.question} = ? (${difficulty.toUpperCase()})</p>
        <input type="number" id="userAnswer" placeholder="Jawaban">
        <button onclick="checkAnswer(${selected.answer}, ${damage}, ${cost})">Submit</button>
        <p id="countdown">Waktu: 10 detik</p>
    `;

    let timeLeft = 10;
    const countdown = document.getElementById('countdown');
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeLeft--;
        countdown.textContent = `Waktu: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            mathContainer.innerHTML = `<p>Waktu habis! Anda -10 HP</p>`;
            playerHp -= 10;
            updateBars();
            setTimeout(() => {
                mathContainer.style.display = 'none';
                isPlayerTurn = false;
                enemyAttack();
            }, 2000);
        }
    }, 1000);
}

function checkAnswer(correctAnswer, damage, cost) {
    if (!isPlayerTurn) return;
    clearInterval(countdownInterval);
    const userAnswer = parseFloat(document.getElementById('userAnswer').value);
    playerSp -= cost;

    if (userAnswer === correctAnswer) {
        enemyHp -= damage;
        document.getElementById('mathContainer').innerHTML = `<p>Benar! Musuh -${damage} HP</p>`;
        if (enemyHp <= 0) {
            enemyHp = 0;
            document.getElementById('mathContainer').innerHTML = `<p>Musuh Kalah! Next Stage!</p>`;
            document.getElementById('buttonContainer').innerHTML = '';
            setTimeout(() => {
                document.getElementById('buttonContainer').innerHTML = `
                    <div class="next-stage-container">
                        <button class="next-stage-button" onclick="nextStage()">Next Stage</button>
                    </div>
                `;
            }, 2000);
            return;
        }
    } else {
        playerHp -= cost;
        document.getElementById('mathContainer').innerHTML = `<p>Salah! Anda -${cost} HP</p>`;
        if (playerHp <= 0) {
            playerHp = 0;
            updateBars();
            document.getElementById('mathContainer').innerHTML = `
                <p>Game Over! Anda kalah!</p>
                <button onclick="goToGameOver()">Coba Lagi</button>
            `;
            document.getElementById('mathContainer').style.display = 'block';
            document.getElementById('buttonContainer').innerHTML = '';
            return;
        }
    }

    updateBars();
    setTimeout(() => {
        document.getElementById('mathContainer').style.display = 'none';
        isPlayerTurn = false;
        enemyAttack();
    }, 2000);
}

// Enemy Turn
function enemyAttack() {
    document.getElementById('buttonContainer').innerHTML = `<p>Musuh sedang menyerang...</p>`;

    setTimeout(() => {
        if (poisonTurns > 0) {
            const poisonDamage = Math.floor(enemyHp * 0.1);
            enemyHp -= poisonDamage;
            poisonTurns--;
            document.getElementById('mathContainer').innerHTML = `<p>Poison effect! Musuh -${poisonDamage} HP</p>`;
        } else {
            document.getElementById('mathContainer').innerHTML = '';
        }

        let enemyDamage = Math.floor(Math.random() * 10) + 5;

        if (shieldTurns > 0) {
            enemyDamage = 0;
            shieldTurns--;
            document.getElementById('mathContainer').innerHTML += `<p>Shield melindungi serangan musuh!</p>`;
        } else {
            if (playerUsedDefend) {
                enemyDamage = Math.floor(enemyDamage * 0.8);
                document.getElementById('mathContainer').innerHTML += `<p>Serangan dikurangi 20% karena bertahan!</p>`;
            }
            playerHp -= enemyDamage;
            document.getElementById('mathContainer').innerHTML += `<p>Musuh menyerang! Anda -${enemyDamage} HP</p>`;
        }

        playerUsedDefend = false;
        updateBars();

        if (playerHp <= 0) {
            playerHp = 0;
            updateBars();
            document.getElementById('mathContainer').innerHTML = `
                <p>Game Over! Anda kalah!</p>
                <button onclick="goToGameOver()">Coba Lagi</button>
            `;
            document.getElementById('mathContainer').style.display = 'block';
            document.getElementById('buttonContainer').innerHTML = '';
            return;
        }

        setTimeout(() => {
            document.getElementById('mathContainer').style.display = 'none';
            isPlayerTurn = true;
            showMainButtons();
        }, 2000);
    }, 2000);
}

// UI Updates
function updateBars() {
    document.getElementById('playerHpBar').style.width = playerHp + '%';
    document.getElementById('playerSpBar').style.width = playerSp + '%';
    document.getElementById('enemyHpBar').style.width = enemyHp + '%';
}

function nextStage() {
    alert('Selamat! Anda masuk ke stage berikutnya!');
    window.location = "../../../Chapter_3/Chapte_3.3/SystemBattle/BattleSystem/Ch3.3.html";
}

function goToGameOver() {
    window.location.href = "../../GameOver/GameOver.html";
}
