let dialogs = [
    { text: "Hmmm kenapa aku tidak bisa memakai item tadi?", right: true },
    { text: ".... uhhh sial bagaimana ini?!", left: true },
    { text: "Hei dokutah apa yg terjadi? dan kemana kau tadi?", right: true },
    { text: "Aku sedang membenarkan sistem item tadi tapi entah kenapa tetap saja error..", left: true },
    { text: "ummm darimana saja kau?", left: true },
    { text: "aku berhadapan dengan piglin..", right: true },
    { text: "btw kenapa aku bisa ke dunia ini?", right: true },
    { text: "entahlah aku tidak tau", left: true },
    { text: "hmm bagaimana kau tidak tau??", right: true },
    { text: "jujur saja aku melihat di sistem tiba-tiba kau ada disini", left: true },
    { text: "aku langsung menjemputmu", left: true },
    { text: "LIAT ITU DIA!! ", enemy: true },
    { text: "Mulai menyerang! ", enemy: true },
    { text: "*dor dor dor* ", enemy: true },
    { text: "Apa ini!", right: true },
    { text: "sial itu musuhku!", left: true },
    { text: "coba melawan dia, aku sudah memperbaiki sistemnya!", left: true },
    { text: "Baiklah!", right: true },
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
        window.location = "./SystemBattle/BattleSystemCh3.2.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}