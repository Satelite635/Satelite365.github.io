let playerHp = 100, playerSp = 100, enemyHp = 75;
let isPlayerTurn = true;

function startDeployAnimation() {
    const playerGif = document.getElementById('playerGif');
    const enemyGif = document.getElementById('enemyGif');

    playerGif.src = 'Nearl.png';
    enemyGif.src = 'PiglinPNG.png';

    setTimeout(() => {
        document.getElementById('buttonContainer').innerHTML = `
            <button onclick="showDifficultyButtons()">Attack</button>
            <button onclick="ItemCatagory()">Item</button>
            <button onclick="attemptEscape()">Escape</button>
        `;
    }, 100);
}

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
        window.location = "../../../Chapter_3/Chapte_3.2/Chapter3.2Dialog.html";
    } else {
        alert('Escape failed! The enemy attacks!');
        isPlayerTurn = false;
        enemyAttack();
    }
}

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

    let selectedQuestion = questions[difficulty][Math.floor(Math.random() * questions[difficulty].length)];

    mathContainer.innerHTML = `
        <p>${selectedQuestion.question} = ? (${difficulty.toUpperCase()})</p>
        <input type="number" id="userAnswer" placeholder="Jawaban">
        <button onclick="checkAnswer(${selectedQuestion.answer}, ${damage}, ${cost})">Submit</button>
    `;
}

function checkAnswer(correctAnswer, damage, cost) {
    if (!isPlayerTurn) return;

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
        if (playerHp <= 0) {
            playerHp = 0;
            updateBars();
            document.getElementById('mathContainer').innerHTML = `
                <p>Game Over! Anda kalah!</p>
                <button onclick="goToGameOver()">Coba Lagi</button>
            `;
            return;
        } else {
            document.getElementById('mathContainer').innerHTML = `<p>Salah! Anda -${cost} HP</p>`;
        }
    }

    updateBars();

    setTimeout(() => {
        document.getElementById('mathContainer').style.display = 'none';
        isPlayerTurn = false;
        enemyAttack();
    }, 2000);
}

function enemyAttack() {
    document.getElementById('buttonContainer').innerHTML = `<p>Musuh sedang menyerang...</p>`;

    setTimeout(() => {
        let enemyDamage = Math.floor(Math.random() * 10) + 5;
        playerHp -= enemyDamage;

        if (playerHp <= 0) {
            playerHp = 0;
            updateBars();
            document.getElementById('mathContainer').innerHTML = `
                <p>Musuh menyerang! Anda -${enemyDamage} HP</p>
                <p>Game Over! Anda kalah!</p>
                <button onclick="goToGameOver()">Coba Lagi</button>
            `;
            return;
        }

        document.getElementById('mathContainer').innerHTML = `<p>Musuh menyerang! Anda -${enemyDamage} HP</p>`;
        updateBars();

        setTimeout(() => {
            document.getElementById('mathContainer').style.display = 'none';
            isPlayerTurn = true;
            document.getElementById('buttonContainer').innerHTML = `
                <button onclick="showDifficultyButtons()">Attack</button>
                <button onclick="attemptEscape()">Escape</button>
            `;
        }, 2000);
    }, 2000);
}

function updateBars() {
    document.getElementById('playerHpBar').style.width = playerHp + '%';
    document.getElementById('playerSpBar').style.width = playerSp + '%';
    document.getElementById('enemyHpBar').style.width = enemyHp + '%';
}

function nextStage() {
    alert('Selamat! Anda masuk ke stage berikutnya!');
    window.location = "../../../Chapter_3/Chapte_3.2/SystemBattle/BattleSystemCh3.2.html";
}

function goToGameOver() {
    window.location.href = '../../../Game_Over/GameOver.html'; // Ganti dengan URL halaman game over-mu
}
