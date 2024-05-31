import { useQuery } from "@apollo/client";

import ExerciseList from "../components/ExerciseList";
import ExerciseCard from "../components/ExerciseCard";

import { QUERY_EXERCISES } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_EXERCISES);
  const exercises = data?.exercises || [];

  return (
    <main>
      <div>
        <div>
          <ExerciseCard />
        </div>
      </div>
    </main>
  );
};

export default Home;
