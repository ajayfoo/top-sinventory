import { db, dbPool } from "../db.js";
import Category from "../models/category.js";
import Instrument from "../models/instrument.js";

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

const renderConfirmDeletePage = async (req, res, next) => {
  let selectedCategoryIds = req.query.selected_categories;
  if (!Array.isArray(selectedCategoryIds)) {
    selectedCategoryIds = [selectedCategoryIds];
  }
  const {
    rows: [
      {
        selected_categories: selectedCategories,
        instrument_map: instrumentMap,
      },
    ],
  } = await dbPool.query(
    `
    SELECT jsonb_object_agg(cat.id,cat.categories) as selected_categories, jsonb_object_agg(im.name,im.instruments) AS instrument_map
    FROM
    (
      SELECT c.id, jsonb_agg(c.*) AS categories FROM categories AS c WHERE id=ANY($1::int[])
      GROUP BY c.id
    ) AS cat, 
    (
      SELECT c.name,jsonb_agg(i.*) AS instruments FROM instruments AS i
      INNER JOIN categories AS c ON c.id=i.category_id AND c.id=ANY($1::int[])
      GROUP BY c.name 
      )
    AS im
    `,
    [selectedCategoryIds]
  );

  const formattedSelectedCategories = selectedCategories
    ? Object.values(selectedCategories).map((v) => v[0])
    : await db.categories.getHavingIds(selectedCategoryIds);

  res.render("confirm_delete_category_form", {
    title: "Confirm Deletion",
    categoryIds: JSON.stringify(selectedCategoryIds),
    instrumentMap: instrumentMap ?? {},
    categories: formattedSelectedCategories,
  });
};

const remove = async (req, res, next) => {
  const categoryIds = JSON.parse(req.body.categoryIds);
  await db.categories.removeHavingIds(categoryIds);
  res.redirect("../../");
};

export {
  renderCreateForm,
  create,
  renderUpdateForm,
  update,
  renderConfirmDeletePage,
  remove,
};
