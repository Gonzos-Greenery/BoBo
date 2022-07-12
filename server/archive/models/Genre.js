import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  action: Boolean,
  animation: Boolean,
  comedy: Boolean,
  crime: Boolean,
  documentation: Boolean,
  drama: Boolean,
  european: Boolean,
  family: Boolean,
  fantasy: Boolean,
  history: Boolean,
  horror: Boolean,
  music: Boolean,
  romance: Boolean,
  scifi: Boolean,
  thriller: Boolean,
  war: Boolean,
  western: Boolean,
  foreign, mystery
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Genre = mongoose.model('genre', genreSchema);

export default Genre;
