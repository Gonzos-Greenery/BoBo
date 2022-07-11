import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import user from './user';
import movie from './movie';
import movies from './movies';
import genrePref from './genrePref';
import moviesWatched from './moviesWatched';
import userParties from './parties';
import userRatings from './userRatings';
import partyRatings from './partyRatings';
import party from './party';

const reducer = combineReducers({
  auth,
  user,
  movies,
  movie,
  genrePref,
  moviesWatched,
  userParties,
  userRatings,
  partyRatings,
  party,
  //Friends list
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = legacy_createStore(reducer, middleware);

export default store;
export * from './auth';
