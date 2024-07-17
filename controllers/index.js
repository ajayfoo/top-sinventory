import { categories, instruments } from "../test/sampleData.js";

const renderIndex = (req, res, next) => {
  res.render("index", {
    categories,
    instruments,
    title: "Sinventory",
  });
};

const renderFilterResults = (req, res, next) => {
  const selectedCategories = req.body.selected_categories;
  const targetInstruments = instruments.filter((i) => {
    return selectedCategories.includes(i.category);
  });
  console.log(targetInstruments);
  res.render("index", {
    title: "Sinventory",
    instruments: targetInstruments,
    categories,
  });
};

const renderSearchResult = (req, res, next) => {};

export { renderIndex, renderFilterResults };
