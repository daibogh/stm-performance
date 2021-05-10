import React, {createContext} from 'react';
import './App.css';
import {ItemsList} from './components/ItemsList';
import {ItemsMatrix} from './components/ItemsMatrix';
import {SocketButton} from './components/SocketButton';
import {RootStore, StoreContext} from './store/mobx';
import {context, useAtom} from '@reatom/react';
import {reatomStore} from './store/reatom';
const Provider = context.Provider;
const rootStore = new RootStore();

function App() {
  return (
    <Provider value={reatomStore}>
      <div className="App">
        <ItemsList />
        <SocketButton />
      </div>
    </Provider>
  );
}

export default App;
