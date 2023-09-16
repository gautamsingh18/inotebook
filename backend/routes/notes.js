const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const NotesModel = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//to fetch all notes :login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await NotesModel.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

//to create a new note : login required
router.post(
  "/createNote",
  fetchUser,
  [
    body("title", "enter a valid title,min length 5").isLength({ min: 5 }),
    body("description", "enter a valid description,min length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(300).json({ errors: errors.array() });
      }
      const note = await NotesModel.create({
        user: req.user.id,
        title,
        description,
        tag,
      });
      return res.status(200).json(note);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
    }
  }
);

//update a norte login requireds
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await NotesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorized");
    }
    note = await NotesModel.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    return res.status(200).json(note);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

//delete a note
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await NotesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send("note not found");
    }
    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("unauthorized");
    }
    await NotesModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: "true" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});
module.exports = router;
