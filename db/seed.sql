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