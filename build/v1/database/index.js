"use strict";

var _require = require("pg"),
    Pool = _require.Pool;

var dotenv = require("dotenv");

dotenv.config();
var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taxi24_qik',
  password: 'admin',
  port: 5432
});
pool.on("connect", function () {
  console.log("conectado a la base de datos !!!");
});

var createTables = function createTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n   conductores(\n     id SERIAL PRIMARY KEY,\n     nombre VARCHAR(30) NOT NULL,\n     telefono VARCHAR(30) NOT NULL,\n     email VARCHAR(30) NOT NULL UNIQUE,\n     ubicacion VARCHAR(100),\n     disponible BOOLEAN\n   ); \n  \n  CREATE TABLE IF NOT EXISTS  \n  pasajeros(\n    id SERIAL PRIMARY KEY,\n    nombre VARCHAR(30) NOT NULL,\n    telefono VARCHAR(30) NOT NULL,\n    email VARCHAR(30) NOT NULL UNIQUE\n  ); \n  \n  CREATE TABLE IF NOT EXISTS\n  viajes(\n    id SERIAL PRIMARY KEY,\n    punto_inicio VARCHAR(30),\n    punto_destino VARCHAR(30),\n    estatus BOOLEAN,\n    pasajero_id integer REFERENCES pasajeros (id),\n    conductor_id integer REFERENCES conductores (id)\n  ); \n  \n  CREATE TABLE IF NOT EXISTS  \n  facturas(\n    id SERIAL PRIMARY KEY,\n    viaje_id integer REFERENCES viajes (id) ON DELETE CASCADE,\n    pasajero_id integer REFERENCES pasajeros (id) ON DELETE CASCADE,\n    conductor_id integer REFERENCES conductores (id) ON DELETE CASCADE,\n    monto numeric,\n    impuesto numeric\n  );";
  pool.query(queryText).then(function (res) {
    console.log("Tablas creadas con exito !!!");
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var seedDatabase = function seedDatabase() {
  var queryText = "INSERT INTO conductores (nombre, telefono, email, ubicacion, disponible) \n    VALUES\n    ('John Doe', '0784758395', 'john.doe@email.com', '-1.956537,30.063616', true),\n    ('Allan Smith', '0784758305', 'allan.smith@email.com', '-1.971142,30.103683', false),\n    ('John Gakuba', '0784758315', 'john.gakuba@email.com', '-1.949549,30.126161', false),\n    ('Henry Mugenzi', '0784752395', 'henry.mugenzi@email.com', '-1.978963,30.223335', true),\n    ('Manzi Eric', '0784758395', 'manzi.eric@email.com', '-1.977940,30.043773', true);\n    \n    INSERT INTO pasajeros (nombre, telefono, email)\n    VALUES\n    ('Laura inema', '0786893958', 'laura.inema@email.com'),\n    ('Chris Rock', '0787940695', 'chris.rock@email.com'),\n    ('Bushido Bushali', '0780033958', 'bushido.bushali@email.com'),\n    ('Maleek Berry', '0734895855', 'maleek.berry@email.com'),\n    ('Mike Kayehuri', '0769785498', 'mike.kayehura@email.com');\n    \n    INSERT INTO viajes (punto_inicio, punto_destino ,estatus, pasajero_id, conductor_id)\n    VALUES\n    ('-1.977940,30.043773', '-1.956537,30.063616', false, 1, 3),\n    ('-1.978963,30.223335', '-1.956537,30.063616', true, 2, 1),\n    ('-1.949549,30.126161', '-1.956537,30.063616', true, 3, 1),\n    ('-1.971142,30.103683', '-1.956537,30.063616', false, 2, 2),\n    ('-1.971142,30.103683', '-1.956537,30.063616', false, 3, 3);\n    \n    INSERT INTO facturas (pasajero_id, conductor_id, viaje_id, monto, impuesto)\n    VALUES\n    (1, 1, 2, 5000, 0.5),\n    (1, 2, 4, 6938, 0.7),\n    (3, 1, 3, 4903, 0.5),\n    (4, 1, 1, 9000, 0.9),\n    (2, 1, 2, 9038, 0.9);\n  ";
  pool.query(queryText).then(function (res) {
    console.log("Query ejecutado con exito !!!");
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var dropTables = function dropTables() {
  var queryText = "\n      DROP TABLE IF EXISTS facturas;\n      DROP TABLE IF EXISTS viajes;\n      DROP TABLE IF EXISTS conductores;\n      DROP TABLE IF EXISTS pasajeros; \n      ";
  pool.query(queryText).then(function (res) {
    console.log("Tablas eliminadas con exito !!!");
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var query = function query(text, params) {
  return new Promise(function (resolve, reject) {
    pool.query(text, params).then(function (res) {
      resolve(res);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

module.exports = {
  createTables: createTables,
  dropTables: dropTables,
  seedDatabase: seedDatabase,
  query: query
};

require("make-runnable");
//# sourceMappingURL=index.js.map