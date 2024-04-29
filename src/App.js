import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Rutas from './user/routes/Rutas.js';
import './user/css/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Rutas />
      </BrowserRouter>
    </div>
  );
}

export default App;
