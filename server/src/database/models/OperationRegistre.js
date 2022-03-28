module.exports = (sequelize, DataTypes) => {
    let alias = "OperationRegistre";

    let cols = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        operation_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        detail: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.INTEGER(11)
        }
    }

    let config = {
        tableName: "operation_registres",
        timestamps: false
    }

    const OperationRegistre = sequelize.define(alias, cols, config);

    OperationRegistre.associate = models => {
        OperationRegistre.belongsTo(models.User, {
            as: "registre",
            foreignKey: "user_id"
        })

    }
    return OperationRegistre;
}