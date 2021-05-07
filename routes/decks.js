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

//GET all cards in a deck
router.get('/:id/cards', async (req, res) => {
 try {
 const deck = await Deck.findById(req.params.id);
   // console.log(deck);

 if (!deck)
    return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);

    return res.send(deck.cards);
 } catch (ex) {
 return res.status(500).send(`Internal Server Error: ${ex}`);
 }
});

//GET a specific card by id linked to a deck's id
router.get('/:decksId/cards/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.decksId);

        if (!deck)
            return res.status(400).send(`The product with id "${req.params.decksId} does not exist.`);
        const card = await deck.cards.id(req.params.id);
        if (!card) return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
            return res.send(card);
 }       catch (ex) {
            return res.send(500).send(`Internal Server Error: ${ex}`);
    }
});

//POST new deck
router.post('/', async (req, res) => {
    try {
        const { error } = validateDeck(req.body);
        if (error) return res.status(400).send(error);
        const deck = new Deck({
            name: req.body.name,
            subject: req.body.subject,
            cards: req.body.cards,
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




//POST a new card to a deck
router.post('/:id/cards', async (req, res) => {
    try {
         const { error } = validate(req.body);
       if (error) return res.status(400).send(error);

        const card = new Card({
            question: req.body.question,
            answer: req.body.answer,
        });

       const deck = await Deck.findById(req.params.id);
       deck.cards.push(card);
        await deck.save();
        return res.send(deck.cards);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


//UPDATE a specific card in a deck
router.put('/:decksId/cards/:id', async (req, res) => {
    try {
       const { error } = validate(req.body);
       if (error) return res.status(400).send(error);

        const deck = await Deck.findById(req.params.decksId);
        if (!deck) return res.status(400).send(`The deck with the id: "$req.params.decksId}" does not exist.`);
        
        const card = await deck.cards.id(
            req.params.id);
            if (!card) return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);

            card.question = req.body.question;
            card.answer = req.body.answer;
        
            await deck.save();

            return res.send(deck);
    }       catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);

    }
});


//DELETE a card from a deck
router.delete('/:decksId/cards/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.decksId);

        if (!deck)
            return res.status(400).send(`The deck with id "${req.params.decksId}" does not exist.`);
        const card = deck.cards.id(req.params.id);
        if (!card)
            return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
        deck.cards.id(req.params.id).remove();
        await deck.save();
        return res.send(deck.cards);
    }       catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router; 