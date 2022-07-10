import Movie from './models/Movie.js';
import User from './models/User.js';
import Genre from './models/Genre.js';
import Friend from './models/Friend.js';
import Party from './models/Party.js';
import UserRating from './models/UserRating.js';
import PartyRating from './models/PartyRating.js';
import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLScalarType, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const userRatings = async (userRatingId) => {
  try {
    const userRatings = await UserRating.find({ _id: { $in: userRatingId } });
    return userRatings.map((rating) => ({
      ...rating._doc,
      user: user.bind(this, user._doc.userRatings),
    }));
  } catch (err) {
    throw err;
  }
};

const users = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      userRatings: userRatings.bind(this.user._doc.userRatings),
    };
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  Query: {
    welcome: () => {
      return 'Welcome to Bobo';
    },
    getMovies: async () => {
      const movies = await Movie.find().limit(100);
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
    addGenre: async (
      _,
      {
        genreInput: {
          action,
          animation,
          comedy,
          crime,
          documentation,
          drama,
          european,
          family,
          fantasy,
          history,
          horror,
          music,
          romance,
          scifi,
          thriller,
          war,
          western,
        },
      }
    ) => {
      const newGenre = new Genre({
        action: action,
        animation: animation,
        comedy: comedy,
        crime: crime,
        documentation: documentation,
        drama: drama,
        european: european,
        family: family,
        fantasy: fantasy,
        history: history,
        horror: horror,
        music: music,
        romance: romance,
        scifi: scifi,
        thriller: thriller,
        war: war,
        western: western,
      });

      await newGenre.save();
      return newGenre;
    },
    loginUser: async (root, { LoginInput: { email, password } }) => {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ email }, 'JWT', {
          expiresIn: '7d',
        });
        user.token = token;
        return { ...user, password: '' };
      } else {
        throw new ApolloError('Invalid email or password, try again');
      }
    },
    registerUser: async (
      _,
      { registerInput: { name, username, email, password } }
    ) => {
      const exEmail = await User.findOne({ email });
      if (exEmail) {
        throw new ApolloError(
          'A user is already registered with the email ' + email,
          'USER_ALREADY_EXISTS'
        );
      }
      const exUser = await User.findOne({ username });
      if (exUser) {
        throw new ApolloError(
          `The username ${username} is already in use`,
          'USER_ALREADY_EXISTS'
        );
      }
      let encryptedPassword = await bcrypt.hash(password, 5);
      const newUser = new User({
        name: name,
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      /*may want to update the 'JWT' to something more secure
      (once we have a chance)*/
      const token = jwt.sign({ user_id: newUser._id }, 'JWT', {
        expiresIn: '7d',
      });
      newUser.token = token;
      const res = await newUser.save();
      return { id: res.id, ...res._doc };
    },
    updateUser: async (
      _,
      {
        updateUserInput: {
          id,
          name,
          username,
          password,
          hulu,
          netflix,
          prime,
          hbo,
          disney,
        },
      }
    ) => {
      const updatedUser = {
        name: name,
        username: username,
        password: password,
        hulu: hulu,
        netflix: netflix,
        prime: prime,
        hbo: hbo,
        disney: disney,
      };
      const user = await User.findById(id);

      let samePassword = await bcrypt.compare(password, user.password);
      if (samePassword) {
        updatedUser.password = user.password;
      } else {
        updatedUser.password = await bcrypt.hash(password, 5);
      }

      await user.update(updatedUser);
      return user;
    },
    addUserRating: async (
      root,
      { userRatingInput: { rating, watchAgain, wantToWatch, userId } }
    ) => {
      const user = await User.findById(userId);
      /* add movieId back into parameters when uncommenting this
      const movie = await Movie.findById(movieId);*/
      const newRating = new UserRating({
        rating,
        watchAgain,
        wantToWatch,
        movie,
        user,
      });
      await newRating.save();
      return newRating;
    },
  },
};

export default resolvers;
