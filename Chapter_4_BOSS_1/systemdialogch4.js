let dialogs = [
    { text: "YESSS SISTEMNYA KEMBALI", left: true },
    { text: "*DUARRRR*", left: true },
    { text: "AA.. APA ITU!!", right: true },
    { text: "NAGA!!!", right: true },
    { text: "NI.. NI..", left: true },
    { text: "Nihilister!!", left: true },
    { text: "KALIAN BENAR-BENAR MENGGANGUKU", enemy: true },
    { text: "Huh sepertinya lawan mudah...", enemy: true },
    { text: "APA KATAMU?!!", right: true },
    { text: "TUNGGU", left: true },
    { text: "Sebaiknya aku memperbaiki sistemnya..", left: true },
    { text: "*Sistem diperbaiki*", left: true },
    { text: "Aku mengandalkanmu!!", left: true },
];

let index = 0;

function nextDialog() {
    index++;
    if (index >= dialogs.length) {
        showAttackButton(); // Tampilkan tombol menyerang jika dialog habis
        return;
    }

    document.getElementById("dialogText").textContent = dialogs[index].text;

    if (dialogs[index].left) {
        document.getElementById("charLeft").style.opacity = 1;
        document.getElementById("charRight").style.opacity = 0;
    } else {
        document.getElementById("charLeft").style.opacity = 0;
        document.getElementById("charRight").style.opacity = 1;
    }
}

function skipDialog() {
    index = dialogs.length - 1;
    document.getElementById("dialogText").textContent = dialogs[index].text;
    document.getElementById("charLeft").style.opacity = dialogs[index].left ? 1 : 0;
    document.getElementById("charRight").style.opacity = dialogs[index].left ? 0 : 1;
    showAttackButton();
}

function showAttackButton() {
    const controls = document.querySelector(".controls");
    const attackButton = document.createElement("button");
    attackButton.textContent = "Menyerang";
    attackButton.onclick = function () {
        window.location = "./SystemBattle/BattleSystemCh4.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}