let info = document.getElementById('info');
let infoBtn = document.getElementById('info-button');
let backdrop = document.getElementById('backdrop');

setTimeout(() => {
  showInfo();
}, 1000);

let showInfo = () => {
  info.style.display = "block";
  infoBtn.style.display = "none";
  backdrop.style.display = "block";
  backdrop.setAttribute("onclick", "closeInfo()");
}

let closeInfo = () => {
  info.style.display = "none";
  infoBtn.style.display = "block";
  backdrop.style.display = "none";
}