import React, {createContext} from 'react';
import './App.css';
import {ItemsList} from './components/ItemsList';
import {ItemsMatrix} from './components/ItemsMatrix';
import {SocketButton} from './components/SocketButton';
import {RootStore, StoreContext} from './store/mobx';
const rootStore = new RootStore();

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <div className="App">
        <ItemsMatrix />
        <SocketButton />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
