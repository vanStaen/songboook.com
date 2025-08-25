const router = require("express").Router();
const { randomService } = require("../service/randomService");

// GET and randowm row result
router.get("/", async (_, res) => {
  try {
    let neverPickedUpSong = await randomService.getNeverPickedUpSong();
    if (neverPickedUpSong.length === 0) {
      // if no row found, reset all and retry
      await randomService.setAllSongToRandomizedToFalse();
      neverPickedUpSong = await randomService.getNeverPickedUpSong();  
    } else if (neverPickedUpSong.length === 1) {
      // if last row found, reset all
      await setAllSongToRandomizedToFalse();
    }
    const chosenRow = await randomService.getRandomNumber(neverPickedUpSong.length - 1);
    await randomService.setSongToRandomizedToTrue(neverPickedUpSong[chosenRow].id);
    res.status(201).json(neverPickedUpSong[chosenRow].id);
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// GET and randowm row result (based on "Checked" status)
router.get("/:checked", async (req, res) => {
  try {
    let neverPickedUpSong = await randomService.getNeverPickedUpSong(req.params.checked);
    if (neverPickedUpSong.length === 0) {
      // if no row found, reset all and retry
      await randomService.setAllSongToRandomizedToFalse(req.params.checked);
      neverPickedUpSong = await randomService.getNeverPickedUpSong(req.params.checked);  
    } else if (neverPickedUpSong.length === 1) {
      // if last row found, reset all
      await setAllSongToRandomizedToFalse(req.params.checked);
    } 
    const chosenRow = await randomService.getRandomNumber(neverPickedUpSong.length - 1);
    await randomService.setSongToRandomizedToTrue(neverPickedUpSong[chosenRow].id);
    res.status(201).json(neverPickedUpSong[chosenRow].id);
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});



module.exports = router;
