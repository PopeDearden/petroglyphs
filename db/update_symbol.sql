UPDATE symbols SET (symbol_name, img_draw, attributes, type) = ($1,$2,$3,$5)
WHERE symbol_id = $4;
SELECT * FROM symbols
WHERE symbol_id = $4;