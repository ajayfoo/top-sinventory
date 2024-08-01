import { uploadImage } from "../utils/handleMedia.js";
import Instrument from "../models/instrument.js";
import { db } from "../db.js";

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
  console.log(instrument);
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
  const { name, description, price, count, category } = req.body;
  await Instrument.findByIdAndUpdate(req.body._id, {
    name,
    description,
    price,
    count,
    category,
    url: "some url",
    imgUrl,
  });
  res.redirect("../../");
};

const remove = async (req, res, next) => {
  await Instrument.findByIdAndDelete(req.body._id);
  res.redirect("../../");
};

export { create, renderCreateForm, render, renderUpdateForm, update, remove };
