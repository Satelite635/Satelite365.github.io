let dialogs = [
    { text: "*Kita berlari menjauh dari mereka*", left: true },
    { text: "Uhhh..", right: true },
    { text: "Aduh sistemnya rusak", left: true },
    { text: "Aku tidak bisa kembali ke markas", left: true },
    { text: "Markas...", right: true },
    { text: "Btw aku ingin bertanya...", right: true },
    { text: "Kenapa saat aku menyerang harus mengejarkan soal matematika??", right: true },
    { text: "karena musuh tidak suka matematika", left: true },
    { text: "Kau serius..", right: true },
    { text: "Ya...", left: true },
    { text: "Karena itu aku membuat sistem perlawanan dengan soal matematika", left: true },
    { text: "jujur saja aku tidak suka matematika", right: true },
    { text: "Yg benar saja..", left: true },
    { text: "Oh ya sebelumnya kenapa banyak sekali tentara yg berjaga?", right: true },
    { text: "uhh bagaimana ya..", left: true },
    { text: "mereka tidak suka anak muda..", left: true },
    { text: "Aku jadi keingat seseorang", right: true },
    { text: "*DUARR*", right: true },
    { text: "Apa itu????", right: true },
    { text: "AKu tak tau", left: true },
    { text: "GEMPA!!", left: true },
    { text: "Tanah mulai bergeser, kita terpisah...", left: true },
    { text: "ITU MEREKA!!", enemy: true },
    { text: "uhh tolong lawan mereka aku akan coba menambahkan sistem healing..", left: true },
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
        window.location = "./SystemBattle/BattleSystemCh3.3.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}