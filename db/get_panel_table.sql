SELECT * FROM order_symbols
INNER JOIN symbols ON order_symbols.symbol_id = symbols.symbol_id
JOIN locations ON order_symbols.location_id = locations.location_id
WHERE locations.location_id = $1
ORDER BY order_symbols.pillar ASC;