import DataType from 'sequelize';
import Model from '../sequelize';

const Test = Model.define('Test', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(255),
  },
});

export default Test;
