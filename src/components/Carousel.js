import React from "react";
import "./stylesheets/Carousel.css";
import { Scrollbars } from "react-custom-scrollbars";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(35, 49, 86, 0.8)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

const Carousel = (props) => {
  return (
    <div className="carousel-wrapper">
      {props.searchQuery ? (
        props.movies.length > 0 ? (
          <CustomScrollbars
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
          >
            {props.movies.map((m, i) => (
              <div className="movie-card">
                <div className="card-horizontal">
                  <div className="img-square-wrapper">
                    <img
                      key={m.imdbID}
                      src={m.Poster}
                      alt={m.Title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.ibb.co/CmvyD8L/default-1.jpg";
                      }}
                    ></img>
                  </div>
                  <div
                    className="card-body"
                    style={{
                      textAlign: "left",
                      whiteSpace: "pre-line",
                      width: "50%",
                    }}
                  >
                    <h6 className="movie-title">{m.Title}</h6>
                    <div
                      className="basic-info"
                      title={`${m.Title} (${m.Year})`}
                    >
                      <p>{m.Year}</p>
                      <p>
                        {m.Rated === "Not Rated" ? "" : `${m.Rated} /`}{" "}
                        {m.Runtime} / {m.Genre}
                      </p>
                    </div>
                    <div className="summary" title={m.Plot}>
                      {m.Plot}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                    }}
                  >
                    {m.imdbRating}/10
                    <button
                      type="button"
                      className={`btn btn-${
                        props.nominationCarousel ? "danger" : "success"
                      } btn-sm mb-2 ms-2`}
                      disabled={
                        props.nominationCarousel
                          ? false
                          : props.nominations.includes(props.movies[i]) ||
                            props.nominations.length === 5
                      }
                      onClick={() => props.handleClick(m.imdbID)}
                    >
                      {props.nominationCarousel ? "Remove" : "Nominate"}
                    </button>
                    <a
                      className="btn btn-dark btn-sm mx-2 mb-2"
                      href={`https://www.imdb.com/title/${m.imdbID}/`}
                      role="button"
                    >
                      IMDb
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </CustomScrollbars>
        ) : (
          <div style={{ width: "100%", margin: "auto" }}>
            {props.loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <h5>No Results found!</h5>
            )}
          </div>
        )
      ) : (
        <div style={{ width: "100%", margin: "auto" }}>
          {props.loading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <h5>Enter a Movie Title...</h5>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
