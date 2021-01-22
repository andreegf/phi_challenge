TABELA USERS
CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" varchar NOT NULL, "email" varchar NOT NULL,
"password" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))

TABELA MOVIES
CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" varchar NOT NULL, "director" varchar NOT NULL, "quantity" int NOT NULL, "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))

TABELA RENTS
CREATE TABLE "rents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "movie_id" uuid NOT NULL,
"start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "return_date" TIMESTAMP WITH TIME ZONE , "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now(), CONSTRAINT "PK_43a9961f1448a8d75f9b25156ea" PRIMARY KEY ("id"))
ALTER TABLE "rents" ADD CONSTRAINT "rentUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
ALTER TABLE "rents" ADD CONSTRAINT "rentMovie" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE SET NULL ON
UPDATE CASCADE
