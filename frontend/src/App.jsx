import React, { useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
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

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = 'Login - Gerenciamento de Temperatura';
    } else if (location.pathname === '/home') {
      document.title = 'Home - Sensores';
    }
  }, [location.pathname]);

  return (
    <div className={`${backgroundClass}`}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sensor/:id" element={<Dashboard />} />
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
