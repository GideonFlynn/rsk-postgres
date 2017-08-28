import { merge } from 'lodash';

/* Queries */
import {
  schema as GetAllUsers,
  queries as GetAllUsersQueries,
  resolvers as GetAllUsersResolver,
} from './users/GetAllUsers';

import {
  schema as GetAllTests,
  queries as GetAllTestsQueries,
  resolvers as GetAllTestsResolver,
} from './test/GetAllTests';

/* Mutations */
import {
  mutation as CreateUser,
  resolvers as CreateUserResolver,
} from './users/CreateUser';

import {
  mutation as CreateTest,
  resolvers as CreateTestResolver,
} from './test/CreateTest';

// Merge all of the resolver objects together
export const resolvers = merge(
  GetAllUsersResolver,
  CreateUserResolver,
  GetAllTestsResolver,
  CreateTestResolver,
);
// Put schema together into one array of schema strings
export const schema = [...GetAllUsers, ...GetAllTests];

export const mutations = [...CreateUser, ...CreateTest];

export const queries = [...GetAllUsersQueries, ...GetAllTestsQueries];
