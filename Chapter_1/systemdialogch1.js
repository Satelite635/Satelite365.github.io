let dialogs = [
    { text: "Uhhh aku dimana?.", left: true },
    { text: "Hujan mengguyur deras saat seorang raja berdiri di depan gerbang kastil yang menjulang di kegelapan. Petir menyambar, memperlihatkan menara-menara tinggi yang menusuk langit. Di dalamnya, putrinya terperangkap. Ia menggenggam pedangnya erat, lalu melangkah masuk saat gerbang terbuka dengan sendirinya", left: true },
    { text: "Uhh sebenarnya masih banyak yang ingin ku bicaran tetapi aku sangat malas", left: true },
    { text: " TUNGGU AKU DIMANA DAN KAMU SIAPA?", right: true },
    { text: " Ohh aku lupa mempernalkan diri aku Dokutah, dan singkat saja kamu mati..", left: true },
    { text: " APA?!!", right: true },
    { text: "RAAAHHHH!", enemy: true },
    { text: " APA ITU?!!", right: true },
    { text: " Bertanya nanti, sekarang lawan dia! kau kan kesatria sebelumnya! *mulai mendorong*", left: true },
    { text: " TUNGGU DULU!!", right: true },
    { text: " Mulai menyerang?", left: true }
];

let index = 0;

function nextDialog() {
    index++;
    if (index >= dialogs.length) {
        showAttackButton();
        return;
    }

    const dialog = dialogs[index];
    document.getElementById("dialogText").textContent = dialog.text;

    // Reset semua karakter ke tidak terlihat
    document.getElementById("charLeft").style.opacity = 0;
    document.getElementById("charRight").style.opacity = 0;
    document.getElementById("charEnemy").style.opacity = 0;

    // Tampilkan karakter sesuai properti
    if (dialog.left) document.getElementById("charLeft").style.opacity = 1;
    if (dialog.right) document.getElementById("charRight").style.opacity = 1;
    if (dialog.enemy) document.getElementById("charEnemy").style.opacity = 1;
}


function skipDialog() {
    index = dialogs.length - 1;
    const dialog = dialogs[index];

    document.getElementById("dialogText").textContent = dialog.text;

    // Reset semua karakter
    document.getElementById("charLeft").style.opacity = 0;
    document.getElementById("charRight").style.opacity = 0;
    document.getElementById("charEnemy").style.opacity = 0;

    // Tampilkan karakter yang relevan
    if (dialog.left) document.getElementById("charLeft").style.opacity = 1;
    if (dialog.right) document.getElementById("charRight").style.opacity = 1;
    if (dialog.enemy) document.getElementById("charEnemy").style.opacity = 1;

    showAttackButton();
}



function showAttackButton() {
    const controls = document.querySelector(".controls");
    const attackButton = document.createElement("button");
    attackButton.textContent = "Menyerang";
    attackButton.onclick = function () {
        window.location = "./SystemBattle/BattleSystemCh1.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}