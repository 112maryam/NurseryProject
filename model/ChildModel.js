const mongoose =require("mongoose");
const autoIncrement = require("@alec016/mongoose-autoincrement");
autoIncrement.initialize(mongoose.connection);


//1-creat object from mongoose 
const address = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: { type: Number },
  fullname:{type:String, required: true},
  age: Number,
  level: String,
  image: { type: String, required: true },
  address:address

});


mongoose.model("children",schema);


