import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Carousel from "./components/Carousel";
import NominationCarousel from "./components/NominationCarousel";
require("dotenv").config();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (searchQuery) => {
    const url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchQuery}`;
    const res = (await (await fetch(url)).json()).Search;
    if (res) {
      const unique = [
        ...new Set(res.map((itm) => JSON.stringify(itm))),
      ].map((i) => JSON.parse(i));

      const arr = [];
      for (var i = 0; i < unique.length; i++) {
        const url2 = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${unique[i].imdbID}`;
        const res2 = await (await fetch(url2)).json();
        arr.push(res2);
      }
      setMovies(arr);
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      const delay = setTimeout(() => {
        searchMovies(searchQuery);
      }, 500);
      return () => clearTimeout(delay);
    } else {
      searchMovies(searchQuery);
    }
  }, [searchQuery]); //eslint-disable-line react-hooks/exhaustive-deps

  const addNomination = (i) => {
    setNominations([
      ...nominations,
      movies[movies.findIndex((x) => x.imdbID === i)],
    ]);
  };

  const removeNomination = (i) => {
    setNominations(nominations.filter((n) => n.imdbID !== i));
  };

  return (
    <div className="App">
      <Header />
      <div>
        <span className="horizontal-rule"></span>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {nominations.length === 5 ? (
        <div class="alert alert-success ms-2 mx-2 mt-2" role="alert">
          Congratulations, you selected 5 nominations!
        </div>
      ) : (
        false
      )}
      <Carousel
        movies={movies}
        searchQuery={searchQuery}
        loading={loading}
        nominations={nominations}
        setNominations={setNominations}
        handleClick={addNomination}
        nominationCarousel={false}
      />
      <h4 style={{ textAlign: "left", marginLeft: "10px" }}>Nominations</h4>
      <NominationCarousel
        movies={nominations}
        searchQuery={searchQuery}
        loading={loading}
        nominations={nominations}
        setNominations={setNominations}
        handleClick={removeNomination}
        nominationCarousel={true}
      />
    </div>
  );
}

export default App;
