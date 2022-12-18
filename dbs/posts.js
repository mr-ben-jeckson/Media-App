const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    user:{type: Schema.Types.ObjectId, required: true, ref: "user"},
    title:{type: String, required: true},
    description:{type: String, required: true},
    create:{type: Date, default: Date.now},
});

const post = mongoose.model('post', PostSchema);
module.exports = post;