const mongoose = require("mongoose");
const autoIncrement = require("@alec016/mongoose-autoincrement");
autoIncrement.initialize(mongoose.connection);

const schema = new mongoose.Schema({
  _id: { type: Number },
    name: { type: String, required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
    children: { type: [Number], required: true, ref: "children" }

  });


schema.plugin(autoIncrement.plugin, "classes");
mongoose.model("classes", schema);