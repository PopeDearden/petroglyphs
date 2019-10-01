SELECT meaning_text, language FROM meanings
JOIN symbols ON meanings.symbol_id = symbols.symbol_id
WHERE symbols.symbol_id = $1;