import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    msg: {
        type: String,
        required: true,
        minlength: 1
    }
}, { timestamps: true })

const postSchema = new mongoose.Schema(
    {
        image: {
            type: String,  // cloudinary url
            public_id: { type: String },
            url: { type: String },
        },
        description: {
            type: String,
            required: true,
            minlength: [10, "Description must be minimum 10 character"],
            maxlength: [50, "Description must be with in 50 character"],
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [commentSchema],

    }, { timestamps: true }
)

const Post = mongoose.model("Post",postSchema)

export default Post