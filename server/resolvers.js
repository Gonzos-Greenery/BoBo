import Movie from "./models/Model.js";
import User from "./models/User.js";

const resolvers = {
  Query: {
    welcome: () => {
      return "Welcome to Bobo";
    },
    getMovies: async () => {
      const movies = await Movie.find();
      return movies;
    },
    getMovie: async (root, args) => {
      const movie = await Movie.findById(args.id);
      return movie;
    }
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
      return "The Movie has been deleted successfully";
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
    loginUser: async (root, {LoginInput: {email, password}}) => {
      const user = await User.findOne({email, password});
      //will have to bcrypt the password and compare the input string to the bcrypt version
      if(user){
        return user;
      }
    }
  },
};

export default resolvers;
