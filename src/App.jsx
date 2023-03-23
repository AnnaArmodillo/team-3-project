/* eslint-disable import/no-extraneous-dependencies */
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Footer } from './components/organisms/Footer/Footer';
import { Header } from './components/organisms/Header/Header';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
