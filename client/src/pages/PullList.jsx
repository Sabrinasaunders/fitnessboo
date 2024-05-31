import ExerciseCard from "../components/ExerciseCard";

const PullList = () => {
  const exercises = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <div>
      <div>
        <h1 className="text-center pb-5">Choose Your Pull Exercise</h1>
      </div>
      <div className="ex-container">
        {exercises.map((ex) => (
          <button className="ex-btn">{ex}</button>
        ))}
      </div>
    </div>
  );
};

export default PullList;
