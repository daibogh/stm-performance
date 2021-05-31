import './App.css';
import {ItemsList} from './components/ItemsList';
import {SocketButton} from './components/SocketButton';
import { ConnectionProvider } from './hooks/useSocketConnection';
import { ReatomProvider } from './store/reatom';


function App() {
  return (
    <ConnectionProvider>
      <ReatomProvider>
      <div className="App">
        <ItemsList />
        <SocketButton />
      </div>
      </ReatomProvider>
    </ConnectionProvider>
  );
}

export default App;
