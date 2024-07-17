import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Schema.Types.Decimal128, min: 0, required: true },
  count: { type: Schema.Types.Number, min: 0, required: true },
  url: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

export default mongoose.model("Instrument", InstrumentSchema);
