import mongoose from "mongoose";
const Schema = mongoose.Schema

const userRatingSchema = new Schema({
  rating: Number,
  watchAgain: Boolean,
  wantToWatch: Boolean,
  // movie:{type: Schema.Types.ObjectId,
  // ref: 'Movie'},
  //add back into typeDef once uncommented
  user: {type:Schema.Types.ObjectId,
  ref:'User'}
})

const UserRating = mongoose.model('userRating', userRatingSchema)

export default UserRating
