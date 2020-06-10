import * as mongoose from "mongoose";

const DownloadSchema = new mongoose.Schema({
    url: {
        type: String,
        trim: true,
        required: [true, 'Please add required field']
    },
    status: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Downloads', DownloadSchema);