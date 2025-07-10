// --- src/index.js ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create an Apollo Client instance
const client = new ApolloClient({
  // Use the environment variable for the API URL and add /graphql
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap your App with the ApolloProvider
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();