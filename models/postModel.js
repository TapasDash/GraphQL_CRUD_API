import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Post = model("post", PostSchema);
export default Post;
