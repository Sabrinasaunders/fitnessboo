import { Link } from 'react-router-dom';
const ExerciseList = ({
    exercises,
    name,
    showName = true,
  }) => {
    if (!exercises.length) {
      return <h3>No Exercises Yet</h3>;
    }
    return (
        <div>
          {showName && <h3>{title}</h3>}
          {exercises &&
            exercises.map((exercise) => (
              <div key={exercise._id} className="card mb-3">
                <h4 className="card-header bg-primary text-light p-2 m-0">
                  {showName ? (
                    <Link
                      className="text-light"
                      to={`/profiles/${exercises.exercisesId}`}
                    >
                      {exercises.exercisesId} <br />
                      <span style={{ fontSize: '1rem' }}>
                        {exercise.name}
                      </span>
                    </Link>
                  ) : (
                    <>
                      {/* <span style={{ fontSize: '1rem' }}>
                        You had this exercise on {exercise.createdAt}
                      </span> */}
                    </>
                  )}
                </h4>
                <div className="card-body bg-light p-2">
                  <p>{exercise.description}</p>
                </div>
                <Link
                  className="btn btn-primary btn-block btn-squared"
                  to={`/exercises/${exercise._id}`}
                >
                </Link>
              </div>
            ))}
        </div>
      );
    };
    
    export default ExerciseList;
    