import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const partyRatingSchema = new Schema({
  rating: Number,
  movie: { type: Schema.Types.ObjectId, ref: 'movie' },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  party: { type: Schema.Types.ObjectId, ref: 'party' },
});

const PartyRating = mongoose.model('partyRating', partyRatingSchema);

export default PartyRating;
