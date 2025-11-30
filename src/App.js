import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/mainpage';
import Data from './pages/secondarypage';

function App() {
  return (
    // No Router import needed here anymore
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/secondarypage" element={<Data />} />
    </Routes>
  );
}

export default App;

