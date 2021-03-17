const express = require("express");
const router = express.Router();
const { Client } = require("pg");


// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('Randomized:', 'Connected to postgres db!')
  }
})

// GET and randowm row result
router.get("/", async (req, res) => {
  try {
    const randomized = await client.query(`SELECT * FROM songbook WHERE randomized=false`);
    if (randomized.rows.length === 0) {
      await setAllRandomizedToFalse();
      const randomizedNew = await client.query(`SELECT * FROM songbook WHERE randomized=false`);
      const rowChosen = getRandomNumber(randomizedNew.rows.length - 1);
      await setSongToRandomizedTrue(randomizedNew.rows[rowChosen].id);
      res.status(201).json(randomizedNew.rows[rowChosen]);
    } else if (randomized.rows.length === 1) {
      await setAllRandomizedToFalse();
      res.status(201).json(randomized.rows[0]);
    } else {
      const rowChosen = getRandomNumber(randomized.rows.length - 1);
      await setSongToRandomizedTrue(randomized.rows[rowChosen].id);
      res.status(201).json(randomized.rows[rowChosen]);
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// GET and randowm row result (based on "Checked" status)
router.get("/:checked", async (req, res) => {
  try {
    const randomized = await client.query(`SELECT * FROM songbook WHERE checked=${req.params.checked} AND randomized=false`);
    if (randomized.rows.length === 0) {
      await setAllRandomizedToFalse();
      const randomizedNew = await client.query(`SELECT * FROM songbook WHERE checked=${req.params.checked} AND randomized=false`);
      const rowChosen = getRandomNumber(randomizedNew.rows.length - 1);
      await setSongToRandomizedTrue(randomizedNew.rows[rowChosen].id);
      res.status(201).json(randomizedNew.rows[rowChosen]);
    } else if (randomized.rows.length === 1) {
      await setAllRandomizedToFalse();
      res.status(201).json(randomized.rows[0]);
    } else {
      const rowChosen = getRandomNumber(randomized.rows.length - 1);
      await setSongToRandomizedTrue(randomized.rows[rowChosen].id);
      res.status(201).json(randomized.rows[rowChosen]);
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});


// Function to set back all randomise to false
const setAllRandomizedToFalse = async () => {
  try {
    await client.query(`UPDATE songbook SET randomized=false`);
  }
  catch (err) {
    console.log(err);
  }
}

// Set Song as already randomized (=have been the result of the randomizer already)
const setSongToRandomizedTrue = async (id) => {
  try {
    await client.query(`UPDATE songbook SET randomized=true WHERE id=${id}`);
  }
  catch (err) {
    console.log(err);
  }
}

const getRandomNumber = (max) => {
  const random = Math.floor(Math.random() * (max + 1));
  return random;
}

module.exports = router;



