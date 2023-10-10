const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("Client", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, 
			allowNull: false
		},
		name:{
			type: DataTypes.STRING,
      allowNull: false,
		},
		ruc:{
			type: DataTypes.BIGINT,
			unique: true
		},
		dni:{
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
		},
		address:{
			type: DataTypes.STRING(255),
      unique: true,
			allowNull: false
		}
	},{timestamps: false});
};