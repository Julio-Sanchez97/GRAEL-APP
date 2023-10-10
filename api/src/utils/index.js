const { Sede, Role, Documents, Pdf } = require("../db");

/********************* Funciones Auxiliares *********************/

const modifyArrayUsers = async (users) => {
  const arrayUsers = await Promise.all(users.map(async (user) => {
    const sede = await Sede.findByPk(user.SedeId);
    const role = await Role.findByPk(user.RoleId);
    let documents = await Documents.findAll({
      where: { UserId: user.id }
    });
    if (documents) {
      documents = await Promise.all(documents.map(async (document) => {
        const pdf = await Pdf.findByPk(document.PdfId);
        return {
          ...document,
          pdf
        };
      }));
    } else {
      documents = []; // Asigna un array vacío si documents es undefined
    }
    return {
      ...user,
      sede,
      role,
      documents
    };
  }));
  console.log("modify array: ",arrayUsers);
  return arrayUsers;
};


module.exports = {
  modifyArrayUsers
}