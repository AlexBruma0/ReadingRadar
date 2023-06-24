var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(
  `mongodb+srv://bruma:Canuckhead22@cluster0.egeqpgy.mongodb.net/test?retryWrites=true&w=majority`
);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

var Schema = mongoose.Schema;

var itemSchema = new Schema({
  boardName: { type: String },
  card: { type: Array },
});

var Item = mongoose.model("books", itemSchema);

app.post("/", async (req, res) => {
  res.send("posted");

  var item = new Item({
    boardName: req.body.boardName,
    card: req.body.card,
  });

  try {
    await item.save();
    console.log("done!!");
  } catch (e) {
    console.log(e.errors);
  }
});
app.get("/", async (req, res) => {
  const result = await Item.find();
  res.json({ result });
});
app.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  await Item.updateMany(
    { _id: req.params.id },
    { $pull: { card: { id: req.body.cardId } } }
  );
});
app.put("rearrange-cards/:id", async (req, res) => {
  console.log(req.params.id, req.body.card);
  await Item.updateOne(
    { _id: req.params.id },
    { $set: { card: req.body.card } }
  );
});

app.put("/", async (req, res) => {
  //await Item.updateOne({ _id: req.body.id }, { $set: req.body.board });
  console.log(req.body.id, req.body.card);
  await Item.updateOne({ _id: req.body.id }, { $set: { card: req.body.card } });
  res.send("done");
});

app.put("/:id", async (req, res) => {
  const params = {
    api_key: "5C34E3D2794B4C448573F4E730AA68E9",
    amazon_domain: "amazon.ca",
    asin: req.body.card.title,
    type: "product",
  };
  const response = await axios.get("https://api.asindataapi.com/request", {
    params,
  });
  req.body.card.title = response.data.product.title;
  req.body.card.title = response.data.product.title;
  req.body.card.img_url = response.data.product.main_image.link;
  req.body.card.author = response.data.product.authors[0].name;
  req.body.card.publication_date = response.data.product.publication_date;
  req.body.card.rating = response.data.product.rating;
  req.body.card.ratings_total = response.data.product.ratings_total;
  req.body.card.numberOfPages = response.data.product.specifications[2].value;
  req.body.card.myRating = 0;
  console.log(req.body.card);
  await Item.updateOne(
    { _id: req.params.id },
    { $push: { card: req.body.card } }
  );
  res.send("done");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
