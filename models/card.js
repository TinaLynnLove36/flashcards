const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
    question: { type: String, required: true, minlength: 1, maxlength: 200 },
    answer: {type: String, required: true }, 

});
const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    question: Joi.string().min(1).required(),
    answer: Joi.string().min(1).required(),
  });
  return schema.validate(card);
}
exports.Card = Card;
exports.validate = validateCard;
exports.cardSchema = cardSchema;
