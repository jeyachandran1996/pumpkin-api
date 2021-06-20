var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.Mixed,
    },
    category: {
        type: String,
        enum : ["Technology", "Marketing", "B2B"],
        required: true,
    },
    downloads: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date
    },
    updatedOn: {
        type: Date
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

var imagesModel = mongoose.model('Image', ImagesSchema);
module.exports = imagesModel