import { Link } from "react-router-dom";

const ExerciseCard = () => {
  return (
    <div>
      <div>
        <h1 className="text-center pb-5">Choose Your Targeted Bodypart</h1>
      </div>
      <div className="d-container">
        <Link className="d-btn" to="/push">
          Upper Body
        </Link>
        <Link className="d-btn" to="/pull">
          Lower Body
        </Link>
        
      </div>
    </div>
  );
};

export default ExerciseCard;
