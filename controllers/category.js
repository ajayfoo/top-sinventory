import { db } from "../db.js";
import Category from "../models/category.js";
import Instrument from "../models/instrument.js";
import mongoose from "mongoose";

const goHome = (res) => {
  res.redirect("../../");
};

const renderCreateForm = (req, res, next) => {
  res.render("create_category_form", {
    title: "Create New Category",
  });
};

const create = async (req, res, next) => {
  const { name, description } = req.body;
  await db.categories.insert(name, description);
  goHome(res);
};

const renderUpdateForm = async (req, res, next) => {
  let ids = req.query.selected_categories;
  if (!Array.isArray(ids)) {
    ids = [ids];
  }
  const toUpdateCategories = await db.categories.getAllHavingIds(ids);
  const hasToUpdateMultiple = toUpdateCategories.length > 1;
  const title = "Update " + (hasToUpdateMultiple ? "Categories" : "Category");
  res.render("update_category_form", {
    title,
    categories: toUpdateCategories,
  });
};

const update = async (req, res, next) => {
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

const remove = async (req, res, next) => {
  const selectedCategoryIds = [];

  if (!Array.isArray(req.body.selected_categories)) {
    selectedCategoryIds.push(req.body.selected_categories);
  } else {
    selectedCategoryIds.push(...req.body.selected_categories);
  }
  const categoryObjectIds = selectedCategoryIds.map((c) =>
    mongoose.Types.ObjectId.createFromHexString(c)
  );
  const result = await Instrument.aggregate([
    {
      $match: {
        category: {
          $in: categoryObjectIds,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        instruments: { $push: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
  ]).exec();

  if (result.length === 0) {
    await Category.deleteMany({ _id: { $in: selectedCategoryIds } });
    goHome(res);
    return;
  }

  const categoriesWithDependentInstruments = [];
  const instrumentMap = {};
  result.forEach((r) => {
    const ins = r.instruments;
    const cat = r.category[0];
    categoriesWithDependentInstruments.push(cat);
    instrumentMap[cat._id.toString()] = ins;
  });

  const categoryIdsWithoutDependentInstruments = selectedCategoryIds.filter(
    (c) => categoriesWithDependentInstruments.some((d) => d._id !== c)
  );

  res.render("confirm_delete_category_form", {
    title: "Confirm Deletion",
    categories: categoriesWithDependentInstruments,
    categoryIdsWithoutDependentInstruments,
    instrumentMap,
  });
};

const removeWithInstruments = async (req, res, next) => {
  const instrumentIds = [];
  if (!Array.isArray(req.body.instrumentIds)) {
    instrumentIds.push(req.body.instrumentIds);
  } else {
    instrumentIds.push(...req.body.instrumentIds);
  }

  await Instrument.deleteMany({
    _id: {
      $in: instrumentIds,
    },
  });

  const categoryIds = [];
  if (!Array.isArray(req.body.categoryIds)) {
    categoryIds.push(req.body.categoryIds);
  } else {
    categoryIds.push(...req.body.categoryIds);
  }

  await Category.deleteMany({
    _id: {
      $in: categoryIds,
    },
  });

  res.redirect("../../");
};

export {
  renderCreateForm,
  create,
  renderUpdateForm,
  update,
  remove,
  removeWithInstruments,
};
