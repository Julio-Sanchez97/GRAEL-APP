const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("UnidadMedida", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, 
			allowNull: false
		},
		name:{
			type: DataTypes.STRING(255),
			unique: true,
      allowNull: false
		},
    simbolo:{
      type: DataTypes.STRING(64),
			unique: true,
      allowNull: false
    }
	},{timestamps: false});
};