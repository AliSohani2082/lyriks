import { UserType, TrackType, PlayListType } from "./schema";
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
    }
  }
})

