let dialogs = [
    { text: "uhhh aku sudah mengalahkan beberapa", right: true },
    { text: "*SLASHH*   ", left: true },
    { text: "Apa?!!", right: true },
    { text: "darimana kau datang... uhh lupakan aku bisa mengatasinya..", right: true },
    { text: "kau tau lebih baik kau biarkan aku istirahat sebelum-", right: true },
    { text: "RRRRAGHHHHHHHHH", left: true },
    { text: "Uhhh...", right: true },
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
        window.location = "./SystemBattle/BattleSystemCh3.4.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}