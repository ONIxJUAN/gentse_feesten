import { GETEvents } from "./fetchEvents.js";
import { GETNews } from "./fetchNews.js";
import { logoRandomizer } from "./logoRandomizer.js";
buildUI();

function buildUI() {
  logoRandomizer();
  scrollContent();
  horizontalScroll();
  newestNewsDisplay();
}

async function scrollContent() {
  const eigthEvents = await GETEigthEvents();
  const $cards = document.getElementById(`scroll_box`);
  let html = "";

  for (const event of eigthEvents) {
    html += `
      <a href="events/detail.html?id=${event.id}&day=${event.day}" class="card">
      <img src=${
        event.image.full
      } alt="image about an event during de Gentse feesten">
      <p class="card-date">${event.day_of_week.slice(0, 2)} ${
      event.day
    } juli</p>
      <div class="card-box">
      <h3>${event.title}</h3>
      <div class="box-flex">
      <p class="card-box-red">${event.location}</p>
      <p>${event.start.replace(":", ".")} u.</p>
      </div>
      </div>
      </a>
      `;
  }
  $cards.innerHTML = html;
}

async function GETEigthEvents() {
  let eigthEvents = [];
  try {
    let data = await GETEvents("image");
    for (let i = 0; i < 8; i++) {
      const rnd = Math.round(Math.random() * data.length);
      eigthEvents.push(...data.slice(rnd, rnd + 1));
    }
    return eigthEvents;
  } catch {
    (error) => console.error(error.message);
  }
}

function horizontalScroll() {
  const scrollContainer = document.getElementById("scroll_box");

  scrollContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
  });
}

async function newestNewsDisplay() {
  const $newsgrid = document.querySelectorAll(".news_grid");
  const newsItems = await GETNews();

  for (let i = 0; i < 3; i++) {
    $newsgrid[
      i
    ].innerHTML += `<p><strong>${newsItems[i].synopsis}</strong></p>`;
  }
}
