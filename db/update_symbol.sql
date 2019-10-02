UPDATE symbols SET (symbol_name, img_draw, attributes) = ($1,$2,$3)
WHERE symbol_id = $4;
SELECT * FROM symbols
WHERE symbol_id = $4;