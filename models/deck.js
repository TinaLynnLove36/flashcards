const mongoose = require('mongoose');
const Joi = require('joi');


const deckSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 200 },
    subject: {type: String, required: true }, 

});

const Deck = mongoose.model('Deck', deckSchema);


function validateDeck(deck) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    subject: Joi.string().min(1).required()
  });
  return schema.validate(deck);
}

exports.Deck = Deck;
exports.validateDeck = validateDeck;