// Import the `useParams()` hook
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

//TODO: Changed the imports below, delete them when ready
// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';
// import LowerBody from '../components/LowerBody';
// import UpperBody from '../components/UpperBody';

import { QUERY_SINGLE_EXERCISE, QUERY_ME } from '../utils/queries';
import { ADD_EXERCISE } from '../utils/mutations';
import Auth from '../utils/auth';

const SingleExercise = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { exerciseId } = useParams();
  const navigate = useNavigate();

  if (!Auth.loggedIn()) {
    navigate('/login');
  }

  const { loading, data, refetch } = useQuery(QUERY_SINGLE_EXERCISE, {
    // pass URL parameter
    variables: { exerciseId: exerciseId },
  });

  const { data: userData } = useQuery(QUERY_ME);

  const [addExercise] = useMutation(ADD_EXERCISE, {
    onCompleted: () => {
      console.log('Exercise added to profile');
    },
    onError: (error) => {
      console.error('Error adding exercise:', error);
    }
  });

  const exercise = data?.exercise || {};
  const user = userData?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const existingExercise = user.exercises.find(
    (ex) => ex.exercise._id === exerciseId
  );

  const handleAddExercise = async () => {
    const existingExercise = user.exercises.find(
      (ex) => ex.exercise._id === exerciseId
    );

    if (existingExercise) {
      console.log('Exercise already added to your profile');
      return;
    }

    try {
      await addExercise({ variables: { exerciseId } });
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {exercise.name} <br />
        <span style={{ fontSize: '1rem' }}>
          Add this Exercise: {exercise.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
          
        >
          <p><strong>Description:</strong> {exercise.description}</p>
          <p><strong>Body Part:</strong> {exercise.bodyPart.join(', ')}</p>
          <p><strong>Equipment:</strong> {exercise.equipment}</p>
          <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
          <p><strong>Instructions:</strong> {exercise.instructions}</p>
        </blockquote>
      </div>
      {existingExercise ? (
        <div className="alert alert-warning" role="alert">
          This exercise is already in your profile.
        </div>
      ) : (
        <button className="btn btn-primary" onClick={handleAddExercise}>
          Add to My Exercises
        </button>
      )}
    </div>
  );
};

export default SingleExercise;
