module.exports = (sequelize, DataTypes) => {
    let alias = "Operation";
    let cols = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        operation_category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(15),
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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        }
    }

    let config = {
        tableName: "operations",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false
    }

    const Operation = sequelize.define(alias, cols, config);

    Operation.associate = models => {
        Operation.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })

        Operation.belongsTo(models.OperationsCategory, {
            as: "category",
            foreignKey: "operation_category_id"
        })

    }
    return Operation;
}