import { categories, instruments } from "../test/sampleData.js";

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

const create = (req, res, next) => {
  const { _id, name, description, price, count, category } = req.body;
  const newInstrument = {
    _id,
    name,
    description,
    price: parseFloat(price),
    count: parseInt(count),
    imgUrl: instruments[0].imgUrl,
    url: "",
    category,
  };
  instruments.push(newInstrument);
  res.redirect("../../");
};

const render = (req, res, next) => {
  const instrument = instruments.find((i) => i._id === req.params.id);
  const category = categories.find((c) => c._id === instrument.category);
  res.render("instrument", {
    title: instrument.name,
    ...instrument,
    category,
  });
};

const renderUpdateForm = (req, res, next) => {
  const targetInstrument = instruments.find((i) => i._id === req.params.id);
  const currentCategoryId = targetInstrument.category;
  res.render("create_instrument_form", {
    title: "Update " + targetInstrument.name,
    isCreateForm: false,
    categories,
    currentCategoryId,
    ...targetInstrument,
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
