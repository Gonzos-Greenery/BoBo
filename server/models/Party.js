import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const partySchema = new Schema({
  date: Date,
  host: { type: Schema.Types.ObjectId, ref: 'user' },
  invitedGuests: { type: Schema.Types.ObjectId, ref: 'user' },
  acceptedGuests: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  deniedGuests: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  potentialMovies: [{ type: Schema.Types.ObjectId, ref: 'movie' }],
  pickedMovie: { type: Schema.Types.ObjectId, ref: 'movie' },
  partyRating: { type: Schema.Types.ObjectId, ref: 'partyRating' },
});

const Party = mongoose.model('party', partySchema);

export default Party;
