import { InMemoryCache, IdGetterObj } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
    dataIdFromObject: (value: IdGetterObj) => {
        if (value.id)
            return value.id + "";
    },
    cacheRedirects: {
        Query: {}
    }
});

export default cache;