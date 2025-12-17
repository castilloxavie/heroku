import Accion from '../models/Accion.js';
import { sequelize } from '../databases/db.js';

async function clearTable() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await Accion.truncate();
        console.log('Todos los registros de la tabla "accion" han sido eliminados.');

        process.exit(0);
    } catch (error) {
        console.error('Error al limpiar la tabla:', error);
        process.exit(1);
    }
}

clearTable();
