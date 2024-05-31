// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//TODO: Changed the imports below, delete them when ready
// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';
// import LowerBody from '../components/LowerBody';
// import UpperBody from '../components/UpperBody';

import { QUERY_SINGLE_EXERCISE } from '../utils/queries';

const SingleExercise = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { exerciseId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_EXERCISE, {
    // pass URL parameter
    variables: { exerciseId: exerciseId },
  });

  const exercise = data?.exercise || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {exercise.exerciseAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          Did this exercise: {exercise.createdAt}
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
          {exercise.exerciseText}
        </blockquote>
      </div>

      {/* <div className="my-5">
        <CommentList comments={exercise.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm exerciseId={exercise._id} />
      </div> */}
    </div>
  );
};

export default SingleExercise;
