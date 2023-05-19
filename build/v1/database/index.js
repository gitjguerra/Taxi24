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
  var queryText = "INSERT INTO conductores (nombre, telefono, email, ubicacion, disponible) \n    VALUES\n    ('Jose Guerra', '1234567891', 'jose.guerra@email.com', '18.508826,-69.935228', true),\n    ('James Whats', '1234567892', 'james.whats@email.com', '18.513753,-69.852660', false),\n    ('Juan perez', '1234567893', 'juan.perez@email.com', '18.535652,-69.871714', false),\n    ('Esteban de Jesus', '1234567894', 'estaban.jesus@email.com', '18.449134,-69.960056', true),\n    ('Mark Anthony', '1234567895', 'mark.anthony@email.com', '18.564665,-69.953704', true);\n    ('Arnold swarszeneger', '1234567895', 'arnold.swarszeneger@email.com', '18.503350,-70.017218', true);\n    ('Jhon with', '1234567895', 'jhon.with@gmail.com', '18.501160,-69.942734', true);\n    \n    INSERT INTO pasajeros (nombre, telefono, email)\n    VALUES\n    ('Quincy Jhones', '9876543211', 'quincy.jones@gmail.com'),\n    ('Valentina Quintero', '9876543212', 'valentina.quintero@gmail.com'),\n    ('Jaguar Mailk', '9876543213', 'jaguar.malik@gmail.com'),\n    \n    INSERT INTO viajes (punto_inicio, punto_destino ,estatus, pasajero_id, conductor_id)\n    VALUES\n    ('18.535652,-69.935228', '18.517038,-69.887881', false, 1, 3),\n    ('18.535652,-69.852660', '18.520871,-69.946198', true, 2, 1),\n    ('18.535652,-69.871714', '18.486862,-69.945168', true, 3, 1),\n    ('18.449134,-69.960056', '18.458858,-69.931778', false, 2, 2),\n    ('18.501160,-69.942734', '18.467325,-69.906372', false, 3, 3);\n    \n    INSERT INTO facturas (pasajero_id, conductor_id, viaje_id, monto, impuesto)\n    VALUES\n    (3, 1, 3, 1130, 113),\n    (4, 1, 1, 800, 80),\n    (2, 1, 2, 700, 70);\n    (1, 1, 2, 500, 50),\n    (1, 2, 4, 300, 30),\n    (4, 1, 1, 600, 60),\n    (2, 1, 2, 70, 0.7);\n  ";
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