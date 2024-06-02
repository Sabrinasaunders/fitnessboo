import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { DELETE_USER, MARK_EXERCISE, REMOVE_EXERCISE } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data, refetch } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      Auth.logout();
      window.location.href = '/'; 
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    }
  });

  const [markExercise] = useMutation(MARK_EXERCISE, {
    onCompleted: () => {
      refetch(); // Refetch user data to update the UI
    },
    onError: (error) => {
      console.error("Error marking exercise:", error);
    }
  });

  const [removeExercise] = useMutation(REMOVE_EXERCISE, {
    onCompleted: () => {
      refetch(); // Refetch user data to update the UI
    },
    onError: (error) => {
      console.error("Error removing exercise:", error);
    }
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

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const handleMarkExercise = async (exerciseId) => {
    try {
      await markExercise({ variables: { exerciseId } });
    } catch (error) {
      console.error('Error marking exercise:', error);
    }
  };

  const handleRemoveExercise = async (exerciseId) => {
    try {
      await removeExercise({ variables: { exerciseId } });
    } catch (error) {
      console.error('Error removing exercise:', error);
    }
  };

  const totalExercises = user.exercises.length;
  const completedExercises = user.exercises.filter(ex => ex.completed).length;
  const overallProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <h3>Overall Progress</h3>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${overallProgress}%` }}
              aria-valuenow={overallProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {overallProgress.toFixed(2)}% Completed
            </div>
          </div>
          <h3>Your Exercises</h3>
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
                  <div className="progress mb-3">
                    <div
                      className={`progress-bar ${completed ? 'bg-success' : 'bg-warning'}`}
                      role="progressbar"
                      style={{ width: `${completed ? 100 : 50}%` }}
                      aria-valuenow={completed ? 100 : 50}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {completed ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                  {!completed && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMarkExercise(exercise._id)}
                    >
                      Mark as Completed
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveExercise(exercise._id)}
                  >
                    Remove Exercise
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No exercises checkmarked yet.</p>
          )}
        </div>
        

        <div className="col-12 col-md-10 mb-3">
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete My Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
