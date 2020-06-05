import { DataTypes, Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        // Model attributes are defined here
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        canceled_at: {
          type: DataTypes.DATE,
        },
        past: {
          type: DataTypes.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: DataTypes.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
        modelName: 'Appointment',
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
    );

    this.belongsTo(sequelize.models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(sequelize.models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default Appointment;
