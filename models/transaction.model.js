const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  bookId: String,
  email: String,
  isComplete: Boolean
});

const Transaction = mongoose.model("transactions", transactionSchema);

module.exports = Transaction;