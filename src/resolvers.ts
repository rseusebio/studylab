import { Resolvers, Resolver, } from "apollo-client";
import { FieldNode, } from "graphql";
import { FragmentMap } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GET_ZOOM_VALUE } from './gql/cacheQueries';

interface resolverInfo {
    field: FieldNode;
    fragmentMap: FragmentMap;
}

const mutateZoom: Resolver = (rootValue?: any, args?: any, context?: any, info?: resolverInfo | undefined) => {
    const { increment, operation } = args;
    const { cache } = context;
    const data: any = (cache as InMemoryCache).readQuery ({ query: GET_ZOOM_VALUE });
    if (!data || !data.zoom) 
    {
        throw new Error ("Invalid query result at zoom client mutation");
    }
    let { zoom } = data;
    if ((operation as string).toLocaleUpperCase () == "in")
    {
        zoom += (increment as number);
    }
    else if ((operation as string).toLocaleUpperCase () == "out")
    {
        zoom -= (increment as number);
    }
    (cache as InMemoryCache).writeData ({ data: { zoom } });
    return {
        zoom
    };
}

const queryZoom: Resolver = (rootValue?: any, args?: any, context?: any, info?: resolverInfo | undefined) => {
    const { cache } = context;
    const data: any = (cache as InMemoryCache).readQuery ({ query: GET_ZOOM_VALUE });
    if (!data || !data.zoom) 
    {
        throw new Error ("Invalid query result at zoom client mutation");
    }
    return data;
}

const resolvers: Resolvers = {
    Query: {
        zoom: queryZoom, 
    },
    Mutation: {
        zoom: mutateZoom,
    }
}

export default resolvers;
