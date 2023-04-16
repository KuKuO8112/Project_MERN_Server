const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

//認證密碼
userSchema.methods.comparePassword = async function (password, callbackF) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callbackF(null, result);
  } catch (e) {
    return callbackF(e, result);
  }
};

//mongoose middlewares
//新用戶或改密碼，進行雜湊
userSchema.pre("save", async function (next) {
  //this代表mongoDB內的document
  //isNew如果維新資料，為true
  //isModified確認資料是否被改過
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
