const { Card, validate } = require('../models/card');
const { Deck, validateDeck } = require('../models/deck');
const express = require('express');
const router = express.Router();


//GET all decks 
router.get('/', async (req, res) => {
 try {
 const getDeck = await Deck.find();
 return res.send(getDeck);
 } catch (ex) {
 return res.status(500).send(`Internal Server Error: ${ex}`);
 }
});

//GET deck by id
router.get('/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);

        if (!deck)
            return res.status(400).send(`The product with id "${req.params.id} does not exist.`);

            return res.send(deck);

    }       catch (ex) {
            return res.send(500).send(`Internal Server Error: ${ex}`);
    }
});


//POST new deck
router.post('/', async (req, res) => {
    try {
        const deck = new Deck({
            name: req.body.name,
            subject: req.body.subject,
        });
        await deck.save();
        return res.send(deck);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//UPDATE deck
router.put('/:id', async (req, res) => {
    try {
       const { error } = validateDeck(req.body);
        if (error) return res.status(400).send(error);

        const deck = await Deck.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                subject: req.body.subject
            },
            { new: true }
        );

        if (!deck)
            return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);

            await deck.save();

            return res.send(deck);
    }       catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);

    }
});

//DELETE a deck
router.delete('/:id', async (req, res) => {
    try {
        const deck = await Deck.findByIdAndRemove(req.params.id);

        if (!deck)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

            return res.send(deck);
    }       catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


//GET all cards in a deck
router.get('/:id/cards', async (req, res) => {
 try {
 const allCards = await Card.find();
 return res.send(allCards);
 } catch (ex) {
 return res.status(500).send(`Internal Server Error: ${ex}`);
 }
});


//GET a specific card by id linked to a deck's id
router.get('/:decksId/cards/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);

        if (!deck)
            return res.status(400).send(`The product with id "${req.params.id} does not exist.`);

            return res.send(deck);

    }       catch (ex) {
            return res.send(500).send(`Internal Server Error: ${ex}`);
    }
});


//POST a new card to a deck
router.post('/:id/cards', async (req, res) => {
    try {
        const card = new Card({
            question: req.body.question,
            answer: req.body.answer,
        });
        await card.save();
        return res.send(card);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


//UPDATE a specific card in a deck
router.put('/:decksId/cards/:id', async (req, res) => {
    try {
       const { error } = validate(req.body);
       if (error) return res.status(400).send(error);

        const card = await Card.findByIdAndUpdate(
            req.params.id,
            {
                question: req.body.question,
                answer: req.body.answer
            },
            { new: true }
        );

        if (!card)
            return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);

            await card.save();

            return res.send(card);
    }       catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);

    }
});


//DELETE a card from a deck
router.delete('/:decksId/cards/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndRemove(req.params.id);

        if (!card)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

            return res.send(card);
    }       catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router; 