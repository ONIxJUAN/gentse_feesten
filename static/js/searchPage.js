import { GETEvents } from "./fetchEvents.js";
import { logoRandomizer } from "./logoRandomizer.js";

buildUI();

async function buildUI() {
  logoRandomizer();
  await GETUrlParams();
}

async function GETUrlParams() {
  
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.get('search')) {
    const search = urlParams.get('search');
    await FilteredEvents(search);
  }

}

async function FilteredEvents(search) {
  const events = await GETEvents('title', search);
  console.log(events);

  DisplayEvents(events);
}

function DisplayEvents(events){
  let html = '';
  events.forEach(event => {
    html += `
    <a href="detail.html?id=${event.id}&day=${event.day}" class="card">
    <img src=${
      event.image ? event.image.full : "../static/img/imageless.webp"
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
  });
  document.getElementById('cards').innerHTML = html;
}