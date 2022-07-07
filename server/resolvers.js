import Movie from './models/Model.js';
import User from './models/User.js';
import Genre from './models/Genre.js';

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
    // getGenre: async (root, args) => {
    //   const genre = await Genre.findOne({ where: { userId: args.userId } });
    //   return genre;
    // },
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
    addGenre: async (root, args) => {
      const newGenre = new Genre({
        action: args.action,
        animation: args.animation,
        comedy: args.comedy,
        crime: args.crime,
        documentation: args.documentation,
        drama: args.drama,
        european: args.european,
        family: args.family,
        fantasy: args.fantasy,
        history: args.history,
        horror: args.horror,
        music: args.music,
        romance: args.romance,
        scifi: args.scifi,
        thriller: args.thriller,
        war: args.war,
        western: args.western,
      });
      await newGenre.save();
      return newGenre;
    },
  },
};

export default resolvers;
