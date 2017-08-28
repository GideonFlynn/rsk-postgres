import { Test } from '../../../models';

export const mutation = [
  `
  databaseCreateTest(
    name: String!
  ): DatabaseTest
`,
];

export const resolvers = {
  Mutation: {
    databaseCreateTest: (parent, args) =>
      Test.create({ ...args })
        .then(
          test =>
            // console.log(test.dataValues);

            test.dataValues,
        )
        .catch(err => {
          // console.log(JSON.stringify(err, null, 2));

          throw err.name;
        }),
  },
};
