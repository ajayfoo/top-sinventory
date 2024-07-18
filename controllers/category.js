import { categories } from "../test/sampleData.js";

const goHome = (res) => {
  res.redirect("../../");
};

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
  goHome(res);
};

const renderUpdateForm = (req, res, next) => {
  const toUpdateCategoriesId = req.query.selected_categories;
  const toUpdateCategories = categories.filter((c) =>
    toUpdateCategoriesId.includes(c._id)
  );
  const hasToUpdateMultiple = toUpdateCategories.length > 1;
  const title = "Update " + hasToUpdateMultiple ? "Categories" : "Category";
  res.render("update_category_form", {
    title,
    categories: toUpdateCategories,
  });
};

const update = (req, res, next) => {
  const toUpdateCategoriesMap = req.body.categories;
  categories.forEach((c) => {
    if (!toUpdateCategoriesMap[c._id]) return;
    const { name, description } = toUpdateCategoriesMap[c._id];
    c.name = name;
    c.description = description;
  });
  goHome(res);
};

const remove = (req, res, next) => {
  req.body.selected_categories.forEach((c) => {
    const targetIndex = categories.findIndex((e) => e._id === c);
    categories.splice(targetIndex, 1);
  });
  goHome(res);
};

export { renderCreateForm, create, renderUpdateForm, update, remove };
