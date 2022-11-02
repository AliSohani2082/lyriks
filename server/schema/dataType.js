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
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType,
} = require('graphql')

//user
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profileImg: { type: GraphQLString }, 
    tracks: {
      type: new GraphQLList(TrackType),
      resolve(parent, args) {
        return Track.find({ usersId: parent.id})
      }
    },
    playLists: {
      type: new GraphQLList(PlayListType),
      resolve(parent, args) {
        return PlayList.find({ $and: [ { userId: parent.id }, { isLikedPlayList: false } ] })
      }
    },
    likedSongs: {
      type: PlayListType,
      resolve(parent, args) {
        return PlayList.find({ $and: [ { userId: parent.id }, { isLikedPlayList: true } ] })
      }
    }
  })
})

// Track
const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    url: { type: GraphQLString },
    images: { type: new GraphQLObjectType({
      name: 'images',
      fields: () => ({
        background: { type: GraphQLString },
        coverart: { type: GraphQLString },
        coverarthq: { type: GraphQLString },
        joecolor: { type: GraphQLString },
      })
    })},
    genres: { type: new GraphQLList(GraphQLString)},
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ _id: { $in: parent.usersId } })
      }
    },
    listens: { type: GraphQLInt }
  })
})


// PlayList
const PlayListType = new GraphQLObjectType({
  name: 'PlayList',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString},
    subtitle: { type:  GraphQLString },
    tracks: {
      type: new GraphQLList(TrackType),
      resolve(parent, args) {
        return Track.find({ _id: { $in: parent.tracksId } })
      }
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    },
    isLikedPlayList: { type: GraphQLString },
  })
})

module.exports = { UserType, TrackType, PlayListType }