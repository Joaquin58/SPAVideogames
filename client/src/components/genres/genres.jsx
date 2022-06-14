import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getGenres } from "../../redux-toolkit/actions";
import { fetchallGenres } from "../../redux-toolkit/slices";

const Genres = () => {
  const genres = useSelector((state) => state.list);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchallGenres());
    // eslint-disable-next-line
  }, [dispatch]);

  const dispatchgenres = (e) => {
    e.preventDefault();
    dispatch(fetchallGenres());
  };


  return (
    <div>
      genres
      <button onClick={dispatchgenres}>GetGentes</button>{" "}

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
