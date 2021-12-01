import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    _id: ID
    title: String
    description: String
  }

  type Query {
    hello: String
    getAllPosts: [Post]
    getPostById(id: ID): Post
  }

  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

export default typeDefs;

// type Mutation {
//     createPost(title: String, description: String): Post
//   }
// Instead of taking all inputs as argumenst we will make an Input type for our posts
