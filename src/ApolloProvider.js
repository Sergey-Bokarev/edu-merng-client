import React from 'react';
import App from './App';
import { 
  ApolloClient, 
  createHttpLink, 
  InMemoryCache, 
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://stark-lowlands-08126.herokuapp.com/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: 'http://localhost:5000',
  cache: new InMemoryCache()
})

export default () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)