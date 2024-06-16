async function GETEvents(propertyName = "", propertydata = null) {
  let data = await fetch(
    "https://www.pgm.gent/data/gentsefeesten/events.json"
  );
  try {
    data = await data.json();
    if (propertyName === "image") {
      return data.filter((event) => {
        return event[propertyName] !== null;
      });
    } else if (propertyName === "day") {
      return data.filter((event) => {
        return event[propertyName] === propertydata;
      });
    } else if(propertyName === 'title') {
      return data.filter((event) => {
        return event[propertyName].includes(propertydata)
      })
    }
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// module.exports = GETEvents;

export { GETEvents };
