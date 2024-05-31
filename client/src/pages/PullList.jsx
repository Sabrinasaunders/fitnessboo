import { useQuery } from '@apollo/client'
import { QUERY_EXERCISES } from '../utils/queries'

const PullList = () => {
  const { loading, data } = useQuery(QUERY_EXERCISES);
  const exercises = ["1", "2", "3", "4", "5", "6", "7", "8"];
  console.log(data);
  return (
    <div>
      <div>
        <h1 className="text-center pb-5">Choose Your Pull Exercise</h1>
      </div>
      <div className="ex-container">
        {data.exercises.map((ex) => (
          <button className="ex-btn">{ex.name}</button>
        ))}
      </div>
    </div>
  );
};

export default PullList;
