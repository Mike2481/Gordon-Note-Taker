const router = require("express").Router();
const store = require("../db/store");
const { notes } = require('../db/db.json');

// get existing notes

router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then(notes => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// post note - needs to have body

router.post("/notes", (req, res) => {
  store
    .writeNote(req.body)
    .then(notes => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete note

// router.delete('/notes', (req, res) => {

// })

module.exports = router;
