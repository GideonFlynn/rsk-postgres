import { Test } from '../../../models';

export const schema = [
  `
  type DatabaseTest {
    id: String
    name: String
    updatedAt: String
    createdAt: String
  }
`,
];

export const queries = [
  `
  databaseGetAllTests: [DatabaseTest]
  databaseGetTest(id: String!): DatabaseTest
`,
];

export const resolvers = {
  RootQuery: {
    databaseGetAllTests: () =>
      Test.findAll({})
        .then(tests =>
          // console.log(JSON.stringify(users, null, 4));

          tests.map(test => test),
        )
        .catch(err => {
          throw err;
        }),
    databaseGetTest: (parent, args) =>
      Test.findOne({
        where: { id: args.id },
      })
        .then(
          test =>
            // console.log(JSON.stringify(user, null, 4));

            test,
        )
        .catch(err => {
          throw err;
        }),
  },
};
