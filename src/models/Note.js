const mongoose = require('mongoose');
const {Schema} = mongoose;


const NoteSchema = new Schema({
    TipoOferta: {type: String, require: true},
    user: {type: String}
});

module.exports = mongoose.model('Note', NoteSchema);