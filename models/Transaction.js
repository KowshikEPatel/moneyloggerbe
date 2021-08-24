const mongoose = require("mongoose");
const objectid = require("mongodb").ObjectID;

const transactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: objectid,
        required: true,
    },
    group:{
        type: Map,
        required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", transactionSchema);