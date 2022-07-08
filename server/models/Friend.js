import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Friend = mongoose.model('friend', friendSchema);

export default Friend;
