const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("Role", {
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
    code: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    }
	},{timestamps: false});
};