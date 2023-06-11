import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
const httpLink = createHttpLink({
  uri: 'https://ibnu-seid-92.hasura.app/v1/graphql',
  headers: {
    "x-hasura-admin-secret": "965oVsgnNMW7f6Rzo2kLeUmBJs7QINaAQpxNbCZMaMcmsgQyVekAJa4vYpbdgwPF"
  }
});
const apolloclient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
export default apolloclient;