import Category from "../models/category.js";
import Instrument from "../models/instrument.js";

const renderIndex = async (req, res, next) => {
  const categories = await Category.find();
  const instruments = await Instrument.find().populate("category");
  console.log(instruments);
  res.render("index", {
    categories,
    instruments,
    title: "Instruments",
  });
};

const renderFilterResults = async (req, res, next) => {
  if (!req.query.selected_categories) {
    res.redirect("/");
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
