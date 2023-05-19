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
    ('John Doe', '0784758395', 'john.doe@email.com', '-1.956537,30.063616', true),
    ('Allan Smith', '0784758305', 'allan.smith@email.com', '-1.971142,30.103683', false),
    ('John Gakuba', '0784758315', 'john.gakuba@email.com', '-1.949549,30.126161', false),
    ('Henry Mugenzi', '0784752395', 'henry.mugenzi@email.com', '-1.978963,30.223335', true),
    ('Manzi Eric', '0784758395', 'manzi.eric@email.com', '-1.977940,30.043773', true);
    
    INSERT INTO pasajeros (nombre, telefono, email)
    VALUES
    ('Laura inema', '0786893958', 'laura.inema@email.com'),
    ('Chris Rock', '0787940695', 'chris.rock@email.com'),
    ('Bushido Bushali', '0780033958', 'bushido.bushali@email.com'),
    ('Maleek Berry', '0734895855', 'maleek.berry@email.com'),
    ('Mike Kayehuri', '0769785498', 'mike.kayehura@email.com');
    
    INSERT INTO viajes (punto_inicio, punto_destino ,estatus, pasajero_id, conductor_id)
    VALUES
    ('-1.977940,30.043773', '-1.956537,30.063616', false, 1, 3),
    ('-1.978963,30.223335', '-1.956537,30.063616', true, 2, 1),
    ('-1.949549,30.126161', '-1.956537,30.063616', true, 3, 1),
    ('-1.971142,30.103683', '-1.956537,30.063616', false, 2, 2),
    ('-1.971142,30.103683', '-1.956537,30.063616', false, 3, 3);
    
    INSERT INTO facturas (pasajero_id, conductor_id, viaje_id, monto, impuesto)
    VALUES
    (1, 1, 2, 5000, 0.5),
    (1, 2, 4, 6938, 0.7),
    (3, 1, 3, 4903, 0.5),
    (4, 1, 1, 9000, 0.9),
    (2, 1, 2, 9038, 0.9);
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
