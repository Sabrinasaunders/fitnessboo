const db = require('../config/connection');
const { User, Exercise } = require('../models');
const userSeeds = require('./userSeeds.json');
const exerciseSeeds = require('./exerciseSeeds.json')
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Exercise', 'exercises'); 

    await cleanDB('User', 'users');

    await Exercise.create(exerciseSeeds);
    
    await User.create(userSeeds);

    // Replace this logic with giving users exercises from Object Id's from seeded data.

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
