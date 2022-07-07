import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
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
});

const User = mongoose.model('user', userSchema);

export default User;
