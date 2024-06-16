async function GETCategories() {
  const categories = await fetch(
    "https://www.pgm.gent/data/gentsefeesten/categories.json"
  );
  return await categories.json();
}

export {GETCategories} ;
