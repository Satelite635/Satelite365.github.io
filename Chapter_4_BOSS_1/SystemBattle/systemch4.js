let playerHp = 200, playerSp = 150, enemyHp = 300;
let isPlayerTurn = true;
let countdownInterval;
let poisonTurns = 0;
let shieldTurns = 0;
let invisibilityTurns = 0;
let isStunned = false;
let enemyStunned = false;
let defendCount = 0;
let initialTimer;

let itemUsed = {
    poison: false,
    shield: false,
    stun: false,
    invisibility: false
};

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
    if (isStunned) {
        document.getElementById('buttonContainer').innerHTML = `<p>Player terkena stun! Tidak bisa menyerang!</p>`;
        isStunned = false;

        setTimeout(() => {
            enemyAttack(true);
        }, 2000);
        return;
    }

    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="clearInitialTimer(); showDifficultyButtons()">Attack</button>
        <button onclick="clearInitialTimer(); ItemCatagory()">Item</button>
        <button onclick="clearInitialTimer(); defend()">Defend</button>
        <button onclick="clearInitialTimer(); attemptEscape()">Escape</button>
    `;

    initialTimer = setTimeout(() => {
        isPlayerTurn = false;
        enemyAttack();
    }, 30000);
}

function clearInitialTimer() {
    clearTimeout(initialTimer);
}

function defend() {
    if (!isPlayerTurn) return;
    clearInitialTimer();

    defendCount++;
    const spRestore = 20;
    playerSp = Math.min(playerSp + spRestore, 150);

    document.getElementById('mathContainer').innerHTML = `<p>Anda bertahan dan memulihkan ${spRestore} SP!</p>`;
    updateBars();

    isPlayerTurn = false;
    setTimeout(() => {
        enemyAttack();
    }, 2000);
}

function showDifficultyButtons() {
    if (!isPlayerTurn) return;
    clearInitialTimer();

    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="startQuiz('easy', 5, 5)">Easy</button>
        <button onclick="startQuiz('medium', 10, 10)">Medium</button>
        <button onclick="startQuiz('hard', 20, 200)">Hard</button>
    `;
}

function attemptEscape() {
    if (!isPlayerTurn) return;
    clearInitialTimer();

    let escapeChance = Math.random();
    if (escapeChance <= 0.1) {
        alert('Escape successful!');
        window.location.href = 'https://example.com';
    } else {
        alert('Escape failed! The enemy attacks!');
        isPlayerTurn = false;
        enemyAttack();
    }
}

function ItemCatagory() {
    if (!isPlayerTurn) return;
    clearInitialTimer();

    let itemButtons = '';
    if (!itemUsed.poison) {
        itemButtons += `<button onclick="usePoison()">Gunakan Poison</button>`;
    }
    if (!itemUsed.shield) {
        itemButtons += `<button onclick="useShield()">Gunakan Shield</button>`;
    }
    if (!itemUsed.stun) {
        itemButtons += `<button onclick="useStun()">Gunakan Stun</button>`;
    }
    if (!itemUsed.invisibility) {
        itemButtons += `<button onclick="useInvisibility()">Gunakan Invisibility</button>`;
    }

    if (itemButtons === '') {
        itemButtons = `<p>Semua item sudah digunakan!</p>`;
    }

    itemButtons += `<button onclick="showMainButtons()">Kembali</button>`;
    document.getElementById('buttonContainer').innerHTML = itemButtons;
}

function useStun() {
    const cost = 10;
    if (playerSp < cost) {
        alert("SP tidak mencukupi untuk menggunakan Stun!");
        return;
    }
    playerSp -= cost;
    updateBars();

    enemyStunned = true;
    itemUsed.stun = true;
    document.getElementById('mathContainer').innerHTML = `<p>Musuh terkena stun dan tidak bisa menyerang 1 giliran!</p>`;
    setTimeout(() => {
        isPlayerTurn = true;
        showMainButtons();
    }, 2000);
}

function usePoison() {
    const cost = 5;
    if (playerSp < cost) {
        alert("SP tidak mencukupi untuk menggunakan Poison!");
        return;
    }
    playerSp -= cost;
    updateBars();

    poisonTurns = 2;
    itemUsed.poison = true;
    document.getElementById('mathContainer').innerHTML = `<p>Musuh terkena Poison selama 2 giliran!</p>`;
    isPlayerTurn = false;
    setTimeout(enemyAttack, 2000);
}

function useShield() {
    const cost = 7;
    if (playerSp < cost) {
        alert("SP tidak mencukupi untuk menggunakan Shield!");
        return;
    }
    playerSp -= cost;
    updateBars();

    shieldTurns = 2;
    itemUsed.shield = true;
    document.getElementById('mathContainer').innerHTML = `<p>Shield aktif selama 2 giliran!</p>`;
    isPlayerTurn = false;
    setTimeout(enemyAttack, 2000);
}

function useInvisibility() {
    const cost = 25;
    if (playerSp < cost) {
        alert("SP tidak mencukupi untuk menggunakan Invisibility!");
        return;
    }
    playerSp -= cost;
    updateBars();

    invisibilityTurns = 2;
    itemUsed.invisibility = true;
    document.getElementById('mathContainer').innerHTML = `<p>Invisibility aktif selama 2 giliran! Anda tidak akan terkena damage!</p>`;
    setTimeout(() => {
        isPlayerTurn = true;
        showMainButtons();
    }, 2000);
}

function startQuiz(difficulty, damage, cost) {
    if (!isPlayerTurn) return;
    clearInitialTimer();

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

    let selectedQuestion = questions[difficulty][Math.floor(Math.random() * questions[difficulty].length)];

    let timeLeft = 10;
    if (enemyHp > 200 && enemyHp <= 300) timeLeft = 25;
    else if (enemyHp > 100 && enemyHp <= 200) timeLeft = 15;
    else if (enemyHp > 50 && enemyHp <= 100) timeLeft = 10;
    else if (enemyHp >= 0 && enemyHp <= 50) timeLeft = 7;

    mathContainer.innerHTML = `
        <p>${selectedQuestion.question} = ? (${difficulty.toUpperCase()})</p>
        <input type="number" id="userAnswer" placeholder="Jawaban">
        <button onclick="checkAnswer(${selectedQuestion.answer}, ${damage}, ${cost})">Submit</button>
        <p id="countdown">Waktu: ${timeLeft} detik</p>
    `;

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

            if (playerHp <= 0) {
                gameOver();
                return;
            }

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
            gameOver();
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

function enemyAttack(doubleAttack = false) {
    if (enemyStunned) {
        document.getElementById('mathContainer').innerHTML = `<p>Musuh terkena stun dan tidak bisa menyerang!</p>`;
        enemyStunned = false;
        setTimeout(() => {
            document.getElementById('mathContainer').style.display = 'none';
            isPlayerTurn = true;
            showMainButtons();
        }, 2000);
        return;
    }

    document.getElementById('buttonContainer').innerHTML = `<p>Musuh sedang menyerang...</p>`;

    setTimeout(() => {
        if (poisonTurns > 0) {
            const poisonDamage = Math.floor(enemyHp * 0.1);
            enemyHp -= poisonDamage;
            poisonTurns--;
            document.getElementById('mathContainer').innerHTML = `<p>Poison effect! Musuh -${poisonDamage} HP</p>`;
        }

        function doAttack() {
            let enemyDamage = Math.floor(Math.random() * 10) + 5;

            if (invisibilityTurns > 0) {
                enemyDamage = 0;
                invisibilityTurns--;
                document.getElementById('mathContainer').innerHTML += `<p>Invisibility melindungi Anda dari serangan!</p>`;
            } else if (shieldTurns > 0) {
                enemyDamage = 0;
                shieldTurns--;
                document.getElementById('mathContainer').innerHTML += `<p>Shield melindungi serangan musuh!</p>`;
            } else {
                if (defendCount >= 5) {
                    enemyDamage += 50;
                    defendCount = 0;
                }
                playerHp -= enemyDamage;
                document.getElementById('mathContainer').innerHTML += `<p>Musuh menyerang! Anda -${enemyDamage} HP</p>`;
            }

            updateBars();

            if (playerHp <= 0) {
                gameOver();
                return;
            }
        }

        doAttack();

        if (doubleAttack) {
            setTimeout(() => {
                doAttack();

                if (playerHp <= 0) {
                    gameOver();
                    return;
                }

                setTimeout(() => {
                    document.getElementById('mathContainer').style.display = 'none';
                    isPlayerTurn = true;
                    showMainButtons();
                }, 2000);
            }, 2000);
        } else {
            setTimeout(() => {
                document.getElementById('mathContainer').style.display = 'none';
                isPlayerTurn = true;
                showMainButtons();
            }, 2000);
        }
    }, 2000);
}

function updateBars() {
    document.getElementById('playerHpBar').style.width = playerHp + '%';
    document.getElementById('playerSpBar').style.width = playerSp + '%';
    document.getElementById('enemyHpBar').style.width = enemyHp + '%';
}

function nextStage() {
    alert('Selamat! Anda masuk ke stage berikutnya!');
    window.location = "../../D_Bersambung/End/end.html";
}

function gameOver() {
    alert('Game Over! Anda kalah!');
    window.location = '../../D_Bersambung/End/end.html';
}