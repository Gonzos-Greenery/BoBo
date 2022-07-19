import axios from "axios";
const url = "https://bobo-server.herokuapp.com";

// Action constants
const SET_PARTY_MOVIES = "SET_PARTY_MOVIES";

// Action creators

const setPartyMovies = (movies) => {
  return {
    type: SET_PARTY_MOVIES,
    movies,
  };
};

// Calculate frequency of preferred genres, recommend a movie falling under the top 3 genres
const topThreeGenres = (users) => {
  let genreCount = {
    comedy: 0,
    action: 0,
    animation: 0,
    crime: 0,
    documentation: 0,
    drama: 0,
    european: 0,
    family: 0,
    fantasy: 0,
    history: 0,
    horror: 0,
    romance: 0,
    music: 0,
    scifi: 0,
    thriller: 0,
    war: 0,
    western: 0,
    foreign: 0,
    mystery: 0,
  };
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users[i].genres.length; j++) {
      genreCount[users[i].genres[j].title]++;
    }
  }
  let sortedGenres = [];
  for (var genre in genreCount) {
    sortedGenres.push([genre, genreCount[genre]]);
  }
  sortedGenres.sort(function (a, b) {
    return a[1] - b[1];
  });
  let topGenres = [];
  for (let i = 0; i < 3; i++) {
    topGenres.push(sortedGenres[i][0]);
  }

  return topGenres;
};

// Array of streaming services available to party through users
const streamingServices = (users) => {
  let totalServices = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].hulu) totalServices.push("hulu");
    if (users[i].netflix) totalServices.push("netflix");
    if (users[i].prime) totalServices.push("prime");
    if (users[i].disney) totalServices.push("disney");
    if (users[i].hbo) totalServices.push("hbo");
  }

  let uniqueServices = [...new Set(totalServices)];
  return uniqueServices;
};

const moviesSeen = (users) => {
  let totalMovies = [];
  for (let i = 0; i < users.length; i++) {
    users[i].movies.forEach((movie) => totalMovies.push(movie.id));
  }
  let uniqueMovies = [...new Set(totalMovies)];
  return uniqueMovies;
};

// Thunk
export const fetchPartyMovies = (users) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${url}/api/movies`,
      });
      const genrePrefs = topThreeGenres(users);
      const streamingOptions = streamingServices(users);
      let movies = data;

      // Filter by top 3 genres among party goers
      let genreFilteredMovies = [];
      movies.map((movie) => {
        if (movie.genres_arr) {
          if (
            movie.genres_arr.includes(genrePrefs[0]) ||
            movie.genres_arr.includes(genrePrefs[1]) ||
            movie.genres_arr.includes(genrePrefs[2])
          ) {
            genreFilteredMovies.push(movie);
          }
        }
      });
      // Filter by available streaming services
      let serviceFilteredMovies = [];
      genreFilteredMovies.map((movie) => {
        for (let i = 0; i < streamingOptions.length; i++) {
          if (movie[streamingOptions[i]]) {
            serviceFilteredMovies.push(movie);
            break;
          }
        }
      });
      // filter out seen movies -> still needed
      const seenMovieIds = moviesSeen(users);
      let remainingMovies = serviceFilteredMovies.filter(
        (movie) => !seenMovieIds.includes(movie.id)
      );

      // Filter for popular and recent movies
      remainingMovies.filter((movie) => movie.release_year > 2011);
      remainingMovies.filter((movie) => movie.imdb_votes > 200);
      remainingMovies.sort((a, b) => {
        return a.imdb_score - b.imdb_score;
      });
      const recommendedTenMovies = remainingMovies.slice(0, 10);
      const editedMovies = await Promise.all(
        recommendedTenMovies.map((movie) => {
          const imdbId = movie.imdb_id;
          const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
          const BASE_URL = "https://api.themoviedb.org/3";

          const API_URL =
            BASE_URL +
            `/find/${imdbId}?` +
            API_KEY +
            "&language=en-US&external_source=imdb_id";
          const IMG_URL = "https://image.tmdb.org/t/p/w500";
          let res = fetch(API_URL)
            .then((res) => res.json())
            .then(({ movie_results }) => {
              if (
                movie_results &&
                movie_results.length > 0 &&
                movie_results[0] &&
                movie_results[0].poster_path
              ) {
                movie.image = `${IMG_URL + movie_results[0].poster_path}`;
                return movie;
              } else {
                movie.image =
                  "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg";
                return movie;
              }
            })
            .catch((e) => e);
          return res;
        })
      );
      dispatch(setPartyMovies(editedMovies));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTY_MOVIES:
      return action.movies;
    default:
      return state;
  }
};
