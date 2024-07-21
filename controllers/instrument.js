import { categories, instruments } from "../test/sampleData.js";
import { uploadImage } from "../utils/handleMedia.js";
import Instrument from "../models/instrument.js";
import Category from "../models/category.js";

const renderCreateForm = (req, res, next) => {
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
  console.log(instrument);
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

const update = (req, res, next) => {
  const targetInstrument = instruments.find((i) => i._id === req.body._id);
  const { name, description, price, count, category } = req.body;
  targetInstrument.name = name;
  targetInstrument.description = description;
  targetInstrument.price = price;
  targetInstrument.count = count;
  targetInstrument.category = category;
  res.redirect("../../");
};

const remove = (req, res, next) => {
  const targetIndex = instruments.findIndex((i) => i._id === req.body._id);
  if (targetIndex === -1) {
    res.redirect("../../");
  }
  instruments.splice(targetIndex, 1);
  res.redirect("../../");
};

const removeMultiple = (req, res, next) => {
  const instrumentIds = [];
  if (!Array.isArray(req.body.instrumentIds)) {
    instrumentIds.push(req.body.instrumentIds);
  } else {
    instrumentIds.push(...req.body.instrumentIds);
  }
  instrumentIds.forEach((id) => {
    const instrumentIndex = instruments.findIndex((i) => i._id === id);
    if (instrumentIndex === -1) return;
    instruments.splice(instrumentIndex, 1);
  });

  const categoryIds = [];
  if (!Array.isArray(req.body.categoryIds)) {
    categoryIds.push(req.body.categoryIds);
  } else {
    categoryIds.push(...req.body.categoryIds);
  }
  categoryIds.forEach((id) => {
    const categoryIndex = categories.findIndex((c) => c._id === id);
    if (categoryIndex === -1) return;
    categories.splice(categoryIndex, 1);
  });

  res.redirect("../../");
};

export {
  create,
  renderCreateForm,
  render,
  renderUpdateForm,
  update,
  remove,
  removeMultiple,
};
