import { categories, instruments } from "../test/sampleData.js";
import Category from "../models/category.js";
import { Mongoose } from "mongoose";

const goHome = (res) => {
  res.redirect("../../");
};

const renderCreateForm = (req, res, next) => {
  res.render("create_category_form", {
    title: "Create New Category",
  });
};

const create = async (req, res, next) => {
  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
    url: "some url",
  });
  await newCategory.save();
  goHome(res);
};

const renderUpdateForm = async (req, res, next) => {
  const _ids = req.query.selected_categories;
  const toUpdateCategories = await Category.find({
    _id: {
      $in: _ids,
    },
  });
  const hasToUpdateMultiple = toUpdateCategories.length > 1;
  const title = "Update " + hasToUpdateMultiple ? "Categories" : "Category";
  res.render("update_category_form", {
    title,
    categories: toUpdateCategories,
  });
};

const update = async (req, res, next) => {
  console.log(req.body.categories);
  const updatedCategoriesMap = req.body.categories;
  const toUpdateCategoryIds = Object.keys(req.body.categories);
  const toUpdateCategoryModels = await Category.find({
    _id: {
      $in: toUpdateCategoryIds,
    },
  });
  toUpdateCategoryModels.forEach((c) => {
    const { name, description, url } = updatedCategoriesMap[c._id];
    c.name = name;
    c.description = description;
    c.url = url;
  });
  await Category.bulkSave(toUpdateCategoryModels);
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
