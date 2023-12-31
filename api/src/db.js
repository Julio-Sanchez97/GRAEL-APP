require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST , DB_NAME, DB_DEPLOY } = process.env;

// Configura la conexión a la base de datos MySQL de manera local
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: 'mysql',
//     logging: false
//   });

// Configura la conexión a la base de datos MySQL para deploy
const sequelize = new Sequelize(DB_DEPLOY, {
  dialect: 'mysql',
  logging: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
//console.log(sequelize.models);
// Para relacionarlos hacemos un destructuring
const { User, Document, Sede, Product, Client, Pdf, Role, TipoPago, UnidadMedida, ProductDocument } = sequelize.models;

// Relaciones principales(Uno a Muchos)
User.hasMany(Document);
Document.belongsTo(User);

Client.hasMany(Document);
Document.belongsTo(Client);

Sede.hasMany(Document);
Document.belongsTo(Sede);

Sede.hasMany(User);
User.belongsTo(Sede);

Role.hasMany(User);
User.belongsTo(Role)

// Relacion Muchos a Muchos
Document.belongsToMany(Product, {through: ProductDocument});
Product.belongsToMany(Document, {through: ProductDocument});

//Relaciones secundarias del modelo Document(Uno a Uno)
Pdf.hasOne(Document);
Document.belongsTo(Pdf);

TipoPago.hasOne(Document);
Document.belongsTo(TipoPago);

UnidadMedida.hasOne(Document);
Document.belongsTo(UnidadMedida);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};