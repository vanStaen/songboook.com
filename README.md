# songbook

List of song text, chords, tabs with links. PERN tech stack.
App available under songbook-cvs.herokuapp.com/

## db

- active : boolean
- added : date (default now())
- link : var char
- rate : small int
- tags : Array [char var]
- title : char var
- done : boollean
- picUrl : var char
- bookmark : boolean
- id : primary key int
- artist : var char
- songname : var char
- videourl : var char

Add an id key column : `ALTER TABLE songbook ADD COLUMN id SERIAL PRIMARY KEY;`

## Lyrics API

https://apiseeds.com/documentation/lyrics