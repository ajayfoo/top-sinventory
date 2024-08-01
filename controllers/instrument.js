import { uploadImage } from "../utils/handleMedia.js";
import { db, dbPool } from "../db.js";

const renderCreateForm = async (req, res, next) => {
  const categories = await db.categories.getAll();
  res.render("create_instrument_form", {
    title: "Create Instrument",
    name: "",
    description: "",
    price: "",
    count: "",
    isCreateForm: true,
    categories,
  });
};

const create = async (req, res, next) => {
  const imgUrl = await uploadImage(req.file.path);
  const { name, description, price, count, category_id } = req.body;
  const newInstrument = {
    name,
    description,
    price: parseFloat(price),
    count: parseInt(count),
    imgUrl,
    category_id,
  };
  await db.instruments.insert(newInstrument);
  res.redirect("../../");
};

const render = async (req, res, next) => {
  const instrument = await db.instruments.getHavingId(req.params.id);
  res.render("instrument", {
    title: instrument.name,
    ...instrument,
  });
};

const renderUpdateForm = async (req, res, next) => {
  const [instrument, categories] = await Promise.all([
    db.instruments.getHavingId(req.params.id),
    db.categories.getAll(),
  ]);
  const currentCategoryId = instrument.category.id;
  res.render("create_instrument_form", {
    title: "Update " + instrument.name,
    isCreateForm: false,
    categories,
    currentCategoryId,
    ...instrument,
  });
};

const update = async (req, res, next) => {
  let imgUrl = null;
  if (req.file === undefined) {
    imgUrl = req.body.imgUrl;
  } else {
    imgUrl = await uploadImage(req.file.path);
  }
  const {
    id,
    name,
    description,
    price,
    count,
    category_id: categoryId,
  } = req.body;
  await dbPool.query(
    `
    UPDATE instruments
    SET name=$1, description=$2, price=$3, count=$4, category_id=$5, img_url=$6
    WHERE id=$7
    `,
    [name, description, price, count, categoryId, imgUrl, id]
  );
  res.redirect("../../");
};

const remove = async (req, res, next) => {
  await db.instruments.removeHavingId(req.body.id);
  res.redirect("../../");
};

export { create, renderCreateForm, render, renderUpdateForm, update, remove };
