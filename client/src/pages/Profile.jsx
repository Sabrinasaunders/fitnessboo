import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <h3>Checkmarked Exercises</h3>
          {user.exercises.length ? (
            user.exercises.map(({ exercise, completed }) => (
              <div key={exercise._id} className="card mb-3">
                <h4 className="card-header bg-primary text-light p-2 m-0">
                  {exercise.name}
                </h4>
                <div className="card-body bg-light p-2">
                  <p><strong>Description:</strong> {exercise.description}</p>
                  <p><strong>Body Part:</strong> {exercise.bodyPart.join(', ')}</p>
                  <p><strong>Equipment:</strong> {exercise.equipment}</p>
                  <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                  <p><strong>Instructions:</strong> {exercise.instructions}</p>
                  <p><strong>Completed:</strong> {completed ? "Yes" : "No"}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No exercises checkmarked yet.</p>
          )}
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
