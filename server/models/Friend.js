import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Friend = mongoose.model('friend', friendSchema);

export default Friend;
