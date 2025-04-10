let dialogs = [
    { text: "Bagaimana asik?", left: true },
    { text: "Bagaimana asik?", right: true },
    { text: "Ohh uhh, btw tadi itu sebuah tutorial", left: true },
    { text: "katanya tidak ada", right: true },
    { text: "karena itu adalah kejutan", left: true },
    { text: "......", right: true },
    { text: "Baiklah tanpa basa basi ini adalah tutorial terakhir!.", left: true },
    { text: "Aku akan tambahkan pertanyaan hard, agar damagenya lebih besar ke musuh", left: true },
    { text: "tapi", left: true },
    { text: "jika kau salah menjawab kau akan mendapatkan serangan fatal dari musuh", left: true },
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
        window.location = "./SystemBattle/BattleSystemCh2.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}