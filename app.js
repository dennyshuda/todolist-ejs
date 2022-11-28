const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const app = express();

let items = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("item", itemsSchema);

const item = new Item({
  name: "Homework",
});

const item2 = new Item({
  name: "Cooking",
});

const defaultItems = [item, item2];

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("succes");
        }
      });
      res.redirect("/");
    } else {
      res.render("index", { kindOfDay: "Today", newItem: foundItems });
    }
  });
});

app.post("/", (req, res) => {
  let item = req.body.todo;
  items.push(item);

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
