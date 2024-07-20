// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Example state, manage as per your auth logic

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Home isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default App;
