import asynchandler from "express-async-handler";
import Post from "./models/postModel.js";

const resolvers = {
  Query: {
    hello: () => "Hello World!",

    getAllPosts: asynchandler(async () => {
      const posts = await Post.find().lean();
      return posts;
    }),

    getPostById: asynchandler(async (parents, args, context, info) => {
      console.log({ args });
      const { id } = args;
      const post = await Post.findById(id);
      return post;
    }),
  },

  Mutation: {
    createPost: asynchandler(async (parents, args, context, info) => {
      const {
        post: { title, description },
      } = args;
      const post = await Post.create({ title, description });
      return post;
    }),

    deletePost: asynchandler(async (parents, args, context, info) => {
      const { id } = args;
      const post = await Post.findByIdAndDelete(id);
      if (post) return `Post with ${id} got deleted sucessfully.`;
    }),

    updatePost: asynchandler(async (parents, args, context, info) => {
      const {
        id,
        post: { title, description },
      } = args;
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        { new: true }
      );
      if (updatedPost) return updatedPost;
    }),
  },
};

export default resolvers;

/*
In Client Slide..

mutation{
  createPost(post:{
    title:"GraphQL"
    description:" This post is about GraphQL"
  }){   --it tells what to return in User after getting created
    id
    title     
    description
  }
}


For queries as well..


*/
