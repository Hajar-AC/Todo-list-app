/* eslint-disable prettier/prettier */
const sequelize = require("./config/database"); // Assurez-vous que ce chemin est correct pour votre projet

async function resetAutoIncrement() {
  try {
    await sequelize.query("ALTER TABLE Todos AUTO_INCREMENT = 1;");
    console.log("Auto-increment for Todos table has been reset.");
  } catch (error) {
    console.error("Error resetting auto-increment:", error);
  } finally {
    await sequelize.close(); // Ferme la connexion à la base de données
  }
}

resetAutoIncrement();
