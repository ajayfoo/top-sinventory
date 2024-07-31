import { db } from "../db.js";

const renderIndex = async (req, res, next) => {
  const [categories, instruments] = await Promise.all([
    db.categories.getAll(),
    db.instruments.getAll(),
  ]);
  console.log(categories);
  console.log(instruments);
  res.render("index", {
    categories: [],
    instruments: [],
    title: "Instruments",
  });
};

const renderFilterResults = async (req, res, next) => {
  if (!req.query.selected_categories) {
    res.redirect("/");
    return;
  }
  const selectedCategories = req.query.selected_categories;
  const [rows, instruments] = await Promise.all([
    db.categories.getOfId,
    db.instruments.getAllOfCategoryIds(selectedCategories),
  ]);
  console.log(categories);
  console.log(instruments);
  res.render("index", {
    title: "Instruments",
    instruments: [],
    categories: [],
  });
};

export { renderIndex, renderFilterResults };
