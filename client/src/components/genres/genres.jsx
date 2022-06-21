import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getGenres } from "../../redux-toolkit/actions";
import { getGenres, getVideogames } from "../../redux-toolkit/actions.js";
// import { getVideogames } from "../../redux-toolkit/slices/videogames.slice"

const Genres = () => {
  const genres = useSelector(({ genres }) => genres.list);
  const loading = useSelector(({ genres }) => genres.loading);
  // const games = useSelector(({ videogames }) => videogames.allVideogames)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());

  }, [dispatch]);

  const dispatchgenres = (e) => {
    e.preventDefault();
    dispatch(getGenres());
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
