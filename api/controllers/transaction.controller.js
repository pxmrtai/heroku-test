const Transaction = require("../../models/transaction.model.js");

module.exports.index = async (req, res) => {
  res.json(await Transaction.find());
};
