const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')
const {MongoClient} = require('mongodb')

const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require('graphql')

var app = express();
var cors = require('cors')

mongoose.connect('mongodb+srv://davebino:gonzos-greenery@cluster0.sw72s.mongodb.net/gonzos-greenery')
.then(() => console.log('Connected to DB'))
.catch(err => console.error(err))

const MovieModel = mongoose.model('movie', {
    title: String,
    description: String,
    genres: Array
})

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        genres: {type: GraphQLString}
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            movies: {
                type: new GraphQLList(MovieType),
                resolve: (root,args,context,info)=> {
                    return MovieModel.find()
                }
            }
        }
    })
})

app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true
})
);

app.listen(8080, () => {
    console.log("server up")
});
