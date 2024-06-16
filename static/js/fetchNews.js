async function GETNews() {
  const news = await fetch("https://www.pgm.gent/data/gentsefeesten/news.json");
  return await news.json();
}

export { GETNews };
