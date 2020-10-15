import React from 'react';
import './App.css';
import Routes from './Components/Routes';
import {BrowserRouter} from 'react-router-dom'
import AppContext from './Components/ContextAPI/AppContextProvider'

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="App">
          <Routes></Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
