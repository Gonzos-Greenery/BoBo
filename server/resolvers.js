import Movie from './models/Model.js';
import User from './models/User.js';
const bcrypt = require ('bcrypt');
const jwt= require ('jsonwebtoken')
require('dotenv').config;

const resolvers = {
  Query: {
    welcome: () => {
      return 'Welcome to Bobo';
    },
    getMovies: async () => {
      const movies = await Movie.find();
      return movies;
    },
    getMovie: async (root, args) => {
      const movie = await Movie.findById(args.id);
      return movie;
    },
    getUser: async (root, args) => {
      const user = await User.findById(args.id);
      return user;
    },
  },
  Mutation: {
    addMovie: async (root, args) => {
      const newMovie = new Movie({
        title: args.title,
        description: args.description,
      });
      await newMovie.save();
      return newMovie;
    },
    deleteMovie: async (root, args) => {
      await Movie.findByIdAndDelete(args.id);
      return 'The Movie has been deleted successfully';
    },
    updateMovie: async (root, args) => {
      const { id, title, description } = args;
      const updatedMovie = {};
      if (title != undefined) {
        updatedMovie.title = title;
      }
      if (description != undefined) {
        updatedMovie.description = description;
      }
      const movie = await Movie.findByIdAndUpdate(id, updatedMovie, {
        new: true,
      });
      return movie;
    },
    addUser: async (root, args) => {
      const newUser = new User({
        name: args.fullname,
        username: args.username,
        password: args.password,
        hulu: args.hulu ? args.hulu : false,
        netflix: args.netflix ? args.netflix : false,
        prime: args.prime ? args.prime : false,
        hbo: args.hbo ? args.hbo : false,
        disney: args.disney ? args.disney : false,
      });
      await newUser.save();
      return newUser;
    },
    updateUser: async (root, args) => {
      const { id, name, username, password, hulu, netflix, prime, hbo } = args;
      const updatedUser = {
        name,
        username,
        password,
        hulu,
        netflix,
        prime,
        hbo,
        disney,
      };

      const user = await User.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      return user;
    },
  },
};

export default resolvers;
