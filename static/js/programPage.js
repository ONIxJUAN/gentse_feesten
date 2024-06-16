import { logoRandomizer } from "./logoRandomizer.js";
import { GETCategories } from "./fetchCategories.js";
import { GETEvents } from "./fetchEvents.js";

buildUI();

function buildUI() {
  logoRandomizer("../");
  DaySelector(displayCategoryAndEvents);
}

function DaySelector(callback) {
  let day = 14;

  const url = window.location.search;
  const urlParams = new URLSearchParams(url);

  if (urlParams.get("day")) {
    day = urlParams.get("day");
    if(day <= 13 || day >= 24){
      day = 14;
    }
  }

  const $dayIndicator = document.getElementById(`${day} juli`);

  $dayIndicator.classList.add("active");
  callback(day);
}

async function displayCategoryAndEvents(day) {
  let events = await GETEvents("day", day);
  const categories = await GETCategories();
  categories.sort();

  const $categoryContainer = document.getElementById("filter_content");
  const $events = document.getElementById("events");
  let htmlCategory = "";
  let htmlEvents = "";

  for (const category of categories) {
    htmlCategory += `<a href="#${category}"><img src="../static/img/tag.svg" alt="image that indicates it's about categorien">
    <p>${category}</p></a>`;

    htmlEvents += `
<h1 id='${category}'>${category}</h1>
<div class="cards">${Events(events, category, day)}</div>
`;
  }
  $categoryContainer.innerHTML = htmlCategory;
  $events.innerHTML = htmlEvents;
}

function Events(events, category, day) {
  let html = "";
  for (const event of events) {
    if (event.category == category) {
      html += `
        <a href="detail.html?id=${event.id}&day=${day}" class="card">
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
    }
  }
  if (html === "") {
    html = `<h2>Er zijn geen evenementen voor deze category op deze dag</h2>`;
  }
  return html;
}
