import { DataTypes, Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'File', // We need to choose the model name
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
    );
  }
}

export default File;
