import { db } from "../db.js";

const renderIndex = async (req, res, next) => {
  const [categories, instruments] = await Promise.all([
    db.categories.getAll(),
    db.instruments.getAll(),
  ]);
  console.log(categories);
  console.log(instruments);
  res.render("index", {
    categories,
    instruments,
    title: "Instruments",
  });
};

const renderFilterResults = async (req, res, next) => {
  let selectedCategories = req.query.selected_categories;
  if (!selectedCategories) {
    res.redirect("/");
    return;
  }
  if (!Array.isArray(selectedCategories)) {
    selectedCategories = [selectedCategories];
  }
  const [categories, instruments] = await Promise.all([
    db.categories.getAll(),
    db.instruments.getAllOfCategoryIds(selectedCategories),
  ]);
  console.log(categories);
  console.log(instruments);
  res.render("index", {
    title: "Instruments",
    instruments,
    categories,
  });
};

export { renderIndex, renderFilterResults };
