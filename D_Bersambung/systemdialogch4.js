let dialogs = [
    { text: "Uhhh.. kenapa...", right: true },
    { text: "Huh lemah....", left: true },
    { text: "*mengeluarkan kekuatan*", left: true },
    { text: "*Terkejut* TUNGGUU!!", right: true },
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
        window.location = "./End/end.html"; // Ganti dengan halaman yang diinginkan
    };
    controls.appendChild(attackButton);
}