import { User } from '../../../models';

export const mutation = [
  `
  databaseCreateUser(
    name: String!
  ): DatabaseUser
`,
];

export const resolvers = {
  Mutation: {
    databaseCreateUser: (parent, args) =>
      User.create({ ...args })
        .then(
          user =>
            // console.log(user.dataValues);

            user.dataValues,
        )
        .catch(err => {
          // console.log(JSON.stringify(err, null, 2));

          throw err.name;
        }),
  },
};
