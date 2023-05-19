const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'taxi24_qik',
    password: 'admin',
    port: 5432,
});

pool.on("connect", () => {
  console.log("conectado a la base de datos !!!");
});

const createTables = () => {
  const queryText = 
  `CREATE TABLE IF NOT EXISTS
   conductores(
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(30) NOT NULL,
     telefono VARCHAR(30) NOT NULL,
     email VARCHAR(30) NOT NULL UNIQUE,
     ubicacion VARCHAR(100),
     disponible BOOLEAN
   ); 
  
  CREATE TABLE IF NOT EXISTS  
  pasajeros(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE
  ); 
  
  CREATE TABLE IF NOT EXISTS
  viajes(
    id SERIAL PRIMARY KEY,
    punto_inicio VARCHAR(30),
    punto_destino VARCHAR(30),
    estatus BOOLEAN,
    pasajero_id integer REFERENCES pasajeros (id),
    conductor_id integer REFERENCES conductores (id)
  ); 
  
  CREATE TABLE IF NOT EXISTS  
  facturas(
    id SERIAL PRIMARY KEY,
    viaje_id integer REFERENCES viajes (id) ON DELETE CASCADE,
    pasajero_id integer REFERENCES pasajeros (id) ON DELETE CASCADE,
    conductor_id integer REFERENCES conductores (id) ON DELETE CASCADE,
    monto numeric,
    impuesto numeric
  );`;

  pool
    .query(queryText)
    .then((res) => {
      console.log("Tablas creadas con exito !!!");
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const seedDatabase = () => {
  const queryText = 
    `INSERT INTO conductores (nombre, telefono, email, ubicacion, disponible) 
    VALUES
    ('Jose Guerra', '1234567891', 'jose.guerra@gmail.com', '18.508826,-69.935228', false),
    ('James Whats', '1234567892', 'james.whats@gmail.com', '18.513753,-69.852660', false),
    ('Juan perez', '1234567893', 'juan.perez@gmail.com', '18.535652,-69.871714', true),
    ('Esteban de Jesus', '1234567894', 'estaban.jesus@gmail.com', '18.449134,-69.960056', true),
    ('Mark Anthony', '1234567895', 'mark.anthony@gmail.com', '18.564665,-69.953704', true),
    ('Arnoldo sanchez', '1234567896', 'arnoldo.sanchez@gmail.com', '18.564665,-69.953704', true),
    ('Peter with', '1234567897', 'peter.winter@gmail.com', '18.501160,-69.942734', true);
    
    INSERT INTO pasajeros (nombre, telefono, email)
    VALUES
    ('Quincy Jhones', '9876543211', 'quincy.jones@gmail.com'),
    ('Valentina Quintero', '9876543212', 'valentina.quintero@gmail.com'),
    ('Jaguar Mailk', '9876543213', 'jaguar.malik@gmail.com'),
    ('Jhon With', '9876543215', 'jhon.with@gmail.com');
    
    INSERT INTO viajes (punto_inicio, punto_destino ,estatus, pasajero_id, conductor_id)
    VALUES
    ('18.535652,-69.935228', '18.517038,-69.887881', false, 1, 3),
    ('18.535652,-69.852660', '18.520871,-69.946198', true, 2, 1),
    ('18.535652,-69.871714', '18.486862,-69.945168', false, 3, 1),
    ('18.449134,-69.960056', '18.458858,-69.931778', false, 2, 2),
    ('18.501160,-69.942734', '18.467325,-69.906372', false, 3, 3);
    
    INSERT INTO facturas (pasajero_id, conductor_id, viaje_id, monto, impuesto)
    VALUES
    (1, 1, 2, 800, 80),
    (1, 2, 4, 700, 70),
    (3, 1, 3, 400, 40),
    (4, 1, 1, 900, 90),
    (2, 1, 2, 200, 20);
    `;

  pool
    .query(queryText)
    .then((res) => {
      console.log("Query ejecutado con exito !!!");
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTables = () => {
  const queryText = `
      DROP TABLE IF EXISTS facturas;
      DROP TABLE IF EXISTS viajes;
      DROP TABLE IF EXISTS conductores;
      DROP TABLE IF EXISTS pasajeros; 
      `;

  pool
    .query(queryText)
    .then((res) => {
      console.log("Tablas eliminadas con exito !!!");
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  createTables,
  dropTables,
  seedDatabase,
  query,
};

require("make-runnable");
