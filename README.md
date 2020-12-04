# songbook

List of song text, chords, tabs with links. PERN tech stack.
App available under songbook-cvs.herokuapp.com/

## db

- active : boolean
- added : date
- link : var char
- rate : small int
- tags : Array [char var]
- title : char var
- done : boollean
- picUrl : var char
- id : primary key int

Add an id key column : `ALTER TABLE songbook ADD COLUMN id SERIAL PRIMARY KEY;`