// const { AuthenticationError } = require('apollo-server-express');  Do i need this???
const { User, Thought, Exercise } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('exercises.exercise');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('exercises.exercise');
    },
    exercises: async (parent, { bodyPart }) => {
      const params = bodyPart ? { bodyPart } : {};
      return Exercise.find(params);
    },
    exercise: async (parent, { exerciseId }) => {
      return Exercise.findOne({ _id: exerciseId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('exercises.exercise');
      }
      throw new AuthenticationError('You need to be logged in!');;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {
        const exercise = await Exercise.findById(exerciseId);

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { exercises: { exercise, completed: false } } },
          { new: true }
        );

        return User.findById(context.user._id).populate('exercises.exercise');
      }
      throw AuthenticationError('You need to be logged in!');

    },
    markExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id, 'exercises.exercise': exerciseId },
          { $set: { 'exercises.$.completed': true} },
          { new: true }
        );

        return User.findById(context.user._id).populate('exercises.exercise');
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
