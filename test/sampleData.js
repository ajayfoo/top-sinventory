const categories = [
  {
    _id: "6697b2780adf569d4494d2bb",
    name: "String",
    description: "Instruments produce sound via strings",
    url: "",
  },
  {
    _id: "6697b3180adf569d4494d2bc",
    name: "Percussion",
    description: "Sound is produced via drums, etc.",
    url: "",
  },
  {
    _id: "6697b36c0adf569d4494d2bd",
    name: "Wind",
    description: "Sound is produced via wind",
    url: "",
  },
];

const items = [
  {
    _id: "6697b2260adf569d4494d2ba",
    name: "Classical Guitar 1",
    count: { $numberInt: "19" },
    description: "A small O-cut classical, nylon stringed guitar.",
    imgUrl:
      "https://res.cloudinary.com/daw7z8ak6/image/upload/v1721216662/pexels-philboakye-3428498_bfoj9s.jpg",
    price: { $numberDecimal: "8700" },
    url: "",
    category: { $oid: "6697b2780adf569d4494d2bb" },
  },
  {
    _id: "6697b3e50adf569d4494d2be",
    name: "Flute 1",
    count: { $numberInt: "27" },
    price: { $numberDecimal: "21000" },
    description: "A flute of type 1",
    category: { $oid: "6697b36c0adf569d4494d2bd" },
    imgUrl:
      "https://res.cloudinary.com/daw7z8ak6/image/upload/v1721216662/pexels-pixabay-221563_bdc7g1.jpg",
    url: "",
  },
  {
    _id: "6697b4e10adf569d4494d2bf",
    name: "Tabla 1",
    description: "A percussive instrument",
    count: { $numberInt: "8" },
    price: { $numberDecimal: "15500" },
    url: "",
    imgUrl:
      "https://res.cloudinary.com/daw7z8ak6/image/upload/v1721216662/pexels-dr-herumb-sharma-78972025-16743021_riqqka.jpg",
    category: { $oid: "6697b3180adf569d4494d2bc" },
  },
];

export default {
  categories,
  items,
};
