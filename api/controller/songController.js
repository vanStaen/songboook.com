const express = require("express");
const router = express.Router();

const { songService } = require("../service/songService");

// GET all data from songbook
router.get("/", async (req, res) => {
  try {
    const song = await songService.getAllSong();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET single data from songbook (based on id)
router.get("/:id", async (req, res) => {
  try {
    const song = await songService.getSongById(req.params.id);
    if (song) {
      res.status(201).json(song);
    } else {
      res.status(400).json({
        error: `No data found with id#${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// DELETE single data from songbook (based on id)
router.delete("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    await songService.deleteSong(req.params.id);
    res.status(200).json({
      success: `Song #${req.params.id} has been deleted.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// POST new song
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    if (!req.body.artist) {
      throw new Error(`No artist name was provided!`);
    }
    if (!req.body.song) {
      throw new Error(`No song title was provided!`);
    }
    await songService.addSong(req.body, req.userId);
    res.status(201).json({ message: "Success! Song has been created." });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// PATCH single data from song(based on id)
router.patch("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const updatedSong = await songService.updateSong(req.params.id, req.body);
    res.status(201).json(updatedSong);
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
