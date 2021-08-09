const { model, Schema } = require('mongoose');

const HobbySchema = {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    passionLevel: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
}

const Hobby = model('Hobby', HobbySchema);

module.exports = Hobby;