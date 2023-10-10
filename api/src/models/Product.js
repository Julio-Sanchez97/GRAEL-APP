const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("Product", {
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, 
			allowNull: false
		},
		name:{
			type: DataTypes.STRING(255),
      unique: true,
			allowNull: false,
		},
		code:{
			type: DataTypes.STRING(64),
			unique: true,
			allowNull: false,
		},
		price:{
			type:DataTypes.BIGINT,
			allowNull: false
		},
		weight:{
			type: DataTypes.DOUBLE,
			allowNull:false
		}
	},{timestamps: false});
};