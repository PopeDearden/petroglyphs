INSERT INTO symbols (symbol_name, img_draw, attributes) 
VALUES ($1, $2, $3);
SELECT * FROM symbols;