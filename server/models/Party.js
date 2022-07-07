import mongoose from "mongoose";
const Schema = mongoose.Schema

const partySchema = new Schema({
    date: String,
    host:{type:Schema.Types.ObjectId, ref: 'User'},
    invitedGuests:{type:Schema.Types.ObjectId, ref:'User'},
    acceptedGuests:[{type:Schema.Types.ObjectId, ref:'User'}],
    deniedGuests:[{type:Schema.Types.ObjectId, ref:'User'}],
    potentialMovies:[{type:Schema.Types.ObjectId, ref:'Movie'}],
    pickedMovie:{type:Schema.Types.ObjectId, ref:'Movie'},
    partyRating:{type:Schema.Types.ObjectId, ref: 'Party_Rating'}
})

const Party = mongoose.model('party', partySchema)

export default Party
