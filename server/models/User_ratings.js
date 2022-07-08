import mongoose from "mongoose";
const Schema = mongoose.Schema

const userRatingSchema = new Schema({
  rating: Number,
  watchAgain: Boolean,
  wantToWatch: Boolean,
  movie:{type: Schema.Types.ObjectId,
  ref: 'Movie'},
  user: {type:Schema.Types.ObjectId,
  ref:'User'}
})

const User_Rating = mongoose.model('user_rating', userRatingSchema)

export default User_Rating
