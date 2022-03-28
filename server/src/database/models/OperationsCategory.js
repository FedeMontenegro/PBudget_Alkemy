module.exports = (sequelize, DataTypes) => {
    let alias = "OperationsCategory";
    let cols = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        user_id : {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config = {
        tableName: "operations_categories",
        timestamps: false
    }

    let OperationsCategory = sequelize.define(alias, cols, config);

    OperationsCategory.associate = models => {
        OperationsCategory.hasMany(models.Operation, {
            as: "category",
            foreignKey: "operation_category_id"
        })

        OperationsCategory.belongsTo(models.User, {
            as: "userCategory",
            foreignKey: "user_id"
        })
    }
    return OperationsCategory;
}