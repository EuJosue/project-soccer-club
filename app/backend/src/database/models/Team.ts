import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  declare teamName: string;
}

Team.init({
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'team',
  tableName: 'teams',
  timestamps: false,
});

export default Team;
