import { UserType, TrackType, PlayListType } from "./dataSchema";
import User from '../models/User'
import Track from '../models/Track'
import PlayList from '../models/PlayList'

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  UniqueOperationTypesRule,
} from 'graphql'

export const RootQuery = new GraphQLObjectType({
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

