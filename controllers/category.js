import { categories } from "../test/sampleData.js";
const renderCreateForm = (req, res, next) => {
  res.render("create_category_form", {
    title: "Create New Category",
  });
};

const create = (req, res, next) => {
  const newCategory = {
    name: req.body.name,
    description: req.body.description,
    _id: Date.now().toString(),
  };

  categories.push(newCategory);
  res.redirect("../../");
};

export { renderCreateForm, create };
