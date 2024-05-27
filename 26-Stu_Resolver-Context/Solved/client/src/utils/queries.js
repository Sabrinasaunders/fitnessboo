import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      exercises {
        exercise {
          _id
          name
          description
          bodyPart
          equipment
          difficulty
          instructions
        }
        completed
      }
    }
  }
`;

export const QUERY_EXERCISES = gql`
  query getExercises($bodyPart: String) {
    exercises(bodyPart: $bodyPart) {
      _id
      name
      description
      bodyPart
      equipment
      difficulty
      instructions
    }
  }
`;

export const QUERY_SINGLE_EXERCISE = gql`
  query getSingleExercise($exerciseId: ID!) {
    exercise(exerciseId: $exerciseId) {
      _id
      name
      description
      bodyPart
      equipment
      difficulty
      instructions
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      exercises {
        exercise {
          _id
          name
          description
          bodyPart
          equipment
          difficulty
          instructions
        }
        completed
      }
    }
  }
`;
