const { Client } = require("pg");
const getFirstResultFromGoogleSearch = require('./helpers/getFirstResultFromGoogleSearch')

// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Connected to postgres db!')
    }
})

const getAllRows = async () => {
    // GET all data from songbook
    try {
        const songbook = await client.query('SELECT * FROM songbook ORDER BY id ASC;');
        return songbook.rows;
    } catch (err) {
        console.log(err);
    }
}

const run = async () => {
    const rows = await getAllRows();
    rows.forEach((row) => {
        //console.log(row.artist, row.song, row.id); 
        const artist = row.artist.replace("'", "");
        const song = row.song.replace("'", "");
        if (row.id === 4) {
            getFirstResultFromGoogleSearch(['"' + artist.split(' ').join('","'), song.split(" ").join("', '") + '"', 'lyrics', 'genius'])
                .then(geniusurl => { console.log(geniusurl) })
                .catch(err => { console.log(err) });
        }
    });
}

run();