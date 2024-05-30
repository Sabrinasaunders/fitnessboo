import { useQuery } from '@apollo/client';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';
import ExerciseList from '../components/ExerciseList';
import ExerciseCard from '../components/ExerciseCard';

import { QUERY_EXERCISES, QUERY_EXERCISES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_EXERCISES);
  const exercises = data?.exercises || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ExerciseCard />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ExerciseList
              exercises={exercises}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
