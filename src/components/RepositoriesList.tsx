import { useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const RepositoriesList = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchRepositories(term);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>search</button>
        {error && <h3>{error}</h3>}
        {loading && <h3>loading...</h3>}
        {!error &&
          !loading &&
          data.map((name) => {
            return <li>{name}</li>;
          })}
      </form>
    </div>
  );
};

export default RepositoriesList;
