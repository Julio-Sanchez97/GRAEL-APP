const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("Pdf", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, 
			allowNull: false
		},
		documentBase64:{
			type: DataTypes.TEXT("long"),
			allowNull: false
		}
	},{timestamps: true});
};