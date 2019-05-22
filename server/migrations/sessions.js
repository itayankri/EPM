module.exports = {
    /*
    CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
  
    */
    up: (queryInterface, Sequelize) =>
      queryInterface.sequelize.query('CREATE TABLE "session" ("sid" varchar NOT NULL COLLATE "default","sess" json NOT NULL, "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE); ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;'),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('session'),
  };


