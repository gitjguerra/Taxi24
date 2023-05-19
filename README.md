### Project built
- NodeJS
- ExpressJS
- PostGreSQL

### How test
- import the postman script in your system located in /docs directory and try the taxi24 endpoints

### Getting Started
- `$ cd taxi24`
- Run `$ yarn install` or `$ npm install` to install the package dependencies
- crear una base de datos postgress con el nombre de `taxi24_qik`
- crear e insertar datos `$ yarn run db:create` creará la tablas y los datos necesarios
- `$ yarn start-dev` iniciar servidor de desarrollo,
- `$ yarn start` iniciar servidor en produccion

### Endpoints disponibles

## conductores
api/v1/drivers                  => Get a list of all drivers                                              
api/v1/drivers/available        => Get a list of all available drivers                                    
api/v1/drivers/available/range  => Get a list of all available drivers within 3km for a specific location (parmeters myLocation and range(optional))
api/v1/drivers/{id}             => Get a specific driver by ID  (parameters id)

## viajes
api/v1/trips/{id}/complete      => Complete a trip   => PUT
api/v1/trips                    => Create a new ‘Trip’ request by assigning a driver to a rider (parameters departure, destination, riderId, driverId)       
api/v1/trips                    => Get a list of all trips                                                

## pasajeros
api/v1/riders                   => Get a list of all riders                                               
api/v1/riders/{id}              => Get a specific rider by ID   (parameters id)
api/v1/riders/closest           => For a specific driver, get a list of the 3 closest drivers  (parameters myLocation y threshold(optional))

## facturas
api/v1/invoices                 => Get a list of all invoices                                             
api/v1/invoice                  => Post a new invoice                                             


### Estructure del Proyecto
```bash
├── app
│   └── v1
│      ├── controllers
│      │     ├── driverController.js
│      │     ├── riderController.js
│      │     └── tripController.js
│      ├── database
│      │     ├── Driver.js
│      │     ├── Invoice.js
│      │     ├── Rider.js
│      │     ├── Trip.js
│      │     └── index.js
│      ├── helpers
│      │     └── helpers.js
│      ├── middlewares
│      │     ├── error.js
│      │     ├── modelValidator.js
│      │     └── validators.js
│      ├── routes
│      │     ├── index.js
│      │     ├── riderRoutes.js
│      │     ├── tripRoutes.js
│      │     ├── driverRoutes.js
│      │     └── invoiceRoutes.js
│      └── server.js
│   
├── build
├── node_modules
├── .bablrc
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```