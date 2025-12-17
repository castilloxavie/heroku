import { DataTypes } from "sequelize";

import { sequelize } from "../databases/db.js";

const Accion =  sequelize.define(
    "Accion",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        tipo_accion: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        selector: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false
        },

        detalles: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        tableName: "accion",
        timestamps: false
    }
)

export default Accion;
