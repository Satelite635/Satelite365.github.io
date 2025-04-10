let dialogs = [
    { text: "Akhirnya...", right: true },
    { text: "Dokutah?", right: true },
    { text: "Hei kau dimana", right: true },
    { text: "Adhuh", left: true },
    { text: "KAU MASIH HIDUP?", right: true },
    { text: "ya.. entahlah kenapa aku tidak bisa menyerangmu", left: true },
    { text: "umm uhh", right: true },
    { text: "*Merasakan sesuatu*.", left: true },
    { text: "AKU MERASAKAN ENERGIKU KEMBALI", left: true },
    { text: "ayo duel lagi!", left: true },
    { text: "Apa?!", right: true },
    { text: "HYAA!!", left: true },
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
        window.location = "./SystemBattle/BattleSystemCh3.1.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}