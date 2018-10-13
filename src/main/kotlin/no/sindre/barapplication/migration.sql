ALTER TABLE cocktail_db.cocktail ADD image bytea;
ALTER TABLE cocktail_db.cocktail ADD image_filename VARCHAR(70);

update cocktail_db.cocktail set name='Autodafe' where cocktail_id=227
update cocktail_db.cocktail set name='Frappe' where cocktail_id=233