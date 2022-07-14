import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    ref: 'Genre',
  },
  watched: Array
});

const User = mongoose.model('user', userSchema);

export default User;
