import { ApolloClient, InMemoryCache } from '@apollo/client';
// declare var env_config: any;
declare global {
    var env_config: any;
}
 
const { baseURL, authToken } = env_config;

export const client = new ApolloClient({
    uri: baseURL + '/graphql',
    cache: new InMemoryCache(),
    headers: {
        'Authorization': `Bearer ${authToken}`
    },
});
