const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("ProductDocument", {
		amountProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
	},{timestamps: false});
};