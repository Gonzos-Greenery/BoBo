import Movie from './models/Model.js';
import User from './models/User.js';
import Genre from './models/Genre.js';
import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
<<<<<<< HEAD
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
=======
    loginUser: async (root, {LoginInput: {email, password}}) => {
      const user = await User.findOne({email});
      if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
          {email}, 'JWT',
          {
            expiresIn: '7d'
          }
        )
        user.token = token
        return {...user, password: ''}
      } else {
        throw new ApolloError('Invalid email or password, try again')
      }
>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee
    },
    registerUser: async (
      _,
      { registerInput: { name, username, email, password } }
    ) => {
      const exEmail = await User.findOne({ email });
      if (exEmail) {
        throw new ApolloError(
          'A user is already registered with the email' + email,
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
      const token = jwt.sign({ user_id: newUser._id }, 'JWT', {
        expiresIn: '7d',
      });
      newUser.token = token;
      const res = await newUser.save();
      return { id: res.id, ...res._doc };
    },
<<<<<<< HEAD
    updateUser: async (root, args) => {
      const {
        id,
        name,
        username,
        password,
        hulu,
        netflix,
        prime,
        hbo,
        disney,
      } = args;
=======
    updateUser: async (_, {updateUserInput:{id, name, username, password, hulu, netflix, prime, hbo, disney}}) => {

>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee
      const updatedUser = {
        name:name,
        username:username,
        password:password,
        hulu:hulu,
        netflix:netflix,
        prime:prime,
        hbo:hbo,
        disney:disney,
      };
      const user = await User.findById(id);

      let samePassword= await bcrypt.compare(password,user.password);
      if (samePassword){
        updatedUser.password=user.password
      } else{
        updatedUser.password=await bcrypt.hash(password,5)
      }

      await user.update(updatedUser)
      return user;
    },
  },
};

export default resolvers;
