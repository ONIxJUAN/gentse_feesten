import { logoRandomizer } from "./logoRandomizer.js";
import { GETEvents } from "./fetchEvents.js";

buildUI();

function buildUI() {
  logoRandomizer("../");
  GETEvent(DisplayEvent);
}

function GETEvent(callback) {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const day = urlParams.get("day");
  const id = urlParams.get("id");

  const $dayIndicator = document.getElementById(`${day} juli`);
  const $oversight = document.querySelector("a.inline.arrow");

  $dayIndicator.classList.add("active");
  $oversight.setAttribute("href", `day.html?day=${day}`);
  callback(day, id);
}

async function DisplayEvent(day, id) {
  const eventsDay = await GETEvents("day", day);
  const eventId = eventsDay.find((event) => event.id === id);
  console.log(eventId);

  const $oversightText = document.getElementById("oversight");

  $oversightText.innerHTML = `OVERZICHT ${eventId.day_of_week} ${day} JULI`;

  document.getElementById("event").innerHTML = `
  <div class="container">
    <div>
      <h2>${eventId.title}</h2>
      <div class="container">
        <p class="red_box">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path fill="black" d="M14.2 29.77c.69.5 1.35.1 2.01-.34 4.06-2.71 7.75-5.77 10.13-10.16A12.9 12.9 0 0 0 15.01.03C7.86-.51.65 6.81 2.24 15.09 3.6 22.18 8.93 25.94 14.2 29.77ZM8.77 5.9c3.01-2.64 6.47-3.12 10.17-1.58 3.92 1.62 5.69 4.7 5.83 9.34-.04 3.48-5.32 10.73-9.08 11.94-.36.11-.91.16-1.17-.04-3.52-2.64-7.11-5.26-8.55-9.71-1.26-3.9-.22-7.28 2.8-9.94Z"/><path fill="black" class="cls-2" d="M14.98 17.69c2.46.05 4.74-2.02 4.79-4.34.05-2.33-2.24-4.58-4.66-4.58a4.52 4.52 0 0 0-4.54 4.6 4.4 4.4 0 0 0 4.41 4.32Zm.26-5.52c.5.03.9.44.97 1.01.09.83-.48 1-1.11 1.09-.56-.07-.95-.31-.93-.95.02-.71.39-1.19 1.08-1.16Z"/></svg>
        ${eventId.location}
        </p>
        <p>${eventId.start.replace(":", ".")} u. - ${eventId.end.replace(
    ":",
    "."
  )} u.</p>
      </div>
      <p>${eventId.description}</p>
      <div class="container-column">
        <div class="container">
          <p>organisator:</p>
          <a>${eventId.organizer}</a>
        </div>
        <div class="container">
          <p>Website:</p>
          <a>${eventId.url}</a>
        </div>
        <div class="container">
          <p>Categorieën:</p>
          ${DisplayCategoriesEvent(eventId.category)}
          </div>
          ${
            eventId.wheelchair_accessible
              ? '<img src="../static/img/buitenactiveit.png">'
              : "<p>Dit event is niet toegankelijk met een rolstoel</p>"
          }
        </div>
      </div>
    <div>
      <img src="${
        eventId.image ? eventId.image.full : "../static/img/imageless.webp"
      }">
      <div class="container">
        <a href="#" class="white-circle">
        <img src="../static/img/twitter.svg" alt="twitter link">
        </a>
        <a href="#" class="white-circle">
        <img src="../static/img/facebook.svg" alt="facebook link">
        </a>
        <a href="#" class="white-circle">
        <img src="../static/img/pinterest.svg" alt="pinterest link">
        </a>
      </div>
    </div>
  </div>
  `;

  document.getElementById("location_box").innerHTML = `
    <p class="red_box">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path fill="white" d="M14.2 29.77c.69.5 1.35.1 2.01-.34 4.06-2.71 7.75-5.77 10.13-10.16A12.9 12.9 0 0 0 15.01.03C7.86-.51.65 6.81 2.24 15.09 3.6 22.18 8.93 25.94 14.2 29.77ZM8.77 5.9c3.01-2.64 6.47-3.12 10.17-1.58 3.92 1.62 5.69 4.7 5.83 9.34-.04 3.48-5.32 10.73-9.08 11.94-.36.11-.91.16-1.17-.04-3.52-2.64-7.11-5.26-8.55-9.71-1.26-3.9-.22-7.28 2.8-9.94Z"/><path fill="white" class="cls-2" d="M14.98 17.69c2.46.05 4.74-2.02 4.79-4.34.05-2.33-2.24-4.58-4.66-4.58a4.52 4.52 0 0 0-4.54 4.6 4.4 4.4 0 0 0 4.41 4.32Zm.26-5.52c.5.03.9.44.97 1.01.09.83-.48 1-1.11 1.09-.56-.07-.95-.31-.93-.95.02-.71.39-1.19 1.08-1.16Z"/></svg>
    ${eventId.location}
    </p>
    <p>9000 Gent</p>
    <a>Open in Google Maps</a>
  `;

  document.getElementById("location_events").innerHTML += `
  <div class="cards">
  ${DisplayEvents(eventsDay, eventId.location, eventId.id)}
  </div>
  `;

  document.getElementById("organizer_events").innerHTML += `
  <div class="container">
  ${DisplayGrid(eventsDay, eventId)}
  </div>
  <p class="white_box">ALLE EVENEMENTEN VAN DEZE ORGANISATOR</p>
  `;
}

function DisplayCategoriesEvent(categories) {
  let html = "";
  for (const category of categories) {
    html += `<a>${category}</a>`;
  }
  return html;
}

function DisplayEvents(events, location, id) {
  let html = "";
  for (const event of events) {
    if ((event.location === location) & (event.id !== id)) {
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
    }
  }
  return html;
}

function DisplayGrid(events, eventId) {
  let html = "";
  for (const event of events) {
    if (event.organizer === eventId.organizer) {
      html += `
      <a href="events/detail.html?id=${event.id}&&day=${event.day}">
      <div class="container">
      <p>${event.day_of_week.slice(0, 2)} ${event.day} JULI</p>
      <p>${event.start.replace(":", ".")} u.</p>
      </div>
  
      <div class="container">
      <p><strong>${event.title}</strong></p>
      </div>
  
      <div class="container">
      <p>${event.location}</p>
      </div>
      </a>
      `;
    }
  }
  return html;
}
