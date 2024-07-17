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

const instruments = [
  {
    _id: "6697b2260adf569d4494d2ba",
    name: "Classical Guitar 1",
    count: 19,
    price: 8700,
    description: "A small O-cut classical, nylon stringed guitar.",
    imgUrl: "/images/guitar.jpg",
    url: "",
    category: { $oid: "6697b2780adf569d4494d2bb" },
  },
  {
    _id: "6697b3e50adf569d4494d2be",
    name: "Flute 1",
    count: 27,
    price: 21000,
    description: "A flute of type 1",
    category: { $oid: "6697b36c0adf569d4494d2bd" },
    imgUrl: "/images/flute.jpg",
    url: "",
  },
  {
    _id: "6697b4e10adf569d4494d2bf",
    name: "Tabla 1",
    description: "A percussive instrument",
    count: 8,
    price: 15500,
    url: "",
    imgUrl: "/images/tabla.jpg",
    category: { $oid: "6697b3180adf569d4494d2bc" },
  },
];

export { categories, instruments };
