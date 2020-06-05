import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.VIRTUAL,
        },
        password_hash: {
          type: DataTypes.STRING,
        },
        provider: {
          type: DataTypes.BOOLEAN,
        },
      },
      {
        sequelize,
        modelName: 'User',
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
    );

    // gatiho do sequelize, no caso para executar antes de SALVAR
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password_hash = hash;
      }
    });

    // adiciona um relacionamento com tabela files
    this.belongsTo(sequelize.models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
  }

  // verifica o password usando o bcrypt
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
