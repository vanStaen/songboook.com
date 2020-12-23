# songbook

List of song text, chords, tabs with links. PERN tech stack.
App available under songbook-cvs.herokuapp.com/

## db

- active : boolean
- added : date (default now())
- link : var char
- checked : boolean (check was problematic)
- tags : Array [char var]
- title : char var
- picUrl : var char
- bookmark : boolean
- id : primary key int
- artist : var char
- songname : var char
- videourl : var char

Add an id key column : `ALTER TABLE songbook ADD COLUMN id SERIAL PRIMARY KEY;`

## Lyrics APIs

We are using as first Lyrics api https://apiseeds.com/documentation/lyrics and as a fallback, https://genius.com/api-clients. Here is a link on how to get lyrics from genius with node: https://cmichel.io/song-lyrics-in-nodejs