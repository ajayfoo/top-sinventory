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
export { create, render };
