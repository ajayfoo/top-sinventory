import { categories, instruments } from "../test/sampleData.js";

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
  const instrumentMap = {};
  const selectedCategories = [];

  if (!Array.isArray(req.body.selected_categories)) {
    selectedCategories.push(req.body.selected_categories);
  } else {
    selectedCategories.push(...req.body.selected_categories);
  }

  selectedCategories.forEach((c) => {
    const dependentInstruments = instruments.filter((i) => i.category === c);
    if (dependentInstruments.length !== 0) {
      instrumentMap[c] = dependentInstruments;
    } else {
      const targetIndex = categories.findIndex((e) => e._id === c);
      categories.splice(targetIndex, 1);
    }
  });

  const categoryIdsWithDependentInstruments = Object.keys(instrumentMap);
  console.log(
    categories.filter((c) =>
      categoryIdsWithDependentInstruments.includes(c._id)
    )
  );
  if (categoryIdsWithDependentInstruments.length === 0) {
    goHome(res);
  } else {
    res.render("confirm_delete_category_form", {
      title: "Confirm Deletion",
      categories: categories.filter((c) =>
        categoryIdsWithDependentInstruments.includes(c._id)
      ),
      instrumentMap,
    });
  }
};

export { renderCreateForm, create, renderUpdateForm, update, remove };
