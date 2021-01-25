# songbook
or `what song can you play, again?`.

List of song text, chords, tabs with links. PERN tech stack.
App available under  https://songbook.vanstaen.com/

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
- genius : var char
- bass : boolean
- piano : boolean


Add an id key column : `ALTER TABLE songbook ADD COLUMN id SERIAL PRIMARY KEY;`

## Lyrics

We are getting the lyrics from an api https://apiseeds.com/documentation/lyrics.
As a fallback we crawl the data from the "genius website".
