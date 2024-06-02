import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { QUERY_EXERCISES } from '../utils/queries'

const PushList = () => {
  const { loading, data } = useQuery(QUERY_EXERCISES);
  const exercises = ["1", "2", "3", "4", "5", "6", "7", "8", '9'];

  const upperBody = data.exercises.filter(exercise => exercise.bodyPart.includes("Upper Body"));

  return (
    <div>
      <div>
        <h1 className="text-center pb-5">Choose Your Upper Body Exercise</h1>
      </div>
      <div className="ex-container">
        {upperBody.map((ex) => (
          <Link key={ex._id} className="ex-btn" to={`/exercises/${ex._id}`}>
            {ex.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PushList;
