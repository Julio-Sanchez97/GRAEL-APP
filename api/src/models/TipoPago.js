const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("TipoPago", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, 
			allowNull: false
		},
		name:{
			type: DataTypes.STRING,
			unique: true,
      allowNull: false
		}
	},{timestamps: false});
};