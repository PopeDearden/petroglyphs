SELECT meaning_text, language, meaning_id FROM meanings
JOIN symbols ON meanings.symbol_id = symbols.symbol_id
WHERE symbols.symbol_id = $1;