const { Client } = require("pg");
const getfirstResultGoogleSearch = require('../helpers/getfirstResultGoogleSearch')

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
    try {
        const songbook = await client.query('SELECT * FROM songbook ORDER BY id ASC;');
        return songbook.rows;
    } catch (err) {
        console.log(err);
    }
}

const udpateDatabaseRow = async (id, geniusurl) => {
    try {
        const updateQuery = "UPDATE songbook SET geniusurl='" + geniusurl + "' WHERE id=" + id;
        console.log(updateQuery);
        await client.query(updateQuery);
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
        if (row.id !== null) {
            getfirstResultGoogleSearch(['"' + artist.split(' ').join('","'), song.split(" ").join("', '") + '"', 'lyrics', 'genius'])
                .then(geniusurl => {
                    if (geniusurl.includes("genius.com")) {
                        udpateDatabaseRow(row.id, geniusurl);
                    }
                })
                .catch(err => { console.log(err) });
        }
    });
}

run();