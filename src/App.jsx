import { Outlet } from 'react-router-dom';
import './App.css';
import { Footer } from './components/organisms/Footer/Footer';
import { Header } from './components/organisms/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
