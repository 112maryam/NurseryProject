const mongoose = require("mongoose");
const autoIncrement = require("@alec016/mongoose-autoincrement");

// Initialize autoIncrement
autoIncrement.initialize(mongoose.connection);

// 1-Create the mongoose schema
const schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true }
});

// 2-Create the model using the schema
mongoose.model("teachers", schema); 






