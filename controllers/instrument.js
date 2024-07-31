import { uploadImage } from "../utils/handleMedia.js";
import Instrument from "../models/instrument.js";
import Category from "../models/category.js";
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
  const { name, description, price, count, category } = req.body;
  const newInstrument = new Instrument({
    name,
    description,
    price: parseFloat(price),
    count: parseInt(count),
    imgUrl,
    url: "some url",
    category,
  });
  await newInstrument.save();
  res.redirect("../../");
};

const render = async (req, res, next) => {
  const instrument = await Instrument.findById(req.params.id).populate(
    "category"
  );
  res.render("instrument", {
    title: instrument.name,
    ...instrument.toObject(),
  });
};

const renderUpdateForm = async (req, res, next) => {
  const [instrument, categories] = await Promise.all([
    Instrument.findById(req.params.id).populate("category"),
    Category.find(),
  ]);
  const currentCategoryId = instrument.category._id;
  res.render("create_instrument_form", {
    title: "Update " + instrument.name,
    isCreateForm: false,
    categories,
    currentCategoryId,
    ...instrument.toObject(),
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
