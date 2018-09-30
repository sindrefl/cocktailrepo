DROP TABLE IF EXISTS cocktail_db.COCKTAILHASINGREDIENT;
DROP TABLE IF EXISTS cocktail_db.COCKTAIL;
DROP TABLE IF EXISTS cocktail_db.INGREDIENT;
DROP TABLE IF EXISTS cocktail_db.CATEGORY;

CREATE TABLE cocktail_db.COCKTAIL(
cocktail_id SERIAL NOT NULL,
name VARCHAR(50),
description VARCHAR(100),
glass VARCHAR(20),
category VARCHAR(50),
alcoholic VARCHAR(20),
img_link VARCHAR(100),
recipe VARCHAR(1000),
PRIMARY KEY(cocktail_id)
);

CREATE TABLE cocktail_db.INGREDIENT(
ingredient_id SERIAL NOT NULL,
name VARCHAR(255),
ing_description VARCHAR(255),
type VARCHAR(50),
isBattery INTEGER,
PRIMARY KEY(ingredient_id)
);

CREATE TABLE cocktail_db.COCKTAILHASINGREDIENT(
cocktail_id INTEGER NOT NULL,
ingredient_id INTEGER NOT NULL,
amount VARCHAR(50),
FOREIGN KEY(cocktail_id) REFERENCES cocktail_db.COCKTAIL(cocktail_id),
FOREIGN KEY(ingredient_id) REFERENCES cocktail_db.INGREDIENT(ingredient_id)
);

CREATE TABLE cocktail_db.CATEGORY(
category_id SERIAL NOT NULL,
name VARCHAR(50),
cat_description VARCHAR(255),
PRIMARY KEY(category_id)
);
