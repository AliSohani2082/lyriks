const { UserType, TrackType, PlayListType } = require("./dataSchema");
const User = require('../models/User')
const Track = require('../models/Track')
const PlayList = require('../models/PlayList')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  UniqueOperationTypesRule,
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Track: {
      type: TrackType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Track.findById(args.id)
      }
    },
    User: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    PlayList: {
      type: PlayListType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
  }
})

