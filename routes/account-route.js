const router = require("express").Router();
const Account = require("../models").account;
const accountValidation = require("../validation").accountValidation;

router.use((req, res, next) => {
  console.log("正在接收一個跟account有關的請求");
  next();
});

//獲得所有收入資料
router.get("/", async (req, res) => {
  try {
    let accountFound = await Account.find({})
      .populate("ownerId", ["username", "email"])
      .exec();
    return res.send(accountFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//新增收入資料
router.post("/", async (req, res) => {
  //驗證資料符合規範
  let { error } = accountValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { title, IncomeOrPay, description, cost, date, time } = req.body;

  try {
    let newAccount = new Account({
      title,
      IncomeOrPay,
      description,
      cost,
      ownerId: req.user._id,
      date,
      time,
    });
    let saveAccount = await newAccount.save();
    console.log(saveAccount);
    return res.send("已新增資料");
  } catch (e) {
    return res.status(500).send("無法新增收入");
  }
});

//使用會員id尋找收入資料
router.get("/account/:_id", async (req, res) => {
  let _id = req.params;
  let accountFound = await Account.find({ ownerId: _id })
    .populate("ownerId", ["username", "email"])
    .exec();
  return res.send(accountFound);
});

//使用收入id尋找收入資料
router.get("/:_id", async (req, res) => {
  let _id = req.params;
  try {
    let accountFound = await Account.findOne({ _id });
    if (accountFound) {
      return res.send(accountFound);
    } else {
      return res.status(400).send("無此筆資料");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

//更新資料
router.patch("/:_id", async (req, res) => {
  //驗證資料符合規範
  let { error } = accountValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let _id = req.params;
  //確認資料存在
  try {
    let accountFound = await Account.findOne({ _id });
    if (!accountFound) {
      return res.status(400).send("無此筆資料，無法更改資料");
    }

    //使用者必須是此資料擁有者，才能更改資料
    if (accountFound.ownerId.equals(req.user._id)) {
      let updatedAccount = await Account.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "資料已被更新成功",
        updatedAccount,
      });
    } else {
      return res.status(403).send("只有此資料擁有者，才能更改資料");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除資料
router.delete("/:_id", async (req, res) => {
  let _id = req.params;

  try {
    let accountFound = await Account.findOne({ _id });
    if (!accountFound) {
      return res.status(400).send("無此筆資料，無法刪除資料");
    }

    //使用者必須是此資料擁有者，才能刪除資料
    if (accountFound.ownerId.equals(req.user._id)) {
      await Account.deleteOne({ _id }).exec();
      return res.send("資料已被刪除");
    } else {
      return res.status(403).send("只有此資料擁有者，才能刪除資料");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
