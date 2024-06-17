import { GETNews } from "./fetchNews.js";
import { logoRandomizer } from "./logoRandomizer.js";

buildUI();

async function buildUI() {
  logoRandomizer();
  newestNewsDisplay();
}

async function newestNewsDisplay() {
  const $news = document.getElementById('news-container');
  const newsItems = await GETNews();

  let html = '';
  newsItems.forEach((newsitem) => {
    html += `
    <div class="news_card container">
      <div class="container-column">
        <h2><strong>${newsitem.title}</strong></h2>
        <div class="inline arrow">
          <div class="container a_center">
            <span style="background-color:white" class="arrow_line"></span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path
                fill="white"
                d="M12.5 7c.384 0 .768.146 1.06.439l8.26 8.261-8.26 8.261a1.5 1.5 0 0 1-2.121-2.122l6.14-6.14-6.14-6.139a1.502 1.502 0 0 1 1.06-2.561z" />
            </svg>
          </div>
        </div>  
      </div>
      <img src="${newsitem.picture.large}" alt="image of a news item">
    </div>`;
  })
  $news.innerHTML += html;
}