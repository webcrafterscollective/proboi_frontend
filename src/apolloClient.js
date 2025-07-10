// --- src/apolloClient.js ---
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link
const httpLink = createHttpLink({
  uri: 'YOUR_WOOCOMMERCE_SITE_URL/graphql', // Replace with your actual GraphQL endpoint
});

// Create auth link (if you need authentication)
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Add any authentication headers here if needed
    }
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        fields: {
          id: {
            read: (id) => id,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;