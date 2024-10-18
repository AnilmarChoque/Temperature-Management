import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import './app.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const Principal = () => {
  const location = useLocation();

  let backgroundClass = '';
  if (location.pathname === '/') {
    backgroundClass = 'background-login';
  } else if (location.pathname === '/home') {
    backgroundClass = 'background-home';
  } 

  return (
    <div className={`${backgroundClass}`}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Principal />
      </Router>
    </ApolloProvider>
  );
}

export default App;
