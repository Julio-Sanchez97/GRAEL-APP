const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("Sede", {
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
      autoIncrement: true,
      allowNull: false
		},
		code: {
			type: DataTypes.STRING(64),
			unique: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(64),
      unique: true,
			allowNull: false
		},
		ruc:{
			type: DataTypes.BIGINT,
      defaultValue: 88888888888,
		},
		address:{
			type: DataTypes.STRING(255),
      unique: true,
			allowNull: false
		},
		countryCode:{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		email:{
			type: DataTypes.STRING(255),
      unique: true,
			allowNull: false
		},
		phoneNumber:{
			type: DataTypes.BIGINT,
			unique: true,
			allowNull: false
		},
    amountDocuments: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
		defaultSerieNumber:{
			type: DataTypes.BIGINT,
      defaultValue: 1000000000,
		}
	},{timestamps: false});
};