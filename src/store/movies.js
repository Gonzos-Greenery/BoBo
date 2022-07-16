import axios from 'axios';
const localhost = 'http://localhost:8080';
// Action constants
const SET_MOVIES = 'SET_MOVIES';
const SET_PARTY_MOVIES = 'SET_PARTY_MOVIES';

// Action creators
const setMovies = (movies) => {
  return {
    type: SET_MOVIES,
    movies,
  };
};

const setPartyMovies = (movies) => {
  return {
    type: SET_PARTY_MOVIES,
    movies,
  };
};

const editMovies = async (info) => {
  const genres = {
    action: [],
    animation: [],
    comedy: [],
    crime: [],
    documentation: [],
    drama: [],
    european: [],
    family: [],
    fantasy: [],
    history: [],
    horror: [],
    music: [],
    romance: [],
    scifi: [],
    thriller: [],
    war: [],
    western: [],
  };
  const newMovies = await Promise.all(
    info.map((movie) => {
      const imdbId = movie.imdb_id;
      const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
      const BASE_URL = 'https://api.themoviedb.org/3';

      const API_URL =
        BASE_URL +
        `/find/${imdbId}?` +
        API_KEY +
        '&language=en-US&external_source=imdb_id';
      const IMG_URL = 'https://image.tmdb.org/t/p/w500';

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
              'https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg';
            return movie;
          }
        })
        .catch((e) => e);
      return res;
    })
  );
  const random = newMovies.sort((a, b) => 0.5 - Math.random());
  for (let type in genres) {
    const filteredMovies = random.filter((movie) =>
      movie.genres_arr.includes(type)
    );
    genres[type] = filteredMovies;
  }
  return {
    all: random,
    sort: genres,
  };
};
// Thunks

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${localhost}/api/movies`,
      });
      let movies = await editMovies(data);
      dispatch(setMovies(movies));
    } catch (error) {
      console.log(error);
    }
  };
};

const topThreeGenres = async (users) => {
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
    const { data } = await axios.get(`/api/users/genre/${users[i].id}`);
    for (let j = 0; j < users[i].genre.length; j++) {
      genreCount[users[i].genre[j]]++;
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
const streamingServices = (users) => {
  let totalServices = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].hulu) totalServices.push('hulu');
    if (users[i].netflix) totalServices.push('netflix');
    if (users[i].prime) totalServices.push('prime');
    if (users[i].disney) totalServices.push('disney');
    if (users[i].hbo) totalServices.push('hbo');
  }

  let uniqueServices = [...new Set(totalServices)];
  return uniqueServices;
};
export const fetchPartyMovies = (users) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${localhost}/api/movies`,
      });
      let movies = await editMovies(data);
      const genrePrefs = topThreeGenres(users);
      const streamingOptions = streamingServices(users);

      // genre filter
      // movies.filter((movie) => {
      //   movie.genres_arr.includes(genrePrefs[0]) ||
      //     movie.genres_arr.includes(genrePrefs[1]) ||
      //     movies.genres_arr.includes(genrePrefs[2]);
      // });

      //streaming options filter

      //popular and recent
      movies.filter((movie) => movie.release_year > 2011);
      movies.filter((movie) => movie.imdb_votes > 200);
      movies.sort((a, b) => {
        return a.imdb_score - b.imdb_score;
      });
      // filter out seen movies

      dispatch(setPartyMovies(movies.slice(0, 10)));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies;
    default:
      return state;
  }
};
