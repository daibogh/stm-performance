import React from 'react';
import './App.css';
import {ItemsList} from './components/ItemsList';
import {ItemsMatrix} from './components/ItemsMatrix';
import {SocketButton} from './components/SocketButton';

function App() {
  return (
    <div className="App">
      <ItemsList />
      <SocketButton />
    </div>
  );
}

export default App;
