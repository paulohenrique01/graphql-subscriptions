
const { gql } = require('apollo-server-express');

let comments = [
    { id: 1, content: 'My first comment' },
    { id: 2, content: 'My second comment' },
    { id: 3, content: 'My third comment' }
];

const comment = gql`
type Comment {
    id: String
    content: String
}

extend type Query {    
    getComments: [Comment!]! 
}

extend type Mutation {
    createComment(content: String!): Comment! 
}

type Subscription {
    commentAdded(repoFullName: String!): Comment
}

`;

const commentResolver = {
    Query: {
        async getComments(root, { }, { }) {
            return comments;
        },
    },
    Mutation: {
        async createComment(root, { content }, { pubsub }) {
            const comment = { id: comments.length + 1, content };
            comments.push(comment);
            pubsub.publish('commentAdded', { commentAdded: comment })
            return comment;
        }
    },
    
    Subscription: {
        commentAdded: {
          subscribe: (root, { content }, { pubsub }) => pubsub.asyncIterator('commentAdded')
        }
    },

};


module.exports = { comment, commentResolver };
