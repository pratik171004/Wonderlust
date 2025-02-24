const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const dbUrl= "mongodb+srv://pratikwaghmare134:KP5cPt5GfAEyHGLn@cluster0.9oe0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"67bac7bf9efde72f3e452b39"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();