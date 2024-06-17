export function logoRandomizer(dir = "") {
  const rnd = Math.round(Math.random() * 5);
  const $headerLogo = document.getElementById("header-logo");
  const $mainLogo = document.getElementById("main-logo");
  const $footerLogo = document.getElementById("footer-logo");
  const $bottomFooterLogo = document.getElementById("bottom-footer-logo");

  $headerLogo.src = `${dir}static/img/GF-logo-2023-${rnd}.svg`;
  if ($mainLogo) {
    $mainLogo.src = `${dir}static/img/campagne-${rnd}.png`;
  }
  if ($footerLogo) {
    $footerLogo.src = `${dir}static/img/campagne-${rnd}.png`;
  }
  $bottomFooterLogo.src = `${dir}static/img/GF-logo-2023-${rnd}.svg`;
}
