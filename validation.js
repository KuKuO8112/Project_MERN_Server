const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const accountValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .valid(
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
        "學習"
      ),
    IncomeOrPay: Joi.boolean().required(),
    description: Joi.string().min(0).max(50).required(),
    cost: Joi.number().min(0).required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.accountValidation = accountValidation;
