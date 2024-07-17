import { categories, items } from "../test/sampleData.js";

const renderIndex = (req, res, next) => {
  res.render("index", {
    categories,
    items,
    title: "Sinventory",
  });
};

const renderSearchResult = (req, res, next) => {};

export { renderIndex };
