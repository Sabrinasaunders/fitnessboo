const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    exercises: [UserExercise]
  }

  type Exercise {
    _id: ID
    name: String
    description: String
    bodyPart: [String]
    equipment: String
    difficulty: String
    instructions: String
  }

  type UserExercise {
    exercise: Exercise
    completed: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    exercises(bodyPart: String): [Exercise]
    exercise(exerciseId: ID!): Exercise
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExercise(exerciseId: ID!): User
    markExercise(exerciseId: ID!): User
  }
`;

module.exports = typeDefs;
