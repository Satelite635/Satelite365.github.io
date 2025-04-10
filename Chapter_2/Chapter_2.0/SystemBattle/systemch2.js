let playerHp = 100, playerSp = 100, enemyHp = 50;

function startDeployAnimation() {
    const playerGif = document.getElementById('playerGif');
    playerGif.src = './MC_Sprites/Idle2.png';
    setTimeout(() => {
        playerGif.src = './MC_Sprites/Idle2.png';
        document.getElementById('buttonContainer').innerHTML = '<button onclick="showDifficultyButtons()">Attack</button>';
    }, 100);

    const enemyGif = document.getElementById('enemyGif');
    enemyGif.src = 'idlenghtborne.png';
    setTimeout(() => {
        enemyGif.src = 'idlenghtborne.png';
        document.getElementById('buttonContainer').innerHTML = '<button onclick="showDifficultyButtons()">Attack</button>';
    }, 100);
}

function showDifficultyButtons() {
    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="startQuiz('easy', 5, 5)">Easy</button>
        <button onclick="startQuiz('medium', 100, 10)">Medium</button>
    `;
}

function startQuiz(difficulty, damage, cost) {
    document.getElementById('buttonContainer').innerHTML = '';
    document.getElementById('playerGif').src = './MC_Sprites/Idle3.png';
    setTimeout(() => {
        document.getElementById('playerGif').src = './MC_Sprites/Attack.png';
    }, 2000);
    generateMathQuestion(difficulty, damage, cost);
}

function generateMathQuestion(difficulty, damage, cost) {
    const mathContainer = document.getElementById('mathContainer');
    mathContainer.innerHTML = '';
    mathContainer.style.display = 'block';

    let questions = {
        easy: [
            { question: "327 + 589", answer: 916 },
            { question: "1.245 + 3.768", answer: 5013 },
            { question: "874 - 356", answer: 518 },
            { question: "5.420 - 2.185", answer: 3235 }
        ],
        medium: [
            { question: "Hitung volume balok dengan panjang 10 cm, lebar 6 cm, dan tinggi 4 cm.", answer: 240 },
            { question: "Hitung luas permukaan sebuah tabung dengan jari-jari 7 cm dan tinggi 10 cm.", answer: 745.22 },
            { question: "Hitung volume sebuah limas segitiga dengan alas 20 cm² dan tinggi 12 cm.", answer: 80 },
            { question: "Hitung nilai rata-rata dari data berikut: 65, 70, 75, 80, 85, 90.", answer: 77.5 }
        ],
        hard: [
            { question: "Untuk membuat 30 helai kain tenun diperlukan 12 orang pekerja dalam 6 hari. Jika 4 orang berhenti, berapa kain yang bisa dibuat dalam 9 hari?", answer: 30 },
            { question: "Gedung sekolah direncanakan selesai dalam 60 hari dengan 24 pekerja. Setelah 15 hari, proyek terhenti 5 hari. Berapa pekerja tambahan yang dibutuhkan?", answer: 3 },
            { question: "Sebuah proyek dengan 15 pekerja selesai dalam 40 hari. Jika ditambah 5 pekerja, berapa hari yang dibutuhkan?", answer: 30 }
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
    const userAnswer = parseFloat(document.getElementById('userAnswer').value);
    playerSp -= cost;

    if (userAnswer === correctAnswer) {
        enemyHp -= damage;
        document.getElementById('mathContainer').innerHTML = `<p>Benar! Musuh -${damage} HP</p>`;
        document.getElementById('playerGif').src = './MC_Sprites/Attack.png';
        document.getElementById('enemyGif').src = 'Skeleton.png';

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
        }

    } else {
        playerHp -= cost;
        document.getElementById('mathContainer').innerHTML = `<p>Salah! Anda -${cost} HP</p>`;
        document.getElementById('enemyGif').src = 'hurtnghtborne.png';
        document.getElementById('playerGif').src = './MC_Sprites/Defend.png';

        if (playerHp <= 0) {
            playerHp = 0;
            document.getElementById('mathContainer').innerHTML = `
                <p>Game Over! Anda kalah!</p>
                <button onclick="goToGameOver()">Coba Lagi</button>
            `;
            updateBars();
            return; // Stop further action
        }
    }

    updateBars();

    setTimeout(() => {
        document.getElementById('mathContainer').style.display = 'none';
        document.getElementById('playerGif').src = './MC_Sprites/Idle2.png';
        document.getElementById('enemyGif').src = 'idlenghtborne.png';
        if (enemyHp > 0 && playerHp > 0) {
            document.getElementById('buttonContainer').innerHTML = '<button onclick="showDifficultyButtons()">Attack</button>';
        }
    }, 4000);
}

function updateBars() {
    document.getElementById('playerHpBar').style.width = playerHp + '%';
    document.getElementById('playerSpBar').style.width = playerSp + '%';
    document.getElementById('enemyHpBar').style.width = enemyHp + '%';
}

function showNextStageButton() {
    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="nextStage()">Next Stage</button>
    `;
}

function nextStage() {
    alert('Selamat! Anda masuk ke stage berikutnya!');
    window.location = "../../../Chapter_2.1/SystemBattle/BattleSystemCh2.html";
}

function goToGameOver() {
    window.location.href = "../../GameOver/GameOver.html";
}

// Inisialisasi awal
updateBars();
