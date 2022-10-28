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
        return User.findById(userId)
      }
    },
    isLikedPlayList: { type: GraphQLBoolean },
  })
})

// Root Query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    track: {
      type: TrackType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Track.findById(args.id);
      }
    },
    tracks: {
      type: new GraphQLList(TrackType),
      resolve(parent, args) {
        return Track.find()
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find()
      }
    },
    playList: {
      type: PlayListType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return PlayList.findById(args.id);
      }
    },
    playLists: {
      type: new GraphQLList(PlayListType),
      resolve(parent, args) {
        return PlayList.find()
      }
    },
  }
});

// // mutation

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTrack: {
      type: TrackType,
      args: {
        usersId: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        genres: { type: new GraphQLList(GraphQLString)},
        background: { type: GraphQLString },
        coverart: { type: GraphQLString },
        coverarthq: { type: GraphQLString },
        joecolor: { type: GraphQLString },
      },
      resolve(parent, args) {
        const track = new Track({
          usersId: args.usersId,
          title: args.title,
          subtitle: args.subtitle,
          url: args.url,
          genres: args.genres,
          images: {
            background: args.background,
            coverart: args.coverart,
            coverarthq: args.coverarthq,
            joecolor: args.joecolor,
          },
        });

        return track.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        profileImg: { type: GraphQLString },
        
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
          profileImg: args.profileImg,
        });

        return user.save();
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})

// module.exports = {RootQuery, UserType, TrackType, PlayListType}