import { Link } from "react-router-dom";

const PushList = () => {
  const exercises = ["1", "2", "3", "4", "5", "6", "7", "8", '9'];

  return (
    <div>
      <div>
        <h1 className="text-center pb-5">Choose Your Push Exercise</h1>
      </div>
      <div className="ex-container">
        {exercises.map((ex) => (
          <Link className="ex-btn" to="/thoughts/:thoughtId">
            {ex}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PushList;
