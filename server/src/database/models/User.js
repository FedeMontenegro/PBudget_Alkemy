module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.hasMany(models.Operation, {
            as: "operation",
            foreignKey: "user_id"
        })

        User.hasMany(models.OperationRegistre, {
            as: "registre",
            foreignKey: "user_id"
        })

        User.hasMany(models.OperationsCategory, {
            as: "userCategory",
            foreignKey: "user_id"
        })
    }
    
    return User;
}