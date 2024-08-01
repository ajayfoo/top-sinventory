import { db, dbPool } from "../db.js";
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
  const toUpdateCategories = await db.categories.getHavingIds(ids);
  const hasToUpdateMultiple = toUpdateCategories.length > 1;
  const title = "Update " + (hasToUpdateMultiple ? "Categories" : "Category");
  res.render("update_category_form", {
    title,
    categories: toUpdateCategories,
  });
};

const update = async (req, res, next) => {
  const updatedCategoriesMap = req.body.categories;
  console.log(updatedCategoriesMap);
  await db.categories.updateMultiple(updatedCategoriesMap);
  goHome(res);
};

const remove = async (req, res, next) => {
  const selectedCategoryIds = [];

  if (!Array.isArray(req.body.selected_categories)) {
    selectedCategoryIds.push(req.body.selected_categories);
  } else {
    selectedCategoryIds.push(...req.body.selected_categories);
  }
  const {
    rows: [{ result: instrumentMap }],
  } = await dbPool.query(
    `
    SELECT json_object_agg(r.name,r.instruments) As result
    FROM(
      SELECT c.name,json_agg(i.*) AS instruments FROM instruments AS i
      INNER JOIN categories AS c ON c.id=i.category_id AND c.id=ANY($1::int[])
      GROUP by c.name 
      )
    AS r;
    `,
    [selectedCategoryIds]
  );
  console.log("Results:-");
  console.log(instrumentMap);
  if (!instrumentMap) {
    await db.categories.removeHavingIds(selectedCategoryIds);
    goHome(res);
    return;
  }

  res.render("confirm_delete_category_form", {
    title: "Confirm Deletion",
    categoryIds: JSON.stringify(selectedCategoryIds),
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
