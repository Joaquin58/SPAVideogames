import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, vaciarestado } from "../../redux-toolkit/actions";

const Genres = () => {
  const genres = useSelector((state) => state.genres);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const dispatchgenres = (e) => {
    e.preventDefault();
    dispatch(getGenres());
  };
  const statedefault = (e) => {
    e.preventDefault();
    dispatch(vaciarestado());
  };

  return (
    <div>
      genres
      <button onClick={dispatchgenres}>GetGentes</button>{" "}
      <button onClick={statedefault}>X</button>

      {loading ? (
        <div>loading...</div>
      ) : (
        genres?.map(({ id, name }) => (
          <div key={id}>
            {id}: {name}
          </div>
        ))
      )}
    </div>
  );
};

export default Genres;
