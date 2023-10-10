const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("Document", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, 
			allowNull: false
		},
		precio: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		cantidadMedida: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		retornoCargo:{
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		serieRegister:{
			type: DataTypes.STRING(255),
			unique:true
		},
	},{timestamps: true});
};