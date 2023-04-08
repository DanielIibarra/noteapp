const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requeried: true
    },
    user: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = model( 'note',NoteSchema);