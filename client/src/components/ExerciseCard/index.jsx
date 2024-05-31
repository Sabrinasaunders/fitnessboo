import { Link } from "react-router-dom";

const ExerciseCard = () => {
  return (
    <div>
      <div>
        <h1 className="text-center pb-5">Choose Your Workout</h1>
      </div>
      <div className="d-container">
        <Link className="d-btn" to="/push">
          push
        </Link>
        <Link className="d-btn" to="/pull">
          pull
        </Link>
        <Link className="d-btn" to="/legs">
          legs
        </Link>
      </div>
    </div>
  );
};

export default ExerciseCard;
