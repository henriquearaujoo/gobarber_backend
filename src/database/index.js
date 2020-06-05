import Sequelize from 'sequelize';
import mongoogse from 'mongoose';
import dataBaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [File, User, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models.map((model) => model.init(this.connection));
  }

  mongo() {
    this.mongoconnection = mongoogse.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
