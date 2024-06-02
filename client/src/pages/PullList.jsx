import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { QUERY_EXERCISES } from '../utils/queries'

const PullList = () => {
  const { loading, data } = useQuery(QUERY_EXERCISES);
  const exercises = ["1", "2", "3", "4", "5", "6", "7", "8"];
  

  const lowerBody = data.exercises.filter(exercise => exercise.bodyPart.includes("Lower Body"));

  return (
    <div>
      <div>
        <h1 className="text-center pb-5">Choose Your Lower Body Exercise</h1>
      </div>
      <div className="ex-container">
        {lowerBody.map((ex) => (
          <Link key={ex._id} className="ex-btn" to={`/exercises/${ex._id}`}>
          {ex.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PullList;
