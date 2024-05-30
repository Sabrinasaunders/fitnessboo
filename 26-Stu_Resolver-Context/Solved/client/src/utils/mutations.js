import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise($exerciseId: ID!) {
    addExercise(exerciseId: $exerciseId) {
      _id
      username
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

export const MARK_EXERCISE = gql`
  mutation markExercise($exerciseId: ID!) {
    markExercise(exerciseId: $exerciseId) {
      _id
      username
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

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
      username 
    }
  }
`;