-- 'added' is a timestamp set per default to now()
-- 'active' is set to true per default
INSERT INTO public.songbook(
	link, active, tags, title)
	VALUES ('the link', true, ARRAY [ 'artist','genre'], 'The title');