import { UserType, TrackType, PlayListType } from "./dataSchema";
import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTrack: {
      type: TrackType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        genres: { type: [GraphQLString]},
        background: { type: GraphQLString },
        coverart: { type: GraphQLString },
        coverarthq: { type: GraphQLString },
        joecolor: { type: GraphQLString },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      }
    },
  }
})