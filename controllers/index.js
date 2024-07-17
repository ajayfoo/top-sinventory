import { categories, instruments } from "../test/sampleData.js";

const renderIndex = (req, res, next) => {
  res.render("index", {
    categories,
    instruments,
    title: "Sinventory",
  });
};

const renderSearchResult = (req, res, next) => {};

export { renderIndex };
