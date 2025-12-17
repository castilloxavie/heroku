import { sequelize } from "../databases/db.js";
import Accion from "./Accion.js";

await sequelize.sync({ force: true })
console.log("Tabla Accion sincronizada")
