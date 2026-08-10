import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import SelectRole from './pages/SelectRole';
import Navbar from './components/navbar';

const publicRoutes = [{ path: '/login', element: <Login /> }];
const pvtRoutes = [
  { path: '/', element: <Home /> },
  { path: '/select-role', element: <SelectRole /> },
];

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {publicRoutes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Routes>
        <Routes>
          {pvtRoutes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
