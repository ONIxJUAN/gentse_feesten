buildHamburger();

function buildHamburger() {
const btn = document.getElementById('hamburger_btn');
btn.addEventListener('click', (e) => {
  document.getElementById('hamburger').classList.toggle('active');
})
}