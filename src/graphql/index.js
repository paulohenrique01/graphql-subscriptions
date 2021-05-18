const { gql } = require('apollo-server-express');
const GraphQLJSON = require('graphql-type-json');
const { makeExecutableSchema } = require('graphql-tools');
const { comment, commentResolver } = require('./schemas/comment');

//Generic
const typeDef = gql`
scalar Date   
scalar JSON

type Query{
    _empty: String
}
type Mutation {
    _empty: String
}

`;

const typeDefs = [typeDef, comment];

const resolveFunctions = {
    JSON: GraphQLJSON
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: [resolveFunctions, commentResolver]
})

module.exports = schema;