import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import cache from './cache';
import resolvers from './resolvers';


const link = new HttpLink({
    uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link,
    resolvers
});


client.writeData({
    data: {
        zoom: 1,
        imageUrl: "",
    }
});

export default client;