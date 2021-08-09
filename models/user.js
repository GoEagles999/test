const { model, Schema } = require('mongoose');

const UserSchema = {
    name: { type: String, required: true },
    hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }],
}

const User = model('User', UserSchema);

module.exports = User;