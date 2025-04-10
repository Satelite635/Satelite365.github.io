let dialogs = [
    { text: "APA ITU TUNGGU KENAPA KAU MENYURUHKU UNTUK MELAWAN", right: true },
    { text: "Hehe", left: true },
    { text: "Sebelumnya aku salah tadi aku cuma mau menakutimu", left: true },
    { text: "maksudnya?", right: true },
    { text: "kamu terjebak di dalam realitas palsu", left: true },
    { text: "huh apa? jadi seperti di game?", right: true },
    { text: "ya ya kau menjadi mc, melawan iblis dan menang seperti itu", left: true },
    { text: "tetapi jika kau kalah kau akan mati", left: true },
    { text: "Aww itu sepertinya mengerikan", right: true },
    { text: "aku merasa aku sedang dikendalikan", right: true },
    { text: "memang", left: true },
    { text: "APA?!", right: true },
    { text: "ehem, kau ingin keluar kan?", left: true },
    { text: "uhh iya", right: true },
    { text: "baiklah lawan beberapa musuh disini dan aku akan membantumu", left: true },
    { text: "baiklah", right: true },
    { text: "tunggu..", right: true },
    { text: "apa?", left: true },
    { text: "bukankah di game biasanya ada tutorialnya?", right: true },
    { text: "umm itu..", left: true },
    { text: "kau bisa belajar sendiri dari melawan musuh", left: true },
    { text: "jangan banyak basa-basi serang monster sana", left: true },
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