import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const partyRatingSchema = new Schema({
  rating: Number,
  movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  party: { type: Schema.Types.ObjectId, ref: 'Party' },
});

const PartyRating = mongoose.model('partyRating', partyRatingSchema);

export default PartyRating;
