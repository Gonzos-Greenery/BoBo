import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  token: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  hulu: Boolean,
  netflix: Boolean,
  prime: Boolean,
  disney: Boolean,
  hbo: Boolean,
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'genre',
  },
  userRating: {type: Schema.Types.ObjectId,
  ref: 'userRating'}
});

const User = mongoose.model('user', userSchema);

export default User;
