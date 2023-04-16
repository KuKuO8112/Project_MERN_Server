const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
  title: {
    type: String,
    enum: [
      "薪水",
      "獎金",
      "投資",
      "還款",
      "利息",
      "飲食",
      "交通",
      "娛樂",
      "購物",
      "個人",
      "醫療",
      "家居",
      "家庭",
      "生活",
      "學習",
    ],
    require: true,
  },
  IncomeOrPay: {
    type: Boolean,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
    min: 0,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Account", accountSchema);
