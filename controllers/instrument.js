import { instruments } from "../test/sampleData.js";

const create = (req, res, next) => {
  console.log("creating instrument");
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
  res.render("update_instrument_form", {
    title: "Update " + targetInstrument.name,
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

export { create, render, renderUpdateForm, update };
