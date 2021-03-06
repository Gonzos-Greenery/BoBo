import Movie from "./models/Movie.js";
import User from "./models/User.js";
import Genre from "./models/Genre.js";
import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const resolvers = {
  Query: {
    welcome: () => {
      return "Welcome to Bobo";
    },
    getMovies: async () => {
      const movies = await Movie.find({ imdb_score: { $gt: 7 } }).limit(200);
   ;
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
        const token = jwt.sign({ email }, "JWT", {
          expiresIn: "7d",
        });
        user.token = token;
        return user;
      } else {
        throw new ApolloError("Invalid email or password, try again");
      }
    },
    registerUser: async (
      _,
      { registerInput: { name, username, email, password } }
    ) => {
      const exEmail = await User.findOne({ email });
      if (exEmail) {
        throw new ApolloError(
          "A user is already registered with the email " + email,
          "USER_ALREADY_EXISTS"
        );
      }
      const exUser = await User.findOne({ username });
      if (exUser) {
        throw new ApolloError(
          `The username ${username} is already in use`,
          "USER_ALREADY_EXISTS"
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
      const token = jwt.sign({ user_id: newUser._id }, "JWT", {
        expiresIn: "7d",
      });
      newUser.token = token;
      const res = await newUser.save();
      return { ...res._doc, id: res._doc._id, password: null };
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
      if (password) {
        let samePassword = await bcrypt.compare(password, user.password);
        if (samePassword) {
          updatedUser.password = user.password;
        } else {
          updatedUser.password = await bcrypt.hash(password, 5);
        }
      } else {
        delete updatedUser.password;
      }

      await user.update(updatedUser);
      return user;
    },
    addWatched: async (root, { addWatched: { id, watched } }) => {
      await User.findByIdAndUpdate(id, {
        $set: {
          watched: watched,
        },
      });
    },
  },
};

export default resolvers;
