const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type:String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref:'User' // User Scheme를 참조하는!
    },
    type: { // Types of this chat
        type: String,
    },
}, {timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = { Chat }
