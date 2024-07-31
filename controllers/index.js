import db from "../db.js";
import Category from "../models/category.js";
import Instrument from "../models/instrument.js";

const renderIndex = async (req, res, next) => {
  const { rows: categories } = await db.query("SELECT * FROM categories");
  const { rows: instruments } = await db.query(
    "SELECT * FROM instruments WHERE category_id = ANY($1::int[])",
    [categories.map((c) => c.id)]
  );
  res.render("index", {
    categories,
    instruments,
    title: "Instruments",
  });
};

const renderFilterResults = async (req, res, next) => {
  if (!req.query.selected_categories) {
    res.redirect("/");
    return;
  }
  const selectedCategories = req.query.selected_categories;
  const [categories, instruments] = await Promise.all([
    Category.find(),
    Instrument.find({
      category: {
        $in: selectedCategories,
      },
    }).populate("category"),
  ]);
  res.render("index", {
    title: "Instruments",
    instruments,
    categories,
  });
};

export { renderIndex, renderFilterResults };
