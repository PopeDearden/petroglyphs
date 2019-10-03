CREATE TABLE "symbols" (
	"symbol_id" serial NOT NULL,
	"symbol_name" TEXT,
	"img_draw" TEXT,
	"attributes" TEXT,
	CONSTRAINT "symbols_pk" PRIMARY KEY ("symbol_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "meanings" (
	"meaning_id" serial NOT NULL,
	"symbol_id" integer NOT NULL,
	"meaning_text" TEXT NOT NULL,
	"language" TEXT,
	CONSTRAINT "meanings_pk" PRIMARY KEY ("meaning_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "locations" (
	"location_id" serial NOT NULL,
	"location_name" TEXT NOT NULL,
	"long" TEXT,
	"lat" TEXT,
	"location_imgae" TEXT,
	CONSTRAINT "locations_pk" PRIMARY KEY ("location_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "order_symbols" (
	"order_id" serial NOT NULL,
	"symbol_id" integer NOT NULL,
	"location_id" integer NOT NULL,
	"row" integer NOT NULL,
	"column" integer NOT NULL,
	CONSTRAINT "order_symbols_pk" PRIMARY KEY ("order_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "meanings" ADD CONSTRAINT "meanings_fk0" FOREIGN KEY ("symbol_id") REFERENCES "symbols"("symbol_id");


ALTER TABLE "order_symbols" ADD CONSTRAINT "order_symbols_fk0" FOREIGN KEY ("symbol_id") REFERENCES "symbols"("symbol_id");
ALTER TABLE "order_symbols" ADD CONSTRAINT "order_symbols_fk1" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id");


INSERT INTO meanings (symbol_id, meaning_text, language)
VALUES (1, 'The Great Spirit', 'Ojibwa');

SELECT meaning_text, language FROM meanings
JOIN symbols ON meanings.symbol_id = symbols.symbol_id
WHERE symbols.symbol_id = 1;

SELECT * FROM order_symbols
INNER JOIN symbols ON order_symbols.symbol_id = symbols.symbol_id
JOIN locations ON order_symbols.location_id = locations.location_id
WHERE locations.location_id = 5;

INSERT INTO order_symbols (symbol_id, location_id, row, pillar)
VALUES (14, 5, 2, 3);
SELECT * FROM order_symbols;

SELECT * FROM order_symbols
INNER JOIN symbols ON order_symbols.symbol_id = symbols.symbol_id
JOIN locations ON order_symbols.location_id = locations.location_id
WHERE locations.location_id = 5;