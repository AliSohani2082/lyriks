const User = require('../models/User')
const Track = require('../models/Track')
const PlayList = require('../models/PlayList')
const { UserType, TrackType, PlayListType } = require('./dataType')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql')

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
    deleteTrack: {
      type: TrackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent, args){
        PlayList.updateMany({ tracksId: args.id}, { $pull: { tracksId: args.id }})
        return Track.findByIdAndRemove(args.id)
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

        const likedSongsPlayList = new PlayList({
          title: "liked Songs",
          subtitle: "The songs, you liked",
          tracksId: new Array(null),
          userId: user._id,
          playListType: "likedSongs"
        })
        likedSongsPlayList.save()

        return user.save();
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent, args) {
        const tracks = await Track.find({ usersId: args.id })
        const playLists = await PlayList.find({ userId: args.id })

        for(const track of tracks) {
          if(track.usersId.length > 1) {
            Track.findByIdAndUpdate(track.id, { $pull: { usersId: args.id } })
          } else {
            Track.findByIdAndRemove(track.id)
          }
        }
        for(const playList of playLists) {
          await PlayList.findByIdAndRemove(playList.id)
        }

        return User.findByIdAndRemove(args.id)
      }
    },
    addPlayList: {
      type: PlayListType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString)},
        subtitle: { type: new GraphQLNonNull(GraphQLString)},
        userId: { type: new GraphQLNonNull(GraphQLID)},
        tracksId: { type: new GraphQLList(GraphQLID)},
      },
      resolve(parent, args) {
        const playList = new PlayList({
          title: args.title,
          subtitle: args.subtitle,
          userId: args.userId,
          tracksId: args.tracksId
        })
        return playList.save()
      }
    },
    deletePlayList: {
      type: PlayListType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        return PlayList.findByIdAndRemove(args.id)
      }
    },
    addTrackToPlayList: {
      type: PlayListType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
        trackId: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return PlayList.findByIdAndUpdate(args.id, { $addToSet: { tracksId: args.trackId } })
      }
    },
    likeTrack: {
      type: PlayListType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        trackId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return PlayList.findOneAndUpdate(
          { $and: [{ userId: args.userId }, { playListType: "likedSongs" }]  },
          { $addToSet: { tracksId: args.trackId }}
        )
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})