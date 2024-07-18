import { instruments } from "../test/sampleData.js";

const renderCreateForm = (req, res, next) => {
  res.render("create_instrument_form", {
    title: "Create Instrument",
    name: "",
    description: "",
    price: "",
    count: "",
    isCreateForm: true,
  });
};

const create = (req, res, next) => {
  const { _id, name, description, price, count } = req.body;
  const newInstrument = {
    _id,
    name,
    description,
    price: parseFloat(price),
    count: parseInt(count),
    imgUrl: instruments[0].imgUrl,
    url: "",
  };
  instruments.push(newInstrument);
  res.redirect("../../");
};

const render = (req, res, next) => {
  const instrument = instruments.find((i) => i._id === req.params.id);
  res.render("instrument", {
    title: instrument.name,
    ...instrument,
  });
};

const renderUpdateForm = (req, res, next) => {
  const targetInstrument = instruments.find((i) => i._id === req.params.id);
  res.render("create_instrument_form", {
    title: "Update " + targetInstrument.name,
    isCreateForm: false,
    ...targetInstrument,
  });
};

const update = (req, res, next) => {
  const targetInstrument = instruments.find((i) => i._id === req.body._id);
  const { name, description, price, count } = req.body;
  targetInstrument.name = name;
  targetInstrument.description = description;
  targetInstrument.price = price;
  targetInstrument.count = count;
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

export { create, renderCreateForm, render, renderUpdateForm, update, remove };
